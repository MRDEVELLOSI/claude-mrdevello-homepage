(function(){
  var root=document.getElementById('proof-sections'); if(!root) return;
  // 07 아코디언
  var its=[].slice.call(root.querySelectorAll('.pf2-it'));
  its.forEach(function(it){ it.querySelector('.pf2-btn').addEventListener('click',function(){
    its.forEach(function(o){ var on=o===it; o.classList.toggle('is-open',on); o.querySelector('.pf2-btn').setAttribute('aria-expanded',String(on)); });
  }); });
  // 등장 애니메이션
  var targets=[].slice.call(root.querySelectorAll('.reveal-pf,.pf3'));
  if(!('IntersectionObserver' in window)){ targets.forEach(function(t){t.classList.add('is-in')}); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } }); },{threshold:.2,rootMargin:'0px 0px -8% 0px'});
  targets.forEach(function(t,i){ if(t.classList.contains('pf1-row')) t.style.transitionDelay=(i%6)*70+'ms'; io.observe(t); });
  // 네비 활성 표시
  var pills=[].slice.call(root.querySelectorAll('.pf-pill'));
  var secs=pills.map(function(p){ return document.querySelector(p.getAttribute('href')); });
  var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ var k=secs.indexOf(e.target); pills.forEach(function(p,j){ p.classList.toggle('is-on',j===k); }); } }); },{threshold:.35});
  secs.forEach(function(s){ if(s) io2.observe(s); });
})();
