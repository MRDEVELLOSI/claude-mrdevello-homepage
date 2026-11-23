'use strict';
const FONT_URLS=["/assets/ee4c2bbea821cbb753.woff2", "/assets/2492a9ad5187d51bb7.woff2", "/assets/cfe044d7979cbfc5d5.woff2", "/assets/ab444ce85c2f70c306.woff2", "/assets/70a91f055992c0ccbe.woff2"];
const CACHE='devello-fonts-v1';
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
