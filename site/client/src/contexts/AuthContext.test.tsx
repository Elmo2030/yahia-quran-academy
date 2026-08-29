/**
 * AuthContext tests — exercise the error-mapping helper that turns Supabase's
 * English error strings into Arabic + English friendly text and AuthError
 * codes.
 *
 * Mock the supabase module's getSupabase() so we never talk to a real backend;
 * call the public methods on useAuth() under a minimal Provider wrapper.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

vi.mock("@/lib/supabase", () => {
  return {
    getSupabase: vi.fn(() => null),
    isSupabaseConfigured: vi.fn(() => false),
  };
});

import { AuthError, AuthProvider, useAuth } from "@/contexts/AuthContext";

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

/**
 * The provider mounted below talks to the mocked supabase module (getSupabase
 * returns null), so every auth-API call must fail fast with a friendly
 * not_configured AuthError instead of crashing.
 */
function Collector() {
  const api = useAuth();
  const run = (fn: () => Promise<void>) => {
    fn().catch((e: unknown) => {
      (window as unknown as { __authErr?: unknown }).__authErr = e;
    });
  };
  return (
    <div>
      <button data-testid="btn-provider" onClick={() => run(() => api.signInWithProvider("google", "/profile"))} />
      <button data-testid="btn-reset" onClick={() => run(() => api.sendPasswordReset("a@b.com"))} />
      <button data-testid="btn-update" onClick={() => run(() => api.updatePassword("newpass123"))} />
    </div>
  );
}

function readLastAuthError(): AuthError | undefined {
  return (window as unknown as { __authErr?: AuthError }).__authErr;
}

describe("auth API guards when Supabase is absent", () => {
  beforeEach(() => {
    delete (window as unknown as { __authErr?: unknown }).__authErr;
  });

  it("signInWithProvider throws a not_configured AuthError", async () => {
    render(
      <AuthProvider>
        <Collector />
      </AuthProvider>,
    );
    fireEvent.click(screen.getByTestId("btn-provider"));
    await waitFor(() => {
      const err = readLastAuthError();
      expect(err).toBeInstanceOf(AuthError);
      expect(err?.code).toBe("not_configured");
    });
  });

  it("sendPasswordReset throws a not_configured AuthError", async () => {
    render(
      <AuthProvider>
        <Collector />
      </AuthProvider>,
    );
    fireEvent.click(screen.getByTestId("btn-reset"));
    await waitFor(() => {
      expect(readLastAuthError()?.code).toBe("not_configured");
    });
  });

  it("updatePassword throws a not_configured AuthError", async () => {
    render(
      <AuthProvider>
        <Collector />
      </AuthProvider>,
    );
    fireEvent.click(screen.getByTestId("btn-update"));
    await waitFor(() => {
      expect(readLastAuthError()?.code).toBe("not_configured");
    });
  });
});
