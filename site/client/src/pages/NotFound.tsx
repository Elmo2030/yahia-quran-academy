// =============================================================================
// NotFound — the page a wrong address lands on.
//
// It was template boilerplate: an English sentence on a blue button, in colours
// from no part of this site, with no way anywhere except home. Every mistyped
// link on an Arabic children's site arrived there. It says the same thing in
// the site's own voice now, in both languages, and offers the three places a
// lost visitor is most likely to have been looking for.
// =============================================================================

import { Link } from "wouter";
import { BookOpen, Compass, Sparkles } from "lucide-react";

import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";

const copy = {
  ar: {
    eyebrow: "الصفحة غير موجودة",
    title: "لا يوجد شيء هنا",
    body: "ربما تغيّر العنوان، أو كُتب خطأً. تعالَ نبدأ من مكان نعرفه.",
    reader: "افتح القارئ",
    stories: "قصص القرآن",
    facts: "في رحاب القرآن",
  },
  en: {
    eyebrow: "Page not found",
    title: "There is nothing here",
    body: "The address may have changed, or been typed a little wrong. Let’s start somewhere we know.",
    reader: "Open the reader",
    stories: "Quran stories",
    facts: "In the Realm of the Quran",
  },
} as const;

export default function NotFound() {
  const { direction, locale } = useLocale();
  const t = copy[locale];

  return (
    <main className="site-shell" dir={direction}>
      <SkipLink />
      <SiteChrome />

      <section className="stories-list-hero" id={MAIN_CONTENT_ID}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.body}</p>
        </div>
      </section>

      <section className="section">
        <div className="container not-found-ways">
          <Link href="/read/1" className="button button--primary">
            <BookOpen size={17} aria-hidden="true" /> {t.reader}
          </Link>
          <Link href="/stories" className="button button--soft">
            <Compass size={17} aria-hidden="true" /> {t.stories}
          </Link>
          <Link href="/quran-facts" className="button button--soft">
            <Sparkles size={17} aria-hidden="true" /> {t.facts}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
