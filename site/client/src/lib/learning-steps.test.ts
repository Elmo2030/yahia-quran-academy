import { describe, expect, it } from "vitest";
import { createProfile, emptyStore, enterAsGuest, exportBackup, importBackup, parseStore, recordLearningStep, selectProfile, stepStatus } from "./hifz-store";
import { childJourneyActivities } from "@/components/ChildJourney";
import { seerahStoryIndex, aqeedahCardIndex } from "./page-index.generated";

describe.each(["seerah", "aqeedah"] as const)("%s continuity", kind => {
  const entries = kind === "seerah" ? seerahStoryIndex : aqeedahCardIndex;
  const first = entries[0], second = entries[1];
  it("preserves start/completion and isolated children through parsing and backup", () => {
    const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!a.ok) throw Error(a.reason);
    const b = createProfile(a.store, { name: "Yusuf", character: "yahya" });
    if (!b.ok) throw Error(b.reason);
    const ref = { kind, slug: first.slug };
    const started = recordLearningStep(b.store, a.profile.id, ref, "in_progress", 1000);
    expect(recordLearningStep(started, a.profile.id, ref, "in_progress", 2000)).toBe(started);
    const done = recordLearningStep(started, a.profile.id, ref, "done", 3000);
    expect(recordLearningStep(done, a.profile.id, ref, "in_progress", 4000)).toBe(done);
    expect(recordLearningStep(done, a.profile.id, ref, "done", 5000)).toBe(done);
    const restored = importBackup(exportBackup(parseStore(JSON.parse(JSON.stringify(done)))));
    if (!restored.ok) throw Error(restored.reason);
    const store = selectProfile(restored.store, a.profile.id);
    expect(store.profiles[0].steps[`${kind}:${first.slug}`]).toEqual({ status: "done", startedAt: 1000, doneAt: 3000 });
    expect(stepStatus(store.profiles[1], ref)).toBe("available");
    expect(store.profiles[0].ayahs).toEqual(a.profile.ayahs);
  });

  it("resumes the latest valid incomplete item with localized title, not another child's item", () => {
    const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!a.ok) throw Error(a.reason);
    let store = recordLearningStep(a.store, a.profile.id, { kind, slug: first.slug }, "in_progress", 1000);
    store = recordLearningStep(store, a.profile.id, { kind, slug: second.slug }, "in_progress", 2000);
    store = recordLearningStep(store, a.profile.id, { kind, slug: "removed-content" }, "in_progress", 3000);
    const activity = (locale: "ar" | "en", profileId = a.profile.id) => childJourneyActivities(locale, profileId, store.profiles[0]).activities.find(x => x.kind === kind)!;
    expect(activity("en")).toMatchObject({ href: `/${kind}/${second.slug}`, title: `Continue: ${second.titleEn}` });
    expect(activity("ar").title).toBe(`تابع: ${second.title}`);
    expect(activity("en", "other-child").href).toBe(`/${kind}`);
    store = recordLearningStep(store, a.profile.id, { kind, slug: second.slug }, "done", 4000);
    expect(activity("en").href).toBe(`/${kind}/${first.slug}`);
    store = recordLearningStep(store, a.profile.id, { kind, slug: first.slug }, "done", 5000);
    expect(activity("en").href).toBe(`/${kind}`);
  });

  it("does not persist guest activity or accept corrupt learning status/keys", () => {
    const guest = enterAsGuest(emptyStore());
    expect(recordLearningStep(guest, guest.activeProfileId!, { kind, slug: first.slug }, "done")).toBe(guest);
    const a = createProfile(emptyStore(), { name: "Amina", character: "fatima" });
    if (!a.ok) throw Error(a.reason);
    a.store.profiles[0].steps = {
      [`${kind}:${first.slug}`]: { status: "awaiting_parent" },
      [`${kind}:bad:slug`]: { status: "done" },
    };
    expect(parseStore(a.store).profiles[0].steps).toEqual({});
  });
});
