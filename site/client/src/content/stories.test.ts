/**
 * Quran-story content integrity.
 *
 * The English arrived in batches keyed by slug, and several batches used
 * different slugs than this site does (salih/saleh, musa/musa-and-harun) or
 * named stories that do not exist here. These tests make the state of the
 * translation visible instead of leaving it to be noticed on a page.
 */
import { describe, expect, it } from "vitest";

import { chapters, stories, storyKey, storyMinutes, storyTextFor } from "@/content/stories";
import { storiesEn } from "@/content/stories-en";

/** The English text of one story. It lives in its own module now so a reader
 *  fetches one language rather than two; these tests read both on purpose. */
const en = (story: (typeof stories)[number]) => storiesEn[storyKey(story)];

/** Stories still awaiting an English translation. Shrink this list; do not grow it.
 *  It is empty: every story reads in both languages. A new story without an
 *  `en` block fails this rather than quietly serving Arabic to English readers. */
const UNTRANSLATED: string[] = [];

const key = (s: { chapter: string; slug: string }) => `${s.chapter}/${s.slug}`;

describe("story content", () => {
  it("keeps every story in a chapter that exists", () => {
    for (const story of stories) {
      expect(chapters.some(c => c.slug === story.chapter), key(story)).toBe(true);
    }
  });

  // Two women slugs use underscores where every other slug uses hyphens.
  // They are live URLs, so renaming them would break links; this records the
  // inconsistency so a new story does not copy it.
  it("uses hyphens in new slugs", () => {
    const legacy = new Set(["imraat_alaziz", "nuh_lut"]);
    for (const story of stories) {
      if (legacy.has(story.slug)) continue;
      expect(story.slug, key(story)).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("keeps slugs unique within a chapter", () => {
    const keys = stories.map(key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("tracks exactly which stories are still untranslated", () => {
    const missing = stories.filter(s => !en(s)).map(key).sort();
    expect(missing).toEqual([...UNTRANSLATED].sort());
  });

  it("leaves no Arabic in the English prose", () => {
    const arabic = /[؀-ۿ]/;
    for (const story of stories) {
      const english = en(story);
      if (!english) continue;
      for (const [field, value] of [
        ["title", english.title],
        ["hook", english.hook],
        ["events", english.events],
        ["lesson", english.lesson],
        ["next", english.next],
      ] as const) {
        expect(arabic.test(value), `${key(story)} — ${field}`).toBe(false);
      }
    }
  });

  it("falls back to Arabic for anything untranslated", () => {
    for (const story of stories) {
      if (en(story)) continue;
      expect(storyTextFor(story, en(story)).title, key(story)).toBe(story.title);
    }
  });
});

/**
 * These stories are told to a child as true, so each has to say what in it is
 * the Quran's own words and what is a name or a detail from somewhere else —
 * Hawwa, Sarah, Bilqis and Uzair are not named in the Quran, and a parent who
 * finds that out later should have found it here first.
 */
describe("every story says where it comes from", () => {
  it("carries a source in both languages", () => {
    for (const story of stories) {
      expect(story.source, story.slug).toBeTruthy();
      for (const field of ["reference", "note"] as const) {
        expect(story.source[field].ar.length, `${story.slug} ${field} ar`).toBeGreaterThan(15);
        expect(story.source[field].en.length, `${story.slug} ${field} en`).toBeGreaterThan(15);
      }
      expect(["🟢", "🟡"], story.slug).toContain(story.source.reliability);
    }
  });

  /**
   * Three stories keep the amber mark for good: the People of ar-Rass, Yusha
   * ibn Nun, and the donkey of Uzair. It is not a decision left pending — it
   * is what the reports themselves are. So each of them has to do two things:
   * name the disagreement, and say why the mark stays, rather than wear a
   * colour the reader has to interpret.
   */
  it("names the disagreement and why the mark stays", () => {
    const open = stories.filter(entry => entry.source.reliability === "🟡");
    expect(open.map(entry => entry.slug).sort()).toEqual(["ashab-ar-rass", "donkey-of-uzair", "yusha"]);
    for (const story of open) {
      expect(story.source.note.ar, `${story.slug} names no disagreement`).toMatch(/يختلف|أقوال|لا يثبت|روايات/);
      expect(story.source.note.ar, `${story.slug} does not say why the mark stays`).toContain("بهذه العلامة");
    }
  });

  /** The names the Quran never gives are the ones easiest to pass off. */
  it("says plainly that the unnamed women are unnamed in the Quran", () => {
    for (const slug of ["hawwa", "sarah", "bilqis", "asiya", "imraat_alaziz"]) {
      const story = stories.find(entry => entry.slug === slug);
      expect(story?.source.note.ar, slug).toMatch(/لم يسمِّها|لم يذكر اسم|لم يذكر القرآن اسمها/);
    }
  });
});

/**
 * Every story ends in a question the child can actually answer from what they
 * just read, and a medal they only see once they have. The Seerah and the
 * creed have had this from the start; these forty-two were the section a child
 * could only read at.
 */
describe("every story ends in a question", () => {
  it("has three options and a real answer, in both languages", () => {
    for (const story of stories) {
      for (const challenge of [story.challenge, en(story)?.challenge]) {
        if (!challenge) continue;
        expect(challenge.options.length, story.slug).toBe(3);
        expect(new Set(challenge.options).size, `${story.slug} repeats an option`).toBe(3);
        expect(challenge.correctAnswer, story.slug).toBeGreaterThanOrEqual(0);
        expect(challenge.correctAnswer, story.slug).toBeLessThan(challenge.options.length);
        expect(challenge.question.length, story.slug).toBeGreaterThan(10);
      }
    }
  });

  /** A translated question that points at a different option than the Arabic
   *  one would mark a right answer wrong for English readers. */
  it("marks the same answer in Arabic and in English", () => {
    for (const story of stories) {
      if (!en(story)?.challenge) continue;
      expect(en(story)!.challenge.correctAnswer, story.slug).toBe(story.challenge.correctAnswer);
    }
  });

  it("gives a medal with a name and a keepsake", () => {
    for (const story of stories) {
      for (const reward of [story.reward, en(story)?.reward]) {
        if (!reward) continue;
        expect(reward.badge.length, story.slug).toBeGreaterThan(2);
        expect(reward.keepsake.length, story.slug).toBeGreaterThan(2);
        expect(reward.note.length, story.slug).toBeGreaterThan(15);
        expect(reward.icon.length, story.slug).toBeGreaterThan(0);
      }
    }
  });
});

/**
 * The rewrite to the content standard.
 *
 * Readers told us the stories were too short and read like abstracts, so each
 * one is being rewritten with the middle it was missing: where we are, the
 * moment it turns on, how it ended, and something to do afterwards. That is
 * forty-two stories in two languages, so it lands a chapter at a time.
 *
 * `WAITING` is the list of stories that have not been rewritten yet. All
 * forty-two have now landed, so it is empty — and it stays, because it is the
 * guard: a story added later without an arc, or one that loses the arc it
 * has, fails here until someone decides in writing that it should.
 */
const WAITING = new Set<string>([]);

describe("the story arc", () => {
  it("is present on every story that is not still waiting for it", () => {
    for (const story of stories) {
      expect(Boolean(story.arc), `${story.slug}: arc / WAITING disagree`)
        .toBe(!WAITING.has(story.slug));
    }
  });

  it("names only stories that exist", () => {
    const slugs = new Set(stories.map(story => story.slug));
    for (const slug of WAITING) expect(slugs.has(slug), `${slug} is not a story`).toBe(true);
  });

  /** A rewritten story that has no English arc would drop half its page for
   *  English readers, which is worse than not having rewritten it at all. */
  it("lands in both languages at once", () => {
    for (const story of stories) {
      if (!story.arc || !en(story)) continue;
      expect(Boolean(en(story)!.arc), `${story.slug} has an Arabic arc but no English one`).toBe(true);
    }
  });

  it("carries the whole shape, not part of it", () => {
    for (const story of stories) {
      for (const [lang, arc] of [["ar", story.arc], ["en", en(story)?.arc]] as const) {
        if (!arc) continue;
        const where = `${story.slug} (${lang})`;
        // The card's one sentence. Longer than this and it is a paragraph.
        expect(arc.idea.length, where).toBeGreaterThan(20);
        expect(arc.idea.length, `${where}: idea is a paragraph, not a sentence`).toBeLessThan(220);
        for (const [name, body] of [["setting", arc.setting], ["keyMoment", arc.keyMoment], ["resolution", arc.resolution]] as const) {
          expect(body.length, `${where}: ${name} is too thin to be a scene`).toBeGreaterThan(200);
        }
        // One central lesson in `lesson`, three short ones under it.
        expect(arc.lessons.length, where).toBe(3);
        for (const line of arc.lessons) expect(line.length, where).toBeGreaterThan(20);
        expect(arc.think.length, where).toBeGreaterThan(40);
        expect(arc.tryToday.length, where).toBeGreaterThan(30);
        if (arc.word) {
          expect(arc.word.term.length, where).toBeGreaterThan(2);
          expect(arc.word.meaning.length, where).toBeGreaterThan(20);
        }
      }
    }
  });

  /** The reading time on the card is counted, not authored, so the only thing
   *  worth pinning is that a rewritten story really is a longer read. */
  it("makes a rewritten story a longer read than a summary", () => {
    for (const story of stories) {
      if (!story.arc) continue;
      expect(storyMinutes(story), story.slug).toBeGreaterThanOrEqual(3);
    }
  });
});

/**
 * What the rewrite cost, and the line it must not cross quietly.
 *
 * Writing the forty-two to the content standard roughly doubled this module:
 * the Stories chunk went from about 72 KB gzipped to about 143 KB. That chunk
 * is lazily loaded, so nobody pays for it until they open a story — but then
 * they were paying for all forty-two in *both* languages to read one, and the
 * English was over half of it.
 *
 * The English lives in content/stories-en.ts now and is fetched only by a
 * reader actually reading in English, so the two budgets below are separate:
 * an Arabic reader pays the first, an English reader pays both. What is worth
 * guarding is not only the totals but the split itself — if the English text
 * ever finds its way back into stories.ts, both numbers still pass while every
 * reader quietly goes back to paying for two languages. So that is asserted
 * directly.
 *
 * If a budget is ever hit, the fix is not a bigger number: it is to split each
 * of these by chapter and load only the chapter being read, which is where the
 * remaining waste is.
 */
describe("the story content stays affordable", () => {
  const weigh = async (file: string) => {
    const { gzipSync } = await import("node:zlib");
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    return gzipSync(readFileSync(join(process.cwd(), "client/src/content", file))).length;
  };

  it("keeps what every reader pays within the Arabic budget", async () => {
    const gzipped = await weigh("stories.ts");
    expect(gzipped, `stories.ts is ${(gzipped / 1024).toFixed(1)} KB gzipped`).toBeLessThan(80 * 1024);
  });

  it("keeps what an English reader pays on top within its own budget", async () => {
    const gzipped = await weigh("stories-en.ts");
    expect(gzipped, `stories-en.ts is ${(gzipped / 1024).toFixed(1)} KB gzipped`).toBeLessThan(80 * 1024);
  });

  it("keeps the English out of the module every reader loads", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const source = readFileSync(join(process.cwd(), "client/src/content/stories.ts"), "utf8");
    // The `en` field is gone from the Story type, so there is nowhere to put
    // the translation back without this failing.
    expect(source, "an `en` field on Story means the English is shipping to Arabic readers again")
      .not.toMatch(/^\s*en\??:/m);
    // And the Arabic module must not be importing the English one, which would
    // make the dynamic import static and fold the chunk straight back in.
    expect(source).not.toMatch(/from "\.\/stories-en"/);
  });
});
