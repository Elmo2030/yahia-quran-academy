/*
 * The service worker exists for one reason: a child's journey should survive a
 * weak connection, and the site should open at all from the home screen when
 * there is none.
 *
 * It is deliberately timid. Cloudflare Pages answers a missing asset with
 * index.html and a 200, so anything cached blindly can poison a URL with a
 * page of HTML — this caches only what came back with the content type it
 * asked for, and never caches a navigation response as an asset. Audio is left
 * alone: one surah is several megabytes and the browser's own cache handles it.
 */
const VERSION = "v2";
const SHELL = `yahya-shell-${VERSION}`;
const ASSETS = `yahya-assets-${VERSION}`;
/** Written by the page, never by this worker: surahs saved for offline play. */
const AUDIO = "yahya-listen-audio-v1";
/**
 * Two shells, because the two sections a family opens without a connection are
 * the journey and the listening pages. A navigation that fails falls back to
 * whichever of them the address belongs to.
 */
const SHELL_URLS = ["/hifz", "/listen"];
const shellFor = pathname => (pathname.startsWith("/listen") ? "/listen" : "/hifz");

/** Paths whose answers are safe to keep: our own generated, immutable-ish files. */
const CACHEABLE = [/^\/hifz-art\//, /^\/quran\//, /^\/recitations\//, /^\/assets\//, /^\/fonts\//, /^\/stories\//, /^\/hero\//];

const expected = path =>
  /\.json$/.test(path) ? "application/json"
  : /\.(webp|png|jpg|jpeg|svg)$/.test(path) ? "image/"
  : /\.woff2?$/.test(path) ? "font/"
  : /\.js$/.test(path) ? "javascript"
  : /\.css$/.test(path) ? "text/css"
  : null;

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    // A failure here must not stop the worker from installing.
    await Promise.all(SHELL_URLS.map(url => cache.add(new Request(url, { cache: "reload" })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    // The saved surahs are the listener's own downloads, not this worker's
    // cache, and a version bump must never throw them away.
    const keep = new Set([SHELL, ASSETS, AUDIO]);
    await Promise.all((await caches.keys()).filter(key => !keep.has(key)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // the recitations live elsewhere

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        return (await caches.match(shellFor(url.pathname))) ?? new Response("", { status: 503 });
      }
    })());
    return;
  }

  if (!CACHEABLE.some(pattern => pattern.test(url.pathname))) return;

  event.respondWith((async () => {
    const cache = await caches.open(ASSETS);
    const hit = await cache.match(request);
    if (hit) return hit;
    const response = await fetch(request);
    const type = response.headers.get("content-type") ?? "";
    const wanted = expected(url.pathname);
    // A 200 carrying HTML where an image was asked for is the SPA fallback, not
    // the file; keeping it would break the URL until the cache is cleared.
    if (response.ok && response.status === 200 && (!wanted || type.includes(wanted))) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  })());
});
