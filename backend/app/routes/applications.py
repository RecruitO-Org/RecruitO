# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps import get_db
from app.auth import get_current_user, RoleChecker
from app import models, schemas
from app.services.resume_parser import compute_match_score

router = APIRouter(prefix="/applications", tags=["applications"])

company_scoped = RoleChecker(["company", "admin"])
any_auth = RoleChecker(["user", "company", "admin"])


def _enrich(application: models.Application) -> schemas.ApplicationOut:
    job = application.job
    applicant = application.user
    return schemas.ApplicationOut(
        id=application.id,
        job_id=application.job_id,
        user_id=application.user_id,
        status=application.status,
        match_score=application.match_score,
        created_at=application.created_at,
        job_title=job.title if job else None,
        company_name=job.company.name if job and job.company else None,
        applicant_name=applicant.name if applicant else None,
        applicant_email=applicant.email if applicant else None,
        applicant_phone=applicant.phone if applicant else None,
        applicant_skills=applicant.skills if applicant else None,
    )


def _can_manage(db: Session, app_: models.Application, user: models.User) -> bool:
    """True if the user (admin, or owning company) may manage this application."""
    if user.role == models.RoleEnum.admin:
        return True
    if user.role == models.RoleEnum.company:
        company = (
            db.query(models.Company)
            .filter(models.Company.user_id == user.id)
            .first()
        )
        return company is not None and app_.job.company_id == company.id
    # Candidate can manage (withdraw) their own application
    return app_.user_id == user.id


@router.post("", response_model=schemas.ApplicationOut, status_code=201)
def create_application(
    payload: schemas.ApplicationCreate,
    current_user: models.User = Depends(RoleChecker(["user"])),
    db: Session = Depends(get_db),
):
    """Candidate applies to a job."""
    job = db.query(models.Job).filter(models.Job.id == payload.job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status != models.JobStatusEnum.open:
        raise HTTPException(status_code=400, detail="This job is no longer open")

    duplicate = (
        db.query(models.Application)
        .filter(
            models.Application.job_id == job.id,
            models.Application.user_id == current_user.id,
        )
        .first()
    )
    if duplicate is not None:
        raise HTTPException(
            status_code=409, detail="You have already applied to this job"
        )

    # Compute the rule-based ATS match score from the candidate's most recent
    # resume text compared against the job's required skills and description.
    match_score = None
    resume = (
        db.query(models.Resume)
        .filter(models.Resume.user_id == current_user.id)
        .order_by(models.Resume.uploaded_at.desc())
        .first()
    )
    if resume is not None and resume.parsed_text:
        match_score = compute_match_score(
            resume.parsed_text,
            job.skills or [],
            job.description,
        )

    application = models.Application(
        job_id=job.id,
        user_id=current_user.id,
        status=models.ApplicationStatusEnum.applied,
        match_score=match_score,
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return _enrich(application)


@router.get("", response_model=list[schemas.ApplicationOut])
def list_applications(
    current_user: models.User = Depends(any_auth),
    db: Session = Depends(get_db),
):
    if current_user.role == models.RoleEnum.user:
        query = db.query(models.Application).filter(
            models.Application.user_id == current_user.id
        )
    elif current_user.role == models.RoleEnum.company:
        company = (
            db.query(models.Company)
            .filter(models.Company.user_id == current_user.id)
            .first()
        )
        if company is None:
            return []
        job_ids = [j.id for j in company.jobs]
        query = db.query(models.Application).filter(
            models.Application.job_id.in_(job_ids)
        ) if job_ids else db.query(models.Application).filter(False)
    else:
        query = db.query(models.Application)

    applications = query.order_by(models.Application.created_at.desc()).all()
    return [_enrich(a) for a in applications]


@router.get("/{application_id}", response_model=schemas.ApplicationOut)
def get_application(
    application_id: int,
    current_user: models.User = Depends(any_auth),
    db: Session = Depends(get_db),
):
    app_ = (
        db.query(models.Application)
        .filter(models.Application.id == application_id)
        .first()
    )
    if app_ is None:
        raise HTTPException(status_code=404, detail="Application not found")
    if not _can_manage(db, app_, current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this application",
        )
    return _enrich(app_)


@router.put("/{application_id}", response_model=schemas.ApplicationOut)
def update_application(
    application_id: int,
    payload: schemas.ApplicationUpdate,
    current_user: models.User = Depends(any_auth),
    db: Session = Depends(get_db),
):
    app_ = (
        db.query(models.Application)
        .filter(models.Application.id == application_id)
        .first()
    )
    if app_ is None:
        raise HTTPException(status_code=404, detail="Application not found")
    if not _can_manage(db, app_, current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this application",
        )

    # A candidate may only withdraw their own application.
    if (
        current_user.role == models.RoleEnum.user
        and payload.status != models.ApplicationStatusEnum.withdrawn
    ):
        raise HTTPException(
            status_code=403,
            detail="Candidates may only withdraw their own application",
        )

    app_.status = payload.status
    db.commit()
    db.refresh(app_)
    return _enrich(app_)
