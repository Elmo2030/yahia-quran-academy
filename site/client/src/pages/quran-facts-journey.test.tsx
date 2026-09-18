import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FACTS_DISCOVERED_KEY } from "@/lib/quran-facts-progress";
import QuranFact from "./QuranFact";
import QuranFacts from "./QuranFacts";

vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null }), useAuth: () => ({ session: null }) }));

const renderPage = (page: React.ReactNode) => render(<ThemeProvider><LocaleProvider>{page}</LocaleProvider></ThemeProvider>);

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, "", "/quran-facts");
});

describe("the Quran facts journey", () => {
  it("shows the first stage as current and later stages as locked", async () => {
    renderPage(<QuranFacts />);

    await waitFor(() => expect(screen.getByRole("link", { name: /ابدأ من هنا.*سورة بلا بسملة/i })).toBeTruthy());
    expect(screen.getByRole("link", { name: /اكتشفها.*مصر في القرآن/i })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /المرحلة الثانية.*تُفتح قريبًا/i }));
    expect(screen.getByLabelText(/تُفتح قريبًا.*21/)).toBeTruthy();
  });

  it("records a detail-page visit in the same persistent progress source", async () => {
    window.history.pushState({}, "", "/quran-facts/bismillah");
    renderPage(<QuranFact />);

    await waitFor(() => expect(JSON.parse(localStorage.getItem(FACTS_DISCOVERED_KEY) ?? "[]")).toContain("bismillah"));
    expect(screen.getAllByRole("link", { name: "كل المعلومات" }).every(link => link.getAttribute("href") === "/quran-facts")).toBe(true);
  });
});
