import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-vroong');

export default function Page() {
  return <StaticBody slug="portfolio-vroong" />;
}
