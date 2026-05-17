import data from '@/data/portfolio.json';
import SkillsEditor from './SkillsEditor';
import type { Skills } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function SkillsPage() {
  return <SkillsEditor initial={data.skills as Skills} />;
}
