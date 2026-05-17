'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Experience } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField, FieldGrid, Label } from '../_components/Field';
import ChipInput from '../_components/ChipInput';
import RepeatableList from '../_components/RepeatableList';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

function nextId(items: Experience[]): number {
  return items.reduce((m, it) => Math.max(m, it.id), 0) + 1;
}

export default function ExperienceEditor({ initial }: { initial: Experience[] }) {
  const staged = useStagedSection<Experience[]>('experience');
  const [items, setItems] = useState<Experience[]>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Experience[]>('experience');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(items);
  };

  return (
    <SectionShell
      index="04 / Experience"
      title="Where I've shipped."
      description="Roles, dates, and bullet impact lines. Each line is rendered as its own bullet on the live site."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <RepeatableList<Experience>
          items={items}
          setItems={setItems}
          itemLabel={(r) => `${r.position || 'Role'} · ${r.company || 'Company'}`}
          newItem={() => ({
            id: nextId(items),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: 'Present',
            description: [''],
            technologies: [],
          })}
          renderItem={(r, _i, update) => (
            <div className="space-y-5">
              <FieldGrid cols={2}>
                <TextField
                  label="Company"
                  value={r.company}
                  onChange={(e) => update({ company: e.target.value })}
                />
                <TextField
                  label="Position"
                  value={r.position}
                  onChange={(e) => update({ position: e.target.value })}
                />
                <TextField
                  label="Location"
                  value={r.location}
                  onChange={(e) => update({ location: e.target.value })}
                />
                <FieldGrid cols={2}>
                  <TextField
                    label="Start (YYYY-MM)"
                    value={r.startDate}
                    onChange={(e) => update({ startDate: e.target.value })}
                  />
                  <TextField
                    label="End (YYYY-MM or Present)"
                    value={r.endDate}
                    onChange={(e) => update({ endDate: e.target.value })}
                  />
                </FieldGrid>
              </FieldGrid>

              <DescriptionList
                items={r.description}
                onChange={(d) => update({ description: d })}
              />

              <ChipInput
                label="Technologies"
                values={r.technologies}
                onChange={(v) => update({ technologies: v })}
                placeholder=".NET, Vue.js, …"
              />
            </div>
          )}
        />

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save experience</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}

function DescriptionList({
  items,
  onChange,
}: {
  items: string[];
  onChange: (next: string[]) => void;
}) {
  const update = (i: number, v: string) => {
    const next = items.slice();
    next[i] = v;
    onChange(next);
  };
  const add = () => onChange([...items, '']);
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));

  return (
    <div>
      <Label label="Bullets" hint="One impact line per row" />
      <div className="space-y-3">
        {items.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
              ·
            </span>
            <textarea
              value={line}
              onChange={(e) => update(i, e.target.value)}
              rows={2}
              className="flex-1 resize-y border border-border bg-bg-elev px-3 py-2 font-mono text-sm leading-relaxed text-text outline-none focus:border-accent"
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="mt-2 p-2 text-text-muted hover:text-red-400"
                aria-label="Remove bullet"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 border border-dashed border-border-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted hover:border-accent hover:text-accent"
      >
        <Plus className="h-3 w-3" aria-hidden /> Add bullet
      </button>
    </div>
  );
}
