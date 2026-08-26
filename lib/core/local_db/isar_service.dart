import 'dart:convert';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart';

import 'schemas/local_memorization_log.dart';

final isarServiceProvider = Provider<LocalDbService>((ref) {
  return LocalDbService();
});

/// ponytail: JSON file store replacing Isar (avoids codegen dependency hell).
/// Same API surface. Upgrade to drift/sqflite if volume exceeds ~1k records.
class LocalDbService {
  static const _fileName = 'yqa_offline_logs.json';
  int _nextId = 1;
  List<LocalMemorizationLog>? _cache;

  Future<File> get _file async {
    final dir = await getApplicationDocumentsDirectory();
    return File('${dir.path}/$_fileName');
  }

  Future<List<LocalMemorizationLog>> _readAll() async {
    if (_cache != null) return _cache!;

    final file = await _file;
    if (!await file.exists()) {
      _cache = [];
      return _cache!;
    }

    final raw = await file.readAsString();
    if (raw.isEmpty) {
      _cache = [];
      return _cache!;
    }

    final list = (jsonDecode(raw) as List)
        .map((e) => LocalMemorizationLog.fromJson(e as Map<String, dynamic>))
        .toList();

    if (list.isNotEmpty) {
      _nextId = list.map((l) => l.id).reduce((a, b) => a > b ? a : b) + 1;
    }

    _cache = list;
    return _cache!;
  }

  Future<void> _writeAll(List<LocalMemorizationLog> logs) async {
    _cache = logs;
    final file = await _file;
    await file.writeAsString(jsonEncode(logs.map((l) => l.toJson()).toList()));
  }

  /// Save a session log locally. Always called before network sync.
  Future<void> saveLogLocally({
    required String profileId,
    required String sessionId,
    required int durationSeconds,
    required double score,
    required List<Map<String, dynamic>> mistakes,
    required DateTime startedAt,
    DateTime? endedAt,
  }) async {
    final logs = await _readAll();

    // Duplicate guard
    if (logs.any((l) => l.sessionId == sessionId)) return;

    final log = LocalMemorizationLog(
      id: _nextId++,
      profileId: profileId,
      sessionId: sessionId,
      durationSeconds: durationSeconds,
      score: score,
      mistakesJson: jsonEncode(mistakes),
      startedAt: startedAt,
      endedAt: endedAt,
      isSynced: false,
    );

    logs.add(log);
    await _writeAll(logs);
  }

  /// Fetch all logs not yet pushed to Supabase.
  Future<List<LocalMemorizationLog>> getUnsyncedLogs() async {
    final logs = await _readAll();
    return logs.where((l) => !l.isSynced).toList();
  }

  /// Mark a log as synced after successful Supabase insert.
  Future<void> markSynced(int logId) async {
    final logs = await _readAll();
    final idx = logs.indexWhere((l) => l.id == logId);
    if (idx == -1) return;

    logs[idx] = logs[idx].copyWith(isSynced: true);
    await _writeAll(logs);
  }

  /// Delete synced logs older than [age] to reclaim storage.
  Future<int> purgeSyncedLogs({Duration age = const Duration(days: 7)}) async {
    final logs = await _readAll();
    final cutoff = DateTime.now().subtract(age);
    final before = logs.length;

    logs.removeWhere(
      (l) => l.isSynced && l.startedAt.isBefore(cutoff),
    );

    await _writeAll(logs);
    return before - logs.length;
  }
}
