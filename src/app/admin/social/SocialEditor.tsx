'use client';

import { useState } from 'react';
import type { PortfolioData, SocialLink } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField, FieldGrid } from '../_components/Field';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

type Social = PortfolioData['social'];
const PLATFORMS: (keyof Social)[] = ['github', 'linkedin', 'twitter', 'email', 'phone'];

export default function SocialEditor({ initial }: { initial: Social }) {
  const staged = useStagedSection<Social>('social');
  const [form, setForm] = useState<Social>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Social>('social');

  const setLink = (k: keyof Social, patch: Partial<SocialLink>) =>
    setForm((f) => ({ ...f, [k]: { ...f[k], ...patch } }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(form);
  };

  return (
    <SectionShell
      index="07 / Social"
      title="Profiles."
      description="External profile URLs. Icon names are fixed so the renderer knows which glyph to use."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-5">
          {PLATFORMS.map((p) => (
            <div key={p} className="border border-border bg-bg-elev p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl text-text capitalize">{p}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                  icon: {form[p].icon}
                </span>
              </div>
              <FieldGrid cols={2}>
                <TextField
                  label="URL"
                  value={form[p].url}
                  onChange={(e) => setLink(p, { url: e.target.value })}
                />
                <TextField
                  label="Label"
                  value={form[p].label}
                  onChange={(e) => setLink(p, { label: e.target.value })}
                />
              </FieldGrid>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save social</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
