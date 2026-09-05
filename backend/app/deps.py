# pyrefly: ignore [missing-import]
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_company_approved(company: models.Company) -> None:
    """Raise 403 if the company profile exists but has not been approved."""
    if company is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found. Create it first.",
        )
    if not company.approved:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your company is pending approval. You cannot perform this action yet.",
        )


def get_company_for_user(db: Session, user: models.User) -> models.Company:
    """Return the Company record owned by the given user, or 404 if none.

    The caller must already be a 'company' role user.
    """
    if user.role != models.RoleEnum.company:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only company accounts have a company profile",
        )
    company = (
        db.query(models.Company).filter(models.Company.user_id == user.id).first()
    )
    if company is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found. Create it first.",
        )
    return company
