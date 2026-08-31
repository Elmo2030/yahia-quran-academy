import { useLocale } from "@/contexts/LocaleContext";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function Privacy() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const t = isAr
    ? {
        title: "سياسة الخصوصية",
        intro:
          "تحترم Yahya Quran Academy خصوصيتك. تحفظ المنصة فقط البيانات الضرورية لتشغيل حسابك وحفظ تقدّمك في القرآن والقصص.",
        collected: "ما الذي نجمعه؟",
        collectedItems: [
          "البريد الإلكتروني وكلمة المرور (مشفّرة في Supabase).",
          "الاسم الظاهر الذي تختاره.",
          "تقدّمك في قراءة الآيات وحفظ القصص (محلياً ثم مزامنته مع Supabase).",
        ],
        notCollected: "ما الذي لا نجمعه؟",
        notCollectedItems: [
          "لا نبيع بياناتك ولا نشاركها مع أطراف ثالثة.",
          "لا نستخدم خدمات تتبّع إعلاني.",
          "لا نسجّل صوتك دون إذن صريح (يُفعّل في إصدار لاحق).",
        ],
        contact: "تواصل",
        contactBody: "لأي استفسار عن الخصوصية أو حذف حسابك، استخدم صفحة حسابي.",
      }
    : {
        title: "Privacy policy",
        intro:
          "Yahya Quran Academy respects your privacy. The store only keeps the data we need to run your account and remember your reading progress.",
        collected: "What we collect",
        collectedItems: [
          "Your email and password (encrypted by Supabase).",
          "Display name you choose.",
          "Your reading and story progress (stored locally, then synced to Supabase when signed in).",
        ],
        notCollected: "What we never collect",
        notCollectedItems: [
          "We never sell your data or share it with third parties.",
          "No ad-trackers, period.",
          "We do not record your voice without your explicit consent (planned for a later release).",
        ],
        contact: "Contact",
        contactBody: "For privacy questions or to delete your account, use the My account page.",
      };
  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]" dir={isAr ? "rtl" : "ltr"}>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-semibold text-[var(--brand-navy)]">{t.title}</h1>
        <p className="text-sm leading-7 text-[var(--brand-navy)]/80">{t.intro}</p>
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.collected}</h2>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-[var(--brand-navy)]/80">
            {t.collectedItems.map((item) => (<li key={item}>{item}</li>))}
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.notCollected}</h2>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-[var(--brand-navy)]/80">
            {t.notCollectedItems.map((item) => (<li key={item}>{item}</li>))}
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[var(--brand-navy)]">{t.contact}</h2>
          <p className="mt-2 text-sm text-[var(--brand-navy)]/80">{t.contactBody}</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
