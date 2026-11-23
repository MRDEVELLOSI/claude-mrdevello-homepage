import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('philosophy');

export default function Page() {
  return <StaticBody slug="philosophy" />;
}
