'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Skills, Skill } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

const GROUPS: { key: keyof Skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'databases', label: 'Databases' },
  { key: 'tooling', label: 'Tooling' },
];

export default function SkillsEditor({ initial }: { initial: Skills }) {
  const staged = useStagedSection<Skills>('skills');
  const [form, setForm] = useState<Skills>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Skills>('skills');

  const setGroup = (key: keyof Skills, items: Skill[]) =>
    setForm((f) => ({ ...f, [key]: items }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(form);
  };

  return (
    <SectionShell
      index="02 / Skills"
      title="Stack."
      description="Mark the skills you're using at work right now — they get a “● now” pill on the public site."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {GROUPS.map((g) => (
            <SkillGroup
              key={g.key}
              title={g.label}
              items={form[g.key]}
              onChange={(items) => setGroup(g.key, items)}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save stack</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}

function SkillGroup({
  title,
  items,
  onChange,
}: {
  title: string;
  items: Skill[];
  onChange: (next: Skill[]) => void;
}) {
  const update = (i: number, patch: Partial<Skill>) => {
    const next = items.slice();
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => {
    const next = items.slice();
    next.splice(i, 1);
    onChange(next);
  };
  const add = () => onChange([...items, { name: '', atWork: false }]);

  return (
    <div className="border border-border bg-bg-elev p-5">
      <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
        <h3 className="font-display text-2xl text-text">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
          {items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              value={s.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="Name"
              className="flex-1 border border-border bg-bg px-2 py-1.5 font-mono text-sm text-text outline-none focus:border-accent"
            />
            <label
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 border px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                s.atWork
                  ? 'border-accent text-accent'
                  : 'border-border text-text-dim hover:border-text-muted'
              }`}
              title="Currently using at work"
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={s.atWork}
                onChange={(e) => update(i, { atWork: e.target.checked })}
              />
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  s.atWork ? 'bg-accent' : 'bg-border-strong'
                }`}
                aria-hidden
              />
              now
            </label>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1.5 text-text-muted hover:text-red-400"
              aria-label="Remove skill"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        className="mt-4 inline-flex items-center gap-1.5 border border-dashed border-border-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted hover:border-accent hover:text-accent"
      >
        <Plus className="h-3 w-3" aria-hidden /> Add
      </button>
    </div>
  );
}
