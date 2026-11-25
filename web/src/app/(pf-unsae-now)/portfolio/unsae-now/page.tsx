import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-unsae-now');

export default function Page() {
  return <StaticBody slug="portfolio-unsae-now" />;
}
