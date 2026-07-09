# Öppna frågor – Glosappen

## Arkitektur & data
- [x] Var lagras innehållet (ämnen/lektioner/ord)? → **Svar:** Firebase Realtime Database (synk, backup, mobil-CRUD, delas med barnen) (2026-05-30)
- [x] Var lagras SRS-statistik? → **Svar:** localStorage per enhet → ingen inloggning behövs (2026-05-30)
- [x] Räcker Firebase gratisnivå vid intensiv träning? → **Svar:** Ja, med stor marginal – glosor är ren text, långt under kvoten (2026-05-30)
- [x] Ny Firebase-databas/nytt projekt, eller återanvänd kassa-appens? → **Svar:** Nytt separat projekt – ren separation, egna regler; enda nackdel ~5 min engångssetup (2026-05-30)
- [x] Vilka säkerhetsregler ska Firebase ha? → **Svar:** Anonym inloggning + regel "kräver inloggad" (tyst, ingen login-ruta; blockar slumpmässiga skrivningar) (2026-05-30)

## SRS-modell
- [x] Leitner eller SM-2? → **Svar:** Graderad Leitner med datum (passar swipe; SM-2 kräver glidande ease factor) (2026-05-30)
- [x] Hur många utfall/gester? → **Svar:** Tre – 👈 kan inte (→låda 1), 👉 kan (+1 låda), 👆 kan väldigt bra (+2 lådor) (2026-05-30)
- [ ] Exakta intervall per låda – startförslag i PLAN.md (idag/2/4/8/16/32 dgr), justeras efter känsla?
- [ ] Behövs en "hoppa över idag/snooza" trots att uppåtgesten nu är "kan väldigt bra"?
- [ ] Svårighets-/historik-minne per ord (leech)? → **Tanke:** ren Leitner är "minneslös" och minns inte att vissa ord alltid är svåra. Förfining (inte krock): räkna bommar/andel rätt per ord och låt det (a) visa en 🔥-indikator på sega ord och/eller (b) vara tiebreaker i "svagast först". Full SM-2 ease factor avråddes (binär-ish input + transparensförlust); 👇 hopplöst + Leitners självkorrigering räcker troligen. (Diskuterad 2026-06-02)

## Träningslägen
- [x] Ett läge eller flera? → **Svar:** Två: (A) lektionsträning (cram, svagast först), (B) "Dags att öva" på ämnesnivå (förfallna idag, valbara lektioner). Samma motor. (2026-05-30)
- [x] Vad ska det schemalagda läget heta? → **Svar:** "Dags att öva" (2026-05-30)
- [x] "Träna ett urval per lektion" (kärnord)? → **Svar:** Stjärnmärkning per ord (personligt per profil) + toggle "Endast stjärnord" vid passinställningen (förfallna enligt SRS; nya stjärnord introduceras via vanliga nyord-kvoten). Full design i [`import-paus-favoriter.md`](import-paus-favoriter.md). (2026-06-28)

## UI/UX
- [x] Tema? → **Svar:** Neutralt/generiskt (inga sportreferenser) (2026-05-30)
- [x] Antal nivåer? → **Svar:** 3 (Ämne → Lektion → Ord) (2026-05-30)
- [ ] Behåller vi "skaka för att ångra" och tryck-för-flippa från fotbollsappen?
- [ ] Ska lådan/styrkan visas i UI:t per ord?
- [ ] Justera antal kort mitt i ett pass? → **Idé + prototyp:** kunna ändra hur många kort som är kvar medan man kör. Tre varianter i mockup: A) tappbar "kvar"-pill → popover med stegare + snabbval (+5/+10, Alla kvar, Avsluta nu) **(rekommenderad)**, B) egen ⚙-knapp med förval, C) inline-stegare `− 8 +`. "Fler" drar in nästa kort ur dagens pool; är poolen slut → erbjud "Kör ändå". Prototyp: `mockups/kort-per-pass.html` (live: https://tom-airaksinen.github.io/flashcards/mockups/kort-per-pass.html). (Diskuterad 2026-06-02)

## Innehållshantering
- [x] CRUD från mobilen? → **Svar:** Ja – skapa/redigera/ta bort/döpa om ämnen, lektioner, ord (2026-05-30)
- [x] Snabbinmatning? → **Svar:** Klistra in flera rader `utländskt;svenskt`, en per ord (2026-05-30)
- [ ] Enhetligt "Lägg till ord"-flöde? → Mockup [`mockups/lagg-till.html`](../mockups/lagg-till.html): en dialog med segment **Manuellt / Slå upp / AI** istället för spridda ingångar. AI-loopen (skicka → hämta svar → klistra in) görs tydlig i två förslag: **A allt-i-ett** (skicka-knappar + inklistringsruta i samma vy) och **B guide** (steg 1 skicka → steg 2 klistra in, visas automatiskt vid retur). **Öppet:** vilket förslag; ska AI-läget bara finnas i tomma lektioner eller alltid; bör vi läsa urklipp automatiskt vid retur ("hittade ett svar – klistra in?").
- [ ] "Slå upp & lägg till ord" i lektionslistans ＋-meny – stryka eller enas? → **Läge (2026-07-09):** knappen är **dold** (v262), koden kvar (`#translate-subject` + `openTranslate`, kommenterad i index.html/app.js). Den överlappar nu med **Slå upp**-segmentet i den nya Lägg till ord-dialogen (`openAddDialog`). **Öppet:** antingen (a) **stryk** helt, eller (b) **ena** in i flödet – t.ex. en genväg som öppnar Lägg till ord direkt på Slå upp-segmentet. OBS: den dolda ingången var enda stället där man kunde **välja/skapa lektion** som del av slå-upp-flödet (dialogens Slå upp lägger i den redan öppnade lektionen) – vill vi behålla den möjligheten, tala för (b) med lektionsväljare.
- [ ] Ska man kunna flytta ord mellan lektioner, eller räcker lägg till/ta bort?
- [ ] Import: slå ihop (merge) eller ersätta befintligt innehåll?
- [x] Behövs export/import-JSON? → **Svar:** Ja, för SRS-statistiken (localStorage) inför ominstallation – content ligger i Firebase och är redan säkert. Byggt 2026-05-30 (export/import via menyn ⋯).

## Projekt & drift
- [x] Repo-namn på privata GitHub-kontot? → **Svar:** "flashcards" (lokal mapp heter "glosappen" – får skilja sig) (2026-05-30)
- [x] Publikt eller privat repo? → **Svar:** Publikt (gratis Pages, inget känsligt i koden; privat kräver GitHub Pro) (2026-05-30)
- [x] Deploy? → **Svar:** GitHub Pages, live på https://tom-airaksinen.github.io/flashcards/ (2026-05-30)
- [x] Egen ikon till hemskärmen? → **Svar:** Ja, neutral kort-stack-ikon (icon.svg → 192/512 px) (2026-05-30)
- [ ] Om anonym inloggning skulle fela på github.io: lägg ev. till domänen under Firebase Auth → Settings → Authorized domains.
- [x] Räknas jag/tester in flera gånger i GoatCounter? → **Analys (2026-07-07):** Inga fantomanvändare, men egen trafik inflateras: (a) **varje app-laddning = 1 sidvisning**, och PWA:n auto-omladdar vid ny version (`skipWaiting`+reload) → en deploy-dag ger flera visningar per öppning; (b) GoatCounter härleder "besökare" ur en **dygnsroterande** hash av IP+UA → man räknas som ny besökare varje dag (en daglig användare ≈ 30 besökare/mån); (c) ett pass avfyrar många events (uttala/pass-klart/…) som visas separat. **Automattester räknas EJ** – verify-harnessen blockerar goatcounter.com. Self-exclude ej byggt: `#toggle-goatcounter` sätter `localStorage.skipgc` men når inte den installerade hemskärms-PWA:n (egen storage, fast start_url); IP-ignore opålitligt på mobil. **Löst (v235, 2026-07-07):** hårdkodat att Toms konto aldrig genererar statistik – `index.html` sätter `window.goatcounter={no_onload:true}` när `flippa-user==="tom"` (ingen automatisk sidvisning) och `track()` returnerar tidigt för Tom (inga events, inkl. nav-eventen som annars går förbi count.js). Gäller framåt och bara enheter där vald profil är Tom; andra profiler spåras normalt. (Byter Tom till Gäst på egen enhet för att testa räknas den gäst-sessionen – förväntat.)
- [x] Skydda användaren från omladdning mitt i något vid deploy? → **Nivå 1 byggd (v199, 2026-07-04):** omladdning för ny version skjuts upp tills man är på ämnes-/lektionslistan utan pass/handsfree/öppen modal (`maybeReloadForUpdate`/`isSafeToReloadForUpdate`). Nivå 2 (diskret "ny version"-banner utan skipWaiting) återstår. → **Analys (2026-07-04):** Idag gör SW:n `skipWaiting` och appen `location.reload()` så fort ny version upptäcks (kollas var 60:e s + vid förgrund). Ingen dataförlust (SRS/statistik sparas löpande, innehåll i Firebase) – men flyktigt läge tappas (pågående passkö, Klar-skärmens Fortsätt, halvskriven glosa, handsfree) + splash blinkar. Åtgärd i tre nivåer: **(1)** uppskjuten reload – ladda bara om när man är på listan, ingen modal/pass/handsfree (~30–45 min, löser ~90 %); **(2)** ta bort `skipWaiting`, visa diskret "Ny version – tryck för att uppdatera"-banner (~1 h, standard-PWA-mönster); **(3)** kombo. Rekommendation inför bredare release: nivå 1 nu, nivå 2 senare. Litet, isolerat jobb (~SW-logik + lite UI), ingen risk för övrig app.

## Prio per kort (nivåer) – se [`prio-plan-2026-07-06.html`](prio-plan-2026-07-06.html)
- [x] Nivå per lektion eller prio per kort? → **Svar:** Prio per kort (1–3, tomt = 2) ersätter nivåindelade lektioner helt; `innehallsbibliotek.md` skrivs om (2026-07-06)
- [x] Delad eller personlig prio? → **Svar:** Fält på kortet, följer med användarens kopia av innehållet; bibliotekets prio = ursprungsförslag (2026-07-06)
- [x] Påverkar nivåfiltret även repetitioner? → **Svar:** Ja, nya + repetitioner – samma semantik som paus; urbockad nivå fryser orden tills den bockas i igen (2026-07-06)
- [x] Ska manuell lektionsträning respektera priofiltret? → **Svar (reviderat 2026-07-06):** JA. Ursprungsplanen (§03) sa nej – "klickar man in i en lektion har man sagt vad man vill öva". Men användaren vill kunna öva bara t.ex. nivå 1 av en lektion (Sjöfart inför färjan). Filtret gäller nu även manuell träning; ger filtret 0 ord i lektionen → toast "ändra i KORT/PASS". Behärskningsmätaren mäts också mot valda nivåer ("N av nivå").
- [ ] Exakta vikter för nyordsintroduktion? Startförslag 15/4/1 (→ 75/20/5 när alla nivåer valda), justeras efter känsla
- [x] Terminologi: "prio" eller "nivå"? → **Svar:** `prio` överallt (kod, CSV, UI-rubrik) – "nivå" är redan dubbelt upptaget (Leitner "en nivå upp" i hjälpen + prestationernas "Ändra nivåer"). **Reviderat 2026-07-06 vid skarpt bygge:** UI bär **siffran primärt** ("Prio 1/2/3", matchar segmentet i Redigera ord och prickarna) med **Kärna/Vanlig/Nisch som undertext/beskrivning** – både tal och begrepp finns. Gäller priofiltret i KORT/PASS och Redigera ord.
- [x] Ska AI-promptmallen (tom lektion) be om prio? → **Svar:** Ja – formatet `ord;översättning;prio` med kort definition; komplexiteten bor i prompten (läses av AI:n), inte hos användaren. Prio alltid valfri vid inklistring: tredje kolumn som är exakt 1/2/3 tolkas som prio, annars del av baksidan. Inga API-anrop från Flippa – användarens egen AI som idag (2026-07-06)
- [x] Global språkfrekvens eller relativ prio? → **Svar:** Relativ till TEMAT (inte till listan, inte till språket): prio = relativ centralitet inom det innehåll ordet tillhör. Allmänna listor (Collins, "Kroatiska 101") = temat är hela språket → sammanfaller med frekvens. Lektionen svarar på "vad", prio på "i vilken ordning inom det". Promptprinciper: urvalet får aldrig styras av prio; fördelningshinten (~½/⅓/resten vid 30+ ord) är riktmärke mot 1-inflation, aldrig kvot; korta vardagslistor kan sakna prio 3 helt. Se prio-planen §00 + §05 (2026-07-06)
- [x] Temalektioner (t.ex. Sjöfart) får mest prio 2–3 av en globalt kalibrerad AI – behövs "boost:a denna lektion"? → **Svar:** Löst av den relativa semantiken: kantarellen får prio 1 inom Svampar och flödar in i huvudfåran. Boost-mekanism behövs inte (2026-07-06)
- [ ] A/B-testa fördelningshintens varianter mot olika LLM:er inför backfillen: (A) ingen hint, (B) mjuk villkorad hint, (C) rangordna-först-och-buckla
- [ ] Avancerad prompt (prio ovanpå befintlig genus/artikel-mekanik) + UX – mockup [`mockups/ai-prompt.html`](../mockups/ai-prompt.html). Sammansatt prompt: tema + antal + 3-kolumnsformat (`ord;översättning;prio`) + genusNote + tema-relativ prio-semantik (~½/⅓/rest, riktmärke ej kvot). **Två UX-varianter:** (1) dialog med antal (default 30, minns) + tema (default lektionsnamn) + "Öppna i Claude/ChatGPT" (prompten som `?q=`-param, ~1,3k tecken → ingen trunkering); (2) dagens flöde men lång prompt visas hopfälld med "Visa hela prompten". **Öppet:** vilken variant? Auto-skicka vs bara förifylla i AI:n?
- [ ] Spillriktning när en nivåhink sinar – mot närmast högre prio först?
- [ ] Hjälpflikens text: eget stycke om nivåer inkl. att urbockad nivå pausar repetitioner?

## Notiser / påminnelser (push) – se [`produktanalys-2026-07-05.html`](produktanalys-2026-07-05.html) B5 + [`framtida-utveckling.md`](framtida-utveckling.md)
- [x] Går push att bygga i nuvarande PWA? → **Svar (2026-07-07):** Ja. iOS stöder Web Push för **hemskärmsinstallerade** PWA:er sedan 16.4; vi har redan en service worker. Kräver `push`/`notificationclick`-handlers + permission (måste triggas av användargest) + lagrad push-subscription i Firebase, och en **serverkomponent** som skickar (Cloud Function på Blaze, eller Cloudflare Worker + cron – gratisnivå räcker) med VAPID-nycklar via `web-push`.
- [x] Nivå 1 – **generisk** daglig påminnelse? → **Byggt v236 (2026-07-07):** toggle + native tidväljare i inställningarna (beta-märkt), subscription sparas i `/push` i RTDB per enhet (slump-id), VAPID. SW visar notisen ("Dags att flippa!" / "Kör ett pass direkt", Flippa-ikon) och `notificationclick` öppnar senaste ämne (`#pushopen`). Sändare: `scripts/send-push.js` via GitHub Actions var 15:e min (Stockholm-tid, max en/dag, städar utgångna subs). Levereras inom ~15 min efter vald tid. Verifierat: workflow-körning läste DB via secret och gick klart utan fel (0 enheter). **Kvar för Tom:** installera PWA på hemskärmen + slå på toggeln för att testa på riktigt (iOS-krav).
- [ ] Nivå 2 – **personlig** knuff ("🇮🇹 23 ord väntar")? → Blockerad av att förfallo-antalet bara finns i localStorage per enhet i dag. Kräver B4 (auth + flytta SRS/progress till Firebase per uid) först – bunta med multi-user-jobbet.
- [ ] Integritet: push-subscription (endpoint) är persondata → notera i privacy-texten inför att öppna för fler; kräver Blaze + budgetlarm.
- [x] Var bor sändaren för nivå 1? → **GitHub Actions** (gratis, publikt repo → obegränsade minuter, ingen Blaze). Service-account-nycklar var blockerade av kleer.se-org-policy → använder istället legacy **Database secret** (`FIREBASE_DB_SECRET`) för REST-åtkomst. VAPID-privatnyckel som `VAPID_PRIVATE`. Firebase kvar på gratis Spark. RTDB-regler oförändrade (global auth-gate räckte; klienten skriver egen `/push`-nod via anonym auth, workflowet läser via secret).
- [ ] Rotera `FIREBASE_DB_SECRET`/`VAPID_PRIVATE`? Båda råkade passera terminalen/sessionsloggen vid setup. Låg risk för en familjeapp, men kan roteras (ny DB-secret + nya VAPID-nycklar) om önskas.
- [x] Inställningsvy/profil (ställning för befintlig funktionalitet) → **Byggt v234 (2026-07-07):** avatar på ämnesskärmen → inställningsskärm (Profil + Byt användare, Träning → Mål & nivåer, Data → Säkerhetskopiera, Om → version). First launch = welcome-vy med profilkort. Auto-uppläsning kvar i Flippa-vyn; hjälpen kvar i navbaren. Vald profil/lösenordslås orörda (ingen omloggning). Mockup: [`mockups/installningar.html`](../mockups/installningar.html) (inkl. framtida notis-states webb/PWA × permission). Push byggs som nästa steg.
- [x] Ingång till inställningar från huvudskärmen? → **Svar (2026-07-07):** ⋯-menyn (Backup) ersätts av **avataren** uppe till höger (profilbokstav + liten kugg-markör) → öppnar inställningsvyn (där profil/byt användare, notiser, backup bor). Kugghjul vore likvärdigt; avataren visar också vem man är. Mockup: [`mockups/huvudskarm.html`](../mockups/huvudskarm.html).

## Ikoner (ersätta emoji i UI) – mockup [`mockups/ikoner.html`](../mockups/ikoner.html)
- [ ] Vilken ikonstil för de emoji-baserade knapparna (sök 🔍, uttala 🔊, ledtråd 💡, meny ⋯, redigera ✎, m.fl.)? → Tre familjer i mockupen: **A Linje**, **B Solid**, **C Mjuk duo**. Välj en familj → byts ut tema-medvetet (currentColor) i `index.html`/`app.js`. Kvar som emoji tills vidare: flaggor 🇮🇹, firande 🎉, prestationer 💪⚡️🥇🏆🔥, svepmarkörer ✓✗★ (gesterna 👈👆👉👇 i hjälpen kandiderar också).

## Versionshistorik / "Vad är nytt" – se [`data/changelog.js`](../data/changelog.js)
- [x] Format? → **Byggt v238 (2026-07-07):** C+A – höjdpunktskort ("Vad är nytt") överst, hela versionslistan (datum + version + punkter) under en "Visa hela versionshistoriken"-knapp. Mockup: [`mockups/changelog.html`](../mockups/changelog.html).
- [x] Var bor den? → **Byggt v238:** primärt **Hjälp → "Vad är nytt"**-knapp; sekundärt **Inställningar → Om** (versionsraden tappbar → changelog). Helskärms-overlay med bakåtknapp + högersvep. *(Valfritt kvar: diskret "ny version"-prick efter uppdatering – knyter an till nivå 2 i deploy-skydd-frågan.)*
- [x] Källa/underhåll? → Handkurerad lista i `data/changelog.js`. **Regel i CLAUDE.md:** vid deploy (APP_VERSION-bump) läggs en användarvänlig post till om ändringen är synlig; interna ändringar hoppas över.

## Innehållsbibliotek (nivåindelat) – se [`innehallsbibliotek.md`](innehallsbibliotek.md)
> **OBS (2026-07-06):** Nivå-per-lektion-upplägget nedan ersätts av prio per kort (se ovan). Planen ska skrivas om: en lektion per topic, prio-kolumn i CSV, nivåval via priofiltret.
- [ ] Nivåetiketter: "Nybörjare / Medel / Avancerad" eller "nybörjare / kan en del / avancerad"? (styr lektionsnamn)
- [ ] Vilka språk får färdiga paket först? (italienska redan på gång)
- [ ] Engelsk master som mellanled, eller generera direkt svenska↔målspråk?
- [ ] Distribution längre fram: i-app-bibliotek vs delade CSV-filer?
