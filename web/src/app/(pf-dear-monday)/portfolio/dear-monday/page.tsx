import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('portfolio-dear-monday');

export default function Page() {
  return <StaticBody slug="portfolio-dear-monday" />;
}
