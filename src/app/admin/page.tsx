import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { getLatestCommit } from '@/lib/github';

export const dynamic = 'force-dynamic';

const QUICK_LINKS = [
  { href: '/admin/personal', label: 'Personal', desc: 'Name, bio, contact details, résumé PDF.' },
  { href: '/admin/projects', label: 'Projects', desc: 'Selected work — add, reorder, upload images.' },
  { href: '/admin/experience', label: 'Experience', desc: 'Roles, dates, bullet impact lines.' },
  { href: '/admin/skills', label: 'Skills', desc: 'Frontend / Backend / Databases / Tooling.' },
  { href: '/admin/now', label: 'Now', desc: 'What you’re building, reading, listening to.' },
  { href: '/admin/contact', label: 'Contact', desc: 'Heading, availability pill, Cal.com link.' },
];

export default async function AdminOverview() {
  let lastCommit: Awaited<ReturnType<typeof getLatestCommit>> = null;
  let commitError: string | null = null;
  try {
    lastCommit = await getLatestCommit();
  } catch (e: unknown) {
    commitError = e instanceof Error ? e.message : 'GitHub unreachable';
  }

  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
        Editor / Overview
      </div>
      <h1 className="mt-2 font-display text-5xl font-light leading-[0.95] tracking-[-0.02em] text-text">
        What would you like to edit<span className="text-accent">?</span>
      </h1>

      <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-text-muted">
        Each section below saves directly to GitHub. Vercel rebuilds the live site in about 30 seconds after every commit.
      </p>

      {/* Last commit panel */}
      <div className="mt-10 border border-border bg-bg-elev p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
          Last commit
        </div>
        {commitError ? (
          <div className="mt-2 font-mono text-xs text-red-300">{commitError}</div>
        ) : lastCommit ? (
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="font-mono text-sm text-text">
              {lastCommit.message.split('\n')[0]}
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
              <span>{lastCommit.author}</span>
              <span>{new Date(lastCommit.date).toLocaleString()}</span>
              <a
                href={lastCommit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-muted hover:text-accent"
              >
                {lastCommit.sha.slice(0, 7)} <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-2 font-mono text-xs text-text-dim">No commits yet.</div>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex flex-col gap-2 bg-bg p-6 transition-colors hover:bg-bg-elev"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-text">{l.label}</span>
              <ArrowUpRight
                className="h-4 w-4 text-text-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden
              />
            </div>
            <span className="font-mono text-xs text-text-muted">{l.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
