# Timing review workspace — kept for reference, not wired up

These six files are the admin-only timing review page from the
`yahia-quran-academy-web` repository, which was a 26 Aug snapshot of the site
and has since been deleted. Nothing else in that repository was missing from
this one: the rest was the server tier and platform scaffolding removed here
deliberately when the site became static.

The page imports a reviewer-supplied timing draft, shows every ayah with its
start and end in milliseconds, lets a reviewer adjust them, and approves the
result. It was written while the timing data was still being produced.

**It is not part of the site.** The work it existed for is finished: 114/114
surahs are timed for Husary and 114/114 for Minshawi, verified against the
audio, and the two gaps that remained — Al-Qari'ah 101:3 and Ya-Sin 36:40 —
were closed by deriving each window from its neighbours and confirming it
against the recording. `tools/fill_timing_gap.py` does that job from the
command line, which is enough for a one-off correction.

They are here so the option survives. Wiring them back would mean restoring a
server tier, an auth check and a database — none of which the site has any
more, and all of which carried the vulnerabilities that removing them fixed.
Read that trade before reaching for these.
