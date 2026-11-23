/* 대표이야기 — 스크롤하면 사라락 나타나는 애니메이션 */
(() => {
  const root = document.documentElement;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const page = document.querySelector('.st-page');
  if (!page) return;
  const groups = [
    ['.st-hero-copy > *', 'up'], ['.st-hero-bg', 'fade'], ['.st-hero-ceo', 'up'], ['.st-hero .st-deco', 'pop'],
    ['.st-ch-panel', 'panel'], ['.st-ch-icon', 'pop'], ['.st-badge', 'up'],
    ['.st-ch h2, .st-h3, .st-closing h2, .st-cta h2', 'up'],
    ['.st-p, .st-p-lg, .st-p-md, .st-end, .st-final, .st-sign, .st-cta-lead, .st-resolve-sub', 'up'],
    ['.st-collage figure, .st-office, .st-team, .st-board', 'photo'],
    ['.st-boss figcaption, .st-client-who', 'up'], ['.st-boss-bub, .st-client-bub', 'bub'], ['.st-boss-me', 'bub'],
    ['.st-sim-lbls > *, .st-sim-card', 'up'], ['.st-sim-n', 'pop'],
    ['.st-ask > *, .st-probs li, .st-tl li, .st-cta-box', 'up'], ['.st-cta .st-deco', 'pop'],
  ];
  const seen = new Set();
  groups.forEach(([sel, kind]) => page.querySelectorAll(sel).forEach(el => {
    if (seen.has(el)) return; seen.add(el); el.dataset.sr = kind;
  }));
  root.classList.add('st-anim');
  const io = new IntersectionObserver(entries => {
    const shown = entries.filter(e => e.isIntersecting).map(e => e.target)
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    shown.forEach((el, i) => {
      el.style.setProperty('--d', Math.min(i * 0.07, 0.7).toFixed(2) + 's');
      el.classList.add('is-in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  page.querySelectorAll('[data-sr]').forEach(el => io.observe(el));
})();
