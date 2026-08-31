// Generates robots.txt and sitemap.xml from the story data itself, so the
// sitemap cannot drift out of date when a chapter or story is added.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const ORIGIN = process.env.SITE_ORIGIN ?? "https://yahyaquran.com";

const source = readFileSync(join(root, "client/src/content/stories.ts"), "utf8");
const pick = (name) => {
  const m = source.match(new RegExp(`export const ${name}[^=]*= (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`could not read ${name} out of stories.ts`);
  return eval(m[1]);
};
const chapters = pick("chapters");
const stories = pick("stories");

const seerahSource = readFileSync(join(root, "client/src/content/seerah.ts"), "utf8");
// Same eval-the-literal trick as stories.ts. This replaced a hand-written
// regex that assumed `title` sat on the line after `slug` and that there was
// exactly one station — both assumptions broke the moment the content grew.
const pickFrom = (src, name, file) => {
  const m = src.match(new RegExp(`export const ${name}[^=]*= (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`could not read ${name} out of ${file}`);
  return eval(m[1]);
};
const seerahStations = pickFrom(seerahSource, "seerahStations", "seerah.ts");
const seerahStories = pickFrom(seerahSource, "seerahStories", "seerah.ts");
if (seerahStories.length === 0) throw new Error("no seerah stories parsed — check seerah.ts shape");
if (seerahStations.length === 0) throw new Error("no seerah stations parsed — check seerah.ts shape");
for (const story of seerahStories) {
  if (!seerahStations.some(s => s.stationId === story.stationId)) {
    throw new Error(`seerah story ${story.slug} points at unknown station ${story.stationId}`);
  }
}

const urls = [
  { loc: "/", priority: "1.0" },
  { loc: "/about", priority: "0.6" },
  { loc: "/read", priority: "0.9" },
  { loc: "/stories", priority: "0.9" },
  { loc: "/stories/library", priority: "0.4" },
  ...Array.from({ length: 114 }, (_, i) => ({ loc: `/read/${i + 1}`, priority: "0.7" })),
  ...chapters.filter(c => c.available).map(c => ({ loc: `/stories/${c.slug}`, priority: "0.8" })),
  ...stories.map(s => ({ loc: `/stories/${s.chapter}/${s.slug}`, priority: "0.7" })),
  { loc: "/seerah", priority: "0.8" },
  ...seerahStories.map(s => ({ loc: `/seerah/${s.slug}`, priority: "0.7" })),
];

const today = new Date().toISOString().slice(0, 10);
// Every page is served in both languages off the same URL (?lang=en), so each
// entry declares its own alternates. Without them the English half of the site
// is invisible to search engines.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${ORIGIN}${u.loc}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${ORIGIN}${u.loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}${u.loc}?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${u.loc}" />
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(root, "client/public/sitemap.xml"), sitemap);
// The answer engines are allowed explicitly rather than by the wildcard.
// Several of them treat a missing named rule as ambiguous, and being named
// here is what lets the stories be quoted in an AI answer with a link back.
const AI_AGENTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "Claude-SearchBot",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "meta-externalagent", "Bingbot",
];
writeFileSync(join(root, "client/public/robots.txt"),
`User-agent: *
Allow: /

${AI_AGENTS.map(a => `User-agent: ${a}\nAllow: /\n`).join("\n")}
Sitemap: ${ORIGIN}/sitemap.xml
`);

// llms.txt — a plain-text index of what this site holds, for models reading
// the site directly. Cheap to keep correct because it is generated from the
// same content the pages are.
const chapterLines = chapters
  .filter(c => c.available)
  .map(c => `- [${c.titleEn} — ${c.titleAr}](${ORIGIN}/stories/${c.slug}): ${stories.filter(s => s.chapter === c.slug).length} stories. ${c.descriptionEn ?? c.descriptionAr}`);
const seerahLines = seerahStations
  .map(st => `- [${st.titleEn ?? st.titleAr}](${ORIGIN}/seerah#station-${st.stationId}): ${seerahStories.filter(s => s.stationId === st.stationId).length} stories. ${st.descriptionEn ?? st.descriptionAr}`);
writeFileSync(join(root, "client/public/llms.txt"),
`# Yahya Quran Academy

> A children's Quran site in Arabic and English: the full Uthmani text with
> verified teaching recitations, illustrated stories from the Quran, and the
> Seerah of the Prophet Muhammad told for ages 6-11. Every page is available
> in both languages at the same URL; append ?lang=en for English.

Non-commercial and educational. No automated mastery score is shown and no
stage unlocks on its own — a parent judges the child's recitation.

## Quran reader
- [The reader](${ORIGIN}/read): all 114 surahs in the Uthmani text, each with
  a verified teaching recitation. Individual surahs are at ${ORIGIN}/read/1
  through ${ORIGIN}/read/114.

## Stories from the Quran
${chapterLines.join("\n")}

## Seerah of the Prophet
${seerahLines.join("\n")}

## Other
- [Privacy](${ORIGIN}/privacy)
- [Terms](${ORIGIN}/terms)
- [Sitemap](${ORIGIN}/sitemap.xml)
`);
// The Cloudflare function is copied next to dist/ at publish time, where
// client/src is no longer reachable. Emit the data it needs as a standalone
// module so both it and the app describe pages from the same source.
const surahSource = readFileSync(join(root, "client/src/lib/quran-content.ts"), "utf8");
const surahNames = eval(surahSource.match(/export const surahNames = (\[[\s\S]*?\]);/)[1]);

writeFileSync(join(root, "functions/page-data.js"),
`// Generated by scripts/build-seo.mjs — do not edit.\n` +
`export const chapters = ${JSON.stringify(chapters, null, 1)};\n` +
`export const stories = ${JSON.stringify(stories.map(s => ({
  chapter: s.chapter, slug: s.slug, title: s.title, hook: s.hook, image: s.image ?? null,
})), null, 1)};\n` +
`export const surahNames = ${JSON.stringify(surahNames)};\n` +
`export const seerahStations = ${JSON.stringify(seerahStations)};\n` +
`export const seerahStories = ${JSON.stringify(seerahStories.map(s => ({
  stationId: s.stationId, slug: s.slug, title: s.title, image: s.image ?? null,
  narrative: s.content.tier_1_age_6_8.narrative,
})), null, 1)};\n`);

console.log(`  sitemap.xml: ${urls.length} URLs`);
console.log(`  robots.txt + llms.txt written`);
console.log(`  functions/page-data.js: ${chapters.length} chapters, ${stories.length} stories, ${seerahStations.length} seerah stations, ${seerahStories.length} seerah stories`);
