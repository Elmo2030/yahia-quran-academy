/**
 * A reader who is not signed in never causes the auth library to be fetched.
 *
 * Asking for the client is what downloads it — 213 KB — so the cheap question
 * has to come first: is there anyone to save this for? Reading a surah saves
 * progress on every ayah, so getting this order wrong put the whole library on
 * the reader's hot path for a child who never signs in, which is exactly what
 * happened once.
 */
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { useReadingProgress } from "@/lib/progress";

// vi.mock is hoisted above the imports, so the spies it hands out have to be
// created inside the factory and read back afterwards.
vi.mock("@/lib/supabase", () => ({
  getSupabase: vi.fn(async () => null),
  isSupabaseConfigured: () => true,
  mightHaveSession: () => false,
}));
const auth: { session: unknown; profile: unknown } = { session: null, profile: null };
vi.mock("@/hooks/useAuth", () => ({ default: () => auth, useAuth: () => auth }));

import * as supabaseModule from "@/lib/supabase";
const getSupabase = supabaseModule.getSupabase as unknown as ReturnType<typeof vi.fn>;


beforeEach(() => { getSupabase.mockClear(); auth.session = null; auth.profile = null; });

describe("reading while signed out", () => {
  it("saves progress on the device without reaching for the auth library", async () => {
    const { result } = renderHook(() => useReadingProgress());
    await act(async () => { await result.current.recordReading(18, 10); });

    expect(getSupabase).not.toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("yahya.progress.v1") ?? "{}")).toMatchObject({ surah: 18, ayah: 10 });
  });

  it("reaches for it once there is a profile to save against", async () => {
    auth.session = { user: { id: "u1" } };
    auth.profile = { id: "p1" };
    const { result } = renderHook(() => useReadingProgress());
    await act(async () => { await result.current.recordReading(1, 1); });
    expect(getSupabase).toHaveBeenCalled();
  });
});
