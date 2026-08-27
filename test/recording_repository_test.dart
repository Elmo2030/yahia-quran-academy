import 'dart:io';

import 'package:faras_quran_ai/features/recitation/data/recording_repository.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  late Directory documents;
  late File source;
  late DateTime now;
  var nextId = 0;

  LocalRecordingStore store() => LocalRecordingStore(
        documentsDirectory: () async => documents,
        clock: () => now,
        idFactory: () => 'recording-${nextId++}',
      );

  setUp(() async {
    documents = await Directory.systemTemp.createTemp('yqa-recording-test-');
    source = File('${documents.path}${Platform.pathSeparator}source.wav');
    await source.writeAsBytes([1, 2, 3, 4]);
    now = DateTime.utc(2026, 8, 27, 12);
    nextId = 0;
  });

  tearDown(() async {
    if (await documents.exists()) await documents.delete(recursive: true);
  });

  test('keeps only the latest durable recording for an ayah', () async {
    final repository = store();
    final first = await repository.save(
      profileId: 'child-1',
      surah: 1,
      ayah: 1,
      sourcePath: source.path,
      durationMs: 1200,
    );
    now = now.add(const Duration(minutes: 1));
    await source.writeAsBytes([5, 6, 7, 8]);
    final second = await repository.save(
      profileId: 'child-1',
      surah: 1,
      ayah: 1,
      sourcePath: source.path,
      durationMs: 2200,
    );

    expect(await File(first.filePath).exists(), isFalse);
    expect(await File(second.filePath).exists(), isTrue);
    expect(
      (await repository.latestFor(profileId: 'child-1', surah: 1, ayah: 1))?.id,
      second.id,
    );
  });

  test('retention caps recordings at fifty and removes recordings older than thirty days', () async {
    final repository = store();
    for (var ayah = 1; ayah <= 51; ayah += 1) {
      await repository.save(
        profileId: 'child-1',
        surah: 1,
        ayah: ayah,
        sourcePath: source.path,
        durationMs: 1000,
      );
      now = now.add(const Duration(minutes: 1));
    }
    expect((await repository.recentFor(profileId: 'child-1', limit: 100)).length, 50);

    now = now.add(const Duration(days: 31));
    await repository.enforceRetention(profileId: 'child-1');
    expect(await repository.recentFor(profileId: 'child-1'), isEmpty);
  });

  test('persists the parent verdict separately across a store restart', () async {
    final firstStore = store();
    final recording = await firstStore.save(
      profileId: 'child-1',
      surah: 2,
      ayah: 3,
      sourcePath: source.path,
      durationMs: 3200,
    );
    final review = await firstStore.addReview(
      recording: recording,
      reviewerId: 'parent-1',
      verdict: ParentVerdict.needsWork,
    );

    final reloadedStore = store();
    final reloaded = await reloadedStore.latestForRecording(recording.id);
    expect(reloaded?.id, review.id);
    expect(reloaded?.verdict, ParentVerdict.needsWork);
    expect(reloaded?.voiceNotePath, isNull);
  });

  test('a revised parent verdict appends a new review and exposes the latest',
      () async {
    final repository = store();
    final recording = await repository.save(
      profileId: 'child-1',
      surah: 2,
      ayah: 5,
      sourcePath: source.path,
      durationMs: 2600,
    );
    await repository.addReview(
      recording: recording,
      reviewerId: 'parent-1',
      verdict: ParentVerdict.needsWork,
    );
    now = now.add(const Duration(minutes: 1));
    final revised = await repository.addReview(
      recording: recording,
      reviewerId: 'parent-1',
      verdict: ParentVerdict.good,
    );

    final latest = await repository.latestForRecording(recording.id);
    expect(latest?.id, revised.id);
    expect(latest?.verdict, ParentVerdict.good);
  });

  test('delete removes the local audio file and its local index entry', () async {
    final repository = store();
    final recording = await repository.save(
      profileId: 'child-1',
      surah: 3,
      ayah: 4,
      sourcePath: source.path,
      durationMs: 2000,
    );

    await repository.delete(recording.id);
    expect(await File(recording.filePath).exists(), isFalse);
    expect(await repository.recentFor(profileId: 'child-1'), isEmpty);
  });
}
