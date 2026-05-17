'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Send, Trash2, X, ExternalLink } from 'lucide-react';
import { usePending } from './PendingChanges';
import Toast, { type ToastState } from './Toast';

export default function PublishBar() {
  const { pending, count, unstage, clear } = usePending();
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  if (count === 0 && !toast) return null;

  const onPublish = async () => {
    setPublishing(true);
    setToast(null);
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sections: pending.sections }),
      });
      const json = await res.json();
      if (!res.ok) {
        setToast({
          tone: 'error',
          message: json.error || `Publish failed (${res.status})`,
        });
        return;
      }
      if (json.unchanged) {
        setToast({ tone: 'info', message: 'No changes to publish.' });
        clear();
        return;
      }
      setToast({
        tone: 'success',
        message: `Published — site rebuilding (~30s).`,
        link: json.commitUrl
          ? { href: json.commitUrl, label: 'View commit' }
          : undefined,
      });
      clear();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Network error';
      setToast({ tone: 'error', message: msg });
    } finally {
      setPublishing(false);
    }
  };

  const onDiscard = () => {
    if (typeof window === 'undefined') return;
    if (window.confirm(`Discard ${count} pending change${count === 1 ? '' : 's'}?`)) {
      clear();
      setToast({ tone: 'info', message: 'Pending changes discarded.' });
    }
  };

  const sectionList = Object.keys(pending.sections);

  return (
    <>
      {count > 0 && (
        <div
          role="region"
          aria-label="Pending changes"
          className="sticky bottom-0 left-0 right-0 z-30 border-t border-border bg-bg-elev/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
            {/* Left: count + chips */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {count} pending
              </span>
              <ul className="flex flex-wrap items-center gap-1.5">
                {sectionList.map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1 border border-border-strong bg-bg px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text"
                  >
                    <Link
                      href={`/admin/${s}`}
                      className="hover:text-accent"
                      title={`Edit ${s}`}
                    >
                      {s}
                    </Link>
                    <button
                      type="button"
                      onClick={() => unstage(s as Parameters<typeof unstage>[0])}
                      className="text-text-dim hover:text-red-400"
                      aria-label={`Unstage ${s}`}
                    >
                      <X className="h-3 w-3" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onDiscard}
                disabled={publishing}
                className="inline-flex h-8 items-center gap-1.5 border border-border-strong px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted transition-colors hover:border-red-400 hover:text-red-300 disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" aria-hidden /> Discard all
              </button>
              <button
                type="button"
                onClick={onPublish}
                disabled={publishing}
                className="inline-flex h-10 items-center gap-2 border border-accent bg-accent px-5 font-mono text-xs uppercase tracking-[0.22em] text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {publishing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-3.5 w-3.5" aria-hidden />
                )}
                {publishing ? 'Publishing…' : 'Publish to live'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast state={toast} onDismiss={() => setToast(null)} liftAboveBar={count > 0} />
      {/* helper indicator on success after clear: small ↑ commit pointer */}
      {toast?.link && (
        <a
          href={toast.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="sr-only"
        >
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      )}
    </>
  );
}
