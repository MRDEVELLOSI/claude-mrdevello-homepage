(()=>{'use strict';
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const reveal=document.querySelector('[data-text-reveal]');
 let frame=0,watching=false;
 function paint(){frame=0;if(!watching||media.matches||document.hidden)return;const r=reveal.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight*.88-r.top)/(innerHeight*.55)));reveal.style.setProperty('--read',`${progress*100}%`);}
 function schedule(){if(watching&&!frame&&!document.hidden)frame=requestAnimationFrame(paint);}
 const observer=new IntersectionObserver(entries=>{watching=entries[0].isIntersecting;if(watching)schedule();},{rootMargin:'80px'});
 function motion(){reveal.classList.toggle('is-tracking',!media.matches);if(media.matches){observer.disconnect();watching=false;cancelAnimationFrame(frame);frame=0;}else{observer.observe(reveal);schedule();}}
 media.addEventListener('change',motion);motion();
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
 const hover=matchMedia('(hover: hover) and (pointer: fine)');
 document.querySelectorAll('.ph-intent').forEach(card=>{let byHover=false;card.addEventListener('pointerenter',e=>{if(hover.matches&&e.pointerType==='mouse'&&!card.open){byHover=true;card.open=true;}});card.addEventListener('pointerleave',()=>{if(byHover&&!card.contains(document.activeElement)){card.open=false;byHover=false;}});card.querySelector('summary').addEventListener('click',e=>{if(byHover&&e.detail>0){e.preventDefault();byHover=false;}});});
 window.addEventListener('pagehide',()=>{observer.disconnect();cancelAnimationFrame(frame);});window.addEventListener('pageshow',e=>{if(e.persisted)motion();});
})();
