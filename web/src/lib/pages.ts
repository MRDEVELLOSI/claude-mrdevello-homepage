import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import registry from '../../content/pages.json';
import { INDEXABLE, SITE_NAME, SITE_URL } from './site';

export type PageEntry = {
  slug: string;
  route: string;
  title: string;
  description: string;
  ogImage: string | null;
  icon: string | null;
  bodyClass: string;
  htmlClass: string;
  htmlStyle: string | null;
};
export type HeadNode = { tag: string; attrs: Record<string, string>; inner: string | null };

const CONTENT_DIR = path.join(process.cwd(), 'content');
const withSiteUrl = (s: string) => s.replaceAll('{{SITE_URL}}', SITE_URL);

export const pages = registry as PageEntry[];

export function getPage(slug: string): PageEntry {
  const p = pages.find((x) => x.slug === slug);
  if (!p) throw new Error(`unknown page: ${slug}`);
  return p;
}

/** 페이지 본문 HTML (빌드 시점에 읽어 정적 HTML 로 박힘) */
export function readBody(slug: string): string {
  return withSiteUrl(fs.readFileSync(path.join(CONTENT_DIR, slug, 'body.html'), 'utf8'));
}

/** 페이지별 <head> 리소스(CSS·JS·JSON-LD) */
export function readHead(slug: string): HeadNode[] {
  const nodes = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, slug, 'head.json'), 'utf8')) as HeadNode[];
  return nodes.map((n) => ({ ...n, inner: n.inner == null ? null : withSiteUrl(n.inner) }));
}

/** SEO 메타데이터: title·description·canonical·OG·Twitter·robots */
export function buildMetadata(slug: string): Metadata {
  const p = getPage(slug);
  const url = SITE_URL + p.route;
  const images = p.ogImage ? [{ url: SITE_URL + p.ogImage }] : undefined;
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url },
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    icons: p.icon ? { icon: p.icon } : undefined,
    openGraph: { type: 'website', locale: 'ko_KR', siteName: SITE_NAME, url, title: p.title, description: p.description, images },
    twitter: { card: images ? 'summary_large_image' : 'summary', title: p.title, description: p.description, images: images?.map((i) => i.url) },
  };
}
