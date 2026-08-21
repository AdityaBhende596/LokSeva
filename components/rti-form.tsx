'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, CheckCircle2, Download, Pencil, RefreshCw } from 'lucide-react';
import { useAuth } from './auth-context';
import { Button } from './ui';
import { fetchRTIDraft, RTIResponseData } from '@/lib/api/rti';

const fields = [
  ['What information do you need?', 'For example: approved estimate, work order and completion status for the road project.'],
  ['Which department/public authority?', 'Enter department or authority name (e.g. Municipal Corporation, Public Works Department)'],
  ['Location', 'City, ward, village or project location'],
  ['Time period', 'For example: January 2024 to present, or FY 2024-2025'],
  ['Applicant details', 'Full name and contact address'],
];

export function RTIForm() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const initialQuestion = searchParams?.get('question') || searchParams?.get('info') || '';

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
  const [draftData, setDraftData] = useState<RTIResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAnswers((prev) => {
      const next = [...prev];
      if (initialQuestion && !next[0]) {
        next[0] = initialQuestion;
      }
      if (user && !next[4]) {
        next[4] = user.name || user.email || '';
      }
      return next;
    });
  }, [initialQuestion, user]);

  const updateAnswer = (val: string) => {
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
  };

  const generateDraft = async (customAnswers?: string[]) => {
    const current = customAnswers || answers;
    setLoading(true);
    try {
      const result = await fetchRTIDraft({
        information_requested: current[0] || 'Information regarding public project expenditure and records.',
        department: current[1] || 'Public Information Officer / Municipal Department',
        location: current[2] || 'Concerned Ward / Jurisdiction',
        time_period: current[3] || 'Recent financial year to present',
        applicant_name: current[4] || user?.name || user?.email || 'Citizen Applicant',
      });
      setDraftData(result);
    } catch (err) {
      // Handled in fetchRTIDraft fallback
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setDone(true);
  };

  const handleStepClick = (targetStep: number) => {
    setStep(targetStep);
    setDone(false);
    setDraftData(null);
  };

  const handleDownloadPDF = () => {
    const applicant = answers[4] || user?.name || user?.email || 'Applicant';
    const department = answers[1] || 'Public Authority';
    const location = answers[2] || 'Location';
    const period = answers[3] || 'Period';
    const info = answers[0] || 'Information requested';

    const printContent = draftData?.draft || `To,\nThe Public Information Officer\n${department}\n\nSubject: Request for Information under the Right to Information Act, 2005\n\nSir/Madam,\n\nI, ${applicant}, request the following information concerning ${location} for the period ${period}:\n\n${info}\n\nPlease provide the available information in accordance with applicable procedure.\n\nYours faithfully,\n${applicant}`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>RTI Application - ${applicant}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; color: #10233f; line-height: 1.6; }
              .content { white-space: pre-wrap; font-size: 14px; }
              .footer { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
            </style>
          </head>
          <body>
            <div class="content">${printContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <div class="footer">Generated via LokSeva RTI Assistant</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <main className="container py-10 sm:py-16">
      <p className="eyebrow">Document assistant</p>
      <h1 className="display mt-3 text-4xl font-bold sm:text-5xl">RTI Application Assistant</h1>
      <p className="mt-3 text-ink/65">Answer a few questions and LokSeva will structure your request.</p>

      <div className="mt-10 flex max-w-2xl justify-between" aria-label="Form progress">
        {fields.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => handleStepClick(i)}
            className="flex flex-col items-center gap-2 focus:outline-none"
            title={`Go to Step ${i + 1}`}
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition ${
                i === step && !done
                  ? 'bg-ink text-white ring-4 ring-ink/10'
                  : i < step || done
                  ? 'bg-sage text-white'
                  : 'border border-line bg-white text-ink/50'
              }`}
            >
              {i < step || done ? <Check size={15} /> : i + 1}
            </span>
            <span className="hidden text-[10px] font-medium text-ink/50 sm:block">Step {i + 1}</span>
          </button>
        ))}
      </div>

      <div className="mt-7 h-1 max-w-2xl overflow-hidden rounded bg-line">
        <div
          className="h-full bg-sage transition-all duration-300"
          style={{ width: `${done ? 100 : ((step + 1) / 5) * 100}%` }}
        />
      </div>

      {!done ? (
        <section className="card mt-8 max-w-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-sage">STEP {step + 1} OF 5</p>
            {answers[step] && (
              <span className="flex items-center gap-1 text-xs font-medium text-sage">
                <CheckCircle2 size={14} /> Answered
              </span>
            )}
          </div>

          <label htmlFor="rti-field" className="mt-4 block text-xl font-bold">
            {fields[step][0]}
          </label>
          <textarea
            id="rti-field"
            value={answers[step] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            className="mt-4 min-h-32 w-full rounded-xl border border-line bg-mist p-4 text-sm outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10"
            placeholder={fields[step][1]}
          />

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-sm font-bold text-ink/70 hover:text-ink disabled:opacity-30"
              disabled={!step}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => (step === 4 ? handlePreview() : setStep(step + 1))}
              className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-blue"
            >
              {step === 4 ? 'Preview Application' : 'Continue'}
            </button>
          </div>
        </section>
      ) : (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-10">
            <p className="text-right text-sm font-medium text-ink/60">
              Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <p className="mt-8 text-sm leading-6">
              To,<br />
              <strong className="text-ink">The Public Information Officer</strong><br />
              <span className="font-semibold text-blue">{answers[1] || '[Department / Public Authority]'}</span>
            </p>

            <h2 className="mt-7 text-center font-bold text-ink underline underline-offset-4">
              Subject: Request for Information under the Right to Information Act, 2005
            </h2>

            <div className="mt-7 space-y-4 text-sm leading-7 text-ink/80">
              <p>Sir/Madam,</p>

              <div className="rounded-xl border border-line/70 bg-mist/60 p-4 font-mono text-xs leading-6 text-ink">
                {draftData?.draft ? (
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-6">{draftData.draft}</pre>
                ) : (
                  <div>
                    <p className="font-sans text-sm leading-6">
                      I, <strong className="text-ink">{answers[4] || user?.name || user?.email || '[Applicant Name]'}</strong>,
                      residing at <span className="font-semibold">{answers[2] || '[Location]'}</span>, hereby request the following information concerning the period <span className="font-semibold">{answers[3] || '[Time Period]'}</span>:
                    </p>
                    <p className="mt-3 font-semibold text-ink">{answers[0] || '[Information Requested]'}</p>
                  </div>
                )}
              </div>

              <p>
                Please provide the requested information in accordance with applicable statutory procedures under Section 6 of the RTI Act, 2005.
              </p>

              {draftData?.disclaimer && (
                <p className="mt-4 border-t border-line/60 pt-3 text-xs italic text-ink/50">
                  Note: {draftData.disclaimer}
                </p>
              )}
            </div>

            <p className="mt-8 text-sm text-ink">
              Yours faithfully,<br />
              <strong className="mt-1 block font-bold">{answers[4] || user?.name || user?.email || '[Applicant Name]'}</strong>
              <span className="block text-xs text-ink/60">{answers[2] || '[Location]'}</span>
            </p>

            {/* Answer Summary Pills for quick edits */}
            <div className="mt-10 border-t border-line pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Summary of Submitted Responses</p>
              <ul className="mt-3 space-y-2">
                {fields.map((f, idx) => (
                  <li key={idx} className="flex items-center justify-between rounded-lg bg-mist px-3.5 py-2 text-xs">
                    <span className="max-w-[200px] truncate font-semibold text-ink/70">{f[0]}</span>
                    <span className="mx-2 max-w-[220px] truncate font-bold text-ink">
                      {answers[idx] || <span className="italic text-ink/40">Not provided</span>}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className="shrink-0 font-bold text-blue hover:underline"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="card h-fit p-5 space-y-4">
            <div>
              <p className="text-sm font-bold text-ink">Draft Preview & Actions</p>
              <p className="mt-1 text-xs leading-5 text-ink/60">
                Verify details and official requirements before submitting your RTI application.
              </p>
            </div>

            <div className="grid gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  setStep(0);
                  setDraftData(null);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-mist"
              >
                <Pencil size={15} /> Edit Answers
              </button>

              <Button
                onClick={() => generateDraft()}
                disabled={loading}
                className="w-full justify-center"
              >
                {loading ? <RefreshCw size={15} className="animate-spin" /> : 'Generate Draft'}
              </Button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-mist"
              >
                <Download size={15} /> Download PDF
              </button>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
