// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { childActivity, type FactDiscovery } from "@/lib/child-activity";
import {
  askForPractice, createProfile, declareMemorized, emptyStore, enterAsGuest, markListened, markReviewed,
  markStoryDone, recordLearningStep, registerDeed, startStory, submitRecital,
  type StepStoryInfo,
} from "@/lib/hifz-store";
import { dayNumber } from "@/lib/hifz-review";

const DAY = 86_400_000;
const NOW = Date.now();

const SAMPLE_DEED_STORY: StepStoryInfo = {
  title: "قصة أصحاب الكهف",
  action: "اختبئ في غرفة هادئة خمس دقائق كما فعل أصحاب الكهف.",
  reward: { icon: "🕋", badge: "صاحب كهف صغير", keepsake: "مفتاح الكهف", note: "تذكّرك بأن الإيمان يستحق الاختباء من أجله." },
};

function newChild(name = "Amina") {
  const created = createProfile(emptyStore(), { name, character: "fatima" });
  if (!created.ok) throw new Error(created.reason);
  return { store: created.store, id: created.profile.id };
}

function profileOf(store: ReturnType<typeof emptyStore>, id: string) {
  const profile = store.profiles.find(p => p.id === id);
  if (!profile) throw new Error("profile missing");
  return profile;
}

describe("childActivity", () => {
  it("returns nothing for a fresh child", () => {
    const { store, id } = newChild();
    const activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.lastActiveDay).toBeNull();
    expect(activity.recent).toEqual([]);
    expect(activity.encourage).toBeNull();
    expect(activity.week.activeDays).toBe(0);
  });

  it("trap 1: repeated listening on different days shows only the latest day, never a count", () => {
    let { store, id } = newChild();
    store = markListened(store, id, 1, 1, NOW - 2 * DAY);
    store = markListened(store, id, 1, 1, NOW - 1 * DAY);
    store = markListened(store, id, 1, 1, NOW);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.lastActiveDay).toBe(dayNumber(NOW));
    // Nothing in the shape exposes "3" anywhere for a listen count.
    expect(JSON.stringify(activity)).not.toContain('"count":3');
    expect(activity.recent).toEqual([]);
  });

  it("trap 2: a finished seerah station with no ayah touched at all still gives yesterday", () => {
    let { store, id } = newChild();
    store = recordLearningStep(store, id, { kind: "seerah", slug: "birth-of-light" }, "done", NOW - DAY);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.lastActiveDay).toBe(dayNumber(NOW - DAY));
    expect(activity.lastActiveDay).not.toBe(dayNumber(NOW));
  });

  it("groups declarations of the same surah on the same day into one recent item", () => {
    let { store, id } = newChild();
    store = declareMemorized(store, id, 114, 1, "child", NOW);
    store = declareMemorized(store, id, 114, 2, "child", NOW);
    store = declareMemorized(store, id, 114, 3, "child", NOW);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    const declared = activity.recent.filter(r => r.kind === "ayah_declared");
    expect(declared).toHaveLength(1);
    expect(declared[0]).toMatchObject({ surah: 114, count: 3 });
    expect(activity.week.ayahsDeclared).toBe(3);
  });

  it("groups reviews on the same day into one recent item regardless of surah", () => {
    let { store, id } = newChild();
    store = declareMemorized(store, id, 114, 1, "child", NOW - 10 * DAY);
    store = declareMemorized(store, id, 1, 1, "child", NOW - 10 * DAY);
    store = markReviewed(store, id, 114, 1, NOW);
    store = markReviewed(store, id, 1, 1, NOW);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    const reviewed = activity.recent.filter(r => r.kind === "ayah_reviewed");
    expect(reviewed).toHaveLength(1);
    expect(reviewed[0]).toMatchObject({ count: 2 });
    expect(activity.week.ayahReviews).toBe(2);
  });

  it("counts activity exactly 6 days ago as inside the week, and exactly 7 days ago as outside", () => {
    let { store, id } = newChild();
    store = declareMemorized(store, id, 1, 1, "child", NOW - 6 * DAY);
    let activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.week.ayahsDeclared).toBe(1);
    expect(activity.week.activeDays).toBe(1);

    let { store: store2, id: id2 } = newChild("Sara");
    store2 = declareMemorized(store2, id2, 1, 1, "child", NOW - 7 * DAY);
    activity = childActivity(profileOf(store2, id2), { now: NOW });
    expect(activity.week.ayahsDeclared).toBe(0);
    expect(activity.week.activeDays).toBe(0);
  });

  it("gives a guest nothing, even with activity recorded", () => {
    let store = enterAsGuest(emptyStore());
    const guest = store.profiles.find(p => p.character === "guest");
    if (!guest) throw new Error("guest missing");
    store = declareMemorized(store, guest.id, 1, 1, "child", NOW);
    const activity = childActivity(profileOf(store, guest.id), { now: NOW });
    expect(activity).toEqual({ lastActiveDay: null, week: expect.objectContaining({ activeDays: 0 }), recent: [], encourage: null });
  });

  it("resolves a real story's title and skips a slug the content index no longer has", () => {
    let { store, id } = newChild();
    store = startStory(store, id, "nations", "ashab-al-kahf", NOW - DAY);
    store = markStoryDone(store, id, "nations", "ashab-al-kahf", NOW);
    store = startStory(store, id, "nations", "a-story-that-was-removed", NOW);
    store = markStoryDone(store, id, "nations", "a-story-that-was-removed", NOW);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    const stories = activity.recent.filter(r => r.kind === "story");
    expect(stories).toHaveLength(1);
    expect(stories[0]).toMatchObject({ title: "قصة أصحاب الكهف" });
    // The week count still reflects both completions even though only one
    // could be named in the recent list.
    expect(activity.week.storiesDone).toBe(2);
  });

  it("orders encourage by practice first, then the most recently started thing", () => {
    let { store, id } = newChild();
    store = startStory(store, id, "nations", "ashab-al-kahf", NOW);
    let activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.encourage).toMatchObject({ kind: "continue", title: "قصة أصحاب الكهف" });

    // A review due today would just repeat the week's own "آية مستحقة" count,
    // so it must not produce an encourage case of its own — the unfinished
    // story is still what gets encouraged.
    store = declareMemorized(store, id, 114, 1, "child", NOW - 2 * DAY);
    activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.encourage).toMatchObject({ kind: "continue", title: "قصة أصحاب الكهف" });

    store = submitRecital(store, id, 114, 1, 3, undefined, NOW);
    store = askForPractice(store, id, 114, 1, 3, undefined, NOW);
    activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.encourage).toMatchObject({ kind: "practice_recital", surah: 114, from: 1, to: 3 });
  });

  it("gives no encourage case when the only thing due is a review", () => {
    let { store, id } = newChild();
    store = declareMemorized(store, id, 114, 1, "child", NOW - 2 * DAY);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.encourage).toBeNull();
  });

  it("counts a deed the child registered and a deed the parent confirmed separately", () => {
    let { store, id } = newChild();
    store = registerDeed(store, id, "nations", "ashab-al-kahf", SAMPLE_DEED_STORY, NOW);
    let activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.week.deedsRegistered).toBe(1);
    expect(activity.week.deedsConfirmed).toBe(0);
    expect(activity.recent.find(r => r.kind === "deed")).toMatchObject({ title: SAMPLE_DEED_STORY.title });
  });

  it("does not count a parent's confirmation as the child's own activity", () => {
    // The child submitted a recital 5 days ago; the parent only got to it
    // today. lastActiveDay and activeDays must reflect the child's action,
    // not the parent's — reviewedAt is a parent timestamp on this record.
    let { store, id } = newChild();
    store = submitRecital(store, id, 114, 1, 3, undefined, NOW - 5 * DAY);
    store = askForPractice(store, id, 114, 1, 3, undefined, NOW);
    const activity = childActivity(profileOf(store, id), { now: NOW });
    expect(activity.lastActiveDay).toBe(dayNumber(NOW - 5 * DAY));
    expect(activity.week.activeDays).toBe(1);
  });

  it("counts a dated fact discovery in the week and gives it a recent item", () => {
    const { store, id } = newChild();
    const facts: FactDiscovery[] = [{ slug: "bismillah", at: NOW }];
    const activity = childActivity(profileOf(store, id), { now: NOW, facts });
    expect(activity.week.factsDiscovered).toBe(1);
    expect(activity.recent[0]).toMatchObject({ kind: "fact", title: "سورة بلا بسملة، وسورة ببسملتين" });
  });

  it("does not import fetch, supabase, or localStorage", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const source = readFileSync(join(process.cwd(), "client/src/lib/child-activity.ts"), "utf8");
    expect(source).not.toMatch(/\bfetch\(/);
    expect(source).not.toMatch(/supabase/i);
    expect(source).not.toMatch(/localStorage/);
  });
});
