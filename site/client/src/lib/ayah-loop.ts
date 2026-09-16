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
};

/** Stop this far before the recorded end: the check runs every few tens of ms,
 *  and running into the next ayah's first sound is worse than clipping silence. */
export const END_GUARD_MS = 40;

const realSleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

function once(media: MediaLike, type: string): Promise<void> {
  return new Promise(resolve => media.addEventListener(type, () => resolve(), { once: true }));
}

async function seek(media: MediaLike, ms: number) {
  // HAVE_METADATA: before it, setting currentTime is ignored.
  if (media.readyState < 1) await once(media, "loadedmetadata");
  const seeked = once(media, "seeked");
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
    await seek(media, window.startMs);
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
