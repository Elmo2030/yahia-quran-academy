# Quran Audio Provenance

## Shared source

The metadata in `audio_manifest.json` was produced from the publicly shared Google Drive folder **Al-Husaree_Almoalim**:

- Folder: https://drive.google.com/drive/folders/16qQulScaUDZT0jrc6Gw2uLmSVEJ9Q32E?usp=drive_link
- Intake date: 2026-08-26
- Intended reciter label: Al-Husaree Almoalim

The audio binaries are deliberately not committed to Git. Before production playback, files must be migrated to the application's approved storage/CDN and each manifest entry must receive a stable playback URL and checksum.

## Intake checks

| Sample | Status | Evidence |
|---|---|---|
| Al-Fatihah (1) | Passed technical probe | AAC/M4A, 11,025 Hz stereo, 73.300045 seconds, 526,243 bytes |
| Al-Baqarah (2) | Listed only | Public folder listed `Audio002 - Al-Baqara.mp3`, 75.6 MB; direct sample download could not be completed from the folder UI during intake |
| Al-Kawthar (108) | Passed technical probe | MP3, 16,000 Hz stereo, 39.416 seconds, 158,713 bytes |

The file listing shows a near-sequential series for the 114 surahs. Its original names are not normalized, so the manifest records the original filename rather than renaming source files.

## Timing status

No ayah or word timing JSON files were present in the shared folder during intake. Therefore every entry is explicitly marked `timing_status: unavailable` and `word_timestamps: null`. The library can support whole-surah playback after storage migration, but not verified ayah-by-ayah playback or word highlighting until source timings are supplied or separately generated and reviewed.

## Operational rule

Do not infer, invent, or silently interpolate ayah timings. Timing data is a learning reference and must be handled as a separately validated dataset.
