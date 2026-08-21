from fastapi import APIRouter

from app.schemas.rti import RTIRequest, RTIResponse
from app.services.rti_service import generate_rti_draft

router = APIRouter(tags=["RTI"])


@router.post("/rti", response_model=RTIResponse, summary="Generate a prototype RTI draft", description="Returns a structured template draft, not legal advice.")
def create_rti_draft(request: RTIRequest) -> RTIResponse:
    return generate_rti_draft(request)
