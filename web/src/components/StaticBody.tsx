import { readBody } from '@/lib/pages';

/**
 * 페이지 본문. 빌드 시 정적 HTML 로 그대로 출력되어 검색엔진이 JS 없이 전체 본문을 읽는다.
 * display:contents 래퍼라 레이아웃·CSS 선택자에 영향 없음.
 */
export default function StaticBody({ slug }: { slug: string }) {
  return <div id="__page" style={{ display: 'contents' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: readBody(slug) }} />;
}
