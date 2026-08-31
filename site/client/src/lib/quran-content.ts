import { ayahCounts } from "./surah-ayah-counts.generated";

export const AUDIO_MANIFEST_URL = "/manus-storage/audio_manifest_11d36380.json";

/** One file per surah, written by scripts/build-surah-data.mjs. */
export const surahUrl = (surah: number) => `/quran/surah-${String(surah).padStart(3, "0")}.json`;

export type Ayah = { number: number; text: string };
export type TransliteratedAyah = Ayah & { transliteration: string };

export type SurahAudio = {
  surah: number;
  availability: "migrated" | string;
  playback_url?: string;
  timing_status: "available" | "unavailable" | string;
  content_type?: string;
  size_bytes?: number;
};

type AudioManifest = { surahs: Record<string, SurahAudio> };

/** The shape on disk: short keys, because it is repeated 6236 times. */
type SurahFile = { s: number; a: { n: number; t: string; r: string }[] };

let audioPromise: Promise<AudioManifest> | null = null;
const surahPromises = new Map<number, Promise<TransliteratedAyah[]>>();

async function loadJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("تعذر تحميل محتوى القرآن الآن.");
  return (await response.json()) as T;
}

export function validateAudioManifest(value: unknown): AudioManifest {
  if (!value || typeof value !== "object" || !("surahs" in value)) throw new Error("فهرس الصوت غير صالح.");
  const manifest = value as AudioManifest;
  const entries = manifest.surahs;
  if (!entries || typeof entries !== "object" || Object.keys(entries).length !== 114) throw new Error("فهرس الصوت لا يغطي السور 114 كاملة.");
  for (let surah = 1; surah <= 114; surah += 1) {
    const item = entries[String(surah)];
    const extension = surah === 1 ? "m4a" : "mp3";
    const expectedKey = `surahs/${String(surah).padStart(3, "0")}.${extension}`;
    if (!item || item.surah !== surah || item.availability !== "migrated" || item.timing_status !== "unavailable" || typeof item.playback_url !== "string" || !item.playback_url.startsWith("https://") || !item.playback_url.endsWith(expectedKey)) throw new Error(`فهرس الصوت غير صالح للسورة ${surah}.`);
  }
  return manifest;
}

/**
 * A surah file, checked on arrival.
 *
 * The corpus-wide checks — 114 surahs, 6236 ayahs, a transliteration for every
 * one — run in scripts/build-surah-data.mjs and fail the build. What is left to
 * do here is confirm this one file arrived whole and in order, so a truncated
 * response is an error rather than a surah quietly missing its last ayahs.
 */
export function validateSurahFile(value: unknown, surah: number): TransliteratedAyah[] {
  const expected = ayahCounts[surah - 1];
  if (!expected) throw new Error(`لا توجد سورة برقم ${surah}.`);

  const file = value as SurahFile;
  if (!file || typeof file !== "object" || file.s !== surah || !Array.isArray(file.a))
    throw new Error(`ملف السورة ${surah} غير صالح.`);
  if (file.a.length !== expected)
    throw new Error(`سورة ${surah} وصلت ناقصة: ${file.a.length} آية بدل ${expected}.`);

  return file.a.map((ayah, index) => {
    if (ayah?.n !== index + 1 || typeof ayah.t !== "string" || !ayah.t.trim() || typeof ayah.r !== "string" || !ayah.r.trim())
      throw new Error(`الآية ${index + 1} من سورة ${surah} غير صالحة.`);
    return { number: ayah.n, text: ayah.t, transliteration: ayah.r };
  });
}

export function loadAudioManifest() { audioPromise ??= loadJson<unknown>(AUDIO_MANIFEST_URL).then(validateAudioManifest); return audioPromise; }

export function loadSurahWithTransliteration(surah: number): Promise<TransliteratedAyah[]> {
  let pending = surahPromises.get(surah);
  if (!pending) {
    pending = loadJson<unknown>(surahUrl(surah))
      .then(value => validateSurahFile(value, surah))
      // A failed surah must not be remembered as failed: the next visit to it
      // should try the network again rather than replay the error.
      .catch(error => { surahPromises.delete(surah); throw error; });
    surahPromises.set(surah, pending);
  }
  return pending;
}

export async function loadSurah(surah: number): Promise<Ayah[]> {
  const ayahs = await loadSurahWithTransliteration(surah);
  return ayahs.map(({ number, text }) => ({ number, text }));
}

export async function loadSurahAudio(surah: number) { const manifest = await loadAudioManifest(); return manifest.surahs[String(surah)] ?? null; }

export const surahNames = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس",
];

export const englishSurahNames = [
  "Al-Faatiha", "Al-Baqara", "Aal-i-Imraan", "An-Nisaa", "Al-Maaida", "Al-An'aam", "Al-A'raaf", "Al-Anfaal", "At-Tawba", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Israa", "Al-Kahf", "Maryam", "Taa-Haa", "Al-Anbiyaa", "Al-Hajj", "Al-Muminoon", "An-Noor", "Al-Furqaan", "Ash-Shu'araa", "An-Naml", "Al-Qasas", "Al-Ankaboot", "Ar-Room", "Luqman", "As-Sajda", "Al-Ahzaab", "Saba", "Faatir", "Yaseen", "As-Saaffaat", "Saad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhaan", "Al-Jaathiya", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujuraat", "Qaaf", "Adh-Dhaariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahmaan", "Al-Waaqia", "Al-Hadid", "Al-Mujaadila", "Al-Hashr", "Al-Mumtahana", "As-Saff", "Al-Jumu'a", "Al-Munaafiqoon", "At-Taghaabun", "At-Talaaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haaqqa", "Al-Ma'aarij", "Nooh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyaama", "Al-Insaan", "Al-Mursalaat", "An-Naba", "An-Naazi'aat", "Abasa", "At-Takwir", "Al-Infitaar", "Al-Mutaffifin", "Al-Inshiqaaq", "Al-Burooj", "At-Taariq", "Al-A'laa", "Al-Ghaashiya", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Dhuhaa", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Aadiyaat", "Al-Qaari'a", "At-Takaathur", "Al-Asr", "Al-Humaza", "Al-Fil", "Quraish", "Al-Maa'un", "Al-Kawthar", "Al-Kaafiroon", "An-Nasr", "Al-Masad", "Al-Ikhlaas", "Al-Falaq", "An-Naas",
];

export function getSurahName(surah: number) { return surahNames[surah - 1] ?? ""; }
export function getEnglishSurahName(surah: number) { return englishSurahNames[surah - 1] ?? ""; }
