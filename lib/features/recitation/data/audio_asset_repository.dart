import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'quran_content_repository.dart';

final audioAssetRepositoryProvider = Provider<AudioAssetRepository>((ref) {
  return AudioAssetRepository.fromAssetBundle(rootBundle);
});

enum AudioTimingStatus { available, unavailable, unknown }

/// Metadata for an audio file. A listed source is not automatically playable.
class AudioAsset {
  final int surah;
  final String sourceFile;
  final String availability;
  final AudioTimingStatus timingStatus;
  final Uri? playbackUri;
  final Uri? ayahSegmentsUri;

  const AudioAsset({
    required this.surah,
    required this.sourceFile,
    required this.availability,
    required this.timingStatus,
    this.playbackUri,
    this.ayahSegmentsUri,
  });

  bool get hasWholeSurahPlayback => playbackUri != null;
  bool get supportsAyahSegments =>
      playbackUri != null &&
      ayahSegmentsUri != null &&
      timingStatus == AudioTimingStatus.available;
}

/// Reads the metadata-only audio manifest. It never treats a Google Drive
/// source listing as a production playback URL and never invents timestamps.
class AudioAssetRepository {
  static const assetKey = 'assets/data/audio_manifest.json';

  final AssetTextLoader _loadText;
  Map<int, AudioAsset>? _assetsBySurah;

  AudioAssetRepository({required AssetTextLoader loadText})
      : _loadText = loadText;

  factory AudioAssetRepository.fromAssetBundle(AssetBundle bundle) {
    return AudioAssetRepository(loadText: bundle.loadString);
  }

  Future<AudioAsset> getForSurah(int surah) async {
    if (surah < 1 || surah > 114) {
      throw ArgumentError.value(surah, 'surah', 'Must be in the range 1–114');
    }
    final asset = (await _ensureLoaded())[surah];
    if (asset == null) {
      throw StateError('No audio metadata was found for surah $surah.');
    }
    return asset;
  }

  Future<Map<int, AudioAsset>> _ensureLoaded() async {
    final existing = _assetsBySurah;
    if (existing != null) return existing;

    final decoded = jsonDecode(await _loadText(assetKey));
    if (decoded is! Map<String, dynamic>) {
      throw const FormatException('Audio manifest must be a JSON object.');
    }
    final surahs = decoded['surahs'];
    if (surahs is! Map) {
      throw const FormatException('Audio manifest does not contain surahs.');
    }

    final assets = <int, AudioAsset>{};
    surahs.forEach((key, value) {
      if (value is! Map) return;
      final surah = int.tryParse('$key');
      final sourceFile = value['source_file'];
      if (surah == null || sourceFile is! String || sourceFile.isEmpty) return;

      final playbackUri = _parsePlaybackUri(value['playback_url']);
      final ayahSegmentsUri = _parsePlaybackUri(value['ayah_segments_url']);
      assets[surah] = AudioAsset(
        surah: surah,
        sourceFile: sourceFile,
        availability: value['availability'] as String? ?? 'unknown',
        timingStatus: _timingStatus(value['timing_status'] as String?),
        playbackUri: playbackUri,
        ayahSegmentsUri: ayahSegmentsUri,
      );
    });
    if (assets.isEmpty) {
      throw const FormatException('Audio manifest does not contain assets.');
    }

    _assetsBySurah = Map.unmodifiable(assets);
    return _assetsBySurah!;
  }

  AudioTimingStatus _timingStatus(String? value) {
    return switch (value) {
      'available' => AudioTimingStatus.available,
      'unavailable' => AudioTimingStatus.unavailable,
      _ => AudioTimingStatus.unknown,
    };
  }

  Uri? _parsePlaybackUri(dynamic rawValue) {
    if (rawValue is! String || rawValue.isEmpty) return null;
    final uri = Uri.tryParse(rawValue);
    if (uri == null || !uri.hasScheme || uri.scheme != 'https') return null;
    return uri;
  }
}
