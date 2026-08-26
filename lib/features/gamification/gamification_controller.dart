import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../journey_map/domain/journey_state.dart';

/// Points awarded per completed level.
const _pointsPerLevel = 150;

/// Gamification state — wraps JourneyState with mutation support.
class GamificationState {
  final List<JourneyLevel> levels;
  final int totalPoints;
  // ponytail: set after processScore, read by UI to trigger reward dialog
  final String? justCompletedLevelId;

  const GamificationState({
    required this.levels,
    this.totalPoints = 0,
    this.justCompletedLevelId,
  });

  GamificationState copyWith({
    List<JourneyLevel>? levels,
    int? totalPoints,
    String? justCompletedLevelId,
  }) =>
      GamificationState(
        levels: levels ?? this.levels,
        totalPoints: totalPoints ?? this.totalPoints,
        justCompletedLevelId: justCompletedLevelId,
      );

  /// The currently active level, or null if all completed.
  JourneyLevel? get activeLevel {
    for (final l in levels) {
      if (l.status == LevelStatus.active) return l;
    }
    return null;
  }
}

class GamificationController extends StateNotifier<GamificationState> {
  GamificationController(super.initial);

  /// Completes the active level only after an explicit trusted confirmation.
  ///
  /// The child practice loop must not call this method. A future parent review
  /// action or an evaluator that has passed its confidence gate may do so.
  bool completeCurrentLevelAfterTrustedConfirmation() {
    final active = state.activeLevel;
    if (active == null) return false;

    final updated = <JourneyLevel>[];
    bool nextUnlocked = false;

    for (final level in state.levels) {
      if (level.id == active.id) {
        // Mark active → completed
        updated.add(
          JourneyLevel(
            id: level.id,
            title: level.title,
            subtitle: level.subtitle,
            surah: level.surah,
            ayahStart: level.ayahStart,
            ayahEnd: level.ayahEnd,
            status: LevelStatus.completed,
            iconType: IconType.star,
            progress: 1.0,
          ),
        );
      } else if (!nextUnlocked && level.status == LevelStatus.locked) {
        // Unlock the next locked level
        updated.add(
          JourneyLevel(
            id: level.id,
            title: level.title,
            subtitle: level.subtitle,
            surah: level.surah,
            ayahStart: level.ayahStart,
            ayahEnd: level.ayahEnd,
            status: LevelStatus.active,
            iconType: IconType.mic,
            progress: 0.0,
          ),
        );
        nextUnlocked = true;
      } else {
        updated.add(level);
      }
    }

    state = state.copyWith(
      levels: updated,
      totalPoints: state.totalPoints + _pointsPerLevel,
      justCompletedLevelId: active.id,
    );
    return true;
  }

  /// Clear the "just completed" flag after reward dialog is shown.
  void clearRewardFlag() {
    state = state.copyWith(justCompletedLevelId: null);
  }
}

/// Seed with the same mock data from journeyProvider, but mutable.
final gamificationProvider =
    StateNotifierProvider<GamificationController, GamificationState>((ref) {
  // ponytail: initial data mirrors journey_state.dart mock; replace with Supabase fetch
  return GamificationController(
    const GamificationState(
      totalPoints: 1250,
      levels: [
        JourneyLevel(
          id: 'l5',
          title: 'Al-Fatihah 5-7',
          subtitle: 'Ayah 5–7',
          surah: 1,
          ayahStart: 5,
          ayahEnd: 7,
          status: LevelStatus.locked,
          iconType: IconType.lock,
        ),
        JourneyLevel(
          id: 'l4',
          title: 'Al-Fatihah 4',
          subtitle: 'Ayah 4',
          surah: 1,
          ayahStart: 4,
          ayahEnd: 4,
          status: LevelStatus.active,
          iconType: IconType.mic,
        ),
        JourneyLevel(
          id: 'l3',
          title: 'Al-Fatihah 3',
          subtitle: 'Ayah 3',
          surah: 1,
          ayahStart: 3,
          ayahEnd: 3,
          status: LevelStatus.completed,
          iconType: IconType.book,
          progress: 1.0,
        ),
        JourneyLevel(
          id: 'l2',
          title: 'Al-Fatihah 1-2',
          subtitle: 'Ayah 1–2',
          surah: 1,
          ayahStart: 1,
          ayahEnd: 2,
          status: LevelStatus.completed,
          iconType: IconType.star,
          progress: 1.0,
        ),
      ],
    ),
  );
});
