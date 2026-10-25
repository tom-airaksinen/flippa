// Plockar ut namngivna funktioner ur app.js/sw.js och kör dem i en liten sandlåda.
//
// Varför så här: Flippa är en enda stor fil med globala funktioner, utan moduler och
// utan byggsteg. Att införa bundling bara för testernas skull vore att bygga om huset
// för att hänga upp en tavla. Den här filen läser källan som text, klipper ut de
// funktioner ett test behöver och kör dem mot påhittade globaler.
//
// Priset: testerna känner till funktionsnamn. Byter ett namn fälls testet med
// "hittade inte X i app.js" – vilket är ett ärligt fel, inte ett tyst.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROT = join(dirname(fileURLToPath(import.meta.url)), "..");
const kalla = {};
export function las(fil) {
  if (!kalla[fil]) kalla[fil] = readFileSync(join(ROT, fil), "utf8");
  return kalla[fil];
}

/** Källkoden för en funktion, inklusive kommentarerna ovanför. */
export function funktion(fil, namn) {
  const s = las(fil);
  let i = s.indexOf(`function ${namn}(`);
  if (i < 0) throw new Error(`hittade inte function ${namn}() i ${fil}`);
  // Ta med "async " – utan prefixet blir en async-funktion synkron och varje await
  // inuti den blir ett syntaxfel i sandlådan.
  if (s.slice(i - 6, i) === "async ") i -= 6;
  const slut = s.indexOf("\n}\n", i);
  if (slut < 0) throw new Error(`hittade inte slutet på ${namn}() i ${fil}`);
  return s.slice(i, slut + 3);
}

/** En toppnivå-const, t.ex. "const RTL_LANGS = new Set([...]);" */
export function konstant(fil, namn) {
  const s = las(fil);
  const i = s.indexOf(`const ${namn} =`);
  if (i < 0) throw new Error(`hittade inte const ${namn} i ${fil}`);
  // Läs till satsens avslutande semikolon. Scannern MÅSTE hoppa över strängar och
  // reguljära uttryck: RTL_SVANS innehåller "[" i sin sträng, och en naiv
  // klammerräknare fastnade där och svalde nästa konstant.
  let d = 0, j = i;
  for (; j < s.length; j++) {
    const c = s[j];
    if (c === "\\") { j++; continue; }
    if (c === '"' || c === "'" || c === "`") {         // hoppa över hela strängen
      const slut = c;
      for (j++; j < s.length && s[j] !== slut; j++) if (s[j] === "\\") j++;
      continue;
    }
    if (c === "/" && s[j + 1] === "/") { j = s.indexOf("\n", j); if (j < 0) break; continue; }
    if (c === "/" && d >= 0 && /[=([,:]\s*$/.test(s.slice(Math.max(0, j - 12), j))) {
      for (j++; j < s.length && s[j] !== "/"; j++) {   // regexliteral
        if (s[j] === "\\") j++;
        if (s[j] === "[") { for (; j < s.length && s[j] !== "]"; j++) if (s[j] === "\\") j++; }
      }
      continue;
    }
    if ("{[(".includes(c)) d++;
    else if ("}])".includes(c)) d--;
    else if (c === ";" && d === 0) break;
  }
  return s.slice(i, j + 1);
}

/** Bygger en funktion av utklippta bitar + globaler testet behöver. */
export function sandlada(bitar, globaler = {}) {
  const namn = Object.keys(globaler);
  const kropp = bitar.join("\n");
  const funktioner = [...kropp.matchAll(/^(?:async )?function ([A-Za-zÅÄÖåäö_$][\w$]*)\(/gm)].map((m) => m[1]);
  const konstanter = [...kropp.matchAll(/^const ([A-Za-z_$][\w$]*)\s*=/gm)].map((m) => m[1]);
  const alla = [...new Set([...funktioner, ...konstanter])];
  // eslint-disable-next-line no-new-func
  const f = new Function(...namn, `${kropp}\nreturn { ${alla.join(", ")} };`);
  return f(...namn.map((n) => globaler[n]));
}
