'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { type ReactNode, useRef, type MouseEvent, type AnchorHTMLAttributes } from 'react';
import { useFinePointer, useReducedMotion } from '@/lib/useReducedMotion';

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onTransitionEnd'
> & {
  children: ReactNode;
  strength?: number;
};

/**
 * MagneticButton.
 *
 * The outer <motion.a> is the layout/hit-target wrapper (kept inline-block so
 * its bounding box doesn't move when the inner span translates). The inner
 * <motion.span> carries the user-supplied className so icons + text inside the
 * button get proper flex alignment (without this, SVG icons render on the
 * baseline and look misaligned next to text).
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  href,
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const isFine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = isFine && !reduced;

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
      data-cursor-hover
      {...rest}
    >
      <motion.span
        style={enabled ? { x: sx, y: sy } : undefined}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
