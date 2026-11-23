(()=>{'use strict';
 const report=document.querySelector('#check_report');if(!report)return;
 const viewport=report.querySelector('.service-report-viewport'),track=report.querySelector('.service-report-track'),slides=[...track.children];
 const count=report.querySelector('output');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let index=0,paused=reduced.matches,hover=false,focused=false,visible=true,timer;
 function syncTimer(){clearTimeout(timer);if(!paused&&!hover&&!focused&&visible&&!document.hidden)timer=setTimeout(()=>{select(index+1);},6500);}
 function select(next,manual=false){if(manual)paused=true;index=(next+slides.length)%slides.length;track.style.transform=`translate3d(${-index*100}%,0,0)`;slides.forEach((slide,i)=>{slide.inert=i!==index;slide.setAttribute('aria-hidden',String(i!==index));});count.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');count.setAttribute('aria-live',manual?'polite':'off');syncTimer();}
 function size(){report.style.setProperty('--report-scale',viewport.getBoundingClientRect().width/794);}
 report.querySelector('[data-report-prev]').addEventListener('click',()=>select(index-1,true));
 report.querySelector('[data-report-next]').addEventListener('click',()=>select(index+1,true));
 report.addEventListener('keydown',event=>{if(event.key===' '&&event.target===report){event.preventDefault();paused=!paused;syncTimer();return;}if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();select(index+(event.key==='ArrowRight'?1:-1),true);}});
 report.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hover=true;syncTimer();}});
 report.addEventListener('pointerleave',()=>{hover=false;syncTimer();});
 report.addEventListener('focusin',()=>{focused=true;syncTimer();});
 report.addEventListener('focusout',event=>{focused=report.contains(event.relatedTarget);syncTimer();});
 let start;viewport.addEventListener('touchstart',event=>{start=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;},{passive:true});
 viewport.addEventListener('touchend',event=>{if(!start)return;const end=event.changedTouches[0],dx=end.clientX-start.x,dy=end.clientY-start.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)select(index+(dx<0?1:-1),true);start=null;},{passive:true});
 const resize=new ResizeObserver(size);resize.observe(viewport);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncTimer();},{threshold:.1});observer.observe(report);
 const visibility=()=>syncTimer();document.addEventListener('visibilitychange',visibility);
 const motion=()=>{if(reduced.matches)paused=true;syncTimer();};reduced.addEventListener('change',motion);
 addEventListener('pagehide',()=>{clearTimeout(timer);resize.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',motion);});
 addEventListener('pageshow',event=>{if(event.persisted){resize.observe(viewport);observer.observe(report);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',motion);size();syncTimer();}});
 size();select(0);syncTimer();
})();
