'use client';

import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';
import MagneticButton from '@/components/motion/MagneticButton';
import type { Project } from '@/lib/types';

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const indexLabel = String(index + 1).padStart(2, '0');
  const totalLabel = String(portfolioData.projects.length).padStart(2, '0');

  return (
    <FadeIn delay={0.05}>
      <article className="grid grid-cols-1 gap-y-6 py-16 md:grid-cols-12 md:gap-x-12 md:py-24">
        {/* Left rail: index */}
        <div className="md:col-span-2">
          <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
            {indexLabel} / {totalLabel}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-10">
          <h3 className="font-display font-light leading-[0.9] tracking-[-0.03em] text-text text-[clamp(3rem,8vw,7rem)]">
            <RevealText splitBy="words" stagger={0.05}>
              {project.title}
            </RevealText>
            <span className="text-accent">.</span>
          </h3>

          <div className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            {project.role} · {project.year}
            {project.featured && <span className="ml-3 text-accent">● Featured</span>}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-[1.6] text-text-muted md:text-lg">
            {project.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {project.liveUrl && (
                <MagneticButton
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.2em] text-text hover:text-accent transition-colors"
                >
                  Visit live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </MagneticButton>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted hover:text-text transition-colors"
                  data-cursor-hover
                >
                  Source <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </FadeIn>
  );
};

const Work = () => {
  const { projects } = portfolioData;

  return (
    <section
      id="work"
      className="border-t border-border px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-2">
            <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              <div>(03)</div>
              <div className="mt-1">Selected work</div>
            </div>
          </div>

          <div className="md:col-span-10">
            <h2
              id="work-heading"
              className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text text-[clamp(2.5rem,6vw,5rem)]"
            >
              <RevealText splitBy="words" stagger={0.05}>
                Recent projects.
              </RevealText>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.6] text-text-muted md:text-lg">
              A small set, deliberately. Each link below is live; source where it&apos;s public.
            </p>
          </div>
        </div>

        <div className="mt-12 divide-y divide-border">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
