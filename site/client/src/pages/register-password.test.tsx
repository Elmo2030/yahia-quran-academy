/**
 * The register form must say why it refused a password.
 *
 * Supabase's leaked-password check is a paid feature, so the form does its own
 * — and a check that only greys out the submit button teaches the reader
 * nothing, which is the mistake the resend button made. This drives the real
 * page: the message and the disabled button only meet on screen.
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: () => true,
  mightHaveSession: () => false,
  getSupabase: async () => ({
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }) }) }),
  }),
}));

import { AuthProvider } from "@/contexts/AuthContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Register from "@/pages/Register";

const show = () => {
  window.history.pushState({}, "", "/register");
  return render(
    <ThemeProvider><LocaleProvider><AuthProvider><Register /></AuthProvider></LocaleProvider></ThemeProvider>,
  );
};

const field = (id: string) => screen.getByTestId(id) as HTMLInputElement;
const type = (id: string, value: string) => fireEvent.change(field(id), { target: { value } });
const submit = () => screen.getByTestId("register-submit") as HTMLButtonElement;

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

describe("the register form's password check", () => {
  it("refuses a common password and says so", async () => {
    show();
    await waitFor(() => expect(field("register-password")).toBeTruthy());

    type("register-email", "ahmed@example.com");
    type("register-password", "12345678");

    const alert = await screen.findByRole("alert");
    expect(alert.textContent, "it explains rather than just greying out").toMatch(/استخدام|used/);
    expect(submit().disabled, "and the button is closed").toBe(true);
  });

  it("refuses the reader's own address as their password", async () => {
    show();
    await waitFor(() => expect(field("register-password")).toBeTruthy());

    type("register-email", "kareem@example.com");
    type("register-password", "kareem-2026");

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/اسمك|بريدك|your name|your email/);
    expect(submit().disabled).toBe(true);
  });

  it("lets an ordinary password through", async () => {
    show();
    await waitFor(() => expect(field("register-password")).toBeTruthy());

    type("register-name", "أحمد");
    type("register-email", "ahmed@example.com");
    type("register-password", "marmalade-window-7");
    type("register-confirm", "marmalade-window-7");

    expect(screen.queryByRole("alert"), "nothing to complain about").toBeNull();
    await waitFor(() => expect(submit().disabled).toBe(false));
  });
});
