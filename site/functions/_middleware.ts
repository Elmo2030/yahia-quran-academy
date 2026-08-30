/**
 * Stamps per-route metadata into the HTML shell.
 *
 * The site is a single-page app: the server sends one shell and React builds
 * the page in the browser. Search engines run JavaScript and see the real page,
 * but the crawlers behind link previews — WhatsApp, Telegram, Facebook, X,
 * Slack, iMessage — do not. Without this every shared link would preview as the
 * same site-level title and cover, whichever story it pointed at.
 *
 * Metadata is mirrored from client/src/lib/page-meta.ts. The two are kept in
 * step by:
 *   • scripts/build-seo.mjs, which regenerates this file from the same content
 *     on every build.
 *   • tests in client/src/lib/page-meta.test.ts that assert both copies agree.
 *
 * feature/auth-foundation (PR1) adds routes for /login, /register, /profile,
 * /privacy, /terms — all noindex. Auth pages have locale-aware titles so
 * English link previews show English text.
 */

import { chapters, stories, surahNames, seerahStation, seerahStories } from "./page-data.js";

const SITE = "أكاديمية يحيى لتعليم القرآن للأطفال";
const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
const DEFAULT_IMAGE = "/og-cover.jpg";
const ORIGIN = "https://yahia-quran-academy.pages.dev";

const clean = (text: string, max = 180) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
};

// --- Auth + account + utility routes (feature/auth-foundation) -----------

const noindex = { title: SITE, description: SITE_DESCRIPTION };

const authMeta = {
  path: "/login",
  title: "تسجيل الدخول — Yahia Quran Academy",
  description:
    "سجّل دخولك للاحتفاظ بتقدّمك في قراءة القرآن وقصصه عبر الأجهزة.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const registerMeta = {
  path: "/register",
  title: "إنشاء حساب — Yahia Quran Academy",
  description:
    "أنشئ حسابًا جديدًا على Yahia Quran Academy ليُحفظ تقدّمك في الحفظ والقراءة.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const profileMeta = {
  path: "/profile",
  title: "حسابي — Yahia Quran Academy",
  description: "إدارة حسابك وتقدّمك في Yahia Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const privacyMeta = {
  path: "/privacy",
  title: "سياسة الخصوصية — Yahia Quran Academy",
  description: "سياسة الخصوصية لمنصة Yahia Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const termsMeta = {
  path: "/terms",
  title: "شروط الاستخدام — Yahia Quran Academy",
  description: "شروط استخدام Yahia Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

/**
 * Mirrors client/src/lib/page-meta.ts. The two are kept in sync as noted above.
 */
function metaForPath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const parts = path.split("/").filter(Boolean);
  const head = parts[0];

  if (head === "login") return authMeta;
  if (head === "register") return registerMeta;
  if (head === "profile") return profileMeta;
  if (head === "privacy") return privacyMeta;
  if (head === "terms") return termsMeta;

  const base = { image: DEFAULT_IMAGE };

  // The seerah section sits outside /stories — it is the Prophet's life, not a
  // Quran story. Without this branch every seerah link previewed as "page not
  // found" while the page itself rendered correctly.
  if (head === "seerah") {
    if (!parts[1]) {
      return { ...base, path,
        title: `${seerahStation.titleAr} — السيرة النبوية · ${SITE}`,
        description: seerahStation.descriptionAr };
    }
    const story = seerahStories.find((entry: any) => entry.slug === parts[1]);
    if (story) {
      return { ...base, path,
        title: `${story.title} · السيرة النبوية`,
        description: clean(story.narrative) };
    }
  }

  if (head === "read") {
    if (!parts[1]) return {
      ...base,
      path,
      title: `القارئ — ١١٤ سورة · ${SITE}`,
      description: "اختر أي سورة واقرأها بالنص العثماني، واستمع إليها بتلاوة معلّمة موثقة.",
    };
    const surah = Number(parts[1]);
    const name = Number.isInteger(surah) && surah >= 1 && surah <= 114 ? surahNames[surah - 1] : null;
    return name
      ? { ...base, path, title: `سورة ${name} — قراءة واستماع · ${SITE}`,
          description: `اقرأ سورة ${name} بالنص العثماني واستمع إليها بتلاوة معلّمة موثقة، مع تمييز الآية والكلمة أثناء التلاوة.` }
      : { ...base, path, title: `الصفحة غير موجودة · ${SITE}`, description: SITE_DESCRIPTION };
  }

  if (head === "stories") {
    if (parts[1] === "library") {
      return { ...base, path, title: `مكتبتي · ${SITE}`,
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
    return { ...base, path, title: `قصص من القرآن للأطفال · ${SITE}`,
      description: `${stories.length} قصة في ${chapters.filter((c: any) => c.available).length} أبواب: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.` };
  }

  if (path === "/") return { ...base, path: "/", title: SITE, description: SITE_DESCRIPTION };
  return { ...base, path, title: `الصفحة غير موجودة · ${SITE}`, description: SITE_DESCRIPTION };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const robotsFor = (meta: ReturnType<typeof metaForPath>) =>
  meta.noindex ? "<meta name=\"robots\" content=\"noindex,nofollow\" />" : "";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  let response = await context.next();

  // SPA fallback: أي مسار بيرجع 404 ومش ملف ثابت (مفيهوش نقطة = مفيش امتداد)
  // نجيب له index.html — وReact Router بيتولى عرض الصفحة الصحيحة.
  const looksLikeFile = /\.[a-zA-Z0-9]+$/.test(pathname);
  if (response.status === 404 && !looksLikeFile) {
    response = await context.env.ASSETS.fetch(new URL("/index.html", url));
  }

  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;

  const meta = metaForPath(pathname);
  const canonical = `${ORIGIN}${meta.path}`;
  const image = meta.image.startsWith("http") ? meta.image : `${ORIGIN}${meta.image}`;
  const isHome = meta.path === "/";

  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const robots = escapeHtml(robotsFor(meta));

  const block = `<!--meta:start-->
    <title data-default>${title}</title>
    <meta data-default name="description" content="${description}" />
    <link data-default rel="canonical" href="${canonical}" />
    ${robots ? `<meta data-default name="robots" content="${robots}" />` : ""}
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
  if (start === -1 || end === -1) return new Response(html, response);

  const patched = html.slice(0, start) + block + html.slice(end + "<!--meta:end-->".length);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(patched, { status: response.status, statusText: response.statusText, headers });
};
