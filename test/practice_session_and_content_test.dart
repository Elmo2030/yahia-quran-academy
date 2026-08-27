import 'dart:convert';
import 'dart:async';

import 'package:faras_quran_ai/core/audio/audio_player_service.dart';
import 'package:faras_quran_ai/core/audio/audio_recording_service.dart';
import 'package:faras_quran_ai/features/recitation/data/audio_asset_repository.dart';
import 'package:faras_quran_ai/features/recitation/data/quran_content_repository.dart';
import 'package:faras_quran_ai/features/recitation/domain/talaqqi_controller.dart';
import 'package:faras_quran_ai/core/local_db/schemas/local_memorization_log.dart';
import 'package:faras_quran_ai/core/network/sync_engine.dart';
import 'package:faras_quran_ai/shared/models/practice_session.dart';
import 'package:faras_quran_ai/shared/models/practice_session_record.dart';
import 'package:faras_quran_ai/shared/models/profile.dart';
import 'package:faras_quran_ai/features/journey_map/domain/journey_state.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/services.dart';

Map<String, dynamic> _allChildrenSurahs() => Map.fromEntries(
      List.generate(114, (index) {
        final surah = index + 1;
        final chapter = surah.toString().padLeft(3, '0');
        final extension = surah == 1 ? 'm4a' : 'mp3';
        return MapEntry('$surah', {
          'surah': surah,
          'source_file': '$chapter.$extension',
          'availability': 'migrated',
          'timing_status': 'unavailable',
          'r2_object_key': 'surahs/$chapter.$extension',
          'playback_url':
              'https://audio.example.test/surahs/$chapter.$extension',
        });
      }),
    );

Map<String, dynamic> _allTimedSurahs() => Map.fromEntries(
      List.generate(114, (index) {
        final surah = index + 1;
        final chapter = surah.toString().padLeft(3, '0');
        return MapEntry('$surah', {
          'surah': surah,
          'availability': 'migrated',
          'timing_status': 'available',
          'playback_url':
              'https://audio.example.test/recitations/husary-muallim-solo/$chapter.mp3',
          'r2_object_key': 'recitations/husary-muallim-solo/$chapter.mp3',
          'content_type': 'audio/mpeg',
          'size_bytes': 1000,
          'sha256': surah.toRadixString(16).padLeft(64, 'a'),
          'duration_ms': 2000,
          'ayah_count': 1,
          'timing_url': 'https://timings.example.test/$chapter.json',
        });
      }),
    );

Map<String, dynamic> _recitationManifest() => {
      'schema_version': 'recitation-manifest-v1',
      'default_recitation_id': 'husary_muallim_timed',
      'source_content_verification': {
        'schema_version': 'source-r2-range-hash-audit-v1',
        'status': 'verified',
        'expected_surahs': 114,
        'verified_surahs': 114,
        'audit_report_url': 'https://audit.example.test/audit.json',
        'audit_report_sha256': 'b' * 64,
      },
      'recitations': {
        'husary_muallim_timed': {
          'id': 'husary_muallim_timed',
          'speaker': 'teacher',
          'timing_status': 'available',
          'timing_schema_version': 'husary-muallim-timed-v1',
          'timing_validation_policy': 'fail-closed-v1',
          'timing_source_id': 12,
          'surahs': _allTimedSurahs(),
        },
        'husary_muallim_children': {
          'id': 'husary_muallim_children',
          'speaker': 'children',
          'timing_status': 'unavailable',
          'children_audio_manifest_asset':
              AudioAssetRepository.childrenManifestAssetKey,
        },
      },
    };

Map<String, dynamic> _timingPayload({String? sha256}) => {
      'schema_version': 'husary-muallim-timed-v1',
      'validation_policy': 'fail-closed-v1',
      'recitation': {
        'id': 'husary_muallim_timed',
        'recitation_source_id': 12,
        'speaker': 'teacher',
      },
      'surah': {
        'surah': 1,
        'timing_status': 'available',
        'source_review_status': 'source-verified',
        'audio': {
          'sha256': sha256 ?? '${'a' * 63}1',
          'size_bytes': 1000,
          'duration_ms': 2000,
        },
        'ayahs': [
          {
            'ayah': 1,
            'ayah_key': '1:1',
            'start_ms': 0,
            'end_ms': 1500,
            'word_timing_status': 'available',
            'missing_word_numbers': [],
            'text_word_count': 1,
            'words': [
              {
                'word_number': 1,
                'start_ms': 0,
                'end_ms': 1200,
                'raw_timing_valid': true,
                'intersects_ayah_window': true,
              },
            ],
          },
        ],
      },
    };

class _FakeAudioPlayback implements AudioPlayback {
  final _positions = StreamController<Duration>.broadcast();
  final _playing = StreamController<bool>.broadcast();
  int stopAndResetCalls = 0;
  final loadedUrls = <String>[];

  @override
  Stream<Duration> get positionStream => _positions.stream;

  @override
  Stream<bool> get playingStream => _playing.stream;

  void emitPosition(Duration position) => _positions.add(position);

  @override
  Future<void> load(String url) async => loadedUrls.add(url);

  @override
  Future<void> pause() async => _playing.add(false);

  @override
  Future<void> playSegment({required int startMs, required int endMs}) async {}

  @override
  Future<void> playWhole() async => _playing.add(true);

  @override
  Future<void> stop() async => _playing.add(false);

  @override
  Future<void> stopAndReset() async {
    stopAndResetCalls++;
    _playing.add(false);
  }

  Future<void> dispose() async {
    await _positions.close();
    await _playing.close();
  }
}

class _FakeAudioRecording implements AudioRecording {
  @override
  Future<MicPermission> checkPermission() async => MicPermission.denied;

  @override
  Future<void> cleanupLastRecording() async {}

  @override
  Future<String> startRecording() async => '/tmp/test.wav';

  @override
  Future<String?> stopRecording() async => '/tmp/test.wav';
}

Future<void> _settleController() async {
  await Future<void>.delayed(Duration.zero);
  await Future<void>.delayed(Duration.zero);
}

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

  test('children audio cannot claim ayah timing', () async {
    final repository = AudioAssetRepository(
      loadText: (key) async => jsonEncode(
        key == AudioAssetRepository.assetKey
            ? _recitationManifest()
            : {'surahs': _allChildrenSurahs()},
      ),
    );

    final asset = await repository.getForSurah(
      1,
      recitationId: RecitationId.husaryMuallimChildren,
    );

    expect(asset.hasWholeSurahPlayback, isTrue);
    expect(asset.supportsAyahSegments, isFalse);
    expect(asset.timingStatus, AudioTimingStatus.unavailable);
    expect(
      await repository.loadVerifiedTiming(
        1,
        recitationId: RecitationId.husaryMuallimChildren,
      ),
      isNull,
    );
  });

  test('bundled Tanzil corpus and audio manifest expose the expected safe data',
      () async {
    final content = QuranContentRepository.fromAssetBundle(rootBundle);
    final audio = AudioAssetRepository.fromAssetBundle(rootBundle);

    final fatiha = await content.getSurah(1);
    final ayatAlKursi = await content.getAyah(surah: 2, ayah: 255);
    final fatihaAudio = await audio.getForSurah(1);
    final kautherAudio = await audio.getForSurah(108);
    final childrenFatiha = await audio.getForSurah(
      1,
      recitationId: RecitationId.husaryMuallimChildren,
    );

    expect(fatiha.ayahCount, 7);
    expect(fatiha.ayahs.first.text, 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ');
    expect(ayatAlKursi.text, startsWith('ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ'));
    expect(fatihaAudio.sourceFile, '001.mp3');
    expect(fatihaAudio.hasWholeSurahPlayback, isTrue);
    expect(
      fatihaAudio.playbackUri.toString(),
      'https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/recitations/husary-muallim-solo/001.mp3',
    );
    expect(fatihaAudio.supportsAyahSegments, isTrue);
    expect(kautherAudio.hasWholeSurahPlayback, isTrue);
    expect(
      kautherAudio.playbackUri.toString(),
      'https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/recitations/husary-muallim-solo/108.mp3',
    );
    expect(kautherAudio.supportsAyahSegments, isTrue);
    expect(childrenFatiha.sourceFile, '001.m4a');
    expect(childrenFatiha.supportsAyahSegments, isFalse);
  });

  test(
      'verified teacher timing must match audio and activates only teacher words',
      () async {
    final repository = AudioAssetRepository(
      loadText: (key) async => jsonEncode(
        key == AudioAssetRepository.assetKey
            ? _recitationManifest()
            : {'surahs': _allChildrenSurahs()},
      ),
      loadRemoteText: (_) async => jsonEncode(_timingPayload()),
    );

    final timing = await repository.loadVerifiedTiming(
      1,
      recitationId: RecitationId.husaryMuallimTimed,
    );
    final active = timing!.activeAt(const Duration(milliseconds: 500));

    expect(active?.ayahNumber, 1);
    expect(active?.wordNumber, 1);
  });

  test('mismatched timing audio is rejected before it reaches the reader',
      () async {
    final repository = AudioAssetRepository(
      loadText: (key) async => jsonEncode(
        key == AudioAssetRepository.assetKey
            ? _recitationManifest()
            : {'surahs': _allChildrenSurahs()},
      ),
      loadRemoteText: (_) async => jsonEncode(_timingPayload(sha256: 'c' * 64)),
    );

    await expectLater(
      repository.loadVerifiedTiming(
        1,
        recitationId: RecitationId.husaryMuallimTimed,
      ),
      throwsA(isA<FormatException>()),
    );
  });

  test('switching to children resets playback and suppresses teacher timing',
      () async {
    final player = _FakeAudioPlayback();
    final audioAssets = AudioAssetRepository(
      loadText: (key) async => jsonEncode(
        key == AudioAssetRepository.assetKey
            ? _recitationManifest()
            : {'surahs': _allChildrenSurahs()},
      ),
      loadRemoteText: (_) async => jsonEncode(_timingPayload()),
    );
    final controller = TalaqqiController(
      player: player,
      recorder: _FakeAudioRecording(),
      quranContent: QuranContentRepository(
        loadText: (_) async => jsonEncode({'1:1': 'بِسْمِ ٱللَّهِ'}),
      ),
      audioAssets: audioAssets,
    );
    addTearDown(() async {
      controller.dispose();
      await player.dispose();
    });

    await _settleController();
    await controller.playWholeSurah();
    player.emitPosition(const Duration(milliseconds: 500));
    await _settleController();

    expect(controller.state.isWholeSurahPlaying, isTrue);
    expect(controller.state.activeTimedAyah, 1);
    expect(controller.state.activeTimedWord, 1);

    await controller.selectRecitation(RecitationId.husaryMuallimChildren);

    expect(player.stopAndResetCalls, 1);
    expect(controller.state.recitationId, RecitationId.husaryMuallimChildren);
    expect(controller.state.isWholeSurahPlaying, isFalse);
    expect(controller.state.activeTimedAyah, isNull);
    expect(controller.state.activeTimedWord, isNull);

    await controller.playWholeSurah();
    player.emitPosition(const Duration(milliseconds: 500));
    await _settleController();

    expect(controller.state.isWholeSurahPlaying, isTrue);
    expect(controller.state.activeTimedAyah, isNull);
    expect(controller.state.activeTimedWord, isNull);
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
