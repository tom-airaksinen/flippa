# Framtida utveckling – Flippa

Anteckningar från en genomgång (2026-06-12) om vad som krävs för att **låta andra
använda appen**: inloggning/GDPR, Firebase-kostnad och en eventuell Flutter-app.
Inget av detta är byggt – det är underlag för beslut.

> **Disclaimer:** Detta är vägledning, inte juridisk rådgivning. Kontrollera
> aktuella priser på Firebases prissida och stäm av GDPR med någon insatt inför
> en skarp lansering. Prissiffror nedan kan ha ändrats.

---

## Utgångsläge (viktigt att förstå först)

Så som appen är byggd idag:

- **Ett enda gemensamt innehållsträd** i Firebase Realtime Database, skyddat av
  **anonym inloggning** (regeln kräver bara "inloggad", inte "rätt användare").
- **SRS-statistiken ligger i `localStorage` per enhet** – den synkas inte mellan
  enheter och ligger inte på servern.

Därför: "låta andra använda" handlar om **två** saker som hänger ihop:

1. **Inloggning** (vem är du), och
2. **Data per användare** (din progress, ev. ditt eget innehåll).

Punkt 2 är det **större jobbet** – inte själva login-knappen. SRS bör då flytta
från localStorage in i Firebase under användarens `uid`, annars ger inloggning
nästan ingen nytta (ingen synk mellan enheter).

---

## 1) Inloggning + GDPR

### Social login (Apple/Google) vs e-post/lösenord
Social login är **enklare och säkrare**:

- Du slipper lagra och skydda lösenord → mindre attackyta och mindre GDPR-ansvar.
- Firebase Auth har färdigt stöd för Google, Apple, e-postlänk (lösenordslöst) m.fl.
  Integrationen är några rader kod.
- **Apple Sign In** ger "Hide My Email" (proxy-adress) – bra för integritet.
- Om du senare gör en **iOS-app** och erbjuder Google-login så *kräver* App Store
  att du också erbjuder Apple Sign In.

### GDPR-ansvar (du blir personuppgiftsansvarig)
- **Privacy policy** + laglig grund (samtycke eller berättigat intresse).
- **Dataminimering** – spara helst bara `uid`, ev. e-post/namn. Behövs namnet ens?
- **Rättigheter**: radera konto + all data, samt exportera data. Radering bör vara
  ett knapptryck i appen.
- **Databehandlaravtal (DPA)** med Google – finns färdigt ("Firebase Data
  Processing and Security Terms"), accepteras i konsolen.
- **EU-region**: välj en EU-region (t.ex. `europe-west1`, Belgien) för databasen.
  ⚠️ **Måste väljas när databasen skapas – går inte att flytta efteråt.** Värt att
  kontrollera vilken region nuvarande DB ligger i.
- **Säkerhetsregler** måste partitioneras per `uid` (idag är allt öppet för vem som
  helst inloggad).

### Risker / nackdelar med social login
- Leverantörsberoende – kontoåterställning ligger hos Google/Apple.
- **Apple Sign In kräver Apple Developer-konto (99 USD/år)** för konfiguration.
- En del användare saknar/ogillar Google- eller Apple-konto → erbjud **e-postlänk**
  som komplement.

### Den dolda (största) kostnaden: datamodellen
Du måste bestämma:

- **Delat innehåll** (alla pluggar samma färdiga lexikon) + **egen progress per
  användare**, eller
- **Eget innehåll per användare** (var och en bygger egna ämnen).

…och flytta SRS till Firebase under `uid`.

---

## 2) Firebase – gratis vs betalt

### Gratisnivån (Spark), Realtime Database
- 1 GB lagring · 10 GB nedladdning/månad · 100 samtidiga anslutningar.

### Vad det betyder här
Text är **pyttelitet**: ~10 000 kort ≈ ~1 MB. Varje appöppning laddar
innehållsträdet (några hundra KB i värsta fall). Även med hundratals användare som
öppnar appen flera ggr/dag är man långt under 10 GB/mån. **Gratisnivån räcker
mycket länge** för personligt bruk + vänner/familj + sannolikt en liten publik.

### Vad som tvingar upp dig på Blaze (betalplan)
- **Cloud Functions** (t.ex. för att automatiskt städa data vid kontoradering).
- Fler än **100 samtidiga** anslutningar (RTDB-gräns).
- Mer än **10 GB nedladdning/mån** (osannolikt med text).

### Bra att veta om Blaze
- Blaze är "pay as you go" och **inkluderar samma gratiskvot** – du betalar bara
  överskjutande. Många slår på Blaze bara för Functions och betalar ändå ~0 kr.
- **Sätt budgetlarm/spärr.**
- Ungefärliga överpriser (RTDB, kan ändras): lagring ~5 USD/GB/mån, nedladdning
  ~1 USD/GB.
- **Authentication** är gratis för Google/Apple/e-post upp till ~50 000 månatliga
  aktiva användare. (SMS/telefon-login kostar – undvik.)

**Slutsats:** kostnad är inte flaskhalsen den närmaste lång tid. Arkitektur och
GDPR är det.

---

## 3) Porta till Flutter

Det är inte en "port" utan en **omskrivning av UI + logik i Dart**. Men
**backend och datamodell följer med** – FlutterFire har `firebase_auth` och
`firebase_database`, och **SRS-algoritmen** (Leitner-lådor, intervall,
`gradeCard`-logiken) översätts nästan rad för rad. Det är HTML/CSS/DOM-koden som
byggs om, inte hjärnan.

### Lätt i Flutter
- Swipe-kort: färdiga paket (`appinio_swiper` / `flutter_card_swiper`) eller egen
  `GestureDetector`.
- TTS (uppläsning): `flutter_tts` – funkar bra, ofta bättre röster än webben.
- Skaka-för-ångra: `sensors_plus` – trivialt.
- Firebase: FlutterFire-setup är rättframt.

### Klurigt (planera för det)
- **Handsfree / taligenkänning**: `speech_to_text` finns, men iOS begränsar
  kontinuerlig/bakgrundslyssning hårt – beter sig annorlunda än Web Speech API.
  Räkna med omarbetning här.
- App Store-krav (Apple Sign In, kontoradering i appen, integritetsdeklaration).

### Vinster med native som PWA:n inte ger
- **Push-notiser** ("dags att plugga idag!") – stort för en pluggapp.
- Bättre offline-lagring, ingen PWA-installationsfriktion på iOS, App Store-närvaro.

### Estimat & rekommenderad sekvens
- Kärnan (ämnen/kort/SRS/swipe/träningsflöde) är rimlig på **några veckor deltid**
  för någon van vid Flutter. Handsfree + butikskrav + per-användardata drar ut det.
- **Sekvens:** gör först **auth + per-uid-data + flytta SRS till Firebase i PWA:n**
  (billigast att iterera, måste göras ändå), bygg sedan **Flutter-appen mot samma
  backend**. Då återanvänds datamodell, säkerhetsregler och SRS-logik – bara UI:t
  byggs om. Undviker att göra om auth/datamodell-jobbet två gånger.

---

## 4) Experimentell: skapa lektion från PDF med AI

Idé (2026-06-19): på **enbart kontot Tom**, en experimentell funktion där man
laddar upp en PDF, en språkmodell extraherar orden **i grundform**, väljer de mest
centrala och skapar en lektion. Inget byggt – det här är skissen.

### Kärnproblemet: var bor API-nyckeln?
Flippa är en ren statisk PWA på GitHub Pages **utan backend**. Det är därför dagens
AI-funktion är "kopiera prompten, klistra in i ChatGPT själv" – det finns ingen
server att gömma en nyckel i. En nyckel i klientkoden ligger **öppet** på GitHub och
blir skrapad. Tre vägar:

1. **Egen nyckel i `localStorage` (BYO-key)** – Tom klistrar in sin egen
   Anthropic-nyckel i en inställning som bara sparas på hans enhet; appen anropar
   API:t direkt från webbläsaren (Anthropic kräver headern
   `anthropic-dangerous-direct-browser-access: true`, OpenAI har
   `dangerouslyAllowBrowser`). Exponering och kostnad begränsas till hans enhet/nyckel.
   **Bäst match för "experimentellt, bara Tom" + "ingen backend".**
2. **Liten serverproxy** (Cloudflare Worker / Vercel-funktion / Firebase Function på
   Blaze) som håller nyckeln serverside. Rätt väg *om* det skalas till fler – men
   overkill för ett personligt experiment.
3. **Noll nyckel alls** – se "Lägsta-risk-steget" nedan.

### PDF → text
Extrahera klientside med **pdf.js** (Mozilla). Skicka **ren text** till modellen
(billigare, mer kontroll, går att dela upp) i stället för hela PDF:en. Två varningar:
**skannade PDF:er** (bilder) kräver OCR – pdf.js ger ingen text där; och pdf.js är
stort → **lazy-loada** (dynamisk import vid första användning) så det inte sväller
basappen eller service-worker-cachen.

### LLM-uppgiften
Appen importerar redan rader på formatet `ord;svensk översättning`, så modellens
utdata kan matas rakt in i befintlig add-pipeline (inkl. dubblettkontrollen).
Prompten ber modellen att: lemmatisera till **grundform**, rensa funktionsord och
egennamn, ranka efter **"centralitet"** och returnera topp N. *Bestäm vad centralitet
betyder:* frekvens i dokumentet, allmän språkfrekvens (CEFR-nivå) eller pedagogisk
nytta – troligen en blandning. Lång PDF → map/reduce (kandidater per chunk → slå ihop
→ ranka i sista anropet). För experiment: börja med att **kapa till en token-budget**
(t.ex. första X sidorna) och ett enda anrop.

### Gating till Tom
`currentUser === "tom"` räcker för att rendera knappen, men den **verkliga grinden**
är att funktionen bara *fungerar* om en API-nyckel finns i `localStorage` (bara Tom
har lagt in sin). Profillåset är kosmetiskt – koppla inte säkerhet till det.

### Flöde / UX
Knapp (bara Tom) → filväljare → extrahera text (progress) → välj antal ord + språk
(ärvs från ämnet) → LLM-anrop → **förhandsgranska en redigerbar lista med kryssrutor
innan något sparas** (LLM-output måste kunna granskas) → bekräfta → ny lektion via
befintlig import. Felfall: ingen nyckel, CORS-strul, skannad PDF utan text, rate
limits, kostnad.

### Lägsta-risk-steget (rekommenderat först)
Återanvänd "kopiera prompt"-mönstret: gör PDF→text klientside och **förfyll den
nuvarande AI-prompten med den extraherade texten** som Tom klistrar in i
Claude/ChatGPT-appen (där han redan är inloggad sedan url-schema-fixen). Då slipper du
hela nyckel-/kostnads-/CORS-frågan och bygger bara på det som redan finns. Nackdel:
manuellt och mycket text. Men bra sätt att validera om idén ens är användbar innan ett
riktigt API-anrop byggs.

### Sammanfattning

| Bit | Experiment (snabbt) | Om det skalas |
|---|---|---|
| Nyckel | BYO i localStorage, eller noll-nyckel-paste | Serverproxy |
| PDF | pdf.js, lazy-loaded | + OCR för skannat |
| Ranking | enkel topp-N i ett anrop | map/reduce över chunks |
| Gating | `currentUser==="tom"` + nyckel finns | riktig auth per uid |
| Spara | befintlig `ord;översättning`-import + dubblettkoll | oförändrat |

> **Integritet/upphovsrätt:** PDF-text skickas till en tredjeparts-LLM. OK för Toms
> eget bruk; flagga det om det någonsin blir flera användare (GDPR, ev. upphovsrätts-
> skyddat läromedel).

---

## 5) Apple Watch – hands-free-förhör

Idé (2026-06-20): kunna köra förhör på Apple Watch när telefonen inte är i
händerna – klockan läser upp + visar ordet, man sveper/flippar på klockan.

### Hård begränsning: webbappen kan inte köra på klockan
watchOS har **ingen webbläsare, ingen WKWebView för tredjepartsappar och inget
PWA-stöd**. Det finns alltså ingen väg där Flippa som PWA hamnar på Apple Watch.
För något på klockan krävs en **native watchOS-app** (SwiftUI/WatchKit), som
distribueras inuti/som en iOS-app.

### Men: ingen omskrivning av huvudappen krävs
Tre vägar:

1. **Liten fristående följeslagar-app (rekommenderad, lean).** Behåll PWA:n på
   telefonen. Bygg en *separat, fokuserad* iOS+watchOS-app vars enda jobb är
   hands-free-förhör: klockan hämtar dagens förfallna kort, läser upp + visar
   ordet, man sveper/flippar, resultatet skrivs tillbaka – mot **samma
   Firebase-backend**. Huvudappen rörs inte.
2. **Full native-omskrivning** (Flutter/Swift) av både telefon och klocka. Störst
   jobb; bara värt det om man ändå vill lämna PWA-spåret (se avsnitt 3).
3. **Hack utan klockapp:** klockan kan agera ljud-ut (TTS via AirPods/högtalare)
   och fjärrnotiser, men kan **inte** visa kort eller ta emot svep för en webbapp.
   "Visa ord + svep på klockan" kräver alltså väg 1 eller 2.

### Två viktiga hakar för väg 1
- **Verktyg/konto:** Swift + Xcode. För att köra på *egen* klocka räcker ett
  gratis Apple-ID (signera om var 7:e dag); Apple Developer-konto (99 USD/år) tar
  bort krånglet och krävs för App Store.
- **Datasynk (blockerare):** SRS-progressen ligger idag i `localStorage` per
  enhet, **inte** i Firebase. Innehållet är delat, men hur långt man kommit är
  lokalt på telefonen. En klockapp ser alltså inte den riktiga progressen förrän
  **SRS flyttas till Firebase per uid** (samma punkt som i avsnitt 1). Annars blir
  klock-passet frikopplat från telefon-passet.

### Slutsats
Webbapp på klockan = omöjligt. Native watchOS-app = nödvändigt, men kan vara en
liten separat följeslagare mot samma backend (ingen omskrivning av huvudappen) –
**förutsatt att SRS först flyttas till Firebase** så progressen synkar. Rimlig
sekvens: gör SRS→Firebase (behövs ändå för multi-user/Flutter) → bygg den lilla
klock-/telefon-följeslagaren mot samma data.

---

## 6) Migrera befintlig SRS-statistik till Firebase

Delfråga (2026-07-05): om SRS flyttas till Firebase för inloggade användare – går
den **befintliga** progressen i `localStorage` att föra över?

### Kort svar: ja, och det är en av de enklare bitarna
Datan är liten, redan ordnyckel-baserad och enhetsoberoende. Det finns **redan en
migrering** i koden (localStorage→localStorage, `app.js:570`) som gör exakt den här
typen av "behåll högsta box"-sammanslagning – samma mönster återanvänds mot molnet.

### Varför det går smidigt
SRS ligger i `flashcards-srs-v1` som ett litet objekt med nyckeln
`front|back|riktning` (t.ex. `gelato|glass|f2b`) → `{box, due, lastSeen}`
(`app.js:195`, `srsKey`). Det viktiga:

- **Nyckeln bygger på ordet, inte på kort-id eller enhet.** Blobben kan laddas upp
  rakt av till `/users/{uid}/srs` **utan id-ommappning** – samma ord matchar samma
  ruta oavsett enhet eller hur innehållsträdet ser ut.
- **Pytteliten data** – några KB även med tusentals ord. Ryms lätt i gratiskvoten.
- **Merge-logiken finns redan.** Vid inloggning: ingen molndata → ladda upp lokal;
  finns molndata → slå ihop med "högsta box vinner" (samma regel som `app.js:581`).

### Begränsningar & fallgropar
1. **Bara enheten man loggar in från fångas först.** Har man kört anonymt på både
   iPhone och iPad har varje enhet sin egen `localStorage`. Migreringen sker per
   enhet vid första inloggningen *där* – de slås ihop i molnet, men det kräver
   inloggning på varje enhet minst en gång.
2. **Ordnycklar är känsliga för redigering.** Ändras ett korts text byter nyckeln
   namn och den gamla SRS-posten blir föräldralös. Detta gäller **redan idag**
   lokalt – flytten gör det inte värre, men problemet följer med.
3. **Merge-regel måste väljas medvetet.** "Högsta box vinner" är rimligt för `box`,
   men bestäm separat vad som gäller för `due`/`lastSeen` (senaste? högsta?).
4. **Träningsstatistiken** (`flippa-stats-v1`, passloggar – `app.js:1380`) kan också
   flyttas, men den är en **historik-lista**: sammanslagning av två enheter =
   konkatenera + deduplicera på tidsstämpel, inte "högsta vinner".
5. **Radera inte lokalt förrän uppladdning bekräftats.** Behåll `localStorage` som
   fallback så inget går förlorat om nätet strular mitt i.
6. **Migrering ≠ löpande synk.** Att *flytta över* befintlig data är trivialt. Den
   egentliga utmaningen framåt är att hålla moln + lokal synkade *fortsättningsvis*
   (offline-skrivningar, last-write-wins, konflikter mellan enheter i realtid) – en
   separat, större fråga.

### Sammanfattning
Engångsmigreringen är låg risk och lite jobb tack vare de ordbaserade nycklarna. Den
stora insatsen ligger inte i att flytta gammal data, utan i (a) datamodellen
delat-innehåll-vs-eget (avsnitt 1) och (b) den löpande synken mellan enheter.

---

## 7) Admin-läge (statistik & användaröverblick)

Idé (2026-07-05): ett admin-läge hårt knutet till Toms konto för att hantera
lektioner och se statistik — dels från GoatCounter, dels (på sikt) per-användardata
från Firebase: hur många lektioner andra har, hur deras Leitnerlådor ser ut osv.

### Nyckelinsikt: den intressanta datan finns oftast inte att läsa ännu
Att se *andras* lektioner/lådor går i praktiken inte idag, oavsett hur enkelt
admin-UI:t byggs:

- **Leitnerlådorna ligger i `localStorage` per enhet, inte i Firebase** → de finns
  bara på varje användares egen telefon. Ingen serverkälla att läsa andras SRS från.
- **Det finns inga separata användarkonton än** (delat innehållsträd + anonym auth).

Samma beroende som återkommer i avsnitt 1 och 6: för att se andras lektioner/lådor
krävs först **riktig inloggning per uid + SRS flyttad till Firebase**.

### GoatCounter – enkelt att komma åt, men trubbigt
- **Enklast:** bara en länk till GoatCounter-dashboarden. Noll kod.
- Siffror *in-app* via [API:t](https://www.goatcounter.com/api.html) kräver Bearer-token
  → **exponeras i klienten** (läs-only, egen statistik, låg insats men ändå), och
  **CORS** kan tvinga fram en liten proxy. Samma "var bor nyckeln?"-problem som AI-funktionen.
- Framför allt: **anonym aggregatdata.** Svarar på "hur många använde bildsök", men
  **inget** om enskilda användares lektioner eller lådor.

### Firebase – inte "svårare att läsa", utan "inget att läsa än"
- **Innehållsträdet** ligger redan där med ägar-taggar (`owner`) → "hur många lektioner
  har X" *skulle* kunna härledas, men är i nuläget mest Toms eget innehåll.
- **Säkerhetsreglerna** är idag "vem som helst inloggad får allt". Att läsa allas data
  kräver regler som ger *just admin-uid* bred läsrätt (admin-whitelist) — medveten design.
- **Lådorna finns inte här alls** (se ovan).

### Admin-gating (säkerhet)
`currentUser === "tom"` är **kosmetiskt** — går att sätta i `localStorage`. Duger för
att visa *egen enhets* data (inget känsligt läcker), men ett läge som läser *andras*
data från Firebase **måste** skyddas serverside (säkerhetsregler mot uid), annars är
det inte säkert oavsett hur knappen ser ut.

### Rekommenderad trappa (lätt → svår)
1. **Lokalt överblicksläge över eget konto (trivialt, nu):** antal ämnen/lektioner/kort,
   fördelning av egna Leitnerlådor (histogram från localStorage-SRS), förfallna idag.
   Datan finns redan på enheten — noll backend, noll ny auth, kosmetisk tom-gate. Blir
   samma UI man senare riktar mot molndata.
2. **GoatCounter: länk till dashboarden** (API + token/proxy bara om siffror in-app
   verkligen behövs — tveksamt värt det).
3. **Det stora:** riktig auth + SRS→Firebase + admin-säkerhetsregler → *då* går det att
   se andra användares lektioner och lådor. Hela multi-user-projektet.

> **Integritet:** att se andras lektioner/vad de pluggar har GDPR-implikationer även
> som admin — ha med i steg 3 (kopplar till GDPR-avsnittet i avsnitt 1).

**Kort sagt:** börja med steg 1 (egen data, lätt och nyttig), använd Goats dashboard
som den är, och betrakta "se andras lådor" som en frukt av multi-user-migreringen —
inte ett fristående admin-bygge.

---

## 8) Produkt-events att lägga till (GoatCounter)

Utöver användnings-eventen (bildsök, slå upp, uttala …) finns *produktbeteenden* värda
att mäta för att veta om nya funktioner träffar rätt. Idéer:

- **`kunde-direkt`** (idé 2026-07-05): tryck ett event varje gång A1-regeln utlöses —
  dvs. ett helt nytt ord (låda 0) svaras 👆 och hoppar direkt till låda 4. Svarar på
  frågan *"respekterar appen min nivå?"*: hur ofta möter användare ord de redan kan?
  Högt värde efter en stor import (t.ex. Collins 3000) bekräftar att snabb-avbetningen
  behövs; nära noll betyder att folk sällan får banala ord. Billig rad i `gradeCard`.
- Fler kandidater när funktionerna finns: `snabbsortering-anvand` (A1 steg 2),
  `exempelmening-visad` (A4), `leech-minnesregel-foreslagen` (A3).

Litet men viktigt: eventen är anonym aggregatdata (se avsnitt 7) — bra för "hur ofta",
inte för "vem".

---

## 9) Explicit "Ordna om"-läge (framtida)

Beslut 2026-07-05: **behåll dagens långtrycks-drag** för att ordna om lektioner *och*
ämnen tills vidare. Men troligt framtida steg: ett explicit **"Ordna om"-läge** med
tydliga drag-handles (☰) och en Klar-knapp, som man går in i medvetet.

- **Motiv:** på lektionslistan är tap = *starta pass*, så långtrycks-drag riskerar att
  råka dra igång ett pass. Ett explicit läge tar bort den krocken och gör gesten
  upptäckbar (idag är den "hemlig").
- **Gäller båda listorna:** inför det för lektioner *och* ämnen för konsekvens (på
  ämneslistan är krocken mindre eftersom tap = öppna ämnet, men enhetlighet vinner).
- Mockup finns (variant 9 i `mockups/lektionsrad-progress.html`): banner + ☰-handles +
  Klar, upplyft rad vid drag.

---

## Nästa steg
Konkreta beslut (delat vs eget innehåll, val av login-leverantörer, EU-region)
och uppföljningsfrågor läggs i [`oppna-fragor.md`](oppna-fragor.md) enligt
projektkonventionen.
