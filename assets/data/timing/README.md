# Recovered ayah/word timing data

Per-surah timing files for both timed recitations. They drive ayah and word
highlighting during playback.

| recitation | files | ayahs | words |
|---|---|---|---|
| `husary_muallim_timed` | 114 | 6,236 | 80,195 |
| `minshawi_muallim_kids_timed` | 114 | 6,181 | 42,742 |

`husary_muallim_children` has no timing by design and needs nothing here.

## Why they are here

They were being served from `quranread-maphrvqk.manus.space` — a Manus-hosted
site. Every `timing_url` in `assets/data/recitation_manifest.json` pointed there.
That hosting is outside our control and the account that produced it is no longer
active, so the files were pulled down and committed here before they became
unreachable.

Recovered 2026-08-28. Verified on download:

**Husary** — complete. 114/114 surahs, 6,236 ayahs (the exact Quran total),
80,195 words matching the published catalog, and every surah's ayah count
agreeing with `recitation_manifest.json`.

**Minshawi** — 114/114 surahs downloaded and valid, but the source data itself
is short by 55 ayahs, consistent with its declared
`available_with_declared_gaps` status. The shortfall is concentrated in three
surahs:

| surah | ayahs timed | ayahs in surah |
|---|---|---|
| 33 (Al-Ahzab) | 20 | 73 |
| 36 (Ya-Sin) | 82 | 83 |
| 101 (Al-Qari'ah) | 10 | 11 |

Nothing was lost in transfer — this is how the source publishes it. See the
open question below.

The two `source_r2_range_hash_audit*.json` reports in `audit/` are the
114/114 SHA-256 verification of the audio against R2.

## Still to do

`recitation_manifest.json` still points `timing_url` at manus.space. Re-host these
files (the Cloudflare R2 bucket that already serves the audio is the natural home)
and repoint the manifest, or load them from the bundled asset instead of the network.
Until that happens the app depends on hosting we do not own.

The audio itself is served from Cloudflare R2 on our own account and is not
affected.

## Open question worth checking

`TalaqqiController._currentSegment` indexes the segment list with
`.clamp(0, _segments.length - 1)`. For Al-Ahzab under the Minshawi recitation
there are 20 segments for 73 ayahs, so any ayah past 20 clamps onto segment 19
and would play the wrong audio rather than reporting that timing is
unavailable. Worth confirming before Minshawi is offered for ayah-by-ayah
practice.
