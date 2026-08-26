// Kopierar ett helt område (ämne) till en annan profil i Realtime Database.
// Samma mönster som send-push.js: REST + legacy DB-secret via miljövariabel.
//
//   export FIREBASE_DB_SECRET=...            (samma hemlighet som i GitHub Actions)
//   node scripts/kopiera-omrade.js                        # lista alla områden
//   node scripts/kopiera-omrade.js franska maria          # TORRKÖRNING (skriver inget)
//   node scripts/kopiera-omrade.js franska maria --skarp  # skriv på riktigt
//
// Kopian är VERBATIM: exakt samma objekt som ligger på servern, med bara "owner"
// ändrad. Ingen normalisering, inga nya id:n inuti – lektions- och kort-id:n är
// unika inom sitt eget ämne, och favoriter/SRS nycklas på ORDET, inte på id.
// Originalet läses bara, aldrig skrivs.

const DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app";
const SECRET = process.env.FIREBASE_DB_SECRET;

if (!SECRET) {
  console.error("Saknar FIREBASE_DB_SECRET. Sätt den i miljön först:");
  console.error("  export FIREBASE_DB_SECRET=...");
  process.exit(1);
}

const [fragment, agare, ...flaggor] = process.argv.slice(2);
const SKARP = flaggor.includes("--skarp");

// Profil-id:n måste matcha USERS i app.js – annars ser ingen området.
const PROFILER = ["tom", "hedvig", "wille", "karin", "martin", "maria", "guest"];

const rakna = (s) => {
  const lektioner = Object.values(s.lessons || {});
  return {
    lektioner: lektioner.length,
    kort: lektioner.reduce((n, l) => n + Object.keys(l.cards || {}).length, 0),
  };
};

async function las(sokvag) {
  const res = await fetch(`${DB}/${sokvag}.json?auth=${SECRET}`);
  if (!res.ok) throw new Error(`DB-läsfel ${res.status} på ${sokvag}`);
  return res.json();
}

async function main() {
  const alla = (await las("content/subjects")) || {};
  const poster = Object.entries(alla);

  if (!fragment) {
    console.log(`\nOmråden i databasen (${poster.length}):\n`);
    poster.forEach(([id, s]) => {
      const { lektioner, kort } = rakna(s);
      console.log(
        `  ${String(s.name || "(namnlöst)").padEnd(28)} ägare: ${String(s.owner || "-").padEnd(8)}` +
        ` ${String(lektioner).padStart(3)} lektioner ${String(kort).padStart(5)} kort   ${id}`
      );
    });
    console.log("\nKör igen med:  node scripts/kopiera-omrade.js <namnfragment> <profil>\n");
    return;
  }

  if (!agare) { console.error("Ange målprofil, t.ex.: ... franska maria"); process.exit(1); }
  if (!PROFILER.includes(agare)) {
    console.error(`Okänd profil "${agare}". Giltiga: ${PROFILER.join(", ")}`);
    console.error("Lägg till profilen i USERS i app.js först, annars ser ingen området.");
    process.exit(1);
  }

  const q = fragment.toLowerCase();
  const traffar = poster.filter(([, s]) => String(s.name || "").toLowerCase().includes(q));
  if (traffar.length === 0) { console.error(`Inget område matchar "${fragment}".`); process.exit(1); }
  if (traffar.length > 1) {
    console.error(`Flera områden matchar "${fragment}" – var mer specifik:`);
    traffar.forEach(([, s]) => console.error(`  - ${s.name} (ägare: ${s.owner || "-"})`));
    process.exit(1);
  }

  const [kallId, kalla] = traffar[0];
  const { lektioner, kort } = rakna(kalla);

  // Dubbelkopieringsspärr: har målprofilen redan ett område med samma namn?
  const redan = poster.find(([, s]) =>
    s.owner === agare && String(s.name || "").toLowerCase() === String(kalla.name || "").toLowerCase());
  if (redan) {
    console.error(`"${kalla.name}" finns redan hos ${agare} (${redan[0]}). Avbryter – ingen dubblett.`);
    process.exit(1);
  }

  console.log(`\nKälla:  ${kalla.name}  (ägare: ${kalla.owner || "-"}, id ${kallId})`);
  console.log(`Kopia:  ${kalla.name}  (ägare: ${agare}, nytt id genereras)`);
  console.log(`Omfång: ${lektioner} lektioner, ${kort} kort`);
  console.log(`Språk:  ${kalla.lang || "(inget)"}`);

  const kopia = JSON.parse(JSON.stringify(kalla)); // verbatim
  kopia.owner = agare;

  if (!SKARP) {
    console.log("\nTORRKÖRNING – inget skrevs. Lägg till --skarp för att göra det på riktigt.");
    const forsta = Object.values(kopia.lessons || {})[0];
    if (forsta) {
      const k = Object.values(forsta.cards || {}).slice(0, 3)
        .map((c) => `${c.front} = ${c.back}`).join(" · ");
      console.log(`Stickprov ur "${forsta.name}": ${k}`);
    }
    return;
  }

  const res = await fetch(`${DB}/content/subjects.json?auth=${SECRET}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(kopia),
  });
  if (!res.ok) { console.error("Skrivfel", res.status, await res.text()); process.exit(1); }
  const nyttId = (await res.json()).name;

  // Läs tillbaka och kontrollera att kopian blev komplett
  const kontroll = await las(`content/subjects/${nyttId}`);
  const k2 = rakna(kontroll || {});
  const ok = kontroll && kontroll.owner === agare
    && k2.lektioner === lektioner && k2.kort === kort;
  console.log(`\nSkrivet: ${nyttId}`);
  console.log(`Kontroll: ägare ${kontroll && kontroll.owner}, ${k2.lektioner} lektioner, ${k2.kort} kort`);
  console.log(ok ? "✓ Kopian är komplett och originalet orört."
                 : "✗ Kopian stämmer INTE med källan – granska i konsolen innan du litar på den.");
  if (!ok) process.exit(1);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
