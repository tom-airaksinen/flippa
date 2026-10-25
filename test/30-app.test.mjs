// Övriga buggar som hänt: senaste ämnet per profil, uppslagets parning,
// kort/pass-migreringen och gestlogiken på kortet.
import { funktion, las } from "./hamta.mjs";
import { grupp, test, testAsync, lika, sant } from "./rapport.mjs";
import { sandlada } from "./hamta.mjs";

grupp("Senaste ämnet (kallstart)");

function amnen(anvandare, lagrat, innehall) {
  let store = { "flippa-last-subject": lagrat };
  return sandlada(
    ["setLastSubject", "lastSubjectId", "lastSubject"].map((n) => funktion("app.js", n)),
    {
      currentUser: anvandare, content: innehall,
      localStorage: { getItem: (k) => store[k] ?? null },
      lsSet: (k, v) => { store[k] = v; },
      loadLS: (k) => { try { return JSON.parse(store[k] || "{}"); } catch { return {}; } },
      LAST_SUBJECT_KEY: "flippa-last-subject",
    });
}

test("gammalt globalt format läses fortfarande", () => {
  const { lastSubject } = amnen("tom", "ro1", [{ id: "ro1", owner: "tom" }]);
  lika(lastSubject().id, "ro1");
});

test("en profils ämne öppnas inte för en annan", () => {
  // Enheten delas. Hedvigs spanska ska inte dyka upp för Wille.
  const { lastSubject } = amnen("wille", '{"hedvig":"es1"}', [{ id: "es1", owner: "hedvig" }]);
  lika(lastSubject(), null);
});

test("raderat ämne ger ämneslistan, inte en krasch", () => {
  const { lastSubject } = amnen("tom", '{"tom":"borta"}', [{ id: "ro1", owner: "tom" }]);
  lika(lastSubject(), null);
});

grupp("Slå upp – parning av svar");

function uppslag(traffar) {
  const { slaUppViaAI } = sandlada([funktion("app.js", "slaUppViaAI")], {
    AI_PROXY: "https://x",
    auth: { currentUser: { getIdToken: async () => "t" } },
    fetch: async () => ({ ok: true, json: async () => ({ traffar }) }),
    subjectLang: () => "es-ES", langLabel: () => "spanska",
    genderPromptNote: () => "", currentSubject: {},
  });
  return slaUppViaAI;
}

await testAsync("svar i omkastad ordning paras mot rätt ord", async () => {
  const f = uppslag([{ ord: "snabb", oversattning: "rápido", prio: 2 },
                     { ord: "hund", oversattning: "perro", prio: 1 }]);
  const r = await f(["hund", "snabb"], "sv2for", "es-ES", "spanska");
  lika(r.map((x) => x.foreign), ["perro", "rápido"]);
});

await testAsync("ett okänt ord kastar inte bort de andra träffarna", async () => {
  const f = uppslag([{ ord: "hund", oversattning: "perro", prio: 1 },
                     { ord: "qwertz", oversattning: "" }]);
  const r = await f(["hund", "qwertz"], "sv2for", "es-ES", "spanska");
  lika(r.length, 2);
  lika(r[1].foreign, "");          // tom rad att fylla i, inte en gissning
});

await testAsync("helt tomt svar kastar så reservvägen tar över", async () => {
  const f = uppslag([]);
  let kastade = false;
  try { await f(["a"], "sv2for", "es-ES", "spanska"); } catch { kastade = true; }
  sant(kastade, "utan kast används aldrig MyMemory");
});

grupp("Kort/pass");

function kortPass() {
  const sel = { _v: "",
    set value(x) { this._v = ["5","10","15","20","30","50"].includes(String(x)) ? String(x) : ""; },
    get value() { return this._v; } };
  let sparat = null;
  const { settSessionLimit } = sandlada([funktion("app.js", "settSessionLimit")], {
    sessionLimitSel: sel, lsSet: (k, v) => { sparat = v; }, SESSION_LIMIT_KEY: "k",
  });
  return { settSessionLimit, sel, sparat: () => sparat };
}

test('gammalt "Alla" (0) migreras till 50 – inte tom ruta', () => {
  // En tom <select> betydde obegränsat pass utan att det syntes någonstans.
  const k = kortPass();
  k.settSessionLimit("0", true);
  lika(k.sel.value, "50");
  lika(k.sparat(), "50", "det migrerade värdet måste sparas, annars migreras det varje start");
});

test("ett giltigt värde ur en backup behålls", () => {
  const k = kortPass();
  k.settSessionLimit("20", true);
  lika(k.sel.value, "20");
});

test("nytt värde på ny enhet sparas inte förrän man valt", () => {
  const k = kortPass();
  k.settSessionLimit("5", false);
  lika(k.sel.value, "5");
  lika(k.sparat(), null);
});

grupp("Prompter");

test("böjningsinstruktionen nämner oräkneliga ord", () => {
  // Annars kom "un sangue, due sangui" tillbaka – påhittad plural av ett oräkneligt ord.
  const w = las("worker/src/index.js");
  sant(/oräkneliga/i.test(w), "ORAKNELIGT saknas i workerns prompt");
});

test("adjektiv ska ge en formserie, inte tom böjning", () => {
  const w = las("worker/src/index.js");
  sant(/ADJEKTIV/.test(w) && /serie/i.test(w), "adjektivregeln saknas i workerns prompt");
  sant(/AI_ADJ_EXAMPLES/.test(las("app.js")), "adjektivexemplen saknas i appens prompt");
});

test("gästkontot släpps inte in på den betalda modellen", () => {
  const w = las("worker/src/index.js");
  sant(/LEKTION_PROFILER/.test(w), "profilgrinden saknas i workern");
  sant(!/guest/.test(las("worker/wrangler.toml").match(/LEKTION_PROFILER = "([^"]*)"/)[1]),
       "guest får inte stå i LEKTION_PROFILER");
});

grupp("Pausade ord (experimentellt)");

function paus(profil) {
  let store = {};
  const g = sandlada(
    ["pausordPa", "pausadeOrd", "ordPausat", "setOrdPausat", "toggleOrdPaus", "kortAktivt"]
      .map((n) => funktion("app.js", n)),
    {
      PAUSORD_KEY: "p", PAUSORD_PROFILER: ["tom"], currentUser: profil,
      unitUser: () => profil, cardKeyOf: (c) => c.front,
      prioAllowed: () => true,
      loadLS: (k) => { try { return JSON.parse(store[k] || "{}"); } catch { return {}; } },
      lsSet: (k, v) => { store[k] = v; },
    });
  return g;
}

test("paus är AV för andra profiler – gästerna behåller stjärnan", () => {
  const g = paus("guest");
  g.setOrdPausat({ front: "casă" }, true);
  lika(g.ordPausat({ front: "casă" }), false, "pausen får inte gälla profiler utanför listan");
  lika(g.kortAktivt({ front: "casă" }), true);
});

test("ett pausat ord är inte aktivt", () => {
  const g = paus("tom");
  lika(g.kortAktivt({ front: "casă" }), true);
  g.setOrdPausat({ front: "casă" }, true);
  lika(g.ordPausat({ front: "casă" }), true);
  lika(g.kortAktivt({ front: "casă" }), false, "pausat ord får inte komma med i pass");
});

test("återupptagning släpper in ordet igen", () => {
  const g = paus("tom");
  lika(g.toggleOrdPaus({ front: "casă" }), true);
  lika(g.toggleOrdPaus({ front: "casă" }), false);
  lika(g.kortAktivt({ front: "casă" }), true);
});

test("pausen nycklas på ORDET, inte på kortets id", () => {
  // Samma ord i två lektioner ska pausas tillsammans – som SRS och favoriter.
  const g = paus("tom");
  g.setOrdPausat({ front: "casă", id: "a" }, true);
  lika(g.ordPausat({ front: "casă", id: "b" }), true);
});

test("varje urvalsställe går via kortAktivt eller ordPausat", () => {
  // Missas ett ställe smiter pausade ord in i just det passet.
  const kod = las("app.js");
  const rader = kod.split("\n")
    .filter((r) => /isDueNow\(c, dirMode, now\)/.test(r) && !/kortAktivt|ordPausat/.test(r));
  lika(rader.map((r) => r.trim().slice(0, 50)), [], "urval utan pauskontroll");
});

grupp("Release-rutinen");

test("release.py kräver svar på Hjälp och event-tracking", () => {
  // Reglerna i CLAUDE.md ska vara omöjliga att glömma, inte bara nedskrivna.
  const r = las("scripts/release.py");
  sant(/--hjalp".*required=True|required=True.*--hjalp/s.test(r) || /"--hjalp", required=True/.test(r),
       "--hjalp måste vara obligatorisk");
  sant(/"--tracking", required=True/.test(r), "--tracking måste vara obligatorisk");
});

test("release.py vägrar när app.js och sw.js redan är osynkade", () => {
  const r = las("scripts/release.py");
  sant(/måste vara lika INNAN/.test(r), "kontrollen före bump saknas");
});

test("release.py kör testsviten innan den säger klart", () => {
  const r = las("scripts/release.py");
  sant(/test\/kor\.mjs/.test(r), "testsviten körs inte av release.py");
});
