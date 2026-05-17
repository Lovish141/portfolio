'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Props = {
  children: string;
  className?: string;
  splitBy?: 'words' | 'chars';
  stagger?: number;
  delay?: number;
};

export default function RevealText({
  children,
  className = '',
  splitBy = 'words',
  stagger = 0.04,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const tokens = splitBy === 'chars' ? Array.from(children) : children.split(' ');

  return (
    <span ref={ref} className={className} aria-label={children}>
      {tokens.map((tok, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: '0.12em' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {tok === ' ' ? ' ' : tok}
            {splitBy === 'words' && i < tokens.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
