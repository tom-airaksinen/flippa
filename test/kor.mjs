#!/usr/bin/env node
// Flippas testsvit.  Kör: node test/kor.mjs
//
// Varje test motsvarar en bugg som FAKTISKT inträffat. Poängen är inte täckning för
// täckningens skull, utan att samma fel inte ska kunna smyga sig tillbaka. Lägg till
// ett test när något går sönder – det är billigare än att upptäcka det på ett flygplan.
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { state } from "./rapport.mjs";

const HAR = dirname(fileURLToPath(import.meta.url));
for (const f of readdirSync(HAR).filter((f) => f.endsWith(".test.mjs")).sort()) {
  await import(join(HAR, f));
}
console.log(`\n${state.ok} ok, ${state.fel.length} fel`);
if (state.fel.length) { state.fel.forEach((f) => console.log("  ✗ " + f)); process.exit(1); }
