// =============================================================================
// Write the text of every page into the HTML that is served.
//
// The site is a single-page app: the shell arrives with an empty <div id="root">
// and React fills it. Google runs JavaScript and sees the page; the crawlers
// behind AI answers — GPTBot, ClaudeBot, PerplexityBot — largely do not, and
// were being served a document with no words in it at all. A site whose whole
// subject is text was invisible to every engine that reads text.
//
// So each route gets its own copy of the shell with its content already in the
// body. React replaces it on mount (createRoot clears the container, so there
// is no hydration to mismatch), which also means a reader on a slow connection
// sees the words before the bundle arrives instead of a blank cream screen.
//
// The content here is the same content the app renders, drawn from the same
// files — not a summary written for crawlers. Both languages are included
// because the app serves both at this URL.
//
// Metadata is NOT written here. functions/_middleware.ts owns the title, the
// canonical, the hreflang and the JSON-LD, and patches every HTML response
// including these files, so there is one source for it rather than two that
// can disagree.
// =============================================================================

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const out = join(root, "dist/public");

const readLiteral = (file, name) => {
  const src = readFileSync(join(root, "client/src", file), "utf8");
  const m = src.match(new RegExp(`export const ${name}[^=]*= (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`could not read ${name} out of ${file}`);
  return eval(m[1]);
};

const chapters = readLiteral("content/stories.ts", "chapters");
const stories = readLiteral("content/stories.ts", "stories");
const seerahStations = readLiteral("content/seerah.ts", "seerahStations");
const seerahStories = readLiteral("content/seerah.ts", "seerahStories");
const facts = readLiteral("content/quran-facts.ts", "quranFacts");
const surahNames = readLiteral("lib/quran-content.ts", "surahNames");
const englishSurahNames = readLiteral("lib/quran-content.ts", "englishSurahNames");
// Read rather than import: the deploy builder's node may not strip types.
const ayahCounts = readLiteral("lib/surah-ayah-counts.generated.ts", "ayahCounts");

const esc = value => String(value ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const p = text => (text ? `<p>${esc(text)}</p>` : "");
const section = (lang, inner) =>
  `<section lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">${inner}</section>`;
const link = (href, label) => `<a href="${href}">${esc(label)}</a>`;
const list = items => (items.length ? `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>` : "");

// ---------------------------------------------------------------- page bodies

const pages = new Map();
const add = (path, body) => pages.set(path, body);

add("/", section("ar", `
  <h1>أكاديمية يحيى لتعليم القرآن للأطفال</h1>
  <p>رحلة قرآنية تنمو مع الطفل: القرآن كاملًا بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن، والسيرة النبوية، ومعلومات عن القرآن — للأعمار من ٦ إلى ١١.</p>
  ${list([
    link("/read/1", "القارئ — 114 سورة بالنص العثماني مع التلاوة"),
    link("/stories", "قصص من القرآن — أربعة أبواب"),
    link("/seerah", "السيرة النبوية"),
    link("/quran-facts", "في رحاب القرآن — مئة معلومة"),
    link("/about", "عن الأكاديمية"),
  ])}
  <p>لا نعرض درجة إتقان آلية ولا نفتح مراحل تلقائيًا — وليّ الأمر هو من يقدّر تلاوة طفله.</p>
`) + section("en", `
  <h2>Yahya Quran Academy</h2>
  <p>A children's Quran site in Arabic and English: the full Uthmani text with verified teaching recitations, illustrated stories from the Quran, the Seerah of the Prophet, and a hundred things worth knowing about the Quran — for ages 6 to 11.</p>
`));

// Quran stories -------------------------------------------------------------
add("/stories", section("ar", `
  <h1>قصص من القرآن للأطفال</h1>
  <p>${esc(chapters.length)} أبواب من قصص القرآن، ${esc(stories.length)} قصة.</p>
  ${list(chapters.filter(c => c.available).map(c =>
    `${link(`/stories/${c.slug}`, c.title)} — ${esc(c.description ?? "")}`))}
`));

for (const chapter of chapters.filter(c => c.available)) {
  const own = stories.filter(s => s.chapter === chapter.slug);
  add(`/stories/${chapter.slug}`, section("ar", `
    <h1>${esc(chapter.title)}</h1>
    ${p(chapter.description)}
    ${list(own.map(s => `${link(`/stories/${s.chapter}/${s.slug}`, s.title)}${s.surahName ? ` — ${esc(s.surahName)}` : ""}`))}
  `));
}

for (const story of stories) {
  const ar = section("ar", `
    <h1>${esc(story.title)}</h1>
    ${story.surahName ? p(`من ${story.surahName}`) : ""}
    ${p(story.hook)}${p(story.events)}
    ${story.ayah ? `<blockquote>${esc(story.ayah.text)}<cite>${esc(story.ayah.ref)}</cite></blockquote>` : ""}
    ${story.quranProse ? p(story.quranProse) : ""}
    <h2>الدرس المستفاد</h2>${p(story.lesson)}
  `);
  const en = story.en ? section("en", `
    <h2>${esc(story.en.title)}</h2>
    ${p(story.en.hook)}${p(story.en.events)}
    <h3>The lesson</h3>${p(story.en.lesson)}
  `) : "";
  add(`/stories/${story.chapter}/${story.slug}`, ar + en);
}

// Seerah ---------------------------------------------------------------------
add("/seerah", section("ar", `
  <h1>السيرة النبوية للأطفال</h1>
  <p>محطات من سيرة النبي محمد ﷺ، مروية للأعمار من ٦ إلى ١١.</p>
  ${seerahStations.map(station => `
    <h2>${esc(station.titleAr)}</h2>
    ${p(station.descriptionAr)}
    ${list(seerahStories.filter(s => s.stationId === station.stationId)
      .map(s => link(`/seerah/${s.slug}`, s.title)))}
  `).join("")}
`));

for (const story of seerahStories) {
  const tier1 = story.content?.tier_1_age_6_8;
  const tier2 = story.content?.tier_2_age_9_11;
  const ar = section("ar", `
    <h1>${esc(story.title)}</h1>
    ${p(tier1?.narrative)}${p(tier1?.shortLesson)}
    ${p(tier2?.narrative)}${p(tier2?.details)}
    ${story.interactive?.thinkQuestion ? `<h2>سؤال للتفكير</h2>${p(story.interactive.thinkQuestion)}` : ""}
    ${story.source?.reference ? p(`المصدر: ${story.source.reference}`) : ""}
  `);
  const enText = story.en?.content?.tier_1_age_6_8 ?? story.en?.content?.tier_2_age_9_11;
  const en = story.en ? section("en", `
    <h2>${esc(story.en.title ?? story.title)}</h2>
    ${p(enText?.narrative)}${p(enText?.shortLesson ?? enText?.details)}
  `) : "";
  add(`/seerah/${story.slug}`, ar + en);
}

// In the Realm of the Quran --------------------------------------------------
const factBlock = (fact, locale) => `
  <h2>${esc(fact.number)}. ${esc(fact.title[locale])}</h2>
  ${p(fact.body[locale])}
  ${fact.ayahs.map(a => `<blockquote lang="ar" dir="rtl">${esc(a.text)}<cite>${esc(a.ref)}</cite></blockquote>`).join("")}
`;
add("/quran-facts",
  section("ar", `
    <h1>في رحاب القرآن — اكتشف أسرار القرآن</h1>
    <p>${esc(facts.length)} معلومة عن القرآن الكريم للأطفال، كل واحدة خلف بطاقة تُقلب لتقرأها.</p>
    ${facts.map(f => factBlock(f, "ar")).join("")}
  `) +
  section("en", `
    <h2>In the Realm of the Quran</h2>
    <p>${esc(facts.length)} things worth knowing about the Quran, each behind a card you turn over.</p>
    ${facts.map(f => factBlock(f, "en")).join("")}
  `));

// Reader ---------------------------------------------------------------------
add("/read", section("ar", `
  <h1>قارئ الأكاديمية</h1>
  <p>القرآن الكريم كاملًا بالنص العثماني، 114 سورة، مع تلاوة معلّمة لكل سورة.</p>
  ${list(surahNames.map((name, i) => link(`/read/${i + 1}`, `${String(i + 1).padStart(3, "0")} — ${name}`)))}
`));

for (let surah = 1; surah <= surahNames.length; surah += 1) {
  const count = ayahCounts?.[surah - 1];
  add(`/read/${surah}`, section("ar", `
    <h1>سورة ${esc(surahNames[surah - 1])}</h1>
    <p>السورة رقم ${surah} من القرآن الكريم${count ? `، وعدد آياتها ${count}` : ""} — بالنص العثماني، مع الاستماع لتلاوة معلّمة.</p>
    ${surah > 1 ? p(`السابقة: سورة ${surahNames[surah - 2]}`) : ""}
    ${surah < surahNames.length ? p(`التالية: سورة ${surahNames[surah]}`) : ""}
  `) + section("en", `
    <h2>Surah ${esc(englishSurahNames[surah - 1])}</h2>
    <p>Surah number ${surah} of the Quran${count ? `, ${count} verses` : ""} — the Uthmani text with a verified teaching recitation.</p>
  `));
}

// ---------------------------------------------------------------- write it out

// The home page is written back over index.html, so a second run without a
// rebuild would otherwise find a filled #root and have nothing to fill.
const anchor = '<div id="root"></div>';
const shell = readFileSync(join(out, "index.html"), "utf8")
  .replace(/<div id="root">[\s\S]*?<\/div><style>#prerendered[\s\S]*?<\/style>/, anchor);
if (!shell.includes(anchor)) throw new Error("the built shell has no #root to fill");

// Modest styling: this is on screen only until the bundle lands, and it should
// read as a plain page of the site rather than as something broken.
const style = `<style>#prerendered{max-width:46rem;margin:0 auto;padding:2rem 1.25rem;font-family:"Noto Naskh Arabic",serif;color:#001F3F;background:#fffdf5}#prerendered h1{font-size:1.7rem;line-height:1.5}#prerendered h2{font-size:1.2rem;margin-top:1.6rem}#prerendered p,#prerendered li{line-height:2;font-size:.98rem}#prerendered blockquote{margin:.6rem 0;padding:.6rem .9rem;background:#eef3dd;border-radius:12px}#prerendered cite{display:block;margin-top:.3rem;font-size:.75rem;color:#7d631c;font-style:normal}#prerendered a{color:#556B2F}</style>`;

let written = 0;
let bytes = 0;
for (const [path, body] of pages) {
  const html = shell.replace(anchor, `<div id="root"><div id="prerendered">${body}</div></div>${style}`);
  const file = path === "/" ? join(out, "index.html") : join(out, path.slice(1), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written += 1;
  bytes += html.length;
}

console.log(`prerender: ${written} pages, ${(bytes / 1024 / 1024).toFixed(1)} MB total`);
