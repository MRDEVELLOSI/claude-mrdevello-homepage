import type { HeadNode } from '@/lib/pages';

/** HTML 속성 → React prop 이름 */
const ATTR: Record<string, string> = {
  class: 'className', crossorigin: 'crossOrigin', 'http-equiv': 'httpEquiv', charset: 'charSet',
  referrerpolicy: 'referrerPolicy', fetchpriority: 'fetchPriority', nomodule: 'noModule',
};
const BOOL = new Set(['defer', 'async', 'nomodule']);

function toProps(attrs: Record<string, string>) {
  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(attrs)) {
    const key = ATTR[k] ?? k;
    props[key] = BOOL.has(k) ? true : v;
  }
  return props;
}

/** 페이지별 head 리소스를 원본 순서 그대로 렌더 (CSS 캐스케이드 순서 보존) */
export default function HeadNodes({ nodes }: { nodes: HeadNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        const props = toProps(n.attrs);
        if (n.tag === 'script') return <script key={i} {...props} dangerouslySetInnerHTML={n.inner ? { __html: n.inner } : undefined} />;
        if (n.tag === 'style') return <style key={i} {...props} dangerouslySetInnerHTML={{ __html: n.inner ?? '' }} />;
        if (n.tag === 'link') return <link key={i} {...props} />;
        if (n.tag === 'noscript') return null;
        return null;
      })}
    </>
  );
}
