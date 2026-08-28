import 'package:flutter_test/flutter_test.dart';

import 'package:faras_quran_ai/features/review/domain/review_schedule.dart';

ReviewScheduleEntry entry({
  String id = 'r1',
  String profileId = 'child-1',
  int surah = 1,
  int ayah = 1,
  int rung = 0,
  required DateTime lastEventAt,
  DateTime? dueAt,
}) {
  return ReviewScheduleEntry(
    id: id,
    profileId: profileId,
    surah: surah,
    ayah: ayah,
    rung: rung,
    lastEventAt: lastEventAt,
    dueAt: dueAt ?? lastEventAt.add(reviewIntervals[rung]),
  );
}

void main() {
  final base = DateTime.utc(2026, 8, 28, 10);

  test('new recording enters rung zero and is due after one day', () {
    final scheduled = ReviewScheduleEntry.fromRecording(
      recordingId: 'recording-1',
      profileId: 'child-1',
      surah: 2,
      ayah: 10,
      recordedAt: base,
    );

    expect(scheduled.rung, 0);
    expect(scheduled.dueAt, base.add(const Duration(days: 1)));
  });

  test('good advances one rung and uses the next interval', () {
    final scheduled = applyParentVerdict(
      entry(lastEventAt: base),
      ReviewVerdict.good,
      eventAt: base.add(const Duration(days: 1)),
    );

    expect(scheduled.rung, 1);
    expect(scheduled.dueAt, base.add(const Duration(days: 4)));
  });

  test('good stays at the final rung', () {
    final scheduled = applyParentVerdict(
      entry(lastEventAt: base, rung: reviewIntervals.length - 1),
      ReviewVerdict.good,
      eventAt: base,
    );

    expect(scheduled.rung, reviewIntervals.length - 1);
    expect(scheduled.dueAt, base.add(const Duration(days: 30)));
  });

  test('needs work resets to rung zero and is due tomorrow', () {
    final scheduled = applyParentVerdict(
      entry(lastEventAt: base, rung: 3),
      ReviewVerdict.needsWork,
      eventAt: base.add(const Duration(days: 10)),
    );

    expect(scheduled.rung, 0);
    expect(scheduled.dueAt, base.add(const Duration(days: 11)));
  });

  test('no verdict leaves the entry due without advancing it', () {
    final due = dueReviews(
      [entry(lastEventAt: base)],
      now: base.add(const Duration(days: 1)),
    );

    expect(due, hasLength(1));
    expect(due.single.rung, 0);
    expect(due.single.dueAt, base.add(const Duration(days: 1)));
  });

  test('due queue is oldest first and empty input stays empty', () {
    final due = dueReviews(
      [
        entry(
          id: 'later',
          ayah: 2,
          lastEventAt: base.subtract(const Duration(days: 3)),
        ),
        entry(
          id: 'older',
          ayah: 1,
          lastEventAt: base.subtract(const Duration(days: 5)),
        ),
        entry(
          id: 'future',
          ayah: 3,
          lastEventAt: base,
        ),
      ],
      now: base,
    );

    expect(due.map((item) => item.id), ['older', 'later']);
    expect(dueReviews(const [], now: base), isEmpty);
  });
}
