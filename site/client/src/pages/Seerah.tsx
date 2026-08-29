// =============================================================================
// Seerah — Seerah (Prophet's Biography) interactive stories.
// Routes: /seerah (station index) and /seerah/:slug (story view).
// Reuses the existing story-* CSS classes so no new stylesheet is required.
// =============================================================================

import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight } from "lucide-react";

import {
  seerahStories,
  seerahStation,
  type AgeTier,
  type SeerahStory,
} from "@/content/seerah";

const tierLabels: Record<AgeTier, string> = {
  tier_1_age_6_8: "٦–٨ سنوات",
  tier_2_age_9_11: "٩–١١ سنة",
};

function ChallengeCard({ story }: { story: SeerahStory }) {
  const [picked, setPicked] = useState<number | null>(null);
  const { challenge } = story.interactive;
  const answered = picked !== null;
  const correct = picked === challenge.correctAnswer;

  return (
    <section className="story-reading-section" aria-live="polite">
      <h2>🧩 تحدي الفهم</h2>
      <p>{challenge.question}</p>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" }}>
        {challenge.options.map((option, index) => {
          let background = "";
          if (answered && index === challenge.correctAnswer) background = "#d3f9d8";
          else if (answered && index === picked) background = "#ffe3e3";
          return (
            <li key={option}>
              <button
                type="button"
                className="button button--soft"
                style={{ width: "100%", background: background || undefined }}
                disabled={answered}
                onClick={() => setPicked(index)}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <p>
          {correct
            ? `أحسنت! إجابة صحيحة 🎉 — ${story.gamification.badge}`
            : "الإجابة الصحيحة بالأخضر — اقرأ القصة مرة أخرى وحاول مجدداً 💪"}
        </p>
      )}
    </section>
  );
}

function SeerahStoryView({ story }: { story: SeerahStory }) {
  const [tier, setTier] = useState<AgeTier>("tier_1_age_6_8");
  const isTier1 = tier === "tier_1_age_6_8";
  const narrative = isTier1
    ? story.content.tier_1_age_6_8.narrative
    : story.content.tier_2_age_9_11.narrative;
  const lesson = isTier1 ? story.content.tier_1_age_6_8.shortLesson : null;
  const details = !isTier1 ? story.content.tier_2_age_9_11.details : null;

  return (
    <article className="story-detail">
      <header className="story-detail-hero">
        <span className="story-detail-hero__count">{seerahStation.titleAr}</span>
        <h1>{story.title}</h1>
        <div role="group" aria-label="اختيار الفئة العمرية" style={{ display: "flex", gap: "0.5rem" }}>
          {(Object.keys(tierLabels) as AgeTier[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`button button--soft${tier === key ? " is-active" : ""}`}
              aria-pressed={tier === key}
              onClick={() => setTier(key)}
            >
              {tierLabels[key]}
            </button>
          ))}
        </div>
      </header>

      <section className="story-reading-section">
        <p className="story-reading-section__lead">{narrative}</p>
        {details && <p>{details}</p>}
        {lesson && <p>✨ {lesson}</p>}
      </section>

      <section className="story-reading-section">
        <h2>💡 هل تعلم؟</h2>
        <p>{story.interactive.discover}</p>
      </section>

      <section className="story-reading-section">
        <h2>{story.interactive.value.icon} قيمة القصة: {story.interactive.value.name}</h2>
        <p>💭 {story.interactive.thinkQuestion}</p>
      </section>

      <ChallengeCard story={story} />

      <section className="story-reading-section">
        <h2>🏆 مكافأتك</h2>
        <p>
          <strong>{story.gamification.artifact.name}</strong> — {story.gamification.artifact.description}
        </p>
        <p>{story.gamification.badge}</p>
      </section>

      <footer className="story-reading-section">
        <h2>🛡️ مصدر موثوق {story.source.reliability}</h2>
        <p>{story.source.reference}</p>
        <p><small>{story.source.note}</small></p>
      </footer>
    </article>
  );
}

export default function Seerah() {
  const [isStory, params] = useRoute("/seerah/:slug");
  const story = useMemo(
    () => (isStory ? seerahStories.find((s) => s.slug === params?.slug) ?? null : null),
    [isStory, params?.slug],
  );

  if (isStory) {
    if (!story) {
      return (
        <main className="site-shell" dir="rtl" lang="ar">
          <p>هذه القصة غير موجودة.</p>
          <Link href="/seerah" className="text-link">كل قصص السيرة</Link>
        </main>
      );
    }
    return (
      <main className="site-shell" dir="rtl" lang="ar">
        <Link href="/seerah" className="story-back-link">
          <ArrowRight size={15} aria-hidden="true" /> العودة لقصص السيرة
        </Link>
        <SeerahStoryView story={story} />
      </main>
    );
  }

  return (
    <main className="site-shell" dir="rtl" lang="ar">
      <header className="story-detail-hero">
        <h1>السيرة النبوية ﷺ</h1>
        <p className="story-detail-hero__hook">{seerahStation.descriptionAr}</p>
      </header>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1rem" }}>
        {seerahStories.map((s, index) => (
          <li key={s.slug}>
            <Link href={`/seerah/${s.slug}`} className="story-list-card">
              <span className="story-detail-hero__count">{index + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.content.tier_1_age_6_8.shortLesson}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
