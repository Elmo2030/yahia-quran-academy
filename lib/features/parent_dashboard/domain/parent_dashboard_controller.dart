import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../auth/data/auth_repository.dart';
import '../../recitation/data/memorization_repository.dart';
import '../domain/dashboard_state.dart';

/// Live dashboard data fetched from Supabase.
/// Invalidated by TalaqqiController after each session log.
final dashboardDataProvider = FutureProvider.autoDispose<DashboardState>((ref) async {
  final authRepo = ref.watch(authRepositoryProvider);
  final memRepo = ref.watch(memorizationRepositoryProvider);

  final children = await authRepo.fetchChildProfiles();
  if (children.isEmpty) {
    return _emptyDashboard;
  }

  final childIds = children.map((c) => c.id).toList();
  final now = DateTime.now();
  final weekStart = now.subtract(Duration(days: now.weekday - 1));
  final lastWeekStart = weekStart.subtract(const Duration(days: 7));

  // Fetch this week's and last week's data in parallel
  final results = await Future.wait([
    memRepo.totalMinutesSince(profileIds: childIds, since: weekStart),
    memRepo.totalMinutesSince(profileIds: childIds, since: lastWeekStart),
    memRepo.averageScoreSince(profileIds: childIds, since: weekStart),
    memRepo.fetchChildrenLogs(childProfileIds: childIds, since: weekStart),
  ]);

  final thisWeekMinutes = results[0] as int;
  final lastTwoWeeksMinutes = results[1] as int;
  final avgScore = results[2] as double;
  final logs = results[3] as List;

  // Calculate week-over-week change
  final lastWeekMinutes = lastTwoWeeksMinutes - thisWeekMinutes;
  final changePercent = lastWeekMinutes > 0
      ? ((thisWeekMinutes - lastWeekMinutes) / lastWeekMinutes * 100)
      : 0.0;

  // Build daily minutes for the chart (Mon–Fri)
  final weeklyMinutes = List.generate(5, (dayIndex) {
    final dayStart = weekStart.add(Duration(days: dayIndex));
    final dayEnd = dayStart.add(const Duration(days: 1));
    return logs
        .where((log) {
          final started = (log as dynamic).startedAt as DateTime;
          return started.isAfter(dayStart) && started.isBefore(dayEnd);
        })
        .fold<double>(
          0,
          (sum, log) => sum + (log as dynamic).durationSeconds / 60.0,
        );
  });

  // ponytail: goals are static for now, make configurable later
  const dailyGoal = 40.0;

  // Extract recent mistakes for gentle reminders
  final allMistakes = <GentleReminder>[];
  for (final log in logs.take(10)) {
    final mistakes = (log as dynamic).mistakes as List<Map<String, dynamic>>?;
    if (mistakes == null) continue;
    for (final m in mistakes) {
      allMistakes.add(GentleReminder(
        title: '${m['type']} (Ayah ${m['ayah']})',
        body: 'Severity: ${m['severity']}. A gentle reminder to practice this rule.',
        actionLabel: m['severity'] == 'minor' ? null : 'Listen to practice clip',
      ));
    }
  }

  return DashboardState(
    totalMinutes: thisWeekMinutes,
    minutesChangePercent: changePercent,
    tajweedAccuracy: avgScore,
    accuracyNote: _accuracyNote(avgScore),
    currentFocus: const [
      FocusSurah(name: 'Surah Al-Mulk', tag: 'Ayah 1-5'),
      FocusSurah(name: 'Surah Al-Qalam', tag: 'Review'),
    ],
    weeklyMinutes: weeklyMinutes,
    weeklyGoals: List.filled(5, dailyGoal),
    weekDays: const ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    reminders: allMistakes.take(3).toList(),
  );
});

String _accuracyNote(double score) {
  if (score >= 90) return 'Outstanding Tajweed mastery!';
  if (score >= 80) return 'Excellent pronunciation on Ghunnah rules.';
  if (score >= 70) return 'Good progress — keep practicing the stretches.';
  return 'Building foundations — consistency is key!';
}

const _emptyDashboard = DashboardState(
  totalMinutes: 0,
  minutesChangePercent: 0,
  tajweedAccuracy: 0,
  accuracyNote: 'No sessions yet. Start learning!',
  currentFocus: [],
  weeklyMinutes: [0, 0, 0, 0, 0],
  weeklyGoals: [40, 40, 40, 40, 40],
  weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  reminders: [],
);
