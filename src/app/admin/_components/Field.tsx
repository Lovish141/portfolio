'use client';

import { type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';

type BaseProps = {
  label: string;
  hint?: string;
  className?: string;
};

const FIELD_CLASS =
  'w-full border border-border bg-bg-elev px-3.5 py-2.5 font-mono text-sm text-text outline-none transition-colors placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent/40 disabled:opacity-50';

export function Label({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
        {label}
      </span>
      {hint && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim/70">
          {hint}
        </span>
      )}
    </div>
  );
}

export function TextField({
  label,
  hint,
  className = '',
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <Label label={label} hint={hint} />
      <input {...rest} className={FIELD_CLASS} />
    </label>
  );
}

export function TextArea({
  label,
  hint,
  className = '',
  rows = 4,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={`block ${className}`}>
      <Label label={label} hint={hint} />
      <textarea {...rest} rows={rows} className={`${FIELD_CLASS} resize-y leading-relaxed`} />
    </label>
  );
}

export function Select({
  label,
  hint,
  className = '',
  children,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <Label label={label} hint={hint} />
      <select {...rest} className={FIELD_CLASS}>
        {children}
      </select>
    </label>
  );
}

export function CheckboxField({
  label,
  hint,
  className = '',
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 ${className}`}>
      <input
        {...rest}
        type="checkbox"
        className="h-4 w-4 cursor-pointer accent-accent"
      />
      <span>
        <span className="block font-mono text-xs uppercase tracking-[0.2em] text-text">
          {label}
        </span>
        {hint && (
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            {hint}
          </span>
        )}
      </span>
    </label>
  );
}

export function FieldGrid({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const map = { 1: 'grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' } as const;
  return <div className={`grid grid-cols-1 gap-5 ${map[cols]}`}>{children}</div>;
}
