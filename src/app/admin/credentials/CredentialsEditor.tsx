'use client';

import { useState } from 'react';
import type { Credentials } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField, TextArea, FieldGrid } from '../_components/Field';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

export default function CredentialsEditor({ initial }: { initial: Credentials }) {
  const staged = useStagedSection<Credentials>('credentials');
  const [form, setForm] = useState<Credentials>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Credentials>('credentials');

  const set = <K extends keyof Credentials>(k: K, v: Credentials[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(form);
  };

  return (
    <SectionShell
      index="08 / Credentials"
      title="Credentials card."
      description="The card on the right side of the hero. Four blocks: Currently, Recent impact, Based in, Status."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-8 max-w-2xl">
        <section className="space-y-5 border border-border bg-bg-elev p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Currently
          </div>
          <FieldGrid cols={2}>
            <TextField
              label="Current role"
              value={form.currentRole}
              onChange={(e) => set('currentRole', e.target.value)}
              hint="e.g. Software Engineer I"
            />
            <TextField
              label="Current company"
              value={form.currentCompany}
              onChange={(e) => set('currentCompany', e.target.value)}
              hint="e.g. Microchip Technology"
            />
          </FieldGrid>
        </section>

        <section className="space-y-5 border border-border bg-bg-elev p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Recent impact
          </div>
          <FieldGrid cols={2}>
            <TextField
              label="Metric"
              value={form.impactMetric}
              onChange={(e) => set('impactMetric', e.target.value)}
              hint="e.g. +22%"
            />
            <TextArea
              label="Label"
              value={form.impactLabel}
              onChange={(e) => set('impactLabel', e.target.value)}
              rows={2}
              hint="Line breaks are preserved"
            />
          </FieldGrid>
        </section>

        <section className="space-y-5 border border-border bg-bg-elev p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Based in
          </div>
          <FieldGrid cols={2}>
            <TextField
              label="City"
              value={form.locationCity}
              onChange={(e) => set('locationCity', e.target.value)}
              hint="e.g. Bangalore"
            />
            <TextField
              label="Locale"
              value={form.locationLocale}
              onChange={(e) => set('locationLocale', e.target.value)}
              hint="e.g. IN · UTC+5:30 (optional)"
            />
          </FieldGrid>
        </section>

        <section className="space-y-5 border border-border bg-bg-elev p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Status
          </div>
          <FieldGrid cols={2}>
            <TextField
              label="Status label"
              value={form.statusLabel}
              onChange={(e) => set('statusLabel', e.target.value)}
              hint="e.g. Available"
            />
            <TextField
              label="Status detail"
              value={form.statusDetail}
              onChange={(e) => set('statusDetail', e.target.value)}
              hint="e.g. For select projects (optional)"
            />
          </FieldGrid>
        </section>

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save credentials</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
