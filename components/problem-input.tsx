'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { prompts } from '@/lib/mock-data';

export function ProblemInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = () => {
    const question = value.trim();
    if (!question || question.length < 3) {
      setError('Tell us a little about what happened so we can guide you.');
      return;
    }
    router.push(`/guidance?question=${encodeURIComponent(question)}`);
  };

  return (
    <div className="card mt-9 p-4 shadow-soft sm:p-6">
      <label htmlFor="problem" className="text-lg font-bold">
        What can we help you with?
      </label>
      <textarea
        id="problem"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError('');
        }}
        aria-describedby={error ? 'problem-error' : undefined}
        className="mt-4 min-h-28 w-full resize-none rounded-xl border border-line bg-mist p-4 text-sm leading-6 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10"
        placeholder="Describe your situation in your own words..."
      />
      {error && (
        <p id="problem-error" className="mt-2 text-xs font-semibold text-amber" role="alert">
          {error}
        </p>
      )}
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-ink/55">Try asking</p>
        <button
          onClick={submit}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue/20"
        >
          Get Guidance <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setValue(p);
              if (error) setError('');
            }}
            className="rounded-full border border-line bg-white px-3 py-2 text-left text-xs font-medium text-ink/70 transition hover:border-blue hover:text-blue"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
