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
  ArrowLeft, ArrowRight, BadgeCheck, Download, HandHeart, HardDrive, KeyRound, Loader2, Lock, LockOpen,
  Play, RotateCcw, Save, ShieldQuestion, Sparkles, Star, Trash2, X,
} from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { HifzBottomBar } from "@/components/HifzBottomBar";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { BadgeAward } from "@/components/BadgeAward";
import { useLocale } from "@/contexts/LocaleContext";
import { useHifzStore } from "@/hooks/useHifzStore";
import { characterArt } from "@/lib/hifz-characters";
import { childActivity } from "@/lib/child-activity";
import { dayNumber, recentlyForgotten, streakDays, todayPlan, type ForgottenAyah } from "@/lib/hifz-review";
import { rankFor, starsFor, totalStars } from "@/lib/hifz-stars";
import {
  approveRecital, askForPractice, ayahKey, backupFileName, backupIsStale, confirmDeclarations, confirmDeed,
  daysSinceBackup, declineDeed, exportBackup, markBackedUp, namedProfiles, pendingDeeds, pendingRecitals,
  practiceRecitals, reviewedRecitals, setParentLock, surahProgress,
  type ChildProfile, type HifzStore, type StepRecord, type StepStoryInfo,
} from "@/lib/hifz-store";
import { JOURNEY_SURAHS, ayahCountOf } from "@/lib/juz-amma";
import { forgetUnlock, isUnlocked, makeLock, pinMatches, pinProblem, rememberUnlock } from "@/lib/parent-lock";
import { getEnglishSurahName, getSurahName } from "@/lib/quran-content";
import { readFactDiscoveries, readFactDiscoveryDates } from "@/lib/quran-facts-progress";
import { factIndex } from "@/lib/page-index-lite.generated";
import {
  deleteProfileRecordings, deleteRecording, getRecording, listAllRecordings, recordingsUse, storageEstimate,
  type RecordingSummary, type StorageUse,
} from "@/lib/recordings";

// The lite index, not the full "في رحاب القرآن" content module — this page
// only ever needs the slugs to validate a discovery date against.
const FACT_SLUGS = factIndex.map(f => f.slug);

export const copy = {
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
    confirmed: "كل ما أُعلن بشهادتك",
    weekTitle: "هذا الأسبوع",
    noWeekActivity: "لا نشاط هذا الأسبوع",
    weekStories: (n: number) => `خلّص ${arabicCount(n, "قصة واحدة", "قصتين", "قصص", "قصة")}`,
    weekSeerah: (n: number) => `قرأ ${arabicCount(n, "قصة واحدة من السيرة", "قصتين من السيرة", "من السيرة", "من السيرة")}`,
    weekAqeedah: (n: number) => `قرأ ${arabicCount(n, "بطاقة واحدة من العقيدة", "بطاقتين من العقيدة", "من العقيدة", "من العقيدة")}`,
    weekCompanions: (n: number) => (n === 1 ? "قرأ عن صحابي واحد" : n === 2 ? "قرأ عن صحابيّين" : `قرأ عن ${n.toLocaleString("ar-EG")} من الصحابة`),
    weekFacts: (n: number) => `اكتشف ${arabicCount(n, "اكتشافًا واحدًا", "اكتشافين", "اكتشافات", "اكتشافًا")}`,
    weekAyahsDeclared: (n: number) => `أعلن حفظ ${arabicCount(n, "آية واحدة", "آيتين", "آيات", "آية")}`,
    weekAyahReviews: (n: number) => `راجع آيات ${arabicCount(n, "مرة واحدة", "مرتين", "مرات", "مرة")}`,
    weekDeedsRegistered: (n: number) => `سجّل ${arabicCount(n, "فعلًا واحدًا", "فعلين", "أفعال", "فعلًا")} من «جرّب اليوم»`,
    weekDeedsConfirmed: (n: number) => `أكّدت ${arabicCount(n, "فعلًا واحدًا", "فعلين", "أفعال", "فعلًا")} له`,
    weekRecitals: (n: number) => `سلّم ${arabicCount(n, "تسميعًا واحدًا", "تسميعين", "تسميعات", "تسميعًا")}`,
    recentTitle: (n: number) => `آخر ما فعله (${n.toLocaleString("ar-EG")})`,
    dayLabel: (days: number) => (days === 0 ? "اليوم" : days === 1 ? "أمس" : `قبل ${arabicCount(days, "يوم", "يومين", "أيام", "يومًا")}`),
    recentStory: (title: string) => `خلّص قصة «${title}»`,
    recentSeerah: (title: string) => `قرأ من السيرة: ${title}`,
    recentAqeedah: (title: string) => `قرأ من العقيدة: ${title}`,
    recentCompanions: (title: string) => `قرأ عن ${title}`,
    recentFact: (title: string) => `اكتشف: ${title}`,
    recentDeed: (title: string) => `سجّل فعل «${title}»`,
    recentAyahDeclared: (surah: string, count: number) => `أعلن حفظ ${arabicCount(count, "آية واحدة", "آيتين", "آيات", "آية")} من سورة ${surah}`,
    recentAyahReviewed: (count: number) => `راجع ${arabicCount(count, "آية واحدة", "آيتين", "آيات", "آية")}`,
    recentRecital: (recital: string) => `سلّم تسميع ${recital}`,
    encourageTitle: "شجّعه على",
    encouragePractice: (recital: string) => `تسميع ${recital} يحتاج تدريبًا — شجّعه يحاول مرة أخرى`,
    encourageReview: (n: number) => arabicCount(n, "آية واحدة تحتاج مراجعة اليوم", "آيتان تحتاجان مراجعة اليوم", "آيات تحتاج مراجعة اليوم", "آية تحتاج مراجعة اليوم"),
    encourageContinue: (title: string) => `لم يكمل «${title}» بعد — شجّعه يرجع لها`,
    needsReviewTitle: "تحتاج مراجعتك",
    deedSaid: (name: string) => `${name} قال إنه عملها`,
    deedDone: "تم", deedNotYet: "لسه",
    deedReward: "كنز الفعل",
    // A deed registered before this snapshot existed carries no wording of
    // its own — this is the only case where the parent corner still needs
    // a link back to the story instead of quoting it here.
    deedFromStory: "فعل من إحدى القصص.", deedOpenStory: "افتح القصة لتقرأها",
    deedOpenStoryInactive: (name: string) => `اختر ${name} أولًا لفتح القصة`,
    recitalOf: (surah: string, from: number, to: number) => (from === to ? `سورة ${surah} — الآية ${from}` : `سورة ${surah} — الآيات ${from} إلى ${to}`),
    recitalSaid: (name: string) => `${name} سمّع هذا المقطع`,
    recitalReady: "جاهز", recitalPractice: "يحتاج تدريبًا",
    noRecording: "بلا تسجيل — استمع للطفل مباشرة على هذا الجهاز.",
    recordingUnavailable: "التسجيل غير متاح.", reviewedTag: "تمت مراجعته",
    notePlaceholder: "رسالة تشجيع، اختيارية (مثلًا: ما شاء الله!)",
    declarationOf: (surah: string, count: number) => `سورة ${surah} — ${arabicCount(count, "آية واحدة معلنة", "آيتان معلنتان", "آيات معلنة", "آية معلنة")}`,
    confirm: "أشهد على ما أعلنه",
    practiceTag: "بانتظار محاولة جديدة من الطفل",
    forgottenOf: (surah: string, ayah: number) => `سورة ${surah} — الآية ${ayah}: قال إنه نسيها مؤخرًا`,
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
    confirmed: "Everything declared is confirmed by you",
    weekTitle: "This week",
    noWeekActivity: "No activity this week",
    weekStories: (n: number) => `Completed ${n === 1 ? "one story" : `${n} stories`}`,
    weekSeerah: (n: number) => `Read ${n === 1 ? "one" : n} from the Seerah`,
    weekAqeedah: (n: number) => `Read ${n === 1 ? "one" : n} creed card${n === 1 ? "" : "s"}`,
    weekCompanions: (n: number) => `Read about ${n === 1 ? "one companion" : `${n} companions`}`,
    weekFacts: (n: number) => `Discovered ${n === 1 ? "one fact" : `${n} facts`}`,
    weekAyahsDeclared: (n: number) => `Declared ${n === 1 ? "one ayah" : `${n} ayahs`} memorized`,
    weekAyahReviews: (n: number) => `Reviewed ayahs ${n === 1 ? "once" : `${n} times`}`,
    weekDeedsRegistered: (n: number) => `Logged ${n === 1 ? "one deed" : `${n} deeds`} from "try today"`,
    weekDeedsConfirmed: (n: number) => `You confirmed ${n === 1 ? "one deed" : `${n} deeds`}`,
    weekRecitals: (n: number) => `Submitted ${n === 1 ? "one recitation" : `${n} recitations`}`,
    recentTitle: (n: number) => `What they did last (${n})`,
    dayLabel: (days: number) => (days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`),
    recentStory: (title: string) => `Completed the story "${title}"`,
    recentSeerah: (title: string) => `Read from the Seerah: ${title}`,
    recentAqeedah: (title: string) => `Read from the creed: ${title}`,
    recentCompanions: (title: string) => `Read about ${title}`,
    recentFact: (title: string) => `Discovered: ${title}`,
    recentDeed: (title: string) => `Logged the deed "${title}"`,
    recentAyahDeclared: (surah: string, count: number) => `Declared ${count === 1 ? "one ayah" : `${count} ayahs`} of Surah ${surah} memorized`,
    recentAyahReviewed: (count: number) => `Reviewed ${count === 1 ? "one ayah" : `${count} ayahs`}`,
    recentRecital: (recital: string) => `Submitted a recitation of ${recital}`,
    encourageTitle: "Encourage next",
    encouragePractice: (recital: string) => `${recital} needs practice — encourage another try`,
    encourageReview: (n: number) => `${n === 1 ? "One ayah is" : `${n} ayahs are`} due for review today`,
    encourageContinue: (title: string) => `Hasn't finished "${title}" yet — encourage them to go back`,
    needsReviewTitle: "Needs your review",
    deedSaid: (name: string) => `${name} said they did it`,
    deedDone: "Done", deedNotYet: "Not yet",
    deedReward: "The deed's treasure",
    deedFromStory: "A deed from one of the stories.", deedOpenStory: "Open the story to read it",
    deedOpenStoryInactive: (name: string) => `Switch to ${name} first to open the story`,
    recitalOf: (surah: string, from: number, to: number) => (from === to ? `Surah ${surah} — ayah ${from}` : `Surah ${surah} — ayahs ${from} to ${to}`),
    recitalSaid: (name: string) => `${name} recited this segment`,
    recitalReady: "Ready", recitalPractice: "Needs practice",
    noRecording: "No recording — listen to the child directly on this device.",
    recordingUnavailable: "Recording unavailable.", reviewedTag: "Reviewed",
    notePlaceholder: "An encouraging note, optional (e.g. Masha'Allah!)",
    declarationOf: (surah: string, count: number) => `Surah ${surah} — ${count === 1 ? "one ayah" : `${count} ayahs`} declared`,
    confirm: "Confirm what they declared",
    practiceTag: "Waiting for the child to try again",
    forgottenOf: (surah: string, ayah: number) => `Surah ${surah} — ayah ${ayah}: said they forgot it recently`,
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

export type Copy = (typeof copy)["ar"];

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
                <NeedsYourReview t={t} profiles={namedProfiles(store)} store={store} commit={commit} />
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
    <HifzBottomBar />
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

export function ChildReport({ t, profile, store, commit }: {
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

  // Every timestamp the child has, not only their ayahs — a child who reads
  // stories and the Seerah without memorizing anything used to show "has not
  // started yet" here, which was simply false.
  const activity = useMemo(() => {
    // Intersected with the current discovered list: a date left behind by a
    // reset that predates this key, or any other drift between the two
    // tables, must not surface as a discovery that never actually happened.
    const discovered = new Set(readFactDiscoveries(FACT_SLUGS, profile.id));
    const facts = Object.entries(readFactDiscoveryDates(profile.id))
      .filter(([slug]) => discovered.has(slug))
      .map(([slug, at]) => ({ slug, at }));
    return childActivity(profile, { now: Date.now(), facts });
  }, [profile]);

  const weekLines = [
    activity.week.storiesDone > 0 && t.weekStories(activity.week.storiesDone),
    activity.week.seerahDone > 0 && t.weekSeerah(activity.week.seerahDone),
    activity.week.aqeedahDone > 0 && t.weekAqeedah(activity.week.aqeedahDone),
    activity.week.companionsDone > 0 && t.weekCompanions(activity.week.companionsDone),
    activity.week.factsDiscovered > 0 && t.weekFacts(activity.week.factsDiscovered),
    activity.week.ayahsDeclared > 0 && t.weekAyahsDeclared(activity.week.ayahsDeclared),
    activity.week.ayahReviews > 0 && t.weekAyahReviews(activity.week.ayahReviews),
    activity.week.deedsRegistered > 0 && t.weekDeedsRegistered(activity.week.deedsRegistered),
    activity.week.deedsConfirmed > 0 && t.weekDeedsConfirmed(activity.week.deedsConfirmed),
    activity.week.recitalsSubmitted > 0 && t.weekRecitals(activity.week.recitalsSubmitted),
  ].filter((line): line is string => Boolean(line));

  const encourageLine = (() => {
    const hint = activity.encourage;
    if (!hint) return null;
    if (hint.kind === "practice_recital") return { href: hint.href, text: t.encouragePractice(t.recitalOf(nameOf(hint.surah), hint.from, hint.to)) };
    if (hint.kind === "review_due") return { href: hint.href, text: t.encourageReview(hint.count) };
    return { href: hint.href, text: t.encourageContinue(locale === "en" && hint.titleEn ? hint.titleEn : hint.title) };
  })();

  const today = dayNumber(Date.now());
  const recentLines = activity.recent.map(item => {
    const day = t.dayLabel(today - dayNumber(item.at));
    const localized = (title: string, titleEn: string | null) => (locale === "en" && titleEn ? titleEn : title);
    switch (item.kind) {
      case "story": return { href: item.href, day, text: t.recentStory(localized(item.title, item.titleEn)) };
      case "seerah": return { href: item.href, day, text: t.recentSeerah(localized(item.title, item.titleEn)) };
      case "aqeedah": return { href: item.href, day, text: t.recentAqeedah(localized(item.title, item.titleEn)) };
      case "companions": return { href: item.href, day, text: t.recentCompanions(item.title) };
      case "fact": return { href: item.href, day, text: t.recentFact(localized(item.title, item.titleEn)) };
      case "deed": return { href: item.href, day, text: t.recentDeed(item.title) };
      case "ayah_declared": return { href: item.href, day, text: t.recentAyahDeclared(nameOf(item.surah), item.count) };
      case "ayah_reviewed": return { href: item.href, day, text: t.recentAyahReviewed(item.count) };
      case "recital": return { href: item.href, day, text: t.recentRecital(t.recitalOf(nameOf(item.surah), item.from, item.to)) };
    }
  });

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
        <li>{activity.lastActiveDay === null ? t.neverSeen : t.lastSeen(dayNumber(Date.now()) - activity.lastActiveDay)}</li>
      </ul>

      <section className="hifz-report__week">
        <h3>{t.weekTitle}</h3>
        {weekLines.length > 0 ? (
          <ul className="hifz-report__facts">{weekLines.map((line, i) => <li key={i}>{line}</li>)}</ul>
        ) : (
          <p className="hifz-report__empty">{t.noWeekActivity}</p>
        )}
      </section>

      {encourageLine && (
        <section className="hifz-report__encourage">
          <h3>{t.encourageTitle}</h3>
          {/* useLearningStep/Stories.tsx record progress for the ACTIVE
              profile on the device, not for whoever's card this is — a link
              here on a child who is not currently active would silently
              write to the wrong child's record the moment it is opened. */}
          {profile.id === store.activeProfileId
            ? <Link href={encourageLine.href}>{encourageLine.text}</Link>
            : <span>{encourageLine.text}</span>}
        </section>
      )}

      {recentLines.length > 0 && (
        <details className="hifz-report__recent">
          <summary>{t.recentTitle(recentLines.length)}</summary>
          <ul>
            {recentLines.map((line, i) => (
              <li key={i}>
                {/* Text only, deliberately never a link — see the note on
                    "شجّعه على" above; this list often shows a child who is
                    not the active profile. */}
                <span>{line.text}</span>
                <small>{line.day}</small>
              </li>
            ))}
          </ul>
        </details>
      )}

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
                {/* Confirming lives in "needs your review" below now, next to
                    every other thing waiting on a parent's word — this stays
                    a read-only progress line. */}
                {row.byChild === 0 && row.byParent > 0 && <em>{t.confirmed}</em>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Recordings t={t} profileId={profile.id} nameOf={nameOf} />
    </article>
  );
}

type WaitingItem =
  | { kind: "deed"; profile: ChildProfile; chapter: string; slug: string; record: StepRecord; at: number }
  | { kind: "declaration"; profile: ChildProfile; surah: number; total: number; count: number; at: number };
type RecitalItem = { profile: ChildProfile; surah: number; from: number; to: number; record: StepRecord; at: number };

/**
 * Everything asking for a parent's word, in one place: a recital, a deed
 * from a story's "try today", and ayahs a child declared themselves that no
 * parent has put their name to yet — the child's declarations used to live
 * in the surah list above with their own confirm button, and deeds in a
 * section of their own; a parent working through "what needs me right now"
 * had to check two places for a third of the answer, and now has one.
 *
 * "Bانتظارك" is every one of those three, oldest first — a surah's bundle of
 * declarations has no single waiting-since moment the way a deed or a
 * recital does, so it sorts after anything that does rather than displacing
 * it. Below that, a recital sitting at "needs practice" — nothing to judge,
 * only to know is still on the child's plate — and an ayah recently said
 * forgotten, shown for the same reason: awareness, not a verdict.
 */
function NeedsYourReview({ t, profiles, store, commit }: {
  t: Copy; profiles: ChildProfile[]; store: HifzStore; commit: (s: HifzStore) => boolean;
}) {
  const { locale } = useLocale();
  const nameOf = (surah: number) => (locale === "ar" ? getSurahName(surah) : getEnglishSurahName(surah));
  const [justAwarded, setJustAwarded] = useState<Array<{ chapter: string; slug: string; story?: StepStoryInfo }>>([]);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  const recitals: RecitalItem[] = [
    ...profiles.flatMap(profile => pendingRecitals(profile).map(r => ({ profile, ...r, at: r.record.awaitingAt ?? 0 }))),
    ...profiles.flatMap(profile => practiceRecitals(profile).map(r => ({ profile, ...r, at: r.record.reviewedAt ?? 0 }))),
    ...profiles.flatMap(profile => reviewedRecitals(profile).map(r => ({ profile, ...r, at: r.record.reviewedAt ?? 0 }))),
  ].sort((a, b) => {
    const rank = (item: RecitalItem) => item.record.status === "awaiting_parent" ? 0 : item.record.status === "needs_practice" ? 1 : 2;
    const byStatus = rank(a) - rank(b);
    if (byStatus) return byStatus;
    return a.record.status === "reviewed" ? b.at - a.at : a.at - b.at;
  });
  const forgotten = profiles.flatMap(profile => recentlyForgotten(profile).map(item => ({ profile, item })));
  const waiting: WaitingItem[] = profiles.flatMap(profile => {
    const declarations = JOURNEY_SURAHS.map(surah => {
      const total = ayahCountOf(surah);
      let count = 0;
      for (let ayah = 1; ayah <= total; ayah++) if (profile.ayahs[ayahKey(surah, ayah)]?.declaredBy === "child") count++;
      return count > 0 ? { kind: "declaration" as const, profile, surah, total, count, at: 0 } : null;
    }).filter((item): item is Extract<WaitingItem, { kind: "declaration" }> => item !== null);
    return [
      ...pendingDeeds(profile).map(d => ({ kind: "deed" as const, profile, ...d, at: d.record.awaitingAt ?? 0 })),
      ...declarations,
    ];
  }).sort((a, b) => a.at - b.at);

  if (recitals.length === 0 && waiting.length === 0 && forgotten.length === 0 && justAwarded.length === 0) return null;

  const play = async (id: string) => {
    const full = await getRecording(id);
    if (!full) return;
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(full.blob);
    setPlayingUrl(urlRef.current);
  };

  return (
    <section>
      <h3>{t.needsReviewTitle}</h3>
      <ul className="hifz-report__deeds">
        {recitals.map(item => (
          <RecitalCard
            key={`recital:${item.profile.id}:${item.surah}:${item.from}-${item.to}`}
            t={t} profile={item.profile} store={store} commit={commit}
            surah={item.surah} from={item.from} to={item.to} record={item.record}
            nameOf={nameOf} onPlay={play}
          />
        ))}
        {waiting.map(item => {
          if (item.kind === "deed") {
            return (
              <li key={`deed:${item.chapter}:${item.slug}`} className="hifz-deed">
                {item.record.story ? (
                  <>
                    <b>{item.record.story.title}</b>
                    <blockquote>{item.record.story.action}</blockquote>
                  </>
                ) : (
                  <p>
                    {t.deedFromStory}{" "}
                    {/* Same rule as the per-child card: opening the story
                        would record progress for whichever profile is
                        active on this device, not necessarily item.profile. */}
                    {item.profile.id === store.activeProfileId
                      ? <Link href={`/stories/${item.chapter}/${item.slug}`} className="text-link">{t.deedOpenStory}</Link>
                      : <span>{t.deedOpenStoryInactive(item.profile.name)}</span>}
                  </p>
                )}
                <small>{t.deedSaid(item.profile.name)}</small>
                <div className="hifz-actions">
                  <button
                    type="button" className="button button--primary"
                    onClick={() => {
                      commit(confirmDeed(store, item.profile.id, item.chapter, item.slug));
                      setJustAwarded(prev => [...prev, { chapter: item.chapter, slug: item.slug, story: item.record.story }]);
                    }}
                  >
                    <HandHeart size={16} aria-hidden="true" /> {t.deedDone}
                  </button>
                  <button type="button" className="button button--soft" onClick={() => commit(declineDeed(store, item.profile.id, item.chapter, item.slug))}>
                    <X size={16} aria-hidden="true" /> {t.deedNotYet}
                  </button>
                </div>
              </li>
            );
          }
          return (
            <li key={`declaration:${item.surah}`} className="hifz-deed">
              <b>{t.declarationOf(nameOf(item.surah), item.count)}</b>
              <div className="hifz-actions">
                <button type="button" className="button button--primary" onClick={() => commit(confirmDeclarations(store, item.profile.id, item.surah, 1, item.total))}>
                  <BadgeCheck size={16} aria-hidden="true" /> {t.confirm}
                </button>
              </div>
            </li>
          );
        })}

        {forgotten.map(({ profile, item: f }) => (
          <li key={`forgotten:${profile.id}:${f.surah}:${f.ayah}`} className="hifz-deed hifz-deed--muted">
            <small>{t.forgottenOf(nameOf(f.surah), f.ayah)}</small>
          </li>
        ))}

        {/* Confirming moves a deed out of pendingDeeds() at once; the medal
            is held here rather than in the store, so it stays on the page for
            this visit instead of vanishing the instant it is earned. No
            snapshot, no reward to show — the row just does not appear. */}
        {justAwarded.map(({ chapter, slug, story }) => {
          if (!story) return null;
          return (
            <li key={`awarded-${chapter}:${slug}`} className="hifz-deed hifz-deed--awarded">
              <BadgeAward icon={story.reward.icon} badge={story.reward.badge} keepsake={story.reward.keepsake} note={story.reward.note} label={t.deedReward} />
            </li>
          );
        })}
      </ul>
      {playingUrl && <audio src={playingUrl} controls autoPlay className="hifz-report__player" />}
    </section>
  );
}

/**
 * A recital, judged: ▶ to hear it (when there is a recording — see
 * submitRecital's no-microphone path in hifz-store.ts for when there is
 * not), an optional encouragement note, and the two words that matter —
 * "ready" promotes the segment's own declarations the same way confirming a
 * whole surah does, "needs practice" restarts their review spacing without
 * touching what the child themselves declared.
 */
function RecitalCard({ t, profile, store, commit, surah, from, to, record, nameOf, onPlay }: {
  t: Copy; profile: ChildProfile; store: HifzStore; commit: (s: HifzStore) => boolean;
  surah: number; from: number; to: number; record: StepRecord; nameOf: (surah: number) => string; onPlay: (id: string) => void;
}) {
  const { locale } = useLocale();
  const [note, setNote] = useState("");
  const [recording, setRecording] = useState<boolean | null>(record.recordingId ? null : false);

  useEffect(() => {
    let live = true;
    if (!record.recordingId) {
      setRecording(false);
      return;
    }
    setRecording(null);
    void getRecording(record.recordingId).then(full => { if (live) setRecording(Boolean(full)); }, () => { if (live) setRecording(false); });
    return () => { live = false; };
  }, [record.recordingId]);

  const actionable = record.status === "awaiting_parent";

  return (
    <li className="hifz-deed">
      <b>{t.recitalOf(nameOf(surah), from, to)}</b>
      <small>{t.recitalSaid(profile.name)}</small>
      <small>{new Date(record.doneAt ?? record.awaitingAt ?? record.reviewedAt ?? 0).toLocaleString(locale)}</small>
      {recording ? (
        <button type="button" className="button button--soft" onClick={() => onPlay(record.recordingId!)}>
          <Play size={15} aria-hidden="true" /> {t.play}
        </button>
      ) : recording === null ? (
        <p className="hifz-muted"><Loader2 className="animate-spin" size={16} aria-hidden="true" /></p>
      ) : record.recordingId ? (
        <p className="hifz-muted">{t.recordingUnavailable}</p>
      ) : (
        <p className="hifz-muted">{t.noRecording}</p>
      )}
      {actionable ? (
        <>
          <textarea
            className="hifz-note" rows={2} placeholder={t.notePlaceholder}
            value={note} onChange={e => setNote(e.target.value)}
          />
          <div className="hifz-actions">
            <button type="button" className="button button--primary" onClick={() => commit(approveRecital(store, profile.id, surah, from, to, note || undefined))}>
              <Sparkles size={16} aria-hidden="true" /> {t.recitalReady}
            </button>
            <button type="button" className="button button--soft" onClick={() => commit(askForPractice(store, profile.id, surah, from, to, note || undefined))}>
              <RotateCcw size={16} aria-hidden="true" /> {t.recitalPractice}
            </button>
          </div>
        </>
      ) : (
        <small>{record.status === "needs_practice" ? t.practiceTag : t.reviewedTag}</small>
      )}
    </li>
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
