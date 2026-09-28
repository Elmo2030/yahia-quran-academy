import { useLocale } from "@/contexts/LocaleContext";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";

// Written from what the code actually stores and sends (audit PR-01/04/05):
// account rows in Supabase, everything else in this browser, recordings never
// uploaded, Cloudflare for hosting/files/cookieless analytics. When a feature
// changes what is collected, this page changes in the same pull request.
// scripts/prerender.mjs reads this object (plain literal, no casts inside) so
// the crawler's copy of the page cannot drift from the reader's.
type Section = { heading: string; items: string[] };
type PolicyCopy = {
  title: string;
  intro: string;
  sections: Section[];
  contact: string;
  contactWithAccount: string;
  contactEmail: string;
};

const copy: Record<"ar" | "en", PolicyCopy> = {
  ar: {
    title: "سياسة الخصوصية",
    intro:
      "أكاديمية يحيى للقرآن موقع لتعليم الأطفال القرآن. نجمع أقل ما يلزم لتشغيله، ومعظم ما تفعله في الموقع يبقى على هذا الجهاز ولا يصل إلينا.",
    sections: [
      {
        heading: "إذا أنشأت حسابًا",
        items: [
          "البريد الإلكتروني وكلمة المرور — تديرها Supabase، وكلمة المرور محفوظة بشكل مُجزّأ (hash) ولا نراها.",
          "الاسم الظاهر واللغة المفضلة.",
          "تقدّم القراءة (آخر سورة وآية، ووقت القراءة، وأيام المواظبة) والقصص المحفوظة، لتظهر لك على أي جهاز.",
        ],
      },
      {
        heading: "ما يبقى على هذا الجهاز فقط",
        items: [
          "رحلة الحفظ وملفات الأطفال فيها، والعلامات، وآخر صفحة، والتفضيلات (اللغة والمظهر) — محفوظة في متصفحك ولا تُرسل إلينا.",
          "على جهاز تستخدمه العائلة، لكل حساب مكتبته وتقدّمه المنفصلان على هذا الجهاز.",
          "يمكنك حذفها كلها بمسح بيانات الموقع من إعدادات المتصفح.",
        ],
      },
      {
        heading: "التسجيل الصوتي",
        items: [
          "عند التسميع يطلب الموقع إذن الميكروفون، ولا يسجّل إلا بعد موافقتك.",
          "التسجيلات تُحفظ على هذا الجهاز فقط، ولا تُرفع أبدًا إلى خوادمنا أو إلى أي طرف آخر.",
          "يمكن لولي الأمر حذف أي تسجيل من ركن ولي الأمر.",
        ],
      },
      {
        heading: "الأطفال",
        items: [
          "الموقع موجّه للأطفال بإشراف ولي الأمر؛ الحساب يُنشئه ولي الأمر، وملفات الأطفال المرتبطة به لا يراها إلا حساب ولي الأمر نفسه.",
          "لا إعلانات، ولا تتبّع إعلاني، ولا بيع أو مشاركة لبيانات أي طفل.",
        ],
      },
      {
        heading: "من يعالج البيانات نيابة عنا",
        items: [
          "Supabase — الحسابات وقاعدة البيانات.",
          "Cloudflare — استضافة الموقع وتوصيل الصوت والصور، وإحصاءات زيارات مجمّعة لا تستخدم ملفات تعريف الارتباط (Cookies) ولا تتعرف على الأشخاص.",
        ],
      },
      {
        heading: "المدة والحذف",
        items: [
          "نحتفظ ببيانات الحساب حتى تحذفه.",
          "حذف الحساب من صفحة «حسابي» يمحو فورًا الحساب والتقدّم والقصص المحفوظة وملفات الأطفال المرتبطة به، ولا يمكن التراجع عنه.",
        ],
      },
    ],
    contact: "تواصل",
    contactWithAccount: "لحذف حسابك أو تعديل بياناتك استخدم صفحة «حسابي».",
    contactEmail: "لأي سؤال عن الخصوصية، حتى بدون حساب، راسلنا على",
  },
  en: {
    title: "Privacy policy",
    intro:
      "Yahya Quran Academy teaches children the Quran. We collect the least we need to run it, and most of what you do on the site stays on this device and never reaches us.",
    sections: [
      {
        heading: "If you create an account",
        items: [
          "Your email and password — handled by Supabase; the password is stored hashed and we never see it.",
          "Your display name and preferred language.",
          "Reading progress (last surah and ayah, reading time, streak days) and saved stories, so they follow you to any device.",
        ],
      },
      {
        heading: "What stays on this device only",
        items: [
          "The memorization journey and the children's profiles in it, bookmarks, your last page and preferences (language, theme) are kept in your browser and are not sent to us.",
          "On a device the family shares, each account keeps its own library and progress on this device.",
          "You can remove all of it by clearing this site's data in your browser settings.",
        ],
      },
      {
        heading: "Voice recordings",
        items: [
          "When a child recites, the site asks for microphone permission and records only after you allow it.",
          "Recordings are stored on this device only and are never uploaded to our servers or to anyone else.",
          "A parent can delete any recording from the parent corner.",
        ],
      },
      {
        heading: "Children",
        items: [
          "The site is for children under a parent's supervision: a parent creates the account, and child profiles linked to it are visible only to that parent account.",
          "No ads, no ad tracking, and no child's data is sold or shared.",
        ],
      },
      {
        heading: "Who processes data for us",
        items: [
          "Supabase — accounts and database.",
          "Cloudflare — hosting, delivery of audio and images, and aggregated visit statistics that use no cookies and do not identify anyone.",
        ],
      },
      {
        heading: "Retention and deletion",
        items: [
          "We keep account data until you delete the account.",
          "Deleting your account from the My account page immediately erases the account, progress, saved stories and linked child profiles. It cannot be undone.",
        ],
      },
    ],
    contact: "Contact",
    contactWithAccount: "To delete your account or change your details, use the My account page.",
    contactEmail: "For any privacy question, with or without an account, write to",
  },
};

export default function Privacy() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const t = isAr ? copy.ar : copy.en;
  const contactAddress = import.meta.env.VITE_PRIVACY_CONTACT_EMAIL as string | undefined;
  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={isAr ? "rtl" : "ltr"}>
      <SiteChrome />
      <main id="main" className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-semibold text-[var(--brand-navy)]">{t.title}</h1>
        <p className="text-sm leading-7 text-[var(--brand-navy)]/80">{t.intro}</p>
        {t.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-base font-semibold text-[var(--brand-navy)]">{section.heading}</h2>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-[var(--brand-navy)]/80">
              {section.items.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </section>
        ))}
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.contact}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/80">{t.contactWithAccount}</p>
          {contactAddress && (
            <p className="mt-2 text-sm text-[var(--brand-navy)]/80">
              {t.contactEmail}{" "}
              <a className="underline" href={`mailto:${contactAddress}`} dir="ltr">{contactAddress}</a>
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
