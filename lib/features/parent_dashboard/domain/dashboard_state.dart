class DashboardState {
  final int totalMinutes;
  final double minutesChangePercent;
  final int sessionCount;
  final int totalAttempts;
  final List<FocusSurah> currentFocus;
  final List<double> weeklyMinutes;
  final List<String> weekDays;
  final List<PracticeHighlight> recentPractice;

  const DashboardState({
    required this.totalMinutes,
    required this.minutesChangePercent,
    required this.sessionCount,
    required this.totalAttempts,
    required this.currentFocus,
    required this.weeklyMinutes,
    required this.weekDays,
    required this.recentPractice,
  });

  bool get hasPractice => sessionCount > 0;
}

class FocusSurah {
  final String name;
  final String tag;

  const FocusSurah({required this.name, required this.tag});
}

class PracticeHighlight {
  final String title;
  final String body;

  const PracticeHighlight({required this.title, required this.body});
}
