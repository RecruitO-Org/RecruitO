# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps import get_db, get_company_for_user, require_company_approved
from app.auth import get_current_user, RoleChecker
from app import models, schemas

router = APIRouter(prefix="/jobs", tags=["jobs"])

company_scoped = RoleChecker(["company", "admin"])
any_auth = RoleChecker(["user", "company", "admin"])


def _company_of_current(db: Session, user: models.User) -> models.Company:
    company = (
        db.query(models.Company).filter(models.Company.user_id == user.id).first()
    )
    if company is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Create your company profile before managing jobs",
        )
    return company


def _to_job_out(job: models.Job) -> schemas.JobOut:
    return schemas.JobOut(
        id=job.id,
        company_id=job.company_id,
        title=job.title,
        department=job.department,
        location=job.location,
        type=job.type,
        experience=job.experience,
        salary=job.salary,
        skills=job.skills or [],
        vacancies=job.vacancies,
        description=job.description,
        deadline=job.deadline,
        status=job.status,
        posted_on=job.posted_on,
        company_name=job.company.name if job.company else None,
        applicant_count=len(job.applications) if job.applications else 0,
    )


@router.post("", response_model=schemas.JobOut, status_code=201)
def create_job(
    payload: schemas.JobCreate,
    current_user: models.User = Depends(RoleChecker(["company"])),
    db: Session = Depends(get_db),
):
    """Company creates a job posting."""
    company = _company_of_current(db, current_user)
    require_company_approved(company)
    job = models.Job(
        company_id=company.id,
        title=payload.title,
        department=payload.department,
        location=payload.location,
        type=payload.type,
        experience=payload.experience,
        salary=payload.salary,
        skills=payload.skills or [],
        vacancies=payload.vacancies if payload.vacancies is not None else 1,
        description=payload.description,
        deadline=payload.deadline,
        status=payload.status,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return _to_job_out(job)


@router.get("", response_model=list[schemas.JobOut])
def list_jobs(
    current_user: models.User = Depends(any_auth),
    db: Session = Depends(get_db),
):
    """List jobs. Companies see their own; candidates/admin see open jobs."""
    query = db.query(models.Job)
    if current_user.role == models.RoleEnum.company:
        company = (
            db.query(models.Company)
            .filter(models.Company.user_id == current_user.id)
            .first()
        )
        if company:
            query = query.filter(models.Job.company_id == company.id)
        else:
            return []
    else:
        # Candidates and admins browsing the candidate market see open jobs.
        query = query.filter(models.Job.status == models.JobStatusEnum.open)

    jobs = query.order_by(models.Job.posted_on.desc()).all()
    return [_to_job_out(j) for j in jobs]


@router.get("/{job_id}", response_model=schemas.JobOut)
def get_job(
    job_id: int,
    current_user: models.User = Depends(any_auth),
    db: Session = Depends(get_db),
):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    if current_user.role != models.RoleEnum.admin:
        company = (
            db.query(models.Company)
            .filter(models.Company.user_id == current_user.id)
            .first()
            if current_user.role == models.RoleEnum.company
            else None
        )
        is_owner = company is not None and company.id == job.company_id
        # Non-owner/non-admin users may only view open jobs.
        if not is_owner and job.status != models.JobStatusEnum.open:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This job is not available",
            )
    return _to_job_out(job)


@router.put("/{job_id}", response_model=schemas.JobOut)
def update_job(
    job_id: int,
    payload: schemas.JobUpdate,
    current_user: models.User = Depends(company_scoped),
    db: Session = Depends(get_db),
):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    if current_user.role != models.RoleEnum.admin:
        company = _company_of_current(db, current_user)
        if job.company_id != company.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to edit this job",
            )

    data = payload.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return _to_job_out(job)


@router.delete("/{job_id}", status_code=204)
def delete_job(
    job_id: int,
    current_user: models.User = Depends(company_scoped),
    db: Session = Depends(get_db),
):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    if current_user.role != models.RoleEnum.admin:
        company = _company_of_current(db, current_user)
        if job.company_id != company.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to delete this job",
            )

    db.delete(job)
    db.commit()
    return None
