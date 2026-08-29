/**
 * SocialLoginButtons tests — verify both provider buttons render and that
 * clicking them delegates to AuthContext.signInWithProvider() with the right
 * provider + default redirect target.
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
  it("renders Google and Apple buttons", () => {
    render(<SocialLoginButtons />);
    expect(screen.getByTestId("social-google")).toBeTruthy();
    expect(screen.getByTestId("social-apple")).toBeTruthy();
  });

  it("delegates to signInWithProvider with a default redirect of /profile", async () => {
    render(<SocialLoginButtons />);
    fireEvent.click(screen.getByTestId("social-google"));
    await waitFor(() => expect(signInWithProvider).toHaveBeenCalledWith("google", "/profile"));
    fireEvent.click(screen.getByTestId("social-apple"));
    await waitFor(() => expect(signInWithProvider).toHaveBeenCalledWith("apple", "/profile"));
  });

  it("honours a passed-in next destination", async () => {
    render(<SocialLoginButtons next="/read" />);
    fireEvent.click(screen.getByTestId("social-google"));
    await waitFor(() => expect(signInWithProvider).toHaveBeenCalledWith("google", "/read"));
  });
});
