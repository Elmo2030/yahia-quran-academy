// =============================================================================
// RecordingsOverview — every recording on this device, across all surahs.
//
// The home page told parents "you will see activity" and showed captions where
// the numbers should be. This is the activity, and it is real: what the child
// actually recorded, when, and how long. It appears only once there is
// something to show, so a first-time visitor is not shown an empty promise.
// =============================================================================

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Download, Mic, Trash2 } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { getSurahName, getEnglishSurahName } from "@/lib/quran-content";
import { deleteRecording, getRecording, listAllRecordings, type RecordingSummary } from "@/lib/recordings";

const copy = {
  ar: {
    eyebrow: "نشاط الطفل",
    title: "تسجيلات محفوظة على هذا الجهاز",
    body: "هذه التلاوات التي سجّلها الطفل. اسمعها معه وقارنا بتلاوة الشيخ — لا يوجد تقييم آلي، الحكم لكما.",
    open: "افتح السورة",
    download: "نزّل",
    remove: "احذف",
    count: (n: number) => `${n} تسجيل`,
  },
  en: {
    eyebrow: "Your child's activity",
    title: "Recordings saved on this device",
    body: "These are the recitations your child recorded. Listen together and compare with the sheikh — there is no automatic score; the judgement is yours.",
    open: "Open the surah",
    download: "Download",
    remove: "Delete",
    count: (n: number) => `${n} recording${n === 1 ? "" : "s"}`,
  },
} as const;

export function RecordingsOverview() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [clips, setClips] = useState<RecordingSummary[]>([]);

  const refresh = () => { void listAllRecordings().then(setClips).catch(() => setClips([])); };
  useEffect(refresh, []);

  if (clips.length === 0) return null;

  return (
    <section className="section recordings-overview" aria-labelledby="recordings-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow eyebrow--gold"><Mic size={14} aria-hidden="true" /> {t.eyebrow}</span>
          <h2 id="recordings-title">{t.title}</h2>
          <p>{t.body}</p>
        </div>
        <p className="recordings-overview__count">{t.count(clips.length)}</p>
        <ul className="recordings-overview__list">
          {clips.slice(0, 8).map(clip => (
            <li key={clip.id}>
              <Link href={`/hifz/${clip.surah}`} className="recordings-overview__surah">
                {locale === "en" ? getEnglishSurahName(clip.surah) : getSurahName(clip.surah)}
              </Link>
              <span className="recordings-overview__when">
                {new Date(clip.recordedAt).toLocaleString(locale === "ar" ? "ar-EG" : "en-GB", {
                  dateStyle: "short", timeStyle: "short",
                })}
              </span>
              <span className="recordings-overview__length">
                {Math.floor(clip.seconds / 60)}:{String(clip.seconds % 60).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="recorder__icon"
                aria-label={`${t.download} — ${locale === "en" ? getEnglishSurahName(clip.surah) : getSurahName(clip.surah)}`}
                onClick={async () => {
                  const full = await getRecording(clip.id);
                  if (!full) return;
                  const url = URL.createObjectURL(full.blob);
                  const link = document.createElement("a");
                  link.href = url;
                  const ext = full.mimeType.includes("mp4") ? "m4a" : full.mimeType.includes("ogg") ? "ogg" : "webm";
                  link.download = `surah-${clip.surah}.${ext}`;
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="recorder__icon recorder__icon--danger"
                aria-label={`${t.remove} — ${locale === "en" ? getEnglishSurahName(clip.surah) : getSurahName(clip.surah)}`}
                onClick={async () => { await deleteRecording(clip.id); refresh(); }}
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RecordingsOverview;
