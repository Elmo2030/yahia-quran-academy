# YAHYA Release Checklist

Use this checklist before a production release. Items marked external require the named service/dashboard; they cannot be proven from a local build alone.

## 1. Product journeys

- [ ] Home and My Journey show a valid next action for new and returning children.
- [ ] Quran reader, per-surah reader, listening, and per-surah listening work in Arabic and English.
- [ ] Quran Stories hub, detail, challenge/action, contextual return, and available artwork references work.
- [ ] Seerah 9 stations and stories are reachable.
- [ ] Aqeedah 7 chapters and 32 cards are reachable.
- [ ] Quran Facts retains locked/unlocked/current/completed discovery state after reload.
- [ ] Hifz child profile, map, surah practice, review, recital, and reward paths work locally.
- [ ] Parent lock, queue, approval, needs-practice, recordings, backup, and certificate eligibility work.

## 2. UX and responsive quality

- [ ] Check contextual and browser back behaviour for every changed route.
- [ ] Check loading, empty, error, success, disabled, locked, current, and completed states relevant to the release.
- [ ] Test Arabic RTL and English LTR, including long labels and mixed Quran references.
- [ ] Test 375×667 and 390×844: no horizontal overflow or bottom-bar/CTA collision.
- [ ] Test 768×1024: grids and reader layouts retain usable widths.
- [ ] Test 1440×900: content max widths and whitespace remain intentional.
- [ ] Confirm no redesigned surface departs from the semantic cream/olive/gold visual system.

## 3. Accessibility

- [ ] Keyboard tab order, Enter/Space activation, Escape dismissal where applicable, and visible focus work.
- [ ] Main navigation, mobile navigation, forms, dialogs, and audio controls have meaningful labels.
- [ ] Images have appropriate alt text; decorative art is ignored by assistive technology.
- [ ] Text/background contrast and touch target sizes are checked on changed surfaces.
- [ ] State is not conveyed by colour alone.

## 4. Content and assets

- [ ] Do not publish generated/replaced artwork without approved source assets.
- [ ] Verify story artwork references and report missing/watermarked assets as external work.
- [ ] Do not invent religious, scientific, or age-layer copy; route editorial gaps for review.
- [ ] Verify listening assets, especially any modified manifest/path, in a real browser.
- [ ] Preserve Uthmani Quran text generation and run its content tests after edits.

## 5. Security and privacy

- [ ] Run `npm run audit` and resolve/triage findings without blind major upgrades.
- [ ] Run secret scan and confirm no `.env`, keys, tokens, or credentials are staged.
- [ ] Confirm `.env.example` contains placeholders only.
- [ ] Run URL redirect and security configuration tests.
- [ ] Confirm Hifz recordings/profiles remain local-only and `HIFZ_VERSION = 1`, `DB_VERSION = 1` unless a tested migration is explicitly included.
- [ ] **External:** verify Cloudflare HTTPS and live response security headers after deploy.
- [ ] **External:** verify Supabase RLS, Auth redirect allowlist, rate limiting, password policy, and any CAPTCHA configuration.

## 6. Engineering gates

- [ ] Complete human content sign-off against [the generated review queue](docs/content-review.generated.md); generated source markers do not constitute approval.
- [ ] Record actual family observations using [the validation protocol](docs/family-validation.md). Do not infer learning gains or parent comprehension from unit tests.
- [ ] Measure production route waterfalls and interaction profiles on representative devices; smaller build chunks alone do not certify Core Web Vitals.

```bash
npx tsc --noEmit
npx vitest run
npm run build
npm run audit
git diff --check
git status --short
```

- [ ] All commands pass.
- [ ] Prerender completes and expected route output exists.
- [ ] No unintended asset, lockfile, generated-content, HIFZ_VERSION, or DB_VERSION changes are included.
- [ ] Review staged diff and commit only the intentional release scope.
