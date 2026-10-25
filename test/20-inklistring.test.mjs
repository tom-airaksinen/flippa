// parseLines – inklistring från AI. Varje fall här har gått sönder på riktigt.
import { funktion, konstant, sandlada } from "./hamta.mjs";
import { grupp, test, lika } from "./rapport.mjs";

grupp("Inklistring (parseLines)");

function parser(sprak = "ro") {
  const bitar = [
    konstant("app.js", "RTL_CHAR"), konstant("app.js", "RTL_LUFT"),
    konstant("app.js", "RTL_SVANS"), konstant("app.js", "RTL_KLISTER"),
    funktion("app.js", "splitGlued"), funktion("app.js", "delaUtanPrio"),
    funktion("app.js", "delaRtlRader"), funktion("app.js", "parRTLrader"),
    funktion("app.js", "slaIhopRTL"), funktion("app.js", "avkodaEscapes"),
    funktion("app.js", "parseLines"),
  ];
  return sandlada(bitar, {
    RTL_LANGS: new Set(["ar", "fa", "he"]),
    isRtlLang: (k) => ["ar", "fa", "he"].includes(String(k || "").split("-")[0]),
    subjectLang: () => sprak,
    subjectUsesTranslit: () => sprak === "fa",
    currentSubject: {},
  }).parseLines;
}

test("vanlig rad med böjning och prio", () => {
  lika(parser()("casă (f);hus;{o casă, două case};1"),
       [{ front: "casă (f)", back: "hus", form: "o casă, două case", prio: 1 }]);
});

test("tappad radbrytning delas vid prio-siffran", () => {
  lika(parser()("pâine;bröd;1 apă;vatten;1").length, 2);
});

test("rad UTAN prio klibbar inte ihop med nästa", () => {
  // ChatGPT glömde prion; raden blev ett kort med baksidan "bra rău;dålig".
  lika(parser()("bun (bună, buni);bra rău;dålig;1"),
       [{ front: "bun (bună, buni)", back: "bra" }, { front: "rău", back: "dålig", prio: 1 }]);
});

test("baksida med flera ord delas inte", () => {
  lika(parser()("plin de;full av;2"), [{ front: "plin de", back: "full av", prio: 2 }]);
});

test("rubrikrad utan semikolon ignoreras", () => {
  lika(parser()("Mat och dryck\npâine;bröd;1").length, 1);
});

test("persiska: Unicode-escapes packas upp", () => {
  // Urklippet på iOS kastar om höger-vänster-skrift. Prompten ber därför om ASCII.
  lika(parser("fa")("\\u062f\\u0631\\u062e\\u062a;träd;derakht;1"),
       [{ front: "درخت", back: "träd", tr: "derakht", prio: 1 }]);
});

test("persiska: hela svaret på EN rad går ändå att tyda", () => {
  const r = parser("fa")("\\u0646\\u0627\\u0646;bröd;nân;1\\u0622\\u0628;vatten;âb;1");
  lika(r.length, 2);
});

test("persiska: tvåradsformatet tas fortfarande emot", () => {
  lika(parser("fa")("سلام\nhej;salâm;1"),
       [{ front: "سلام", back: "hej", tr: "salâm", prio: 1 }]);
});

test("escapes rörs INTE i språk som skrivs med latinska bokstäver", () => {
  // \u... i ett rumänskt ord ska inte tolkas – bara RTL-ämnen avkodar.
  lika(parser("ro")("\\u0061;test;1")[0].front, "\\u0061");
});
