import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('inquiry');

export default function Page() {
  return <StaticBody slug="inquiry" />;
}
