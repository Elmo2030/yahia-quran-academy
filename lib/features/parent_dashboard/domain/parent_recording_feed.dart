import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../auth/data/auth_repository.dart';
import '../../recitation/data/recording_repository.dart';
import '../../../shared/models/profile.dart';

class ParentRecordingItem {
  final Profile child;
  final StoredRecording recording;
  final ParentReview? latestReview;

  const ParentRecordingItem({
    required this.child,
    required this.recording,
    required this.latestReview,
  });
}

/// This feed is intentionally device-local. RecordingStore has no network
/// client, and the SyncEngine reads only LocalMemorizationLog session records.
final parentRecordingFeedProvider =
    FutureProvider.autoDispose<List<ParentRecordingItem>>((ref) async {
  final children = await ref.watch(childProfilesProvider.future);
  final recordingStore = ref.watch(recordingStoreProvider);
  final reviewStore = ref.watch(parentReviewStoreProvider);
  final perChild = await Future.wait(
    children.map((child) async {
      final recordings = await recordingStore.recentFor(profileId: child.id);
      return Future.wait(
        recordings.map(
          (recording) async => ParentRecordingItem(
            child: child,
            recording: recording,
            latestReview: await reviewStore.latestForRecording(recording.id),
          ),
        ),
      );
    }),
  );
  final items = perChild.expand((items) => items).toList()
    ..sort((a, b) => b.recording.recordedAt.compareTo(a.recording.recordedAt));
  return List.unmodifiable(items);
});
