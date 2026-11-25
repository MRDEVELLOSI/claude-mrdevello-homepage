(function(){
  var h=document.querySelector('.sb'); if(!h) return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nums=[].slice.call(h.querySelectorAll('.sb-facts dd'));
  function count(dd,delay){
    var t=dd.firstChild; if(!t||t.nodeType!==3) return; var end=parseInt(t.nodeValue,10); if(isNaN(end)) return;
    if(reduce){return;} t.nodeValue='0';
    setTimeout(function(){var t0=null,dur=end>20?1600:1100;requestAnimationFrame(function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/dur);t.nodeValue=String(Math.round(end*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(step);});},delay);
  }
  if(reduce){return;}
  h.classList.add('sb-anim');
  var seq=[].concat([].slice.call(h.querySelectorAll('.sb-copy .sh-h1 .sb-ln, .sb-copy .sh-sub1, .sb-copy .sh-sub2')),[].slice.call(h.querySelectorAll('.sb-toc li')),[].slice.call(h.querySelectorAll('.sb-facts > div')));
  seq.forEach(function(el,i){el.classList.add('sb-r');el.style.setProperty('--d',(120+i*80)+'ms');});
  [].slice.call(h.querySelectorAll('.sb-i')).forEach(function(el,i){el.style.setProperty('--d',(700+i*140)+'ms');});
  nums.forEach(function(dd){dd.firstChild&&dd.firstChild.nodeType===3&&(dd.dataset.end=dd.firstChild.nodeValue);});
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    h.classList.add('is-in');
    var base=120+(seq.length-nums.length)*80;
    nums.forEach(function(dd,i){count(dd,base+i*80+250);});
  });});
})();
