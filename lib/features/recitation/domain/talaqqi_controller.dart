import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/foundation.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

import '../../../core/audio/audio_player_service.dart';
import '../../../core/audio/audio_recording_service.dart';
import '../../../core/constants/app_constants.dart';
import '../../../core/network/ai_websocket_service.dart';
import '../../gamification/gamification_controller.dart';
import '../../parent_dashboard/domain/parent_dashboard_controller.dart';
import '../data/memorization_repository.dart';
import '../models/ai_evaluation_model.dart';
import '../usage_tracker_service.dart';
import 'talaqqi_state.dart';

/// Metadata for one ayah segment — mirrors the JSON timestamp engine spec.
class AyahSegment {
  final int surah;
  final int ayahNumber;
  final int startMs;
  final int endMs;
  final String text;

  const AyahSegment({
    this.surah = 1,
    required this.ayahNumber,
    required this.startMs,
    required this.endMs,
    this.text = '',
  });

  factory AyahSegment.fromJson(Map<String, dynamic> j) => AyahSegment(
        surah: j['surah'] as int? ?? 1,
        ayahNumber: j['ayah'] as int,
        startMs: j['start_ms'] as int,
        endMs: j['end_ms'] as int,
        text: j['text'] as String? ?? '',
      );

  Duration get duration => Duration(milliseconds: endMs - startMs);
}

final talaqqiProvider =
    StateNotifierProvider.autoDispose<TalaqqiController, TalaqqiState>(
  (ref) => TalaqqiController(
    player: ref.watch(audioPlayerServiceProvider),
    recorder: ref.watch(audioRecordingServiceProvider),
    memRepo: ref.watch(memorizationRepositoryProvider),
    aiWs: ref.watch(aiWebSocketProvider),
    usageTracker: ref.watch(usageTrackerProvider),
    ref: ref,
  ),
);

class TalaqqiController extends StateNotifier<TalaqqiState> {
  final AudioPlayerService player;
  final AudioRecordingService recorder;
  final MemorizationRepository memRepo;
  final AiWebSocketService aiWs;
  final UsageTrackerService usageTracker;
  final Ref _ref;
  Timer? _progressTimer;

  /// Set by the screen — the active child's profile ID.
  String? activeProfileId;

  /// Set to true after a session completes and the daily limit is now reached.
  bool dailyLimitReached = false;

  List<AyahSegment> _segments = [];
  bool _segmentsLoaded = false;

  static const _storageBase =
      'https://rhcfcyvxgbltdzeezryw.supabase.co/storage/v1/object/public/quran-audio';

  static const _audioUrl = '$_storageBase/001.m4a';
  static const _metadataUrl = '$_storageBase/001.json';

  TalaqqiController({
    required this.player,
    required this.recorder,
    required this.memRepo,
    required this.aiWs,
    required this.usageTracker,
    required Ref ref,
  })  : _ref = ref,
        super(const TalaqqiState());

  AyahSegment get _currentSegment =>
      _segments[(state.currentAyah - 1).clamp(0, _segments.length - 1)];

  /// Fetch ayah timestamps from Supabase Storage. Cached after first load.
  Future<bool> _ensureSegmentsLoaded() async {
    if (_segmentsLoaded) return _segments.isNotEmpty;

    try {
      final resp = await http.get(Uri.parse(_metadataUrl));
      if (resp.statusCode != 200) {
        throw HttpException('HTTP ${resp.statusCode}');
      }

      final list = jsonDecode(resp.body) as List;
      _segments = list.map((j) => AyahSegment.fromJson(j as Map<String, dynamic>)).toList();
      _segmentsLoaded = true;

      if (mounted) {
        state = state.copyWith(
          totalAyahs: _segments.length,
          ayahTexts: _segments.map((s) => s.text).toList(),
        );
      }
      return _segments.isNotEmpty;
    } catch (_) {
      // ponytail: don't set _segmentsLoaded so retry is possible on next tap
      _segments = [];
      return false;
    }
  }

  // ──────────────────────────────────────────
  // Main Talaqqi Cycle
  // ──────────────────────────────────────────

  Future<void> startTalaqqiSession() async {
    if (state.isActive) return;

    // Check daily AI usage limit before starting
    if (!await usageTracker.canUseAI()) {
      dailyLimitReached = true;
      state = state.copyWith(
        phase: TalaqqiPhase.idle,
        mascotMessage: 'limit_reached',
      );
      return;
    }

    // Fetch real metadata from Supabase on first run
    if (!await _ensureSegmentsLoaded()) {
      state = state.copyWith(
        phase: TalaqqiPhase.error,
        mascotMessage: 'Could not load ayah data. Check your connection.',
      );
      return;
    }

    final segment = _currentSegment;
    final sessionId = 'session_${DateTime.now().millisecondsSinceEpoch}';

    // ── Phase 1: Sheikh plays the ayah ──
    _enterPhase(
      TalaqqiPhase.sheikhPlaying,
      'Yahya is listening to the Sheikh...',
    );

    try {
      await player.load(_audioUrl);
      _startProgressTicker(segment.duration);
      await player.playSegment(startMs: segment.startMs, endMs: segment.endMs);
    } catch (_) {
      await _mockProgress(segment.duration);
    }
    _progressTimer?.cancel();

    // ── Phase 2: Child records + streams to AI ──
    final micStatus = await recorder.checkPermission();
    if (micStatus != MicPermission.granted) {
      if (!mounted) return;
      state = state.copyWith(
        phase: TalaqqiPhase.error,
        mascotMessage: 'Yahya needs microphone access to hear you!',
      );
      return;
    }

    // Connect to AI engine (non-blocking if it fails)
    try {
      print('[Talaqqi] Connecting WS to ${AppConstants.aiEngineWsUrl}');
      await aiWs.connect();
      print('[Talaqqi] WS connected: ${aiWs.isConnected}');
    } catch (e) {
      print('[Talaqqi] WS connect failed: $e');
    }

    final recordDuration = segment.duration + const Duration(seconds: 1);

    _enterPhase(
      TalaqqiPhase.childRecording,
      'Your turn! Yahya is cheering you on!',
    );
    _startProgressTicker(recordDuration);

    String? recordingPath;
    try {
      print('[Talaqqi] Starting recording...');
      recordingPath = await recorder.startRecording();
      print('[Talaqqi] Recording started at: $recordingPath');

      await Future.delayed(recordDuration);
      await recorder.stopRecording();

      // Send the complete recording file once (not chunked)
      _sendFullRecording(recordingPath);

      // Log AI usage seconds for daily limit tracking
      await usageTracker.addUsage(recordDuration.inSeconds);
      _ref.invalidate(canUseAIProvider);
    } catch (e, st) {
      print('[Talaqqi] Recording error: $e\n$st');
      if (!mounted) return;
      state = state.copyWith(
        phase: TalaqqiPhase.error,
        mascotMessage: 'Recording failed. Please try again.',
      );
      return;
    }
    _progressTimer?.cancel();

    // ── Phase 3: AI analysis ──
    _enterPhase(TalaqqiPhase.analyzing, 'Yahya is thinking...');

    AiEvaluation? evaluation;

    try {
      final result = await aiWs.endStreamAndAwaitResult(
        timeout: const Duration(seconds: 15),
        extendedTimeout: const Duration(seconds: 30),
      );

      if (result != null && result.isNotEmpty) {
        evaluation = AiEvaluation.fromJson(result);
        print('[Talaqqi] AI score: ${evaluation.score}');
      }
    } catch (_) {
      // AI unavailable — use fallback score
    }

    // Fallback: if AI didn't respond, assign a default pass score
    evaluation ??= const AiEvaluation(score: 80.0, mistakes: []);

    // Cleanup temp recording
    await recorder.cleanupLastRecording();

    // ── Log session (Isar-first, then sync) ──
    await _logSession(
      sessionId: sessionId,
      durationSeconds: recordDuration.inSeconds,
      evaluation: evaluation,
    );

    // ── Feed score into gamification engine ──
    final levelCompleted = _ref
        .read(gamificationProvider.notifier)
        .processScore(evaluation.score);

    // ── Phase 4: Result ──
    if (!mounted) return;

    final mascotMsg = levelCompleted
        ? 'Excellent! Yahya is proud of you!'
        : evaluation.isSuccess
            ? 'Great job! Keep going!'
            : 'Good try! Let\'s practice that part again.';

    state = state.copyWith(
      phase: evaluation.isSuccess ? TalaqqiPhase.success : TalaqqiPhase.error,
      phaseProgress: 1.0,
      mascotMessage: mascotMsg,
      lastScore: evaluation.score,
    );
  }

  // ──────────────────────────────────────────
  // Audio chunk streaming
  // ──────────────────────────────────────────

  /// Send the complete recording file as a single base64 payload.
  void _sendFullRecording(String filePath) {
    try {
      final file = File(filePath);
      if (!file.existsSync()) return;

      final bytes = file.readAsBytesSync();
      if (bytes.isEmpty) return;

      print('[Talaqqi] Sending ${bytes.length} bytes to AI');
      aiWs.streamAudioChunk(Uint8List.fromList(bytes));
    } catch (_) {
      // Non-critical
    }
  }

  // ──────────────────────────────────────────
  // Session logging (Isar-first)
  // ──────────────────────────────────────────

  Future<void> _logSession({
    required String sessionId,
    required int durationSeconds,
    required AiEvaluation evaluation,
  }) async {
    if (activeProfileId == null) return;

    try {
      await memRepo.logSession(
        profileId: activeProfileId!,
        sessionId: sessionId,
        durationSeconds: durationSeconds,
        score: evaluation.score,
        mistakes: evaluation.toMistakesJson(),
      );

      // Invalidate parent dashboard cache
      _ref.invalidate(dashboardDataProvider);
    } catch (_) {
      // Non-blocking — data is safe in Isar, sync will retry
    }
  }

  // ──────────────────────────────────────────
  // Navigation
  // ──────────────────────────────────────────

  void nextAyah() {
    if (state.currentAyah >= state.totalAyahs) return;
    state = state.copyWith(
      currentAyah: state.currentAyah + 1,
      phase: TalaqqiPhase.idle,
      phaseProgress: 0.0,
      mascotMessage: '',
    );
  }

  void reset() {
    _progressTimer?.cancel();
    player.stop();
    aiWs.disconnect();
    state = TalaqqiState(
      totalAyahs: _segments.isNotEmpty ? _segments.length : 7,
      ayahTexts: _segments.map((s) => s.text).toList(),
    );
  }

  // ──────────────────────────────────────────
  // Internal helpers
  // ──────────────────────────────────────────

  void _enterPhase(TalaqqiPhase phase, String message) {
    if (!mounted) return;
    state = state.copyWith(
      phase: phase,
      phaseProgress: 0.0,
      mascotMessage: message,
    );
  }

  void _startProgressTicker(Duration duration) {
    const tick = Duration(milliseconds: 50);
    final totalTicks = duration.inMilliseconds ~/ tick.inMilliseconds;
    var current = 0;

    _progressTimer?.cancel();
    _progressTimer = Timer.periodic(tick, (timer) {
      current++;
      if (!mounted) {
        timer.cancel();
        return;
      }
      state = state.copyWith(
        phaseProgress: (current / totalTicks).clamp(0.0, 1.0),
      );
      if (current >= totalTicks) timer.cancel();
    });
  }

  Future<void> _mockProgress(Duration duration) async {
    final completer = Completer<void>();
    _startProgressTicker(duration);
    Timer(duration, () {
      if (!completer.isCompleted) completer.complete();
    });
    await completer.future;
  }

  @override
  void dispose() {
    _progressTimer?.cancel();
    super.dispose();
  }
}
