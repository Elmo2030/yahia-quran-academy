// Generates robots.txt and sitemap.xml from the story data itself, so the
// sitemap cannot drift out of date when a chapter or story is added.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const ORIGIN = process.env.SITE_ORIGIN ?? "https://yahia-quran-academy.pages.dev";

const source = readFileSync(join(root, "client/src/content/stories.ts"), "utf8");
const pick = (name) => {
  const m = source.match(new RegExp(`export const ${name}[^=]*= (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`could not read ${name} out of stories.ts`);
  return eval(m[1]);
};
const chapters = pick("chapters");
const stories = pick("stories");

const urls = [
  { loc: "/", priority: "1.0" },
  { loc: "/read", priority: "0.9" },
  { loc: "/stories", priority: "0.9" },
  { loc: "/stories/library", priority: "0.4" },
  ...Array.from({ length: 114 }, (_, i) => ({ loc: `/read/${i + 1}`, priority: "0.7" })),
  ...chapters.filter(c => c.available).map(c => ({ loc: `/stories/${c.slug}`, priority: "0.8" })),
  ...stories.map(s => ({ loc: `/stories/${s.chapter}/${s.slug}`, priority: "0.7" })),
];

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/1999/sitemap/0.9">
${urls.map(u => `  <url><loc>${ORIGIN}${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`.replace("http://www.w3.org/1999/sitemap/0.9", "http://www.sitemaps.org/schemas/sitemap/0.9");

writeFileSync(join(root, "client/public/sitemap.xml"), sitemap);
writeFileSync(join(root, "client/public/robots.txt"),
`User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`);
console.log(`  sitemap.xml: ${urls.length} URLs`);
console.log(`  robots.txt written`);
