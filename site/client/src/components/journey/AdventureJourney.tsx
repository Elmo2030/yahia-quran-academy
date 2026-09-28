import { useEffect, useReducer } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Award, BookOpen, Compass, Sparkles, Star } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { activeProfile, confirmedDeeds } from "@/lib/hifz-store";
import { totalStars } from "@/lib/hifz-stars";
import { characterArt } from "@/lib/hifz-characters";
import { factIndex } from "@/lib/page-index.generated";
import { readFactDiscoveries, factsDiscoveryKey } from "@/lib/quran-facts-progress";
import { FACTS_PER_STAGE, stageIsComplete } from "@/lib/quran-facts-journey";
import { journeyWorlds, journeyWorldProgress, worldForHref } from "@/lib/journey-worlds";
import { childJourneyActivities } from "@/components/ChildJourney";
import { useOptionalAuth } from "@/contexts/AuthContext";
import { JourneyWorldMap, WorldLandscape } from "./JourneyWorldMap";
import { journeyCopy } from "./copy";
import "./adventure-journey.css";

export function AdventureJourney() {
  const { locale } = useLocale();
  const t = journeyCopy[locale];
  const { store } = useHifzStore();
  const profile = activeProfile(store);
  const [, refresh] = useReducer(n => n + 1, 0);
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === factsDiscoveryKey(profile?.id)) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("focus", refresh); };
  }, [profile?.id]);
  const discovered = readFactDiscoveries(factIndex.map(f => f.slug), profile?.id);
  const progress = journeyWorldProgress(profile, discovered);
  const authUserId = useOptionalAuth()?.session?.user.id ?? null;
  const { primary, activities } = childJourneyActivities(locale, profile?.id ?? null, profile, authUserId);
  const currentId = worldForHref(primary.href);
  const currentWorld = journeyWorlds.find(w => w.id === currentId)!;
  const liveWorlds = journeyWorlds.filter(w => !w.comingSoon);
  const nextWorld = liveWorlds[(liveWorlds.findIndex(w => w.id === currentId) + 1) % liveWorlds.length];
  const destinations = Object.fromEntries(activities.map(a => [a.kind, a.href]));
  destinations[currentId] = primary.href;
  if (progress.facts.count === progress.facts.total) destinations.facts = "/quran-facts";
  const stars = profile ? totalStars(profile) : 0;
  const deeds = profile && profile.character !== "guest" ? confirmedDeeds(profile) : [];
  const medals = Array.from({ length: Math.ceil(factIndex.length / FACTS_PER_STAGE) }, (_, i) => i).filter(i => stageIsComplete(factIndex, discovered, i));
  const avatar = characterArt(profile?.character ?? "guest", "wave");
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const named = profile && profile.character !== "guest";

  return <div className="adventure-journey">
    <header className="adventure-hero">
      <div className="adventure-hero__identity">{avatar && <img src={avatar.src} srcSet={avatar.srcSet} sizes="90px" width="90" height="105" alt="" />}<span>{named ? profile.name : t.welcome}<h1>{t.title}</h1></span></div>
      <p>{t.intro}</p>
      <span className="adventure-hero__context">{t.here} · {currentWorld.title[locale]}</span>
      <a className="adventure-hero__mission" href="#journey-mission"><Compass size={17} aria-hidden="true" />{t.jump}<Arrow size={16} aria-hidden="true" /></a>
    </header>

    <JourneyWorldMap worlds={journeyWorlds.filter(w => !w.comingSoon || w.onMap)} currentId={currentId} progress={progress} destinations={destinations} locale={locale} />

    <div className="adventure-dashboard">
      <section className="adventure-mission" id="journey-mission" aria-labelledby="journey-mission-title" tabIndex={-1}>
        <span className="adventure-kicker"><Compass size={17} aria-hidden="true" />{t.mission}</span>
        <div className="adventure-mission__body"><WorldLandscape world={currentWorld} /><div><h2 id="journey-mission-title">{primary.title}</h2>{primary.body !== primary.title && <p>{primary.body}</p>}</div></div>
        <Link href={primary.href} className="button button--primary" data-testid="journey-next-step">{primary.kind === "start" ? t.start : t.continue}<Arrow size={18} aria-hidden="true" /></Link>
        <Link className="adventure-library-link" href={currentWorld.href!}>{t.library}</Link>
      </section>
      <section className="adventure-progress" aria-labelledby="journey-progress-title">
        <h2 id="journey-progress-title">{t.progress}</h2>
        <dl><div><dt><Star aria-hidden="true" />{t.stars}</dt><dd>{stars}</dd></div><div><dt><BookOpen aria-hidden="true" />{t.stories}</dt><dd>{progress.stories.count}</dd></div><div><dt><Sparkles aria-hidden="true" />{t.facts}</dt><dd>{progress.facts.count}</dd></div></dl>
        <p>{named ? t.local : t.guest}</p><Link href="/hifz" className="adventure-library-link">{named ? profile.name : t.profile}</Link>
      </section>
      <section className="adventure-next" aria-labelledby="journey-next-title">
        <span className="adventure-kicker">{t.next}</span><WorldLandscape world={nextWorld} /><h2 id="journey-next-title">{nextWorld.title[locale]}</h2><p>{t.nextHint}</p><Link href={destinations[nextWorld.id] ?? nextWorld.href!} className="adventure-library-link">{t.explore}<Arrow size={16} aria-hidden="true" /></Link>
      </section>
    </div>

    <section className="adventure-achievements" aria-labelledby="journey-achievements-title">
      <div className="adventure-section-heading"><Award aria-hidden="true" /><h2 id="journey-achievements-title">{t.achievements}</h2></div>
      {medals.length === 0 && deeds.length === 0 && stars === 0 ? <p>{t.emptyRewards}</p> : <ul>
        {stars > 0 && <li><Link href="/hifz"><Star size={32} aria-hidden="true" /><b>{stars} {t.stars}</b></Link></li>}
        {medals.map(i => <li key={i}><Link href="/quran-facts"><Award size={32} aria-hidden="true" /><b>{t.medal(i + 1)}</b></Link></li>)}
        {deeds.length > 0 && <li><Link href="/hifz/parent"><img src="/hifz-art/rewards/gift-closed-128.webp" width="52" height="52" alt="" loading="lazy" /><b>{t.rewardLink} · {deeds.length}</b></Link></li>}
      </ul>}
    </section>

    <section className="adventure-upcoming" aria-labelledby="journey-upcoming-title">
      <div className="adventure-section-heading"><Sparkles aria-hidden="true" /><h2 id="journey-upcoming-title">{t.upcoming}</h2></div><p>{t.upcomingNote}</p>
      <ul tabIndex={0} aria-label={t.upcoming}>{journeyWorlds.filter(w => w.comingSoon).map(world => <li key={world.id}><WorldLandscape world={world} /><b>{world.title[locale]}</b><span>{t.comingSoon}</span></li>)}</ul>
    </section>
    <p className="adventure-farewell"><Compass size={22} aria-hidden="true" />{t.ongoing} <span>{t.symbolic}</span></p>
  </div>;
}
