'use client';

import { type ReactNode } from 'react';
import { Loader2, Save } from 'lucide-react';

export default function SaveButton({
  saving,
  children = 'Save changes',
}: {
  saving: boolean;
  children?: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="inline-flex h-10 items-center gap-2 border border-accent bg-accent px-5 font-mono text-xs uppercase tracking-[0.22em] text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {saving ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
      ) : (
        <Save className="h-3.5 w-3.5" aria-hidden />
      )}
      {saving ? 'Staging…' : children}
    </button>
  );
}
