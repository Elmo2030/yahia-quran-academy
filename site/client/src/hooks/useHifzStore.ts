import { useCallback, useEffect, useSyncExternalStore } from "react";

import { HIFZ_KEY, loadStore, saveStore, type HifzStore } from "@/lib/hifz-store";

/**
 * The memorization store as React state, shared by every component that asks.
 *
 * One copy lives in the module so two components never disagree, and a change
 * made in another tab — a parent adding a child on the tablet while the journey
 * is open in a second tab — arrives through the storage event.
 */
let current: HifzStore | null = null;
let lastSaveFailed = false;
const listeners = new Set<() => void>();

const snapshot = () => (current ??= loadStore());
const emit = () => listeners.forEach(listener => listener());

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** For tests: forget the module copy so the next read comes from storage. */
export function resetHifzStoreCache() {
  current = null;
  lastSaveFailed = false;
}

export function useHifzStore() {
  const store = useSyncExternalStore(subscribe, snapshot, snapshot);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== HIFZ_KEY) return;
      current = loadStore();
      emit();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /** Applies a change, saves it, and tells every reader. */
  const commit = useCallback((next: HifzStore) => {
    current = next;
    lastSaveFailed = !saveStore(next);
    emit();
    return !lastSaveFailed;
  }, []);

  return { store, commit, saveFailed: lastSaveFailed };
}
