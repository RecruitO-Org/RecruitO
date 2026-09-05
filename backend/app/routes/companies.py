# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps import get_db
from app.auth import get_current_user, RoleChecker
from app import models, schemas

router = APIRouter(prefix="/companies", tags=["companies"])

company_scoped = RoleChecker(["company", "admin"])
admin_scoped = RoleChecker(["admin"])
agent_scoped = RoleChecker(["user", "company", "admin"])


def _get_owned_company(db: Session, user: models.User) -> models.Company:
    company = (
        db.query(models.Company).filter(models.Company.user_id == user.id).first()
    )
    if company is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found",
        )
    return company


@router.get("/me", response_model=schemas.CompanyOut)
def get_my_company(
    current_user: models.User = Depends(RoleChecker(["company"])),
    db: Session = Depends(get_db),
):
    """Return the currently authenticated company's own profile."""
    return _get_owned_company(db, current_user)


@router.post("", response_model=schemas.CompanyOut, status_code=201)
def create_company(
    payload: schemas.CompanyCreate,
    current_user: models.User = Depends(RoleChecker(["company"])),
    db: Session = Depends(get_db),
):
    """Create the company profile for the current company user."""
    existing = (
        db.query(models.Company)
        .filter(models.Company.user_id == current_user.id)
        .first()
    )
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Company profile already exists",
        )
    company = models.Company(
        user_id=current_user.id,
        name=payload.name,
        website=payload.website,
        registration_number=payload.registration_number,
        industry=payload.industry,
        location=payload.location,
        size=payload.size,
        about=payload.about,
        logo_url=payload.logo_url,
        # New companies start unapproved and must be approved by an admin
        # before they can post jobs or schedule interviews.
        approved=False,
    )
    db.add(company)
    db.commit()
    db.refresh(company)
    return company


@router.get("/{company_id}", response_model=schemas.CompanyOut)
def get_company(
    company_id: int,
    current_user: models.User = Depends(agent_scoped),
    db: Session = Depends(get_db),
):
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    # Data isolation: non-admin users can view public company info (needed to
    # read job listings), which is acceptable here.
    return company


@router.put("/{company_id}", response_model=schemas.CompanyOut)
def update_company(
    company_id: int,
    payload: schemas.CompanyUpdate,
    current_user: models.User = Depends(company_scoped),
    db: Session = Depends(get_db),
):
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    # Only the owning company or an admin may edit.
    if current_user.role != models.RoleEnum.admin and company.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to edit this company",
        )
    data = payload.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(company, field, value)
    db.commit()
    db.refresh(company)
    return company
