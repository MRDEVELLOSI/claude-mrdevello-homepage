import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-drdp');

export default function Page() {
  return <StaticBody slug="portfolio-drdp" />;
}
