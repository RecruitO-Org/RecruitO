from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.database import SessionLocal
from app import models
from app.utils import hash_password
from app.models import RoleEnum

router = APIRouter()


# ----------- Request Schema -----------

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: RoleEnum


# ----------- Database Dependency -----------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ----------- Signup Route -----------

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    # Check if email already exists
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Hash password
    try:
        hashed_password = hash_password(user.password)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Password too long (max 72 characters)"
    )

    # Create new user
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role
    }