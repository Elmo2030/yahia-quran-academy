// A local, in-memory Postgres (PGlite) standing in for Supabase, so the
// migrations and the row-level security they define can be tested with fake
// users — no network, no real project, no real data.
//
// The schema lives in two trees that must be applied in one order. This file
// is the single source of that order; supabase/README.md documents it.
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import fs from "node:fs";
import path from "node:path";

const SITE = path.resolve(import.meta.dirname, "..", "..");
const ROOT = path.resolve(SITE, "..");

const sqlFiles = (dir: string) =>
  fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort().map((f) => path.join(dir, f));

/** Bootstrap order for an empty database. */
export const BOOTSTRAP_ORDER = [
  path.join(ROOT, "supabase", "init_schema.sql"),
  ...sqlFiles(path.join(ROOT, "supabase", "migrations")),
  ...sqlFiles(path.join(SITE, "supabase", "migrations")),
];

// Just enough of Supabase's platform schema for the migrations to apply:
// its roles, auth.users, and auth.uid() read from the request's JWT claim.
const SUPABASE_STUB = `
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create role supabase_auth_admin nologin;
create schema auth;
create table auth.users (
  id uuid primary key default gen_random_uuid(),
  email text,
  raw_user_meta_data jsonb default '{}'::jsonb,
  raw_app_meta_data jsonb default '{}'::jsonb,
  email_confirmed_at timestamptz,
  created_at timestamptz default now()
);
create function auth.uid() returns uuid language sql stable as
  $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
create function auth.role() returns text language sql stable as
  $$ select current_setting('request.jwt.claim.role', true) $$;
create function auth.jwt() returns jsonb language sql stable as
  $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
grant usage on schema public, auth to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
`;

export async function freshDatabase(files = BOOTSTRAP_ORDER) {
  const db = new PGlite({ extensions: { pgcrypto } });
  await db.exec(SUPABASE_STUB);
  for (const file of files) {
    try {
      await db.exec(fs.readFileSync(file, "utf8"));
    } catch (error) {
      throw new Error(`${path.relative(ROOT, file)}: ${(error as Error).message}`);
    }
  }
  return db;
}

export async function createUser(db: PGlite, id: string, displayName: string) {
  await db.query("insert into auth.users (id, email, raw_user_meta_data) values ($1, $2, $3)", [
    id,
    `${displayName.toLowerCase()}@test.local`,
    { display_name: displayName },
  ]);
  const { rows } = await db.query<{ id: string }>("select id from public.profiles where auth_user_id = $1", [id]);
  return rows[0].id;
}

/** Run one statement as a signed-in user (or anon when uid is null), the way PostgREST would. */
export async function asUser<T = Record<string, unknown>>(db: PGlite, uid: string | null, sql: string, params: unknown[] = []) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claim.sub', $1, false)", [uid ?? ""]);
  await db.exec(uid ? "set role authenticated" : "set role anon");
  try {
    const { rows } = await db.query<T>(sql, params);
    return { rows, error: null as string | null };
  } catch (error) {
    return { rows: [] as T[], error: (error as Error).message };
  } finally {
    await db.exec("reset role");
  }
}
