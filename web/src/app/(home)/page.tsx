import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('home');

export default function Page() {
  return <StaticBody slug="home" />;
}
