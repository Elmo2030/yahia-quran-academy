# Database

The schema is split across two trees, and an empty database must be built in
this order (the single source of the order is `supabase/tests/db-harness.ts`):

1. `../supabase/init_schema.sql` — base tables (profiles with role/parent_id, memorization_logs, quran_metadata)
2. `../supabase/migrations/*.sql` — practice sessions, secure new-user trigger, dependent child profiles
3. `site/supabase/migrations/*.sql` (001 → 008) — site accounts, social login, progress, policy fixes, account deletion, column restoration, column-level update grants, deletion of linked children

Applying `site/supabase/migrations` alone fails at 004 (`column c.parent_id does not exist`).

## Tests

`pnpm test` builds that database from scratch in memory (PGlite, no network,
no real project) and runs two-account row-level security tests:
`supabase/tests/rls.test.ts`. Add a test there with every new table or policy.

## Applying to production

Migrations are applied by hand in the Supabase SQL editor, one file at a time,
in order, after the branch has passed CI. Never let an agent apply them.
