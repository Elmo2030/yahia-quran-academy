#!/usr/bin/env python3
"""
Forced Alignment Tool — FARAS Quran AI

Processes Sheikh Al-Hussary audio files to generate per-ayah timestamps
and compressed CDN-ready .m4a files.

Usage:
  1. Place .mp3 files in ./input/ named like 001.mp3, 002.mp3, ... (surah number)
  2. Place matching .txt files with one ayah per line (Arabic text)
  3. Run: python generate_timestamps.py
  4. Results appear in ./output/<surah_number>/

Dependencies:
  pip install -r requirements.txt
  brew install ffmpeg   # pydub and whisper both need ffmpeg
"""

from __future__ import annotations

import json
import logging
import re
import sys
import time
from pathlib import Path

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
log = logging.getLogger("faras-align")

INPUT_DIR = Path(__file__).parent / "input"
OUTPUT_DIR = Path(__file__).parent / "output"

# Whisper model size — "large" gives best Arabic accuracy.
# Use "medium" on machines with <8 GB VRAM for faster runs.
WHISPER_MODEL = "large"


# ---------------------------------------------------------------------------
# Audio compression
# ---------------------------------------------------------------------------

def compress_for_cdn(audio_path: Path, output_path: Path) -> Path:
    """
    Convert source audio to 64 kbps mono AAC in .m4a container.
    Optimised for mobile streaming over cellular.
    """
    from pydub import AudioSegment

    audio = AudioSegment.from_file(str(audio_path))
    audio = audio.set_channels(1)  # mono

    output_path.parent.mkdir(parents=True, exist_ok=True)
    audio.export(
        str(output_path),
        format="ipod",  # pydub's name for .m4a/AAC
        bitrate="64k",
        parameters=["-ar", "44100"],
    )
    # Log size reduction
    orig_kb = audio_path.stat().st_size / 1024
    comp_kb = output_path.stat().st_size / 1024
    ratio = (1 - comp_kb / orig_kb) * 100 if orig_kb else 0
    log.info("    Compressed: %.0f KB → %.0f KB (%.0f%% smaller)", orig_kb, comp_kb, ratio)
    return output_path


# ---------------------------------------------------------------------------
# Whisper transcription with timestamps
# ---------------------------------------------------------------------------

def _load_whisper():
    """Lazy-load Whisper model once."""
    import whisper

    log.info("  Loading Whisper model '%s'...", WHISPER_MODEL)
    model = whisper.load_model(WHISPER_MODEL)
    return model


_whisper_model = None


def transcribe_with_timestamps(audio_path: Path) -> list[dict]:
    """
    Run Whisper on the audio file with word-level timestamps enabled.

    Returns a list of segments, each with:
      {"start": float_seconds, "end": float_seconds, "text": str}
    """
    global _whisper_model
    if _whisper_model is None:
        _whisper_model = _load_whisper()

    result = _whisper_model.transcribe(
        str(audio_path),
        language="ar",
        task="transcribe",
        word_timestamps=True,
        # Improve Arabic accuracy
        condition_on_previous_text=True,
        # Don't suppress Arabic punctuation tokens
        suppress_tokens=[],
    )

    return result.get("segments", [])


# ---------------------------------------------------------------------------
# Ayah alignment
# ---------------------------------------------------------------------------

def _normalize_arabic(text: str) -> str:
    """Strip diacritics/tashkeel and normalise for fuzzy matching."""
    # Remove tashkeel (U+0610-U+061A, U+064B-U+065F, U+0670)
    text = re.sub(r"[ؐ-ًؚ-ٰٟ]", "", text)
    # Normalise alef variants to plain alef
    text = re.sub(r"[إأآا]", "ا", text)
    # Normalise taa marboota
    text = text.replace("ة", "ه")
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


def align_segments_to_ayahs(
    segments: list[dict],
    ayah_texts: list[str],
    surah_number: int,
) -> list[dict]:
    """
    Map Whisper segments to ayah boundaries.

    Strategy:
      1. Concatenate all Whisper segment texts into one stream with timestamps.
      2. Walk through the expected ayah texts, greedily consuming segments
         whose normalised text overlaps the current ayah.
      3. The start_ms of an ayah = start of its first matching segment.
         The end_ms = end of its last matching segment.

    This handles the common case where Whisper splits an ayah across
    multiple segments, or merges two short ayahs into one segment.
    """
    if not segments:
        log.warning("    No segments returned by Whisper — generating even splits")
        return _fallback_even_split(ayah_texts, surah_number)

    results: list[dict] = []
    seg_idx = 0

    for ayah_num, ayah_text in enumerate(ayah_texts, start=1):
        ayah_norm = _normalize_arabic(ayah_text)
        ayah_words = ayah_norm.split()

        if not ayah_words:
            continue

        # Find the first segment that overlaps this ayah
        start_ms: int | None = None
        end_ms: int | None = None
        matched_words = 0

        scan_idx = seg_idx
        while scan_idx < len(segments) and matched_words < len(ayah_words):
            seg = segments[scan_idx]
            seg_norm = _normalize_arabic(seg.get("text", ""))

            if not seg_norm:
                scan_idx += 1
                continue

            # Check for word overlap between this segment and remaining ayah words
            seg_words = seg_norm.split()
            remaining = ayah_words[matched_words:]

            overlap = _count_leading_overlap(seg_words, remaining)

            if overlap > 0 or _fuzzy_contains(seg_norm, " ".join(remaining[:3])):
                if start_ms is None:
                    start_ms = int(seg["start"] * 1000)
                end_ms = int(seg["end"] * 1000)
                matched_words += max(overlap, 1)
                scan_idx += 1
            elif start_ms is not None:
                # We started matching but this segment doesn't belong — stop
                break
            else:
                scan_idx += 1

        # Advance the main pointer past consumed segments
        if start_ms is not None:
            seg_idx = scan_idx

        # Fallback: if no match, place it right after the previous ayah
        if start_ms is None:
            prev_end = results[-1]["end_ms"] if results else 0
            start_ms = prev_end
            end_ms = prev_end  # will be fixed in the gap-fill pass

        results.append({
            "surah": surah_number,
            "ayah": ayah_num,
            "start_ms": start_ms,
            "end_ms": end_ms or start_ms,
            "text": ayah_text.strip(),
        })

    # --- Gap-fill pass ---
    # Ensure no overlaps and no gaps between consecutive ayahs.
    # Each ayah ends where the next one starts.
    for i in range(len(results) - 1):
        results[i]["end_ms"] = results[i + 1]["start_ms"]

    # Last ayah extends to the end of the last Whisper segment
    if results and segments:
        last_seg_end = int(segments[-1]["end"] * 1000)
        results[-1]["end_ms"] = max(results[-1]["end_ms"], last_seg_end)

    return results


def _count_leading_overlap(seg_words: list[str], ayah_words: list[str]) -> int:
    """Count how many leading words of seg_words match ayah_words."""
    count = 0
    for sw, aw in zip(seg_words, ayah_words):
        if sw == aw or _levenshtein_ratio(sw, aw) > 0.6:
            count += 1
        else:
            break
    return count


def _fuzzy_contains(haystack: str, needle: str) -> bool:
    """Check if needle appears roughly in haystack (for short fragments)."""
    if len(needle) < 3:
        return needle in haystack
    # Simple substring check on normalised text
    return needle in haystack or haystack in needle


def _levenshtein_ratio(a: str, b: str) -> float:
    """Quick Levenshtein similarity ratio. Good enough for Arabic word matching."""
    if a == b:
        return 1.0
    if not a or not b:
        return 0.0
    len_a, len_b = len(a), len(b)
    # Fast path: length difference too big
    if abs(len_a - len_b) > max(len_a, len_b) * 0.5:
        return 0.0
    # Full DP
    matrix = list(range(len_b + 1))
    for i in range(1, len_a + 1):
        prev = matrix[0]
        matrix[0] = i
        for j in range(1, len_b + 1):
            temp = matrix[j]
            cost = 0 if a[i - 1] == b[j - 1] else 1
            matrix[j] = min(matrix[j] + 1, matrix[j - 1] + 1, prev + cost)
            prev = temp
    dist = matrix[len_b]
    return 1 - dist / max(len_a, len_b)


def _fallback_even_split(
    ayah_texts: list[str],
    surah_number: int,
) -> list[dict]:
    """If Whisper returns nothing, split evenly (last resort)."""
    log.warning("    Using even-split fallback — manual review recommended")
    return [
        {
            "surah": surah_number,
            "ayah": i + 1,
            "start_ms": 0,
            "end_ms": 0,
            "text": t.strip(),
        }
        for i, t in enumerate(ayah_texts)
    ]


# ---------------------------------------------------------------------------
# Surah processing
# ---------------------------------------------------------------------------

def process_surah(
    audio_path: Path,
    text_path: Path,
    surah_number: int,
) -> list[dict]:
    """
    Full pipeline for one surah:
      1. Transcribe with Whisper (word timestamps)
      2. Align segments to ayahs
      3. Return timestamp records
    """
    ayah_texts = text_path.read_text(encoding="utf-8").strip().splitlines()
    ayah_texts = [line.strip() for line in ayah_texts if line.strip()]

    if not ayah_texts:
        log.error("    Text file is empty: %s", text_path)
        return []

    log.info("    %d ayahs in text file", len(ayah_texts))
    log.info("    Running Whisper transcription...")

    t0 = time.time()
    segments = transcribe_with_timestamps(audio_path)
    elapsed = time.time() - t0
    log.info("    Whisper done: %d segments in %.1fs", len(segments), elapsed)

    log.info("    Aligning to ayah boundaries...")
    records = align_segments_to_ayahs(segments, ayah_texts, surah_number)
    log.info("    Aligned %d ayahs", len(records))

    return records


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def _parse_surah_number(filename: str) -> int | None:
    """Extract surah number from filename like '001.mp3' or '001_al_fatiha.mp3'."""
    match = re.match(r"^(\d{1,3})", filename)
    return int(match.group(1)) if match else None


def main() -> None:
    log.info("")
    log.info("=" * 60)
    log.info("  FARAS Quran AI — Forced Alignment Tool")
    log.info("=" * 60)
    log.info("")

    if not INPUT_DIR.exists():
        log.error("Input directory not found: %s", INPUT_DIR)
        log.info("Create ./input/ and place .mp3 + .txt files there.")
        sys.exit(1)

    audio_files = sorted(INPUT_DIR.glob("*.mp3"))
    if not audio_files:
        log.info("No .mp3 files found in %s", INPUT_DIR)
        log.info("")
        log.info("Expected layout:")
        log.info("  input/001.mp3   — Sheikh Al-Hussary audio for Surah 1")
        log.info("  input/001.txt   — One ayah per line (Arabic text)")
        sys.exit(0)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    total = len(audio_files)
    success = 0
    failed = 0

    for idx, audio_path in enumerate(audio_files, start=1):
        surah_num = _parse_surah_number(audio_path.name)
        if surah_num is None:
            log.warning("Skipping %s — cannot parse surah number", audio_path.name)
            failed += 1
            continue

        text_path = audio_path.with_suffix(".txt")
        if not text_path.exists():
            log.warning("Skipping surah %d — no matching .txt file", surah_num)
            failed += 1
            continue

        log.info("─" * 50)
        log.info("[%d/%d] Processing Surah %d  (%s)", idx, total, surah_num, audio_path.name)
        log.info("─" * 50)

        surah_dir = OUTPUT_DIR / f"{surah_num:03d}"
        surah_dir.mkdir(parents=True, exist_ok=True)

        try:
            # Step 1: Compress for CDN
            m4a_path = surah_dir / f"{surah_num:03d}.m4a"
            compress_for_cdn(audio_path, m4a_path)

            # Step 2: Generate timestamps
            records = process_surah(audio_path, text_path, surah_num)

            # Step 3: Write JSON
            json_path = surah_dir / f"{surah_num:03d}.json"
            json_path.write_text(
                json.dumps(records, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            log.info("    JSON saved: %s (%d records)", json_path.name, len(records))

            success += 1

        except Exception:
            log.exception("    FAILED — skipping surah %d", surah_num)
            failed += 1

    log.info("")
    log.info("=" * 60)
    log.info("  Done: %d succeeded, %d failed, %d total", success, failed, total)
    log.info("  Output: %s", OUTPUT_DIR.resolve())
    log.info("=" * 60)
    log.info("")


if __name__ == "__main__":
    main()
