import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
  it("shows only each child's own activity, with correct counts, links and encouragement", () => {
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

    // Amina's card names her story once, with a correct link, and nothing of Yousef's.
    expect(within(aminaCard).getByText("خلّص قصة واحدة")).toBeTruthy();
    expect(within(aminaCard).getByRole("link", { name: /أصحاب الكهف/ })).toHaveAttribute("href", "/stories/nations/ashab-al-kahf");
    expect(within(aminaCard).queryByText(/آية/)).toBeNull();
    // Nothing due, nothing in progress: no encouragement line for her.
    expect(within(aminaCard).queryByText("شجّعه على")).toBeNull();

    // Yousef's card shows the due review as his encouragement, and none of Amina's story.
    expect(within(yousefCard).getByText("شجّعه على")).toBeTruthy();
    expect(within(yousefCard).getByRole("link", { name: "آية واحدة مستحقة المراجعة اليوم" })).toHaveAttribute("href", "/hifz");
    expect(within(yousefCard).queryByText(/أصحاب الكهف/)).toBeNull();
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
});
