import { webpSrcSet } from "@/lib/story-images";

/**
 * A story picture with its WebP ladder.
 *
 * Every image on the site went out as the full-size JPEG whatever the slot it
 * filled. This serves WebP at the width the layout actually asks for and keeps
 * the JPEG as the fallback for a browser that cannot read WebP. Art with no
 * variants yet falls through to a plain <img> — see webpSrcSet.
 */
export function StoryPicture({
  src, sizes, width, height, className, onError, eager,
}: {
  src: string;
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
      alt=""
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
