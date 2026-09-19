import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// The station hub must remain usable without importing every Seerah narrative.
vi.mock("@/content/seerah", () => {
  throw new Error("The Seerah content module must not load for the hub");
});
vi.mock("@/hooks/useAuth", () => ({
  default: () => ({ session: null }),
  useAuth: () => ({ session: null }),
}));

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Seerah from "./Seerah";

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, "", "/seerah");
});

describe("Seerah hub loading", () => {
  it("renders the station journey from the lightweight index", () => {
    render(<ThemeProvider><LocaleProvider><Seerah /></LocaleProvider></ThemeProvider>);

    expect(screen.getByRole("heading", { name: "السيرة النبوية ﷺ" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /عام الفيل ومولد النبي/i })).toBeTruthy();
  });
});
