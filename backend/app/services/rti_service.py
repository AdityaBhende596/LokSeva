from app.schemas.rti import RTIRequest, RTIResponse


def generate_rti_draft(request: RTIRequest) -> RTIResponse:
    """Create a structured RTI application draft tailored to citizen input."""
    applicant = request.applicant_name.strip() or "Citizen Applicant"
    dept = request.department.strip() or "Public Information Officer / Municipal Department"
    loc = request.location.strip() or "Concerned Jurisdiction"
    period = request.time_period.strip() or "Recent period to present"
    info = request.information_requested.strip() or "Details and official records of civic project expenditure."

    draft = f"""To,
The Public Information Officer
{dept}

Subject: Request for Information under the Right to Information Act, 2005

Sir/Madam,

I, {applicant}, request the following information concerning {loc} for the period {period}:

1. {info}
2. Certified copies of approved work estimates, administrative sanctions, and tender notifications.
3. Daily progress reports, measurement book (MB) entries, and quality inspection certificates.
4. Total funds allocated, sanctioned, released, and paid to contractors along with payment vouchers.

Please provide the available information in accordance with statutory procedures under Section 6 of the RTI Act, 2005.

Yours faithfully,
{applicant}
Address/Location: {loc}"""

    return RTIResponse(
        disclaimer="Prototype draft — not legal advice. Verify current official requirements before submitting.",
        subject="Request for Information under the Right to Information Act, 2005",
        draft=draft,
    )
