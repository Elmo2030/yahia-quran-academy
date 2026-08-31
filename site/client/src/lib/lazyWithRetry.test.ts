/**
 * A deploy replaces every route chunk's hashed filename. A browser holding the
 * previous entry chunk then asks for a file that no longer exists, and the
 * route dies with "Failed to fetch dynamically imported module" — which is
 * exactly what production served after the split shipped.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

import { lazyWithRetry } from "@/lib/lazyWithRetry";

const KEY = "yahya.chunk-reloaded";
/** Reaches the loader React would call. */
const run = (fn: () => Promise<unknown>) => {
  const lazyComponent = lazyWithRetry(fn as never) as unknown as {
    _payload: { _result: () => Promise<unknown> };
  };
  return lazyComponent._payload._result();
};

describe("lazyWithRetry", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("reloads once when a chunk has gone missing", async () => {
    const reload = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload });
    const pending = run(() => Promise.reject(new Error("Failed to fetch dynamically imported module")));
    await Promise.race([pending, new Promise(r => setTimeout(r, 20))]);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(KEY)).toBe("1");
  });

  it("gives up rather than looping if it fails again after the reload", async () => {
    sessionStorage.setItem(KEY, "1");
    const reload = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload });
    await expect(run(() => Promise.reject(new Error("still missing")))).rejects.toThrow("still missing");
    expect(reload).not.toHaveBeenCalled();
  });

  it("clears the flag once a chunk loads", async () => {
    sessionStorage.setItem(KEY, "1");
    await run(() => Promise.resolve({ default: () => null }));
    expect(sessionStorage.getItem(KEY)).toBeNull();
  });
});
