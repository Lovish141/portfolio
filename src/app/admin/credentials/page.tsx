import data from '@/data/portfolio.json';
import CredentialsEditor from './CredentialsEditor';
import type { Credentials } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function CredentialsPage() {
  return <CredentialsEditor initial={data.credentials as Credentials} />;
}
