"""
Yehia Quran Academy — Whisper STT Evaluation Engine (MVP)

Lightweight pipeline:
  1. Decode audio bytes -> WAV file on disk
  2. Transcribe with OpenAI Whisper (tiny/base model, Arabic)
  3. Compare transcription to expected ayah text via difflib
  4. Return a 0-100 score + human-readable feedback
"""

from __future__ import annotations

import asyncio
import logging
import json
import os
import re
import tempfile
import wave
from pathlib import Path
from difflib import SequenceMatcher
from functools import lru_cache

import numpy as np

from app.schemas.evaluation import EvaluationResult, Mistake

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Quran text reference (Tanzil Uthmani, pinned JSON corpus)
# ---------------------------------------------------------------------------

_QURAN_TEXT_PATH = Path(__file__).resolve().parents[2] / "data" / "quran_text.json"


@lru_cache(maxsize=1)
def _load_quran_text() -> dict[str, str]:
    """Load the pinned Tanzil Uthmani corpus once per process."""
    with _QURAN_TEXT_PATH.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)
    if not isinstance(payload, dict):
        raise ValueError("quran_text.json must contain an object keyed by surah:ayah")
    return {str(key): str(value) for key, value in payload.items()}


def _get_ayah_text(surah: int, ayah: int) -> str:
    return _load_quran_text().get(f"{surah}:{ayah}", "")


def _strip_tashkeel(text: str) -> str:
    """Remove Arabic diacritics (tashkeel) for base-letter comparison."""
    return re.sub(r"[ؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ۭ]", "", text)


def _normalize_arabic(text: str) -> str:
    """Normalize Arabic text for fair comparison."""
    text = _strip_tashkeel(text)
    # Normalize alef variants to plain alef
    text = re.sub(r"[إأآٱ]", "ا", text)
    # Normalize taa marbuta to haa
    text = text.replace("ة", "ه")
    # Remove tatweel (kashida)
    text = text.replace("ـ", "")
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


# ---------------------------------------------------------------------------
# Whisper model loading (singleton, cached)
# ---------------------------------------------------------------------------

WHISPER_MODEL_SIZE = os.environ.get("WHISPER_MODEL", "tiny")


@lru_cache(maxsize=1)
def _load_whisper():
    """Load the Whisper model once and keep it in memory."""
    import whisper

    logger.info("Loading Whisper '%s' model — this may take a moment on first run...", WHISPER_MODEL_SIZE)
    model = whisper.load_model(WHISPER_MODEL_SIZE)
    logger.info("Whisper model loaded successfully")
    return model


# ---------------------------------------------------------------------------
# String comparison scoring
# ---------------------------------------------------------------------------

def _compute_similarity(recognized: str, expected: str) -> float:
    """
    Compare recognized text against expected ayah using SequenceMatcher.
    Returns a score from 0.0 to 100.0.
    """
    norm_recognized = _normalize_arabic(recognized)
    norm_expected = _normalize_arabic(expected)

    if not norm_expected:
        return 0.0

    ratio = SequenceMatcher(None, norm_recognized, norm_expected).ratio()
    return round(ratio * 100, 1)


def _score_to_feedback(score: float) -> str:
    """Map a numeric score to a child-friendly feedback message."""
    if score >= 90:
        return "Excellent! You recited beautifully."
    if score >= 75:
        return "Great job! Just a few words to polish."
    if score >= 55:
        return "Good effort! Keep practicing this ayah."
    if score >= 30:
        return "Nice try! Listen to the sheikh again and try once more."
    return "Let's try again — listen carefully to the sheikh first."


def _find_word_mistakes(recognized: str, expected: str) -> list[Mistake]:
    """Identify which words differ between recognized and expected text."""
    rec_words = _normalize_arabic(recognized).split()
    exp_words = _normalize_arabic(expected).split()

    mistakes: list[Mistake] = []
    matcher = SequenceMatcher(None, rec_words, exp_words)

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == "equal":
            continue

        if tag == "replace":
            for idx in range(j1, j2):
                word = exp_words[idx] if idx < len(exp_words) else ""
                mistakes.append(Mistake(
                    word_index=idx,
                    error_type="mispronunciation",
                    details=f"Word '{word}' was not pronounced correctly.",
                ))
        elif tag == "delete":
            for idx in range(i1, i2):
                mistakes.append(Mistake(
                    word_index=idx,
                    error_type="extra_word",
                    details="An extra word was spoken here.",
                ))
        elif tag == "insert":
            for idx in range(j1, j2):
                word = exp_words[idx] if idx < len(exp_words) else ""
                mistakes.append(Mistake(
                    word_index=idx,
                    error_type="missing_word",
                    details=f"Word '{word}' was skipped.",
                ))

    return mistakes


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

class TajweedEvaluator:
    """
    MVP Tajweed evaluation using Whisper STT + string comparison.
    Loads the Whisper model lazily on first call.
    """

    def __init__(self) -> None:
        logger.info("TajweedEvaluator initialised (Whisper MVP mode)")

    async def evaluate(
        self,
        audio: np.ndarray,
        surah: int,
        ayah: int,
    ) -> EvaluationResult:
        """Run evaluation in a thread pool to keep the event loop free."""
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, self._evaluate_sync, audio, surah, ayah
        )

    def _evaluate_sync(
        self,
        audio: np.ndarray,
        surah: int,
        ayah: int,
    ) -> EvaluationResult:
        # Reject very short or silent audio
        if len(audio) < 4000:
            return EvaluationResult(
                score=0.0,
                recognized_text="",
                feedback="The recording was too short. Try speaking a little louder and closer to the microphone.",
                mistakes=[Mistake(
                    word_index=-1,
                    error_type="too_short",
                    details="Recording too short for analysis.",
                )],
            )

        # Look up the expected ayah text
        expected_text = _get_ayah_text(surah, ayah)
        if not expected_text:
            logger.warning("No reference text for surah=%d ayah=%d", surah, ayah)
            return EvaluationResult(
                score=0.0,
                recognized_text="",
                feedback="Could not find reference text for this ayah.",
                mistakes=[Mistake(
                    word_index=-1,
                    error_type="missing_reference",
                    details="No reference text is available for this ayah.",
                )],
            )

        # Write audio to a temporary WAV file for Whisper
        tmp_path = None
        try:
            tmp_fd, tmp_path = tempfile.mkstemp(suffix=".wav")
            os.close(tmp_fd)
            self._write_wav(tmp_path, audio, sample_rate=16000)

            # Transcribe with Whisper in Arabic
            model = _load_whisper()
            result = model.transcribe(
                tmp_path,
                language="ar",
                fp16=False,
            )
            recognized_text = result.get("text", "").strip()
            logger.info("Whisper recognized: %s", recognized_text)

        except Exception:
            logger.exception("Whisper transcription failed")
            return EvaluationResult(
                score=0.0,
                recognized_text="",
                feedback="Something went wrong during transcription. Please try again.",
                mistakes=[Mistake(
                    word_index=-1,
                    error_type="transcription_error",
                    details="Whisper transcription failed.",
                )],
            )
        finally:
            if tmp_path and os.path.exists(tmp_path):
                try:
                    os.unlink(tmp_path)
                except OSError:
                    pass

        # Compute similarity score
        score = _compute_similarity(recognized_text, expected_text)
        feedback = _score_to_feedback(score)
        mistakes = _find_word_mistakes(recognized_text, expected_text)

        return EvaluationResult(
            score=score,
            recognized_text=recognized_text,
            feedback=feedback,
            mistakes=mistakes,
        )

    @staticmethod
    def _write_wav(path: str, audio: np.ndarray, sample_rate: int = 16000) -> None:
        """Write a numpy float32 array as a 16-bit PCM WAV file."""
        pcm = np.clip(audio, -1.0, 1.0)
        pcm_int16 = (pcm * 32767).astype(np.int16)

        with wave.open(path, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(sample_rate)
            wf.writeframes(pcm_int16.tobytes())
