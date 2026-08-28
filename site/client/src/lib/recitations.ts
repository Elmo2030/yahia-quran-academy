/**
 * Recitation catalogue and verified ayah/word timings.
 *
 * Everything here is served from our own Cloudflare R2 bucket: the manifest
 * lists each recitation's per-surah audio and, where it exists, the timing file
 * that drives highlighting.
 *
 * Timing is treated as fail-closed, matching the Flutter app. A recitation that
 * declares no timing gets none, an ayah listed as an unavailable gap is never
 * highlighted, and an ayah whose word coverage is incomplete highlights at ayah
 * level only. Nothing is inferred to fill a gap.
 */

const MANIFEST_URL = "/manus-storage/recitation_manifest.json";

export type RecitationId = string;

export type Recitation = {
  id: RecitationId;
  nameAr: string;
  nameEn: string;
  /** true when the manifest declares usable timings for this recitation */
  hasTiming: boolean;
};

export type SurahAudioSource = {
  playbackUrl: string;
  durationMs: number;
  ayahCount: number;
  timingUrl: string | null;
  /** ayahs the source itself declares as untimed */
  gaps: number[];
};

export type TimedWord = { number: number; startMs: number; endMs: number };
export type TimedAyah = {
  number: number;
  startMs: number;
  endMs: number;
  /** empty when the ayah has no trustworthy word coverage */
  words: TimedWord[];
};

type Manifest = {
  default_recitation_id?: string;
  recitations: Record<string, RawRecitation>;
};
type RawRecitation = {
  id: string;
  display_name_ar: string;
  display_name_en: string;
  timing_status: string;
  surahs?: Record<string, RawSurah>;
};
type RawSurah = {
  playback_url: string;
  duration_ms: number;
  ayah_count: number;
  timing_url?: string;
  unavailable_timing_ayahs?: number[];
};

let manifestPromise: Promise<Manifest> | null = null;

async function loadJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} responded ${response.status}`);
  return (await response.json()) as T;
}

function loadManifest() {
  manifestPromise ??= loadJson<Manifest>(MANIFEST_URL);
  return manifestPromise;
}

export async function listRecitations(): Promise<Recitation[]> {
  const manifest = await loadManifest();
  return Object.values(manifest.recitations).map(r => ({
    id: r.id,
    nameAr: r.display_name_ar,
    nameEn: r.display_name_en,
    hasTiming: r.timing_status !== "unavailable" && Boolean(r.surahs),
  }));
}

export async function defaultRecitationId(): Promise<RecitationId> {
  const manifest = await loadManifest();
  return manifest.default_recitation_id ?? Object.keys(manifest.recitations)[0];
}

export async function loadSurahSource(
  recitationId: RecitationId,
  surah: number,
): Promise<SurahAudioSource | null> {
  const manifest = await loadManifest();
  const raw = manifest.recitations[recitationId]?.surahs?.[String(surah)];
  if (!raw?.playback_url) return null;
  return {
    playbackUrl: raw.playback_url,
    durationMs: raw.duration_ms,
    ayahCount: raw.ayah_count,
    timingUrl: raw.timing_url ?? null,
    gaps: raw.unavailable_timing_ayahs ?? [],
  };
}

const timingCache = new Map<string, Promise<TimedAyah[]>>();

/**
 * Normalises either timing schema into one shape. Both carry
 * `surah.ayahs[] { ayah, start_ms, end_ms, words[], word_timing_status }`;
 * the Minshawi payload additionally repeats each word once per teaching pass,
 * which is fine — passes stay in document order, so a plain scan still finds
 * the word being recited at a given moment.
 */
export async function loadTiming(
  recitationId: RecitationId,
  surah: number,
): Promise<TimedAyah[]> {
  const source = await loadSurahSource(recitationId, surah);
  if (!source?.timingUrl) return [];

  const key = `${recitationId}:${surah}`;
  const cached = timingCache.get(key);
  if (cached) return cached;

  const promise = loadJson<any>(source.timingUrl)
    .then(payload => {
      const ayahs = payload?.surah?.ayahs;
      if (!Array.isArray(ayahs)) return [];
      return ayahs
        .filter(a => !source.gaps.includes(a?.ayah))
        .map((a): TimedAyah => ({
          number: a.ayah,
          startMs: a.start_ms,
          endMs: a.end_ms,
          // 'partial' means the ayah window is trustworthy but the words are
          // not, so we highlight the ayah and leave its words alone.
          words:
            a.word_timing_status === "available" && Array.isArray(a.words)
              ? a.words.map((w: any) => ({
                  number: w.word_number,
                  startMs: w.start_ms,
                  endMs: w.end_ms,
                }))
              : [],
        }))
        .filter(a => Number.isFinite(a.startMs) && a.endMs > a.startMs)
        .sort((a, b) => a.number - b.number);
    })
    .catch(() => []);

  timingCache.set(key, promise);
  return promise;
}

/** The ayah and word being recited at `positionMs`, or nulls outside any window. */
export function activeAt(timings: TimedAyah[], positionMs: number) {
  const ayah = timings.find(a => positionMs >= a.startMs && positionMs < a.endMs);
  if (!ayah) return { ayah: null as number | null, word: null as number | null };
  const word = ayah.words.find(w => positionMs >= w.startMs && positionMs < w.endMs);
  return { ayah: ayah.number, word: word?.number ?? null };
}
