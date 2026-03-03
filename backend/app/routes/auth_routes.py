from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import random
import smtplib
import os
from email.mime.text import MIMEText
from dotenv import load_dotenv

from app.database import SessionLocal
from app import models
from app.utils import hash_password
from app.models import RoleEnum, EmailOTP

# Load .env variables
load_dotenv()

router = APIRouter()


# ----------------------------
# Request Schemas
# ----------------------------

class SendOTPRequest(BaseModel):
    email: EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: RoleEnum
    otp: str


# ----------------------------
# Database Dependency
# ----------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ----------------------------
# Email Sending Function
# ----------------------------

def send_email_otp(receiver_email: str, otp: str):
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD")

    subject = "RecruitO OTP Verification"
    body = f"Your OTP for RecruitO signup is: {otp}"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
    except Exception as e:
        print("Email sending failed:", e)
        raise HTTPException(status_code=500, detail="Failed to send OTP email")


# ----------------------------
# Send OTP Route
# ----------------------------

@router.post("/send-otp")
def send_otp(request: SendOTPRequest, db: Session = Depends(get_db)):

    # Generate 6-digit OTP
    otp = str(random.randint(100000, 999999))

    # Save OTP to database
    otp_entry = EmailOTP(
        email=request.email,
        otp=otp
    )

    db.add(otp_entry)
    db.commit()

    # Send OTP via email
    send_email_otp(request.email, otp)

    return {"message": "OTP sent successfully"}


# ----------------------------
# Signup Route (with OTP verification)
# ----------------------------

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

    # Verify OTP (latest OTP)
    otp_record = db.query(EmailOTP).filter(
        EmailOTP.email == user.email,
        EmailOTP.otp == user.otp
    ).order_by(EmailOTP.id.desc()).first()

    if not otp_record:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    # Hash password
    try:
        hashed_password = hash_password(user.password)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Password too long"
        )

    # Create new user
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)

    # Delete used OTP
    db.delete(otp_record)

    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role
    }