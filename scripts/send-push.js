// Skickar dagliga push-påminnelser ("Dags att flippa!") till alla enheter vars
// valda tid är inne. Körs av GitHub Actions var 15:e min (se .github/workflows/push-reminders.yml).
// Läser/skriver /push i Realtime Database via legacy DB-secret (REST, ?auth=).
// Ingen personalisering: samma text till alla; URL:en deep-linkar till senast valda
// ämne (klienten avgör vilket via #pushopen).

const webpush = require("web-push");

const DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app";
const SECRET = process.env.FIREBASE_DB_SECRET;
const VAPID_PUBLIC = "BLOmvL_k3k4gnRqJ0bZ3-sBMJDZimWQrKLmDmq32p8fqQaL2dVWE1_NCPVLQCFzPC-sibyUlfwN8_R9jteHeBJs";
const VAPID_PRIVATE = process.env.VAPID_PRIVATE;

if (!SECRET || !VAPID_PRIVATE) { console.error("Saknar FIREBASE_DB_SECRET eller VAPID_PRIVATE"); process.exit(1); }
webpush.setVapidDetails("mailto:tom.airaksinen@kleer.se", VAPID_PUBLIC, VAPID_PRIVATE);

// Klockan i Sverige (Intl sköter sommar/vintertid).
function stockholm() {
  const now = new Date();
  const hm = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm", hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
  const [h, m] = hm.split(":").map(Number);
  const date = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm", year: "numeric", month: "2-digit", day: "2-digit" }).format(now); // YYYY-MM-DD
  return { min: h * 60 + m, date, hm };
}

async function main() {
  const { min: nowMin, date: today, hm } = stockholm();
  const res = await fetch(`${DB}/push.json?auth=${SECRET}`);
  if (!res.ok) { console.error("DB-läsfel", res.status); process.exit(1); }
  const all = (await res.json()) || {};
  const entries = Object.entries(all);
  const payload = JSON.stringify({
    title: "Dags att flippa!",
    body: "Kör ett pass direkt",
    url: "https://flippa.tomairaksinen.se/#pushopen",
  });

  let sent = 0, cleaned = 0, skipped = 0;
  for (const [id, d] of entries) {
    if (!d || !d.enabled || !d.subscription || !d.time) { skipped++; continue; }
    const [th, tm] = String(d.time).split(":").map(Number);
    if (!Number.isFinite(th) || !Number.isFinite(tm)) { skipped++; continue; }
    const timeMin = th * 60 + tm;
    if (d.lastSent === today) { skipped++; continue; }   // max en/dag
    if (nowMin < timeMin) { skipped++; continue; }        // ännu inte dags idag
    try {
      await webpush.sendNotification(d.subscription, payload, { TTL: 3600 });
      sent++;
      await fetch(`${DB}/push/${id}/lastSent.json?auth=${SECRET}`, { method: "PUT", body: JSON.stringify(today) });
    } catch (err) {
      const code = err && err.statusCode;
      if (code === 404 || code === 410) {   // prenumeration utgången → städa bort
        await fetch(`${DB}/push/${id}.json?auth=${SECRET}`, { method: "DELETE" });
        cleaned++;
      } else {
        console.error("Sändfel", id, code, err && (err.body || err.message));
      }
    }
  }
  console.log(`Stockholm ${hm} (${today}): enheter=${entries.length}, skickade=${sent}, städade=${cleaned}, hoppade=${skipped}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
