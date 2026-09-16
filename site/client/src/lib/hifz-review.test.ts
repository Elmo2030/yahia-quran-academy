import { describe, expect, it } from "vitest";

import {
  REVIEW_STEPS_DAYS, activeDays, dayNumber, dueDayFor, nextDueDay, reviewQueue, streakDays, todayPlan, wasActiveToday,
} from "./hifz-review";
import { DEFAULT_LOOKS } from "./hifz-looks";
import { DEFAULT_SETTINGS, type AyahRecord, type ChildProfile } from "./hifz-store";

const DAY = 86_400_000;
const NOON = new Date(2026, 0, 15, 12, 0, 0).getTime();
const daysAgo = (n: number) => NOON - n * DAY;

function child(ayahs: Record<string, Partial<AyahRecord>>): ChildProfile {
  return {
    id: "c", name: "Test", character: "yahya", createdAt: NOON, settings: { ...DEFAULT_SETTINGS }, looks: { ...DEFAULT_LOOKS },
    ayahs: Object.fromEntries(Object.entries(ayahs).map(([k, v]) => [k, { reviews: [], ...v }])),
  };
}

describe("when an ayah comes back", () => {
  it("follows 1, 3, 7, 14, 30 days and then stays at thirty", () => {
    const declaredAt = daysAgo(10);
    const steps = REVIEW_STEPS_DAYS.map((_, index) => {
      const reviews = Array.from({ length: index }, (_, i) => declaredAt + i * DAY);
      return dueDayFor({ declaredAt, reviews })!.dueDay - dayNumber(reviews.at(-1) ?? declaredAt);
    });
    expect(steps).toEqual([...REVIEW_STEPS_DAYS]);
    // Past the last step it keeps the thirty-day spacing.
    const many = Array.from({ length: 9 }, (_, i) => declaredAt + i * DAY);
    expect(dueDayFor({ declaredAt, reviews: many })!.dueDay - dayNumber(many.at(-1)!)).toBe(30);
  });

  it("counts by the family's days, not by 24-hour blocks", () => {
    const lateLastNight = new Date(2026, 0, 14, 23, 30).getTime();
    const due = dueDayFor({ declaredAt: lateLastNight, reviews: [] })!;
    expect(due.dueDay).toBe(dayNumber(NOON)); // due today, not tomorrow night
  });

  it("brings a forgotten ayah back tomorrow, wherever it had reached", () => {
    const declaredAt = daysAgo(40);
    const reviews = [daysAgo(20), daysAgo(10), daysAgo(3)];
    const onLadder = dueDayFor({ declaredAt, reviews })!;
    expect(onLadder.step).toBe(3);
    const forgotten = dueDayFor({ declaredAt, reviews, forgotAt: NOON })!;
    expect(forgotten).toEqual({ dueDay: dayNumber(NOON) + 1, step: 0 });
    // A review after the forgetting puts it back on the ladder.
    expect(dueDayFor({ declaredAt, reviews: [...reviews, NOON], forgotAt: daysAgo(1) })!.step).toBe(4);
  });

  it("gives nothing back for an ayah that was never declared", () => {
    expect(dueDayFor({ reviews: [] })).toBeNull();
    expect(dueDayFor(undefined)).toBeNull();
  });
});

describe("the review queue", () => {
  const profile = child({
    "114:1": { declaredAt: daysAgo(9) },                    // overdue by 8 days
    "114:2": { declaredAt: daysAgo(1) },                    // due today
    "113:1": { declaredAt: daysAgo(30), reviews: [daysAgo(1)] }, // next in 3 days
    "112:1": { listenedAt: daysAgo(1) },                    // never declared
  });

  it("holds what is due today and what is late, oldest first", () => {
    const queue = reviewQueue(profile, NOON);
    expect(queue.map(item => `${item.surah}:${item.ayah}`)).toEqual(["114:1", "114:2"]);
    expect(queue[0].overdueDays).toBe(8);
    expect(queue[1].overdueDays).toBe(0);
  });

  it("says when the next one is due once today is clear", () => {
    const clear = child({ "113:1": { declaredAt: daysAgo(30), reviews: [daysAgo(1)] } });
    expect(reviewQueue(clear, NOON)).toHaveLength(0);
    expect(nextDueDay(clear, NOON)).toBe(dayNumber(NOON) + 2);
    expect(nextDueDay(child({}), NOON)).toBeNull();
  });
});

describe("showing up", () => {
  it("lists the days anything happened, once each", () => {
    const profile = child({ "114:1": { listenedAt: daysAgo(2), recordedAt: daysAgo(2), declaredAt: daysAgo(1) } });
    expect(activeDays(profile)).toEqual([dayNumber(daysAgo(2)), dayNumber(daysAgo(1))]);
    expect(wasActiveToday(profile, NOON)).toBe(false);
  });

  it("forgives one missed day but not two", () => {
    const run = child({ "114:1": { listenedAt: daysAgo(2) }, "114:2": { listenedAt: daysAgo(1) }, "114:3": { listenedAt: NOON } });
    expect(streakDays(run, NOON)).toBe(3);

    const gapOfOne = child({ "114:1": { listenedAt: daysAgo(3) }, "114:2": { listenedAt: daysAgo(1) }, "114:3": { listenedAt: NOON } });
    expect(streakDays(gapOfOne, NOON)).toBe(3);

    const gapOfThree = child({ "114:1": { listenedAt: daysAgo(5) }, "114:2": { listenedAt: NOON } });
    expect(streakDays(gapOfThree, NOON)).toBe(1);
  });

  it("keeps yesterday's streak alive until a second day is missed", () => {
    const yesterday = child({ "114:1": { listenedAt: daysAgo(1) } });
    expect(streakDays(yesterday, NOON)).toBe(1);
    const stale = child({ "114:1": { listenedAt: daysAgo(3) } });
    expect(streakDays(stale, NOON)).toBe(0);
    expect(streakDays(child({}), NOON)).toBe(0);
  });
});

describe("today", () => {
  it("counts what was reviewed and met today, and calls the day done when the queue is clear", () => {
    const working = child({
      "114:1": { declaredAt: daysAgo(4), reviews: [NOON] },
      "114:2": { listenedAt: NOON },
    });
    const plan = todayPlan(working, NOON);
    expect(plan).toMatchObject({ due: 0, reviewedToday: 1, learnedToday: 1, done: true });

    const waiting = child({ "114:1": { declaredAt: daysAgo(4) } });
    expect(todayPlan(waiting, NOON)).toMatchObject({ due: 1, done: false });

    // Saying "I forgot it" counts as having turned up for that ayah.
    const forgot = child({ "114:1": { declaredAt: daysAgo(4), forgotAt: NOON } });
    expect(todayPlan(forgot, NOON).reviewedToday).toBe(1);
    expect(streakDays(forgot, NOON)).toBe(1);

    // Nothing due and nothing done yet is not a finished day.
    expect(todayPlan(child({}), NOON).done).toBe(false);
  });
});
