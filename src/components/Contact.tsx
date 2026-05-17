'use client';

import { useState } from 'react';
import { Copy, Check, ArrowUpRight, Mail, CalendarDays } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import RevealText from '@/components/motion/RevealText';
import FadeIn from '@/components/motion/FadeIn';
import MagneticButton from '@/components/motion/MagneticButton';

const Contact = () => {
  const { personal, contact, social } = portfolioData;
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const socialLinks = [
    { key: 'github', label: 'GitHub', url: social.github.url },
    { key: 'linkedin', label: 'LinkedIn', url: social.linkedin.url },
    { key: 'twitter', label: 'Twitter / X', url: social.twitter.url },
  ].filter((s) => s.url);

  return (
    <section
      id="contact"
      className="border-t border-border px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-2">
            <div className="sticky top-28 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
              <div>(05)</div>
              <div className="mt-1">Contact</div>
            </div>
          </div>

          <div className="md:col-span-10">
            <h2
              id="contact-heading"
              className="font-display font-light leading-[0.9] tracking-[-0.03em] text-text text-[clamp(3rem,9vw,9rem)]"
            >
              <RevealText splitBy="chars" stagger={0.04}>
                Let&apos;s talk.
              </RevealText>
            </h2>

            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl text-lg leading-[1.5] text-text-muted md:text-xl">
                {contact.subtitle}
              </p>
            </FadeIn>

            {/* Two-channel grid */}
            <FadeIn delay={0.25}>
              <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
                {/* Email card */}
                <div className="flex flex-col gap-5 bg-bg p-6 md:p-8">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-3 w-3" aria-hidden />
                      Email
                    </span>
                    <span className="text-accent">Replies in 24h</span>
                  </div>

                  <a
                    href={`mailto:${personal.email}`}
                    className="font-display text-xl leading-tight text-text break-all hover:text-accent transition-colors md:text-2xl lg:text-[1.875rem]"
                    data-cursor-hover
                  >
                    {personal.email}
                  </a>

                  <div className="mt-auto flex items-center gap-3">
                    <button
                      onClick={onCopy}
                      className="inline-flex items-center gap-2 border border-border-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted hover:border-accent hover:text-accent transition-colors"
                      data-cursor-hover
                      aria-live="polite"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" aria-hidden /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" aria-hidden /> Copy
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${personal.email}`}
                      className="inline-flex items-center gap-2 border border-border-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted hover:border-accent hover:text-accent transition-colors"
                      data-cursor-hover
                    >
                      <Mail className="h-3 w-3" aria-hidden /> Send mail
                    </a>
                  </div>
                </div>

                {/* Booking card */}
                <div className="flex flex-col gap-5 bg-bg p-6 md:p-8">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3 w-3" aria-hidden />
                      Booking
                    </span>
                    <span>Bangalore · UTC+5:30</span>
                  </div>

                  <a
                    href={contact.calLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl leading-tight text-text hover:text-accent transition-colors md:text-2xl lg:text-[1.875rem]"
                    data-cursor-hover
                  >
                    Book a 30-minute call
                    <span className="text-accent"> →</span>
                  </a>

                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <MagneticButton
                      href={contact.calLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2 border border-accent bg-accent px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bg hover:bg-accent-hover transition-colors"
                    >
                      Open Cal.com <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </MagneticButton>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
                      Best 14:00–22:00 IST
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Elsewhere */}
            {socialLinks.length > 0 && (
              <FadeIn delay={0.4}>
                <div className="mt-16">
                  <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                      Elsewhere
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
                      Async only
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
                    {socialLinks.map((s) => (
                      <li key={s.key}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 bg-bg p-5 text-text-muted transition-colors hover:bg-bg-elev hover:text-accent"
                          data-cursor-hover
                        >
                          <span className="font-display text-xl text-text group-hover:text-accent transition-colors md:text-2xl">
                            {s.label}
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
