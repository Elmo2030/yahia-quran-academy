/**
 * The two copies of the metadata must agree.
 *
 * client/src/lib/page-meta.ts serves the reader's browser; functions/
 * _middleware.ts serves crawlers that do not run JavaScript. Both files said in
 * their own comments that a test held them together. No such test existed, and
 * they had drifted on four routes: the stories index and the chapter pages
 * disagreed on whether the count belonged in the text, descriptions were being
 * shortened twice by two different rules, and a page that does not exist had
 * two different titles. Googlebot renders the app and reads one; everything
 * else reads the other.
 *
 * It used to be true that the middleware only ever spoke Arabic, and this file
 * compared the Arabic title, description and noindex flag alone. It speaks both
 * now: ?lang=en gets its own title, description, og:locale, html lang/dir and
 * its own canonical, because the page had been declaring an English alternate
 * at an address that answered in Arabic and canonicalised itself away to the
 * Arabic URL. So both languages are compared, through the real function.
 */
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, afterAll, describe, expect, it } from "vitest";

import { localizedMeta, metaForPath } from "@/lib/page-meta";
import { chapterIndex, storyIndex, seerahStoryIndex, aqeedahCardIndex, factIndex } from "@/lib/page-index.generated";

const bundle = join(process.cwd(), "functions", "__tests__", ".mirror.bundle.mjs");
let onRequest: (context: unknown) => Promise<Response>;

beforeAll(async () => {
  execFileSync("npx", [
    "esbuild", "functions/_middleware.ts",
    "--bundle", "--format=esm", "--platform=neutral",
    `--outfile=${bundle}`, "--log-level=error",
  ], { cwd: process.cwd() });
  ({ onRequest } = await import(bundle));
}, 60_000);

afterAll(() => rmSync(bundle, { force: true }));

const shell = '<!doctype html><html lang="ar" dir="rtl"><head><!--meta:start--><!--meta:end--></head><body></body></html>';

async function fromTheFunction(path: string, locale: "ar" | "en" = "ar") {
  const response = await onRequest({
    request: new Request(`https://yahyaquran.com${path}${locale === "en" ? "?lang=en" : ""}`),
    next: async () => new Response(shell, { headers: { "content-type": "text/html" } }),
    env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
  });
  const html = await response.text();
  const grab = (pattern: RegExp) => (html.match(pattern) ?? ["", ""])[1];
  const unescape = (value: string) =>
    value.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  return {
    title: unescape(grab(/<title data-default>([^<]*)<\/title>/)),
    description: unescape(grab(/name="description" content="([^"]*)"/)),
    noindex: /name="robots" content="noindex/.test(html),
    image: unescape(grab(/property="og:image" content="([^"]*)"/)),
    canonical: unescape(grab(/rel="canonical" href="([^"]*)"/)),
    lang: grab(/<html[^>]*\blang="([^"]*)"/),
    dir: grab(/<html[^>]*\bdir="([^"]*)"/),
  };
}

// Sampling the first N meant every seerah route checked came from station 1:
// stations 6 and 7 were added and never covered. An even spread costs the same
// and reaches the newest content, which is where the two copies would drift.
function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const step = (items.length - 1) / (count - 1);
  return Array.from({ length: count }, (_, i) => items[Math.round(i * step)]);
}

// Every kind of route the site has, plus a sample of each generated family.
const ROUTES = [
  "/", "/about", "/journey", "/privacy", "/terms",
  "/stories", "/seerah", "/quran-facts", "/read", "/aqeedah",
  "/seerah/little-shepherd",
  "/login", "/register", "/profile", "/hifz", "/hifz/114", "/hifz/114/recite", "/hifz/parent", "/hifz/looks", "/listen", "/listen/1", "/listen/114", "/listen/999", "/stories/library",
  "/forgot-password", "/reset-password", "/nope", "/stories/nope",
  ...chapterIndex.map(chapter => `/stories/${chapter.slug}`),
  ...spread(storyIndex, 6).map(story => `/stories/${story.chapter}/${story.slug}`),
  ...spread(seerahStoryIndex, 8).map(story => `/seerah/${story.slug}`),
  ...spread(aqeedahCardIndex, 6).map(card => `/aqeedah/${card.slug}`),
  "/aqeedah/nope",
  ...spread(factIndex, 8).map(fact => `/quran-facts/${fact.slug}`),
  "/quran-facts/nope",
  "/read/1", "/read/18", "/read/114",
  // Addresses that name no surah: this is where the two copies drifted once,
  // the function answering 200 to a page whose title said it did not exist.
  "/read/0", "/read/115", "/read/200", "/read/abc",
];

describe("the app and the crawler are told the same thing", () => {
  for (const path of ROUTES) {
    it(`agrees about ${path}`, async () => {
      const theirs = await fromTheFunction(path);
      const ours = metaForPath(path);
      expect(theirs.title, `${path} title`).toBe(ours.title);
      expect(theirs.description, `${path} description`).toBe(ours.description);
      expect(theirs.noindex, `${path} robots`).toBe(!!ours.noindex);
      // The share picture is chosen twice as well, and per-page art was added
      // to the creed cards long after the two copies were written.
      expect(theirs.image, `${path} share image`).toBe(`https://yahyaquran.com${ours.image}`);
    });
  }
});

/**
 * The same comparison in English, plus the three things that made the English
 * alternate self-defeating: it was served with the Arabic <html lang>, and its
 * canonical pointed at the Arabic URL, so a search engine folded the pair
 * together and only ever showed the Arabic snippet.
 */
describe("and told the same thing in English", () => {
  for (const path of ROUTES) {
    it(`agrees about ${path}?lang=en`, async () => {
      const theirs = await fromTheFunction(path, "en");
      const ours = localizedMeta(metaForPath(path), "en");
      expect(theirs.title, `${path} English title`).toBe(ours.title);
      expect(theirs.description, `${path} English description`).toBe(ours.description);
      expect(theirs.noindex, `${path} robots`).toBe(!!ours.noindex);
    });
  }

  it("serves the English page as an English document", async () => {
    const english = await fromTheFunction("/stories/prophets/adam", "en");
    expect(english.lang).toBe("en");
    expect(english.dir).toBe("ltr");
  });

  it("lets the English page be its own page in search", async () => {
    const arabic = await fromTheFunction("/stories/prophets/adam");
    const english = await fromTheFunction("/stories/prophets/adam", "en");
    expect(arabic.canonical).toBe("https://yahyaquran.com/stories/prophets/adam");
    expect(english.canonical, "the English page canonicalising to the Arabic one is what folded the two together")
      .toBe("https://yahyaquran.com/stories/prophets/adam?lang=en");
  });
});
