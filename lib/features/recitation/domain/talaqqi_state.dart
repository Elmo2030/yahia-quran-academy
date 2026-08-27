import '../data/audio_asset_repository.dart';

/// The child-facing stages of one Talaqqi practice loop.
enum TalaqqiPhase {
  idle,
  sheikhPlaying,
  childRecording,
  analyzing,
  selfReview,
  success,
  error,
}

/// Describes whether an automated recitation verdict may be trusted.
///
/// The current learning loop only uses [selfReview]. The remaining states
/// reserve a safe contract for a future model that has passed its confidence gate.
enum VerificationStatus {
  notRequested,
  selfReview,
  unavailable,
  uncertain,
  verified,
}

/// What the active source audio can truthfully support.
enum SourceAudioAvailability {
  loading,
  unavailable,
  wholeSurahOnly,
  ayahSegments,
}

/// Chooses the ayah a reader surface may display while full-surah audio runs.
///
/// Children audio deliberately keeps the practice ayah, even if a stale timing
/// value is supplied. It has no verified timing contract.
int displayedAyahNumber({
  required RecitationId recitationId,
  required int practiceAyah,
  int? activeTimedAyah,
}) {
  if (recitationId == RecitationId.husaryMuallimTimed &&
      activeTimedAyah != null) {
    return activeTimedAyah;
  }
  return practiceAyah;
}

class TalaqqiState {
  final TalaqqiPhase phase;
  final int currentAyah;
  final int totalAyahs;
  final int surah;
  final bool isContentLoading;
  final String contentError;
  final SourceAudioAvailability sourceAudioAvailability;
  final RecitationId recitationId;
  final int? activeTimedAyah;
  final int? activeTimedWord;
  final bool isWholeSurahPlaying;

  /// 0.0–1.0 progress within the current phase (drives visualizer amplitude).
  final double phaseProgress;

  /// Feedback message shown near the mascot.
  final String mascotMessage;

  /// Arabic text from the pinned Tanzil Uthmani corpus.
  final List<String> ayahTexts;

  /// Kept for a future verified evaluator. Never synthesized by the practice loop.
  final double? lastScore;
  final VerificationStatus verificationStatus;
  final String recordingPath;
  final int recordingDurationMs;
  final int attemptCount;

  const TalaqqiState({
    this.phase = TalaqqiPhase.idle,
    this.currentAyah = 1,
    this.totalAyahs = 0,
    this.surah = 1,
    this.isContentLoading = true,
    this.contentError = '',
    this.sourceAudioAvailability = SourceAudioAvailability.loading,
    this.recitationId = defaultRecitationId,
    this.activeTimedAyah,
    this.activeTimedWord,
    this.isWholeSurahPlaying = false,
    this.phaseProgress = 0.0,
    this.mascotMessage = '',
    this.ayahTexts = const [],
    this.lastScore,
    this.verificationStatus = VerificationStatus.notRequested,
    this.recordingPath = '',
    this.recordingDurationMs = 0,
    this.attemptCount = 0,
  });

  TalaqqiState copyWith({
    TalaqqiPhase? phase,
    int? currentAyah,
    int? totalAyahs,
    int? surah,
    bool? isContentLoading,
    String? contentError,
    SourceAudioAvailability? sourceAudioAvailability,
    RecitationId? recitationId,
    int? activeTimedAyah,
    int? activeTimedWord,
    bool clearActiveTiming = false,
    bool? isWholeSurahPlaying,
    double? phaseProgress,
    String? mascotMessage,
    List<String>? ayahTexts,
    double? lastScore,
    VerificationStatus? verificationStatus,
    String? recordingPath,
    int? recordingDurationMs,
    int? attemptCount,
  }) =>
      TalaqqiState(
        phase: phase ?? this.phase,
        currentAyah: currentAyah ?? this.currentAyah,
        totalAyahs: totalAyahs ?? this.totalAyahs,
        surah: surah ?? this.surah,
        isContentLoading: isContentLoading ?? this.isContentLoading,
        contentError: contentError ?? this.contentError,
        sourceAudioAvailability:
            sourceAudioAvailability ?? this.sourceAudioAvailability,
        recitationId: recitationId ?? this.recitationId,
        activeTimedAyah:
            clearActiveTiming ? null : activeTimedAyah ?? this.activeTimedAyah,
        activeTimedWord:
            clearActiveTiming ? null : activeTimedWord ?? this.activeTimedWord,
        isWholeSurahPlaying: isWholeSurahPlaying ?? this.isWholeSurahPlaying,
        phaseProgress: phaseProgress ?? this.phaseProgress,
        mascotMessage: mascotMessage ?? this.mascotMessage,
        ayahTexts: ayahTexts ?? this.ayahTexts,
        lastScore: lastScore ?? this.lastScore,
        verificationStatus: verificationStatus ?? this.verificationStatus,
        recordingPath: recordingPath ?? this.recordingPath,
        recordingDurationMs: recordingDurationMs ?? this.recordingDurationMs,
        attemptCount: attemptCount ?? this.attemptCount,
      );

  bool get isActive =>
      phase == TalaqqiPhase.sheikhPlaying ||
      phase == TalaqqiPhase.childRecording ||
      phase == TalaqqiPhase.analyzing;

  bool get hasRecording => recordingPath.isNotEmpty && recordingDurationMs > 0;
  bool get hasTextContent => totalAyahs > 0 && ayahTexts.length == totalAyahs;
  bool get canPlayAyahSegments =>
      sourceAudioAvailability == SourceAudioAvailability.ayahSegments;
  bool get canPlayWholeSurah =>
      sourceAudioAvailability == SourceAudioAvailability.wholeSurahOnly ||
      sourceAudioAvailability == SourceAudioAvailability.ayahSegments;
}
