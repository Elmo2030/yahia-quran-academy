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

// Written by scripts/build-recitation-data.mjs. The catalogue is what the
// chooser needs; a surah file is what playing one surah needs. The reader used
// to download all 250 KB of the manifest — three recitations times 114 surahs
// of URLs, checksums and byte counts — to play a single surah.
const CATALOGUE_URL = "/recitations/index.json";
const surahUrl = (surah: number) => `/recitations/surah-${String(surah).padStart(3, "0")}.json`;

export type RecitationId = string;

export type RecitationUse = "learning" | "listening";

export type Recitation = {
  id: RecitationId;
  nameAr: string;
  nameEn: string;
  /** true when the manifest declares usable timings for this recitation */
  hasTiming: boolean;
  /** a teaching recitation for the reader, or a mushaf to sit and listen to */
  use: RecitationUse;
  /** false while a recitation has names but no audio uploaded yet */
  hasAudio: boolean;
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

type Catalogue = {
  default_recitation_id?: string;
  recitations: {
    id: string;
    display_name_ar: string;
    display_name_en: string;
    timing_status: string;
    use?: string;
    has_surahs: boolean;
  }[];
};
type SurahFile = { surah: number; recitations: Record<string, RawSurah> };
type RawSurah = {
  playback_url: string;
  duration_ms: number;
  ayah_count: number;
  timing_url?: string;
  unavailable_timing_ayahs?: number[];
};

let cataloguePromise: Promise<Catalogue> | null = null;
const surahFiles = new Map<number, Promise<SurahFile>>();

async function loadJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} responded ${response.status}`);
  return (await response.json()) as T;
}

function loadCatalogue() {
  cataloguePromise ??= loadJson<Catalogue>(CATALOGUE_URL);
  return cataloguePromise;
}

/**
 * One surah's sources, checked on arrival.
 *
 * The corpus-wide checks — every recitation covering all 114 surahs, every
 * playback URL over https — run at build time. What is left to confirm here is
 * that the file that came back is the surah that was asked for, so a wrong or
 * truncated response is an error rather than silence where a recitation should
 * be.
 */
function loadSurahFile(surah: number) {
  let pending = surahFiles.get(surah);
  if (!pending) {
    pending = loadJson<SurahFile>(surahUrl(surah))
      .then(file => {
        if (file?.surah !== surah) throw new Error(`asked for surah ${surah}, received ${file?.surah}`);
        return file;
      })
      // A failure must not be remembered as one: opening the surah again
      // should try the network again rather than replay the error.
      .catch(error => { surahFiles.delete(surah); throw error; });
    surahFiles.set(surah, pending);
  }
  return pending;
}

export async function listRecitations(): Promise<Recitation[]> {
  const catalogue = await loadCatalogue();
  return catalogue.recitations.map(r => ({
    id: r.id,
    nameAr: r.display_name_ar,
    nameEn: r.display_name_en,
    hasTiming: r.timing_status !== "unavailable" && r.has_surahs,
    use: r.use === "listening" ? "listening" : "learning",
    hasAudio: r.has_surahs,
  }));
}

/** The complete mushafs, for the listening section. */
export const listeningRecitations = async () =>
  (await listRecitations()).filter(r => r.use === "listening" && r.hasAudio);

export type ListeningCatalogue = {
  id: RecitationId;
  nameAr: string;
  nameEn: string;
  surahs: { surah: number; durationMs: number; ayahCount: number; sizeBytes: number; url: string }[];
};

/**
 * Every surah's length for one complete mushaf, in a single small file. The
 * index would otherwise fetch 114 surah files to print a list of durations.
 */
export async function loadListeningCatalogue(id: RecitationId): Promise<ListeningCatalogue | null> {
  try {
    const raw = await loadJson<{
      id: string; display_name_ar: string; display_name_en: string;
      surahs: { surah: number; duration_ms: number; ayah_count: number; size_bytes?: number; url?: string }[];
    }>(`/recitations/listening-${id}.json`);
    return {
      id: raw.id,
      nameAr: raw.display_name_ar,
      nameEn: raw.display_name_en,
      surahs: raw.surahs.map(s => ({
        surah: s.surah,
        durationMs: s.duration_ms,
        ayahCount: s.ayah_count,
        sizeBytes: s.size_bytes ?? 0,
        url: s.url ?? "",
      })),
    };
  } catch {
    return null;
  }
}


export async function defaultRecitationId(): Promise<RecitationId> {
  const catalogue = await loadCatalogue();
  return catalogue.default_recitation_id ?? catalogue.recitations[0]?.id;
}

export async function loadSurahSource(
  recitationId: RecitationId,
  surah: number,
): Promise<SurahAudioSource | null> {
  const file = await loadSurahFile(surah);
  const raw = file.recitations[recitationId];
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
