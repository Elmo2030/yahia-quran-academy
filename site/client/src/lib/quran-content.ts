export const QURAN_TEXT_URL = "/manus-storage/quran_text_393629d5.json";
export const AUDIO_MANIFEST_URL = "/manus-storage/audio_manifest_11d36380.json";
export const TRANSLITERATION_URL = "/manus-storage/quran_transliteration_alquran_cloud_d15d511b.json";

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
type QuranText = Record<string, string>;
type TransliterationSurah = { english_name: string; english_name_translation: string; ayahs: Record<string, string> };
type TransliterationPayload = { surahs: Record<string, TransliterationSurah> };

let textPromise: Promise<QuranText> | null = null;
let audioPromise: Promise<AudioManifest> | null = null;
let transliterationPromise: Promise<TransliterationPayload> | null = null;

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

export function validateTransliteration(value: unknown): TransliterationPayload {
  if (!value || typeof value !== "object" || !("surahs" in value)) throw new Error("ملف النطق باللاتينية غير صالح.");
  const payload = value as TransliterationPayload;
  if (!payload.surahs || Object.keys(payload.surahs).length !== 114) throw new Error("ملف النطق باللاتينية لا يغطي السور 114 كاملة.");
  let totalAyahs = 0;
  for (let surah = 1; surah <= 114; surah += 1) {
    const item = payload.surahs[String(surah)];
    if (!item || typeof item.english_name !== "string" || !item.english_name.trim() || !item.ayahs || typeof item.ayahs !== "object") throw new Error(`ملف النطق باللاتينية غير صالح للسورة ${surah}.`);
    for (const text of Object.values(item.ayahs)) {
      if (typeof text !== "string" || !text.trim()) throw new Error(`نص النطق باللاتينية غير صالح للسورة ${surah}.`);
      totalAyahs += 1;
    }
  }
  if (totalAyahs !== 6236) throw new Error("ملف النطق باللاتينية لا يغطي الآيات 6236 كاملة.");
  return payload;
}

export function loadQuranText() { textPromise ??= loadJson<QuranText>(QURAN_TEXT_URL); return textPromise; }
export function loadAudioManifest() { audioPromise ??= loadJson<unknown>(AUDIO_MANIFEST_URL).then(validateAudioManifest); return audioPromise; }
export function loadTransliteration() { transliterationPromise ??= loadJson<unknown>(TRANSLITERATION_URL).then(validateTransliteration); return transliterationPromise; }

export async function loadSurah(surah: number): Promise<Ayah[]> {
  const text = await loadQuranText();
  return Object.entries(text).map(([key, value]) => { const [surahNumber, number] = key.split(":").map(Number); return { surahNumber, number, text: value }; }).filter(ayah => ayah.surahNumber === surah).sort((a, b) => a.number - b.number).map(({ number, text }) => ({ number, text }));
}

export async function loadSurahWithTransliteration(surah: number): Promise<TransliteratedAyah[]> {
  const [ayahs, transliteration] = await Promise.all([loadSurah(surah), loadTransliteration()]);
  const transliteratedSurah = transliteration.surahs[String(surah)];
  return ayahs.map(ayah => {
    const romanized = transliteratedSurah?.ayahs[String(ayah.number)];
    if (!romanized) throw new Error(`النطق باللاتينية غير متاح للآية ${surah}:${ayah.number}.`);
    return { ...ayah, transliteration: romanized };
  });
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
