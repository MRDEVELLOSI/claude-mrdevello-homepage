/** 사이트 공통 설정 — 배포 환경별로 env 로 덮어쓴다. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrdevello.com').replace(/\/$/, '');

/** 검색 노출 여부. 정식 오픈 전(dev)에는 false → noindex + robots Disallow. 오픈 시 SITE_INDEXABLE=true 로 빌드. */
export const INDEXABLE = process.env.SITE_INDEXABLE === 'true';

export const SITE_NAME = '미스터디벨로';
/** 링크 공유 시 보이는 사이트 이름 (기존 mrdevello.com 과 동일) */
export const OG_SITE_NAME = '미스터 디벨로';

/** 링크 공유 썸네일 기본값 (1200×630) — 페이지별 ogImage 가 없으면 사용 */
export const DEFAULT_OG = { url: '/og-image.jpg', width: 1200, height: 630 };

/** 검색엔진 소유 확인 (기존 mrdevello.com 과 동일) */
export const VERIFICATION = {
  google: 'P3F8EcKg9QUzPiRSTEycPW44o51-ZuaLEGuhh_eY-oA',
  naver: '3fc111d32cbf1de4e97c3e18ae43b9ab13699c15',
};

/** 전 페이지 공통 키워드 — 페이지별 키워드 앞에 붙는다 */
export const BASE_KEYWORDS = ['미스터디벨로', '미스터 디벨로', 'MR.DEVELLO', '앱 개발', '웹 개발', '외주 개발', '앱 개발 회사', '웹 개발 회사', '턴키 개발'];

export const ORG = {
  name: '미스터 디벨로',
  alternateName: ['미스터디벨로', 'MR.DEVELLO', 'Mr. Devello', 'mrdevello'],
  slogan: '의뢰한 대로가 아닌, 의도한 대로 개발합니다',
  description: '기획·디자인·개발을 한 팀이 전담하는 턴키 방식의 IT 외주 개발사. 모바일 앱, 웹 서비스, 플랫폼, MVP 개발과 운영·유지보수를 제공합니다.',
  email: 'contact@mrdevello.com',
  telephone: '+82-70-8860-0092',
  logo: '/logo512.webp',
  founder: '송익주',
  taxID: '507-87-02801',
  address: { streetAddress: '동교로 156-4 B1', addressLocality: '마포구', addressRegion: '서울', postalCode: '', addressCountry: 'KR' },
  sameAs: [
    'https://www.youtube.com/@mr.devello',
    'https://blog.naver.com/mrdevello',
    'https://www.instagram.com/mr.devello/',
    'https://www.threads.com/@mr.devello',
  ],
};

/** 전 페이지 공통 JSON-LD: 회사(ProfessionalService) + 웹사이트 */
export function orgJsonLd() {
  const a = ORG.address;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: ORG.name,
        alternateName: ORG.alternateName,
        url: `${SITE_URL}/`,
        logo: SITE_URL + ORG.logo,
        image: SITE_URL + DEFAULT_OG.url,
        slogan: ORG.slogan,
        description: ORG.description,
        telephone: ORG.telephone,
        email: ORG.email,
        founder: { '@type': 'Person', name: ORG.founder },
        taxID: ORG.taxID,
        address: { '@type': 'PostalAddress', streetAddress: a.streetAddress, addressLocality: a.addressLocality, addressRegion: a.addressRegion, addressCountry: a.addressCountry },
        areaServed: 'KR',
        knowsAbout: ['모바일 앱 개발', '웹 서비스 개발', '플랫폼 개발', 'MVP 개발', '턴키 개발', 'IT 외주 개발', '서비스 기획', 'UI/UX 디자인', '운영·유지보수', 'AI 전환(AX)'],
        sameAs: ORG.sameAs,
      },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'ko-KR', publisher: { '@id': `${SITE_URL}/#organization` } },
    ],
  };
}
