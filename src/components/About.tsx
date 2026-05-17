'use client';

import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';
import MagneticButton from '@/components/motion/MagneticButton';

const About = () => {
  const { personal } = portfolioData;

  return (
    <section
      id="about"
      className="border-t border-border px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
        {/* Left rail eyebrow */}
        <div className="md:col-span-2">
          <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
            <div>(01)</div>
            <div className="mt-1">About</div>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-10">
          <h2
            id="about-heading"
            className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text text-[clamp(2.5rem,6vw,5rem)]"
          >
            <RevealText splitBy="words" stagger={0.05}>
              A careful pair of hands.
            </RevealText>
          </h2>

          {/* Editorial dek / pull-quote */}
          <FadeIn delay={0.15}>
            <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-6 font-display text-2xl italic leading-[1.35] text-text md:text-3xl lg:text-4xl">
              &ldquo;Code that the next person on the team is happy to inherit.&rdquo;
            </blockquote>
          </FadeIn>

          <div className="mt-14 max-w-3xl space-y-6 text-lg leading-[1.6] text-text-muted md:text-xl">
            {personal.bio.map((p, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.1}>
                <p>{p}</p>
              </FadeIn>
            ))}

            {/* Resume */}
            <FadeIn delay={0.4}>
              <div className="pt-4">
                <MagneticButton
                  href="/LovishSharma_FullStackEngineer_resume.pdf"
                  download
                  className="gap-3 border border-border-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text hover:border-accent hover:text-accent transition-colors"
                >
                  Download résumé (PDF)
                  <span aria-hidden>↓</span>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
