enum ReviewVerdict { good, needsWork }

/// Fixed review intervals. There is deliberately no numeric quality score.
const reviewIntervals = <Duration>[
  Duration(days: 1),
  Duration(days: 3),
  Duration(days: 7),
  Duration(days: 14),
  Duration(days: 30),
];

class ReviewScheduleEntry {
  final String id;
  final String profileId;
  final int surah;
  final int ayah;
  final int rung;
  final DateTime lastEventAt;
  final DateTime dueAt;

  const ReviewScheduleEntry({
    required this.id,
    required this.profileId,
    required this.surah,
    required this.ayah,
    required this.rung,
    required this.lastEventAt,
    required this.dueAt,
  });

  factory ReviewScheduleEntry.fromRecording({
    required String recordingId,
    required String profileId,
    required int surah,
    required int ayah,
    required DateTime recordedAt,
    DateTime? eventAt,
  }) {
    final event = (eventAt ?? recordedAt).toUtc();
    return ReviewScheduleEntry(
      id: 'review-$recordingId',
      profileId: profileId,
      surah: surah,
      ayah: ayah,
      rung: 0,
      lastEventAt: event,
      dueAt: event.add(reviewIntervals.first),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'profile_id': profileId,
        'surah': surah,
        'ayah': ayah,
        'rung': rung,
        'last_event_at': lastEventAt.toUtc().toIso8601String(),
        'due_at': dueAt.toUtc().toIso8601String(),
      };

  factory ReviewScheduleEntry.fromJson(Map<String, dynamic> json) {
    return ReviewScheduleEntry(
      id: json['id'] as String,
      profileId: json['profile_id'] as String,
      surah: json['surah'] as int,
      ayah: json['ayah'] as int,
      rung: json['rung'] as int,
      lastEventAt: DateTime.parse(json['last_event_at'] as String).toUtc(),
      dueAt: DateTime.parse(json['due_at'] as String).toUtc(),
    );
  }

  ReviewScheduleEntry copyWith({
    int? rung,
    DateTime? lastEventAt,
    DateTime? dueAt,
  }) {
    return ReviewScheduleEntry(
      id: id,
      profileId: profileId,
      surah: surah,
      ayah: ayah,
      rung: rung ?? this.rung,
      lastEventAt: lastEventAt ?? this.lastEventAt,
      dueAt: dueAt ?? this.dueAt,
    );
  }
}

ReviewScheduleEntry applyParentVerdict(
  ReviewScheduleEntry entry,
  ReviewVerdict verdict, {
  DateTime? eventAt,
}) {
  final event = (eventAt ?? DateTime.now()).toUtc();
  final nextRung = verdict == ReviewVerdict.good
      ? (entry.rung + 1).clamp(0, reviewIntervals.length - 1)
      : 0;
  return entry.copyWith(
    rung: nextRung,
    lastEventAt: event,
    dueAt: event.add(reviewIntervals[nextRung]),
  );
}

List<ReviewScheduleEntry> dueReviews(
  Iterable<ReviewScheduleEntry> entries, {
  required DateTime now,
  String? profileId,
}) {
  final due = entries
      .where(
        (entry) =>
            (profileId == null || entry.profileId == profileId) &&
            !entry.dueAt.isAfter(now.toUtc()),
      )
      .toList()
    ..sort((a, b) {
      final byDue = a.dueAt.compareTo(b.dueAt);
      if (byDue != 0) return byDue;
      final bySurah = a.surah.compareTo(b.surah);
      return bySurah != 0 ? bySurah : a.ayah.compareTo(b.ayah);
    });
  return due;
}
