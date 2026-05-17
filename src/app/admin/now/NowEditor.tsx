'use client';

import { useState } from 'react';
import type { Now } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField } from '../_components/Field';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function NowEditor({ initial }: { initial: Now }) {
  const staged = useStagedSection<Now>('now');
  const [form, setForm] = useState<Now>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Now>('now');

  const set = <K extends keyof Now>(k: K, v: Now[K]) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save({ ...form, updatedAt: todayIso() });
  };

  return (
    <SectionShell
      index="05 / Now"
      title="Currently."
      description="A small, personal snapshot. Saving auto-stamps today's date as Last updated."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
        <TextField
          label="Building"
          value={form.building}
          onChange={(e) => set('building', e.target.value)}
        />
        <TextField
          label="Reading"
          value={form.reading}
          onChange={(e) => set('reading', e.target.value)}
        />
        <TextField
          label="Listening to"
          value={form.listening}
          onChange={(e) => set('listening', e.target.value)}
        />

        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
          Last updated: {form.updatedAt} (auto-stamped on save)
        </div>

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save now</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
