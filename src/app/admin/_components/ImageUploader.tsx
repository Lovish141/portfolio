'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Loader2 } from 'lucide-react';
import { Label } from './Field';

type Props = {
  label: string;
  value: string;
  kind: 'image' | 'resume';
  onChange: (path: string) => void;
  hint?: string;
};

export default function ImageUploader({ label, value, kind, onChange, hint }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`/api/admin/upload?kind=${kind}`, {
        method: 'POST',
        body: fd,
      });
      const json = await res.json();
      if (!res.ok || !json.path) {
        setError(json.error || 'upload failed');
      } else {
        onChange(json.path);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Note: uploads commit immediately and bypass the staged-publish flow.
  // Section field changes still wait for "Publish to live".

  const accept = kind === 'image' ? 'image/png,image/jpeg,image/webp' : 'application/pdf';

  return (
    <div>
      <Label label={label} hint={hint} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {kind === 'image' && value ? (
          <div className="relative h-28 w-44 shrink-0 overflow-hidden border border-border bg-bg-elev">
            <Image src={value} alt="" fill sizes="176px" className="object-cover" />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col justify-between gap-3 border border-border bg-bg-elev p-4">
          <div className="font-mono text-xs text-text break-all">
            {value || <span className="text-text-dim">No file uploaded</span>}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => input.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 border border-border-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
              ) : (
                <Upload className="h-3 w-3" aria-hidden />
              )}
              {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim hover:text-red-400"
              >
                Clear
              </button>
            )}
          </div>
          {error && (
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-300">
              {error}
            </div>
          )}
        </div>
      </div>

      <input
        ref={input}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}
