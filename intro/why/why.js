/* WHY? (/intro/why/) — 히어로 타이핑 · 퀄리티 캐러셀(메인과 동일 동작) · 카톡 팝업 슬라이드 */
(() => {
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
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
    if (reduceMQ.matches || !words.length) {
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

  /* ---------- 03 퀄리티: mrdevello.com 메인 캐러셀과 동일 동작 ---------- */
  const q = document.getElementById('why-3');
  if (q) {
    const cases = JSON.parse(q.querySelector('[data-quality-cases]').textContent);
    const icons = JSON.parse(q.querySelector('[data-quality-icons]').textContent);
    const phones = [...q.querySelectorAll('.mrd-quality__phone')];
    const rail = q.querySelector('.mrd-quality__rail');
    const logoBox = q.querySelector('.mrd-quality__logo');
    const logo = q.querySelector('[data-quality-logo]');
    const title = q.querySelector('[data-quality-title]');
    const desc = q.querySelector('[data-quality-description]');
    const count = q.querySelector('[data-quality-count]');
    const copy = q.querySelector('.mrd-quality__copy');
    let cur = 0, inView = false;

    const layout = () => {
      const cs = getComputedStyle(q);
      const w = parseFloat(cs.getPropertyValue('--phone-w'));
      const step = parseFloat(cs.getPropertyValue('--phone-step'));
      phones.forEach((p, i) => {
        let r = (i - cur + phones.length) % phones.length;
        if (r === phones.length - 1) r = -1;
        p.style.setProperty('--x', (r === 0 ? 0 : r < 0 ? -w - 40 : w + 20 + (r - 1) * step) + 'px');
        p.style.setProperty('--scale', r === 0 ? '1' : '.8');
        p.style.opacity = r < 0 || r > 3 ? '0' : '1';
        p.style.pointerEvents = r < 0 || r > 3 ? 'none' : '';
      });
    };
    const sync = () => {
      phones.forEach((p, i) => {
        const v = p.querySelector('video');
        if (i !== cur || !inView || reduceMQ.matches || document.hidden) { v.pause(); return; }
        if (!v.getAttribute('src')) { v.src = v.dataset.src; v.load(); }
        v.muted = true;
        v.play().catch(() => {});
      });
    };
    const detail = (text, icon) => {
      const s = document.createElement('span');
      if (icon && icons[icon]) {
        s.classList.add('has-icon');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 18 18');
        svg.setAttribute('aria-hidden', 'true');
        svg.innerHTML = icons[icon];
        s.append(svg);
      }
      s.append(document.createTextNode(text));
      return s;
    };
    const show = (n) => {
      const next = (n + cases.length) % cases.length;
      const changed = next !== cur;
      cur = next;
      phones.forEach((p, i) => {
        p.classList.toggle('is-active', i === cur);
        p.setAttribute('aria-pressed', String(i === cur));
        p.tabIndex = i === cur ? 0 : -1;
        if (i !== cur) { p.querySelector('video').pause(); p.classList.remove('is-playing'); }
      });
      const c = cases[cur];
      logoBox.hidden = !c.logo;
      if (c.logo) { logo.src = c.logo; logo.alt = c.title; logo.style.setProperty('--quality-logo-scale', c.logoScale || 1); }
      title.textContent = c.title;
      desc.textContent = c.description;
      q.style.setProperty('--case-accent', c.accent);
      q.querySelector('[data-quality-details]').replaceChildren(...c.details.map((t, i) => detail(t, c.detailIcons && c.detailIcons[i])));
      count.textContent = String(cur + 1).padStart(2, '0');
      if (changed) {
        if (!reduceMQ.matches && copy.animate) copy.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300 });
        const v = phones[cur].querySelector('video');
        phones[cur].style.setProperty('--progress', '0');
        if (v.getAttribute('src')) v.currentTime = 0;
      }
      layout();
      sync();
    };

    q.querySelector('[data-quality-prev]').addEventListener('click', () => show(cur - 1));
    q.querySelector('[data-quality-next]').addEventListener('click', () => show(cur + 1));
    phones.forEach((p, i) => {
      p.addEventListener('click', () => show(i));
      const v = p.querySelector('video');
      v.addEventListener('playing', () => p.classList.add('is-playing'));
      v.addEventListener('timeupdate', () => {
        if (i === cur && Number.isFinite(v.duration) && v.duration > 0) p.style.setProperty('--progress', String(Math.min(1, v.currentTime / v.duration)));
      });
      v.addEventListener('ended', () => { if (i === cur && inView && !reduceMQ.matches) show(cur + 1); });
    });
    rail.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      show(e.key === 'Home' ? 0 : e.key === 'End' ? cases.length - 1 : cur + (e.key === 'ArrowRight' ? 1 : -1));
    });
    let start = null, swiped = false;
    rail.addEventListener('pointerdown', (e) => { if (e.isPrimary && e.button === 0) start = { x: e.clientX, y: e.clientY }; });
    rail.addEventListener('pointerup', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > 1.3 * Math.abs(dy)) { swiped = true; show(cur + (dx < 0 ? 1 : -1)); }
    });
    rail.addEventListener('pointercancel', () => { start = null; });
    rail.addEventListener('click', (e) => { if (swiped) { e.stopImmediatePropagation(); e.preventDefault(); swiped = false; } }, true);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((en) => { inView = en[0].isIntersecting; sync(); }, { threshold: 0.15 }).observe(rail);
    } else { inView = true; }
    document.addEventListener('visibilitychange', sync);
    if (reduceMQ.addEventListener) reduceMQ.addEventListener('change', sync);
    window.addEventListener('resize', layout);
    show(0);
  }

  /* ---------- 05 대응속도: 카톡 원문 팝업 슬라이드 ---------- */
  const dlg = document.querySelector('.wy-kkm');
  if (dlg) {
    const slides = [...dlg.querySelectorAll('.wy-kkm-slide')];
    const num = dlg.querySelector('.wy-kkm-n b');
    let at = 0, opener = null;
    const go = (i) => {
      at = (i + slides.length) % slides.length;
      slides.forEach((s, j) => { s.classList.toggle('is-on', j === at); s.setAttribute('aria-hidden', String(j !== at)); });
      num.textContent = String(at + 1);
    };
    const open = (i, btn) => {
      opener = btn;
      go(i);
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      document.documentElement.classList.add('wy-modal-open');
    };
    const close = () => { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    dlg.addEventListener('close', () => {
      document.documentElement.classList.remove('wy-modal-open');
      if (opener) opener.focus();
    });
    document.querySelectorAll('[data-kk-open]').forEach((b) => b.addEventListener('click', () => open(Number(b.dataset.kkOpen), b)));
    dlg.querySelector('.wy-kkm-x').addEventListener('click', close);
    dlg.querySelectorAll('.wy-kkm-nav').forEach((b) => b.addEventListener('click', () => go(at + Number(b.dataset.dir))));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1); }
    });
    let sx = null;
    const stage = dlg.querySelector('.wy-kkm-stage');
    stage.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(at + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }
})();
