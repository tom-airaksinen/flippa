"use strict";
/* Användarvänlig versionshistorik (visas i appen: Hjälp → "Vad är nytt" + via
   versionsraden i Inställningar → Om). Kurerade höjdpunkter, INTE varje liten fix.

   VID DEPLOY: när APP_VERSION bumpas för en användarsynlig ändring – lägg till/
   uppdatera en post här överst (nyast först) med en kort, vardaglig rad. Rena
   interna ändringar (refaktor, osynliga fixar) behöver ingen post. Se CLAUDE.md.

   Post: { date:"7 juli 2026", ver:"v238", items:[ {t, type, hi, ico, desc} ] }
   type: "new" | "improved" | "fixed"   ·   hi: true = höjdpunkt (visas i "Vad är nytt")
   ico/desc används bara för höjdpunkter (kort-vyn). */
const CHANGELOG = [
  { date: "26 september 2026", ver: "v378", items: [
    { t: "Uppläsningen av svaret hördes inte när man svepte utan att flippa – nästa kort avbröt den", type: "fixed" },
    { t: "CSV-importen tar uttal med latinska bokstäver i en åttonde kolumn, och AI-prompten ber om den för persiska", type: "new" },
  ]},
  { date: "26 september 2026", ver: "v377", items: [
    { t: "Sveper du iväg kortet utan att flippa läses svaret upp – kör du Till svenska hörs den svenska sidan, så du märker om du trodde fel", type: "new" },
  ]},
  { date: "26 september 2026", ver: "v376", items: [
    { t: "Nya ord fick inget uttal förrän appen installerades om – listan över inspelade ord låg kvar i cachen", type: "fixed" },
  ]},
  { date: "26 september 2026", ver: "v375", items: [
    { t: "Uttalet med latinska bokstäver går nu att redigera i Redigera ord – fältet visas för språk som använder det (i dag persiska)", type: "new" },
  ]},
  { date: "26 september 2026", ver: "v374", items: [
    { t: "Högtalaren visas bara när just det ordet har ett uttal – förut kunde knappen stå där utan att låta", type: "fixed" },
  ]},
  { date: "26 september 2026", ver: "v373", items: [
    { t: "Persiskan har fått en riktig röst: alla 139 ord och bokstäver är omlästa med Microsofts Dilara, och orden som saknade uttal har fått det", type: "improved",
      hi: true, ico: "🔊", desc: "Uttal på alla persiska ord" },
  ]},
  { date: "26 september 2026", ver: "v371", items: [
    { t: "För språk som skrivs från höger till vänster ber AI-prompten nu om en CSV-fil i stället för text att kopiera – urklippet kastar om sådan text på vissa telefoner", type: "improved" },
    { t: "Varningen om sönderklippta rader visar vilka rader den reagerade på, och varför", type: "improved" },
  ]},
  { date: "26 september 2026", ver: "v369", items: [
    { t: "Inklistring lagar nu rader som kopian slagit ihop med ett mellanslag – förut varnade appen i stället för att rätta", type: "fixed" },
    { t: "Kryssrutan \"Kom ihåg mitt val\" är ritad av appen i stället för av telefonen: samma utseende överallt och luft mellan rutan och texten", type: "improved" },
  ]},
  { date: "26 september 2026", ver: "v368", items: [
    { t: "Persiska ord läses nu upp även på iPhone – uttalet är inläst i förväg med en AI-röst och spelas som ljudfil när enheten saknar röst för språket", type: "new",
      hi: true, ico: "🔊", desc: "Uttal för språk telefonen inte kan" },
  ]},
  { date: "25 september 2026", ver: "v366", items: [
    { t: "Persiska områden visar uttalet med latinska bokstäver under ordet – för den som inte läser skriften än (försök, bara persiska tills vidare)", type: "new" },
  ]},
  { date: "25 september 2026", ver: "v365", items: [
    { t: "Inklistring varnar när raderna ser sönderklippta ut – ord som delats mitt itu eller två glosor på samma rad – innan något läggs till", type: "new" },
  ]},
  { date: "25 september 2026", ver: "v364", items: [
    { t: "Inklistring av glosor tål trasiga radbrytningar – rader som klistrats ihop delas upp igen i stället för att bli ett hopkok", type: "fixed" },
    { t: "För språk som skrivs från höger till vänster ber AI-prompten om ett kodblock, så kopian inte kastar om orden på vägen", type: "improved" },
  ]},
  { date: "25 september 2026", ver: "v363", items: [
    { t: "Fler språk går att välja – även de din enhet saknar röst för. De märks \"· inget uttal\", allt annat fungerar som vanligt", type: "new",
      hi: true, ico: "🌍", desc: "Välj språk även utan uttalsröst" },
    { t: "Språk som skrivs från höger till vänster (persiska, arabiska, hebreiska) visas nu åt rätt håll på korten och i ordlistan", type: "fixed" },
  ]},
  { date: "24 september 2026", ver: "v362", items: [
    { t: "Lättare att träffa glödlampan på kortet – trycket landar inte längre på kortet och flippar fram svaret när man siktar lite snett", type: "fixed" },
  ]},
  { date: "24 september 2026", ver: "v361", items: [
    { t: "Sök på ord i målspråket utan att pricka accenterna rätt – \"bra\" hittar brâ och bră. Svenska sidan matchas fortfarande exakt, så \"ram\" ger inte träff på \"kräm\"", type: "improved",
      hi: true, ico: "🔍", desc: "Sök utan att jaga accenter" },
  ]},
  { date: "23 september 2026", ver: "v360", items: [
    { t: "UNIKA i statistiken räknar nu varje ord en gång för hela perioden – förut lades varje dags siffra ihop, så ett ord du mött tre dagar räknades tre gånger", type: "fixed",
      hi: true, ico: "📊", desc: "Unika kort räknas rätt för 7 och 30 dagar" },
    { t: "Totalt visar alltid antal flippade kort; trycker du på rutan där får du veta varför unika inte går att visa så långt bakåt", type: "improved" },
  ]},
  { date: "23 september 2026", ver: "v358", items: [
    { t: "Ångra-knappen finns nu även på Klar-skärmen – blev sista kortet fel behöver du inte skaka telefonen", type: "new" },
  ]},
  { date: "22 september 2026", ver: "v357", items: [
    { t: "Appen hittar nu nya versioner själv i stället för att lita på att telefonen gör det – och fastnar den ändå står det \"tryck för att uppdatera\" på versionsraden längst ner", type: "fixed",
      hi: true, ico: "🔄", desc: "Slut på att sitta fast på en gammal version" },
  ]},
  { date: "22 september 2026", ver: "v356", items: [
    { t: "Slå upp-frågan ber nu om ordets alla böjningsformer, inte bara förklaringen till dem som står på kortet", type: "improved" },
  ]},
  { date: "20 september 2026", ver: "v355", items: [
    { t: "CSV-importen tar nu med böjningen – lägg den i en sjunde kolumn, så slipper du fylla i formerna efteråt", type: "new",
      hi: true, ico: "⬆️", desc: "Böjningen följer med i CSV-filen" },
    { t: "Importen varnar om nästan varje lektion bara får ett enda ord – då står oftast ordet i första kolumnen i stället för lektionsnamnet", type: "new" },
  ]},
  { date: "14 september 2026", ver: "v354", items: [
    { t: "Böjningen på kortet visas nu i kursiv stil med mer luft mot minnesregeln, så de två går att skilja åt i en blick", type: "improved" },
    { t: "Glosor/Grammatik-växlaren ser nu ut som prio-väljaren i Redigera ord – ett sammanhängande segment i stället för två knappar", type: "improved" },
  ]},
  { date: "13 september 2026", ver: "v353", items: [
    { t: "Fixat på riktigt: gnuggframstegen inne i Flippa överlever nu omstarter. Gnugga serveras nu från Flippas egen adress – förut låg den på en annan, och då ger iPhone den tillfällig lagring som nollas", type: "fixed" },
  ]},
  { date: "13 september 2026", ver: "v352", items: [
    { t: "Fixat: gnuggframsteg gjorda inne i Flippa kunde försvinna när appen startades om – nu säkerhetskopieras de till Flippas egen lagring och läggs tillbaka automatiskt", type: "fixed" },
  ]},
  { date: "13 september 2026", ver: "v351", items: [
    { t: "Testet med Gnugga i Flippa: rumänska ämnen har nu flikarna Glosor och Grammatik. Grammatik visar knappen till Gnugga plus hur det gnuggats på sistone", type: "improved" },
  ]},
  { date: "13 september 2026", ver: "v350", items: [
    { t: "Test: ämnen på rumänska har fått knappen 🧽 Gnugga grammatiken, som öppnar grammatikdrillen Gnugga direkt inne i Flippa", type: "new" },
  ]},
  { date: "13 september 2026", ver: "v349", items: [
    { t: "Böjningsfältet fungerar nu för verb också, och AI:n fyller i det när den föreslår nya ord", type: "improved", hi: true, ico: "📐",
      desc: "För verb sparas de former man inte kan gissa sig till: 1:a och 3:e person presens, perfekt och konjunktiv. Rumänska 101 har fått alla sina 17 verb ifyllda." },
    { t: "Fixat: Spara hamnade utanför dialogen i Redigera ord när böjningsfältet kom till. Minnesregelfältet var fem rader högt trots att det var tänkt som två", type: "fixed" },
  ]},
  { date: "13 september 2026", ver: "v348", items: [
    { t: "Fixat: svepet höger för att gå tillbaka missade ofta när man svepte fort. Nu fångas även snabba svep", type: "fixed" },
  ]},
  { date: "13 september 2026", ver: "v347", items: [
    { t: "Att fylla en lektion med AI fungerar nu precis som Ta hjälp av AI: en knapp som fäller ut valen, med ”Kom ihåg mitt val”. Har du valt en AI går knappen direkt dit", type: "improved", hi: true, ico: "✨",
      desc: "Förut låg Claude och ChatGPT som två knappar bredvid varandra här, men som en utfällbar meny vid minnesregeln – samma sorts val såg olika ut på de två ställena. Nu är de lika, så mönstret behöver bara läras en gång." },
  ]},
  { date: "13 september 2026", ver: "v345", items: [
    { t: "Claudes och ChatGPTs ikoner ser nu ut som deras riktiga logotyper, och alla AI-ikoner är lika stora i listorna. ChatGPT hade en kub som inte hade med saken att göra", type: "improved" },
    { t: "Hjälp och Statistik studsar nu mjukt när man drar i dem, även när innehållet ryms på skärmen", type: "improved" },
  ]},
  { date: "13 september 2026", ver: "v344", items: [
    { t: "AI-hjälp under Inställningar visar nu alla fyra val i en lista med bock på det som gäller, och sparas först när du trycker Spara", type: "improved" },
    { t: "Fixat: ”Vad är nytt” satt indraget i stället för att linjera med avsnitten under", type: "fixed" },
  ]},
  { date: "13 september 2026", ver: "v342", items: [
    { t: "Välj din AI en gång så slipper du menyn: kryssa i ”Kom ihåg mitt val” när du trycker Ta hjälp av AI, så går knappen direkt till Claude eller ChatGPT nästa gång", type: "new", hi: true, ico: "✨",
      desc: "Knappen byter då namn till ”Fråga Claude” så du ser vart den leder innan du trycker. Valet gäller din profil och ändras under Inställningar → AI-hjälp, där du också kan välja att bara få frågan kopierad." },
  ]},
  { date: "13 september 2026", ver: "v341", items: [
    { t: "Hjälpen beskriver nu böjningsfältet och hur du hör böjningen genom att dubbeltappa eller hålla in högtalaren", type: "improved" },
  ]},
  { date: "13 september 2026", ver: "v340", items: [
    { t: "Sökfält i Hjälp – skriv t.ex. ”prio” så visas bara de avsnitt som handlar om det, oavsett vilket tema de ligger under", type: "new", hi: true, ico: "🔍",
      desc: "Söket träffar även brödtexten, inte bara rubrikerna, så du hittar rätt även när du bara minns ett ord ur texten. Rensar du fältet är hjälpen som förut." },
    { t: "”Vad är nytt”-knappen linjerar nu med avsnitten under", type: "improved" },
  ]},
  { date: "12 september 2026", ver: "v337", items: [
    { t: "Högtalare även i Redigera ord, till vänster om AI-stjärnorna – med samma dubbeltapp för böjningen. Den läser det du just skrivit, så du kan höra ändringen innan du sparar", type: "new", hi: true, ico: "🔊",
      desc: "Praktiskt när man lägger in ett nytt ord och vill kontrollera uttalet på en gång, utan att först spara och leta upp kortet i ett pass." },
    { t: "AI-kontext tar nu med ordets böjning i frågan när kortet har en, och ber om förklaringen till varför formerna ser ut som de gör", type: "improved" },
  ]},
  { date: "12 september 2026", ver: "v336", items: [
    { t: "Dubbeltappa högtalaren – eller håll in den – så läses ordet upp tillsammans med böjningen, bra när man vill höra hur pluralen låter. Ett tapp är som förut, och den automatiska uppläsningen säger aldrig böjningen", type: "new", hi: true, ico: "🔊",
      desc: "Två sätt som gör samma sak, så det är lättare att råka hitta: dubbeltappa, eller håll in knappen en halvsekund. Första tappet talar direkt som vanligt, och vid dubbeltapp glider böjningen på efter ordet utan att uppläsningen börjar om." },
  ]},
  { date: "12 september 2026", ver: "v334", items: [
    { t: "Nytt böjningsfält på korten – slås på per ämne under Redigera ämne. Där kan du lägga t.ex. ”o casă, două case”, som visas diskret under ordet men aldrig läses upp", type: "new", hi: true, ico: "📐",
      desc: "Tanken är att lära in genus och pluralform på köpet, särskilt för ord där stammen ändras. Fältet syns bara för ämnen där du slagit på det, så övriga ämnen ser ut precis som förut. Böjningen går att söka på, och AI-prompten ber om den när ämnet har fältet påslaget." },
  ]},
  { date: "12 september 2026", ver: "v333", items: [
    { t: "Trycker du på Ångra kommer kortet tillbaka direkt, utan den lilla pausen. Skakar du telefonen är det som förut – då hinner ↩️ visa vad som hände innan kortet glider in", type: "improved" },
  ]},
  { date: "10 september 2026", ver: "v332", items: [
    { t: "Ämneslistan studsar nu mjukt när man drar i den, även om man bara har några få ämnen. Förut kändes skärmen stel eftersom det inte fanns något att scrolla", type: "improved" },
  ]},
  { date: "8 september 2026", ver: "v331", items: [
    { t: "Knappen på Klar-skärmen säger nu ”Ta de sista 10 direkt” även när det är precis ett pass kvar – förut stod det ”Fortsätt med 10 till” fast det inte kom mer efter det", type: "improved" },
  ]},
  { date: "4 september 2026", ver: "v329", items: [
    { t: "Väljaren i ämnesvyn heter nu ”Översätt” i stället för ”Riktning” när ämnet är ett språk, och tredje valet heter ”Blanda riktning”. För ämnen som inte översätts, som Morsekod, står det kvar som förut", type: "improved" },
  ]},
  { date: "30 augusti 2026", ver: "v327", items: [
    { t: "Appen hämtar nu bara den profil du faktiskt använder, i stället för allt innehåll i hela databasen. Starten går snabbare och telefonen får utrymme över", type: "improved", hi: true, ico: "⚡",
      desc: "Tidigare laddade varje telefon allas områden – även andra profilers – vid varje start. Nu hämtas din profil, och de profiler du bytt till förut ligger kvar sparade så att byten sker direkt. Det var också det som gjorde att lagringen kunde ta slut." },
    { t: "Byter du till en profil du aldrig använt på telefonen krävs nätverk första gången", type: "improved" },
  ]},
  { date: "30 augusti 2026", ver: "v326", items: [
    { t: "Fixat: när enhetens lagring blivit full kunde passet krascha på sista kortet – ”Något gick fel: The quota has been exceeded” – och kortet kom tillbaka i stället för att passet avslutades. Nu går passet alltid i mål", type: "fixed", hi: true, ico: "💾",
      desc: "Flippa sparar en kopia av allt innehåll på telefonen, och den kunde tränga ut utrymmet för dina svar. Nu rensas den kopian automatiskt när det behövs – och skulle det ändå inte gå att spara får du veta det, i stället för att tro att framstegen sparas." },
  ]},
  { date: "30 augusti 2026", ver: "v325", items: [
    { t: "Fixat: i ”Dags att öva” kunde passet fastna på samma ord – man svarade, men samma ord kom upp igen och igen oavsett hur man svepte. Nu går passet alltid vidare", type: "fixed", hi: true, ico: "✅",
      desc: "Orsaken var att statistiken (dagens räknare och firande-notiserna) kunde snäva till sig och då stoppa hela svarshanteringen innan kortet hann bytas. Nu körs statistiken avskilt: den kan aldrig stoppa träningen, och skulle något ändå gå fel syns det som en notis i stället för att kortet tyst vägrar." },
  ]},
  { date: "29 augusti 2026", ver: "v323", items: [
    { t: "Ångra-knapp i toppen under passet. Den dyker upp först när du lagt ditt första svar, så du inte behöver skaka telefonen för att ta tillbaka ett kort", type: "new", hi: true, ico: "↩️",
      desc: "Skakning finns kvar, men kräver rörelsetillstånd och är opraktisk på bussen. Nu räcker ett tryck – och knappen syns bara när det faktiskt finns något att ångra." },
  ]},
  { date: "29 augusti 2026", ver: "v322", items: [
    { t: "Fixat: kortet kunde i sällsynta fall låsa sig mitt i ett pass så att det varken gick att vända eller svepa – bara att backa ur. Nu släpps låset alltid, och ⋯/🔊/💡 kommer tillbaka som de ska", type: "fixed" },
  ]},
  { date: "27 augusti 2026", ver: "v321", items: [
    { t: "Text i hakparenteser läses inte upp. Skriv t.ex. sil' [f] så syns genuset på kortet men stör inte uppläsningen – och en ensam (f) läses inte längre som ”eff”", type: "new", hi: true, ico: "🔊",
      desc: "Praktiskt för språk där man vill ha genus eller uttalshjälp på kortet utan att rösten läser upp det. Allt inom [ ] visas men hoppas över när ordet läses." },
  ]},
  { date: "25 augusti 2026", ver: "v317", items: [
    { t: "Hjälpen är omgjord: fem områden du fäller ut i stället för en lång vägg av text, kortare texter, och ett nytt avsnitt ”Grundtankar” som förklarar varför appen fungerar som den gör", type: "improved", hi: true, ico: "❓",
      desc: "Förut fick man scrolla igenom allt för att hitta en sak. Nu ser du alla områden direkt och öppnar det du undrar över – och läser du Grundtankar förstår du tanken bakom lådorna, prio och minnesreglerna." },
  ]},
  { date: "25 augusti 2026", ver: "v316", items: [
    { t: "Uppdateringar till en ny version kan nu ske även när du står i en lektions ordlista – och du hamnar tillbaka i samma lektion efteråt", type: "improved" },
  ]},
  { date: "25 augusti 2026", ver: "v314", items: [
    { t: "I Redigera ord finns nu ”Ta hjälp av AI” vid Minnesregel – den öppnar Claude eller ChatGPT med en färdig fråga om just det ordet, och du klistrar in förslaget du gillar", type: "new", hi: true, ico: "💡",
      desc: "En bra minnesregel är ofta skillnaden mellan ett ord som fastnar och ett som inte gör det – men det är svårt att hitta på en själv. Nu får du ett par förslag att välja bland, byggda på ljudlikhet, bilder eller ord du redan kan." },
  ]},
  { date: "25 augusti 2026", ver: "v311", items: [
    { t: "Prio syns nu som en siffra i en bricka vid stjärnan i stället för en liten färgprick inne i ordet – lättare att läsa, och den står kvar på sin plats även för långa fraser. Sorterar du på svagast visas Leitner-lådan där i stället", type: "improved" },
  ]},
  { date: "25 augusti 2026", ver: "v310", items: [
    { t: "Pausa en lektion är inte längre en gömd ikon: överst i ordlistan står det nu i klartext om lektionen är aktiv eller pausad, med knappen bredvid. Remsan följer med när du scrollar, så orden får plats", type: "improved" },
  ]},
  { date: "25 augusti 2026", ver: "v309", items: [
    { t: "Svep-tipsen under kortet är borta – riktningarna visas i stället på kortet medan du drar, och gloskortet blir högre", type: "improved" },
  ]},
  { date: "25 augusti 2026", ver: "v308", items: [
    { t: "Du ser nu vad ditt svep kommer att bli medan du drar kortet – symbolen och ordet (”kan bra”, ”hopplöst” …) tonas fram mitt på kortet, så du hinner ändra dig innan du släpper", type: "new", hi: true, ico: "👆",
      desc: "Tidigare fick man veta vad som hände först efter att man släppt. Nu växer symbolen fram med draget, mitt på kortet där blicken redan är – drar du åt fel håll är det bara att dra tillbaka." },
  ]},
  { date: "25 augusti 2026", ver: "v307", items: [
    { t: "AI-lektion: prompten är tydligare om att varje glosa ska stå på sin egen rad, och exemplen visas nu på språket du lär dig i stället för alltid italienska", type: "fixed" },
  ]},
  { date: "30 juli 2026", ver: "v303", items: [
    { t: "Redigera offline! Lägg till, ändra, flytta och ordna om ord även utan internet – ändringarna sparas lokalt och synkas automatiskt när du är uppkopplad igen", type: "new", hi: true, ico: "📶",
      desc: "Ingen mer förlorad ändring när täckningen tryter (t.ex. på tunnelbanan eller flyget). Du ser en liten notis när något väntar på synk, och den försvinner så fort allt är uppe." },
  ]},
  { date: "26 juli 2026", ver: "v295", items: [
    { t: "Hjälpen har nu ett avsnitt om att importera många ord från en CSV-fil, och du kan ladda ner en färdig mall (även via ＋-menyn i en lektion)", type: "improved" },
  ]},
  { date: "18 juli 2026", ver: "v288", items: [
    { t: "”Webbsök” heter nu ”AI-kontext” och har en AI-stjärnor-ikon – öppnar ordet i en AI-sökning (etymologi, nyanser, exempel)", type: "improved" },
  ]},
  { date: "14 juli 2026", ver: "v284", items: [
    { t: "Statistik: filtrera Leitner-fördelningen på prio-nivå – se t.ex. bara nivå 1 eller 2–3", type: "improved" },
  ]},
  { date: "9 juli 2026", ver: "v277", items: [
    { t: "Rättat: kunde fastna på en vit skärm om man öppnade Webbsök från Redigera-dialogen mitt i ett pass och sen stängde webbvyn – nu återhämtar sig appen automatiskt", type: "fixed" },
  ]},
  { date: "9 juli 2026", ver: "v275", items: [
    { t: "Enhetligare aviseringar – bekräftelser och fel visas nu likadant (en bredare ruta nere), med röd markering för fel", type: "improved" },
  ]},
  { date: "9 juli 2026", ver: "v274", items: [
    { t: "Nya ord du redan kan räknas inte mot dagskvoten – svarar du ”kan” eller ”kan väldigt bra” på ett nytt ord matas nästa nya in i stället", type: "improved", hi: true, ico: "🎯",
      desc: "Så fastnar du inte på några få repetitioner när du egentligen vill ta in fler nya ord – dagskvoten går åt till det du faktiskt behöver lära dig." },
    { t: "Klickar du på en lektion där allt redan är inlärt får du välja: repetera inlärda ord eller öva alla prio-nivåer", type: "improved" },
  ]},
  { date: "9 juli 2026", ver: "v268", items: [
    { t: "Sökfältet bor nu överst i listan – scrolla upp eller tryck 🔍 för att söka, tryck igen för att stänga", type: "improved", hi: true, ico: "🔍",
      desc: "Som i många iOS-appar ligger sökrutan högst upp i lektions- och ordlistan. Scrolla upp till den eller tryck förstoringsglaset; tryck igen för att stänga och rensa sökningen." },
  ]},
  { date: "9 juli 2026", ver: "v264", items: [
    { t: "Sök i alla lektioner visar nu de matchande orden direkt, grupperade per lektion – tryck på ett ord för att redigera det direkt", type: "improved", hi: true, ico: "🔍",
      desc: "Slå på sök på ämnesskärmen och skriv – du ser orden på en gång i stället för att leta lektion för lektion, och kan trycka för att redigera." },
  ]},
  { date: "9 juli 2026", ver: "v263", items: [
    { t: "Höjer du ”Nya kort per dag” gäller det direkt (fyller på dagens nya ord på studs) – sänkning gäller som förr från imorgon", type: "improved" },
  ]},
  { date: "8 juli 2026", ver: "v257", items: [
    { t: "Automatisk uppläsning missade ibland allra första ordet i ett pass (om man svepte direkt utan att vända kortet) – fixat", type: "fixed" },
  ]},
  { date: "8 juli 2026", ver: "v251", items: [
    { t: "Nytt sätt att lägga till ord – en dialog med Manuellt, Slå upp och AI", type: "improved", hi: true, ico: "➕",
      desc: "”＋ Lägg till ord” samlar allt: klistra in, slå upp & översätt (redigerbart, med prio per ord) eller be en AI om förslag." },
  ]},
  { date: "7 juli 2026", ver: "v250", items: [
    { t: "Klar-skärmens antal räknar rätt – pausade lektioner och bortfiltrerade prio-nivåer räknades tidigare in i totalen", type: "fixed" },
  ]},
  { date: "7 juli 2026", ver: "v242", items: [
    { t: "Smartare AI-hjälp – enklare dialog + prio-förslag", type: "improved", hi: true, ico: "✨",
      desc: "Ange antal och tema och öppna direkt i Claude/ChatGPT. AI:n graderar dessutom orden 1–3 efter hur centrala de är för temat." },
  ]},
  { date: "7 juli 2026", ver: "v238", items: [
    { t: "Versionshistorik – se vad som är nytt i appen", type: "new", hi: true, ico: "📰",
      desc: "Hittas under Hjälp → ”Vad är nytt”, och via versionsraden i inställningarna." },
  ]},
  { date: "7 juli 2026", ver: "v237", items: [
    { t: "Daglig påminnelse (beta) – få en pushnotis vid vald tid", type: "new", hi: true, ico: "🔔",
      desc: "Slå på i inställningarna och välj när du vill bli påmind om dagens pass." },
    { t: "Ny inställningssida via profilbilden – profil, mål och säkerhetskopiering samlat", type: "new", hi: true, ico: "⚙️",
      desc: "Tryck på din avatar uppe till höger. Byt profil, sätt mål och säkerhetskopiera." },
    { t: "Tryck på Flippa-fliken igen för att backa ett steg", type: "improved" },
  ]},
  { date: "6 juli 2026", ver: "v232", items: [
    { t: "Prio per ord (1/2/3) – styr vilka ord som körs och i vilken ordning", type: "new", hi: true, ico: "🎯",
      desc: "Märk de viktigaste orden och filtrera på nivå i KORT/PASS." },
    { t: "Filtrera på prio-nivå i KORT/PASS", type: "new" },
  ]},
  { date: "5 juli 2026", ver: "v218", items: [
    { t: "Behärskningsmätare per lektion – se hur långt du kommit", type: "new", hi: true, ico: "📊",
      desc: "En stapel per lektion visar hur stor andel av orden du lärt in." },
    { t: "Renare kort och lektionslista", type: "improved" },
    { t: "Anpassade AI-prompter per språk för att få med bestämd artikel eller genusmarkör där det är relevant", type: "improved" },
  ]},
  { date: "4 juli 2026", ver: "v211", items: [
    { t: "Webbsök & bildsök direkt från kortet", type: "new", hi: true, ico: "🔍",
      desc: "Kolla upp ett ord eller se bilder utan att lämna passet." },
    { t: "Handsfree-läge (beta) – svara med rösten", type: "new", ico: "🎙" },
    { t: "Appen laddar inte längre om mitt i ett pass", type: "fixed" },
  ]},
  { date: "29 juni 2026", ver: "v175", items: [
    { t: "Statistik & prestationer – streak, kalender och nivåer", type: "new", hi: true, ico: "🔥",
      desc: "Följ din streak, se en aktivitetskalender och nå dagliga mål." },
    { t: "Favoritmarkera ord (stjärnord) och pausa lektioner", type: "new" },
    { t: "Rosa tema för Hedvigs profil", type: "new" },
  ]},
  { date: "17 juni 2026", ver: "v89", items: [
    { t: "Profiler med lösenordslås (Tom, Hedvig, Wille, Gäst)", type: "new" },
    { t: "Träningsstatistik börjar sparas", type: "new" },
  ]},
  { date: "14 juni 2026", ver: "v80", items: [
    { t: "AI-hjälp för att fylla tomma lektioner med ord", type: "new", hi: true, ico: "✨",
      desc: "En färdig prompt att klistra in i din AI – få tillbaka ord att importera." },
    { t: "Slå upp & lägg till flera ord samtidigt", type: "new" },
    { t: "Minnesregler per ord", type: "new" },
  ]},
  { date: "30 maj 2026", ver: "v1", items: [
    { t: "Första versionen av Flippa – flippkort med smart repetition", type: "new", hi: true, ico: "🃏",
      desc: "Svep dig genom glosor; appen håller koll på vad du behöver repetera (Leitner)." },
  ]},
];
