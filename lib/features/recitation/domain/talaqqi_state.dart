/// The five phases of the Talaqqi call-and-response loop.
/// Each phase drives the UI: visualizer color, mic button state, mascot text.
enum TalaqqiPhase {
  idle,
  sheikhPlaying,
  childRecording,
  analyzing,
  success,
  error,
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

  /// Last AI evaluation score (0–100), null if no evaluation yet.
  final double? lastScore;

  const TalaqqiState({
    this.phase = TalaqqiPhase.idle,
    this.currentAyah = 1,
    this.totalAyahs = 7,
    this.phaseProgress = 0.0,
    this.mascotMessage = '',
    this.ayahTexts = const [],
    this.lastScore,
  });

  TalaqqiState copyWith({
    TalaqqiPhase? phase,
    int? currentAyah,
    int? totalAyahs,
    double? phaseProgress,
    String? mascotMessage,
    List<String>? ayahTexts,
    double? lastScore,
  }) =>
      TalaqqiState(
        phase: phase ?? this.phase,
        currentAyah: currentAyah ?? this.currentAyah,
        totalAyahs: totalAyahs ?? this.totalAyahs,
        phaseProgress: phaseProgress ?? this.phaseProgress,
        mascotMessage: mascotMessage ?? this.mascotMessage,
        ayahTexts: ayahTexts ?? this.ayahTexts,
        lastScore: lastScore ?? this.lastScore,
      );

  bool get isActive =>
      phase == TalaqqiPhase.sheikhPlaying ||
      phase == TalaqqiPhase.childRecording ||
      phase == TalaqqiPhase.analyzing;
}
