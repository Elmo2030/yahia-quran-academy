import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../core/local_db/isar_service.dart';
import '../../../core/network/connectivity_service.dart';
import '../../../core/network/sync_engine.dart';
import '../../../core/services/supabase/supabase_service.dart';
import '../../../shared/models/memorization_log.dart';
import '../../../shared/models/practice_session.dart';

final memorizationRepositoryProvider = Provider<MemorizationRepository>((ref) {
  return MemorizationRepository(
    client: ref.watch(supabaseProvider),
    localDb: ref.watch(isarServiceProvider),
    connectivityService: ConnectivityService(),
    syncEngine: ref.watch(syncEngineProvider),
  );
});

class MemorizationRepository implements PracticeSessionSink {
  final SupabaseClient client;
  final LocalDbService localDb;
  final ConnectivityService connectivityService;
  final SyncEngine syncEngine;

  MemorizationRepository({
    required this.client,
    required this.localDb,
    required this.connectivityService,
    required this.syncEngine,
  });

  /// Persists a child-led session with no artificial score or AI error list.
  ///
  /// The Supabase table still requires a numerical `score`; therefore this
  /// method intentionally writes offline only. A separate, additive database
  /// migration will enable v2 sync without changing the current wire contract.
  @override
  Future<void> logPracticeSession(PracticeSession session) async {
    await localDb.savePracticeSessionLocally(session);
    if (await connectivityService.isOnline) {
      unawaited(syncEngine.syncNow());
    }
  }

  /// Save a session — ALWAYS writes to Isar first (offline-safe),
  /// then triggers sync if online.
  Future<void> logSession({
    required String profileId,
    required String sessionId,
    required int durationSeconds,
    required double score,
    required List<Map<String, dynamic>> mistakes,
  }) async {
    final now = DateTime.now();

    // Step 1: Local write (always succeeds, never blocks UI)
    await localDb.saveLogLocally(
      profileId: profileId,
      sessionId: sessionId,
      durationSeconds: durationSeconds,
      score: score,
      mistakes: mistakes,
      startedAt: now.subtract(Duration(seconds: durationSeconds)),
      endedAt: now,
    );

    // Step 2: If online, push to Supabase immediately (non-blocking)
    final online = await connectivityService.isOnline;
    if (online) {
      // Fire-and-forget — don't block the Talaqqi loop
      _pushToSupabaseAndMark(
        profileId: profileId,
        sessionId: sessionId,
        durationSeconds: durationSeconds,
        score: score,
        mistakes: mistakes,
      );
    }
  }

  /// Direct Supabase insert — used by the sync engine only.
  /// Do NOT call from the Talaqqi controller; use [logSession] instead.
  Future<void> pushToSupabase({
    required String profileId,
    required String sessionId,
    required int durationSeconds,
    required double score,
    required List<Map<String, dynamic>> mistakes,
  }) async {
    await client.from('memorization_logs').insert({
      'profile_id': profileId,
      'session_id': sessionId,
      'duration_seconds': durationSeconds,
      'score': score,
      'mistakes': mistakes,
      'started_at': DateTime.now()
          .subtract(Duration(seconds: durationSeconds))
          .toIso8601String(),
      'ended_at': DateTime.now().toIso8601String(),
    });
  }

  /// Fetch logs for a specific profile (RLS handles parent access).
  Future<List<MemorizationLog>> fetchLogs({
    required String profileId,
    int limit = 100,
  }) async {
    final data = await client
        .from('memorization_logs')
        .select()
        .eq('profile_id', profileId)
        .order('started_at', ascending: false)
        .limit(limit);

    return (data as List).map((e) => MemorizationLog.fromJson(e)).toList();
  }

  /// Fetch logs for all children of the current parent.
  Future<List<MemorizationLog>> fetchChildrenLogs({
    required List<String> childProfileIds,
    DateTime? since,
  }) async {
    var query = client
        .from('memorization_logs')
        .select()
        .inFilter('profile_id', childProfileIds);

    if (since != null) {
      query = query.gte('started_at', since.toIso8601String());
    }

    final data = await query.order('started_at', ascending: false);
    return (data as List).map((e) => MemorizationLog.fromJson(e)).toList();
  }

  /// Push a single log to Supabase and mark it synced locally.
  Future<void> _pushToSupabaseAndMark({
    required String profileId,
    required String sessionId,
    required int durationSeconds,
    required double score,
    required List<Map<String, dynamic>> mistakes,
  }) async {
    try {
      await pushToSupabase(
        profileId: profileId,
        sessionId: sessionId,
        durationSeconds: durationSeconds,
        score: score,
        mistakes: mistakes,
      );
      // Find and mark the local log as synced
      final unsynced = await localDb.getUnsyncedLogs();
      final match = unsynced.where((l) => l.sessionId == sessionId).firstOrNull;
      if (match != null) {
        await localDb.markSynced(match.id);
      }
    } catch (_) {
      // Supabase push failed — stays unsynced, sync engine retries later
    }
  }

  Future<int> totalMinutesSince({
    required List<String> profileIds,
    required DateTime since,
  }) async {
    final logs = await fetchChildrenLogs(
      childProfileIds: profileIds,
      since: since,
    );
    final totalSeconds =
        logs.fold<int>(0, (sum, log) => sum + log.durationSeconds);
    return (totalSeconds / 60).round();
  }

  Future<double> averageScoreSince({
    required List<String> profileIds,
    required DateTime since,
  }) async {
    final logs = await fetchChildrenLogs(
      childProfileIds: profileIds,
      since: since,
    );
    if (logs.isEmpty) return 0.0;
    final total = logs.fold<double>(0, (sum, log) => sum + log.score);
    return total / logs.length;
  }
}
