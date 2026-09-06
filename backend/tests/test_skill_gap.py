"""Unit tests for the rule-based skill gap analyzer."""
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from app.services.skill_gap import (  # noqa: E402
    SkillGapReport,
    analyze_skill_gap,
)


# ---------------------------------------------------------------------------
# Basic gap reporting
# ---------------------------------------------------------------------------

REQUIRED = ["python", "django", "aws", "kubernetes", "docker"]


def test_full_match_no_missing():
    resume = "Python Django AWS Kubernetes Docker developer"
    report = analyze_skill_gap(resume, REQUIRED)
    assert isinstance(report, SkillGapReport)
    assert report.matched_count == 5
    assert report.missing_count == 0
    assert report.coverage_percent == 100
    assert report.summary.startswith("You match all")


def test_partial_match_identifies_gaps():
    resume = "5 years Python with AWS cloud and Docker."
    report = analyze_skill_gap(resume, REQUIRED)
    assert "python" in report.matched_skills
    assert "aws" in report.matched_skills
    assert "docker" in report.matched_skills
    assert report.coverage_percent == 60
    missing_skills = [m.skill for m in report.missing_skills]
    assert "django" in missing_skills
    assert "kubernetes" in missing_skills


def test_no_skills_matches_zero_coverage():
    report = analyze_skill_gap("I am fluent in French only", REQUIRED)
    assert report.matched_count == 0
    assert report.missing_count == 5
    assert report.coverage_percent == 0


def test_empty_required_skills():
    report = analyze_skill_gap("Python developer", [])
    assert report.total_required == 0
    assert report.coverage_percent == 0
    assert "no explicitly required skills" in report.summary


def test_empty_resume_no_gaps_flagged():
    report = analyze_skill_gap("", REQUIRED)
    assert report.matched_count == 0
    assert report.missing_count == 5


def test_normalizes_skill_variants():
    # "Node.js" in requirements should match "node js" / "Node JS" in the resume.
    report = analyze_skill_gap("I use Node JS daily", ["node.js"])
    assert report.matched_count == 1
    assert report.missing_count == 0


def test_missing_skill_has_recommendation():
    report = analyze_skill_gap("Python only", ["kubernetes"])
    assert report.missing_count == 1
    item = report.missing_skills[0]
    assert item.skill == "kubernetes"
    assert "kubernetes" in item.recommendation


def test_recommendation_resource_hint_for_known_skill():
    report = analyze_skill_gap("nothing", ["python"])
    assert "Python official tutorial" in report.missing_skills[0].recommendation


def test_summary_partial_gap():
    report = analyze_skill_gap("Python Django", REQUIRED)
    assert "match 2 of 5 required skills" in report.summary
