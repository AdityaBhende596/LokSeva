from app.schemas.guidance import ActionStep, GuidanceRequest, GuidanceResponse


def generate_guidance(request: GuidanceRequest) -> GuidanceResponse:
    """Generate structured civic guidance tailored to plain-language citizen queries.

    Uses refined heuristic categorization to classify issues into clear civic domains
    and produce actionable, authority-specific guidance with relevant legal/regulatory sources.
    """
    question = request.question.strip()
    q_lower = question.lower()

    # Rule 1: Roads, Potholes & Infrastructure
    if any(k in q_lower for k in [
        "road", "pothole", "street", "asphalt", "paving", "streetlight", "street light",
        "streetlamp", "footpath", "sidewalk", "bridge", "traffic light", "traffic signal",
        "flyover", "road divider", "road signage", "highway", "pavement", "walking path"
    ]):
        category = "Roads & Infrastructure"
        suggested_authority = "Public Works Department (PWD) / Municipal Corporation Infrastructure Division"
        problem_summary = f"Grievance concerning road conditions, potholes, or public infrastructure: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Document Location & Physical Damage",
                description="Capture geo-tagged photographs/videos of the damaged road or infrastructure, recording the precise street name and landmark where applicable."
            ),
            ActionStep(
                step=2,
                title="Lodge Formal Complaint via Municipal Portal",
                description="Register a formal complaint on your local Municipal Citizen Portal or grievance helpline app (e.g., Swachhata / State Civic App)."
            ),
            ActionStep(
                step=3,
                title="Record Grievance Ticket Number",
                description="Obtain and retain the official acknowledgement reference number and review the estimated resolution timeline specified in your local Citizens' Charter."
            ),
            ActionStep(
                step=4,
                title="Escalate to Local Engineering Division",
                description="If repairs are not initiated within the resolution timeline published by your local authority or Citizens' Charter, present your grievance reference number to the Ward Executive Engineer or local public works division."
            ),
        ]
        documents_or_evidence = [
            "Clear geo-tagged photographs/videos of the road condition or defect",
            "Exact location address with nearest landmark and GPS coordinates",
            "Reference numbers of any previous complaints submitted to local ward office"
        ]
        escalation_option = "Escalate to the relevant municipal/PWD engineering authority according to your local grievance procedure, or submit an RTI request seeking road maintenance contract terms, contractor details, and sanctioned fund allocation."
        sources = [
            {"title": "Motor Vehicles & Public Works Code", "type": "Legislation", "detail": "Municipal road maintenance standards & public safety duty", "url": "https://rti.gov.in"},
            {"title": "CPGRAMS Infrastructure Grievance Framework", "type": "Process Guide", "detail": "Standard procedure for road repair escalation & local Citizens' Charter benchmarks", "url": "https://pgportal.gov.in"},
            {"title": "Right to Information Act, 2005", "type": "Legislation", "detail": "Section 6 - Procedure for inspecting public road works & contractor tenders", "url": "https://rti.gov.in"}
        ]

    # Rule 2: Water Supply, Drainage & Sanitation
    elif any(k in q_lower for k in [
        "water", "drain", "drainage", "sewage", "sewer", "pipeline", "water leak",
        "water leakage", "overflow", "dirty water", "water contamination", "waterlogging",
        "water flood", "sump", "water tanker", "borewell", "water tap", "water pipe"
    ]):
        category = "Water Supply & Public Sanitation"
        suggested_authority = "Municipal Water Supply & Sewerage Board / Public Health Sanitation Division"
        problem_summary = f"Issue regarding water supply, drainage, or sewage management: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Verify Connection & Note Disruption",
                description="Locate your municipal consumer connection number (CAN) where applicable and note the dates, times, and duration of the issue."
            ),
            ActionStep(
                step=2,
                title="File Urgent Sanitation Helpline Ticket",
                description="Submit a complaint via the Water Board emergency helpline or municipal citizen app for inspection."
            ),
            ActionStep(
                step=3,
                title="Request On-Site Inspection Timestamp",
                description="Request a formal visit schedule from the Ward Water Inspector to verify contaminated water or drainage blockages."
            ),
            ActionStep(
                step=4,
                title="Submit Written Representation to Health Officer",
                description="If unaddressed within local emergency resolution timelines published by your municipal authority, submit a written representation to the designated Zonal Public Health Officer."
            ),
        ]
        documents_or_evidence = [
            "Photos/videos of waterlogging, sewage overflow, or contaminated water samples",
            "Latest water utility bill or property tax receipt containing Connection Consumer ID",
            "Chronological log of service disruption dates and previous grievance tickets"
        ]
        escalation_option = "Escalate to the relevant municipal officer according to local procedure, or file a public grievance on your State Public Grievance Portal or CPGRAMS."
        sources = [
            {"title": "Water (Prevention & Control of Pollution) Act, 1974", "type": "Legislation", "detail": "Public drinking water safety and effluent discharge standards", "url": "https://rti.gov.in"},
            {"title": "Municipal Water Supply & Sewerage Regulations", "type": "Regulation", "detail": "Emergency pipeline breakdown & contamination resolution SOP", "url": "https://pgportal.gov.in"},
            {"title": "National Urban Sanitation Policy", "type": "Policy Standard", "detail": "Urban drainage maintenance guidelines and public sanitation service standards", "url": "https://swachhbharatmission.ddws.gov.in"}
        ]

    # Rule 3: Electricity & Power Distribution
    elif any(k in q_lower for k in [
        "electricity", "electric", "power outage", "power cut", "power failure",
        "power supply", "blackout", "electricity meter", "electric meter", "transformer",
        "voltage", "electricity bill", "electric bill", "power bill", "utility bill",
        "overbilling", "electric pole", "discom", "high voltage"
    ]):
        category = "Electricity & Power Distribution"
        suggested_authority = "State Electricity Distribution Company (DISCOM) / Assistant Engineer (Electrical)"
        problem_summary = f"Grievance regarding electricity supply, metering, or billing: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Locate Consumer Account Details",
                description="Obtain your electricity Service Connection / Consumer Number from your latest monthly bill."
            ),
            ActionStep(
                step=2,
                title="Lodge Complaint with DISCOM Call Centre",
                description="Register a complaint via your local DISCOM customer helpline (such as 1912 or official DISCOM portal) to obtain a Complaint ID."
            ),
            ActionStep(
                step=3,
                title="Request Technical Line Inspection",
                description="For transformer faults or meter defects, request an inspection timestamp from your sub-division office."
            ),
            ActionStep(
                step=4,
                title="Submit Written Appeal for Billing Disputes",
                description="If disputing an erroneous bill, submit a written representation to the designated Executive Engineer (Electricity) or billing desk."
            ),
        ]
        documents_or_evidence = [
            "Recent electricity bills and payment receipts",
            "DISCOM Consumer Account / Service Connection Number",
            "Photographs of damaged meter, loose wiring, or burnt transformer (where applicable)"
        ]
        escalation_option = "Approach the Consumer Grievance Redressal Forum (CGRF) of your DISCOM or appeal to the State Electricity Ombudsman under applicable Standards of Performance."
        sources = [
            {"title": "Electricity Act, 2003", "type": "Legislation", "detail": "Section 56 & 57 - Consumer rights, supply standards & DISCOM duties", "url": "https://rti.gov.in"},
            {"title": "State Electricity Regulatory Commission (SERC) Code", "type": "Regulation", "detail": "Standard of Performance (SoP) for Distribution Licensees & compensation rules", "url": "https://pgportal.gov.in"},
            {"title": "Consumer Protection Act, 2019", "type": "Legislation", "detail": "Redressal mechanisms for deficiency in public utility services", "url": "https://services.india.gov.in"}
        ]

    # Rule 4: Garbage & Solid Waste Management
    elif any(k in q_lower for k in [
        "garbage", "waste", "trash", "dump", "dumpster", "litter", "debris", "swachh",
        "compost", "sanitation worker", "dustbin", "garbage collection", "waste collection",
        "door-to-door collection", "trash collection", "street sweeping"
    ]):
        category = "Garbage & Solid Waste Management"
        suggested_authority = "Municipal Sanitation Department / Chief Sanitary Inspector"
        problem_summary = f"Issue regarding uncollected garbage, illegal dumping, or waste disposal: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Photograph Dump Site & Record Location",
                description="Take photo evidence of uncollected garbage or illegal dumping, recording the exact street and ward number where applicable."
            ),
            ActionStep(
                step=2,
                title="Report via Swachhata Citizen App",
                description="Upload the complaint with photo and location on the Swachhata App or municipal civic portal."
            ),
            ActionStep(
                step=3,
                title="Contact Ward Sanitary Inspector",
                description="Provide the complaint ticket number to your local Sanitary Inspector for door-to-door or spot clearance."
            ),
            ActionStep(
                step=4,
                title="Escalate Persistent Waste Accumulation",
                description="If waste is not cleared within resolution timelines published by your local authority, submit a complaint to the Ward Health Officer or Sanitation Executive."
            ),
        ]
        documents_or_evidence = [
            "Geo-tagged photographs showing garbage accumulation or illegal dumping",
            "Locality address, landmark, and Ward Number details",
            "Log of complaint history submitted via civic apps or call centres"
        ]
        escalation_option = "File an appeal with the Zonal Health Officer or report persistent non-compliance with Solid Waste Management Rules to your local municipal commissioner."
        sources = [
            {"title": "Solid Waste Management Rules, 2016", "type": "Legislation", "detail": "Rule 15 - Mandatory duties of local bodies for daily collection and disposal", "url": "https://swachhbharatmission.ddws.gov.in"},
            {"title": "Swachh Bharat Mission (Urban) Framework", "type": "Policy Standard", "detail": "Grievance redressal framework and local civic cleanliness standards", "url": "https://swachhbharatmission.ddws.gov.in"},
            {"title": "Municipal Solid Waste Bye-Laws", "type": "Regulation", "detail": "Public dumping prohibition, door-to-door collection & enforcement rules", "url": "https://pgportal.gov.in"}
        ]

    # Rule 5: Delayed Government Services & Documentation
    elif any(k in q_lower for k in [
        "birth certificate", "death certificate", "caste certificate", "income certificate",
        "ration card", "passport", "driving license", "driving licence", "license application",
        "licence application", "pending application", "delayed certificate", "delayed passport",
        "delayed license", "delayed licence", "rtps", "land mutation", "property tax certificate",
        "dharani", "aadhaar card", "aadhaar update", "certificate delay", "delayed service",
        "service delay"
    ]):
        category = "Government Services & Documentation"
        suggested_authority = "Public Service Delivery Officer / Sub-Divisional Magistrate (SDM) / Tehsildar Office"
        problem_summary = f"Delay in issuance or processing of official government documentation: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Check Online Application Status",
                description="Verify your current application processing status on the designated state e-Governance portal using your acknowledgement number."
            ),
            ActionStep(
                step=2,
                title="Compare Against RTS Guarantee Timeline",
                description="Check the statutory delivery timeline guaranteed under your state's Right to Public Services (RTS) Act or local service delivery charter."
            ),
            ActionStep(
                step=3,
                title="Present Receipt at Citizen Service Centre",
                description="Visit the designated Citizen Service Centre (CSC) or issuing authority office with your original submission receipt."
            ),
            ActionStep(
                step=4,
                title="File First Appeal under Right to Service Act",
                description="If the statutory service delivery deadline has lapsed without valid cause, lodge a First Appeal before the designated Appellate Officer."
            ),
        ]
        documents_or_evidence = [
            "Original application acknowledgement receipt and reference number",
            "Valid identity proof of applicant (Aadhaar Card / Voter ID / Passport)",
            "Proof of payment of prescribed government processing fees"
        ]
        escalation_option = "Lodge a Right to Information (RTI) application requesting daily progress reports, movement history of your application file, and names of officers held accountable."
        sources = [
            {"title": "Right to Public Services Act (RTS)", "type": "Legislation", "detail": "Statutory delivery timelines and designated officer penalty provisions", "url": "https://services.india.gov.in"},
            {"title": "Digital India Service Charter & CSC Guidelines", "type": "Process Guide", "detail": "Standard procedure for public application tracking and receipt verification", "url": "https://services.india.gov.in"},
            {"title": "Right to Information Act, 2005", "type": "Legislation", "detail": "Section 6 - Inspection of file movement & processing records", "url": "https://rti.gov.in"}
        ]

    # Rule 6: Public Safety, Hazards & Community Nuisance
    elif any(k in q_lower for k in [
        "public safety", "crime", "police", "stray dog", "stray animal", "public nuisance",
        "encroachment", "illegal construction", "harassment", "threat", "noise pollution",
        "loudspeaker", "cctv", "public security", "safety hazard", "structural hazard",
        "fire hazard", "fire safety", "fallen tree", "dangerous tree"
    ]):
        category = "Public Safety & Community Hazards"
        suggested_authority = "Local Police Station / Municipal Public Safety & Vigilance Department"
        problem_summary = f"Public safety, community hazard, or public nuisance grievance: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Assess Threat Level & Gather Evidence",
                description="Document details of the safety hazard, encroachment, noise violation, or stray animal nuisance safely."
            ),
            ActionStep(
                step=2,
                title="Notify Local Police Station or Helpline",
                description="For immediate safety concerns or emergency violations, dial the national emergency helpline (112) or contact your local police station."
            ),
            ActionStep(
                step=3,
                title="Submit Written Representation",
                description="For structural hazards or encroachments, submit a written complaint to the local Station House Officer (SHO) or Ward Officer."
            ),
            ActionStep(
                step=4,
                title="Obtain Official Diary / Acknowledgement Stamp",
                description="Ensure your complaint receives a formal Diary/GD Number or stamped receipt from the authority."
            ),
        ]
        documents_or_evidence = [
            "Photographic or audio-visual evidence of safety hazard/nuisance/encroachment",
            "Exact location address, date, time, and frequency of occurrences",
            "Copies of written petitions or emergency call logs"
        ]
        escalation_option = "Escalate to the relevant District Magistrate / Police Division according to your local administrative procedure, or file a public interest representation."
        sources = [
            {"title": "Bhartiya Nyaya Sanhita / IPC Public Nuisance Provisions", "type": "Legislation", "detail": "Legal provisions governing public nuisance, hazards & safety violations", "url": "https://rti.gov.in"},
            {"title": "Prevention of Cruelty to Animals (ABC) Rules", "type": "Legislation", "detail": "Municipal guidelines for stray animal management & vaccination protocols", "url": "https://pgportal.gov.in"},
            {"title": "Municipal Encroachment & Building Regulations", "type": "Regulation", "detail": "Standard procedure for hazardous building inspection and clearance", "url": "https://services.india.gov.in"}
        ]

    # Rule 7: General Civic Grievances (Default Case)
    else:
        category = "General Civic & Public Service Grievance"
        suggested_authority = "District Magistrate / Municipal Commissioner / Public Grievance Cell"
        problem_summary = f"General civic inquiry: \"{question}\""
        action_steps = [
            ActionStep(
                step=1,
                title="Define Issue Scope & Details",
                description="Write a clear statement of the civic problem, including dates, locations, and impact where applicable."
            ),
            ActionStep(
                step=2,
                title="Identify Departmental Jurisdiction",
                description="Determine whether municipal, state, or central authority holds jurisdiction over the matter."
            ),
            ActionStep(
                step=3,
                title="Submit Formal Grievance",
                description="Lodge an application on CPGRAMS or your State Public Grievance Portal."
            ),
            ActionStep(
                step=4,
                title="Track Resolution & Keep Records",
                description="Retain your grievance registration ID and monitor progress updates through the portal."
            ),
        ]
        documents_or_evidence = [
            "Detailed written statement explaining the issue and requested remedy",
            "Any relevant correspondence, photos, receipts, or official notices",
            "Government-issued photo identification proof"
        ]
        escalation_option = "File an appeal with the Nodal Officer of the Public Grievance Cell or submit an RTI application seeking official file status."
        sources = [
            {"title": "Right to Information Act, 2005", "type": "Legislation", "detail": "Section 6 - Filing public authority information requests", "url": "https://rti.gov.in"},
            {"title": "Centralized Public Grievance Redress System (CPGRAMS)", "type": "Process Guide", "detail": "Unified portal grievance submission & escalation guidelines", "url": "https://pgportal.gov.in"},
            {"title": "Citizen Charter & District Services Framework", "type": "Policy Standard", "detail": "General administrative grievance resolution standards", "url": "https://services.india.gov.in"}
        ]

    disclaimer = "This guidance is generated for informational purposes to assist citizens in navigating public procedures. It does not constitute formal legal advice. Timelines, procedural steps, and specific escalation officers vary by jurisdiction; always verify current requirements with your local public authority."

    return GuidanceResponse(
        problem_summary=problem_summary,
        category=category,
        suggested_authority=suggested_authority,
        action_steps=action_steps,
        documents_or_evidence=documents_or_evidence,
        escalation_option=escalation_option,
        disclaimer=disclaimer,
        understanding=problem_summary,
        guidance=f"For your query, the primary authority responsible is typically the {suggested_authority}. Follow the step-by-step action plan to address your grievance effectively.",
        sources=sources
    )
