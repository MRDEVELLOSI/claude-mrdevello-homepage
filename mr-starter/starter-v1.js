/* MR.STARTER 시안 ① — 스크롤 등장 애니메이션 */
(function () {
  var els = document.querySelectorAll('.s1r');
  if (!els.length) return;
  document.documentElement.classList.add('s1-js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  els.forEach(function (el) {
    var sib = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('s1r'); }) : [];
    var i = sib.indexOf(el);
    el.style.setProperty('--d', (Math.max(0, i) % 6) * 90 + 'ms');
  });
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
