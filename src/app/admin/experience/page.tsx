import data from '@/data/portfolio.json';
import ExperienceEditor from './ExperienceEditor';
import type { Experience } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function ExperiencePage() {
  return <ExperienceEditor initial={data.experience as Experience[]} />;
}
