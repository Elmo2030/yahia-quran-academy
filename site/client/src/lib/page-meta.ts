// A generated index of just the titles and descriptions, not the story text.
// Importing the content modules here dragged every narrative in both languages
// into the entry chunk, for metadata that needs a line of each.
import {
  chapterIndex,
  storyIndex,
  seerahStationIndex,
  seerahStoryIndex,
} from "./page-index.generated";
import { englishSurahNames, surahNames } from "./quran-content";

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
export const SITE_NAME_EN = "Yahya Quran Academy";
export const SITE_DESCRIPTION_EN =
  "The Quran in the Uthmani text with verified teaching recitations, and illustrated stories from the Quran for children, in four chapters.";
export const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
export const DEFAULT_IMAGE = "/og-cover.jpg";

const ORIGIN = "https://yahyaquran.com";

export const fullUrl = (pathOrUrl: string): string =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${ORIGIN}${pathOrUrl}`;

// ---------------------------------------------------------------------------
// Auth + account routes (added by feature/auth-foundation PR1)
// ---------------------------------------------------------------------------
export const authMeta: Meta = {
  path: "/login",
  title: "تسجيل الدخول — Yahya Quran Academy",
  description:
    "سجّل دخولك للاحتفاظ بتقدّمك في قراءة القرآن وقصصه عبر الأجهزة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Sign in — Yahya Quran Academy",
      description:
        "Sign in to keep your Quran reading and stories progress in sync across devices.",
    },
  },
};

export const registerMeta: Meta = {
  path: "/register",
  title: "إنشاء حساب — Yahya Quran Academy",
  description:
    "أنشئ حسابًا جديدًا على Yahya Quran Academy ليُحفظ تقدّمك في الحفظ والقراءة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Create account — Yahya Quran Academy",
      description:
        "Create a Yahya Quran Academy account so your reading and memorization progress syncs everywhere.",
    },
  },
};

export const profileMeta: Meta = {
  path: "/profile",
  title: "حسابي — Yahya Quran Academy",
  description: "إدارة حسابك وتقدّمك في Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "My account — Yahya Quran Academy",
      description:
        "Manage your account and progress on Yahya Quran Academy.",
    },
  },
};

export const quranFactsMeta: Meta = {
  path: "/quran-facts",
  title: "في رحاب القرآن — اكتشف أسرار القرآن",
  description: "خمسون معلومة عن القرآن الكريم للأطفال، كل واحدة خلف بطاقة تُقلب لتقرأها.",
  image: DEFAULT_IMAGE,
  i18n: { en: { title: "In the Realm of the Quran — Discover the Quran", description: "Fifty things worth knowing about the Quran for children, each behind a card you turn over." } },
};

const aboutMeta: Meta = {
  path: "/about",
  title: "من نحن — موقع يحيى لتعليم الأطفال",
  description:
    "مشروع تعليمي للأطفال من 5 إلى 10 سنوات، أُنشئ صدقة جارية على روح د. محمد يحيى عباس عبود وم. ماجدة موسى محمد، رحمهما الله.",
  image: DEFAULT_IMAGE,
};

const privacyMeta: Meta = {
  path: "/privacy",
  title: "سياسة الخصوصية — Yahya Quran Academy",
  description: "سياسة الخصوصية لمنصة Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Privacy policy — Yahya Quran Academy",
      description: "Privacy policy for Yahya Quran Academy.",
    },
  },
};

export const termsMeta: Meta = {
  path: "/terms",
  title: "شروط الاستخدام — Yahya Quran Academy",
  description: "شروط استخدام Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Terms of use — Yahya Quran Academy",
      description: "Terms of use for Yahya Quran Academy.",
    },
  },
};

export const forgotPasswordMeta: Meta = {
  path: "/forgot-password",
  title: "استعادة كلمة المرور — Yahya Quran Academy",
  description:
    "أدخل بريدك الإلكتروني لاستعادة كلمة مرور حسابك على Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Reset password — Yahya Quran Academy",
      description:
        "Enter your email to reset your Yahya Quran Academy password.",
    },
  },
};

export const resetPasswordMeta: Meta = {
  path: "/reset-password",
  title: "تعيين كلمة مرور جديدة — Yahya Quran Academy",
  description: "عيّن كلمة مرور جديدة لحسابك على Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Set a new password — Yahya Quran Academy",
      description:
        "Set a new password for your Yahya Quran Academy account.",
    },
  },
};

// ---------------------------------------------------------------------------
// Static routes (read + stories) keep the per-path logic that already shipped.
// PR1 only adds the auth entries below; no existing path changes.
// ---------------------------------------------------------------------------

type SurahLookup = { number: number; nameAr: string };
// `cover` is nullable in content/stories (a chapter awaiting art), and the
// call sites use `?? DEFAULT_IMAGE`, which handles null as well as undefined.
type ChapterLookup = { slug: string; titleAr: string; descriptionAr: string; titleEn?: string | null; descriptionEn?: string | null; cover?: string | null };
// The generated index writes null for "no artwork"; call sites use
// `?? DEFAULT_IMAGE`, which handles both.
type StoryLookup = { chapter: string; slug: string; title: string; hook: string; titleEn?: string | null; hookEn?: string | null; image?: string | null };

export type LookupBundle = ReadonlyArray<SurahLookup> & {
  __kind?: "surahs";
} | never;

// Title lookups, built once at module load from the same content modules the
// pages render from.
//
// These used to be empty maps filled by exported register* helpers — which
// nothing ever called, so every /read/:surah, /stories/:chapter and
// /stories/:chapter/:slug page fell through to "الصفحة غير موجودة" the moment
// React replaced the (correct) title the Cloudflare function had rendered.
// Reading the content directly removes the chance of that happening again.
//
// Cost is nil: surahNames is a 114-entry string array (the Quran text itself
// is fetched at runtime, not imported), and content/stories is already in the
// bundle because the Stories page imports it.
const surahsByNumber: Map<number, string> = new Map(
  surahNames.map((name, index) => [index + 1, name] as const),
);
const chapterBySlug: Map<string, ChapterLookup> = new Map(
  chapterIndex.map(chapter => [chapter.slug, chapter] as const),
);
const storiesBySlug: Map<string, StoryLookup> = new Map(
  storyIndex.map(story => [`${story.chapter}/${story.slug}`, story] as const),
);

// Returned for a path that matches no surah, chapter, story or static page.
const FALLBACK_NOT_FOUND: Meta = {
  path: "/",
  title: "الصفحة غير موجودة — Yahya Quran Academy",
  description: SITE_DESCRIPTION,
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: { en: { title: "Page not found — Yahya Quran Academy", description: SITE_DESCRIPTION_EN } },
};

/** The metadata as the reader's locale sees it. Falls back to Arabic for
 *  anything with no English variant, which is what the pages do too. */
export const localizedMeta = (meta: Meta, locale: Locale): Meta => {
  const variant = meta.i18n?.[locale];
  return variant ? { ...meta, title: variant.title, description: variant.description } : meta;
};

export const metaForPath = (pathname: string): Meta => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const parts = path.split("/").filter(Boolean);
  const head = parts[0];

  if (head === "login") return authMeta;
  if (head === "register") return registerMeta;
  if (head === "profile") return profileMeta;
  if (head === "quran-facts") return quranFactsMeta;
  if (head === "about") return aboutMeta;
  if (head === "privacy") return privacyMeta;
  if (head === "terms") return termsMeta;
  if (head === "forgot-password") return forgotPasswordMeta;
  if (head === "reset-password") return resetPasswordMeta;

  // The seerah section is a separate chapter of the Prophet's life, not a Quran
  // story, so it does not live under /stories. Without this it fell through to
  // the not-found branch and every station and story carried a "page not found"
  // title while rendering its content perfectly.
  if (head === "seerah") {
    if (!parts[1]) {
      return {
        path,
        title: `السيرة النبوية — ${seerahStationIndex.length} محطات · ${SITE_NAME}`,
        description: seerahStationIndex.map(station => station.titleAr).join(" · "),
        image: DEFAULT_IMAGE,
        i18n: { en: { title: `The Prophet's Seerah — ${seerahStationIndex.length} stations · ${SITE_NAME_EN}`, description: seerahStationIndex.map(station => station.titleEn ?? station.titleAr).join(" · ") } },
      };
    }
    const story = seerahStoryIndex.find(entry => entry.slug === parts[1]);
    if (story) {
      return {
        path,
        title: `${story.title} · السيرة النبوية`,
        description: story.description,
        image: story.image ?? DEFAULT_IMAGE,
        i18n: story.titleEn ? { en: { title: `${story.titleEn} · The Prophet's Seerah`, description: story.descriptionEn ?? story.description } } : undefined,
      };
    }
    return FALLBACK_NOT_FOUND;
  }

  if (head === "read") {
    if (!parts[1]) {
      return {
        path,
        title: `القارئ — ١١٤ سورة · ${SITE_NAME}`,
        description: "اختر أي سورة واقرأها بالنص العثماني، واستمع إليها بتلاوة معلّمة موثقة.",
        image: DEFAULT_IMAGE,
        i18n: { en: { title: `The reader — all 114 surahs · ${SITE_NAME_EN}`, description: "Choose any surah, read it in the Uthmani text, and listen to a verified teaching recitation." } },
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
          i18n: { en: { title: `Surah ${englishSurahNames[n - 1] ?? name} — read and listen · ${SITE_NAME_EN}`, description: `Read Surah ${englishSurahNames[n - 1] ?? name} in the Uthmani text and listen to a verified teaching recitation, with the ayah and word lit up as it is recited.` } },
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
        i18n: { en: { title: `Stories from the Quran for children · ${SITE_NAME_EN}`, description: "Four chapters: the prophets, people and nations, animals the Quran names, and women in the Quran." } },
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
          i18n: story.titleEn ? { en: { title: `${story.titleEn} · Stories from the Quran`, description: story.hookEn ?? story.hook } } : undefined,
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
        i18n: chapter.titleEn ? { en: { title: `${chapter.titleEn} · ${SITE_NAME_EN}`, description: chapter.descriptionEn ?? chapter.descriptionAr } } : undefined,
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
      i18n: { en: { title: SITE_NAME_EN, description: SITE_DESCRIPTION_EN } },
    };
  }
  return FALLBACK_NOT_FOUND;
};
