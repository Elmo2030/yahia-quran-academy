/**
 * Sign-up must not claim a session it does not have.
 *
 * With "Confirm email" enabled Supabase creates the user and returns
 * `session: null`, and no auth-state event fires. The old signUp discarded the
 * response and the page routed to /profile regardless, so the account was
 * created and the person was sent straight back to the registration form with
 * nothing said. This asserts the flag the page now branches on.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

const signUpMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: () => true,
  mightHaveSession: () => true,
  getSupabase: () => ({
    auth: {
      signUp: signUpMock,
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }) }) }),
  }),
}));

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function Probe() {
  const { signUp } = useAuth();
  return (
    <button
      onClick={async () => {
        const result = await signUp({
          email: "a@b.co", password: "pw", displayName: "A", preferredLocale: "ar",
        });
        document.title = String(result.needsEmailConfirmation);
      }}
    >
      go
    </button>
  );
}

describe("signUp", () => {
  beforeEach(() => signUpMock.mockReset());

  it("reports a withheld session when confirmation is pending", async () => {
    signUpMock.mockResolvedValue({ data: { user: { id: "1" }, session: null }, error: null });
    render(<AuthProvider><Probe /></AuthProvider>);
    screen.getByText("go").click();
    await waitFor(() => expect(document.title).toBe("true"));
  });

  it("reports no confirmation needed when a session comes back", async () => {
    signUpMock.mockResolvedValue({ data: { user: { id: "1" }, session: { access_token: "t" } }, error: null });
    render(<AuthProvider><Probe /></AuthProvider>);
    screen.getByText("go").click();
    await waitFor(() => expect(document.title).toBe("false"));
  });

  it("answers an already-registered email exactly like a new one, so sign-up cannot be used to find accounts", async () => {
    signUpMock.mockResolvedValue({ data: { user: null, session: null }, error: { message: "User already registered" } });
    render(<AuthProvider><Probe /></AuthProvider>);
    screen.getByText("go").click();
    await waitFor(() => expect(document.title).toBe("true"));
  });
});
