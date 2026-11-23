import type { ReactNode } from 'react';
import HeadNodes from './HeadNodes';
import { getPage, readHead } from '@/lib/pages';

function parseStyle(s: string | null) {
  if (!s) return undefined;
  const out: Record<string, string> = {};
  for (const decl of s.split(';')) {
    const [k, v] = decl.split(':').map((x) => x?.trim());
    if (k && v) out[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out;
}

/** 페이지마다 html/body 클래스와 CSS 묶음이 달라 라우트 그룹별 루트 레이아웃으로 사용 */
export default function PageShell({ slug, children, extraHead }: { slug: string; children: ReactNode; extraHead?: ReactNode }) {
  const p = getPage(slug);
  return (
    <html lang="ko" className={p.htmlClass || undefined} style={parseStyle(p.htmlStyle)} suppressHydrationWarning>
      <head>
        <HeadNodes nodes={readHead(slug)} />
        {extraHead}
      </head>
      <body className={p.bodyClass || undefined} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
