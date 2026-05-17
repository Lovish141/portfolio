'use client';

import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';

const formatUpdated = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const Now = () => {
  const { now } = portfolioData;

  const blocks = [
    { label: 'Building', value: now.building },
    { label: 'Reading', value: now.reading },
    { label: 'Listening to', value: now.listening },
  ];

  return (
    <section
      id="now"
      className="border-t border-border px-6 py-24 md:px-10 md:py-40"
      aria-labelledby="now-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-2">
            <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              <div>(05)</div>
              <div className="mt-1">Now</div>
            </div>
          </div>

          <div className="md:col-span-10">
            <h2
              id="now-heading"
              className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text text-[clamp(2.5rem,6vw,5rem)]"
            >
              <RevealText splitBy="words" stagger={0.05}>
                Currently.
              </RevealText>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.6] text-text-muted md:text-lg">
              A quiet snapshot of what&apos;s on my desk this week.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              {blocks.map((b, i) => (
                <FadeIn key={b.label} delay={0.05 + i * 0.07}>
                  <div className="flex h-full flex-col bg-bg p-8 md:p-10">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
                      {b.label}
                    </div>
                    <div className="mt-3 font-display text-2xl leading-snug text-text md:text-3xl">
                      {b.value}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              Last updated: {formatUpdated(now.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Now;
