import 'package:flutter_riverpod/flutter_riverpod.dart';

class DashboardState {
  final int totalMinutes;
  final double minutesChangePercent;
  final double tajweedAccuracy;
  final String accuracyNote;
  final List<FocusSurah> currentFocus;
  final List<double> weeklyMinutes;
  final List<double> weeklyGoals;
  final List<String> weekDays;
  final List<GentleReminder> reminders;

  const DashboardState({
    required this.totalMinutes,
    required this.minutesChangePercent,
    required this.tajweedAccuracy,
    required this.accuracyNote,
    required this.currentFocus,
    required this.weeklyMinutes,
    required this.weeklyGoals,
    required this.weekDays,
    required this.reminders,
  });
}

class FocusSurah {
  final String name;
  final String tag; // e.g. "Ayah 1-5" or "Review"

  const FocusSurah({required this.name, required this.tag});
}

class GentleReminder {
  final String title;
  final String body;
  final String? actionLabel;

  const GentleReminder({
    required this.title,
    required this.body,
    this.actionLabel,
  });
}

// ponytail: mock data, replaced by Supabase aggregation queries
final dashboardProvider = Provider<DashboardState>((ref) {
  return const DashboardState(
    totalMinutes: 450,
    minutesChangePercent: 15.0,
    tajweedAccuracy: 88.0,
    accuracyNote: 'Excellent pronunciation on Ghunnah rules.',
    currentFocus: [
      FocusSurah(name: 'Surah Al-Mulk', tag: 'Ayah 1-5'),
      FocusSurah(name: 'Surah Al-Qalam', tag: 'Review'),
    ],
    weeklyMinutes: [35, 42, 28, 55, 40],
    weeklyGoals: [40, 40, 40, 40, 40],
    weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    reminders: [
      GentleReminder(
        title: 'Madd Stretching (Al-Fatihah, Ayah 2)',
        body:
            "Slightly rushed the 'Alamin' stretch. We'll practice holding it for two counts next time.",
        actionLabel: 'Listen to practice clip',
      ),
      GentleReminder(
        title: 'Qalqalah (Al-Ikhlas, Ayah 3)',
        body:
            "The bounce on 'Yalid' was a bit soft. A gentle reminder helps bring out the letter's character.",
      ),
    ],
  );
});
