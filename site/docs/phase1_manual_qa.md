# Phase 1 manual QA — Yahia Quran Academy

**Date:** 2026-08-26  
**Scope:** Public Arabic website and whole-surah Quran reader.

| Check | Device / route | Result | Evidence or note |
|---|---|---|---|
| Public landing layout | Desktop `1280×900`, `/` | Pass | Header, hero, featured surahs, talaqqi explanation, parent section, and unavailable store cards render without visible overflow. |
| Public landing layout | Mobile `390×844`, `/` | Pass | Hero, cards, guidance path, and unavailable store cards stack into a single responsive column. |
| Reader layout | Desktop `1280×900`, `/read/1` and `/read/108` | Pass | Surah selector, whole-surah playback deck, metadata side card, and Uthmani ayahs render. |
| Reader layout | Mobile `390×844`, `/read/1` | Pass | Sidebar metadata moves above the ayahs and Quran text remains legible without horizontal clipping. |
| Quran content loading | `/read/1`, `/read/108` | Pass | The externally hosted Quran text and R2 manifest resolved and displayed Al-Fatihah and Al-Kawthar correctly. |
| Audio endpoint availability | R2 `surahs/001.m4a` | Pass | Byte-range request returned `206`, `audio/mp4`, and one byte. |
| Store publishing links | `/` apps section | Pass | Android and iOS cards state «سيُتاح قريبًا» and are not linked until official URLs exist. |
| Ayah timing safety | Reader metadata and playback UI | Pass | The interface states whole-surah playback and explicitly says that ayah/word timings are unavailable. |
| Desktop interaction smoke test | User desktop browser | Pass | The user confirmed home-to-reader navigation, surah change, back navigation, and audio play/pause behavior. |
| Mobile interaction smoke test | User mobile browser | Pass | The user confirmed that the same reader experience worked well on mobile. |
| Stitch-derived visual asset | `/manus-storage/yahia-hero_24faa0fd.png` | Pass | The original 1664×2080 Yahia character asset completed successfully and is served from project storage; it is displayed in the hero and cropped responsively for the avatar. |
| Stitch visual integration | Desktop `1280×720` and mobile `375×812`, `/` | Pass | The Yahia hero composition, avatar, code-rendered child journey map, parent preview, and safe learning copy render without overflow; the map is explanatory rather than a progress/award system. |
| Recitation Room integration | Desktop and mobile, `/read/1` | Pass | The reader displays a compact Yahia companion card with the listening, repetition, recording, and self-review sequence; it does not expose recording, automatic scoring, timings, or unlock states. |
| English language switch | Desktop `/`, browser interaction | Pass | The English control changes the document language and direction to LTR, translates the public interface, preserves the Arabic Quran and surah names, and retains the safe learning boundaries. |
| English reader and mobile layouts | Desktop and mobile `/?lang=en`, `/read/1?lang=en` | Pass | English headings, controls, labels, and LTR layout render correctly; the Uthmani ayah list stays Arabic and RTL. The direct language link also makes the English view shareable. |
| English surah names and transliteration | Desktop and mobile `/read/108?lang=en` | Pass | The selector and reader metadata show the full English name `Al-Kawthar`; each Arabic ayah has its corresponding Latin transliteration beneath it, with no change to the Uthmani text. |
| Recitation synchronization boundary | Desktop and mobile `/read/108?lang=en` | Pass | The reader explicitly states that word synchronization needs verified timings for the exact recording and does not highlight ayahs or words during whole-surah R2 playback. |

## Completed human validation

Browser automation established rendered layout, successful content loading, and R2 Range availability. The user then confirmed successful desktop and mobile reader use, including navigation, surah selection, and audio playback controls. This closes the interactive verification boundary for phase one.

## Stitch visual integration evidence

The visual integration uses a single original, project-stored Yahia character image at `/manus-storage/yahia-hero_24faa0fd.png`; the same asset is responsively cropped by the site for the avatar states. The journey map is a semantic React/CSS composition, not an imported screenshot or synthetic user progress data. It visualizes the safe sequence **استمع → كرّر → سجّل → راجع ذاتيًا** and deliberately contains no score, reward, automatic completion, or unlock mechanism.

## Release access

The currently assigned public domain is `https://quranread-maphrvqk.manus.space`. A branded custom domain will replace it when one is selected.
