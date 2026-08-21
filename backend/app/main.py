from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import auth, guidance, health, rti
from app.core.config import get_settings
from app.database.database import initialize_database

settings = get_settings()
app = FastAPI(title="LokSeva API", description="Civic guidance and citizen services API.", version="0.1.0")

raw_origins = [settings.frontend_url, *settings.cors_origins]
allowed_origins = list({origin.strip().rstrip("/") for origin in raw_origins if origin and origin.strip()})

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    initialize_database()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(status_code=422, content={"detail": "Invalid request data.", "errors": exc.errors()})


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, __: Exception) -> JSONResponse:
    return JSONResponse(status_code=500, content={"detail": "An unexpected server error occurred."})


app.include_router(health.router, prefix="/api")
app.include_router(guidance.router, prefix="/api")
app.include_router(rti.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
