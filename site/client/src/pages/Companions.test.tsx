import { beforeEach, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { HIFZ_KEY, createProfile, emptyStore, loadStore, saveStore, selectProfile, recordLearningStep } from "@/lib/hifz-store";
import { resetHifzStoreCache } from "@/hooks/useHifzStore";
import { companionIndex } from "@/lib/companion-index.generated";
import { loadCompanion } from "@/content/companions";
import { nextCompanion } from "@/lib/companions-progress";
import { childJourneyActivities } from "@/components/ChildJourney";
import { metaForPath } from "@/lib/page-meta";
import Companions from "./Companions";

vi.mock("@/hooks/useAuth", () => ({ default: () => ({ session: null, profile: null }), useAuth: () => ({ session: null, profile: null }) }));
beforeEach(() => { vi.spyOn(window, "scrollTo").mockImplementation(() => {}); localStorage.clear(); resetHifzStoreCache(); window.history.replaceState({}, "", "/companions"); });
const mount = () => render(<ThemeProvider><LocaleProvider><Companions /></LocaleProvider></ThemeProvider>);
const child = () => {
  const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
  if (!a.ok) throw Error(a.reason);
  return a;
};

it("loads all 30 supplied companions in order with structured sources and matching metadata", async () => {
  expect(companionIndex.map(c => c.order)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
  for (const entry of companionIndex) {
    const story = await loadCompanion(entry.slug);
    expect(story?.name).toBe(entry.name);
    expect(story?.sections.length).toBeGreaterThan(1);
    expect(story?.tryToday.length).toBeGreaterThan(0);
    expect(story?.sources.length).toBeGreaterThan(0);
    expect(story?.sources.every(s => s.reference && s.type)).toBe(true);
    expect(story?.challenge.question).toBe(story?.questions[0]);
    expect(story?.challenge.options[story.challenge.correctAnswer]).toBeTruthy();
    expect(story?.reviewStatus).toBe("scholar_review_required");
    expect(metaForPath(`/companions/${entry.slug}`)).toMatchObject({ arabicOnly: true, description: entry.description });
  }
  expect(await loadCompanion("../abu-bakr")).toBeNull();
  const view = mount();
  const list = screen.getByRole("list", { name: "قصص الصحابة" });
  const links = within(list).getAllByRole("link");
  expect(links).toHaveLength(30);
  links.forEach((link, i) => expect(link).toHaveAttribute("href", `/companions/${companionIndex[i].slug}`));
  expect(view.container.querySelector("#main-content")).toHaveAttribute("dir", "rtl");
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
});

it("invalid content cannot create progress and supplies a recovery link", async () => {
  const a = child(); saveStore(a.store);
  window.history.replaceState({}, "", "/companions/missing"); mount();
  await screen.findByRole("heading", { name: "لم نجد هذه القصة" });
  expect(loadStore().profiles[0].steps).toEqual({});
  expect(screen.getByRole("link", { name: "العودة إلى الصحابة" })).toHaveAttribute("href", "/companions");
  expect(metaForPath("/companions/missing").noindex).toBe(true);
});

it("starts only for a named child, completes on a correct answer, reloads and isolates profile switching", async () => {
  const a = child();
  const b = createProfile(a.store, { name: "Yusuf", character: "yahya" });
  if (!b.ok) throw Error(b.reason);
  saveStore(selectProfile(b.store, a.profile.id));
  window.history.replaceState({}, "", "/companions/abu-bakr");
  let view = mount();
  await screen.findByRole("button", { name: "أبو بكر الصديق" });
  const record = (id: string) => loadStore().profiles.find(p => p.id === id)!.steps["companions:abu-bakr"];
  // Opening the story records the step from an effect, which can land after
  // the first button is on screen when the whole suite runs in parallel.
  await waitFor(() => expect(record(a.profile.id)?.status).toBe("in_progress"));
  const startedAt = record(a.profile.id).startedAt;
  fireEvent.click(screen.getByRole("button", { name: "عمر بن الخطاب" }));
  expect(record(a.profile.id).status).toBe("in_progress");
  expect(screen.queryByRole("img", { name: /قيمة اكتشفتها/ })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "أبو بكر الصديق" }));
  expect(record(a.profile.id)).toMatchObject({ status: "done", startedAt });
  expect(screen.getByRole("img", { name: "قيمة اكتشفتها: الوفاء" })).toBeTruthy();
  expect(screen.getByRole("link", { name: /القصة التالية/ })).toHaveAttribute("href", "/companions/umar");
  view.unmount(); resetHifzStoreCache(); view = mount();
  expect(await screen.findByRole("button", { name: "أبو بكر الصديق" })).toBeDisabled();
  act(() => { saveStore(selectProfile(loadStore(), b.profile.id)); window.dispatchEvent(new StorageEvent("storage", { key: HIFZ_KEY })); });
  expect(screen.getByRole("button", { name: "أبو بكر الصديق" })).toBeEnabled();
  await waitFor(() => expect(record(b.profile.id)?.status).toBe("in_progress"));
  expect(record(a.profile.id).status).toBe("done");
  expect(screen.getByText(/صحيح البخاري، حديث 3654/)).toBeTruthy();
});

it("does not persist anonymous answers and explains Arabic content in English mode", async () => {
  window.history.replaceState({}, "", "/companions/abu-bakr?lang=en"); mount();
  fireEvent.click(await screen.findByRole("button", { name: "أبو بكر الصديق" }));
  expect(loadStore().profiles).toHaveLength(0);
  expect(screen.getByText(/These stories are available in Arabic/)).toBeTruthy();
});

it("uses latest valid incomplete story, then editorial next, without leaking children or changing Hifz priority", () => {
  const a = child();
  const b = createProfile(a.store, { name: "Yusuf", character: "yahya" });
  if (!b.ok) throw Error(b.reason);
  let store = recordLearningStep(b.store, a.profile.id, { kind: "companions", slug: "abu-bakr" }, "in_progress", 100);
  store = recordLearningStep(store, a.profile.id, { kind: "companions", slug: "umar" }, "in_progress", 200);
  store = recordLearningStep(store, a.profile.id, { kind: "companions", slug: "missing" }, "in_progress", 300);
  let profile = store.profiles.find(p => p.id === a.profile.id)!;
  expect(nextCompanion(profile)?.slug).toBe("umar");
  expect(nextCompanion(store.profiles.find(p => p.id === b.profile.id)!)?.slug).toBe("abu-bakr");
  const journey = childJourneyActivities("ar", profile.id, profile);
  expect(journey.activities.find(a => a.kind === "companions")).toMatchObject({ href: "/companions/umar", title: expect.stringContaining("تابع:") });
  expect(journey.primary.href).toMatch(/^\/hifz/);
  store = recordLearningStep(store, profile.id, { kind: "companions", slug: "umar" }, "done", 400);
  profile = store.profiles.find(p => p.id === profile.id)!;
  expect(nextCompanion(profile)?.slug).toBe("abu-bakr");
  for (const c of companionIndex) store = recordLearningStep(store, profile.id, { kind: "companions", slug: c.slug }, "done", 500);
  expect(nextCompanion(store.profiles.find(p => p.id === profile.id)!) ).toBeNull();
});
