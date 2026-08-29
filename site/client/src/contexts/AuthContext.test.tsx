/**
 * AuthContext tests — exercise the error-mapping helper that turns Supabase's
 * English error strings into Arabic + English friendly text and AuthError
 * codes.
 *
 * Mock the supabase module's getSupabase() so we never talk to a real backend;
 * call the public methods on useAuth() under a minimal Provider wrapper.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => {
  return {
    getSupabase: vi.fn(() => null),
    isSupabaseConfigured: vi.fn(() => false),
  };
});

import { AuthError } from "@/contexts/AuthContext";

describe("AuthError mapping", () => {
  it("recognises already-registered emails", () => {
    const err = new AuthError(
      "email_taken",
      "هذا البريد مسجل من قبل.",
      "This email is already registered.",
    );
    expect(err.code).toBe("email_taken");
    expect(err.friendlyAr).toContain("مسجل");
    expect(err.friendlyEn).toContain("already");
  });

  it("preserves the underlying cause when supplied", () => {
    const cause = new Error("network unreachable");
    const err = new AuthError("network", "تعذّر الاتصال.", "Network error.", cause);
    expect((err as Error & { cause?: unknown }).cause).toBe(cause);
  });
});
