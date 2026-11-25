import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-paradise-busan');

export default function Page() {
  return <StaticBody slug="portfolio-paradise-busan" />;
}
