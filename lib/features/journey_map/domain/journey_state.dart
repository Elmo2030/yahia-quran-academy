import 'package:flutter_riverpod/flutter_riverpod.dart';

enum LevelStatus { locked, active, completed }

class JourneyLevel {
  final String id;
  final String title;
  final String subtitle;
  final int surah;
  final int ayahStart;
  final int ayahEnd;
  final LevelStatus status;
  final IconType iconType;
  final double progress; // 0.0–1.0 for completed levels

  const JourneyLevel({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.surah,
    required this.ayahStart,
    required this.ayahEnd,
    required this.status,
    required this.iconType,
    this.progress = 0.0,
  });
}

enum IconType { mic, book, star, lock }

class JourneyState {
  final List<JourneyLevel> levels;
  final int totalPoints;

  const JourneyState({required this.levels, this.totalPoints = 0});
}

// ponytail: mock data, replaced by Supabase queries on memorization_logs
final journeyProvider = Provider<JourneyState>((ref) {
  return const JourneyState(
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
  );
});
