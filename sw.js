/* Nissan ajánlat app: offline gyorsítótár. Az oldal mindig hálózatról jön, ha van net (így a frissítés azonnal megérkezik). */
const C='nissan-v37-d804a35920',PRE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png',
 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'no-cors':'same-origin'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.endsWith('google.com')||u.hostname.endsWith('googleusercontent.com'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put('index.html',y));return x}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{if(y.ok||y.type==='opaque'){const z=y.clone();caches.open(C).then(c=>c.put(r,z))}return y})))});
