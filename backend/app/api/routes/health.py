from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health", summary="Check API health", description="Confirms that the LokSeva API is running.")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "LokSeva API"}
