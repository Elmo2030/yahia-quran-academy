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
 * The middleware only ever speaks Arabic — a crawler gets the Arabic page — so
 * the Arabic title, the description and the noindex flag are what is compared.
 */
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, afterAll, describe, expect, it } from "vitest";

import { metaForPath } from "@/lib/page-meta";
import { chapterIndex, storyIndex, seerahStoryIndex } from "@/lib/page-index.generated";

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

const shell = "<!doctype html><head><!--meta:start--><!--meta:end--></head>";

async function fromTheFunction(path: string) {
  const response = await onRequest({
    request: new Request(`https://yahyaquran.com${path}`),
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
  };
}

// Every kind of route the site has, plus a sample of each generated family.
const ROUTES = [
  "/", "/about", "/privacy", "/terms",
  "/stories", "/seerah", "/quran-facts", "/read",
  "/login", "/register", "/profile", "/stories/library",
  "/forgot-password", "/reset-password", "/nope", "/stories/nope",
  ...chapterIndex.map(chapter => `/stories/${chapter.slug}`),
  ...storyIndex.slice(0, 6).map(story => `/stories/${story.chapter}/${story.slug}`),
  ...seerahStoryIndex.slice(0, 6).map(story => `/seerah/${story.slug}`),
  "/read/1", "/read/18", "/read/114",
];

describe("the app and the crawler are told the same thing", () => {
  for (const path of ROUTES) {
    it(`agrees about ${path}`, async () => {
      const theirs = await fromTheFunction(path);
      const ours = metaForPath(path);
      expect(theirs.title, `${path} title`).toBe(ours.title);
      expect(theirs.description, `${path} description`).toBe(ours.description);
      expect(theirs.noindex, `${path} robots`).toBe(!!ours.noindex);
    });
  }
});
