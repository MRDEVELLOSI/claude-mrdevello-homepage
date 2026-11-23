import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('mr-pro');

export default function Page() {
  return <StaticBody slug="mr-pro" />;
}
