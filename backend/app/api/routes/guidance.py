from fastapi import APIRouter, HTTPException

from app.schemas.guidance import GuidanceRequest, GuidanceResponse
from app.services.guidance_service import generate_guidance

router = APIRouter(tags=["Guidance"])


@router.post("/guidance", response_model=GuidanceResponse, summary="Get prototype civic guidance", description="Returns structured civic guidance tailored to plain-language citizen queries.")
def create_guidance(request: GuidanceRequest) -> GuidanceResponse:
    if not request.question or len(request.question.strip()) < 3:
        raise HTTPException(
            status_code=400,
            detail="Please provide a more detailed question (at least 3 characters) describing your civic issue."
        )
    return generate_guidance(request)

