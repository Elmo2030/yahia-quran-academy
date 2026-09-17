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
import { getSurahName } from "@/lib/quran-content";

const notFound = "الصفحة غير موجودة";

describe("metaForPath", () => {
  it("names every surah the reader can open", () => {
    for (const surah of [1, 18, 55, 108, 114]) {
      const meta = metaForPath(`/read/${surah}`);
      expect(meta.title).toContain(getSurahName(surah));
      expect(meta.title).not.toContain(notFound);
    }
  });

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
      expect(meta.title, story.slug).toContain(story.title);
    }
  });

  it("falls back to not-found for paths that match nothing", () => {
    for (const path of ["/nope", "/stories/nope", "/stories/nope/nope", "/seerah/nope", "/read/0", "/read/115"]) {
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
      "/seerah", "/seerah/birth-of-light", "/read", "/read/1", "/read/114",
      "/login", "/register", "/nope",
    ];
    for (const path of routes) {
      const meta = localizedMeta(metaForPath(path), "en");
      expect(arabic.test(meta.title), `${path} — title: ${meta.title}`).toBe(false);
      expect(arabic.test(meta.description), `${path} — description`).toBe(false);
    }
  });

  it("stays Arabic by default", () => {
    expect(metaForPath("/read/1").title).toContain("سورة");
    expect(localizedMeta(metaForPath("/read/1"), "ar").title).toContain("سورة");
  });

  it("indexes the public pages", () => {
    for (const path of ["/", "/stories", "/seerah", "/read/1"]) {
      expect(metaForPath(path).noindex, path).toBeFalsy();
    }
  });
});

// A number that names no surah is a wrong address. The function already said
// so; the reader used to disagree with it by opening Al-Fatiha.
describe("addresses that name no surah", () => {
  it.each(["/read/0", "/read/115", "/read/200", "/read/abc", "/read/-1"])(
    "keeps %s out of the index",
    (path) => {
      expect(metaForPath(path).noindex).toBe(true);
    },
  );

  it("still names every real surah", () => {
    for (const surah of [1, 18, 114]) {
      expect(metaForPath(`/read/${surah}`).noindex).toBeFalsy();
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
 * The two copies of the metadata, compared.
 *
 * The header of each file said a generator and these tests kept them in step.
 * The generator only ever wrote the content data both of them read, and no test
 * here had ever looked at the worker. That gap is why the worker could go a
 * whole release answering ?lang=en with the Arabic title while the app in the
 * browser answered it in English — two different pages at one address,
 * depending on whether the reader was a person or a crawler.
 */
describe("the app copy and the worker copy", () => {
  const paths = [
    "/", "/read", "/read/1", "/read/114", "/listen", "/listen/36",
    "/stories", "/stories/prophets", "/stories/prophets/adam", "/stories/library",
    "/seerah", "/seerah/birth-of-light",
    "/aqeedah", "/aqeedah/knowing-my-lord",
    "/quran-facts", "/quran-facts/cave-years",
    "/hifz", "/hifz/review", "/login", "/register", "/profile",
    "/privacy", "/terms", "/forgot-password", "/reset-password",
    "/about", "/no-such-page",
  ];

  /** The one page with no English variant in either copy. Both are Arabic for
   *  an English reader, which is a content gap, not a drift between the two. */
  const ARABIC_ONLY = new Set(["/about"]);

  it.each(["ar", "en"] as const)("say the same thing in %s", async locale => {
    const worker = await import("../../../functions/_middleware");
    const differences: string[] = [];
    for (const path of paths) {
      const app = localizedMeta(metaForPath(path), locale);
      const fn = worker.localized(worker.metaForPath(path), locale);
      if (app.title !== fn.title) differences.push(`${path} title\n  app:    ${app.title}\n  worker: ${fn.title}`);
      if (app.description !== fn.description) differences.push(`${path} description\n  app:    ${app.description}\n  worker: ${fn.description}`);
    }
    expect(differences, `a reader and a crawler must be shown the same page:\n${differences.join("\n")}`).toEqual([]);
  });

  it("gives English its own words on every route that has them", async () => {
    const worker = await import("../../../functions/_middleware");
    const stillArabic = paths.filter(path => !ARABIC_ONLY.has(path) && !worker.metaForPath(path).en);
    expect(stillArabic, "a route with no English title previews in Arabic for an English reader").toEqual([]);
    // And the exception is real, not a name left behind in the set.
    for (const path of ARABIC_ONLY) expect(worker.metaForPath(path).en).toBeUndefined();
  });
});
