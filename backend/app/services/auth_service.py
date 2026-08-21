from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.user import User
from app.schemas.auth import LoginRequest, SignupRequest

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password before it is persisted."""
    return password_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return password_context.verify(password, password_hash)


def register_user(db: Session, request: SignupRequest) -> User:
    email = str(request.email).lower()
    existing_user = db.scalar(select(User).where(User.email == email))
    if existing_user is not None:
        raise ValueError("An account with this email already exists.")

    user = User(name=request.name.strip(), email=email, password_hash=hash_password(request.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, request: LoginRequest) -> User | None:
    user = db.scalar(select(User).where(User.email == str(request.email).lower()))
    if user is None or not verify_password(request.password, user.password_hash):
        return None
    return user


def create_access_token(user: User) -> str:
    settings = get_settings()
    if not settings.jwt_secret:
        raise RuntimeError("JWT is not configured.")
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({"sub": str(user.id), "email": user.email, "exp": expires_at}, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def verify_access_token(token: str) -> dict | None:
    settings = get_settings()
    if not settings.jwt_secret:
        return None
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except Exception:
        return None

