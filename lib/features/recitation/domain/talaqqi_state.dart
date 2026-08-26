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

class TalaqqiState {
  final TalaqqiPhase phase;
  final int currentAyah;
  final int totalAyahs;

  /// 0.0–1.0 progress within the current phase (drives visualizer amplitude).
  final double phaseProgress;

  /// Feedback message shown near the mascot.
  final String mascotMessage;

  /// Arabic text for each ayah, populated from Supabase metadata.
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
    this.totalAyahs = 7,
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
    double? phaseProgress,
    String? mascotMessage,
    List<String>? ayahTexts,
    double? lastScore,
    VerificationStatus? verificationStatus,
    String? recordingPath,
    int? recordingDurationMs,
    int? attemptCount,
  }) => TalaqqiState(
    phase: phase ?? this.phase,
    currentAyah: currentAyah ?? this.currentAyah,
    totalAyahs: totalAyahs ?? this.totalAyahs,
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
}
