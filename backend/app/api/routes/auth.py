from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, LoginResponse, SignupRequest, SignupResponse, UserResponse
from app.services.auth_service import authenticate_user, create_access_token, register_user, verify_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)


def user_response(user: object) -> UserResponse:
    return UserResponse.model_validate(user, from_attributes=True)


@router.post("/signup", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)) -> SignupResponse:
    try:
        user = register_user(db, request)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc)) from exc
    return SignupResponse(detail="Account created successfully.", user=user_response(user))


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:
    user = authenticate_user(db, request)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")
    return LoginResponse(access_token=create_access_token(user), user=user_response(user))


@router.get("/me", response_model=UserResponse)
def me(token: str | None = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserResponse:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated.")
    payload = verify_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token.")
    user_id = int(payload["sub"])
    user = db.scalar(select(User).where(User.id == user_id))
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return user_response(user)

