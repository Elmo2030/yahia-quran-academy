# YAHYA Information Architecture

## Global structure — IMPLEMENTED

```text
Home (/)
├── My journey (/journey)
├── Quran reader (/read, /read/:surah)
├── Listening (/listen, /listen/:surah)
├── Quran Stories (/stories, /stories/:chapter, /stories/:chapter/:slug)
├── Seerah (/seerah, /seerah/:slug)
├── Companions (/companions, /companions/:slug; Arabic content)
├── Aqeedah (/aqeedah, /aqeedah/:slug)
├── Quran Facts (/quran-facts, /quran-facts/:slug)
├── Hifz (/hifz)
│   ├── Surah (/hifz/:surah)
│   ├── Recite (/hifz/:surah/recite)
│   ├── Review (/hifz/review)
│   ├── Parent (/hifz/parent)
│   ├── Looks (/hifz/looks)
│   └── Certificate (/hifz/certificate)
└── Account and support
    ├── Profile, Login, Register
    ├── Forgot/reset password
    ├── About, Privacy, Terms, 404
```

## Primary navigation

`SiteChrome` exposes Home, My Journey, Hifz, Stories, Seerah, Quran Facts, Aqeedah, Listening, About, profile/register, reader shortcut, locale, and theme controls. Its mobile menu provides the compact equivalent. The Hifz bottom bar is a distinct, mobile-only, in-Hifz navigation layer: journey, review, treasures/looks, and parent.

## Child journey

```text
Home → My Journey → current activity → completion/progress → next step
```

The home/journey UI reads existing data. `nextStep()` uses Hifz priority: due review → needs-practice recital → awaiting-parent recital/deed → last reader position. The Stories activity reads the active named child's existing Story steps and points to the latest valid incomplete Story; it resumes the normal Story route from its top, without a separate cross-library progression store.

Companions is reached through the existing My Journey world. Its destination resumes the current child's newest incomplete Companion or recommends the next unfinished one; the hub remains available on each detail page. No separate Journey or top-level reward destination was introduced.

## Parent journey

```text
Hifz → Parent lock → Review queue → approve / needs practice → child next action
```

The parent queue keeps unavailable recordings visible and permits the relevant state decision. The lock is a local child-facing gate, not account authorization.

## Information hierarchy

1. **Primary:** the current child action or selected learning activity.
2. **Secondary:** library/stage/surah context, progress and return paths.
3. **Tertiary:** source details, settings, backups, rewards, legal/account material.

## State transitions — IMPLEMENTED

```text
Quran Fact: locked → unlocked/current → completed
Hifz ayah: available → in progress/done → declared → reviewed/review due
Hifz recital: ready → recording → recorded → awaiting_parent → reviewed
                                      └────────────────────→ needs_practice → ready
```

Quran Facts are completed when a valid detail is revealed and that discovery is recorded. Hifz recital approval is a parent action; covered ayahs require a reviewed recital, not merely awaiting-parent or needs-practice status.

## Back and deep-link behaviour

Routes are client-side Wouter routes and support direct path loading through Cloudflare Pages/prerendered output. Page-level contextual links generally return to their hub/journey; browser back follows browser history. Scroll-restoration policy is **NOT_FORMALLY_DEFINED**. Untrusted auth return targets are normalized by `safeInternalPath()` and cannot become external redirects.
