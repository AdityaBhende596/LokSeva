'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brand } from './brand';
import { useAuth } from './auth-context';

const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

export function AuthScreen({ mode }: { mode: 'login' | 'signup' }) {
  const create = mode === 'signup';
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/${create ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(create ? { name, email, password } : { email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.detail || 'Something went wrong. Please try again.');
        return;
      }
      if (create) {
        router.push('/login?created=1');
        return;
      }
      setAuth(data.access_token, data.user);
      router.push('/');
    } catch {
      setError('Unable to reach LokSeva. Please check that the service is running.');
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid min-h-screen place-items-center bg-mist p-5"><section className="w-full max-w-md rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-9"><Brand/><p className="eyebrow mt-10">Prototype access</p><h1 className="display mt-3 text-4xl font-bold">{create ? 'Create your account' : 'Welcome back'}</h1><p className="mt-3 text-sm leading-6 text-ink/60">{create ? 'Create an account to save guidance in a future version of LokSeva.' : 'Sign in to continue with LokSeva.'}</p><form className="mt-7 grid gap-4" onSubmit={submit}>{create && <label className="text-sm font-bold">Name<input required minLength={2} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-mist p-3 font-normal outline-none focus:border-blue focus:ring-4 focus:ring-blue/10" placeholder="Your name" /></label>}<label className="text-sm font-bold">Email<input required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-mist p-3 font-normal outline-none focus:border-blue focus:ring-4 focus:ring-blue/10" type="email" placeholder="you@example.com" /></label><label className="text-sm font-bold">Password<input required minLength={8} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-mist p-3 font-normal outline-none focus:border-blue focus:ring-4 focus:ring-blue/10" type="password" placeholder="••••••••" /></label>{error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}<button disabled={loading} type="submit" className="mt-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60">{loading ? (create ? 'Creating account…' : 'Logging in…') : (create ? 'Create account' : 'Log in')}</button></form><p className="mt-6 text-center text-sm text-ink/60">{create ? 'Already have an account?' : 'New to LokSeva?'} <Link className="font-bold text-blue" href={create ? '/login' : '/signup'}>{create ? 'Log in' : 'Get started'}</Link></p><Link href="/" className="mt-7 block text-center text-sm font-semibold text-ink/60">Back to LokSeva</Link></section></main>;
}
