"""
WebSocket endpoint: /ws/recitation

Protocol (matches Flutter AiWebSocketService):

  Client -> Server:
    1. Repeated base64 audio chunks (plain text, every ~500ms)
    2. JSON: {"type": "end_stream"}

  Server -> Client:
    1. JSON EvaluationResult after end_stream is received:
       {"score": 85.0, "feedback": "Great job!", "recognized_text": "...", "mistakes": [...]}

The endpoint also accepts an optional start message:
    JSON: {"type": "start", "surah": 1, "ayah": 3}
to specify which ayah is being recited. Defaults to surah 1, ayah 1.

If the client disconnects mid-stream, everything is cleaned up silently.
"""

from __future__ import annotations

import json
import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.core.audio_processor import AudioProcessor
from app.models.tajweed_engine import TajweedEvaluator

logger = logging.getLogger(__name__)

router = APIRouter()

# Singleton evaluator — holds Whisper model weights in memory once.
_evaluator = TajweedEvaluator()


@router.websocket("/ws/recitation")
async def recitation_ws(ws: WebSocket) -> None:
    await ws.accept()
    logger.info("WebSocket connected: %s", ws.client)

    processor = AudioProcessor()
    surah = 1
    ayah = 1

    try:
        while True:
            raw = await ws.receive_text()

            # Try to parse as JSON control message
            try:
                msg = json.loads(raw)
            except (json.JSONDecodeError, TypeError):
                msg = None

            if isinstance(msg, dict):
                msg_type = msg.get("type", "")

                if msg_type == "start":
                    surah = msg.get("surah", 1)
                    ayah = msg.get("ayah", 1)
                    processor.reset()
                    logger.info("Session started: surah=%d ayah=%d", surah, ayah)
                    continue

                if msg_type == "end_stream":
                    logger.info(
                        "Stream ended — %d bytes buffered (approx %.1fs)",
                        processor.total_bytes,
                        processor.duration_estimate_seconds,
                    )

                    # Guard: if no audio was received, return a friendly error
                    if processor.total_bytes == 0:
                        await ws.send_text(json.dumps({
                            "score": 0,
                            "feedback": "No audio was received. Please check your microphone.",
                            "recognized_text": "",
                            "mistakes": [],
                        }))
                        continue

                    audio = processor.decode_to_array()
                    result = await _evaluator.evaluate(audio, surah, ayah)

                    await ws.send_text(result.model_dump_json())
                    logger.info("Sent result: score=%.1f", result.score)

                    # Reset for potential next ayah in same connection
                    processor.reset()
                    continue

            # Not JSON -> treat as base64 audio chunk
            if raw and len(raw) > 0:
                processor.append_chunk(raw)

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected: %s", ws.client)
    except Exception:
        logger.exception("WebSocket error")
        try:
            await ws.close(code=1011)
        except Exception:
            pass
