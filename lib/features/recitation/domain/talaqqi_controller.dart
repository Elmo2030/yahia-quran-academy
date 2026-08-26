import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

import '../../../core/audio/audio_player_service.dart';
import '../../../core/audio/audio_recording_service.dart';
import '../../../shared/models/practice_session.dart';
import '../../auth/data/auth_repository.dart';
import '../data/audio_asset_repository.dart';
import '../data/memorization_repository.dart';
import '../data/quran_content_repository.dart';
import 'talaqqi_state.dart';

/// Metadata for a verified ayah segment supplied by a future timing asset.
class AyahSegment {
  final int surah;
  final int ayahNumber;
  final int startMs;
  final int endMs;

  const AyahSegment({
    required this.surah,
    required this.ayahNumber,
    required this.startMs,
    required this.endMs,
  });

  factory AyahSegment.fromJson(Map<String, dynamic> json) => AyahSegment(
        surah: json['surah'] as int,
        ayahNumber: json['ayah'] as int,
        startMs: json['start_ms'] as int,
        endMs: json['end_ms'] as int,
      );

  Duration get duration => Duration(milliseconds: endMs - startMs);
}

final talaqqiProvider =
    StateNotifierProvider.autoDispose<TalaqqiController, TalaqqiState>((ref) {
  final profile = ref.watch(currentProfileProvider).valueOrNull;
  return TalaqqiController(
    player: ref.watch(audioPlayerServiceProvider),
    recorder: ref.watch(audioRecordingServiceProvider),
    quranContent: ref.watch(quranContentRepositoryProvider),
    audioAssets: ref.watch(audioAssetRepositoryProvider),
    sessionSink: ref.watch(memorizationRepositoryProvider),
    profileId: profile?.id,
  );
});

/// A safe practice loop: listen → repeat → record → review.
///
/// It never contacts the AI evaluator or creates an automatic pass/fail verdict.
/// Segment practice is unavailable until both a production playback URL and
/// trusted ayah timings are present in the audio manifest.
class TalaqqiController extends StateNotifier<TalaqqiState> {
  final AudioPlayerService player;
  final AudioRecordingService recorder;
  final QuranContentRepository quranContent;
  final AudioAssetRepository audioAssets;
  final PracticeSessionSink? sessionSink;
  final String? profileId;
  final int _surah;
  Timer? _progressTimer;

  AudioAsset? _audioAsset;
  List<AyahSegment> _segments = [];
  bool _contentLoaded = false;
  bool _segmentsLoaded = false;
  String? _sessionId;
  DateTime? _sessionStartedAt;
  int _sessionStartAyah = 1;
  int _sessionAttemptCount = 0;

  TalaqqiController({
    required this.player,
    required this.recorder,
    required this.quranContent,
    required this.audioAssets,
    this.sessionSink,
    this.profileId,
    int surah = 1,
  })  : _surah = surah,
        super(TalaqqiState(surah: surah)) {
    unawaited(_ensurePracticeContentLoaded());
  }

  AyahSegment get _currentSegment =>
      _segments[(state.currentAyah - 1).clamp(0, _segments.length - 1)];

  Future<bool> _ensurePracticeContentLoaded() async {
    if (_contentLoaded) return state.hasTextContent;

    try {
      final results = await Future.wait([
        quranContent.getSurah(_surah),
        audioAssets.getForSurah(_surah),
      ]);
      final content = results[0] as QuranSurahContent;
      final audioAsset = results[1] as AudioAsset;
      _audioAsset = audioAsset;
      _contentLoaded = true;

      if (!mounted) return false;
      state = state.copyWith(
        surah: content.surah,
        totalAyahs: content.ayahCount,
        ayahTexts: content.ayahs.map((ayah) => ayah.text).toList(),
        sourceAudioAvailability: _audioAvailability(audioAsset),
        isContentLoading: false,
        contentError: '',
      );
      return true;
    } catch (_) {
      if (mounted) {
        state = state.copyWith(
          isContentLoading: false,
          sourceAudioAvailability: SourceAudioAvailability.unavailable,
          contentError: 'تعذّر تحميل نص السورة أو بيانات الصوت. حاول لاحقًا.',
        );
      }
      return false;
    }
  }

  SourceAudioAvailability _audioAvailability(AudioAsset asset) {
    if (asset.supportsAyahSegments) {
      return SourceAudioAvailability.ayahSegments;
    }
    if (asset.hasWholeSurahPlayback) {
      return SourceAudioAvailability.wholeSurahOnly;
    }
    return SourceAudioAvailability.unavailable;
  }

  Future<bool> _ensureSegmentsLoaded() async {
    if (_segmentsLoaded) return _segments.isNotEmpty;

    final segmentsUri = _audioAsset?.ayahSegmentsUri;
    if (segmentsUri == null) return false;

    try {
      final response = await http.get(segmentsUri);
      if (response.statusCode != 200) {
        throw HttpException('HTTP ${response.statusCode}');
      }
      final decoded = jsonDecode(response.body);
      if (decoded is! List) throw const FormatException('Expected timing list');

      final segments = decoded
          .whereType<Map<String, dynamic>>()
          .map(AyahSegment.fromJson)
          .where(
            (segment) =>
                segment.surah == state.surah &&
                segment.ayahNumber >= 1 &&
                segment.endMs > segment.startMs,
          )
          .toList()
        ..sort((a, b) => a.ayahNumber.compareTo(b.ayahNumber));

      if (segments.length != state.totalAyahs) return false;
      _segments = segments;
      _segmentsLoaded = true;
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Starts one child-led practice attempt for the current ayah.
  Future<void> startTalaqqiSession() async {
    if (state.isActive || state.phase == TalaqqiPhase.selfReview) return;
    if (!await _ensurePracticeContentLoaded()) {
      _setError('تعذّر تحميل محتوى التدريب. تحقق من اتصالك ثم حاول مجددًا.');
      return;
    }
    if (state.sourceAudioAvailability != SourceAudioAvailability.ayahSegments ||
        !await _ensureSegmentsLoaded()) {
      _setError(
        'التدريب آيةً بآية يحتاج تسجيلًا موثوقًا وتوقيتات للآيات؛ يمكنك الاستماع للسورة كاملة عند توفر التسجيل.',
      );
      return;
    }

    final segment = _currentSegment;
    final playbackUri = _audioAsset?.playbackUri;
    if (playbackUri == null) {
      _setError('لا يتوفر رابط تشغيل موثوق لهذه السورة بعد.');
      return;
    }

    _beginSessionIfNeeded();
    _enterPhase(TalaqqiPhase.sheikhPlaying, 'استمع جيدًا إلى الشيخ.');
    try {
      await player.load(playbackUri.toString());
      _startProgressTicker(segment.duration);
      await player.playSegment(startMs: segment.startMs, endMs: segment.endMs);
    } catch (_) {
      _setError('تعذّر تشغيل تسجيل الشيخ. حاول مرة أخرى.');
      return;
    }
    _progressTimer?.cancel();

    final micStatus = await recorder.checkPermission();
    if (micStatus != MicPermission.granted) {
      _setError('يحتاج يحيى إلى إذن الميكروفون ليستمع إلى تلاوتك.');
      return;
    }

    final recordDuration = segment.duration + const Duration(seconds: 1);
    _enterPhase(TalaqqiPhase.childRecording, 'دورك الآن؛ رتّل الآية بهدوء.');
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
        mascotMessage: 'استمع إلى التسجيلين، ثم اختر ما تريد أن تتدرّب عليه.',
        verificationStatus: VerificationStatus.selfReview,
        recordingPath: savedPath,
        recordingDurationMs: recordDuration.inMilliseconds,
        attemptCount: state.attemptCount + 1,
      );
      _sessionAttemptCount++;
    } catch (_) {
      _progressTimer?.cancel();
      _setError('تعذّر حفظ التسجيل. حاول مرة أخرى.');
    }
  }

  /// Starts whole-surah listening only. It is not a substitute for ayah timing.
  Future<void> playWholeSurah() async {
    if (!await _ensurePracticeContentLoaded()) return;
    final playbackUri = _audioAsset?.playbackUri;
    if (playbackUri == null) {
      _setError('التسجيل مدرج في المكتبة لكنه غير متاح للتشغيل بعد.');
      return;
    }
    try {
      await player.load(playbackUri.toString());
      await player.playWhole();
      if (mounted) {
        state = state.copyWith(
          phase: TalaqqiPhase.idle,
          mascotMessage:
              'يعمل الآن تسجيل السورة كاملة؛ لا توجد توقيتات للآيات بعد.',
        );
      }
    } catch (_) {
      _setError('تعذّر تشغيل السورة كاملة. حاول مرة أخرى.');
    }
  }

  /// Replays the child recording for a self-directed comparison.
  Future<void> replayChildRecording() async {
    if (!state.hasRecording) return;
    try {
      await player.load(state.recordingPath);
      await player.playSegment(startMs: 0, endMs: state.recordingDurationMs);
    } catch (_) {
      _setError('تعذّر تشغيل تسجيلك. سجّل الآية مرة أخرى.');
    }
  }

  /// Replays a verified ayah segment for immediate side-by-side self-review.
  Future<void> replaySheikhAyah() async {
    if (!await _ensureSegmentsLoaded()) {
      _setError('لا يتوفر توقيت موثوق لهذه الآية بعد.');
      return;
    }
    final playbackUri = _audioAsset?.playbackUri;
    if (playbackUri == null) {
      _setError('لا يتوفر رابط تشغيل موثوق للسورة بعد.');
      return;
    }

    final segment = _currentSegment;
    try {
      await player.load(playbackUri.toString());
      await player.playSegment(startMs: segment.startMs, endMs: segment.endMs);
    } catch (_) {
      _setError('تعذّر تشغيل تسجيل الشيخ. حاول مرة أخرى.');
    }
  }

  /// Repeats the same ayah. This never changes mastery or unlocks a level.
  Future<void> retryCurrentAyah() async {
    await recorder.cleanupLastRecording();
    if (!mounted) return;
    state = state.copyWith(
      phase: TalaqqiPhase.idle,
      phaseProgress: 0.0,
      mascotMessage: 'لنتدرّب على الآية مرة أخرى.',
      verificationStatus: VerificationStatus.notRequested,
      recordingPath: '',
      recordingDurationMs: 0,
    );
    await startTalaqqiSession();
  }

  /// Moves through practice without making an automated mastery claim.
  Future<void> nextAyah() async {
    await recorder.cleanupLastRecording();
    if (!mounted) return;

    if (state.currentAyah >= state.totalAyahs) {
      await _persistCompletedSession();
      state = state.copyWith(
        phase: TalaqqiPhase.idle,
        phaseProgress: 0.0,
        mascotMessage: 'اكتملت جلسة التدريب. يمكنك الاستماع والتدرب متى شئت.',
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
    _clearSession();
    state = TalaqqiState(
      surah: _surah,
      totalAyahs: _contentLoaded ? state.totalAyahs : 0,
      ayahTexts: _contentLoaded ? state.ayahTexts : const [],
      isContentLoading: !_contentLoaded,
      sourceAudioAvailability: _contentLoaded
          ? state.sourceAudioAvailability
          : SourceAudioAvailability.loading,
    );
  }

  void _beginSessionIfNeeded() {
    if (_sessionId != null) return;
    final startedAt = DateTime.now().toUtc();
    _sessionStartedAt = startedAt;
    _sessionStartAyah = state.currentAyah;
    _sessionAttemptCount = 0;
    _sessionId = 'talaqqi-${startedAt.microsecondsSinceEpoch}-${state.surah}';
  }

  Future<void> _persistCompletedSession() async {
    final id = _sessionId;
    final startedAt = _sessionStartedAt;
    final childProfileId = profileId;
    final sink = sessionSink;
    if (id == null ||
        startedAt == null ||
        childProfileId == null ||
        sink == null) {
      _clearSession();
      return;
    }

    final endedAt = DateTime.now().toUtc();
    try {
      await sink.logPracticeSession(
        PracticeSession(
          id: id,
          profileId: childProfileId,
          surah: state.surah,
          ayahStart: _sessionStartAyah,
          ayahEnd: state.totalAyahs,
          durationSeconds: endedAt.difference(startedAt).inSeconds,
          attemptCount: _sessionAttemptCount,
          startedAt: startedAt,
          endedAt: endedAt,
        ),
      );
    } finally {
      _clearSession();
    }
  }

  void _clearSession() {
    _sessionId = null;
    _sessionStartedAt = null;
    _sessionStartAyah = 1;
    _sessionAttemptCount = 0;
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

  @override
  void dispose() {
    _progressTimer?.cancel();
    super.dispose();
  }
}
