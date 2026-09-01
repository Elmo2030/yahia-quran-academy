/**
 * Where the browser lands after Google or Apple sign in.
 *
 * That address is handed to Supabase, and the session comes back in the URL at
 * it — so an off-site address would hand someone's sign-in to another host.
 * The two pages that call this check the value first, but the check belongs at
 * the boundary, where it holds for whoever calls next.
 */
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";

type OAuthCall = { provider: string; options?: { redirectTo?: string } };
const signInWithOAuth = vi.fn<(input: OAuthCall) => Promise<{ error: null }>>(
  async () => ({ error: null }),
);

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: () => true,
  getSupabase: () => ({
    auth: {
      signInWithOAuth,
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    },
  }),
}));

const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>;
const landedOn = () => signInWithOAuth.mock.calls.at(-1)?.[0].options?.redirectTo;

describe("the OAuth landing address", () => {
  beforeEach(() => signInWithOAuth.mockClear());

  it("keeps a path on this site", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => { await result.current.signInWithProvider("google", "/read/18"); });
    expect(landedOn()).toBe("http://localhost:3000/read/18");
  });

  it.each([
    ["https://evil.example/steal", "an address on another host"],
    ["//evil.example/steal", "a protocol-relative address"],
    ["javascript:alert(1)", "a javascript: URL"],
    ["http://localhost:3000.evil.example", "a host that only looks like ours"],
  ])("refuses %s — %s", async (hostile) => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => { await result.current.signInWithProvider("google", hostile); });
    expect(landedOn()).toBe("http://localhost:3000/profile");
  });
});
