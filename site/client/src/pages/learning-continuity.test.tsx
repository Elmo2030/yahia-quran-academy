import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HIFZ_KEY, createProfile, emptyStore, loadStore, saveStore, selectProfile } from "@/lib/hifz-store";
import { resetHifzStoreCache } from "@/hooks/useHifzStore";
import { aqeedahCards } from "@/content/aqeedah";
import SeerahDetail from "./SeerahDetail";
import Aqeedah from "./Aqeedah";

vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null, profile: null }), useAuth: () => ({ session: null, profile: null }) }));

beforeEach(() => { vi.restoreAllMocks(); localStorage.clear(); resetHifzStoreCache(); });

it("keeps invalid Seerah and Aqeedah routes out of child progress", () => {
  const child = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
  if (!child.ok) throw Error(child.reason);
  saveStore(child.store);
  for (const [path, Component] of [["seerah", SeerahDetail], ["aqeedah", Aqeedah]] as const) {
    window.history.pushState({}, "", `/${path}/no-such-item`);
    const view = render(<ThemeProvider><LocaleProvider><Component /></LocaleProvider></ThemeProvider>);
    expect(loadStore().profiles[0].steps).toEqual({});
    view.unmount();
  }
});

it("warns on failed saving and lets the child retry without losing the completed state", async () => {
  const child = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
  if (!child.ok) throw Error(child.reason);
  saveStore(child.store);
  window.history.pushState({}, "", "/seerah/little-shepherd?lang=en");
  render(<ThemeProvider><LocaleProvider><SeerahDetail /></LocaleProvider></ThemeProvider>);
  // The English Seerah arrives in its own chunk; wait for the page before
  // making storage fail, so entering the story still records normally.
  const answer = await screen.findByRole("button", { name: "Shepherd" });
  const failure = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
  fireEvent.click(answer);
  expect(screen.getByRole("alert")).toHaveTextContent("could not be saved");
  failure.mockRestore();
  fireEvent.click(screen.getByRole("button", { name: "Retry saving" }));
  expect(screen.queryByRole("alert")).toBeNull();
  expect(loadStore().profiles[0].steps["seerah:little-shepherd"].status).toBe("done");
});

describe.each([
  { kind: "seerah", slug: "little-shepherd", locale: "ar", Component: SeerahDetail, answer: "رعي الأغنام", wrong: "الحدادة" },
  { kind: "seerah", slug: "little-shepherd", locale: "en", Component: SeerahDetail, answer: "Shepherd", wrong: "Blacksmith" },
  { kind: "aqeedah", slug: aqeedahCards[0].slug, locale: "ar", Component: Aqeedah, answer: aqeedahCards[0].challenge.options[aqeedahCards[0].challenge.correctAnswer], wrong: aqeedahCards[0].challenge.options[(aqeedahCards[0].challenge.correctAnswer + 1) % aqeedahCards[0].challenge.options.length] },
])("$kind / $locale detail", ({ kind, slug, locale, Component, answer, wrong }) => {
  it("starts on entry, completes only on the correct answer, survives reload and isolates a profile switch", async () => {
    const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!a.ok) throw Error(a.reason);
    const b = createProfile(a.store, { name: "Yusuf", character: "yahya" });
    if (!b.ok) throw Error(b.reason);
    saveStore(selectProfile(b.store, a.profile.id));
    window.history.pushState({}, "", `/${kind}/${slug}?lang=${locale}`);
    const mount = () => render(<ThemeProvider><LocaleProvider><Component /></LocaleProvider></ThemeProvider>);
    let view = mount();
    await screen.findByRole("button", { name: answer });
    const record = (id: string) => loadStore().profiles.find(p => p.id === id)!.steps[`${kind}:${slug}`];
    expect(record(a.profile.id).status).toBe("in_progress");
    const startedAt = record(a.profile.id).startedAt;
    fireEvent.click(screen.getByRole("button", { name: wrong }));
    expect(record(a.profile.id).status).toBe("in_progress");
    fireEvent.click(screen.getByRole("button", { name: answer }));
    expect(record(a.profile.id)).toMatchObject({ status: "done", startedAt });
    view.unmount(); resetHifzStoreCache(); view = mount();
    expect(screen.getByRole("button", { name: answer })).toBeDisabled();
    act(() => {
      saveStore(selectProfile(loadStore(), b.profile.id));
      window.dispatchEvent(new StorageEvent("storage", { key: HIFZ_KEY }));
    });
    expect(screen.getByRole("button", { name: answer })).toBeEnabled();
    expect(record(b.profile.id).status).toBe("in_progress");
    expect(record(a.profile.id).status).toBe("done");
    expect(screen.getByRole("link", { name: locale === "ar" ? "العودة إلى رحلتي" : "Back to my journey" })).toHaveAttribute("href", "/journey");
    view.unmount();
  });
});
