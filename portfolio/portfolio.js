/* PORTFOLIO 목록 무한스크롤 — 처음 10개, 바닥에 닿으면 다음 10개.
   전체 목록은 정적 HTML에 모두 들어 있어(검색엔진·JS 미동작 시 전부 노출) JS가 있을 때만 나눠서 보여준다. */
(() => {
  const PAGE = 10;
  const list = document.getElementById('pf-list');
  const more = document.getElementById('pf-more');
  if (!list || !more) return;
  const items = Array.from(list.children);
  if (items.length <= PAGE) return;

  let shown = PAGE;
  items.forEach((el, i) => { if (i >= PAGE) el.hidden = true; });
  more.hidden = false;

  let loading = false;
  const reveal = () => {
    if (loading) return;
    loading = true;
    more.classList.add('is-loading');
    setTimeout(() => {
      const next = items.slice(shown, shown + PAGE);
      next.forEach((el) => { el.hidden = false; el.classList.add('pf-in'); });
      shown += next.length;
      loading = false;
      more.classList.remove('is-loading');
      if (shown >= items.length) { more.remove(); io && io.disconnect(); }
    }, 650);
  };

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) reveal(); }, { rootMargin: '0px 0px 200px 0px' })
    : null;
  if (io) io.observe(more);
  else items.forEach((el) => { el.hidden = false; }), more.remove();
})();
