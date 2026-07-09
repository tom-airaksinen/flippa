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
  { date: "9 juli 2026", ver: "v265", items: [
    { t: "Dra neråt i listan för att söka – som i många iOS-appar", type: "improved", hi: true, ico: "🔍",
      desc: "Står du i toppen av lektions- eller ordlistan och drar ner en bit fälls sökrutan ut automatiskt." },
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
    { t: "Slå upp & bildsök direkt från kortet", type: "new", hi: true, ico: "🔍",
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
