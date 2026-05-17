'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';
import MagneticButton from '@/components/motion/MagneticButton';
import type { Project } from '@/lib/types';

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const isReversed = index % 2 === 1;
  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <FadeIn delay={0.05}>
      <article
        className={`grid grid-cols-1 gap-8 py-16 md:grid-cols-12 md:gap-12 md:py-24 ${
          isReversed ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Text */}
        <div className="md:col-span-5 md:flex md:flex-col md:justify-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
            {indexLabel} / {String(portfolioData.projects.length).padStart(2, '0')}
          </div>

          <h3 className="mt-3 font-display font-light leading-[0.95] tracking-[-0.02em] text-text text-[clamp(2.25rem,4.5vw,4rem)]">
            <RevealText splitBy="words" stagger={0.05}>
              {project.title}
            </RevealText>
          </h3>

          <div className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            {project.role} · {project.year}
            {project.featured && <span className="ml-3 text-accent">● Featured</span>}
          </div>

          <p className="mt-6 max-w-md text-base leading-[1.6] text-text-muted md:text-lg">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <MagneticButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.2em] text-text hover:text-accent transition-colors"
            >
              Visit live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </MagneticButton>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted hover:text-text transition-colors"
              data-cursor-hover
            >
              Source <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-7">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[4/3] overflow-hidden border border-border bg-bg-elev"
            data-cursor-hover
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority={index === 0}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-start justify-between bg-bg-elev p-8 md:p-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
                  {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </div>
                <div className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.85] tracking-[-0.04em] text-text">
                  {project.title}
                  <span className="text-accent">.</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-bg/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {project.image && (
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-text opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="bg-bg/70 px-2 py-1 backdrop-blur-sm">
                  {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
              </div>
            )}
          </motion.div>
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
