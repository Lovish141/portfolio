import data from '@/data/portfolio.json';
import EducationEditor from './EducationEditor';
import type { Education } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function EducationPage() {
  return <EducationEditor initial={data.education as Education[]} />;
}
