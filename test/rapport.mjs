// Testernas hjälpmedel. Egen fil så att testfilerna kan importera härifrån utan att
// bli cirkulärt beroende av körfilen (som i sin tur importerar dem).
export const state = { grupp: "", ok: 0, fel: [] };

export function grupp(n) { state.grupp = n; console.log(`\n${n}`); }
export function test(namn, fn) {
  try { fn(); console.log(`  ✓ ${namn}`); state.ok++; }
  catch (e) { rapporteraFel(namn, e); }
}
export async function testAsync(namn, fn) {
  try { await fn(); console.log(`  ✓ ${namn}`); state.ok++; }
  catch (e) { rapporteraFel(namn, e); }
}
function rapporteraFel(namn, e) {
  console.log(`  ✗ ${namn}\n      ${String(e.message).split("\n").join("\n      ")}`);
  state.fel.push(`${state.grupp} → ${namn}`);
}
export function lika(fick, vantat, vad = "") {
  const a = JSON.stringify(fick), b = JSON.stringify(vantat);
  if (a !== b) throw new Error(`${vad}\n  fick:    ${a}\n  väntat:  ${b}`);
}
export function sant(v, vad = "förväntade sant") { if (!v) throw new Error(vad); }
