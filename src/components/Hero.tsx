'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import MagneticButton from '@/components/motion/MagneticButton';
import { useLenis } from '@/components/motion/SmoothScroll';
import { type MouseEvent } from 'react';

const Hero = () => {
  const { scrollTo } = useLenis();

  const onJump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo(`#${id}`, { offset: -64 });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col px-6 pb-12 pt-24 md:px-10 md:pt-28"
      aria-labelledby="hero-heading"
    >
      {/* Main split */}
      <div className="flex flex-1 flex-col gap-12 md:flex-row md:items-end md:gap-10 lg:gap-16">
        {/* LEFT: name + subhead + CTAs */}
        <div className="flex-1">
          <h1
            id="hero-heading"
            className="font-display font-light leading-[0.85] tracking-[-0.04em] text-text"
          >
            <span className="block text-[clamp(2.75rem,10vw,11rem)]">
              <RevealText splitBy="chars" stagger={0.045} delay={0.1}>
                LOVISH
              </RevealText>
            </span>
            <span className="block text-[clamp(2.75rem,10vw,11rem)]">
              <RevealText splitBy="chars" stagger={0.045} delay={0.4}>
                SHARMA
              </RevealText>
              <motion.span
                aria-hidden
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-accent"
              >
                .
              </motion.span>
            </span>
          </h1>

          {/* Subhead */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-baseline"
          >
            <span className="hidden md:col-span-1 md:block">
              <span className="block h-px w-12 bg-border-strong" />
            </span>
            <p className="md:col-span-10 max-w-xl text-lg leading-[1.5] text-text md:text-xl">
              Software engineer building{' '}
              <span className="font-display italic text-text">scalable</span> web
              platforms at Microchip, India.
            </p>
          </motion.div>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {portfolioData.contact.availability}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#work"
              onClick={onJump('work')}
              className="border border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg hover:bg-accent-hover transition-colors"
            >
              See selected work →
            </MagneticButton>
            <MagneticButton
              href="#about"
              onClick={onJump('about')}
              className="border border-border-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text hover:border-text transition-colors"
            >
              Read my approach
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT: press-credentials card */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full shrink-0 md:w-[320px] lg:w-[360px]"
          aria-label="Quick facts"
        >
          {/* Corner ticks */}
          <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-accent" aria-hidden />
          <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-accent" aria-hidden />
          <span className="pointer-events-none absolute left-0 bottom-0 h-3 w-3 border-l border-b border-accent" aria-hidden />
          <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r border-b border-accent" aria-hidden />

          <div className="border border-border bg-bg-elev/50 p-6 backdrop-blur-sm md:p-7">
            {/* Header line */}
            <div className="border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
              Credentials
            </div>

            {/* Currently */}
            <div className="mt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Currently
              </div>
              <div className="mt-1.5 font-display text-xl leading-tight text-text">
                Software Engineer&nbsp;I
              </div>
              <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Microchip Technology
              </div>
            </div>

            {/* Impact */}
            <div className="mt-6 border-t border-border pt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Recent impact
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-5xl font-light leading-none tracking-[-0.03em] text-accent">
                  +22%
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  search<br />relevancy
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="mt-6 border-t border-border pt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Based in
              </div>
              <div className="mt-1.5 flex items-baseline justify-between gap-3">
                <span className="font-display text-xl text-text">Bangalore</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
                  IN · UTC+5:30
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 border-t border-border pt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                Status
              </div>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-success">
                  Available
                </span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                For select projects
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;
