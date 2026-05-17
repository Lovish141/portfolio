import data from '@/data/portfolio.json';
import ContactEditor from './ContactEditor';
import type { Contact } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return <ContactEditor initial={data.contact as Contact} />;
}
