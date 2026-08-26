import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

typedef AssetTextLoader = Future<String> Function(String assetKey);

final quranContentRepositoryProvider = Provider<QuranContentRepository>((ref) {
  return QuranContentRepository.fromAssetBundle(rootBundle);
});

/// An immutable Qur'an ayah sourced from the pinned Tanzil Uthmani corpus.
class QuranAyah {
  final int surah;
  final int number;
  final String text;

  const QuranAyah({
    required this.surah,
    required this.number,
    required this.text,
  });
}

/// The available text for one surah, preserving each original Uthmani string.
class QuranSurahContent {
  final int surah;
  final List<QuranAyah> ayahs;

  const QuranSurahContent({required this.surah, required this.ayahs});

  int get ayahCount => ayahs.length;
}

/// Reads the application-bundled Tanzil corpus without normalization or edits.
class QuranContentRepository {
  static const assetKey = 'assets/data/quran_text.json';

  final AssetTextLoader _loadText;
  Map<String, String>? _ayahsByKey;

  QuranContentRepository({required AssetTextLoader loadText})
      : _loadText = loadText;

  factory QuranContentRepository.fromAssetBundle(AssetBundle bundle) {
    return QuranContentRepository(loadText: bundle.loadString);
  }

  Future<QuranAyah> getAyah({required int surah, required int ayah}) async {
    _validateSurah(surah);
    if (ayah < 1) throw ArgumentError.value(ayah, 'ayah', 'Must be at least 1');

    final text = (await _ensureLoaded())['$surah:$ayah'];
    if (text == null) {
      throw RangeError('Ayah $surah:$ayah is not available in the corpus.');
    }
    return QuranAyah(surah: surah, number: ayah, text: text);
  }

  Future<QuranSurahContent> getSurah(int surah) async {
    _validateSurah(surah);
    final corpus = await _ensureLoaded();
    final ayahs = <QuranAyah>[];

    for (final entry in corpus.entries) {
      final parts = entry.key.split(':');
      if (parts.length != 2 || int.tryParse(parts[0]) != surah) continue;
      final ayahNumber = int.tryParse(parts[1]);
      if (ayahNumber == null) continue;
      ayahs.add(QuranAyah(surah: surah, number: ayahNumber, text: entry.value));
    }

    ayahs.sort((a, b) => a.number.compareTo(b.number));
    if (ayahs.isEmpty) {
      throw StateError('No ayahs were found for surah $surah.');
    }
    return QuranSurahContent(surah: surah, ayahs: List.unmodifiable(ayahs));
  }

  Future<Map<String, String>> _ensureLoaded() async {
    final existing = _ayahsByKey;
    if (existing != null) return existing;

    final decoded = jsonDecode(await _loadText(assetKey));
    if (decoded is! Map) {
      throw const FormatException('Qur\'an corpus must be a JSON object.');
    }

    final corpus = <String, String>{};
    decoded.forEach((key, value) {
      if (key is String && value is String) corpus[key] = value;
    });
    if (corpus.isEmpty) {
      throw const FormatException('Qur\'an corpus does not contain ayah text.');
    }

    _ayahsByKey = Map.unmodifiable(corpus);
    return _ayahsByKey!;
  }

  void _validateSurah(int surah) {
    if (surah < 1 || surah > 114) {
      throw ArgumentError.value(surah, 'surah', 'Must be in the range 1–114');
    }
  }
}
