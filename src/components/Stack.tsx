'use client';

import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';
import type { Skill } from '@/lib/types';

const groups: { key: 'frontend' | 'backend' | 'databases' | 'tooling'; label: string; index: string }[] = [
  { key: 'frontend', label: 'Frontend', index: 'A' },
  { key: 'backend', label: 'Backend', index: 'B' },
  { key: 'databases', label: 'Databases', index: 'C' },
  { key: 'tooling', label: 'Tooling', index: 'D' },
];

const SkillRow = ({ skill }: { skill: Skill }) => (
  <li className="border-b border-border py-3">
    <span
      className={`font-mono text-sm ${
        skill.atWork ? 'text-accent' : 'text-text'
      }`}
      aria-label={skill.atWork ? `${skill.name}, currently using at work` : skill.name}
    >
      {skill.name}
    </span>
  </li>
);

const Stack = () => {
  const { skills } = portfolioData;

  return (
    <section
      id="stack"
      className="border-t border-border px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="stack-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-2">
            <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              <div>(02)</div>
              <div className="mt-1">Stack</div>
            </div>
          </div>

          <div className="md:col-span-10">
            <h2
              id="stack-heading"
              className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text text-[clamp(2.5rem,6vw,5rem)]"
            >
              <RevealText splitBy="words" stagger={0.05}>
                Tools of the trade.
              </RevealText>
            </h2>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
              In <span className="text-accent">amber</span> — currently using at work.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group, idx) => (
                <FadeIn key={group.key} delay={0.1 + idx * 0.08}>
                  <div>
                    <div className="mb-6 flex items-baseline justify-between border-b border-border-strong pb-3">
                      <h3 className="font-display text-2xl text-text">{group.label}</h3>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
                        {group.index}
                      </span>
                    </div>
                    <ul>
                      {skills[group.key].map((s) => (
                        <SkillRow key={s.name} skill={s} />
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
