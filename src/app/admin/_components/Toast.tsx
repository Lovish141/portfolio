'use client';

import { Check, AlertCircle, X } from 'lucide-react';

export type ToastTone = 'success' | 'error' | 'info';

export type ToastState = {
  tone: ToastTone;
  message: string;
  link?: { href: string; label: string };
} | null;

export default function Toast({
  state,
  onDismiss,
  liftAboveBar = false,
}: {
  state: ToastState;
  onDismiss: () => void;
  liftAboveBar?: boolean;
}) {
  if (!state) return null;
  const Icon = state.tone === 'success' ? Check : state.tone === 'error' ? AlertCircle : null;
  const tint =
    state.tone === 'success'
      ? 'border-success/60 text-success'
      : state.tone === 'error'
      ? 'border-red-400/60 text-red-300'
      : 'border-border-strong text-text';

  const bottomClass = liftAboveBar ? 'bottom-24' : 'bottom-6';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-6 z-50 flex max-w-md items-start gap-3 border bg-bg-elev px-4 py-3 shadow-lg ${tint} ${bottomClass}`}
    >
      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
      <div className="flex-1 font-mono text-xs">
        <div>{state.message}</div>
        {state.link && (
          <a
            href={state.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block underline-offset-2 hover:underline"
          >
            {state.link.label} ↗
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-text-dim hover:text-text"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
