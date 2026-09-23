// =============================================================================
// Hifz — the memorization journey. Phase 1: who is memorizing, and how.
//
// A device can hold several children (brothers and sisters on one tablet) and a
// guest. Each child picks a character and their own settings. Everything stays
// on the device; the backup file is how it moves to another one.
//
// The surah list leads to the ayah-by-ayah screen (HifzSurah). The Juz Amma map
// replaces the list in phase 3.
// =============================================================================

import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "wouter";
import {
  BookOpen, Check, ChevronLeft, ChevronRight, Download, HardDrive, Pencil, Plus, Settings2, ShieldAlert,
  Award, KeyRound, ShieldCheck, Sparkles, Star, Trash2, Upload, UserRound, Users,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { HifzBottomBar } from "@/components/HifzBottomBar";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { lookArt, lookName } from "@/lib/hifz-looks";
import { InstallCard } from "@/components/InstallCard";
import { JourneyMap } from "@/components/JourneyMap";
import { CHARACTERS, characterArt, characterById, surahIcon, type Pose } from "@/lib/hifz-characters";
import { nextDueDay, dayNumber, todayPlan } from "@/lib/hifz-review";
import { nextRank, rankFor, totalStars } from "@/lib/hifz-stars";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";
import { deleteProfileRecordings } from "@/lib/recordings";
import { resetFactDiscoveries } from "@/lib/quran-facts-progress";
import {
  MAX_BACKUP_BYTES, MAX_NAME_LENGTH, MAX_PROFILES, activeProfile, backupFileName, createProfile, enterAsGuest, exportBackup, markBackedUp,
  checkPersistence, importBackup, markNoteSeen, namedProfiles, removeProfile, requestPersistence, selectProfile, surahProgress, unseenNote, updateProfile, updateSettings,
  type CharacterId, type ChildProfile, type FontStep, type HifzStore, type ImportResult, type Persistence,
  type ReciterChoice,
} from "@/lib/hifz-store";

export const copy = {
  ar: {
    eyebrow: "رحلة الحفظ",
    pickTitle: "من سيحفظ اليوم؟",
    pickIntro: "كل طفل له ملفه وشخصيته وإعداداته. كل شيء محفوظ على هذا الجهاز فقط.",
    firstTitle: "ابدأ رحلة الحفظ",
    firstIntro: "اختر اسم الطفل ورفيقه في الرحلة. لا حساب ولا بريد إلكتروني — البيانات تبقى على هذا الجهاز.",
    addChild: "أضف طفلًا",
    guest: "ادخل كضيف",
    guestName: "ضيف",
    guestNote: "الضيف يتدرّب بلا اسم. لو أردت أن يبقى تقدّمه باسمه، أضفه كطفل.",
    limit: `وصلت إلى ${MAX_PROFILES} أطفال على هذا الجهاز.`,
    nameLabel: "اسم الطفل",
    namePlaceholder: "اكتب اسم طفلك",
    characterLabel: "اختر رفيق الرحلة",
    artPending: "رسمتها في الطريق",
    start: "ابدأ الرحلة",
    save: "احفظ",
    cancel: "إلغاء",
    errors: { name: "اكتب اسم الطفل.", duplicate: "يوجد طفل بهذا الاسم على هذا الجهاز.", limit: `الحد ${MAX_PROFILES} أطفال على الجهاز.`, missing: "لم يعد هذا الملف موجودًا." },
    // The greeting calls the child a friend rather than by name: the name is
    // theirs to see on their own card, not a label the page shouts back at them.
    hello: (girl: boolean) => (girl ? "أهلًا يا صديقتي الصغيرة" : "أهلًا يا صديقي الصغير"),
    helloGuest: "أهلًا بك",
    switchChild: "غيّر الطفل",
    journeyTitle: "خريطة الرحلة",
    journeyBody: "ابدأ من الواحة واصعد للجبال. اسحب السور جانبًا، واضغط على أي سورة لتبدأ فيها.",
    rankLabel: "رتبتك",
    starsCount: (n: number) => `${n} نجمة`,
    nextRankIn: (n: number, name: string) => `${n} نجمة للوصول إلى «${name}»`,
    topRank: "أعلى رتبة في الرحلة",
    starsHow: "النجمة الأولى للاستماع الكامل، والثانية للتسجيل، والثالثة لإعلان الحفظ ومراجعته في يوم آخر.",
    listView: "اعرض السور كقائمة",
    todayTitle: "اليوم",
    todayDue: (n: number) => (n === 1 ? "آية واحدة تنتظر المراجعة" : `${n} آيات تنتظر المراجعة`),
    todayClear: "لا مراجعة اليوم",
    todayClearBody: "كل ما أعلنت حفظه ما زال في موعده.",
    todayNext: (n: number) => (n === 1 ? "المراجعة القادمة غدًا" : `المراجعة القادمة بعد ${n} أيام`),
    startReview: "ابدأ المراجعة",
    streak: (n: number) => (n === 1 ? "يوم متصل" : n === 2 ? "يومان متصلان" : `${n} أيام متصلة`),
    streakNone: "ابدأ اليوم أول يوم",
    learnedToday: (n: number) => (n === 1 ? "آية جديدة اليوم" : `${n} آيات جديدة اليوم`),
    continueWith: (name: string) => `أكمل: سورة ${name}`,
    surahProgress: (declared: number, total: number) => `حفظتَ ${declared} من ${total}`,
    surahDone: "حُفظت كلها",
    settingsTitle: "إعدادات الحفظ",
    repeatLabel: "كم مرة تُعاد الآية؟",
    repeatUnit: (n: number) => (n === 1 ? "مرة" : n === 2 ? "مرتان" : `${n} مرات`),
    autoplayLabel: "انتقل للآية التالية تلقائيًا",
    autoplayHint: "بعد انتهاء مرات التكرار.",
    reciterLabel: "طريقة الاستماع",
    reciters: {
      sheikh: { title: "الشيخ فقط", body: "الحصري المعلّم" },
      sheikh_kids: { title: "الشيخ والأطفال", body: "المنشاوي مع الأطفال يردّدون" },
    },
    fontLabel: "حجم خط الآيات",
    fontSteps: ["عادي", "كبير", "أكبر"],
    editTitle: "تعديل الملف",
    deviceTitle: "البيانات على هذا الجهاز",
    persisted: "المتصفح وافق على الاحتفاظ بالبيانات ولن يمسحها وحده.",
    bestEffort: "قد يمسح المتصفح البيانات لو لم يُفتح الموقع لفترة (خاصة على آيفون وآيباد). احفظ نسخة احتياطية، أو أضف الموقع إلى الشاشة الرئيسية.",
    unsupported: "لا يمكن التأكد من أن المتصفح سيحتفظ بالبيانات. احفظ نسخة احتياطية من وقت لآخر.",
    saveFailed: "لم يستطع المتصفح حفظ آخر تغيير — ربما التصفح الخاص مفعّل أو المساحة ممتلئة.",
    exportLabel: "احفظ نسخة احتياطية",
    exportHint: "ملف صغير بكل الأطفال وإعداداتهم وتقدّمهم.",
    importLabel: "استرجع نسخة",
    importReady: (n: number) => `${n === 0 ? "الملف فيه تقدّم الضيف فقط" : `الملف فيه ${n === 1 ? "طفل واحد" : `${n} أطفال`}`}. سيحلّ محلّ كل ما على هذا الجهاز الآن.`,
    importConfirm: "استبدل واسترجع",
    imported: "تم استرجاع النسخة.",
    importErrors: {
      unreadable: "تعذّرت قراءة الملف.",
      "not-a-backup": "هذا الملف ليس نسخة احتياطية من رحلة الحفظ.",
      "newer-version": "هذه النسخة من إصدار أحدث من الموقع. حدّث الصفحة ثم حاول مجددًا.",
      empty: "النسخة لا تحتوي على أي طفل.",
      "too-large": "الملف أكبر من أن يكون نسخة احتياطية من رحلة الحفظ.",
    },
    removeLabel: (name: string) => `احذف ملف ${name}`,
    removeGuest: "امسح تقدّم الضيف",
    removeConfirm: "نعم، احذف نهائيًا",
    removeWarning: "سيُحذف الملف وكل تقدّمه من هذا الجهاز، ولا يمكن التراجع إلا من نسخة احتياطية.",
    looksLink: "زيّن بطاقتك",
    shelfTitle: "رفّ الملصقات",
    parentCorner: "ركن وليّ الأمر",
    certificate: "شهادة الرحلة",
    reviewedResult: "ما شاء الله! وليّ الأمر قال إن المقطع جاهز.",
    practiceResult: "المقطع ده محتاج تدريب شوية.",
    resultOkay: "حسنًا",
    practiseAgain: "أعِد التسميع",
    home: "الرئيسية",
  },
  en: {
    eyebrow: "Memorization journey",
    pickTitle: "Who is memorizing today?",
    pickIntro: "Each child has their own profile, character and settings. Everything stays on this device.",
    firstTitle: "Start the memorization journey",
    firstIntro: "Choose the child’s name and a companion for the journey. No account, no email — the data stays on this device.",
    addChild: "Add a child",
    guest: "Continue as a guest",
    guestName: "Guest",
    guestNote: "A guest practises without a name. To keep a child’s progress under their name, add them as a child.",
    limit: `This device already has ${MAX_PROFILES} children.`,
    nameLabel: "Child’s name",
    namePlaceholder: "Your child’s name",
    characterLabel: "Choose a companion",
    artPending: "Artwork on its way",
    start: "Start the journey",
    save: "Save",
    cancel: "Cancel",
    errors: { name: "Write the child’s name.", duplicate: "A child with this name is already on this device.", limit: `A device holds up to ${MAX_PROFILES} children.`, missing: "This profile no longer exists." },
    hello: (_girl: boolean) => "Hello, little friend",
    helloGuest: "Welcome",
    switchChild: "Switch child",
    journeyTitle: "The journey map",
    journeyBody: "Start at the oasis and climb to the mountains. Swipe the surahs sideways, and tap any one to begin there.",
    rankLabel: "Your rank",
    starsCount: (n: number) => `${n} stars`,
    nextRankIn: (n: number, name: string) => `${n} more stars to reach “${name}”`,
    topRank: "The highest rank on the journey",
    starsHow: "The first star is for listening all the way through, the second for recording, the third for saying it is memorized and coming back to it another day.",
    listView: "Show the surahs as a list",
    todayTitle: "Today",
    todayDue: (n: number) => (n === 1 ? "One ayah is waiting to be reviewed" : `${n} ayahs are waiting to be reviewed`),
    todayClear: "Nothing to review today",
    todayClearBody: "Everything you have declared is still within its spacing.",
    todayNext: (n: number) => (n === 1 ? "Next review tomorrow" : `Next review in ${n} days`),
    startReview: "Start the review",
    streak: (n: number) => (n === 1 ? "1 day in a row" : `${n} days in a row`),
    streakNone: "Make today the first day",
    learnedToday: (n: number) => (n === 1 ? "One new ayah today" : `${n} new ayahs today`),
    continueWith: (name: string) => `Continue: Surah ${name}`,
    surahProgress: (declared: number, total: number) => `${declared} of ${total} memorized`,
    surahDone: "All memorized",
    settingsTitle: "Memorization settings",
    repeatLabel: "How many times does each ayah repeat?",
    repeatUnit: (n: number) => (n === 1 ? "once" : n === 2 ? "twice" : `${n} times`),
    autoplayLabel: "Move to the next ayah by itself",
    autoplayHint: "Once the repeats are done.",
    reciterLabel: "How to listen",
    reciters: {
      sheikh: { title: "The sheikh alone", body: "al-Husary, teaching recitation" },
      sheikh_kids: { title: "The sheikh with children", body: "al-Minshawi, children repeating" },
    },
    fontLabel: "Ayah text size",
    fontSteps: ["Regular", "Large", "Larger"],
    editTitle: "Edit profile",
    deviceTitle: "Data on this device",
    persisted: "The browser agreed to keep this data and will not clear it on its own.",
    bestEffort: "The browser may clear this data if the site is not opened for a while (especially on iPhone and iPad). Save a backup, or add the site to your home screen.",
    unsupported: "There is no way to confirm the browser will keep this data. Save a backup from time to time.",
    saveFailed: "The browser could not save the last change — private browsing may be on, or storage is full.",
    exportLabel: "Save a backup",
    exportHint: "A small file with every child, their settings and progress.",
    importLabel: "Restore a backup",
    importReady: (n: number) => `${n === 0 ? "The file holds only the guest’s progress" : `The file holds ${n === 1 ? "one child" : `${n} children`}`}. It will replace everything on this device now.`,
    importConfirm: "Replace and restore",
    imported: "Backup restored.",
    importErrors: {
      unreadable: "The file could not be read.",
      "not-a-backup": "This file is not a memorization journey backup.",
      "newer-version": "This backup is from a newer version of the site. Reload the page and try again.",
      empty: "The backup has no children in it.",
      "too-large": "The file is too large to be a memorization journey backup.",
    },
    removeLabel: (name: string) => `Delete ${name}’s profile`,
    removeGuest: "Clear the guest’s progress",
    removeConfirm: "Yes, delete for good",
    removeWarning: "The profile and all its progress will be removed from this device. Only a backup can bring it back.",
    looksLink: "Make it yours",
    shelfTitle: "Sticker shelf",
    parentCorner: "The parent’s corner",
    certificate: "Journey certificate",
    reviewedResult: "Masha'Allah! A parent says this segment is ready.",
    practiceResult: "This segment needs a little more practice.",
    resultOkay: "Got it",
    practiseAgain: "Recite again",
    home: "Home",
  },
} as const;

export type Copy = (typeof copy)["ar"] | (typeof copy)["en"];

export default function Hifz() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { store, commit, saveFailed } = useHifzStore();
  const profile = activeProfile(store);

  return (
    <main className="site-shell hifz" dir={direction}>
      <SkipLink />
      <SiteChrome />
      <div id={MAIN_CONTENT_ID}>
        {saveFailed && (
          <div className="container"><p className="hifz-alert" role="alert"><ShieldAlert size={17} aria-hidden="true" /> {t.saveFailed}</p></div>
        )}
        {profile
          ? <JourneyHome key={profile.id} t={t} store={store} profile={profile} commit={commit} />
          : <ProfilePicker t={t} store={store} commit={commit} />}
      </div>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="brand-mark"><span className="brand-mark__seal">ي</span><span><b>Yahya</b> Quran Academy</span></div>
          <Link href="/" className="text-link">{t.home}</Link>
        </div>
      </footer>
    <HifzBottomBar />
    </main>
  );
}

// ---------------------------------------------------------------------------

function CharacterArt({ character, pose, sizes, className = "", alt = "" }: {
  character: CharacterId; pose: Pose; sizes: string; className?: string; alt?: string;
}) {
  const art = characterArt(character, pose);
  if (!art) {
    const initial = characterById(character)?.initial ?? "";
    return (
      <span className={`hifz-art hifz-art--placeholder ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
        {initial ? <b>{initial}</b> : <UserRound size={28} aria-hidden="true" />}
      </span>
    );
  }
  return <img className={`hifz-art ${className}`} src={art.src} srcSet={art.srcSet} sizes={sizes} alt={alt} loading="lazy" decoding="async" draggable={false} />;
}

/** The scene a child chose, painted behind their own card and nowhere else. */
function cardScene(profile: ChildProfile): CSSProperties | undefined {
  const art = profile.looks.card ? lookArt("card", profile.looks.card) : null;
  return art ? { backgroundImage: `url(${art.src})` } : undefined;
}

function ChosenFrame({ profile }: { profile: ChildProfile }) {
  const art = profile.looks.frame ? lookArt("frame", profile.looks.frame) : null;
  if (!art) return null;
  return <img className="hifz-profile__frame" src={art.src} srcSet={art.srcSet} sizes="132px" alt="" loading="lazy" />;
}

/** What the child stuck on their shelf. It only appears once something is on it. */
function Shelf({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  if (profile.looks.stickers.length === 0) return null;
  return (
    <section className="hifz-card hifz-looks" aria-labelledby="hifz-shelf-title">
      <h2 id="hifz-shelf-title"><Sparkles size={18} aria-hidden="true" /> {t.shelfTitle}</h2>
      <ul className="hifz-shelf" role="list">
        {profile.looks.stickers.map(id => {
          const art = lookArt("sticker", id);
          return <li key={id}>{art ? <img src={art.src} srcSet={art.srcSet} sizes="44px" alt={lookName("sticker", id, locale)} /> : <span>{lookName("sticker", id, locale)}</span>}</li>;
        })}
      </ul>
    </section>
  );
}

function displayName(t: Copy, profile: ChildProfile) {
  return profile.character === "guest" ? t.guestName : profile.name;
}

// ---------------------------------------------------------------------------

function ProfilePicker({ t, store, commit }: { t: Copy; store: HifzStore; commit: (s: HifzStore) => boolean }) {
  const children = namedProfiles(store);
  const [adding, setAdding] = useState(children.length === 0);
  const first = children.length === 0;

  return (
    <>
      <section className="hifz-hero hifz-hero--courtyard">
        <div className="container hifz-hero__inner">
          <div className="hifz-hero__copy">
            <span className="eyebrow eyebrow--gold"><Users size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{first ? t.firstTitle : t.pickTitle}</h1>
            <p>{first ? t.firstIntro : t.pickIntro}</p>
          </div>
          <div className="hifz-hero__pair" aria-hidden="true">
            <CharacterArt character="yahya" pose="wave" sizes="(max-width: 640px) 40vw, 220px" />
            <CharacterArt character="fatima" pose="wave" sizes="(max-width: 640px) 40vw, 220px" />
          </div>
        </div>
      </section>

      <section className="section hifz-section">
        <div className="container hifz-stack">
          {!first && (
            <ul className="hifz-profiles" role="list">
              {children.map(child => (
                <li key={child.id}>
                  <button
                    type="button"
                    className="hifz-profile"
                    style={cardScene(child)}
                    onClick={() => commit(selectProfile(store, child.id))}
                  >
                    <span className="hifz-profile__figure">
                      <CharacterArt character={child.character} pose="avatar" sizes="96px" className="hifz-profile__avatar" />
                      <ChosenFrame profile={child} />
                    </span>
                    <b>{child.name}</b>
                  </button>
                </li>
              ))}
              {!adding && children.length < MAX_PROFILES && (
                <li>
                  <button type="button" className="hifz-profile hifz-profile--add" onClick={() => setAdding(true)}>
                    <span className="hifz-profile__avatar hifz-profile__plus"><Plus size={30} aria-hidden="true" /></span>
                    <b>{t.addChild}</b>
                  </button>
                </li>
              )}
            </ul>
          )}

          {adding && (
            <ProfileForm
              t={t}
              submitLabel={t.start}
              onCancel={first ? undefined : () => setAdding(false)}
              onSubmit={(name, character) => {
                const result = createProfile(store, { name, character });
                if (!result.ok) return t.errors[result.reason];
                commit(result.store);
                return null;
              }}
            />
          )}
          {!adding && children.length >= MAX_PROFILES && <p className="hifz-muted">{t.limit}</p>}

          <div className="hifz-guest">
            <button type="button" className="hifz-guest__button" onClick={() => commit(enterAsGuest(store))}>
              <CharacterArt character="guest" pose="avatar" sizes="48px" className="hifz-guest__avatar" />
              <b>{t.guest}</b>
            </button>
            <small>{t.guestNote}</small>
          </div>

          {/* Shown on an empty device too: a new tablet is exactly where a backup gets restored. */}
          <DeviceData t={t} store={store} commit={commit} />
        </div>
      </section>
    </>
  );
}

function ProfileForm({ t, submitLabel, initialName = "", initialCharacter = "yahya", onSubmit, onCancel }: {
  t: Copy;
  submitLabel: string;
  initialName?: string;
  initialCharacter?: "yahya" | "fatima";
  onSubmit: (name: string, character: "yahya" | "fatima") => string | null;
  onCancel?: () => void;
}) {
  const id = useId();
  const [name, setName] = useState(initialName);
  const [character, setCharacter] = useState<"yahya" | "fatima">(initialCharacter);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocale();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError(onSubmit(name, character));
  };

  return (
    <form className="hifz-card hifz-form" onSubmit={submit} noValidate>
      <div className="hifz-field">
        <label htmlFor={`${id}-name`}>{t.nameLabel}</label>
        <input
          id={`${id}-name`}
          name="child-name"
          value={name}
          onChange={e => { setName(e.target.value); setError(null); }}
          placeholder={t.namePlaceholder}
          maxLength={MAX_NAME_LENGTH * 2}
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && <p id={`${id}-error`} className="hifz-error" role="alert">{error}</p>}
      </div>

      <fieldset className="hifz-field">
        <legend>{t.characterLabel}</legend>
        <div className="hifz-characters">
          {CHARACTERS.map(c => {
            const pending = !characterArt(c.id, "stand");
            return (
              <label key={c.id} className={`hifz-character ${character === c.id ? "is-selected" : ""}`}>
                <input type="radio" name={`${id}-character`} value={c.id} checked={character === c.id} onChange={() => setCharacter(c.id)} />
                <CharacterArt character={c.id} pose="stand" sizes="(max-width: 640px) 36vw, 180px" className="hifz-character__art" />
                <span className="hifz-character__name">
                  {locale === "ar" ? c.nameAr : c.nameEn}
                  {pending && <small>{t.artPending}</small>}
                </span>
                {character === c.id && <span className="hifz-character__check" aria-hidden="true"><Check size={16} /></span>}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="hifz-actions">
        <button type="submit" className="button button--primary">{submitLabel}</button>
        {onCancel && <button type="button" className="button button--soft" onClick={onCancel}>{t.cancel}</button>}
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------

function JourneyHome({ t, store, profile, commit }: { t: Copy; store: HifzStore; profile: ChildProfile; commit: (s: HifzStore) => boolean }) {
  const { locale } = useLocale();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const isGuest = profile.character === "guest";
  const [editing, setEditing] = useState(false);

  return (
    <>
      <section className="hifz-hero">
        <div className="container hifz-hero__inner">
          <div className="hifz-hero__copy">
            <span className="eyebrow eyebrow--gold"><Users size={15} aria-hidden="true" /> {t.eyebrow}</span>
            <h1>{isGuest ? t.helloGuest : t.hello(profile.character === "fatima")}</h1>
            {isGuest && <p>{t.guestNote}</p>}
            <div className="hifz-actions">
              <button type="button" className="button button--soft" onClick={() => commit(selectProfile(store, null))}>
                <Users size={17} aria-hidden="true" /> {t.switchChild}
              </button>
              {!isGuest && (
                <button type="button" className="button button--soft" onClick={() => setEditing(v => !v)} aria-expanded={editing}>
                  <Pencil size={16} aria-hidden="true" /> {t.editTitle}
                </button>
              )}
            </div>
          </div>
          <div className="hifz-hero__solo">
            <CharacterArt character={profile.character} pose="wave" sizes="(max-width: 640px) 55vw, 260px" />
          </div>
        </div>
      </section>

      <section className="section hifz-section">
        <div className="container hifz-stack">
          {editing && !isGuest && (
            <ProfileForm
              t={t}
              submitLabel={t.save}
              initialName={profile.name}
              initialCharacter={profile.character === "fatima" ? "fatima" : "yahya"}
              onCancel={() => setEditing(false)}
              onSubmit={(name, character) => {
                const result = updateProfile(store, profile.id, { name, character });
                if (!result.ok) return t.errors[result.reason];
                commit(result.store);
                setEditing(false);
                return null;
              }}
            />
          )}

          <EncouragementCard t={t} profile={profile} store={store} commit={commit} />
          <TodayCard t={t} profile={profile} />
          <RankCard t={t} profile={profile} />
          <SurahList t={t} profile={profile} />

          <SettingsPanel t={t} profile={profile} onChange={patch => commit(updateSettings(store, profile.id, patch))} />
          <InstallCard />
          <DeviceData t={t} store={store} commit={commit} profile={profile} />
          <Shelf t={t} profile={profile} />
          <p className="hifz-parent-link">
            <Link href="/hifz/looks" className="text-link"><Sparkles size={15} aria-hidden="true" /> {t.looksLink}</Link>
            <Link href="/hifz/parent" className="text-link"><KeyRound size={15} aria-hidden="true" /> {t.parentCorner}</Link>
            <Link href="/hifz/certificate" className="text-link"><Award size={15} aria-hidden="true" /> {t.certificate}</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function EncouragementCard({ t, profile, store, commit }: { t: Copy; profile: ChildProfile; store: HifzStore; commit: (s: HifzStore) => boolean }) {
  const result = unseenNote(profile);
  const art = characterArt(profile.character, "cheer");
  if (!result) return null;

  const seen = () => commit(markNoteSeen(store, profile.id, result.surah, result.from, result.to));
  return (
    <article className="hifz-card hifz-done" role="status">
      {art && <img className="hifz-done__art" src={art.src} srcSet={art.srcSet} sizes="110px" alt="" />}
      <div>
        <h2>{result.status === "reviewed" ? t.reviewedResult : t.practiceResult}</h2>
        {result.note && <p>{result.note}</p>}
        <div className="hifz-actions">
          {result.status === "needs_practice" ? (
            <Link href={`/hifz/${result.surah}/recite`} className="button button--primary" onClick={seen}>{t.practiseAgain}</Link>
          ) : (
            <button type="button" className="button button--primary" onClick={seen}>{t.resultOkay}</button>
          )}
        </div>
      </div>
    </article>
  );
}

/** The surah's own icon once it is drawn; its number until then. */
function SurahMark({ surah }: { surah: number }) {
  const icon = surahIcon(surah);
  if (!icon) return <span className="hifz-surah__number">{surah}</span>;
  return <img className="hifz-surah__icon" src={icon.src} srcSet={icon.srcSet} sizes="44px" alt="" loading="lazy" decoding="async" />;
}

/** Every journey surah with this child's progress, and a way back in. */
function SurahList({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const nameOf = (surah: number) => (locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah));
  const rows = JOURNEY_SURAHS.map(surah => ({ surah, ...surahProgress(profile, surah, ayahCountOf(surah)) }));
  const current = rows.find(row => row.declared < row.total) ?? rows[0];

  return (
    <section className="hifz-card hifz-journey" aria-labelledby="hifz-journey-title">
      <div className="hifz-journey__head">
        <div>
          <h2 id="hifz-journey-title"><BookOpen size={20} aria-hidden="true" /> {t.journeyTitle}</h2>
          <p>{t.journeyBody}</p>
        </div>
        <Link href={`/hifz/${current.surah}`} className="button button--primary">{t.continueWith(nameOf(current.surah))} <Arrow size={17} aria-hidden="true" /></Link>
      </div>
      <JourneyMap profile={profile} currentSurah={current.surah} />
      <details className="hifz-list-fallback">
        <summary>{t.listView}</summary>
        <ol className="hifz-surahs">
        {rows.map(row => {
          const done = row.declared === row.total;
          const started = row.listened + row.recorded + row.declared > 0;
          return (
            <li key={row.surah}>
              <Link href={`/hifz/${row.surah}`} className={`hifz-surah ${done ? "is-done" : started ? "is-started" : ""} ${row.surah === current.surah ? "is-current" : ""}`}>
                <SurahMark surah={row.surah} />
                <b>{nameOf(row.surah)}</b>
                <small>{done ? t.surahDone : t.surahProgress(row.declared, row.total)}</small>
                <span className="hifz-surah__bar" aria-hidden="true"><span style={{ inlineSize: `${(row.declared / row.total) * 100}%` }} /></span>
              </Link>
            </li>
          );
        })}
        </ol>
      </details>
    </section>
  );
}

/** What today asks for: the review queue, the streak, and what was done. */
function TodayCard({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  const Arrow = locale === "ar" ? ChevronLeft : ChevronRight;
  const plan = todayPlan(profile);
  const nextDay = plan.due === 0 ? nextDueDay(profile) : null;
  const inDays = nextDay === null ? null : nextDay - dayNumber(Date.now());
  const pose: Pose = plan.due > 0 ? "point" : plan.done ? "rest" : "wave";
  const art = characterArt(profile.character, pose);

  return (
    <section className="hifz-card hifz-today">
      {art && <img className="hifz-today__art" src={art.src} srcSet={art.srcSet} sizes="96px" alt="" loading="lazy" />}
      <div className="hifz-today__text">
        <span className="hifz-today__label">{t.todayTitle}</span>
        <b>{plan.due > 0 ? t.todayDue(plan.due) : t.todayClear}</b>
        <small>
          {plan.due > 0
            ? (plan.streak > 0 ? t.streak(plan.streak) : t.streakNone)
            : inDays !== null ? t.todayNext(inDays) : t.todayClearBody}
          {plan.learnedToday > 0 && ` · ${t.learnedToday(plan.learnedToday)}`}
        </small>
      </div>
      {plan.due > 0 && (
        <Link href="/hifz/review" className="button button--primary">{t.startReview} <Arrow size={17} aria-hidden="true" /></Link>
      )}
    </section>
  );
}

/** Rank, stars, and what the next rank needs. */
function RankCard({ t, profile }: { t: Copy; profile: ChildProfile }) {
  const { locale } = useLocale();
  const stars = totalStars(profile);
  const rank = rankFor(stars);
  const upcoming = nextRank(stars);
  return (
    <section className="hifz-card hifz-rank">
      <img className="hifz-rank__badge" src={`/hifz-art/rewards/rank-${rank.level}-256.webp`} alt="" loading="lazy" />
      <div className="hifz-rank__text">
        <span className="hifz-rank__label">{t.rankLabel}</span>
        <b>{locale === "ar" ? rank.nameAr : rank.nameEn}</b>
        <p className="hifz-rank__stars"><Star size={15} fill="currentColor" aria-hidden="true" /> {t.starsCount(stars)}</p>
        <small>{upcoming ? t.nextRankIn(upcoming.remaining, locale === "ar" ? upcoming.rank.nameAr : upcoming.rank.nameEn) : t.topRank}</small>
      </div>
      <p className="hifz-rank__how">{t.starsHow}</p>
    </section>
  );
}

const SAMPLE_AYAH = "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ";

function SettingsPanel({ t, profile, onChange }: {
  t: Copy; profile: ChildProfile; onChange: (patch: Partial<ChildProfile["settings"]>) => void;
}) {
  const id = useId();
  const s = profile.settings;
  return (
    <section className="hifz-card hifz-settings" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}><Settings2 size={20} aria-hidden="true" /> {t.settingsTitle}</h2>

      <fieldset className="hifz-field">
        <legend>{t.repeatLabel}</legend>
        <div className="hifz-segments">
          {[1, 2, 3, 4, 5].map(n => (
            <label key={n} className={s.repeat === n ? "is-selected" : ""}>
              <input type="radio" name={`${id}-repeat`} value={n} checked={s.repeat === n} onChange={() => onChange({ repeat: n })} />
              <b>{n.toLocaleString(undefined)}</b>
              <small>{t.repeatUnit(n)}</small>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="hifz-switch" htmlFor={`${id}-autoplay`}>
        <input id={`${id}-autoplay`} type="checkbox" role="switch" checked={s.autoplayNext} onChange={e => onChange({ autoplayNext: e.target.checked })} />
        <span className="hifz-switch__track" aria-hidden="true"><span /></span>
        <span><b>{t.autoplayLabel}</b><small>{t.autoplayHint}</small></span>
      </label>

      <fieldset className="hifz-field">
        <legend>{t.reciterLabel}</legend>
        <div className="hifz-options">
          {(["sheikh", "sheikh_kids"] as ReciterChoice[]).map(choice => (
            <label key={choice} className={s.reciter === choice ? "is-selected" : ""}>
              <input type="radio" name={`${id}-reciter`} value={choice} checked={s.reciter === choice} onChange={() => onChange({ reciter: choice })} />
              <b>{t.reciters[choice].title}</b>
              <small>{t.reciters[choice].body}</small>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="hifz-field">
        <legend>{t.fontLabel}</legend>
        <div className="hifz-segments hifz-segments--three">
          {([0, 1, 2] as FontStep[]).map(step => (
            <label key={step} className={s.fontStep === step ? "is-selected" : ""}>
              <input type="radio" name={`${id}-font`} value={step} checked={s.fontStep === step} onChange={() => onChange({ fontStep: step })} />
              <b>{t.fontSteps[step]}</b>
            </label>
          ))}
        </div>
        <p className={`hifz-sample hifz-sample--${s.fontStep}`} lang="ar" dir="rtl">{SAMPLE_AYAH}</p>
      </fieldset>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function DeviceData({ t, store, commit, profile }: {
  t: Copy; store: HifzStore; commit: (s: HifzStore) => boolean; profile?: ChildProfile;
}) {
  const id = useId();
  const [persistence, setPersistence] = useState<Persistence | null>(null);
  const [pending, setPending] = useState<Extract<ImportResult, { ok: true }> | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  // Ask the browser to keep the data only once there is a child to keep it for.
  const hasChildren = store.profiles.length > 0;
  useEffect(() => {
    let live = true;
    (hasChildren ? requestPersistence() : checkPersistence()).then(result => { if (live) setPersistence(result); });
    return () => { live = false; };
  }, [hasChildren]);

  const download = () => {
    commit(markBackedUp(store));
    const blob = new Blob([exportBackup(store)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = backupFileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const readFile = async (file: File | undefined) => {
    setMessage(null);
    setPending(null);
    if (!file) return;
    const result = file.size > MAX_BACKUP_BYTES ? { ok: false as const, reason: "too-large" as const } : importBackup(await file.text(), store);
    if (result.ok) setPending(result);
    else setMessage({ kind: "error", text: t.importErrors[result.reason] });
    if (fileInput.current) fileInput.current.value = "";
  };

  const StatusIcon = persistence === "persisted" ? ShieldCheck : ShieldAlert;
  const status = persistence === "persisted" ? t.persisted : persistence === "best-effort" ? t.bestEffort : persistence ? t.unsupported : null;

  return (
    <section className="hifz-card hifz-device" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}><HardDrive size={20} aria-hidden="true" /> {t.deviceTitle}</h2>
      {status && (
        <p className={`hifz-status ${persistence === "persisted" ? "is-good" : "is-warn"}`}>
          <StatusIcon size={17} aria-hidden="true" /> {status}
        </p>
      )}

      <div className="hifz-actions">
        {store.profiles.length > 0 && (
          <button type="button" className="button button--primary" onClick={download}>
            <Download size={17} aria-hidden="true" /> {t.exportLabel}
          </button>
        )}
        <label className="button button--soft hifz-file" htmlFor={`${id}-file`}>
          <Upload size={17} aria-hidden="true" /> {t.importLabel}
        </label>
        <input ref={fileInput} id={`${id}-file`} className="sr-only" type="file" accept="application/json,.json" onChange={e => readFile(e.target.files?.[0])} />
      </div>
      <small className="hifz-muted">{t.exportHint}</small>

      {pending && (
        <div className="hifz-confirm" role="alert">
          <p>{t.importReady(pending.profiles)}</p>
          <div className="hifz-actions">
            <button type="button" className="button button--primary" onClick={() => { commit(pending.store); setPending(null); setMessage({ kind: "ok", text: t.imported }); }}>
              {t.importConfirm}
            </button>
            <button type="button" className="button button--soft" onClick={() => setPending(null)}>{t.cancel}</button>
          </div>
        </div>
      )}
      {message && <p className={message.kind === "ok" ? "hifz-success" : "hifz-error"} role="status">{message.text}</p>}

      {profile && (
        <div className="hifz-remove">
          {!confirmRemove ? (
            <button type="button" className="hifz-danger-link" onClick={() => setConfirmRemove(true)}>
              <Trash2 size={15} aria-hidden="true" /> {profile.character === "guest" ? t.removeGuest : t.removeLabel(displayName(t, profile))}
            </button>
          ) : (
            <div className="hifz-confirm hifz-confirm--danger" role="alert">
              <p>{t.removeWarning}</p>
              <div className="hifz-actions">
                <button
                  type="button"
                  className="button hifz-button-danger"
                  onClick={() => {
                    // The child's recordings and "في رحاب القرآن" discoveries
                    // go with their profile: leaving them behind is neither
                    // tidy nor what "delete" means.
                    void deleteProfileRecordings(profile.id).catch(() => {});
                    resetFactDiscoveries(profile.id);
                    commit(removeProfile(store, profile.id));
                  }}
                >{t.removeConfirm}</button>
                <button type="button" className="button button--soft" onClick={() => setConfirmRemove(false)}>{t.cancel}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
