import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-hyundai');

export default function Page() {
  return <StaticBody slug="portfolio-hyundai" />;
}
