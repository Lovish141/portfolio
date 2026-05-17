'use client';

import { useState } from 'react';
import type { Contact } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField, TextArea } from '../_components/Field';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

export default function ContactEditor({ initial }: { initial: Contact }) {
  const staged = useStagedSection<Contact>('contact');
  const [form, setForm] = useState<Contact>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Contact>('contact');

  const set = <K extends keyof Contact>(k: K, v: Contact[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(form);
  };

  return (
    <SectionShell
      index="06 / Contact"
      title="Let's talk."
      description="Heading copy, the availability pill, and the Cal.com booking link."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
        <TextField
          label="Heading"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
        />
        <TextArea
          label="Subtitle"
          value={form.subtitle}
          onChange={(e) => set('subtitle', e.target.value)}
          rows={3}
        />
        <TextField
          label="Availability pill"
          value={form.availability}
          onChange={(e) => set('availability', e.target.value)}
          hint="e.g. “Available for select projects”"
        />
        <TextField
          label="Cal.com link"
          value={form.calLink}
          onChange={(e) => set('calLink', e.target.value)}
        />

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save contact</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
