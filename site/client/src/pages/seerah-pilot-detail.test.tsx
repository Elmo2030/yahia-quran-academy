import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/useAuth", () => ({
  default: () => ({ session: null, profile: null }),
  useAuth: () => ({ session: null, profile: null }),
}));

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SeerahDetail from "./SeerahDetail";

function renderDetail() {
  return render(<ThemeProvider><LocaleProvider><SeerahDetail /></LocaleProvider></ThemeProvider>);
}

describe("Station 1 Seerah content pilot", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, "", "/seerah/little-shepherd");
  });

  it("shows the reviewed Arabic pilot narrative for a Station 1 story", () => {
    renderDetail();

    expect(screen.getByRole("heading", { name: "راعي الغنم" })).toBeTruthy();
    expect(screen.getByText("صحيح البخاري 2262")).toBeTruthy();
    expect(screen.getByText(/كان محمد ﷺ يرعى الغنم لأهلها على قراريط/)).toBeTruthy();
    expect(screen.getByText(/المسؤولية تنمو عندما نعتني/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "٦–٨ سنوات" })).toBeNull();
  });

  it("keeps the existing English record until the pilot receives a reviewed translation", () => {
    window.history.pushState({}, "", "/seerah/little-shepherd?lang=en");
    renderDetail();

    expect(screen.getByRole("heading", { name: "The Little Shepherd" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "راعي الغنم" })).toBeNull();
  });
});
