/* 공통 스크롤 등장 애니메이션 — 메인 .reveal 과 같은 톤(아래에서 24px, .8s) */
(function(){
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var SEL=(document.currentScript&&document.currentScript.dataset.sel)||'';
  if(!SEL)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('sr-in');io.unobserve(e.target);}});},{threshold:.05,rootMargin:"0px"});
  function mark(root){
    [].slice.call((root||document).querySelectorAll(SEL)).forEach(function(el){
      if(el.classList.contains('sr'))return;
      var r=el.getBoundingClientRect(); if(r.top<innerHeight*.92&&r.bottom>0){return;}
      el.classList.add('sr');
      var sib=el.parentElement?[].slice.call(el.parentElement.children).filter(function(x){return x.matches(SEL)}):[];
      var i=sib.indexOf(el); if(i>0)el.style.setProperty('--srd',Math.min(i,6)*70+'ms');
      io.observe(el);
    });
  }
  mark();
  new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)mark(n.parentElement||n);});});}).observe(document.getElementById('__page')||document.body,{childList:true,subtree:true});
})();
