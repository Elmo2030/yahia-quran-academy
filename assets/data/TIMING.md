# Ayah and word timing

The 228 per-surah timing files are **not** kept in this repository. They live in
the `yehia-quran-audio` R2 bucket alongside the audio they describe, and both the
app and the site load them from there at runtime:

    https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/timing/husary_muallim_timed/
    https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/timing/minshawi_muallim_kids_timed/
    https://pub-de9711cb714d4c6f94aaf5c819dda959.r2.dev/timing/audit/

`assets/data/recitation_manifest.json` carries the exact URL for every surah, so
that file is the index — start there, not from a directory listing.

They were committed here for a while after being rescued off third-party hosting,
which was the right thing to do at the time. Now that R2 holds them under our own
account and the manifest points there, keeping a second copy in git only added
36 MB to every clone.

To pull a local copy, read the URLs out of the manifest:

    python3 -c "
    import json,urllib.request,os
    m=json.load(open('assets/data/recitation_manifest.json',encoding='utf-8'))
    for rid,r in m['recitations'].items():
        for s in (r.get('surahs') or {}).values():
            u=s.get('timing_url')
            if not u: continue
            os.makedirs(f'/tmp/timing/{rid}',exist_ok=True)
            urllib.request.urlretrieve(u, f'/tmp/timing/{rid}/'+u.rsplit('/',1)[-1])
    "
