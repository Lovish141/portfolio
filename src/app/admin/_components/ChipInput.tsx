'use client';

import { type KeyboardEvent, useState } from 'react';
import { X } from 'lucide-react';
import { Label } from './Field';

type Props = {
  label: string;
  hint?: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export default function ChipInput({ label, hint, values, onChange, placeholder }: Props) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    if (values.includes(v)) {
      setDraft('');
      return;
    }
    onChange([...values, v]);
    setDraft('');
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && draft === '' && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  const remove = (v: string) => onChange(values.filter((x) => x !== v));

  return (
    <div>
      <Label label={label} hint={hint ?? 'Press Enter or , to add'} />
      <div className="flex min-h-[42px] flex-wrap items-center gap-2 border border-border bg-bg-elev px-2 py-2 focus-within:border-accent">
        {values.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 border border-border-strong bg-bg px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text"
          >
            {v}
            <button
              type="button"
              onClick={() => remove(v)}
              className="text-text-dim hover:text-accent"
              aria-label={`Remove ${v}`}
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={commit}
          placeholder={values.length === 0 ? placeholder : ''}
          className="min-w-[8ch] flex-1 bg-transparent px-1 py-1 font-mono text-sm text-text outline-none placeholder:text-text-dim"
        />
      </div>
    </div>
  );
}
