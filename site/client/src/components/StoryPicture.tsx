import { webpSrcSet } from "@/lib/story-images";

/**
 * A story picture with its WebP ladder.
 *
 * Every image on the site went out as the full-size JPEG whatever the slot it
 * filled. This serves WebP at the width the layout actually asks for and keeps
 * the JPEG as the fallback for a browser that cannot read WebP. Art with no
 * variants yet falls through to a plain <img> — see webpSrcSet.
 *
 * Every caller states its own `alt`; see the prop.
 */
export function StoryPicture({
  src, alt, sizes, width, height, className, onError, eager,
}: {
  src: string;
  /**
   * What the picture is, for a reader who cannot see it — a blind child, a
   * phone whose connection dropped before the art arrived, an image search.
   *
   * Required, with no default, because the honest answer differs by slot and a
   * default would quietly pick the wrong one. Pass "" — and only "" — where
   * the picture sits next to the very words it illustrates, as on a card whose
   * title is inside the same link: there a description repeats the title, and
   * a screen reader reads the story's name twice in a row. Everywhere the
   * picture carries something the words around it do not, describe it.
   */
  alt: string;
  sizes: string;
  width: number;
  height: number;
  className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  /** The one picture above the fold on a page; everything else loads lazily. */
  eager?: boolean;
}) {
  const srcSet = webpSrcSet(src);
  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={onError}
    />
  );
  if (!srcSet) return img;
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      {img}
    </picture>
  );
}
