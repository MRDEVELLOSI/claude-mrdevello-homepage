/** 사이트 공통 설정 — 배포 환경별로 env 로 덮어쓴다. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrdevello.com').replace(/\/$/, '');

/** 검색 노출 여부. 정식 오픈 전(dev)에는 false → noindex + robots Disallow. 오픈 시 SITE_INDEXABLE=true 로 빌드. */
export const INDEXABLE = process.env.SITE_INDEXABLE === 'true';

export const SITE_NAME = '미스터디벨로';
export const ORG = {
  name: '미스터디벨로',
  alternateName: 'MR.DEVELLO',
  email: 'contact@mrdevello.com',
  telephone: '070-8860-0092',
  logo: '/assets/services/pro-3d.png',
  sameAs: [
    'https://blog.naver.com/mrdevello',
    'https://www.youtube.com/watch?v=BwrWmpen9p8',
  ],
};
