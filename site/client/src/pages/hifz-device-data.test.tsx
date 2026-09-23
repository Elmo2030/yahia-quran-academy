import { fireEvent, render, screen } from "@testing-library/react";
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
import { copy, DeviceData } from "./Hifz";
import { createProfile, emptyStore } from "@/lib/hifz-store";
import { discoverFact } from "@/lib/quran-facts-progress";

describe("DeviceData — removing a child", () => {
  beforeEach(() => localStorage.clear());

  it("removes the child's fact discoveries along with their profile", () => {
    const created = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const profile = created.store.profiles[0];

    discoverFact("bismillah", ["bismillah"], profile.id);
    expect(localStorage.getItem(`yahya.facts.discovered.v1:${profile.id}`)).toBeTruthy();
    expect(localStorage.getItem(`yahya.facts.discovered-at.v1:${profile.id}`)).toBeTruthy();

    render(
      <LocaleProvider>
        <DeviceData t={copy.ar} store={created.store} commit={() => true} profile={profile} />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByText(`احذف ملف ${profile.name}`));
    fireEvent.click(screen.getByText("نعم، احذف نهائيًا"));

    expect(localStorage.getItem(`yahya.facts.discovered.v1:${profile.id}`)).toBeNull();
    expect(localStorage.getItem(`yahya.facts.discovered-at.v1:${profile.id}`)).toBeNull();
  });
});
