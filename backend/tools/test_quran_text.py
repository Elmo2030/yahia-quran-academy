#!/usr/bin/env python3
"""Fail-closed verification for the pinned Quran text corpus."""

from __future__ import annotations

import json
from pathlib import Path

from app.models.tajweed_engine import _get_ayah_text

CORPUS_PATH = Path(__file__).resolve().parents[1] / "data" / "quran_text.json"
EXPECTED_FATIHA = [
    "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
    "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
    "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
]


def main() -> None:
    corpus = json.loads(CORPUS_PATH.read_text(encoding="utf-8"))
    assert len(corpus) == 6236
    assert len({key.split(":", 1)[0] for key in corpus}) == 114
    assert sum(key.startswith("1:") for key in corpus) == 7
    assert sum(key.startswith("2:") for key in corpus) == 286
    assert sum(key.startswith("114:") for key in corpus) == 6
    assert [corpus[f"1:{ayah}"] for ayah in range(1, 8)] == EXPECTED_FATIHA
    assert corpus["2:255"].startswith("ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ")
    assert all(isinstance(value, str) and value.strip() for value in corpus.values())
    assert _get_ayah_text(2, 255) == corpus["2:255"]
    assert _get_ayah_text(114, 6) == corpus["114:6"]
    assert _get_ayah_text(999, 1) == ""
    print(json.dumps({"status": "passed", "ayahs": 6236, "surahs": 114, "fatiha": "byte-for-byte", "ayat_al_kursi": "loaded"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
