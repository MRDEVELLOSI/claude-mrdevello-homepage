(()=>{
 'use strict';
 const routes=new Set(["/", "/mr-starter/", "/mr-team/", "/mr-pro/", "/mr-booster/", "/intro/philosophy/", "/inquiry/", "/mr-check/"]);
 const requested=new Set();
 function prefetch(event){
  const link=event.target.closest?.('a[href]');
  if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const url=new URL(link.href,location.href);
  const path=url.pathname.replace(/\/?$/,'/');
  if(url.origin!==location.origin||url.search||!routes.has(path)||path===location.pathname.replace(/\/?$/,'/')||requested.has(path))return;
  requested.add(path);
  const hint=document.createElement('link');hint.rel='prefetch';hint.as='document';hint.href=path;document.head.append(hint);
 }
 document.addEventListener('pointerover',prefetch,{passive:true});
 document.addEventListener('focusin',prefetch);
 if('serviceWorker' in navigator){
  const register=()=>navigator.serviceWorker.register('/font-cache.e469a78155ff.js',{scope:'/',updateViaCache:'none'}).catch(()=>{});
  if(document.readyState==='complete')register();else addEventListener('load',register,{once:true});
 }
})();