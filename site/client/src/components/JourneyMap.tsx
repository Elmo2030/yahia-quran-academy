// =============================================================================
// JourneyMap — Juz Amma as a path a child walks up, oasis to mountains.
//
// Nothing on the map is locked. A station a child has not reached yet is drawn
// quietly rather than barred: the order is a suggestion, and a parent who wants
// to start somewhere else can. What the map does show is what was actually
// done — the stars each surah has earned — and where the child left off.
// =============================================================================

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Star } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { characterArt, surahIcon } from "@/lib/hifz-characters";
import { starsFor, type Stars } from "@/lib/hifz-stars";
import type { ChildProfile } from "@/lib/hifz-store";
import { REGIONS, stationsOf, type Region } from "@/lib/journey-map";
import { ayahCountOf } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";

/** The region art is 1536 x 2752, and the path is drawn in that ratio. */
const VIEW_HEIGHT = 179;

const copy = {
  ar: {
    map: "خريطة الرحلة",
    starsOf: (stars: number) => `${stars} من ٣ نجوم`,
    station: (name: string, stars: number) => `سورة ${name} — ${stars} من ٣ نجوم`,
    here: "أنت هنا",
    treasureLocked: (name: string) => `كنز ${name}: اجمع نجمة على كل سورة في المنطقة`,
    treasureOpen: (name: string) => `كنز ${name} — فُتح`,
  },
  en: {
    map: "The journey map",
    starsOf: (stars: number) => `${stars} of 3 stars`,
    station: (name: string, stars: number) => `Surah ${name} — ${stars} of 3 stars`,
    here: "You are here",
    treasureLocked: (name: string) => `${name} treasure: earn a star on every surah in the region`,
    treasureOpen: (name: string) => `${name} treasure — opened`,
  },
};

function StarRow({ stars }: { stars: Stars }) {
  return (
    <span className="map-stars" aria-hidden="true">
      {[1, 2, 3].map(n => <Star key={n} size={11} className={n <= stars ? "is-on" : ""} fill={n <= stars ? "currentColor" : "none"} />)}
    </span>
  );
}

export function JourneyMap({ profile, currentSurah }: { profile: ChildProfile; currentSurah: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const here = useRef<HTMLLIElement>(null);

  // Open the map where the child left off rather than at the top of Juz Amma.
  useEffect(() => {
    here.current?.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <section className="map" aria-label={t.map}>
      {[...REGIONS].reverse().map(region => (
        <RegionBand key={region.id} region={region} profile={profile} currentSurah={currentSurah} t={t} hereRef={here} locale={locale} />
      ))}
    </section>
  );
}

function RegionBand({ region, profile, currentSurah, t, hereRef, locale }: {
  region: Region;
  profile: ChildProfile;
  currentSurah: number;
  t: (typeof copy)["ar"];
  hereRef: React.RefObject<HTMLLIElement | null>;
  locale: "ar" | "en";
}) {
  const stations = stationsOf(region);
  const stars = Object.fromEntries(region.surahs.map(surah => [surah, starsFor(profile, surah, ayahCountOf(surah))]));
  const opened = region.surahs.every(surah => stars[surah] > 0);
  const points = stations.map(s => `${s.x},${(s.y * VIEW_HEIGHT) / 100}`).join(" ");
  const name = locale === "ar" ? region.nameAr : region.nameEn;
  // The child's own character stands at the station they are on.
  const walker = characterArt(profile.character, "walk");

  return (
    <div className="map-region" style={{ backgroundImage: `url(/hifz-art/map/${region.art}-1080.webp)` }}>
      <span className="map-region__name">{name}</span>

      <svg className="map-path" viewBox={`0 0 100 ${VIEW_HEIGHT}`} aria-hidden="true" focusable="false">
        <polyline points={points} fill="none" />
      </svg>

      <img
        className={`map-treasure ${opened ? "is-open" : ""}`}
        src={`/hifz-art/rewards/${region.treasure}-256.webp`}
        alt=""
        title={opened ? t.treasureOpen(name) : t.treasureLocked(name)}
        loading="lazy"
      />

      <ol className="map-stations">
        {stations.map(station => {
          const surahName = locale === "ar" ? getSurahName(station.surah) : getEnglishSurahName(station.surah);
          const icon = surahIcon(station.surah);
          const isHere = station.surah === currentSurah;
          return (
            <li key={station.surah} ref={isHere ? hereRef : undefined} style={{ insetBlockEnd: `${100 - station.y}%`, insetInlineStart: `${station.x}%` }}>
              <Link href={`/hifz/${station.surah}`} className={`map-station ${isHere ? "is-here" : ""} ${stars[station.surah] === 3 ? "is-full" : ""}`} aria-label={t.station(surahName, stars[station.surah])}>
                <span className="map-station__mark">
                  {icon ? <img src={icon.src} srcSet={icon.srcSet} sizes="54px" alt="" loading="lazy" /> : <b>{station.surah}</b>}
                </span>
                <span className="map-station__name">{surahName}</span>
                <StarRow stars={stars[station.surah] as Stars} />
                {isHere && <span className="map-here">{t.here}</span>}
                {isHere && walker && <img className="map-walker" src={walker.src} srcSet={walker.srcSet} sizes="70px" alt="" />}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default JourneyMap;
