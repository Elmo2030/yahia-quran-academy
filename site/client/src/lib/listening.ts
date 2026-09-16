// =============================================================================
// listening.ts — where a listener left off.
//
// A murattal surah runs from twenty seconds to two hours, so coming back to a
// long one and starting again from the first ayah is its own small punishment.
// The position is kept per surah on this device only, alongside the last surah
// that was opened, so the section can offer to carry on.
//
// Two positions are deliberately not kept: the first few seconds, which mean
// the listener had barely started, and the last stretch, which means they had
// effectively finished. Both would come back as a resume offer that helps
// nobody.
// =============================================================================

const KEY = "yahya.listen.v1";
const MIN_SECONDS = 20;
const END_MARGIN_SECONDS = 30;

export type ListenMarks = {
  /** surah number → seconds into it */
  at: Record<string, number>;
  /** the last surah opened, so the section can offer to carry on */
  last?: number;
};

const empty = (): ListenMarks => ({ at: {} });

function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    // Private mode, or a browser with storage switched off.
    return undefined;
  }
}

export function parseMarks(value: unknown): ListenMarks {
  if (!value || typeof value !== "object") return empty();
  const raw = value as Record<string, unknown>;
  const at: Record<string, number> = {};
  if (raw.at && typeof raw.at === "object") {
    for (const [key, seconds] of Object.entries(raw.at as Record<string, unknown>)) {
      const surah = Number(key);
      if (!Number.isInteger(surah) || surah < 1 || surah > 114) continue;
      if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < MIN_SECONDS) continue;
      at[String(surah)] = Math.floor(seconds);
    }
  }
  const last = Number(raw.last);
  return Number.isInteger(last) && last >= 1 && last <= 114 ? { at, last } : { at };
}

export function loadMarks(): ListenMarks {
  const store = storage();
  if (!store) return empty();
  try {
    const text = store.getItem(KEY);
    return text ? parseMarks(JSON.parse(text)) : empty();
  } catch {
    return empty();
  }
}

function save(marks: ListenMarks): void {
  const store = storage();
  if (!store) return;
  try {
    store.setItem(KEY, JSON.stringify(marks));
  } catch {
    // A full or blocked storage costs the listener their place, nothing more.
  }
}

/**
 * Remembers where a surah is up to. `duration` is passed so the end of a surah
 * can be told apart from the middle of one.
 */
export function rememberPosition(surah: number, seconds: number, duration: number): ListenMarks {
  const marks = loadMarks();
  const tooEarly = seconds < MIN_SECONDS;
  const asGoodAsFinished = duration > 0 && seconds > duration - END_MARGIN_SECONDS;
  if (tooEarly || asGoodAsFinished) delete marks.at[String(surah)];
  else marks.at[String(surah)] = Math.floor(seconds);
  marks.last = surah;
  save(marks);
  return marks;
}

export const positionOf = (marks: ListenMarks, surah: number) => marks.at[String(surah)] ?? 0;

export function forgetPosition(surah: number): ListenMarks {
  const marks = loadMarks();
  delete marks.at[String(surah)];
  save(marks);
  return marks;
}

/** mm:ss, or h:mm:ss for the long surahs. */
export function clock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const rest = whole % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(rest)}` : `${minutes}:${pad(rest)}`;
}

/** "٤٥ دقيقة" and "45 min" — a length a parent can plan around. */
export function roughLength(ms: number, locale: "ar" | "en"): string {
  const minutes = Math.round(ms / 60_000);
  if (minutes < 1) return locale === "ar" ? "أقل من دقيقة" : "under a minute";
  if (minutes < 60) {
    if (locale === "en") return `${minutes} min`;
    if (minutes === 1) return "دقيقة";
    if (minutes === 2) return "دقيقتان";
    return minutes <= 10 ? `${minutes} دقائق` : `${minutes} دقيقة`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (locale === "en") return rest ? `${hours} h ${rest} min` : `${hours} h`;
  const hoursWord = hours === 1 ? "ساعة" : hours === 2 ? "ساعتان" : `${hours} ساعات`;
  return rest ? `${hoursWord} و${rest} دقيقة` : hoursWord;
}

export const SLEEP_CHOICES = [15, 30, 45, 60] as const;
export type SleepChoice = (typeof SLEEP_CHOICES)[number];
