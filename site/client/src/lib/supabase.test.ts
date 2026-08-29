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
    expect(mod1.getSupabase()).toBeNull();
  });

  it("returns the same client instance across calls (singleton)", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv(
      "VITE_SUPABASE_ANON_KEY",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder",
    );
    vi.resetModules();
    const mod = await import("@/lib/supabase");
    const a = mod.getSupabase();
    const b = mod.getSupabase();
    expect(a).not.toBeNull();
    expect(a).toBe(b);
    expect(mod.isSupabaseConfigured()).toBe(true);
  });
});
