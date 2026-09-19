export type CompanionSection = { title: string; paragraphs: string[] };
export type CompanionStory = {
  id: string; slug: string; order: number; name: string; title: string;
  traits: string[]; icon: string; description: string; keyMoment: string;
  sections: CompanionSection[]; tryToday: string[]; questions: string[]; adultQuestions: string[]; exploreMore: string[];
  challenge: { question: string; options: string[]; correctAnswer: number };
  sources: { reference: string; type: string; reviewStatus: string }[];
  parentNote: string; adultNotes: CompanionSection[];
  reviewStatus: string; sourceFile: string; reviewFlags: string[];
};

const files = import.meta.glob<CompanionStory>("./companions.generated/*.json", { import: "default" });
export async function loadCompanion(slug: string): Promise<CompanionStory | null> {
  const load = files[`./companions.generated/${slug}.json`];
  return load ? load() : null;
}
