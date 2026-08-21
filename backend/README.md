# LokSeva API — Phase 1 Foundation

This directory contains the Python FastAPI middle layer for LokSeva. It is separate from the existing Next.js frontend and currently provides documented, validated mock endpoints for health, civic guidance, RTI drafts, and future authentication.

## Architecture

`Next.js frontend → FastAPI routes → services → future database / RAG / AI`

Routes remain thin. The service modules are the replacement points for future retrieval, RAG, AI generation, PostgreSQL persistence, and secure JWT authentication.

## Requirements

- Python 3.11 or newer
- PostgreSQL is **not** required for this phase

## Setup on Windows

From the `backend` directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Set `FRONTEND_URL=http://localhost:3000` in `.env`. Leave `DATABASE_URL` blank during Phase 1. Do not put real secrets in source control.

## Run

```powershell
uvicorn app.main:app --reload --port 8000
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) for interactive OpenAPI documentation or [http://localhost:8000/redoc](http://localhost:8000/redoc) for ReDoc.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | API health check |
| POST | `/api/guidance` | Structured prototype civic guidance |
| POST | `/api/rti` | Structured prototype RTI template |
| POST | `/api/auth/signup` | Validates signup payload; no account persistence yet |
| POST | `/api/auth/login` | Returns a safe prototype authentication failure |

## Current mock behavior

- Guidance accepts any validated civic question and returns generic structured prototype guidance.
- RTI returns a template-based draft labelled as not legal advice.
- Authentication validates safe payloads but has no users, database, or token issuance.
- SQLAlchemy is PostgreSQL-ready but does not create an engine unless `DATABASE_URL` is configured.

## Next phases

- PostgreSQL migrations and persistence
- Database-backed authentication, password storage, and JWT tokens
- Official source ingestion, retrieval, RAG, and AI services
- Frontend integration with authenticated API calls
