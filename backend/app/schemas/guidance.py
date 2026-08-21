from pydantic import BaseModel, Field


class GuidanceRequest(BaseModel):
    question: str = Field(default="", max_length=2000, description="Citizen's civic question in plain language.")


class ActionStep(BaseModel):
    step: int = Field(ge=1)
    title: str
    description: str


class GuidanceResponse(BaseModel):
    problem_summary: str = Field(description="Summary of citizen's reported civic issue.")
    category: str = Field(description="Category of the civic problem.")
    suggested_authority: str = Field(description="Government authority responsible for handling the issue.")
    action_steps: list[ActionStep] = Field(description="Sequential step-by-step action plan.")
    documents_or_evidence: list[str] = Field(description="List of supporting documents or evidence needed.")
    escalation_option: str = Field(description="Next level escalation path or grievance mechanism.")
    disclaimer: str = Field(description="Responsible AI and legal notice.")
    understanding: str | None = None
    guidance: str | None = None
    sources: list[dict[str, str]] = Field(default_factory=list)
