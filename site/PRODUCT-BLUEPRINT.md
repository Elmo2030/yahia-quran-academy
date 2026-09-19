# YAHYA Product Blueprint

## Product overview — IMPLEMENTED

YAHYA Quran Academy is a bilingual Arabic/English Quran learning web application for children aged 6–11. It combines Quran reading/listening, Quran stories, Seerah, Aqeedah, Quran Facts, and a local-first Hifz journey. Optional accounts use Supabase; core reading works without signing in.

## Users and age model

| User | Current capability |
| --- | --- |
| Child (6–11) | Explore learning libraries, read/listen, progress through Hifz, choose a local Hifz profile, and receive encouraging next actions |
| Parent | Use a device-local child lock, review recitals/deeds, confirm declarations, manage recordings/backups, and view certificate eligibility |

The product-wide target age is 6–11. Quran stories currently have a 6–8-oriented layer; an expanded 9–11 layer for all 42 stories is **EDITORIAL_DECISION_REQUIRED / MISSING**.

## Product pillars — IMPLEMENTED

1. Quran reader and surah reading
2. Listening and recitation catalogue
3. Quran Stories
4. Seerah
5. Aqeedah
6. «في رحاب القرآن» / Quran Facts
7. Hifz Journey
8. Optional profile/account and device-local parent tools

## Child journey — IMPLEMENTED / PARTIAL

`Home → My journey → activity → completion/progress → next step`

`ChildJourney` and `nextStep()` present the current activity without creating a replacement global progression engine. Hifz next-step priority is: due review, needs-practice recital, awaiting-parent work, then last reading. A named child entering Story Detail records that Story as `in_progress` in the existing local child steps; My Journey offers the latest valid incomplete Story and returns to its normal route top. Scene, checkpoint, and scroll-position resume are not implemented.

### Seerah and Aqeedah continuity

Valid detail entry records `in_progress` for the active named child; the existing challenge's correct answer records `done`. Completion means finishing the activity, not mastery. The existing child `steps` map stores `seerah:<slug>` and `aqeedah:<slug>`, with stable `startedAt` and `doneAt`. Guests retain session-only interactions. Reopening completed content restores its existing reward and never downgrades progress.

My Journey's world destinations resume the newest valid incomplete item by original start time, using generated localized metadata. No candidate means the existing library destination. Hifz primary-action priority is unchanged. Detail pages offer a return to My Journey without removing library access.

`/journey` presents an illustrated world map, current mission, derived progress and earned-reward previews. `journey-worlds.ts` is presentation configuration, not another persisted progress model. Live worlds remain freely available; future worlds are explicitly non-interactive. The treasure destination is symbolic and never asserts religious mastery. On mobile the map becomes a vertical trail, with an in-page shortcut to the real current mission. Counts distinguish Hifz declarations, completed stories and revealed discoveries. Existing Hifz stars and confirmed deeds are reused; no XP or new reward economy is introduced.

Existing backup export/import includes these steps, covered by round-trip tests. No storage key or version changed. Older app binaries do not recognize these additive step keys and may drop them on save; export a backup using the updated release before rollback. Storage failures offer retry; resetting local storage still removes local progress.

## Parent journey — IMPLEMENTED

`Parent lock → parent review queue → recital/deed decision → approved or needs practice`

The parent lock is intentionally a child lock, not authentication or device security. Recital approval promotes declarations only in the recorded segment; needs-practice retains the child declaration and restarts the applicable practice path. Certificate UI is available at `/hifz/certificate`.

## Progress philosophy — IMPLEMENTED

- Learning is described as discovery, journey, review, practice, and completion.
- No Hifz grades, percentages, rankings, speech recognition, or automated audio accuracy are implemented.
- A parent is the only recital-quality judge.
- Quran Facts completion is recorded after a child reveals a valid fact detail; quiz success, Quran reading/listening, and source review are optional and never required for fact completion.

## Rewards — IMPLEMENTED / PARTIAL

Hifz has stars, ranks, gifts, treasures, looks, story-deed rewards, and a certificate route. Quran Facts has stage/medal-related UI. The product does not document a separately named `بوصلة النجوم` reward in code; it is **NOT_VERIFIED** as an implemented reward specification.

## Persistence and boundaries

| Area | Storage/boundary |
| --- | --- |
| Hifz profiles, declarations, steps, parent lock | localStorage key `yahya.hifz.v1`; `HIFZ_VERSION = 1` |
| Hifz recordings | IndexedDB database `yahya.recordings`; `DB_VERSION = 1` |
| Quran Facts discovery | localStorage, keyed by child profile when present |
| Reader progress | local-first; optionally mirrored to Supabase for signed-in profiles |
| Story library/progress | local-first with optional Supabase mirroring where implemented |
| Authentication | Optional Supabase Auth |

Hifz data and recordings must remain local-only. Do not raise `HIFZ_VERSION` or `DB_VERSION` without a tested migration.

## Architecture boundaries

- Client: React 19, TypeScript, Vite, Wouter.
- Deployment: Cloudflare Pages with `functions/_middleware.ts` for metadata/404/canonical behaviour.
- No custom application API is implemented in this repository.
- Supabase is an external authentication/data service; service-role secrets must never enter the client.
