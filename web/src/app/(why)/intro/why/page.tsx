import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('why');

export default function Page() {
  return <StaticBody slug="why" />;
}
