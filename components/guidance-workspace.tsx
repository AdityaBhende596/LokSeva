'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  FileCheck,
  FileText,
  Loader2,
  RefreshCw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { fetchGuidance, GuidanceResponseData } from '@/lib/api/guidance';
import { categoryMap, categories } from '@/lib/mock-data';
import { Badge, Button } from './ui';
import { SourceCard } from './source-card';

export function GuidanceWorkspace() {
  const searchParams = useSearchParams();
  const categoryKey = searchParams?.get('category') || '';
  const initialQuestion = searchParams?.get('question') || '';

  const activeCategory = categoryKey ? categoryMap[categoryKey.toLowerCase()] : null;

  const [question, setQuestion] = useState(initialQuestion);
  const [inputVal, setInputVal] = useState(initialQuestion);
  const [data, setData] = useState<GuidanceResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultExamples = [
    'Potholes on main road',
    'Contaminated drinking water',
    'Delayed birth certificate',
    'Frequent power outages',
    'Uncollected garbage in locality',
    'Stray dog nuisance & safety',
  ];

  const exampleList = activeCategory ? activeCategory.examples : defaultExamples;

  const loadGuidance = async (q: string) => {
    if (!q || q.trim().length < 3) {
      setError('Please provide a more detailed question (at least 3 characters) describing your civic issue.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGuidance(q.trim());
      setData(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to load guidance. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const qParam = searchParams?.get('question') || '';
    if (qParam) {
      setQuestion(qParam);
      setInputVal(qParam);
      loadGuidance(qParam);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (trimmed.length < 3) {
      setError('Please provide a more detailed question (at least 3 characters) describing your civic issue.');
      return;
    }
    setQuestion(trimmed);
    loadGuidance(trimmed);
  };

  const handleExampleClick = (ex: string) => {
    setInputVal(ex);
    setQuestion(ex);
    loadGuidance(ex);
  };

  return (
    <main className="container py-8 sm:py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-ink/65 hover:text-ink">
        <ArrowLeft size={16} /> Back home
      </Link>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">
            {activeCategory ? `LokSeva Guidance · ${activeCategory.title}` : 'LokSeva Guidance'}
          </p>
          <h1 className="display mt-2 text-4xl font-bold">
            {activeCategory ? activeCategory.title : 'A clearer path forward.'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-ink/65 max-w-2xl">
            {activeCategory
              ? activeCategory.description
              : 'Understand civic procedures, authority routing, and your next steps.'}
          </p>
        </div>
        <Badge>Live Backend Guidance</Badge>
      </div>

      {/* Category Pills Bar */}
      <div className="mt-6 flex flex-wrap gap-2" aria-label="Guidance Categories">
        <Link
          href="/guidance"
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            !activeCategory
              ? 'bg-ink text-white shadow-xs'
              : 'border border-line bg-white text-ink/70 hover:border-ink/40'
          }`}
        >
          All Guidance
        </Link>
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/guidance?category=${c.key}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory?.key === c.key
                ? 'bg-ink text-white shadow-xs'
                : 'border border-line bg-white text-ink/70 hover:border-ink/40'
            }`}
          >
            {c.title}
          </Link>
        ))}
      </div>

      {/* Query Bar */}
      <div className="mt-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              activeCategory
                ? `Type your question about ${activeCategory.title.toLowerCase()}...`
                : 'Type your civic question (e.g. potholes, water leak, delayed certificate)...'
            }
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-blue disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Get Guidance'}
          </button>
        </form>

        {/* Suggested Examples Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ink/50">
            {activeCategory ? `Suggested for ${activeCategory.title}:` : 'Suggested Examples:'}
          </span>
          {exampleList.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => handleExampleClick(ex)}
              className="rounded-full border border-line/80 bg-mist px-3 py-1 text-xs font-medium text-ink/75 transition hover:border-blue hover:bg-white hover:text-blue"
            >
              Try: &quot;{ex}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="mt-8 space-y-6">
          <div className="card animate-pulse p-6">
            <div className="h-4 w-32 rounded bg-mist"></div>
            <div className="mt-4 h-6 w-3/4 rounded bg-mist"></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="h-12 rounded bg-mist"></div>
              <div className="h-12 rounded bg-mist"></div>
              <div className="h-12 rounded bg-mist"></div>
            </div>
          </div>
          <div className="card animate-pulse p-6 space-y-4">
            <div className="h-6 w-48 rounded bg-mist"></div>
            <div className="h-4 w-full rounded bg-mist"></div>
            <div className="h-4 w-5/6 rounded bg-mist"></div>
            <div className="h-20 w-full rounded bg-mist"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="mt-8 rounded-2xl border border-amber/30 bg-amber/5 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 shrink-0 text-amber" size={24} />
            <div>
              <h2 className="text-lg font-bold text-ink">Unable to fetch guidance</h2>
              <p className="mt-1 text-sm text-ink/70">{error}</p>
              {question && question.length >= 3 && (
                <button
                  onClick={() => loadGuidance(question)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white transition hover:bg-blue"
                >
                  <RefreshCw size={14} /> Retry Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Informational Example Preview when no query is active */}
      {!loading && !error && !question && (
        <div className="mt-8 card p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-sage">Example Guidance</span>
              <h2 className="display mt-2 text-2xl font-bold sm:text-3xl">From confusion to a clear next step.</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">
                Type your civic question above or select one of the suggested examples to see a structured action plan, suggested public authority, required evidence, and relevant sources.
              </p>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-line bg-mist/60 p-5">
              <div className="flex justify-between text-xs text-ink/50 font-semibold">
                <span>Illustrative Sample</span>
                <span className="text-sage font-bold">Live Prototype</span>
              </div>
              <p className="mt-2 text-sm font-bold text-ink">What LokSeva Provides</p>
              <ul className="mt-3 space-y-2 text-xs text-ink/75">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  <span>Problem summary & responsible public authority</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  <span>Step-by-step action plan & escalation routes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  <span>Personalized RTI application draft generator</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Guidance Output State */}
      {!loading && !error && data && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Summary & Understanding Card */}
            <section className="card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Your Question</p>
              <p className="mt-3 text-lg font-semibold">“{question}”</p>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-bold">Here’s what LokSeva understands</p>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-ink/50">Category</dt>
                    <dd className="mt-1 text-sm font-bold text-sage">{data.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink/50">Suggested Authority</dt>
                    <dd className="mt-1 text-sm font-bold text-blue flex items-center gap-1.5">
                      <Building2 size={16} /> {data.suggested_authority}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 rounded-xl bg-mist p-4 text-sm text-ink/75">
                  <span className="font-semibold text-ink">Problem Summary: </span>
                  {data.problem_summary}
                </div>
              </div>
            </section>

            {/* Action Steps Card */}
            <section className="card p-6">
              <h2 className="display text-3xl font-bold">Your Action Plan</h2>
              <p className="mt-2 text-sm text-ink/60">Recommended sequential steps to resolve your civic problem.</p>

              <ol className="mt-6 space-y-3">
                {data.action_steps.map((x) => (
                  <li className="flex gap-4 rounded-xl border border-line/60 bg-white p-4 transition hover:bg-mist" key={x.step}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage/10 text-sm font-bold text-sage">
                      0{x.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{x.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink/65">{x.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Required Documents & Evidence Card */}
            {data.documents_or_evidence && data.documents_or_evidence.length > 0 && (
              <section className="card p-6">
                <div className="flex items-center gap-2">
                  <FileCheck size={20} className="text-sage" />
                  <h2 className="text-xl font-bold">Documents & Evidence Required</h2>
                </div>
                <ul className="mt-4 space-y-2">
                  {data.documents_or_evidence.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3 rounded-lg bg-mist/70 p-3 text-sm text-ink/80">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sage" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Escalation Path Card */}
            {data.escalation_option && (
              <section className="rounded-2xl border border-blue/20 bg-blue/5 p-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={20} className="text-blue" />
                  <h2 className="text-lg font-bold text-ink">Escalation & Further Remedies</h2>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/75">{data.escalation_option}</p>
              </section>
            )}

            {/* Sources Card */}
            {data.sources && data.sources.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold">Trusted Framework & Sources</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {data.sources.map((s) => (
                    <SourceCard key={s.title} {...s} />
                  ))}
                </div>
              </section>
            )}

            {/* RTI Callout Banner */}
            <section className="rounded-2xl bg-ink p-7 text-white">
              <Sparkles className="text-[#b8dac9]" />
              <h2 className="display mt-4 text-3xl font-bold">Ready to take the next step?</h2>
              <p className="mt-2 text-sm text-white/65">
                Turn this guidance into a structured RTI application to seek official government records.
              </p>
              <Button href={question ? `/rti?question=${encodeURIComponent(question)}` : "/rti"} className="mt-6 bg-white text-ink hover:bg-[#e2ede7]">
                Generate RTI Application
              </Button>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-24">
            <p className="text-sm font-bold">Confidence & Relevance</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-mist">
              <div className="h-full w-4/5 rounded-full bg-sage" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-sage">
              <CheckCircle2 size={17} /> Structured Guidance
            </div>
            <p className="mt-3 text-xs leading-5 text-ink/55">
              Reflects domain guidance for citizen complaints. Always verify details with official officers.
            </p>

            {/* Responsible AI Notice / Disclaimer */}
            <div className="mt-7 border-t border-line pt-5">
              <FileText size={18} className="text-blue" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-ink/50">Disclaimer</p>
              <p className="mt-2 text-xs leading-5 text-ink/60">{data.disclaimer}</p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
