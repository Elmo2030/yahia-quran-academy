import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart';

final localRecordingStoreProvider = Provider<LocalRecordingStore>(
  (ref) => LocalRecordingStore(),
);

final recordingStoreProvider = Provider<RecordingStore>(
  (ref) => ref.watch(localRecordingStoreProvider),
);

final parentReviewStoreProvider = Provider<ParentReviewStore>(
  (ref) => ref.watch(localRecordingStoreProvider),
);

class StoredRecording {
  final String id;
  final String profileId;
  final int surah;
  final int ayah;
  final String filePath;
  final int durationMs;
  final DateTime recordedAt;

  const StoredRecording({
    required this.id,
    required this.profileId,
    required this.surah,
    required this.ayah,
    required this.filePath,
    required this.durationMs,
    required this.recordedAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'profile_id': profileId,
        'surah': surah,
        'ayah': ayah,
        'file_path': filePath,
        'duration_ms': durationMs,
        'recorded_at': recordedAt.toUtc().toIso8601String(),
      };

  factory StoredRecording.fromJson(Map<String, dynamic> json) => StoredRecording(
        id: json['id'] as String,
        profileId: json['profile_id'] as String,
        surah: json['surah'] as int,
        ayah: json['ayah'] as int,
        filePath: json['file_path'] as String,
        durationMs: json['duration_ms'] as int,
        recordedAt: DateTime.parse(json['recorded_at'] as String).toUtc(),
      );
}

enum ParentVerdict { good, needsWork }

/// An append-only parent decision. It is intentionally separate from both the
/// practice-session record and cryptographic timing-verification state.
class ParentReview {
  final String id;
  final String recordingId;
  final String profileId;
  final String reviewerId;
  final int surah;
  final int ayah;
  final ParentVerdict verdict;
  final String? voiceNotePath;
  final DateTime reviewedAt;

  const ParentReview({
    required this.id,
    required this.recordingId,
    required this.profileId,
    required this.reviewerId,
    required this.surah,
    required this.ayah,
    required this.verdict,
    required this.voiceNotePath,
    required this.reviewedAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'recording_id': recordingId,
        'profile_id': profileId,
        'reviewer_id': reviewerId,
        'surah': surah,
        'ayah': ayah,
        'verdict': verdict.name,
        'voice_note_path': voiceNotePath,
        'reviewed_at': reviewedAt.toUtc().toIso8601String(),
      };

  factory ParentReview.fromJson(Map<String, dynamic> json) => ParentReview(
        id: json['id'] as String,
        recordingId: json['recording_id'] as String,
        profileId: json['profile_id'] as String,
        reviewerId: json['reviewer_id'] as String,
        surah: json['surah'] as int,
        ayah: json['ayah'] as int,
        verdict: ParentVerdict.values.byName(json['verdict'] as String),
        voiceNotePath: json['voice_note_path'] as String?,
        reviewedAt: DateTime.parse(json['reviewed_at'] as String).toUtc(),
      );
}

abstract interface class RecordingStore {
  Future<StoredRecording> save({
    required String profileId,
    required int surah,
    required int ayah,
    required String sourcePath,
    required int durationMs,
  });

  Future<StoredRecording?> latestFor({
    required String profileId,
    required int surah,
    required int ayah,
  });

  Future<List<StoredRecording>> recentFor({
    required String profileId,
    int limit = 20,
  });

  Future<void> delete(String recordingId);

  Future<void> enforceRetention({required String profileId});
}

abstract interface class ParentReviewStore {
  Future<ParentReview> addReview({
    required StoredRecording recording,
    required String reviewerId,
    required ParentVerdict verdict,
    String? voiceNotePath,
  });

  Future<ParentReview?> latestForRecording(String recordingId);
}

/// Device-local storage for child recordings and the parent decisions about
/// them. It has no Supabase client and no network dependency by design.
class LocalRecordingStore implements RecordingStore, ParentReviewStore {
  static const _directoryName = 'yqa_recordings';
  static const _recordingsFileName = 'recordings.json';
  static const _reviewsFileName = 'parent_reviews.json';
  static const _maxPerProfile = 50;
  static const _maxAge = Duration(days: 30);

  final Future<Directory> Function() _documentsDirectory;
  final DateTime Function() _clock;
  final String Function() _idFactory;

  LocalRecordingStore({
    Future<Directory> Function()? documentsDirectory,
    DateTime Function()? clock,
    String Function()? idFactory,
  })  : _documentsDirectory =
            documentsDirectory ?? getApplicationDocumentsDirectory,
        _clock = clock ?? DateTime.now,
        _idFactory = idFactory ?? _newId;

  static String _newId() =>
      'recording-${DateTime.now().toUtc().microsecondsSinceEpoch}-${Random.secure().nextInt(1 << 32)}';

  Future<Directory> get _root async {
    final documents = await _documentsDirectory();
    final directory = Directory('${documents.path}${Platform.pathSeparator}$_directoryName');
    if (!await directory.exists()) await directory.create(recursive: true);
    return directory;
  }

  Future<File> get _recordingsFile async =>
      File('${(await _root).path}${Platform.pathSeparator}$_recordingsFileName');

  Future<File> get _reviewsFile async =>
      File('${(await _root).path}${Platform.pathSeparator}$_reviewsFileName');

  @override
  Future<StoredRecording> save({
    required String profileId,
    required int surah,
    required int ayah,
    required String sourcePath,
    required int durationMs,
  }) async {
    if (profileId.isEmpty || surah < 1 || ayah < 1 || durationMs <= 0) {
      throw ArgumentError('Invalid recording metadata.');
    }

    final source = File(sourcePath);
    if (!await source.exists()) {
      throw StateError('The recorded audio file is no longer available.');
    }

    final root = await _root;
    final id = _idFactory();
    final destination = File(
      '${root.path}${Platform.pathSeparator}$id${_extensionFor(sourcePath)}',
    );
    await source.copy(destination.path);

    final recordedAt = _clock().toUtc();
    final recording = StoredRecording(
      id: id,
      profileId: profileId,
      surah: surah,
      ayah: ayah,
      filePath: destination.path,
      durationMs: durationMs,
      recordedAt: recordedAt,
    );
    final current = await _readRecordings();
    final replaced = current
        .where(
          (item) =>
              item.profileId == profileId &&
              item.surah == surah &&
              item.ayah == ayah,
        )
        .toList();
    current.removeWhere((item) => replaced.contains(item));
    current.add(recording);

    try {
      await _writeRecordings(current);
    } catch (_) {
      if (await destination.exists()) await destination.delete();
      rethrow;
    }
    for (final old in replaced) {
      await _deleteOwnedFile(old.filePath);
    }
    await enforceRetention(profileId: profileId);
    return recording;
  }

  @override
  Future<StoredRecording?> latestFor({
    required String profileId,
    required int surah,
    required int ayah,
  }) async {
    final matches = (await _readRecordings())
        .where(
          (item) =>
              item.profileId == profileId &&
              item.surah == surah &&
              item.ayah == ayah,
        )
        .toList()
      ..sort((a, b) => b.recordedAt.compareTo(a.recordedAt));
    return matches.isEmpty ? null : matches.first;
  }

  @override
  Future<List<StoredRecording>> recentFor({
    required String profileId,
    int limit = 20,
  }) async {
    if (limit < 1) throw ArgumentError.value(limit, 'limit');
    final recordings = (await _readRecordings())
        .where((item) => item.profileId == profileId)
        .toList()
      ..sort((a, b) => b.recordedAt.compareTo(a.recordedAt));
    return List.unmodifiable(recordings.take(limit));
  }

  @override
  Future<void> delete(String recordingId) async {
    final recordings = await _readRecordings();
    final recording = recordings.where((item) => item.id == recordingId).firstOrNull;
    if (recording == null) return;
    await _deleteOwnedFile(recording.filePath);
    recordings.remove(recording);
    await _writeRecordings(recordings);
  }

  @override
  Future<void> enforceRetention({required String profileId}) async {
    final recordings = await _readRecordings();
    final now = _clock().toUtc();
    final profileRecordings = recordings
        .where((item) => item.profileId == profileId)
        .toList()
      ..sort((a, b) => b.recordedAt.compareTo(a.recordedAt));
    final expired = profileRecordings
        .where((item) => now.difference(item.recordedAt) > _maxAge)
        .toSet();
    final retained = profileRecordings.where((item) => !expired.contains(item)).toList();
    if (retained.length > _maxPerProfile) {
      expired.addAll(retained.skip(_maxPerProfile));
    }
    if (expired.isEmpty) return;

    recordings.removeWhere(expired.contains);
    await _writeRecordings(recordings);
    for (final recording in expired) {
      await _deleteOwnedFile(recording.filePath);
    }
  }

  @override
  Future<ParentReview> addReview({
    required StoredRecording recording,
    required String reviewerId,
    required ParentVerdict verdict,
    String? voiceNotePath,
  }) async {
    if (reviewerId.isEmpty) throw ArgumentError.value(reviewerId, 'reviewerId');
    final review = ParentReview(
      id: _idFactory(),
      recordingId: recording.id,
      profileId: recording.profileId,
      reviewerId: reviewerId,
      surah: recording.surah,
      ayah: recording.ayah,
      verdict: verdict,
      voiceNotePath: voiceNotePath,
      reviewedAt: _clock().toUtc(),
    );
    final reviews = await _readReviews();
    reviews.add(review);
    await _writeReviews(reviews);
    return review;
  }

  @override
  Future<ParentReview?> latestForRecording(String recordingId) async {
    final reviews = (await _readReviews())
        .where((item) => item.recordingId == recordingId)
        .toList()
      ..sort((a, b) => b.reviewedAt.compareTo(a.reviewedAt));
    return reviews.isEmpty ? null : reviews.first;
  }

  Future<List<StoredRecording>> _readRecordings() async {
    final file = await _recordingsFile;
    if (!await file.exists()) return [];
    final raw = await file.readAsString();
    if (raw.isEmpty) return [];
    final decoded = jsonDecode(raw);
    if (decoded is! List) throw const FormatException('Recording index is invalid.');
    return decoded
        .map((item) => StoredRecording.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<List<ParentReview>> _readReviews() async {
    final file = await _reviewsFile;
    if (!await file.exists()) return [];
    final raw = await file.readAsString();
    if (raw.isEmpty) return [];
    final decoded = jsonDecode(raw);
    if (decoded is! List) throw const FormatException('Parent review index is invalid.');
    return decoded
        .map((item) => ParentReview.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<void> _writeRecordings(List<StoredRecording> recordings) async {
    await _atomicWrite(
      await _recordingsFile,
      jsonEncode(recordings.map((item) => item.toJson()).toList()),
    );
  }

  Future<void> _writeReviews(List<ParentReview> reviews) async {
    await _atomicWrite(
      await _reviewsFile,
      jsonEncode(reviews.map((item) => item.toJson()).toList()),
    );
  }

  Future<void> _atomicWrite(File destination, String contents) async {
    final temporary = File('${destination.path}.tmp');
    await temporary.writeAsString(contents, flush: true);
    if (await destination.exists()) await destination.delete();
    await temporary.rename(destination.path);
  }

  Future<void> _deleteOwnedFile(String path) async {
    final root = (await _root).absolute.path;
    final target = File(path).absolute.path;
    if (!target.startsWith('$root${Platform.pathSeparator}')) return;
    final file = File(target);
    if (await file.exists()) await file.delete();
  }

  String _extensionFor(String path) {
    final dot = path.lastIndexOf('.');
    return dot == -1 ? '.wav' : path.substring(dot);
  }
}
