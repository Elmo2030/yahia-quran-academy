class MemorizationLog {
  final String id;
  final String profileId;
  final String sessionId;
  final int durationSeconds;
  final double score;
  final List<Map<String, dynamic>>? mistakes;
  final DateTime startedAt;
  final DateTime? endedAt;

  const MemorizationLog({
    required this.id,
    required this.profileId,
    required this.sessionId,
    required this.durationSeconds,
    required this.score,
    this.mistakes,
    required this.startedAt,
    this.endedAt,
  });

  factory MemorizationLog.fromJson(Map<String, dynamic> json) =>
      MemorizationLog(
        id: json['id'] as String,
        profileId: json['profile_id'] as String,
        sessionId: json['session_id'] as String,
        durationSeconds: json['duration_seconds'] as int,
        score: (json['score'] as num).toDouble(),
        mistakes: (json['mistakes'] as List?)?.cast<Map<String, dynamic>>(),
        startedAt: DateTime.parse(json['started_at'] as String),
        endedAt: json['ended_at'] != null
            ? DateTime.parse(json['ended_at'] as String)
            : null,
      );
}
