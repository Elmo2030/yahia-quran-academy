import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({ getSupabase: vi.fn(() => null) }));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ session: null, profile: null }) }));

import { childJourneyActivities } from "./ChildJourney";
import { createProfile, emptyStore, markStoryDone, startStory, submitRecital } from "@/lib/hifz-store";
import { discoverFact } from "@/lib/quran-facts-progress";

beforeEach(() => localStorage.clear());

describe("unified child journey", () => {
  it("uses the existing next-step priority for the journey's primary action", () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const store = submitRecital(created.store, created.profile.id, 114, 1, 3, "recording", 1000);
    localStorage.setItem("yahya.hifz.v1", JSON.stringify(store));

    const journey = childJourneyActivities("en", created.profile.id, store.profiles[0]);
    expect(journey.primary.href).toBe("/hifz/parent");
    expect(journey.primary.title).toMatch(/waiting for a parent/i);
  });

  it("does not show one child's facts progress in another child's journey", () => {
    discoverFact("bismillah", ["bismillah", "egypt"], "child-a");
    const a = childJourneyActivities("en", "child-a", null);
    const b = childJourneyActivities("en", "child-b", null);
    expect(a.activities.find(activity => activity.kind === "facts")?.href).toBe("/quran-facts/egypt");
    expect(b.activities.find(activity => activity.kind === "facts")?.href).toBe("/quran-facts/bismillah");
  });

  it("continues the latest valid incomplete story instead of the Stories library", () => {
    const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!a.ok) throw new Error(a.reason);
    const b = createProfile(a.store, { name: "Yusuf", character: "yahya" });
    if (!b.ok) throw new Error(b.reason);
    const startedA = startStory(b.store, a.profile.id, "nations", "luqman", 1000);
    const startedBoth = startStory(startedA, a.profile.id, "nations", "ashab-al-kahf", 2000);

    const aJourney = childJourneyActivities("en", a.profile.id, startedBoth.profiles.find(profile => profile.id === a.profile.id)!);
    const bJourney = childJourneyActivities("en", b.profile.id, startedBoth.profiles.find(profile => profile.id === b.profile.id)!);

    expect(aJourney.activities.find(activity => activity.kind === "stories")).toMatchObject({
      href: "/stories/nations/ashab-al-kahf",
      title: "Continue your story",
    });
    expect(bJourney.activities.find(activity => activity.kind === "stories")?.href).toBe("/stories");
  });

  it("ignores completed and removed stories before choosing a continuation", () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const started = startStory(created.store, created.profile.id, "nations", "luqman", 1000);
    const completed = markStoryDone(started, created.profile.id, "nations", "luqman", 2000);
    const profile = completed.profiles[0];
    const withMissing = {
      ...profile,
      steps: {
        ...profile.steps,
        "story:removed:no-longer-here": { status: "in_progress" as const, startedAt: 3000 },
      },
    };

    const journey = childJourneyActivities("en", created.profile.id, withMissing);
    expect(journey.activities.find(activity => activity.kind === "stories")?.href).toBe("/stories");
  });
});
