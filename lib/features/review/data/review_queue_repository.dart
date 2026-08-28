import 'dart:convert';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart';

import '../../auth/data/auth_repository.dart';
import '../domain/review_schedule.dart';

final reviewQueueStoreProvider = Provider<ReviewQueueStore>(
  (ref) => LocalReviewQueueStore(),
);

class ReviewTarget {
  final String profileId;
  final int surah;
  final int ayah;

  const ReviewTarget({
    required this.profileId,
    required this.surah,
    required this.ayah,
  });
}

final reviewTargetProvider = StateProvider<ReviewTarget?>((ref) => null);

final dueReviewItemsProvider =
    FutureProvider.autoDispose<List<ReviewScheduleEntry>>(
  (ref) async {
    final profile = ref.watch(activeLearnerProfileProvider);
    if (profile == null) return [];
    return ref.watch(reviewQueueStoreProvider).dueFor(
          profileId: profile.id,
          now: DateTime.now().toUtc(),
        );
  },
);

abstract interface class ReviewQueueStore {
  Future<List<ReviewScheduleEntry>> allFor({required String profileId});
  Future<List<ReviewScheduleEntry>> dueFor({
    required String profileId,
    required DateTime now,
  });
  Future<void> enqueueSession({
    required String profileId,
    required int surah,
    required int ayahStart,
    required int ayahEnd,
    required DateTime eventAt,
  });
  Future<ReviewScheduleEntry?> find({
    required String profileId,
    required int surah,
    required int ayah,
  });
  Future<ReviewScheduleEntry?> applyVerdict({
    required String profileId,
    required int surah,
    required int ayah,
    required ReviewVerdict verdict,
    required DateTime eventAt,
  });
}

/// Device-local review schedule. It carries only metadata and dates; audio is
/// intentionally owned by RecordingStore and never enters this JSON file.
class LocalReviewQueueStore implements ReviewQueueStore {
  final Future<Directory> Function() _documentsDirectory;

  LocalReviewQueueStore({
    Future<Directory> Function()? documentsDirectory,
  }) : _documentsDirectory =
            documentsDirectory ?? getApplicationDocumentsDirectory;

  Future<File> get _file async {
    final documents = await _documentsDirectory();
    final directory = Directory(
      '${documents.path}${Platform.pathSeparator}yqa_recordings',
    );
    if (!await directory.exists()) await directory.create(recursive: true);
    return File(
      '${directory.path}${Platform.pathSeparator}review_schedule.json',
    );
  }

  @override
  Future<List<ReviewScheduleEntry>> allFor({required String profileId}) async {
    return (await _read())
        .where((entry) => entry.profileId == profileId)
        .toList()
      ..sort((a, b) => a.dueAt.compareTo(b.dueAt));
  }

  @override
  Future<List<ReviewScheduleEntry>> dueFor({
    required String profileId,
    required DateTime now,
  }) async {
    return dueReviews(await allFor(profileId: profileId), now: now);
  }

  @override
  Future<void> enqueueSession({
    required String profileId,
    required int surah,
    required int ayahStart,
    required int ayahEnd,
    required DateTime eventAt,
  }) async {
    if (profileId.isEmpty ||
        surah < 1 ||
        ayahStart < 1 ||
        ayahEnd < ayahStart) {
      throw ArgumentError('Invalid review session metadata.');
    }
    final current = await _read();
    final event = eventAt.toUtc();
    for (var ayah = ayahStart; ayah <= ayahEnd; ayah++) {
      final entry = ReviewScheduleEntry.fromRecording(
        recordingId:
            'session-$profileId-$surah-$ayah-${event.microsecondsSinceEpoch}',
        profileId: profileId,
        surah: surah,
        ayah: ayah,
        recordedAt: event,
      );
      current.removeWhere(
        (item) =>
            item.profileId == profileId &&
            item.surah == surah &&
            item.ayah == ayah,
      );
      current.add(entry);
    }
    await _write(current);
  }

  @override
  Future<ReviewScheduleEntry?> find({
    required String profileId,
    required int surah,
    required int ayah,
  }) async {
    final matches = (await _read()).where(
      (entry) =>
          entry.profileId == profileId &&
          entry.surah == surah &&
          entry.ayah == ayah,
    );
    return matches.isEmpty ? null : matches.first;
  }

  @override
  Future<ReviewScheduleEntry?> applyVerdict({
    required String profileId,
    required int surah,
    required int ayah,
    required ReviewVerdict verdict,
    required DateTime eventAt,
  }) async {
    final current = await _read();
    final index = current.indexWhere(
      (entry) =>
          entry.profileId == profileId &&
          entry.surah == surah &&
          entry.ayah == ayah,
    );
    if (index == -1) return null;
    final updated = applyParentVerdict(
      current[index],
      verdict,
      eventAt: eventAt,
    );
    current[index] = updated;
    await _write(current);
    return updated;
  }

  Future<List<ReviewScheduleEntry>> _read() async {
    final file = await _file;
    if (!await file.exists()) return [];
    try {
      final decoded = jsonDecode(await file.readAsString());
      if (decoded is! List) return [];
      return decoded
          .whereType<Map<String, dynamic>>()
          .map(ReviewScheduleEntry.fromJson)
          .toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> _write(List<ReviewScheduleEntry> entries) async {
    final file = await _file;
    await file.writeAsString(
      jsonEncode(entries.map((entry) => entry.toJson()).toList()),
      flush: true,
    );
  }
}
