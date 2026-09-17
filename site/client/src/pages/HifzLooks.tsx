// =============================================================================
// HifzLooks — the child decides how their own card looks.
//
// Everything here is open from the first minute. Nothing is locked behind
// stars, because the stars record what a child did and would stop meaning that
// the moment they could be spent. So this screen asks for no achievement: pick
// a frame, a scene, a companion for the road, and whichever stickers you like.
// =============================================================================

import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { HifzBottomBar } from "@/components/HifzBottomBar";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { BadgeAward } from "@/components/BadgeAward";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { characterArt, characterById } from "@/lib/hifz-characters";
import { CARDS, FRAMES, PETS, STICKERS, lookArt, lookName, type LookKind, type LookOption } from "@/lib/hifz-looks";
import { activeProfile, confirmedDeeds, toggleSticker, updateLooks, type ChildProfile } from "@/lib/hifz-store";

const copy = {
  ar: {
    back: "رحلة الحفظ",
    title: "زيّن بطاقتك",
    intro: "كل حاجة هنا مفتوحة من أول يوم. النجوم بتقول إيه اللي عملته، ومش بتتصرف في حاجة.",
    noChild: "اختر الطفل أولًا",
    pickChild: "اختر الطفل",
    preview: "شكل بطاقتك",
    frames: "إطار الصورة",
    cards: "خلفية البطاقة",
    pets: "رفيق الطريق",
    stickers: "رفّ الملصقات",
    stickersHint: "اضغط على أي ملصق تحطّه على الرفّ أو تشيله.",
    none: "بدون",
    chosen: "مختار",
    shelfEmpty: "الرفّ فاضي — اختر ملصقًا من تحت.",
    deedsTitle: "الأفعال المؤكَّدة",
    deedsEmpty: "لسه مفيش أفعال مؤكَّدة.",
    deedsExplore: "اكتشف قصص القرآن",
    deedReward: "كنز الفعل",
    deedFromStory: "فعل من إحدى القصص.", deedOpenStory: "افتح القصة لتقرأها",
    confirmedOn: (date: string) => `أُكِّد في ${date}`,
  },
  en: {
    back: "Memorization journey",
    title: "Make it yours",
    intro: "Everything here is open from day one. Stars record what you did; they are not spent on anything.",
    noChild: "Choose the child first",
    pickChild: "Choose the child",
    preview: "Your card",
    frames: "Picture frame",
    cards: "Card background",
    pets: "A companion",
    stickers: "Sticker shelf",
    stickersHint: "Tap a sticker to put it on the shelf or take it off.",
    none: "None",
    chosen: "Chosen",
    shelfEmpty: "The shelf is empty — pick a sticker below.",
    deedsTitle: "Confirmed deeds",
    deedsEmpty: "No deeds confirmed yet.",
    deedsExplore: "Explore the Quran stories",
    deedReward: "The deed's treasure",
    deedFromStory: "A deed from one of the stories.", deedOpenStory: "Open the story to read it",
    confirmedOn: (date: string) => `Confirmed on ${date}`,
  },
};

type Copy = (typeof copy)["ar"];

export default function HifzLooks() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { store, commit } = useHifzStore();
  const profile = activeProfile(store);
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <main className="site-shell hifz" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>
        <section className="section hifz-section">
          <div className="container hifz-stack">
            <header className="hifz-memorize__bar">
              <Link href="/hifz" className="hifz-back"><Back size={17} aria-hidden="true" /> {t.back}</Link>
              <div className="hifz-memorize__title">
                <h1><Sparkles size={19} aria-hidden="true" /> {t.title}</h1>
                <span>{t.intro}</span>
              </div>
            </header>

            {profile
              ? <Looks t={t} profile={profile} store={store} commit={commit} />
              : (
                <article className="hifz-card">
                  <h2 className="hifz-notice-title">{t.noChild}</h2>
                  <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.pickChild}</Link></div>
                </article>
              )}
          </div>
        </section>
      </div>
    <HifzBottomBar />
    </main>
  );
}

function Looks({ t, profile, store, commit }: {
  t: Copy; profile: ChildProfile; store: ReturnType<typeof useHifzStore>["store"]; commit: (s: ReturnType<typeof useHifzStore>["store"]) => boolean;
}) {
  const { locale } = useLocale();
  const looks = profile.looks;
  const set = (patch: Parameters<typeof updateLooks>[2]) => commit(updateLooks(store, profile.id, patch));

  return (
    <>
      <CardPreview t={t} profile={profile} />
      <ConfirmedDeeds t={t} profile={profile} />

      <Row t={t} kind="frame" title={t.frames} options={FRAMES} chosen={looks.frame} onPick={id => set({ frame: id })} />
      <Row t={t} kind="card" title={t.cards} options={CARDS} chosen={looks.card} onPick={id => set({ card: id })} />
      <Row t={t} kind="pet" title={t.pets} options={PETS} chosen={looks.pet} onPick={id => set({ pet: id })} />

      <section className="hifz-card hifz-looks">
        <h2>{t.stickers}</h2>
        <p className="hifz-muted">{t.stickersHint}</p>
        <ul className="hifz-looks__row" role="list">
          {STICKERS.map(option => {
            const on = looks.stickers.includes(option.id);
            return (
              <li key={option.id}>
                <button
                  type="button"
                  className={`hifz-look ${on ? "is-on" : ""}`}
                  aria-pressed={on}
                  onClick={() => commit(toggleSticker(store, profile.id, option.id))}
                >
                  <LookImage kind="sticker" option={option} />
                  <span>{locale === "ar" ? option.nameAr : option.nameEn}</span>
                  {on && <Check className="hifz-look__tick" size={15} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

/**
 * A deed a parent has actually confirmed does not stop existing the moment
 * the medal that marked its confirmation scrolls off the parent's screen —
 * this is where it lives afterwards. Reads only the deed's own record (see
 * StepStoryInfo in hifz-store.ts), so this page never imports the stories
 * module either.
 */
function ConfirmedDeeds({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  const deeds = confirmedDeeds(profile);
  const dateOf = (at: number) => new Date(at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB");

  return (
    <section className="hifz-card hifz-looks">
      <h2>{t.deedsTitle}</h2>
      {deeds.length === 0 ? (
        <p className="hifz-muted">{t.deedsEmpty} <Link href="/stories" className="text-link">{t.deedsExplore}</Link></p>
      ) : (
        <ul className="hifz-deeds-earned" role="list">
          {deeds.map(({ chapter, slug, record }) => (
            <li key={`${chapter}:${slug}`} className="hifz-deed hifz-deed--awarded">
              {record.story ? (
                <>
                  <BadgeAward icon={record.story.reward.icon} badge={record.story.reward.badge} keepsake={record.story.reward.keepsake} note={record.story.reward.note} label={t.deedReward} />
                  <small>{record.story.title}</small>
                </>
              ) : (
                <p>{t.deedFromStory} <Link href={`/stories/${chapter}/${slug}`} className="text-link">{t.deedOpenStory}</Link></p>
              )}
              {record.reviewedAt && <small className="hifz-muted">{t.confirmedOn(dateOf(record.reviewedAt))}</small>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Row({ t, kind, title, options, chosen, onPick }: {
  t: Copy; kind: LookKind; title: string; options: LookOption[]; chosen: string | null; onPick: (id: string | null) => void;
}) {
  const { locale } = useLocale();
  return (
    <section className="hifz-card hifz-looks">
      <h2>{title}</h2>
      <ul className="hifz-looks__row" role="list">
        <li>
          <button type="button" className={`hifz-look hifz-look--none ${chosen === null ? "is-on" : ""}`} aria-pressed={chosen === null} onClick={() => onPick(null)}>
            <span className="hifz-look__empty" aria-hidden="true" />
            <span>{t.none}</span>
            {chosen === null && <Check className="hifz-look__tick" size={15} aria-hidden="true" />}
          </button>
        </li>
        {options.map(option => {
          const on = chosen === option.id;
          return (
            <li key={option.id}>
              <button type="button" className={`hifz-look ${on ? "is-on" : ""}`} aria-pressed={on} onClick={() => onPick(option.id)}>
                <LookImage kind={kind} option={option} />
                <span>{locale === "ar" ? option.nameAr : option.nameEn}</span>
                {on && <Check className="hifz-look__tick" size={15} aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function LookImage({ kind, option }: { kind: LookKind; option: LookOption }) {
  const art = lookArt(kind, option.id);
  if (!art) return <span className="hifz-look__empty" aria-hidden="true" />;
  return <img className={`hifz-look__art hifz-look__art--${kind}`} src={art.src} srcSet={art.srcSet} sizes="72px" alt="" loading="lazy" />;
}

/** The card as the child will see it, with whatever is chosen right now. */
function CardPreview({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  const looks = profile.looks;
  const card = looks.card ? lookArt("card", looks.card) : null;
  const frame = looks.frame ? lookArt("frame", looks.frame) : null;
  const pet = looks.pet ? lookArt("pet", looks.pet) : null;
  const avatar = characterArt(profile.character, "avatar");
  const initial = characterById(profile.character)?.initial ?? "";

  return (
    <section className="hifz-card hifz-looks-preview" aria-label={t.preview}>
      <div className="hifz-preview" style={card ? { backgroundImage: `url(${card.src})` } : undefined}>
        <div className="hifz-preview__figure">
          {avatar
            ? <img className="hifz-preview__avatar" src={avatar.src} srcSet={avatar.srcSet} sizes="96px" alt="" />
            : <span className="hifz-preview__avatar hifz-preview__avatar--placeholder"><b>{initial}</b></span>}
          {frame && <img className="hifz-preview__frame" src={frame.src} srcSet={frame.srcSet} sizes="150px" alt="" />}
        </div>
        <b className="hifz-preview__name">{profile.name || (locale === "ar" ? "ضيف" : "Guest")}</b>
        {pet && <img className="hifz-preview__pet" src={pet.src} srcSet={pet.srcSet} sizes="72px" alt={lookName("pet", looks.pet!, locale)} />}
      </div>

      <ul className="hifz-shelf" role="list">
        {looks.stickers.length === 0 && <li className="hifz-shelf__empty">{t.shelfEmpty}</li>}
        {looks.stickers.map(id => {
          const art = lookArt("sticker", id);
          return (
            <li key={id}>
              {art
                ? <img src={art.src} srcSet={art.srcSet} sizes="44px" alt={lookName("sticker", id, locale)} />
                : <span>{lookName("sticker", id, locale)}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
