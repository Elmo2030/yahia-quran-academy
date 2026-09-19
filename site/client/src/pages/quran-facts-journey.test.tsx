import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FACTS_DISCOVERED_KEY } from "@/lib/quran-facts-progress";
import { quranFacts } from "@/content/quran-facts";
import QuranFact from "./QuranFact";
import QuranFacts from "./QuranFacts";

vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null }), useAuth: () => ({ session: null }) }));

const renderPage = (page: React.ReactNode) => render(<ThemeProvider><LocaleProvider>{page}</LocaleProvider></ThemeProvider>);

beforeEach(() => { localStorage.clear(); window.history.pushState({}, "", "/quran-facts"); });

describe("the Quran discovery journey", () => {
  it("makes the first valid undiscovered fact the dominant current discovery and keeps later stages locked", async () => {
    renderPage(<QuranFacts />);
    await waitFor(() => expect(screen.getByRole("link", { name: /اكتشافك التالي.*سورة بلا بسملة.*اكتشف الآن/i })).toBeTruthy());
    expect(screen.getByRole("link", { name: /اكتشاف متاح.*مصر في القرآن/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /المرحلة الثانية.*اكتشفت 0 من 20/i })).toBeDisabled();
  });

  it("reveals a new fact before recording its discovery, and records it exactly once", async () => {
    window.history.pushState({}, "", "/quran-facts/bismillah");
    renderPage(<QuranFact />);
    expect(localStorage.getItem(FACTS_DISCOVERED_KEY)).toBeNull();
    fireEvent.click(await screen.findByRole("button", { name: "اكشف الاكتشاف" }));
    await waitFor(() => expect(JSON.parse(localStorage.getItem(FACTS_DISCOVERED_KEY) ?? "[]")).toEqual(["bismillah"]));
    expect(screen.getByText("اكتشفت معلومة جديدة")).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: /اكتشافي التالي/i }));
    expect(JSON.parse(localStorage.getItem(FACTS_DISCOVERED_KEY) ?? "[]")).toEqual(["bismillah"]);
  });

  it("opens an already discovered fact directly to knowledge without forcing the reveal", async () => {
    localStorage.setItem(FACTS_DISCOVERED_KEY, JSON.stringify(["bismillah"]));
    window.history.pushState({}, "", "/quran-facts/bismillah");
    renderPage(<QuranFact />);
    expect(await screen.findByText("اكتشفتها من قبل")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "اكشف الاكتشاف" })).toBeNull();
    expect(screen.getByText(quranFacts[0].body.ar)).toBeTruthy();
  });

  it("shows the stage completion surface after the final discovery in a stage", async () => {
    localStorage.setItem(FACTS_DISCOVERED_KEY, JSON.stringify(quranFacts.slice(0, 19).map(fact => fact.slug)));
    window.history.pushState({}, "", `/quran-facts/${quranFacts[19].slug}`);
    renderPage(<QuranFact />);
    fireEvent.click(await screen.findByRole("button", { name: "اكشف الاكتشاف" }));
    expect(await screen.findByText("اكتملت رحلة هذه المرحلة")).toBeTruthy();
  });

  it("uses the field journal as a view over the existing discovered state", async () => {
    localStorage.setItem(FACTS_DISCOVERED_KEY, JSON.stringify(["bismillah", "egypt"]));
    renderPage(<QuranFacts />);
    fireEvent.click(await screen.findByRole("button", { name: "اكتشافاتي" }));
    expect(screen.getByRole("heading", { name: "اكتشافاتي" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /سورة بلا بسملة/i })).toBeTruthy();
  });
});
