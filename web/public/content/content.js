(function () {
  var root = document.querySelector('.ch-page');
  if (!root) return;
  document.documentElement.classList.add('ch-js');

  // reveal
  var els = root.querySelectorAll('[data-sr]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 6) * 60 + 'ms'; io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('is-in'); }); }

  // jump bar scroll-spy
  var links = root.querySelectorAll('.ch-jump a[data-jump]');
  var secs = Array.prototype.map.call(links, function (a) { return document.getElementById(a.getAttribute('data-jump')); });
  function spy() {
    var y = window.scrollY + 160, cur = 0;
    secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('is-on', i === cur); });
  }
  window.addEventListener('scroll', spy, { passive: true }); spy();

  // blog category filter
  var btns = root.querySelectorAll('.ch-filter button');
  var rows = root.querySelectorAll('.ch-blog-row');
  var more = root.querySelector('.ch-blog-more');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-cat');
      btns.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      rows.forEach(function (r) { r.hidden = c === 'all' ? !r.hasAttribute('data-all') : r.getAttribute('data-cat') !== c; if (!r.hidden) r.classList.add('is-in'); });
      if (more) { if (c === 'all') { more.href = 'https://blog.naver.com/mrdevello'; more.firstChild.nodeValue = '블로그 전체 보기 '; } else { more.href = more.getAttribute('data-base') + c; more.firstChild.nodeValue = b.firstChild.nodeValue + ' 글 더 보기 '; } }
    });
  });
})();
