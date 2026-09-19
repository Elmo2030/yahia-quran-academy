import { AdventureJourney } from "@/components/journey/AdventureJourney";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SkipLink, MAIN_CONTENT_ID } from "@/components/SkipLink";
import { useLocale } from "@/contexts/LocaleContext";

export default function Journey() {
  const { direction } = useLocale();
  return <main className="site-shell child-journey" dir={direction}><SkipLink /><SiteChrome /><div id={MAIN_CONTENT_ID}><AdventureJourney /></div><SiteFooter /></main>;
}
