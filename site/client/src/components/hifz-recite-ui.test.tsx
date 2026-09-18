import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { askForPractice, createProfile, declareMemorized, emptyStore, submitRecital, type HifzStore } from "@/lib/hifz-store";

const state = vi.hoisted(() => ({ store: null as HifzStore | null }));

vi.mock("@/hooks/useHifzStore", () => ({
  useHifzStore: () => ({ store: state.store, update: vi.fn() }),
}));
vi.mock("@/hooks/useRecorder", () => ({
  useRecorder: () => ({ state: "idle", seconds: 0, error: null, latest: null, clipUrl: null, start: vi.fn(), stop: vi.fn() }),
}));
vi.mock("@/components/SiteChrome", () => ({ SiteChrome: () => null }));
vi.mock("@/components/HifzBottomBar", () => ({ HifzBottomBar: () => null }));
vi.mock("@/components/SkipLink", () => ({ SkipLink: () => null, MAIN_CONTENT_ID: "main" }));
vi.mock("@/lib/quran-content", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/quran-content")>();
  return { ...actual, loadSurah: vi.fn().mockResolvedValue([]) };
});

import HifzRecite from "@/pages/HifzRecite";
import { LocaleProvider } from "@/contexts/LocaleContext";

function storeWithRecital(status: "ready" | "needs_practice") {
  const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
  if (!created.ok) throw new Error(created.reason);
  let store = declareMemorized(created.store, created.profile.id, 114, 1, "child", 1);
  store = declareMemorized(store, created.profile.id, 114, 2, "child", 1);
  if (status === "needs_practice") {
    store = submitRecital(store, created.profile.id, 114, 1, 2, "recording", 2);
    store = askForPractice(store, created.profile.id, 114, 1, 2, undefined, 3);
  }
  return store;
}

function openRecite() {
  window.history.pushState({}, "", "/hifz/114/recite");
  return render(<LocaleProvider><HifzRecite /></LocaleProvider>);
}

describe("HifzRecite", () => {
  it("gives a ready child one clear start-reciting action before shortening", () => {
    state.store = storeWithRecital("ready");
    openRecite();

    expect(screen.getByRole("heading", { name: "جاهز للتسميع؟" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ابدأ التسميع/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /قصّر المقطع/ })).toBeInTheDocument();
  });

  it("frames a practice request as encouragement, never as a failure", () => {
    state.store = storeWithRecital("needs_practice");
    openRecite();

    expect(screen.getByText("المقطع ده محتاج تدريب شوية")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ابدأ التسميع/ })).toBeInTheDocument();
  });
});
