import { ExternalLink, FileText } from 'lucide-react';

const sourceUrlMap: Record<string, string> = {
  'Right to Information Act, 2005': 'https://rti.gov.in',
  'RTI application guidance': 'https://rti.gov.in',
  'Motor Vehicles & Public Works Code': 'https://morth.nic.in',
  'CPGRAMS Infrastructure Grievance Framework': 'https://pgportal.gov.in',
  'Water (Prevention & Control of Pollution) Act, 1974': 'https://cpcb.nic.in',
  'Municipal Water Supply & Sewerage Regulations': 'https://pgportal.gov.in',
  'National Urban Sanitation Policy': 'https://swachhbharatmission.ddws.gov.in',
  'Electricity Act, 2003': 'https://powermin.gov.in',
  'State Electricity Regulatory Commission (SERC) Code': 'https://pgportal.gov.in',
  'Consumer Protection Act, 2019': 'https://consumeraffairs.nic.in',
  'Solid Waste Management Rules, 2016': 'https://cpcb.nic.in',
  'Swachh Bharat Mission (Urban) Framework': 'https://swachhbharatmission.ddws.gov.in',
  'Municipal Solid Waste Bye-Laws': 'https://pgportal.gov.in',
  'Right to Public Services Act (RTS)': 'https://services.india.gov.in',
  'Digital India Service Charter & CSC Guidelines': 'https://services.india.gov.in',
  'Bhartiya Nyaya Sanhita / IPC Public Nuisance Provisions': 'https://mha.gov.in',
  'Prevention of Cruelty to Animals (ABC) Rules': 'https://dahd.nic.in',
  'Municipal Encroachment & Building Regulations': 'https://mohua.gov.in',
  'Centralized Public Grievance Redress System (CPGRAMS)': 'https://pgportal.gov.in',
  'Citizen Charter & District Services Framework': 'https://services.india.gov.in',
};

export function SourceCard({
  title,
  type,
  detail,
  url,
}: {
  title: string;
  type: string;
  detail: string;
  url?: string;
}) {
  const targetUrl = url || sourceUrlMap[title] || 'https://rti.gov.in';
  const isDemo = detail.toLowerCase().includes('demo') || detail.toLowerCase().includes('placeholder');

  return (
    <article className="rounded-xl border border-line bg-white p-4">
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue">
          <FileText size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm">{title}</p>
          <p className="mt-1 text-xs text-ink/55">
            {type} · {detail}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue hover:underline"
            >
              View source <ExternalLink size={12} />
            </a>
            {isDemo && (
              <span className="text-[10px] font-medium text-ink/40">Demonstration source</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}


