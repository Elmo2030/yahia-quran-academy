import 'dart:convert';

import 'package:faras_quran_ai/features/recitation/data/audio_asset_repository.dart';
import 'package:faras_quran_ai/features/recitation/data/quran_content_repository.dart';
import 'package:faras_quran_ai/core/local_db/schemas/local_memorization_log.dart';
import 'package:faras_quran_ai/core/network/sync_engine.dart';
import 'package:faras_quran_ai/shared/models/practice_session.dart';
import 'package:faras_quran_ai/shared/models/practice_session_record.dart';
import 'package:faras_quran_ai/shared/models/profile.dart';
import 'package:faras_quran_ai/features/journey_map/domain/journey_state.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/services.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('practice session v2 records self-review without a score field', () {
    final session = PracticeSession(
      id: 'session-1',
      profileId: 'profile-1',
      surah: 1,
      ayahStart: 1,
      ayahEnd: 2,
      durationSeconds: 42,
      attemptCount: 2,
      startedAt: DateTime.utc(2026, 8, 26, 12),
    );

    final json = session.toJson();
    expect(json['schemaVersion'], PracticeSession.schemaVersion);
    expect(json['practiceMode'], PracticeMode.selfReview.name);
    expect(
      json['verificationStatus'],
      PracticeVerificationStatus.selfReview.name,
    );
    expect(json.containsKey('score'), isFalse);
    expect(json.containsKey('mistakes'), isFalse);
  });

  test('Quran content repository preserves and orders Uthmani ayahs', () async {
    final repository = QuranContentRepository(
      loadText: (_) async => jsonEncode({
        '1:2': 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        '1:1': 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
        '2:1': 'الٓمٓ',
      }),
    );

    final surah = await repository.getSurah(1);
    final firstAyah = await repository.getAyah(surah: 1, ayah: 1);

    expect(surah.ayahCount, 2);
    expect(surah.ayahs.map((ayah) => ayah.number), [1, 2]);
    expect(firstAyah.text, 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ');
  });

  test('audio manifest does not claim playback or ayah timing when absent',
      () async {
    final repository = AudioAssetRepository(
      loadText: (_) async => jsonEncode({
        'surahs': {
          '1': {
            'source_file': '001.m4a',
            'availability': 'listed',
            'timing_status': 'unavailable',
          },
        },
      }),
    );

    final asset = await repository.getForSurah(1);

    expect(asset.hasWholeSurahPlayback, isFalse);
    expect(asset.supportsAyahSegments, isFalse);
    expect(asset.timingStatus, AudioTimingStatus.unavailable);
  });

  test('bundled Tanzil corpus and audio manifest expose the expected safe data',
      () async {
    final content = QuranContentRepository.fromAssetBundle(rootBundle);
    final audio = AudioAssetRepository.fromAssetBundle(rootBundle);

    final fatiha = await content.getSurah(1);
    final ayatAlKursi = await content.getAyah(surah: 2, ayah: 255);
    final fatihaAudio = await audio.getForSurah(1);

    expect(fatiha.ayahCount, 7);
    expect(fatiha.ayahs.first.text, 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ');
    expect(ayatAlKursi.text, startsWith('ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ'));
    expect(fatihaAudio.sourceFile, '001.m4a');
    expect(fatihaAudio.hasWholeSurahPlayback, isTrue);
    expect(
      fatihaAudio.playbackUri.toString(),
      'https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/surahs/001.m4a',
    );
    expect(fatihaAudio.supportsAyahSegments, isFalse);
  });

  test('v2 session payload contains practice facts but no score or mistakes',
      () {
    final localSession = LocalMemorizationLog(
      id: 9,
      profileId: 'profile-9',
      sessionId: 'session-9',
      durationSeconds: 61,
      startedAt: DateTime.utc(2026, 8, 26, 16),
      endedAt: DateTime.utc(2026, 8, 26, 16, 1, 1),
      schemaVersion: 2,
      source: 'talaqqi',
      practiceMode: 'selfReview',
      verificationStatus: 'selfReview',
      surah: 1,
      ayahStart: 1,
      ayahEnd: 7,
      attemptCount: 3,
      syncBlockReason: 'requires_session_v2_migration',
    );

    final payload = practiceSessionInsertPayload(localSession);

    expect(localSession.isPracticeSessionSyncable, isTrue);
    expect(payload['practice_mode'], 'selfReview');
    expect(payload['verification_status'], 'selfReview');
    expect(payload['attempt_count'], 3);
    expect(payload.containsKey('score'), isFalse);
    expect(payload.containsKey('mistakes'), isFalse);
  });

  test('remote practice session exposes activity facts without evaluation data',
      () {
    final record = PracticeSessionRecord.fromJson({
      'id': 'row-1',
      'profile_id': 'profile-1',
      'session_id': 'session-1',
      'source': 'talaqqi',
      'practice_mode': 'selfReview',
      'verification_status': 'selfReview',
      'surah': 1,
      'ayah_start': 1,
      'ayah_end': 7,
      'duration_seconds': 75,
      'attempt_count': 2,
      'started_at': '2026-08-26T16:00:00.000Z',
      'ended_at': '2026-08-26T16:01:15.000Z',
    });

    expect(record.surah, 1);
    expect(record.durationSeconds, 75);
    expect(record.attemptCount, 2);
    expect(record.verificationStatus, 'selfReview');
    expect(record.runtimeType.toString(), 'PracticeSessionRecord');
  });

  test('dependent child profile does not require an auth identity', () {
    final profile = Profile.fromJson({
      'id': 'child-1',
      'auth_user_id': null,
      'role': 'child',
      'parent_id': 'parent-1',
      'display_name': 'يحيى',
      'created_at': '2026-08-26T16:00:00.000Z',
    });

    expect(profile.role, UserRole.child);
    expect(profile.authUserId, isNull);
    expect(profile.parentId, 'parent-1');
  });

  test(
      'empty child summary keeps practice unavailable until a child is selected',
      () {
    const summary = ChildPracticeSummary(
      recentSessions: [],
      totalPracticeMinutes: 0,
      totalAttempts: 0,
      hasActiveLearner: false,
    );

    expect(summary.hasActiveLearner, isFalse);
    expect(summary.hasSessions, isFalse);
  });
}
