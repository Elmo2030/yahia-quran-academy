// =============================================================================
// parent-lock.ts — the number that keeps the parent's corner out of reach.
//
// This is a child lock, not security, and the page says so. Everything lives on
// the device, so anyone who can read the storage can also clear it; what the
// lock stops is a seven-year-old wandering into their own progress and the
// delete buttons. The number is still salted and hashed rather than stored as
// it was typed, because a shared family tablet often holds the same four digits
// a parent uses elsewhere.
// =============================================================================

export type ParentLock = { salt: string; hash: string; createdAt: number };

export const PIN_LENGTH = { min: 4, max: 8 };

/** Digits only: this is typed by a parent on a phone, often one-handed. */
export function pinProblem(pin: string): "empty" | "digits" | "short" | "long" | null {
  if (!pin) return "empty";
  if (!/^\d+$/.test(pin)) return "digits";
  if (pin.length < PIN_LENGTH.min) return "short";
  if (pin.length > PIN_LENGTH.max) return "long";
  return null;
}

export function newSalt(): string {
  const bytes = new Uint8Array(16);
  try {
    crypto.getRandomValues(bytes);
  } catch {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, "0")).join("");

/**
 * SHA-256 of salt + pin, with a much weaker fallback where SubtleCrypto is
 * missing (an old browser, or a page not served over https). The fallback is
 * marked in the value so it is never mistaken for the real thing.
 */
export async function hashPin(pin: string, salt: string): Promise<string> {
  const material = `${salt}:${pin}`;
  try {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
    return `sha256:${hex(digest)}`;
  } catch {
    let hash = 2166136261;
    for (let i = 0; i < material.length; i++) {
      hash ^= material.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `weak:${(hash >>> 0).toString(16)}`;
  }
}

export async function makeLock(pin: string, now = Date.now()): Promise<ParentLock> {
  const salt = newSalt();
  return { salt, hash: await hashPin(pin, salt), createdAt: now };
}

export async function pinMatches(lock: ParentLock, pin: string): Promise<boolean> {
  const attempt = await hashPin(pin, lock.salt);
  // Both strings are the same length for a given scheme, so a plain comparison
  // leaks nothing an attacker with the device could not read outright.
  return attempt === lock.hash;
}

// ---------------------------------------------------------------------------
// Staying unlocked for this visit
// ---------------------------------------------------------------------------

const SESSION_KEY = "yahya.hifz.parent";

/** The unlock lasts for the tab, not for the device: closing it locks again. */
export function rememberUnlock(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Private mode: the parent simply types the number again after a reload.
  }
}

export function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function forgetUnlock(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // nothing to forget
  }
}
