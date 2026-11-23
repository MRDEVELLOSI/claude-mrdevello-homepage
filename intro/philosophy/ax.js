(()=>{
 const root=document.querySelector('.axp');if(!root||!('IntersectionObserver' in window))return;
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const sel='.ax h1,.ax h2,.ax h3,.ax section p,.ax section [style*="display:grid"]>*,.ax .axbd,.ax .axq,.ax .bk,.ax section [style*="display:flex;align-items:center;justify-content:center;gap:24px"]>*,.ax section [style*="display:flex;align-items:stretch"]>*,.ax section [style*="position:relative;height:380px"]>*,.ax section [style*="display:flex;align-items:center;gap:20px"]>*,.ax section [style*="justify-content:center;align-items:flex-end;gap:120px"]>*,.ax section [style*="width:720px"],.ax section [style*="width:760px"],.ax section [style*="border-radius:40px"]';
 const tagged=[];
 root.querySelectorAll(sel).forEach(el=>{if(el.closest('.sr'))return;el.classList.add('sr');tagged.push(el);});
 // 같은 부모 안 형제끼리 순차 딜레이
 const groups=new Map();tagged.forEach(el=>{const p=el.parentElement;const n=groups.get(p)||0;el.style.setProperty('--d',(Math.min(n,8)*0.09)+'s');groups.set(p,n+1);});
 root.classList.add('sr-on');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -12% 0px',threshold:0.08});
 tagged.forEach(el=>io.observe(el));
 const first=root.querySelector('.ax>section');if(first)first.querySelectorAll('.sr').forEach(el=>requestAnimationFrame(()=>el.classList.add('is-in')));
})();