import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../auth/data/auth_repository.dart';
import '../../recitation/data/memorization_repository.dart';
import '../../../shared/models/practice_session_record.dart';

/// Honest activity summary for the child journey.
///
/// It intentionally measures practice time, completed self-review sessions,
/// and attempts. None of these metrics is presented as mastery or a score.
class ChildPracticeSummary {
  final List<PracticeSessionRecord> recentSessions;
  final int totalPracticeMinutes;
  final int totalAttempts;
  final bool hasActiveLearner;

  const ChildPracticeSummary({
    required this.recentSessions,
    required this.totalPracticeMinutes,
    required this.totalAttempts,
    required this.hasActiveLearner,
  });

  bool get hasSessions => recentSessions.isNotEmpty;
}

final childPracticeSummaryProvider =
    FutureProvider.autoDispose<ChildPracticeSummary>((ref) async {
  final profile = ref.watch(activeLearnerProfileProvider);
  if (profile == null) {
    return const ChildPracticeSummary(
      recentSessions: [],
      totalPracticeMinutes: 0,
      totalAttempts: 0,
      hasActiveLearner: false,
    );
  }

  final sessions = await ref
      .watch(memorizationRepositoryProvider)
      .fetchPracticeSessions(profileId: profile.id, limit: 50);
  final totalSeconds = sessions.fold<int>(
    0,
    (sum, session) => sum + session.durationSeconds,
  );
  final totalAttempts = sessions.fold<int>(
    0,
    (sum, session) => sum + session.attemptCount,
  );

  return ChildPracticeSummary(
    recentSessions: sessions,
    totalPracticeMinutes: (totalSeconds / 60).round(),
    totalAttempts: totalAttempts,
    hasActiveLearner: true,
  );
});

/// Legacy presentation types retained only while the unused visual card is
/// removed in a later cleanup. No active provider populates them and the child
/// journey no longer treats them as progress, points, or unlocking decisions.
@Deprecated('The activity-based child journey does not use levels.')
enum LevelStatus { locked, active, completed }

@Deprecated('The activity-based child journey does not use level icons.')
enum IconType { mic, book, star, lock }

@Deprecated('The activity-based child journey does not use levels.')
class JourneyLevel {
  final String id;
  final String title;
  final String subtitle;
  final int surah;
  final int ayahStart;
  final int ayahEnd;
  final LevelStatus status;
  final IconType iconType;
  final double progress;

  const JourneyLevel({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.surah,
    required this.ayahStart,
    required this.ayahEnd,
    required this.status,
    required this.iconType,
    this.progress = 0,
  });
}
