from pydantic import BaseModel, Field


class RTIRequest(BaseModel):
    applicant_name: str = Field(default="", max_length=200, description="Name of citizen applicant.")
    department: str = Field(default="", max_length=300, description="Public authority or department name.")
    location: str = Field(default="", max_length=300, description="City, ward, village, or project location.")
    information_requested: str = Field(default="", max_length=5000, description="Specific information or records requested.")
    time_period: str = Field(default="", max_length=200, description="Timeframe or financial period for records.")


class RTIResponse(BaseModel):
    disclaimer: str
    subject: str
    draft: str
