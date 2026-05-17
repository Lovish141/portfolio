import data from '@/data/portfolio.json';
import NowEditor from './NowEditor';
import type { Now } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function NowPage() {
  return <NowEditor initial={data.now as Now} />;
}
