import { beforeEach, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdventureJourney } from "./AdventureJourney";
import { WorldLandscape } from "./JourneyWorldMap";
import { createProfile, emptyStore, saveStore, selectProfile, markStoryDone, startStory, HIFZ_KEY, submitRecital } from "@/lib/hifz-store";
import { resetHifzStoreCache } from "@/hooks/useHifzStore";
import { journeyWorldProgress, journeyWorlds, worldState } from "@/lib/journey-worlds";
import { saveFactDiscoveries } from "@/lib/quran-facts-progress";
import { factIndex } from "@/lib/page-index.generated";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ session: null, profile: null }) }));
beforeEach(() => { localStorage.clear(); resetHifzStoreCache(); window.history.replaceState({}, "", "/journey"); });
const mount = () => render(<ThemeProvider><LocaleProvider><AdventureJourney /></LocaleProvider></ThemeProvider>);

it("offers real live destinations and non-interactive future worlds without granting rewards to a new visitor", () => {
  mount();
  expect(screen.getByRole("heading", { name: "رحلتي" })).toBeTruthy();
  expect(screen.getByTestId("journey-next-step")).toHaveAttribute("href", "/hifz");
  const map = screen.getByRole("region", { name: "خريطة عوالم رحلتي" });
  expect(within(map).getAllByRole("link")).toHaveLength(7);
  expect(within(map).getByLabelText("آداب الإسلام — قريبًا")).toHaveAttribute("aria-disabled", "true");
  expect(within(map).getByRole("link", { name: /الصحابة/ })).toHaveAttribute("href", "/companions/abu-bakr");
  expect(screen.getByText(/ستظهر هنا مكافآتك/)).toBeTruthy();
});

it("preserves named-child continuation, derived achievements and isolation after switching and reloading", () => {
  const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
  if (!a.ok) throw Error(a.reason);
  const b = createProfile(a.store, { name: "Yusuf", character: "yahya" });
  if (!b.ok) throw Error(b.reason);
  const done = markStoryDone(b.store, a.profile.id, "nations", "luqman", 100);
  const started = startStory(done, a.profile.id, "nations", "ashab-al-kahf", 200);
  saveStore(selectProfile(started, a.profile.id));
  saveFactDiscoveries(factIndex.slice(0, 20).map(f => f.slug), a.profile.id);
  let view = mount();
  expect(screen.getByRole("link", { name: /قصص القرآن — متاح للاستكشاف/ })).toHaveAttribute("href", "/stories/nations/ashab-al-kahf");
  expect(screen.getByRole("link", { name: "وسام مرحلة الاكتشاف 1" })).toBeTruthy();
  expect(journeyWorldProgress(started.profiles[0], []).stories.count).toBe(1);
  act(() => { saveStore(selectProfile(started, b.profile.id)); window.dispatchEvent(new StorageEvent("storage", { key: HIFZ_KEY })); });
  expect(screen.queryByRole("link", { name: "وسام مرحلة الاكتشاف 1" })).toBeNull();
  expect(screen.getByRole("link", { name: /قصص القرآن — متاح للاستكشاف/ })).toHaveAttribute("href", "/stories");
  view.unmount();
  saveStore(selectProfile(started, a.profile.id)); resetHifzStoreCache(); view = mount();
  expect(screen.getByRole("link", { name: /قصص القرآن — متاح للاستكشاف/ })).toHaveAttribute("href", "/stories/nations/ashab-al-kahf");
  view.unmount();
});

it("keeps the existing parent-review priority as the current mission in English", () => {
  const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
  if (!a.ok) throw Error(a.reason);
  saveStore(submitRecital(a.store, a.profile.id, 114, 1, 3, "test-recording", 1000));
  window.history.replaceState({}, "", "/journey?lang=en");
  mount();
  expect(screen.getByRole("heading", { name: "My journey" })).toBeTruthy();
  expect(screen.getByTestId("journey-next-step")).toHaveAttribute("href", "/hifz/parent");
  expect(screen.getByRole("heading", { name: "Your recitation is waiting for a parent" })).toBeTruthy();
});

it("derives completion only from all valid records and keeps unconfigured worlds locked", () => {
  const world = journeyWorlds.find(w => w.id === "stories")!;
  expect(worldState(world, "hifz", { count: 1, total: 42 })).toBe("available");
  expect(worldState(world, "hifz", { count: 42, total: 42 })).toBe("completed");
  expect(worldState({ ...world, href: undefined }, "hifz")).toBe("locked");
  expect(journeyWorldProgress(null, ["invalid-slug"]).facts.count).toBe(0);
});

it("falls back to existing landscape art if a future custom illustration is unavailable", () => {
  const view = render(<WorldLandscape world={{ ...journeyWorlds[0], illustration: "/missing-world.webp" }} />);
  const image = view.container.querySelector("img")!;
  fireEvent.error(image);
  expect(image).toHaveAttribute("src", "/hifz-art/map/1-oasis-720.webp");
  expect(view.container.querySelector("svg")).not.toBeNull();
});
