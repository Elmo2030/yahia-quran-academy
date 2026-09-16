// =============================================================================
// HifzParent — the parent's corner, behind a number.
//
// It shows what each child actually did: the surahs they are working on, what
// they declared and who declared it, when they last opened the journey, and
// their own recordings to listen to. There is no score here either. A parent
// who has heard their child recite can put their name to a declaration, which
// is the only judgement of a recitation this site ever records.
//
// The number is a child lock, not a password: the data is on the device, and
// the page says as much rather than implying a safety it cannot give.
// =============================================================================

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Download, HardDrive, KeyRound, Loader2, Lock, LockOpen, Play, Save,
  ShieldQuestion, Star, Trash2,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { characterArt } from "@/lib/hifz-characters";
import { dayNumber, streakDays, todayPlan } from "@/lib/hifz-review";
import { rankFor, starsFor, totalStars } from "@/lib/hifz-stars";
import {
  ayahKey, backupFileName, backupIsStale, confirmDeclarations, daysSinceBackup, exportBackup, markBackedUp,
  namedProfiles, setParentLock, surahProgress, type ChildProfile, type HifzStore,
} from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { forgetUnlock, isUnlocked, makeLock, pinMatches, pinProblem, rememberUnlock } from "@/lib/parent-lock";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";
import {
  deleteProfileRecordings, deleteRecording, getRecording, listAllRecordings, recordingsUse, storageEstimate,
  type RecordingSummary, type StorageUse,
} from "@/lib/recordings";

const copy = {
  ar: {
    title: "ركن وليّ الأمر",
    back: "رحلة الحفظ",
    setTitle: "اضبط رقم وليّ الأمر",
    setBody: "رقم من ٤ إلى ٨ أرقام يمنع الطفل من الدخول هنا. هذا قفل للأطفال وليس حماية: البيانات على هذا الجهاز، ومن يستطيع الوصول إليه يستطيع مسحها.",
    pinLabel: "الرقم",
    pinAgain: "أعد كتابة الرقم",
    save: "احفظ الرقم",
    enterTitle: "أدخل رقم وليّ الأمر",
    unlock: "ادخل",
    lock: "أقفل الركن",
    forgotPin: "نسيت الرقم؟",
    forgotBody: "لا يمكن استرجاعه. امسح الرقم من هنا وابدأ من جديد — لن يضيع تقدّم أي طفل.",
    clearPin: "امسح الرقم",
    errors: {
      empty: "اكتب الرقم.",
      digits: "أرقام إنجليزية فقط (0-9).",
      short: "الرقم قصير: 4 أرقام على الأقل.",
      long: "الرقم طويل: 8 أرقام على الأكثر.",
      mismatch: "الرقمان غير متطابقين.",
      wrong: "رقم غير صحيح.",
    },
    noChildren: "لا يوجد أطفال على هذا الجهاز بعد.",
    addChild: "أضف طفلًا",
    stars: (n: number) => arabicCount(n, "نجمة واحدة", "نجمتان", "نجوم", "نجمة"),
    streak: (n: number) => (n === 0 ? "لم يفتح الرحلة مؤخرًا" : arabicCount(n, "يوم متصل", "يومان متصلان", "أيام متصلة", "يومًا متصلًا")),
    dueToday: (n: number) => (n === 0 ? "لا مراجعة اليوم" : `${arabicCount(n, "آية واحدة", "آيتان", "آيات", "آية")} للمراجعة`),
    lastSeen: (days: number) => (days === 0 ? "فتح الرحلة اليوم" : days === 1 ? "آخر مرة أمس" : `آخر مرة قبل ${arabicCount(days, "يوم", "يومين", "أيام", "يومًا")}`),
    neverSeen: "لم يبدأ بعد",
    surahsTitle: "السور التي يعمل عليها",
    declaredBy: (child: number, parent: number) => {
      const all = child + parent;
      const ayahs = all === 1 ? "آية واحدة معلنة" : all === 2 ? "آيتان معلنتان" : `${all} آيات معلنة`;
      return parent === 0 ? `${ayahs} — بلا شهادتك بعد` : parent === all ? `${ayahs} بشهادتك` : `${ayahs} — ${parent} بشهادتك`;
    },
    confirm: "أشهد على ما أعلنه",
    confirmed: "كل ما أُعلن بشهادتك",
    recordingsTitle: "تسجيلات الطفل",
    noRecordings: "لا توجد تسجيلات بعد.",
    recordingOf: (surah: string, ayah?: number) => (ayah ? `سورة ${surah} — الآية ${ayah}` : `سورة ${surah}`),
    play: "استمع",
    remove: "احذف",
    exportLabel: "احفظ نسخة احتياطية",
    backupTitle: "النسخة الاحتياطية",
    backupNever: "لم تُحفظ نسخة من هذا الجهاز بعد.",
    backupAgo: (days: number) => (days === 0 ? "حُفظت نسخة اليوم." : days === 1 ? "آخر نسخة أمس." : `آخر نسخة قبل ${arabicCount(days, "يوم", "يومين", "أيام", "يومًا")}.`),
    backupWhy: "كل تقدّم الأطفال على هذا الجهاز وحده. لو ضاع الجهاز أو مسح المتصفح بياناته، النسخة الاحتياطية هي الطريق الوحيد لاسترجاعه.",
    backupStale: "مضى وقت طويل — احفظ نسخة اليوم واحتفظ بها في مكان آخر.",
    storageTitle: "المساحة على هذا الجهاز",
    storageTakes: (takes: number, size: string) => (takes === 0 ? "لا توجد تسجيلات محفوظة." : `${arabicCount(takes, "تسجيل واحد", "تسجيلان", "تسجيلات", "تسجيلًا")}، ${size}.`),
    storageOf: (used: string, quota: string) => `المتصفح يسمح لهذا الموقع بحوالي ${quota}، والمستخدم منها ${used}.`,
    storageChild: (name: string, takes: number, size: string) => `${name}: ${arabicCount(takes, "تسجيل واحد", "تسجيلان", "تسجيلات", "تسجيلًا")}، ${size}`,
    storageReader: (takes: number, size: string) => `تسجيلات من القارئ (خارج الرحلة): ${arabicCount(takes, "تسجيل واحد", "تسجيلان", "تسجيلات", "تسجيلًا")}، ${size}`,
    storageCap: "يُحفظ آخر ٣ تسجيلات لكل آية، والأقدم يُحذف وحده.",
    clearTakes: (name: string) => `احذف تسجيلات ${name}`,
    privacy: "كل ما في هذه الصفحة على هذا الجهاز وحده، ولا يُرسل إلى أي مكان.",
  },
  en: {
    title: "The parent’s corner",
    back: "Memorization journey",
    setTitle: "Set a parent number",
    setBody: "A 4 to 8 digit number keeps a child out of this page. It is a child lock, not protection: the data is on this device, and anyone who can reach the device can clear it.",
    pinLabel: "Number",
    pinAgain: "Type the number again",
    save: "Save the number",
    enterTitle: "Enter the parent number",
    unlock: "Enter",
    lock: "Lock the corner",
    forgotPin: "Forgotten the number?",
    forgotBody: "It cannot be recovered. Clear it here and set a new one — no child’s progress is lost.",
    clearPin: "Clear the number",
    errors: {
      empty: "Type the number.",
      digits: "Digits 0-9 only.",
      short: "Too short: at least 4 digits.",
      long: "Too long: at most 8 digits.",
      mismatch: "The two numbers do not match.",
      wrong: "Wrong number.",
    },
    noChildren: "No children on this device yet.",
    addChild: "Add a child",
    stars: (n: number) => `${n} stars`,
    streak: (n: number) => (n === 0 ? "Has not opened the journey lately" : n === 1 ? "1 day in a row" : `${n} days in a row`),
    dueToday: (n: number) => (n === 0 ? "Nothing to review today" : n === 1 ? "One ayah to review" : `${n} ayahs to review`),
    lastSeen: (days: number) => (days === 0 ? "Opened the journey today" : days === 1 ? "Last seen yesterday" : `Last seen ${days} days ago`),
    neverSeen: "Has not started yet",
    surahsTitle: "Surahs being worked on",
    declaredBy: (child: number, parent: number) => `${child + parent} ayahs declared — ${parent} confirmed by you`,
    confirm: "Confirm what they declared",
    confirmed: "Everything declared is confirmed by you",
    recordingsTitle: "The child’s recordings",
    noRecordings: "No recordings yet.",
    recordingOf: (surah: string, ayah?: number) => (ayah ? `Surah ${surah} — ayah ${ayah}` : `Surah ${surah}`),
    play: "Play",
    remove: "Delete",
    exportLabel: "Save a backup",
    backupTitle: "The backup",
    backupNever: "No backup has been saved from this device yet.",
    backupAgo: (days: number) => (days === 0 ? "A backup was saved today." : days === 1 ? "Last backup yesterday." : `Last backup ${days} days ago.`),
    backupWhy: "Every child’s progress lives on this device alone. If it is lost, or the browser clears its data, the backup file is the only way back.",
    backupStale: "It has been a while — save a copy today and keep it somewhere else.",
    storageTitle: "Space on this device",
    storageTakes: (takes: number, size: string) => (takes === 0 ? "No recordings saved." : takes === 1 ? `One recording, ${size}.` : `${takes} recordings, ${size}.`),
    storageOf: (used: string, quota: string) => `The browser allows this site about ${quota}, of which ${used} is in use.`,
    storageChild: (name: string, takes: number, size: string) => `${name}: ${takes} recordings, ${size}`,
    storageReader: (takes: number, size: string) => `Recordings from the reader (outside the journey): ${takes}, ${size}`,
    storageCap: "The newest three takes of each ayah are kept; older ones are removed on their own.",
    clearTakes: (name: string) => `Delete ${name}’s recordings`,
    privacy: "Everything on this page stays on this device and is never uploaded.",
  },
};

type Copy = (typeof copy)["ar"];

/**
 * Arabic counts a thing differently at one, two, three to ten, and above:
 * "تسجيل واحد", "تسجيلان", "٣ تسجيلات", "١١ تسجيلًا". Getting this wrong reads
 * like a machine wrote it.
 */
const arabicCount = (n: number, one: string, two: string, few: string, many: string) => {
  const digits = n.toLocaleString("ar-EG");
  if (n === 1) return one;
  if (n === 2) return two;
  if (n >= 3 && n <= 10) return `${digits} ${few}`;
  return `${digits} ${many}`;
};

export default function HifzParent() {
  const { direction, locale } = useLocale();
  const t = copy[locale];
  const { store, commit } = useHifzStore();
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
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
                <h1>{t.title}</h1>
              </div>
            </header>

            {!store.parentLock ? (
              <SetPin t={t} onSet={async pin => commit(setParentLock(store, await makeLock(pin)))} />
            ) : !unlocked ? (
              <EnterPin t={t} store={store} commit={commit} onUnlocked={() => { rememberUnlock(); setUnlocked(true); }} />
            ) : (
              <>
                {namedProfiles(store).length === 0 && (
                  <article className="hifz-card">
                    <p>{t.noChildren}</p>
                    <div className="hifz-actions"><Link href="/hifz" className="button button--primary">{t.addChild}</Link></div>
                  </article>
                )}
                {namedProfiles(store).map(profile => (
                  <ChildReport key={profile.id} t={t} profile={profile} store={store} commit={commit} />
                ))}
                <BackupCard t={t} store={store} commit={commit} />
                <StorageCard t={t} store={store} />
                <article className="hifz-card hifz-parent-foot">
                  <p className="hifz-muted">{t.privacy}</p>
                  <div className="hifz-actions">
                    <button type="button" className="button button--soft" onClick={() => { forgetUnlock(); setUnlocked(false); }}>
                      <Lock size={17} aria-hidden="true" /> {t.lock}
                    </button>
                  </div>
                </article>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function downloadBackup(store: HifzStore) {
  const blob = new Blob([exportBackup(store)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = backupFileName();
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------------------------------------------------------------------------

function SetPin({ t, onSet }: { t: Copy; onSet: (pin: string) => Promise<unknown> }) {
  const [pin, setPin] = useState("");
  const [again, setAgain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const problem = pinProblem(pin);
    if (problem) return setError(t.errors[problem]);
    if (pin !== again) return setError(t.errors.mismatch);
    setBusy(true);
    await onSet(pin);
    setBusy(false);
  };

  return (
    <form className="hifz-card hifz-form" onSubmit={submit} noValidate>
      <h2><KeyRound size={20} aria-hidden="true" /> {t.setTitle}</h2>
      <p>{t.setBody}</p>
      <div className="hifz-field">
        <label htmlFor="parent-pin">{t.pinLabel}</label>
        <input id="parent-pin" name="parent-pin" type="password" inputMode="numeric" autoComplete="new-password" value={pin} onChange={e => { setPin(e.target.value); setError(null); }} />
      </div>
      <div className="hifz-field">
        <label htmlFor="parent-pin-again">{t.pinAgain}</label>
        <input id="parent-pin-again" name="parent-pin-again" type="password" inputMode="numeric" autoComplete="new-password" value={again} onChange={e => { setAgain(e.target.value); setError(null); }} />
      </div>
      {error && <p className="hifz-error" role="alert">{error}</p>}
      <div className="hifz-actions">
        <button type="submit" className="button button--primary" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={17} aria-hidden="true" /> : <KeyRound size={17} aria-hidden="true" />} {t.save}</button>
      </div>
    </form>
  );
}

function EnterPin({ t, store, commit, onUnlocked }: {
  t: Copy; store: HifzStore; commit: (s: HifzStore) => boolean; onUnlocked: () => void;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!store.parentLock) return;
    setBusy(true);
    const ok = await pinMatches(store.parentLock, pin);
    setBusy(false);
    if (ok) onUnlocked();
    else {
      setError(t.errors.wrong);
      setPin("");
    }
  };

  return (
    <form className="hifz-card hifz-form" onSubmit={submit} noValidate>
      <h2><Lock size={20} aria-hidden="true" /> {t.enterTitle}</h2>
      <div className="hifz-field">
        <label htmlFor="parent-pin">{t.pinLabel}</label>
        <input id="parent-pin" name="parent-pin" type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={e => { setPin(e.target.value); setError(null); }} autoFocus />
      </div>
      {error && <p className="hifz-error" role="alert">{error}</p>}
      <div className="hifz-actions">
        <button type="submit" className="button button--primary" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={17} aria-hidden="true" /> : <LockOpen size={17} aria-hidden="true" />} {t.unlock}</button>
        <button type="button" className="text-link" onClick={() => setShowForgot(v => !v)}><ShieldQuestion size={15} aria-hidden="true" /> {t.forgotPin}</button>
      </div>
      {showForgot && (
        <div className="hifz-confirm">
          <p>{t.forgotBody}</p>
          <div className="hifz-actions">
            <button type="button" className="button button--soft" onClick={() => commit(setParentLock(store, null))}>{t.clearPin}</button>
          </div>
        </div>
      )}
    </form>
  );
}

/**
 * The backup is the only thing standing between a lost tablet and a lost
 * journey, so the corner says plainly how old the last copy is.
 */
function BackupCard({ t, store, commit }: { t: Copy; store: HifzStore; commit: (s: HifzStore) => boolean }) {
  const days = daysSinceBackup(store);
  const stale = backupIsStale(store);
  return (
    <article className={`hifz-card hifz-backup ${stale ? "is-stale" : ""}`}>
      <h2><Save size={20} aria-hidden="true" /> {t.backupTitle}</h2>
      <p className="hifz-backup__when">{days === null ? t.backupNever : t.backupAgo(days)}</p>
      <p>{t.backupWhy}</p>
      {stale && <p className="hifz-status is-warn">{t.backupStale}</p>}
      <div className="hifz-actions">
        <button type="button" className="button button--primary" onClick={() => { downloadBackup(store); commit(markBackedUp(store)); }}>
          <Download size={17} aria-hidden="true" /> {t.exportLabel}
        </button>
      </div>
    </article>
  );
}

const asSize = (bytes: number, locale: string) => {
  const gb = bytes / 1_073_741_824;
  if (gb >= 1) return `${gb.toLocaleString(locale, { maximumFractionDigits: 1 })} GB`;
  const mb = bytes / 1_048_576;
  if (mb >= 1) return `${mb.toLocaleString(locale, { maximumFractionDigits: 1 })} MB`;
  return `${Math.max(1, Math.round(bytes / 1024)).toLocaleString(locale)} KB`;
};

/** What the recordings are costing the device, before the tablet says it is full. */
function StorageCard({ t, store }: { t: Copy; store: HifzStore }) {
  const { locale } = useLocale();
  const tag = locale === "ar" ? "ar-EG" : "en-GB";
  const [use, setUse] = useState<StorageUse | null>(null);
  const [estimate, setEstimate] = useState<{ usage: number; quota: number } | null>(null);

  const refresh = useCallback(async () => {
    setUse(await recordingsUse().catch(() => ({ takes: 0, bytes: 0, byProfile: {}, reader: { takes: 0, bytes: 0 } })));
    setEstimate(await storageEstimate());
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);

  const reader = use?.reader;
  return (
    <article className="hifz-card hifz-storage">
      <h2><HardDrive size={20} aria-hidden="true" /> {t.storageTitle}</h2>
      {use === null ? <p className="hifz-muted"><Loader2 className="animate-spin" size={16} aria-hidden="true" /></p> : (
        <>
          <p>{t.storageTakes(use.takes, asSize(use.bytes, tag))}</p>
          {estimate && (
            <>
              <p className="hifz-muted">{t.storageOf(asSize(estimate.usage, tag), asSize(estimate.quota, tag))}</p>
              <span className="hifz-meter" aria-hidden="true"><span style={{ inlineSize: `${Math.min(100, (estimate.usage / Math.max(1, estimate.quota)) * 100)}%` }} /></span>
            </>
          )}
          <ul className="hifz-storage__list">
            {namedProfiles(store).map(profile => {
              const mine = use.byProfile[profile.id];
              if (!mine) return null;
              return (
                <li key={profile.id}>
                  <span>{t.storageChild(profile.name, mine.takes, asSize(mine.bytes, tag))}</span>
                  <button type="button" className="hifz-danger-link" onClick={() => void deleteProfileRecordings(profile.id).then(refresh)}>
                    <Trash2 size={14} aria-hidden="true" /> {t.clearTakes(profile.name)}
                  </button>
                </li>
              );
            })}
            {reader && reader.takes > 0 && (
              // Kept, not offered for deletion here: these are the reader's own
              // keepsakes and are managed on the page that made them.
              <li><span>{t.storageReader(reader.takes, asSize(reader.bytes, tag))}</span></li>
            )}
          </ul>
          <p className="hifz-muted">{t.storageCap}</p>
        </>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------

function ChildReport({ t, profile, store, commit }: {
  t: Copy; profile: ChildProfile; store: HifzStore; commit: (s: HifzStore) => boolean;
}) {
  const { locale } = useLocale();
  const nameOf = (surah: number) => (locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah));
  const stars = totalStars(profile);
  const rank = rankFor(stars);
  const plan = todayPlan(profile);
  const avatar = characterArt(profile.character, "avatar");

  const rows = useMemo(() => JOURNEY_SURAHS
    .map(surah => {
      const total = ayahCountOf(surah);
      const progress = surahProgress(profile, surah, total);
      let byChild = 0, byParent = 0;
      for (let ayah = 1; ayah <= total; ayah++) {
        const record = profile.ayahs[ayahKey(surah, ayah)];
        if (record?.declaredBy === "child") byChild++;
        if (record?.declaredBy === "parent") byParent++;
      }
      return { surah, total, progress, byChild, byParent, stars: starsFor(profile, surah, total) };
    })
    .filter(row => row.progress.listened + row.progress.recorded + row.progress.declared > 0), [profile]);

  const lastDay = useMemo(() => {
    let last: number | null = null;
    for (const record of Object.values(profile.ayahs)) {
      for (const at of [record.listenedAt, record.recordedAt, record.declaredAt, record.forgotAt, ...record.reviews]) {
        if (at) last = Math.max(last ?? 0, dayNumber(at));
      }
    }
    return last;
  }, [profile]);

  return (
    <article className="hifz-card hifz-report">
      <header className="hifz-report__head">
        {avatar && <img className="hifz-profile__avatar" src={avatar.src} srcSet={avatar.srcSet} sizes="64px" alt="" />}
        <div>
          <b>{profile.name}</b>
          <small>{locale === "ar" ? rank.nameAr : rank.nameEn} · {t.stars(stars)}</small>
        </div>
        <img className="hifz-report__rank" src={`/hifz-art/rewards/rank-${rank.level}-128.webp`} alt="" loading="lazy" />
      </header>

      <ul className="hifz-report__facts">
        <li>{t.dueToday(plan.due)}</li>
        <li>{t.streak(streakDays(profile))}</li>
        <li>{lastDay === null ? t.neverSeen : t.lastSeen(dayNumber(Date.now()) - lastDay)}</li>
      </ul>

      {rows.length > 0 && (
        <section>
          <h3>{t.surahsTitle}</h3>
          <ul className="hifz-report__surahs">
            {rows.map(row => (
              <li key={row.surah}>
                <b>{nameOf(row.surah)}</b>
                <span className="map-stars" aria-hidden="true">
                  {[1, 2, 3].map(n => <Star key={n} size={12} className={n <= row.stars ? "is-on" : ""} fill={n <= row.stars ? "currentColor" : "none"} />)}
                </span>
                <small>{t.declaredBy(row.byChild, row.byParent)}</small>
                {row.byChild > 0 ? (
                  <button type="button" className="button button--soft" onClick={() => commit(confirmDeclarations(store, profile.id, row.surah, row.total))}>
                    <BadgeCheck size={16} aria-hidden="true" /> {t.confirm}
                  </button>
                ) : row.byParent > 0 ? <em>{t.confirmed}</em> : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Recordings t={t} profileId={profile.id} nameOf={nameOf} />
    </article>
  );
}

function Recordings({ t, profileId, nameOf }: { t: Copy; profileId: string; nameOf: (surah: number) => string }) {
  const [takes, setTakes] = useState<RecordingSummary[] | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setTakes((await listAllRecordings()).filter(take => take.profileId === profileId));
    } catch {
      setTakes([]);
    }
  }, [profileId]);

  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const play = async (id: string) => {
    const full = await getRecording(id);
    if (!full) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(full.blob);
    setPlaying(urlRef.current);
  };

  return (
    <section>
      <h3>{t.recordingsTitle}</h3>
      {takes === null ? <p className="hifz-muted"><Loader2 className="animate-spin" size={16} aria-hidden="true" /></p>
        : takes.length === 0 ? <p className="hifz-muted">{t.noRecordings}</p>
        : (
          <ul className="hifz-report__takes">
            {takes.map(take => (
              <li key={take.id}>
                <span>{t.recordingOf(nameOf(take.surah), take.ayah)}</span>
                <small>{new Date(take.recordedAt).toLocaleDateString()} · {take.seconds}s</small>
                <button type="button" className="button button--soft" onClick={() => void play(take.id)}><Play size={15} aria-hidden="true" /> {t.play}</button>
                <button type="button" className="hifz-danger-link" onClick={() => void deleteRecording(take.id).then(refresh)}><Trash2 size={14} aria-hidden="true" /> {t.remove}</button>
              </li>
            ))}
          </ul>
        )}
      {playing && <audio src={playing} controls autoPlay className="hifz-report__player" />}
    </section>
  );
}
