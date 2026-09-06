"""Unit tests for the semantic (embedding-based) resume-JD matcher."""
import sys
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from app.services import semantic_matcher  # noqa: E402
from app.services.semantic_matcher import (  # noqa: E402
    SemanticMatchResult,
    _fallback_embedding,
    _cosine,
    compute_semantic_score,
)


SIMILAR_RESUME = "Python backend developer with Django and AWS"
SIMILAR_JD = (
    "Looking for a Python Django backend engineer experienced with AWS cloud"
)
DISSIMILAR_RESUME = "Graphic designer with Figma and Photoshop skills"
DISSIMILAR_JD = (
    "Senior Java microservices architect with Kubernetes and Kafka experience"
)


@pytest.fixture
def no_model(monkeypatch):
    """Force the deterministic local fallback so tests are hermetic."""
    monkeypatch.setattr(semantic_matcher, "_model", None)
    monkeypatch.setattr(semantic_matcher, "_model_error", None)

    def _get_model(*args, **kwargs):
        return None

    monkeypatch.setattr(semantic_matcher, "get_embedding_model", _get_model)


# ---------------------------------------------------------------------------
# Local fallback embedding & cosine
# ---------------------------------------------------------------------------

def test_fallback_embedding_is_unit_length():
    vec = _fallback_embedding("python react docker")
    length = sum(v * v for v in vec) ** 0.5
    assert length == pytest.approx(1.0, abs=1e-9)


def test_cosine_identical_is_one():
    text = "python backend developer"
    v1 = _fallback_embedding(text)
    v2 = _fallback_embedding(text)
    assert _cosine(v1, v2) == pytest.approx(1.0)


def test_cosine_orthogonal_is_zero():
    v1 = _fallback_embedding("python react")
    v2 = _fallback_embedding("zzz qqq www")  # disjoint tokens
    assert _cosine(v1, v2) == pytest.approx(0.0)


def test_cosine_mismatched_dimensions_raises():
    with pytest.raises(ValueError):
        _cosine([1.0], [1.0, 2.0])


# ---------------------------------------------------------------------------
# compute_semantic_score (fallback path, hermetic)
# ---------------------------------------------------------------------------

def test_empty_resume_scores_zero(no_model):
    result = compute_semantic_score("", SIMILAR_JD)
    assert isinstance(result, SemanticMatchResult)
    assert result.score == 0
    assert result.cosine_similarity == 0.0
    assert "Empty resume" in result.explanation


def test_empty_job_description_scores_zero(no_model):
    result = compute_semantic_score(SIMILAR_RESUME, "  ")
    assert result.score == 0
    assert "Empty job description" in result.explanation


def test_similar_scores_higher_than_dissimilar(no_model):
    similar = compute_semantic_score(SIMILAR_RESUME, SIMILAR_JD)
    dissimilar = compute_semantic_score(DISSIMILAR_RESUME, DISSIMILAR_JD)
    assert similar.score > dissimilar.score
    assert similar.cosine_similarity > dissimilar.cosine_similarity


def test_score_bounded_between_0_and_100(no_model):
    similar = compute_semantic_score(SIMILAR_RESUME, SIMILAR_JD)
    weird = compute_semantic_score("x", "x")
    for r in (similar, weird):
        assert 0 <= r.score <= 100
        assert 0.0 <= r.cosine_similarity <= 1.0


def test_identical_text_scores_high(no_model):
    result = compute_semantic_score(SIMILAR_RESUME, SIMILAR_RESUME)
    assert result.score >= 99


def test_fallback_flag_and_model_name(no_model):
    result = compute_semantic_score(SIMILAR_RESUME, SIMILAR_JD)
    assert result.used_fallback is True
    assert result.embedding_model == "fallback"


def test_explanation_is_present(no_model):
    result = compute_semantic_score(SIMILAR_RESUME, SIMILAR_JD)
    assert "cosine" in result.explanation
    assert str(result.score) in result.explanation


# ---------------------------------------------------------------------------
# Real Sentence Transformer (integration) — skipped when offline
# ---------------------------------------------------------------------------

def test_real_model_ranks_correctly():
    model = None
    try:
        model = semantic_matcher.get_embedding_model()
    except Exception:
        model = None
    if model is None:
        pytest.skip("SentenceTransformer model unavailable (offline?)")

    similar = compute_semantic_score(SIMILAR_RESUME, SIMILAR_JD)
    dissimilar = compute_semantic_score(DISSIMILAR_RESUME, DISSIMILAR_JD)

    assert similar.used_fallback is False
    assert similar.embedding_model == semantic_matcher.DEFAULT_MODEL
    assert similar.score > 50
    assert similar.score > dissimilar.score