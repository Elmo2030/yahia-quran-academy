import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/audio/audio_player_service.dart';
import '../../../core/audio/audio_recording_service.dart';
import '../../../shared/models/practice_session.dart';
import '../../auth/data/auth_repository.dart';
import '../data/audio_asset_repository.dart';
import '../data/memorization_repository.dart';
import '../data/quran_content_repository.dart';
import '../data/recording_repository.dart';
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
  final profile = ref.watch(activeLearnerProfileProvider);
  return TalaqqiController(
    player: ref.watch(audioPlayerServiceProvider),
    recorder: ref.watch(audioRecordingServiceProvider),
    quranContent: ref.watch(quranContentRepositoryProvider),
    audioAssets: ref.watch(audioAssetRepositoryProvider),
    sessionSink: ref.watch(memorizationRepositoryProvider),
    recordingStore: ref.watch(recordingStoreProvider),
    profileId: profile?.id,
  );
});

/// A safe practice loop: listen → repeat → record → review.
///
/// It never contacts the AI evaluator or creates an automatic pass/fail verdict.
/// Segment practice is unavailable until both a production playback URL and
/// trusted ayah timings are present in the audio manifest.
class TalaqqiController extends StateNotifier<TalaqqiState> {
  final AudioPlayback player;
  final AudioRecording recorder;
  final QuranContentRepository quranContent;
  final AudioAssetRepository audioAssets;
  final PracticeSessionSink? sessionSink;
  final RecordingStore? recordingStore;
  final String? profileId;
  final int _surah;
  Timer? _progressTimer;
  StreamSubscription<Duration>? _positionSubscription;
  StreamSubscription<bool>? _playingSubscription;

  AudioAsset? _audioAsset;
  VerifiedSurahTiming? _verifiedTiming;
  List<AyahSegment> _segments = [];
  RecitationId _recitationId;
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
    this.recordingStore,
    this.profileId,
    int surah = 1,
    RecitationId recitationId = defaultRecitationId,
  })  : _surah = surah,
        _recitationId = recitationId,
        super(TalaqqiState(surah: surah, recitationId: recitationId)) {
    _positionSubscription = player.positionStream.listen(_onPlaybackPosition);
    _playingSubscription = player.playingStream.listen(_onPlayingChanged);
    unawaited(_ensurePracticeContentLoaded());
  }

  AyahSegment get _currentSegment =>
      _segments[(state.currentAyah - 1).clamp(0, _segments.length - 1)];

  Future<bool> _ensurePracticeContentLoaded() async {
    if (_contentLoaded) return state.hasTextContent;

    try {
      final results = await Future.wait([
        quranContent.getSurah(_surah),
        audioAssets.getForSurah(_surah, recitationId: _recitationId),
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
        recitationId: _recitationId,
        isWholeSurahPlaying: false,
        clearActiveTiming: true,
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

    final audioAsset = _audioAsset;
    if (audioAsset == null || !audioAsset.supportsAyahSegments) {
      return false;
    }

    try {
      final timing = await audioAssets.loadVerifiedTiming(
        state.surah,
        recitationId: audioAsset.recitationId,
      );
      if (timing == null) return false;
      _verifiedTiming = timing;
      final segments = timing.ayahs
          .map(
            (segment) => AyahSegment(
              surah: segment.surah,
              ayahNumber: segment.ayahNumber,
              startMs: segment.startMs,
              endMs: segment.endMs,
            ),
          )
          .toList()
        ..sort((a, b) => a.ayahNumber.compareTo(b.ayahNumber));

      _segments = segments;
      _segmentsLoaded = true;
      return _segments.isNotEmpty;
    } catch (_) {
      return false;
    }
  }

  Future<void> selectRecitation(RecitationId recitationId) async {
    if (_recitationId == recitationId) return;
    _progressTimer?.cancel();
    await player.stopAndReset();
    _recitationId = recitationId;
    _audioAsset = null;
    _verifiedTiming = null;
    _segments = [];
    _segmentsLoaded = false;
    _contentLoaded = false;
    if (!mounted) return;
    state = TalaqqiState(surah: _surah, recitationId: recitationId);
    await _ensurePracticeContentLoaded();
  }

  void _onPlaybackPosition(Duration position) {
    if (!mounted || !state.isWholeSurahPlaying || _verifiedTiming == null) {
      return;
    }
    final active = _verifiedTiming!.activeAt(position);
    state = state.copyWith(
      activeTimedAyah: active?.ayahNumber,
      activeTimedWord: active?.wordNumber,
      clearActiveTiming: active == null,
    );
  }

  void _onPlayingChanged(bool isPlaying) {
    if (!mounted || isPlaying || !state.isWholeSurahPlaying) return;
    state = state.copyWith(
      isWholeSurahPlaying: false,
      clearActiveTiming: true,
    );
  }

  /// Starts one child-led practice attempt for the current ayah.
  Future<void> startTalaqqiSession() async {
    if (state.isActive || state.phase == TalaqqiPhase.selfReview) return;
    if (state.isWholeSurahPlaying) {
      await pauseWholeSurah();
    }
    if (!await _ensurePracticeContentLoaded()) {
      _setError('تعذّر تحميل محتوى التدريب. تحقق من اتصالك ثم حاول مجددًا.');
      return;
    }
    if (state.sourceAudioAvailability != SourceAudioAvailability.ayahSegments ||
        !await _ensureSegmentsLoaded() ||
        _segments.length != state.totalAyahs) {
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
      final recordedPath = await recorder.stopRecording() ?? recordingPath;
      var savedPath = recordedPath;
      if (profileId != null && recordingStore != null) {
        final stored = await recordingStore!.save(
          profileId: profileId!,
          surah: state.surah,
          ayah: state.currentAyah,
          sourcePath: recordedPath,
          durationMs: recordDuration.inMilliseconds,
        );
        savedPath = stored.filePath;
      }
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
      if (_audioAsset?.supportsAyahSegments == true &&
          !await _ensureSegmentsLoaded()) {
        _setError('تعذّر التحقق من توقيتات التلاوة لهذه السورة.');
        return;
      }
      await player.load(playbackUri.toString());
      await player.playWhole();
      if (mounted) {
        state = state.copyWith(
          phase: TalaqqiPhase.idle,
          isWholeSurahPlaying: true,
          clearActiveTiming: true,
          mascotMessage: switch (_recitationId) {
            RecitationId.husaryMuallimTimed =>
              'استمع إلى الشيخ؛ يضيء النص وفق التوقيتات المتحققة.',
            RecitationId.minshawiMuallimKidsTimed =>
              'تلاوة المنشاوي مع الأطفال تعمل الآن؛ لا يظهر تمييز داخل فجوات المصدر المعلنة.',
            RecitationId.husaryMuallimChildren =>
              'يعمل الآن مصحف الحُصَري المعلّم مع الأطفال؛ لا تظهر مزامنة زمنية.',
          },
        );
      }
    } catch (_) {
      _setError('تعذّر تشغيل السورة كاملة. حاول مرة أخرى.');
    }
  }

  Future<void> pauseWholeSurah() async {
    await player.pause();
    if (!mounted) return;
    state = state.copyWith(
      isWholeSurahPlaying: false,
      clearActiveTiming: true,
      mascotMessage: 'توقفت التلاوة. يمكنك المتابعة أو اختيار مصحف آخر.',
    );
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
    // The recorder cleans its temporary source. A durable recording is kept by
    // RecordingStore and replaced only when this ayah is recorded again.
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
    // Only the recorder's temporary source is discarded here. The parent copy
    // saved in RecordingStore remains available for playback and review.
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
      recitationId: _recitationId,
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
      isWholeSurahPlaying: false,
      clearActiveTiming: true,
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
    _positionSubscription?.cancel();
    _playingSubscription?.cancel();
    super.dispose();
  }
}
