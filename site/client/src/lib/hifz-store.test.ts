import { describe, expect, it } from "vitest";

import {
  HIFZ_KEY,
  MAX_BACKUP_BYTES,
  MAX_NAME_LENGTH,
  MAX_PROFILES,
  activeProfile,
  cleanName,
  createProfile,
  emptyStore,
  enterAsGuest,
  exportBackup,
  importBackup,
  loadStore,
  parseStore,
  removeProfile,
  saveStore,
  selectProfile,
  updateProfile,
  updateSettings,
  type HifzStore,
} from "./hifz-store";

function withChild(name = "يوسف", character: "yahya" | "fatima" = "yahya") {
  const result = createProfile(emptyStore(), { name, character });
  if (!result.ok) throw new Error(result.reason);
  return result;
}

function memoryStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(HIFZ_KEY, initial);
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    data,
  };
}

describe("profiles", () => {
  it("creates a child, makes them active, and starts from the default settings", () => {
    const { store, profile } = withChild("  مريم  ", "fatima");
    expect(profile.name).toBe("مريم");
    expect(profile.character).toBe("fatima");
    expect(profile.settings).toEqual({ repeat: 3, autoplayNext: true, reciter: "sheikh", fontStep: 1 });
    expect(activeProfile(store)?.id).toBe(profile.id);
  });

  it("refuses an empty name, a duplicate name, and a child past the limit", () => {
    expect(createProfile(emptyStore(), { name: "   ", character: "yahya" })).toEqual({ ok: false, reason: "name" });
    const { store } = withChild("Adam");
    expect(createProfile(store, { name: "adam", character: "fatima" })).toEqual({ ok: false, reason: "duplicate" });

    let full: HifzStore = emptyStore();
    for (let i = 0; i < MAX_PROFILES; i++) {
      const r = createProfile(full, { name: `child ${i}`, character: "yahya" });
      if (!r.ok) throw new Error(r.reason);
      full = r.store;
    }
    expect(createProfile(full, { name: "one more", character: "yahya" })).toEqual({ ok: false, reason: "limit" });
    // The guest is not a child in the count.
    expect(enterAsGuest(full).profiles).toHaveLength(MAX_PROFILES + 1);
  });

  it("cuts a long name by characters without splitting one", () => {
    const name = "عبدُ الرَّحمنِ ".repeat(5);
    const cleaned = cleanName(name);
    expect(Array.from(cleaned).length).toBeLessThanOrEqual(MAX_NAME_LENGTH);
    expect(cleanName("👨‍👩‍👧".repeat(30)).length).toBeGreaterThan(0);
  });

  it("strips control characters and bidi overrides from a name", () => {
    expect(cleanName("\u202Eمريم\u202C\u0007")).toBe("مريم");
    expect(cleanName("\u2067Ali\u2069 \n Omar")).toBe("Ali Omar");
    expect(createProfile(emptyStore(), { name: "\u202E\u200F", character: "yahya" })).toEqual({ ok: false, reason: "name" });
  });

  it("reuses the one guest instead of making another", () => {
    const once = enterAsGuest(emptyStore());
    const twice = enterAsGuest(selectProfile(once, null));
    expect(twice.profiles.filter(p => p.character === "guest")).toHaveLength(1);
    expect(activeProfile(twice)?.character).toBe("guest");
  });

  it("renames and changes character, but never gives the guest a name", () => {
    const { store, profile } = withChild("Sara", "fatima");
    const renamed = updateProfile(store, profile.id, { name: "Sarah", character: "yahya" });
    expect(renamed.ok && activeProfile(renamed.store)).toMatchObject({ name: "Sarah", character: "yahya" });

    const guestStore = enterAsGuest(store);
    const guest = activeProfile(guestStore)!;
    const result = updateProfile(guestStore, guest.id, { name: "Nobody", character: "fatima" });
    expect(result.ok && result.store.profiles.find(p => p.id === guest.id)).toMatchObject({ name: "", character: "guest" });
  });

  it("clears the active child when that child is removed", () => {
    const { store, profile } = withChild();
    const after = removeProfile(store, profile.id);
    expect(after.profiles).toHaveLength(0);
    expect(after.activeProfileId).toBeNull();
  });

  it("does not change the store it was given", () => {
    const { store, profile } = withChild();
    const snapshot = JSON.stringify(store);
    updateSettings(store, profile.id, { repeat: 5 });
    removeProfile(store, profile.id);
    expect(JSON.stringify(store)).toBe(snapshot);
  });
});

describe("settings", () => {
  it("keeps repeat between 1 and 5 and only known values elsewhere", () => {
    const { store, profile } = withChild();
    const high = updateSettings(store, profile.id, { repeat: 9 });
    expect(activeProfile(high)?.settings.repeat).toBe(5);
    const low = updateSettings(store, profile.id, { repeat: 0 });
    expect(activeProfile(low)?.settings.repeat).toBe(1);
    const odd = updateSettings(store, profile.id, { reciter: "someone" as never, fontStep: 7 as never });
    expect(activeProfile(odd)?.settings).toMatchObject({ reciter: "sheikh", fontStep: 1 });
  });
});

describe("parsing what is on the device", () => {
  it("returns an empty store for anything unreadable", () => {
    expect(loadStore(memoryStorage("{not json"))).toEqual(emptyStore());
    expect(loadStore(memoryStorage(JSON.stringify({ version: 99, profiles: [] })))).toEqual(emptyStore());
    expect(loadStore(undefined)).toEqual(emptyStore());
  });

  it("keeps the good profiles and drops the broken ones", () => {
    const good = withChild("Ali").profile;
    const store = parseStore({
      version: 1,
      activeProfileId: "missing",
      profiles: [
        good,
        { ...good }, // same id twice
        { id: "x", name: "", character: "yahya" }, // no name
        { id: "y", name: "Hind", character: "dragon" }, // unknown character
        { id: "g1", name: "", character: "guest" },
        { id: "g2", name: "", character: "guest" }, // a second guest
      ],
    });
    expect(store.profiles.map(p => p.id)).toEqual([good.id, "g1"]);
    expect(store.activeProfileId).toBeNull();
  });

  it("loads at most the child limit, and the guest on top of it wherever it sits", () => {
    const children = Array.from({ length: MAX_PROFILES + 2 }, (_, i) => ({ id: `c${i}`, name: `child ${i}`, character: "yahya" }));
    const store = parseStore({ version: 1, profiles: [...children, { id: "g", name: "", character: "guest" }] });
    expect(store.profiles.filter(p => p.character !== "guest")).toHaveLength(MAX_PROFILES);
    expect(store.profiles.some(p => p.id === "g")).toBe(true);
  });

  it("keeps only well-formed ayah records, and a declaration only with who made it", () => {
    const store = parseStore({
      version: 1,
      profiles: [{
        id: "a", name: "Omar", character: "yahya",
        ayahs: {
          "114:1": { listenedAt: 5, declaredAt: 9, declaredBy: "parent", reviews: [10, "x", -1] },
          "114:2": { declaredAt: 9 },
          "115:1": { listenedAt: 5 },
          "1:0": { listenedAt: 5 },
          "hello": {},
        },
      }],
    });
    expect(store.profiles[0].ayahs).toEqual({
      "114:1": { listenedAt: 5, declaredAt: 9, declaredBy: "parent", reviews: [10] },
      "114:2": { reviews: [] },
    });
  });

  it("round-trips through storage", () => {
    const storage = memoryStorage();
    const { store } = withChild("Huda", "fatima");
    expect(saveStore(store, storage)).toBe(true);
    expect(loadStore(storage)).toEqual(store);
  });

  it("reports a refused write instead of throwing", () => {
    const full = { setItem: () => { throw new DOMException("quota", "QuotaExceededError"); } };
    expect(saveStore(emptyStore(), full)).toBe(false);
  });
});

describe("backup", () => {
  it("restores what it exported, opening on the child picker", () => {
    const { store } = withChild("Zaid");
    const result = importBackup(exportBackup(store));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.profiles).toBe(1);
    expect(result.store.profiles).toEqual(store.profiles);
    expect(result.store.activeProfileId).toBeNull();
  });

  it("names what is wrong with a file that is not a backup", () => {
    expect(importBackup("hello")).toEqual({ ok: false, reason: "unreadable" });
    expect(importBackup(JSON.stringify({ app: "other", store: {} }))).toEqual({ ok: false, reason: "not-a-backup" });
    expect(importBackup(JSON.stringify({ app: "yahya-hifz", version: 2, store: {} }))).toEqual({ ok: false, reason: "newer-version" });
    expect(importBackup(exportBackup(emptyStore()))).toEqual({ ok: false, reason: "empty" });
    expect(importBackup(" ".repeat(MAX_BACKUP_BYTES + 1))).toEqual({ ok: false, reason: "too-large" });
  });
});
