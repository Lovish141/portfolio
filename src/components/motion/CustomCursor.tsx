'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useReducedMotion } from '@/lib/useReducedMotion';

export default function CustomCursor() {
  const isFine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = isFine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 25, mass: 0.6 });

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor-hover], a, button')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-text-muted/60 mix-blend-difference md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovered ? 2 : 1,
          borderColor: hovered ? 'rgba(217, 119, 6, 0.9)' : 'rgba(168, 160, 148, 0.6)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      />
    </>
  );
}
