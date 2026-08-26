#!/usr/bin/env python3
"""Generate the application's Quran text corpus from a pinned Tanzil Uthmani file.

The generator is intentionally fail-closed: it writes no JSON unless all corpus
shape checks and the byte-for-byte Al-Fatihah compatibility check pass.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

SURAH_AYAH_COUNTS = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
    128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34,
    30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29,
    18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12,
    12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19,
    36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6,
]

FATIHA_CURRENT = [
    "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
    "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
    "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
]

# This is the prefix emitted by Tanzil's selected download options.
TANZIL_BASMALA = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ "
TANZIL_BASMALA_VARIANTS = (
    TANZIL_BASMALA,
    "بِّسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ",
)
ARABIC_ALLOWED = re.compile(r"^[\u0600-\u06FF\s]+$")


def parse_source(path: Path) -> list[str]:
    lines = path.read_text(encoding="utf-8").splitlines()
    return [line for line in lines if line and not line.startswith("#")]


def build_corpus(lines: list[str]) -> dict[str, str]:
    expected_lines = sum(SURAH_AYAH_COUNTS)
    assert len(lines) == expected_lines, (
        f"expected {expected_lines} Quran lines, got {len(lines)}"
    )

    corpus: dict[str, str] = {}
    offset = 0
    for surah, ayah_count in enumerate(SURAH_AYAH_COUNTS, start=1):
        for ayah in range(1, ayah_count + 1):
            text = lines[offset]
            offset += 1
            # Tanzil's text download prefixes Basmala on the first ayah of
            # surahs that begin with it. Basmala is ayah 1 only for Al-Fatihah.
            if surah not in (1, 9) and ayah == 1:
                basmala = next(
                    (prefix for prefix in TANZIL_BASMALA_VARIANTS if text.startswith(prefix)),
                    None,
                )
                assert basmala is not None, (
                    f"unexpected first line for surah {surah}: {text[:40]!r}"
                )
                text = text[len(basmala):]
            corpus[f"{surah}:{ayah}"] = text
    assert offset == len(lines)
    return corpus


def validate_corpus(corpus: dict[str, str]) -> None:
    assert len(corpus) == 6236, f"expected 6236 ayahs, got {len(corpus)}"
    assert len(SURAH_AYAH_COUNTS) == 114
    for surah, count in ((1, 7), (2, 286), (18, 110), (114, 6)):
        actual = sum(1 for key in corpus if key.startswith(f"{surah}:"))
        assert actual == count, f"surah {surah}: expected {count}, got {actual}"

    for key, text in corpus.items():
        assert text.strip(), f"empty ayah: {key}"
        assert ARABIC_ALLOWED.fullmatch(text), f"unexpected character in {key}"

    actual_fatiha = [corpus[f"1:{ayah}"] for ayah in range(1, 8)]
    if actual_fatiha != FATIHA_CURRENT:
        mismatches = [
            (i + 1, expected, actual)
            for i, (expected, actual) in enumerate(zip(FATIHA_CURRENT, actual_fatiha))
            if expected != actual
        ]
        raise AssertionError(
            "STOP: Tanzil Uthmani Al-Fatihah does not match the app's current "
            f"hardcoded text byte-for-byte: {mismatches!r}"
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    corpus = build_corpus(parse_source(args.input))
    validate_corpus(corpus)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(corpus, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"status": "passed", "ayahs": len(corpus), "surahs": 114}, ensure_ascii=False))


if __name__ == "__main__":
    main()
