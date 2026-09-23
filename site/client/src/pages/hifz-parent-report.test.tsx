import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/recordings", () => ({
  listAllRecordings: async () => [],
  getRecording: async () => null,
  deleteRecording: async () => {},
  deleteProfileRecordings: async () => {},
  recordingsUse: async () => ({ bytes: 0, takes: 0 }),
  storageEstimate: async () => null,
}));

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ChildReport, copy } from "./HifzParent";
import {
  createProfile, declareMemorized, emptyStore, markStoryDone, startStory,
} from "@/lib/hifz-store";

const DAY = 86_400_000;
const NOW = Date.now();

function twoChildren() {
  let store = emptyStore();
  const a = createProfile(store, { name: "Amina", character: "fatima" });
  if (!a.ok) throw new Error(a.reason);
  store = a.store;
  const b = createProfile(store, { name: "Yousef", character: "yahya" });
  if (!b.ok) throw new Error(b.reason);
  store = b.store;

  // Amina finished a real story this week — no ayahs at all.
  store = startStory(store, a.profile.id, "nations", "ashab-al-kahf", NOW);
  store = markStoryDone(store, a.profile.id, "nations", "ashab-al-kahf", NOW);

  // Yousef has an ayah due for review and nothing else.
  store = declareMemorized(store, b.profile.id, 114, 1, "child", NOW - 2 * DAY);

  return { store, aminaId: a.profile.id, yousefId: b.profile.id };
}

describe("ChildReport", () => {
  beforeEach(() => localStorage.clear());

  it("shows only each child's own activity, with correct counts and encouragement", () => {
    const { store, aminaId, yousefId } = twoChildren();
    const amina = store.profiles.find(p => p.id === aminaId)!;
    const yousef = store.profiles.find(p => p.id === yousefId)!;

    render(
      <LocaleProvider>
        <div>
          <div data-testid="amina"><ChildReport t={copy.ar} profile={amina} store={store} commit={() => true} /></div>
          <div data-testid="yousef"><ChildReport t={copy.ar} profile={yousef} store={store} commit={() => true} /></div>
        </div>
      </LocaleProvider>,
    );

    const aminaCard = screen.getByTestId("amina");
    const yousefCard = screen.getByTestId("yousef");

    // Amina's card names her story once, and nothing of Yousef's.
    expect(within(aminaCard).getByText("خلّص قصة واحدة")).toBeTruthy();
    expect(within(aminaCard).getByText(/أصحاب الكهف/)).toBeTruthy();
    expect(within(aminaCard).queryByText(/آية/)).toBeNull();
    // Nothing due, nothing in progress: no encouragement line for her.
    expect(within(aminaCard).queryByText("شجّعه على")).toBeNull();

    // Yousef's card shows the due review as his encouragement, and none of Amina's story.
    expect(within(yousefCard).getByText("شجّعه على")).toBeTruthy();
    expect(within(yousefCard).getByText("آية واحدة تحتاج مراجعة اليوم")).toBeTruthy();
    expect(within(yousefCard).queryByText(/أصحاب الكهف/)).toBeNull();
  });

  it("never links a recent item, and only links encouragement for the active profile", () => {
    const { store, aminaId, yousefId } = twoChildren();
    // Yousef is the device's active profile; Amina is not.
    const active = { ...store, activeProfileId: yousefId };
    const amina = active.profiles.find(p => p.id === aminaId)!;
    const yousef = active.profiles.find(p => p.id === yousefId)!;

    const { rerender } = render(
      <LocaleProvider>
        <div>
          <div data-testid="amina"><ChildReport t={copy.ar} profile={amina} store={active} commit={() => true} /></div>
          <div data-testid="yousef"><ChildReport t={copy.ar} profile={yousef} store={active} commit={() => true} /></div>
        </div>
      </LocaleProvider>,
    );

    let aminaCard = screen.getByTestId("amina");
    let yousefCard = screen.getByTestId("yousef");

    // Amina is not active: her recent list and encouragement carry no <a> at all,
    // even though the content behind them (her finished story) is still named.
    expect(aminaCard.querySelector(".hifz-report__recent a")).toBeNull();
    expect(aminaCard.querySelector(".hifz-report__encourage a")).toBeNull();
    expect(within(aminaCard).getByText(/أصحاب الكهف/)).toBeTruthy();

    // Recent is never a link even for the active profile...
    expect(yousefCard.querySelector(".hifz-report__recent a")).toBeNull();
    // ...but encouragement is, because Yousef is the active profile.
    expect(yousefCard.querySelector(".hifz-report__encourage a")).not.toBeNull();
    expect(within(yousefCard).getByRole("link", { name: "آية واحدة تحتاج مراجعة اليوم" })).toHaveAttribute("href", "/hifz");

    // Flip which profile is active: Yousef still has the exact same review
    // due, so this proves the condition actually gates on activeProfileId
    // rather than always matching whichever card happens to have a review.
    const flipped = { ...store, activeProfileId: aminaId };
    const aminaFlipped = flipped.profiles.find(p => p.id === aminaId)!;
    const yousefFlipped = flipped.profiles.find(p => p.id === yousefId)!;
    rerender(
      <LocaleProvider>
        <div>
          <div data-testid="amina"><ChildReport t={copy.ar} profile={aminaFlipped} store={flipped} commit={() => true} /></div>
          <div data-testid="yousef"><ChildReport t={copy.ar} profile={yousefFlipped} store={flipped} commit={() => true} /></div>
        </div>
      </LocaleProvider>,
    );
    aminaCard = screen.getByTestId("amina");
    yousefCard = screen.getByTestId("yousef");

    // Yousef is no longer active: his review-due encouragement still shows
    // as text, but it must not be a link.
    expect(within(yousefCard).getByText("آية واحدة تحتاج مراجعة اليوم")).toBeTruthy();
    expect(yousefCard.querySelector(".hifz-report__encourage a")).toBeNull();
    expect(aminaCard.querySelector(".hifz-report__recent a")).toBeNull();
  });

  it("shows the quiet no-activity line when a week is empty", () => {
    const store = emptyStore();
    const created = createProfile(store, { name: "Sara", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const sara = created.store.profiles[0];

    render(
      <LocaleProvider>
        <ChildReport t={copy.ar} profile={sara} store={created.store} commit={() => true} />
      </LocaleProvider>,
    );

    expect(screen.getByText("لا نشاط هذا الأسبوع")).toBeTruthy();
  });

  it("ignores a fact date left behind after the discovered list moved on without it", () => {
    const store = emptyStore();
    const created = createProfile(store, { name: "Lina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const lina = created.store.profiles[0];

    // A date exists for "bismillah", but the undated list — what the facts
    // journey itself treats as actually discovered — does not include it.
    // Drift like this must not surface as a discovery that never happened.
    localStorage.setItem(`yahya.facts.discovered-at.v1:${lina.id}`, JSON.stringify({ bismillah: Date.now() }));
    localStorage.setItem(`yahya.facts.discovered.v1:${lina.id}`, JSON.stringify([]));

    render(
      <LocaleProvider>
        <ChildReport t={copy.ar} profile={lina} store={created.store} commit={() => true} />
      </LocaleProvider>,
    );

    expect(screen.getByText("لا نشاط هذا الأسبوع")).toBeTruthy();
    expect(screen.queryByText(/اكتشف/)).toBeNull();
  });
});
