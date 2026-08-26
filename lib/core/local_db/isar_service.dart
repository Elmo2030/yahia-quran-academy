import 'dart:convert';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart';

import '../../shared/models/practice_session.dart';
import 'schemas/local_memorization_log.dart';

final isarServiceProvider = Provider<LocalDbService>((ref) {
  return LocalDbService();
});

/// JSON file store replacing Isar to avoid a code-generation dependency.
/// Upgrade to drift/sqflite if volume exceeds approximately 1,000 records.
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

  /// Saves a legacy score-based log locally. Retained only to read and sync
  /// existing records that fit the current remote schema.
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
    if (logs.any((l) => l.sessionId == sessionId)) return;

    logs.add(
      LocalMemorizationLog(
        id: _nextId++,
        profileId: profileId,
        sessionId: sessionId,
        durationSeconds: durationSeconds,
        score: score,
        mistakesJson: jsonEncode(mistakes),
        startedAt: startedAt,
        endedAt: endedAt,
      ),
    );
    await _writeAll(logs);
  }

  /// Saves a child-led practice session without fabricating score or mistakes.
  /// The record remains local until the session-v2 database migration is ready.
  Future<void> savePracticeSessionLocally(PracticeSession session) async {
    final logs = await _readAll();
    if (logs.any((log) => log.sessionId == session.id)) return;

    logs.add(
      LocalMemorizationLog(
        id: _nextId++,
        profileId: session.profileId,
        sessionId: session.id,
        durationSeconds: session.durationSeconds,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        schemaVersion: PracticeSession.schemaVersion,
        practiceMode: session.practiceMode.name,
        verificationStatus: session.verificationStatus.name,
        source: session.source.name,
        surah: session.surah,
        ayahStart: session.ayahStart,
        ayahEnd: session.ayahEnd,
        attemptCount: session.attemptCount,
        syncBlockReason: 'requires_session_v2_migration',
      ),
    );
    await _writeAll(logs);
  }

  /// Fetches all records not yet pushed to the remote service.
  Future<List<LocalMemorizationLog>> getUnsyncedLogs() async {
    final logs = await _readAll();
    return logs.where((log) => !log.isSynced).toList();
  }

  /// Returns only records that meet the score-required remote schema.
  Future<List<LocalMemorizationLog>> getLegacySyncableLogs() async {
    final logs = await _readAll();
    return logs.where((log) => !log.isSynced && log.isLegacySyncable).toList();
  }

  /// Marks a local legacy record as synchronized after a successful insert.
  Future<void> markSynced(int logId) async {
    final logs = await _readAll();
    final idx = logs.indexWhere((log) => log.id == logId);
    if (idx == -1) return;

    logs[idx] = logs[idx].copyWith(isSynced: true);
    await _writeAll(logs);
  }

  /// Deletes synchronized legacy logs older than [age] to reclaim storage.
  /// Pending v2 records are preserved even if old, because migration is pending.
  Future<int> purgeSyncedLogs({Duration age = const Duration(days: 7)}) async {
    final logs = await _readAll();
    final cutoff = DateTime.now().subtract(age);
    final before = logs.length;

    logs.removeWhere(
      (log) => log.isSynced && log.startedAt.isBefore(cutoff),
    );

    await _writeAll(logs);
    return before - logs.length;
  }
}
