# Yahya Quran Academy — website

The public site at [yahyaquran.com](https://yahyaquran.com): a bilingual
(Arabic/English) Quran site for children aged 6–11. A Vite + React 19 SPA
deployed to Cloudflare Pages.

```
client/src/content/   the writing — stories, seerah, creed, facts
client/src/pages/     one file per section
functions/            Cloudflare Pages Functions (metadata, JSON-LD, 404s)
scripts/              build-time data, SEO files and prerendering
shared/               types used by both sides
supabase/             schema for the optional account features
```

`pnpm install`, then `pnpm dev` / `pnpm test` / `pnpm build`.

## What the build does

`pnpm build` is five steps, not one. Before Vite runs, three scripts generate
data the app imports — the surah text split per surah, the recitation catalogue
split per surah, and the SEO files (`sitemap.xml`, `robots.txt`, `llms.txt`)
plus `client/src/lib/page-index.generated.ts`. After Vite, `prerender.mjs`
writes the text of all 517 pages into their own HTML files.

Three scripts are **not** part of the build and are run by hand, because the
Cloudflare builder has no image tooling and the output is committed:
`build-image-variants.mjs` (the WebP ladder for the story art),
`build-hifz-art.mjs` (the same for the memorization journey's art, read from
`../صور-رحلة-الحفظ/hifz-art`), and `fetch-fonts.mjs`.

## Two things that will bite you

**The metadata exists twice.** `client/src/lib/page-meta.ts` serves the
browser; `functions/_middleware.ts` serves crawlers that do not run JavaScript.
They must agree, and they have silently drifted before —
`functions/__tests__/metadata-mirror.test.ts` is what holds them together: it
bundles the real function and drives it over every kind of route, in **both**
languages. Change one, run that test.

**The memorization journey never phones home.** `/hifz` tells the reader, in
both languages, that nothing leaves their device, and `hifz-store.ts` keeps that
promise in one localStorage entry. `library.ts` and `progress.ts` *do* mirror to
Supabase — do not copy their shape into anything the journey touches. And
`parseStore` returns an empty store when the version does not match, so raising
`HIFZ_VERSION` erases every child's progress: add optional fields instead, or
write a migration with a test that proves the old data survived.

**Prerendered pages are `<path>.html`, never `<path>/index.html`.** The
directory form makes Cloudflare answer 308 to every one of them.

## Content

The English text of the stories lives in `client/src/content/stories-en.ts`, not
inside each story, and arrives through `useStoryText()`. It was 176 KB of the
333 KB in `stories.ts`, so every reader was downloading both languages to read
one. `Story` has no `en` field and a test keeps it that way.

Every `ayah.text` in `client/src/content/` is a **literal substring of the Tanzil
Uthmani corpus** the reader renders — extracted programmatically from
`assets/data/quran_text.json` and asserted to appear verbatim. None was typed by
hand.

If you add or edit a story, take the verse from that corpus the same way rather
than pasting it from elsewhere. Quotes in modern imlaa'i spelling
(`سُلَيْمَانَ`, `الْعَالَمِينَ`) will not match the Uthmani rasm the rest of the
site renders (`سُلَيْمَٰنَ`, `ٱلْعَٰلَمِينَ`), and the page would then show a
different script from the reader it links to.

Seerah and creed cards carry a reliability mark: 🟢 for the Quran and the two
Sahih collections, 🟡 where the card's central detail rests on the Seerah
literature, with a note saying so. Keep it honest — it is the point of the
section.

## Accounts

Sign-in is Supabase, and entirely optional: the site reads without it. The
client is loaded on demand rather than imported, so a signed-out visitor never
downloads it — see `mightHaveSession()` in `client/src/lib/supabase.ts`. Secrets
come from `process.env`; nothing is hardcoded.

## Where else to look

The repository root's `README.md` carries the live state of the content — how
many stories, how much of the Seerah has art, what is still open — and the image
briefs (`صور-السيرة-النبوية.md` and the one in `صور-رحلة-الحفظ/`) carry the rules
the artwork is commissioned under.
