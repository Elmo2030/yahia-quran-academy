import { describe, expect, it } from "vitest";

import {
  BACKUP_REMINDER_DAYS,
  HIFZ_KEY,
  MAX_BACKUP_BYTES,
  MAX_NAME_LENGTH,
  MAX_PROFILES,
  activeProfile,
  approveRecital,
  askForPractice,
  cleanName,
  backupIsStale,
  confirmDeclarations,
  confirmDeed,
  confirmedDeeds,
  createProfile,
  daysSinceBackup,
  declareMemorized,
  declineDeed,
  emptyStore,
  enterAsGuest,
  exportBackup,
  importBackup,
  inProgressStories,
  loadStore,
  markBackedUp,
  markListened,
  markNoteSeen,
  markReviewed,
  markRecorded,
  markStoryDone,
  parseStore,
  pendingDeeds,
  pendingRecitals,
  practiceRecitals,
  recitalEntrySegment,
  reviewedRecitals,
  registerDeed,
  removeProfile,
  restartReviews,
  saveStore,
  selectProfile,
  setParentLock,
  startStory,
  stepStatus,
  submitRecital,
  surahProgress,
  unseenNote,
  updateProfile,
  updateSettings,
  withdrawDeclaration,
  type HifzStore,
  type StepStoryInfo,
} from "./hifz-store";

// What Stories.tsx actually passes at the moment "عملتها" is pressed — a
// snapshot, not a lookup, so a test registering a deed does not need the
// content module either.
const SAMPLE_DEED_STORY: StepStoryInfo = {
  title: "قصة لقمان الحكيم",
  action: "اخفض صوتك اليوم في موضع كنتَ سترفعه فيه.",
  reward: { icon: "🌳", badge: "حكيم صغير", keepsake: "حصيرة الحكمة", note: "تذكّرك أن أغلى ما يورّثه الأب لابنه كلمة صادقة." },
};

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

  it("leaves the device's parent number out of the file, and keeps the one already here", () => {
    const lock = { salt: "s", hash: "sha256:abc", createdAt: 1 };
    const { store } = withChild("Rana");
    const locked = setParentLock(store, lock);
    expect(exportBackup(locked)).not.toContain("sha256:abc");

    const mine = { salt: "mine", hash: "sha256:zzz", createdAt: 2 };
    const onThisDevice = setParentLock(emptyStore(), mine);
    const restored = importBackup(exportBackup(locked), onThisDevice);
    expect(restored.ok && restored.store.parentLock).toEqual(mine);
  });

  it("names what is wrong with a file that is not a backup", () => {
    expect(importBackup("hello")).toEqual({ ok: false, reason: "unreadable" });
    expect(importBackup(JSON.stringify({ app: "other", store: {} }))).toEqual({ ok: false, reason: "not-a-backup" });
    expect(importBackup(JSON.stringify({ app: "yahya-hifz", version: 2, store: {} }))).toEqual({ ok: false, reason: "newer-version" });
    expect(importBackup(exportBackup(emptyStore()))).toEqual({ ok: false, reason: "empty" });
    expect(importBackup(" ".repeat(MAX_BACKUP_BYTES + 1))).toEqual({ ok: false, reason: "too-large" });
  });
});

describe("what a child did with an ayah", () => {
  it("records listening, recording and a declaration on the right child", () => {
    const { store, profile } = withChild("Bilal");
    const other = createProfile(store, { name: "Asma", character: "fatima" });
    if (!other.ok) throw new Error(other.reason);
    let s = markListened(other.store, profile.id, 114, 1, 100);
    s = markRecorded(s, profile.id, 114, 1, 200);
    s = declareMemorized(s, profile.id, 114, 1, "child", 300);
    const bilal = s.profiles.find(p => p.id === profile.id)!;
    expect(bilal.ayahs["114:1"]).toEqual({ listenedAt: 100, recordedAt: 200, declaredAt: 300, declaredBy: "child", reviews: [] });
    expect(s.profiles.find(p => p.id === other.profile.id)!.ayahs).toEqual({});
  });

  it("keeps the first declaration date and never downgrades a parent's word", () => {
    const { store, profile } = withChild();
    let s = declareMemorized(store, profile.id, 112, 2, "parent", 10);
    s = declareMemorized(s, profile.id, 112, 2, "child", 99);
    expect(activeProfile(s)!.ayahs["112:2"]).toMatchObject({ declaredAt: 10, declaredBy: "parent" });
    s = withdrawDeclaration(s, profile.id, 112, 2);
    expect(activeProfile(s)!.ayahs["112:2"]).toEqual({ reviews: [] });
  });

  it("ignores an ayah that cannot exist or a child who does not", () => {
    const { store, profile } = withChild();
    expect(markListened(store, profile.id, 115, 1)).toBe(store);
    expect(markListened(store, profile.id, 1, 0)).toBe(store);
    expect(markListened(store, "nobody", 1, 1)).toBe(store);
  });

  it("counts a surah's progress", () => {
    const { store, profile } = withChild();
    let s = markListened(store, profile.id, 113, 1, 1);
    s = markListened(s, profile.id, 113, 2, 1);
    s = markRecorded(s, profile.id, 113, 2, 1);
    s = declareMemorized(s, profile.id, 113, 5, "parent", 1);
    s = markListened(s, profile.id, 114, 1, 1); // another surah
    expect(surahProgress(activeProfile(s)!, 113, 5)).toEqual({ total: 5, listened: 2, recorded: 1, declared: 1 });
  });
});

describe("reviews", () => {
  it("records a review only for an ayah that was declared", () => {
    const { store, profile } = withChild("Nour");
    const notDeclared = markReviewed(store, profile.id, 114, 1, 50);
    expect(activeProfile(notDeclared)!.ayahs["114:1"]).toBeUndefined();

    let s = declareMemorized(store, profile.id, 114, 1, "child", 10);
    s = markReviewed(s, profile.id, 114, 1, 100);
    s = markReviewed(s, profile.id, 114, 1, 200);
    expect(activeProfile(s)!.ayahs["114:1"].reviews).toEqual([100, 200]);
  });

  it("marks a forgotten ayah without erasing the declaration or the reviews", () => {
    const { store, profile } = withChild();
    let s = declareMemorized(store, profile.id, 114, 1, "parent", 10);
    s = markReviewed(s, profile.id, 114, 1, 100);
    s = restartReviews(s, profile.id, 114, 1, 500);
    expect(activeProfile(s)!.ayahs["114:1"]).toEqual({ declaredAt: 10, declaredBy: "parent", reviews: [100], forgotAt: 500 });
    // Remembering it again clears the mark.
    s = markReviewed(s, profile.id, 114, 1, 900);
    expect(activeProfile(s)!.ayahs["114:1"]).toEqual({ declaredAt: 10, declaredBy: "parent", reviews: [100, 900] });
  });

  it("keeps at most the last thirty reviews", () => {
    const { store, profile } = withChild();
    let s = declareMemorized(store, profile.id, 114, 1, "child", 1);
    for (let i = 1; i <= 35; i++) s = markReviewed(s, profile.id, 114, 1, i * 10);
    const reviews = activeProfile(s)!.ayahs["114:1"].reviews;
    expect(reviews).toHaveLength(30);
    expect(reviews.at(-1)).toBe(350);
  });
});

describe("the parent's side", () => {
  it("keeps and clears the device lock", () => {
    const lock = { salt: "s", hash: "sha256:abc", createdAt: 10 };
    const locked = setParentLock(emptyStore(), lock);
    expect(locked.parentLock).toEqual(lock);
    expect(parseStore(JSON.parse(JSON.stringify(locked))).parentLock).toEqual(lock);
    expect(setParentLock(locked, null).parentLock).toBeUndefined();
  });

  it("puts the parent's name only on what the child already declared", () => {
    const { store, profile } = withChild("Yusra");
    let s = declareMemorized(store, profile.id, 112, 1, "child", 10);
    s = declareMemorized(s, profile.id, 112, 2, "parent", 20);
    s = markListened(s, profile.id, 112, 3, 30); // listened, never declared
    const after = confirmDeclarations(s, profile.id, 112, 1, 4);
    const ayahs = activeProfile(after)!.ayahs;
    expect(ayahs["112:1"]).toMatchObject({ declaredBy: "parent", declaredAt: 10 });
    expect(ayahs["112:2"]).toMatchObject({ declaredBy: "parent", declaredAt: 20 });
    expect(ayahs["112:3"].declaredAt).toBeUndefined();
    // Nothing left to confirm leaves the store alone.
    expect(confirmDeclarations(after, profile.id, 112, 1, 4)).toBe(after);
  });
});

describe("the backup reminder", () => {
  const DAY = 86_400_000;
  const NOW = 1_800_000_000_000;

  it("knows nothing was ever saved, and asks once there is a child to lose", () => {
    expect(daysSinceBackup(emptyStore(), NOW)).toBeNull();
    // An empty device has nothing worth reminding anyone about.
    expect(backupIsStale(emptyStore(), NOW)).toBe(false);
    expect(backupIsStale(withChild("Amina").store, NOW)).toBe(true);
  });

  it("counts the days since the last copy and asks again after a month", () => {
    const { store } = withChild("Amina");
    const saved = markBackedUp(store, NOW - 3 * DAY);
    expect(daysSinceBackup(saved, NOW)).toBe(3);
    expect(backupIsStale(saved, NOW)).toBe(false);

    const old = markBackedUp(store, NOW - BACKUP_REMINDER_DAYS * DAY);
    expect(backupIsStale(old, NOW)).toBe(true);
  });

  it("survives a reload and stays out of the backup file itself", () => {
    const saved = markBackedUp(withChild("Amina").store, NOW);
    expect(parseStore(JSON.parse(JSON.stringify(saved))).lastBackupAt).toBe(NOW);
    expect(exportBackup(saved)).not.toContain("lastBackupAt");
  });
});

describe("steps beyond an ayah", () => {
  it("reads a v1 store saved before steps existed as having none, not as empty", () => {
    const { store, profile } = withChild("Amina");
    // What a pre-steps device actually had on disk: no `steps` key at all.
    const { steps: _steps, ...profileWithoutSteps } = profile;
    const onDisk = { ...store, profiles: [profileWithoutSteps] };
    const parsed = parseStore(JSON.parse(JSON.stringify(onDisk)));
    expect(parsed.profiles).toHaveLength(1);
    expect(parsed.profiles[0].steps).toEqual({});
  });

  it("registers a deed once and ignores a second try at the same story", () => {
    const { store, profile } = withChild("Amina");
    const once = registerDeed(store, profile.id, "nations", "luqman", SAMPLE_DEED_STORY, 1000);
    expect(stepStatus(activeProfile(once)!, { kind: "deed", chapter: "nations", slug: "luqman" })).toBe("awaiting_parent");

    const again = registerDeed(once, profile.id, "nations", "luqman", SAMPLE_DEED_STORY, 2000);
    // Same store, not merely an equal one: the second call changed nothing.
    expect(again).toBe(once);
  });

  it("drops a malformed story snapshot but keeps the step's own status", () => {
    const { store, profile } = withChild("Amina");
    const registered = registerDeed(store, profile.id, "nations", "luqman", SAMPLE_DEED_STORY);
    const onDisk = JSON.parse(JSON.stringify(registered));
    // A hand-edited or truncated entry: the reward lost its "note".
    delete onDisk.profiles[0].steps["deed:nations:luqman"].story.reward.note;
    const parsed = parseStore(onDisk);
    const record = activeProfile(parsed)!.steps["deed:nations:luqman"];
    expect(record.status).toBe("awaiting_parent");
    expect(record.story).toBeUndefined();
  });

  it("keeps the story's wording and reward on the record, for a parent who confirms it later", () => {
    const { store, profile } = withChild("Amina");
    const registered = registerDeed(store, profile.id, "nations", "luqman", SAMPLE_DEED_STORY);
    expect(activeProfile(registered)!.steps["deed:nations:luqman"].story).toEqual(SAMPLE_DEED_STORY);
  });

  it("moves a deed from awaiting to reviewed only once a parent confirms it", () => {
    const { store, profile } = withChild("Amina");
    const registered = registerDeed(store, profile.id, "nations", "luqman", SAMPLE_DEED_STORY);
    expect(pendingDeeds(activeProfile(registered)!)).toEqual([
      { chapter: "nations", slug: "luqman", record: expect.objectContaining({ status: "awaiting_parent" }) },
    ]);

    const confirmed = confirmDeed(registered, profile.id, "nations", "luqman", 5000);
    expect(stepStatus(activeProfile(confirmed)!, { kind: "deed", chapter: "nations", slug: "luqman" })).toBe("reviewed");
    expect(pendingDeeds(activeProfile(confirmed)!)).toEqual([]);
    expect(confirmedDeeds(activeProfile(confirmed)!)).toEqual([
      { chapter: "nations", slug: "luqman", record: expect.objectContaining({ status: "reviewed" }) },
    ]);

    // Confirming an ayah nobody registered, or a deed already reviewed, does nothing.
    expect(confirmDeed(store, profile.id, "nations", "luqman")).toBe(store);
    expect(confirmDeed(confirmed, profile.id, "nations", "luqman")).toBe(confirmed);
  });

  it("lets a declined deed be tried again, rather than stay stuck on \"no\"", () => {
    const { store, profile } = withChild("Amina");
    const registered = registerDeed(store, profile.id, "nations", "luqman", SAMPLE_DEED_STORY);
    const declined = declineDeed(registered, profile.id, "nations", "luqman");
    expect(stepStatus(activeProfile(declined)!, { kind: "deed", chapter: "nations", slug: "luqman" })).toBe("available");

    const retried = registerDeed(declined, profile.id, "nations", "luqman", SAMPLE_DEED_STORY, 9000);
    expect(stepStatus(activeProfile(retried)!, { kind: "deed", chapter: "nations", slug: "luqman" })).toBe("awaiting_parent");
  });

  it("marks a story done, and reading it again does not un-finish it", () => {
    const { store, profile } = withChild("Amina");
    const done = markStoryDone(store, profile.id, "nations", "luqman", 4000);
    expect(stepStatus(activeProfile(done)!, { kind: "story", chapter: "nations", slug: "luqman" })).toBe("done");

    const again = markStoryDone(done, profile.id, "nations", "luqman", 9999);
    expect(again).toBe(done);
  });

  it("keeps a named child's first story start across reloads and re-entry", () => {
    const { store, profile } = withChild("Amina");
    const started = startStory(store, profile.id, "nations", "luqman", 4000);
    expect(stepStatus(activeProfile(started)!, { kind: "story", chapter: "nations", slug: "luqman" })).toBe("in_progress");
    expect(activeProfile(started)!.steps["story:nations:luqman"].startedAt).toBe(4000);

    const reloaded = parseStore(JSON.parse(JSON.stringify(started)));
    const reentered = startStory(reloaded, profile.id, "nations", "luqman", 9000);
    expect(reentered).toBe(reloaded);
    expect(activeProfile(reentered)!.steps["story:nations:luqman"].startedAt).toBe(4000);
  });

  it("does not create Story resume progress for the shared guest profile", () => {
    const guest = enterAsGuest(emptyStore());
    const guestId = activeProfile(guest)!.id;
    expect(startStory(guest, guestId, "nations", "luqman", 4000)).toBe(guest);
  });

  it("never reopens a completed story and sorts incomplete stories by their original start", () => {
    const { store, profile } = withChild("Amina");
    const first = startStory(store, profile.id, "nations", "luqman", 1000);
    const second = startStory(first, profile.id, "nations", "qabil", 2000);
    const completed = markStoryDone(second, profile.id, "nations", "luqman", 3000);

    expect(startStory(completed, profile.id, "nations", "luqman", 4000)).toBe(completed);
    expect(inProgressStories(activeProfile(completed)!)).toEqual([
      expect.objectContaining({ chapter: "nations", slug: "qabil", record: expect.objectContaining({ startedAt: 2000 }) }),
    ]);
  });
});

describe("recitals", () => {
  // This is the test that catches the two traps STEP_KEY and STEP_STATUSES
  // set: a status or a key shape this regex or this list does not know about
  // parses fine in memory and only disappears the next time the page loads.
  it("round-trips every recital status, its note and its recording id through save and load", () => {
    const { store, profile } = withChild("Yusra");
    let s = submitRecital(store, profile.id, 114, 1, 3, "rec-1", 1000);
    s = submitRecital(s, profile.id, 114, 4, 5, "rec-2", 2000);
    s = askForPractice(s, profile.id, 114, 4, 5, "حاول تاني بهدوء", 2500);
    s = submitRecital(s, profile.id, 114, 6, 6, "rec-3", 3000);
    s = approveRecital(s, profile.id, 114, 6, 6, "ما شاء الله!", 3500);
    s = markNoteSeen(s, profile.id, 114, 6, 6, 4000);

    const reloaded = parseStore(JSON.parse(JSON.stringify(s)));
    expect(reloaded.profiles[0].steps).toEqual(s.profiles[0].steps);
    expect(reloaded.profiles[0].steps["recital:114:1-3"]).toMatchObject({ status: "awaiting_parent", recordingId: "rec-1" });
    expect(reloaded.profiles[0].steps["recital:114:4-5"]).toMatchObject({ status: "needs_practice", note: "حاول تاني بهدوء" });
    expect(reloaded.profiles[0].steps["recital:114:6-6"]).toMatchObject({ status: "reviewed", note: "ما شاء الله!", noteSeenAt: 4000 });
  });

  it("lets a child submit again after needing practice, and the segment returns to awaiting_parent", () => {
    const { store, profile } = withChild("Yusra");
    const first = submitRecital(store, profile.id, 114, 1, 3, "rec-1", 1000);
    const practiced = askForPractice(first, profile.id, 114, 1, 3, undefined, 2000);
    expect(stepStatus(activeProfile(practiced)!, { kind: "recital", surah: 114, from: 1, to: 3 })).toBe("needs_practice");

    const resubmitted = submitRecital(practiced, profile.id, 114, 1, 3, "rec-2", 3000);
    expect(stepStatus(activeProfile(resubmitted)!, { kind: "recital", surah: 114, from: 1, to: 3 })).toBe("awaiting_parent");
    expect(activeProfile(resubmitted)!.steps["recital:114:1-3"].recordingId).toBe("rec-2");
  });

  it("chooses practice first, leaves awaiting recitals open for a new recording, and covers only reviewed ayahs", () => {
    const { store, profile } = withChild("Yusra");
    let s = store;
    for (let ayah = 1; ayah <= 5; ayah++) s = declareMemorized(s, profile.id, 114, ayah, "child", 1000);

    // A reviewed recital covers 1–2, while 3–4 is still waiting on a parent.
    s = submitRecital(s, profile.id, 114, 1, 2, "reviewed", 2000);
    s = approveRecital(s, profile.id, 114, 1, 2, undefined, 3000);
    s = submitRecital(s, profile.id, 114, 3, 4, "waiting", 4000);

    // Awaiting is not covered: the child can make a new recording for it.
    expect(recitalEntrySegment(activeProfile(s)!, 114, 5)).toEqual({ from: 3, to: 5, status: null });

    s = askForPractice(s, profile.id, 114, 3, 4, undefined, 5000);
    // Practice is always the first return path, even though ayah 5 is fresh.
    expect(recitalEntrySegment(activeProfile(s)!, 114, 5)).toEqual({ from: 3, to: 4, status: "needs_practice" });

    s = submitRecital(s, profile.id, 114, 3, 4, "retry", 6000);
    s = approveRecital(s, profile.id, 114, 3, 4, undefined, 7000);
    // Once reviewed, 3–4 is covered and the first unreviewed ayah is offered.
    expect(recitalEntrySegment(activeProfile(s)!, 114, 5)).toEqual({ from: 5, to: 5, status: null });
  });

  it("submits a recital with no recording at all, for a device with no working microphone", () => {
    const { store, profile } = withChild("Yusra");
    const submitted = submitRecital(store, profile.id, 114, 1, 3, undefined, 1000);
    expect(stepStatus(activeProfile(submitted)!, { kind: "recital", surah: 114, from: 1, to: 3 })).toBe("awaiting_parent");
    expect(activeProfile(submitted)!.steps["recital:114:1-3"].recordingId).toBeUndefined();
  });

  it("keeps the child's own declaration standing after 'needs practice', but restarts its review spacing", () => {
    const { store, profile } = withChild("Yusra");
    let s = declareMemorized(store, profile.id, 114, 1, "child", 1000);
    s = declareMemorized(s, profile.id, 114, 2, "child", 1000);
    s = submitRecital(s, profile.id, 114, 1, 2, "rec-1", 2000);
    const practiced = askForPractice(s, profile.id, 114, 1, 2, undefined, 5000);

    const ayahs = activeProfile(practiced)!.ayahs;
    expect(ayahs["114:1"]).toMatchObject({ declaredAt: 1000, declaredBy: "child", forgotAt: 5000 });
    expect(ayahs["114:2"]).toMatchObject({ declaredAt: 1000, declaredBy: "child", forgotAt: 5000 });
    expect(stepStatus(activeProfile(practiced)!, { kind: "recital", surah: 114, from: 1, to: 2 })).toBe("needs_practice");
  });

  it("does nothing when asked to judge a recital nobody submitted", () => {
    const { store, profile } = withChild("Yusra");
    expect(approveRecital(store, profile.id, 114, 1, 3)).toBe(store);
    expect(askForPractice(store, profile.id, 114, 1, 3)).toBe(store);
  });

  it("promotes the child's declarations inside the segment only, on approval", () => {
    const { store, profile } = withChild("Yusra");
    let s = declareMemorized(store, profile.id, 114, 1, "child", 1000);
    s = declareMemorized(s, profile.id, 114, 2, "child", 1000);
    s = declareMemorized(s, profile.id, 114, 3, "child", 1000); // outside the recital
    s = submitRecital(s, profile.id, 114, 1, 2, "rec-1", 2000);

    const approved = approveRecital(s, profile.id, 114, 1, 2, undefined, 3000);
    const ayahs = activeProfile(approved)!.ayahs;
    expect(ayahs["114:1"].declaredBy).toBe("parent");
    expect(ayahs["114:2"].declaredBy).toBe("parent");
    expect(ayahs["114:3"].declaredBy).toBe("child"); // untouched — outside the segment
    expect(stepStatus(activeProfile(approved)!, { kind: "recital", surah: 114, from: 1, to: 2 })).toBe("reviewed");
  });

  it("orders pending and practice recitals oldest first", () => {
    const { store, profile } = withChild("Yusra");
    let s = submitRecital(store, profile.id, 114, 1, 2, "a", 3000);
    s = submitRecital(s, profile.id, 114, 3, 4, "b", 1000);
    expect(pendingRecitals(activeProfile(s)!).map(r => `${r.from}-${r.to}`)).toEqual(["3-4", "1-2"]);

    let p = askForPractice(submitRecital(store, profile.id, 114, 1, 2, "a", 1000), profile.id, 114, 1, 2, undefined, 5000);
    p = submitRecital(p, profile.id, 114, 3, 4, "b", 2000);
    p = askForPractice(p, profile.id, 114, 3, 4, undefined, 2000);
    expect(practiceRecitals(activeProfile(p)!).map(r => `${r.from}-${r.to}`)).toEqual(["3-4", "1-2"]);
  });

  it("keeps awaiting recitals first, then practice, then recently reviewed recitals", () => {
    const { store, profile } = withChild("Yusra");
    let s = submitRecital(store, profile.id, 114, 1, 2, "older", 1000);
    s = submitRecital(s, profile.id, 114, 3, 4, "newer", 3000);
    s = submitRecital(s, profile.id, 114, 5, 5, "reviewed", 2000);
    s = askForPractice(s, profile.id, 114, 3, 4, undefined, 4000);
    s = approveRecital(s, profile.id, 114, 5, 5, undefined, 5000);

    const child = activeProfile(s)!;
    expect(pendingRecitals(child).map(r => `${r.from}-${r.to}`)).toEqual(["1-2"]);
    expect(practiceRecitals(child).map(r => `${r.from}-${r.to}`)).toEqual(["3-4"]);
    expect(reviewedRecitals(child).map(r => `${r.from}-${r.to}`)).toEqual(["5-5"]);
  });

  it("surfaces the most recent unseen note, whichever way the recital went, until the child opens it", () => {
    const { store, profile } = withChild("Yusra");
    let s = submitRecital(store, profile.id, 114, 1, 2, "a", 1000);
    s = askForPractice(s, profile.id, 114, 1, 2, "حاول تاني", 2000);
    s = submitRecital(s, profile.id, 114, 3, 4, "b", 3000);
    s = approveRecital(s, profile.id, 114, 3, 4, "ما شاء الله!", 4000);

    // The later note (the approval) outranks the earlier one (the practice ask).
    expect(unseenNote(activeProfile(s)!)).toEqual({ surah: 114, from: 3, to: 4, note: "ما شاء الله!", status: "reviewed" });

    const seen = markNoteSeen(s, profile.id, 114, 3, 4, 5000);
    expect(unseenNote(activeProfile(seen)!)).toEqual({ surah: 114, from: 1, to: 2, note: "حاول تاني", status: "needs_practice" });

    const bothSeen = markNoteSeen(seen, profile.id, 114, 1, 2, 6000);
    expect(unseenNote(activeProfile(bothSeen)!)).toBeNull();
    // Marking a note already seen, or a recital with no note at all, changes nothing.
    expect(markNoteSeen(bothSeen, profile.id, 114, 1, 2)).toBe(bothSeen);
  });

  it("shows a parent result without an optional note once, then records that the child saw it", () => {
    const { store, profile } = withChild("Yusra");
    let s = submitRecital(store, profile.id, 114, 1, 2, "a", 1000);
    s = approveRecital(s, profile.id, 114, 1, 2, undefined, 2000);

    expect(unseenNote(activeProfile(s)!)).toEqual({ surah: 114, from: 1, to: 2, note: undefined, status: "reviewed" });
    s = markNoteSeen(s, profile.id, 114, 1, 2, 3000);
    expect(unseenNote(activeProfile(s)!)).toBeNull();
    expect(activeProfile(s)!.steps["recital:114:1-2"].noteSeenAt).toBe(3000);
  });
});
