// Färdiga paket (data/bibliotek). Varje fall här har gått sönder på riktigt.
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { grupp, test, lika } from "./rapport.mjs";

grupp("Bibliotekspaket");

const BIB = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "bibliotek");
const paket = readdirSync(BIB).filter((f) => f.endsWith(".json") && f !== "index.json")
  .map((f) => [f, JSON.parse(readFileSync(join(BIB, f), "utf8"))]);

// v443: det ukrainska provpaketet kom med allmänna förklaringar i minnesregelfältet
// (💡 på kortet). Fältet är inlärarens eget minnesknep – paketen ska lämna det tomt.
test("inget paket fyller i minnesregeln åt inläraren", () => {
  const med = paket.flatMap(([f, p]) => p.lektioner.flatMap((l) =>
    l.kort.filter((k) => k.h).map((k) => `${f}: ${k.f}`)));
  lika(med, []);
});
