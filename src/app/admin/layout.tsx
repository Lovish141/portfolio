import type { Metadata } from 'next';
import Link from 'next/link';
import SignOutButton from './_components/SignOutButton';
import { PendingChangesProvider } from './_components/PendingChanges';
import PublishBar from './_components/PublishBar';
import AdminSidebarNav from './_components/AdminSidebarNav';

export const metadata: Metadata = {
  title: 'Editor — Lovish Sharma',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PendingChangesProvider>
      <div className="min-h-screen bg-bg text-text">
        <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="border-b border-border md:w-60 md:shrink-0 md:border-b-0 md:border-r">
            <div className="sticky top-0 flex h-screen flex-col p-6">
              <div className="mb-8">
                <Link
                  href="/"
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim hover:text-accent"
                >
                  ← Back to site
                </Link>
                <div className="mt-3 font-display text-2xl text-text">
                  Editor<span className="text-accent">.</span>
                </div>
              </div>

              <AdminSidebarNav />

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                  Editor · v1
                </div>
                <SignOutButton />
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex flex-1 flex-col">
            <div className="flex-1 p-6 md:p-10">{children}</div>
            <PublishBar />
          </main>
        </div>
      </div>
    </PendingChangesProvider>
  );
}
