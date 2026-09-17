// =============================================================================
// hifz-store.ts — the memorization journey's data, kept on this device only.
//
// Nothing here is sent anywhere. One localStorage entry holds every child on
// the device: their name, the character they chose, their settings, and — from
// phase 2 on — what they have done with each ayah.
//
// What the store records is what the site can observe: listening, recording,
// and a declaration that an ayah is memorized, with who declared it. It never
// records a judgement of whether a recitation was correct, because the site
// has no way to make one.
//
// Everything that reads the entry goes through parseStore, which keeps what is
// well-formed and drops the rest. A hand-edited, truncated or older entry
// yields a smaller store, never an exception on a child's screen.
// =============================================================================

import type { ParentLock } from "@/lib/parent-lock";
import { DEFAULT_LOOKS, parseLooks, type Looks } from "@/lib/hifz-looks";

export const HIFZ_KEY = "yahya.hifz.v1";
export const HIFZ_VERSION = 1;
export const MAX_PROFILES = 8;
export const MAX_NAME_LENGTH = 24;
export const BACKUP_APP = "yahya-hifz";

export type CharacterId = "yahya" | "fatima" | "guest";
/** "sheikh" is al-Husary teaching alone; "sheikh_kids" is al-Minshawi with children repeating. */
export type ReciterChoice = "sheikh" | "sheikh_kids";
export type FontStep = 0 | 1 | 2;

export const RECITATION_FOR: Record<ReciterChoice, string> = {
  sheikh: "husary_muallim_timed",
  sheikh_kids: "minshawi_muallim_kids_timed",
};

export type HifzSettings = {
  /** how many times each ayah plays before moving on, 1-5 */
  repeat: number;
  /** move to the next ayah by itself once the repeats finish */
  autoplayNext: boolean;
  reciter: ReciterChoice;
  fontStep: FontStep;
};

export type DeclaredBy = "child" | "parent";

/** One ayah's history. Keyed in the profile as "surah:ayah". */
export type AyahRecord = {
  /** last time every chosen repeat was listened to */
  listenedAt?: number;
  /** last time the child recorded this ayah */
  recordedAt?: number;
  /** when it was declared memorized, and by whom */
  declaredAt?: number;
  declaredBy?: DeclaredBy;
  /** days on which it was reviewed after being declared */
  reviews: number[];
  /** the last time the child said they had forgotten it, which restarts the spacing */
  forgotAt?: number;
};

export type ChildProfile = {
  id: string;
  name: string;
  character: CharacterId;
  createdAt: number;
  settings: HifzSettings;
  /** the frame, card, companion and stickers this child picked */
  looks: Looks;
  ayahs: Record<string, AyahRecord>;
  /** everything that is not an ayah — a story read, or a deed from its "try
   *  today" — keyed by stepKey(). See the section below. */
  steps: Record<string, StepRecord>;
};

export type HifzStore = {
  version: typeof HIFZ_VERSION;
  profiles: ChildProfile[];
  activeProfileId: string | null;
  /** the device's parent lock, if one was set */
  parentLock?: ParentLock;
  /** when a backup file was last saved from this device */
  lastBackupAt?: number;
  updatedAt: number;
};

export const DEFAULT_SETTINGS: HifzSettings = {
  repeat: 3,
  autoplayNext: true,
  reciter: "sheikh",
  fontStep: 1,
};

export const emptyStore = (): HifzStore => ({
  version: HIFZ_VERSION,
  profiles: [],
  activeProfileId: null,
  updatedAt: 0,
});

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isTime = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const CHARACTER_IDS: CharacterId[] = ["yahya", "fatima", "guest"];

export function cleanName(value: unknown): string {
  if (typeof value !== "string") return "";
  // Control characters and bidi overrides go first: a name carrying U+202E
  // would reverse the text around it wherever it is shown. Then collapse
  // whitespace and cut by characters, not UTF-16 units, so an Arabic name with
  // diacritics or an emoji is not split in half.
  const visible = value.replace(/[\u0000-\u001f\u007f-\u009f\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "");
  return Array.from(visible.replace(/\s+/g, " ").trim()).slice(0, MAX_NAME_LENGTH).join("");
}

function parseSettings(value: unknown): HifzSettings {
  const raw = isObject(value) ? value : {};
  const repeat = typeof raw.repeat === "number" && Number.isInteger(raw.repeat) ? raw.repeat : DEFAULT_SETTINGS.repeat;
  return {
    repeat: Math.min(5, Math.max(1, repeat)),
    autoplayNext: typeof raw.autoplayNext === "boolean" ? raw.autoplayNext : DEFAULT_SETTINGS.autoplayNext,
    reciter: raw.reciter === "sheikh_kids" ? "sheikh_kids" : "sheikh",
    fontStep: raw.fontStep === 0 || raw.fontStep === 2 ? raw.fontStep : 1,
  };
}

const AYAH_KEY = /^(\d{1,3}):(\d{1,3})$/;

function parseAyahs(value: unknown): Record<string, AyahRecord> {
  if (!isObject(value)) return {};
  const out: Record<string, AyahRecord> = {};
  for (const [key, entry] of Object.entries(value)) {
    const match = AYAH_KEY.exec(key);
    if (!match || !isObject(entry)) continue;
    const surah = Number(match[1]);
    const ayah = Number(match[2]);
    if (surah < 1 || surah > 114 || ayah < 1 || ayah > 286) continue;
    const record: AyahRecord = {
      reviews: Array.isArray(entry.reviews) ? entry.reviews.filter(isTime).slice(-30) : [],
    };
    if (isTime(entry.listenedAt)) record.listenedAt = entry.listenedAt;
    if (isTime(entry.forgotAt)) record.forgotAt = entry.forgotAt;
    if (isTime(entry.recordedAt)) record.recordedAt = entry.recordedAt;
    if (isTime(entry.declaredAt) && (entry.declaredBy === "child" || entry.declaredBy === "parent")) {
      record.declaredAt = entry.declaredAt;
      record.declaredBy = entry.declaredBy;
    }
    out[`${surah}:${ayah}`] = record;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Steps beyond an ayah: a story finished, or a deed grown from its story's
// "try today". Additive, so a v1 store saved before this shipped has no
// `steps` field at all and still parses — parseSteps reads that as "{}".
//
// An ayah's own history keeps living in `ayahs` above, with its own listen /
// record / declare / review shape; nothing here changes it. `kind: "ayah"`
// exists on StepRef so code that names "the next thing to do" can describe
// any of the three the same way, but this map only ever stores "story" and
// "deed" entries.
// ---------------------------------------------------------------------------

export type StepRef =
  | { kind: "ayah"; surah: number; ayah: number }
  | { kind: "story"; chapter: string; slug: string }
  | { kind: "deed"; chapter: string; slug: string };

type StoryOrDeedRef = Extract<StepRef, { kind: "story" | "deed" }>;

/**
 * available: offered, nothing done yet — the default for anything not in the
 *   map, so most steps need no entry at all.
 * in_progress / done: the child started it, then finished it.
 * awaiting_parent: a deed the child said they did, waiting on a parent's word.
 * reviewed: a parent put their name to it — the deed's equivalent of an
 *   ayah's `declaredBy: "parent"`.
 */
export type StepStatus = "available" | "in_progress" | "done" | "awaiting_parent" | "reviewed";

export type StepRecord = {
  status: StepStatus;
  startedAt?: number;
  doneAt?: number;
  awaitingAt?: number;
  reviewedAt?: number;
};

export const stepKey = (ref: StoryOrDeedRef) => `${ref.kind}:${ref.chapter}:${ref.slug}`;

const STEP_STATUSES: StepStatus[] = ["available", "in_progress", "done", "awaiting_parent", "reviewed"];
const STEP_KEY = /^(story|deed):[^:]{1,80}:[^:]{1,80}$/;

function parseSteps(value: unknown): Record<string, StepRecord> {
  if (!isObject(value)) return {};
  const out: Record<string, StepRecord> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (!STEP_KEY.test(key) || !isObject(entry) || !STEP_STATUSES.includes(entry.status as StepStatus)) continue;
    const record: StepRecord = { status: entry.status as StepStatus };
    if (isTime(entry.startedAt)) record.startedAt = entry.startedAt;
    if (isTime(entry.doneAt)) record.doneAt = entry.doneAt;
    if (isTime(entry.awaitingAt)) record.awaitingAt = entry.awaitingAt;
    if (isTime(entry.reviewedAt)) record.reviewedAt = entry.reviewedAt;
    out[key] = record;
  }
  return out;
}

function parseProfile(value: unknown): ChildProfile | null {
  if (!isObject(value)) return null;
  if (typeof value.id !== "string" || !value.id) return null;
  const character = CHARACTER_IDS.includes(value.character as CharacterId) ? (value.character as CharacterId) : null;
  if (!character) return null;
  const name = cleanName(value.name);
  // Only the guest goes without a name.
  if (!name && character !== "guest") return null;
  return {
    id: value.id.slice(0, 64),
    name,
    character,
    createdAt: isTime(value.createdAt) ? value.createdAt : Date.now(),
    settings: parseSettings(value.settings),
    looks: parseLooks(value.looks),
    ayahs: parseAyahs(value.ayahs),
    steps: parseSteps(value.steps),
  };
}

export function parseStore(value: unknown): HifzStore {
  if (!isObject(value) || value.version !== HIFZ_VERSION) return emptyStore();
  const seen = new Set<string>();
  const profiles: ChildProfile[] = [];
  let guestSeen = false;
  for (const entry of Array.isArray(value.profiles) ? value.profiles : []) {
    const profile = parseProfile(entry);
    if (!profile || seen.has(profile.id)) continue;
    if (profile.character === "guest") {
      if (guestSeen) continue;
      guestSeen = true;
    }
    // The guest does not count against the limit; a ninth named child does not load.
    else if (profiles.filter(p => p.character !== "guest").length >= MAX_PROFILES) continue;
    seen.add(profile.id);
    profiles.push(profile);
  }
  const active = typeof value.activeProfileId === "string" && seen.has(value.activeProfileId) ? value.activeProfileId : null;
  const lock = value.parentLock;
  return {
    version: HIFZ_VERSION,
    profiles,
    activeProfileId: active,
    ...(isTime(value.lastBackupAt) ? { lastBackupAt: value.lastBackupAt } : {}),
    ...(isObject(lock) && typeof lock.salt === "string" && typeof lock.hash === "string"
      ? { parentLock: { salt: lock.salt, hash: lock.hash, createdAt: isTime(lock.createdAt) ? lock.createdAt : Date.now() } }
      : {}),
    updatedAt: isTime(value.updatedAt) ? value.updatedAt : 0,
  };
}

// ---------------------------------------------------------------------------
// Reading and writing the device copy
// ---------------------------------------------------------------------------

export function loadStore(storage: Pick<Storage, "getItem"> | undefined = safeLocalStorage()): HifzStore {
  try {
    const raw = storage?.getItem(HIFZ_KEY);
    return raw ? parseStore(JSON.parse(raw)) : emptyStore();
  } catch {
    return emptyStore();
  }
}

/** false when the browser refused the write — private mode, or the quota is full. */
export function saveStore(store: HifzStore, storage: Pick<Storage, "setItem"> | undefined = safeLocalStorage()): boolean {
  try {
    if (!storage) return false;
    storage.setItem(HIFZ_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

function safeLocalStorage(): Storage | undefined {
  try {
    return typeof localStorage === "undefined" ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Changes. Each returns a new store and leaves the one it was given untouched.
// ---------------------------------------------------------------------------

const touch = (store: HifzStore, patch: Partial<HifzStore>): HifzStore => ({ ...store, ...patch, updatedAt: Date.now() });

export const namedProfiles = (store: HifzStore) => store.profiles.filter(p => p.character !== "guest");
export const activeProfile = (store: HifzStore) => store.profiles.find(p => p.id === store.activeProfileId) ?? null;

function newId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export type CreateResult =
  | { ok: true; store: HifzStore; profile: ChildProfile }
  | { ok: false; reason: "name" | "limit" | "duplicate" };

export function createProfile(store: HifzStore, input: { name: string; character: Exclude<CharacterId, "guest"> }): CreateResult {
  const name = cleanName(input.name);
  if (!name) return { ok: false, reason: "name" };
  const named = namedProfiles(store);
  if (named.length >= MAX_PROFILES) return { ok: false, reason: "limit" };
  if (named.some(p => p.name.toLocaleLowerCase() === name.toLocaleLowerCase())) return { ok: false, reason: "duplicate" };
  const profile: ChildProfile = {
    id: newId(),
    name,
    character: input.character === "fatima" ? "fatima" : "yahya",
    createdAt: Date.now(),
    settings: { ...DEFAULT_SETTINGS },
    looks: { ...DEFAULT_LOOKS },
    ayahs: {},
    steps: {},
  };
  return { ok: true, profile, store: touch(store, { profiles: [...store.profiles, profile], activeProfileId: profile.id }) };
}

/** The one guest profile, made on first use and reused after that. */
export function enterAsGuest(store: HifzStore): HifzStore {
  const guest = store.profiles.find(p => p.character === "guest");
  if (guest) return touch(store, { activeProfileId: guest.id });
  const profile: ChildProfile = {
    id: newId(), name: "", character: "guest", createdAt: Date.now(),
    settings: { ...DEFAULT_SETTINGS }, looks: { ...DEFAULT_LOOKS }, ayahs: {}, steps: {},
  };
  return touch(store, { profiles: [...store.profiles, profile], activeProfileId: profile.id });
}

export function selectProfile(store: HifzStore, id: string | null): HifzStore {
  if (id !== null && !store.profiles.some(p => p.id === id)) return store;
  return touch(store, { activeProfileId: id });
}

export type UpdateResult = { ok: true; store: HifzStore } | { ok: false; reason: "name" | "duplicate" | "missing" };

export function updateProfile(
  store: HifzStore,
  id: string,
  patch: { name?: string; character?: Exclude<CharacterId, "guest"> },
): UpdateResult {
  const current = store.profiles.find(p => p.id === id);
  if (!current) return { ok: false, reason: "missing" };
  const next = { ...current };
  if (current.character !== "guest") {
    if (patch.name !== undefined) {
      const name = cleanName(patch.name);
      if (!name) return { ok: false, reason: "name" };
      const clash = namedProfiles(store).some(p => p.id !== id && p.name.toLocaleLowerCase() === name.toLocaleLowerCase());
      if (clash) return { ok: false, reason: "duplicate" };
      next.name = name;
    }
    if (patch.character) next.character = patch.character === "fatima" ? "fatima" : "yahya";
  }
  return { ok: true, store: touch(store, { profiles: store.profiles.map(p => (p.id === id ? next : p)) }) };
}

export function updateSettings(store: HifzStore, id: string, patch: Partial<HifzSettings>): HifzStore {
  return touch(store, {
    profiles: store.profiles.map(p => (p.id === id ? { ...p, settings: parseSettings({ ...p.settings, ...patch }) } : p)),
  });
}

/** A look is chosen by tapping it, so this both sets and clears. */
export function updateLooks(store: HifzStore, id: string, patch: Partial<Looks>): HifzStore {
  return touch(store, {
    profiles: store.profiles.map(p => (p.id === id ? { ...p, looks: parseLooks({ ...p.looks, ...patch }) } : p)),
  });
}

/** Adds a sticker to the shelf, or takes it off again. */
export function toggleSticker(store: HifzStore, id: string, sticker: string): HifzStore {
  const profile = store.profiles.find(p => p.id === id);
  if (!profile) return store;
  const on = profile.looks.stickers.includes(sticker);
  return updateLooks(store, id, {
    stickers: on ? profile.looks.stickers.filter(s => s !== sticker) : [...profile.looks.stickers, sticker],
  });
}

export function removeProfile(store: HifzStore, id: string): HifzStore {
  if (!store.profiles.some(p => p.id === id)) return store;
  return touch(store, {
    profiles: store.profiles.filter(p => p.id !== id),
    activeProfileId: store.activeProfileId === id ? null : store.activeProfileId,
  });
}

// ---------------------------------------------------------------------------
// What a child did with an ayah
// ---------------------------------------------------------------------------

export const ayahKey = (surah: number, ayah: number) => `${surah}:${ayah}`;

function withAyah(
  store: HifzStore,
  profileId: string,
  surah: number,
  ayah: number,
  change: (record: AyahRecord) => AyahRecord,
): HifzStore {
  if (!Number.isInteger(surah) || surah < 1 || surah > 114 || !Number.isInteger(ayah) || ayah < 1 || ayah > 286) return store;
  if (!store.profiles.some(p => p.id === profileId)) return store;
  const key = ayahKey(surah, ayah);
  const profile = store.profiles.find(p => p.id === profileId)!;
  const current = profile.ayahs[key] ?? { reviews: [] };
  const next = change(current);
  // A change that declines to change anything — a review of an ayah nobody
  // declared — must not leave an empty record behind.
  if (next === current) return store;
  return touch(store, {
    profiles: store.profiles.map(p => (p.id === profileId ? { ...p, ayahs: { ...p.ayahs, [key]: next } } : p)),
  });
}

/** Every chosen repeat of the ayah played to its end. */
export const markListened = (store: HifzStore, profileId: string, surah: number, ayah: number, now = Date.now()) =>
  withAyah(store, profileId, surah, ayah, r => ({ ...r, listenedAt: now }));

/** The child recorded themselves reciting it. */
export const markRecorded = (store: HifzStore, profileId: string, surah: number, ayah: number, now = Date.now()) =>
  withAyah(store, profileId, surah, ayah, r => ({ ...r, recordedAt: now }));

/**
 * "I have memorized it" — said by the child or by a parent, and recorded as
 * exactly that. Declaring again keeps the first date, so the review schedule
 * counts from when it was first learned.
 */
export const declareMemorized = (store: HifzStore, profileId: string, surah: number, ayah: number, by: DeclaredBy, now = Date.now()) =>
  withAyah(store, profileId, surah, ayah, r => ({
    ...r,
    declaredAt: r.declaredAt ?? now,
    declaredBy: r.declaredBy === "parent" ? "parent" : by,
  }));

/** The child came back to a declared ayah on a review day. */
export const markReviewed = (store: HifzStore, profileId: string, surah: number, ayah: number, now = Date.now()) =>
  withAyah(store, profileId, surah, ayah, r => {
    if (!r.declaredAt) return r;
    const { forgotAt: _forgotAt, ...rest } = r;
    return { ...rest, reviews: [...r.reviews, now].slice(-30) };
  });

/**
 * "I forgot it." The declaration stands — it is still the child's own word —
 * but the spacing starts again from today, so the ayah comes back tomorrow.
 */
export const restartReviews = (store: HifzStore, profileId: string, surah: number, ayah: number, now = Date.now()) =>
  withAyah(store, profileId, surah, ayah, r => (r.declaredAt ? { ...r, forgotAt: now } : r));

export const withdrawDeclaration = (store: HifzStore, profileId: string, surah: number, ayah: number) =>
  withAyah(store, profileId, surah, ayah, ({ declaredAt: _at, declaredBy: _by, ...rest }) => ({ ...rest, reviews: [] }));

/** Sets or clears the device's parent lock. */
export function setParentLock(store: HifzStore, lock: ParentLock | null): HifzStore {
  if (!lock) {
    const { parentLock: _lock, ...rest } = store;
    return { ...rest, updatedAt: Date.now() };
  }
  return touch(store, { parentLock: lock });
}

/**
 * A parent putting their name to what a child declared in one surah. It only
 * moves declarations the child made themselves; it never declares an ayah the
 * child has not.
 */
export function confirmDeclarations(store: HifzStore, profileId: string, surah: number, total: number): HifzStore {
  const profile = store.profiles.find(p => p.id === profileId);
  if (!profile) return store;
  const ayahs = { ...profile.ayahs };
  let changed = false;
  for (let ayah = 1; ayah <= total; ayah++) {
    const key = ayahKey(surah, ayah);
    const record = ayahs[key];
    if (record?.declaredAt && record.declaredBy === "child") {
      ayahs[key] = { ...record, declaredBy: "parent" };
      changed = true;
    }
  }
  if (!changed) return store;
  return touch(store, { profiles: store.profiles.map(p => (p.id === profileId ? { ...p, ayahs } : p)) });
}

export type SurahProgress = { total: number; listened: number; recorded: number; declared: number };

export function surahProgress(profile: ChildProfile, surah: number, total: number): SurahProgress {
  const progress: SurahProgress = { total, listened: 0, recorded: 0, declared: 0 };
  for (let ayah = 1; ayah <= total; ayah++) {
    const record = profile.ayahs[ayahKey(surah, ayah)];
    if (!record) continue;
    if (record.listenedAt) progress.listened++;
    if (record.recordedAt) progress.recorded++;
    if (record.declaredAt) progress.declared++;
  }
  return progress;
}

function withStep(
  store: HifzStore,
  profileId: string,
  ref: StoryOrDeedRef,
  change: (record: StepRecord | undefined) => StepRecord | undefined,
): HifzStore {
  if (!store.profiles.some(p => p.id === profileId)) return store;
  const key = stepKey(ref);
  const profile = store.profiles.find(p => p.id === profileId)!;
  const next = change(profile.steps[key]);
  if (next === profile.steps[key]) return store;
  const steps = { ...profile.steps };
  if (next) steps[key] = next;
  else delete steps[key];
  return touch(store, { profiles: store.profiles.map(p => (p.id === profileId ? { ...p, steps } : p)) });
}

/**
 * A child saying "I did it" after a story's "try today". Recorded once and
 * left for a parent to confirm — pressing the button again on a deed already
 * registered changes nothing, so there is no way to send the same deed twice.
 */
export const registerDeed = (store: HifzStore, profileId: string, chapter: string, slug: string, now = Date.now()) =>
  withStep(store, profileId, { kind: "deed", chapter, slug }, current =>
    current ?? { status: "awaiting_parent", doneAt: now, awaitingAt: now });

/** A parent putting their name to a deed the child said they did. */
export const confirmDeed = (store: HifzStore, profileId: string, chapter: string, slug: string, now = Date.now()) =>
  withStep(store, profileId, { kind: "deed", chapter, slug }, current =>
    current?.status === "awaiting_parent" ? { ...current, status: "reviewed", reviewedAt: now } : current);

/**
 * "Not yet" — the parent has not seen it happen. The deed is dropped rather
 * than parked in some rejected state, so the story's button offers it again
 * instead of the family being stuck looking at a "no".
 */
export const declineDeed = (store: HifzStore, profileId: string, chapter: string, slug: string) =>
  withStep(store, profileId, { kind: "deed", chapter, slug }, () => undefined);

/** A story finished. Reading it again does not un-finish it. */
export const markStoryDone = (store: HifzStore, profileId: string, chapter: string, slug: string, now = Date.now()) =>
  withStep(store, profileId, { kind: "story", chapter, slug }, current => (current?.status === "done" ? current : { status: "done", doneAt: now }));

export const stepStatus = (profile: ChildProfile, ref: StoryOrDeedRef): StepStatus => profile.steps[stepKey(ref)]?.status ?? "available";

/** Every deed a parent has not yet put their name to, oldest first. */
export function pendingDeeds(profile: ChildProfile): Array<{ chapter: string; slug: string; record: StepRecord }> {
  const out: Array<{ chapter: string; slug: string; record: StepRecord }> = [];
  for (const [key, record] of Object.entries(profile.steps)) {
    if (record.status !== "awaiting_parent") continue;
    const [kind, chapter, slug] = key.split(":");
    if (kind !== "deed") continue;
    out.push({ chapter, slug, record });
  }
  return out.sort((a, b) => (a.record.awaitingAt ?? 0) - (b.record.awaitingAt ?? 0));
}

// ---------------------------------------------------------------------------
// Backup
// ---------------------------------------------------------------------------

export function exportBackup(store: HifzStore, now = Date.now()): string {
  // The parent's number belongs to the device it was set on, not to the file a
  // family mails to themselves; and restoring a backup must not be a way for a
  // child to lift the lock on this one.
  const { parentLock: _lock, lastBackupAt: _backedUp, ...children } = store;
  return JSON.stringify({ app: BACKUP_APP, version: HIFZ_VERSION, exportedAt: new Date(now).toISOString(), store: children }, null, 2);
}

export type ImportResult =
  | { ok: true; store: HifzStore; profiles: number }
  | { ok: false; reason: "unreadable" | "not-a-backup" | "newer-version" | "empty" | "too-large" };

/** A real backup of eight children who memorized all of Juz Amma is well under 200 KB. */
export const MAX_BACKUP_BYTES = 2_000_000;

export function importBackup(text: string, current?: HifzStore): ImportResult {
  if (text.length > MAX_BACKUP_BYTES) return { ok: false, reason: "too-large" };
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return { ok: false, reason: "unreadable" };
  }
  if (!isObject(payload) || payload.app !== BACKUP_APP || !isObject(payload.store)) return { ok: false, reason: "not-a-backup" };
  if (typeof payload.version === "number" && payload.version > HIFZ_VERSION) return { ok: false, reason: "newer-version" };
  const store = parseStore(payload.store);
  if (store.profiles.length === 0) return { ok: false, reason: "empty" };
  // A restored backup opens on the child picker, not inside someone's journey,
  // and leaves this device's parent lock exactly as it was.
  const lock = current?.parentLock;
  return {
    ok: true,
    store: { ...store, ...(lock ? { parentLock: lock } : {}), activeProfileId: null, updatedAt: Date.now() },
    profiles: namedProfiles(store).length,
  };
}

/**
 * Remembers that a backup was saved. Everything else here is on one device, so
 * this date is the only thing that can tell a family their copy is old.
 */
export const markBackedUp = (store: HifzStore, now = Date.now()): HifzStore => touch(store, { lastBackupAt: now });

/** Days since the last backup, or null if none was ever saved. */
export function daysSinceBackup(store: HifzStore, now = Date.now()): number | null {
  if (!store.lastBackupAt) return null;
  return Math.max(0, Math.floor((now - store.lastBackupAt) / 86_400_000));
}

/** A month between copies is the point at which the page starts asking. */
export const BACKUP_REMINDER_DAYS = 30;

export const backupIsStale = (store: HifzStore, now = Date.now()) => {
  const days = daysSinceBackup(store, now);
  return days === null ? store.profiles.length > 0 : days >= BACKUP_REMINDER_DAYS;
};

export const backupFileName = (now = new Date()) =>
  `yahya-hifz-backup-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.json`;

// ---------------------------------------------------------------------------
// Keeping the data
// ---------------------------------------------------------------------------

export type Persistence = "persisted" | "best-effort" | "unsupported";

/**
 * Asks the browser not to clear this site's storage under pressure.
 *
 * Safari on iPhone and iPad otherwise deletes a site's data after seven days
 * without a visit, which would erase a child's whole journey. A granted request
 * — or a site added to the home screen — is exempt. Nothing here can promise
 * it, which is why the page also offers a backup.
 */
export async function requestPersistence(): Promise<Persistence> {
  return persistence(true);
}

/**
 * The same answer without asking. Firefox turns persist() into a permission
 * prompt, so opening the page only looks; the request is made once a child
 * exists and there is something worth keeping.
 */
export async function checkPersistence(): Promise<Persistence> {
  return persistence(false);
}

async function persistence(ask: boolean): Promise<Persistence> {
  try {
    const storage = typeof navigator === "undefined" ? undefined : navigator.storage;
    if (!storage?.persist || !storage.persisted) return "unsupported";
    if (await storage.persisted()) return "persisted";
    if (!ask) return "best-effort";
    return (await storage.persist()) ? "persisted" : "best-effort";
  } catch {
    return "unsupported";
  }
}
