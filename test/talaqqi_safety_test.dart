import 'package:faras_quran_ai/features/gamification/gamification_controller.dart';
import 'package:faras_quran_ai/features/journey_map/domain/journey_state.dart';
import 'package:faras_quran_ai/features/recitation/domain/talaqqi_state.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('a new practice state never synthesizes a score', () {
    const state = TalaqqiState();

    expect(state.lastScore, isNull);
    expect(state.verificationStatus, VerificationStatus.notRequested);
    expect(state.hasRecording, isFalse);
  });

  test('self-review needs a recorded file and a positive duration', () {
    const initial = TalaqqiState();

    final missingDuration = initial.copyWith(recordingPath: '/tmp/ayah.wav');
    final ready = initial.copyWith(
      recordingPath: '/tmp/ayah.wav',
      recordingDurationMs: 7000,
      verificationStatus: VerificationStatus.selfReview,
    );

    expect(missingDuration.hasRecording, isFalse);
    expect(ready.hasRecording, isTrue);
    expect(ready.lastScore, isNull);
  });

  test('a level only changes after an explicit trusted confirmation', () {
    const active = JourneyLevel(
      id: 'practice-1',
      title: 'Practice 1',
      subtitle: 'Ayah 1',
      surah: 1,
      ayahStart: 1,
      ayahEnd: 1,
      status: LevelStatus.active,
      iconType: IconType.mic,
    );
    const locked = JourneyLevel(
      id: 'practice-2',
      title: 'Practice 2',
      subtitle: 'Ayah 2',
      surah: 1,
      ayahStart: 2,
      ayahEnd: 2,
      status: LevelStatus.locked,
      iconType: IconType.lock,
    );
    final controller = GamificationController(
      const GamificationState(levels: [active, locked]),
    );

    expect(controller.state.activeLevel?.id, active.id);
    expect(controller.completeCurrentLevelAfterTrustedConfirmation(), isTrue);
    expect(controller.state.levels.first.status, LevelStatus.completed);
    expect(controller.state.levels.last.status, LevelStatus.active);
    expect(controller.state.totalPoints, 150);

    controller.dispose();
  });
}
