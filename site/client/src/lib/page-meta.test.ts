/**
 * page-meta tests.
 *
 * The regression these exist for: the surah/chapter/story lookups were empty
 * maps filled by exported register* helpers that nothing ever called, so every
 * reader page, chapter page and story page resolved to "الصفحة غير موجودة"
 * once React replaced the title the Cloudflare function had rendered. Nothing
 * failed, nothing logged — the tab title was just wrong on ~160 pages.
 */
import { describe, expect, it } from "vitest";

import { localizedMeta, metaForPath } from "@/lib/page-meta";
import { chapters, stories } from "@/content/stories";
import { seerahStories } from "@/content/seerah";
import { seerahStoryIndex } from "@/lib/page-index.generated";

const notFound = "الصفحة غير موجودة";

describe("metaForPath", () => {
  it("names every chapter", () => {
    for (const chapter of chapters) {
      const meta = metaForPath(`/stories/${chapter.slug}`);
      expect(meta.title, chapter.slug).toContain(chapter.titleAr);
    }
  });

  it("names every story, in both libraries", () => {
    for (const story of stories) {
      const meta = metaForPath(`/stories/${story.chapter}/${story.slug}`);
      expect(meta.title, story.slug).toContain(story.title);
    }
    for (const story of seerahStories) {
      const meta = metaForPath(`/seerah/${story.slug}`);
      expect(meta.title, story.slug).toContain(seerahStoryIndex.find(item => item.slug === story.slug)!.title);
    }
  });

  it("falls back to not-found for paths that match nothing", () => {
    for (const path of ["/nope", "/stories/nope", "/stories/nope/nope", "/seerah/nope", "/read", "/read/1"]) {
      const meta = metaForPath(path);
      expect(meta.title, path).toContain(notFound);
      expect(meta.noindex, path).toBe(true);
    }
  });

  it("keeps auth and account routes out of the index", () => {
    for (const path of ["/login", "/register", "/profile"]) {
      expect(metaForPath(path).noindex, path).toBe(true);
    }
  });

  it("reads in English when the reader is in English", () => {
    const arabic = /[؀-ۿ]/;
    const routes = [
      "/", "/stories", "/stories/prophets", "/stories/prophets/adam",
      "/seerah", "/seerah/birth-of-light",
      "/login", "/register", "/nope",
    ];
    for (const path of routes) {
      const meta = localizedMeta(metaForPath(path), "en");
      expect(arabic.test(meta.title), `${path} — title: ${meta.title}`).toBe(false);
      expect(arabic.test(meta.description), `${path} — description`).toBe(false);
    }
  });

  it("brands every title one way, in the reader's own language", () => {
    // Arabic titles once ended "— Yahya Quran Academy" on some pages and
    // "· أكاديمية يحيى…" on others; one separator, one name per language.
    const paths = [
      "/", "/stories", "/seerah", "/aqeedah", "/companions", "/companions/abu-bakr",
      "/quran-facts", "/listen", "/listen/1", "/mushafi", "/mushafi/5", "/hifz", "/hifz/1",
      "/journey", "/about", "/privacy", "/terms", "/login", "/register", "/profile", "/nope",
    ];
    for (const path of paths) {
      const ar = metaForPath(path);
      expect(ar.title, `${path}: ${ar.title}`).not.toMatch(/Yahya Quran Academy/);
      expect(`${ar.title} ${ar.description}`, path).not.toMatch(/[—|] ?Yahya|Yahya Quran Academy/);
      if (ar.arabicOnly) continue;
      const en = localizedMeta(ar, "en");
      expect(en.title, `${path}: ${en.title}`).not.toMatch(/ [—|] Yahya Quran Academy$/);
    }
    expect(metaForPath("/companions").title).toMatch(/ · أكاديمية يحيى لتعليم القرآن للأطفال$/);
    expect(metaForPath("/companions/abu-bakr").title).toMatch(/ · الصحابة$/);
  });

  it("stays Arabic by default", () => {
    expect(metaForPath("/listen/1").title).toContain("سورة");
    expect(localizedMeta(metaForPath("/listen/1"), "ar").title).toContain("سورة");
  });

  it("indexes the public pages", () => {
    for (const path of ["/", "/stories", "/seerah"]) {
      expect(metaForPath(path).noindex, path).toBeFalsy();
    }
  });
});

// A number that names no surah is a wrong address — /listen/:surah takes the
// same validation /read/:surah once did, so the regression this guards
// against (a bad number silently opening Al-Fatiha) applies here too.
describe("addresses that name no surah", () => {
  it.each(["/listen/0", "/listen/115", "/listen/200", "/listen/abc", "/listen/-1"])(
    "keeps %s out of the index",
    (path) => {
      expect(metaForPath(path).noindex).toBe(true);
    },
  );

  it("still names every real surah", () => {
    for (const surah of [1, 18, 114]) {
      expect(metaForPath(`/listen/${surah}`).noindex).toBeFalsy();
    }
  });
});

// The journey page is the one a parent would search for; the screens under it
// hold one child's own record, and a crawler would only ever see an empty copy
// of someone else's. The whole family carried "noindex" while the map was
// still unbuilt, and it was easy to leave it that way after the map shipped.
describe("the memorization journey", () => {
  it("lets the journey itself be found", () => {
    expect(metaForPath("/hifz").noindex).toBeFalsy();
    expect(metaForPath("/hifz").title).toContain("جزء عمّ");
  });

  it("keeps one child's own screens out of the index", () => {
    for (const path of ["/hifz/review", "/hifz/parent", "/hifz/certificate", "/hifz/looks", "/hifz/114"]) {
      expect(metaForPath(path).noindex, path).toBe(true);
    }
  });
});

/**
 * English coverage, route by route.
 *
 * The comparison of the two copies lives in functions/__tests__/
 * metadata-mirror.test.ts, which bundles the real middleware and drives
 * onRequest over every kind of route in both languages — a stronger check than
 * calling metaForPath here, so this file does not repeat it.
 *
 * What that file cannot see is a route that simply has no English at all: both
 * copies then agree, in Arabic, and the mirror passes while an English reader
 * gets an Arabic title. That gap is what this checks.
 */
describe("every route that can speak English does", () => {
  const paths = [
    "/", "/listen", "/listen/36",
    "/stories", "/stories/prophets", "/stories/prophets/adam", "/stories/library",
    "/seerah", "/seerah/birth-of-light",
    "/aqeedah", "/aqeedah/knowing-my-lord",
    "/quran-facts", "/quran-facts/cave-years",
    "/hifz", "/hifz/review", "/journey", "/login", "/register", "/profile",
    "/privacy", "/terms", "/forgot-password", "/reset-password",
    "/about", "/no-such-page",
  ];

  const ARABIC_ONLY = new Set<string>();

  it("gives English its own words wherever there are any", () => {
    const stillArabic = paths.filter(path => {
      if (ARABIC_ONLY.has(path)) return false;
      const meta = metaForPath(path);
      return localizedMeta(meta, "en").title === meta.title;
    });
    expect(stillArabic, "a route with no English title previews in Arabic for an English reader").toEqual([]);
  });

  it("keeps the exception honest", () => {
    for (const path of ARABIC_ONLY) {
      const meta = metaForPath(path);
      expect(localizedMeta(meta, "en").title, `${path} has English now — take it out of the exception list`).toBe(meta.title);
    }
  });
});
