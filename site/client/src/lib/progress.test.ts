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
}));

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ session: null, profile: null }),
}));

import {
  readLocalProgress,
  writeLocalProgress,
  mergeLibrarySlugs,
} from "@/lib/progress";

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
    localStorage.setItem("yahia.progress.v1", JSON.stringify({ surah: "x" }));
    expect(readLocalProgress()).toBeNull();
    localStorage.setItem("yahia.progress.v1", JSON.stringify({ surah: 0, ayah: 1 }));
    expect(readLocalProgress()).toBeNull();
  });
});

describe("mergeLibrarySlugs", () => {
  it("unions and dedupes preserving order", () => {
    expect(mergeLibrarySlugs(["a", "b"], ["b", "c"])).toEqual(["a", "b", "c"]);
    expect(mergeLibrarySlugs([], ["c", "c"])).toEqual(["c"]);
    expect(mergeLibrarySlugs(["x"], [])).toEqual(["x"]);
  });
});
