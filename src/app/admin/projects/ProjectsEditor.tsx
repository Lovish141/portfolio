'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField, TextArea, FieldGrid, CheckboxField } from '../_components/Field';
import ChipInput from '../_components/ChipInput';
import ImageUploader from '../_components/ImageUploader';
import RepeatableList from '../_components/RepeatableList';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

function nextId(items: Project[]): number {
  return items.reduce((m, it) => Math.max(m, it.id), 0) + 1;
}

export default function ProjectsEditor({ initial }: { initial: Project[] }) {
  const staged = useStagedSection<Project[]>('projects');
  const [items, setItems] = useState<Project[]>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Project[]>('projects');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(items);
  };

  return (
    <SectionShell
      index="03 / Selected work"
      title="Projects."
      description="Add, reorder, and edit case-study cards. Image uploads commit immediately; project metadata commits when you click Save."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <RepeatableList<Project>
          items={items}
          setItems={setItems}
          itemLabel={(p) => p.title || 'Untitled'}
          newItem={() => ({
            id: nextId(items),
            title: '',
            description: '',
            image: '',
            technologies: [],
            liveUrl: '',
            githubUrl: '',
            featured: false,
            category: 'Full Stack',
            role: 'Full stack',
            year: new Date().getFullYear(),
          })}
          renderItem={(p, _i, update) => (
            <div className="space-y-5">
              <FieldGrid cols={2}>
                <TextField
                  label="Title"
                  value={p.title}
                  onChange={(e) => update({ title: e.target.value })}
                  required
                />
                <TextField
                  label="Category"
                  value={p.category}
                  onChange={(e) => update({ category: e.target.value })}
                />
                <TextField
                  label="Role"
                  value={p.role}
                  onChange={(e) => update({ role: e.target.value })}
                />
                <TextField
                  type="number"
                  label="Year"
                  value={p.year}
                  onChange={(e) => update({ year: Number(e.target.value) })}
                />
              </FieldGrid>

              <TextArea
                label="Description"
                value={p.description}
                onChange={(e) => update({ description: e.target.value })}
                rows={3}
              />

              <ChipInput
                label="Technologies"
                values={p.technologies}
                onChange={(v) => update({ technologies: v })}
                placeholder="React, Node.js, …"
              />

              <FieldGrid cols={2}>
                <TextField
                  label="Live URL"
                  value={p.liveUrl}
                  onChange={(e) => update({ liveUrl: e.target.value })}
                />
                <TextField
                  label="GitHub URL"
                  value={p.githubUrl}
                  onChange={(e) => update({ githubUrl: e.target.value })}
                />
              </FieldGrid>

              <ImageUploader
                label="Cover image"
                value={p.image}
                kind="image"
                onChange={(path) => update({ image: path })}
                hint="PNG / JPG / WebP, max 3 MB"
              />

              <CheckboxField
                label="Featured"
                hint="Shows the “Featured” marker next to the project."
                checked={p.featured ?? false}
                onChange={(e) => update({ featured: e.target.checked })}
              />
            </div>
          )}
        />

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save projects</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
