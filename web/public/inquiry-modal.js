(function(){
  var d=document.getElementById('inq-modal'); if(!d) return;
  var slides=[].slice.call(d.querySelectorAll('.inq__slide')), dots=[].slice.call(d.querySelectorAll('[data-inq-go]')), cap=d.querySelector('.inq__cap'), cur=0;
  function go(i){ cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){ s.hidden=false; s.classList.toggle('is-on',k===cur); s.setAttribute('aria-hidden',String(k!==cur)); });
    dots.forEach(function(b,k){ b.setAttribute('aria-pressed',String(k===cur)); });
    cap.textContent=(cur+1)+' / '+slides.length+' · '+slides[cur].dataset.cap; }
  document.querySelectorAll('[data-inq-open]').forEach(function(b){ b.addEventListener('click',function(){ go(0); d.showModal(); document.documentElement.style.overflow='hidden'; }); });
  d.addEventListener('close',function(){ document.documentElement.style.overflow=''; });
  d.querySelector('[data-inq-close]').addEventListener('click',function(){ d.close(); });
  d.querySelector('[data-inq-prev]').addEventListener('click',function(){ go(cur-1); });
  d.querySelector('[data-inq-next]').addEventListener('click',function(){ go(cur+1); });
  dots.forEach(function(b,k){ b.addEventListener('click',function(){ go(k); }); });
  d.addEventListener('click',function(e){ if(e.target===d) d.close(); });
  d.addEventListener('keydown',function(e){ if(e.key==='ArrowLeft') go(cur-1); if(e.key==='ArrowRight') go(cur+1); });
  go(0);
  var pre=function(){ slides.forEach(function(s){ var im=s.querySelector('img'); if(im&&im.decode) im.decode().catch(function(){}); }); };
  if('requestIdleCallback' in window) requestIdleCallback(pre); else setTimeout(pre,1500);
})();
