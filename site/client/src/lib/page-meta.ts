/**
 * One description of what every page is, keyed by pathname.
 *
 * Both the app and the Cloudflare function that serves it read from here. The
 * app renders these tags so the browser tab and JavaScript-capable crawlers see
 * them; the function stamps them into the HTML shell so the crawlers that never
 * run JavaScript — WhatsApp, Telegram, Facebook, Slack, iMessage — see them too.
 * Keeping one source means a story added to stories.ts cannot end up described
 * correctly in one place and generically in the other.
 */

// Relative, not aliased: the Cloudflare function imports this module too,
// and its esbuild pass does not know about the "@" alias.
import { chapters, stories } from "../content/stories";
import { surahNames } from "./quran-content";

export const SITE_NAME = "أكاديمية يحيى لتعليم القرآن للأطفال";
export const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
export const DEFAULT_IMAGE = "/og-cover.jpg";

export type PageMeta = {
  title: string;
  description: string;
  image: string;
  /** the canonical path, without a trailing slash */
  path: string;
};

const clean = (text: string, max = 180) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
};

export function metaForPath(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const parts = path.split("/").filter(Boolean);

  const base = { image: DEFAULT_IMAGE, path };

  // /read and /read/:surah
  if (parts[0] === "read") {
    const surah = Number(parts[1]);
    const name = Number.isInteger(surah) && surah >= 1 && surah <= 114 ? surahNames[surah - 1] : null;
    return name
      ? { ...base, title: `سورة ${name} — قراءة واستماع · ${SITE_NAME}`,
          description: `اقرأ سورة ${name} بالنص العثماني واستمع إليها بتلاوة معلّمة موثقة، مع تمييز الآية والكلمة أثناء التلاوة.` }
      : { ...base, title: `القارئ — ١١٤ سورة · ${SITE_NAME}`,
          description: "اختر أي سورة واقرأها بالنص العثماني، واستمع إليها بتلاوة معلّمة موثقة." };
  }

  if (parts[0] === "stories") {
    // /stories/library
    if (parts[1] === "library") {
      return { ...base, title: `مكتبتي · ${SITE_NAME}`,
        description: "القصص التي اخترت الاحتفاظ بها لقراءتها مرة أخرى." };
    }

    // /stories/:chapter/:slug
    if (parts[1] && parts[2]) {
      const story = stories.find(s => s.chapter === parts[1] && s.slug === parts[2]);
      if (story) {
        return { path, image: story.image ?? DEFAULT_IMAGE,
          title: `${story.title} · قصص من القرآن`,
          description: clean(story.hook) };
      }
    }

    // /stories/:chapter
    if (parts[1]) {
      const chapter = chapters.find(c => c.slug === parts[1] && c.available);
      if (chapter) {
        const count = stories.filter(s => s.chapter === chapter.slug).length;
        return { path, image: chapter.cover ?? DEFAULT_IMAGE,
          title: `${chapter.titleAr} — ${count} قصة · ${SITE_NAME}`,
          description: clean(chapter.descriptionAr) };
      }
    }

    // /stories
    return { ...base, title: `قصص من القرآن للأطفال · ${SITE_NAME}`,
      description: `${stories.length} قصة في ${chapters.filter(c => c.available).length} أبواب: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.` };
  }

  if (path === "/") {
    return { ...base, title: SITE_NAME, description: SITE_DESCRIPTION };
  }

  return { ...base, title: `الصفحة غير موجودة · ${SITE_NAME}`, description: SITE_DESCRIPTION };
}

/** Every path worth describing — used by the sitemap and by the build check. */
export function allMetaPaths(): string[] {
  return [
    "/", "/read", "/stories", "/stories/library",
    ...Array.from({ length: 114 }, (_, i) => `/read/${i + 1}`),
    ...chapters.filter(c => c.available).map(c => `/stories/${c.slug}`),
    ...stories.map(s => `/stories/${s.chapter}/${s.slug}`),
  ];
}
