// Service workern. Alla tester här kommer från ett fel som hänt på riktigt:
// appen gick inte att starta i flygplansläge 2026-10-24.
import { las, funktion, konstant } from "./hamta.mjs";
import { grupp, test, testAsync, lika, sant } from "./rapport.mjs";

grupp("Service worker – offline");

const sw = las("sw.js");

/** Kör sw.js:s fetch-handler mot en påhittad cache och ett påhittat nät. */
function bygg({ iCachen = [], nat = true, varyKraver = null } = {}) {
  const lagrat = new Map(iCachen.map((u) => [u, { body: "CACHAD " + u, ok: true }]));
  const normalisera = (r) => (typeof r === "string"
    ? new URL(r, "https://flippa.tomairaksinen.se/").href : r.url);
  const traff = (nyckel, opts) => {
    // Härmar Vary: utan ignoreVary krävs att förfrågan bär rubriken som svaret varierar på.
    if (varyKraver && !(opts && opts.ignoreVary)) return undefined;
    return lagrat.get(nyckel);
  };
  const cache = {
    match: async (r, o) => traff(normalisera(r), o),
    put: async (r, v) => { lagrat.set(normalisera(r), v); },
  };
  const caches = { open: async () => cache, match: async (r, o) => traff(normalisera(r), o) };
  const hamtade = [];
  const fetch = async (r) => {
    hamtade.push(typeof r === "string" ? r : r.url);
    if (!nat) throw new TypeError("Load failed");
    return { ok: true, body: "NÄT", clone: () => ({ body: "NÄT" }) };
  };
  return { lagrat, caches, fetch, hamtade };
}

/** Plockar ut fetch-handlerns kropp och kör den för en förfrågan. */
async function svaraPa(miljo, url, mode = "no-cors") {
  const i = sw.indexOf('self.addEventListener("fetch"');
  const kropp = sw.slice(sw.indexOf("{", sw.indexOf("(e) =>", i)) + 1, sw.lastIndexOf("});"));
  let svar;
  const e = {
    request: { url, method: "GET", mode },
    respondWith: (p) => { svar = p; },
    waitUntil: () => {},
  };
  const f = new Function("e", "caches", "fetch", "CACHE", "AUDIO_CACHE", "MATCH", "self", kropp);
  f(e, miljo.caches, miljo.fetch, "c", "a",
    { ignoreVary: true },
    { registration: { scope: "https://flippa.tomairaksinen.se/" } });
  return svar === undefined ? "GICK TILL NÄTET" : await svar;
}

await testAsync("offline: navigering faller tillbaka på cachad index.html", async () => {
  const m = bygg({ iCachen: ["https://flippa.tomairaksinen.se/index.html"], nat: false });
  const r = await svaraPa(m, "https://flippa.tomairaksinen.se/", "navigate");
  lika(r.body, "CACHAD https://flippa.tomairaksinen.se/index.html",
       "navigering offline måste ge startsidan, annars visar webbläsaren sin felsida");
});

await testAsync("offline: navigering utan cache ger 503, inte ett kastat fel", async () => {
  const m = bygg({ iCachen: [], nat: false });
  const r = await svaraPa(m, "https://flippa.tomairaksinen.se/", "navigate");
  lika(r.status, 503);
});

await testAsync("Vary: Accept-Encoding får inte dölja cachade filer", async () => {
  // GitHub Pages skickar Vary på allt. Utan ignoreVary hittades index.html aldrig,
  // och appen gick inte att starta offline trots att filen låg i cachen.
  const m = bygg({ iCachen: ["https://flippa.tomairaksinen.se/index.html"], nat: false,
                   varyKraver: "Accept-Encoding" });
  const r = await svaraPa(m, "https://flippa.tomairaksinen.se/", "navigate");
  sant(r && r.body && r.body.startsWith("CACHAD"),
       "uppslaget måste använda ignoreVary – annars är offline-läget trasigt");
});

test("alla uppslag i sw.js använder ignoreVary", () => {
  const utan = [...sw.matchAll(/\.match\(([^)]*)\)/g)]
    .map((m) => m[1]).filter((a) => !a.includes("MATCH"));
  lika(utan, [], "varje .match() ska skicka MATCH ({ ignoreVary: true })");
});

test("installationen cachar index.html – det är den offline måste starta från", () => {
  const assets = konstant("sw.js", "ASSETS");
  for (const u of ["./", "./index.html", "./app.js", "./style.css"])
    sant(assets.includes(`"${u}"`), `${u} saknas i ASSETS`);
});

test("index.html:s egna resurser finns i ASSETS", () => {
  const html = las("index.html");
  const assets = konstant("sw.js", "ASSETS");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])
    .filter((u) => !u.startsWith("http") && !u.startsWith("//") && !u.startsWith("#"));
  const saknas = [...new Set(refs)].filter((u) => !assets.includes(`"./${u}"`));
  lika(saknas, [], "filer som index.html laddar men som inte cachas → trasig offline");
});

await testAsync("versionskollen går till nätet, aldrig till cachen", async () => {
  // Hämtas den ur cachen upptäcks aldrig en ny version.
  const m = bygg({ iCachen: ["https://flippa.tomairaksinen.se/sw.js"], nat: true });
  await svaraPa(m, "https://flippa.tomairaksinen.se/sw.js?cb=123");
  sant(m.hamtade.some((u) => u.includes("cb=123")), "versionskollen måste nå nätet");
});

await testAsync("runtime-cachning sparar egna filer men inte frågesträngar", async () => {
  const m = bygg({ iCachen: [], nat: true });
  await svaraPa(m, "https://flippa.tomairaksinen.se/ny.png");
  sant(m.lagrat.has("https://flippa.tomairaksinen.se/ny.png"), "egen fil ska cachas");
  await svaraPa(m, "https://flippa.tomairaksinen.se/audio/fa/index.json?v=1");
  sant(!m.lagrat.has("https://flippa.tomairaksinen.se/audio/fa/index.json?v=1"),
       "manifest med ?v= måste gå till nätet varje gång");
});

test("APP_VERSION och sw-CACHE är samma nummer", () => {
  // Glöms sw.js upptäcks aldrig uppdateringen; bumpas bara sw.js tror appen för evigt
  // att den är gammal och erbjuder en uppdatering som inte ändrar något.
  const app = (las("app.js").match(/const APP_VERSION = "(v\d+)"/) || [])[1];
  const cache = (sw.match(/const CACHE = "flashcards-(v\d+)"/) || [])[1];
  lika(cache, app, "versionerna måste följas åt");
});
