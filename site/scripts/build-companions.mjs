import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, "content/companions-source");
const adapters = JSON.parse(readFileSync(join(input, "adapters.json"), "utf8"));
const moments = ["عندما أصبح الطريق خطرًا", "فكرة لم تكن سهلة", "فريق من أجل القرآن", "أين علي؟", "عودة من حراء", "ثم نزل القرآن", "شاهد من قلب الحدث", "سؤال النبي ﷺ", "ثلاثة قادة سقطوا", "بينما كان الآخرون مشغولين...", "ثلاث حقوق", "مهارة في وقت الحاجة", "بداية جديدة", "عندما يصبح الوفاء فعلًا", "عندما طُلب من يأتينا بالخبر", "عندما يبحث الناس عن شخص يثقون به", "«اقرأ عليّ»", "دعوة النبي ﷺ", "أنت ذاهب إلى قوم...", "البحث والجمع", "ثلاثة قادة", "هل فتحت قلبه؟", "الاختبار الحقيقي للأخلاق", "الجميع يعمل", "الثوب القصير", "لحظة تحتاج إلى حل", "انتقلت الراية", "نبوءة تحققت", "لحظة أخرى يجب أن نتذكرها", "أمر من الله"];
const plain = text => text.replace(/\*+/g, "").trim();
const paragraphs = text => text.trim().split(/\n\s*\n/).map(plain).filter(p => p && p !== "---");
// Editorial and sensitive historical sections are retained for adult review,
// never silently deleted or represented as approved child narrative.
const adultSections = {
  14: ["لماذا لا نضيف تفاصيل مثيرة؟", "عندما تصبح الأحداث معقدة"],
  15: ["ليس كل ما في حياته قصة بسيطة"],
  24: ["خبر عن المستقبل"],
  25: ["اللحظة التي لا تُنسى"],
  26: ["لا نحتاج إلى اختراع مغامرة"],
  28: ["بعد سنوات من الفتنة", "لا نحول التاريخ إلى مباراة"],
  29: ["ثم تغير العالم من حوله", "الرحلة إلى العراق", "كربلاء", "كيف نشرحها لطفل؟"],
};

export const companions = [];
for (const file of ["01-05.md", "06-10.md", "11-15.md", "16-20.md", "21-25.md", "26-30.md"]) {
  const source = readFileSync(join(input, file), "utf8");
  for (const match of source.matchAll(/^# (\d+)\. (.+)\n([\s\S]*?)(?=^# \d+\. |$(?![\s\S]))/gm)) {
    const order = Number(match[1]);
    const body = match[3];
    const [slug, icon, options, correctAnswer] = adapters[order - 1];
    const title = plain(body.match(/^## (.+)$/m)?.[1] ?? "");
    const traits = plain(body.match(/^\*\*الصفات التي سنكتشفها:\*\* (.+)$/m)?.[1] ?? "").split(/ — /);
    const sections = [...body.matchAll(/^### (.+)\n([\s\S]*?)(?=^### |$(?![\s\S]))/gm)].map(m => ({ title: plain(m[1]), paragraphs: paragraphs(m[2]) }));
    const opening = body.split(/^### /m)[0].replace(/^## .+\n/m, "").replace(/^\*\*الصفات التي سنكتشفها:\*\* .+\n/m, "");
    const find = title => sections.find(s => s.title === title)?.paragraphs ?? [];
    const questions = find("يحيى يسأل").join("\n").split(/\n/).map(q => q.replace(/^\d+\.\s*/, "")).filter(Boolean);
    const adultQuestions = questions.slice(1).filter(q => /صفين|كربلاء/.test(q));
    const parent = find("للوالدين والمعلمين").join("\n\n");
    const [parentNote, references = ""] = parent.split("المصادر الأساسية:");
    const adultNotes = [];
    const storySections = [{ title: "", paragraphs: paragraphs(opening) }, ...sections.filter(s => !["جرّبها اليوم", "يحيى يسأل", "Explore More", "للوالدين والمعلمين"].includes(s.title))].map(s => {
      if (adultSections[order]?.includes(s.title)) {
        adultNotes.push(s);
        return { ...s, paragraphs: [] };
      }
      return s;
    }).filter(s => s.paragraphs.length);
    const sources = references.split(/\n/).map(plain).filter(Boolean).map(reference => ({
      reference,
      type: /القرآن/.test(reference) ? "quran" : /البخاري|مسلم|الحديث|الترمذي/.test(reference) ? "hadith" : "historical",
      // Classification is not an authenticity verdict; review remains explicit.
      reviewStatus: "scholar_review_required",
    }));
    if (!title || traits.length < 1 || !questions.length || !sources.length || !find("جرّبها اليوم").length) throw new Error(`Incomplete companion ${order}`);
    if (!storySections.some(s => s.title === moments[order - 1])) throw new Error(`Missing key moment for ${slug}`);
    companions.push({ id: `companion-${order}`, slug, order, name: plain(match[2]), title, traits, icon, keyMoment: moments[order - 1],
      description: `${plain(match[2])} — ${title}`, sections: storySections,
      tryToday: find("جرّبها اليوم"), questions, adultQuestions, exploreMore: find("Explore More"),
      challenge: { question: questions[0], options, correctAnswer }, sources, parentNote: parentNote.trim(), adultNotes,
      reviewStatus: "scholar_review_required", sourceFile: `content/companions-source/${file}`,
      reviewFlags: ["Supplied sources preserved; no independent scholarly approval recorded.", "Choice adapter uses the first supplied question; remaining questions are discussion prompts.", ...(adultNotes.length ? ["Editorial/sensitive passages moved to adult notes; review child/adult boundary."] : [])],
    });
  }
}
if (companions.length !== 30 || new Set(companions.map(c => c.slug)).size !== 30) throw new Error("Expected 30 unique supplied companions");
const output = join(root, "client/src/content/companions.generated");
mkdirSync(output, { recursive: true });
for (const companion of companions) writeFileSync(join(output, `${companion.slug}.json`), JSON.stringify(companion, null, 2) + "\n");
export const companionIndex = companions.map(({ slug, order, name, title, traits, icon, description }) => ({ slug, order, name, title, traits, icon, description }));
writeFileSync(join(root, "client/src/lib/companion-index.generated.ts"), `// Generated from the supplied Arabic stories. Do not edit.\nexport const companionIndex = ${JSON.stringify(companionIndex, null, 2)};\n`);
