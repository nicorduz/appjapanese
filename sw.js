const CACHE="jp-estudio-v8";
const ASSETS=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./favicon.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;                    // POST (p.ej. la llamada a Gemini) pasa directo a la red
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;      // nada de otro dominio se intercepta (Gemini incluido)
  e.respondWith(
    caches.match(req).then(hit=>hit||fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
      return res;
    }).catch(()=>req.mode==="navigate"?caches.match("./index.html"):undefined))
  );
});
