// =============================================================================
// fact-of-the-day.ts — which of the hundred belongs to today.
//
// Deliberately knows nothing about the facts themselves. The home page may not
// import a content module — it is the one eagerly-loaded route, and pulling in
// the hundred facts would put 92 KB in the file every first-time visitor
// downloads — so it picks from the small generated index instead, using the
// same arithmetic the section itself uses.
// =============================================================================

/** Days since the epoch in the device's own timezone, so "today" turns over at
 *  the reader's midnight rather than at UTC's. */
export function dayNumber(at: number | Date = Date.now()): number {
  const d = new Date(at);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000);
}

/**
 * Today's position in a list of `length`, the same for every reader.
 *
 * Stepping by a number coprime with the length visits every entry before any
 * of them comes back; picking at random repeats within a fortnight, and a
 * child who meets the same "discovery of the day" twice in a month learns that
 * it is not really one.
 */
const STRIDE = 37;

export function indexOfTheDay(length: number, at: number | Date = Date.now()): number {
  if (length <= 0) return 0;
  return (dayNumber(at) * STRIDE) % length;
}
