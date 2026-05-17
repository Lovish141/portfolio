'use client';

import { type ReactNode } from 'react';
import Toast, { type ToastState } from './Toast';

export default function SectionShell({
  index,
  title,
  description,
  toast,
  onDismissToast,
  children,
}: {
  index: string;
  title: string;
  description?: string;
  toast: ToastState;
  onDismissToast: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
        Editor / {index}
      </div>
      <h1 className="mt-2 font-display text-5xl font-light leading-[0.95] tracking-[-0.02em] text-text">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-text-muted">
          {description}
        </p>
      )}
      <div className="mt-10">{children}</div>
      <Toast state={toast} onDismiss={onDismissToast} />
    </div>
  );
}
