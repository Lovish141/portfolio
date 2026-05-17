import data from '@/data/portfolio.json';
import ProjectsEditor from './ProjectsEditor';
import type { Project } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
  return <ProjectsEditor initial={data.projects as Project[]} />;
}
