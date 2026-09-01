// =============================================================================
// Split the recitation manifest into a catalogue and one file per surah.
//
// The reader downloaded all 250 KB of it to play one surah: three recitations
// times 114 surahs of playback URLs, byte counts, checksums and durations, when
// what it needed was the three names for the chooser and one surah's worth of
// links. The catalogue is 3 KB; a surah is about 2 KB.
//
// The checks the reader used to make on every visit — every recitation covers
// all 114 surahs, every playback URL is https — belong here, where a bad
// manifest fails a deploy rather than an evening's listening. What the browser
// still verifies is that the surah it asked for is the surah it received.
// =============================================================================

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "data/recitation_manifest.json");
const outDir = join(root, "client/public/recitations");

const TOTAL_SURAHS = 114;
const die = message => { console.error(`build-recitation-data: ${message}`); process.exit(1); };

const manifest = JSON.parse(readFileSync(source, "utf8"));
const recitations = manifest.recitations;
if (!recitations || typeof recitations !== "object") die("no recitations in the manifest");

const ids = Object.keys(recitations);
if (ids.length === 0) die("the manifest lists no recitations");

for (const id of ids) {
  const rec = recitations[id];
  if (rec.id !== id) die(`recitation ${id} disagrees with its own id (${rec.id})`);
  if (!rec.display_name_ar || !rec.display_name_en) die(`recitation ${id} is missing a name`);
  const surahs = rec.surahs ?? {};
  const covered = Object.keys(surahs).length;
  if (covered !== 0 && covered !== TOTAL_SURAHS)
    die(`recitation ${id} covers ${covered} surahs, not ${TOTAL_SURAHS}`);
  for (const [number, surah] of Object.entries(surahs)) {
    if (!surah.playback_url?.startsWith("https://"))
      die(`${id} surah ${number} has no https playback url`);
    if (surah.timing_url && !surah.timing_url.startsWith("https://"))
      die(`${id} surah ${number} has a timing url that is not https`);
  }
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// The catalogue: what the chooser needs, and nothing else.
writeFileSync(join(outDir, "index.json"), JSON.stringify({
  default_recitation_id: manifest.default_recitation_id ?? ids[0],
  recitations: ids.map(id => ({
    id,
    display_name_ar: recitations[id].display_name_ar,
    display_name_en: recitations[id].display_name_en,
    timing_status: recitations[id].timing_status,
    has_surahs: Object.keys(recitations[id].surahs ?? {}).length > 0,
  })),
}));

// Only the fields the reader reads. The checksums and byte counts stay in
// site/data with the manifest they came from.
const keep = surah => ({
  playback_url: surah.playback_url,
  duration_ms: surah.duration_ms,
  ayah_count: surah.ayah_count,
  ...(surah.timing_url ? { timing_url: surah.timing_url } : {}),
  ...(surah.unavailable_timing_ayahs?.length
    ? { unavailable_timing_ayahs: surah.unavailable_timing_ayahs }
    : {}),
});

let written = 0;
for (let surah = 1; surah <= TOTAL_SURAHS; surah += 1) {
  const entry = { surah, recitations: {} };
  for (const id of ids) {
    const raw = recitations[id].surahs?.[String(surah)];
    if (raw) entry.recitations[id] = keep(raw);
  }
  writeFileSync(
    join(outDir, `surah-${String(surah).padStart(3, "0")}.json`),
    JSON.stringify(entry),
  );
  written += 1;
}

console.log(`build-recitation-data: ${ids.length} recitations, ${written} surah files`);
