# Manus Work Brief — Yehia Quran Academy

**Repo:** `https://github.com/Elmo2030/faras-quran-ai` (private)
**Baseline commit:** `cc1db45` on `main`
**Window:** 2 days
**Written by:** Claude (contract owner). Manus owns implementation. Claude verifies at the end.

---

## 0. Read this first — the one thing that matters

The app is a **Talaqqi loop**: the sheikh recites an ayah → the child repeats it →
the AI scores the child and **tells them which words were wrong** → the child retries.

Today the loop breaks at step 3. The backend already computes per-word mistakes
and Flutter already parses them — **but nothing is ever shown to the user, and the
app auto-advances to the next ayah regardless of score.** So from the user's seat,
the AI appears not to be listening or correcting at all.

Closing that gap is the point of these two days. Everything else is secondary.

---

## 1. Ground rules

- **Do not change these without asking Ahmed first:** the WebSocket wire protocol,
  the `EvaluationResult` / `AiEvaluation` field names, or the Supabase schema in
  `supabase/init_schema.sql`. UI is written against these; changing a type means
  rewriting the layers above it.
- Work on a branch (`manus/day1-…`), open a PR per task group. Do not push to `main`.
- Keep the existing code style. The repo uses terse, comment-light Dart with
  Riverpod `StateNotifier`. Match it.
- `backend/venv/` and `__pycache__/` are gitignored — keep them out of commits.
- Every task below has a **Done when** line. That is the acceptance test.

---

## 2. TASK 0 — GATE: prove the scoring engine actually works (do this first)

**Why this is a gate:** everything downstream assumes the score is meaningful.
Right now nobody has verified that a *correct* recitation scores highly. In the
only end-to-end run so far, Whisper transcribed simulator silence as gibberish and
returned **6.5** — which is correct behaviour for silence, but tells us nothing
about a real recitation. If the engine can't score a perfect recitation above ~85,
the correction UI is being built on sand.

**The trick:** we already have ground-truth audio. The reciter's own recording of
each ayah *is* a perfect recitation. Feed it back into the scorer.

### Steps

1. Download the reciter audio + timestamps:
   - `https://rhcfcyvxgbltdzeezryw.supabase.co/storage/v1/object/public/quran-audio/001.m4a`
   - `https://rhcfcyvxgbltdzeezryw.supabase.co/storage/v1/object/public/quran-audio/001.json`
   (The JSON is a list of `{surah, ayah, start_ms, end_ms, text}`.)
2. Write `backend/tools/benchmark_scoring.py`. For each of the 7 Al-Fatihah ayahs:
   slice the m4a to `[start_ms, end_ms]`, run it through the **existing** pipeline
   (`AudioProcessor` → `TajweedEvaluator.evaluate`), and record the score.
3. Repeat the whole sweep for `WHISPER_MODEL` = `tiny`, `base`, `small`.
4. Also record wall-clock inference time per ayah for each model.

### Output

A table committed as `backend/tools/BENCHMARK.md`:

| model | ayah | score | recognized text | seconds |
|-------|------|-------|-----------------|---------|

Plus a 3-line verdict at the top: which model to ship, and its mean score on
perfect audio.

### Done when

`BENCHMARK.md` exists with all 21 rows filled.

### ⚠️ STOP CONDITION

If **no** model scores a mean of **≥ 85** on perfect reciter audio, **stop and
report to Ahmed before starting Task 1.** That result means Whisper is the wrong
engine for Quranic Arabic and the decision is Claude's/Ahmed's to make, not a thing
to code around. Say so plainly in the PR; do not lower the pass threshold to make
it look green.

---

## 3. TASK 1 — Close the correction loop (the actual product)

This is the highest-value work in the two days. Four sub-tasks.

### 1a. Carry the data into state

`lib/features/recitation/domain/talaqqi_state.dart` currently drops everything the
AI returned except the score. Add to `TalaqqiState` (and to `copyWith`):

```dart
final List<AiMistake> mistakes;      // default const []
final String recognizedText;         // default ''
final int attemptCount;              // default 0 — attempts on the CURRENT ayah
```

In `talaqqi_controller.dart`, populate these from `evaluation` in the Phase 4 block
where `lastScore` is already set.

**Note:** the backend also returns `feedback` and `recognized_text`, but
`AiEvaluation.fromJson` in `lib/features/recitation/models/ai_evaluation_model.dart`
ignores both. Add `recognizedText` and `feedback` fields to `AiEvaluation` —
additive only, do not rename `score` or `mistakes`.

### 1b. Build the mistake-highlighting widget

New file: `lib/features/recitation/presentation/widgets/ayah_feedback_card.dart`

- Renders the expected ayah **split on whitespace into words**.
- A word whose index appears in `mistakes[].wordIndex` renders in the error colour
  (use the existing `AppColors` from `lib/core/theme/app_theme.dart` — do not invent
  new hex values); correct words render normally.
- Tapping a highlighted word shows its `details` string (a tooltip or a small
  bottom sheet — your call).
- Must render right-to-left correctly. Wrap in `Directionality(textDirection: TextDirection.rtl)`
  and verify with a multi-word ayah, e.g. Al-Fatihah ayah 7.
- Below the words, show `recognizedText` in muted small type, labelled
  "اللي سمعته:" — so the child sees *why* they were marked wrong.

**Word-index contract:** the backend computes indices against the **normalized**
expected text (`_normalize_arabic` strips tashkeel and collapses whitespace) in
`backend/app/models/tajweed_engine.py:_find_word_mistakes`. Word *count* is
preserved by normalization, so index N in the normalized text is index N in the
display text. Verify this holds on ayah 7 before trusting it; if it does not,
fix it in the **backend** by returning indices against the raw text — do not
paper over it in the widget.

### 1c. Wire it into the results view

In `lib/features/recitation/presentation/recitation_room_screen.dart`, the block at
line ~91 currently renders `_ScoreFeedback(score:)` alone. Show `AyahFeedbackCard`
beneath it whenever `state.mistakes.isNotEmpty`, in **both** the `success` and
`error` phases.

### 1d. Add the retry flow

Today `recitation_room_screen.dart:109` calls `ctrl.nextAyah()` on success, and the
ayah advances no matter what. Replace with:

- **score ≥ 70** → "التالي ➜" advances (existing behaviour).
- **score < 70** → primary button becomes **"حاول تاني"**, which re-runs the
  recitation for the *same* ayah and increments `attemptCount`. Add a
  `retryCurrentAyah()` method to `TalaqqiController` — reset phase to `idle` and
  re-enter `startTalaqqiSession()` without touching `currentAyah`.
- **attemptCount ≥ 3** → also offer a secondary "تخطي" (skip) so a child cannot get
  stuck. Skipping still logs the session.

### Done when

On a failed recitation the child sees: the score, the ayah with the wrong words
highlighted, what the AI heard, and a "حاول تاني" button that re-records the same
ayah. Screenshot it on the simulator and attach to the PR.

---

## 4. TASK 2 — Full Quran text (the scale unlock)

`backend/app/models/tajweed_engine.py` hardcodes a 7-entry dict `_AYAH_TEXT`
covering only Al-Fatihah. Every other surah returns `score=80.0` with the message
"Could not find reference text" — a silent fake pass.

### Steps

1. Source the full Uthmani text (6,236 ayahs, 114 surahs) from an open dataset —
   Tanzil or the quran.com API are both fine. **Verify the text is the Uthmani
   script with tashkeel**, matching the style of the 7 ayahs already in the dict.
2. Emit `backend/data/quran_text.json` keyed `"{surah}:{ayah}"` → text.
3. Replace `_AYAH_TEXT` with a lazily-loaded lookup (`@lru_cache`, same pattern as
   `_load_whisper`). **Keep the `_get_ayah_text(surah, ayah) -> str` signature
   unchanged** — it is the seam the rest of the engine is written against.
4. Also write a seeder `backend/tools/seed_quran_metadata.py` that upserts into the
   existing `quran_metadata` table (`surah`, `ayah`, `word_timestamps`). Leave
   `word_timestamps` NULL where unknown — do not invent timings.

### Correctness check (non-negotiable)

This is scripture. A silent corruption here is far worse than a missing feature.
Assert before committing:
- exactly 6,236 ayahs
- surah 1 has 7, surah 2 has 286, surah 114 has 6
- the 7 Al-Fatihah strings match the current hardcoded dict **byte for byte**

Put those assertions in the generator script so they run every time, and paste the
output in the PR.

### Done when

`_get_ayah_text(2, 255)` returns Ayat al-Kursi, and the assertions above pass.

---

## 5. TASK 3 — Persist gamification

`lib/features/gamification/gamification_controller.dart:107` seeds from an in-memory
mock mirroring `journey_state.dart`. Points and level progress are lost on restart.

- Persist to Supabase against the current profile. The `memorization_logs` table
  already stores per-session score; derive totals from it rather than adding a new
  points column, unless that proves too slow — if you do add a column, put the
  migration in `supabase/` and flag it in the PR as a schema change.
- Read through `LocalDbService` (`lib/core/local_db/isar_service.dart`) so it works
  offline, consistent with how `memorization_repository.dart` already does it.

### Done when

Earn points → kill the app → reopen → points are still there.

---

## 6. Explicitly OUT of scope

Do not start these; they need decisions Ahmed hasn't made yet:
- Replacing Whisper with another STT engine (that is Task 0's *output*, not a task)
- Real tajweed rules (qalqalah, ghunnah, madd) — current scoring is text similarity
  only, and pretending otherwise in UI copy would mislead a child
- Auth / onboarding rework — login is deliberately bypassed for the MVP demo
  (`app_router.dart` returns null for unauthenticated users)
- Any change to `supabase/init_schema.sql` beyond additive columns

---

## 7. Suggested sequencing

| | Morning | Afternoon |
|---|---|---|
| **Day 1** | Task 0 — benchmark gate | Task 1a–1b — state + highlight widget |
| **Day 2** | Task 1c–1d — wire up + retry | Task 2 — full Quran text |
| *stretch* | | Task 3 — gamification persistence |

Task 1 outranks Task 2. If time runs short, ship a working correction loop on
Al-Fatihah rather than a full Quran that still can't correct anyone.

---

## 8. Known-unverified — inherited state, please confirm

The last session changed three things that were **never verified end-to-end**.
Treat them as suspect, not as working baseline:

1. `talaqqi_controller.dart` — audio is now sent **once** after recording stops
   (`_sendFullRecording`) instead of re-sending the growing file every 500ms. The
   old behaviour sent ~1.9 MB for a 7-second clip.
2. Timeouts in `endStreamAndAwaitResult` raised to 15s / 30s (were 1.5s / 4s, which
   always expired before Whisper finished, so the app silently fell back to a fake
   80% pass).
3. `WHISPER_MODEL` default changed `base` → `tiny` in `tajweed_engine.py`.

Task 0 will incidentally confirm or refute all three. If the fallback-80 path is
still reachable, say so — **that fake pass is worse than an error message**, because
it tells a child they recited correctly when the system has no idea.
