from sqlalchemy import Column, Integer, String, Enum, DateTime
from app.database import Base
import enum
from datetime import datetime


class RoleEnum(str, enum.Enum):
    user = "user"
    admin = "admin"
    company = "company"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.user)


# 🔥 New OTP Table
class EmailOTP(Base):
    __tablename__ = "email_otps"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, nullable=False)
    otp = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)