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

export async function saveRecording(
  input: { surah: number; blob: Blob; mimeType: string; seconds: number },
): Promise<RecordingSummary> {
  const record: Recording = {
    surah: input.surah,
    bytes: await toBytes(input.blob),
    mimeType: input.mimeType,
    seconds: input.seconds,
    id: `${input.surah}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    recordedAt: Date.now(),
  };
  await run("readwrite", store => store.put(record));
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
