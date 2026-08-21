from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class AuthStatusResponse(BaseModel):
    detail: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime


class SignupResponse(BaseModel):
    detail: str
    user: UserResponse


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
