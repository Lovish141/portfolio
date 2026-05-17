'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePending } from './PendingChanges';
import type { Section } from '@/lib/portfolio-schema';

const NAV = [
  { href: '/admin', label: 'Overview', section: null as Section | null },
  { href: '/admin/personal', label: 'Personal', section: 'personal' as Section },
  { href: '/admin/skills', label: 'Skills', section: 'skills' as Section },
  { href: '/admin/projects', label: 'Projects', section: 'projects' as Section },
  { href: '/admin/experience', label: 'Experience', section: 'experience' as Section },
  { href: '/admin/education', label: 'Education', section: 'education' as Section },
  { href: '/admin/now', label: 'Now', section: 'now' as Section },
  { href: '/admin/contact', label: 'Contact', section: 'contact' as Section },
  { href: '/admin/credentials', label: 'Credentials', section: 'credentials' as Section },
  { href: '/admin/social', label: 'Social', section: 'social' as Section },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();
  const { isStaged } = usePending();

  return (
    <nav className="flex flex-1 flex-col gap-0.5">
      {NAV.map((item) => {
        const active =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const staged = item.section ? isStaged(item.section) : false;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center justify-between gap-2 border-l-2 py-2 pl-3 pr-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
              active
                ? 'border-accent bg-bg-elev text-accent'
                : 'border-transparent text-text-muted hover:bg-bg-elev hover:text-text'
            }`}
          >
            <span>{item.label}</span>
            {staged && (
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                title="Pending changes"
                aria-label="Pending changes"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
