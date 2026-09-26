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
 * Both languages are served off one URL, English at ?lang=en. This used to
 * answer that address with the Arabic title, the Arabic description and a
 * canonical pointing at the Arabic URL — while the page itself declared an
 * English alternate at exactly that address. A search engine following the
 * hreflang got a page that canonicalised away to the Arabic one, so it folded
 * the two together and only ever showed the Arabic snippet; an English link
 * shared on WhatsApp previewed in Arabic. ?lang=en now gets its own title,
 * description, og:locale, html lang/dir and its own canonical.
 *
 * Sign-in, registration, the profile and the personal story shelf are noindex:
 * they are either private or different for every visitor. The privacy policy
 * and terms are not — a parent should be able to find how a children's site
 * treats their child's data. Auth pages have locale-aware titles so English
 * link previews show English text.
 */

import { chapters, stories, surahNames, englishSurahNames, seerahStations, seerahStories, aqeedahCards, aqeedahChapters, quranFacts, companionIndex, namesOfAllahIndex } from "./page-data.js";

const SITE = "أكاديمية يحيى لتعليم القرآن للأطفال";
const SITE_EN = "Yahya Quran Academy";
const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
const SITE_DESCRIPTION_EN =
  "The Quran in the Uthmani text with verified teaching recitations, and illustrated stories from the Quran for children, in four chapters.";
const DEFAULT_IMAGE = "/og-yahya-hero.jpg";
const ORIGIN = "https://yahyaquran.com";

// Descriptions arrive already shortened by scripts/build-seo.mjs, which is the
// only place that decides how long a description is. This used to shorten them
// a second time with a different rule, so the function and the app disagreed
// about the description of every story page.

// --- Auth + account + utility routes (feature/auth-foundation) -----------

const authMeta = {
  path: "/login",
  title: "تسجيل الدخول · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "سجّل دخولك للاحتفاظ بتقدّمك في قراءة القرآن وقصصه عبر الأجهزة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  en: { title: "Sign in · Yahya Quran Academy",
        description: "Sign in to keep your Quran reading and stories progress in sync across devices." },
};

const registerMeta = {
  path: "/register",
  title: "إنشاء حساب · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "أنشئ حسابًا جديدًا على أكاديمية يحيى ليُحفظ تقدّمك في الحفظ والقراءة.",
  image: DEFAULT_IMAGE,
  noindex: true,
  en: { title: "Create account · Yahya Quran Academy",
        description: "Create a Yahya Quran Academy account so your reading and memorization progress syncs everywhere." },
};

const profileMeta = {
  path: "/profile",
  title: "حسابي · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "إدارة حسابك وتقدّمك في أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  noindex: true,
  en: { title: "My account · Yahya Quran Academy",
        description: "Manage your account and progress on Yahya Quran Academy." },
};

// مصحفي (Mushafi): a page-image mushaf, unrelated to the retired /read text
// reader. The hub is worth finding; the 604 page routes are identical in
// structure (one image, no unique text) so they stay noindex like a hifz
// child's own screen, but for duplication rather than privacy.
const MUSHAFI_PAGE_COUNT = 604;
const mushafiMeta = {
  path: "/mushafi",
  title: "مصحفي — المصحف الشريف برواية حفص · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "تصفّح صفحات المصحف الشريف الملوّنة بأحكام التجويد، برواية حفص عن عاصم، بالرسم العثماني، صفحة كما هي دون أي تعديل في النص.",
  image: DEFAULT_IMAGE,
  en: { title: "Mushafi — the Holy Mushaf in Hafs narration · Yahya Quran Academy",
        description: "Browse the mushaf's Tajweed-colored pages, in the narration of Hafs from Aasim, in the Uthmani script — every page exactly as printed." },
};

const mushafiPageMeta = {
  ...mushafiMeta,
  title: "مصحفي · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "صفحة من المصحف الشريف برواية حفص عن عاصم.",
  noindex: true,
  en: { title: "Mushafi · Yahya Quran Academy",
        description: "A page of the mushaf, in the narration of Hafs from Aasim." },
};

// The journey page is worth finding; the screens under it belong to one child.
const hifzMeta = {
  path: "/hifz",
  title: "رحلة حفظ جزء عمّ للأطفال · أكاديمية يحيى لتعليم القرآن للأطفال",
  description:
    "خريطة لحفظ جزء عمّ: الطفل يسمع الآية ويكرّرها ويسجّل صوته، وتعود عليه للمراجعة بعد يوم وثلاثة وسبعة. وليّ الأمر هو من يقدّر التلاوة، ولا يُحفظ شيء إلا على جهازك.",
  image: DEFAULT_IMAGE,
  en: { title: "A Juz Amma memorization journey for children · Yahya Quran Academy",
        description: "A map for memorizing Juz Amma: the child listens, repeats and records, and each ayah returns for review after a day, three days, a week. The parent is the one who judges the recitation, and nothing leaves the device." },
};

const hifzInnerMeta = {
  ...hifzMeta,
  title: "رحلة الحفظ · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "رحلة حفظ جزء عمّ للأطفال مع يحيى وفاطمة، وكل البيانات تبقى على جهازك.",
  noindex: true,
  en: { title: "Memorization journey · Yahya Quran Academy",
        description: "A Juz Amma memorization journey for children with Yahya and Fatima; all data stays on your device." },
};

// A parent looking for how a children's site handles their child's data should
// be able to find these; they were hidden from search along with the sign-in
// pages, which is the opposite of the trust they exist to give.
const privacyMeta = {
  path: "/privacy",
  title: "سياسة الخصوصية · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "سياسة الخصوصية لمنصة أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  en: { title: "Privacy policy · Yahya Quran Academy",
        description: "Privacy policy for Yahya Quran Academy." },
};

const termsMeta = {
  path: "/terms",
  title: "شروط الاستخدام · أكاديمية يحيى لتعليم القرآن للأطفال",
  description: "شروط استخدام أكاديمية يحيى.",
  image: DEFAULT_IMAGE,
  en: { title: "Terms of use · Yahya Quran Academy",
        description: "Terms of use for Yahya Quran Academy." },
};

/**
 * Mirrors client/src/lib/page-meta.ts. The header above claimed the two were
 * kept in sync by a generator and by tests; the generator only ever wrote the
 * content data both of them read, and no test compared the two copies. It is
 * exported so one can — see client/src/lib/page-meta.test.ts. Cloudflare Pages
 * reads `onRequest` and ignores anything else this module exports.
 */
export function metaForPath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const parts = path.split("/").filter(Boolean);
  const head = parts[0];
  if (head === "companions") {
    const story = companionIndex.find((c: any) => c.slug === parts[1]);
    if (parts.length > 2 || (parts[1] && !story)) return notFound(path);
    return { path, arabicOnly: true, title: story ? `${story.name} — ${story.title} · الصحابة` : "الصحابة — قصص نتعلم منها · أكاديمية يحيى لتعليم القرآن للأطفال", description: story?.description ?? "قصص الصحابة والصحابيات: مواقف وقيم وأسئلة للفهم ومراجع للوالدين.", image: DEFAULT_IMAGE };
  }

  if (head === "names-of-allah") {
    const name = namesOfAllahIndex.find((n: any) => n.slug === parts[1]);
    if (parts.length > 2 || (parts[1] && !name)) return notFound(path);
    return { path, arabicOnly: true, title: name ? `${name.arabic} — ${name.transliteration} · أسماء الله الحسنى` : "أسماء الله الحسنى · أكاديمية يحيى لتعليم القرآن للأطفال", description: name?.meaning ?? "أسماء الله الحسنى التسعة والتسعون: المعنى، وقصص وأسئلة وأنشطة للأطفال.", image: DEFAULT_IMAGE };
  }

  if (head === "login") return authMeta;
  if (head === "register") return registerMeta;
  if (head === "profile") return profileMeta;
  if (head === "hifz") return parts[1] ? hifzInnerMeta : hifzMeta;
  if (head === "mushafi") {
    if (!parts[1]) return mushafiMeta;
    const page = Number(parts[1]);
    if (parts.length > 2 || !Number.isInteger(page) || page < 1 || page > MUSHAFI_PAGE_COUNT) return notFound(path);
    return mushafiPageMeta;
  }
  // Both render fine client-side, but the function did not know them, so the
  // server answered 404 — including for the link in the password-reset email,
  // which points straight at /reset-password.
  if (head === "forgot-password") {
    return { path: "/forgot-password", image: DEFAULT_IMAGE, noindex: true,
      title: "استعادة كلمة المرور · أكاديمية يحيى لتعليم القرآن للأطفال",
      description: "أدخل بريدك الإلكتروني لاستعادة كلمة مرور حسابك على أكاديمية يحيى.",
      en: { title: "Reset password · Yahya Quran Academy",
            description: "Enter your email to reset your Yahya Quran Academy password." } };
  }
  if (head === "reset-password") {
    return { path: "/reset-password", image: DEFAULT_IMAGE, noindex: true,
      title: "تعيين كلمة مرور جديدة · أكاديمية يحيى لتعليم القرآن للأطفال",
      description: "عيّن كلمة مرور جديدة لحسابك على أكاديمية يحيى.",
      en: { title: "Set a new password · Yahya Quran Academy",
            description: "Set a new password for your Yahya Quran Academy account." } };
  }
  if (head === "privacy") return privacyMeta;
  if (head === "terms") return termsMeta;

  const base = { image: DEFAULT_IMAGE };

  if (head === "quran-facts") {
    if (!parts[1]) {
      return { ...base, image: "/facts/share.jpg", path: "/quran-facts",
        title: "في رحاب القرآن — اكتشف أسرار القرآن",
        description: "مئة معلومة عن القرآن الكريم للأطفال، كل واحدة خلف بطاقة تُقلب لتقرأها.",
        en: { title: "In the Realm of the Quran — Discover the Quran",
              description: "A hundred things worth knowing about the Quran for children, each behind a card you turn over." } };
    }
    const fact = quranFacts.find(entry => entry.slug === parts[1]);
    return fact
      ? { ...base, image: "/facts/share.jpg", path,
          title: `${fact.title} · في رحاب القرآن`,
          description: fact.body,
          en: fact.titleEn ? { title: `${fact.titleEn} · In the Realm of the Quran`, description: fact.bodyEn } : undefined }
      : notFound(path);
  }

  if (head === "about") {
    return { ...base, path: "/about",
      title: "من نحن · أكاديمية يحيى لتعليم القرآن للأطفال",
      description: "مشروع تعليمي للأطفال من 5 إلى 10 سنوات، أُنشئ صدقة جارية على روح د. محمد يحيى عباس عبود وم. ماجدة موسى محمد، رحمهما الله.",
      en: { title: "About us · Yahya Quran Academy",
            description: "A children's Quran learning project, created as an ongoing charity in memory of Dr. Mohamed Yahya Abbas Aboud and Eng. Magda Moussa Mohamed." } };
  }

  if (head === "journey") {
    return { ...base, path: "/journey", noindex: true,
      title: "رحلتي · أكاديمية يحيى لتعليم القرآن للأطفال",
      description: "خطوة الطفل التالية بين رحلة الحفظ، وقصص القرآن، وفي رحاب القرآن.",
      en: { title: "My journey · Yahya Quran Academy",
            description: "A child's next step across memorization, Quran stories, and Quran discoveries." } };
  }

  // The seerah section sits outside /stories — it is the Prophet's life, not a
  // Quran story. Without this branch every seerah link previewed as "page not
  // found" while the page itself rendered correctly.
  if (head === "aqeedah") {
    if (!parts[1]) {
      return { ...base, path,
        title: `العقيدة — ${aqeedahCards.length} بطاقة · ${SITE}`,
        description: `${aqeedahCards.length} بطاقة في ${aqeedahChapters.length} أبواب: من نعرفه، وبم نؤمن، وكيف يظهر الإيمان في أفعالنا.`,
        en: { title: `Creed for children — ${aqeedahCards.length} cards · ${SITE_EN}`,
              description: `${aqeedahCards.length} cards in ${aqeedahChapters.length} chapters: who we know, what we believe, and how belief shows in what we do.` } };
    }
    const card = aqeedahCards.find((c: any) => c.slug === parts[1]);
    return card
      ? { ...base, path, image: card.image ?? DEFAULT_IMAGE, title: `${card.title} · العقيدة`, description: card.value,
          en: card.titleEn ? { title: `${card.titleEn} · Creed`, description: card.valueEn ?? card.value } : undefined }
      : notFound(path);
  }

  if (head === "seerah") {
    if (!parts[1]) {
      return { ...base, path,
        title: `السيرة النبوية — ${seerahStations.length} محطات · ${SITE}`,
        description: seerahStations.map((s: any) => s.titleAr).join(" · "),
        en: { title: `The Prophet's Seerah — ${seerahStations.length} stations · ${SITE_EN}`,
              description: seerahStations.map((s: any) => s.titleEn ?? s.titleAr).join(" · ") } };
    }
    const story = seerahStories.find((entry: any) => entry.slug === parts[1]);
    if (story) {
      return { ...base, path, image: story.image ?? DEFAULT_IMAGE,
        title: `${story.title} · السيرة النبوية`,
        description: story.narrative,
        en: story.titleEn ? { title: `${story.titleEn} · The Prophet's Seerah`, description: story.narrativeEn ?? story.narrative } : undefined };
    }
  }

  // "read" (the standalone reader) is retired — see the 301 redirect in
  // onRequest below, which sends /read and /read/:surah to the hifz journey
  // before this function is ever asked for their meta.

  if (head === "listen") {
    if (!parts[1]) return {
      ...base,
      path,
      title: `الاستماع — المصحف المرتل كاملًا · ${SITE}`,
      description: "استمع إلى المصحف المرتل كاملًا بصوت الشيخ محمد صديق المنشاوي، سورة سورة، من المتصفح مباشرة.",
      en: { title: `Listening — the complete murattal mushaf · ${SITE_EN}`,
            description: "Listen to the complete murattal mushaf recited by Muhammad Siddiq al-Minshawi, surah by surah, straight from the browser." },
    };
    const surah = Number(parts[1]);
    const name = Number.isInteger(surah) && surah >= 1 && surah <= 114 ? surahNames[surah - 1] : null;
    return name
      ? { ...base, path, title: `استمع إلى سورة ${name} — المنشاوي المرتل · ${SITE}`,
          description: `استمع إلى سورة ${name} كاملة بصوت الشيخ محمد صديق المنشاوي، بتلاوة مرتلة هادئة تناسب البيت والسيارة.`,
          en: { title: `Listen to Surah ${englishSurahNames[surah - 1] ?? name} — al-Minshawi murattal · ${SITE_EN}`,
                description: `Listen to the whole of Surah ${englishSurahNames[surah - 1] ?? name} recited by Muhammad Siddiq al-Minshawi, a calm murattal reading for the home or the car.` } }
      : notFound(path);
  }

  if (head === "stories") {
    if (parts[1] === "library") {
      // A personal shelf kept on the reader's own device: a crawler sees an
      // empty page, and every visitor's is different.
      return { ...base, path, noindex: true, title: `مكتبتي · ${SITE}`,
        description: "القصص التي اخترت الاحتفاظ بها لقراءتها مرة أخرى.",
        en: { title: `My library · ${SITE_EN}`, description: "The stories you kept to read again." } };
    }
    if (parts[1] && parts[2]) {
      const story = stories.find((s: any) => s.chapter === parts[1] && s.slug === parts[2]);
      if (story) {
        return { path, image: story.image ?? DEFAULT_IMAGE,
          title: `${story.title} · قصص من القرآن`, description: story.hook,
          en: story.titleEn ? { title: `${story.titleEn} · Stories from the Quran`, description: story.hookEn ?? story.hook } : undefined };
      }
    }
    if (parts[1]) {
      const chapter = chapters.find((c: any) => c.slug === parts[1] && c.available);
      if (chapter) {
        const count = stories.filter((s: any) => s.chapter === chapter.slug).length;
        return { path, image: chapter.cover ?? DEFAULT_IMAGE,
          title: `${chapter.titleAr} — ${count} قصة · ${SITE}`, description: chapter.descriptionAr,
          en: chapter.titleEn ? { title: `${chapter.titleEn} — ${count} stories · ${SITE_EN}`, description: chapter.descriptionEn ?? chapter.descriptionAr } : undefined };
      }
    }
    // A chapter or story slug that matched nothing is not the stories index.
    if (parts[1]) return notFound(path);
    return { ...base, path, title: `قصص من القرآن للأطفال · ${SITE}`,
      description: `${stories.length} قصة في ${chapters.length} أبواب: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.`,
      en: { title: `Stories from the Quran for children · ${SITE_EN}`,
            description: `${stories.length} stories in ${chapters.length} chapters: the prophets, people and nations, animals the Quran names, and women in the Quran.` } };
  }

  if (path === "/") return { ...base, path: "/", title: SITE, description: SITE_DESCRIPTION,
    en: { title: SITE_EN, description: SITE_DESCRIPTION_EN } };
  return notFound(path);
}

/** The metadata in the locale asked for, falling back to Arabic wherever no
 *  English variant was written — which is what the pages themselves do. Mirrors
 *  localizedMeta() in client/src/lib/page-meta.ts. */
export function localized(meta: any, locale: "ar" | "en") {
  const variant = locale === "en" ? meta.en : undefined;
  return variant ? { ...meta, title: variant.title, description: variant.description } : meta;
}

// Marked noindex so crawlers drop it, and flagged so the response can carry a
// real 404 status instead of a 200 with "page not found" written on it.
function notFound(path: string) {
  return {
    path,
    image: DEFAULT_IMAGE,
    title: `الصفحة غير موجودة · ${SITE}`,
    description: SITE_DESCRIPTION,
    en: { title: "Page not found · Yahya Quran Academy", description: SITE_DESCRIPTION_EN },
    noindex: true,
    missing: true,
  };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Returns the directive, not a whole tag: the tag is built once below. The
// earlier version returned `<meta ...>` here, which was then escaped and
// placed inside another meta's content="", producing
// content="&lt;meta name=&quot;robots&quot;..." — not a directive any crawler
// understands, so every noindex page was indexable.
const robotsFor = (meta: ReturnType<typeof metaForPath>) =>
  meta.noindex ? "noindex,nofollow" : "";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // The project keeps its pages.dev alias after the custom domain is attached,
  // leaving two origins serving identical pages. Send the production alias to
  // the canonical host. Per-deployment preview hosts (<hash>.pages.dev) carry
  // their own hostname and are left alone, so a build can still be checked
  // before it goes out.
  // www is attached to the same project and serves the same pages, so it joins
  // the alias in redirecting to the bare domain the canonical tags name.
  // The Seerah was briefly listed as a chapter of the Quran stories; keep the
  // address it had working rather than leaving it to 404.
  //
  // Pages, not files: the artwork lives under /stories/seerah/ too, and this
  // rule swallowed every WebP variant of it — 301 to /seerah/<name>.webp,
  // which is nothing, so the pictures simply vanished. _routes.json keeps the
  // assets away from this function in the first place; the extension check is
  // the second lock, so the next file type added there does not repeat it.
  if (pathname === "/stories/seerah" ||
      (pathname.startsWith("/stories/seerah/") && !/\.[a-z0-9]+$/i.test(pathname))) {
    return Response.redirect(`${ORIGIN}/seerah${pathname.slice("/stories/seerah".length)}`, 301);
  }

  // The standalone reader is retired — memorizing now only happens inside the
  // hifz journey. /read/:surah was indexed and linked from outside the site
  // for years, so a visitor arriving at the old address is sent to the
  // equivalent hifz page (which itself explains a surah outside Juz Amma)
  // rather than left at a 404.
  if (pathname === "/read" || pathname === "/read/") {
    return Response.redirect(`${ORIGIN}/hifz`, 301);
  }
  if (pathname.startsWith("/read/") && !/\.[a-z0-9]+$/i.test(pathname)) {
    return Response.redirect(`${ORIGIN}/hifz${pathname.slice("/read".length)}`, 301);
  }

  if (url.hostname === "yahia-quran-academy.pages.dev" || url.hostname === "www.yahyaquran.com") {
    return Response.redirect(new URL(url.pathname + url.search, ORIGIN).toString(), 301);
  }

  let response = await context.next();

  // SPA fallback: أي مسار بيرجع 404 ومش ملف ثابت (مفيهوش نقطة = مفيش امتداد)
  // نجيب له قشرة فاضية — وReact Router بيتولى عرض الصفحة الصحيحة.
  //
  // Not index.html: scripts/prerender.mjs writes the home page's own text into
  // it, so serving it here would answer /login — and every address that does
  // not exist — with the home page's words. app-shell.html is that same
  // document with an empty #root.
  const looksLikeFile = /\.[a-zA-Z0-9]+$/.test(pathname);
  if (response.status === 404 && !looksLikeFile) {
    response = await context.env.ASSETS.fetch(new URL("/app-shell.html", url));
  }

  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;

  // An explicit ?lang=en in the address is the reader's own choice, unlike the
  // Accept-Language a link-preview bot sends, which is why this is read from
  // the URL and nothing else.
  const locale = url.searchParams.get("lang") === "en" && !pathname.startsWith("/companions") && !pathname.startsWith("/names-of-allah") ? "en" : "ar";
  const meta = localized(metaForPath(pathname), locale);
  const arabicUrl = `${ORIGIN}${meta.path}`;
  // The English page is its own page as far as search is concerned. Pointing
  // its canonical at the Arabic URL is what made the hreflang self-defeating.
  const canonical = locale === "en" ? `${arabicUrl}?lang=en` : arabicUrl;
  const image = meta.image.startsWith("http") ? meta.image : `${ORIGIN}${meta.image}`;
  const isHome = meta.path === "/";

  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const robots = escapeHtml(robotsFor(meta));

  // hreflang lived in index.html, so every page claimed the home page as its
  // own Arabic and English alternate — a page telling search engines the
  // wrong URL is worse than saying nothing. It is per-page now.
  const alternates = meta.noindex
    ? ""
    : `<link data-default rel="alternate" hreflang="ar" href="${arabicUrl}" />
    ${meta.arabicOnly ? "" : `<link data-default rel="alternate" hreflang="en" href="${arabicUrl}?lang=en" />`}
    <link data-default rel="alternate" hreflang="x-default" href="${arabicUrl}" />`;

  // Structured data. Search engines and the answer engines that read pages
  // for AI summaries both parse this; without it they have to infer what the
  // page is from the prose.
  const crumbs = meta.path
    .split("/")
    .filter(Boolean)
    .map((segment, index, all) => ({
      "@type": "ListItem",
      position: index + 2,
      name: index === all.length - 1 ? meta.title.split(/[·—]/)[0].trim() : segment,
      item: `${ORIGIN}/${all.slice(0, index + 1).join("/")}`,
    }));

  const graph: unknown[] = [
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: ORIGIN,
      name: SITE,
      description: SITE_DESCRIPTION,
      inLanguage: ["ar", "en"],
      publisher: { "@id": `${ORIGIN}/#org` },
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${ORIGIN}/#org`,
      name: SITE,
      alternateName: "Yahya Quran Academy",
      url: ORIGIN,
      logo: `${ORIGIN}/apple-touch-icon.png`,
      description: SITE_DESCRIPTION,
    },
  ];

  if (!isHome && !meta.noindex) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE, item: `${ORIGIN}/` },
        ...crumbs,
      ],
    });
  }

  if (meta.path === "/quran-facts") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${canonical}#collection`,
      name: meta.title.split(/[·—]/)[0].trim(),
      description: meta.description,
      inLanguage: ["ar", "en"],
      isAccessibleForFree: true,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: { "@type": "Book", name: "القرآن الكريم", alternateName: "The Holy Quran" },
      audience: { "@type": "Audience", audienceType: "children" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: 100,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
      },
    });
  }

  const isStory = /^\/(stories\/[^/]+\/[^/]+|seerah\/[^/]+)$/.test(meta.path);
  if (isStory) {
    graph.push({
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: meta.title.split(/[·—]/)[0].trim(),
      description: meta.description,
      image,
      // Every story is on the page in both languages, at this one URL.
      inLanguage: ["ar", "en"],
      isAccessibleForFree: true,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      publisher: { "@id": `${ORIGIN}/#org` },
      mainEntityOfPage: canonical,
      audience: { "@type": "Audience", audienceType: "children" },
    });
  }

  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
    .replace(/</g, "\\u003c");

  const block = `<!--meta:start-->
    <title data-default>${title}</title>
    <meta data-default name="description" content="${description}" />
    <link data-default rel="canonical" href="${canonical}" />
    ${robots ? `<meta data-default name="robots" content="${robots}" />` : ""}
    ${alternates}
    <meta data-default property="og:type" content="${isHome ? "website" : "article"}" />
    <meta data-default property="og:site_name" content="${locale === "en" ? SITE_EN : SITE}" />
    <meta data-default property="og:locale" content="${locale === "en" ? "en_US" : "ar_AR"}" />
    <meta data-default property="og:title" content="${title}" />
    <meta data-default property="og:description" content="${description}" />
    <meta data-default property="og:image" content="${image}" />
    <meta data-default property="og:url" content="${canonical}" />
    <meta data-default name="twitter:card" content="summary_large_image" />
    <meta data-default name="twitter:title" content="${title}" />
    <meta data-default name="twitter:description" content="${description}" />
    <meta data-default name="twitter:image" content="${image}" />
    ${meta.arabicOnly ? "" : `<meta data-default property="og:locale:alternate" content="${locale === "en" ? "ar_AR" : "en_US"}" />`}
    <script data-default type="application/ld+json">${jsonLd}</script>
    <!--meta:end-->`;

  let html = await response.text();

  // Cloudflare Pages answers an unknown path with index.html at status 200, so
  // the 404 fallback above never fires for it — and index.html now carries the
  // home page's prerendered words. A page that is not its own prerendered page
  // must not read as the home page, so the block comes back out for anything
  // private or missing.
  if (meta.noindex || meta.missing) {
    const from = html.indexOf("<!--prerendered:start-->");
    const to = html.indexOf("<!--prerendered:end-->");
    if (from !== -1 && to !== -1) {
      html = html.slice(0, from) + html.slice(to + "<!--prerendered:end-->".length);
    }
  }

  const start = html.indexOf("<!--meta:start-->");
  const end = html.indexOf("<!--meta:end-->");
  if (start === -1 || end === -1) return new Response(html, response);

  let patched = html.slice(0, start) + block + html.slice(end + "<!--meta:end-->".length);

  // The shell is authored Arabic. LocaleProvider corrects the root element once
  // React runs, which is too late for a crawler, a link-preview bot, or the
  // first paint an English reader sees — English prose was being laid out
  // right-to-left until the bundle arrived.
  if (locale === "en") {
    patched = patched.replace(/<html\b[^>]*>/i, tag =>
      tag.replace(/\blang="[^"]*"/i, 'lang="en"').replace(/\bdir="[^"]*"/i, 'dir="ltr"'));
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  // A path that matches no route still gets the app shell — React renders the
  // NotFound page from it — but it must not be advertised as 200, or crawlers
  // index an unbounded set of URLs that all say "page not found".
  const status = meta.missing ? 404 : response.status;
  return new Response(patched, { status, statusText: response.statusText, headers });
};
