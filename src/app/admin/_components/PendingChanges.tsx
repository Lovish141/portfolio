'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Section } from '@/lib/portfolio-schema';

const STORAGE_KEY = 'portfolio-admin-pending-v1';

type Sections = Partial<Record<Section, unknown>>;
type StagedAt = Partial<Record<Section, string>>;

type PendingState = {
  sections: Sections;
  stagedAt: StagedAt;
};

type Ctx = {
  pending: PendingState;
  count: number;
  stage: (section: Section, data: unknown) => void;
  unstage: (section: Section) => void;
  clear: () => void;
  isStaged: (section: Section) => boolean;
};

const initialState: PendingState = { sections: {}, stagedAt: {} };

const PendingContext = createContext<Ctx | null>(null);

export function PendingChangesProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<PendingState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PendingState;
        if (parsed && typeof parsed === 'object') {
          setPending({
            sections: parsed.sections ?? {},
            stagedAt: parsed.stagedAt ?? {},
          });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Write through whenever pending changes (after hydration)
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    try {
      if (Object.keys(pending.sections).length === 0) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
      }
    } catch {
      /* quota exceeded etc — best effort */
    }
  }, [pending, hydrated]);

  const stage = useCallback((section: Section, data: unknown) => {
    setPending((prev) => ({
      sections: { ...prev.sections, [section]: data },
      stagedAt: { ...prev.stagedAt, [section]: new Date().toISOString() },
    }));
  }, []);

  const unstage = useCallback((section: Section) => {
    setPending((prev) => {
      const sections = { ...prev.sections };
      const stagedAt = { ...prev.stagedAt };
      delete sections[section];
      delete stagedAt[section];
      return { sections, stagedAt };
    });
  }, []);

  const clear = useCallback(() => {
    setPending(initialState);
  }, []);

  const isStaged = useCallback(
    (section: Section) => pending.sections[section] !== undefined,
    [pending.sections]
  );

  const value = useMemo<Ctx>(
    () => ({
      pending,
      count: Object.keys(pending.sections).length,
      stage,
      unstage,
      clear,
      isStaged,
    }),
    [pending, stage, unstage, clear, isStaged]
  );

  return <PendingContext.Provider value={value}>{children}</PendingContext.Provider>;
}

export function usePending(): Ctx {
  const ctx = useContext(PendingContext);
  if (!ctx) {
    throw new Error('usePending must be used inside <PendingChangesProvider>');
  }
  return ctx;
}

/** Read the staged draft for a section, typed. */
export function useStagedSection<T>(section: Section): T | undefined {
  const { pending } = usePending();
  return pending.sections[section] as T | undefined;
}
