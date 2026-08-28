import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

import 'package:faras_quran_ai/features/review/data/review_queue_repository.dart';
import 'package:faras_quran_ai/features/review/domain/review_schedule.dart';

void main() {
  late Directory tempDirectory;
  late LocalReviewQueueStore store;
  final base = DateTime.utc(2026, 8, 28, 10);

  setUp(() async {
    tempDirectory = await Directory.systemTemp.createTemp('yqa-review-');
    store = LocalReviewQueueStore(
      documentsDirectory: () async => tempDirectory,
    );
  });

  tearDown(() async {
    if (await tempDirectory.exists()) {
      await tempDirectory.delete(recursive: true);
    }
  });

  test('completed session adds each ayah to the local queue', () async {
    await store.enqueueSession(
      profileId: 'child-1',
      surah: 2,
      ayahStart: 10,
      ayahEnd: 11,
      eventAt: base,
    );

    final due = await store.dueFor(
      profileId: 'child-1',
      now: base.add(const Duration(days: 1)),
    );
    expect(due.map((entry) => entry.ayah), [10, 11]);
  });

  test('good hides the ayah until its next ladder interval', () async {
    await store.enqueueSession(
      profileId: 'child-1',
      surah: 2,
      ayahStart: 10,
      ayahEnd: 10,
      eventAt: base,
    );

    await store.applyVerdict(
      profileId: 'child-1',
      surah: 2,
      ayah: 10,
      verdict: ReviewVerdict.good,
      eventAt: base.add(const Duration(days: 1)),
    );

    expect(
      await store.dueFor(
        profileId: 'child-1',
        now: base.add(const Duration(days: 2)),
      ),
      isEmpty,
    );
    expect(
      (await store.dueFor(
        profileId: 'child-1',
        now: base.add(const Duration(days: 4)),
      ))
          .single
          .ayah,
      10,
    );
  });

  test('re-practising a scheduled ayah does not reset its ladder rung',
      () async {
    await store.enqueueSession(
      profileId: 'child-1',
      surah: 2,
      ayahStart: 10,
      ayahEnd: 10,
      eventAt: base,
    );

    // Parent confirms it twice, walking the ayah up to rung 2 (7 days).
    await store.applyVerdict(
      profileId: 'child-1',
      surah: 2,
      ayah: 10,
      verdict: ReviewVerdict.good,
      eventAt: base.add(const Duration(days: 1)),
    );
    await store.applyVerdict(
      profileId: 'child-1',
      surah: 2,
      ayah: 10,
      verdict: ReviewVerdict.good,
      eventAt: base.add(const Duration(days: 4)),
    );
    expect(
      (await store.find(profileId: 'child-1', surah: 2, ayah: 10))!.rung,
      2,
    );

    // A review session is itself a practice session and enqueues again.
    // That must not knock the ayah back to rung 0 — only a parent verdict
    // moves it along the ladder.
    await store.enqueueSession(
      profileId: 'child-1',
      surah: 2,
      ayahStart: 10,
      ayahEnd: 10,
      eventAt: base.add(const Duration(days: 11)),
    );

    final entry = await store.find(profileId: 'child-1', surah: 2, ayah: 10);
    expect(entry!.rung, 2);
    expect(entry.dueAt, base.add(const Duration(days: 11)));
  });

  test('needs work returns the ayah tomorrow at rung zero', () async {
    await store.enqueueSession(
      profileId: 'child-1',
      surah: 2,
      ayahStart: 10,
      ayahEnd: 10,
      eventAt: base,
    );

    await store.applyVerdict(
      profileId: 'child-1',
      surah: 2,
      ayah: 10,
      verdict: ReviewVerdict.needsWork,
      eventAt: base.add(const Duration(days: 4)),
    );

    final due = await store.dueFor(
      profileId: 'child-1',
      now: base.add(const Duration(days: 5)),
    );
    expect(due.single.rung, 0);
    expect(due.single.dueAt, base.add(const Duration(days: 5)));
  });
}
