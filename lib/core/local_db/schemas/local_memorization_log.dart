/// Local memorization log entry — stored as JSON on disk.
/// Same fields as the Supabase `memorization_logs` table + `isSynced` flag.
class LocalMemorizationLog {
  final int id;
  final String profileId;
  final String sessionId;
  final int durationSeconds;
  final double score;
  final String mistakesJson;
  final DateTime startedAt;
  final DateTime? endedAt;
  final bool isSynced;

  const LocalMemorizationLog({
    required this.id,
    required this.profileId,
    required this.sessionId,
    required this.durationSeconds,
    required this.score,
    required this.mistakesJson,
    required this.startedAt,
    this.endedAt,
    this.isSynced = false,
  });

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
      };

  factory LocalMemorizationLog.fromJson(Map<String, dynamic> json) =>
      LocalMemorizationLog(
        id: json['id'] as int,
        profileId: json['profileId'] as String,
        sessionId: json['sessionId'] as String,
        durationSeconds: json['durationSeconds'] as int,
        score: (json['score'] as num).toDouble(),
        mistakesJson: json['mistakesJson'] as String,
        startedAt: DateTime.parse(json['startedAt'] as String),
        endedAt: json['endedAt'] != null
            ? DateTime.parse(json['endedAt'] as String)
            : null,
        isSynced: json['isSynced'] as bool? ?? false,
      );
}
