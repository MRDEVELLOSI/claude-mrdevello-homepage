(function(){
  if(!('IntersectionObserver' in window)) return;
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var $=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('tm-in');io.unobserve(e.target);}});},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  // [선택자, 효과, 간격(ms), 묶음 기준]
  function add(sel,kind,step,scope){
    if(scope){ $(scope).forEach(function(g){ $(sel,g).forEach(function(el,i){ mark(el,kind,i*step); }); }); }
    else { $(sel).forEach(function(el,i){ mark(el,kind,i*step); }); }
  }
  function mark(el,kind,delay){
    if(el.classList.contains('tm')||el.classList.contains('reveal-pf')) return;
    var r=el.getBoundingClientRect(); if(r.top<innerHeight*.9&&r.bottom>0) return; // 이미 보이는 건 그대로
    el.classList.add('tm'); if(kind) el.setAttribute('data-tm',kind); if(delay) el.style.setProperty('--tmd',delay+'ms'); io.observe(el);
  }
  // 06~09 증명
  add('#proof-sections .pf-intro > *','',110);
  add('.pf-head__l > *, .pf-head > :not(.pf-head__l)','',100,'#proof-sections .pf-head');
  add('#proof-sections .pf2-it','',80);
  add('#proof-sections .pf3 > *','',90);
  add('#proof-sections .pf4-row','scale',120);
  add('#proof-sections .pf-btn','pop',90);
  // 마지막 CTA
  add('#last-cta .ls-intro > *','',120);
  add('#last-cta .ls-card','scale',130);
  add('#last-cta .ls-sub > *','',100);
  add('#last-cta .ls-svc','pop',70);
  add('#last-cta .ls-dets','',0);
  add('#last-cta .ls-cta__in','wide',0);
  add('#last-cta .ls-cta__l > *','',120);
  add('#last-cta .ls-cta__card','left',250);
  // 푸터
  add('footer.mf .mf-top > *, footer.mf .mf-bottom','',100,'footer.mf');
  // 형광펜 그리기
  $('#proof-sections .pf-mk, #last-cta .ls-mk').forEach(function(m){ m.classList.add('tm-mk'); io.observe(m); });
  // 숫자 카운트업 (블로그 편수 등)
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){ if(!e.isIntersecting) return; cio.unobserve(e.target);
    var t=e.target.firstChild; if(!t||t.nodeType!==3) return; var m=t.nodeValue.match(/^([\d,]+)(.*)$/); if(!m) return;
    var end=parseInt(m[1].replace(/,/g,''),10), rest=m[2], t0=null, dur=1400, dl=parseFloat(getComputedStyle(e.target).getPropertyValue('--dl'))||0;
    t.nodeValue='0'+rest;
    setTimeout(function(){ requestAnimationFrame(function step(ts){ if(!t0)t0=ts; var p=Math.min(1,(ts-t0)/dur), v=Math.round(end*(1-Math.pow(1-p,3)));
      t.nodeValue=v.toLocaleString('ko-KR')+rest; if(p<1) requestAnimationFrame(step); }); }, dl*1000*.5);
  });},{threshold:.4});
  $('#proof-sections .pf3-count, #proof-sections .pf3-stats b').forEach(function(c){ cio.observe(c); });
})();
