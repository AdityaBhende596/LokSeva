"""One-shot, credential-safe PostgreSQL connectivity check."""

from sqlalchemy import text


def main() -> int:
    try:
        # Importing here also keeps malformed local configuration from printing a traceback.
        from app.database.database import engine

        if engine is None:
            print("Database connection failed. DATABASE_URL is not configured.")
            return 1
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except Exception:
        print("Database connection failed. Check local configuration and network access.")
        return 1

    print("Database connection successful")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
