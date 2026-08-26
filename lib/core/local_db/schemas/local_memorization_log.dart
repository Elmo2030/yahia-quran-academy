/// Local practice log entry — stored as JSON on disk.
///
/// Version-1 records mirror the current Supabase `memorization_logs` table.
/// Version-2 records retain child-led practice data locally until an additive
/// session-v2 database migration exists; they must never be transformed into a
/// fabricated score merely to fit the legacy table.
class LocalMemorizationLog {
  final int id;
  final String profileId;
  final String sessionId;
  final int durationSeconds;
  final double? score;
  final String? mistakesJson;
  final DateTime startedAt;
  final DateTime? endedAt;
  final bool isSynced;
  final int schemaVersion;
  final String? practiceMode;
  final String? verificationStatus;
  final String? source;
  final int? surah;
  final int? ayahStart;
  final int? ayahEnd;
  final int attemptCount;
  final String? syncBlockReason;

  const LocalMemorizationLog({
    required this.id,
    required this.profileId,
    required this.sessionId,
    required this.durationSeconds,
    required this.startedAt,
    this.score,
    this.mistakesJson,
    this.endedAt,
    this.isSynced = false,
    this.schemaVersion = 1,
    this.practiceMode,
    this.verificationStatus,
    this.source,
    this.surah,
    this.ayahStart,
    this.ayahEnd,
    this.attemptCount = 0,
    this.syncBlockReason,
  });

  bool get isLegacySyncable =>
      schemaVersion == 1 && score != null && mistakesJson != null;

  LocalMemorizationLog copyWith({bool? isSynced}) => LocalMemorizationLog(
        id: id,
        profileId: profileId,
        sessionId: sessionId,
        durationSeconds: durationSeconds,
        score: score,
        mistakesJson: mistakesJson,
        startedAt: startedAt,
        endedAt: endedAt,
        isSynced: isSynced ?? this.isSynced,
        schemaVersion: schemaVersion,
        practiceMode: practiceMode,
        verificationStatus: verificationStatus,
        source: source,
        surah: surah,
        ayahStart: ayahStart,
        ayahEnd: ayahEnd,
        attemptCount: attemptCount,
        syncBlockReason: syncBlockReason,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'profileId': profileId,
        'sessionId': sessionId,
        'durationSeconds': durationSeconds,
        'score': score,
        'mistakesJson': mistakesJson,
        'startedAt': startedAt.toIso8601String(),
        'endedAt': endedAt?.toIso8601String(),
        'isSynced': isSynced,
        'schemaVersion': schemaVersion,
        'practiceMode': practiceMode,
        'verificationStatus': verificationStatus,
        'source': source,
        'surah': surah,
        'ayahStart': ayahStart,
        'ayahEnd': ayahEnd,
        'attemptCount': attemptCount,
        'syncBlockReason': syncBlockReason,
      };

  factory LocalMemorizationLog.fromJson(Map<String, dynamic> json) =>
      LocalMemorizationLog(
        id: json['id'] as int,
        profileId: json['profileId'] as String,
        sessionId: json['sessionId'] as String,
        durationSeconds: json['durationSeconds'] as int,
        score: (json['score'] as num?)?.toDouble(),
        mistakesJson: json['mistakesJson'] as String?,
        startedAt: DateTime.parse(json['startedAt'] as String),
        endedAt: json['endedAt'] != null
            ? DateTime.parse(json['endedAt'] as String)
            : null,
        isSynced: json['isSynced'] as bool? ?? false,
        schemaVersion: json['schemaVersion'] as int? ?? 1,
        practiceMode: json['practiceMode'] as String?,
        verificationStatus: json['verificationStatus'] as String?,
        source: json['source'] as String?,
        surah: json['surah'] as int?,
        ayahStart: json['ayahStart'] as int?,
        ayahEnd: json['ayahEnd'] as int?,
        attemptCount: json['attemptCount'] as int? ?? 0,
        syncBlockReason: json['syncBlockReason'] as String?,
      );
}
