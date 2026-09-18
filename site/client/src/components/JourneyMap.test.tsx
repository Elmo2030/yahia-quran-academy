import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/contexts/LocaleContext", () => ({ useLocale: () => ({ locale: "en" }) }));

import { JourneyMap } from "@/components/JourneyMap";
import { activeProfile, approveRecital, createProfile, emptyStore, submitRecital } from "@/lib/hifz-store";

describe("JourneyMap", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("marks a surah whose recital a parent reviewed", () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    let store = submitRecital(created.store, created.profile.id, 114, 1, 2, "recital", 1000);
    store = approveRecital(store, created.profile.id, 114, 1, 2, undefined, 2000);

    render(<JourneyMap profile={activeProfile(store)!} currentSurah={114} />);
    expect(screen.getByText("Recital reviewed")).toBeInTheDocument();
  });
});
