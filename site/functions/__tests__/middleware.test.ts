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
  { path: "/seerah/cave-of-hira", status: 200 },
  { path: "/read/1", status: 200 },
  { path: "/read/114", status: 200 },
  { path: "/login", status: 200 },
  { path: "/privacy", status: 200 },
  { path: "/forgot-password", status: 200 },
  { path: "/reset-password", status: 200 },
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

describe("the Cloudflare function", () => {
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
