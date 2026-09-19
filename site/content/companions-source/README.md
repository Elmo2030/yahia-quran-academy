# Companions V1 content provenance

The six numbered Markdown files are exact copies of the user's supplied 30 Arabic stories. They remain the narrative source of truth. Do not edit generated JSON or the generated metadata index.

`scripts/build-companions.mjs` runs from the existing SEO build. It normalizes headings/paragraphs and Markdown emphasis into safely rendered text, produces one lazy-loaded JSON file per story and a lightweight index for cards, Journey and SEO. `adapters.json` supplies only stable slugs, symbolic Lucide icon keys and three answer choices for the first supplied question. No English narrative is generated.

The first question is interactive. Other supplied questions remain family discussion prompts, not automatically scored exercises. Correctly answering the interactive question completes `companions:<slug>` in the existing named child's `steps`. Completion is not mastery, parent approval, or scholarly sign-off. Badge labels derive from the supplied first trait and use the existing BadgeAward presentation; there is no separate reward store.

## Review boundaries

All records explicitly retain `scholar_review_required`. No named reviewer or independent historical verification is asserted. Source references are preserved as supplied; the source type describes a reference, not a verdict on every sentence. Some references name only a book, not a report identifier. The parent layer distinguishes references from pedagogical explanation.

The explicit `adultSections` list in the generator relocates entire sections (without rewriting them) from stories 14, 15, 24, 25, 26, 28 and 29 to the adult review disclosure. These contain editorial directions or sensitive political history. Original source files retain the complete text and sequence. This boundary needs human editorial review, particularly Ammar, Hasan and Husayn. A disclosure is not a security/parent lock.

Other human review priorities: age suitability of bereavement/battle accounts (Hamzah, Usamah, Musab); the accusation account in Aishah's story; wording of Quran/Hadith quotations and interpretive passages; incomplete reference identifiers; supplied editorial prose embedded in narrative; first-question choices and remaining discussion prompts. No religious dialogue, sources or psychological detail were added by the implementation. Technical tests do not close these review flags.

Publication scope: all 30 supplied stories, Arabic first, no new illustrations, no auto-translation, no additional biographies.
