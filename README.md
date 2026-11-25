# 미스터디벨로 홈페이지 (Next.js)

SEO용 정적 생성(SSG) Next.js 프로젝트. **소스는 `web/`**, 저장소 루트는 빌드 산출물이다.

## 구조
```
web/
  content/<page>/body.html   페이지 본문 (빌드 시 정적 HTML로 출력)
  content/<page>/head.json   페이지별 CSS·JS·JSON-LD 목록 (원본 순서 유지)
  content/pages.json         라우트·title·description·OG 이미지·body 클래스
  public/                    CSS·JS·이미지 등 정적 리소스
  src/app/(<page>)/          페이지별 루트 레이아웃 + page.tsx
  src/app/sitemap.ts         /sitemap.xml
  src/app/robots.ts          /robots.txt
  src/lib/site.ts            SITE_URL·검색 노출 여부·회사 정보(JSON-LD)
```

## 명령
```bash
cd web
npm install
npm run dev                         # 로컬 개발 (http://localhost:3000)
npm run build                       # out/ 에 정적 사이트 생성
./scripts/publish-root.sh           # out/ → 저장소 루트 반영 (EC2가 1분 내 자동 반영, 개발 서버 주소로 OG·canonical 생성)
```

## 검색 노출 (정식 오픈 시)
기본값은 `noindex` + robots `Disallow: /` (개발 서버 노출 방지).
오픈할 때는 `SITE_INDEXABLE=true NEXT_PUBLIC_SITE_URL=https://mrdevello.com ./scripts/publish-root.sh` 로 빌드.

## SEO·공유 썸네일
- 파비콘: `public/favicon.ico`·`icon-*.png`·`apple-touch-icon.png` (미스터디벨로 로고, 전 페이지 공통)
- 공유 썸네일: 기본 `public/og-image.jpg`(1200×630), 포트폴리오 상세는 `public/portfolio/<slug>/og.jpg`
- 메타(설명·키워드·OG·Twitter·검색엔진 소유확인·회사 JSON-LD)는 `src/lib/pages.ts`·`src/lib/site.ts`에서 일괄 생성

## 배포
GitHub `main` push → EC2(nginx)가 1분마다 pull → CloudFront(HTTPS)
