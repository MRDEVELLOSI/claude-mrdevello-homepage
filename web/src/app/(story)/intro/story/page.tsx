import StaticBody from '@/components/StaticBody';
import { buildMetadata } from '@/lib/pages';

export const metadata = buildMetadata('story');

export default function Page() {
  return <StaticBody slug="story" />;
}
