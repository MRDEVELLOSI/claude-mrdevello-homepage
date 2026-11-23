import type { MetadataRoute } from 'next';
import { pages } from '@/lib/pages';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((p) => ({
    url: SITE_URL + p.route,
    lastModified: now,
    changeFrequency: p.route === '/' ? 'weekly' : 'monthly',
    priority: p.route === '/' ? 1 : p.route.startsWith('/mr-') ? 0.8 : 0.6,
  }));
}
