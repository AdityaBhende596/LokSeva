from functools import lru_cache

from typing import Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings read from environment variables or backend/.env."""

    database_url: str = ""
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24
    frontend_url: str = "http://localhost:3000"
    cors_origins: list[str] = [
        "https://lok-seva-ten.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, list[str]]) -> list[str]:
        if isinstance(v, str):
            v_str = v.strip()
            if v_str.startswith("[") and v_str.endswith("]"):
                import json
                try:
                    return [item.strip().rstrip("/") for item in json.loads(v_str) if isinstance(item, str) and item.strip()]
                except Exception:
                    pass
            return [item.strip().rstrip("/") for item in v_str.split(",") if item.strip()]
        if isinstance(v, list):
            return [item.strip().rstrip("/") for item in v if isinstance(item, str) and item.strip()]
        return v

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
