'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex h-8 items-center gap-2 border border-border-strong px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
    >
      <LogOut className="h-3 w-3" aria-hidden />
      Sign out
    </button>
  );
}
