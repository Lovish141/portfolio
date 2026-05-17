'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/components/motion/SmoothScroll';
import ScrollProgress from '@/components/motion/ScrollProgress';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('about');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { scrollTo } = useLenis();

  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 8);
      let found = active;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 96 && rect.bottom > 96) {
          found = id;
          break;
        }
      }
      setActive(found);
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [sectionIds, active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (id === 'home') {
      scrollTo(0);
    } else {
      scrollTo(`#${id}`, { offset: -64 });
    }
  };

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-bg/75 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 items-center gap-4 px-6 py-4 md:grid-cols-3 md:px-10">
          {/* Left: logo monogram */}
          <button
            onClick={() => go('home')}
            aria-label="Lovish Sharma — home"
            className="group justify-self-start inline-flex items-center"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center border border-border-strong text-text transition-colors group-hover:border-accent group-hover:text-accent">
              <span className="font-display text-lg font-light leading-none tracking-tight">
                LS
              </span>
              <span
                aria-hidden
                className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
              />
            </span>
          </button>

          {/* Center: nav */}
          <nav className="hidden items-center justify-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  active === item.id ? 'text-text' : 'text-text-muted hover:text-text'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => go('contact')}
              className="hidden md:inline-flex items-center gap-2 border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-text hover:border-accent hover:text-accent transition-colors"
              data-cursor-hover
            >
              Get in touch
              <span aria-hidden>→</span>
            </button>

            <button
              ref={triggerRef}
              className="md:hidden text-text p-2"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <div className="flex h-6 w-6 flex-col justify-center gap-1">
                <motion.span
                  className="block h-px w-full bg-text"
                  animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block h-px w-full bg-text"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block h-px w-full bg-text"
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col items-start justify-center px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className="block py-3 text-left font-display text-5xl text-text hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.06 } }}
                  exit={{ opacity: 0 }}
                  onClick={() => go(item.id)}
                >
                  {active === item.id && <span className="text-accent">● </span>}
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-text-dim"
              >
                Bangalore, IN
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
