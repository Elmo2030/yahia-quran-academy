/**
 * The Cloudflare function must not throw.
 *
 * It runs on every request, so an exception in it is a 500 on the page — and
 * nothing in typecheck or the app's tests exercises it. A metadata branch was
 * once added above the `const base` it read from, which typechecks fine and
 * takes the page down at runtime with a temporal-dead-zone ReferenceError.
 *
 * This bundles the real function and calls it for each kind of route.
 */
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, afterAll, describe, expect, it } from "vitest";

const ROUTES = [
  { path: "/", status: 200 },
  { path: "/about", status: 200 },
  { path: "/stories", status: 200 },
  { path: "/stories/prophets/yusuf", status: 200 },
  { path: "/stories/animals", status: 200 },
  { path: "/seerah", status: 200 },
  { path: "/companions", status: 200 },
  { path: "/companions/abu-bakr", status: 200 },
  { path: "/companions/not-found", status: 404 },
  { path: "/seerah/cave-of-hira", status: 200 },
  { path: "/read/1", status: 200 },
  { path: "/read/114", status: 200 },
  { path: "/login", status: 200 },
  { path: "/privacy", status: 200 },
  { path: "/forgot-password", status: 200 },
  { path: "/reset-password", status: 200 },
  { path: "/read/200", status: 404 },
  { path: "/read/abc", status: 404 },
  { path: "/nope", status: 404 },
  { path: "/stories/nope", status: 404 },
];

// Built inside the project: vite resolves the dynamic import relative to the
// project root, and will not load a bundle written to the system temp dir.
const bundle = join(process.cwd(), "functions", "__tests__", ".middleware.bundle.mjs");
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
// What Cloudflare Pages actually returns for an unknown path: index.html, at
// status 200, carrying the home page's prerendered words.
const homeShell = `${shell}<body><div id="root"><!--prerendered:start--><div id="prerendered"><h1>الرئيسية</h1></div><!--prerendered:end--></div></body>`;

describe("the Cloudflare function", () => {
  it("keeps Arabic-only companions canonical without an unreviewed English edition", async () => {
    const response = await onRequest({ request: new Request("https://yahyaquran.com/companions/abu-bakr?lang=en"), next: async () => new Response(shell, { headers: { "content-type": "text/html" } }), env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } } });
    const html = await response.text();
    expect(html).toContain('rel="canonical" href="https://yahyaquran.com/companions/abu-bakr"');
    expect(html).not.toContain('hreflang="en"');
    expect(html).toContain("الصديق الذي لم يترك صاحبه");
  });
  for (const route of ROUTES) {
    it(`answers ${route.path} with ${route.status}`, async () => {
      const response = await onRequest({
        request: new Request(`https://yahyaquran.com${route.path}`),
        next: async () => new Response(shell, { headers: { "content-type": "text/html" } }),
        env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
      });
      expect(response.status).toBe(route.status);
      const html = await response.text();
      expect(html).toContain("<title");
      expect(html).not.toContain("<!--meta:start-->\n    <!--meta:end-->");
    });
  }

  const fetchPage = async (path: string) => {
    const response = await onRequest({
      request: new Request(`https://yahyaquran.com${path}`),
      next: async () => new Response(shell, { headers: { "content-type": "text/html" } }),
      env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    });
    const html = await response.text();
    const ld = /<script data-default type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
    return { html, graph: ld ? JSON.parse(ld[1])["@graph"] : [] };
  };

  // The Seerah was briefly a chapter of the Quran stories, and the redirect
  // that keeps those old addresses working matched the artwork living at the
  // same prefix: every WebP variant 301'd to /seerah/<file>.webp, which does
  // not exist, so the pictures disappeared from the live site. Pages move;
  // files stay.
  const raw = async (path: string) => onRequest({
    request: new Request(`https://yahyaquran.com${path}`),
    next: async () => new Response(shell, { headers: { "content-type": "text/html" } }),
    env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
  });

  it("keeps the old Seerah addresses working", async () => {
    for (const [from, to] of [
      ["/stories/seerah", "/seerah"],
      ["/stories/seerah/cave-of-hira", "/seerah/cave-of-hira"],
    ]) {
      const response = await raw(from);
      expect(response.status, from).toBe(301);
      expect(response.headers.get("location"), from).toBe(`https://yahyaquran.com${to}`);
    }
  });

  it("leaves the artwork at that prefix alone", async () => {
    for (const file of [
      "/stories/seerah/birth-of-light.jpg",
      "/stories/seerah/birth-of-light-640.webp",
      "/stories/seerah/station-5-1280.webp",
    ]) {
      const response = await raw(file);
      expect(response.status, file).not.toBe(301);
    }
  });

  it("tells an engine that a surah page is a chapter of the Quran", async () => {
    const { graph } = await fetchPage("/read/18");
    const page = graph.find((node: any) => node["@type"] === "WebPage");
    expect(page?.about?.["@type"]).toBe("Book");
    expect(page.about.hasPart.position).toBe(18);
  });

  it("describes the facts page as a collection about the Quran", async () => {
    const { graph } = await fetchPage("/quran-facts");
    const collection = graph.find((node: any) => node["@type"] === "CollectionPage");
    expect(collection?.mainEntity?.numberOfItems).toBe(100);
  });

  // Pages that are private or different for every visitor stay out of search;
  // the pages a parent needs in order to trust the site do not.
  it("keeps the personal shelf out of search and the policies in it", async () => {
    const shelf = await fetchPage("/stories/library");
    expect(shelf.html).toContain('name="robots" content="noindex');
    for (const path of ["/privacy", "/terms"]) {
      const page = await fetchPage(path);
      expect(page.html, path).not.toContain('name="robots"');
    }
  });

  // Every route without a prerendered page of its own lands here, so it must be
  // the empty shell and not the home page, whose words index.html now carries.
  // Pages answers an unknown path with index.html at 200, so the 404 fallback
  // never fires for it and the home page's words arrive on a page that is not
  // the home page.
  it("takes the home page's words back off a page that is not it", async () => {
    for (const path of ["/login", "/stories/library", "/nope"]) {
      const response = await onRequest({
        request: new Request(`https://yahyaquran.com${path}`),
        next: async () => new Response(homeShell, { headers: { "content-type": "text/html" } }),
        env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
      });
      const html = await response.text();
      expect(html, path).not.toContain("prerendered");
      expect(html, path).toContain('<div id="root"></div>');
    }
  });

  it("leaves a page its own prerendered words", async () => {
    const response = await onRequest({
      request: new Request("https://yahyaquran.com/quran-facts"),
      next: async () => new Response(homeShell, { headers: { "content-type": "text/html" } }),
      env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    });
    expect(await response.text()).toContain("prerendered");
  });

  it("falls back to the empty shell, not the home page", async () => {
    const asked: string[] = [];
    await onRequest({
      request: new Request("https://yahyaquran.com/login"),
      next: async () => new Response("", { status: 404, headers: { "content-type": "text/html" } }),
      env: { ASSETS: { fetch: async (url: URL) => { asked.push(url.pathname); return new Response(shell, { headers: { "content-type": "text/html" } }); } } },
    });
    expect(asked).toEqual(["/app-shell.html"]);
  });

  it("sends the pages.dev alias to the domain", async () => {
    const response = await onRequest({
      request: new Request("https://yahia-quran-academy.pages.dev/seerah"),
      next: async () => new Response(shell, { headers: { "content-type": "text/html" } }),
      env: { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    });
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://yahyaquran.com/seerah");
  });
});
