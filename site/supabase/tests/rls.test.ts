// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import type { PGlite } from "@electric-sql/pglite";
import { asUser, createUser, freshDatabase } from "./db-harness";

const A = "00000000-0000-0000-0000-00000000000a";
const B = "00000000-0000-0000-0000-00000000000b";

describe("database bootstrap", () => {
  it("builds an empty database from the repository's migrations", async () => {
    const db = await freshDatabase();
    const { rows } = await db.query<{ relname: string; relrowsecurity: boolean }>(
      `select c.relname, c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
        where n.nspname = 'public' and c.relkind = 'r' order by 1`,
    );
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.filter((r) => !r.relrowsecurity).map((r) => r.relname)).toEqual([]);
  }, 60_000);
});

describe("row-level security with two accounts", () => {
  let db: PGlite;
  let profileA: string;
  let profileB: string;

  beforeAll(async () => {
    db = await freshDatabase();
    profileA = await createUser(db, A, "Alice");
    profileB = await createUser(db, B, "Bob");
    await asUser(db, B, "insert into public.saved_stories (profile_id, chapter, slug) values ($1, 'animals', 'the-ant')", [profileB]);
    await asUser(db, B, "select public.record_reading($1, 1::smallint, 3::smallint, 60)", [profileB]);
  }, 60_000);

  it("anonymous visitors read no profiles", async () => {
    expect((await asUser(db, null, "select id from public.profiles")).rows).toEqual([]);
  });

  it("a user sees only their own profile, stories and progress", async () => {
    expect((await asUser<{ id: string }>(db, A, "select id from public.profiles")).rows.map((r) => r.id)).toEqual([profileA]);
    expect((await asUser(db, A, "select slug from public.saved_stories")).rows).toEqual([]);
    expect((await asUser(db, A, "select surah from public.reader_progress")).rows).toEqual([]);
  });

  it("a user cannot write into another user's profile or data", async () => {
    expect((await asUser(db, A, "update public.profiles set display_name = 'hacked' where id = $1 returning id", [profileB])).rows).toEqual([]);
    expect((await asUser(db, A, "insert into public.saved_stories (profile_id, chapter, slug) values ($1, 'animals', 'x')", [profileB])).error).toMatch(/row-level security/);
    expect((await asUser(db, A, "select public.record_reading($1, 2::smallint)", [profileB])).error).toMatch(/forbidden/);
    expect((await asUser(db, A, "select * from public.get_progress_summary($1)", [profileB])).error).toMatch(/forbidden/);
  });

  it("a user can still edit their display name and language", async () => {
    const { rows, error } = await asUser<{ display_name: string }>(
      db, A, "update public.profiles set display_name = 'Alice B', preferred_locale = 'en' where id = $1 returning display_name", [profileA]);
    expect(error).toBeNull();
    expect(rows).toEqual([{ display_name: "Alice B" }]);
  });

  it("the streak still advances through record_reading", async () => {
    const { error } = await asUser(db, A, "select public.record_reading($1, 1::smallint, 1::smallint, 30)", [profileA]);
    expect(error).toBeNull();
    const { rows } = await db.query<{ streak_days: number }>("select streak_days from public.profiles where id = $1", [profileA]);
    expect(rows[0].streak_days).toBe(1);
  });
});
