const CACHE = "flashcards-v430";
// Uttalsfilerna ändras inte mellan versioner och ska inte hämtas om vid varje deploy →
// egen cache som överlever versionsbytet. Den fylls på när ett ord spelas första gången,
// så lektioner man kört fungerar sedan offline.
const AUDIO_CACHE = "flippa-audio-v1";
// GitHub Pages skickar "Vary: Accept-Encoding" på ALLT. Utan ignoreVary levererar
// Cache Storage bara ett sparat svar när förfrågans Accept-Encoding är exakt densamma
// som när svaret sparades – och en SIDNAVIGERING skickar andra rubriker än den fetch()
// installationen gjorde. Följden: index.html låg i cachen men hittades inte, och appen
// gick inte att starta utan nät (flygplan 2026-10-24). Gäller varje match i filen.
const MATCH = { ignoreVary: true };
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./firebase-config.js",
  "./data/changelog.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./mall.csv",                 // hjälpens CSV-mall – liten, och länken ska funka offline
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      // cache:"reload" tvingar nätverk och kringgår webbläsarens HTTP-cache. Annars kan
      // en gammal app.js/style.css (GitHub Pages sätter max-age=600) hämtas ur disk-cachen
      // och cachas under det NYA cache-namnet → man fastnar på gammal version trots ny SW.
      const fresh = (u) => c.add(new Request(u, { cache: "reload" }));
      // Lokala filer MÅSTE cachas (annars är installationen meningslös)
      await Promise.all(ASSETS.filter((u) => !u.startsWith("http")).map(fresh));
      // CDN-filer (Firebase) cachas best-effort – får inte blockera uppdateringen
      await Promise.allSettled(ASSETS.filter((u) => u.startsWith("http")).map(fresh));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE && k !== AUDIO_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ---- Push-notiser (daglig påminnelse) ----
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = {}; }
  const title = d.title || "Dags att flippa!";
  const body = d.body || "Kör ett pass direkt";
  const url = d.url || "./";
  e.waitUntil(self.registration.showNotification(title, {
    body,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: "flippa-daglig",   // ersätter ev. tidigare (ingen stapel)
    data: { url },
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) {
      if ("focus" in c) { try { c.postMessage({ type: "flippa-open-subject" }); } catch (_) {} return c.focus(); }
    }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  })());
});

// Appen frågar om den är offline-klar (Inställningar → Om). Utan det här går det
// inte att veta förrän man står utan nät och appen vägrar starta.
self.addEventListener("message", (e) => {
  if (!e.data || e.data.type !== "flippa-cachestatus") return;
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    const lokala = ASSETS.filter((u) => !u.startsWith("http"));
    const finns = await Promise.all(lokala.map((u) => c.match(u, MATCH).then((r) => !!r)));
    const svar = { type: "flippa-cachestatus", har: finns.filter(Boolean).length, av: lokala.length,
                   saknas: lokala.filter((_, i) => !finns[i]) };
    (e.source ? [e.source] : await self.clients.matchAll()).forEach((k) => k.postMessage(svar));
  })());
});

self.addEventListener("fetch", (e) => {
  const url = e.request.url;
  // Firebase realtime/auth-trafik ska alltid gå till nätet
  if (url.includes("firebasedatabase.app") || url.includes("identitytoolkit") || url.includes("googleapis.com")) {
    return; // låt webbläsaren hantera (nätverk)
  }
  // Uttalsfiler: cache-first mot den egna cachen, annars hämta och spara.
  // BARA ljudfilerna. Manifestet (index.json) måste gå till nätet – det ändras när nya
  // ord fått ljud, och cache-first gjorde att appen satt kvar på en gammal lista och
  // trodde att de nya orden saknade uttal.
  if (url.includes("/audio/") && url.split("?")[0].endsWith(".mp3")) {
    e.respondWith(
      caches.open(AUDIO_CACHE).then((c) =>
        c.match(e.request, MATCH).then((hit) =>
          hit || fetch(e.request).then((r) => {
            if (r.ok) c.put(e.request, r.clone());
            return r;
          })
        )
      )
    );
    return;
  }
  e.respondWith((async () => {
    const cached = await caches.match(e.request, MATCH);
    if (cached) return cached;
    try {
      const svar = await fetch(e.request);
      // Fyll på cachen under vanlig användning. Installationen kan ha misslyckats
      // (dåligt nät) eller cachen ha rensats av systemet – då läker appen sig själv
      // nästa gång den används med nät, i stället för att vara tom först när den
      // behövs offline. Bara egna GET-filer utan frågesträng: sw.js?cb= och
      // index.json?v= MÅSTE gå till nätet för att uppdateringar ska upptäckas.
      if (svar.ok && e.request.method === "GET" && url.startsWith(self.registration.scope)
          && !url.includes("?") && !url.endsWith("/sw.js")) {
        const kopia = svar.clone();
        e.waitUntil(caches.open(CACHE).then((c) => c.put(e.request, kopia)).catch(() => {}));
      }
      return svar;
    } catch (err) {
      // Offline OCH inget i cachen. Utan det här kastades felet vidare, och för en
      // SIDNAVIGERING betyder det Safaris "FetchEvent.respondWith received an error"
      // i stället för appen – alltså ingen offline-app alls, vilket är hela poängen
      // med en PWA. (Hände på ett flygplan 2026-10-24.)
      if (e.request.mode === "navigate") {
        const start = await caches.match("./index.html", MATCH) || await caches.match("./", MATCH);
        if (start) return start;
      }
      // Övriga resurser: ett riktigt svar i stället för ett kastat fel. Anropande kod
      // kollar r.ok; en avvisad fetch kräver .catch överallt och ger dessutom en
      // skrämmande rad i konsolen för varje misslyckad begäran.
      return new Response("", { status: 503, statusText: "offline" });
    }
  })());
});
