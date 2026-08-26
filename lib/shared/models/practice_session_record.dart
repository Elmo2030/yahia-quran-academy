/// A persisted child-led practice session read from Supabase.
///
/// This record describes activity only. It deliberately carries no score,
/// mastery decision, or inferred recitation correction.
class PracticeSessionRecord {
  final String id;
  final String profileId;
  final String sessionId;
  final String source;
  final String practiceMode;
  final String verificationStatus;
  final int surah;
  final int ayahStart;
  final int ayahEnd;
  final int durationSeconds;
  final int attemptCount;
  final DateTime startedAt;
  final DateTime? endedAt;

  const PracticeSessionRecord({
    required this.id,
    required this.profileId,
    required this.sessionId,
    required this.source,
    required this.practiceMode,
    required this.verificationStatus,
    required this.surah,
    required this.ayahStart,
    required this.ayahEnd,
    required this.durationSeconds,
    required this.attemptCount,
    required this.startedAt,
    this.endedAt,
  });

  factory PracticeSessionRecord.fromJson(Map<String, dynamic> json) {
    return PracticeSessionRecord(
      id: json['id'] as String,
      profileId: json['profile_id'] as String,
      sessionId: json['session_id'] as String,
      source: json['source'] as String,
      practiceMode: json['practice_mode'] as String,
      verificationStatus: json['verification_status'] as String,
      surah: json['surah'] as int,
      ayahStart: json['ayah_start'] as int,
      ayahEnd: json['ayah_end'] as int,
      durationSeconds: json['duration_seconds'] as int,
      attemptCount: json['attempt_count'] as int,
      startedAt: DateTime.parse(json['started_at'] as String),
      endedAt: json['ended_at'] != null
          ? DateTime.parse(json['ended_at'] as String)
          : null,
    );
  }
}
