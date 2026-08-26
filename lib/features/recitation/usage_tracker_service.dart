import 'dart:convert';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart';

/// Daily AI usage limit in seconds (60 minutes).
const _dailyLimitSeconds = 60 * 60;

class UsageTrackerService {
  Map<String, int>? _cache;

  Future<File> get _file async {
    final dir = await getApplicationDocumentsDirectory();
    return File('${dir.path}/yqa_usage.json');
  }

  String get _todayKey {
    final now = DateTime.now();
    return '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
  }

  Future<Map<String, int>> _read() async {
    if (_cache != null) return _cache!;
    try {
      final f = await _file;
      if (!f.existsSync()) return _cache = {};
      final raw = await f.readAsString();
      final map = (jsonDecode(raw) as Map<String, dynamic>)
          .map((k, v) => MapEntry(k, (v as num).toInt()));
      return _cache = map;
    } catch (_) {
      return _cache = {};
    }
  }

  Future<void> _write(Map<String, int> data) async {
    _cache = data;
    final f = await _file;
    await f.writeAsString(jsonEncode(data));
  }

  /// Seconds used today.
  Future<int> todayUsageSeconds() async {
    final data = await _read();
    return data[_todayKey] ?? 0;
  }

  /// Remaining seconds before daily limit is hit.
  Future<int> remainingSeconds() async {
    final used = await todayUsageSeconds();
    return (_dailyLimitSeconds - used).clamp(0, _dailyLimitSeconds);
  }

  /// Whether the child can still use AI today.
  Future<bool> canUseAI() async {
    return (await remainingSeconds()) > 0;
  }

  /// Add seconds to today's usage after a recording session.
  Future<void> addUsage(int seconds) async {
    final data = await _read();
    data[_todayKey] = (data[_todayKey] ?? 0) + seconds;
    // ponytail: prune entries older than 7 days to keep file small
    final cutoff = DateTime.now().subtract(const Duration(days: 7));
    data.removeWhere((key, _) {
      try {
        return DateTime.parse(key).isBefore(cutoff);
      } catch (_) {
        return true;
      }
    });
    await _write(data);
  }
}

final usageTrackerProvider = Provider<UsageTrackerService>((ref) {
  return UsageTrackerService();
});

/// Stream-like provider that UI can watch for limit status.
final canUseAIProvider = FutureProvider.autoDispose<bool>((ref) {
  return ref.watch(usageTrackerProvider).canUseAI();
});
