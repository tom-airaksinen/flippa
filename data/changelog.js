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
    { t: "Anpassade AI-prompter per språk", type: "improved" },
  ]},
  { date: "4 juli 2026", ver: "v211", items: [
    { t: "Slå upp & bildsök direkt från kortet", type: "new", hi: true, ico: "🔎",
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
