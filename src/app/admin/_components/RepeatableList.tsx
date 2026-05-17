'use client';

import { type ReactNode } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

type Props<T> = {
  items: T[];
  setItems: (next: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => ReactNode;
  itemLabel?: (item: T, index: number) => string;
  addLabel?: string;
};

export default function RepeatableList<T>({
  items,
  setItems,
  newItem,
  renderItem,
  itemLabel,
  addLabel = 'Add item',
}: Props<T>) {
  const update = (i: number) => (patch: Partial<T>) => {
    const next = items.slice();
    next[i] = { ...next[i], ...patch };
    setItems(next);
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    setItems(next);
  };

  const remove = (i: number) => {
    const next = items.slice();
    next.splice(i, 1);
    setItems(next);
  };

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="border border-border bg-bg-elev p-5">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
              {String(i + 1).padStart(2, '0')}
              {itemLabel ? ` · ${itemLabel(item, i)}` : ''}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, i - 1)}
                disabled={i === 0}
                className="p-1.5 text-text-muted hover:text-accent disabled:opacity-30"
                aria-label="Move up"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => move(i, i + 1)}
                disabled={i === items.length - 1}
                className="p-1.5 text-text-muted hover:text-accent disabled:opacity-30"
                aria-label="Move down"
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1.5 text-text-muted hover:text-red-400"
                aria-label="Remove"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
          {renderItem(item, i, update(i))}
        </div>
      ))}

      <button
        type="button"
        onClick={() => setItems([...items, newItem()])}
        className="inline-flex items-center gap-2 border border-dashed border-border-strong px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted hover:border-accent hover:text-accent"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden /> {addLabel}
      </button>
    </div>
  );
}
