# YAHYA Content Matrix

## Status legend

**COMPLETE**, **PARTIAL**, **MISSING**, **BLOCKED**, and **UNVERIFIED** describe evidence in the current repository, not editorial approval.

## Quran — COMPLETE

| Area | Current evidence | Status |
| --- | --- | --- |
| Reader | 114-surah Uthmani Quran content, generated per-surah data | COMPLETE |
| Surah reader | `/read/:surah` route with reading progress | COMPLETE |
| Listening | catalogue and per-surah listening routes | COMPLETE |
| Audio source | generated recitation manifests and public catalogue | COMPLETE; individual asset health is not exhaustively re-verified here |

## Quran Stories — PARTIAL

- 42 stories in four chapters: 17 Prophets, 9 Nations, 8 Animals, and 8 Women.
- Routes support hub, chapter, and story detail (`/stories/:chapter/:slug`).
- Arabic metadata/content lives in `stories.ts`; English detail text is split into `stories-en.ts` and loaded via `useStoryText()`.
- Each story carries structured story material, Quran connection, lessons, question, action, source/reliability information, and an image reference.
- Story artwork references are validated by `story-art.test.ts`; full human visual/editorial approval remains **UNVERIFIED**.
- A deeper 9–11 layer for all stories is **MISSING / EDITORIAL_DECISION_REQUIRED**.

## Seerah — COMPLETE / PARTIAL

| Item | Evidence | Status |
| --- | --- | --- |
| Stations | 9 `seerahStations` | COMPLETE |
| Stories | 100 `seerahStories` | COMPLETE |
| Bilingual text and source/reliability markers | content model and tests | COMPLETE |
| Station/story flow | `/seerah`, `/seerah/:slug` | COMPLETE |
| Artwork quality/commission approval | references exist; editorial/asset approval is outside code | UNVERIFIED |

## Aqeedah — COMPLETE

- 7 chapters and 32 cards (`aqeedahChapters`, `aqeedahCards`).
- Route structure: `/aqeedah` and `/aqeedah/:slug`.
- Cards include bilingual text and chapter relationships. Challenges/rewards are implemented within the existing experience; an independent content approval pass is **NOT_VERIFIED**.

## Quran Facts («في رحاب القرآن») — COMPLETE

- 100 facts, grouped into 5 stages of 20.
- Hub `/quran-facts`; detail `/quran-facts/:slug`.
- States: locked, unlocked, current, completed.
- Opening a detail records persistent discovery; named child discovery is isolated by profile key.
- Quiz exists but is not the completion requirement.
- Facts include source/reference data. Conflicting historical scientific/editorial claims require **EDITORIAL_DECISION_REQUIRED**, not automatic copy changes.

## Hifz — COMPLETE / PARTIAL

| Area | Status | Notes |
| --- | --- | --- |
| Juz Amma journey and 4 map zones | COMPLETE | Includes al-Fatiha and the configured journey surahs |
| Surah practice and spaced review | COMPLETE | 1/3/7/14/30-day review model is documented in code/readme |
| Segment recital | COMPLETE | Ready, recording, recorded, saved-for-parent, and retry paths |
| Parent review | COMPLETE | Awaiting-parent, reviewed, needs-practice states |
| Local recordings | COMPLETE | IndexedDB only; no upload |
| Rewards/looks/stars | COMPLETE | Existing local Hifz reward model |
| Certificate | PARTIAL | Route and existing asset/implementation exist; final visual/spec approval is UNVERIFIED |

## Asset matrix

| Asset area | Status | Evidence/limitation |
| --- | --- | --- |
| Character assets | COMPLETE | Existing local art/pose mappings |
| Hifz maps, surah art, rewards | COMPLETE | Public responsive asset variants and generated mapping |
| Hifz certificate background | COMPLETE | Public certificate asset variants |
| Quran Story artwork | PARTIAL | References/tests exist; watermarked production-facing artwork remains an external remediation issue |
| Story key-moment artwork | PARTIAL | No separate complete key-moment inventory is represented as a product data model |
| Surah icons | UNVERIFIED | Hifz surah art exists; a separate approved 38-icon mapping specification is not present |
| `بوصلة النجوم` | UNVERIFIED | No confirmed named implementation found |

## Known remediation dependencies

These entries come from the current root `TODO.md`; they are not silently treated as complete product features.

| Area | Status | Required action |
| --- | --- | --- |
| Published visual watermark | BLOCKED | Approximately 175 published images need clean, approved source replacements; do not remove watermarks programmatically. |
| `fatima-recite` | EXTERNAL_DEPENDENCY | Existing asset has a known generation colour defect; replace only with approved clean art. |
| Story key moments | MISSING | 42 one-per-story key-moment artworks require approved assets. |
| Stories age 9–11 layer | EDITORIAL_DECISION_REQUIRED | Add an approved deeper layer to the eight identified priority stories; do not rewrite religious content from inference. |
| Quran Facts claim audit | EDITORIAL_DECISION_REQUIRED | 16 historical/scientific claims need explicit editorial review before changing child-facing claims. |
| Surah 72 audio | EXTERNAL_DEPENDENCY | R2 audio has known damaged frames; replace the source file rather than concealing playback symptoms in UI. |
