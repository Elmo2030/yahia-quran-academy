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
import { createProfile, emptyStore, exportBackup } from "@/lib/hifz-store";
import { discoverFact, readFactDiscoveries, readFactDiscoveryDates } from "@/lib/quran-facts-progress";

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

describe("DeviceData — restoring a backup", () => {
  beforeEach(() => localStorage.clear());

  it("writes a backup's facts to storage once the restore is confirmed", async () => {
    const created = createProfile(emptyStore(), { name: "Lina", character: "fatima" });
    if (!created.ok) throw new Error(created.reason);
    const profile = created.store.profiles[0];
    const backupText = exportBackup(created.store, { [profile.id]: { discovered: ["bismillah"], at: { bismillah: 555 } } });
    const file = new File([backupText], "backup.json", { type: "application/json" });
    // jsdom's File has no working text() — the app only needs the content.
    Object.defineProperty(file, "text", { value: async () => backupText });

    render(
      <LocaleProvider>
        <DeviceData t={copy.ar} store={emptyStore()} commit={() => true} />
      </LocaleProvider>,
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(await screen.findByText("استبدل واسترجع"));

    expect(readFactDiscoveries(["bismillah"], profile.id)).toEqual(["bismillah"]);
    expect(readFactDiscoveryDates(profile.id)).toEqual({ bismillah: 555 });
  });

  it("clears the discoveries of a child the restored file does not have", async () => {
    // On the device: Omar, with a discovery. In the file: only Lina.
    const device = createProfile(emptyStore(), { name: "Omar", character: "yahya" });
    if (!device.ok) throw new Error(device.reason);
    const omar = device.store.profiles[0];
    discoverFact("egypt", ["egypt"], omar.id);

    const file = createProfile(emptyStore(), { name: "Lina", character: "fatima" });
    if (!file.ok) throw new Error(file.reason);
    const lina = file.store.profiles[0];
    const backupText = exportBackup(file.store, { [lina.id]: { discovered: ["bismillah"], at: { bismillah: 555 } } });
    const upload = new File([backupText], "backup.json", { type: "application/json" });
    Object.defineProperty(upload, "text", { value: async () => backupText });

    render(
      <LocaleProvider>
        <DeviceData t={copy.ar} store={device.store} commit={() => true} />
      </LocaleProvider>,
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await fireEvent.change(input, { target: { files: [upload] } });
    fireEvent.click(await screen.findByText("استبدل واسترجع"));

    expect(localStorage.getItem(`yahya.facts.discovered.v1:${omar.id}`)).toBeNull();
    expect(localStorage.getItem(`yahya.facts.discovered-at.v1:${omar.id}`)).toBeNull();
    expect(readFactDiscoveries(["bismillah"], lina.id)).toEqual(["bismillah"]);
  });
});

describe("DeviceData — restore wording", () => {
  it("counts children the Arabic way", () => {
    expect(copy.ar.importReady(1)).toContain("طفل واحد");
    expect(copy.ar.importReady(2)).toContain("طفلان");
    expect(copy.ar.importReady(3)).toContain("٣ أطفال");
    expect(copy.ar.importReady(11)).toContain("١١ طفلًا");
    expect(copy.ar.importReady(2)).not.toMatch(/[0-9]/);
  });
});
