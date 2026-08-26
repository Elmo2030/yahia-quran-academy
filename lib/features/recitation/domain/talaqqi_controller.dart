import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

import '../../../core/audio/audio_player_service.dart';
import '../../../core/audio/audio_recording_service.dart';
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
      ),
    );

/// A safe practice loop: listen → repeat → record → review.
///
/// This controller deliberately does not contact the AI evaluator or create an
/// automated pass/fail verdict. That integration remains behind a separate
/// confidence gate.
class TalaqqiController extends StateNotifier<TalaqqiState> {
  final AudioPlayerService player;
  final AudioRecordingService recorder;
  Timer? _progressTimer;

  List<AyahSegment> _segments = [];
  bool _segmentsLoaded = false;

  static const _storageBase =
      'https://rhcfcyvxgbltdzeezryw.supabase.co/storage/v1/object/public/quran-audio';

  static const _audioUrl = '$_storageBase/001.m4a';
  static const _metadataUrl = '$_storageBase/001.json';

  TalaqqiController({required this.player, required this.recorder})
    : super(const TalaqqiState());

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
      _segments = list
          .map((j) => AyahSegment.fromJson(j as Map<String, dynamic>))
          .toList();
      _segmentsLoaded = true;

      if (mounted) {
        state = state.copyWith(
          totalAyahs: _segments.length,
          ayahTexts: _segments.map((s) => s.text).toList(),
        );
      }
      return _segments.isNotEmpty;
    } catch (_) {
      _segments = [];
      return false;
    }
  }

  /// Starts one child-led practice attempt for the current ayah.
  Future<void> startTalaqqiSession() async {
    if (state.isActive || state.phase == TalaqqiPhase.selfReview) return;

    if (!await _ensureSegmentsLoaded()) {
      _setError('Could not load ayah data. Check your connection.');
      return;
    }

    final segment = _currentSegment;
    _enterPhase(TalaqqiPhase.sheikhPlaying, 'Listen carefully to the Sheikh.');

    try {
      await player.load(_audioUrl);
      _startProgressTicker(segment.duration);
      await player.playSegment(startMs: segment.startMs, endMs: segment.endMs);
    } catch (_) {
      await _mockProgress(segment.duration);
    }
    _progressTimer?.cancel();

    final micStatus = await recorder.checkPermission();
    if (micStatus != MicPermission.granted) {
      _setError('Yahya needs microphone access to hear you.');
      return;
    }

    final recordDuration = segment.duration + const Duration(seconds: 1);
    _enterPhase(
      TalaqqiPhase.childRecording,
      'Your turn! Recite the ayah in your own time.',
    );
    _startProgressTicker(recordDuration);

    try {
      final recordingPath = await recorder.startRecording();
      await Future.delayed(recordDuration);
      final savedPath = await recorder.stopRecording() ?? recordingPath;
      _progressTimer?.cancel();

      if (!mounted) return;
      state = state.copyWith(
        phase: TalaqqiPhase.selfReview,
        phaseProgress: 1.0,
        mascotMessage:
            'Listen to both recordings, then decide what to practice next.',
        verificationStatus: VerificationStatus.selfReview,
        recordingPath: savedPath,
        recordingDurationMs: recordDuration.inMilliseconds,
        attemptCount: state.attemptCount + 1,
      );
    } catch (_) {
      _progressTimer?.cancel();
      _setError('Recording failed. Please try again.');
    }
  }

  /// Replays the child recording for a self-directed comparison.
  Future<void> replayChildRecording() async {
    if (!state.hasRecording) return;
    try {
      await player.load(state.recordingPath);
      await player.playSegment(startMs: 0, endMs: state.recordingDurationMs);
    } catch (_) {
      _setError('Your recording could not be played. Please record again.');
    }
  }

  /// Replays the source reciter for an immediate side-by-side self-review.
  Future<void> replaySheikhAyah() async {
    if (!await _ensureSegmentsLoaded()) {
      _setError('Could not load the Sheikh recording.');
      return;
    }

    final segment = _currentSegment;
    try {
      await player.load(_audioUrl);
      await player.playSegment(startMs: segment.startMs, endMs: segment.endMs);
    } catch (_) {
      _setError('Could not play the Sheikh recording. Please try again.');
    }
  }

  /// Repeats the same ayah. This never changes mastery or unlocks a level.
  Future<void> retryCurrentAyah() async {
    await recorder.cleanupLastRecording();
    if (!mounted) return;
    state = state.copyWith(
      phase: TalaqqiPhase.idle,
      phaseProgress: 0.0,
      mascotMessage: 'Let us practice that ayah once more.',
      verificationStatus: VerificationStatus.notRequested,
      recordingPath: '',
      recordingDurationMs: 0,
    );
    await startTalaqqiSession();
  }

  /// Moves through the practice sequence without making an automated mastery claim.
  Future<void> nextAyah() async {
    await recorder.cleanupLastRecording();
    if (!mounted) return;

    if (state.currentAyah >= state.totalAyahs) {
      state = state.copyWith(
        phase: TalaqqiPhase.idle,
        phaseProgress: 0.0,
        mascotMessage: 'Practice session complete. You can listen and practice again anytime.',
        verificationStatus: VerificationStatus.notRequested,
        recordingPath: '',
        recordingDurationMs: 0,
      );
      return;
    }

    state = state.copyWith(
      currentAyah: state.currentAyah + 1,
      phase: TalaqqiPhase.idle,
      phaseProgress: 0.0,
      mascotMessage: '',
      verificationStatus: VerificationStatus.notRequested,
      recordingPath: '',
      recordingDurationMs: 0,
      attemptCount: 0,
    );
  }

  void reset() {
    _progressTimer?.cancel();
    player.stop();
    state = TalaqqiState(
      totalAyahs: _segments.isNotEmpty ? _segments.length : 7,
      ayahTexts: _segments.map((s) => s.text).toList(),
    );
  }

  void _setError(String message) {
    if (!mounted) return;
    state = state.copyWith(
      phase: TalaqqiPhase.error,
      phaseProgress: 0.0,
      mascotMessage: message,
      verificationStatus: VerificationStatus.unavailable,
    );
  }

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
