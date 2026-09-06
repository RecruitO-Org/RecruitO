# pyrefly: ignore [missing-import]
"""Semantic resume-JD matching.

Adds a sentence-embedding similarity signal on top of the existing rule-based
ATS matcher. It reuses the resume parser's normalization helpers (the same
canonical lowercasing / punctuation handling used by `compute_match_score`) so
all modules stay consistent.

The sentence transformer is loaded lazily and cached in-process. If the model
cannot be loaded (offline, model not downloaded, torch unavailable), a
deterministic local fallback is used so the score pipeline never crashes.
Nothing here calls an external LLM or API.
"""
import hashlib
import re
from dataclasses import dataclass
from typing import List, Optional

from app.services.resume_parser import _normalize

DEFAULT_MODEL = "all-MiniLM-L6-v2"

# Number of terms / hash slots for the local fallback embedding. Larger is more
# discriminative; 4096 is a good balance for tokenized HR text.
_FALLBACK_DIM = 4096


@dataclass
class SemanticMatchResult:
    """Result of a semantic comparison between a resume and a job description.

    Attributes:
        score: 0-100 semantic match score derived from cosine similarity.
        cosine_similarity: raw cosine similarity in [0, 1] (clamped).
        embedding_model: model name used (or "fallback" for the local one).
        used_fallback: True when the sentence transformer was unavailable.
        explanation: human-readable description of how the score was computed.
    """

    score: int
    cosine_similarity: float
    embedding_model: str
    used_fallback: bool
    explanation: str


# ---------------------------------------------------------------------------
# Model loading (lazy, cached)
# ---------------------------------------------------------------------------

_model: object = None  # cached SentenceTransformer instance
_model_error: Optional[str] = None  # reason the model is unavailable


def get_embedding_model(model_name: str = DEFAULT_MODEL):
    """Return a lazily-loaded, process-cached SentenceTransformer.

    The first call loads and locally caches the model from Hugging Face. If the
    load fails (offline / missing weights), the error is recorded and a `None`
    is returned so callers can fall back to the local embedding.
    """
    global _model, _model_error
    if _model is not None:
        return _model

    try:
        from sentence_transformers import SentenceTransformer

        _model = SentenceTransformer(model_name)
        _model_error = None
    except Exception as exc:  # pragma: no cover - depends on environment
        _model = None
        _model_error = str(exc)
    return _model


# ---------------------------------------------------------------------------
# Local fallback embedding (no external model)
# ---------------------------------------------------------------------------

def _tokens(text: str) -> List[str]:
    norm = _normalize(text)
    if not norm:
        return []
    return [t for t in norm.split(" ") if len(t) >= 2]


def _hash_index(term: str) -> int:
    return int(hashlib.md5(term.encode("utf-8")).hexdigest(), 16) % _FALLBACK_DIM


def _fallback_embedding(text: str):
    """Build a deterministic hashed term-frequency vector over normalized tokens.

    Each distinct token hashes to an index in a fixed-size vector; the value is
    the token's count in the text. Normalizing the vector is not needed for
    cosine (which normalizes implicitly).
    """
    import math

    vec: List[float] = [0.0] * _FALLBACK_DIM
    for token in _tokens(text):
        vec[_hash_index(token)] += 1.0
    norm = math.sqrt(sum(v * v for v in vec))
    if norm == 0:
        return vec
    return [v / norm for v in vec]


# ---------------------------------------------------------------------------
# Similarity
# ---------------------------------------------------------------------------

def _cosine(a: List[float], b: List[float]) -> float:
    if len(a) != len(b):
        raise ValueError("Embedding vectors must have the same dimension")
    dot = sum(x * y for x, y in zip(a, b))
    return dot  # both vectors are unit-normalized for the fallback and SBERT


def _encode_texts(resume_text: str, job_description: str):
    """Encode both texts, returning (vec_resume, vec_job, model, fallback_flag)."""
    model = get_embedding_model()
    if model is None:
        return (
            _fallback_embedding(resume_text),
            _fallback_embedding(job_description or ""),
            "fallback",
            True,
        )

    # Sentence transformer returns a numpy array; squeeze to 1-D.
    vectors = model.encode([resume_text, job_description or ""])
    return (vectors[0], vectors[1], DEFAULT_MODEL, False)


def compute_semantic_score(
    resume_text: str,
    job_description: Optional[str],
    model_name: str = DEFAULT_MODEL,
) -> SemanticMatchResult:
    """Score how semantically similar a resume is to a job description.

    Scoring formula (fully explainable):
      1. Encode the resume text and the job description to fixed-size vectors
         using Sentence Transformers (fallback: deterministic hashed term
         vectors) after normalizing with the resume parser's normalizer.
      2. cosine_similarity = dot(unit_normalized_resume, unit_normalized_job),
         i.e. the cosine of the angle between the embeddings, clamped to [0, 1]
         (negative similarity is treated as 0 — unrelated text).
      3. semantic_score = round(cosine_similarity * 100).

    This is a *separate* signal from the existing ATS `compute_match_score` and
    does not modify that score. It captures meaning beyond explicit keyword /
    skill overlap (e.g. "backend engineer" vs "server-side developer").
    """
    if not resume_text or not resume_text.strip():
        return SemanticMatchResult(
            score=0,
            cosine_similarity=0.0,
            embedding_model=model_name,
            used_fallback=False,
            explanation="Empty resume text; similarity is 0.",
        )
    if not job_description or not job_description.strip():
        return SemanticMatchResult(
            score=0,
            cosine_similarity=0.0,
            embedding_model=model_name,
            used_fallback=False,
            explanation="Empty job description; similarity is 0.",
        )

    vec_resume, vec_job, model_used, used_fallback = _encode_texts(
        resume_text, job_description
    )
    raw = _cosine(list(vec_resume), list(vec_job))
    # Clamp cosine to [0, 1] so unrelated/orthogonal text scores 0.
    cosine = max(0.0, min(1.0, float(raw)))
    score = int(round(cosine * 100))

    explanation = (
        f"Embeddings from '{model_used}' compared with cosine similarity "
        f"(cosine = {cosine:.3f}); semantic_score = round(cosine x 100) = {score}. "
        f"Computed independently of the rule-based ATS score."
    )
    return SemanticMatchResult(
        score=score,
        cosine_similarity=cosine,
        embedding_model=model_used,
        used_fallback=used_fallback,
        explanation=explanation,
    )
