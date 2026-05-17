'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || `Sign-in failed (${res.status})`);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="relative w-full max-w-sm">
        {/* Corner ticks — same brand language as the Hero credentials card */}
        <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-accent" aria-hidden />
        <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-accent" aria-hidden />
        <span className="pointer-events-none absolute left-0 bottom-0 h-3 w-3 border-l border-b border-accent" aria-hidden />
        <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r border-b border-accent" aria-hidden />

        <div className="border border-border bg-bg-elev p-7 md:p-9">
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Lovish Sharma · Editor
          </div>
          <h1 className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-text">
            Sign in<span className="text-accent">.</span>
          </h1>
          <p className="mt-3 font-mono text-xs text-text-muted">
            Enter the access code to edit content.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Access code
              </span>
              <div
                className={`flex items-center gap-2 border bg-bg px-3 transition-colors ${
                  focused ? 'border-accent ring-1 ring-accent/40' : 'border-border'
                }`}
              >
                <Lock
                  className={`h-3.5 w-3.5 transition-all ${
                    focused ? 'animate-pulse text-accent' : 'text-text-dim'
                  }`}
                  aria-hidden
                />
                <input
                  type="password"
                  autoFocus
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="w-full bg-transparent py-2.5 font-mono text-sm text-text outline-none placeholder:text-text-dim"
                  placeholder="••••••••"
                />
              </div>
            </label>

            {error && (
              <div
                role="alert"
                className="border border-red-400/40 bg-red-500/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || password.length === 0}
              className="inline-flex h-10 w-full items-center justify-center gap-2 border border-accent bg-accent px-4 font-mono text-xs uppercase tracking-[0.22em] text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
              {loading ? 'Verifying…' : 'Sign in'}
            </button>

            <div className="pt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
              Lovish Sharma · Editor · 12-hour session
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
