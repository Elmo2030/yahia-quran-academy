/**
 * Whether the auth library has to be downloaded at all.
 *
 * It is 213 KB, and a child reading a surah has no session to restore. The
 * question is answered from localStorage before anything is fetched — but the
 * answer has to be yes in every case where a session could exist, or a signed-in
 * reader would silently appear signed out.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const PROJECT = "https://rhcfcyvxgbltdzeezryw.supabase.co";
const KEY = "sb-rhcfcyvxgbltdzeezryw-auth-token";

async function load() {
  vi.resetModules();
  vi.stubEnv("VITE_SUPABASE_URL", PROJECT);
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.a.b");
  return import("@/lib/supabase");
}

const setUrl = (href: string) => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: new URL(href) as unknown as Location,
  });
};

beforeEach(() => localStorage.clear());
afterEach(() => { vi.unstubAllEnvs(); setUrl("http://localhost:3000/"); });

describe("deciding whether a session might exist", () => {
  it("says no for a reader who never signed in", async () => {
    const { mightHaveSession } = await load();
    expect(mightHaveSession()).toBe(false);
  });

  it("says yes when a session is stored", async () => {
    localStorage.setItem(KEY, JSON.stringify({ access_token: "x" }));
    const { mightHaveSession } = await load();
    expect(mightHaveSession()).toBe(true);
  });

  it.each([
    "http://localhost:3000/#access_token=abc&type=recovery",
    "http://localhost:3000/profile?code=abc",
    "http://localhost:3000/#error=access_denied",
  ])("says yes for a provider returning at %s", async (href) => {
    setUrl(href);
    const { mightHaveSession } = await load();
    expect(mightHaveSession()).toBe(true);
  });

  it("says no when sign-in is not configured at all", async () => {
    vi.resetModules();
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "");
    const { mightHaveSession } = await import("@/lib/supabase");
    expect(mightHaveSession()).toBe(false);
  });
});
