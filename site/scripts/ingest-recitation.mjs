// =============================================================================
// Turns a folder of surah MP3s into manifest entries.
//
//   node scripts/ingest-recitation.mjs <folder> <recitation-id> <r2-prefix>
//   node scripts/ingest-recitation.mjs ~/Downloads/minshawi minshawi_murattal recitations/minshawi-murattal
//
// It reads every file, measures its real duration with ffprobe, takes its
// SHA-256 and byte count, and writes the 114 entries into
// data/recitation_manifest.json under the given recitation id.
//
// Nothing is uploaded from here: the files go to R2 by hand, under the same
// keys this writes. Run it again after uploading with --verify to check that
// what is on R2 is byte-for-byte what was measured here.
//
// A recitation is all 114 surahs or none — the build refuses anything between,
// which is what stops a half-uploaded recitation from reaching a listener.
// =============================================================================

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";


const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "data/recitation_manifest.json");
const R2_ORIGIN = "https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev";
const TOTAL = 114;

/** The ayah counts the site already generates, read rather than repeated. */
const ayahCounts = JSON.parse(
  readFileSync(join(root, "client/src/lib/surah-ayah-counts.generated.ts"), "utf8")
    .match(/ayahCounts: number\[\] = (\[[^\]]*\])/s)[1]
    // the generated file is prettier-formatted, with a trailing comma
    .replace(/,\s*]$/, "]"),
);

const [folder, recitationId, prefix] = process.argv.slice(2);
const verifyOnly = process.argv.includes("--verify");
if (!folder || !recitationId || !prefix) {
  console.error("usage: node scripts/ingest-recitation.mjs <folder> <recitation-id> <r2-key-prefix> [--verify]");
  process.exit(1);
}
const die = message => { console.error(`ingest-recitation: ${message}`); process.exit(1); };
if (!existsSync(folder)) die(`no folder at ${folder}`);

/**
 * Finds the surah number in a file name, whatever the numbering habit:
 * 001.mp3, 1.mp3, 018 - الكهف.mp3, 114_an-nas.mp3 all work. Anything with no
 * number, or a number outside 1-114, is reported rather than guessed at.
 */
function surahOf(name) {
  const digits = basename(name, extname(name)).match(/\d{1,3}/);
  if (!digits) return null;
  const number = Number(digits[0]);
  return number >= 1 && number <= TOTAL ? number : null;
}

const audio = readdirSync(folder)
  .filter(name => [".mp3", ".m4a", ".ogg"].includes(extname(name).toLowerCase()))
  .map(name => ({ name, surah: surahOf(name) }));

const unreadable = audio.filter(file => file.surah === null).map(file => file.name);
const bySurah = new Map();
for (const file of audio) {
  if (file.surah === null) continue;
  if (bySurah.has(file.surah)) die(`two files claim surah ${file.surah}: ${bySurah.get(file.surah).name} and ${file.name}`);
  bySurah.set(file.surah, file);
}

const missing = [];
for (let surah = 1; surah <= TOTAL; surah++) if (!bySurah.has(surah)) missing.push(surah);

console.log(`found ${bySurah.size} of ${TOTAL} surahs in ${folder}`);
if (unreadable.length) console.log(`ignored (no surah number in the name): ${unreadable.join(", ")}`);
if (missing.length) {
  console.log(`missing: ${missing.join(", ")}`);
  if (!verifyOnly) die("a recitation goes in whole or not at all; nothing was written");
}

const durationMs = path => {
  const seconds = execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path,
  ]).toString().trim();
  const ms = Math.round(Number(seconds) * 1000);
  if (!Number.isFinite(ms) || ms <= 0) die(`ffprobe could not measure ${path}`);
  return ms;
};

const contentTypes = { ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".ogg": "audio/ogg" };

const surahs = {};
let totalBytes = 0;
let totalMs = 0;
for (let surah = 1; surah <= TOTAL; surah++) {
  const file = bySurah.get(surah);
  if (!file) continue;
  const path = join(folder, file.name);
  const bytes = readFileSync(path);
  const extension = extname(file.name).toLowerCase();
  const key = `${prefix}/${String(surah).padStart(3, "0")}${extension}`;
  const entry = {
    surah,
    availability: "migrated",
    timing_status: "unavailable",
    playback_url: `${R2_ORIGIN}/${key}`,
    r2_object_key: key,
    content_type: contentTypes[extension] ?? "audio/mpeg",
    size_bytes: bytes.byteLength,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    duration_ms: durationMs(path),
    ayah_count: ayahCounts[surah - 1],
    source_file: file.name,
  };
  surahs[String(surah)] = entry;
  totalBytes += entry.size_bytes;
  totalMs += entry.duration_ms;
  process.stdout.write(`\r  measured ${surah}/${TOTAL}`);
}
process.stdout.write("\n");

const hours = (totalMs / 3_600_000).toFixed(1);
const gb = (totalBytes / 1_073_741_824).toFixed(2);
console.log(`total: ${hours} hours, ${gb} GB`);

if (verifyOnly) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const known = manifest.recitations[recitationId]?.surahs ?? {};
  let same = 0;
  const differ = [];
  for (const [number, entry] of Object.entries(surahs)) {
    const before = known[number];
    if (!before) { differ.push(`${number}: not in the manifest`); continue; }
    if (before.sha256 === entry.sha256 && before.size_bytes === entry.size_bytes) same++;
    else differ.push(`${number}: the file changed since it was measured`);
  }
  console.log(`verify: ${same} unchanged, ${differ.length} to look at`);
  differ.slice(0, 10).forEach(line => console.log(`  ${line}`));
  process.exit(differ.length ? 1 : 0);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const recitation = manifest.recitations[recitationId];
if (!recitation) die(`the manifest has no recitation called ${recitationId}; add its names first`);
recitation.surahs = surahs;
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`wrote ${Object.keys(surahs).length} surahs into data/recitation_manifest.json under ${recitationId}`);
console.log(`upload the files to R2 under ${prefix}/001${extname(bySurah.get(1).name)} … ${prefix}/114${extname(bySurah.get(114).name)}`);
console.log("then: node scripts/ingest-recitation.mjs <folder> <id> <prefix> --verify");
