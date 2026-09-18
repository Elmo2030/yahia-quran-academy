// =============================================================================
// JourneyMap — Juz Amma as four regions, each a shelf of surahs to pick from.
//
// Nothing here is locked. A surah the child has not reached yet is drawn
// quietly rather than barred: the order is a suggestion, and a parent who wants
// to start somewhere else can. What the map does show is what was actually
// done — the stars each surah has earned — and where the child left off.
//
// The regions are stacked, but their surahs run sideways in a scrolling rail:
// thirty-eight cards down a phone is a long fall, and side by side they stay
// the same size, on the same baseline, near enough to compare. The child's
// character waits in the header of whichever region they are walking through.
// =============================================================================

import { useCallback, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Check, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { characterArt, surahIcon } from "@/lib/hifz-characters";
import { lookArt } from "@/lib/hifz-looks";
import { starsFor, type Stars } from "@/lib/hifz-stars";
import { reviewedRecitals, type ChildProfile } from "@/lib/hifz-store";
import { REGIONS, type Region } from "@/lib/journey-map";
import { ayahCountOf } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";

const copy = {
  ar: {
    map: "خريطة الرحلة",
    region: (name: string) => `منطقة ${name}`,
    starsOf: (earned: number, total: number) => `${earned} من ${total} نجمة في المنطقة`,
    station: (name: string, stars: number) => `سورة ${name} — ${stars} من ٣ نجوم`,
    here: "أنت هنا",
    scrollBack: "السور السابقة",
    scrollOn: "السور التالية",
    treasureLocked: (name: string) => `كنز ${name}: اجمع نجمة على كل سورة في المنطقة`,
    treasureOpen: (name: string) => `كنز ${name} — فُتح`,
    reviewed: "تمت مراجعة التسميع",
  },
  en: {
    map: "The journey map",
    region: (name: string) => `${name} region`,
    starsOf: (earned: number, total: number) => `${earned} of ${total} stars in this region`,
    station: (name: string, stars: number) => `Surah ${name} — ${stars} of 3 stars`,
    here: "You are here",
    scrollBack: "Earlier surahs",
    scrollOn: "Later surahs",
    treasureLocked: (name: string) => `${name} treasure: earn a star on every surah in the region`,
    treasureOpen: (name: string) => `${name} treasure — opened`,
    reviewed: "Recital reviewed",
  },
};

type Copy = (typeof copy)["ar"];

function StarRow({ stars }: { stars: Stars }) {
  return (
    <span className="map-stars" aria-hidden="true">
      {[1, 2, 3].map(n => <Star key={n} size={12} className={n <= stars ? "is-on" : ""} fill={n <= stars ? "currentColor" : "none"} />)}
    </span>
  );
}

export function JourneyMap({ profile, currentSurah }: { profile: ChildProfile; currentSurah: number }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const here = useRef<HTMLLIElement>(null);
  const reviewed = new Set(reviewedRecitals(profile).map(recital => recital.surah));

  // Open the map on the surah the child left off at, not at the first one.
  useEffect(() => {
    here.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <section className="map" aria-label={t.map}>
      {REGIONS.map(region => (
        <RegionBand key={region.id} region={region} profile={profile} currentSurah={currentSurah} reviewed={reviewed} t={t} hereRef={here} locale={locale} />
      ))}
    </section>
  );
}

function RegionBand({ region, profile, currentSurah, reviewed, t, hereRef, locale }: {
  region: Region;
  profile: ChildProfile;
  currentSurah: number;
  reviewed: Set<number>;
  t: Copy;
  hereRef: React.RefObject<HTMLLIElement | null>;
  locale: "ar" | "en";
}) {
  const track = useRef<HTMLOListElement>(null);
  const stars = Object.fromEntries(region.surahs.map(surah => [surah, starsFor(profile, surah, ayahCountOf(surah))]));
  const earned = region.surahs.reduce((sum, surah) => sum + stars[surah], 0);
  const opened = region.surahs.every(surah => stars[surah] > 0);
  const name = locale === "ar" ? region.nameAr : region.nameEn;
  // The child's own character stands in the region they are walking through,
  // with whichever companion they chose beside them.
  const walking = region.surahs.includes(currentSurah);
  const walker = walking ? characterArt(profile.character, "walk") : null;
  const pet = walking && profile.looks.pet ? lookArt("pet", profile.looks.pet) : null;

  // One nudge moves about two cards. In Arabic the rail runs the other way, and
  // so does the scroll offset the browser reports.
  const nudge = useCallback((forward: boolean) => {
    const rail = track.current;
    if (!rail) return;
    const step = Math.max(rail.clientWidth * 0.7, 180) * (forward ? 1 : -1);
    rail.scrollBy({ left: locale === "ar" ? -step : step, behavior: "smooth" });
  }, [locale]);

  const Back = locale === "ar" ? ChevronRight : ChevronLeft;
  const On = locale === "ar" ? ChevronLeft : ChevronRight;

  return (
    <section
      className="map-region"
      aria-label={t.region(name)}
      style={{
        ["--art-720" as string]: `url(/hifz-art/map/${region.art}-720.webp)`,
        ["--art-1080" as string]: `url(/hifz-art/map/${region.art}-1080.webp)`,
      }}
    >
      <header className="map-region__head">
        <img
          className={`map-treasure ${opened ? "is-open" : ""}`}
          src={`/hifz-art/rewards/${region.treasure}-256.webp`}
          /* Open or locked is the one thing on this header no text says. It was
             in `title` alone, which a screen reader is free to ignore. */
          alt={opened ? t.treasureOpen(name) : t.treasureLocked(name)}
          title={opened ? t.treasureOpen(name) : t.treasureLocked(name)}
          loading="lazy"
        />
        {/* The companion and the walker are the child's own chosen character,
            named where they chose it and unchanged from region to region. */}
        {pet && <img className="map-pet" src={pet.src} srcSet={pet.srcSet} sizes="38px" alt="" />}
        {walker && <img className="map-walker" src={walker.src} srcSet={walker.srcSet} sizes="52px" alt="" />}
        <div className="map-region__text">
          <h3 className="map-region__name">{name}</h3>
          <p className="map-region__meta">{t.starsOf(earned, region.surahs.length * 3)}</p>
        </div>
        <div className="map-region__nudge">
          <button type="button" onClick={() => nudge(false)} aria-label={t.scrollBack}><Back size={18} aria-hidden="true" /></button>
          <button type="button" onClick={() => nudge(true)} aria-label={t.scrollOn}><On size={18} aria-hidden="true" /></button>
        </div>
      </header>

      <ol className="map-track" ref={track}>
        {region.surahs.map(surah => {
          const surahName = locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah);
          const icon = surahIcon(surah);
          const isHere = surah === currentSurah;
          return (
            <li key={surah} ref={isHere ? hereRef : undefined}>
              <Link
                href={`/hifz/${surah}`}
                className={`map-card ${isHere ? "is-here" : ""} ${stars[surah] === 3 ? "is-full" : ""}`}
                aria-label={t.station(surahName, stars[surah])}
              >
                <span className="map-card__mark">
                  {icon ? <img src={icon.src} srcSet={icon.srcSet} sizes="56px" alt="" loading="lazy" /> : <b>{surah}</b>}
                </span>
                <span className="map-card__name">{surahName}</span>
                <StarRow stars={stars[surah] as Stars} />
                {reviewed.has(surah) && <span className="map-here map-reviewed"><Check size={12} aria-hidden="true" /> {t.reviewed}</span>}
                {isHere && <span className="map-here">{t.here}</span>}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default JourneyMap;
