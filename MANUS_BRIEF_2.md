# Manus Work Brief 2 — Content, Data & Scale

**Repo:** `https://github.com/Elmo2030/faras-quran-ai` (private)
**Written by:** Claude (contract owner). Manus owns implementation. Claude verifies.
**Relationship to Brief 1:** this is the **volume workstream**, run alongside or after
`MANUS_BRIEF.md` (the surgical correction-loop sprint).

---

## 0. What this workstream is

Brief 1 fixes the loop for **one surah**. This brief makes the app hold **real content
at real scale**, and turns it into an app an Arabic-speaking child can actually use.

Today the app is a demo wearing a product's clothes:

| | today | after this brief |
|---|---|---|
| Reference text | 7 ayahs hardcoded in Python | 6,236 ayahs, loaded |
| Reciter audio | 1 surah on Supabase | Juz' Amma (37 surahs) + Al-Fatihah |
| Journey map | 4 hardcoded fake levels | generated from real progress |
| UI language | English, in an Arabic children's app | Arabic |
| Tests | 7 lines, one file | real coverage on the scoring path |

This is bulk work. It is well-specified precisely because it is bulk — follow the
acceptance tests, and flag anything that contradicts this document rather than
working around it silently.

---

## 1. Do not collide with Brief 1

Brief 1 is editing these files. **Do not touch them in this workstream:**

```
lib/features/recitation/domain/talaqqi_state.dart
lib/features/recitation/domain/talaqqi_controller.dart
lib/features/recitation/models/ai_evaluation_model.dart
lib/features/recitation/presentation/**
backend/tools/benchmark_scoring.py
```

You *will* edit `backend/app/models/tajweed_engine.py` (Task B1). Brief 1 only reads
that file, so this is safe — but keep the change surgical: replace the `_AYAH_TEXT`
dict and nothing else.

**Task B5 (Arabic localization) touches every screen including the recitation ones.**
Do it LAST, after Brief 1's PR is merged, and rebase onto `main` before starting it.
Starting B5 early guarantees a painful conflict.

Branch naming: `manus/b1-quran-text`, `manus/b2-audio`, etc. One PR per task.

---

## 2. TASK B1 — The full Quran text corpus

**This supersedes "Task 2" in Brief 1.** It lives here, not there.

`backend/app/models/tajweed_engine.py` hardcodes a 7-entry dict `_AYAH_TEXT` covering
only Al-Fatihah. Every other surah hits the `if not expected_text` branch and returns
`score=80.0` — a **silent fake pass**. A child reciting Al-Baqarah today is told
"Excellent" by a system that has no reference text for it at all.

### Steps

1. Source the full Uthmani text — 6,236 ayahs, 114 surahs. Tanzil (tanzil.net) and the
   quran.com API are both established, citable sources. Record which you used and its
   licence terms in `backend/data/PROVENANCE.md`.
2. Emit `backend/data/quran_text.json`, keyed `"{surah}:{ayah}"` → text string.
3. Replace `_AYAH_TEXT` with a lazily-loaded lookup — use `@lru_cache`, mirroring the
   existing `_load_whisper()` pattern in the same file.
   **Keep the signature `_get_ayah_text(surah: int, ayah: int) -> str` unchanged.**
   It is the seam the rest of the engine is written against.
4. Delete the fake-pass branch. When reference text is genuinely missing, return an
   explicit error result — never a passing score. A wrong answer dressed as a pass is
   worse than an error, because the child believes it.

### Correctness gate — non-negotiable

This is scripture. A silent corruption is far worse than a missing feature. Put these
assertions **inside the generator script** so they run on every regeneration:

- exactly 6,236 ayahs total
- 114 surahs, none empty
- surah 1 = 7 ayahs, surah 2 = 286, surah 18 = 110, surah 114 = 6
- the 7 Al-Fatihah strings match the current hardcoded dict **byte for byte**
- no ayah string is empty or whitespace-only
- every string contains only Arabic-block characters, whitespace, and the
  ayah-separator marks actually present in the source

Paste the assertion output in the PR. If the byte-for-byte check on Al-Fatihah fails,
**stop and report** — it means the source uses a different orthography than the app,
and picking one is my call, not something to normalize away.

### Done when

`_get_ayah_text(2, 255)` returns Ayat al-Kursi, `_get_ayah_text(114, 6)` returns the
last ayah of An-Nas, all assertions pass, and no code path returns 80.0 for missing text.

---

## 3. TASK B2 — Reciter audio + per-ayah timestamps

The heaviest task here, and the biggest unlock. **Read `tools/alignment/generate_timestamps.py`
before planning — the pipeline already exists and works.** You are feeding it, not rebuilding it.

### Scope: Juz' Amma first, not all 114

Do **surahs 78–114 (Juz' Amma) plus Al-Fatihah** — 38 surahs. That is deliberate, not a
shortcut: Juz' Amma is what children memorize first, the surahs are short, and it is a
tractable amount of Whisper-`large` compute. Attempting all 114 will consume the whole
window on Al-Baqarah alone and leave nothing shippable.

If B2 finishes early, extend to Juz' Tabarak (67–77). Do not start Al-Baqarah.

### Steps

1. **Source Al-Hussary recitation audio, one mp3 per surah.** Use a source with clear
   distribution terms — everyayah.com and quranicaudio.com both host these openly and
   are the conventional sources. Record the source and its terms in
   `tools/alignment/PROVENANCE.md`. **If the terms are unclear or restrictive, stop and
   ask me before downloading in bulk** — do not scrape a site that does not permit it.
2. Lay out the tool's expected input: `tools/alignment/input/078.mp3` + `078.txt`
   (one ayah per line, Arabic). Generate the `.txt` files from B1's `quran_text.json` —
   B1 must land first.
3. Run `python generate_timestamps.py`. It compresses to 64 kbps mono `.m4a` and emits
   per-ayah `{surah, ayah, start_ms, end_ms, text}` JSON. Expect this to take hours;
   run it in one long batch, not interactively.
4. **Review the output before uploading.** The tool has an `_fallback_even_split` path
   that fires when Whisper returns nothing — it emits `start_ms: 0, end_ms: 0` for every
   ayah. Grep for that and re-run those surahs. Shipping zero-length segments means the
   sheikh plays nothing and the child records silence.
5. Sanity-check every surah: timestamps monotonically increasing, no ayah shorter than
   500 ms, last `end_ms` within a few seconds of the audio's real duration. Script this
   as `tools/alignment/validate_output.py` and paste its summary in the PR.

### Done when

`validate_output.py` passes for all 38 surahs, and you can name the 3 surahs with the
tightest and loosest alignment from your own review.

---

## 4. TASK B3 — Publish to Supabase

The app fetches from Supabase Storage at:

```
https://rhcfcyvxgbltdzeezryw.supabase.co/storage/v1/object/public/quran-audio/{NNN}.m4a
https://rhcfcyvxgbltdzeezryw.supabase.co/storage/v1/object/public/quran-audio/{NNN}.json
```

Zero-padded 3 digits — `001.m4a`, `078.json`. The existing `001.*` proves the contract;
match it exactly.

1. Write `tools/alignment/upload_to_supabase.py` — idempotent, re-runnable, skips
   unchanged files. Read credentials from env vars; **never commit a service key.**
2. Upload the B2 output.
3. Also seed the `quran_metadata` table (`surah`, `ayah`, `word_timestamps`) via
   `backend/tools/seed_quran_metadata.py`. The table already exists in
   `supabase/init_schema.sql`. Leave `word_timestamps` NULL where you only have
   ayah-level timing — **do not invent per-word timings.**

### Ask before running

Uploading to production storage is not reversible by you. Show me the file list and the
total size, and wait for my go-ahead before the first bulk upload.

### Done when

`curl` on `078.json` returns valid per-ayah records, and re-running the uploader
uploads nothing.

---

## 5. TASK B4 — Journey map from real data

`lib/features/journey_map/domain/journey_state.dart` returns four hardcoded
`JourneyLevel`s with a fake `totalPoints: 1250`. Every child sees the same fake progress.

Replace `journeyProvider` with a real provider that:

- Generates one level per ayah (or per small ayah group) for the surahs actually
  available in Supabase Storage — do not generate levels for content that has no audio.
- Derives `LevelStatus` from `memorization_logs`: completed if a passing score exists,
  active if it is the first non-completed level, locked after that.
- Derives `progress` from the best score on that ayah.
- Derives `totalPoints` from real logs, not a constant.
- Reads through `memorization_repository.dart`, which already handles the offline path —
  do not add a second data path.

**Keep the `JourneyLevel` / `JourneyState` shapes.** `journey_map_screen.dart` and
`journey_node_card.dart` are written against them; changing the shape means rewriting
the UI too.

Handle the empty state: a brand-new child with zero logs must see level 1 active, not
a blank screen or a crash.

### Done when

Two different profiles show different progress, and a fresh profile starts at
Al-Fatihah ayah 1 with 0 points.

---

## 6. TASK B5 — Arabic localization

**Do this last. Rebase onto `main` after Brief 1 merges.**

This is an Arabic Quran app for Arabic-speaking children whose interface currently says
"Keep going, you're doing great!", "Al-Fatihah 4", "Ayah 4", and "Excellent Work!".
The Quranic text renders correctly; everything around it is English.

1. Add `flutter_localizations` + `intl`, ARB files under `lib/l10n/` — `ar` as the
   default locale, `en` retained as fallback.
2. Extract every user-facing string. Grep for `Text(` across `lib/` — there is no
   central string file, so this is a file-by-file pass. That is the bulk of this task.
3. Set `MaterialApp.locale` to Arabic by default and confirm `Directionality` is RTL
   app-wide. The recitation screen already handles RTL for Quranic text; the rest of
   the app does not.
4. Surah names in Arabic (سورة الفاتحة, not "Al-Fatihah") — derive from B1's corpus if
   it carries names, otherwise add a small names table.
5. Use Arabic-Indic digits where a child reads them (ayah numbers, counts) but keep
   Latin digits for scores and technical values. Confirm this with me if unsure — it is
   a taste call, and I would rather you ask than guess across 40 files.

### Watch for

RTL layout bugs are silent — widgets do not throw, they just look wrong. Screenshot the
journey map, recitation room, and parent dashboard in Arabic and attach all three to the
PR. Check that icons, progress bars, and the back button mirror correctly.

### Done when

No English string is reachable in the default child-facing flow, and the three
screenshots show correct RTL.

---

## 7. TASK B6 — Test coverage (stretch)

`test/widget_test.dart` is 7 lines. There is effectively no coverage.

Priority order — the scoring path first, because it is the part that can be silently
wrong without anyone noticing:

1. **Python, `backend/`**: `_normalize_arabic` (tashkeel, alef variants, taa marbuta),
   `_compute_similarity` (identical text = 100, empty = 0), `_find_word_mistakes`
   (word indices land on the right words — this is the contract Brief 1's UI depends on).
2. **Dart**: `AiEvaluation.fromJson` against real backend payloads including the
   mistakes array; `JourneyState` derivation from a synthetic log set.
3. **Widget**: journey map renders a level list; empty state renders without crashing.

Do not chase a coverage percentage. Test the things that would ship a wrong score to a
child without failing loudly.

---

## 8. Out of scope

- Replacing Whisper as the STT engine — that depends on Brief 1's Task 0 benchmark
- Real tajweed rules (qalqalah, ghunnah, madd) — current scoring is text similarity only
- Auth / onboarding rework
- Al-Baqarah or full-Quran audio — see the B2 scope note
- Any non-additive change to `supabase/init_schema.sql`

---

## 9. Suggested order

```
B1  Quran text corpus          ← everything else depends on it
B2  Juz' Amma audio + timing   ← long compute, start early, run in background
B3  Publish to Supabase        ← ask before the bulk upload
B4  Journey map from real data
B5  Arabic localization        ← LAST, after Brief 1 merges, rebase first
B6  Tests                       ← stretch
```

B1 is the gate for B2 (it generates the `.txt` inputs). B2's compute can run in the
background while you do B4.

---

## 10. Reporting

Per PR: what changed, the acceptance test output pasted in full, screenshots for any UI
work, and anything you found that contradicts this brief. Three things I specifically
want to hear about even though they are not tasks:

- Any place still returning a fabricated passing score
- Any surah where the alignment looked wrong but you shipped it anyway
- Any string you could not localize because it is generated in code rather than declared
