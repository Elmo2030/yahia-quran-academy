/**
 * The one place that knows where Yahya's portrait lives.
 *
 * It was a `const` copied into two pages, and when the sizes changed one of
 * them kept pointing at the 1536x1920 original — the reader went on sending
 * 144 KB to draw a 44 px avatar. There is one copy now.
 *
 * The widths come from what the hero frame actually asks for: `width: min(312px,
 * 68vw)`, so 768 covers a 2x phone and 1152 a 3x one. Files are written by hand
 * with ImageMagick from data/yahya-hero-source.webp, since the deploy builder
 * has no image tooling.
 */
export const yahyaHero = "/hero/yahya-768.webp";
export const yahyaHeroSrcSet = [384, 576, 768, 1152].map(w => `/hero/yahya-${w}.webp ${w}w`).join(", ");
export const yahyaHeroSizes = "(max-width: 820px) 70vw, 312px";

/** A square crop of his face, for the avatars that paint at 29-48 px. */
export const yahyaAvatarUrl = "/hero/yahya-avatar.webp";
