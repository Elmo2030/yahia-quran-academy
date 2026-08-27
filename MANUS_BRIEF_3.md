# Manus Work Brief 3 — Give the parent something to judge with

**Repo:** `https://github.com/Elmo2030/faras-quran-ai` (private)
**Written by:** Claude (contract owner). Manus owns implementation. Claude verifies.

> **Briefs 1 and 2 are retired.** `MANUS_BRIEF.md` describes an AI mistake-correction UI
> that was deliberately removed from the product. Do not build from it. `MANUS_BRIEF_2.md`
> is done except for localization and tests. **This brief supersedes both.**

---

## 0. Why this work exists

The product removed automated scoring and moved the judgement to the child and their
parents. That was the right call — Whisper cannot assess Quranic recitation, and a
fabricated score is worse than no score.

But the app moved the responsibility without moving the ability:

```
child records  →  child hears themselves  →  recording is DELETED  →  parent sees "12 minutes, 3 attempts"
```

`retryCurrentAyah()` and `nextAyah()` both call `recorder.cleanupLastRecording()`. The
recording exists only during the `selfReview` phase. The parent dashboard has no audio
playback at all — it shows minutes, session counts, and attempt counts.

So a parent is asked to decide whether their child recited correctly, from a duration.
That is a guess, not a decision.

**Task A fixes that.** **Task B** then uses the parent's verdict to build the review
queue the app is missing entirely.

The two are coupled on purpose: A produces the signal, B consumes it. Do A first.

---

## 1. TASK A — Keep the recording, let the parent hear it

### A1. Stop destroying the recording

Today the file is deleted on retry and on advance. Instead, save the **last** recording
per (profile, surah, ayah) and keep it after the session ends.

Create `lib/features/recitation/data/recording_repository.dart`:

```dart
abstract interface class RecordingStore {
  Future<StoredRecording> save({
    required String profileId,
    required int surah,
    required int ayah,
    required String sourcePath,
    required int durationMs,
  });
  Future<StoredRecording?> latestFor({ required String profileId, required int surah, required int ayah });
  Future<List<StoredRecording>> recentFor({ required String profileId, int limit = 20 });
  Future<void> delete(String recordingId);
  Future<void> enforceRetention({ required String profileId });
}
```

`StoredRecording` carries: `id`, `profileId`, `surah`, `ayah`, `filePath`, `durationMs`,
`recordedAt`. Store files under the app documents directory, not `Directory.systemTemp` —
the OS clears temp.

**Retention (required, not optional):** keep the latest recording per ayah, and cap the
total per profile at **50 recordings or 30 days, whichever comes first**. Call
`enforceRetention` after each save. Without this the device fills up silently.

Keep `cleanupLastRecording()` for the genuinely discarded case — a retry where the child
re-records the same ayah replaces the previous file rather than accumulating.

### A2. Parent playback + verdict

In the parent dashboard, add a section listing recent recordings per child: surah, ayah,
date, a play button, and two buttons:

- **«تمام»** → `ParentVerdict.good`
- **«محتاج مراجعة»** → `ParentVerdict.needsWork`

Optionally let the parent attach a short voice note (reuse `AudioRecordingService`).
Treat the voice note as stretch — the two buttons are the requirement.

### A3. The verdict is a NEW record — do not overload existing types

Two type decisions that are expensive to reverse, so they are fixed here:

1. **Do not reuse `PracticeVerificationStatus`.** Its `verified` / `uncertain` values mean
   *"the audio timing data was cryptographically verified"* — a completely different axis
   from *"a parent said the recitation was good."* Conflating them will produce a dashboard
   that cannot distinguish trustworthy timing from an approving father.

2. **Do not add a verdict field to `PracticeSession`.** A session is an append-only fact
   about something that already happened. A parent review arrives later, asynchronously,
   and may be revised. Mutating the session log to hold it is the wrong shape.

Create a separate append-only record instead:

```dart
enum ParentVerdict { good, needsWork }

class ParentReview {
  final String id;
  final String recordingId;   // the recording this judges
  final String profileId;     // the child
  final String reviewerId;    // the parent
  final int surah;
  final int ayah;
  final ParentVerdict verdict;
  final String? voiceNotePath;
  final DateTime reviewedAt;
}
```

### A4. Privacy — read this before writing any sync code

**These are voice recordings of children. Treat them accordingly.**

- **Store locally only.** Do NOT upload recordings or voice notes to Supabase in this task.
- **Check the existing sync path.** `lib/core/network/sync_engine.dart` and
  `MemorizationRepository.pushToSupabase` already push session data to the server. Make sure
  your new records do **not** get swept into that sync. Verify this explicitly and say so in
  the PR — silently uploading children's voices would be a serious defect.
- The `ParentReview` record (verdict only, no audio) **may** sync — it is not sensitive.
- Give the parent a delete control for any recording, and make it actually delete the file.
- If you think server storage is needed for a later feature, **stop and ask me.** That is a
  consent and data-protection decision, not an implementation detail.

### Done when

A parent opens the dashboard, plays back their child reciting a specific ayah from a session
that already ended, taps «تمام» or «محتاج مراجعة», and the verdict persists across an app
restart. No audio file leaves the device. Screenshot the dashboard section in the PR.

---

## 2. TASK B — The review queue (مراجعة)

The app only moves forward through ayahs. There is no mechanism that brings a child back to
something they learned last week.

This is the wrong way round for hifz. Memorizing new material is the easy part; retention is
the hard part, and traditional programs spend more time on review than on new memorization.
An app that only goes forward produces a child who "finished" Juz' Amma and can recite none
of it.

### B1. Scheduling model — use this one, do not invent another

Do **not** implement SM-2 or any algorithm needing a numeric quality score. We deliberately
have no scores. The parent's binary verdict is the scheduling signal, which is exactly enough.

A fixed interval ladder:

| rung | next review after |
|---|---|
| 0 | 1 day |
| 1 | 3 days |
| 2 | 7 days |
| 3 | 14 days |
| 4 | 30 days (stays here) |

Rules:

- An ayah enters the queue at **rung 0** when a practice session covering it completes.
- Parent verdict **«تمام»** → advance one rung, reschedule from now.
- Parent verdict **«محتاج مراجعة»** → reset to **rung 0**, due tomorrow.
- **No parent verdict at all** → the ayah stays at its current rung and stays due. It does
  not advance on silence. Absence of review is not evidence of mastery.
- `dueAt = lastEventAt + interval[rung]`.
- The queue is every ayah where `dueAt <= now`, oldest-due first.

Put this in `lib/features/review/domain/review_schedule.dart` as pure functions over data —
no I/O, no Riverpod. It must be unit-testable without a database.

### B2. Surface it

- On the child's home/journey screen: a clear entry point — «مراجعة اليوم · ٥ آيات».
  When the queue is empty, say so warmly rather than hiding the section.
- Starting a review session **reuses the existing talaqqi loop** — same listen → repeat →
  record → self-review flow, just sourcing the ayah from the review queue instead of the
  next unlearned one.

**Do not rewrite `TalaqqiController`.** Give it a way to be pointed at a specific
(surah, ayah) and let the review feature drive it. If that requires a small refactor of how
the controller picks its ayah, keep it minimal and say what you changed in the PR.

- On the parent dashboard: replace or supplement the minutes tile with something that answers
  the parent's actual question — «حفظ آيتين جديدتين · ٥ آيات محتاجة مراجعة · آخر مرة سمعت له:
  من ٣ أيام». Minutes may stay, but it must not be the headline.

### B3. Tests

`review_schedule.dart` is pure logic that silently governs what a child sees. Test it:

- rung advances on `good`, resets to 0 on `needsWork`
- an ayah with no verdict stays due and does not advance
- `dueAt` computes correctly at each rung
- queue ordering is oldest-due first
- an empty queue returns empty, not an error

### Done when

A child practises an ayah today; tomorrow it appears in «مراجعة اليوم». A parent marks
«تمام»; it disappears and returns three days later. A parent marks «محتاج مراجعة»; it returns
tomorrow. The schedule tests pass.

---

## 3. Rules

- Branches `manus/a-parent-review` and `manus/b-review-queue`. One PR each. Never push to main.
- Task A before Task B — B consumes A's signal.
- Do not reintroduce scores, mistake lists, or any automatic mastery verdict. That decision
  stands. If something you build starts to look like an automated judgement, stop and ask.
- Match existing style: terse Dart, Riverpod `StateNotifier`, Arabic user-facing strings.
- Keep `backend/venv/` and `__pycache__/` out of commits.

## 4. Out of scope

- Any AI or automated evaluation — deferred to a later phase by Ahmed's decision
- Server-side storage of recordings — needs a consent decision first (see A4)
- Non-Arabic-speaker support (transliteration in the app) — real gap, separate brief
- Teacher↔child linking
- Localization and tests from Brief 2 — still open, but not this brief

## 5. Report back

Per PR: what changed, the acceptance test result, a dashboard screenshot for Task A, and the
schedule test output for Task B.

Two things I want to hear about explicitly even though they are not tasks:

1. **Confirmation that no audio file reaches Supabase** — say which code path you checked.
2. Any place where you had to touch `TalaqqiController` to make review sessions work, and
   how much of it you had to change.
