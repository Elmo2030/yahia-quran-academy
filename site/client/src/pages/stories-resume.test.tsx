import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";

vi.mock("@/lib/supabase", () => ({ getSupabase: vi.fn(() => null) }));
vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null, profile: null }), useAuth: () => ({ session: null, profile: null }) }));

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { createProfile, emptyStore, loadStore, saveStore, stepStatus } from "@/lib/hifz-store";
import { resetHifzStoreCache } from "@/hooks/useHifzStore";
import Stories from "./Stories";

beforeEach(() => {
  localStorage.clear();
  resetHifzStoreCache();
  window.history.pushState({}, "", "/stories/nations/ashab-al-kahf");
});

describe("Story Detail resume start", () => {
  it("records a named child's normal Story Detail entry as in progress", async () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    saveStore(created.store);
    resetHifzStoreCache();

    render(<ThemeProvider><LocaleProvider><Stories /></LocaleProvider></ThemeProvider>);

    await waitFor(() => {
      const profile = loadStore().profiles[0];
      expect(stepStatus(profile, { kind: "story", chapter: "nations", slug: "ashab-al-kahf" })).toBe("in_progress");
      expect(profile.steps["story:nations:ashab-al-kahf"].startedAt).toEqual(expect.any(Number));
    });
  });
});
