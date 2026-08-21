import { guidance } from '@/lib/mock-data';

export interface ActionStep {
  step: number;
  title: string;
  description: string;
}

export interface GuidanceResponseData {
  problem_summary: string;
  category: string;
  suggested_authority: string;
  action_steps: ActionStep[];
  documents_or_evidence: string[];
  escalation_option: string;
  disclaimer: string;
  understanding?: string;
  guidance?: string;
  sources?: { title: string; type: string; detail: string; url?: string }[];
}

export async function fetchGuidance(question: string): Promise<GuidanceResponseData> {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
  const response = await fetch(`${API_URL}/api/guidance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `Failed to fetch guidance (status ${response.status})`);
  }

  return response.json();
}

export async function getGuidance() { return guidance; }
export async function getSources() { return guidance.sources; }
export async function generateRTI() { return { status: 'draft-ready' as const }; }
