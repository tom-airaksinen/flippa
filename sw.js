const CACHE = "flashcards-v434";
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

// Lägg till filer i cachen, en i taget och utan att ge upp på den första som fallerar.
// Promise.all gjorde förut hela installationen misslyckad om EN fil strulade – och en
// misslyckad install betyder att ingenting alls cachas. Returnerar vad som inte gick.
async function cachaSaknade(c, lista) {
  const misslyckade = [];
  for (const u of lista) {
    if (await c.match(u, MATCH)) continue;                 // redan på plats
    // Två försök: "reload" kringgår webbläsarens HTTP-cache (annars kan en gammal
    // app.js hämtas ur disk-cachen och sparas under det nya cachenamnet). Går det
    // inte, pröva en helt vanlig hämtning hellre än att lämna luckan.
    for (const init of [{ cache: "reload" }, {}]) {
      try { await c.add(new Request(u, init)); break; } catch (_) {}
    }
    if (!(await c.match(u, MATCH))) misslyckade.push(u);
  }
  return misslyckade;
}

const LOKALA = ASSETS.filter((u) => !u.startsWith("http"));
const CDN = ASSETS.filter((u) => u.startsWith("http"));

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      const kvar = await cachaSaknade(c, LOKALA);
      // Installationen får INTE falla på en enstaka fil: då cachas ingenting, och
      // appen går inte att starta offline alls. Luckan syns i stället på
      // versionsraden (Inställningar → Om) och lagas vid nästa aktivering.
      if (kvar.length) console.warn("Flippa: kunde inte cacha", kvar);
      await cachaSaknade(c, CDN);                           // best-effort
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE && k !== AUDIO_CACHE).map((k) => caches.delete(k)));
    // Laga luckor som installationen lämnade. Här finns nät oftare än vid install,
    // och appen läker alltså sig själv i stället för att vara trasig först när den
    // behövs offline.
    const c = await caches.open(CACHE);
    const kvar = await cachaSaknade(c, LOKALA);
    if (kvar.length) console.warn("Flippa: saknas fortfarande i cachen", kvar);
    await self.clients.claim();
  })());
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
    // Försök laga innan vi rapporterar: frågan ställs när appen är öppen, alltså
    // oftast med nät. En varning som försvinner av sig själv är bättre än en som
    // bara konstaterar.
    const saknas = await cachaSaknade(c, LOKALA);
    const svar = { type: "flippa-cachestatus", har: LOKALA.length - saknas.length,
                   av: LOKALA.length, saknas };
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
