// =============================================================================
// InstallCard — adding the journey to the home screen.
//
// This is not decoration. Safari clears a site's storage after seven days
// without a visit, and a site added to the home screen is exempt; on Android
// the same install is what makes the browser grant persistent storage. So the
// card explains the real reason — keeping the child's progress — rather than
// asking to be installed for its own sake.
// =============================================================================

import { useEffect, useState } from "react";
import { Share, Smartphone, SquarePlus } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const copy = {
  ar: {
    title: "ثبّت الرحلة على الشاشة الرئيسية",
    why: "التثبيت يفتح الرحلة كتطبيق، ويجعل المتصفح يحتفظ بتقدّم الأطفال بدل أن يمسحه بعد فترة من عدم الفتح.",
    install: "ثبّت الآن",
    iosSteps: "على آيفون وآيباد: اضغط زر المشاركة في سفاري، ثم «إضافة إلى الشاشة الرئيسية».",
    installed: "الرحلة مثبّتة على هذا الجهاز. تقدّم الأطفال في أمان أكبر هنا.",
  },
  en: {
    title: "Add the journey to the home screen",
    why: "Installing opens the journey as an app, and makes the browser keep each child’s progress instead of clearing it after a spell away.",
    install: "Install now",
    iosSteps: "On iPhone and iPad: tap the share button in Safari, then “Add to Home Screen”.",
    installed: "The journey is installed on this device, where a child’s progress is safer.",
  },
};

const isStandalone = () => {
  try {
    return window.matchMedia("(display-mode: standalone)").matches
      || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  } catch {
    return false;
  }
};

const isApple = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

export function InstallCard() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      // Chrome shows its own bar otherwise, in the middle of a child's page.
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    const onInstalled = () => { setInstalled(true); setPrompt(null); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return (
      <p className="hifz-status is-good hifz-install-done">
        <Smartphone size={17} aria-hidden="true" /> {t.installed}
      </p>
    );
  }

  // Nothing to offer: a desktop browser with no install support, and not iOS.
  if (!prompt && !isApple()) return null;

  return (
    <section className="hifz-card hifz-install">
      <h2><SquarePlus size={20} aria-hidden="true" /> {t.title}</h2>
      <p>{t.why}</p>
      {prompt ? (
        <div className="hifz-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => { void prompt.prompt(); setPrompt(null); }}
          >
            <Smartphone size={17} aria-hidden="true" /> {t.install}
          </button>
        </div>
      ) : (
        <p className="hifz-ios-steps"><Share size={16} aria-hidden="true" /> {t.iosSteps}</p>
      )}
    </section>
  );
}

export default InstallCard;
