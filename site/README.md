# Yahia Quran Academy — website

The public reader site, recovered from an archive on 2026-08-28. Source only —
this was never in version control before.

## What this is

A Node + React app (Vite, Express, Drizzle) serving the 114-surah reader. It is a
separate application from the Flutter app in the repository root; they share the
recitation data in `assets/data/`, not any code.

```
client/    React frontend — the reader itself
server/    Express API
shared/    types shared by both
drizzle/   database schema and migrations
```

`pnpm install`, then `pnpm dev` / `pnpm test` / `pnpm build`.

## This is not the final version

The last reported work on this site — bumping axios to 1.20.0, drizzle-orm to
0.45.2, nanoid to 6.0.1, and standardising the name to Yahia Quran Academy —
is **not** in this archive. The lockfile here resolves axios 1.12.2,
drizzle-orm 0.44.7, nanoid 5.1.6, and carries 6 test cases rather than the 25
reported. That work exists only in the workspace that produced it and should be
treated as lost. Redoing it is a dependency bump and a rename.

## Platform coupling

`server/_core/` is scaffolding from the platform this was built on and calls out
to `forge.manus.im`: storage, OAuth login, a Google Maps proxy, voice
transcription, and a heartbeat. Those endpoints are outside our control.

The reader itself does not depend on any of it — `client/src` is clean apart from
`Map.tsx`, which is unused template code. Moving this site to our own hosting
means replacing what `server/_core` provides, not rewriting the product.

Secrets are read from `process.env` throughout; nothing is hardcoded. See
`.gitignore` for the env files it expects.

## Stories

`client/src/content/stories.ts` holds the children's stories. Every `ayah.text`
in it is a **literal substring of the Tanzil Uthmani corpus** the reader itself
uses — the excerpts were extracted from `assets/data/quran_text.json`
programmatically and each was asserted to appear verbatim in its ayah. None was
typed by hand.

If you add or edit a story, take the verse from that corpus the same way rather
than pasting it from elsewhere. Quotes written in modern imlaa'i spelling
(`سُلَيْمَانَ`, `الْعَالَمِينَ`) will not match the Uthmani rasm the rest of the
site renders (`سُلَيْمَٰنَ`, `ٱلْعَٰلَمِينَ`), and the page would then show a
different script from the reader it links to.
