/**
 * "My library" — the stories a reader has saved.
 *
 * Kept in localStorage: it belongs to whoever is holding the device, there are
 * no accounts on this site, and nothing here should travel anywhere. Every
 * access is guarded because storage throws outright in some private-browsing
 * modes rather than simply returning null.
 */

import { useCallback, useEffect, useState } from "react";

const KEY = "yahia.library.v1";
const CHANGED = "yahia:library-changed";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(x => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // storage unavailable or full — the page still works, it just cannot remember
  }
  window.dispatchEvent(new Event(CHANGED));
}

export function useLibrary() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSlugs(read());
    sync();
    window.addEventListener(CHANGED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter(s => s !== slug) : [...current, slug]);
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, toggle, has };
}
