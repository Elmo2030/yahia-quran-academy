/**
 * Auth lifecycle from a cold first visit: Supabase configured, no stored
 * session, so the provider starts without loading the SDK. Signing in,
 * signing up, signing out and switching accounts must all reach the UI
 * without a reload.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";

type Listener = (event: string, session: unknown) => void;
const listeners = new Set<Listener>();
const sessionFor = (id: string) => ({ user: { id, email: `${id}@test.local`, email_confirmed_at: "2026-01-01" } });
const emit = (event: string, session: unknown) => listeners.forEach((l) => l(event, session));

const fakeClient = {
  auth: {
    getSession: vi.fn(async () => ({ data: { session: null } })),
    onAuthStateChange: vi.fn((cb: Listener) => {
      listeners.add(cb);
      return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } };
    }),
    signInWithPassword: vi.fn(async ({ email }: { email: string }) => {
      const session = sessionFor(email.split("@")[0]);
      queueMicrotask(() => emit("SIGNED_IN", session));
      return { data: { session, user: session.user }, error: null };
    }),
    signUp: vi.fn(async ({ email }: { email: string }) => {
      const session = sessionFor(email.split("@")[0]);
      queueMicrotask(() => emit("SIGNED_IN", session));
      return { data: { session, user: session.user }, error: null };
    }),
    signOut: vi.fn(async () => {
      queueMicrotask(() => emit("SIGNED_OUT", null));
      return { error: null };
    }),
  },
  from: vi.fn(() => ({
    select: () => ({ eq: (_c: string, id: string) => ({ maybeSingle: async () => ({ data: { id: `profile-${id}`, auth_user_id: id, display_name: id, preferred_locale: "ar", auth_provider: "email" }, error: null }) }) }),
  })),
};

vi.mock("@/lib/supabase", () => ({
  getSupabase: vi.fn(async () => fakeClient),
  isSupabaseConfigured: vi.fn(() => true),
  mightHaveSession: vi.fn(() => false),
}));

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

let api: ReturnType<typeof useAuth>;
function Probe() {
  api = useAuth();
  return <div data-testid="user">{api.session?.user.id ?? "signed-out"}</div>;
}
const shown = () => screen.getByTestId("user").textContent;

describe("auth lifecycle from a cold visit", () => {
  beforeEach(() => {
    listeners.clear();
    vi.clearAllMocks();
    render(<AuthProvider><Probe /></AuthProvider>);
  });

  it("does not load the SDK for a visitor who is only reading", async () => {
    await waitFor(() => expect(api.initialized).toBe(true));
    expect(shown()).toBe("signed-out");
    expect(fakeClient.auth.onAuthStateChange).not.toHaveBeenCalled();
  });

  it("shows the user right after signing in, without a reload", async () => {
    await act(() => api.signIn({ email: "alice@test.local", password: "secret123" }));
    await waitFor(() => expect(shown()).toBe("alice"));
  });

  it("shows the user right after a sign-up that returns a session", async () => {
    await act(async () => { await api.signUp({ email: "bob@test.local", password: "secret123", displayName: "Bob", preferredLocale: "ar" }); });
    await waitFor(() => expect(shown()).toBe("bob"));
  });

  it("clears the user on sign-out and shows the next account after switching", async () => {
    await act(() => api.signIn({ email: "alice@test.local", password: "secret123" }));
    await waitFor(() => expect(shown()).toBe("alice"));
    await act(() => api.signOut());
    await waitFor(() => expect(shown()).toBe("signed-out"));
    await act(() => api.signIn({ email: "bob@test.local", password: "secret123" }));
    await waitFor(() => expect(shown()).toBe("bob"));
    expect(fakeClient.auth.onAuthStateChange).toHaveBeenCalledTimes(1);
  });
});
