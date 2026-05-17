'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Personal } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import { TextField, TextArea, FieldGrid, Label } from '../_components/Field';
import SaveButton from '../_components/SaveButton';
import ImageUploader from '../_components/ImageUploader';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

const RESUME_PATH = '/LovishSharma_FullStackEngineer_resume.pdf';

export default function PersonalEditor({ initial }: { initial: Personal }) {
  const staged = useStagedSection<Personal>('personal');
  const [form, setForm] = useState<Personal>(staged ?? initial);
  const [resumePath, setResumePath] = useState<string>(RESUME_PATH);
  const { save, saving, toast, setToast } = useSaveSection<Personal>('personal');

  const set = <K extends keyof Personal>(k: K, v: Personal[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const updateBio = (i: number, v: string) => {
    const next = form.bio.slice();
    next[i] = v;
    set('bio', next);
  };
  const addBio = () => set('bio', [...form.bio, '']);
  const removeBio = (i: number) =>
    set(
      'bio',
      form.bio.filter((_, j) => j !== i)
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(form);
  };

  return (
    <SectionShell
      index="01 / Personal"
      title="Personal."
      description="Your name, role, contact details, bio, and résumé PDF."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <section className="border border-border bg-bg-elev p-5">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Identity
          </div>
          <FieldGrid cols={2}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
            />
            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
            />
          </FieldGrid>
          <div className="mt-5">
            <TextField
              label="Subtitle"
              value={form.subtitle}
              onChange={(e) => set('subtitle', e.target.value)}
            />
          </div>
        </section>

        <section className="border border-border bg-bg-elev p-5">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Contact
          </div>
          <FieldGrid cols={2}>
            <TextField
              type="email"
              label="Email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
            />
            <TextField
              label="Phone"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
            <TextField
              label="Location"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
            />
            <TextField
              label="Website"
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
            />
            <TextField
              label="LinkedIn URL"
              value={form.linkedIn}
              onChange={(e) => set('linkedIn', e.target.value)}
            />
            <TextField
              label="GitHub URL"
              value={form.github}
              onChange={(e) => set('github', e.target.value)}
            />
          </FieldGrid>
        </section>

        <section className="border border-border bg-bg-elev p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
              Bio paragraphs
            </div>
            <button
              type="button"
              onClick={addBio}
              className="inline-flex items-center gap-1.5 border border-border-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text hover:border-accent hover:text-accent"
            >
              <Plus className="h-3 w-3" aria-hidden /> Add paragraph
            </button>
          </div>
          <div className="space-y-4">
            {form.bio.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                  ¶ {i + 1}
                </span>
                <div className="flex-1">
                  <TextArea
                    label={`Paragraph ${i + 1}`}
                    value={p}
                    onChange={(e) => updateBio(i, e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                {form.bio.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBio(i)}
                    className="mt-9 p-2 text-text-muted hover:text-red-400"
                    aria-label={`Remove paragraph ${i + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-bg-elev p-5">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Résumé PDF
          </div>
          <ImageUploader
            label="Replace résumé"
            value={resumePath}
            kind="resume"
            onChange={(p) => setResumePath(p)}
            hint="Always saved to /LovishSharma_FullStackEngineer_resume.pdf"
          />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Note: replacing the PDF is its own commit. The Save below only updates the personal fields.
          </p>
          <Label label=" " />
        </section>

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save personal</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
