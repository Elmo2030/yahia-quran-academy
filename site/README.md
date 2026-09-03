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
writes the text of all 271 pages into their own HTML files.

Two scripts are **not** part of the build and are run by hand, because the
Cloudflare builder has no image tooling and the output is committed:
`build-image-variants.mjs` (the WebP ladder for the story art) and
`fetch-fonts.mjs`.

## Two things that will bite you

**The metadata exists twice.** `client/src/lib/page-meta.ts` serves the
browser; `functions/_middleware.ts` serves crawlers that do not run JavaScript.
They must agree, and they have silently drifted before —
`functions/__tests__/metadata-mirror.test.ts` is what holds them together. Change
one, run that test.

**Prerendered pages are `<path>.html`, never `<path>/index.html`.** The
directory form makes Cloudflare answer 308 to every one of them.

## Content

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
