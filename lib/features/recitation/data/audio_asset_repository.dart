import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

import 'quran_content_repository.dart';

final audioAssetRepositoryProvider = Provider<AudioAssetRepository>((ref) {
  return AudioAssetRepository.fromAssetBundle(rootBundle);
});

final recitationDescriptorsProvider =
    FutureProvider<List<RecitationDescriptor>>((ref) async {
  return ref.watch(audioAssetRepositoryProvider).getRecitations();
});

enum AudioTimingStatus { available, unavailable, unknown }

enum RecitationId { husaryMuallimTimed, husaryMuallimChildren }

const defaultRecitationId = RecitationId.husaryMuallimTimed;

String recitationWireId(RecitationId id) => switch (id) {
      RecitationId.husaryMuallimTimed => 'husary_muallim_timed',
      RecitationId.husaryMuallimChildren => 'husary_muallim_children',
    };

RecitationId? recitationIdFromWire(dynamic value) => switch (value) {
      'husary_muallim_timed' => RecitationId.husaryMuallimTimed,
      'husary_muallim_children' => RecitationId.husaryMuallimChildren,
      _ => null,
    };

class RecitationDescriptor {
  final RecitationId id;
  final String displayNameAr;
  final String displayNameEn;
  final AudioTimingStatus timingStatus;
  final bool isDefault;

  const RecitationDescriptor({
    required this.id,
    required this.displayNameAr,
    required this.displayNameEn,
    required this.timingStatus,
    required this.isDefault,
  });
}

class WordTimingSegment {
  final int wordNumber;
  final int startMs;
  final int endMs;

  const WordTimingSegment({
    required this.wordNumber,
    required this.startMs,
    required this.endMs,
  });
}

class AyahTimingSegment {
  final int surah;
  final int ayahNumber;
  final int startMs;
  final int endMs;
  final bool hasCompleteWordTiming;
  final List<WordTimingSegment> words;

  const AyahTimingSegment({
    required this.surah,
    required this.ayahNumber,
    required this.startMs,
    required this.endMs,
    required this.hasCompleteWordTiming,
    required this.words,
  });

  Duration get duration => Duration(milliseconds: endMs - startMs);
}

class ActiveTimingSegment {
  final int ayahNumber;
  final int? wordNumber;

  const ActiveTimingSegment({required this.ayahNumber, this.wordNumber});
}

class VerifiedSurahTiming {
  final int surah;
  final String audioSha256;
  final int audioSizeBytes;
  final int audioDurationMs;
  final List<AyahTimingSegment> ayahs;

  const VerifiedSurahTiming({
    required this.surah,
    required this.audioSha256,
    required this.audioSizeBytes,
    required this.audioDurationMs,
    required this.ayahs,
  });

  ActiveTimingSegment? activeAt(Duration position) {
    final currentMs = position.inMilliseconds;
    final ayah = ayahs
        .where((segment) =>
            currentMs >= segment.startMs && currentMs <= segment.endMs)
        .firstOrNull;
    if (ayah == null) return null;
    if (!ayah.hasCompleteWordTiming) {
      return ActiveTimingSegment(ayahNumber: ayah.ayahNumber);
    }
    final words = ayah.words
        .where((word) => currentMs >= word.startMs && currentMs <= word.endMs)
        .toList()
      ..sort((a, b) => (a.endMs - a.startMs).compareTo(b.endMs - b.startMs));
    return ActiveTimingSegment(
      ayahNumber: ayah.ayahNumber,
      wordNumber: words.isEmpty ? null : words.first.wordNumber,
    );
  }
}

/// Metadata for an audio file. A listed source is not automatically playable.
class AudioAsset {
  final int surah;
  final RecitationId recitationId;
  final String sourceFile;
  final String availability;
  final AudioTimingStatus timingStatus;
  final Uri? playbackUri;
  final Uri? timingUri;
  final String? sha256;
  final int? sizeBytes;
  final int? durationMs;
  final int? ayahCount;

  const AudioAsset({
    required this.surah,
    required this.recitationId,
    required this.sourceFile,
    required this.availability,
    required this.timingStatus,
    this.playbackUri,
    this.timingUri,
    this.sha256,
    this.sizeBytes,
    this.durationMs,
    this.ayahCount,
  });

  bool get hasWholeSurahPlayback => playbackUri != null;
  bool get supportsAyahSegments =>
      playbackUri != null &&
      timingUri != null &&
      timingStatus == AudioTimingStatus.available &&
      recitationId == RecitationId.husaryMuallimTimed &&
      sha256 != null &&
      sizeBytes != null &&
      durationMs != null &&
      ayahCount != null;
}

/// Reads the metadata-only audio manifest. It never treats a Google Drive
/// source listing as a production playback URL and never invents timestamps.
class AudioAssetRepository {
  static const assetKey = 'assets/data/recitation_manifest.json';
  static const childrenManifestAssetKey = 'assets/data/audio_manifest.json';

  final AssetTextLoader _loadText;
  final Future<String> Function(Uri) _loadRemoteText;
  Map<RecitationId, Map<int, AudioAsset>>? _assetsByRecitation;
  List<RecitationDescriptor>? _recitations;
  final Map<int, VerifiedSurahTiming> _soloTimings = {};

  AudioAssetRepository({
    required AssetTextLoader loadText,
    Future<String> Function(Uri)? loadRemoteText,
  })  : _loadText = loadText,
        _loadRemoteText = loadRemoteText ?? _defaultRemoteText;

  factory AudioAssetRepository.fromAssetBundle(AssetBundle bundle) {
    return AudioAssetRepository(loadText: bundle.loadString);
  }

  static Future<String> _defaultRemoteText(Uri uri) async {
    final response = await http.get(uri);
    if (response.statusCode != 200) {
      throw StateError('Unable to load verified timing data.');
    }
    return response.body;
  }

  Future<List<RecitationDescriptor>> getRecitations() async {
    await _ensureLoaded();
    return _recitations!;
  }

  Future<AudioAsset> getForSurah(
    int surah, {
    RecitationId recitationId = defaultRecitationId,
  }) async {
    if (surah < 1 || surah > 114) {
      throw ArgumentError.value(surah, 'surah', 'Must be in the range 1–114');
    }
    final asset = (await _ensureLoaded())[recitationId]?[surah];
    if (asset == null) {
      throw StateError('No audio metadata was found for surah $surah.');
    }
    return asset;
  }

  Future<Map<RecitationId, Map<int, AudioAsset>>> _ensureLoaded() async {
    final existing = _assetsByRecitation;
    if (existing != null) return existing;

    final decoded = jsonDecode(await _loadText(assetKey));
    if (decoded is! Map ||
        decoded['schema_version'] != 'recitation-manifest-v1') {
      throw const FormatException('Recitation manifest is invalid.');
    }
    if (recitationIdFromWire(decoded['default_recitation_id']) !=
        defaultRecitationId) {
      throw const FormatException('The default recitation is invalid.');
    }
    _validateSourceAudit(decoded['source_content_verification']);
    final recitations = decoded['recitations'];
    if (recitations is! Map)
      throw const FormatException('Recitations are missing.');

    final solo = _parseSoloRecitation(recitations['husary_muallim_timed']);
    final children = await _parseChildrenRecitation(
      recitations['husary_muallim_children'],
    );
    _recitations = const [
      RecitationDescriptor(
        id: RecitationId.husaryMuallimTimed,
        displayNameAr: 'الحُصَري المعلّم',
        displayNameEn: 'Husary Muallim',
        timingStatus: AudioTimingStatus.available,
        isDefault: true,
      ),
      RecitationDescriptor(
        id: RecitationId.husaryMuallimChildren,
        displayNameAr: 'التعلّم مع الأطفال',
        displayNameEn: 'Learning with children',
        timingStatus: AudioTimingStatus.unavailable,
        isDefault: false,
      ),
    ];
    _assetsByRecitation = Map.unmodifiable(<RecitationId, Map<int, AudioAsset>>{
      RecitationId.husaryMuallimTimed: Map<int, AudioAsset>.unmodifiable(solo),
      RecitationId.husaryMuallimChildren:
          Map<int, AudioAsset>.unmodifiable(children),
    });
    return _assetsByRecitation!;
  }

  Future<VerifiedSurahTiming?> loadVerifiedTiming(
    int surah, {
    required RecitationId recitationId,
  }) async {
    if (recitationId != RecitationId.husaryMuallimTimed) return null;
    final existing = _soloTimings[surah];
    if (existing != null) return existing;
    final asset = await getForSurah(surah, recitationId: recitationId);
    if (!asset.supportsAyahSegments || asset.timingUri == null) return null;
    final decoded = jsonDecode(await _loadRemoteText(asset.timingUri!));
    final timing = _parseVerifiedTiming(decoded, asset);
    _soloTimings[surah] = timing;
    return timing;
  }

  void _validateSourceAudit(dynamic value) {
    if (value is! Map ||
        value['schema_version'] != 'source-r2-range-hash-audit-v1' ||
        value['status'] != 'verified' ||
        value['expected_surahs'] != 114 ||
        value['verified_surahs'] != 114 ||
        !_isHttps(value['audit_report_url']) ||
        !_isSha256(value['audit_report_sha256'])) {
      throw const FormatException('Source-to-R2 verification is invalid.');
    }
  }

  Map<int, AudioAsset> _parseSoloRecitation(dynamic value) {
    if (value is! Map ||
        value['id'] != 'husary_muallim_timed' ||
        value['speaker'] != 'teacher' ||
        value['timing_status'] != 'available' ||
        value['timing_schema_version'] != 'husary-muallim-timed-v1' ||
        value['timing_validation_policy'] != 'fail-closed-v1' ||
        value['timing_source_id'] != 12 ||
        value['surahs'] is! Map) {
      throw const FormatException('Timed teacher recitation is invalid.');
    }
    final rawSurahs = value['surahs'] as Map;
    _requireAllSurahs(rawSurahs, 'Timed teacher recitation is incomplete.');
    return Map.fromEntries(List.generate(114, (index) {
      final surah = index + 1;
      final item = rawSurahs['$surah'];
      final chapter = surah.toString().padLeft(3, '0');
      if (item is! Map ||
          item['surah'] != surah ||
          item['availability'] != 'migrated' ||
          item['timing_status'] != 'available' ||
          item['r2_object_key'] !=
              'recitations/husary-muallim-solo/$chapter.mp3' ||
          !_isHttps(item['playback_url']) ||
          !('${item['playback_url']}').endsWith('/$chapter.mp3') ||
          !_isSha256(item['sha256']) ||
          !_positiveInt(item['size_bytes']) ||
          !_positiveInt(item['duration_ms']) ||
          !_positiveInt(item['ayah_count']) ||
          !_isHttps(item['timing_url'])) {
        throw FormatException(
            'Timed teacher asset is invalid for surah $surah.');
      }
      return MapEntry(
        surah,
        AudioAsset(
          surah: surah,
          recitationId: RecitationId.husaryMuallimTimed,
          sourceFile: '$chapter.mp3',
          availability: 'migrated',
          timingStatus: AudioTimingStatus.available,
          playbackUri: Uri.parse(item['playback_url'] as String),
          timingUri: Uri.parse(item['timing_url'] as String),
          sha256: item['sha256'] as String,
          sizeBytes: item['size_bytes'] as int,
          durationMs: item['duration_ms'] as int,
          ayahCount: item['ayah_count'] as int,
        ),
      );
    }));
  }

  Future<Map<int, AudioAsset>> _parseChildrenRecitation(dynamic value) async {
    if (value is! Map ||
        value['id'] != 'husary_muallim_children' ||
        value['speaker'] != 'children' ||
        value['timing_status'] != 'unavailable' ||
        value['children_audio_manifest_asset'] != childrenManifestAssetKey) {
      throw const FormatException('Children recitation is invalid.');
    }
    final decoded = jsonDecode(await _loadText(childrenManifestAssetKey));
    if (decoded is! Map || decoded['surahs'] is! Map) {
      throw const FormatException('Children audio manifest is invalid.');
    }
    final rawSurahs = decoded['surahs'] as Map;
    _requireAllSurahs(rawSurahs, 'Children audio manifest is incomplete.');
    return Map.fromEntries(List.generate(114, (index) {
      final surah = index + 1;
      final item = rawSurahs['$surah'];
      final extension = surah == 1 ? 'm4a' : 'mp3';
      final expectedKey =
          'surahs/${surah.toString().padLeft(3, '0')}.$extension';
      if (item is! Map ||
          item['surah'] != surah ||
          item['timing_status'] != 'unavailable' ||
          item['availability'] != 'migrated' ||
          item['r2_object_key'] != expectedKey ||
          !_isHttps(item['playback_url']) ||
          !('${item['playback_url']}').endsWith(expectedKey)) {
        throw FormatException(
            'Children audio asset is invalid for surah $surah.');
      }
      return MapEntry(
        surah,
        AudioAsset(
          surah: surah,
          recitationId: RecitationId.husaryMuallimChildren,
          sourceFile: item['source_file'] as String? ?? '$extension',
          availability: 'migrated',
          timingStatus: AudioTimingStatus.unavailable,
          playbackUri: Uri.parse(item['playback_url'] as String),
          sha256: item['sha256'] as String?,
          sizeBytes: item['size_bytes'] as int?,
        ),
      );
    }));
  }

  VerifiedSurahTiming _parseVerifiedTiming(dynamic value, AudioAsset asset) {
    if (value is! Map ||
        value['schema_version'] != 'husary-muallim-timed-v1' ||
        value['validation_policy'] != 'fail-closed-v1' ||
        value['recitation'] is! Map ||
        value['surah'] is! Map) {
      throw const FormatException('Timed surah payload is invalid.');
    }
    final recitation = value['recitation'] as Map;
    final rawSurah = value['surah'] as Map;
    final rawAudio = rawSurah['audio'];
    final rawAyahs = rawSurah['ayahs'];
    if (recitation['id'] != 'husary_muallim_timed' ||
        recitation['recitation_source_id'] != 12 ||
        recitation['speaker'] != 'teacher' ||
        rawSurah['surah'] != asset.surah ||
        rawSurah['timing_status'] != 'available' ||
        rawSurah['source_review_status'] != 'source-verified' ||
        rawAudio is! Map ||
        rawAudio['sha256'] != asset.sha256 ||
        rawAudio['size_bytes'] != asset.sizeBytes ||
        rawAudio['duration_ms'] != asset.durationMs ||
        rawAyahs is! List ||
        rawAyahs.length != asset.ayahCount) {
      throw const FormatException('Timed surah does not match verified audio.');
    }
    var previousEnd = -1;
    final ayahs = <AyahTimingSegment>[];
    for (var index = 0; index < rawAyahs.length; index += 1) {
      final item = rawAyahs[index];
      if (item is! Map ||
          item['ayah'] != index + 1 ||
          item['ayah_key'] != '${asset.surah}:${index + 1}' ||
          !_nonnegativeInt(item['start_ms']) ||
          !_positiveInt(item['end_ms']) ||
          (item['start_ms'] as int) < previousEnd ||
          (item['end_ms'] as int) < (item['start_ms'] as int) ||
          (item['end_ms'] as int) > asset.durationMs! + 1000 ||
          item['words'] is! List ||
          !['available', 'partial'].contains(item['word_timing_status']) ||
          item['missing_word_numbers'] is! List ||
          !_positiveInt(item['text_word_count'])) {
        throw FormatException(
            'Timed ayah is invalid for ${asset.surah}:${index + 1}.');
      }
      final wordStatus = item['word_timing_status'] as String;
      final missing = item['missing_word_numbers'] as List;
      if ((wordStatus == 'available' && missing.isNotEmpty) ||
          (wordStatus == 'partial' && missing.isEmpty)) {
        throw FormatException(
            'Timed word status is invalid for ${asset.surah}:${index + 1}.');
      }
      var previousStart = -1;
      final words = <WordTimingSegment>[];
      for (final rawWord in item['words'] as List) {
        if (rawWord is! Map ||
            !_positiveInt(rawWord['word_number']) ||
            (rawWord['word_number'] as int) >
                (item['text_word_count'] as int) ||
            !_nonnegativeInt(rawWord['start_ms']) ||
            !_positiveInt(rawWord['end_ms']) ||
            (rawWord['start_ms'] as int) < (item['start_ms'] as int) ||
            (rawWord['end_ms'] as int) > (item['end_ms'] as int) ||
            (rawWord['start_ms'] as int) < previousStart ||
            rawWord['raw_timing_valid'] != true ||
            rawWord['intersects_ayah_window'] != true) {
          throw FormatException(
              'Timed word is invalid for ${asset.surah}:${index + 1}.');
        }
        previousStart = rawWord['start_ms'] as int;
        words.add(WordTimingSegment(
          wordNumber: rawWord['word_number'] as int,
          startMs: rawWord['start_ms'] as int,
          endMs: rawWord['end_ms'] as int,
        ));
      }
      previousEnd = item['end_ms'] as int;
      ayahs.add(AyahTimingSegment(
        surah: asset.surah,
        ayahNumber: index + 1,
        startMs: item['start_ms'] as int,
        endMs: item['end_ms'] as int,
        hasCompleteWordTiming: wordStatus == 'available',
        words: List.unmodifiable(words),
      ));
    }
    return VerifiedSurahTiming(
      surah: asset.surah,
      audioSha256: asset.sha256!,
      audioSizeBytes: asset.sizeBytes!,
      audioDurationMs: asset.durationMs!,
      ayahs: List.unmodifiable(ayahs),
    );
  }

  void _requireAllSurahs(Map values, String message) {
    if (values.length != 114) throw FormatException(message);
    for (var surah = 1; surah <= 114; surah += 1) {
      if (!values.containsKey('$surah')) throw FormatException(message);
    }
  }

  bool _isHttps(dynamic value) =>
      value is String && Uri.tryParse(value)?.scheme == 'https';

  bool _isSha256(dynamic value) =>
      value is String && RegExp(r'^[a-f0-9]{64}$').hasMatch(value);

  bool _positiveInt(dynamic value) => value is int && value > 0;
  bool _nonnegativeInt(dynamic value) => value is int && value >= 0;
}
