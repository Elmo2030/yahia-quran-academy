// =============================================================================
// recordings.ts — the child's own recordings, kept on their device.
//
// IndexedDB, not localStorage: localStorage stores strings and caps out around
// 5 MB, and a minute of audio is already past that. Nothing here is uploaded —
// there is no server side to this feature at all, which is the point on a site
// used by children.
// =============================================================================

const DB_NAME = "yahya.recordings";
const DB_VERSION = 1;
const STORE = "clips";

export type Recording = {
  id: string;
  surah: number;
  /** The audio, as bytes. Stored as an ArrayBuffer rather than a Blob:
   *  Safari has a long history of mishandling Blobs in IndexedDB, and bytes
   *  survive a structured clone everywhere. The Blob is rebuilt on read. */
  bytes: ArrayBuffer;
  mimeType: string;
  seconds: number;
  recordedAt: number;
  /** Set by the memorization journey, which records one ayah at a time for
   *  one child. The reader's whole-surah recordings leave both out. */
  ayah?: number;
  profileId?: string;
};

/** Metadata without the audio, for listing. */
export type RecordingSummary = Omit<Recording, "bytes">;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("surah", "surah", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function run<T>(mode: IDBTransactionMode, work: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(db => new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const request = work(tx.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  }));
}

/** Private browsing and blocked-storage settings both throw; a recording that
 *  cannot be kept is not a reason to break the page. */
export const recordingsAvailable = async (): Promise<boolean> => {
  try {
    (await openDb()).close();
    return true;
  } catch {
    return false;
  }
};

/** Blob.arrayBuffer() is missing on Safari before 14 (and in jsdom). */
async function toBytes(blob: Blob): Promise<ArrayBuffer> {
  if (typeof blob.arrayBuffer === "function") return blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Two takes saved in the same millisecond would both claim to be the newest,
 * and the cap below would then drop an arbitrary one. Stamps never repeat
 * within a session; across sessions the clock is far enough apart to be safe.
 */
let lastStamp = 0;
function nextStamp(): number {
  lastStamp = Math.max(Date.now(), lastStamp + 1);
  return lastStamp;
}

export async function saveRecording(
  input: { surah: number; blob: Blob; mimeType: string; seconds: number; ayah?: number; profileId?: string },
): Promise<RecordingSummary> {
  const record: Recording = {
    surah: input.surah,
    ...(input.ayah ? { ayah: input.ayah } : {}),
    ...(input.profileId ? { profileId: input.profileId } : {}),
    bytes: await toBytes(input.blob),
    mimeType: input.mimeType,
    seconds: input.seconds,
    id: `${input.surah}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    recordedAt: nextStamp(),
  };
  await run("readwrite", store => store.put(record));
  // Journey takes are capped per ayah; the reader's whole-surah recordings are
  // deliberate keepsakes and are left alone.
  if (record.ayah && record.profileId) {
    const mine = await listAyahRecordings(record.surah, record.ayah, record.profileId);
    for (const old of mine.slice(TAKES_PER_AYAH)) await deleteRecording(old.id);
  }
  const { bytes: _bytes, ...summary } = record;
  return summary;
}

export async function listRecordings(surah: number): Promise<RecordingSummary[]> {
  const all = await run<Recording[]>("readonly", store => store.index("surah").getAll(surah));
  return all
    .map(({ bytes: _bytes, ...rest }) => rest)
    .sort((a, b) => b.recordedAt - a.recordedAt);
}

/** The stored record with its audio rebuilt as a playable Blob. */
/** Every recording on this device, newest first. The per-surah list is what a
 *  child uses while reciting; a parent looking for what their child has been
 *  doing needs the whole set without opening 114 pages to find it. */
/** One child's takes of one ayah, newest first. */
/**
 * How many takes of one ayah are kept for one child.
 *
 * A child re-recording the same ayah twenty times is normal, and every take is
 * a few hundred kilobytes of audio on a family tablet. The newest three are the
 * ones anybody listens to.
 */
export const TAKES_PER_AYAH = 3;

/** Deletes everything this child recorded — used when their profile is removed. */
export async function deleteProfileRecordings(profileId: string): Promise<number> {
  const all = await run<Recording[]>("readonly", store => store.getAll());
  const mine = all.filter(record => record.profileId === profileId);
  for (const record of mine) await deleteRecording(record.id);
  return mine.length;
}

export async function listAyahRecordings(surah: number, ayah: number, profileId: string): Promise<RecordingSummary[]> {
  return (await listRecordings(surah)).filter(r => r.ayah === ayah && r.profileId === profileId);
}

export function pickRecordingMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  for (const type of ["audio/webm", "audio/mp4", "audio/ogg"]) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return undefined;
}

export type StorageUse = {
  takes: number;
  bytes: number;
  /** journey takes, by child */
  byProfile: Record<string, { takes: number; bytes: number }>;
  /** whole-surah recordings from the reader, which belong to no child */
  reader: { takes: number; bytes: number };
};

/**
 * How much of the device the recordings are using. Read by the parent's corner:
 * a family should be able to see this before the tablet tells them it is full.
 */
export async function recordingsUse(): Promise<StorageUse> {
  const all = await run<Recording[]>("readonly", store => store.getAll());
  const use: StorageUse = { takes: all.length, bytes: 0, byProfile: {}, reader: { takes: 0, bytes: 0 } };
  for (const record of all) {
    const bytes = record.bytes?.byteLength ?? 0;
    use.bytes += bytes;
    if (!record.profileId) {
      use.reader = { takes: use.reader.takes + 1, bytes: use.reader.bytes + bytes };
      continue;
    }
    const entry = use.byProfile[record.profileId] ?? { takes: 0, bytes: 0 };
    use.byProfile[record.profileId] = { takes: entry.takes + 1, bytes: entry.bytes + bytes };
  }
  return use;
}

/** What the browser says about this origin's storage, when it says anything. */
export async function storageEstimate(): Promise<{ usage: number; quota: number } | null> {
  try {
    const estimate = await navigator.storage?.estimate?.();
    if (!estimate || typeof estimate.usage !== "number" || typeof estimate.quota !== "number") return null;
    return { usage: estimate.usage, quota: estimate.quota };
  } catch {
    return null;
  }
}

export async function listAllRecordings(): Promise<RecordingSummary[]> {
  const all = await run<Recording[]>("readonly", store => store.getAll());
  return all
    .map(({ bytes: _bytes, ...rest }) => rest)
    .sort((a, b) => b.recordedAt - a.recordedAt);
}

export async function getRecording(
  id: string,
): Promise<(RecordingSummary & { blob: Blob }) | undefined> {
  const record = await run<Recording | undefined>("readonly", store => store.get(id));
  if (!record) return undefined;
  const { bytes, ...rest } = record;
  return { ...rest, blob: new Blob([bytes], { type: record.mimeType }) };
}

export async function deleteRecording(id: string): Promise<void> {
  await run("readwrite", store => store.delete(id));
}
