(function(){
  var d=document;d.documentElement.classList.add('lv-js');
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-lvt]');
    if(b){var g=b.getAttribute('data-lvt').split(':')[0];
      d.querySelectorAll('[data-lvt^="'+g+':"]').forEach(function(x){x.setAttribute('style',x.getAttribute(x===b?'data-on':'data-off'));x.setAttribute('aria-selected',x===b)});
      d.querySelectorAll('[data-lvp^="'+g+':"]').forEach(function(p){p.hidden=p.getAttribute('data-lvp')!==b.getAttribute('data-lvt')});return}
    var c=e.target.closest('.lv-chk');
    if(c){c.classList.toggle('on');var box=c.closest('[data-lvc]'),root=box.parentNode;
      var on=[].slice.call(box.querySelectorAll('.lv-chk.on')),gs={};on.forEach(function(x){gs[x.getAttribute('data-g')]=1});var k=Object.keys(gs);
      var n=root.querySelector('[data-lvc-n]'),r=root.querySelector('[data-lvc-r]');
      if(n)n.textContent=on.length+'개 해당';
      if(r)r.textContent=on.length===0?'항목을 눌러 확인해 보세요':(k.length>=2?'종합 진단을 추천해요':k[0]+' 진단부터 시작해 보세요')}
  });
  var els=d.querySelectorAll('.lv-in>*');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(function(x){x.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(x){io.observe(x)});
})();