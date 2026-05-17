import data from '@/data/portfolio.json';
import SocialEditor from './SocialEditor';
import type { PortfolioData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function SocialPage() {
  return <SocialEditor initial={data.social as PortfolioData['social']} />;
}
