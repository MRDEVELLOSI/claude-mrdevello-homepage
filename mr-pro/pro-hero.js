(() => {
  'use strict';
  function mount() {
    const root = document.querySelector('[data-pro-carousel]');
    if (!root || root.dataset.ready === 'true') return;
    root.dataset.ready = 'true';
    const rail = root.querySelector('.pro-hero-rail');
    const phones = [...root.querySelectorAll('[data-pro-phone]')];
    const choices = [...root.querySelectorAll('[data-pro-project]')];
    const logos = [...root.querySelectorAll('[data-pro-logo-item]')];
    const description = root.querySelector('[data-pro-description]');
    const count = root.querySelector('[data-pro-count]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const controller = new AbortController();
    const options = {signal: controller.signal};
    const frames = new Set();
    let active = Number(root.dataset.active || 0), visible = false, timer;
    let paused = false, hovering = false, focused = false, gesture = null, suppressClick = false;
    const later = callback => {
      const id = requestAnimationFrame(() => {frames.delete(id);callback();});
      frames.add(id);
    };
    const canRun = () => visible && !document.hidden && !reduced.matches && !paused && !hovering && !focused;
    function sync() {
      clearTimeout(timer);
      const running = canRun();
      const playing = visible && !document.hidden && !reduced.matches && !paused;
      root.dataset.running = String(running);
      root.dataset.paused = String(paused || reduced.matches);
      phones.forEach((phone,index) => {
        const video = phone.querySelector('video');
        if (!playing || index !== active) {video.pause();return;}
        if (!video.getAttribute('src')) {video.src = video.dataset.src;video.load();}
        video.muted = true;
        video.play().catch(() => {});
      });
      if (running) timer = setTimeout(() => select(active + 1), 8000);
    }
    // Same viewport-height fitting rule as STARTER's live mobile prototype.
    const copy = document.querySelector('#pro_hero .service-hero-copy');
    const grid = document.querySelector('#pro_hero .service-hero-grid');
    const understage = root.querySelector('.pro-hero-understage');
    function fit() {
      const available = copy.clientWidth;
      if (!available) return;
      const desktop = matchMedia('(min-width:1024px)').matches;
      const cap = desktop ? 350 : 320;
      const viewportFit = matchMedia('(min-width:1280px)').matches && grid.clientHeight > 0;
      const maxHeight = viewportFit
        ? Math.min(680, Math.max(240, grid.clientHeight - understage.offsetHeight - 18))
        : desktop ? Math.min(680, Math.max(560, window.innerHeight - 300)) : 800;
      const width = Math.min(available, cap, maxHeight / 856 * 402);
      const height = width / 402 * 856;
      root.style.setProperty('--phone-width', width + 'px');
      root.style.setProperty('--phone-height', height + 'px');
      root.style.setProperty('--phone-scale', String(width / 402));
      root.style.setProperty('--phone-column', available + 'px');
      position();
    }
    function position() {
      const width = parseFloat(getComputedStyle(phones[0]).width);
      phones.forEach((phone,index) => {
        const offset = (index - active + phones.length) % phones.length;
        const relative = offset === phones.length - 1 ? -1 : offset;
        const previous = Number(phone.dataset.relative);
        const wrapping = previous === -1 && relative > 0;
        if (wrapping) phone.classList.add('is-wrapping');
        phone.dataset.relative = String(relative);
        const x = relative < 0 ? -width - 32 : relative === 0 ? 0 : width + 18 + (relative - 1) * (width * .8 + 18);
        phone.style.transform = `translateX(${x}px) scale(${relative === 0 ? 1 : .8})`;
        phone.style.opacity = relative < 0 ? '0' : '1';
        phone.style.pointerEvents = relative < 0 ? 'none' : '';
        if (wrapping) later(() => later(() => phone.classList.remove('is-wrapping')));
      });
    }
    function select(index) {
      active = (index + phones.length) % phones.length;
      root.dataset.active = String(active);
      root.dataset.brand = phones[active].dataset.projectId;
      // Keep each logo image and its geometry together; switching never changes src.
      logos.forEach((item,index) => {item.hidden = index !== active;});
      description.textContent = phones[active].dataset.projectDescription;
      count.textContent = `${String(active + 1).padStart(2,'0')} / ${String(phones.length).padStart(2,'0')}`;
      choices.forEach((choice,index) => choice.setAttribute('aria-pressed',String(index === active)));
      phones.forEach((phone,index) => {
        const chosen = index === active;
        phone.classList.toggle('is-active',chosen);
        phone.setAttribute('aria-pressed',String(chosen));
        phone.tabIndex = chosen ? 0 : -1;
        const video = phone.querySelector('video');
        video.pause();
        if (chosen && video.readyState > 0) video.currentTime = 0;
        if (!chosen) phone.classList.remove('is-playing');
      });
      position();sync();
    }
    choices.forEach((choice,index) => choice.addEventListener('click',() => select(index),options));
    root.querySelector('[data-pro-prev]').addEventListener('click',() => select(active - 1),options);
    root.querySelector('[data-pro-next]').addEventListener('click',() => select(active + 1),options);
    phones.forEach((phone,index) => {
      phone.addEventListener('click',() => select(index),options);
      const video = phone.querySelector('video');
      video.addEventListener('playing',() => phone.classList.add('is-playing'),options);
      video.addEventListener('error',() => phone.classList.remove('is-playing'),options);
    });
    rail.addEventListener('keydown',event => {
      if (event.key === ' ' || event.key === 'Escape') {event.preventDefault();paused = event.key === 'Escape' || !paused;sync();return;}
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      select(event.key === 'Home' ? 0 : event.key === 'End' ? phones.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1));
      rail.focus();
    },options);
    rail.addEventListener('pointerdown',event => {
      if (event.isPrimary && event.button === 0) gesture = {x:event.clientX,y:event.clientY};
    },options);
    rail.addEventListener('pointerup',event => {
      if (!gesture) return;
      const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;gesture = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        suppressClick = true;select(active + (dx < 0 ? 1 : -1));
      }
    },options);
    rail.addEventListener('pointercancel',() => {gesture = null;},options);
    rail.addEventListener('click',event => {
      if (!suppressClick) return;
      suppressClick = false;event.preventDefault();event.stopImmediatePropagation();
    },{...options,capture:true});
    rail.addEventListener('pointerenter',event => {if (event.pointerType === 'mouse') {hovering = true;sync();}},options);
    rail.addEventListener('pointerleave',() => {hovering = false;sync();},options);
    root.addEventListener('focusin',event => {focused = true;sync();},options);
    root.addEventListener('focusout',event => {if (!root.contains(event.relatedTarget)) {focused = false;sync();}},options);
    document.addEventListener('visibilitychange',sync,options);
    reduced.addEventListener('change',sync,options);
    const observer = new IntersectionObserver(entries => {visible = entries[0].isIntersecting;sync();},{threshold:.15});
    observer.observe(root);
    const resize = new ResizeObserver(fit);resize.observe(copy);resize.observe(grid);
    window.addEventListener('resize',fit,options);
    window.addEventListener('pagehide',() => {
      clearTimeout(timer);frames.forEach(cancelAnimationFrame);observer.disconnect();resize.disconnect();controller.abort();
      phones.forEach(phone => {const video=phone.querySelector('video');video.pause();video.removeAttribute('src');video.load();});
      root.dataset.ready = 'false';
    },{once:true});
    fit();
    select(active);
  }
  mount();
  window.addEventListener('pageshow',event => {if (event.persisted) mount();});
})();
