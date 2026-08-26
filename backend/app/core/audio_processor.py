"""
Streaming audio buffer that accumulates WebSocket chunks and produces
a 16 kHz mono float32 NumPy array for Whisper inference.

The Flutter client sends base64-encoded audio bytes (from the `record` package).
We accumulate the full file, then decode with pydub (which wraps ffmpeg).
"""

from __future__ import annotations

import base64
import io
import logging

import numpy as np

logger = logging.getLogger(__name__)

TARGET_SR = 16_000


class AudioProcessor:
    """Accumulates base64 audio chunks, then decodes to a numpy array."""

    def __init__(self) -> None:
        self._chunks: list[bytes] = []
        self._total_bytes = 0

    def append_chunk(self, payload: str | bytes) -> None:
        """Accept a base64-encoded string or raw bytes and append."""
        if isinstance(payload, str):
            raw = base64.b64decode(payload)
        else:
            raw = payload
        self._chunks.append(raw)
        self._total_bytes += len(raw)

    @property
    def total_bytes(self) -> int:
        return self._total_bytes

    @property
    def duration_estimate_seconds(self) -> float:
        # Rough estimate assuming ~64 kbps encoded audio
        return self._total_bytes / 8_000 if self._total_bytes else 0.0

    def decode_to_array(self) -> np.ndarray:
        """
        Decode the accumulated audio buffer into a 16 kHz mono float32 array.
        Returns shape (n_samples,) with values in [-1, 1].
        Falls back to silence if decoding fails.
        """
        if not self._chunks:
            return np.zeros(TARGET_SR, dtype=np.float32)

        blob = b"".join(self._chunks)

        try:
            from pydub import AudioSegment

            audio_seg = AudioSegment.from_file(io.BytesIO(blob))

            # Convert to mono 16 kHz
            audio_seg = audio_seg.set_channels(1).set_frame_rate(TARGET_SR)

            # Extract raw samples as int16, convert to float32 in [-1, 1]
            samples = np.array(audio_seg.get_array_of_samples(), dtype=np.float32)
            samples /= 32768.0

            return samples

        except Exception:
            logger.exception("pydub decode failed, returning silence")
            return np.zeros(TARGET_SR, dtype=np.float32)

    def reset(self) -> None:
        self._chunks.clear()
        self._total_bytes = 0
