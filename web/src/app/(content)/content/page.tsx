import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('content');

export default function Page() {
  return <StaticBody slug="content" />;
}
