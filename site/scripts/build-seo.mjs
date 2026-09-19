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

// The English text of the stories moved out of stories.ts so a reader fetches
// one language instead of two — see client/src/content/stories-english.ts.
// Both copies of the metadata still need the English titles, so it is joined
// back on here and the rest of this script reads `story.en` as before.
const storiesEnSource = readFileSync(join(root, "client/src/content/stories-en.ts"), "utf8");
const storiesEn = (() => {
  const m = storiesEnSource.match(/export const storiesEn[^=]*= (\{[\s\S]*?\n\});/);
  if (!m) throw new Error("could not read storiesEn out of stories-en.ts");
  return eval(`(${m[1]})`);
})();
{
  const seen = new Set();
  for (const story of stories) {
    const key = `${story.chapter}/${story.slug}`;
    if (storiesEn[key]) { story.en = storiesEn[key]; seen.add(key); }
  }
  const orphans = Object.keys(storiesEn).filter(key => !seen.has(key));
  if (orphans.length) throw new Error(`stories-en.ts has text for stories that do not exist: ${orphans.join(", ")}`);
}

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

const aqeedahSource = readFileSync(join(root, "client/src/content/aqeedah.ts"), "utf8");
const aqeedahChapters = pickFrom(aqeedahSource, "aqeedahChapters", "aqeedah.ts");
const aqeedahCards = pickFrom(aqeedahSource, "aqeedahCards", "aqeedah.ts");
if (aqeedahCards.length === 0) throw new Error("no aqeedah cards parsed — check aqeedah.ts shape");
const seerahStories = pickFrom(seerahSource, "seerahStories", "seerah.ts");

// The hundred facts each have a page of their own now, so the sitemap, the
// llms listing and both copies of the metadata all need to know them.
const factsSource = readFileSync(join(root, "client/src/content/quran-facts.ts"), "utf8");
const quranFacts = pickFrom(factsSource, "quranFacts", "quran-facts.ts");
if (quranFacts.length === 0) throw new Error("no quran facts parsed — check quran-facts.ts shape");
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
  { loc: "/privacy", priority: "0.3" },
  { loc: "/terms", priority: "0.3" },
  { loc: "/quran-facts", priority: "0.8" },
  ...quranFacts.map(f => ({ loc: `/quran-facts/${f.slug}`, priority: "0.6" })),
  { loc: "/read", priority: "0.9" },
  { loc: "/listen", priority: "0.9" },
  { loc: "/stories", priority: "0.9" },
  { loc: "/hifz", priority: "0.9" },
  ...Array.from({ length: 114 }, (_, i) => ({ loc: `/read/${i + 1}`, priority: "0.7" })),
  ...Array.from({ length: 114 }, (_, i) => ({ loc: `/listen/${i + 1}`, priority: "0.6" })),
  ...chapters.filter(c => c.available).map(c => ({ loc: `/stories/${c.slug}`, priority: "0.8" })),
  ...stories.map(s => ({ loc: `/stories/${s.chapter}/${s.slug}`, priority: "0.7" })),
  { loc: "/seerah", priority: "0.8" },
  { loc: "/aqeedah", priority: "0.8" },
  ...aqeedahCards.map(c => ({ loc: `/aqeedah/${c.slug}`, priority: "0.7" })),
  ...seerahStories.map(s => ({ loc: `/seerah/${s.slug}`, priority: "0.7" })),
];

// No <lastmod>. It was the build date, stamped identically onto all 178 URLs
// on every deploy — telling Google that every story, every surah and every
// policy page changed the moment anything did. Google's own guidance is to
// leave it out rather than give a date it cannot trust, and the deploy builder
// clones shallowly, so a real per-file date is not available here either.
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
Content-Signal: search=yes, ai-input=yes, ai-train=yes

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

// Chapter-level links told a model four stories existed where there are fifty.
// Every story is named here, so a model answering "does this site cover the
// story of Yusuf" can see that it does without crawling four index pages.
const storyLines = chapters
  .filter(c => c.available)
  .flatMap(c => [
    ``, `### ${c.titleEn} — ${c.titleAr}`,
    ...stories
      .filter(s => s.chapter === c.slug)
      .map(s => `- [${s.en?.title ?? s.title} — ${s.title}](${ORIGIN}/stories/${s.chapter}/${s.slug})${s.surahName ? `: from ${s.surahName}` : ""}`),
  ]);

const seerahStoryLines = seerahStations.flatMap(st => [
  ``, `### ${st.titleEn ?? st.titleAr}`,
  ...seerahStories
    .filter(s => s.stationId === st.stationId)
    .map(s => `- [${s.en?.title ?? s.title} — ${s.title}](${ORIGIN}/seerah/${s.slug})${s.source?.reference ? `: ${s.source.reference}` : ""}`),
]);
writeFileSync(join(root, "client/public/llms.txt"),
`# Yahya Quran Academy

> A children's Quran site in Arabic and English: the full Uthmani text with
> verified teaching recitations, illustrated stories from the Quran, and the
> Seerah of the Prophet Muhammad told for ages 6-11. Every page is available
> in both languages at the same URL; append ?lang=en for English.

Non-commercial and educational.

## Quran reader
- [The reader](${ORIGIN}/read): all 114 surahs in the Uthmani text, each with
  a verified teaching recitation. Individual surahs are at ${ORIGIN}/read/1
  through ${ORIGIN}/read/114.
- [Listening](${ORIGIN}/listen): the complete murattal mushaf recited by
  Muhammad Siddiq al-Minshawi, about 28 hours of audio, one page per surah at
  ${ORIGIN}/listen/1 through ${ORIGIN}/listen/114. Playback only — no account,
  no tracking.

## Memorization journey
- [The journey](${ORIGIN}/hifz): a map for memorizing Juz Amma. The child
  listens to an ayah, repeats it, records their own voice and declares it
  memorized; it then returns for review after one, three, seven, fourteen and
  thirty days. No automated mastery score — the parent judges the recitation —
  and every record stays in the browser on the child's own device.

## Stories from the Quran
${chapterLines.join("\n")}

${storyLines.join("\n")}

## Creed, for children
${aqeedahChapters.map(c => `- [${c.titleEn} — ${c.titleAr}](${ORIGIN}/aqeedah#${c.slug}): ${aqeedahCards.filter(x => x.chapter === c.slug).length} cards. ${c.descriptionAr}`).join("\n")}

${aqeedahCards.map(c => `- [${c.title}](${ORIGIN}/aqeedah/${c.slug}): ${c.value}`).join("\n")}

## Seerah of the Prophet
${seerahLines.join("\n")}

${seerahStoryLines.join("\n")}

## In the Realm of the Quran
${quranFacts.map(f => `- [${f.title.en}](${ORIGIN}/quran-facts/${f.slug}): ${f.body.en.replace(/\s+/g, " ").trim()}`).join("\n")}

- [Discover the Quran](${ORIGIN}/quran-facts): one hundred short facts about the Quran
  for children — what it names, how it is arranged, and what is remarkable about
  it — presented as cards a child turns over one at a time.

## About and provenance
- [About the academy](${ORIGIN}/about): who built the site and why, in Arabic and English.
- The Quran text is the Uthmani script; the reader plays verified teaching
  recitations, and highlighting is shown only where the timing data covers the
  ayah — nothing is inferred to fill a gap.
- Each Seerah story carries its own source reference on the page.
- Every page's full text is in the HTML that is served, so this site can be read
  without executing JavaScript.

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
// The worker used to know only the Arabic names, so an English link preview of
// a surah page previewed in Arabic. Both lists go over now.
const englishSurahNames = eval(surahSource.match(/export const englishSurahNames = (\[[\s\S]*?\]);/)[1]);

// The app needs titles and descriptions on every route, but page-meta.ts used
// to import the whole of content/stories.ts and content/seerah.ts to get them
// — pulling every narrative, in both languages, into the entry chunk that a
// visitor to the home page downloads. This is the same data trimmed to what
// the metadata actually reads.
// The one place text is shortened for a description. It used to hard-slice at
// 180, which cut words in half — "وعندم" — and left the Cloudflare function to
// shorten the same text again with a different rule, so the two disagreed on
// what a page's description was. It cuts at a word boundary now, and nothing
// downstream shortens it a second time.
const LIMIT = 180;
const clip = (text) => {
  const flat = String(text ?? "").replace(/\s+/g, " ").trim();
  if (flat.length <= LIMIT) return flat;
  const cut = flat.slice(0, LIMIT - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > LIMIT * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
};
writeFileSync(join(root, "client/src/lib/page-index.generated.ts"),
`// Generated by scripts/build-seo.mjs — do not edit.
// Not \`as const\`: literal types make every null fallback unreachable, which
// TypeScript then reports as an error on \`a ?? b\`.
type Chapter = { slug: string; titleAr: string; descriptionAr: string; titleEn: string | null; descriptionEn: string | null; cover: string | null };
type Story = { chapter: string; slug: string; title: string; hook: string; titleEn: string | null; hookEn: string | null; image: string | null };
type Station = { stationId: number; titleAr: string; titleEn: string | null };
type SeerahStory = { stationId: number; slug: string; title: string; description: string; titleEn: string | null; descriptionEn: string | null; image: string | null };
type AqeedahChapter = { slug: string; titleAr: string; titleEn: string; descriptionAr: string; descriptionEn: string | null };
type AqeedahCard = { slug: string; chapter: string; title: string; value: string; titleEn: string | null; valueEn: string | null; image: string | null };
type Fact = { number: number; slug: string; icon: string; title: string; body: string; titleEn: string; bodyEn: string };
export const chapterIndex: Chapter[] = ${JSON.stringify(chapters.map(c => ({
  slug: c.slug, titleAr: c.titleAr, descriptionAr: c.descriptionAr,
  titleEn: c.titleEn ?? null, descriptionEn: c.descriptionEn ?? null,
  cover: c.cover ?? null,
})), null, 1)};

export const storyIndex: Story[] = ${JSON.stringify(stories.map(s => ({
  chapter: s.chapter, slug: s.slug, title: s.title, hook: clip(s.hook),
  titleEn: s.en?.title ?? null, hookEn: s.en ? clip(s.en.hook) : null,
  image: s.image ?? null,
})), null, 1)};

export const seerahStationIndex: Station[] = ${JSON.stringify(seerahStations.map(s => ({
  stationId: s.stationId, titleAr: s.titleAr, titleEn: s.titleEn ?? null,
})), null, 1)};

export const seerahStoryIndex: SeerahStory[] = ${JSON.stringify(seerahStories.map(s => ({
  stationId: s.stationId,
  slug: s.slug, title: s.title, description: clip(s.content.tier_1_age_6_8.narrative),
  titleEn: s.en?.title ?? null,
  descriptionEn: s.en ? clip(s.en.content.tier_1_age_6_8.narrative) : null,
  image: s.image ?? null,
})), null, 1)};

export const aqeedahChapterIndex: AqeedahChapter[] = ${JSON.stringify(aqeedahChapters.map(c => ({
  slug: c.slug, titleAr: c.titleAr, titleEn: c.titleEn, descriptionAr: clip(c.descriptionAr),
  descriptionEn: c.descriptionEn ? clip(c.descriptionEn) : null,
})), null, 1)};

export const aqeedahCardIndex: AqeedahCard[] = ${JSON.stringify(aqeedahCards.map(c => ({
  slug: c.slug, chapter: c.chapter, title: c.title, value: clip(c.value),
  titleEn: c.en?.title ?? null, valueEn: c.en ? clip(c.en.value) : null,
  image: c.image ?? null,
})), null, 1)};

export const factIndex: Fact[] = ${JSON.stringify(quranFacts.map(f => ({
  number: f.number, slug: f.slug, icon: f.icon,
  title: f.title.ar, body: clip(f.body.ar),
  titleEn: f.title.en, bodyEn: clip(f.body.en),
})), null, 1)};
`);

// Both consumers are handed text that is already the right length: the app
// through page-index.generated.ts and the Cloudflare function through this
// file. Emitting the full narrative here and leaving the function to shorten it
// is what let the two disagree about every story's description.
writeFileSync(join(root, "functions/page-data.js"),
`// Generated by scripts/build-seo.mjs — do not edit.\n` +
`export const chapters = ${JSON.stringify(chapters.map(c => ({ ...c, descriptionAr: clip(c.descriptionAr), descriptionEn: c.descriptionEn ? clip(c.descriptionEn) : c.descriptionEn })), null, 1)};\n` +
`export const stories = ${JSON.stringify(stories.map(s => ({
  chapter: s.chapter, slug: s.slug, title: s.title, hook: clip(s.hook), image: s.image ?? null,
  titleEn: s.en?.title ?? null, hookEn: s.en?.hook ? clip(s.en.hook) : null,
})), null, 1)};\n` +
`export const surahNames = ${JSON.stringify(surahNames)};\n` +
`export const englishSurahNames = ${JSON.stringify(englishSurahNames)};\n` +
`export const seerahStations = ${JSON.stringify(seerahStations)};\n` +
`export const aqeedahChapters = ${JSON.stringify(aqeedahChapters, null, 1)};\n` +
`export const aqeedahCards = ${JSON.stringify(aqeedahCards.map(c => ({
  slug: c.slug, chapter: c.chapter, title: c.title, value: clip(c.value), image: c.image ?? null,
  titleEn: c.en?.title ?? null, valueEn: c.en?.value ? clip(c.en.value) : null,
})), null, 1)};\n` +
`export const seerahStories = ${JSON.stringify(seerahStories.map(s => ({
  stationId: s.stationId, slug: s.slug, title: s.title, image: s.image ?? null,
  narrative: clip(s.content.tier_1_age_6_8.narrative),
  titleEn: s.en?.title ?? null,
  narrativeEn: s.en?.content?.tier_1_age_6_8?.narrative ? clip(s.en.content.tier_1_age_6_8.narrative) : null,
})), null, 1)};\n` +
`export const quranFacts = ${JSON.stringify(quranFacts.map(f => ({
  number: f.number, slug: f.slug, title: f.title.ar, body: clip(f.body.ar),
  titleEn: f.title.en, bodyEn: clip(f.body.en),
})), null, 1)};\n`);

console.log(`  sitemap.xml: ${urls.length} URLs`);
console.log(`  robots.txt + llms.txt written`);
console.log(`  functions/page-data.js: ${chapters.length} chapters, ${stories.length} stories, ${seerahStations.length} seerah stations, ${seerahStories.length} seerah stories, ${quranFacts.length} facts`);
