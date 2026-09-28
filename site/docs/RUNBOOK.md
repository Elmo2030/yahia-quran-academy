# Incident runbook — yahyaquran.com

For when something is wrong in production. Keep it short enough to follow under stress.
Owner fills the blanks marked ✎ once; update this file in the same PR as any change it describes.

## Who

| Role | Person | How to reach |
| --- | --- | --- |
| Site owner / decision maker | ✎ | ✎ |
| Technical responder | ✎ | ✎ |
| Accounts | Cloudflare ✎ · Supabase ✎ · GitHub `Elmo2030` · domain registrar ✎ | — |

## 1. Is it down or broken?

1. Open https://yahyaquran.com and https://yahyaquran.com/listen/1 in a private window.
2. Errors from visitors' browsers: Cloudflare → Workers & Pages → the project → Functions → **Logs**, filter `client-error` (sent by `/api/client-error`).
3. Last deploys: Cloudflare → Workers & Pages → the project → **Deployments**.
4. Database/auth: Supabase → project → **Logs** and **Reports**; status page https://status.supabase.com.

## 2. Roll back the site (one step)

Cloudflare → Workers & Pages → the project → **Deployments** → the last good deployment → **⋯ → Rollback to this deployment**.
Then revert the bad commit on `main` so the next deploy does not bring it back.

## 3. Roll back a database migration

Migrations are applied by hand (see `supabase/README.md`). Each migration file states its rollback in its header, e.g.
007: `grant update on public.profiles to authenticated;`. Prefer a forward fix; never drop data to roll back.
Restore from backup only as a last resort: Supabase → Database → **Backups** (note the time you restore to — later writes are lost).

## 4. A key or password leaked

1. Supabase anon key: publishable by design — but if the **service role** or a secret key leaked: Supabase → Project Settings → API → **roll** the key immediately.
2. Cloudflare / GitHub tokens: revoke in the account's API Tokens page, create a new one with minimal scope.
3. Update the value in Cloudflare Pages → Settings → Environment variables, redeploy.
4. Deleting the file or commit is **not** enough; rotation is the fix. Record what leaked, when, and when it was rotated.

## 5. A family reports seeing someone else's data

1. Treat as serious; ask for the page, time, and device — never ask for passwords.
2. Check `supabase/tests/rls.test.ts` still passes on `main`; check Supabase → Authentication → Policies match `supabase/migrations`.
3. If a policy is wrong in production, apply the fix migration first, then investigate.
4. Tell the family what happened and what was done.

## 6. Abuse (mass sign-ups, spam)

Supabase → Authentication → **Rate Limits** (lower sign-up/email limits temporarily);
Cloudflare → Security → WAF → **Rate limiting rules** for `/login` and `/signup`; enable Bot Fight Mode.

## After any incident

Write 5 lines in `docs/incidents/YYYY-MM-DD.md`: what happened, impact, how it was found, fix, what prevents it next time.
