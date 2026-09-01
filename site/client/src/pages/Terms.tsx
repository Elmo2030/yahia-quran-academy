import { useLocale } from "@/contexts/LocaleContext";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteFooter } from "@/components/SiteFooter";

export default function Terms() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const t = isAr
    ? {
        title: "شروط الاستخدام",
        intro: "باستخدامك Yahya Quran Academy فإنك توافق على الشروط التالية. الموقع مخصّص لأغراض تعليمية غير تجارية.",
        usage: "الاستخدام المقبول",
        usageBody: "استخدم الموقع في الاستماع والتعلّم. لا تحاول إغراق الخادم بطلبات آلية أو نسخ المحتوى لأغراض تجارية.",
        content: "دقّة المحتوى",
        contentBody: "النصوص والتلاوات مراجعة؛ لكن أخطاءً قد تظهر. أعطنا ملاحظتك إن رأيت شيئًا يحتاج تصحيحًا.",
        account: "الحساب",
        accountBody: "أنت مسؤول عن كلمة مرورك. يمكنك حذف حسابك في أي وقت من صفحة حسابي.",
      }
    : {
        title: "Terms of use",
        intro: "By using Yahya Quran Academy you agree to the following. The site is non-commercial and educational.",
        usage: "Acceptable use",
        usageBody: "Use the site for listening and learning. Don't run automated scrapers or copy content for commercial use.",
        content: "Content accuracy",
        contentBody: "Texts and recitations are reviewed, but mistakes slip through. Send us feedback if you spot one.",
        account: "Account",
        accountBody: "You're responsible for your password. You can delete your account anytime from My account.",
      };
  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={isAr ? "rtl" : "ltr"}>
      <SiteChrome />
      <main id="main" className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-semibold text-[var(--brand-navy)]">{t.title}</h1>
        <p className="text-sm leading-7 text-[var(--brand-navy)]/80">{t.intro}</p>
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.usage}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/80">{t.usageBody}</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.content}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/80">{t.contentBody}</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.account}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/80">{t.accountBody}</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
