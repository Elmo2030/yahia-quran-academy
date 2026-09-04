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
 * Sign-in, registration, the profile and the personal story shelf are noindex:
 * they are either private or different for every visitor. The privacy policy
 * and terms are not — a parent should be able to find how a children's site
 * treats their child's data. Auth pages have locale-aware titles so English
 * link previews show English text.
 */

import { chapters, stories, surahNames, seerahStations, seerahStories, aqeedahCards, aqeedahChapters } from "./page-data.js";

const SITE = "أكاديمية يحيى لتعليم القرآن للأطفال";
const SITE_DESCRIPTION =
  "قراءة القرآن بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن للأطفال في أربعة أبواب.";
const DEFAULT_IMAGE = "/og-yahya.jpg";
const ORIGIN = "https://yahyaquran.com";

// Descriptions arrive already shortened by scripts/build-seo.mjs, which is the
// only place that decides how long a description is. This used to shorten them
// a second time with a different rule, so the function and the app disagreed
// about the description of every story page.

// --- Auth + account + utility routes (feature/auth-foundation) -----------

const authMeta = {
  path: "/login",
  title: "تسجيل الدخول — Yahya Quran Academy",
  description:
    "سجّل دخولك للاحتفاظ بتقدّمك في قراءة القرآن وقصصه عبر الأجهزة.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const registerMeta = {
  path: "/register",
  title: "إنشاء حساب — Yahya Quran Academy",
  description:
    "أنشئ حسابًا جديدًا على Yahya Quran Academy ليُحفظ تقدّمك في الحفظ والقراءة.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

const profileMeta = {
  path: "/profile",
  title: "حسابي — Yahya Quran Academy",
  description: "إدارة حسابك وتقدّمك في Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

// A parent looking for how a children's site handles their child's data should
// be able to find these; they were hidden from search along with the sign-in
// pages, which is the opposite of the trust they exist to give.
const privacyMeta = {
  path: "/privacy",
  title: "سياسة الخصوصية — Yahya Quran Academy",
  description: "سياسة الخصوصية لمنصة Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
};

const termsMeta = {
  path: "/terms",
  title: "شروط الاستخدام — Yahya Quran Academy",
  description: "شروط استخدام Yahya Quran Academy.",
  image: DEFAULT_IMAGE,
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
  // Both render fine client-side, but the function did not know them, so the
  // server answered 404 — including for the link in the password-reset email,
  // which points straight at /reset-password.
  if (head === "forgot-password") {
    return { path: "/forgot-password", image: DEFAULT_IMAGE, noindex: true,
      title: "استعادة كلمة المرور — Yahya Quran Academy",
      description: "أدخل بريدك الإلكتروني لاستعادة كلمة مرور حسابك على Yahya Quran Academy." };
  }
  if (head === "reset-password") {
    return { path: "/reset-password", image: DEFAULT_IMAGE, noindex: true,
      title: "تعيين كلمة مرور جديدة — Yahya Quran Academy",
      description: "عيّن كلمة مرور جديدة لحسابك على Yahya Quran Academy." };
  }
  if (head === "privacy") return privacyMeta;
  if (head === "terms") return termsMeta;

  const base = { image: DEFAULT_IMAGE };

  if (head === "quran-facts") {
    return { ...base, image: "/facts/share.jpg", path: "/quran-facts",
      title: "في رحاب القرآن — اكتشف أسرار القرآن",
      description: "مئة معلومة عن القرآن الكريم للأطفال، كل واحدة خلف بطاقة تُقلب لتقرأها." };
  }

  if (head === "about") {
    return { ...base, path: "/about",
      title: "من نحن — موقع يحيى لتعليم الأطفال",
      description: "مشروع تعليمي للأطفال من 5 إلى 10 سنوات، أُنشئ صدقة جارية على روح د. محمد يحيى عباس عبود وم. ماجدة موسى محمد، رحمهما الله." };
  }

  // The seerah section sits outside /stories — it is the Prophet's life, not a
  // Quran story. Without this branch every seerah link previewed as "page not
  // found" while the page itself rendered correctly.
  if (head === "aqeedah") {
    if (!parts[1]) {
      return { ...base, path,
        title: `العقيدة — ${aqeedahCards.length} بطاقة · ${SITE}`,
        description: `${aqeedahCards.length} بطاقة في ${aqeedahChapters.length} أبواب: من نعرفه، وبم نؤمن، وكيف يظهر الإيمان في أفعالنا.` };
    }
    const card = aqeedahCards.find((c: any) => c.slug === parts[1]);
    return card
      ? { ...base, path, image: card.image ?? DEFAULT_IMAGE, title: `${card.title} · العقيدة`, description: card.value }
      : notFound(path);
  }

  if (head === "seerah") {
    if (!parts[1]) {
      return { ...base, path,
        title: `السيرة النبوية — ${seerahStations.length} محطات · ${SITE}`,
        description: seerahStations.map((s: any) => s.titleAr).join(" · ") };
    }
    const story = seerahStories.find((entry: any) => entry.slug === parts[1]);
    if (story) {
      return { ...base, path, image: story.image ?? DEFAULT_IMAGE,
        title: `${story.title} · السيرة النبوية`,
        description: story.narrative };
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
      : notFound(path);
  }

  if (head === "stories") {
    if (parts[1] === "library") {
      // A personal shelf kept on the reader's own device: a crawler sees an
      // empty page, and every visitor's is different.
      return { ...base, path, noindex: true, title: `مكتبتي · ${SITE}`,
        description: "القصص التي اخترت الاحتفاظ بها لقراءتها مرة أخرى." };
    }
    if (parts[1] && parts[2]) {
      const story = stories.find((s: any) => s.chapter === parts[1] && s.slug === parts[2]);
      if (story) {
        return { path, image: story.image ?? DEFAULT_IMAGE,
          title: `${story.title} · قصص من القرآن`, description: story.hook };
      }
    }
    if (parts[1]) {
      const chapter = chapters.find((c: any) => c.slug === parts[1] && c.available);
      if (chapter) {
        const count = stories.filter((s: any) => s.chapter === chapter.slug).length;
        return { path, image: chapter.cover ?? DEFAULT_IMAGE,
          title: `${chapter.titleAr} — ${count} قصة · ${SITE}`, description: chapter.descriptionAr };
      }
    }
    // A chapter or story slug that matched nothing is not the stories index.
    if (parts[1]) return notFound(path);
    return { ...base, path, title: `قصص من القرآن للأطفال · ${SITE}`,
      description: `${stories.length} قصة في ${chapters.length} أبواب: الأنبياء، وشخصيات وأمم، وحيوانات ذكرها القرآن، ونساء في القرآن.` };
  }

  if (path === "/") return { ...base, path: "/", title: SITE, description: SITE_DESCRIPTION };
  return notFound(path);
}

// Marked noindex so crawlers drop it, and flagged so the response can carry a
// real 404 status instead of a 200 with "page not found" written on it.
function notFound(path: string) {
  return {
    path,
    image: DEFAULT_IMAGE,
    title: `الصفحة غير موجودة · ${SITE}`,
    description: SITE_DESCRIPTION,
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

  const meta = metaForPath(pathname);
  const canonical = `${ORIGIN}${meta.path}`;
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
    : `<link data-default rel="alternate" hreflang="ar" href="${canonical}" />
    <link data-default rel="alternate" hreflang="en" href="${canonical}?lang=en" />
    <link data-default rel="alternate" hreflang="x-default" href="${canonical}" />`;

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

  // A surah page is a page about a chapter of a specific book. Saying so lets
  // an engine answer "where can I read Surah Al-Kahf" with this page instead of
  // guessing from the title.
  const surah = /^\/read\/(\d{1,3})$/.exec(meta.path);
  if (surah) {
    graph.push({
      "@type": "WebPage",
      "@id": `${canonical}#page`,
      name: meta.title.split(/[·—]/)[0].trim(),
      inLanguage: ["ar", "en"],
      isAccessibleForFree: true,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: {
        "@type": "Book",
        name: "القرآن الكريم",
        alternateName: "The Holy Quran",
        inLanguage: "ar",
        hasPart: {
          "@type": "Chapter",
          name: meta.title.split(/[·—]/)[0].trim(),
          position: Number(surah[1]),
        },
      },
      audience: { "@type": "Audience", audienceType: "children" },
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
    <meta data-default property="og:locale:alternate" content="en_US" />
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

  const patched = html.slice(0, start) + block + html.slice(end + "<!--meta:end-->".length);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  // A path that matches no route still gets the app shell — React renders the
  // NotFound page from it — but it must not be advertised as 200, or crawlers
  // index an unbounded set of URLs that all say "page not found".
  const status = meta.missing ? 404 : response.status;
  return new Response(patched, { status, statusText: response.statusText, headers });
};
