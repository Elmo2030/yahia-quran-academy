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
import { companions } from "./build-companions.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const out = join(root, "dist/public");

const readLiteral = (file, name) => {
  const src = readFileSync(join(root, "client/src", file), "utf8");
  const m = src.match(new RegExp(`export const ${name}[^=]*= (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`could not read ${name} out of ${file}`);
  return eval(m[1]);
};

/** An exported object literal, read the same way as the arrays above. */
const readMap = (file, name) => {
  const src = readFileSync(join(root, "client/src", file), "utf8");
  const m = src.match(new RegExp(`export const ${name}[^=]*= (\\{[\\s\\S]*?\\n\\});`));
  if (!m) throw new Error(`could not read ${name} out of ${file}`);
  return eval(`(${m[1]})`);
};

/** Puts each story's English text back on the story, keyed "chapter/slug". A
 *  key in the map that matches no story means the two files have drifted. */
const attachEnglish = (list, map) => {
  const seen = new Set();
  for (const story of list) {
    const key = `${story.chapter}/${story.slug}`;
    if (map[key]) { story.en = map[key]; seen.add(key); }
  }
  const orphans = Object.keys(map).filter(key => !seen.has(key));
  if (orphans.length) throw new Error(`stories-en.ts has text for stories that do not exist: ${orphans.join(", ")}`);
};

const chapters = readLiteral("content/stories.ts", "chapters");
const stories = readLiteral("content/stories.ts", "stories");
// The English text moved to its own module so a reader downloads one language
// rather than two — see content/stories-english.ts. The prerendered page still
// carries both, so it is joined back on here and everything below reads
// `story.en` as it always did.
attachEnglish(stories, readMap("content/stories-en.ts", "storiesEn"));
const seerahStations = readLiteral("content/seerah.ts", "seerahStations");
const seerahStories = readLiteral("content/seerah.ts", "seerahStories");
const facts = readLiteral("content/quran-facts.ts", "quranFacts");
const aqeedahChapters = readLiteral("content/aqeedah.ts", "aqeedahChapters");
const aqeedahCards = readLiteral("content/aqeedah.ts", "aqeedahCards");

// About keeps its copy in one object; the policy pages pick between two with a
// ternary. Both are read rather than restated, so the page a crawler is given
// cannot drift from the page a reader is shown.
const readObject = (file, name) => {
  const src = readFileSync(join(root, "client/src", file), "utf8");
  const m = src.match(new RegExp(`const ${name}[^=]*= (\\{[\\s\\S]*?\\n\\})( as const)?;`));
  if (!m) throw new Error(`could not read ${name} out of ${file}`);
  return eval(`(${m[1]})`);
};
const readTernaryCopy = (file) => {
  const src = readFileSync(join(root, "client/src", file), "utf8");
  const m = src.match(/const t = isAr\s*\?\s*(\{[\s\S]*?\n\s{4,}\})\s*:\s*(\{[\s\S]*?\n\s{4,}\});/);
  if (!m) throw new Error(`could not read the copy out of ${file}`);
  return { ar: eval(`(${m[1]})`), en: eval(`(${m[2]})`) };
};

const about = readObject("pages/About.tsx", "copy");
const privacy = readTernaryCopy("pages/Privacy.tsx");
const terms = readTernaryCopy("pages/Terms.tsx");
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

add("/companions", section("ar", `<h1>الصحابة</h1>${list(companions.map(c => link(`/companions/${c.slug}`, `${c.name} — ${c.title}`)))}`));
for (const c of companions) {
  add(`/companions/${c.slug}`, section("ar", `<h1>${esc(c.title)}</h1>${p(c.name)}${c.sections.map(s => `${s.title ? `<h2>${esc(s.title)}</h2>` : ""}${s.paragraphs.map(p).join("")}`).join("")}<h2>جرّبها اليوم</h2>${c.tryToday.map(p).join("")}<h2>يحيى يسأل</h2>${p(c.challenge.question)}<h2>اكتشف أكثر</h2>${c.exploreMore.map(p).join("")}<h2>المصادر</h2>${list(c.sources.map(s => esc(s.reference)))}${link("/companions", "كل الصحابة")}`));
}

add("/", section("ar", `
  <h1>أكاديمية يحيى لتعليم القرآن للأطفال</h1>
  <p>رحلة قرآنية تنمو مع الطفل: القرآن كاملًا بالنص العثماني مع تلاوات معلّمة موثقة، وقصص من القرآن، والسيرة النبوية، ومعلومات عن القرآن — للأعمار من ٦ إلى ١١.</p>
  ${list([
    link("/hifz", "رحلة الحفظ — الفاتحة وجزء عمّ بالنص العثماني مع التلاوة"),
    link("/stories", "قصص من القرآن — أربعة أبواب"),
    link("/seerah", "السيرة النبوية"),
    link("/quran-facts", "في رحاب القرآن — مئة معلومة"),
    link("/aqeedah", "العقيدة — أتعرّف على ربّي"),
    link("/about", "عن الأكاديمية"),
  ])}
`) + section("en", `
  <h2>Yahya Quran Academy</h2>
  <p>A children's Quran site in Arabic and English: the full Uthmani text with verified teaching recitations, illustrated stories from the Quran, the Seerah of the Prophet, and a hundred things worth knowing about the Quran — for ages 6 to 11.</p>
`));

// Quran stories -------------------------------------------------------------
add("/stories", section("ar", `
  <h1>قصص من القرآن للأطفال</h1>
  <p>${esc(chapters.length)} أبواب من قصص القرآن، ${esc(stories.length)} قصة.</p>
  ${list(chapters.filter(c => c.available).map(c =>
    `${link(`/stories/${c.slug}`, c.titleAr)} — ${esc(c.descriptionAr)}`))}
`) + section("en", `
  <h2>Stories from the Quran for children</h2>
  ${list(chapters.filter(c => c.available).map(c =>
    `${link(`/stories/${c.slug}`, c.titleEn)} — ${esc(c.descriptionEn)}`))}
`));

for (const chapter of chapters.filter(c => c.available)) {
  const own = stories.filter(s => s.chapter === chapter.slug);
  add(`/stories/${chapter.slug}`, section("ar", `
    <h1>${esc(chapter.titleAr)}</h1>
    ${p(chapter.descriptionAr)}
    ${list(own.map(s => `${link(`/stories/${s.chapter}/${s.slug}`, s.title)}${s.surahName ? ` — ${esc(s.surahName)}` : ""}`))}
  `) + section("en", `
    <h2>${esc(chapter.titleEn)}</h2>
    ${p(chapter.descriptionEn)}
    ${list(own.filter(s => s.en).map(s => link(`/stories/${s.chapter}/${s.slug}`, s.en.title)))}
  `));
}

for (const story of stories) {
  const ar = section("ar", `
    <h1>${esc(story.title)}</h1>
    ${story.surahName ? p(`من ${story.surahName}`) : ""}
    ${p(story.hook)}${story.arc ? p(story.arc.setting) : ""}${p(story.events)}
    ${story.arc ? `<h2>اللحظة المهمة</h2>${p(story.arc.keyMoment)}<h2>وكيف انتهت؟</h2>${p(story.arc.resolution)}` : ""}
    ${story.ayah ? `<blockquote>${esc(story.ayah.text)}<cite>${esc(story.ayah.ref)}</cite></blockquote>` : ""}
    ${story.quranProse ? p(story.quranProse) : ""}
    <h2>الدرس المستفاد</h2>${p(story.lesson)}
    ${story.arc ? `<ul>${story.arc.lessons.map(l => `<li>${esc(l)}</li>`).join("")}</ul><h2>فكّر قليلًا</h2>${p(story.arc.think)}<h2>جرّب اليوم</h2>${p(story.arc.tryToday)}` : ""}
    ${story.source ? `<h2>من أين هذه القصة؟</h2>${p(story.source.reference.ar)}${p(story.source.note.ar)}` : ""}
  `);
  const en = story.en ? section("en", `
    <h2>${esc(story.en.title)}</h2>
    ${p(story.en.hook)}${story.en.arc ? p(story.en.arc.setting) : ""}${p(story.en.events)}
    ${story.en.arc ? `<h3>The moment it turns on</h3>${p(story.en.arc.keyMoment)}<h3>How it ended</h3>${p(story.en.arc.resolution)}` : ""}
    <h3>The lesson</h3>${p(story.en.lesson)}
    ${story.en.arc ? `<ul>${story.en.arc.lessons.map(l => `<li>${esc(l)}</li>`).join("")}</ul><h3>Think for a moment</h3>${p(story.en.arc.think)}<h3>Try it today</h3>${p(story.en.arc.tryToday)}` : ""}
    ${story.source ? `<h3>Where this story comes from</h3>${p(story.source.reference.en)}${p(story.source.note.en)}` : ""}
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
  const enTier2 = story.en?.content?.tier_2_age_9_11;
  const en = story.en ? section("en", `
    <h2>${esc(story.en.title ?? story.title)}</h2>
    ${p(enText?.narrative)}${p(enText?.shortLesson)}
    ${enTier2 && enTier2 !== enText ? p(enTier2.narrative) + p(enTier2.details) : ""}
  `) : "";
  add(`/seerah/${story.slug}`, ar + en);
}

// The creed ------------------------------------------------------------------
add("/aqeedah",
  section("ar", `
    <h1>العقيدة — أتعرّف على ربّي</h1>
    <p>${esc(aqeedahCards.length)} بطاقة في ${esc(aqeedahChapters.length)} أبواب: من نعرفه، وبم نؤمن، وكيف يظهر الإيمان في أفعالنا.</p>
    ${aqeedahChapters.map(chapter => `
      <h2>${esc(chapter.titleAr)}</h2>
      ${p(chapter.descriptionAr)}
      ${list(aqeedahCards.filter(c => c.chapter === chapter.slug)
        .map(c => `${link(`/aqeedah/${c.slug}`, c.title)} — ${esc(c.value)}`))}
    `).join("")}
  `) +
  section("en", `
    <h2>Creed for children — Knowing My Lord</h2>
    <p>${esc(aqeedahCards.length)} cards in ${esc(aqeedahChapters.length)} chapters: who we know, what we believe, and how belief shows in what we do.</p>
    ${aqeedahChapters.map(chapter => `
      <h3>${esc(chapter.titleEn)}</h3>
      ${p(chapter.descriptionEn)}
      ${list(aqeedahCards.filter(c => c.chapter === chapter.slug && c.en)
        .map(c => `${link(`/aqeedah/${c.slug}`, c.en.title)} — ${esc(c.en.value)}`))}
    `).join("")}
  `));

for (const card of aqeedahCards) {
  const ar = section("ar", `
    <h1>${esc(card.title)}</h1>
    ${p(card.value)}
    ${p(card.story)}
    <blockquote>${esc(card.ayah.text)}<cite>${esc(card.ayah.ref)}</cite></blockquote>
    ${p(card.didYouKnow)}
    <h2>${esc(card.valueName)}</h2>
    ${p(card.thinkQuestion)}
    ${p(`المصدر: ${card.source.reference}`)}
  `);
  const en = card.en ? section("en", `
    <h2>${esc(card.en.title)}</h2>
    ${p(card.en.value)}
    ${p(card.en.story)}
    ${p(card.en.didYouKnow)}
    <h3>${esc(card.en.valueName)}</h3>
    ${p(card.en.thinkQuestion)}
    ${p(`Source: ${card.en.source.reference}`)}
  `) : "";
  add(`/aqeedah/${card.slug}`, ar + en);
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

// One page per fact. The index above lists all hundred and stays the way in;
// these are what a search result, and a link someone sends, can point at.
for (const fact of facts) {
  add(`/quran-facts/${fact.slug}`,
    section("ar", `
      <h1>${esc(fact.title.ar)}</h1>
      ${p(fact.body.ar)}
      ${fact.ayahs.map(a => `<blockquote lang="ar" dir="rtl">${esc(a.text)}<cite>${esc(a.ref)}</cite></blockquote>`).join("")}
      <h2>من أين نعرف هذا؟</h2>
      ${p(fact.source.reference.ar)}${p(fact.source.note.ar)}
      ${list([link("/quran-facts", "كل المعلومات المئة")])}
    `) +
    section("en", `
      <h2>${esc(fact.title.en)}</h2>
      ${p(fact.body.en)}
      <h3>How do we know this?</h3>
      ${p(fact.source.reference.en)}${p(fact.source.note.en)}
    `));
}

// About, privacy, terms ------------------------------------------------------
const aboutSide = (c, lang) => section(lang, `
  <h1>${esc(c.title)}</h1>
  ${p(c.intro)}${p(c.scope)}
  <h2>${esc(c.sadaqaTitle)}</h2>
  ${p(`${c.sadaqaLead} ${c.sadaqaAnd} ${c.sadaqaAfter}`)}
  ${p(c.sadaqaBody)}${p(c.sadaqaAsk)}
  <h2>${esc(c.accuracyTitle)}</h2>
  ${p(c.accuracyOne)}${p(c.accuracyTwo)}${p(c.accuracyThree)}
  <h2>${esc(c.craftTitle)}</h2>
  ${p(c.craftLead)}
  ${list([`${esc(c.craftGreenLabel)} — ${esc(c.craftGreen)}`, `${esc(c.craftAmberLabel)} — ${esc(c.craftAmber)}`])}
  ${p(c.craftCount)}${p(c.craftMissing)}
  ${p(c.closing)}
`);
add("/about", aboutSide(about.ar, "ar") + aboutSide(about.en, "en"));

const policySide = (c, lang) => section(lang, `
  <h1>${esc(c.title)}</h1>
  ${p(c.intro)}
  ${c.collected ? `<h2>${esc(c.collected)}</h2>${list((c.collectedItems ?? []).map(esc))}` : ""}
  ${c.notCollected ? `<h2>${esc(c.notCollected)}</h2>${list((c.notCollectedItems ?? []).map(esc))}` : ""}
  ${c.rules ? `<h2>${esc(c.rules)}</h2>${list((c.rulesItems ?? []).map(esc))}` : ""}
  ${c.usage ? `<h2>${esc(c.usage)}</h2>${list((c.usageItems ?? []).map(esc))}` : ""}
  ${c.contact ? `<h2>${esc(c.contact)}</h2>${p(c.contactBody)}` : ""}
`);
add("/privacy", policySide(privacy.ar, "ar") + policySide(privacy.en, "en"));
add("/terms", policySide(terms.ar, "ar") + policySide(terms.en, "en"));

// Listening ------------------------------------------------------------------
add("/listen", section("ar", `
  <h1>الاستماع — المصحف المرتل كاملًا</h1>
  <p>المصحف المرتل كاملًا بصوت الشيخ محمد صديق المنشاوي، 114 سورة، يُشغَّل من المتصفح مباشرة بلا حساب ولا تسجيل.</p>
  ${list(surahNames.map((name, i) => link(`/listen/${i + 1}`, `${String(i + 1).padStart(3, "0")} — ${name}`)))}
`) + section("en", `
  <h2>Listening — the complete murattal mushaf</h2>
  <p>The complete murattal mushaf recited by Muhammad Siddiq al-Minshawi, all 114 surahs, played straight from the browser with no account and no tracking.</p>
`));

for (let surah = 1; surah <= surahNames.length; surah += 1) {
  const count = ayahCounts?.[surah - 1];
  add(`/listen/${surah}`, section("ar", `
    <h1>استمع إلى سورة ${esc(surahNames[surah - 1])}</h1>
    <p>سورة ${esc(surahNames[surah - 1])} كاملة${count ? `، وعدد آياتها ${count}` : ""} — بصوت الشيخ محمد صديق المنشاوي، تلاوة مرتلة.</p>
    ${surah > 1 ? p(`السابقة: سورة ${surahNames[surah - 2]}`) : ""}
    ${surah < surahNames.length ? p(`التالية: سورة ${surahNames[surah]}`) : ""}
  `) + section("en", `
    <h2>Listen to Surah ${esc(englishSurahNames[surah - 1])}</h2>
    <p>The whole of Surah ${esc(englishSurahNames[surah - 1])}${count ? `, ${count} verses` : ""} — recited by Muhammad Siddiq al-Minshawi.</p>
  `));
}

// The memorization journey -----------------------------------------------------
// Only the journey itself. The screens under it — the review queue, the parent
// PIN, the certificate — hold one child's own record and are marked noindex.
add("/hifz", section("ar", `
  <h1>رحلة حفظ جزء عمّ للأطفال</h1>
  <p>خريطة يمشي فيها الطفل سورة بعد سورة من جزء عمّ، برفقة يحيى. في كل آية: يسمعها بصوت الشيخ، ويكرّرها بالعدد الذي يختاره، ويسجّل صوته ليسمع نفسه، ثم يقول إنه حفظها.</p>
  <p>ما يقوله الطفل لا يُقبل وحده: الآية تعود إليه بعد يوم، ثم بعد ثلاثة، فسبعة، فأربعة عشر، فثلاثين — والنجمة الثالثة لا تُكتب إلا إذا رجع إليها في يوم آخر.</p>
  <p>وليّ الأمر هو من يقدّر التلاوة؛ لا يعرض الموقع درجة إتقان آلية ولا يفتح مرحلة من تلقاء نفسه. ولا يغادر شيء من هذا جهازك: لا حساب، ولا خادم، ولا تتبّع.</p>
  ${list([
    link("/listen", "الاستماع — المصحف المرتل كاملًا"),
    link("/hifz/78", "اقرأ جزء عمّ من سورة النبأ"),
    link("/about", "عن الأكاديمية"),
  ])}
`) + section("en", `
  <h2>A Juz Amma memorization journey for children</h2>
  <p>A map the child walks one surah at a time. For every ayah: listen to it, repeat it as many times as they choose, record their own voice and hear it back, then say they have memorized it.</p>
  <p>Saying so is not enough on its own — the ayah returns after a day, then three, seven, fourteen and thirty, and the third star is only written once the child has come back to it on a later day.</p>
  <p>The parent is the one who judges the recitation: no automated mastery score, no stage that unlocks by itself. None of it leaves the device — no account, no server, no tracking.</p>
`));

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

// The home hero is the only image deliberately fetched at high priority by
// the app. Its markup arrives after the SPA bundle, so expose the same
// responsive source ladder in the document head for the home page only.
// Other routes must not pay for an image they never show.
const homeHeroPreload = '<link rel="preload" as="image" href="/hero/yahya-768.webp" imagesrcset="/hero/yahya-384.webp 384w, /hero/yahya-576.webp 576w, /hero/yahya-768.webp 768w, /hero/yahya-1152.webp 1152w" imagesizes="(max-width: 820px) 70vw, 312px" fetchpriority="high">';

// Routes with no prerendered page — sign-in, the personal shelf, anything that
// does not exist — reach the SPA fallback in functions/_middleware.ts. That
// fallback used to fetch index.html, which since this script runs is the home
// page: /about briefly served the home page's words to crawlers, and so would
// every 404. The fallback fetches this empty shell instead.
writeFileSync(join(out, "app-shell.html"), shell);

let written = 0;
let bytes = 0;
for (const [path, body] of pages) {
  // Marked so functions/_middleware.ts can take it back out: Cloudflare Pages
  // answers an unknown path with index.html at status 200, which since this
  // script runs carries the home page's words. Without the markers, /login and
  // every address that does not exist would read as the home page.
  const pageShell = path === "/" ? shell.replace("</head>", `${homeHeroPreload}</head>`) : shell;
  const html = pageShell.replace(anchor,
    `<div id="root"><!--prerendered:start--><div id="prerendered">${body}</div><!--prerendered:end--></div>${style}`);
  // "<path>.html", not "<path>/index.html": Cloudflare Pages serves a directory
  // by redirecting the bare path to one with a trailing slash, which would put
  // a 308 in front of every link on the site, the sitemap and the canonical
  // tags — all of which name the path without the slash.
  const file = path === "/" ? join(out, "index.html") : join(out, `${path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written += 1;
  bytes += html.length;
}

console.log(`prerender: ${written} pages, ${(bytes / 1024 / 1024).toFixed(1)} MB total`);
