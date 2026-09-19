# YAHYA Security Source of Truth

## Security architecture

YAHYA is a React/Vite static application deployed to Cloudflare Pages. Cloudflare Pages middleware handles metadata, canonical redirects, and 404 responses. There is no custom application API or server-side business-logic service in this repository. Optional authentication/data integration is Supabase. Hifz profiles and recordings are deliberately local to the device.

The detailed point-in-time security audit is retained in `security_best_practices_report.md`.

## Threat model and controls

| Control | Status | Implementation | Location | Notes |
| --- | --- | --- | --- | --- |
| XSS / DOM XSS | IMPLEMENTED | React JSX output encoding; no runtime raw HTML sink found; restrictive CSP | client components; `client/public/_headers` | Do not add unsafe HTML rendering without a scoped review. |
| URL/open redirect | IMPLEMENTED | Same-origin internal-route allowlist | `client/src/lib/safe-route.ts` | Used by login, registration and OAuth returns. |
| Secrets | IMPLEMENTED | `.env.*` ignored except safe example; public `VITE_*` only | `.gitignore`, `.env.example` | Never commit service-role keys. |
| Security headers | IMPLEMENTED | CSP, nosniff, frame denial, referrer and permissions policies | `client/public/_headers` | Deployment is required for headers to be live. |
| Clickjacking | IMPLEMENTED | `X-Frame-Options: DENY`, `frame-ancestors 'none'` | `_headers` | — |
| Injection / SQL injection | NOT_APPLICABLE | No custom runtime SQL/API layer in this repo | — | Supabase migrations are external database configuration. |
| CSRF | NOT_APPLICABLE | No custom cookie-authenticated mutation API | — | Supabase/provider controls are external. |
| CORS | NOT_APPLICABLE | No custom API/server CORS config | — | Supabase CORS is external configuration. |
| Authentication | PARTIAL | Optional Supabase Auth and client-safe redirects | `AuthContext`, `supabase.ts` | Provider redirect, email and abuse settings must be verified in Supabase. |
| Authorization / IDOR | PARTIAL | Repository migrations define RLS and ownership policies | `supabase/migrations` | Deployed policy state is EXTERNAL_CONFIGURATION_REQUIRED. |
| Password storage | EXTERNAL_CONFIGURATION_REQUIRED | Handled by Supabase Auth | — | No application password database exists here. |
| Password policy | PARTIAL | Client validation includes length/common-password protections | login/register/reset pages and `weak-passwords.ts` | Provider enforcement remains external. |
| Rate limiting | EXTERNAL_CONFIGURATION_REQUIRED | No server endpoint exists here | — | Configure at Supabase/edge provider. |
| CAPTCHA | EXTERNAL_CONFIGURATION_REQUIRED | Not implemented | — | Requires server/provider verification. |
| Dependency vulnerabilities | IMPLEMENTED | Production dependency audit script | `npm run audit` | Audit periodically and before release. |
| Production error disclosure | IMPLEMENTED | Friendly UI errors; provider diagnostic log is dev-only | `AuthContext`, error boundary | Do not expose stack traces or provider internals to users. |
| Child data isolation | PARTIAL | Hifz/facts profile keys and parsing/tests | Hifz/facts stores | Local browser storage is not a confidentiality boundary on a shared device. |

## Authentication and authorization

Supabase Auth is optional: unsigned visitors can read the core site. The browser receives only public Supabase URL/anon-key configuration. Supabase migrations are the source for remote ownership controls. Parent PIN/number controls only entry to a local Hifz surface; it must never be described as a security boundary.

## Input and output handling

React rendering is the default output boundary. Child names are cleaned before storage/display. Local persistence parsers reject malformed state. URLs used for post-auth returns must pass `safeInternalPath()`. Do not introduce `dangerouslySetInnerHTML`, `innerHTML`, `eval`, arbitrary `javascript:` URLs, or unvalidated external media without a security review.

## Headers and deployment

Cloudflare Pages headers are versioned in `client/public/_headers`, including CSP. The current policy permits required same-origin content, R2 media, Supabase connection, and Cloudflare analytics while disallowing object embedding and inline script attributes. HTTPS/TLS, actual response headers, DNS, Supabase redirect allowlists, RLS deployment, CORS, rate limits, and CAPTCHA are **EXTERNAL_CONFIGURATION_REQUIRED**.

## Remaining security work

1. Verify production Cloudflare headers after every relevant deploy.
2. Verify deployed Supabase migrations/RLS and Auth redirect allowlists.
3. Configure provider-level abuse/rate-limit/password controls as product requirements demand.
4. Treat device-local child data as local convenience data, not multi-user confidential storage.
