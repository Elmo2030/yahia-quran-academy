import { Headphones } from "lucide-react";

/**
 * A recorded reading of the story, above its text. The recordings are Arabic,
 * so callers render this for the Arabic page only, and only where a file
 * exists (lib/narration.generated.ts) — a story without one shows nothing.
 */
export function StoryNarration({ src }: { src: string }) {
  return (
    <section className="story-narration no-print" aria-labelledby="story-narration-title">
      <h2 id="story-narration-title"><Headphones size={18} aria-hidden="true" /> استمع إلى القصة</h2>
      <audio controls preload="none" src={src} />
    </section>
  );
}
