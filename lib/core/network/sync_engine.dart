import 'dart:async';
import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../local_db/isar_service.dart';
import '../services/supabase/supabase_service.dart';
import 'connectivity_service.dart';

final syncEngineProvider = Provider<SyncEngine>((ref) {
  final engine = SyncEngine(
    localDb: ref.watch(isarServiceProvider),
    supabase: ref.watch(supabaseProvider),
    connectivityService: ConnectivityService(),
  );
  engine.startListening();
  ref.onDispose(engine.dispose);
  return engine;
});

/// Watches network state and flushes unsynced local logs to Supabase
/// whenever connectivity is restored.
///
/// Uses direct Supabase client (not MemorizationRepository) to avoid
/// circular provider dependency.
class SyncEngine {
  final LocalDbService localDb;
  final SupabaseClient supabase;
  final ConnectivityService connectivityService;

  StreamSubscription<bool>? _connectivitySub;
  bool _isSyncing = false;

  SyncEngine({
    required this.localDb,
    required this.supabase,
    required this.connectivityService,
  });

  void startListening() {
    _connectivitySub = connectivityService.onlineStream.listen((isOnline) {
      if (isOnline) syncNow();
    });
  }

  /// Push all unsynced logs to Supabase.
  /// Safe to call from anywhere — duplicate calls are no-ops while syncing.
  Future<void> syncNow() async {
    if (_isSyncing) return;
    _isSyncing = true;

    try {
      final unsyncedLogs = await localDb.getUnsyncedLogs();
      if (unsyncedLogs.isEmpty) return;

      for (final log in unsyncedLogs) {
        try {
          final mistakes = (jsonDecode(log.mistakesJson) as List)
              .cast<Map<String, dynamic>>();

          await supabase.from('memorization_logs').insert({
            'profile_id': log.profileId,
            'session_id': log.sessionId,
            'duration_seconds': log.durationSeconds,
            'score': log.score,
            'mistakes': mistakes,
            'started_at': log.startedAt.toIso8601String(),
            'ended_at': log.endedAt?.toIso8601String(),
          });

          await localDb.markSynced(log.id);
        } catch (_) {
          // Individual failure — skip and continue
          continue;
        }
      }

      await localDb.purgeSyncedLogs();
    } finally {
      _isSyncing = false;
    }
  }

  void dispose() {
    _connectivitySub?.cancel();
  }
}
