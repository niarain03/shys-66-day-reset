const CACHE='shy-reset-v4';
const ASSETS=["./", "./index.html", "./styles.css", "./manifest.webmanifest", "./icon.svg", "./sw.js", "./app-1.js", "./app-2.js", "./app-3.js", "./app-4.js", "./app-5.js", "./app-6.js", "./app-7.js"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
