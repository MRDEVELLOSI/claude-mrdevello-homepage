/* WHY? (/intro/why/) — 히어로 타이핑, 퀄리티 슬라이드 */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HUE = ['#10A0E8', '#FCD448', '#FC6C28', '#04B84C', '#8B6CF0'];
  const CARET = ['#2F8CF0', '#F6B91B', '#F0573C', '#1FA855', '#8B6CF0'];

  /* ---------- 히어로: "____ 다릅니다" 타이핑 ---------- */
  const type = document.querySelector('.wy-type');
  if (type) {
    const words = JSON.parse(type.dataset.words || '[]');
    const out = type.querySelector('.wy-type-t');
    const caret = type.querySelector('.wy-caret');
    const chips = [...document.querySelectorAll('.wy-kw')];
    const paint = (text, w) => {
      out.textContent = '';
      let n = 0;
      [...(text || ' ')].forEach((ch) => {
        const s = document.createElement('span');
        s.textContent = ch;
        if (ch !== ' ') s.style.color = HUE[n++ % HUE.length];
        out.appendChild(s);
      });
      caret.style.background = CARET[w % CARET.length];
      chips.forEach((c, i) => c.classList.toggle('is-on', i === w));
    };
    if (reduce || !words.length) {
      paint(words[0] || '', 0);
    } else {
      let w = 0, n = words[0].length, del = false, hold = 18;
      paint(words[0], 0);
      const tick = () => {
        const word = words[w];
        if (hold > 0) { hold--; }
        else if (!del) {
          if (n < word.length) n++; else { del = true; hold = 18; }
        } else if (n > 0) n--;
        else { del = false; w = (w + 1) % words.length; hold = 3; }
        paint(words[w].slice(0, n), w);
      };
      let timer = setInterval(tick, 90);
      document.addEventListener('visibilitychange', () => {
        clearInterval(timer);
        if (!document.hidden) timer = setInterval(tick, 90);
      });
    }
  }

  /* ---------- 03 퀄리티: 프로젝트 슬라이드 ---------- */
  const q = document.querySelector('.wy-quality');
  if (q) {
    const slides = JSON.parse(q.dataset.slides || '[]');
    const logo = q.querySelector('.wy-q-logo');
    const name = q.querySelector('.wy-q-name');
    const desc = q.querySelector('.wy-q-desc');
    const tags = q.querySelector('.wy-q-tags');
    const count = q.querySelector('.wy-q-count b');
    const bar = q.querySelector('.wy-q-bar i');
    const phones = [...q.querySelectorAll('.wy-phone')];
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    let cur = 0;
    const show = (i) => {
      cur = (i + slides.length) % slides.length;
      const s = slides[cur];
      logo.src = '/intro/why/q/logo-' + s.k + '.webp';
      logo.alt = s.n;
      name.textContent = s.n;
      desc.innerHTML = s.d.split('\n').map(esc).join(' <br>');
      tags.innerHTML = s.t.map((t) => '<li>' + esc(t) + '</li>').join('');
      count.textContent = String(cur + 1).padStart(2, '0');
      bar.style.marginLeft = (cur / slides.length * 100) + '%';
      phones.forEach((p, j) => {
        const t = slides[(cur + j) % slides.length];
        const img = p.querySelector('.wy-phone-shot');
        img.src = '/intro/why/q/thumb-' + t.k + '.webp';
        img.alt = j === 0 ? t.n + ' 실제 서비스 화면' : '';
      });
    };
    q.querySelectorAll('.wy-q-btn').forEach((b) => b.addEventListener('click', () => show(cur + Number(b.dataset.dir))));
    // 스와이프 (모바일)
    let x0 = null;
    const right = q.querySelector('.wy-phones');
    right.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    right.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    // 다음 화면 미리 불러오기
    slides.forEach((s) => { const im = new Image(); im.src = '/intro/why/q/thumb-' + s.k + '.webp'; });
  }
})();
