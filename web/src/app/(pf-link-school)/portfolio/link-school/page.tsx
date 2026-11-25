import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-link-school');

export default function Page() {
  return <StaticBody slug="portfolio-link-school" />;
}
