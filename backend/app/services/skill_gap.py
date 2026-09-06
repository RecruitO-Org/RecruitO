# pyrefly: ignore [missing-import]
"""Skill gap analysis helpers.

Builds on the resume parser's skill vocabulary and normalization so that gaps
are detected against the exact same canonical skill set used by the ATS
matcher. The result is a transparent, rule-based report (no LLM) that lists the
job's required skills the candidate already has (matched) and the ones they are
missing, plus simple learning recommendations.
"""
from dataclasses import dataclass, field
from typing import List, Optional

from app.services.resume_parser import normalize_skill, extract_skills_from_text

# Keep the vocab import for grouping recommendations by family.
from app.services.resume_parser import SKILL_VOCABULARY  # noqa: F401


# A short, curated resource hint for commonly requested skills. Skills not in
# this map fall back to a generic recommendation. Kept intentionally small and
# rule-based (no LLM).
RESOURCE_HINTS: dict[str, str] = {
    "python": "Python official tutorial, then practice with small projects.",
    "react": "React docs and the 'Tic-Tac-Toe' tutorial.",
    "typescript": "TypeScript handbook and official playground.",
    "node.js": "Node.js guides and Express introductory tutorials.",
    "django": "Django's official tutorial (polls app).",
    "sql": "Interactive free resources like SQLBolt and practice with SQLite.",
    "aws": "AWS Skill Builder and hands-on experiments in a free-tier account.",
    "docker": "Docker's official 'Get Started' guide.",
    "kubernetes": "Kubernetes official fundamentals and a local minikube cluster.",
    "git": "Atlassian Git tutorials and daily practice with commits/branches.",
    "machine learning": "Andrew Ng's ML course followed by a Kaggle beginner competition.",
    "pandas": "Pandas user guide and '10 minutes to pandas'.",
    "communication": "Practice structured updates (e.g., STAR) in mock interviews.",
    "project management": "Coursework on agile/scrum and a small side project to lead.",
    "agile": "Scrum guide and hands-on participation in a team sprint.",
    "postgresql": "PostgreSQL official tutorial and a sample CRUD app.",
}


def _recommendation_for(skill: str) -> str:
    hint = RESOURCE_HINTS.get(skill)
    if hint:
        return f"Missing required skill '{skill}'. {hint}"
    return (
        f"Missing required skill '{skill}'. Learn the fundamentals and add "
        f"concrete examples of using '{skill}' to your resume."
    )


def _summary(total: int, matched_count: int) -> str:
    if total == 0:
        return "This role has no explicitly required skills to compare."
    if matched_count == 0:
        return "None of the job's required skills were found in your resume."
    if matched_count == total:
        return "You match all of the job's required skills."
    return (
        f"You match {matched_count} of {total} required skills. "
        f"Close the {total - matched_count} gap{'s' if total - matched_count > 1 else ''} "
        "to strengthen your profile."
    )


@dataclass
class SkillGapItem:
    skill: str
    recommendation: str


@dataclass
class SkillGapReport:
    """Rule-based result of comparing a resume against a job's required skills.

    `matched_skills` and `missing_skills` use the parser's canonical normalized
    form. `coverage_percent` (0-100) is the fraction of required skills the
    candidate already has — deliberately distinct from the ATS match score.
    """

    required_skills: List[str] = field(default_factory=list)
    matched_skills: List[str] = field(default_factory=list)
    missing_skills: List[SkillGapItem] = field(default_factory=list)
    coverage_percent: int = 0
    summary: str = ""

    @property
    def total_required(self) -> int:
        return len(self.required_skills)

    @property
    def matched_count(self) -> int:
        return len(self.matched_skills)

    @property
    def missing_count(self) -> int:
        return len(self.missing_skills)


def analyze_skill_gap(
    resume_text: str,
    job_skills: Optional[List[str]],
    job_description: Optional[str] = None,
) -> SkillGapReport:
    """Compare a resume against a job's required skills.

    Matching reuses the ATS parser's normalization and membership logic, so the
    vocabulary and canonical spelling are identical to the existing match
    scorer. The `job_description` is (for now) informational; only explicitly
    required skills drive the gap so results stay transparent and deterministic.
    """
    resume_norm = (resume_text or "").strip()
    required = [normalize_skill(s) for s in (job_skills or [])]
    required = [s for s in required if s]

    matched: List[str] = []
    missing_raw: List[str] = []
    for skill in required:
        if _has_skill(resume_norm, skill):
            if skill not in matched:
                matched.append(skill)
        else:
            missing_raw.append(skill)

    missing = [
        SkillGapItem(skill=s, recommendation=_recommendation_for(s))
        for s in missing_raw
    ]

    total = len(required)
    coverage = round((len(matched) / total) * 100) if total else 0

    return SkillGapReport(
        required_skills=required,
        matched_skills=matched,
        missing_skills=missing,
        coverage_percent=coverage,
        summary=_summary(total, len(matched)),
    )


def _contains(norm_resume: str, skill: str) -> bool:
    """True if the (already normalized) skill phrase appears as a whole phrase.

    Mirrors the logic in resume_parser so the gap analysis and the ATS scorer
    agree on what counts as a match.
    """
    from app.services.resume_parser import _normalize

    f = _normalize(skill)
    if not f:
        return False
    return f" {f} " in f" {norm_resume} "


def _has_skill(resume_norm: str, skill: str) -> bool:
    # Membership via the same contiguous-phrase test the ATS uses, and also
    # via the extracted canonical vocabulary aliases for extra robustness.
    if _contains(resume_norm, skill):
        return True
    extracted = extract_skills_from_text(resume_norm)
    return normalize_skill(skill) in extracted
