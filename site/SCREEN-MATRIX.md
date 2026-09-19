# YAHYA Screen Matrix

Routes and statuses below are derived from `client/src/App.tsx` and current pages. A single route may render multiple states; those are listed in **State**.

| # | Screen | Route | User | Purpose | Entry | Exit | State | Data | Progress | Reward | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Home | `/` | Child/parent | Landing and journey entry | Global nav | Library/journey | new/returning | local + optional remote | next action | existing surfaces | COMPLETE |
| 2 | Quran Reader | `/read` | Child | Select/read Quran | nav | surah reader | selector/loading/error | Quran data | reader position | — | COMPLETE |
| 3 | Surah Reader | `/read/:surah` | Child | Read one surah | reader | back/home | reading/audio | Quran data | local-first reading | — | COMPLETE |
| 4 | Listening | `/listen` | Child | Browse listening | nav | surah listening | catalogue | manifests | — | — | COMPLETE |
| 5 | Surah Listening | `/listen/:surah` | Child | Listen to one surah | listening | back | active/unavailable | audio manifest | NOT_VERIFIED per asset | — | COMPLETE |
| 6 | Quran Stories | `/stories` | Child | Story library entry | nav | chapter/hub | chapter list | stories | library state | — | COMPLETE |
| 7 | Stories Hub | `/stories/:chapter` | Child | Browse stories | stories | detail | available/completed | stories | local/optional state | story reward | COMPLETE |
| 8 | Story Detail | `/stories/:chapter/:slug` | Child | Read and act | hub | contextual return | detail/challenge | story text | story step | story reward | PARTIAL |
| 9 | My Stories | No standalone route | Child | Saved/completed stories | NOT_VERIFIED | — | — | library/profile | — | — | MISSING |
| 10 | Seerah Map | `/seerah` | Child | Browse stations | nav | story | stations | Seerah content | — | — | COMPLETE |
| 11 | Seerah Story | `/seerah/:slug` | Child | Read Seerah story | map | back | detail/challenge | Seerah content | existing state | existing reward | COMPLETE |
| 12 | Aqeedah Journey | `/aqeedah` | Child | Browse chapters/cards | nav | card | chapter/current | Aqeedah content | existing state | existing reward | COMPLETE |
| 13 | Aqeedah Card | `/aqeedah/:slug` | Child | Read card/challenge | journey | back | card/challenge | Aqeedah content | existing state | existing reward | COMPLETE |
| 14 | Quran Facts | `/quran-facts` | Child | Five-stage fact journey | nav | detail | locked/current/etc. | facts | discovery | medals | COMPLETE |
| 15 | Quran Fact Detail | `/quran-facts/:slug` | Child | Discover one fact | card | contextual return | discovered/quiz | fact | persistent discovery | stage/medal | COMPLETE |
| 16 | Hifz Entry / child choice | `/hifz` | Child | Choose/create child | journey | map | no child/profile | local profiles | profile context | — | COMPLETE |
| 17 | Hifz Journey / Map | `/hifz` | Child | Map/current work | entry | surah/review | zones/surah | local Hifz | spacing/status | stars | COMPLETE |
| 18 | Hifz Surah | `/hifz/:surah` | Child | Learn ayahs | map | recite/review | declared/due | local Hifz | ayah history | stars | COMPLETE |
| 19 | Recite Ready | `/hifz/:surah/recite` | Child | Start hidden-ayah recital | surah | recording | ready/practice/waiting | recital segment | recital step | — | COMPLETE |
| 20 | Recording | `/hifz/:surah/recite` | Child | Record recital | ready | recorded | recording/error | IndexedDB | local only | — | COMPLETE |
| 21 | After Recording | `/hifz/:surah/recite` | Child | Listen/retry/submit | recording | saved/retry | recorded/revealed | local recording | recital step | — | COMPLETE |
| 22 | Saved for Parent | `/hifz/:surah/recite` | Child | Confirm local saved recital | recorded | Hifz | awaiting parent | local recital | parent queue | — | COMPLETE |
| 23 | Needs Practice | `/hifz/:surah/recite`, `/hifz` | Child | Encouraging retry | parent decision | recital | needs practice | local recital | restart practice | — | COMPLETE |
| 24 | Hifz Review | `/hifz/review` | Child | Due review | bottom bar | Hifz | due/current/done | local Hifz | spacing | stars | COMPLETE |
| 25 | Parent Lock | `/hifz/parent` | Parent | Set/unlock child gate | Hifz | queue | set/locked/unlocked | local lock | — | — | COMPLETE |
| 26 | Parent Review Queue | `/hifz/parent` | Parent | Review recitals/deeds | parent lock | decisions | awaiting/practice/reviewed | local steps/recordings | approval state | existing rewards | COMPLETE |
| 27 | Hifz Journey Appearance | `/hifz/looks` | Child | Select unlocked looks | bottom bar | map | locked/equipped | local looks | reward unlock | looks | COMPLETE |
| 28 | Hifz Certificate | `/hifz/certificate` | Parent/child | Render certificate | parent/Hifz | return | eligible/not eligible | local Hifz | completion | certificate | PARTIAL |
| 29 | Login | `/login` | Parent | Optional login | header | profile | form/loading/error | Supabase Auth | — | — | COMPLETE |
| 30 | Registration | `/register` | Parent | Optional registration | header | login/profile | form/validation/error | Supabase Auth | — | — | COMPLETE |
| 31 | Password recovery/reset | `/forgot-password`, `/reset-password` | Parent | Recover account | login | reset/login | form/success/error | Supabase Auth | — | — | COMPLETE |
| 32 | Profile | `/profile` | Parent | Account/progress | header | libraries | signed-out/profile | local + Supabase | summaries | existing rewards | PARTIAL |

Supporting routes: `/journey`, `/hifz/looks`, `/about`, `/privacy`, `/terms`, and `/404` are implemented but not separate rows in the historical 32-screen list.
