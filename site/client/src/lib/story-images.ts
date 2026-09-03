/**
 * The WebP ladder for story artwork.
 *
 * Every card paints its picture at roughly 380-570 CSS px and every cover at
 * up to about 1100, while the source JPEGs are 1200-1600 wide — a phone was
 * pulling a 289 KB JPEG to fill a 460 px slot, where the 640px WebP is 43 KB.
 * The variants are written by scripts/build-image-variants.mjs and committed,
 * since the deploy builder has no image tooling.
 */
import { storyImageWidths } from "./story-image-widths.generated";

/**
 * The `srcset` for a picture, or "" when the file has no variants — art
 * dropped in after the last run of the script. Callers render a plain <img>
 * in that case: a <source> whose file 404s does not fall back to the <img>,
 * it just leaves a blank frame.
 */
export function webpSrcSet(src: string): string {
  const widths = storyImageWidths[src];
  if (!widths?.length) return "";
  const stem = src.replace(/\.jpg$/i, "");
  return widths.map(w => `${stem}-${w}.webp ${w}w`).join(", ");
}

/** A card in `.story-list-grid`: full width on a phone, ~380px on a desktop. */
export const CARD_SIZES = "(max-width: 620px) 92vw, (max-width: 1100px) 46vw, 380px";

/** A chapter or station cover: the full width of the container. */
export const COVER_SIZES = "(max-width: 1100px) 94vw, 1040px";
