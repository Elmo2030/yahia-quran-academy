// =============================================================================
// offline-audio.ts — keeping a surah on the device.
//
// A family in a car with no signal, a child at bedtime on a tablet with the
// wifi off: the listening section is worth more offline than on. The browser's
// own Cache Storage holds the files, keyed by the same R2 URL the player would
// otherwise fetch, so a saved surah plays through exactly the same code path.
//
// Two honest limits are told to the listener rather than hidden:
//   * Safari clears a site's storage after about seven days without a visit
//     unless the site is on the home screen, so this offers persistence and
//     says plainly when the browser refused it.
//   * The whole mushaf is 1.54 GB. Sizes are shown before a download starts.
// =============================================================================

const CACHE_NAME = "yahya-listen-audio-v1";

/** Cache Storage is missing in private windows on some browsers, and on http. */
function cacheStore(): CacheStorage | null {
  try {
    return typeof caches === "undefined" ? null : caches;
  } catch {
    return null;
  }
}

export const offlineSupported = () => cacheStore() !== null;

async function open(): Promise<Cache | null> {
  const store = cacheStore();
  if (!store) return null;
  try {
    return await store.open(CACHE_NAME);
  } catch {
    return null;
  }
}

export async function isSaved(url: string): Promise<boolean> {
  const cache = await open();
  if (!cache) return false;
  try {
    return Boolean(await cache.match(url));
  } catch {
    return false;
  }
}

/** Every saved URL, so a list of 114 rows can be drawn in one pass. */
export async function savedUrls(): Promise<Set<string>> {
  const cache = await open();
  if (!cache) return new Set();
  try {
    const keys = await cache.keys();
    return new Set(keys.map(request => request.url));
  } catch {
    return new Set();
  }
}

export type SaveProgress = { received: number; total: number };

export type SaveResult =
  | { ok: true }
  | { ok: false; reason: "unsupported" | "network" | "space" | "cancelled" };

/**
 * Downloads one surah into the cache, reporting progress as it goes.
 *
 * The body is read in chunks rather than handed straight to the cache so the
 * listener sees something move: al-Baqara is 125 MB, and a button that simply
 * sits there for two minutes looks broken.
 */
export async function saveSurah(
  url: string,
  onProgress?: (progress: SaveProgress) => void,
  signal?: AbortSignal,
): Promise<SaveResult> {
  const cache = await open();
  if (!cache) return { ok: false, reason: "unsupported" };

  let response: Response;
  try {
    // `cache: "reload"` is not optional. The <audio> element fetches a surah
    // without CORS, and that opaque copy sits in the browser's HTTP cache; a
    // later cors fetch of the same URL matches it and fails outright. A
    // listener who plays a surah and then saves it would hit exactly that, so
    // the download always goes to the network.
    response = await fetch(url, { signal, cache: "reload" });
  } catch (error) {
    return { ok: false, reason: (error as Error)?.name === "AbortError" ? "cancelled" : "network" };
  }
  if (!response.ok || !response.body) return { ok: false, reason: "network" };

  const total = Number(response.headers.get("content-length")) || 0;
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.byteLength;
        onProgress?.({ received, total });
      }
    }
  } catch (error) {
    return { ok: false, reason: (error as Error)?.name === "AbortError" ? "cancelled" : "network" };
  }

  const body = new Blob(chunks as BlobPart[], { type: response.headers.get("content-type") ?? "audio/mpeg" });
  try {
    await cache.put(url, new Response(body, { headers: { "content-type": body.type, "content-length": String(body.size) } }));
  } catch {
    // QuotaExceededError, and anything else the browser calls running out.
    return { ok: false, reason: "space" };
  }
  return { ok: true };
}

export async function removeSurah(url: string): Promise<boolean> {
  const cache = await open();
  if (!cache) return false;
  try {
    return await cache.delete(url);
  } catch {
    return false;
  }
}

export async function removeAll(): Promise<void> {
  const store = cacheStore();
  if (!store) return;
  try {
    await store.delete(CACHE_NAME);
  } catch {
    // Nothing to remove, or a browser that will not say.
  }
}

/**
 * A playable source for a surah: the saved copy where there is one, otherwise
 * the URL itself. The blob URL is revoked by the caller when it is done.
 */
export async function playableSource(url: string): Promise<{ src: string; offline: boolean }> {
  const cache = await open();
  if (!cache) return { src: url, offline: false };
  try {
    const hit = await cache.match(url);
    if (!hit) return { src: url, offline: false };
    return { src: URL.createObjectURL(await hit.blob()), offline: true };
  } catch {
    return { src: url, offline: false };
  }
}

// ---------------------------------------------------------------------------
// How much room there is, and how long the browser will keep it
// ---------------------------------------------------------------------------

export type Room = { used: number; quota: number } | null;

export async function room(): Promise<Room> {
  try {
    const estimate = await navigator.storage?.estimate?.();
    if (!estimate || estimate.quota === undefined) return null;
    return { used: estimate.usage ?? 0, quota: estimate.quota };
  } catch {
    return null;
  }
}

/** Asks the browser to stop clearing this site's storage on its own. */
export async function keepStorage(): Promise<boolean> {
  try {
    if (await navigator.storage?.persisted?.()) return true;
    return Boolean(await navigator.storage?.persist?.());
  } catch {
    return false;
  }
}

export async function storageIsKept(): Promise<boolean> {
  try {
    return Boolean(await navigator.storage?.persisted?.());
  } catch {
    return false;
  }
}

/** "125 ميجابايت" / "125 MB" — the number a listener decides on. */
export function megabytes(bytes: number, locale: "ar" | "en"): string {
  if (bytes >= 1_073_741_824) {
    const gb = (bytes / 1_073_741_824).toFixed(1);
    return locale === "ar" ? `${gb} جيجابايت` : `${gb} GB`;
  }
  const mb = bytes / 1_048_576;
  const shown = mb >= 10 || mb === 0 ? Math.round(mb) : Math.round(mb * 10) / 10;
  return locale === "ar" ? `${shown} ميجابايت` : `${shown} MB`;
}
