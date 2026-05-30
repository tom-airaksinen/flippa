# 📚 Glosappen – Plan & spec

Generisk flashcard-/glosapp med spaced repetition. Mobil-först PWA, installerbar på
hemskärmen, byggd som ren HTML/CSS/JS (inga ramverk/byggsteg) och driftad på GitHub Pages.
Bygger vidare på mekaniken från fotbollsappen (`Projekt/flashcards/`) men generaliserad.

> **Lokal mapp:** `glosappen`. **GitHub-repo (privat):** `flashcards`. **Firebase:** eget separat projekt med anonym inloggning.

---

## 1. Vad appen ska göra

En app för att traggla glosor/fakta på valfritt ämne via swipe-kort med spaced repetition.
Första riktiga användningsfallet: **italienska inför semestern i augusti 2026**, lektioner
som "Fråga efter vägen", "Mat & dryck" osv. På sikt även t.ex. tyska, historia, geografi.

### Tre nivåer

```
Ämne/språk/område        t.ex. Italienska, Tyska, Historia
  └─ Lektion (tema)      t.ex. Mat & dryck, Fråga efter vägen   (10–100 ord, ingen hård gräns)
       └─ Ord/kort       front (utländskt/fråga)  ↔  back (svenska/svar)
```

---

## 2. Arkitektur (beslutat)

| Lager | Var | Varför |
|---|---|---|
| **Innehåll** (ämnen, lektioner, ord) | **Firebase Realtime Database** | Delas mellan enheter, automatisk synk + backup, full CRUD från mobilen, delas med barnens enheter. Återanvänder setupen från kassa-appen (compat-SDK, `europe-west1`). |
| **SRS-statistik** (lådor, datum, vad du kan) | **localStorage** (per enhet) | Personligt per person. Varje enhet = egen progress → **ingen inloggning behövs**. Du och barnen delar samma lektioner men har var sin statistik. |
| **Offline-cache** | localStorage (snapshot av innehållet) | Appen öppnas och fungerar utan nät; Firebase är master när uppkoppling finns. |
| **App-kod + hosting** | Git / GitHub Pages | PWA-hosting, versionshantering av själva koden. |

### Varför inte oro för Firebase-kvot
Glosor är ren text (~50 byte/ord). 500 ord ≈ 25 KB; ladda hela innehållet 1 000 ggr/mån ≈ 25 MB.
Spark (gratis) ger 1 GB lagring, 10 GB nedladdning/mån, 100 samtidiga anslutningar →
vi landar under 1 % även vid intensiv träning. Trafik är en icke-fråga för textdata.

### Multi-person på *samma* enhet (framtida, vid behov)
Om någon delar fysisk enhet: en enkel "vem tränar?"-rullgardin i localStorage (bara ett namn,
fortfarande ingen riktig auth). Byggs först om/när det behövs.

---

## 3. SRS-motor: graderad Leitner med datum (beslutat)

Binär/triadisk swipe passar Leitner bättre än SM-2 (som kräver glidande ease factor från en
4–6-gradig skala). Tre gester ger en graderad Leitner:

| Gest | Betydelse | Effekt |
|---|---|---|
| 👈 vänster | kan inte | → låda 1 (förfaller idag igen) |
| 👉 höger | kan | +1 låda |
| 👆 upp | kan väldigt bra | +2 lådor |

**Lådor → intervall (startförslag, tunbart):**

| Låda | Nästa repetition om |
|---|---|
| 1 | idag / imorgon |
| 2 | 2 dagar |
| 3 | 4 dagar |
| 4 | 8 dagar |
| 5 | 16 dagar |
| 6 | 32 dagar |

- SRS-data lagras **per kort och per riktning** (front→back och back→front separat), precis som
  fotbollsappens `strength_sv` / `strength_de`.
- Datamodell (localStorage), per `cardId`+riktning: `{ box, due, lastSeen, lastResult }`.

---

## 4. Två träningslägen (samma motor, två frågor mot datan)

### A) Lektionsträning – plugga fokuserat, när du vill
- Gå in i en lektion (t.ex. "Mat & dryck") och träna *den*, oavsett schema (cram tillåtet).
- **Ordning:** det du hade fel på sist först (låda 1 / förfallna), sen resten svagast först.
- Klart när du svept "kan"/"kan väldigt bra" på alla → 🎉-skärm (som fotbollsappen).
- Svaren **uppdaterar ändå schemat** – pluggar du lektionen räknas det globalt.

### B) "Dags att öva" – schemalagd repetition (ämnesnivå)
- Knapp på ämnesnivå (italienska). Namn ej spikat – **inte** "SRS". Kandidater: "Dags att öva",
  "Dagens repetition", "Repetera".
- Plockar de ord som är **förfallna idag** från alla lektioner – eller ett **urval** du själv
  bockar i (samma lektionsväljare som fotbollsappen redan har).

### Riktning
Per session väljbart: front→back, back→front, blandat (som fotbollsappens lägesväljare).

---

## 5. Innehållshantering (CRUD från mobilen)

Allt går att göra på telefonen, sparas i Firebase:
- **Ämne:** skapa, döpa om, ta bort.
- **Lektion:** skapa, döpa om, ta bort, (flytta ord mellan lektioner – se öppna frågor).
- **Ord:** lägg till, redigera, ta bort.

### Snabbinmatning
Klistra in en eller flera rader på format **`utländskt ord/fras;svensk översättning`**, en rad
per ord. Appen parsar och lägger till alla i vald lektion. Tomma rader och inledande/avslutande
blanksteg ignoreras.

### Backup till git (frivilligt, hängslen-och-livrem)
"Exportera JSON"-knapp som ger hela innehållet att committa till repot som kall-backup,
samt "Importera" för återställning.

---

## 6. UI/UX (neutralt tema – beslutat)

- Ren, generisk design utan sportreferenser (passar språk, historia, geografi).
- Behåller fotbollsappens kärninteraktion: kort följer fingret med rotation + snap-back, tryck =
  flippa, swipe = gradera. (Skaka-för-ångra kan återanvändas – se öppna frågor.)
- Återanvänd komponenter från `Projekt/flashcards/`: kortstack, lektionsväljare (checkbox-rader),
  ordlistevy, congrats-skärm.

---

## 7. Första innehållet (seed)

**Ämne:** Italienska
**Lektion 1:** "Div. ord från Duolingo/Busuu" – 44 ord (se `data/italienska-div-ord.txt`).
Byggs ut efterhand med fler lektioner ("Fråga efter vägen", "Mat & dryck", ...).

---

## 8. Teknisk stack (sammanfattning)

- Ren HTML/CSS/JS, ingen build.
- Firebase Realtime Database (compat-SDK i webbläsaren), **eget separat projekt** med
  **anonym inloggning** + regel "kräver inloggad".
- PWA: `manifest.json` + service worker, installerbar, offline via localStorage-cache.
- GitHub Pages (privat repo).

---

## 9. Föreslagen byggordning (etapper)

1. **Skelett + datamodell:** projektstruktur, Firebase-koppling, läs/visa ämnen→lektioner→ord från Firebase med localStorage-cache.
2. **Kortträning (lektionsläge):** swipe-mekanik + graderad Leitner + localStorage-SRS, 🎉-skärm.
3. **Snabbinmatning + CRUD:** klistra in ord, skapa/redigera/ta bort lektioner & ämnen.
4. **"Dags att öva":** schemalagd repetition på ämnesnivå med lektionsurval.
5. **PWA-finish:** manifest, ikoner, service worker, installerbar, offline.
6. **Backup:** export/import JSON till git.
7. **Seed:** lägg in italienska-lektionen.

> Etapperna 1–2 ger en körbar app att testa tidigt; resten byggs på.
