#!/usr/bin/env python3
"""
Fill a declared ayah-level timing gap by deriving the window from its neighbours.

Only safe where the surrounding ayahs are contiguous and the audio is fully
covered: if ayah N-1 ends at X and ayah N+1 starts at Y with no other ayah in
between, then ayah N occupies exactly [X, Y]. That is arithmetic on a closed
interval, not an estimate, so no forced alignment is involved.

Word-level timing cannot be derived this way, so the filled ayah is written as
`partial`: the app highlights the ayah but not individual words, which is the
fallback the schema already defines.

    python3 tools/fill_timing_gap.py --recitation minshawi_muallim_kids_timed \
                                     --surah 101 --ayah 3 [--check]
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "data" / "recitation_manifest.json"
QURAN = ROOT / "assets" / "data" / "quran_text.json"
TIMING = ROOT / "assets" / "data" / "timing"


def die(msg: str) -> None:
    raise SystemExit(f"REFUSED: {msg}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--recitation", required=True)
    ap.add_argument("--surah", type=int, required=True)
    ap.add_argument("--ayah", type=int, required=True)
    ap.add_argument("--check", action="store_true")
    a = ap.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    entry = manifest["recitations"][a.recitation]["surahs"][str(a.surah)]
    path = TIMING / a.recitation / entry["timing_url"].rsplit("/", 1)[-1]
    doc = json.loads(path.read_text(encoding="utf-8"))
    surah = doc["surah"]
    ayahs = surah["ayahs"]

    # --- refuse unless this really is a closed, unambiguous window ----------
    if a.ayah not in surah["unavailable_timing_ayahs"]:
        die(f"{a.surah}:{a.ayah} is not a declared gap — nothing to fill.")

    before = [x for x in ayahs if x["ayah"] == a.ayah - 1]
    after = [x for x in ayahs if x["ayah"] == a.ayah + 1]
    if not before or not after:
        die(
            f"{a.surah}:{a.ayah} is not bounded on both sides by timed ayahs. "
            "The window cannot be derived; this needs real alignment."
        )

    start, end = before[0]["end_ms"], after[0]["start_ms"]
    if end <= start:
        die(f"neighbours leave no room for {a.surah}:{a.ayah} ({start} -> {end}).")

    others = [
        x for x in ayahs
        if x["ayah"] not in (a.ayah - 1, a.ayah + 1)
        and x["start_ms"] < end and x["end_ms"] > start
    ]
    if others:
        die(
            f"the window {start}-{end} overlaps ayah(s) "
            f"{[x['ayah'] for x in others]}; it is not exclusively {a.ayah}."
        )

    text = json.loads(QURAN.read_text(encoding="utf-8"))[f"{a.surah}:{a.ayah}"]
    word_count = len(text.split())

    print(f"  {a.surah}:{a.ayah}  {text}")
    print(f"  derived window : {start} -> {end} ms  ({(end-start)/1000:.1f}s)")
    print(f"  neighbours     : {a.ayah-1} ends {start}, {a.ayah+1} starts {end}")
    print(f"  words          : {word_count} (ayah-level only — marked partial)")

    filled = {
        "ayah": a.ayah,
        "ayah_key": f"{a.surah}:{a.ayah}",
        "start_ms": start,
        "end_ms": end,
        "source_timestamp_to": end,
        "timestamp_repair": {
            "kind": "derived_from_neighbour_boundaries",
            "reason": surah.get("unavailable_timing_details", [{}])[0].get(
                "reason", "unusable_source_ayah_window"
            ),
            "derived_start_from": f"{a.surah}:{a.ayah-1}.end_ms",
            "derived_end_from": f"{a.surah}:{a.ayah+1}.start_ms",
            "note": (
                "Ayah window only. The source published no usable timestamps for "
                "this ayah, so it is bounded by its neighbours rather than aligned. "
                "Word timings are deliberately absent, not inferred."
            ),
        },
        "word_timing_status": "partial",
        "missing_word_numbers": list(range(1, word_count + 1)),
        "text_word_count": word_count,
        "source_word_segment_count": 0,
        "display_word_segment_count": 0,
        "accepted_word_pass_count": 0,
        "excluded_outside_ayah_window_count": 0,
        "invalid_source_word_segment_count": 0,
        "words": [],
    }

    ayahs.append(filled)
    ayahs.sort(key=lambda x: x["ayah"])
    surah["unavailable_timing_ayahs"] = [
        x for x in surah["unavailable_timing_ayahs"] if x != a.ayah
    ]
    surah["unavailable_timing_details"] = [
        d for d in surah.get("unavailable_timing_details", [])
        if d.get("ayah_key") != f"{a.surah}:{a.ayah}"
    ]
    surah["timed_ayah_count"] = len(ayahs)
    entry["unavailable_timing_ayahs"] = surah["unavailable_timing_ayahs"]

    # --- re-check every rule the Dart parser enforces -----------------------
    expected = entry["ayah_count"] - len(entry["unavailable_timing_ayahs"])
    assert len(ayahs) == expected, f"ayah count {len(ayahs)} != expected {expected}"
    assert surah["unavailable_timing_ayahs"] == entry["unavailable_timing_ayahs"]
    prev = -1
    for x in ayahs:
        assert x["ayah_key"] == f"{a.surah}:{x['ayah']}"
        assert 0 <= x["start_ms"] and x["end_ms"] > x["start_ms"]
        assert x["start_ms"] >= prev, f"ayah {x['ayah']} overlaps its predecessor"
        assert x["end_ms"] <= entry["duration_ms"] + 1000
        assert x["word_timing_status"] in ("available", "partial")
        assert isinstance(x["words"], list) and x["text_word_count"] > 0
        if x["word_timing_status"] == "partial":
            assert x["missing_word_numbers"] and not x["words"]
        else:
            assert not x["missing_word_numbers"]
            assert len(x["words"]) == x["accepted_word_pass_count"] * x["text_word_count"]
        prev = x["end_ms"]
    print(f"\n  all parser rules pass — {len(ayahs)}/{entry['ayah_count']} ayahs timed")

    if a.check:
        print("  --check: nothing written.")
        return

    path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"  wrote {path.relative_to(ROOT)}")
    print(f"  wrote {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
