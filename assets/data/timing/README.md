# Recovered ayah/word timing data

These are the 114 per-surah timing files for the `husary_muallim_timed`
recitation. They drive ayah and word highlighting during playback.

## Why they are here

They were being served from `quranread-maphrvqk.manus.space` — a Manus-hosted
site. Every `timing_url` in `assets/data/recitation_manifest.json` pointed there.
That hosting is outside our control and the account that produced it is no longer
active, so the files were pulled down and committed here before they became
unreachable.

Recovered 2026-08-28. Verified on download:

- 114 / 114 surahs present, all valid JSON
- 6,236 ayahs — matches the Quran exactly
- 80,195 words — matches the published catalog
- every surah's ayah count matches `recitation_manifest.json`

## Still to do

`recitation_manifest.json` still points `timing_url` at manus.space. Re-host these
files (the Cloudflare R2 bucket that already serves the audio is the natural home)
and repoint the manifest, or load them from the bundled asset instead of the network.
Until that happens the app depends on hosting we do not own.

The audio itself is served from R2 and is not affected.
