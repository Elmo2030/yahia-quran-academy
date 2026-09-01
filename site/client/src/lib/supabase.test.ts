import { afterEach, describe, expect, it, vi } from "vitest";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

describe("supabase client", () => {
  it("reports unconfigured when env vars missing", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "");
    vi.resetModules();
    const mod1 = await import("@/lib/supabase");
    expect(mod1.isSupabaseConfigured()).toBe(false);
    await expect(mod1.getSupabase()).resolves.toBeNull();
  });

  it("returns the same client instance across calls (singleton)", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv(
      "VITE_SUPABASE_ANON_KEY",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder",
    );
    vi.resetModules();
    const mod = await import("@/lib/supabase");
    // The library is fetched on first use, so this resolves rather than
    // returning; asking twice must not fetch or construct it twice.
    const a = await mod.getSupabase();
    const b = await mod.getSupabase();
    expect(a).not.toBeNull();
    expect(a).toBe(b);
    expect(mod.isSupabaseConfigured()).toBe(true);
  });
});
