'use strict';
const FONT_URLS=["/assets/pretendard-variable.9599f12fd42f.woff2"];
const CACHE='devello-fonts-pretendard-v1';
self.addEventListener('install',event=>event.waitUntil(
 caches.open(CACHE).then(cache=>cache.addAll(FONT_URLS)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||url.search||!FONT_URLS.includes(url.pathname))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const saved=await cache.match(event.request);
  if(saved)return saved;
  const response=await fetch(event.request);
  if(response.ok)await cache.put(event.request,response.clone());
  return response;
 }).catch(()=>fetch(event.request)));
});
