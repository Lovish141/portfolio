'use client';

import { useState } from 'react';
import type { Education } from '@/lib/types';
import SectionShell from '../_components/SectionShell';
import SaveButton from '../_components/SaveButton';
import { TextField, FieldGrid } from '../_components/Field';
import ChipInput from '../_components/ChipInput';
import RepeatableList from '../_components/RepeatableList';
import { useSaveSection } from '../_components/useSaveSection';
import { useStagedSection } from '../_components/PendingChanges';

function nextId(items: Education[]): number {
  return items.reduce((m, it) => Math.max(m, it.id), 0) + 1;
}

export default function EducationEditor({ initial }: { initial: Education[] }) {
  const staged = useStagedSection<Education[]>('education');
  const [items, setItems] = useState<Education[]>(staged ?? initial);
  const { save, saving, toast, setToast } = useSaveSection<Education[]>('education');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(items);
  };

  return (
    <SectionShell
      index="Education"
      title="Education."
      description="Schools and degrees. Use either GPA or percentage — leave the other blank."
      toast={toast}
      onDismissToast={() => setToast(null)}
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <RepeatableList<Education>
          items={items}
          setItems={setItems}
          itemLabel={(e) => e.institution || 'Institution'}
          newItem={() => ({
            id: nextId(items),
            institution: '',
            degree: '',
            location: '',
            startDate: '',
            endDate: '',
            relevant: [],
          })}
          renderItem={(edu, _i, update) => (
            <div className="space-y-5">
              <FieldGrid cols={2}>
                <TextField
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) => update({ institution: e.target.value })}
                />
                <TextField
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => update({ degree: e.target.value })}
                />
                <TextField
                  label="Location"
                  value={edu.location}
                  onChange={(e) => update({ location: e.target.value })}
                />
                <FieldGrid cols={2}>
                  <TextField
                    label="Start"
                    value={edu.startDate}
                    onChange={(e) => update({ startDate: e.target.value })}
                  />
                  <TextField
                    label="End"
                    value={edu.endDate}
                    onChange={(e) => update({ endDate: e.target.value })}
                  />
                </FieldGrid>
                <TextField
                  label="GPA"
                  value={edu.gpa ?? ''}
                  onChange={(e) => update({ gpa: e.target.value || undefined })}
                />
                <TextField
                  label="Percentage"
                  value={edu.percentage ?? ''}
                  onChange={(e) => update({ percentage: e.target.value || undefined })}
                />
              </FieldGrid>

              <ChipInput
                label="Relevant coursework"
                values={edu.relevant}
                onChange={(v) => update({ relevant: v })}
              />
            </div>
          )}
        />

        <div className="flex items-center gap-4">
          <SaveButton saving={saving}>Save education</SaveButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Commits to <span className="text-text">src/data/portfolio.json</span>
          </span>
        </div>
      </form>
    </SectionShell>
  );
}
