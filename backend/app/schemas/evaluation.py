"""Pydantic schemas for the Whisper-based evaluation response."""

from pydantic import BaseModel, Field


class Mistake(BaseModel):
    word_index: int = Field(..., description="0-based index of the word in the ayah (-1 for global errors)")
    error_type: str = Field(..., description="Error category: mispronunciation, missing_word, extra_word, too_short, transcription_error")
    details: str = Field(..., description="Human-readable correction hint")


class EvaluationResult(BaseModel):
    score: float = Field(..., ge=0, le=100, description="Overall accuracy 0-100")
    recognized_text: str = Field(default="", description="What Whisper heard")
    feedback: str = Field(default="", description="Child-friendly feedback message")
    mistakes: list[Mistake] = Field(default_factory=list)
