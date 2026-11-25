import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import registry from '../../content/pages.json';
import { BASE_KEYWORDS, DEFAULT_OG, INDEXABLE, OG_SITE_NAME, SITE_NAME, SITE_URL, VERIFICATION } from './site';

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

/** 페이지별 검색 키워드 (공통 키워드 BASE_KEYWORDS 뒤에 붙음) */
const KEYWORDS: Record<string, string[]> = {
  home: ['앱 개발 업체', '웹 개발 업체', '외주 개발사', 'SI 업체', '서울 개발사', '모바일 앱 개발', '플랫폼 개발', 'MVP 개발', '스타트업 앱 개발', '서비스 기획', 'UI/UX 디자인', '운영 유지보수'],
  'mr-starter': ['MR.STARTER', '서비스 기획', '앱 기획', '프로토타입 제작', 'MVP 기획', '기획서 작성', '창업 아이디어 구체화'],
  'mr-pro': ['MR.PRO', 'IT 턴키 개발', '턴키 개발 프로젝트', '앱 외주 개발', '웹 외주 개발', '플랫폼 구축', '앱 출시'],
  'mr-team': ['MR.TEAM', '개발팀 구독', '유지보수 외주', '서비스 운영 대행', '기능 개선 개발', '운영 개발팀'],
  'mr-check': ['MR.CHECK', '보안 진단', '운영비 절감', '클라우드 비용 최적화', 'SEO 진단', 'GEO', 'AI 검색 최적화'],
  'mr-booster': ['MR.BOOSTER', 'AX 전환', 'AI 도입', '업무 자동화', 'AI PoC', '사내 AI 시스템'],
  inquiry: ['개발 문의', '앱 개발 견적', '웹 개발 견적', '외주 개발 상담'],
  why: ['외주 개발사 선택 기준', '좋은 개발사', '개발사 비교'],
  philosophy: ['개발 철학', '의도한 대로', '기획 중심 개발'],
  story: ['미스터디벨로 대표', '송익주', '개발사 창업 이야기'],
  portfolio: ['포트폴리오', '앱 개발 포트폴리오', '웹 개발 포트폴리오', '개발 사례', '현대 HMG', '링스쿨', '파라다이스호텔'],
  content: ['개발 콘텐츠', '외주 개발 노하우', '미스터디벨로 유튜브', '미스터디벨로 블로그'],
};

/** SEO 메타데이터: title·description·keywords·canonical·robots·OG·Twitter·아이콘·소유확인 (기존 mrdevello.com head 기준) */
export function buildMetadata(slug: string): Metadata {
  const p = getPage(slug);
  const url = SITE_URL + p.route;
  const og = p.ogImage ?? DEFAULT_OG.url;
  const image = { url: SITE_URL + og, width: DEFAULT_OG.width, height: DEFAULT_OG.height, alt: p.title };
  const extra = KEYWORDS[slug] ?? (slug.startsWith('portfolio-') ? ['포트폴리오', p.title.split(' | ')[0].split(' · ')[0], ...p.title.split(' | ')[0].split(' · ').slice(1).join(', ').split(/,\s*/)] : []);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: p.title },
    description: p.description,
    keywords: [...BASE_KEYWORDS, ...extra].filter((k, i, a) => k && a.indexOf(k) === i),
    applicationName: SITE_NAME,
    authors: [{ name: OG_SITE_NAME, url: SITE_URL }],
    creator: OG_SITE_NAME,
    publisher: OG_SITE_NAME,
    alternates: { canonical: url },
    robots: INDEXABLE
      ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }
      : { index: false, follow: false },
    icons: {
      icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon-32.png', type: 'image/png', sizes: '32x32' }, { url: '/icon-192.png', type: 'image/png', sizes: '192x192' }],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.json',
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'default' },
    formatDetection: { telephone: false },
    verification: { google: VERIFICATION.google, other: { 'naver-site-verification': VERIFICATION.naver } },
    openGraph: { type: 'website', locale: 'ko_KR', siteName: OG_SITE_NAME, url, title: p.title, description: p.description, images: [image] },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [image.url] },
  };
}
