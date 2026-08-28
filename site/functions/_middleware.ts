/**
 * Stamps per-route metadata into the HTML shell.
 *
 * The site is a single-page app: the server sends one shell and React builds
 * the page in the browser. Search engines run JavaScript and see the real page,
 * but the crawlers behind link previews — WhatsApp, Telegram, Facebook, X,
 * Slack, iMessage — do not. Without this every shared link would preview as the
 * same site-level title and cover, whichever story it pointed at.
 *
 * The metadata comes from the same module the app renders from, so the two
 * cannot drift.
 */

import { chapters, stories, surahNames } from "./page-data.js";

const SITE = "أكاديمية يحيى لتعليم القرآن للأطفال";
const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
const DEFAULT_IMAGE = "/og-cover.jpg";

const clean = (text: string, max = 180) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
};

/**
 * Mirrors client/src/lib/page-meta.ts. The two are kept in step by
 * scripts/build-seo.mjs, which regenerates page-data.js from the same content
 * on every build, and by tests/page-meta.test.ts, which fails if a route
 * described here disagrees with the app.
 */
function metaForPath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const parts = path.split("/").filter(Boolean);
  const base = { image: DEFAULT_IMAGE, path };

  if (parts[0] === "read") {
    const surah = Number(parts[1]);
    const name = Number.isInteger(surah) && surah >= 1 && surah <= 114 ? surahNames[surah - 1] : null;
    return name
      ? { ...base, title: `سورة ${name} — قراءة واستماع · ${SITE}`,
          description: `اقرأ سورة ${name} بالنص العثماني واستمع إليها بتلاوة معلّمة موثقة، مع تمييز الآية والكلمة أثناء التلاوة.` }
      : { ...base, title: `القارئ — ١١٤ سورة · ${SITE}`,
          description: "اختر أي سورة واقرأها بالنص العثماني، واستمع إليها بتلاوة معلّمة موثقة." };
  }

  if (parts[0] === "stories") {
    if (parts[1] === "library") {
      return { ...base, title: `مكتبتي · ${SITE}`,
        description: "القصص التي اخترت الاحتفاظ بها لقراءتها مرة أخرى." };
    }
    if (parts[1] && parts[2]) {
      const story = stories.find((s: any) => s.chapter === parts[1] && s.slug === parts[2]);
      if (story) {
        return { path, image: story.image ?? DEFAULT_IMAGE,
          title: `${story.title} · قصص من القرآن`, description: clean(story.hook) };
      }
    }
    if (parts[1]) {
      const chapter = chapters.find((c: any) => c.slug === parts[1] && c.available);
      if (chapter) {
        const count = stories.filter((s: any) => s.chapter === chapter.slug).length;
        return { path, image: chapter.cover ?? DEFAULT_IMAGE,
          title: `${chapter.titleAr} — ${count} قصة · ${SITE}`, description: clean(chapter.descriptionAr) };
      }
    }
    return { ...base, title: `قصص من القرآن للأطفال · ${SITE}`,
      description: `${stories.length} قصة في ${chapters.filter((c: any) => c.available).length} أبواب: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.` };
  }

  if (path === "/") return { ...base, title: SITE, description: SITE_DESCRIPTION };
  return { ...base, title: `الصفحة غير موجودة · ${SITE}`, description: SITE_DESCRIPTION };
}

const ORIGIN = "https://yahia-quran-academy.pages.dev";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();

  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;

  const url = new URL(context.request.url);
  const meta = metaForPath(url.pathname);
  const canonical = `${ORIGIN}${meta.path}`;
  const image = meta.image.startsWith("http") ? meta.image : `${ORIGIN}${meta.image}`;
  const isHome = meta.path === "/";

  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  // Kept marked data-default so the app still removes them once it renders its
  // own — otherwise a browser would end up holding both sets.
  const block = `<!--meta:start-->
    <title data-default>${title}</title>
    <meta data-default name="description" content="${description}" />
    <link data-default rel="canonical" href="${canonical}" />
    <meta data-default property="og:type" content="${isHome ? "website" : "article"}" />
    <meta data-default property="og:site_name" content="${SITE}" />
    <meta data-default property="og:locale" content="ar_AR" />
    <meta data-default property="og:title" content="${title}" />
    <meta data-default property="og:description" content="${description}" />
    <meta data-default property="og:image" content="${image}" />
    <meta data-default property="og:url" content="${canonical}" />
    <meta data-default name="twitter:card" content="summary_large_image" />
    <meta data-default name="twitter:title" content="${title}" />
    <meta data-default name="twitter:description" content="${description}" />
    <meta data-default name="twitter:image" content="${image}" />
    <!--meta:end-->`;

  const html = await response.text();
  const start = html.indexOf("<!--meta:start-->");
  const end = html.indexOf("<!--meta:end-->");
  // If the markers ever go missing, serve the shell untouched rather than
  // guessing where the metadata belongs.
  if (start === -1 || end === -1) return new Response(html, response);

  const patched = html.slice(0, start) + block + html.slice(end + "<!--meta:end-->".length);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(patched, { status: response.status, statusText: response.statusText, headers });
};
