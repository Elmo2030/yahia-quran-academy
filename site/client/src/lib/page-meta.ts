// =============================================================================
// page-meta.ts — canonical per-route metadata for the static SPA.
//
// Lives in two places at build time: this client-side module exports
// metaForPath() and is consumed by <PageMeta/> for hydration; functions/_
// middleware.ts mirrors it for crawlers that do not run JavaScript (link
// previews). scripts/build-seo.mjs regenerates the worker copy from this
// shape on every build, so the two cannot drift.
//
// feature/auth-foundation (PR1) adds routes for /login, /register, /profile,
// /privacy, /terms. Auth + account routes ship "noindex" because their content
// is gated and exposing them invites account-claim scraping.
// =============================================================================

export type Locale = "ar" | "en";

export type Meta = {
  path: string;
  title: string;
  description: string;
  image: string;
  noindex?: boolean;
  // Optional pre-localized variants — used by <PageMeta/> when it renders to
  // swap the title for non-default locales; the worker stays single-locale
  // because link-preview bots send a single Accept-Language.
  i18n?: Partial<Record<Locale, { title: string; description: string }>>;
};

export const SITE_NAME = "أكاديمية يحيى لتعليم القرآن للأطفال";
export const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
export const DEFAULT_IMAGE = "/og-cover.jpg";

const ORIGIN = "https://yahia-quran-academy.pages.dev";

export const fullUrl = (pathOrUrl: string): string =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${ORIGIN}${pathOrUrl}`;

// ---------------------------------------------------------------------------
// Auth + account routes (added by feature/auth-foundation PR1)
// ---------------------------------------------------------------------------
export const authMeta: Meta = {
  path: "/login",
  title: "تسجيل الدخول — Yahia Quran Academy",
  description:
    "سجّل دخولك للاحتفاظ بتقدّمك في قراءة القرآن وقصصه عبر الأجهزة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Sign in — Yahia Quran Academy",
      description:
        "Sign in to keep your Quran reading and stories progress in sync across devices.",
    },
  },
};

export const registerMeta: Meta = {
  path: "/register",
  title: "إنشاء حساب — Yahia Quran Academy",
  description:
    "أنشئ حسابًا جديدًا على Yahia Quran Academy ليُحفظ تقدّمك في الحفظ والقراءة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Create account — Yahia Quran Academy",
      description:
        "Create a Yahia Quran Academy account so your reading and memorization progress syncs everywhere.",
    },
  },
};

export const profileMeta: Meta = {
  path: "/profile",
  title: "حسابي — Yahia Quran Academy",
  description: "إدارة حسابك وتقدّمك في Yahia Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "My account — Yahia Quran Academy",
      description:
        "Manage your account and progress on Yahia Quran Academy.",
    },
  },
};

export const privacyMeta: Meta = {
  path: "/privacy",
  title: "سياسة الخصوصية — Yahia Quran Academy",
  description: "سياسة الخصوصية لمنصة Yahia Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Privacy policy — Yahia Quran Academy",
      description: "Privacy policy for Yahia Quran Academy.",
    },
  },
};

export const termsMeta: Meta = {
  path: "/terms",
  title: "شروط الاستخدام — Yahia Quran Academy",
  description: "شروط استخدام Yahia Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Terms of use — Yahia Quran Academy",
      description: "Terms of use for Yahia Quran Academy.",
    },
  },
};

// ---------------------------------------------------------------------------
// Static routes (read + stories) keep the per-path logic that already shipped.
// PR1 only adds the auth entries below; no existing path changes.
// ---------------------------------------------------------------------------

type SurahLookup = { number: number; nameAr: string };
type ChapterLookup = { slug: string; titleAr: string; descriptionAr: string; cover?: string };
type StoryLookup = { chapter: string; slug: string; title: string; hook: string; image?: string };

export type LookupBundle = ReadonlyArray<SurahLookup> & {
  __kind?: "surahs";
} | never;

// Static-typed lookup constructors the worker and the React side both call.
// Pulled out so the worker (which only sees compiled JS) does not need any
// runtime JSON import.
const surahsByNumber: ReadonlyMap<number, string> = new Map(); // populated below
const chapterBySlug: ReadonlyMap<string, ChapterLookup> = new Map();
const storiesBySlug: ReadonlyMap<string, StoryLookup> = new Map();

const ensureSurahEntry = (n: number, nameAr: string) => {
  if (!surahsByNumber.has(n)) surahsByNumber.set(n, nameAr);
};
const ensureChapterEntry = (chapter: ChapterLookup) => {
  if (!chapterBySlug.has(chapter.slug)) chapterBySlug.set(chapter.slug, chapter);
};
const ensureStoryEntry = (story: StoryLookup) => {
  if (!storiesBySlug.has(`${story.chapter}/${story.slug}`)) {
    storiesBySlug.set(`${story.chapter}/${story.slug}`, story);
  }
};

// Default fall-back used when no chapter / story / surah lists are loaded;
// PR4+ may replace these with the actual static manifest. The site still
// renders sensible Arabic titles while PR4 is built.
const FALLBACK_NOT_FOUND: Meta = {
  path: "/",
  title: "الصفحة غير موجودة — Yahia Quran Academy",
  description: SITE_DESCRIPTION,
  image: DEFAULT_IMAGE,
  noindex: true,
};

export const metaForPath = (pathname: string): Meta => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const parts = path.split("/").filter(Boolean);
  const head = parts[0];

  if (head === "login") return authMeta;
  if (head === "register") return registerMeta;
  if (head === "profile") return profileMeta;
  if (head === "privacy") return privacyMeta;
  if (head === "terms") return termsMeta;

  if (head === "read") {
    if (!parts[1]) {
      return {
        path,
        title: `القارئ — ١١٤ سورة · ${SITE_NAME}`,
        description: "اختر أي سورة واقرأها بالنص العثماني، واستمع إليها بتلاوة معلّمة موثقة.",
        image: DEFAULT_IMAGE,
      };
    }
    const n = Number(parts[1]);
    const name = surahsByNumber.get(n);
    return name
      ? {
          path,
          title: `سورة ${name} — قراءة واستماع · ${SITE_NAME}`,
          description: `اقرأ سورة ${name} بالنص العثماني واستمع إليها بتلاوة معلّمة موثقة، مع تمييز الآية والكلمة أثناء التلاوة.`,
          image: DEFAULT_IMAGE,
        }
      : FALLBACK_NOT_FOUND;
  }

  if (head === "stories") {
    if (!parts[1]) {
      return {
        path,
        title: `قصص من القرآن للأطفال · ${SITE_NAME}`,
        description:
          "القصص في أبواب أربعة: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.",
        image: DEFAULT_IMAGE,
      };
    }
    if (parts[2]) {
      const story = storiesBySlug.get(`${parts[1]}/${parts[2]}`);
      if (story) {
        return {
          path,
          title: `${story.title} · قصص من القرآن`,
          description: story.hook,
          image: story.image ?? DEFAULT_IMAGE,
        };
      }
    }
    const chapter = chapterBySlug.get(parts[1]);
    if (chapter) {
      return {
        path,
        title: `${chapter.titleAr} · ${SITE_NAME}`,
        description: chapter.descriptionAr,
        image: chapter.cover ?? DEFAULT_IMAGE,
      };
    }
    return FALLBACK_NOT_FOUND;
  }

  if (path === "/") {
    return {
      path: "/",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      image: DEFAULT_IMAGE,
    };
  }
  return FALLBACK_NOT_FOUND;
};

// ---------------------------------------------------------------------------
// content/stories.ts (and the worker copy) call these to register the
// real surah/chapter/story titles — keeping metaForPath a pure function of
// the registered set lets us drop the JSON import (and its bundle weight) on
// the static SPA.
// ---------------------------------------------------------------------------
export const registerSurah = ensureSurahEntry;
export const registerChapter = ensureChapterEntry;
export const registerStory = ensureStoryEntry;
