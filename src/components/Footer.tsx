'use client';

import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLenis } from '@/components/motion/SmoothScroll';
import { portfolioData } from '@/data/portfolioData';

const REPO_URL = 'https://github.com/Lovish141/portfolio';

const indexLinks = [
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const formatUpdated = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

const Footer = () => {
  const { scrollTo } = useLenis();
  const { personal, contact, social, now } = portfolioData;
  const year = new Date().getFullYear();

  const reachLinks = [
    { label: 'Email', href: `mailto:${personal.email}`, external: false },
    { label: 'Book a call', href: contact.calLink, external: true },
    { label: 'GitHub', href: social.github.url, external: true },
    { label: 'LinkedIn', href: social.linkedin.url, external: true },
    { label: 'Twitter / X', href: social.twitter.url, external: true },
  ];

  return (
    <footer className="relative border-t border-border bg-bg px-6 pb-10 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Closing statement */}
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              <div>(end)</div>
              <div className="mt-1">Footer</div>
            </div>
          </div>

          <div className="md:col-span-10">
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text text-[clamp(2.25rem,5vw,4rem)]">
              Available<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.5] text-text-muted md:text-lg">
              Open for full-stack roles, contracts, and select side projects.{' '}
              <a
                href={`mailto:${personal.email}`}
                className="text-text underline-offset-4 hover:underline hover:text-accent transition-colors"
              >
                Drop a line
              </a>{' '}
              or{' '}
              <a
                href={contact.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline-offset-4 hover:underline hover:text-accent transition-colors"
              >
                pick a time
              </a>
              .
            </p>
          </div>
        </div>

        {/* 3-column grid: Index / Reach / Meta */}
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-2" aria-hidden />

          <div className="md:col-span-10 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {/* Index */}
            <div>
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Index
              </div>
              <ul className="space-y-2">
                {indexLinks.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollTo(`#${l.id}`, { offset: -64 })}
                      className="font-mono text-sm text-text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reach */}
            <div>
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Reach
              </div>
              <ul className="space-y-2">
                {reachLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-1.5 font-mono text-sm text-text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                      {l.external && (
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta */}
            <div>
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Meta
              </div>
              <dl className="space-y-3 font-mono text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-dim">Updated</dt>
                  <dd className="text-text">{formatUpdated(now.updatedAt)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-dim">Location</dt>
                  <dd className="text-text">Bangalore, IN</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-dim">Replies in</dt>
                  <dd className="text-text">~24h</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-dim">Source</dt>
                  <dd>
                    <a
                      href={REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-text transition-colors hover:text-accent"
                    >
                      GitHub
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span>© {year} Lovish Sharma</span>
            <span aria-hidden>·</span>
            <span>All rights reserved</span>
          </div>
          <button
            onClick={() => scrollTo(0)}
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            data-cursor-hover
          >
            <ArrowUp className="h-3 w-3" aria-hidden /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
