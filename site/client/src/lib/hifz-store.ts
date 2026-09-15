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
};

export type ChildProfile = {
  id: string;
  name: string;
  character: CharacterId;
  createdAt: number;
  settings: HifzSettings;
  ayahs: Record<string, AyahRecord>;
};

export type HifzStore = {
  version: typeof HIFZ_VERSION;
  profiles: ChildProfile[];
  activeProfileId: string | null;
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
  // Collapse whitespace and cut by characters, not UTF-16 units, so an Arabic
  // name with diacritics or an emoji is not split in half.
  return Array.from(value.replace(/\s+/g, " ").trim()).slice(0, MAX_NAME_LENGTH).join("");
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
    if (isTime(entry.recordedAt)) record.recordedAt = entry.recordedAt;
    if (isTime(entry.declaredAt) && (entry.declaredBy === "child" || entry.declaredBy === "parent")) {
      record.declaredAt = entry.declaredAt;
      record.declaredBy = entry.declaredBy;
    }
    out[`${surah}:${ayah}`] = record;
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
    ayahs: parseAyahs(value.ayahs),
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
    seen.add(profile.id);
    profiles.push(profile);
    if (profiles.length === MAX_PROFILES + 1) break; // the guest does not count against the limit
  }
  const active = typeof value.activeProfileId === "string" && seen.has(value.activeProfileId) ? value.activeProfileId : null;
  return {
    version: HIFZ_VERSION,
    profiles,
    activeProfileId: active,
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
    ayahs: {},
  };
  return { ok: true, profile, store: touch(store, { profiles: [...store.profiles, profile], activeProfileId: profile.id }) };
}

/** The one guest profile, made on first use and reused after that. */
export function enterAsGuest(store: HifzStore): HifzStore {
  const guest = store.profiles.find(p => p.character === "guest");
  if (guest) return touch(store, { activeProfileId: guest.id });
  const profile: ChildProfile = {
    id: newId(), name: "", character: "guest", createdAt: Date.now(), settings: { ...DEFAULT_SETTINGS }, ayahs: {},
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

export function removeProfile(store: HifzStore, id: string): HifzStore {
  if (!store.profiles.some(p => p.id === id)) return store;
  return touch(store, {
    profiles: store.profiles.filter(p => p.id !== id),
    activeProfileId: store.activeProfileId === id ? null : store.activeProfileId,
  });
}

// ---------------------------------------------------------------------------
// Backup
// ---------------------------------------------------------------------------

export function exportBackup(store: HifzStore, now = Date.now()): string {
  return JSON.stringify({ app: BACKUP_APP, version: HIFZ_VERSION, exportedAt: new Date(now).toISOString(), store }, null, 2);
}

export type ImportResult =
  | { ok: true; store: HifzStore; profiles: number }
  | { ok: false; reason: "unreadable" | "not-a-backup" | "newer-version" | "empty" };

export function importBackup(text: string): ImportResult {
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
  // A restored backup opens on the child picker, not inside someone's journey.
  return { ok: true, store: { ...store, activeProfileId: null, updatedAt: Date.now() }, profiles: namedProfiles(store).length };
}

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
  try {
    const storage = typeof navigator === "undefined" ? undefined : navigator.storage;
    if (!storage?.persist || !storage.persisted) return "unsupported";
    if (await storage.persisted()) return "persisted";
    return (await storage.persist()) ? "persisted" : "best-effort";
  } catch {
    return "unsupported";
  }
}
