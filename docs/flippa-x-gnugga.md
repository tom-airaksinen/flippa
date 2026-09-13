# Flippa × Gnugga – integrationsspåret

Eget spår sedan 2026-09-13 (bröts ut ur monetiseringsdiskussionen). Gäller frågan om
glosappen Flippa och grammatikappen Gnugga (`Projekt/gnugga`) ska förbli två appar
eller växa ihop.

## Beslut 2026-09-13

**Variant B är huvudspåret på sikt, men ingenting byggs nu.** Tom vidareutvecklar
Gnugga separat tills vidare, för eget bruk med rumänskan, och skaffar sig känsla för
hur den funkar i verkligheten. Inte ens bryggorna i variant A byggs ännu — sikta
direkt på B när Gnugga kommit längre.

## Varianterna

Mockup med alla tre: [`mockups/gnugga-integration.html`](../mockups/gnugga-integration.html)
· publicerad artifact: https://claude.ai/code/artifact/bd426081-015c-462f-90e4-25bc885e9751

- **A – Länkad svit:** två appar, synliga broar (Gnugga-kort i Flippas rumänska ämne,
  Flippa-orden prioriteras i Gnugga). Dagar av jobb, noll risk. **Vald bort tills vidare.**
- **B – Grammatik i ämnet (huvudspår):** Gnugga blir modul i Flippa. Ämnesskärmen får
  segmentet *Glosor | Grammatik*, grindat per ämne precis som böjningsfältet — bara
  ämnen med grammatikdata visar det. Gnuggas motor + lexikon lazy-laddas och förblir
  statiska/kurerade i repot; bara progressen delar Flippas värld. Mint (#3fcfa8) blir
  grammatikens färg inuti Flippa.
- **C – Ett blandat pass:** "Dags att öva" blandar gloskort och böjningsuppgifter i
  samma kö. Pedagogiskt starkast (produktion på ord man bevisligen kan) men rör
  träningsloopen och kräver att två SRS-system samsas. **Byggs tidigast när B bevisat sig.**

Fullständiga för/emot per variant står i mockupen.

## Håll Gnugga merge-vänlig under tiden

Så länge Gnugga utvecklas separat, undvik beslut som gör B dyrare:

1. **Motorn förblir språkoberoende** och innehållet statisk data (`data/<språk>/`) —
   redan Gnuggas arkitektur, rubba den inte.
2. **Progressformatet** (Leitner per mönster×ord + nivå per mönster i localStorage)
   är det som en dag ska bo i Flippas värld — håll det exporterbart (export/import
   finns redan i Inställningar).
3. **Bygg inte egen Firebase/auth i Gnugga** — det är Flippas jobb efter B.
4. **Duplicera inte Flippa-funktioner i onödan** (AI-preferens, hjälpsök m.m.) —
   varje kopia är en sak till att slå ihop senare.

## Kopplingar

- Segmentfrågan i [`monetisering.md`](monetisering.md) styr tajmingen: går
  intäktsspåret mot den ambitiösa vuxna inläraren stärks B ("komplett språkträning
  på svenska" = en produkt, inte två).
- Böjningsfältet i Flippa (v334) är i praktiken en första bit Gnugga — Gnuggas
  lexikon (1 224 lemman med fulla böjningsformer) kan en dag auto-fylla det.
- Gnuggas öppna frågor om Flippa-koppling ligger i `Projekt/gnugga/docs/oppna-fragor.md`
  ("Efter v1").

## Storleksjämförelse (2026-09-13)

| | Flippa | Gnugga |
|---|---|---|
| app.js | 6 574 | 780 |
| index.html | 445 | 102 |
| style.css | 1 958 | 304 |
| sw.js | 77 | 38 |
| **Summa kod** | **9 054** | **1 224** |
| Innehållsdata | Firebase (per användare) | monster.js 439 rader + lexikon.json 312 K (1 224 lemman, genererad) |

Gnugga är ~1/7 av Flippas kodvolym — motorn är liten och portabel, vilket är precis
vad B behöver.

## Testvecka (B-lite) – plan 2026-09-13, ej byggd

Lyft in Gnugga som **iframe**, inte som kod: Rumänska-ämnet får segmentet
*Glosor | Grammatik* (grindat med ämnesflagga, mönstret från `forms`), där
Grammatik-vyn är en iframe mot deployade `tom-airaksinen.github.io/gnugga/`.
Gnugga-repot rörs inte alls; utlyftning = ta bort skärm + flagga (~60–100 rader).

**Protokoll:** dag 0 exportera framsteg från fristående Gnugga → importera i den
inbäddade (installerad PWA har egen lagringscontainer, så de delar inte localStorage);
under veckan körs bara inbäddat och ingen Gnugga-kod ändras någonstans — skav
dokumenteras här nedan; efteråt beslut om äkta B eller utlyftning (+ export tillbaka).

**Verifiera dag 1 på iPhone:** iframe-rendering i standalone-PWA, offline via Gnuggas
egen service worker, TTS inifrån iframen. Fallback om iframe strular: vanlig länk (A).

**Chrome-lösning (beslut 2026-09-13):** ingen dubbel navbar. Grammatik öppnas som
fullskärmstakeover à la träningspasset — Flippas tabbar döljs (mekanismen finns,
`app.js:1351`), kvar är en tunn ‹-rad + iframen. Enda synliga navbar är Gnuggas egen,
så dess Statistik/Hjälp förblir nåbara (grammatikspecifikt innehåll, ingen dublett).
Alternativ som valdes bort för testveckan: CSS-injektion som döljer Gnuggas tabbar
(same-origin-hack, blinkrisk) och `?embed=1`-läge i Gnugga (rätt söm för äkta B,
men rör Gnugga-repot). Kvarstående skav: Flippas svep-tillbaka fungerar inte över
iframen — ‹-raden är vägen ut.

### Skavlogg testveckan

- **13/9 (dag 0, Toms iPhone):** TTS fungerar inbäddat. Två buggar hittade och fixade
  i Gnugga v29 innan veckan räknas som startad:
  1. *Tomt band i toppen* – iOS propagerar `env(safe-area-inset-top)` in i iframen,
     så statusbarsmarginalen lades ovanpå Flippas header. Fix: `--sat` nollas via
     `:root.embedded` (sätts automatiskt när `window.self !== window.top`).
  2. *Importera framsteg gjorde ingenting* – två fel i ett: `prompt()` tystas av iOS
     i iframes i standalone-PWA:er (tyst no-op), och när man väl kom in var importen
     trasig även fristående sedan start: `loadProgress()` läste om P från localStorage
     innan importen sparats, så det inklistrade kastades bort. Fix: modal med textarea
     + spara-först-ordning. `confirm()` på Nollställ ersatt med tvåtryck av samma skäl.

  Efter v29: gör om dag 0-protokollet (exportera från fristående → importera inbäddat).
