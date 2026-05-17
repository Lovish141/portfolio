'use client';

import { useState } from 'react';
import type { Section } from '@/lib/portfolio-schema';
import type { ToastState } from './Toast';
import { usePending } from './PendingChanges';

/**
 * Stage a section's edits into the in-browser pending store.
 *
 * Section editors used to POST directly to /api/admin/save and produce one
 * commit each. Now they stage locally; the global PublishBar commits all
 * staged sections in a single GitHub commit via /api/admin/publish.
 *
 * The hook keeps the same return shape it had before so editors don't
 * need to change beyond the import name.
 */
export function useSaveSection<T>(section: Section) {
  const { stage, count } = usePending();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const save = async (data: T) => {
    setSaving(true);
    setToast(null);
    // Tiny delay so the spinner is perceptible — gives the click a beat
    // of feedback even though staging is synchronous.
    await new Promise((r) => setTimeout(r, 250));
    stage(section, data as unknown);
    const total = count + 1; // +1 because state hasn't reflected the stage yet
    setToast({
      tone: 'success',
      message: `Staged for publish · ${total} ${total === 1 ? 'section' : 'sections'} pending.`,
    });
    setSaving(false);
    return true;
  };

  return { save, saving, toast, setToast };
}
