from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import get_settings


class Base(DeclarativeBase):
    """Base class for future SQLAlchemy models."""


settings = get_settings()


def sqlalchemy_database_url(database_url: str) -> str:
    """Use Psycopg 3 for conventional PostgreSQL URLs without exposing the URL."""
    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    if database_url.startswith("postgres://"):
        return database_url.replace("postgres://", "postgresql+psycopg://", 1)
    return database_url


engine = create_engine(sqlalchemy_database_url(settings.database_url), pool_pre_ping=True) if settings.database_url else None
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) if engine else None


def get_db() -> Generator[Session, None, None]:
    """Provide a session only when a database URL is configured."""
    if SessionLocal is None:
        raise RuntimeError("Database is not configured.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def initialize_database() -> None:
    """Create the small MVP schema when PostgreSQL is configured."""
    if engine is None:
        return
    # Import registers all SQLAlchemy models before metadata is created.
    import app.models  # noqa: F401

    Base.metadata.create_all(bind=engine)
