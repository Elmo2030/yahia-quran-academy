#!/usr/bin/env python3
"""Fail-closed checks for the metadata-only Quran audio manifest."""

from __future__ import annotations

import json
from pathlib import Path

MANIFEST_PATH = Path(__file__).resolve().parents[1] / "data" / "audio_manifest.json"
FOLDER_URL = "https://drive.google.com/drive/folders/16qQulScaUDZT0jrc6Gw2uLmSVEJ9Q32E?usp=drive_link"


def expected_source_file(surah: int) -> str:
    if surah == 1:
        return "001.m4a"
    if surah == 2:
        return "Audio002 - Al-Baqara.mp3"
    if surah == 108:
        return "108-Al-Kauther.mp3"
    return f"Audio{surah:03d}.mp3"


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assert manifest["schema_version"] == 1
    assert manifest["coverage"] == {
        "expected_surahs": 114,
        "listed_surahs": 114,
        "timing_status": "unavailable",
    }

    surahs = manifest["surahs"]
    assert set(surahs) == {str(number) for number in range(1, 115)}
    for number in range(1, 115):
        item = surahs[str(number)]
        assert item["surah"] == number
        assert item["source_file"] == expected_source_file(number)
        assert item["source_folder"] == FOLDER_URL
        assert item["availability"] == "listed"
        assert item["timing_status"] == "unavailable"
        assert item["word_timestamps"] is None
        assert "playback_url" not in item

    assert surahs["1"]["sample_inspection"]["status"] == "passed"
    assert surahs["1"]["sample_inspection"]["duration_seconds"] > 0
    assert surahs["2"]["sample_inspection"]["status"] == "listed_only"
    assert surahs["108"]["sample_inspection"]["status"] == "passed"
    assert surahs["108"]["sample_inspection"]["duration_seconds"] > 0
    print(json.dumps({"status": "passed", "surahs": 114, "samples": [1, 2, 108], "timings": "unavailable"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
