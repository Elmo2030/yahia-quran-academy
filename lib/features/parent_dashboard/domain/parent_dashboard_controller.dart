import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../shared/models/practice_session_record.dart';
import '../../auth/data/auth_repository.dart';
import '../../recitation/data/memorization_repository.dart';
import 'dashboard_state.dart';

/// Parent activity dashboard derived exclusively from child self-review sessions.
/// It does not compute or present automatic tajweed accuracy or mastery.
final dashboardDataProvider =
    FutureProvider.autoDispose<DashboardState>((ref) async {
  final authRepo = ref.watch(authRepositoryProvider);
  final practiceRepo = ref.watch(memorizationRepositoryProvider);
  final children = await authRepo.fetchChildProfiles();
  if (children.isEmpty) return _emptyDashboard;

  final now = DateTime.now().toUtc();
  final currentWeekStart = _startOfWeek(now);
  final previousWeekStart = currentWeekStart.subtract(const Duration(days: 7));
  final childIds = children.map((child) => child.id).toList();
  final sessions = await practiceRepo.fetchChildrenPracticeSessions(
    childProfileIds: childIds,
    since: previousWeekStart,
  );

  final thisWeek = sessions
      .where((session) => !session.startedAt.toUtc().isBefore(currentWeekStart))
      .toList();
  final previousWeek = sessions
      .where(
        (session) =>
            !session.startedAt.toUtc().isBefore(previousWeekStart) &&
            session.startedAt.toUtc().isBefore(currentWeekStart),
      )
      .toList();

  final thisWeekMinutes = _minutes(thisWeek);
  final previousWeekMinutes = _minutes(previousWeek);
  final changePercent = previousWeekMinutes == 0
      ? 0.0
      : ((thisWeekMinutes - previousWeekMinutes) / previousWeekMinutes) * 100;

  const weekDays = [
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
    'الأحد',
  ];
  final weeklyMinutes = List<double>.generate(7, (index) {
    final start = currentWeekStart.add(Duration(days: index));
    final end = start.add(const Duration(days: 1));
    return _minutes(
      thisWeek.where(
        (session) =>
            !session.startedAt.toUtc().isBefore(start) &&
            session.startedAt.toUtc().isBefore(end),
      ),
    ).toDouble();
  });

  return DashboardState(
    totalMinutes: thisWeekMinutes,
    minutesChangePercent: changePercent,
    sessionCount: thisWeek.length,
    totalAttempts: thisWeek.fold<int>(
      0,
      (total, session) => total + session.attemptCount,
    ),
    currentFocus: _focusSurahs(thisWeek),
    weeklyMinutes: weeklyMinutes,
    weekDays: weekDays,
    recentPractice: _highlights(thisWeek),
  );
});

DateTime _startOfWeek(DateTime time) {
  final localMondayOffset = time.weekday - DateTime.monday;
  return DateTime.utc(time.year, time.month, time.day)
      .subtract(Duration(days: localMondayOffset));
}

int _minutes(Iterable<PracticeSessionRecord> sessions) {
  final seconds = sessions.fold<int>(
    0,
    (total, session) => total + session.durationSeconds,
  );
  return (seconds / 60).round();
}

List<FocusSurah> _focusSurahs(List<PracticeSessionRecord> sessions) {
  final bySurah = <int, List<PracticeSessionRecord>>{};
  for (final session in sessions) {
    bySurah.putIfAbsent(session.surah, () => []).add(session);
  }
  final entries = bySurah.entries.toList()
    ..sort((a, b) => b.value.length.compareTo(a.value.length));

  return entries.take(3).map((entry) {
    final ayahStart = entry.value.map((session) => session.ayahStart).reduce(
          (a, b) => a < b ? a : b,
        );
    final ayahEnd = entry.value.map((session) => session.ayahEnd).reduce(
          (a, b) => a > b ? a : b,
        );
    return FocusSurah(
      name: 'سورة ${entry.key}',
      tag: 'الآيات $ayahStart–$ayahEnd · ${entry.value.length} جلسات',
    );
  }).toList();
}

List<PracticeHighlight> _highlights(List<PracticeSessionRecord> sessions) {
  final ordered = [...sessions]
    ..sort((a, b) => b.startedAt.compareTo(a.startedAt));
  return ordered.take(3).map((session) {
    final minutes = (session.durationSeconds / 60).ceil();
    return PracticeHighlight(
      title:
          'سورة ${session.surah} · الآيات ${session.ayahStart}–${session.ayahEnd}',
      body:
          '$minutes دقيقة تدريب و${session.attemptCount} محاولات مسجلة في مراجعة ذاتية.',
    );
  }).toList();
}

const _emptyDashboard = DashboardState(
  totalMinutes: 0,
  minutesChangePercent: 0,
  sessionCount: 0,
  totalAttempts: 0,
  currentFocus: [],
  weeklyMinutes: [0, 0, 0, 0, 0, 0, 0],
  weekDays: [
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
    'الأحد',
  ],
  recentPractice: [],
);
