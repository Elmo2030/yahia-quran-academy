import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({ getSupabase: vi.fn(() => null) }));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ session: null, profile: null }) }));

import { childJourneyActivities } from "./ChildJourney";
import { createProfile, emptyStore, submitRecital } from "@/lib/hifz-store";
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
});
