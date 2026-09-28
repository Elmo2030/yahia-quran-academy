/**
 * Two accounts on one browser (a family tablet): nothing saved while one is
 * signed in may appear for the other, and saves made as a guest go to the
 * first account that signs in — once.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";

const identity: { session: { user: { id: string } } | null; profile: { id: string } | null } = { session: null, profile: null };
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => identity }));

const remote: Record<string, string[]> = {};
const upserts: Array<{ profile_id: string; slug: string }> = [];
const client = {
  from: () => ({
    select: () => ({ eq: async (_c: string, profileId: string) => ({ data: (remote[profileId] ?? []).map((slug) => ({ slug })), error: null }) }),
    upsert: (row: { profile_id: string; slug: string }) => { upserts.push(row); return Promise.resolve({ error: null }); },
    delete: () => ({ eq: () => ({ eq: () => Promise.resolve({ error: null }) }) }),
  }),
  rpc: async () => ({ data: [] }),
};
vi.mock("@/lib/supabase", () => ({ getSupabase: async () => client }));

import { useLibrary } from "@/lib/library";
import { useReadingProgress } from "@/lib/progress";

let lib: ReturnType<typeof useLibrary>;
let prog: ReturnType<typeof useReadingProgress>;
function Probe() {
  lib = useLibrary();
  prog = useReadingProgress();
  return (
    <>
      <div data-testid="slugs">{lib.slugs.join(",")}</div>
      <div data-testid="surah">{prog.progress?.surah ?? "none"}</div>
    </>
  );
}
const slugs = () => screen.getByTestId("slugs").textContent;
const surah = () => screen.getByTestId("surah").textContent;
const signIn = (id: string) => { identity.session = { user: { id } }; identity.profile = { id: `p-${id}` }; };
const signOut = () => { identity.session = null; identity.profile = null; };

describe("per-account browser storage", () => {
  beforeEach(() => {
    localStorage.clear();
    upserts.length = 0;
    for (const k of Object.keys(remote)) delete remote[k];
    signOut();
  });

  it("does not show account A's library or progress to account B", async () => {
    remote["p-a"] = ["a-remote"];
    remote["p-b"] = ["b-remote"];
    signIn("a");
    const { rerender } = render(<Probe />);
    await waitFor(() => expect(slugs()).toBe("a-remote"));
    act(() => lib.toggle("a-local"));
    await act(() => prog.recordReading(5, 3));
    expect(slugs()).toBe("a-remote,a-local");
    expect(surah()).toBe("5");

    signOut();
    rerender(<Probe />);
    await waitFor(() => expect(slugs()).toBe(""));
    expect(surah()).toBe("none");

    signIn("b");
    rerender(<Probe />);
    await waitFor(() => expect(slugs()).toBe("b-remote"));
    expect(surah()).toBe("none");

    signIn("a");
    rerender(<Probe />);
    await waitFor(() => expect(slugs()).toBe("a-remote,a-local"));
    expect(surah()).toBe("5");
  });

  it("gives guest saves to the first account that signs in, and only that one", async () => {
    const { rerender } = render(<Probe />);
    act(() => lib.toggle("guest-story"));
    expect(slugs()).toBe("guest-story");

    signIn("a");
    rerender(<Probe />);
    await waitFor(() => expect(slugs()).toBe("guest-story"));
    await waitFor(() => expect(upserts.map((u) => [u.profile_id, u.slug])).toEqual([["p-a", "guest-story"]]));

    signOut();
    rerender(<Probe />);
    await waitFor(() => expect(slugs()).toBe(""));

    signIn("b");
    rerender(<Probe />);
    await waitFor(() => expect(identity.profile?.id).toBe("p-b"));
    await new Promise((r) => setTimeout(r, 20));
    expect(slugs()).toBe("");
  });
});
