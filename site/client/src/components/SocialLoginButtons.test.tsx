/**
 * SocialLoginButtons tests — verify that only providers Supabase has enabled
 * get a button, and that clicking one delegates to
 * AuthContext.signInWithProvider() with the right provider + redirect target.
 */
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const signInWithProvider = vi.fn(async () => {});

vi.mock("@/contexts/LocaleContext", () => ({
  useLocale: () => ({ locale: "ar", setLocale: vi.fn() }),
}));

vi.mock("@/hooks/useAuth", () => ({
  default: () => ({ signInWithProvider, configured: true, initialized: true }),
}));

import { SocialLoginButtons } from "@/components/SocialLoginButtons";

describe("SocialLoginButtons", () => {
  it("renders a button only for enabled providers", () => {
    render(<SocialLoginButtons />);
    expect(screen.getByTestId("social-google")).toBeTruthy();
    // Apple is not enabled on the Supabase project, so it must not render —
    // a visible button there would fail with "provider is not enabled".
    expect(screen.queryByTestId("social-apple")).toBeNull();
  });

  it("delegates to signInWithProvider with a default redirect of /profile", async () => {
    render(<SocialLoginButtons />);
    fireEvent.click(screen.getByTestId("social-google"));
    await waitFor(() => expect(signInWithProvider).toHaveBeenCalledWith("google", "/profile"));
  });

  it("honours a passed-in next destination", async () => {
    render(<SocialLoginButtons next="/read" />);
    fireEvent.click(screen.getByTestId("social-google"));
    await waitFor(() => expect(signInWithProvider).toHaveBeenCalledWith("google", "/read"));
  });
});
