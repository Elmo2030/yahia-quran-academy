# YAHYA Design Source of Truth

## Scope and status

This document describes the current implementation, not a future design brief. Status labels are **IMPLEMENTED**, **PARTIAL**, **MISSING**, **BLOCKED**, **EXTERNAL_DEPENDENCY**, **EDITORIAL_DECISION_REQUIRED**, **PRODUCT_DECISION_REQUIRED**, or **NOT_VERIFIED**.

## Product visual identity

YAHYA Quran Academy is a bilingual Quran learning site for children aged 6–11 and their parents. The child experience favours calm, encouraging discovery and practice; the parent experience exposes review and device-local management controls. Recitation quality is not automatically scored: a parent is the sole reviewer.

## Visual DNA — IMPLEMENTED

The semantic palette is defined in `client/src/index.css` rather than as a separate token package:

| Role | Current light value |
| --- | --- |
| Warm ivory page | `#fffdf5` (`--page`) |
| Cream page | `#f7f6e7` (`--page-2`) |
| Olive brand | `#556B2F` (`--brand`, `--brand-solid`) |
| Soft gold | `#d4af37` (`--gold`) |
| Gold surface | `#ffefcc` (`--surface-gold`) |
| Warm brown | NOT_FORMALLY_DEFINED as a named token; gold/deep-ink roles are used instead |
| Dark panel | `#001F3F` (`--panel-dark`) |

Rounded surfaces, light borders, soft shadows, olive actions, and restrained gold accents are the shared visual language. A dark theme is also implemented through semantic token overrides.

## Typography — IMPLEMENTED / NOT_FORMALLY_DEFINED

- Site font stack: `Plus Jakarta Sans`, `Noto Naskh Arabic`, then sans-serif.
- Arabic headings, Quran text, and many card titles use `Noto Naskh Arabic`.
- English/UI text uses Plus Jakarta Sans through the body stack.
- Headings commonly use `clamp()` values; component-specific scales remain in CSS rather than a formal token hierarchy.
- **NOT_FORMALLY_DEFINED:** a complete typographic scale or written type-token policy.

## Shared patterns — IMPLEMENTED

| Pattern | Current implementation |
| --- | --- |
| Header/navigation | `SiteChrome`, with desktop links, mobile menu, locale and theme controls |
| Child journey | `ChildJourney`, `HomeToday`, `JourneyMap` |
| Buttons | `.button`, especially primary and soft variants; minimum primary height is commonly 46px |
| Cards | Semantic surface/line/shadow tokens; section-specific cards for stories, facts, Hifz, and journey |
| Forms/dialogs | Radix-based UI primitives under `client/src/components/ui` plus page-level form states |
| Hifz mobile navigation | `HifzBottomBar`, limited to the Hifz experience |
| Recording | `RecitationRecorder` and the Hifz recital UI; no automatic accuracy assessment |
| Parent review | `HifzParent` recital/deed review queue |

## Implemented states

- Quran Facts cards: `locked`, `unlocked`, `current`, `completed`.
- Hifz steps: `available`, `in_progress`, `done`, `awaiting_parent`, `needs_practice`, `reviewed`.
- Hifz review scheduling and parent confirmation are distinct from a child declaration.
- Loading, error, empty, disabled, and completed treatments exist in page/component-specific form; they are **NOT_FORMALLY_DEFINED** as one global component state system.

## Responsive behaviour — IMPLEMENTED

My Journey uses `AdventureJourney` and `JourneyWorldMap`: a data-driven, three-column serpentine map at 760px and above, and a vertical alternating trail below 760px. Existing environmental artwork, character poses and reward art are reused. Symbolic landscape/icon compositions are interim world illustrations, not newly commissioned artwork. State is conveyed by text and icons as well as color; future worlds have no link. Scoped CSS supports visible focus and reduced motion. The current mission remains reachable through a keyboard-accessible in-page shortcut.

The CSS is mobile-first with local media queries and fluid sizing (`clamp`, grid, flex wrapping). There is no central breakpoint registry; therefore exact global breakpoint values are **NOT_FORMALLY_DEFINED**. Hifz pages reserve space for the mobile bottom bar, and the bottom bar is intentionally not site-wide.

## Locale and direction — IMPLEMENTED

- `LocaleContext` provides Arabic and English.
- Arabic pages use RTL; English pages use LTR.
- Direction-sensitive arrows are selected in components such as `SiteChrome`.
- Quran text keeps its own Arabic rendering; transliteration is explicitly LTR.

## Accessibility

**IMPLEMENTED:** semantic links/buttons in shared navigation, skip link, visible focus treatment for core controls, labelled navigation, required image `alt` at `StoryPicture`, and aria labels on media/navigation controls where implemented.

**TARGET / TODO:** no repository-wide accessibility conformance audit or single accessibility abstraction is documented. New UI must preserve semantic controls, focus visibility, keyboard operation, readable contrast, and non-colour-only state cues.

## Character and illustration rules

Character rendering uses existing local art via `hifz-characters.ts` and story/Hifz public assets. Hifz currently uses Yahya, Fatima, and guest character selections with named poses such as `think`, `recite`, and `cheer`. Existing source documentation prohibits generating or altering approved image assets in normal feature work. Image-generation rules beyond the committed assets are **NOT_VERIFIED** in this repository.
