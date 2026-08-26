/// The declared purpose of a child practice session.
///
/// This is deliberately not a mastery status. A session records what the
/// child practised and how it was reviewed, while any future automated verdict
/// remains behind its separate confidence gate.
enum PracticeMode { selfReview }

/// The source that initiated the practice session.
enum PracticeSessionSource { talaqqi }

/// An offline-first record of a child-led practice session.
///
/// Schema version 2 removes the artificial requirement for a numerical score
/// or machine-generated mistakes. It is kept locally until the additive
/// Supabase session-v2 migration is approved and applied.
class PracticeSession {
  static const schemaVersion = 2;

  final String id;
  final String profileId;
  final int surah;
  final int ayahStart;
  final int ayahEnd;
  final int durationSeconds;
  final int attemptCount;
  final PracticeMode practiceMode;
  final PracticeVerificationStatus verificationStatus;
  final PracticeSessionSource source;
  final DateTime startedAt;
  final DateTime? endedAt;

  const PracticeSession({
    required this.id,
    required this.profileId,
    required this.surah,
    required this.ayahStart,
    required this.ayahEnd,
    required this.durationSeconds,
    required this.attemptCount,
    required this.startedAt,
    this.endedAt,
    this.practiceMode = PracticeMode.selfReview,
    this.verificationStatus = PracticeVerificationStatus.selfReview,
    this.source = PracticeSessionSource.talaqqi,
  })  : assert(surah >= 1 && surah <= 114),
        assert(ayahStart >= 1),
        assert(ayahEnd >= ayahStart),
        assert(durationSeconds >= 0),
        assert(attemptCount >= 0);

  Map<String, dynamic> toJson() => {
        'schemaVersion': schemaVersion,
        'id': id,
        'profileId': profileId,
        'surah': surah,
        'ayahStart': ayahStart,
        'ayahEnd': ayahEnd,
        'durationSeconds': durationSeconds,
        'attemptCount': attemptCount,
        'practiceMode': practiceMode.name,
        'verificationStatus': verificationStatus.name,
        'source': source.name,
        'startedAt': startedAt.toIso8601String(),
        'endedAt': endedAt?.toIso8601String(),
      };
}

/// Persistence seam for a completed child-led practice session.
abstract interface class PracticeSessionSink {
  Future<void> logPracticeSession(PracticeSession session);
}

/// Indicates whether a trustworthy automated verdict is available.
///
/// [selfReview] is the only status emitted by the current child practice loop.
enum PracticeVerificationStatus {
  selfReview,
  unavailable,
  uncertain,
  verified,
}
