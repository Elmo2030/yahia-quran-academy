// @vitest-environment jsdom
/**
 * progress.ts tests — the pure helpers (local storage round-trip + library
 * merge). The Supabase client and auth hook are mocked so the module imports
 * cleanly without a backend or a Provider.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase", () => ({
  getSupabase: vi.fn(() => null),
  isSupabaseConfigured: vi.fn(() => false),
  mightHaveSession: vi.fn(() => false),
}));

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ session: null, profile: null }),
}));

import {
  nextStep,
  readLocalProgress,
  writeLocalProgress,
  mergeLibrarySlugs,
} from "@/lib/progress";
import {
  createProfile, declareMemorized, emptyStore, registerDeed, saveStore, type StepStoryInfo,
} from "@/lib/hifz-store";

const SAMPLE_DEED_STORY: StepStoryInfo = {
  title: "قصة لقمان الحكيم",
  action: "اخفض صوتك اليوم في موضع كنتَ سترفعه فيه.",
  reward: { icon: "🌳", badge: "حكيم صغير", keepsake: "حصيرة الحكمة", note: "تذكّرك أن أغلى ما يورّثه الأب لابنه كلمة صادقة." },
};

describe("local progress storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("round-trips a valid progress entry", () => {
    writeLocalProgress({ surah: 18, ayah: 7, updatedAt: 1234 });
    expect(readLocalProgress()).toEqual({ surah: 18, ayah: 7, updatedAt: 1234 });
  });

  it("returns null when nothing is stored", () => {
    expect(readLocalProgress()).toBeNull();
  });

  it("returns null for malformed entries", () => {
    localStorage.setItem("yahya.progress.v1", JSON.stringify({ surah: "x" }));
    expect(readLocalProgress()).toBeNull();
    localStorage.setItem("yahya.progress.v1", JSON.stringify({ surah: 0, ayah: 1 }));
    expect(readLocalProgress()).toBeNull();
  });
});

describe("nextStep", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null with nothing on this device at all", () => {
    expect(nextStep(null)).toBeNull();
  });

  it("falls back to the reader's own progress with no hifz child on this device", () => {
    expect(nextStep({ surah: 18, ayah: 9, updatedAt: 1 })).toEqual({
      ref: { kind: "ayah", surah: 18, ayah: 9 },
      href: "/read/18",
    });
  });

  it("sends an active child to a review due in the journey, over the reader's progress", () => {
    const DAY = 86_400_000;
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const declared = declareMemorized(created.store, created.profile.id, 114, 1, "child", Date.now() - 2 * DAY);
    saveStore(declared);

    expect(nextStep({ surah: 18, ayah: 9, updatedAt: 1 })).toEqual({
      ref: { kind: "ayah", surah: 114, ayah: 1 },
      href: "/hifz/114",
    });
  });

  it("sends an active child to a deed awaiting confirmation, once there is nothing due to review", () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const withDeed = registerDeed(created.store, created.profile.id, "nations", "luqman", SAMPLE_DEED_STORY);
    saveStore(withDeed);

    expect(nextStep(null)).toEqual({
      ref: { kind: "deed", chapter: "nations", slug: "luqman" },
      href: "/stories/nations/luqman",
    });
  });

  it("picks the due review over a pending deed when a child has both waiting", () => {
    // The two tests above each leave only one condition true, so swapping the
    // priority in nextStep() would pass them both regardless of the order —
    // this is the one that actually pins it, with both present at once.
    const DAY = 86_400_000;
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const declared = declareMemorized(created.store, created.profile.id, 114, 1, "child", Date.now() - 2 * DAY);
    const withDeed = registerDeed(declared, created.profile.id, "nations", "luqman", SAMPLE_DEED_STORY);
    saveStore(withDeed);

    expect(nextStep(null)).toEqual({
      ref: { kind: "ayah", surah: 114, ayah: 1 },
      href: "/hifz/114",
    });
  });
});

describe("mergeLibrarySlugs", () => {
  it("unions and dedupes preserving order", () => {
    expect(mergeLibrarySlugs(["a", "b"], ["b", "c"])).toEqual(["a", "b", "c"]);
    expect(mergeLibrarySlugs([], ["c", "c"])).toEqual(["c"]);
    expect(mergeLibrarySlugs(["x"], [])).toEqual(["x"]);
  });
});
