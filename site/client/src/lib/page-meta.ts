// A generated index of just the titles and descriptions, not the story text.
// Importing the content modules here dragged every narrative in both languages
// into the entry chunk, for metadata that needs a line of each.
import {
  chapterIndex,
  storyIndex,
  seerahStationIndex,
  seerahStoryIndex,
  aqeedahCardIndex,
  aqeedahChapterIndex,
  factIndex,
} from "./page-index.generated";
import { englishSurahNames, surahNames } from "./quran-content";
import { companionIndex } from "./companion-index.generated";
import { isValidReaderPage } from "./quran-page-map";

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
  arabicOnly?: boolean;
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
export const DEFAULT_IMAGE = "/og-yahya-hero.jpg";

const ORIGIN = "https://yahyaquran.com";

export const fullUrl = (pathOrUrl: string): string =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${ORIGIN}${pathOrUrl}`;

// ---------------------------------------------------------------------------
// Auth + account routes (added by feature/auth-foundation PR1)
// ---------------------------------------------------------------------------
export const authMeta: Meta = {
  path: "/login",
  title: "تسجيل الدخول · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "سجّل دخولك للاحتفاظ بتقدّمك في قراءة القرآن وقصصه عبر الأجهزة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Sign in · Yahya Quran Academy",
      description:
        "Sign in to keep your Quran reading and stories progress in sync across devices.",
    },
  },
};

export const registerMeta: Meta = {
  path: "/register",
  title: "إنشاء حساب · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "أنشئ حسابًا جديدًا على أكاديمية يحيى ليُحفظ تقدّمك في الحفظ والقراءة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Create account · Yahya Quran Academy",
      description:
        "Create a Yahya Quran Academy account so your reading and memorization progress syncs everywhere.",
    },
  },
};

export const profileMeta: Meta = {
  path: "/profile",
  title: "حسابي · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "إدارة حسابك وتقدّمك في أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "My account · Yahya Quran Academy",
      description:
        "Manage your account and progress on Yahya Quran Academy.",
    },
  },
};

// The journey itself is the one page in this family worth finding: a parent
// searching for a way to memorize Juz Amma with a child should land on it. It
// carried "noindex" from the months when it was a settings screen with nothing
// behind it; the map, the stars and the review queue have shipped since.
export const hifzMeta: Meta = {
  path: "/hifz",
  title: "رحلة حفظ جزء عمّ للأطفال · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "خريطة لحفظ جزء عمّ: الطفل يسمع الآية ويكرّرها ويسجّل صوته، وتعود عليه للمراجعة بعد يوم وثلاثة وسبعة. وليّ الأمر هو من يقدّر التلاوة، ولا يُحفظ شيء إلا على جهازك.",
  image: DEFAULT_IMAGE,
  i18n: {
    en: {
      title: "A Juz Amma memorization journey for children · Yahya Quran Academy",
      description:
        "A map for memorizing Juz Amma: the child listens, repeats and records, and each ayah returns for review after a day, three days, a week. The parent is the one who judges the recitation, and nothing leaves the device.",
    },
  },
};

// Everything under it is one child's own screen — their queue, their parent's
// PIN, their certificate. There is nothing there for a crawler to read, and
// what it would read is a stranger's empty copy of it.
export const hifzInnerMeta: Meta = {
  ...hifzMeta,
  title: "رحلة الحفظ · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "رحلة حفظ جزء عمّ للأطفال مع يحيى وفاطمة، وكل البيانات تبقى على جهازك.",
  noindex: true,
  i18n: {
    en: {
      title: "Memorization journey · Yahya Quran Academy",
      description: "A Juz Amma memorization journey for children with Yahya and Fatima; all data stays on your device.",
    },
  },
};

// A page-image mushaf, distinct from the retired /read text reader. The hub
// is worth finding; the 604 page routes are identical in structure (one
// image, no unique crawlable text) and would just spend crawl budget, so they
// stay noindex the way a single hifz child's screen does, for a different
// reason — duplication, not privacy.
export const mushafiMeta: Meta = {
  path: "/mushafi",
  title: "مصحفي — المصحف الشريف برواية حفص · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "تصفّح صفحات المصحف الشريف الملوّنة بأحكام التجويد، برواية حفص عن عاصم، بالرسم العثماني، صفحة كما هي دون أي تعديل في النص.",
  image: DEFAULT_IMAGE,
  i18n: {
    en: {
      title: "Mushafi — the Holy Mushaf in Hafs narration · Yahya Quran Academy",
      description: "Browse the mushaf's Tajweed-colored pages, in the narration of Hafs from Aasim, in the Uthmani script — every page exactly as printed.",
    },
  },
};

export const mushafiPageMeta: Meta = {
  ...mushafiMeta,
  title: "مصحفي · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "صفحة من المصحف الشريف برواية حفص عن عاصم.",
  noindex: true,
  i18n: {
    en: {
      title: "Mushafi · Yahya Quran Academy",
      description: "A page of the mushaf, in the narration of Hafs from Aasim.",
    },
  },
};

export const quranFactsMeta: Meta = {
  path: "/quran-facts",
  title: "في رحاب القرآن — اكتشف أسرار القرآن",
  description: "مئة معلومة عن القرآن الكريم للأطفال، كل واحدة خلف بطاقة تُقلب لتقرأها.",
  // The section has art of its own, so a link to it does not share Yahya's
  // portrait — it shares what the section is about.
  image: "/facts/share.jpg",
  i18n: { en: { title: "In the Realm of the Quran — Discover the Quran", description: "A hundred things worth knowing about the Quran for children, each behind a card you turn over." } },
};

const aboutMeta: Meta = {
  path: "/about",
  title: "من نحن · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "مشروع تعليمي للأطفال من 5 إلى 10 سنوات، أُنشئ صدقة جارية على روح د. محمد يحيى عباس عبود وم. ماجدة موسى محمد، رحمهما الله.",
  image: DEFAULT_IMAGE,
  i18n: {
    en: {
      title: "About us · Yahya Quran Academy",
      description: "A children's Quran learning project, created as an ongoing charity in memory of Dr. Mohamed Yahya Abbas Aboud and Eng. Magda Moussa Mohamed.",
    },
  },
};

const journeyMeta: Meta = {
  path: "/journey",
  title: "رحلتي · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "خطوة الطفل التالية بين رحلة الحفظ، وقصص القرآن، وفي رحاب القرآن.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "My journey · Yahya Quran Academy",
      description: "A child's next step across memorization, Quran stories, and Quran discoveries.",
    },
  },
};

const privacyMeta: Meta = {
  path: "/privacy",
  title: "سياسة الخصوصية · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "سياسة الخصوصية لمنصة أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  i18n: {
    en: {
      title: "Privacy policy · Yahya Quran Academy",
      description: "Privacy policy for Yahya Quran Academy.",
    },
  },
};

export const termsMeta: Meta = {
  path: "/terms",
  title: "شروط الاستخدام · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "شروط استخدام أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  i18n: {
    en: {
      title: "Terms of use · Yahya Quran Academy",
      description: "Terms of use for Yahya Quran Academy.",
    },
  },
};

export const forgotPasswordMeta: Meta = {
  path: "/forgot-password",
  title: "استعادة كلمة المرور · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "أدخل بريدك الإلكتروني لاستعادة كلمة مرور حسابك على أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Reset password · Yahya Quran Academy",
      description:
        "Enter your email to reset your Yahya Quran Academy password.",
    },
  },
};

export const resetPasswordMeta: Meta = {
  path: "/reset-password",
  title: "تعيين كلمة مرور جديدة · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "عيّن كلمة مرور جديدة لحسابك على أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: {
    en: {
      title: "Set a new password · Yahya Quran Academy",
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
  title: `الصفحة غير موجودة · ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  image: DEFAULT_IMAGE,
  noindex: true,
  i18n: { en: { title: "Page not found · Yahya Quran Academy", description: SITE_DESCRIPTION_EN } },
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
  if (head === "companions") {
    const story = companionIndex.find(c => c.slug === parts[1]);
    if (parts.length > 2 || (parts[1] && !story)) return FALLBACK_NOT_FOUND;
    return { path, arabicOnly: true, title: story ? `${story.name} — ${story.title} · الصحابة` : "الصحابة — قصص نتعلم منها · أكاديمية يحيى لتعليم القرآن للأطفال", description: story?.description ?? "قصص الصحابة والصحابيات: مواقف وقيم وأسئلة للفهم ومراجع للوالدين.", image: DEFAULT_IMAGE };
  }

  if (head === "login") return authMeta;
  if (head === "register") return registerMeta;
  if (head === "profile") return profileMeta;
  if (head === "journey") return journeyMeta;
  if (head === "hifz") return parts[1] ? hifzInnerMeta : hifzMeta;
  if (head === "mushafi") {
    if (!parts[1]) return mushafiMeta;
    if (parts.length > 2 || !isValidReaderPage(Number(parts[1]))) return FALLBACK_NOT_FOUND;
    return mushafiPageMeta;
  }
  if (head === "quran-facts") {
    if (!parts[1]) return quranFactsMeta;
    // Each of the hundred has a page of its own now; the card's own title and
    // opening line are what a search result and a shared link should carry.
    const fact = factIndex.find(entry => entry.slug === parts[1]);
    if (!fact) return FALLBACK_NOT_FOUND;
    return {
      path,
      title: `${fact.title} · في رحاب القرآن`,
      description: fact.body,
      image: "/facts/share.jpg",
      i18n: { en: { title: `${fact.titleEn} · In the Realm of the Quran`, description: fact.bodyEn } },
    };
  }
  if (head === "about") return aboutMeta;
  if (head === "privacy") return privacyMeta;
  if (head === "terms") return termsMeta;
  if (head === "forgot-password") return forgotPasswordMeta;
  if (head === "reset-password") return resetPasswordMeta;

  // The seerah section is a separate chapter of the Prophet's life, not a Quran
  // story, so it does not live under /stories. Without this it fell through to
  // the not-found branch and every station and story carried a "page not found"
  // title while rendering its content perfectly.
  if (head === "aqeedah") {
    if (!parts[1]) {
      return {
        path,
        title: `العقيدة — ${aqeedahCardIndex.length} بطاقة · ${SITE_NAME}`,
        description: `${aqeedahCardIndex.length} بطاقة في ${aqeedahChapterIndex.length} أبواب: من نعرفه، وبم نؤمن، وكيف يظهر الإيمان في أفعالنا.`,
        image: DEFAULT_IMAGE,
        i18n: { en: { title: `Creed for children — ${aqeedahCardIndex.length} cards · ${SITE_NAME_EN}`, description: `${aqeedahCardIndex.length} cards in ${aqeedahChapterIndex.length} chapters: who we know, what we believe, and how belief shows in what we do.` } },
      };
    }
    const card = aqeedahCardIndex.find(entry => entry.slug === parts[1]);
    if (card) {
      return {
        path,
        title: `${card.title} · العقيدة`,
        description: card.value,
        image: card.image ?? DEFAULT_IMAGE,
        i18n: card.titleEn ? { en: { title: `${card.titleEn} · Creed`, description: card.valueEn ?? card.value } } : undefined,
      };
    }
    return FALLBACK_NOT_FOUND;
  }

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

  // "read" (the standalone reader, /read and /read/:surah) is retired — see
  // the 301 redirect in functions/_middleware.ts, which sends both to the
  // memorization journey before either ever reaches this function.

  if (head === "listen") {
    if (!parts[1]) {
      return {
        path,
        title: `الاستماع — المصحف المرتل كاملًا · ${SITE_NAME}`,
        description: "استمع إلى المصحف المرتل كاملًا بصوت الشيخ محمد صديق المنشاوي، سورة سورة، من المتصفح مباشرة.",
        image: DEFAULT_IMAGE,
        i18n: { en: { title: `Listening — the complete murattal mushaf · ${SITE_NAME_EN}`, description: "Listen to the complete murattal mushaf recited by Muhammad Siddiq al-Minshawi, surah by surah, straight from the browser." } },
      };
    }
    const n = Number(parts[1]);
    const name = surahsByNumber.get(n);
    return name
      ? {
          path,
          title: `استمع إلى سورة ${name} — المنشاوي المرتل · ${SITE_NAME}`,
          description: `استمع إلى سورة ${name} كاملة بصوت الشيخ محمد صديق المنشاوي، بتلاوة مرتلة هادئة تناسب البيت والسيارة.`,
          image: DEFAULT_IMAGE,
          i18n: { en: { title: `Listen to Surah ${englishSurahNames[n - 1] ?? name} — al-Minshawi murattal · ${SITE_NAME_EN}`, description: `Listen to the whole of Surah ${englishSurahNames[n - 1] ?? name} recited by Muhammad Siddiq al-Minshawi, a calm murattal reading for the home or the car.` } },
        }
      : FALLBACK_NOT_FOUND;
  }

  if (head === "stories") {
    // A shelf kept on the reader's own device. A crawler sees an empty page,
    // and no two visitors' are the same. Googlebot renders the app and reads
    // the tags PageMeta writes, so the middleware saying noindex is not enough
    // on its own — it has to be said here too.
    if (parts[1] === "library") {
      return {
        path,
        title: `مكتبتي · ${SITE_NAME}`,
        description: "القصص التي اخترت الاحتفاظ بها لقراءتها مرة أخرى.",
        image: DEFAULT_IMAGE,
        noindex: true,
        i18n: { en: { title: `My library · ${SITE_NAME_EN}`, description: "The stories you kept to read again." } },
      };
    }
    if (!parts[1]) {
      return {
        path,
        title: `قصص من القرآن للأطفال · ${SITE_NAME}`,
        description:
          `${storyIndex.length} قصة في ${chapterIndex.length} أبواب: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.`,
        image: DEFAULT_IMAGE,
        i18n: { en: { title: `Stories from the Quran for children · ${SITE_NAME_EN}`, description: `${storyIndex.length} stories in ${chapterIndex.length} chapters: the prophets, people and nations, animals the Quran names, and women in the Quran.` } },
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
        title: `${chapter.titleAr} — ${storyIndex.filter(story => story.chapter === chapter.slug).length} قصة · ${SITE_NAME}`,
        description: chapter.descriptionAr,
        image: chapter.cover ?? DEFAULT_IMAGE,
        i18n: chapter.titleEn ? { en: { title: `${chapter.titleEn} — ${storyIndex.filter(story => story.chapter === chapter.slug).length} stories · ${SITE_NAME_EN}`, description: chapter.descriptionEn ?? chapter.descriptionAr } } : undefined,
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
