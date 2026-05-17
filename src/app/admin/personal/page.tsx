import data from '@/data/portfolio.json';
import PersonalEditor from './PersonalEditor';
import type { Personal } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function PersonalPage() {
  return <PersonalEditor initial={data.personal as Personal} />;
}
