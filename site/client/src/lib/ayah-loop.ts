// =============================================================================
// ayah-loop.ts — play one ayah out of a whole-surah recording, N times.
//
// The recitations are one MP3 per surah with verified start and end times for
// every ayah. The Juz Amma files are constant bitrate, so an ordinary audio
// element seeks straight to an ayah boundary; decoding a nine-minute surah into
// memory to cut it exactly would cost a phone well over 100 MB for no gain.
//
// The loop is written against the few members of HTMLMediaElement it uses, so
// the repeat logic can be tested without a browser.
// =============================================================================

export type AyahWindow = { startMs: number; endMs: number };

export type MediaLike = {
  currentTime: number;
  readonly ended: boolean;
  readonly readyState: number;
  play(): Promise<void>;
  pause(): void;
  addEventListener(type: string, listener: () => void, options?: { once?: boolean }): void;
  removeEventListener(type: string, listener: () => void): void;
};

export type LoopHooks = {
  /** a pass finished; `pass` counts from 1 */
  onPass?: (pass: number) => void;
  /** checked between every step; true abandons the loop quietly */
  cancelled: () => boolean;
  /** the quiet between passes, so a child can repeat after the sheikh */
  gapMs?: number;
  sleep?: (ms: number) => Promise<void>;
  /** how often the position is checked while playing */
  tickMs?: number;
  /** how long to wait for the file to answer before giving up */
  timeoutMs?: number;
};

/** Thrown when the audio never reports metadata or never finishes seeking. */
export class MediaTimeout extends Error {
  constructor() { super("the recitation did not answer in time"); this.name = "MediaTimeout"; }
}

/** Stop this far before the recorded end: the check runs every few tens of ms,
 *  and running into the next ayah's first sound is worse than clipping silence. */
export const END_GUARD_MS = 40;

const realSleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Waits for one media event, or gives up.
 *
 * The timer is a real one even when the caller injects its own clock: a phone
 * that loses the network mid-surah simply never fires the event, and without
 * this the child is left looking at a button that says it is playing.
 */
function once(media: MediaLike, type: string, timeoutMs: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new MediaTimeout()), timeoutMs);
    media.addEventListener(type, () => { clearTimeout(timer); resolve(); }, { once: true });
  });
}

async function seek(media: MediaLike, ms: number, hooks: LoopHooks) {
  const timeout = hooks.timeoutMs ?? 15_000;
  // HAVE_METADATA: before it, setting currentTime is ignored.
  if (media.readyState < 1) await once(media, "loadedmetadata", timeout);
  const seeked = once(media, "seeked", timeout);
  media.currentTime = ms / 1000;
  await seeked;
}

async function untilEnd(media: MediaLike, window: AyahWindow, hooks: LoopHooks) {
  const tick = hooks.tickMs ?? 25;
  const sleep = hooks.sleep ?? realSleep;
  // setTimeout rather than requestAnimationFrame: animation frames stop in a
  // background tab while the audio keeps going, straight into the next ayah.
  while (!hooks.cancelled() && !media.ended && media.currentTime * 1000 < window.endMs - END_GUARD_MS) {
    await sleep(tick);
  }
}

/**
 * Plays the window `repeats` times. Resolves true when every pass finished,
 * false when it was cancelled; rejects only if the browser refuses to play.
 */
export async function playAyahLoop(media: MediaLike, window: AyahWindow, repeats: number, hooks: LoopHooks): Promise<boolean> {
  const passes = Math.min(5, Math.max(1, Math.round(repeats)));
  const sleep = hooks.sleep ?? realSleep;
  for (let pass = 1; pass <= passes; pass++) {
    if (hooks.cancelled()) return false;
    await seek(media, window.startMs, hooks);
    if (hooks.cancelled()) return false;
    await media.play();
    await untilEnd(media, window, hooks);
    media.pause();
    if (hooks.cancelled()) return false;
    hooks.onPass?.(pass);
    if (pass < passes) await sleep(hooks.gapMs ?? 900);
  }
  return true;
}
