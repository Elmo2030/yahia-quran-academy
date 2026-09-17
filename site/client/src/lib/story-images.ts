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

/**
 * The `alt` for a piece of story art on a page that is about that one story.
 *
 * The art is not decoration — a Seerah station is ninety-two painted scenes,
 * and a child who cannot see them is missing the half of the page that is not
 * words. What we can say truthfully today is what the picture is and which
 * story it belongs to: the scenes were commissioned from briefs, not described
 * afterwards, so there is no authored sentence anywhere saying what each frame
 * actually shows. Naming the subject beats the silence of alt="", and it does
 * not invent a scene that may not be in the frame.
 *
 * A written-per-scene description would be better than this and would replace
 * it; until one exists, this is the honest floor rather than a stand-in for it.
 */
export const artAlt = (title: string, locale: "ar" | "en"): string =>
  locale === "en" ? `An illustration for the story: ${title}` : `رسم لقصة: ${title}`;
