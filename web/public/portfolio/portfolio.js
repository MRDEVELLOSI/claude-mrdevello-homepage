/* PORTFOLIO 목록
   1) 아코디언: 행을 누르면 열리고(큰 미리보기 + '포트폴리오 보기'), 다른 행은 닫힌다. 상세 이동은 '포트폴리오 보기'로만.
   2) 무한스크롤: 처음 10개, 바닥에 닿으면 다음 10개.
   전체 목록은 정적 HTML에 모두 있고(검색엔진·JS 미동작 시 전부 펼쳐 노출) JS가 있을 때만 접고 나눠 보여준다. */
(() => {
  const list = document.getElementById('pf-list');
  if (!list) return;
  const items = Array.from(list.children);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 아코디언 ── */
  list.classList.add('pf-acc');
  const setOpen = (li, open) => {
    li.classList.toggle('is-open', open);
    const btn = li.querySelector('.pf-row');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  // 펼침·접힘 동안 누른 행이 화면에서 튀지 않게 위치를 붙잡아 둔다
  const keepInPlace = (el) => {
    if (reduce) return;
    const start = el.getBoundingClientRect().top;
    const t0 = performance.now();
    const step = (now) => {
      const diff = el.getBoundingClientRect().top - start;
      if (Math.abs(diff) > 1) window.scrollBy(0, diff);
      if (now - t0 < 560) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.pf-row');
    if (!btn || !list.contains(btn)) return;
    const li = btn.closest('.pf-item');
    const willOpen = !li.classList.contains('is-open');
    keepInPlace(btn);
    items.forEach((x) => { if (x !== li && x.classList.contains('is-open')) setOpen(x, false); });
    setOpen(li, willOpen);
  });

  /* ── 무한스크롤 ── */
  const PAGE = 10;
  const more = document.getElementById('pf-more');
  if (!more || items.length <= PAGE) { if (more) more.remove(); return; }
  let shown = PAGE;
  items.forEach((el, i) => { if (i >= PAGE) el.hidden = true; });
  more.hidden = false;
  let loading = false;
  let io = null;
  const reveal = () => {
    if (loading) return;
    loading = true;
    setTimeout(() => {
      const next = items.slice(shown, shown + PAGE);
      next.forEach((el) => { el.hidden = false; el.classList.add('pf-in'); });
      shown += next.length;
      loading = false;
      if (shown >= items.length) { more.remove(); if (io) io.disconnect(); }
    }, 650);
  };
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) reveal(); }, { rootMargin: '0px 0px 200px 0px' });
    io.observe(more);
  } else {
    items.forEach((el) => { el.hidden = false; });
    more.remove();
  }
})();
