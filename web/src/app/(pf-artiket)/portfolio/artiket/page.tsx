import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-artiket');

export default function Page() {
  return <StaticBody slug="portfolio-artiket" />;
}
