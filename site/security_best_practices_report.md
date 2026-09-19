# Security best-practices report

## Scope and architecture

| Area | Observed implementation |
| --- | --- |
| Framework/runtime | React 19 single-page application built with Vite 7 and TypeScript |
| Hosting | Cloudflare Pages, with a Pages middleware for metadata, canonical redirects, and 404 handling |
| Server/API | No custom application API or server-side business-logic service in this repository |
| Authentication | Supabase Auth client integration; provider configuration is external |
| Data | Browser local storage, IndexedDB recordings, and optional Supabase data access |
| Deployment controls | Cloudflare static headers in `client/public/_headers` |

This review used static code/configuration inspection, a local repository-history secret scan, dependency audit, and regression tests. It cannot verify externally deployed Cloudflare or Supabase configuration.

## Findings before remediation

| ID | Severity | Category | Evidence | Status |
| --- | --- | --- | --- | --- |
| SEC-001 | HIGH | Open redirect in auth return path | Login, registration, and OAuth return values accepted a leading slash but did not normalize a backslash-containing URL before use. Browser URL normalization can make such a value cross-origin. | FIXED |
| SEC-002 | LOW | CSP enforcement mismatch | The static CSP allowed only same-origin scripts while the application shell used an inline theme script. The strict policy blocked that script rather than weakening CSP. | FIXED |
| SEC-003 | LOW | Diagnostic disclosure | A profile-load failure logged the provider error message in production browser consoles. | FIXED |
| SEC-004 | LOW | Environment-file hygiene | The ignore policy did not cover every dotted environment-file variant, and the committed example used deployment-specific placeholder context. No secret exposure was found. | FIXED |

## Fixes implemented

| File | Change | Reason |
| --- | --- | --- |
| `client/src/lib/safe-route.ts` | Added a same-origin internal-route allowlist helper based on `URL` origin normalization. | Prevent untrusted auth return paths from becoming external redirects. |
| `client/src/pages/Login.tsx`, `client/src/pages/Register.tsx`, `client/src/contexts/AuthContext.tsx` | Use the shared allowlist for `next` and OAuth return paths. | Apply the redirect boundary consistently. |
| `client/index.html`, `client/public/theme-init.js` | Moved the pre-paint theme preference logic to a same-origin static script. | Keep the strict script CSP without an inline-script exception. |
| `client/public/_headers` | Added `script-src-attr 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, and explicit worker/manifest directives. | Reduce executable and embedding surfaces while retaining required local media and Supabase connections. |
| `client/src/contexts/AuthContext.tsx` | Restrict provider-error console output to development builds. | Avoid exposing provider diagnostics to production users. |
| `.gitignore`, `.env.example`, `README.md` | Ignore dotted environment files while retaining the safe example; use generic public placeholders and document client-safe public configuration. | Reduce accidental configuration commits without putting secrets in the client bundle. |

## Security tests and validation

- `client/src/lib/safe-route.test.ts` verifies accepted internal routes and rejects absolute, protocol-relative, and backslash-normalized external targets.
- `client/src/contexts/oauth-redirect.test.tsx` covers the OAuth regression case.
- `client/src/security-config.test.ts` checks the static CSP guardrails, external theme bootstrap, environment-ignore rules, and production diagnostic guard.
- Repository secret scan found no candidate private keys or common service-token patterns in tracked content or local history. No secret values are recorded here.
- `npm run audit` reported no known vulnerabilities in production dependencies.

## Security checklist

| Control | Status | Notes |
| --- | --- | --- |
| Secrets | NO_ISSUE_FOUND | No candidate secret exposure found; environment hygiene was hardened. |
| HTTPS | EXTERNAL_CONFIGURATION_REQUIRED | Cloudflare currently serves HTTPS and HSTS; certificate/DNS controls remain hosting configuration. |
| Input validation | FIXED | Route input is same-origin validated; React output encoding is used for rendered input. |
| Injection | NO_ISSUE_FOUND | No runtime unsafe HTML sink, dynamic query construction, or custom server command execution found. |
| Output/API security | PARTIAL | No custom API exists; deployed Supabase response policies require external verification. |
| Rate limiting | EXTERNAL_CONFIGURATION_REQUIRED | No server endpoint exists here; authentication abuse limits belong in Supabase/edge configuration. |
| Password policy | PARTIAL | Client-side length/common-password checks exist; enforcement at the identity provider is external. |
| Password hashing | EXTERNAL_CONFIGURATION_REQUIRED | Password storage is handled by Supabase Auth, not this repository. |
| CAPTCHA | EXTERNAL_CONFIGURATION_REQUIRED | A meaningful CAPTCHA requires server/provider verification. |
| CORS | NOT_APPLICABLE | No custom API/server CORS policy exists in this repository; Supabase CORS is external. |
| Security headers | FIXED | Static Cloudflare Pages headers are hardened; deployment is required for them to become live. |
| Directory listing/source maps | NO_ISSUE_FOUND | Static build output contained no source maps; sensitive environment variants are ignored. |
| Dependencies | NO_ISSUE_FOUND | Production dependency audit passed. |
| Logging/errors | FIXED | Production provider diagnostics are no longer logged; server logging is not part of this frontend. |
| Authentication | PARTIAL | Client redirect handling is hardened; provider settings and redirect allowlists require external verification. |
| Authorization | PARTIAL | Repository migrations show RLS ownership controls, but deployed policy state cannot be verified locally. |
| Child-data isolation | PARTIAL | Tests cover profile isolation in local state. Browser-local data is not a confidentiality boundary against someone with device/browser access. |

## External configuration required

1. Deploy this revision to Cloudflare Pages, then verify the live CSP and other headers at the production origin.
2. In Supabase, verify the intended migrations and RLS policies are deployed, confirm only the production origin/callback paths are allowed, and configure authentication abuse controls, password policy, and any CAPTCHA service.
3. Treat browser-local child progress and recordings as device-local convenience data, not as a security boundary between people with access to the same browser profile.

## Remaining risks

- A malicious person with local browser or device access can inspect or modify locally stored child progress and recordings. Eliminating that risk requires a product and backend identity/storage decision.
- Supabase Auth, RLS, OAuth-provider settings, rate limits, and TLS are external services/configuration and must be reviewed in their respective dashboards.

## Verification

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed |
| `npx vitest run` | Passed: 473 tests in 54 files |
| `npm run build` | Passed |
| `npm run audit` | Passed: no known production dependency vulnerabilities |
