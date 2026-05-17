'use client';

import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';

const formatDate = (raw: string) => {
  if (raw === 'Present') return 'Present';
  const [year, month] = raw.split('-');
  if (!month) return year;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(month) - 1]} ${year}`;
};

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="border-t border-border px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-2">
            <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              <div>(04)</div>
              <div className="mt-1">Experience</div>
            </div>
          </div>

          <div className="md:col-span-10">
            <h2
              id="experience-heading"
              className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text text-[clamp(2.5rem,6vw,5rem)]"
            >
              <RevealText splitBy="words" stagger={0.05}>
                Where I&apos;ve shipped.
              </RevealText>
            </h2>
          </div>
        </div>

        {/* Sticky-rail layout: company on the left, roles stack on the right */}
        <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <FadeIn>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">Company</div>
                <h3 className="mt-3 font-display text-3xl leading-[1.05] text-text md:text-4xl">
                  Microchip Technology
                </h3>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                  Bangalore, India · 2024 — Present
                </div>
                <p className="mt-6 max-w-xs text-sm leading-[1.6] text-text-muted">
                  Search and discovery for microchip.com — making a deep
                  product catalog easier to navigate for customers and editors.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="md:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {experience.map((role) => (
                <li key={role.id} className="py-10">
                  <FadeIn>
                    <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-6">
                      <h4 className="font-display text-2xl text-text md:text-3xl">
                        {role.position}
                      </h4>
                      <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-dim">
                        {formatDate(role.startDate)} — {formatDate(role.endDate)}
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {role.description.map((line, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[auto_1fr] gap-3 text-base leading-[1.6] text-text md:text-lg"
                        >
                          <span className="mt-2 block h-px w-4 bg-accent shrink-0" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {role.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
