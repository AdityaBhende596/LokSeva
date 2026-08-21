export interface RTIRequestPayload {
  applicant_name: string;
  department: string;
  location: string;
  information_requested: string;
  time_period: string;
}

export interface RTIResponseData {
  disclaimer: string;
  subject: string;
  draft: string;
}

export async function fetchRTIDraft(payload: RTIRequestPayload): Promise<RTIResponseData> {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
  try {
    const response = await fetch(`${API_URL}/api/rti`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // Network fallback handled below
  }

  const applicant = payload.applicant_name.trim() || 'Citizen Applicant';
  const dept = payload.department.trim() || 'Public Authority / Designated Office';
  const loc = payload.location.trim() || 'Concerned Jurisdiction';
  const period = payload.time_period.trim() || 'Recent period to present';
  const info = payload.information_requested.trim() || 'Details and official records of civic project expenditure.';

  const draft = `To,
The Public Information Officer
${dept}

Subject: Request for information under the Right to Information Act, 2005

Sir/Madam,

I, ${applicant}, request the following information concerning ${loc} for the period ${period}:

1. ${info}
2. Certified copies of approved work estimates, administrative sanctions, and tender notifications.
3. Daily progress reports, measurement book (MB) entries, and quality inspection certificates.
4. Total funds allocated, sanctioned, released, and paid to contractors along with payment vouchers.

Please provide the available information in accordance with statutory procedures under Section 6 of the RTI Act, 2005.

Yours faithfully,
${applicant}
Address/Location: ${loc}`;

  return {
    disclaimer: 'Prototype draft — not legal advice. Verify current official requirements before submitting.',
    subject: 'Request for information under the Right to Information Act, 2005',
    draft,
  };
}
