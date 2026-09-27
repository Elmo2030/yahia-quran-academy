import { useState, type CSSProperties } from "react";
import { Link } from "wouter";
import { BookOpen, Castle, Mountain, Sparkles, Compass, Tent, Trees, Check, LockKeyhole, type LucideIcon } from "lucide-react";
import { mapPosition, worldState, type JourneyWorld, type WorldProgress } from "@/lib/journey-worlds";
import { journeyCopy } from "./copy";

const symbols: Record<JourneyWorld["symbol"], LucideIcon> = { book: BookOpen, town: Castle, mountain: Mountain, spark: Sparkles, compass: Compass, tent: Tent, tree: Trees };
// Coordinates belong to the supplied artwork, not to reading direction.
// The landmark once labelled "quran reading" (86.6%/33.8%, previously drawn
// as the standalone .journey-reading-landmark placeholder below) is unused
// since that standalone reader and its world were retired; it now hosts the
// Beautiful Names of Allah stop instead of sitting empty on the map.
const artworkStops: Record<string, { x: number; y: number }> = {
  seerah: { x: 24.5, y: 20.2 }, stories: { x: 50, y: 27 },
  hifz: { x: 74.7, y: 28.7 }, aqeedah: { x: 22.2, y: 51.7 },
  facts: { x: 46.4, y: 55.8 }, namesOfAllah: { x: 86.6, y: 33.8 },
  companions: { x: 76.5, y: 82.4 }, manners: { x: 52.4, y: 82.4 },
};
const mapArtwork = "/journey/map/adventure-worlds-blank.png";

export function WorldLandscape({ world }: { world: JourneyWorld }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const custom = world.illustration && world.illustration !== failedSource ? world.illustration : undefined;
  const Icon = symbols[world.symbol];
  return <span className={`adventure-landscape adventure-landscape--${world.landscape}`} aria-hidden="true">
    <img src={custom ?? mapArtwork} className={custom ? undefined : `journey-art-crop journey-art-crop--${world.landscape}`} alt="" loading="lazy" width="1672" height="941" onError={custom ? () => setFailedSource(custom) : undefined} />
    {!custom && <Icon size={40} strokeWidth={1.6} />}
  </span>;
}

export function JourneyWorldMap({ worlds, currentId, progress, destinations, locale }: {
  worlds: readonly JourneyWorld[]; currentId: string; progress: Record<string, WorldProgress>;
  destinations: Record<string, string>; locale: "ar" | "en";
}) {
  const t = journeyCopy[locale];
  const height = Math.ceil((worlds.length + 1) / 3) * 235 + 50;
  const points = [...worlds, null].map((_, i) => mapPosition(i));
  const segments = points.slice(1).map((point, index) => {
    const before = points[index];
    return `M ${before.x * 10} ${before.y} C ${before.x * 10} ${before.y + 95}, ${point.x * 10} ${point.y - 95}, ${point.x * 10} ${point.y}`;
  });
  const end = points[points.length - 1];
  const illustrated = worlds.every(world => artworkStops[world.id]);
  return <section className={`adventure-map${illustrated ? " adventure-map--illustrated" : ""}`} aria-label={t.map} style={{ "--map-height": `${height}px` } as CSSProperties}>
    {illustrated && <><div className="journey-map-art" aria-hidden="true"><img src={mapArtwork} alt="" width="1672" height="941" fetchPriority="high" /></div><div className="journey-map-title" aria-hidden="true"><b>{t.title}</b><span>{t.intro}</span></div></>}
    <div className="adventure-map__cloud adventure-map__cloud--one" aria-hidden="true" /><div className="adventure-map__cloud adventure-map__cloud--two" aria-hidden="true" />
    <svg className="adventure-trail" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {segments.map((d, i) => <g key={i} className={worldState(worlds[i], currentId, progress[worlds[i].id]) === "completed" ? "is-travelled" : ""}><path className="adventure-trail__shadow" d={d} /><path className="adventure-trail__line" d={d} /></g>)}
    </svg>
    <ol className="adventure-stops">
      {worlds.map((world, i) => {
        const state = worldState(world, currentId, progress[world.id]);
        const current = world.id === currentId;
        const pos = points[i];
        const count = progress[world.id];
        const status = t[state === "active" ? "here" : state];
        const content = <><WorldLandscape world={world} /><span className="adventure-sign"><b>{world.title[locale]}</b><span className="adventure-stop__state">{state === "completed" ? <Check size={15} /> : state === "locked" || state === "comingSoon" ? <LockKeyhole size={14} /> : <Compass size={14} />}{status}</span>{count && <small>{world.id === "hifz" ? `${t.hifzCount}: ` : ""}{t.count(count.count, count.total)}</small>}</span></>;
        return <li key={world.id} className={`adventure-stop is-${state}${current ? " is-current" : ""}`} style={{ "--stop-x": `${pos.x}%`, "--stop-y": `${pos.y}px`, "--art-x": `${artworkStops[world.id]?.x ?? pos.x}%`, "--art-y": `${artworkStops[world.id]?.y ?? 50}%` } as CSSProperties}>
          {current && <span className="adventure-position"><Compass size={16} aria-hidden="true" />{t.here}</span>}
          {state === "locked" || state === "comingSoon" ? <div aria-disabled="true" aria-label={`${world.title[locale]} — ${status}`}>{content}</div> :
            <Link href={destinations[world.id] ?? world.href!} aria-current={current ? "location" : undefined} aria-label={`${world.title[locale]} — ${status} — ${t.explore}`}>{content}</Link>}
        </li>;
      })}
      <li className="adventure-stop adventure-treasure" style={{ "--stop-x": `${end.x}%`, "--stop-y": `${end.y}px`, "--art-x": "27%", "--art-y": "83%" } as CSSProperties}>
        <img src="/hifz-art/rewards/gift-closed-256.webp" alt="" width="115" height="115" loading="lazy" /><b>{t.treasures}</b><span>{t.ongoing}</span><small>{t.symbolic}</small>
      </li>
    </ol>
  </section>;
}
