"""Benchmark Quran scoring with perfectly recited Al-Fatihah source audio.

Run from the backend directory after placing the source files locally:
    python tools/benchmark_scoring.py --audio /path/to/001.m4a --timestamps /path/to/001.json
"""

from __future__ import annotations

import argparse
import asyncio
import io
import json
import time
from dataclasses import dataclass
from pathlib import Path

from pydub import AudioSegment

from app.core.audio_processor import AudioProcessor
from app.models import tajweed_engine


DEFAULT_MODELS = ("tiny", "base", "small")
PASS_THRESHOLD = 85.0


@dataclass(frozen=True)
class AyahSample:
    surah: int
    ayah: int
    start_ms: int
    end_ms: int
    text: str


@dataclass(frozen=True)
class BenchmarkRow:
    model: str
    ayah: int
    score: float
    recognized_text: str
    seconds: float


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Benchmark the existing Quran scoring pipeline on reciter source audio."
    )
    parser.add_argument("--audio", required=True, type=Path, help="Path to 001.m4a")
    parser.add_argument("--timestamps", required=True, type=Path, help="Path to 001.json")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).with_name("BENCHMARK.md"),
        help="Markdown report destination",
    )
    parser.add_argument(
        "--models",
        nargs="+",
        choices=DEFAULT_MODELS,
        default=list(DEFAULT_MODELS),
        help="Whisper models to compare",
    )
    return parser.parse_args()


def load_samples(timestamps_path: Path) -> list[AyahSample]:
    with timestamps_path.open(encoding="utf-8") as source:
        records = json.load(source)

    if not isinstance(records, list):
        raise ValueError("Timestamp JSON must be a list of ayah records.")

    samples = [
        AyahSample(
            surah=int(record["surah"]),
            ayah=int(record["ayah"]),
            start_ms=int(record["start_ms"]),
            end_ms=int(record["end_ms"]),
            text=str(record["text"]),
        )
        for record in records
        if int(record["surah"]) == 1
    ]
    samples.sort(key=lambda sample: sample.ayah)

    if [sample.ayah for sample in samples] != list(range(1, 8)):
        raise ValueError("Timestamp JSON must contain exactly Al-Fatihah ayahs 1 through 7.")
    if any(sample.end_ms <= sample.start_ms for sample in samples):
        raise ValueError("Each ayah timestamp must end after it starts.")
    return samples


def decode_ayah(recording: AudioSegment, sample: AyahSample):
    encoded_slice = io.BytesIO()
    recording[sample.start_ms:sample.end_ms].export(encoded_slice, format="mp4", codec="aac")

    processor = AudioProcessor()
    processor.append_chunk(encoded_slice.getvalue())
    audio = processor.decode_to_array()
    if len(audio) < 4_000:
        raise RuntimeError(f"Ayah {sample.ayah} decoded to an unusably short audio array.")
    return audio


async def benchmark_model(
    model_name: str,
    recording: AudioSegment,
    samples: list[AyahSample],
) -> list[BenchmarkRow]:
    tajweed_engine.WHISPER_MODEL_SIZE = model_name
    tajweed_engine._load_whisper.cache_clear()
    tajweed_engine._load_whisper()
    evaluator = tajweed_engine.TajweedEvaluator()

    rows: list[BenchmarkRow] = []
    for sample in samples:
        audio = decode_ayah(recording, sample)
        started_at = time.perf_counter()
        result = await evaluator.evaluate(audio, sample.surah, sample.ayah)
        rows.append(
            BenchmarkRow(
                model=model_name,
                ayah=sample.ayah,
                score=result.score,
                recognized_text=result.recognized_text,
                seconds=time.perf_counter() - started_at,
            )
        )
    return rows


def escape_markdown(text: str) -> str:
    return text.replace("|", "\\|").replace("\n", " ").strip()


def report_markdown(rows: list[BenchmarkRow]) -> str:
    means = {
        model: sum(row.score for row in rows if row.model == model)
        / len([row for row in rows if row.model == model])
        for model in DEFAULT_MODELS
        if any(row.model == model for row in rows)
    }
    passing_models = [model for model, mean in means.items() if mean >= PASS_THRESHOLD]

    if passing_models:
        selected_model = min(
            passing_models,
            key=lambda model: sum(row.seconds for row in rows if row.model == model)
            / len([row for row in rows if row.model == model]),
        )
        verdict = [
            f"**Verdict:** ship `{selected_model}`; its mean score on perfect reciter audio is **{means[selected_model]:.1f}**.",
            f"Models meeting the ≥ {PASS_THRESHOLD:.0f} gate: {', '.join(f'`{model}` ({means[model]:.1f})' for model in passing_models)}.",
            "The selected model is the fastest model that cleared the accuracy gate.",
        ]
    else:
        verdict = [
            "**Verdict:** **STOP — no tested model reached the required mean score of 85.0 on perfect reciter audio.**",
            "Mean scores on perfect reciter audio: "
            + ", ".join(f"`{model}` {means[model]:.1f}" for model in means) + ".",
            "Do not begin Task 1 until Ahmed/Claude decides whether to replace or revise the scoring engine; the threshold has not been adjusted.",
        ]

    table = [
        "| model | ayah | score | recognized text | seconds |",
        "|-------|------|-------|-----------------|---------|",
    ]
    for row in rows:
        table.append(
            f"| {row.model} | {row.ayah} | {row.score:.1f} | {escape_markdown(row.recognized_text)} | {row.seconds:.2f} |"
        )
    return "\n".join([*verdict, "", *table, ""])


async def main() -> None:
    args = parse_args()
    if not args.audio.is_file():
        raise FileNotFoundError(f"Audio file not found: {args.audio}")
    if not args.timestamps.is_file():
        raise FileNotFoundError(f"Timestamp file not found: {args.timestamps}")

    samples = load_samples(args.timestamps)
    recording = AudioSegment.from_file(args.audio)
    rows: list[BenchmarkRow] = []
    for model_name in args.models:
        rows.extend(await benchmark_model(model_name, recording, samples))

    args.output.write_text(report_markdown(rows), encoding="utf-8")
    print(f"Wrote {len(rows)} measured rows to {args.output}")


if __name__ == "__main__":
    asyncio.run(main())
