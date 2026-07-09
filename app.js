"use strict";

/* =========================================================================
   Flashcards – generisk glosapp
   Innehåll i Firebase (delas, synkas), SRS i localStorage (per enhet).
   ========================================================================= */

// ---- Firebase init ----
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// ---- DOM ----
const $ = (id) => document.getElementById(id);
const statusBanner = $("status-banner");
const screens = {
  subjects: $("subjects-screen"),
  lessons: $("lessons-screen"),
  editor: $("editor-screen"),
  training: $("training-screen"),
  congrats: $("congrats-screen"),
  settings: $("settings-screen"),
};

// ---- App-state ----
// OBS: CACHE_KEY måste vara initierad INNAN loadCachedContent() anropas här, annars
// kastar den (const i TDZ) ett ReferenceError som try/catch sväljer → cachen blir
// alltid tom och "visa cachat innehåll offline" fungerar inte.
const CACHE_KEY = "flashcards-content-cache-v1";
let content = loadCachedContent(); // [{id,name,order,owner,lessons:[{id,name,order,cards:[{id,front,back,order}]}]}]
let currentSubject = null;         // valt ämnesobjekt
let currentLessonId = null;        // lektion öppen i editorn
// Uppdaterings-skydd: ny app-version laddas inte om mitt i ett pass. Sätts när en
// ny service worker tar över; själva omladdningen sker först på en säker plats.
let pendingReload = false, swReloading = false;

// ---- Analytics (GoatCounter): lätta custom-events. Sidvisningar sköts av count.js. ----
const GC_ENDPOINT = "https://flippa.goatcounter.com/count";
function track(path, opts) {
  opts = opts || {};
  // Toms eget konto genererar aldrig statistik – han vill bara mäta ANDRAS användning.
  // (Sidvisningar tystas separat i index.html via no_onload; detta täcker alla events,
  // inkl. nav-eventen nedan som annars går direkt till endpointen förbi count.js.)
  if (currentUser === "tom") return;
  try {
    if (opts.nav) {
      // Slå upp/Bildsök navigerar bort (location.href) → keepalive så eventet hinner iväg.
      fetch(GC_ENDPOINT + "?p=" + encodeURIComponent(path) + "&e=true&rnd=" + Math.random().toString(36).slice(2),
            { mode: "no-cors", keepalive: true }).catch(function () {});
    } else if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: path, event: true });
    }
  } catch (_) {}
}

// ---- Användare (lokal profilväljare – INTE inloggning/säkerhet) ----
// Varje område har en ägare (owner). Vald profil filtrerar vilka områden som visas.
// Lektioner ärver områdets ägare automatiskt. Lätt att utöka med fler profiler.
const USERS = [
  // lock = enkelt lösenordslås vid byte TILL profilen (asså jag fattar att du som snokar här hittar lösenordet enkelt, men det här är lite på skoj, okej?!)
  { id: "tom", name: "Tom", lock: "phl1ppzter" },
  { id: "hedvig", name: "Hedvig", lock: "horselove" },
  { id: "wille", name: "Wille", lock: "full4br0mmapappor" },
  { id: "guest", name: "Gäst" },
];
const USER_KEY = "flippa-user";
let currentUser = localStorage.getItem(USER_KEY) || null; // null = ingen vald (ny enhet)
applyTheme(); // sätt ev. rosa tema direkt (innan splash/render) om Hedvig är vald
function userName(id) { return (USERS.find((u) => u.id === id) || {}).name || ""; }
// Rosa tema gäller bara Hedvigs profil (sätter klass på <html> → CSS-variablerna byts)
function applyTheme() {
  document.documentElement.classList.toggle("theme-rosa", currentUser === "hedvig");
}
function setUser(id) {
  currentUser = id;
  if (id) localStorage.setItem(USER_KEY, id); else localStorage.removeItem(USER_KEY);
  applyTheme();
  renderSubjects();
}
// Engångsfix: ge äldre områden (utan owner) en ägare efter namn. Skrivs till Firebase
// via den inloggade klienten, så alla enheter ser samma ägarskap sen.
const OWNER_MIGRATED_KEY = "flippa-owners-assigned-v1";
function migrateOwners() {
  if (localStorage.getItem(OWNER_MIGRATED_KEY)) return;
  content.forEach((s) => {
    if (s.owner) return;
    const n = (s.name || "").trim().toLowerCase();
    const owner = n === "spanska" ? "hedvig"
      : (n === "bahasa indonesia" || n === "ukrainska") ? "guest"
      : "tom";
    s.owner = owner; // sätt lokalt direkt så filtret funkar innan Firebase ekar tillbaka
    db.ref(`content/subjects/${s.id}/owner`).set(owner).catch(writeError);
  });
  localStorage.setItem(OWNER_MIGRATED_KEY, "1");
}
let seeding = false;

// ---- Språk (för uttal) ----
const LANG_OPTIONS = [
  { label: "Inget / ej språk", code: "" },
  { label: "Italienska", code: "it-IT" },
  { label: "Tyska", code: "de-DE" },
  { label: "Franska", code: "fr-FR" },
  { label: "Spanska", code: "es-ES" },
  { label: "Engelska", code: "en-GB" },
  { label: "Portugisiska", code: "pt-PT" },
  { label: "Ukrainska", code: "uk-UA" },
  { label: "Indonesiska", code: "id-ID" },
];
const LANG_GUESS = {
  italienska: "it-IT", tyska: "de-DE", franska: "fr-FR",
  spanska: "es-ES", engelska: "en-GB", portugisiska: "pt-PT", ukrainska: "uk-UA",
  indonesiska: "id-ID", "bahasa indonesia": "id-ID",
};
// Returnerar ämnets språkkod (explicit fält, annars gissning från namnet)
function subjectLang(s) {
  if (!s) return "";
  return s.lang || LANG_GUESS[(s.name || "").trim().toLowerCase()] || "";
}
// Flagga-emoji per språk (tomt om inget språk)
const LANG_FLAG = {
  "sv": "🇸🇪", "sv-SE": "🇸🇪",
  "it-IT": "🇮🇹", "de-DE": "🇩🇪", "fr-FR": "🇫🇷", "es-ES": "🇪🇸",
  "en-GB": "🇬🇧", "pt-PT": "🇵🇹", "uk-UA": "🇺🇦", "id-ID": "🇮🇩",
  // Franska varianter → franska flaggan (annars ger t.ex. fr-CA 🇨🇦 via regionkoden)
  "fr-CA": "🇫🇷", "fr-BE": "🇫🇷", "fr-CH": "🇫🇷",
};
// Flagga från språkkodens regiondel (t.ex. "ru-RU" → 🇷🇺) via regional indicator-
// symboler, så alla språk med en landskod får flagga – inte bara en handplockad lista.
function flagForLang(code) {
  if (!code) return "";
  if (LANG_FLAG[code]) return LANG_FLAG[code]; // ev. handplockad som säker override
  const region = String(code).split("-").slice(1).find((p) => /^[A-Za-z]{2}$/.test(p));
  if (!region) return "";
  const R = region.toUpperCase();
  return String.fromCodePoint(...[...R].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}
function subjectFlag(s) {
  return flagForLang(subjectLang(s));
}

// --- Genus i AI-prompten -------------------------------------------------
// Många språk har substantivgenus, och en glosa blir mer användbar om genus syns
// på den utländska sidan. Hur genus visas skiljer sig åt:
//   "article" – bestämd artikel avslöjar genus (romanska, tyska, nederländska, grekiska)
//   "marker"  – genus finns men ingen artikel visar det → be modellen ange m/f/n
// Språk utan grammatiskt genus (engelska, finska, turkiska, japanska, kinesiska,
// koreanska, indonesiska …) saknas medvetet → inget tillägg. Basdelen av koden
// (före "-") används som nyckel, så både "de" och "de-DE" träffar.
const GENDER_STRATEGY = {
  // Genus syns på bestämd artikel
  de: "article", nl: "article",                       // der/die/das · de/het
  fr: "article", it: "article", es: "article",        // le/la · il/lo/la · el/la
  pt: "article", ca: "article", gl: "article",        // o/a · el/la · o/a
  el: "article",                                       // ο/η/το
  // Genus finns men ingen (framförställd) artikel visar det → be om explicit markering
  ru: "marker", uk: "marker", be: "marker",
  pl: "marker", cs: "marker", sk: "marker",
  bg: "marker", mk: "marker", sr: "marker", hr: "marker", bs: "marker", sl: "marker",
  lt: "marker", lv: "marker",
  ro: "marker", is: "marker",
  hi: "marker", bn: "marker", pa: "marker", mr: "marker",
  ar: "marker", he: "marker",
};
// För "marker"-språk med en förutsägbar genusregel: be modellen markera BARA
// undantagen i stället för varje ord (renare + förstärker regeln pedagogiskt).
// "Avviker från regeln" självkorrigerar snyggt: ett ryskt -ь-ord som är feminint
// avviker från "konsonant = maskulinum" → markeras; ett maskulint -ь-ord matchar
// → markeras inte. Bara språk vars regel är trygg att formulera på en rad tas med;
// övriga marker-språk (cs, sk, sydslaviska, baltiska, semitiska …) markerar allt.
const GENDER_RULE = {
  ru: "genus följer normalt ändelsen (-а/-я = femininum, konsonant = maskulinum, -о/-е = neutrum)",
  uk: "genus följer normalt ändelsen (-а/-я = femininum, konsonant = maskulinum, -о/-е = neutrum)",
  pl: "genus följer normalt ändelsen (-a = femininum, konsonant = maskulinum, -o/-e/-ę = neutrum)",
};
function genderPromptNote(code) {
  const base = String(code || "").split("-")[0].toLowerCase();
  const strat = GENDER_STRATEGY[base];
  if (strat === "article")
    return " För substantiv: ta med bestämd artikel så genus framgår, men håll den svenska sidan i obestämd form.";
  if (strat === "marker") {
    const rule = GENDER_RULE[base];
    if (rule)
      return ` För substantiv: ${rule}. Ange genus (m/f/n) i parentes ENDAST när ordet avviker från regeln. Håll den svenska sidan neutral.`;
    return " För substantiv: ange genus (m/f/n) i parentes efter ordet, men håll den svenska sidan neutral.";
  }
  return "";
}

// Svenskt språknamn för en BCP-47-kod (t.ex. "it-IT" → "Italienska") via Intl.
function langLabel(code) {
  if (!code) return "Inget / ej språk";
  const base = String(code).split("-")[0].toLowerCase();
  try {
    const n = new Intl.DisplayNames(["sv"], { type: "language" }).of(base);
    if (n && n.toLowerCase() !== base) return n.charAt(0).toUpperCase() + n.slice(1);
  } catch (_) {}
  return code;
}

// Språkalternativ för väljaren: alla språk enheten faktiskt kan uttala (Web Speech-
// röster), deduppade per språk, svenska namn, alfabetiskt, "Inget / ej språk" överst.
function langOptionsForPicker(selected) {
  const byBase = new Map(); // 'it' -> 'it-IT'
  const voices = ("speechSynthesis" in window) ? (speechSynthesis.getVoices() || []) : [];
  voices.forEach((v) => {
    if (!v.lang) return;
    const code = v.lang.replace("_", "-");
    const base = code.slice(0, 2).toLowerCase();
    if (base && !byBase.has(base)) byBase.set(base, code);
  });
  // Fallback om rösterna inte hunnit laddas än: kuraterad grundlista
  if (!byBase.size) LANG_OPTIONS.forEach((o) => { if (o.code) byBase.set(o.code.slice(0, 2).toLowerCase(), o.code); });
  // Behåll nuvarande val exakt (så koden inte tyst ändras när man sparar)
  if (selected) byBase.set(selected.slice(0, 2).toLowerCase(), selected);
  const items = [...byBase.values()].map((code) => {
    const flag = flagForLang(code);
    return { value: code, label: (flag ? flag + " " : "") + langLabel(code), sortKey: langLabel(code) };
  });
  items.sort((a, b) => a.sortKey.localeCompare(b.sortKey, "sv"));
  return [{ value: "", label: "Inget / ej språk" }, ...items];
}

// =========================================================================
//  SRS-lager (localStorage) – graderad Leitner
// =========================================================================
const SRS_KEY = "flashcards-srs-v1";
let srs = JSON.parse(localStorage.getItem(SRS_KEY) || "{}");

// Lådintervall i dagar (låda 1..7). Box 0 = ny (förfaller direkt). Låda 7 (64 dagar,
// A5) lyfter taket så mogna ord inte trängs ihop på 32 dagar och dominerar "Dags att öva".
const BOX_INTERVALS = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16, 6: 32, 7: 64 };
const MAX_BOX = 7;
const DAY_MS = 24 * 60 * 60 * 1000;
// Snäpp en tidsstämpel till lokal midnatt (00:00 i enhetens tidszon). Används för
// förfallodatum så att "förfallna idag" blir tillgängliga från morgonen, inte vid
// klockslaget man råkade plugga.
function startOfLocalDay(ts) { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); }

function saveSRS() {
  localStorage.setItem(SRS_KEY, JSON.stringify(srs));
}

// SRS nycklas på ORDET (utländskt + svenska), inte på kort-ID:t. Då delar samma ord
// sin inlärning mellan lektioner. Olika översättning = olika nyckel, så homonymer
// (t.ex. "tra/fra" = om / mellan) hålls isär eftersom baksidan skiljer sig.
function normPart(s) {
  return (s || "").trim().toLowerCase().replace(/\s+/g, " ");
}
function srsKey(card, dir) {
  return `${normPart(card.front)}|${normPart(card.back)}|${dir}`;
}

function getEntry(card, dir) {
  const k = srsKey(card, dir);
  if (!srs[k]) srs[k] = { box: 0, due: 0, lastSeen: 0 };
  return srs[k];
}

// "Dags att öva" = introducerade ord (låda ≥ 1) vars datum passerat.
// Nya, aldrig tränade ord (låda 0) räknas inte – dem lär man in i lektionen.
function isDue(card, dir, now) {
  const e = getEntry(card, dir);
  return e.box >= 1 && e.due <= now;
}

// Förfallen att öva NU givet vald riktning. Räkning av "dags att öva" och själva
// passet måste använda SAMMA riktningslogik – annars kan taggen visa t.ex. 10
// (förfallna i b2f) medan ett f2b-pass inte hittar något ("ur synk").
function isDueNow(card, dirMode, now) {
  if (dirMode === "mixed") return isDue(card, "f2b", now) || isDue(card, "b2f", now);
  return isDue(card, dirMode, now);
}

// grade: "fail" | "good" | "easy" | "hard"
function gradeCard(card, dir, grade) {
  const wasNew = isNewCard(card); // mät INNAN mutation: nytt kort = båda lådor i 0
  const e = getEntry(card, dir);
  const now = Date.now();
  if (grade === "fail" || grade === "hard") {
    e.box = 1;
    e.due = now; // dyker upp igen idag
  } else if (grade === "easy" && (e.box || 0) === 0) {
    // A1 "kunde direkt": ett HELT nytt ord (låda 0) som svaras 👆 kan väldigt bra kan
    // man ju redan → hoppa direkt till låda 4 (8 dagar) i stället för låda 2, så man
    // slipper tröska banala ord genom systemet. Får ändå en kontrollrepetition.
    e.box = 4;
    e.due = startOfLocalDay(now + BOX_INTERVALS[e.box] * DAY_MS);
  } else {
    // kan = +1 låda, kan väldigt bra = +2. Nytt ord + "kan" → låda 1 = tidigast imorgon.
    const step = grade === "easy" ? 2 : 1;
    e.box = Math.min(MAX_BOX, (e.box || 0) + step);
    e.due = startOfLocalDay(now + BOX_INTERVALS[e.box] * DAY_MS); // förfaller vid lokal midnatt
  }
  e.lastSeen = now;
  saveSRS();
  if (wasNew) markFirstStudied(card); // stämpla första studietillfället (en gång per kort)
}

// Ett kort är "nytt" (aldrig tränat) när BÅDA riktningarna ligger i låda 0.
function isNewCard(c) {
  return getEntry(c, "f2b").box === 0 && getEntry(c, "b2f").box === 0;
}

// "Första gången studerat"-datum per kort: sätts EN gång, när ett nytt kort (låda 0)
// graderas första gången. Riktningsoberoende nyckel → räknas en gång per kort. Driver
// statistiken "nya ord" per period. Kort som redan var inlärda när spårningen infördes
// stämplas aldrig (de var inte nya då) och räknas därför inte som nya.
const FIRST_STUDIED_KEY = "flippa-firststudied-v1";
function loadFirstStudied() {
  try { return JSON.parse(localStorage.getItem(FIRST_STUDIED_KEY) || "{}") || {}; } catch { return {}; }
}
function cardKeyOf(c) { return `${normPart(c.front)}|${normPart(c.back)}`; }
function markFirstStudied(card) {
  const k = cardKeyOf(card);
  const m = loadFirstStudied();
  if (!m[k]) { m[k] = todayStr(); localStorage.setItem(FIRST_STUDIED_KEY, JSON.stringify(m)); }
}

// =========================================================================
//  Flipp-mål: distinkta "ord + riktning" per dag (150) och per vecka (1000).
//  Enhet = cardKey|dir. Samma ord åt två håll = två enheter; samma håll upprepat
//  (t.ex. efter felsvar) = en. Räknas PER ÄMNE och per profil.
// =========================================================================
const UNITS_KEY = "flippa-units-v1";          // mängder per vecka: user → subject → datum → [cardKey|dir]
const UNITCOUNT_KEY = "flippa-unitcount-v1";  // långsiktigt: user → subject → datum → antal (för heatmap)
function loadLS(key) { try { return JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch { return {}; } }

// Prestationsnivåer – inställbara per profil. Default: 100/150/250 ord/dag + 1000/vecka.
// Allt (taggar, toaster, Klar-skärm, heatmapens guldprick) läser dessa live.
const LEVELS_KEY = "flippa-levels-v1";
const DEFAULT_DAY_TIERS = [100, 150, 250];
const DEFAULT_WEEK_GOAL = 1000;
function levels() {
  const o = loadLS(LEVELS_KEY)[unitUser()] || {};
  let days = Array.isArray(o.days) && o.days.length === 3 ? o.days.map((n) => parseInt(n, 10)) : null;
  if (!days || days.some((n) => !Number.isFinite(n) || n < 1)) days = DEFAULT_DAY_TIERS.slice();
  let week = parseInt(o.week, 10);
  if (!Number.isFinite(week) || week < 1) week = DEFAULT_WEEK_GOAL;
  return { days, week };
}
function dayTiers() { return levels().days; }
function dailyGoal() { return levels().days[0]; } // lägsta dagsnivån = "dagens mål"
function weeklyGoal() { return levels().week; }
// Emoji per dagsnivå (nivå 1/2/3). Både nivåinställningen och Klar-skärmen läser dessa.
const DAY_TIER_ICONS = ["💪", "⚡️", "🥇"];
// Ikonen för antal kort idag = högsta uppnådda dagsnivå (💪 → ⚡️ → 🥇).
function dayTierIcon(count) {
  const t = dayTiers();
  return count >= t[2] ? DAY_TIER_ICONS[2] : count >= t[1] ? DAY_TIER_ICONS[1] : DAY_TIER_ICONS[0];
}
function saveLevels(days, week) {
  const o = loadLS(LEVELS_KEY);
  o[unitUser()] = { days, week };
  localStorage.setItem(LEVELS_KEY, JSON.stringify(o));
}
function unitUser() { return currentUser || "guest"; }
function ymdLocal(d) { return d.toLocaleDateString("sv-SE"); }
// Datumsträngar mån–sön för veckan som innehåller idag
function currentWeekDates() {
  const t = new Date(); t.setHours(12, 0, 0, 0);
  const mon = new Date(t); mon.setDate(t.getDate() - ((t.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); return ymdLocal(d); });
}

// Registrera en flipp. Returnerar { dayCount, weekCount, crossedDay, crossedWeek }.
function recordUnitFlip(card, dir) {
  const sid = currentSubject && currentSubject.id;
  if (!sid) return null;
  const user = unitUser();
  const today = todayStr();
  const unit = `${cardKeyOf(card)}|${dir}`;

  // Veckomängder (rensas till innevarande vecka)
  const units = loadLS(UNITS_KEY);
  const us = ((units[user] || (units[user] = {}))[sid] || (units[user][sid] = {}));
  const week = currentWeekDates(), weekSet = new Set(week);
  Object.keys(us).forEach((d) => { if (!weekSet.has(d)) delete us[d]; });
  const dayArr = us[today] || (us[today] = []);
  const isNew = !dayArr.includes(unit);
  if (isNew) dayArr.push(unit);
  const distinctWeek = new Set(); week.forEach((d) => (us[d] || []).forEach((k) => distinctWeek.add(k)));
  localStorage.setItem(UNITS_KEY, JSON.stringify(units));

  const dayCount = dayArr.length, weekCount = distinctWeek.size;

  // Långsiktig dagssiffra (för heatmap), rensad ~140 dagar
  const counts = loadLS(UNITCOUNT_KEY);
  const cs = ((counts[user] || (counts[user] = {}))[sid] || (counts[user][sid] = {}));
  cs[today] = dayCount;
  const cutoff = ymdLocal((() => { const d = new Date(); d.setDate(d.getDate() - 140); return d; })());
  Object.keys(cs).forEach((d) => { if (d < cutoff) delete cs[d]; });
  localStorage.setItem(UNITCOUNT_KEY, JSON.stringify(counts));

  recordAchv(user, sid, dayCount, weekCount); // livstidshistorik för prestationer

  // dagströskel som passerades just nu (100/150/250) – för firande-toast
  const dayCrossed = isNew && dayTiers().includes(dayCount) ? dayCount : 0;
  return { dayCount, weekCount, dayCrossed, crossedWeek: isNew && weekCount === weeklyGoal() };
}

// Läs dagens + veckans distinkta för ett ämne (read-only, för Klar-skärmen)
function getUnitProgress(sid) {
  const us = ((loadLS(UNITS_KEY)[unitUser()] || {})[sid]) || {};
  const dayCount = (us[todayStr()] || []).length;
  const wk = new Set(); currentWeekDates().forEach((d) => (us[d] || []).forEach((k) => wk.add(k)));
  return { dayCount, weekCount: wk.size };
}

// Unika kort (distinkta ord+riktning per dag, summerat) inom en period & scope –
// samma mått som dagsmålet räknar mot. cutoff "" = allt. Källa: unitcount (~140 dgr).
const KORT_MODE_KEY = "flippa-kort-mode"; // "kort" (svep/repetitioner) | "unika"
function uniqueUnitsInPeriod(subjects, cutoff) {
  const cu = loadLS(UNITCOUNT_KEY)[unitUser()] || {};
  let n = 0;
  subjects.forEach((s) => {
    const cs = cu[s.id] || {};
    Object.keys(cs).forEach((d) => { if (!cutoff || d >= cutoff) n += cs[d]; });
  });
  return n;
}

// =========================================================================
//  Prestationer (livstid): antal dagar med 100+/150+/250+ ord, veckor med 1000+
// =========================================================================
// Livstidshistorik som INTE rensas (unitcount rensas ~140 dagar). user → subject →
// { d:{datum:maxdagssiffra}, w:{ISO-vecka:maxveckosiffra} }. Skrivs vid varje flipp.
const ACHV_KEY = "flippa-achv-v1";
const ACHV_BACKFILL_KEY = "flippa-achv-backfilled-v1";

// ISO-veckonyckel "ÅÅÅÅ-Www" (måndagsstart, torsdagen avgör år/vecka)
function isoWeekKey(date) {
  const dt = new Date(date); dt.setHours(12, 0, 0, 0);
  dt.setDate(dt.getDate() - ((dt.getDay() + 6) % 7) + 3); // torsdagen i veckan
  const firstThu = new Date(dt.getFullYear(), 0, 4);
  firstThu.setDate(firstThu.getDate() - ((firstThu.getDay() + 6) % 7) + 3);
  const week = 1 + Math.round((dt - firstThu) / (7 * 86400000));
  return `${dt.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

function achvSlot(achv, user, sid) {
  const a = ((achv[user] || (achv[user] = {}))[sid] || (achv[user][sid] = { d: {}, w: {} }));
  if (!a.d) a.d = {}; if (!a.w) a.w = {};
  return a;
}

// Uppdatera livstidshistoriken (max per dag/vecka) – anropas i recordUnitFlip
function recordAchv(user, sid, dayCount, weekCount) {
  const achv = loadLS(ACHV_KEY);
  const a = achvSlot(achv, user, sid);
  const today = todayStr();
  a.d[today] = Math.max(a.d[today] || 0, dayCount);
  const wk = isoWeekKey(new Date());
  a.w[wk] = Math.max(a.w[wk] || 0, weekCount);
  localStorage.setItem(ACHV_KEY, JSON.stringify(achv));
}

// Engångs: så in befintliga dagssiffror (unitcount, ~140 dagar) i livstidshistoriken
// så att räknarna inte börjar på noll. Veckor kan inte återskapas exakt → börjar tomt.
function backfillAchvOnce() {
  if (localStorage.getItem(ACHV_BACKFILL_KEY)) return;
  const counts = loadLS(UNITCOUNT_KEY);
  const achv = loadLS(ACHV_KEY);
  Object.keys(counts).forEach((user) => Object.keys(counts[user]).forEach((sid) => {
    const a = achvSlot(achv, user, sid), cs = counts[user][sid];
    Object.keys(cs).forEach((d) => { a.d[d] = Math.max(a.d[d] || 0, cs[d]); });
  }));
  localStorage.setItem(ACHV_KEY, JSON.stringify(achv));
  localStorage.setItem(ACHV_BACKFILL_KEY, "1");
}

// Räkna prestationer för en scope (summerar per-ämnessiffror per dag/vecka)
function getAchievements(subjects) {
  const achv = loadLS(ACHV_KEY)[unitUser()] || {};
  const perDay = {}, perWeek = {};
  subjects.forEach((s) => {
    const a = achv[s.id] || {}, ad = a.d || {}, aw = a.w || {};
    Object.keys(ad).forEach((d) => { perDay[d] = (perDay[d] || 0) + ad[d]; });
    Object.keys(aw).forEach((w) => { perWeek[w] = (perWeek[w] || 0) + aw[w]; });
  });
  const dayVals = Object.values(perDay), weekVals = Object.values(perWeek);
  return {
    days: dayTiers().map((t) => dayVals.filter((v) => v >= t).length),
    weeks: weekVals.filter((v) => v >= weeklyGoal()).length,
  };
}

// Popup: ställ in nivåtrösklarna (per profil). Räknarna är livstidshistorik så de
// räknas bara om mot de nya trösklarna – ingen data går förlorad.
function openLevelsModal() {
  const lv = levels();
  const icos = DAY_TIER_ICONS;
  const dayRows = [0, 1, 2].map((i) =>
    `<label class="lvl-row"><span>${icos[i]} Nivå ${i + 1}</span><input type="number" inputmode="numeric" min="1" id="lvl-d${i}" value="${lv.days[i]}" autocomplete="off" /></label>`).join("");
  const m = openModal(`
    <h3>Ändra nivåer</h3>
    <p class="modal-hint">Antal kort som krävs för varje nivå. (Övar du samma kort åt samma håll flera gånger räknas det bara som ett.)</p>
    <div class="lvl-sec">PER DAG</div>
    ${dayRows}
    <div class="lvl-sec">PER VECKA</div>
    <label class="lvl-row"><span>🏆 Vecka</span><input type="number" inputmode="numeric" min="1" id="lvl-w" value="${lv.week}" autocomplete="off" /></label>
    <p class="lvl-reset-wrap"><button type="button" class="link-action" id="lvl-reset">Återställ till standard (${DEFAULT_DAY_TIERS.join("/")} · ${DEFAULT_WEEK_GOAL})</button></p>
    <div class="modal-actions">
      <button class="btn-secondary" id="lvl-cancel">Avbryt</button>
      <button class="btn-primary" id="lvl-save">Spara</button>
    </div>`);
  m.querySelector("#lvl-reset").onclick = () => {
    [0, 1, 2].forEach((i) => { m.querySelector(`#lvl-d${i}`).value = DEFAULT_DAY_TIERS[i]; });
    m.querySelector("#lvl-w").value = DEFAULT_WEEK_GOAL;
  };
  m.querySelector("#lvl-cancel").onclick = closeModal;
  m.querySelector("#lvl-save").onclick = () => {
    const d = [0, 1, 2].map((i) => parseInt(m.querySelector(`#lvl-d${i}`).value, 10));
    const w = parseInt(m.querySelector("#lvl-w").value, 10);
    if (d.some((n) => !Number.isFinite(n) || n < 1) || !Number.isFinite(w) || w < 1) {
      toast("Fyll i positiva heltal på alla nivåer", 3500); return;
    }
    if (!(d[0] < d[1] && d[1] < d[2])) { toast("Dagsnivåerna måste öka: nivå 1 < 2 < 3", 4000); return; }
    saveLevels(d, w);
    closeModal();
    renderStats(); // uppdatera trösklar + räknare direkt
  };
}

// =========================================================================
//  Favoriter (stjärnord) & pausade lektioner – personligt per profil
// =========================================================================
// Favoriter nycklas per ORD (cardKeyOf) så en stjärna följer ordet mellan lektioner.
// Paus lagras per lektions-id. Båda per profil, precis som SRS.
const FAV_KEY = "flippa-fav-v1";        // profil → [ordnyckel]
const PAUSED_KEY = "flippa-paused-v1";  // profil → [lektions-id]

function favList() { return loadLS(FAV_KEY)[unitUser()] || []; }
function isFavKey(key) { return favList().includes(key); }
function isFav(card) { return card ? isFavKey(cardKeyOf(card)) : false; }
function setFavKey(key, on) {
  const o = loadLS(FAV_KEY), u = unitUser();
  const set = new Set(o[u] || []);
  on ? set.add(key) : set.delete(key);
  o[u] = [...set];
  localStorage.setItem(FAV_KEY, JSON.stringify(o));
}
function toggleFav(card) { const on = !isFav(card); setFavKey(cardKeyOf(card), on); return on; }

function pausedList() { return loadLS(PAUSED_KEY)[unitUser()] || []; }
function isLessonPaused(lid) { return pausedList().includes(lid); }
function setLessonPaused(lid, on) {
  const o = loadLS(PAUSED_KEY), u = unitUser();
  const set = new Set(o[u] || []);
  on ? set.add(lid) : set.delete(lid);
  o[u] = [...set];
  localStorage.setItem(PAUSED_KEY, JSON.stringify(o));
}
function toggleLessonPause(lid) { const on = !isLessonPaused(lid); setLessonPaused(lid, on); return on; }
// Lektioner som "Dags att öva" får dra ifrån (pausade exkluderas helt ur autopasset)
function activeLessons(subject) { return subject ? subject.lessons.filter((l) => !isLessonPaused(l.id)) : []; }

// =========================================================================
//  Daglig introduktion av nya ord (max 10/dag per ämne, proportionellt)
// =========================================================================
// "Dags att öva" tar in nya ord (låda 0) men släpper in högst 10 nya per dag
// och ämne, slumpat proportionellt över lektionerna. Uppsättningen väljs en
// gång per dag och persisteras (hård gräns – ingen påfyllning samma dag).
const NEW_INTRO_KEY = "flippa-newintro-v1";
const NEW_PER_DAY_KEY = "flippa-new-per-day";
// Antal nya kort per dag (inställbart, default 10). 0 = pausa nya ord. Eftersom dagens
// uppsättning väljs en gång och låses, slår en ändring igenom först nästa dag.
function newPerDay() {
  const n = parseInt(localStorage.getItem(NEW_PER_DAY_KEY), 10);
  return Number.isFinite(n) ? n : 10;
}

function todayStr() {
  return new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD i lokal tid
}

// ---- Prio per kort ----
// prio = relativ centralitet inom kortets tema: 1 = kärna, 2 = vanlig, 3 = nisch.
// Saknat/ogiltigt fält tolkas som 2 vid läsning men skrivs aldrig till Firebase –
// oklassat innehåll beter sig då exakt som före prio-funktionen (allt lika).
function cardPrio(c) { return c.prio === 1 || c.prio === 3 ? c.prio : 2; }
// Priofilter: personligt + per ämne (profil → ämnes-id → [nivåer]). Frånvarande = alla.
const PRIO_FILTER_KEY = "flippa-priofilter-v1";
function prioFilterFor(subjectId) {
  try {
    const arr = (JSON.parse(localStorage.getItem(PRIO_FILTER_KEY) || "{}")[unitUser()] || {})[subjectId];
    return Array.isArray(arr) && arr.length && arr.length < 3 ? arr : null; // null = alla nivåer
  } catch { return null; }
}
function setPrioFilter(subjectId, levels) {
  let all; try { all = JSON.parse(localStorage.getItem(PRIO_FILTER_KEY) || "{}"); } catch { all = {}; }
  const u = unitUser();
  all[u] = all[u] || {};
  if (!levels || levels.length >= 3) delete all[u][subjectId]; // alla valda = frånvarande (= alla)
  else all[u][subjectId] = levels.slice().sort();
  localStorage.setItem(PRIO_FILTER_KEY, JSON.stringify(all));
}
// Behörighet: kortets prio (frånvarande = 2) ∈ valda nivåer. Frånvarande filter = alla.
function prioAllowed(c, sid) {
  const id = sid || (currentSubject && currentSubject.id);
  if (!id) return true;
  const f = prioFilterFor(id);
  return !f || f.includes(cardPrio(c));
}
// Introduktionsvikter per prio: 15/4/1 → 75/20/5 när alla band har nya ord.
const PRIO_WEIGHTS = { 1: 15, 2: 4, 3: 1 };

// Viktat urval av n kort ur en pool enligt prio-banden (15/4/1, största-rest,
// spill i prio-ordning) – samma fördelningsprincip som todaysNewCards men utan
// lektionsdimensionen. Utan prio-data (allt band 2) = som förut.
// keepOrder: behåll poolens ordning inom banden (t.ex. mest-förfallet-först)
// i stället för att slumpa – då blir urvalet "viktat mellan band, äldst inom band".
function pickWeightedByPrio(cards, n, keepOrder) {
  if (n >= cards.length) return [...cards];
  const bands = [1, 2, 3];
  const buckets = bands.map((p) => {
    const b = cards.filter((c) => cardPrio(c) === p);
    return keepOrder ? b : shuffleInPlace(b);
  });
  const weights = bands.map((p, i) => (buckets[i].length ? PRIO_WEIGHTS[p] : 0));
  const wSum = weights.reduce((a, b) => a + b, 0);
  const ideal = weights.map((w) => (wSum ? (n * w) / wSum : 0));
  const take = ideal.map((v, i) => Math.min(buckets[i].length, Math.floor(v)));
  let rest = n - take.reduce((a, b) => a + b, 0);
  ideal
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac)
    .forEach(({ i }) => { if (rest > 0 && take[i] < buckets[i].length) { take[i]++; rest--; } });
  bands.forEach((_, i) => { while (rest > 0 && take[i] < buckets[i].length) { take[i]++; rest--; } });
  return buckets.flatMap((b, i) => b.slice(0, take[i]));
}

// Hamilton/största-rest: fördela `total` platser proportionellt mot bucket-storlekar.
function allocProportional(counts, total) {
  const sum = counts.reduce((a, b) => a + b, 0);
  if (sum <= total) return counts.slice(); // alla ryms
  const ideal = counts.map((n) => (total * n) / sum);
  const base = ideal.map(Math.floor);
  let rest = total - base.reduce((a, b) => a + b, 0);
  // dela ut återstoden till största bråkdelarna
  const order = ideal
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < order.length && rest > 0; k++, rest--) base[order[k].i]++;
  return base;
}

// Returnerar dagens valda nya kort (objekt) för ett ämne som FORTFARANDE är låda 0.
// Väljer (och persisterar) uppsättningen första gången den efterfrågas en ny dag.
function todaysNewCards(subject) {
  if (!subject) return [];
  let ledger;
  try { ledger = JSON.parse(localStorage.getItem(NEW_INTRO_KEY) || "{}"); } catch { ledger = {}; }
  const today = todayStr();
  const lessons = activeLessons(subject); // pausade lektioner bidrar inte med nya ord
  let entry = ledger[subject.id];
  if (!entry || entry.date !== today) {
    // Dagens nya ord väljs i två steg: (1) kvoten fördelas över prio-banden med
    // vikterna 15/4/1 (→ 75/20/5 när alla band har nya ord; underskott spiller
    // till nästa band, kärna först), (2) varje bands andel fördelas
    // proportionellt över lektionerna som tidigare. Utan prio-data hamnar allt
    // i band 2 → identiskt beteende med före prio-funktionen.
    const newByLesson = lessons.map((l) => l.cards.filter((c) => isNewCard(c) && prioAllowed(c, subject.id)));
    const totalNew = newByLesson.reduce((a, b) => a + b.length, 0);
    const quota = Math.min(newPerDay(), totalNew);
    const bands = [1, 2, 3];
    const bandBuckets = bands.map((p) => newByLesson.map((cs) => cs.filter((c) => cardPrio(c) === p)));
    const bandAvail = bandBuckets.map((buckets) => buckets.reduce((a, b) => a + b.length, 0));
    // Viktad fördelning över banden (största-rest), med tak = tillgängligt antal
    const weights = bands.map((p, bi) => (bandAvail[bi] > 0 ? PRIO_WEIGHTS[p] : 0));
    const wSum = weights.reduce((a, b) => a + b, 0);
    const ideal = weights.map((w) => (wSum ? (quota * w) / wSum : 0));
    const bandTake = ideal.map((v, bi) => Math.min(bandAvail[bi], Math.floor(v)));
    let rest = quota - bandTake.reduce((a, b) => a + b, 0);
    ideal
      .map((v, bi) => ({ bi, frac: v - Math.floor(v) }))
      .sort((a, b) => b.frac - a.frac)
      .forEach(({ bi }) => { if (rest > 0 && bandTake[bi] < bandAvail[bi]) { bandTake[bi]++; rest--; } });
    bands.forEach((_, bi) => { // spill: fyll ur banden i prio-ordning om rest kvarstår
      while (rest > 0 && bandTake[bi] < bandAvail[bi]) { bandTake[bi]++; rest--; }
    });
    const ids = [];
    bands.forEach((_, bi) => {
      const alloc = allocProportional(bandBuckets[bi].map((b) => b.length), bandTake[bi]);
      bandBuckets[bi].forEach((cards, i) => {
        const shuffled = cards
          .map((c) => ({ c, r: Math.random() }))
          .sort((a, b) => a.r - b.r)
          .map((x) => x.c);
        shuffled.slice(0, alloc[i]).forEach((c) => ids.push(c.id));
      });
    });
    entry = { date: today, ids };
    ledger[subject.id] = entry;
    localStorage.setItem(NEW_INTRO_KEY, JSON.stringify(ledger));
  }
  const idSet = new Set(entry.ids);
  const out = [];
  lessons.forEach((l) => // bara aktiva lektioner – pausade ord faller bort även om de valdes tidigare idag
    l.cards.forEach((c) => {
      if (idSet.has(c.id) && isNewCard(c) && prioAllowed(c, subject.id)) out.push(c); // ej graderat + inom filtret (skärpning slår direkt)
    })
  );
  return out;
}

// Loosening (bocka i en nivå mitt på dagen): fyll på dagens nyords-set med nyss
// tillåtna nivåers nya ord UPP TILL dagskvoten. Redan valda rörs ej (ingen churn),
// och vi spränger inte "N nya/dag". Idempotent. Skärpning behöver inget – filtret
// döljer live i todaysNewCards ovan. Mogna/förfallna ord räknas alltid live.
function topUpTodaysNew(subject) {
  if (!subject) return;
  let ledger; try { ledger = JSON.parse(localStorage.getItem(NEW_INTRO_KEY) || "{}"); } catch { ledger = {}; }
  const entry = ledger[subject.id];
  if (!entry || entry.date !== todayStr()) { todaysNewCards(subject); return; } // inget för idag än → normal beräkning
  const room = newPerDay() - entry.ids.length;
  if (room <= 0) return; // dagskvoten redan fylld
  const have = new Set(entry.ids);
  const eligible = [];
  activeLessons(subject).forEach((l) => l.cards.forEach((c) => {
    if (isNewCard(c) && prioAllowed(c, subject.id) && !have.has(c.id)) eligible.push(c);
  }));
  if (!eligible.length) return;
  const add = pickWeightedByPrio(eligible, Math.min(room, eligible.length)); // kärnord först
  if (!add.length) return;
  entry.ids = entry.ids.concat(add.map((c) => c.id));
  ledger[subject.id] = entry;
  localStorage.setItem(NEW_INTRO_KEY, JSON.stringify(ledger));
}

// Migrera gammal statistik (nycklad på kort-ID "cardId:dir") till ordnyckeln.
// Idempotent: kör säkert flera ggr; behåller starkaste posten vid krock.
const SRS_MIGRATED_KEY = "flippa-srs-keyed-by-word";
function migrateSrsKeys(contentArr) {
  let changed = false;
  contentArr.forEach((s) =>
    s.lessons.forEach((l) =>
      l.cards.forEach((c) => {
        ["f2b", "b2f"].forEach((dir) => {
          const old = srs[`${c.id}:${dir}`];
          if (!old || !(old.box > 0 || old.due > 0)) return;
          const k = srsKey(c, dir);
          const cur = srs[k];
          if (!cur || (old.box || 0) > (cur.box || 0)) {
            srs[k] = { box: old.box || 0, due: old.due || 0, lastSeen: old.lastSeen || 0 };
            changed = true;
          }
        });
      })
    )
  );
  if (changed) saveSRS();
}

// =========================================================================
//  Datalager – Firebase + localStorage-cache
// =========================================================================
// (CACHE_KEY deklareras högre upp, före loadCachedContent()-anropet vid boot)

function loadCachedContent() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } catch {
    return [];
  }
}

function cacheContent(c) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(c));
}

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

function normalize(subjectsObj) {
  return Object.entries(subjectsObj || {})
    .map(([id, s]) => ({
      id,
      name: s.name,
      order: s.order ?? 0,
      lang: s.lang || null,
      owner: s.owner || null,
      lessons: Object.entries(s.lessons || {})
        .map(([lid, l]) => ({
          id: lid,
          name: l.name,
          order: l.order ?? 0,
          cards: Object.entries(l.cards || {})
            .map(([cid, c]) => ({
              id: cid, front: c.front, back: c.back, hint: c.hint ?? null,
              prio: c.prio === 1 || c.prio === 2 || c.prio === 3 ? c.prio : null,
              order: c.order ?? 0,
            }))
            .sort(byOrder),
        }))
        .sort(byOrder),
    }))
    .sort(byOrder);
}

function showStatus(msg) {
  if (!msg) {
    statusBanner.classList.add("hidden");
    return;
  }
  statusBanner.textContent = msg;
  statusBanner.classList.remove("hidden");
}

function boot() {
  backfillAchvOnce(); // så in befintlig dagshistorik i prestationsräknarna en gång
  // Visa cachat innehåll direkt (funkar offline)
  if (content.length) renderSubjects();
  else showStatus("Ansluter …");

  auth.signInAnonymously().catch((err) => {
    console.error(err);
    if (content.length) {
      showStatus("Offline – visar sparat innehåll");
    } else {
      showStatus("Kunde inte ansluta: " + (err.code || err.message));
    }
  });

  auth.onAuthStateChanged((user) => {
    if (!user) return;
    listenContent();
  });
}

function listenContent() {
  db.ref("content/subjects").on(
    "value",
    (snap) => {
      const val = snap.val();
      if (!val) {
        seedIfEmpty();
        return;
      }
      content = normalize(val);
      if (!localStorage.getItem(SRS_MIGRATED_KEY)) {
        migrateSrsKeys(content);
        localStorage.setItem(SRS_MIGRATED_KEY, "1");
      }
      migrateOwners(); // sätt ägare på äldre områden en gång (skrivs till Firebase)
      cacheContent(content);
      showStatus(null);
      renderCurrentScreen();
      if (pendingPushOpen) { pendingPushOpen = false; openLastSubjectFromPush(); }
    },
    (err) => {
      console.error(err);
      showStatus("Läsfel: " + (err.code || err.message));
    }
  );
}

function seedIfEmpty() {
  if (seeding) return;
  seeding = true;
  showStatus("Lägger in startinnehåll …");
  const ts = firebase.database.ServerValue.TIMESTAMP;
  const subjRef = db.ref("content/subjects").push();
  const lessRef = subjRef.child("lessons").push();
  const cardsObj = {};
  SEED.cards.forEach((c, i) => {
    cardsObj[`c${i}`] = { front: c.front, back: c.back, order: i, createdAt: ts };
  });
  subjRef
    .set({
      name: SEED.subject,
      order: 0,
      createdAt: ts,
      lessons: {
        [lessRef.key]: { name: SEED.lesson, order: 0, createdAt: ts, cards: cardsObj },
      },
    })
    .catch((err) => {
      console.error(err);
      showStatus("Kunde inte seeda: " + (err.code || err.message));
      seeding = false;
    });
}

// =========================================================================
//  Navigation / rendering
// =========================================================================
// Skärm-djup styr glidriktningen: djupare = push (in från höger), grundare = pop.
const SCREEN_DEPTH = { subjects: 0, lessons: 1, editor: 2, training: 2, congrats: 3, settings: 1 };
const NAV_DUR = 220;
const NAV_EASE = "cubic-bezier(.4,0,.2,1)";
const prefersReducedMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
let shownScreen = "subjects";
let navCleanup = null; // avslutar pågående övergång

function setOnlyScreen(screenName) {
  Object.entries(screens).forEach(([name, el]) => el.classList.toggle("hidden", name !== screenName));
}

function show(screenName) {
  const from = shownScreen;
  // Lämnar man Klar-skärmen (Grymt!/Fortsätt) avbryts röstlyssning och ångra-möjligheten.
  if (from === "congrats" && screenName !== "congrats") { stopCongratsListen(); lastSession = null; }
  if (navCleanup) navCleanup(); // snabbspola ev. pågående glid innan nästa
  const fromEl = screens[from];
  // Ingen animation: samma skärm, okänd ursprungsskärm, reducerad rörelse, eller
  // att ursprunget inte var synligt (t.ex. allra första renderingen).
  if (screenName === from || !fromEl || prefersReducedMotion || fromEl.classList.contains("hidden")) {
    setOnlyScreen(screenName);
    shownScreen = screenName;
    updateTabbar();
    return;
  }
  const dir = (SCREEN_DEPTH[screenName] ?? 0) >= (SCREEN_DEPTH[from] ?? 0) ? 1 : -1;
  const inEl = screens[screenName], outEl = fromEl;
  inEl.classList.remove("hidden");
  inEl.classList.add("nav-anim");
  outEl.classList.add("nav-anim");
  inEl.style.zIndex = "2"; outEl.style.zIndex = "1"; // inkommande ovanpå
  inEl.style.transition = "none";
  outEl.style.transition = "none";
  inEl.style.transform = `translateX(${dir > 0 ? 100 : -100}%)`;
  inEl.style.opacity = "1";
  outEl.style.transform = "none";
  outEl.style.opacity = "1";
  void inEl.offsetWidth; // tvinga startläge
  inEl.style.transition = `transform ${NAV_DUR}ms ${NAV_EASE}`;
  // Gamla skärmen glider undan OCH fejdar ut, så inget gammalt skräp ligger kvar och stör.
  outEl.style.transition = `transform ${NAV_DUR}ms ${NAV_EASE}, opacity ${NAV_DUR}ms ease-out`;
  inEl.style.transform = "none";
  outEl.style.transform = `translateX(${dir > 0 ? -22 : 22}%)`;
  outEl.style.opacity = "0";
  shownScreen = screenName;
  updateTabbar();

  const cleanup = () => {
    navCleanup = null;
    [inEl, outEl].forEach((el) => {
      el.classList.remove("nav-anim");
      el.style.transition = ""; el.style.transform = ""; el.style.zIndex = ""; el.style.opacity = "";
    });
    setOnlyScreen(screenName);
  };
  navCleanup = cleanup;
  setTimeout(() => { if (navCleanup === cleanup) cleanup(); }, NAV_DUR + 40);
}

let activeScreen = "subjects";

// ---- Bottenflikar (Flippa / Statistik) ----
let activeTab = "flippa";
let statsScope = null; // ämnes-id eller "all"

function setTab(tab) {
  activeTab = tab;
  closeChoosers(); // stäng ev. öppen väljare vid flikbyte
  $("screens").classList.toggle("hidden", tab !== "flippa");
  $("stats-screen").classList.toggle("hidden", tab !== "stats");
  $("help-screen").classList.toggle("hidden", tab !== "help");
  if (tab === "stats") {
    // Default: ämnet man har aktivt i Flippa-fliken, annars Alla ämnen
    statsScope = currentSubject ? currentSubject.id : "all";
    renderStats();
  }
  updateTabbar();
}

function updateTabbar() {
  document.querySelectorAll("#tabbar .tab-btn").forEach((b) => b.classList.toggle("on", b.dataset.tab === activeTab));
  // Dölj flikfältet under pågående pass / klar-skärm i Flippa-fliken
  const hide = activeTab === "flippa" && (shownScreen === "training" || shownScreen === "congrats");
  $("tabbar").classList.toggle("hidden", hide);
  // Flikfältet är fixed → reservera dess höjd på innehållet bara när det syns
  document.body.classList.toggle("tabbar-on", !hide);
  if (!hide) {
    const h = $("tabbar").offsetHeight; // tvingar reflow → korrekt höjd (inkl. env-padding)
    if (h) document.documentElement.style.setProperty("--tabbar-h", h + "px");
  }
}

// iOS rapporterar safe-area-insetet först EFTER cold launch (när hemindikatorn dyker
// upp), vilket annars får layouten att hoppa. Latcha största sedda värdet i --sab så
// att det bara växer (krymper aldrig vid resume) → ingen återkommande glidning.
function latchSafeArea() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;left:0;bottom:0;width:0;height:env(safe-area-inset-bottom);visibility:hidden;pointer-events:none;";
  document.body.appendChild(probe);
  const v = probe.getBoundingClientRect().height;
  probe.remove();
  const cur = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sab")) || 0;
  // Klampa: hemindikatorns inset är ~34px; tillåt lite marginal men låt aldrig ett
  // tillfälligt uppblåst värde fastna och ge för mycket luft i nederkant.
  const capped = Math.min(v, 36);
  if (capped > 0 && capped > cur) document.documentElement.style.setProperty("--sab", capped + "px");
}
latchSafeArea();
["resize", "orientationchange", "pageshow"].forEach((ev) =>
  window.addEventListener(ev, () => { latchSafeArea(); updateTabbar(); }));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") { latchSafeArea(); updateTabbar(); }
});

function renderCurrentScreen() {
  if (activeScreen === "subjects") renderSubjects();
  else if (activeScreen === "lessons") renderLessons();
  else if (activeScreen === "editor") renderEditor();
  else if (activeScreen === "settings") renderSettingsScreen();
}

function renderSubjects() {
  if (rowDrag && rowDrag.active) return; // rita inte om mitt i en drag-omordning
  activeScreen = "subjects";
  show("subjects");
  const list = $("subjects-list");
  clearListShadow(list);
  // Avataren (→ inställningar) speglar vald användare; ＋ och avatar döljs tills man valt
  const av = $("profile-btn");
  av.classList.toggle("hidden", !currentUser);
  av.textContent = currentUser ? userName(currentUser).charAt(0) : "";
  av.style.background = currentUser ? profileColor(currentUser) : "";
  $("add-subject").classList.toggle("hidden", !currentUser);

  // Ingen profil vald (t.ex. ny enhet) → välkomst-/väljarvy
  if (!currentUser) {
    list.innerHTML = welcomeHTML();
    list.querySelectorAll("[data-profile]").forEach((el) =>
      el.addEventListener("click", () => selectProfile(el.dataset.profile)));
    return;
  }
  // Bara den valda användarens områden
  const mine = content.filter((s) => s.owner === currentUser);
  if (!mine.length) {
    list.innerHTML = `<p class="empty">Inga ämnen för ${esc(userName(currentUser))} än. Tryck ＋ för att skapa ett.</p>`;
    return;
  }
  list.innerHTML = mine
    .map((s) => {
      const cardCount = s.lessons.reduce((n, l) => n + l.cards.length, 0);
      const flag = subjectFlag(s);
      return `<div class="row" data-subject="${s.id}">
        <span class="row-title">${flag ? flag + " " : ""}${esc(s.name)}</span>
        <span class="row-meta">${s.lessons.length} lekt · ${cardCount} ord</span>
      </div>`;
    })
    .join("");
  // Ingen penna här – namn/språk/ägare redigeras inne i området (✎ uppe på lektionsskärmen).
  list.querySelectorAll(".row").forEach((row) => {
    row.addEventListener("click", () => {
      if (suppressSubjectClick) return; // precis avslutat en drag-omordning
      openSubject(row.dataset.subject);
    });
    row.addEventListener("pointerdown", (e) => onRowPointerDown(e, row, list, subjectDragCfg));
  });
  maybeReloadForUpdate(); // säker plats → applicera ev. väntande app-uppdatering
}

// Profilväljaren: tryck → välj användare (enkel lista, lätt att utöka)
// Profilfärg för avatar/väljare (matchar mockupen). Fallback = accent.
const PROFILE_COLORS = { tom: "#5b8cff", hedvig: "#ff3d8f", wille: "#5bbf72", guest: "#9aa3b2" };
function profileColor(id) { return PROFILE_COLORS[id] || "var(--accent)"; }

// Väljer en profil (med lösenordslås vid byte till annan låst profil). true = bytt.
async function selectProfile(id) {
  const u = USERS.find((x) => x.id === id);
  if (!u) return false;
  if (u.lock && id !== currentUser) {
    const pw = await askPassword(`Lösenord för ${u.name}`);
    if (pw == null) return false;           // avbröt
    if (pw.trim() !== u.lock) { toast("Fel lösenord", 2500); return false; }
  }
  setUser(id);
  return true;
}

// Väljarlista (actionSheet) – används av "Byt användare" i inställningarna.
async function pickUser() {
  const choice = await actionSheet("Vem är du?", USERS.map((u) => ({ label: u.name + (u.lock ? " 🔒" : ""), value: u.id })));
  if (choice) await selectProfile(choice);
}

// Välkomst-/väljarvy vid first launch (ingen profil vald).
function welcomeHTML() {
  const cards = USERS.map((u) =>
    `<button class="welcome-card" data-profile="${u.id}" type="button">
       <span class="wc-av" style="background:${profileColor(u.id)}">${esc(u.name.charAt(0))}</span>
       <span class="wc-name">${esc(u.name)}</span>
       ${u.lock ? `<span class="wc-lock">${IC_LOCK}</span>` : ""}
     </button>`).join("");
  return `<div class="welcome">
      <div class="welcome-hero"><div class="welcome-logo">🃏</div>
        <h2>Välkommen till Flippa</h2><p>Vem är du?</p></div>
      <div class="welcome-list">${cards}</div>
    </div>`;
}

// ---- Inställningsskärm (nås via avataren på ämnesskärmen) ----
function renderSettingsScreen() {
  const body = $("settings-body");
  body.innerHTML = `
    <div class="set-sec">Profil</div>
    <div class="set-card set-prof">
      <span class="set-av" style="background:${profileColor(currentUser)}">${esc(userName(currentUser).charAt(0))}</span>
      <span class="set-prof-name">${esc(userName(currentUser))}</span>
      <button class="set-switch-btn" id="set-switch" type="button">Byt</button>
    </div>
    ${notifSettingsHTML()}
    <div class="set-sec">Träning</div>
    <div class="set-card">
      <button class="set-row" id="set-levels" type="button">
        <span class="set-body"><span class="set-t">Mål & nivåer</span><span class="set-d">Kort/dag och veckomål</span></span>
        <span class="set-chev">›</span></button>
    </div>
    <div class="set-sec">Data</div>
    <div class="set-card">
      <button class="set-row" id="set-backup" type="button">
        <span class="set-body"><span class="set-t">Säkerhetskopiera</span><span class="set-d">Exportera / importera statistik</span></span>
        <span class="set-chev">›</span></button>
    </div>
    <div class="set-sec">Om</div>
    <div class="set-card">
      <button class="set-row" id="set-changelog" type="button">
        <span class="set-body"><span class="set-t">Vad är nytt</span><span class="set-d">Flippa ${APP_VERSION}${latestChangelogDate() ? " · senast " + latestChangelogDate() : ""}</span></span>
        <span class="set-chev">›</span></button>
    </div>`;
  $("set-switch").onclick = pickUser;
  const scl = $("set-changelog");
  if (scl) scl.onclick = openChangelog;
  $("set-levels").onclick = openLevelsModal;
  $("set-backup").onclick = openBackup;
  const pt = $("push-toggle");
  if (pt) pt.onclick = () => { const l = pushLocal(); if (l.enabled) disablePush(); else enablePush(l.time || "08:00"); };
  const ptime = $("push-time");
  if (ptime) ptime.onchange = () => setPushTime(ptime.value);
  const ptest = $("push-test");
  if (ptest) ptest.onclick = testPush;
}
function openSettings() {
  if (!currentUser) return;
  activeScreen = "settings";
  renderSettingsScreen();
  show("settings");
  track("oppna-installningar");
}
// Backup av statistik (flyttad hit från gamla ⋯-menyn)
async function openBackup() {
  const a = await actionSheet("Backup av statistik", [
    { label: "⬆︎ Exportera statistik", value: "export" },
    { label: "⬇︎ Importera statistik", value: "import" },
  ]);
  if (a === "export") openExport();
  else if (a === "import") openImport();
}

// =========================================================================
//  Push-notiser (daglig påminnelse) – beta. VAPID-publik nyckel; privat + DB-secret
//  ligger som GitHub-secrets och används av scripts/send-push.js (GitHub Actions).
// =========================================================================
const VAPID_PUBLIC = "BLOmvL_k3k4gnRqJ0bZ3-sBMJDZimWQrKLmDmq32p8fqQaL2dVWE1_NCPVLQCFzPC-sibyUlfwN8_R9jteHeBJs";
const PUSH_LOCAL_KEY = "flippa-push-local";     // { enabled, time } – lokal spegel för UI
const DEVICE_KEY = "flippa-device-id";          // slump-id per enhet (nyckel i /push)
const LAST_SUBJECT_KEY = "flippa-last-subject"; // för deep-link vid notis-tryck
let pendingPushOpen = false;                    // sätts vid kallstart via #pushopen

function deviceId() {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) { id = "d" + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(DEVICE_KEY, id); }
  return id;
}
function pushSupported() { return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window; }
function isStandalone() { return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true; }
function pushLocal() { try { return JSON.parse(localStorage.getItem(PUSH_LOCAL_KEY) || "{}"); } catch { return {}; } }
function setPushLocal(o) { localStorage.setItem(PUSH_LOCAL_KEY, JSON.stringify(o)); }
function localToday() { return new Date().toLocaleDateString("sv-SE"); } // YYYY-MM-DD
// lastSent-startvärde: har vald tid redan passerat idag → sätt idag (undvik direkt-knuff);
// ligger tiden framåt → null så den fyras idag vid rätt tid.
function lastSentInit(time) {
  const d = new Date(), nowMin = d.getHours() * 60 + d.getMinutes();
  const [th, tm] = String(time || "08:00").split(":").map(Number);
  return nowMin >= (th * 60 + tm) ? localToday() : null;
}
function urlB64ToUint8(b64) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const s = (b64 + pad).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(s), arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function enablePush(time) {
  time = time || "08:00";
  if (!pushSupported()) { toast("Notiser stöds inte i den här webbläsaren", 3500); return; }
  if (!isStandalone()) { toast("Lägg till Flippa på hemskärmen först – notiser kräver den installerade appen", 4500); return; }
  let perm;
  try { perm = await Notification.requestPermission(); } catch (_) { perm = Notification.permission; }
  if (perm !== "granted") {
    toast(perm === "denied" ? "Notiser är blockerade – slå på i telefonens inställningar" : "Du nekade notiser", 4000);
    renderSettingsScreen(); return;
  }
  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8(VAPID_PUBLIC) });
    await db.ref("push/" + deviceId()).set({
      subscription: JSON.parse(JSON.stringify(sub)),
      time, enabled: true, lastSent: lastSentInit(time),
      user: currentUser || null, ua: (navigator.userAgent || "").slice(0, 120),
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
    setPushLocal({ enabled: true, time });
    track("push-pa");
  } catch (e) { console.error(e); toast("Kunde inte slå på notiser", 3500); }
  renderSettingsScreen();
}
async function disablePush() {
  try { const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager.getSubscription(); if (sub) await sub.unsubscribe(); } catch (_) {}
  try { await db.ref("push/" + deviceId()).remove(); } catch (_) {}
  setPushLocal({ enabled: false, time: pushLocal().time || "08:00" });
  track("push-av");
  renderSettingsScreen();
}
async function setPushTime(time) {
  setPushLocal({ enabled: true, time });
  try { await db.ref("push/" + deviceId()).update({ time, lastSent: lastSentInit(time) }); } catch (_) {}
}
async function testPush() {
  try {
    const reg = await navigator.serviceWorker.ready;
    await reg.showNotification("Dags att flippa!", { body: "Kör ett pass direkt", icon: "./icon-192.png", badge: "./icon-192.png", tag: "flippa-test" });
  } catch (_) { toast("Kunde inte visa testnotis", 3000); }
}
// Notis-tryck → hoppa in i senast valda ämne (annars huvudskärmen).
function openLastSubjectFromPush() {
  if (!currentUser) { renderSubjects(); return; }
  const id = localStorage.getItem(LAST_SUBJECT_KEY);
  const s = id && content.find((x) => x.id === id && x.owner === currentUser);
  if (s) openSubject(id); else renderSubjects();
}

// Notis-sektionen i inställningarna – olika states beroende på miljö/behörighet.
function notifSettingsHTML() {
  const beta = `<span class="beta-badge">beta</span>`;
  const head = `<div class="set-sec">Påminnelser ${beta}</div>`;
  if (!pushSupported() || !isStandalone()) {
    return head + `<div class="set-note">📲 Lägg till Flippa på hemskärmen först – dagliga påminnelser funkar bara i den installerade appen (särskilt på iPhone).</div>`;
  }
  if (Notification.permission === "denied") {
    return head + `<div class="set-card"><div class="set-row static">
      <span class="set-body"><span class="set-t">Daglig påminnelse</span><span class="set-d bad">Notiser är blockerade för Flippa</span></span>
      <span class="sw dis"></span></div></div>
      <div class="set-note">Slå på igen i telefonens Inställningar → Flippa → Notiser.</div>`;
  }
  const local = pushLocal();
  const on = Notification.permission === "granted" && !!local.enabled;
  const time = local.time || "08:00";
  let rows = `<div class="set-row" id="push-toggle-row">
      <span class="set-body"><span class="set-t">Daglig påminnelse</span>${on ? "" : `<span class="set-d">Slå på för en daglig pushnotis</span>`}</span>
      <span class="sw ${on ? "on" : ""}" id="push-toggle"></span></div>`;
  if (on) {
    rows += `<div class="set-row static">
      <span class="set-body"><span class="set-t">Påminn mig</span><span class="set-d">Kommer inom en kvart efter vald tid</span></span>
      <input type="time" id="push-time" class="set-time" value="${time}"></div>`;
    rows += `<button class="set-row" id="push-test" type="button">
      <span class="set-body"><span class="set-t">Testa notisen</span><span class="set-d">Visa en direkt på den här enheten</span></span>
      <span class="set-chev">›</span></button>`;
  }
  return head + `<div class="set-card">${rows}</div>`;
}

// ---- Versionshistorik ("Vad är nytt") – höjdpunkter (C) + hela listan under fler-knapp (A) ----
function changelogLog() { return (typeof CHANGELOG !== "undefined" && Array.isArray(CHANGELOG)) ? CHANGELOG : []; }
// Slå ihop poster med samma datum (max en per dag). Loggen är nyast först → första
// förekomsten av ett datum bär senaste versionen den dagen; övriga items läggs under.
function mergedByDay(log) {
  const out = [], idx = {};
  log.forEach((e) => {
    if (idx[e.date] == null) { idx[e.date] = out.length; out.push({ date: e.date, ver: e.ver, items: e.items.slice() }); }
    else out[idx[e.date]].items.push(...e.items);
  });
  return out;
}
// Håll ihop dag+månad (hårt mellanslag), men låt året få radbryta: "4 juli 2026" → "4 juli 2026".
function nbspDate(d) { return String(d).replace(" ", " "); }
// Datum för senaste FRAMHÄVDA posten (visas på ingångsraderna).
function latestChangelogDate() {
  const e = changelogLog().find((x) => x.items.some((i) => i.hi));
  return e ? e.date : "";
}
function renderChangelog() {
  const merged = mergedByDay(changelogLog());
  const hi = [];
  merged.forEach((e) => e.items.forEach((i) => { if (i.hi) hi.push({ ...i, when: e.date }); }));
  const cards = hi.slice(0, 6).map((i) =>
    `<div class="c-card"><div class="c-ico">${i.ico || "✨"}</div>
      <div><div class="c-title">${esc(i.t.split(" – ")[0])}<span class="c-when">${esc(nbspDate(i.when))}</span></div>
      <div class="c-desc">${esc(i.desc || i.t)}</div></div></div>`).join("");
  const full = merged.map((e) =>
    `<div class="a-entry"><div class="a-head"><span class="a-date">${esc(nbspDate(e.date))}</span><span class="a-ver">${esc(e.ver)}</span></div>
      <ul class="a-bullets">${e.items.map((i) => `<li>${esc(i.t)}</li>`).join("")}</ul></div>`).join("");
  $("clog-body").innerHTML =
    `<div class="c-intro">De senaste större nyheterna i Flippa.</div>${cards}
     <button class="clog-more" id="clog-more" type="button">Visa hela versionshistoriken</button>
     <div class="clog-full hidden" id="clog-full">${full}</div>`;
  $("clog-more").onclick = () => {
    const f = $("clog-full"); f.classList.toggle("hidden");
    const open = !f.classList.contains("hidden");
    $("clog-more").textContent = open ? "Dölj versionshistoriken" : "Visa hela versionshistoriken";
    // Listan fälls ut nedanför det synliga → scrolla fram den så det syns att nåt hände.
    if (open) requestAnimationFrame(() => $("clog-more").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" }));
  };
}
function openChangelog() {
  renderChangelog();
  const el = $("changelog-screen");
  el.classList.remove("hidden");
  if (prefersReducedMotion) { el.classList.add("open"); }
  else { void el.offsetWidth; el.classList.add("open"); } // reflow → transition triggar (glid in från höger)
  track("oppna-changelog");
}
function closeChangelog() {
  const el = $("changelog-screen");
  if (prefersReducedMotion) { el.classList.remove("open"); el.classList.add("hidden"); return; }
  el.classList.remove("open"); // glid ut åt höger
  let done = false;
  const finish = () => { if (done) return; done = true; el.classList.add("hidden"); el.removeEventListener("transitionend", finish); };
  el.addEventListener("transitionend", finish);
  setTimeout(finish, 300); // fallback om transitionend uteblir
}

function openSubject(id) {
  currentSubject = content.find((s) => s.id === id);
  localStorage.setItem(LAST_SUBJECT_KEY, id); // för deep-link vid notis-tryck
  $("lessons-search").value = "";
  $("lessons-toolbar").classList.add("hidden");        // söket börjar hopfällt
  $("lessons-search-btn").classList.remove("active");
  renderLessons();
}

function dueCountForLessons(lessons, starredOnly) {
  const now = Date.now();
  const dirMode = dirSelect.value; // räkna i vald riktning (matchar vad passet ger)
  // Dagens nya ord (låda 0) räknas också – men de väljs per ämne, så vi
  // begränsar setet till de lektioner vi räknar på.
  const newSet = new Set(todaysNewCards(currentSubject).map((c) => c.id));
  let n = 0;
  lessons.forEach((l) =>
    l.cards.forEach((c) => {
      if ((isDueNow(c, dirMode, now) || newSet.has(c.id)) && (!starredOnly || isFav(c)) && prioAllowed(c)) n++;
    })
  );
  return n;
}

function renderLessons(keepChoosers) {
  if (!currentSubject) return renderSubjects();
  stopHandsfree();
  if (!keepChoosers) closeChoosers(); // priofilter-toggle uppdaterar listan men håller väljaren öppen
  syncOptionPills();
  if (rowDrag && rowDrag.active) return; // rita inte om mitt i en drag-omordning
  // Plocka färsk referens (innehåll kan ha uppdaterats från Firebase)
  currentSubject = content.find((s) => s.id === currentSubject.id) || currentSubject;
  activeScreen = "lessons";
  show("lessons");
  $("lessons-title").textContent = (subjectFlag(currentSubject) ? subjectFlag(currentSubject) + " " : "") + currentSubject.name;

  const dueBtn = $("due-btn");
  const focus = onlyStarred();
  const due = dueCountForLessons(activeLessons(currentSubject), focus); // matchar passet: pausade (och ev. ostjärnade) räknas inte
  if (due > 0) {
    dueBtn.textContent = focus ? `⭐ Stjärnord att öva (${due})` : `⏰ Dags att öva (${due})`;
    dueBtn.classList.remove("hidden");
    dueBtn.onclick = () => startDueSession(); // ej (event) → continuing=false → runSeen nollställs (ny runda)
  } else {
    dueBtn.classList.add("hidden");
  }
  // Tom-not: filter aktivt + inget behörigt just nu + det FINNS ord på urbockade nivåer
  const pf = prioFilterFor(currentSubject.id);
  const prioActive = !!pf;
  const hasExcluded = prioActive && activeLessons(currentSubject).some((l) => l.cards.some((c) => !prioAllowed(c)));
  $("prio-empty-note").classList.toggle("hidden", !(due === 0 && hasExcluded));

  const list = $("lessons-list");
  clearListShadow(list);
  const filter = ($("lessons-search").value || "").trim().toLowerCase();
  if (!currentSubject.lessons.length) {
    list.innerHTML = `<p class="empty">Inga lektioner än. Tryck ＋ för att skapa en.</p>`;
    return;
  }
  const lessonsToShow = filter
    ? currentSubject.lessons.filter((l) =>
        l.cards.some((c) =>
          c.front.toLowerCase().includes(filter) || c.back.toLowerCase().includes(filter)
        )
      )
    : currentSubject.lessons;
  if (!lessonsToShow.length) {
    const raw = ($("lessons-search").value || "").trim();
    const canLookUp = !!subjectLang(currentSubject); // uppslag kräver att ämnet har ett språk
    list.innerHTML = `<p class="empty">Inga lektioner matchar "${esc(raw)}".</p>`
      + (canLookUp ? `<p class="empty"><button type="button" class="link-action" id="lookup-add">${IC_LOOKUP} Slå upp &amp; lägg till</button></p>` : "");
    if (canLookUp) $("lookup-add").onclick = () => openAddDialog({ segment: "lookup", prefill: raw, pickLesson: true });
    return;
  }
  // Behärskning per lektion: andel ord i låda ≥ 4 ("inlärt"), på väg = låda 1–3, ny = låda 0.
  // Riktningen följer den valda dir-selecten (blandat = svagaste av de två riktningarna),
  // samma logik som Leitner-stapeln på statistikfliken. Icke-muterande läsning ur srs.
  const dirMode = $("dir-select").value;
  const boxOf = (c) => {
    const fb = (srs[srsKey(c, "f2b")] || {}).box || 0;
    const bb = (srs[srsKey(c, "b2f")] || {}).box || 0;
    return dirMode === "f2b" ? fb : dirMode === "b2f" ? bb : Math.min(fb, bb);
  };
  list.innerHTML = lessonsToShow
    .map((l) => {
      const paused = isLessonPaused(l.id);
      const d = dueCountForLessons([l]);
      const dueTag = d > 0 ? `<span class="due-tag">⏰ ${d}</span>` : "";
      const pauseIco = paused ? ` <span class="lesson-paused-ico" title="Pausad" aria-label="Pausad">${IC_PAUSE}</span>` : "";
      // Behärskning mäts mot valda prio-nivåer (filtret). Utan aktivt filter = alla ord.
      const scope = l.cards.filter((c) => prioAllowed(c));
      const total = scope.length;
      let learned = 0, learning = 0;
      scope.forEach((c) => { const bx = boxOf(c); if (bx >= 4) learned++; else if (bx >= 1) learning++; });
      const pct = total ? Math.round((learned / total) * 100) : 0;
      const lw = total ? (learned / total) * 100 : 0;
      const gw = total ? (learning / total) * 100 : 0;
      // Filter aktivt: "212 ord (320)" = 212 på valda nivåer av 320 totalt i lektionen.
      const cntLabel = prioActive ? `${total} ord (${l.cards.length})` : `${total} ord`;
      return `<div class="row lesson-row${paused ? " paused" : ""}" data-lesson="${l.id}">
        <div class="row-l1">
          <span class="row-title"><span class="row-name">${esc(l.name)}</span>${pauseIco}</span>
          <span class="row-r">${dueTag}<button class="row-edit" data-edit="${l.id}" title="Öppna lektionen för att ändra">›</button></span>
        </div>
        <div class="row-l2">
          <span class="mbar"><i class="m-learned" style="width:${lw}%"></i><i class="m-learning" style="width:${gw}%"></i></span>
          <span class="m-pct">${pct}%</span>
          <span class="m-cnt">${cntLabel}</span>
        </div>
      </div>`;
    })
    .join("");
  list.querySelectorAll(".row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest(".row-edit")) return;
      if (suppressLessonClick) return; // precis avslutat en drag-omordning
      startLessonSession(row.dataset.lesson); // pausad lektion går fortfarande att öva manuellt
    });
    row.addEventListener("pointerdown", (e) => onRowPointerDown(e, row, list, lessonDragCfg));
  });
  list.querySelectorAll(".row-edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditor(btn.dataset.edit);
    });
  });
  maybeReloadForUpdate(); // säker plats → applicera ev. väntande app-uppdatering
}

// ---- Drag & drop-omordning av rader (långtryck) – lektioner och ämnen ----
// Generisk motor: raderna som ligger i listEl dras om; en liten cfg avgör
// vilka id:n som omordnas, hur ordningen sparas och vilken klick-spärr som sätts.
let rowDrag = null;
let suppressLessonClick = false;
let suppressSubjectClick = false;

function onRowPointerDown(e, row, listEl, cfg) {
  if (e.target.closest(".row-edit")) return;
  if (e.button != null && e.button > 0) return;
  const state = { row, listEl, cfg, pointerId: e.pointerId, startY: e.clientY, active: false };
  rowDrag = state;
  state.moveHandler = (ev) => onRowPointerMove(ev, state);
  state.upHandler = (ev) => onRowPointerUp(ev, state);
  window.addEventListener("pointermove", state.moveHandler, { passive: false });
  window.addEventListener("pointerup", state.upHandler);
  window.addEventListener("pointercancel", state.upHandler);
  state.holdTimer = setTimeout(() => beginRowDrag(state), 420);
}

function cleanupRowDrag(state) {
  clearTimeout(state.holdTimer);
  window.removeEventListener("pointermove", state.moveHandler);
  window.removeEventListener("pointerup", state.upHandler);
  window.removeEventListener("pointercancel", state.upHandler);
  if (state.touchBlocker) document.removeEventListener("touchmove", state.touchBlocker);
  if (rowDrag === state) rowDrag = null;
}

function beginRowDrag(state) {
  const rows = [...state.listEl.querySelectorAll(".row")];
  state.rows = rows;
  state.rects = rows.map((r) => r.getBoundingClientRect());
  state.index = rows.indexOf(state.row);
  if (state.index < 0) { cleanupRowDrag(state); return; }
  state.gap = state.rects[0].height + 10;
  state.targetIndex = state.index;
  state.active = true;
  state.row.classList.add("dragging");
  try { state.row.setPointerCapture(state.pointerId); } catch (e) {}
  state.touchBlocker = (te) => te.preventDefault(); // stoppa sidans scroll under drag (iOS)
  document.addEventListener("touchmove", state.touchBlocker, { passive: false });
  if (navigator.vibrate) navigator.vibrate(12);
}

function onRowPointerMove(ev, state) {
  if (!state.active) {
    if (Math.abs(ev.clientY - state.startY) > 8) cleanupRowDrag(state); // rörde sig = scroll, avbryt
    return;
  }
  ev.preventDefault();
  const dy = ev.clientY - state.startY;
  state.row.style.transform = `translateY(${dy}px) scale(1.03)`;
  const draggedCenter = state.rects[state.index].top + state.rects[state.index].height / 2 + dy;
  let newIndex = 0;
  state.rects.forEach((r, i) => {
    if (i === state.index) return;
    if (r.top + r.height / 2 < draggedCenter) newIndex++;
  });
  state.targetIndex = newIndex;
  state.rows.forEach((r, i) => {
    if (i === state.index) return;
    let shift = 0;
    if (state.index < state.targetIndex && i > state.index && i <= state.targetIndex) shift = -state.gap;
    else if (state.index > state.targetIndex && i >= state.targetIndex && i < state.index) shift = state.gap;
    r.style.transform = shift ? `translateY(${shift}px)` : "";
  });
}

function onRowPointerUp(ev, state) {
  if (!state.active) { cleanupRowDrag(state); return; }
  const fromIndex = state.index;
  const toIndex = state.targetIndex;
  state.rows.forEach((r) => (r.style.transform = ""));
  state.row.classList.remove("dragging");
  state.active = false;
  cleanupRowDrag(state);
  state.cfg.setSuppress(true);
  setTimeout(() => state.cfg.setSuppress(false), 350);
  if (fromIndex !== toIndex) {
    const ids = state.cfg.getIds();
    const [moved] = ids.splice(fromIndex, 1);
    ids.splice(toIndex, 0, moved);
    state.cfg.persist(ids);
  }
}

const lessonDragCfg = {
  getIds: () => currentSubject.lessons.map((l) => l.id),
  persist: persistLessonOrder,
  setSuppress: (v) => { suppressLessonClick = v; },
};
const subjectDragCfg = {
  getIds: () => content.filter((s) => s.owner === currentUser).map((s) => s.id),
  persist: persistSubjectOrder,
  setSuppress: (v) => { suppressSubjectClick = v; },
};

function persistLessonOrder(orderedIds) {
  const subj = content.find((s) => s.id === currentSubject.id) || currentSubject;
  orderedIds.forEach((id, i) => {
    const les = subj.lessons.find((l) => l.id === id);
    if (les) les.order = i;
  });
  subj.lessons.sort(byOrder);
  currentSubject = subj;
  renderLessons(); // optimistisk omritning
  const updates = {};
  orderedIds.forEach((id, i) => (updates[`${id}/order`] = i));
  db.ref(`content/subjects/${subj.id}/lessons`).update(updates).catch(writeError);
}

function persistSubjectOrder(orderedIds) {
  orderedIds.forEach((id, i) => {
    const s = content.find((x) => x.id === id);
    if (s) s.order = i;
  });
  content.sort(byOrder);
  renderSubjects(); // optimistisk omritning
  const updates = {};
  orderedIds.forEach((id, i) => (updates[`${id}/order`] = i));
  db.ref("content/subjects").update(updates).catch(writeError);
}

// Back-knappar
document.querySelectorAll("[data-back]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.back;
    closeChoosers(); // stäng ev. öppen väljare när man backar
    if (activeScreen === "training") { commitSessionStats(); session = null; } // logga avbrutet pass
    if (target === "subjects") renderSubjects();
    else if (target === "lessons") renderLessons();
  });
});

// Svep höger för att gå tillbaka (lektion → ämne, ämne → huvudskärm). Ignorerar
// vertikala svep (scroll) och vänster-svep (radera-svep). Navigerar direkt och
// sväljer den efterföljande klicken så att radens klick (öppna/starta) inte triggas.
let swipeNavGuard = false;
document.addEventListener("click", (e) => {
  if (swipeNavGuard) { e.stopPropagation(); e.preventDefault(); }
}, true);
function enableBackSwipe(screenEl) {
  let sx = 0, sy = 0, tracking = false, decided = false, horiz = false;
  screenEl.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button > 0) return;
    sx = e.clientX; sy = e.clientY; tracking = true; decided = false; horiz = false;
  });
  screenEl.addEventListener("pointermove", (e) => {
    if (!tracking || decided) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    decided = true;
    horiz = dx > 0 && Math.abs(dx) > Math.abs(dy) * 1.3; // tydligt höger-svep
    if (!horiz) tracking = false; // vertikalt/vänster → lämna (scroll / radera-svep)
  });
  const end = (e) => {
    const ok = tracking && horiz && (e.clientX - sx) > 70;
    tracking = false;
    if (!ok) return;
    swipeNavGuard = true;                              // svälj efterföljande klick
    setTimeout(() => { swipeNavGuard = false; }, 400);
    const target = screenEl.querySelector(".back-btn") && screenEl.querySelector(".back-btn").dataset.back;
    closeChoosers();
    if (target === "subjects") renderSubjects();
    else if (target === "lessons") renderLessons();
  };
  screenEl.addEventListener("pointerup", end);
  screenEl.addEventListener("pointercancel", () => { tracking = false; });
}
enableBackSwipe($("lessons-screen"));  // ämne → huvudskärm
enableBackSwipe($("editor-screen"));   // lektion → ämne
enableBackSwipe($("settings-screen")); // inställningar → huvudskärm

$("congrats-done").addEventListener("click", () => renderLessons());

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// =========================================================================
//  Träning – sessionskö
// =========================================================================
const card = $("card");
const cardInner = card.querySelector(".card-inner");
const cardFront = $("card-front");
const cardFrontText = $("card-front-text");
const cardFrontHint = $("card-front-hint");
const cardAnswer = $("card-answer");
const cardHint = $("card-hint");
const dirSelect = $("dir-select");
const progressPill = $("progress-pill");
const feedbackEl = $("swipe-feedback");

let session = null; // { queue:[card], dirMode, current, shownDir }
let undoStack = [];  // shake-to-undo: snapshots av state före varje svar i sessionen
// Kort som redan visats i den pågående "Fortsätt"-kedjan (rundan). Nollställs vid ny
// runda (när man startar från knappen, inte via Fortsätt) så att fel-svarade ord inte
// kommer tillbaka förrän man tryckt Klar och börjar om.
let runSeen = new Set();

// ---- Antal kort per pass ----
const SESSION_LIMIT_KEY = "flashcards-session-limit";
const sessionLimitSel = $("session-limit");
sessionLimitSel.value = localStorage.getItem(SESSION_LIMIT_KEY) || "10"; // default på ny enhet: 10 kort/pass
sessionLimitSel.addEventListener("change", () => {
  localStorage.setItem(SESSION_LIMIT_KEY, sessionLimitSel.value);
});
function sessionLimit() {
  return parseInt(sessionLimitSel.value, 10) || 0; // 0 = alla
}

// ---- Fokuspass: bara stjärnmärkta ord (förfallna) i "Dags att öva" ----
const ONLY_STARRED_KEY = "flippa-only-starred";
function onlyStarred() { return localStorage.getItem(ONLY_STARRED_KEY) === "1"; }
const onlyStarredToggle = $("only-starred-toggle");
onlyStarredToggle.checked = onlyStarred();
onlyStarredToggle.addEventListener("change", () => {
  localStorage.setItem(ONLY_STARRED_KEY, onlyStarredToggle.checked ? "1" : "0");
  syncOptionPills();
  if (activeScreen === "lessons") renderLessons(); // uppdatera due-knappens antal/etikett
});

// ---- Riktning (kommer ihåg senaste valet) ----
const DIR_KEY = "flashcards-dir";
dirSelect.value = localStorage.getItem(DIR_KEY) || "b2f";
dirSelect.addEventListener("change", () => localStorage.setItem(DIR_KEY, dirSelect.value));

// ---- Alternativ-pills: riktning + kort per pass (lektionsskärmen) ----
const dirPill = $("dir-pill"), limitPill = $("limit-pill");
const dirChooser = $("dir-chooser"), limitChooser = $("limit-chooser");
function limitLabel(v) { return v === "0" ? "Alla" : v; }
function closeChoosers() {
  dirChooser.classList.remove("open");
  limitChooser.classList.remove("open");
  $("opt-backdrop").classList.remove("show");
}
function toggleChooser(which) {
  const open = which === "dir" ? dirChooser : limitChooser;
  const other = which === "dir" ? limitChooser : dirChooser;
  other.classList.remove("open");
  const willOpen = !open.classList.contains("open");
  open.classList.toggle("open", willOpen);
  $("opt-backdrop").classList.toggle("show", willOpen);
}
function syncOptionPills() {
  const dirOpt = dirSelect.options[dirSelect.selectedIndex];
  $("dir-val").textContent = dirOpt ? dirOpt.text : "Från svenska";
  const pf = currentSubject ? prioFilterFor(currentSubject.id) : null;
  const dots = pf ? ' <span class="limit-dots">' + [1, 2, 3].map((l) => `<i class="p${l}${pf.includes(l) ? "" : " off"}"></i>`).join("") + "</span>" : "";
  $("limit-val").innerHTML = esc(limitLabel(sessionLimitSel.value)) + (onlyStarred() ? " ⭐" : "") + dots;
  if (onlyStarredToggle.checked !== onlyStarred()) onlyStarredToggle.checked = onlyStarred();
  dirChooser.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.v === dirSelect.value));
  $("limit-segs").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.v === sessionLimitSel.value));
  const npd = String(newPerDay());
  $("newperday-segs").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.v === npd));
  const pfSet = pf || [1, 2, 3];
  $("prio-filter").querySelectorAll("button").forEach((b) => b.classList.toggle("on", pfSet.includes(Number(b.dataset.lvl))));
}
dirPill.onclick = () => toggleChooser("dir");
limitPill.onclick = () => toggleChooser("limit");
$("opt-backdrop").onclick = closeChoosers;
$("dir-segs").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  dirSelect.value = b.dataset.v;
  localStorage.setItem(DIR_KEY, dirSelect.value);
  syncOptionPills(); closeChoosers();
});
$("limit-segs").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  sessionLimitSel.value = b.dataset.v;
  sessionLimitSel.dispatchEvent(new Event("change")); // sparar SESSION_LIMIT_KEY
  syncOptionPills(); closeChoosers();
});
// Nya kort per dag – höjning slår igenom DIREKT (som prio-filtret): topUpTodaysNew
// fyller på dagens nyord upp till nya kvoten. Sänkning kan inte av-introducera redan
// visade ord → topUp gör inget då, så en sänkning gäller i praktiken från imorgon.
$("newperday-segs").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  localStorage.setItem(NEW_PER_DAY_KEY, b.dataset.v);
  if (currentSubject) topUpTodaysNew(currentSubject);
  track("newperday/" + b.dataset.v);
  syncOptionPills();
  if (activeScreen === "lessons") renderLessons(true); // uppdatera räknare, behåll väljaren öppen
});
// Priofilter – toggla nivå (minst en måste vara vald). Stäng inte väljaren.
$("prio-filter").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b || !currentSubject) return;
  const lvl = Number(b.dataset.lvl);
  const cur = prioFilterFor(currentSubject.id) || [1, 2, 3];
  const next = cur.includes(lvl) ? cur.filter((x) => x !== lvl) : cur.concat(lvl);
  if (!next.length) return; // minst en nivå
  setPrioFilter(currentSubject.id, next);
  topUpTodaysNew(currentSubject); // ibockning slår igenom direkt (nya ord upp till dagskvoten)
  track("priofilter/" + [1, 2, 3].filter((x) => next.includes(x)).join(""));
  syncOptionPills();
  if (activeScreen === "lessons") renderLessons(true); // uppdatera räknare + tom-not, behåll väljaren öppen
});
syncOptionPills();

function pickDir(dirMode) {
  if (dirMode === "f2b") return "f2b";
  if (dirMode === "b2f") return "b2f";
  return Math.random() < 0.5 ? "f2b" : "b2f";
}

// Fisher-Yates: blanda presentationsordningen i ett pass (efter att urvalet gjorts)
function shuffleInPlace(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function startLessonSession(lessonId, force = false, continuing = false) {
  const lesson = currentSubject.lessons.find((l) => l.id === lessonId);
  if (!lesson) return;
  if (!lesson.cards.length) {
    toast("Inga ord att öva på än. Gå in i lektionen med pilknappen för att börja lägga till innehåll", 4000);
    return;
  }
  if (!continuing) runSeen = new Set(); // ny runda
  const dirMode = dirSelect.value;
  // Bara ord som är aktiva idag: nya + de man svarat fel/hopplöst på (due <= nu).
  // Kan/kan-bra-ord har skjutits framåt och dyker inte upp igen samma dag.
  const now = Date.now();
  const activeToday = (c) =>
    dirMode === "f2b" ? getEntry(c, "f2b").due <= now
    : dirMode === "b2f" ? getEntry(c, "b2f").due <= now
    : (getEntry(c, "f2b").due <= now || getEntry(c, "b2f").due <= now);
  // Priofiltret gäller även manuell träning: vill man t.ex. bara nivå 1 av Sjöfart.
  const pool = (force ? [...lesson.cards] : lesson.cards.filter(activeToday)).filter((c) => !runSeen.has(c.id) && prioAllowed(c));
  if (!pool.length) {
    if (!lesson.cards.some((c) => prioAllowed(c))) {
      toast("Inga ord på valda prio-nivåer i den här lektionen – ändra i KORT/PASS", 4000);
      return;
    }
    const yes = await confirmPrimary(
      "Inget kvar att öva idag",
      `Du har redan lärt in alla ord (på valda prio-nivåer) i "${lesson.name}" idag. Köra igenom lektionen ändå?`,
      "Kör ändå!"
    );
    if (yes) startLessonSession(lessonId, true);
    return;
  }
  // Urval: svagast först (lägsta låda). I boxen där kort/pass-taket nås görs
  // urvalet prio-viktat (15/4/1) i stället för ren slump – så "10 ord" i en stor
  // olärd lektion blir mest kärnord, precis som i Dags att öva. Presentations-
  // ordningen blandas efteråt som förut.
  const minBox = (c) => Math.min(getEntry(c, "f2b").box || 0, getEntry(c, "b2f").box || 0);
  const lim = sessionLimit();
  let picked;
  if (lim && pool.length > lim) {
    const byBox = new Map();
    pool.forEach((c) => { const b = minBox(c); if (!byBox.has(b)) byBox.set(b, []); byBox.get(b).push(c); });
    picked = [];
    [...byBox.keys()].sort((a, b) => a - b).forEach((b) => {
      const room = lim - picked.length;
      if (room <= 0) return;
      const cards = byBox.get(b);
      picked.push(...(cards.length <= room ? cards : pickWeightedByPrio(cards, room)));
    });
  } else {
    picked = [...pool];
  }
  const queue = shuffleInPlace(picked);
  queue.forEach((c) => runSeen.add(c.id)); // markera som sedda i rundan
  const note = lim && pool.length > queue.length
    ? `Pass klart! 🎉 ${queue.length} av ${pool.length} ord – resten kommer nästa pass.`
    : "";
  if (!continuing) track("pass-lektion");
  beginSession({ queue, dirMode, label: lesson.name, note, kind: "lesson", lessonId, forced: force, continueLimit: (lim && pool.length > queue.length) ? lim : 0 });
}

function startDueSession(continuing = false) {
  if (!continuing) runSeen = new Set(); // ny runda
  const now = Date.now();
  const dirMode = dirSelect.value;
  const due = [];
  const inDue = new Set();
  activeLessons(currentSubject).forEach((l) => // hoppa över pausade lektioner
    l.cards.forEach((c) => {
      if (isDueNow(c, dirMode, now) && !runSeen.has(c.id) && prioAllowed(c)) {
        due.push(c); inDue.add(c.id);
      }
    })
  );
  // Lägg till dagens nya ord (låda 0, disjunkt från isDue-mängden).
  todaysNewCards(currentSubject).forEach((c) => {
    if (!inDue.has(c.id) && !runSeen.has(c.id)) { due.push(c); inDue.add(c.id); }
  });
  // Fokuspass: behåll bara stjärnmärkta ord (nya ord begränsas ändå av nyord-kvoten ovan)
  if (onlyStarred()) {
    for (let i = due.length - 1; i >= 0; i--) if (!isFav(due[i])) due.splice(i, 1);
  }
  if (!due.length) return;
  due.sort((a, b) => Math.min(getEntry(a, "f2b").due, getEntry(a, "b2f").due) -
    Math.min(getEntry(b, "f2b").due, getEntry(b, "b2f").due));
  const lim = sessionLimit();
  // Urval vid stor backlogg: prio-viktat mellan banden (15/4/1) så kärnord
  // repeteras först när allt inte hinns med – men mest-förfallet-först INOM
  // varje band (sorteringen ovan behålls av keepOrder). Nisch-bandets andel
  // gör att inga ord svälts helt. Presentationsordningen blandas som förut.
  const queue = shuffleInPlace(lim && due.length > lim ? pickWeightedByPrio(due, lim, true) : [...due]);
  queue.forEach((c) => runSeen.add(c.id)); // markera som sedda i rundan
  const note = lim && due.length > queue.length
    ? `Pass klart! 🎉 ${queue.length} av ${due.length} förfallna ord – resten kvar.`
    : "";
  if (!continuing) track("pass-dags");
  beginSession({ queue, dirMode, label: "Dags att öva", note, kind: "due", continueLimit: (lim && due.length > queue.length) ? lim : 0 });
}

// Ta bort fokus från textfält (och stäng tangentbordet) – så iOS inte har någon
// pågående "skrivning" att ångra, vilket annars triggar systemets "Skaka för att
// ångra"-ruta samtidigt som vår egen skak-ångra.
function blurActiveInput() {
  const el = document.activeElement;
  if (el && typeof el.blur === "function" && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) el.blur();
}

// =========================================================================
//  Träningsstatistik (localStorage) – grund för streak/kalender/volym senare
// =========================================================================
const STATS_KEY = "flippa-stats-v1";
const STATS_PERIOD_KEY = "flippa-stats-period"; // ihågkommet periodval i statistikvyn
function getStats() {
  try { const a = JSON.parse(localStorage.getItem(STATS_KEY) || "[]"); return Array.isArray(a) ? a : []; }
  catch { return []; }
}
// Idempotent upsert per pass (nyckel = startedAt) – kan kallas flera ggr (slut,
// utbackning, app göms) och uppdaterar samma post med senaste värden.
function commitSessionStats() {
  const s = session;
  if (!s || !s.startedAt) return;
  const reviews = s.reviewCount || 0;
  if (reviews < 1) return; // inget övat → logga inte
  const now = Date.now();
  const rec = {
    ts: s.startedAt,
    d: new Date(s.startedAt).toLocaleDateString("sv-SE"), // YYYY-MM-DD (lokal) för kalender/streak
    ms: Math.max(0, now - s.startedAt),
    reviews,                                  // antal svar (svep) i passet
    cards: s.cardSet ? s.cardSet.size : 0,    // unika kort som mötts
    kind: s.kind || null,                     // "lesson" | "due"
    subject: s.statsSubject || null,
    user: s.statsUser || null,
    dir: s.dirMode || null,
  };
  const arr = getStats();
  const i = arr.findIndex((r) => r.ts === s.startedAt);
  if (i >= 0) arr[i] = rec; else arr.push(rec);
  if (arr.length > 5000) arr.splice(0, arr.length - 5000); // backstopp mot obegränsad tillväxt
  localStorage.setItem(STATS_KEY, JSON.stringify(arr));
}
// Logga även om appen göms/stängs mitt i ett pass
window.addEventListener("pagehide", commitSessionStats);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") commitSessionStats(); });

// Statistik-fliken (streak + heatmap + Leitner). Scope = ett ämne eller "Alla ämnen".
const STATS_BARS_ICON = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="9"/></svg>`;

function renderStats() {
  const host = $("stats-screen");
  const mine = content.filter((s) => s.owner === currentUser);
  // Validera/sätt scope: default aktivt ämne, fall tillbaka på Alla ämnen
  if (statsScope == null) statsScope = currentSubject ? currentSubject.id : "all";
  if (statsScope !== "all" && !mine.some((s) => s.id === statsScope)) statsScope = "all";
  const scopeSubject = statsScope === "all" ? null : mine.find((s) => s.id === statsScope);
  const subjName = scopeSubject ? scopeSubject.name : null;

  // Skal: rubrik + ämnesväljare + kropp (alltid synliga, även utan data).
  // Ämnesväljaren är en popover med mörk/blurrad bakgrund – samma som lektionsskärmen.
  host.innerHTML = `
    <div class="cs-backdrop" id="st-cs-backdrop"></div>
    <header class="stats-header">${STATS_BARS_ICON}<h1>Statistik</h1></header>
    <div class="stats-scope cs-overlay" id="st-scope"></div>
    <div id="st-body"></div>`;

  const backdrop = $("st-cs-backdrop");
  const items = [{ value: "all", label: "Alla ämnen" }].concat(
    mine.map((s) => { const f = subjectFlag(s); return { value: s.id, label: (f ? f + " " : "") + s.name }; }));
  const sel = buildSelect(items, statsScope, (v) => { statsScope = v; renderStats(); },
    { onToggle: (open) => backdrop.classList.toggle("show", open) });
  $("st-scope").appendChild(sel.el);
  // Tryck på bakgrunden stänger väljaren
  backdrop.onclick = () => { host.querySelectorAll(".cs-list").forEach((o) => o.classList.remove("open")); backdrop.classList.remove("show"); };

  const body = $("st-body");
  const recs = getStats().filter((r) => r && (!currentUser || r.user === currentUser) && (statsScope === "all" || r.subject === subjName));
  const ymd = (d) => d.toLocaleDateString("sv-SE");
  const addD = (base, n) => { const d = new Date(base); d.setDate(d.getDate() + n); return d; };
  const byDate = {};
  recs.forEach((r) => { if (!r.d) return; (byDate[r.d] || (byDate[r.d] = { cards: 0 })).cards += (r.cards || 0); });
  const today = new Date(); today.setHours(12, 0, 0, 0);

  if (!Object.keys(byDate).length) {
    body.innerHTML = `<p class="empty" style="padding:24px 0">Ingen statistik än – kör ett pass så börjar det fyllas på! 🚀</p>`;
    return;
  }

  // nuvarande streak (tillåt att dagens inte är klar än → börja på gårdagen) – periodoberoende
  let cur = 0; { let d = new Date(today); if (!byDate[ymd(d)]) d = addD(d, -1); while (byDate[ymd(d)]) { cur++; d = addD(d, -1); } }
  // längsta streak (sök 1 år bakåt) – periodoberoende
  let longest = 0, run = 0; { let d = addD(today, -365); for (let i = 0; i <= 365; i++) { if (byDate[ymd(d)]) { run++; if (run > longest) longest = run; } else run = 0; d = addD(d, 1); } }

  // heatmap: 18 veckor, måndag överst, senaste veckan längst till höger (alltid hela historiken)
  const end = addD(today, 6 - ((today.getDay() + 6) % 7)); // söndag i innevarande vecka
  // Dynamisk färgskala: kvartiler av de aktiva dagarna i de 18 visade veckorna, så
  // skalan anpassar sig efter hur mycket man faktiskt pluggar (i st. för fasta nivåer).
  const winVals = [];
  for (let w = 17; w >= 0; w--) for (let dow = 0; dow < 7; dow++) {
    const d = addD(end, -(w * 7) - (6 - dow));
    if (d > today) continue;
    const c = byDate[ymd(d)] ? byDate[ymd(d)].cards : 0;
    if (c > 0) winVals.push(c);
  }
  winVals.sort((a, b) => a - b);
  const qtl = (p) => winVals[Math.min(winVals.length - 1, Math.floor(p * winVals.length))];
  const q1 = qtl(0.25), q2 = qtl(0.5), q3 = qtl(0.75);
  const flat = new Set(winVals).size <= 1; // ingen spridning → enhetlig mellanton
  const heatLevel = (c) => c <= 0 ? "" : flat ? " l3" : c >= q3 ? " l4" : c >= q2 ? " l3" : c >= q1 ? " l2" : " l1";
  let heat = "";
  for (let w = 17; w >= 0; w--) {
    let col = "";
    for (let dow = 0; dow < 7; dow++) {
      const d = addD(end, -(w * 7) - (6 - dow));
      const c = byDate[ymd(d)] ? byDate[ymd(d)].cards : 0;
      let cls = "st-d";
      if (d > today) cls += " fut";
      else if (c) cls += heatLevel(c);
      if (ymd(d) === ymd(today)) cls += " today";
      col += `<div class="${cls}"></div>`;
    }
    heat += `<div class="st-wk">${col}</div>`;
  }

  // Leitner-fördelning: antal kort per låda (i vald riktning; mixed = svagaste lådan)
  const dirMode = dirSelect.value;
  const boxOf = (c) => {
    const fb = (srs[srsKey(c, "f2b")] || {}).box || 0;
    const bb = (srs[srsKey(c, "b2f")] || {}).box || 0;
    return dirMode === "f2b" ? fb : dirMode === "b2f" ? bb : Math.min(fb, bb);
  };
  const ltCounts = [0, 0, 0, 0, 0, 0, 0, 0];
  const ltSubjects = statsScope === "all" ? mine : (scopeSubject ? [scopeSubject] : []);
  ltSubjects.forEach((s) => s.lessons.forEach((l) => l.cards.forEach((c) => { ltCounts[boxOf(c)]++; })));

  // "Nya ord": idag/7/30 bygger på stämplade förstagångsdatum (funkar bara framåt).
  // "Totalt" räknar istället alla kort som lämnat låda 0 (= studerade minst en gång) –
  // det går att läsa direkt ur SRS oavsett historik, så totalsiffran blir korrekt nu.
  const fsMap = loadFirstStudied();
  const seenK = new Set();
  const firstDates = [];
  let studiedEver = 0;
  ltSubjects.forEach((s) => s.lessons.forEach((l) => l.cards.forEach((c) => {
    const k = cardKeyOf(c); if (seenK.has(k)) return; seenK.add(k);
    if (!isNewCard(c)) studiedEver++;
    const d = fsMap[k]; if (d) firstDates.push(d);
  })));
  const ltMax = Math.max(1, ...ltCounts);
  const ltTotal = ltCounts.reduce((a, b) => a + b, 0);
  const LT_LABELS = ["Ny", "1d", "2d", "4d", "8d", "16d", "32d", "64d"];
  const leitner = ltCounts.map((n, i) =>
    `<div class="lt-col"><div class="lt-num">${n || ""}</div><div class="lt-bar b${i}" style="height:${n ? Math.max(6, Math.round(n / ltMax * 100)) : 0}%"></div><div class="lt-lbl">${LT_LABELS[i]}</div></div>`
  ).join("");

  // Prestationer (livstid) – följer vald scope, precis som heatmap & Leitner
  const ach = getAchievements(ltSubjects);
  const lv = levels();
  const achTiles = [
    { ico: "💪", n: ach.days[0], thr: `${lv.days[0]}+`, unit: "dagar" },
    { ico: "⚡️", n: ach.days[1], thr: `${lv.days[1]}+`, unit: "dagar" },
    { ico: "🥇", n: ach.days[2], thr: `${lv.days[2]}+`, unit: "dagar" },
    { ico: "🏆", n: ach.weeks, thr: `${lv.week}+`, unit: "veckor", gold: true },
  ].map((t) =>
    `<div class="st-ach ${t.n ? (t.gold ? "gold" : "on") : "zero"}"><div class="ach-ico">${t.ico}</div><div class="ach-num">${t.n}</div><div class="ach-thr">${t.thr}</div><div class="ach-unit">${t.unit}</div></div>`
  ).join("");

  // Periodvalet kommer ihåg sig tills man byter
  const PERIODS = [{ v: "1", label: "Idag" }, { v: "7", label: "7 dagar" }, { v: "30", label: "30 dagar" }, { v: "all", label: "Totalt" }];
  let period = localStorage.getItem(STATS_PERIOD_KEY) || "30";
  if (!PERIODS.some((p) => p.v === period)) period = "30";

  function periodKpis(p) {
    const cutoff = p === "all" ? "" : ymd(addD(today, -(parseInt(p, 10) - 1))); // YYYY-MM-DD; sträng-jämförelse funkar
    const pRecs = recs.filter((r) => r.d && (p === "all" || r.d >= cutoff));
    const pass = pRecs.length;
    const kort = pRecs.reduce((a, r) => a + (r.cards || 0), 0);
    const unika = uniqueUnitsInPeriod(ltSubjects, cutoff); // distinkta ord+riktning (= dagsmålets mått)
    const min = Math.round(pRecs.reduce((a, r) => a + (r.ms || 0), 0) / 60000);
    // Totalt = alla kort ute ur låda 0 (livstid); fönster = stämplade datum inom perioden
    const nya = p === "all" ? studiedEver : firstDates.filter((d) => d >= cutoff).length;
    return { pass, kort, unika, min, nya };
  }

  body.innerHTML = `
    <div class="st-hero"><div class="st-big ${byDate[ymd(today)] ? "" : "pending"}">${cur}<span class="st-u"> dagar</span></div><div class="st-cap">🔥 nuvarande streak · längsta ${longest}</div></div>
    <div class="opt-segs st-period" id="st-period"><span class="st-period-thumb" id="st-period-thumb"></span>${PERIODS.map((p) => `<button type="button" data-v="${p.v}">${p.label}</button>`).join("")}</div>
    <div class="st-grid" id="st-grid"></div>
    <div class="st-sec">SENASTE 18 VECKORNA</div>
    <div class="st-heatwrap"><div class="st-heat">${heat}</div></div>
    <div class="st-legend"><span>mindre</span><span class="st-d"></span><span class="st-d l1"></span><span class="st-d l2"></span><span class="st-d l3"></span><span class="st-d l4"></span><span>mer</span></div>
    <div class="st-sec">LEITNER · ${ltTotal} kort</div>
    <div class="st-leitner">${leitner}</div>
    <div class="st-sec">PRESTATIONER</div>
    <div class="st-achv">${achTiles}</div>
    <div class="st-achv-edit"><button type="button" class="link-action" id="achv-edit">Ändra nivåer</button></div>`;

  body.querySelector("#achv-edit").onclick = openLevelsModal;

  const segs = body.querySelector("#st-period");
  const grid = body.querySelector("#st-grid");
  const thumb = body.querySelector("#st-period-thumb");
  let thumbInit = false;
  // Flytta highlighten till valt segment. Endast transform glider; bredden sätts
  // direkt (ej transition) så den aldrig animeras → ingen avlång/krympande effekt.
  const moveThumb = () => {
    const on = segs.querySelector("button.on");
    if (!on) return;
    const tr = segs.getBoundingClientRect();
    const r = on.getBoundingClientRect();
    const bl = parseFloat(getComputedStyle(segs).borderLeftWidth) || 0;
    if (!thumbInit) thumb.style.transition = "none"; // ingen glidning vid första render
    thumb.style.width = r.width + "px";              // direkt, ingen width-transition
    thumb.style.transform = `translateX(${r.left - tr.left - bl}px)`;
    if (!thumbInit) { void thumb.offsetWidth; thumb.style.transition = ""; thumbInit = true; }
  };
  const renderKpis = () => {
    segs.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.v === period));
    moveThumb();
    const k = periodKpis(period);
    const unika = localStorage.getItem(KORT_MODE_KEY) === "unika";
    grid.innerHTML = `
      <div class="st-b"><div class="st-v">${k.pass}</div><div class="st-l">PASS</div></div>
      <div class="st-b st-b-tap" id="kpi-kort"><div class="st-v">${unika ? k.unika : k.kort}</div><div class="st-l">${unika ? "UNIKA" : "KORT"}</div></div>
      <div class="st-b"><div class="st-v">${k.min}</div><div class="st-l">MINUTER</div></div>
      <div class="st-b"><div class="st-v">${k.nya}</div><div class="st-l">NYA</div></div>`;
  };
  segs.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    period = b.dataset.v; localStorage.setItem(STATS_PERIOD_KEY, period); renderKpis();
  });
  // Tryck på KORT-rutan → växla mellan svep/repetitioner och unika kort (kommer ihåg läget)
  grid.addEventListener("click", (e) => {
    if (!e.target.closest("#kpi-kort")) return;
    const cur = localStorage.getItem(KORT_MODE_KEY) === "unika" ? "unika" : "kort";
    localStorage.setItem(KORT_MODE_KEY, cur === "unika" ? "kort" : "unika");
    renderKpis();
  });
  renderKpis();
}

function beginSession({ queue, dirMode, label, note, kind, lessonId, forced, continueLimit }) {
  commitSessionStats(); // logga ev. tidigare (avbrutet) pass innan nytt startar
  closeChoosers(); // stäng ev. öppen riktnings-/kortväljare så popover/bakgrund inte ligger kvar
  blurActiveInput();
  // nollställ ev. kvarvarande svep-feedback så den inte blinkar till vid sessionsstart
  feedbackEl.classList.remove("show");
  feedbackEl.textContent = "";
  session = { queue: queue.slice(), dirMode, total: queue.length, done: 0, label, note: note || "",
              graded: new Set(), kind: kind || null, lessonId: lessonId || null, forced: forced || false, continueLimit: continueLimit || 0,
              // träningsstatistik (loggas lokalt per pass)
              startedAt: Date.now(), reviewCount: 0, cardSet: new Set(),
              statsSubject: currentSubject ? currentSubject.name : null, statsUser: currentUser || null };
  undoStack = []; // ny session → inget att ångra
  requestMotionPermissionOnce(); // sker inom klick-gesten (krav på iOS)
  unlockSpeech(); // lås upp TTS i samma gest → första kortets autospeak funkar även vid direktsvep
  show("training");
  activeScreen = "training";
  updateAutospeakRow();
  loadCard();
}

function updateProgress() {
  if (!session) return;
  progressPill.textContent = `${session.queue.length} kvar`;
}

function loadCard(forceDir) {
  if (!session || session.queue.length === 0) {
    finishSession();
    return;
  }
  // Snäpp tillbaka till framsidan UTAN flip-animation, annars hinner baksidan
  // (svaret) skymtas medan nästa kort vänder sig rätt.
  cardInner.style.transition = "none";
  card.classList.remove("flipped");
  void cardInner.offsetWidth; // tvinga omritning så transition:none gäller
  cardInner.style.transition = "";
  const c = session.queue[0];
  const dir = forceDir || pickDir(session.dirMode);
  session.current = c;
  session.shownDir = dir;
  const showFrontFirst = dir === "f2b";
  cardFrontText.textContent = showFrontFirst ? c.front : c.back;
  cardAnswer.textContent = showFrontFirst ? c.back : c.front;
  // Minnesregeln är en svensk hjälp för det UTLÄNDSKA ordet → visa bara när svaret
  // är utländskt (b2f). Kör man TILL svenska vore den en gratisledtråd – göm den.
  cardHint.textContent = !showFrontFirst ? (c.hint || "") : "";
  cardFrontHint.textContent = ""; cardFrontHint.classList.add("hidden"); // ny ledtråd döljs tills lampan trycks
  updateProgress();
  updateStack();
  showSpeakSoon(300); // döljer klustret och visar rätt läge efter kortbytet
  if (handsfreeActive) { clearTimeout(hfLoadCardTimer); hfLoadCardTimer = setTimeout(() => { if (handsfreeActive) hfSpeakFront(); }, 400); }
}

const DONE_LABELS = ["Grymt!", "Nice!", "Hell yeah!", "Snyggt!", "Kanon!", "Toppen!", "Bra jobbat!", "Yes!", "Så ska det se ut!", "Mästerligt!"];

// Hur många kort återstår faktiskt för en "Fortsätt"-knapp (respekterar runSeen,
// som vid fortsättning inte nollställs – fel-svarade visas inte förrän ny runda).
function remainingForContinue(cont) {
  const now = Date.now();
  if (cont.kind === "due") {
    // Måste spegla startDueSession EXAKT: pausade lektioner hoppas över och
    // stjärn-fokus respekteras – annars blir Klar-skärmens nämnare för hög.
    const dirMode = dirSelect.value;
    const newSet = new Set(todaysNewCards(currentSubject).map((c) => c.id));
    const starred = onlyStarred();
    let n = 0;
    activeLessons(currentSubject).forEach((l) =>
      l.cards.forEach((c) => {
        if (runSeen.has(c.id)) return;
        if ((isDueNow(c, dirMode, now) || newSet.has(c.id)) && prioAllowed(c) && (!starred || isFav(c))) n++;
      })
    );
    return n;
  }
  // lesson – spegla startLessonSession: prioAllowed + aktiva-idag (om ej forcerat)
  const lesson = currentSubject.lessons.find((l) => l.id === cont.lessonId);
  if (!lesson) return 0;
  const dirMode = dirSelect.value;
  const activeToday = (c) =>
    dirMode === "f2b" ? getEntry(c, "f2b").due <= now
    : dirMode === "b2f" ? getEntry(c, "b2f").due <= now
    : (getEntry(c, "f2b").due <= now || getEntry(c, "b2f").due <= now);
  return lesson.cards.filter((c) => !runSeen.has(c.id) && prioAllowed(c) && (cont.forced || activeToday(c))).length;
}

// Sparas så man kan ångra sista svaret även EFTER att passet tagit slut (Klar-skärmen).
let lastSession = null;
let lastSessionWasHF = false;

function finishSession() {
  const wasHF = handsfreeActive;
  commitSessionStats(); // logga passet innan vi släpper session-objektet
  track("pass-klart");
  stopHandsfree();
  const cont = session ? { limit: session.continueLimit, kind: session.kind, lessonId: session.lessonId, forced: session.forced } : null;

  // Ring-rubrik = slumpad pepp (gröna knappen är alltid "Klar"). Ringen fylls efter
  // andel av rundans kort som klarats: gjorda totalt (runSeen, ackumuleras över
  // "Fortsätt") / (gjorda + kvar). Nollställs när en ny runda startas (efter Klar).
  const passCount = (runSeen && runSeen.size) || (session ? session.total : 0);
  const remaining = cont && cont.limit > 0 ? remainingForContinue(cont) : 0;
  const total = passCount + remaining;
  const pepEl = $("congrats-pep");
  const pep = DONE_LABELS[Math.floor(Math.random() * DONE_LABELS.length)];
  pepEl.textContent = pep;
  // Skala fonten efter längd så peppen alltid ryms innanför ringen (nuddar inte arcen)
  pepEl.style.fontSize = pep.length > 12 ? "1.3rem" : pep.length > 8 ? "1.55rem" : "1.8rem";
  $("congrats-frac").textContent = total ? `${passCount} / ${total} kort` : "";

  // Mål-kort visas BARA när dagens (eller veckans) mål nåtts – då visas båda som sporre.
  const goalsEl = $("congrats-goals");
  if (currentSubject) {
    const gp = getUnitProgress(currentSubject.id);
    const dayDone = gp.dayCount >= dailyGoal(), weekDone = gp.weekCount >= weeklyGoal();
    if (dayDone || weekDone) {
      goalsEl.innerHTML =
        `<div class="cg-goal ${dayDone ? "done" : ""}"><div class="cg-ico">${dayDone ? dayTierIcon(gp.dayCount) : "💪"}</div><div class="cg-num">${dayDone ? `${gp.dayCount} ✓` : `${gp.dayCount} / ${dailyGoal()}`}</div><div class="cg-lbl">kort idag</div></div>` +
        `<div class="cg-goal ${weekDone ? "done" : ""}"><div class="cg-ico">🏆</div><div class="cg-num">${weekDone ? `${gp.weekCount} ✓` : `${gp.weekCount} / ${weeklyGoal()}`}</div><div class="cg-lbl">denna vecka</div></div>`;
    } else {
      goalsEl.innerHTML = "";
    }
  } else {
    goalsEl.innerHTML = "";
  }

  // "Fortsätt"-knapp om man kör i pass och det finns mer kvar. Texten anpassas:
  // färre kvar än passlängden → "Ta de sista X direkt".
  const contBtn = $("congrats-continue");
  if (remaining > 0) {
    contBtn.textContent = remaining < cont.limit
      ? (remaining === 1 ? "Ta det sista direkt" : `Ta de sista ${remaining} direkt`)
      : `Fortsätt med ${cont.limit} till`;
    contBtn.classList.remove("hidden");
    contBtn.onclick = () => {
      if (cont.kind === "due") startDueSession(true); else startLessonSession(cont.lessonId, cont.forced, true);
      // Var passet i handsfree → fortsätt i handsfree (mic redan beviljad → ingen await,
      // kvar i klick-gesten). startHandsfree läser upp kortet och börjar lyssna igen.
      if (wasHF && session && session.current) startHandsfree();
    };
  } else {
    contBtn.classList.add("hidden");
  }

  // Behåll passet så det går att ångra sista svaret från Klar-skärmen.
  lastSession = session;
  lastSessionWasHF = wasHF;
  session = null;

  // Hint om röst-/skakkommandon (skaka-ångra alltid; röst om handsfree).
  const undoHint = $("congrats-undo-hint");
  const canUndo = undoStack.length > 0;
  if (wasHF && remaining > 0) {
    // Handsfree med "Fortsätt": lyft fram röstkommandot (det var det som saknades).
    undoHint.textContent = canUndo
      ? 'Säg "fortsätt" för fler – eller "ångra" om sista blev fel.'
      : 'Säg "fortsätt" för fler.';
    undoHint.classList.remove("hidden");
  } else if (canUndo) {
    undoHint.textContent = wasHF
      ? 'Fel på sista? Säg "ångra" eller skaka telefonen.'
      : "Fel på sista? Skaka telefonen för att ta tillbaka.";
    undoHint.classList.remove("hidden");
  } else {
    undoHint.classList.add("hidden");
  }

  show("congrats");
  activeScreen = "congrats";
  launchConfetti();
  // Fyll progressringen (animeras från tom via CSS-transition på stroke-dashoffset)
  const ringFill = $("cg-ring-fill");
  if (ringFill) {
    const frac = total > 0 ? Math.min(1, passCount / total) : 1;
    const C = 578; // omkrets ≈ 2π·92
    ringFill.style.strokeDashoffset = String(C);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ringFill.style.strokeDashoffset = String(Math.round(C * (1 - frac)));
    }));
  }
  if (wasHF) startCongratsListen(); // lyssna efter "ångra" i röstläge
}

// Ångra sista svaret från Klar-skärmen: återuppta passet och kör vanliga undo.
function undoFromCongrats() {
  if (activeScreen !== "congrats" || !lastSession || !undoStack.length) return false;
  if (navCleanup) navCleanup();
  stopCongratsListen();
  const resumeHF = lastSessionWasHF;
  session = lastSession;
  lastSession = null;
  $("congrats-undo-hint").classList.add("hidden");
  setOnlyScreen("training"); // direkt byte – kortets in-glidning är feedbacken
  shownScreen = "training";
  activeScreen = "training";
  updateAutospeakRow();
  if (resumeHF) {
    // Återuppta handsfree: loadCard (i undoLastAnswer) läser då upp kortet och lyssnar.
    handsfreeActive = true;
    setModeUI(true);
    if ("wakeLock" in navigator) navigator.wakeLock.request("screen").then((l) => { hfWakeLock = l; }).catch(() => {});
  }
  // Sista svarets fly-out kan ha lämnat animating=true en kort stund; på Klar-skärmen
  // är den animationen redan klar visuellt, så nollställ så undoLastAnswer inte blockeras.
  animating = false;
  return undoLastAnswer();
}

// Liten röstlyssnare på Klar-skärmen (handsfree): kommandona "ångra" och "fortsätt".
let congratsRec = null, congratsListening = false, congratsListenTimer = null;
function startCongratsListen() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const contBtn = $("congrats-continue");
  const canContinue = !contBtn.classList.contains("hidden");
  // Lyssna om det finns något att göra med rösten: ångra sista ELLER fortsätta passet.
  if (!SR || (!undoStack.length && !canContinue)) return;
  congratsListening = true;
  clearTimeout(congratsListenTimer);
  congratsListenTimer = setTimeout(stopCongratsListen, 25000); // håll inte mikrofonen för evigt
  const startRec = () => {
    if (!congratsListening) return;
    const rec = new SR();
    congratsRec = rec;
    rec.lang = "sv-SE"; rec.continuous = false; rec.interimResults = false; rec.maxAlternatives = 3;
    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (!e.results[i].isFinal) continue;
        for (let j = 0; j < e.results[i].length; j++) {
          const t = e.results[i][j].transcript.toLowerCase();
          // "fortsätt" → kör vidare med nästa omgång (samma som knappen). Stoppa
          // lyssnaren först så mikrofonen är fri när handsfree återupptas.
          if ((t.includes("fortsätt") || t.includes("fortsatt")) && !contBtn.classList.contains("hidden")) {
            stopCongratsListen();
            contBtn.click();
            return;
          }
          if (t.includes("ångra") || t.includes("ongra")) { undoFromCongrats(); return; }
        }
      }
    };
    rec.onerror = (e) => { if (e.error === "not-allowed") stopCongratsListen(); };
    rec.onend = () => { if (congratsListening) setTimeout(() => { if (congratsListening) { congratsRec = null; startRec(); } }, 250); };
    try { rec.start(); } catch (_) {}
  };
  startRec();
}
function stopCongratsListen() {
  congratsListening = false;
  clearTimeout(congratsListenTimer);
  if (congratsRec) { try { congratsRec.abort(); } catch (_) {} congratsRec = null; }
}

// Fysik-konfetti på canvas: faller med gravitation, studsar mot ringen (solid
// cirkel) och mot skärmens sidokanter, en del landar och blir liggande på Klar-
// knappen, resten faller ut i botten och försvinner.
let cgRaf = null;
function launchConfetti() {
  const screen = $("congrats-screen");
  const canvas = $("cg-physics");
  if (!canvas) return;
  cancelAnimationFrame(cgRaf);
  const ctx = canvas.getContext("2d");
  const W = screen.clientWidth, H = screen.clientHeight;
  if (prefersReducedMotion) { canvas.width = W; canvas.height = H; ctx.clearRect(0, 0, W, H); return; }
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + "px"; canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Geometri relativt skärmen (transform-säkert under nav-glid: båda rects flyttas lika)
  const sr = screen.getBoundingClientRect();
  const ringEl = screen.querySelector(".cg-ring");
  const btnEl = $("congrats-done");
  const rr = ringEl.getBoundingClientRect();
  const cx = rr.left - sr.left + rr.width / 2;
  const cy = rr.top - sr.top + rr.height / 2;
  const R = ringEl.offsetWidth / 2 - 6; // offsetWidth = olayoutad bredd (struntar i pop-skala)
  const bb = btnEl.getBoundingClientRect();
  const btn = { top: bb.top - sr.top, left: bb.left - sr.left, right: bb.right - sr.left };

  const COLS = ["#5b8cff", "#8fbf5a", "#ffd24a", "#ff8a3d", "#e05a4f", "#b06bf0", "#fff"];
  const rp = (a, b) => a + Math.random() * (b - a);
  let parts = [];
  for (let i = 0; i < 80; i++) {
    parts.push({ x: rp(8, W - 8), y: -rp(10, 180), vx: rp(-1.3, 1.3), vy: rp(0.4, 1.8),
      w: rp(6, 11), h: rp(5, 9), rot: rp(0, 6.28), vr: rp(-0.25, 0.25),
      col: COLS[i % COLS.length], rest: false, dead: false });
  }
  const G = 0.17, REST = 0.55, AIR = 0.994, M = 5;
  let frames = 0;
  function step() {
    frames++;
    ctx.clearRect(0, 0, W, H);
    let moving = 0;
    for (const p of parts) {
      if (!p.rest) {
        p.vy += G; p.vx *= AIR; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
        // Studs mot ringen – men bara om biten har fart. Nästan stillastående bitar
        // får falla igenom och ut i botten i stället för att klänga kvar på kanten.
        if (d < R && d > 0.01 && (Math.abs(p.vx) + Math.abs(p.vy)) > 0.5) {
          const nx = dx / d, ny = dy / d;
          p.x = cx + nx * R; p.y = cy + ny * R;
          const vn = p.vx * nx + p.vy * ny;
          p.vx = (p.vx - 2 * vn * nx) * REST; p.vy = (p.vy - 2 * vn * ny) * REST;
          p.vr += rp(-0.2, 0.2);
        }
        if (p.x < M) { p.x = M; p.vx = Math.abs(p.vx) * REST; }          // sidokanter
        else if (p.x > W - M) { p.x = W - M; p.vx = -Math.abs(p.vx) * REST; }
        if (p.vy > 0 && p.x > btn.left - 3 && p.x < btn.right + 3 && (p.y + p.h / 2) >= btn.top && p.y < btn.top + 16) {
          p.y = btn.top - p.h / 2; p.vy = -p.vy * 0.28; p.vx *= 0.55;     // landa på Klar-knappen
          if (Math.abs(p.vy) < 0.7) { p.vy = 0; p.vx *= 0.4; if (Math.abs(p.vx) < 0.25) { p.rest = true; p.y = btn.top - p.h / 2; } }
        }
        if (p.y - 12 > H) p.dead = true; // ut i botten
        if (!p.dead) moving++;
      }
      if (!p.dead) {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      }
    }
    parts = parts.filter((p) => !p.dead);
    if (parts.length && moving > 0 && frames < 900) cgRaf = requestAnimationFrame(step);
  }
  step();
}

function answer(grade) {
  const c = session.current;
  const dir = session.shownDir;
  // Statistik: räkna svar + unika kort i passet
  session.reviewCount = (session.reviewCount || 0) + 1;
  (session.cardSet || (session.cardSet = new Set())).add(c.id);
  // Flipp-mål: distinkt ord+riktning per dag/vecka → firande vid milstolpe
  const flip = recordUnitFlip(c, dir);
  if (flip) {
    if (flip.crossedWeek) showAchievement("week");
    else if (flip.dayCrossed) showAchievement("day", flip.dayCrossed);
  }
  // Snapshot för shake-to-undo (innan någon mutation): kö, SRS-poster, graded-medlemskap.
  const gradedKey = c.id + ":" + dir;
  const otherDir0 = dir === "f2b" ? "b2f" : "f2b";
  const k1 = srsKey(c, dir), k2 = srsKey(c, otherDir0);
  undoStack.push({
    card: c, dir, grade,
    queue: session.queue.slice(),
    gradedKey, gradedHadKey: session.graded.has(gradedKey),
    srs: [[k1, srs[k1] ? { ...srs[k1] } : null], [k2, srs[k2] ? { ...srs[k2] } : null]],
  });
  if (undoStack.length > 40) undoStack.shift();
  // Endast första svaret per ord+riktning i sessionen räknas mot SRS.
  // Senare möten (efter felsvar) nöter ordet men ändrar inte lådan – så ett ord
  // man först bommade ligger kvar lågt och kommer oftare än ett man kunde direkt.
  const key = c.id + ":" + dir;
  if (!session.graded.has(key)) {
    gradeCard(c, dir, grade);
    session.graded.add(key);
    // Ett LYCKAT svar räknas som repetition även för andra riktningen:
    // är den introducerad och förfallen, skjut fram datumet (behåll lådan)
    // så att ett tränat ord försvinner helt från "Dags att öva".
    if (grade === "good" || grade === "easy") {
      const otherDir = dir === "f2b" ? "b2f" : "f2b";
      const oe = getEntry(c, otherDir);
      const now = Date.now();
      if (oe.box >= 1 && oe.due <= now) {
        oe.due = startOfLocalDay(now + BOX_INTERVALS[oe.box] * DAY_MS); // lokal midnatt
        saveSRS();
      }
    }
  }
  // Köhantering inom passet (oberoende av SRS-räkningen):
  // fel → tillbaka sist; hopplöst → tillbaka snart (drilla hårt); kan/kan bra → klart
  session.queue.shift();
  if (grade === "fail") session.queue.push(c);
  else if (grade === "hard") session.queue.splice(Math.min(3, session.queue.length), 0, c);
  // Autouppspelning: svepte man direkt från svenska sidan (b2f, utan att flippa)
  // hann man aldrig se/höra det utländska ordet – läs upp det nu så uttalet alltid
  // ges. Nästa kort i b2f visar svenska (ingen autospeak) så inget krockar.
  if (autoSpeak && !handsfreeActive && dir === "b2f" && !card.classList.contains("flipped")
      && hasVoiceFor(subjectLang(currentSubject))) {
    speak(c.front, subjectLang(currentSubject));
  }
  loadCard();
}

// ---- Feedback ----
function showFeedback(grade) {
  const map = { fail: ["✗", "#e05a4f"], good: ["✓", "#5bbf72"], easy: ["★", "#f4c542"], hard: ["⇊", "#b06bf0"] };
  const [sym, color] = map[grade];
  feedbackEl.textContent = sym;
  feedbackEl.style.color = color;
  feedbackEl.classList.remove("show", "undo-show");
  void feedbackEl.offsetWidth;
  feedbackEl.classList.add("show");
}

// =========================================================================
//  Shake-to-undo – skaka telefonen för att ångra senaste svaret
// =========================================================================
function undoLastAnswer() {
  if (!session || animating) return false;
  const snap = undoStack.pop();
  if (!snap) return false;
  // Återställ SRS-poster (radera de som inte fanns före svaret)
  snap.srs.forEach(([k, v]) => { if (v === null) delete srs[k]; else srs[k] = v; });
  saveSRS();
  // Återställ in-session "graded"-medlemskap
  if (!snap.gradedHadKey) session.graded.delete(snap.gradedKey);
  // Återställ kön (kopian hade det ångrade kortet först) och visa samma kort + riktning
  session.queue = snap.queue.slice();
  showUndoFeedback();
  loadCard(snap.dir);
  // Kortet glider tillbaka in från samma håll det lämnade (omvänd fly-out)
  const inClass = { good: "in-right", easy: "in-up", hard: "in-down", fail: "in-left" }[snap.grade] || "in-up";
  card.classList.remove("emerge", "in-right", "in-left", "in-up", "in-down");
  void card.offsetWidth;
  animating = true;
  card.classList.add(inClass);
  // 0,7s delay + 0,7s inglidning = 1,4s; lite buffert innan vi släpper interaktion
  setTimeout(() => {
    card.classList.remove(inClass);
    animating = false;
    // Settlat läge efter ångra-inglidningen: visa rätt kort-knappar igen. loadCard:s
    // showSpeakSoon-timer hann köra medan animating var true (→ guarden dolde klustret),
    // så utan detta saknas t.ex. glödlampan på svenska sidan efter en skak-ångra.
    updateCardActions();
  }, 1450);
  return true;
}

function showUndoFeedback() {
  feedbackEl.textContent = "↩️";
  feedbackEl.style.color = "#5b8cff";
  feedbackEl.classList.remove("show", "undo-show");
  void feedbackEl.offsetWidth;
  feedbackEl.classList.add("undo-show");
}

let motionReqDone = false;
let motionListening = false;
function enableShake() {
  if (motionListening) return;
  window.addEventListener("devicemotion", onMotion);
  motionListening = true;
}
function requestMotionPermissionOnce() {
  if (motionReqDone) { enableShake(); return; }
  motionReqDone = true;
  const DME = window.DeviceMotionEvent;
  if (DME && typeof DME.requestPermission === "function") {
    DME.requestPermission().then((res) => { if (res === "granted") enableShake(); }).catch(() => {});
  } else {
    enableShake(); // äldre iOS / Android: inget tillstånd krävs
  }
}

let shakeLast = { x: 0, y: 0, z: 0, t: 0 };
let lastShakeTrigger = 0;
const SHAKE_THRESHOLD = 1800; // empiriskt; högt så vanlig gång/rörelse inte triggar – kräver medvetet kraftig skak
function onMotion(e) {
  // Skaka för att ångra fungerar både under passet och på Klar-skärmen (sista svaret).
  if (activeScreen !== "training" && activeScreen !== "congrats") return;
  const a = e.accelerationIncludingGravity;
  if (!a) return;
  const t = Date.now();
  if (t - shakeLast.t < 100) return;
  const dt = (t - shakeLast.t) || 1;
  const speed = Math.abs((a.x || 0) + (a.y || 0) + (a.z || 0) - shakeLast.x - shakeLast.y - shakeLast.z) / dt * 10000;
  shakeLast = { x: a.x || 0, y: a.y || 0, z: a.z || 0, t };
  if (speed > SHAKE_THRESHOLD && t - lastShakeTrigger > 1200) {
    lastShakeTrigger = t;
    if (activeScreen === "congrats") undoFromCongrats();
    else undoLastAnswer();
  }
}

// =========================================================================
//  Uttal (Web Speech API)
// =========================================================================
const speakBtn = $("speak-btn"); // 🔊 uppe till höger (utländska sidan)
const hintBtn = $("hint-btn");   // 💡 nere till höger (svenska sidan m. minnesregel)
const moreBtn = $("menu-tab");   // ⋯-fliken i kortets nederkant → fjädermeny
function hideCardActions(){ moreBtn.classList.add("hidden"); speakBtn.classList.add("hidden"); hintBtn.classList.add("hidden"); }

// Autoläge: läs upp automatiskt varje gång den utländska sidan visas
const AUTO_SPEAK_KEY = "flippa-autospeak";
// Default PÅ på ny enhet (saknad nyckel). Ett uttryckligt val att stänga av ("0") respekteras.
let autoSpeak = localStorage.getItem(AUTO_SPEAK_KEY) !== "0";
function saveAutoSpeak() { localStorage.setItem(AUTO_SPEAK_KEY, autoSpeak ? "1" : "0"); }

// iOS låser talsyntesen tills speak() körts i en användargest. Ett tyst (volume:0)
// uttalande i gesten låser upp den – annars blockeras första autouppspelningen, som
// vid svep triggas i en fördröjd callback (flyOut → answer) utanför gesten. Kalla vid
// passtart (klick-gesten) så första kortets uppläsning funkar även om man sveper direkt.
function unlockSpeech() {
  if (!("speechSynthesis" in window)) return;
  try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); } catch (_) {}
}

function speak(text, lang, onEnd) {
  if (!text || !("speechSynthesis" in window)) { if (onEnd) setTimeout(onEnd, 0); return; }
  const u = new SpeechSynthesisUtterance(text);
  if (lang) {
    u.lang = lang;
    const voices = speechSynthesis.getVoices();
    const v = voices.find((x) => x.lang === lang) ||
              voices.find((x) => x.lang.replace("_", "-").startsWith(lang.slice(0, 2)));
    if (v) u.voice = v;
  }
  if (onEnd) u.onend = onEnd;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// Är den utländska sidan (front-fältet) synlig just nu?
function foreignVisible() {
  if (!session || !session.current) return false;
  const flipped = card.classList.contains("flipped");
  return session.shownDir === "f2b" ? !flipped : flipped;
}

// Finns en röst för språket på den här enheten? (okänt = visa hellre)
function hasVoiceFor(lang) {
  if (!lang || !("speechSynthesis" in window)) return false;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return true; // röstlistan ej laddad än
  const p = lang.slice(0, 2);
  return voices.some((v) => v.lang.replace("_", "-").slice(0, 2) === p);
}

function updateSpeakBtn() { updateCardActions(); } // alias – klustret sköter allt

// Dölj klustret direkt och visa det först när animationen (flipp/emerge) är klar.
function showSpeakSoon(delay) {
  hideCardActions();
  closeFan();
  setTimeout(() => {
    updateCardActions();
    // autoläge: läs upp så fort den utländska sidan blir synlig
    if (autoSpeak && !handsfreeActive && session && session.current && foreignVisible() && hasVoiceFor(subjectLang(currentSubject))) {
      speak(session.current.front, subjectLang(currentSubject));
    }
  }, delay);
}

// Stacken speglar antal kort kvar UNDER det aktiva: 2+ → två, 1 → ett, sista → inga
const cardStack = document.querySelector(".card-stack");
function updateStack() {
  const under = session ? Math.max(0, session.queue.length - 1) : 0;
  const n = under >= 2 ? 2 : under;
  cardStack.classList.toggle("stack-2", n === 2);
  cardStack.classList.toggle("stack-1", n === 1);
  cardStack.classList.toggle("stack-0", n === 0);
}

// Högtalaren på kortet: ett tryck = läs upp en gång (tryck flera ggr för att höra igen)
function speakCurrent() {
  if (session && session.current) speak(session.current.front, subjectLang(currentSubject));
}

// Direkt Google-sökning i AI-läge (udm=50) på det utländska ordet, öppnas i webview.
// (Anropas från "Slå upp" i kortets …-meny. openExplore finns kvar oförändrad.)
function googleAiExploreUrl(term) {
  const label = subjectLang(currentSubject) ? langLabel(subjectLang(currentSubject)).toLowerCase() : "";
  const onLang = label ? ` på ${label}` : "";
  const q = `Kan du berätta om "${term}"${onLang} - vad är etymologin och vilka andra närliggande ord finns och vad är skillnaden? Kan du illustrera med foton/bilder?`;
  return `https://www.google.com/search?udm=50&q=${encodeURIComponent(q)}`;
}
function googleAiExplore(term) { return window.open(googleAiExploreUrl(term), "_blank"); }

// Google bildsökning (udm=2) på det utländska ordet – ren bildträff, inget prompt-krafs.
function googleImageSearchUrl(term) { return `https://www.google.com/search?udm=2&q=${encodeURIComponent(term)}`; }
function googleImageSearch(term) { return window.open(googleImageSearchUrl(term), "_blank"); }

// =========================================================================
//  Utforska ordet – betydelse (Wikipedia → Wiktionary) + bilder (Commons)
//  Allt nyckellöst och CORS-öppet, direkt från klienten. Stör inte passet.
// =========================================================================
const IMG_PER_PAGE = 9;

function wikiLang() {
  return (subjectLang(currentSubject) || "en").slice(0, 2).toLowerCase();
}

// Nivå 1-lemmatisering: ta bort inledande artikel så man söker på grundordet
// ("La tempesta" → "tempesta"). Hanterar även eliderade former ("l'acqua" → "acqua").
const ARTICLES = {
  it: ["il", "lo", "la", "i", "gli", "le", "un", "uno", "una"],
  fr: ["le", "la", "les", "un", "une", "des"],
  es: ["el", "la", "los", "las", "un", "una", "unos", "unas"],
  de: ["der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "eines", "einer"],
  en: ["the", "a", "an"],
  pt: ["o", "a", "os", "as", "um", "uma", "uns", "umas"],
};
const ELISIONS = { it: ["l", "un", "d", "dell", "all", "nell", "sull"], fr: ["l", "d", "j", "qu", "n", "s", "t", "m"], es: [], en: [] };

function stripArticle(term, lang) {
  let t = (term || "").trim();
  // Eliderad artikel först: "l'acqua", "un'amica", "d'arte" → ta bort prefixet före apostrofen
  const elide = ELISIONS[lang] || [];
  t = t.replace(/^([a-zàâäéèêëïîôöùûüçñ]{1,4})['’]\s*/i, (m, p) => elide.includes(p.toLowerCase()) ? "" : m);
  // Hel inledande artikel + mellanslag: "La tempesta" → "tempesta" (men inte om hela ordet ÄR artikeln)
  const arts = ARTICLES[lang] || [];
  const parts = t.split(/\s+/);
  if (parts.length > 1 && arts.includes(parts[0].toLowerCase())) t = parts.slice(1).join(" ");
  return t.trim() || (term || "").trim();
}

// Wikipedia-sammanfattning (ren text); saknas artikel → Wiktionary-definition.
async function fetchMeaning(lang, term) {
  try {
    const r = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
    if (r.ok) {
      const j = await r.json();
      if (j.extract && j.type !== "disambiguation") {
        return { source: "Wikipedia", text: j.extract, url: j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page };
      }
    }
  } catch (_) {}
  try {
    const r = await fetch(`https://${lang}.wiktionary.org/w/api.php?action=query&prop=extracts&explaintext=1&redirects=1&titles=${encodeURIComponent(term)}&format=json&origin=*`);
    const j = await r.json();
    const pages = (j.query && j.query.pages) || {};
    const p = Object.values(pages)[0];
    if (p && p.extract) {
      const text = p.extract.replace(/\n{3,}/g, "\n\n").trim().slice(0, 700);
      return { source: "Wiktionary", text, url: `https://${lang}.wiktionary.org/wiki/${encodeURIComponent(term)}` };
    }
  } catch (_) {}
  return null;
}

// Bildsök på Wikimedia Commons (filnamnrymd), thumbnails + offset för "ladda fler".
async function fetchCommonsImages(term, offset) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=${IMG_PER_PAGE}&gsroffset=${offset}&prop=imageinfo&iiprop=url&iiurlwidth=240&format=json&origin=*`;
  const j = await (await fetch(url)).json();
  const pages = (j.query && j.query.pages) ? Object.values(j.query.pages) : [];
  return pages
    .sort((a, b) => (a.index || 0) - (b.index || 0))
    .map((p) => p.imageinfo && p.imageinfo[0])
    .filter((ii) => ii && ii.thumburl)
    .map((ii) => ({ thumb: ii.thumburl, full: ii.url }));
}

function openExplore(term, onClose) {
  const lang = wikiLang();
  const initial = stripArticle(term, lang); // sök på grundordet (utan artikel)
  const m = openModal(`
    <div class="sheet-grip" aria-hidden="true"></div>
    <div class="modal-head"><h3>Utforska</h3></div>
    <div class="xpl-search">
      <input type="text" id="xpl-q" value="${esc(initial)}" autocomplete="off" autocapitalize="none" autocorrect="off" />
      <button class="xpl-go" id="xpl-go" title="Sök om" aria-label="Sök om">🔄</button>
    </div>
    <div class="xpl-sec">BETYDELSE</div>
    <div class="xpl-meaning" id="xpl-meaning"></div>
    <div class="xpl-sec">BILDER</div>
    <div class="xpl-imgs" id="xpl-imgs"></div>
    <button class="xpl-more hidden" id="xpl-more">Ladda fler bilder</button>
    <button class="xpl-google" id="xpl-google">🔎 Öppna på Google</button>
    <div class="modal-actions"><button class="btn-primary" id="m-ok">Stäng</button></div>`, onClose);
  m.querySelector("#m-ok").onclick = closeModal;
  enableSheetDismiss(m); // svep ner kraftigt (från toppen) för att stänga

  const meaningEl = m.querySelector("#xpl-meaning");
  const imgsEl = m.querySelector("#xpl-imgs");
  const moreBtn = m.querySelector("#xpl-more");
  const qInput = m.querySelector("#xpl-q");
  let imgOffset = 0;

  const loadMeaning = async (q) => {
    meaningEl.innerHTML = `<span class="xpl-muted">Laddar…</span>`;
    const r = await fetchMeaning(lang, q);
    if (!r) { meaningEl.innerHTML = `<span class="xpl-muted">Ingen betydelse hittades. Prova Google nedan.</span>`; return; }
    meaningEl.innerHTML = `<span class="xpl-src">${esc(r.source)}</span><span class="xpl-body">${esc(r.text)}</span>`;
  };

  const loadImages = async (q, append) => {
    if (!append) { imgsEl.innerHTML = `<span class="xpl-muted">Laddar bilder…</span>`; imgOffset = 0; }
    let imgs = [];
    try { imgs = await fetchCommonsImages(q, imgOffset); } catch (_) {}
    if (!append) imgsEl.innerHTML = "";
    if (!append && !imgs.length) { imgsEl.innerHTML = `<span class="xpl-muted">Inga bilder hittades.</span>`; moreBtn.classList.add("hidden"); return; }
    imgs.forEach((im) => {
      const el = document.createElement("img");
      el.src = im.thumb; el.loading = "lazy";
      el.onclick = () => window.open(im.full, "_blank");
      imgsEl.appendChild(el);
    });
    imgOffset += IMG_PER_PAGE;
    moreBtn.classList.toggle("hidden", imgs.length < IMG_PER_PAGE);
  };

  const run = (q) => { const t = (q || "").trim(); if (!t) return; loadMeaning(t); loadImages(t, false); };

  m.querySelector("#xpl-go").onclick = () => run(qInput.value);
  qInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); run(qInput.value); } });
  moreBtn.onclick = () => loadImages(qInput.value.trim(), true);
  m.querySelector("#xpl-google").onclick = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(qInput.value.trim() + " meaning")}`, "_blank");

  run(initial);
}

// Glödlampan: visas på prompt-sidan när man kör Från svenska (b2f) och kortet har en
// minnesregel. Tryck → visar BARA regeln (ledtråd) utan att avslöja svaret.
function updateHintBtn() { updateCardActions(); } // alias – klustret sköter allt

// Toggle "Automatisk uppläsning" längst ner – styr autoSpeak
const autospeakRow = $("autospeak-row");
const autospeakToggle = $("autospeak-toggle");
autospeakToggle.checked = autoSpeak;
autospeakToggle.addEventListener("change", () => {
  autoSpeak = autospeakToggle.checked;
  saveAutoSpeak();
});
// Visa toggeln bara om ämnet har en röst på enheten
function updateAutospeakRow() {
  // Dölj i handsfree – appen läser ju upp ändå, så toggeln är överflödig där.
  autospeakRow.classList.toggle("hidden", handsfreeActive || !hasVoiceFor(subjectLang(currentSubject)));
}

// Förladda röstlistan (laddas asynkront i vissa webbläsare)
if ("speechSynthesis" in window) {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => { speechSynthesis.getVoices(); updateSpeakBtn(); };
}

// ---- Handlingskluster i nederkant: kontextuell (🔊/💡) + ⋯-fjädermeny ----
// Fjäderns element skapas en gång och läggs i card-stack (samma koordinatsystem).
const fanScrim = document.createElement("div"); fanScrim.className = "fan-scrim"; cardStack.appendChild(fanScrim);
// Halvcirkeln ritas som SVG-båge (bara kurvan – ingen diameter-linje) med en mjuk
// radiell gradient-glow som fyllning (som i prototypen), inte en platt enfärg.
const SVGNS = "http://www.w3.org/2000/svg";
const fanBg = document.createElementNS(SVGNS, "svg"); fanBg.setAttribute("class", "fan-bg");
// Centrerad ELLIPS (objectBoundingBox → glowen sträcks till kupolens 2:1-form, som
// prototypens closest-side utan "circle") – mjukare/mindre stel än en äkta cirkel.
fanBg.innerHTML =
  '<defs><radialGradient id="fan-grad" cx="50%" cy="50%" r="55%">' +
  '<stop offset="0%" stop-color="#5b8cff" stop-opacity="0.20"/>' +
  '<stop offset="72%" stop-color="#5b8cff" stop-opacity="0.06"/>' +
  '<stop offset="100%" stop-color="#5b8cff" stop-opacity="0"/>' +
  '</radialGradient></defs>' +
  '<path fill="url(#fan-grad)" stroke="rgba(91,140,255,0.34)" stroke-width="1"/>';
const fanArc = fanBg.querySelector("path");
cardStack.appendChild(fanBg);
// Ordning vänster→höger i bågen: Bildsök (vänster) … Slå upp (höger). Inga dubbletter
// av Lyssna/Ledtråd – de bor i den kontextuella knappen bredvid ⋯.
// Stiliserade linjeikoner (samma som gamla ⋯-menyn) för Slå upp/Bildsök – inte färgemoji.
const FAN_SVG_GLOBE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9s1.4-6.4 3.9-9z"/></svg>';
const FAN_SVG_IMAGE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
const FAN_SVG_EDIT = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17z"/><line x1="14" y1="7" x2="17" y2="10"/></svg>';
const FAN_ITEMS = [
  { key: "image",  ic: FAN_SVG_IMAGE, label: "Bildsök" },
  { key: "edit",   ic: FAN_SVG_EDIT,  label: "Redigera" },
  { key: "star",   ic: "☆",           label: "Stjärna" },
  { key: "lookup", ic: FAN_SVG_GLOBE, label: "Webbsök" },
];
const fanOpts = FAN_ITEMS.map((it, i) => {
  const el = document.createElement("div"); el.className = "fan-opt"; el.dataset.key = it.key;
  el.innerHTML = `<span class="ic">${it.ic}</span>${it.label}`;
  el.addEventListener("click", (e) => { e.stopPropagation(); if (fanTapMode) selectFan(i, "tapp"); });
  cardStack.appendChild(el); return el;
});

const FAN_SPAN = 156;
function fanAngles(n){ const s = -FAN_SPAN/2; return Array.from({length:n}, (_,i)=> n===1?0 : s + FAN_SPAN*i/(n-1)); }
function fanRadius(n){ if(n<2) return 112; const g = FAN_SPAN/(n-1); return Math.max(104, Math.min(140, 84/(2*Math.sin(g/2*Math.PI/180)))); }

let fanOpen = false, fanMoved = false, fanHot = -1, fanTapMode = false, fanPressing = false, fanOrigin = null, fanSX = 0, fanSY = 0;

function placeFan(){
  const sr = cardStack.getBoundingClientRect(), br = moreBtn.getBoundingClientRect();
  // Ankra horisontellt i kortets mitt (symmetrisk fjäder som ryms), vertikalt vid ⋯.
  fanOrigin = { x: sr.width/2, y: br.top + br.height/2 - sr.top };
  const angs = fanAngles(FAN_ITEMS.length), R = fanRadius(FAN_ITEMS.length);
  fanOpts.forEach((el,i)=>{ const rad = angs[i]*Math.PI/180; el.style.left = (fanOrigin.x + R*Math.sin(rad))+"px"; el.style.top = (fanOrigin.y - R*Math.cos(rad))+"px"; });
  const D = R + 58;
  fanBg.style.width = (2*D)+"px"; fanBg.style.height = D+"px"; fanBg.style.left = (fanOrigin.x-D)+"px"; fanBg.style.top = (fanOrigin.y-D)+"px";
  fanBg.setAttribute("viewBox", `0 0 ${2*D} ${D}`);
  fanArc.setAttribute("d", `M0 ${D} A ${D} ${D} 0 0 1 ${2*D} ${D}`); // öppen båge → ingen bottenlinje
  // Gradienten är objectBoundingBox (ellips) → behöver inte sättas per D.
}
function openFan(){
  if(!session || !session.current) return;
  const fav = isFav(session.current), si = FAN_ITEMS.findIndex(x=>x.key==="star"), ico = fanOpts[si].querySelector(".ic");
  ico.textContent = fav ? "★" : "☆"; ico.classList.toggle("on", fav); fanOpts[si].lastChild.textContent = fav ? "Stjärnmärkt" : "Stjärna";
  placeFan(); cardStack.classList.add("fan-open"); moreBtn.classList.add("armed"); fanOpen = true;
}
function closeFan(){ if(!cardStack) return; cardStack.classList.remove("fan-open"); if(moreBtn) moreBtn.classList.remove("armed"); fanOpen = false; fanTapMode = false; fanPressing = false; setFanHot(-1); }
function setFanHot(i){ fanHot = i; fanOpts.forEach((el,k)=>el.classList.toggle("hot", k===i)); }
function nearestFan(px,py){
  const dx = px-fanOrigin.x, dy = py-fanOrigin.y; if(Math.hypot(dx,dy) < 36) return -1;
  let ang = Math.atan2(dx,-dy)*180/Math.PI; if(ang<0) ang+=360; const angs = fanAngles(FAN_ITEMS.length); let best=-1, bd=999;
  angs.forEach((a,i)=>{ a=(a+360)%360; let d=Math.abs(((ang-a+540)%360)-180); if(d<bd){bd=d;best=i;} }); return bd<26?best:-1;
}
// Slå upp & Bildsök (C1): öppna helst i ny flik/sheet via window.open – på iOS bara
// tillåtet från ett TAPP, så vid ett glid där returnerar den null och vi faller
// tillbaka till samma flik (location.href). Ger fin sheet-upplevelse där det går
// (tapp överallt, glid på Android/desktop) och samma-flik bara i iOS-glid-fallet.
// OBS: inget "noopener" – det får window.open att returnera null ÄVEN vid lyckat
// öppnande i vissa browsers, vilket skulle trigga en falsk fallback.
function openExternal(url){
  let w = null;
  try { w = window.open(url, "_blank"); } catch(_) { w = null; }
  if (w) return "tab";                       // ny flik/sheet – vi stannar kvar i appen
  markExternalNav(); location.href = url;    // blockerad (iOS-glid) → samma flik
  return "same";
}
function selectFan(i, src){
  if(i<0 || i>=FAN_ITEMS.length) return;
  const key = FAN_ITEMS[i].key, c = session && session.current;
  src = src || "tapp"; // 'glid' | 'tapp' – för analytics
  setFanHot(-1);
  if(!c){ closeFan(); return; }
  if(key==="image"){ track("bildsok/"+src, {nav:true}); closeFan(); openExternal(googleImageSearchUrl(c.front)); return; }
  if(key==="lookup"){ track("slaupp/"+src, {nav:true}); closeFan(); openExternal(googleAiExploreUrl(c.front)); return; }
  if(key==="edit"){ track("redigera"); editCurrentCard(); }
  else if(key==="star"){ const on = toggleFav(c); track(on ? "stjarnmark-pa" : "stjarnmark-av"); flash(on ? "⭐ Stjärnmärkt" : "Stjärna borttagen", 1800); }
  closeFan();
}

moreBtn.addEventListener("pointerdown",(e)=>{ e.stopPropagation(); e.preventDefault(); moreBtn.setPointerCapture(e.pointerId);
  fanSX = e.clientX; fanSY = e.clientY; fanMoved = false;
  if(fanOpen){ closeFan(); return; } // andra trycket / tryck ⋯ igen → stäng
  openFan(); fanPressing = true; setFanHot(-1);
});
moreBtn.addEventListener("pointermove",(e)=>{ if(!fanOpen || !fanPressing) return;
  if(Math.hypot(e.clientX-fanSX, e.clientY-fanSY) > 8) fanMoved = true;
  const sr = cardStack.getBoundingClientRect(); setFanHot(nearestFan(e.clientX-sr.left, e.clientY-sr.top));
});
// Släpp-hantering: allt sker på pointerup. (Tidigare kördes släppet i touchend med en
// guard mot pointerup eftersom window.open på iOS bara får öppnas från tapp/touchend.
// Men Slå upp/Bildsök navigerar numera via location.href som saknar den gest-
// begränsningen – så den bräckliga dubbelvägen togs bort. Den kunde läcka guard-läget
// mellan gester så att nästa glid avbröts, dvs "menyn blinkar till men gör inget".)
function fanRelease(){
  if(!fanOpen) return;
  if(fanPressing && fanMoved){ if(fanHot>=0) selectFan(fanHot, "glid"); else closeFan(); } // glid: välj, annars (mitten) stäng
  else if(fanPressing){ fanPressing = false; fanTapMode = true; }                        // rent tapp → låt stå för tapp-val
}
moreBtn.addEventListener("pointerup",()=>{ fanRelease(); });
moreBtn.addEventListener("pointercancel",()=>{ if(fanPressing && !fanTapMode) closeFan(); fanPressing = false; });
fanScrim.addEventListener("pointerdown",(e)=>{ e.stopPropagation(); });
fanScrim.addEventListener("click",(e)=>{ e.stopPropagation(); if(fanOpen) closeFan(); });

// 🔊 (uttala) uppe till höger på utländska sidan; 💡 (ledtråd) nere till höger på svenska.
speakBtn.addEventListener("pointerdown",(e)=>e.stopPropagation());
speakBtn.addEventListener("click",(e)=>{ e.stopPropagation(); track("uttala"); speakCurrent(); });
hintBtn.addEventListener("pointerdown",(e)=>e.stopPropagation());
hintBtn.addEventListener("click",(e)=>{
  e.stopPropagation();
  const c = session && session.current;
  if(c && c.hint){ track("ledtrad-visad"); cardFrontHint.textContent = c.hint; cardFrontHint.classList.remove("hidden"); updateCardActions(); }
});

// Visar/gömmer ⋯-fliken samt hörnknapparna 🔊 (utländska+röst) och 💡 (svenska+minnesregel).
function updateCardActions(){
  // Medan kortet dras eller flyger ska knapparna hållas dolda. Annars kan en
  // fördröjd timer (t.ex. showSpeakSoon efter en flipp) återvisa fliken mitt i ett
  // svep, så den ligger kvar på kortets gamla plats medan kortet flyttat sig.
  // (Buggrapport: ⋯-menyn "hänger kvar" vid drag.) Settlade lägen (snapBack:s
  // transitionend, flyOut-slutet, loadCard) kör updateCardActions igen och visar rätt.
  if (dragging || animating) { hideCardActions(); return; }
  const hasCard = !!(session && session.current);
  moreBtn.classList.toggle("hidden", !hasCard);
  if(!hasCard){ closeFan(); speakBtn.classList.add("hidden"); hintBtn.classList.add("hidden"); return; }
  const foreign = foreignVisible(), lang = subjectLang(currentSubject), c = session.current;
  speakBtn.classList.toggle("hidden", !(foreign && lang && hasVoiceFor(lang)));
  hintBtn.classList.toggle("hidden", !(!foreign && c.hint && cardFrontHint.classList.contains("hidden")));
  // Fliken ska kontrastera mot kortytan bakom: baksidan (surface-2) → mörkare front-färg.
  moreBtn.classList.toggle("on-back", card.classList.contains("flipped"));
}
// Fallback-vägen i openExternal navigerar i samma flik (location.href) → Google-sidan
// hamnar i FRAMÅT-historiken. På iOS kan ett vänstersvep på ett kort (som startar nära
// högerkanten) då råka trigga Safaris framåt-gest och kasta tillbaka dig till AI-vyn.
// markExternalNav() flaggar att vi lämnar frivilligt; vid retur nollar vi framåt-
// stacken med en pushState (trunkerar framåt-historiken enligt spec) så det inte
// finns någon sida att svepa fram till. Scoped till just den resan – vanlig
// navigering rörs inte.
function markExternalNav(){ try { sessionStorage.setItem("flippa-ext-nav", "1"); } catch(_){} }
// Säkerställ att fjädern är stängd när man kommer tillbaka (t.ex. från Google via C1,
// bfcache-återställning). Annars kan menyn ligga kvar öppen.
window.addEventListener("pageshow", () => {
  closeFan();
  try {
    if (sessionStorage.getItem("flippa-ext-nav")) {
      sessionStorage.removeItem("flippa-ext-nav");
      history.pushState(null, "", location.href); // trunkerar framåt-stacken (Google-sidan)
    }
  } catch(_){}
});
// Bakåtkompatibla alias (kvarvarande anrop)
function updateCardMenuBtn() { updateCardActions(); }
function closeCardMenu() { closeFan(); }

async function editCurrentCard() {
  if (!session || !session.current) return;
  const c = session.current;
  // hitta lektionen ordet ligger i (i ett "Dags att öva"-pass kan korten komma från flera lektioner)
  let lid = session.lessonId;
  if (!lid) {
    const les = currentSubject.lessons.find((l) => l.cards.some((x) => x.id === c.id));
    lid = les && les.id;
  }
  if (!lid) return;
  const subj = freshSubject();
  const res = await askWord(c.front, c.back, c.hint, { allowDelete: true, explore: !!subjectLang(subj), lessons: subj.lessons, lessonId: lid, prio: c.prio });
  if (!res) return;
  if (res._delete) {
    const ok = await confirmDanger("Ta bort ord?", `"${c.front}" tas bort.`);
    if (!ok) return;
    removeCard(currentSubject.id, lid, c.id);
    session.queue = session.queue.filter((x) => x.id !== c.id); // ut ur passet direkt
    undoStack = []; // det borttagna kortet ska inte gå att ångra tillbaka
    loadCard(); // visa nästa (eller avsluta om kön är tom)
    return;
  }
  // bevara inlärningen: flytta SRS-lådorna från gamla ordnyckeln till den nya
  ["f2b", "b2f"].forEach((dir) => {
    const oldK = srsKey(c, dir);
    const newK = `${normPart(res.front)}|${normPart(res.back)}|${dir}`;
    if (oldK !== newK && srs[oldK]) srs[newK] = srs[oldK];
  });
  saveSRS();
  c.front = res.front;
  c.back = res.back;
  c.hint = res.hint || null;
  if (res.prio !== c.prio) track("prio-justerad");
  c.prio = (res.prio === 1 || res.prio === 2 || res.prio === 3) ? res.prio : null;
  if (res.lessonId && res.lessonId !== lid) {
    moveCard(currentSubject.id, lid, res.lessonId, c.id, res.front, res.back, res.hint, res.prio);
  } else {
    updateCard(currentSubject.id, lid, c.id, res.front, res.back, res.hint, res.prio);
  }
  // uppdatera visat kort direkt
  const showFrontFirst = session.shownDir === "f2b";
  cardFrontText.textContent = showFrontFirst ? c.front : c.back;
  cardAnswer.textContent = showFrontFirst ? c.back : c.front;
  cardHint.textContent = !showFrontFirst ? (c.hint || "") : "";
  cardFrontHint.textContent = ""; cardFrontHint.classList.add("hidden");
  updateHintBtn();
}

// =========================================================================
//  Swipe-mekanik (pointer)
// =========================================================================
let startX = 0, startY = 0, dragging = false, didSwipe = false, animating = false;
const THRESH = 80;
const ROT = 0.06;

function setDrag(dx, dy) {
  const deg = dx * ROT;
  card.style.transform = `translateX(${dx}px) translateY(${dy}px) rotate(${deg}deg)`;
}

function snapBack() {
  card.classList.add("snapping");
  card.style.transform = "";
  card.addEventListener("transitionend", () => { card.classList.remove("snapping"); updateCardActions(); }, { once: true });
}

function flyOut(grade) {
  animating = true;
  const cls = grade === "good" ? "fly-right" : grade === "easy" ? "fly-up" : grade === "hard" ? "fly-down" : "fly-left";
  card.classList.add(cls);
  setTimeout(() => {
    card.classList.remove("fly-right", "fly-left", "fly-up", "fly-down");
    card.style.transform = "";
    answer(grade);
    card.classList.add("emerge");
    setTimeout(() => {
      card.classList.remove("emerge");
      animating = false;
      updateCardActions(); // settlat läge efter animationen: visa knapparna för nästa kort
    }, 260);
  }, 220);
}

card.addEventListener("click", () => {
  if (didSwipe || animating) return;
  if (fanOpen) { closeFan(); return; } // ett tryck utanför fjädern stänger den (utan att vända kortet)
  card.classList.toggle("flipped");
  showSpeakSoon(460); // döljer klustret och visar rätt läge (inkl. ledtråd) efter flippen
});

card.addEventListener("pointerdown", (e) => {
  if (animating) return;
  startX = e.clientX;
  startY = e.clientY;
  dragging = true;
  didSwipe = false;
  hideCardActions(); // dölj kort-knapparna direkt när man tar i kortet
  closeFan();
  card.setPointerCapture(e.pointerId);
});

card.addEventListener("pointermove", (e) => {
  if (!dragging || animating) return;
  setDrag(e.clientX - startX, e.clientY - startY);
});

card.addEventListener("pointerup", (e) => {
  if (!dragging || animating) return;
  dragging = false;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const adx = Math.abs(dx), ady = Math.abs(dy);

  if (ady > THRESH && ady > adx) {
    didSwipe = true;
    const g = dy < 0 ? "easy" : "hard";
    showFeedback(g);
    flyOut(g);
  } else if (dx > THRESH) {
    didSwipe = true;
    showFeedback("good");
    flyOut("good");
  } else if (dx < -THRESH) {
    didSwipe = true;
    showFeedback("fail");
    flyOut("fail");
  } else {
    snapBack();
  }
});

card.addEventListener("pointercancel", () => {
  if (!dragging) return;
  dragging = false;
  snapBack();
});

// =========================================================================
//  Modaler
// =========================================================================
const modalRoot = $("modal-root");

let modalOnClose = null; // körs en gång när nuvarande modal stängs (oavsett väg: knapp/backdrop/svep)

function closeModal() {
  modalRoot.classList.add("hidden");
  modalRoot.innerHTML = "";
  const cb = modalOnClose;
  modalOnClose = null;
  if (cb) cb();
}

function openModal(innerHTML, onClose) {
  modalOnClose = onClose || null;
  modalRoot.innerHTML = `<div class="modal-backdrop"></div><div class="modal">${innerHTML}</div>`;
  modalRoot.classList.remove("hidden");
  modalRoot.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  return modalRoot.querySelector(".modal");
}

// Svep-ner-för-att-stänga på en sheet-modal. Aktiveras bara när man är högst upp
// i scrollen och drar nedåt → krockar inte med vanlig scrollning av innehållet.
function enableSheetDismiss(modal) {
  const backdrop = modalRoot.querySelector(".modal-backdrop");
  let startY = 0, startScroll = 0, dy = 0, mode = null; // null | "maybe" | "drag"
  let lastY = 0, lastT = 0, vy = 0; // flick-hastighet (px/ms, positiv = nedåt)
  modal.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button > 0) return;
    startY = e.clientY; startScroll = modal.scrollTop; dy = 0; mode = "maybe";
    lastY = e.clientY; lastT = performance.now(); vy = 0;
  });
  modal.addEventListener("pointermove", (e) => {
    if (mode === null) return;
    const d = e.clientY - startY;
    if (mode === "maybe") {
      if (Math.abs(d) < 5) return;
      // Bara om vi är i toppen och drar nedåt → annars låt scroll ske
      if (d > 0 && startScroll <= 1) { mode = "drag"; modal.style.transition = "none"; try { modal.setPointerCapture(e.pointerId); } catch (_) {} }
      else { mode = null; return; }
    }
    e.preventDefault();
    const now = performance.now();
    if (now > lastT) vy = (e.clientY - lastY) / (now - lastT);
    lastY = e.clientY; lastT = now;
    dy = Math.max(0, d);
    modal.style.transform = `translateY(${dy}px)`;
    if (backdrop) backdrop.style.opacity = String(Math.max(0, 1 - dy / 450));
  }, { passive: false });
  const end = () => {
    if (mode !== "drag") { mode = null; return; }
    mode = null;
    // Stäng vid kort drag (>55px) ELLER snabb knyck nedåt (flick), annars snäpp tillbaka
    if (dy > 55 || vy > 0.45) {
      modal.style.transition = "transform 0.2s ease-in";
      modal.style.transform = "translateY(110%)";
      if (backdrop) { backdrop.style.transition = "opacity 0.2s"; backdrop.style.opacity = "0"; }
      setTimeout(closeModal, 190);
    } else {
      modal.style.transition = "transform 0.22s ease";
      modal.style.transform = "translateY(0)";
      if (backdrop) { backdrop.style.transition = "opacity 0.2s"; backdrop.style.opacity = ""; }
    }
  };
  modal.addEventListener("pointerup", end);
  modal.addEventListener("pointercancel", end);
}

// Egen dropdown som matchar appens tema (ersätter native <select>).
// items: [{value, label}], selected: value, onChange(value) (valfri).
// Returnerar { el, value (get/set) } där `el` monteras i DOM.
function buildSelect(items, selected, onChange, opts = {}) {
  const onToggle = opts.onToggle; // (isOpen) – för ev. backdrop
  const el = document.createElement("div");
  el.className = "cs";
  let cur = items.some((i) => i.value === selected) ? selected : (items[0] && items[0].value);
  const labelFor = (v) => (items.find((i) => i.value === v) || {}).label || "";
  el.innerHTML = `
    <button type="button" class="cs-btn"><span class="cs-cur">${esc(labelFor(cur))}</span><span class="cs-car">▾</span></button>
    <div class="cs-list">${items
      .map((i) => `<button type="button" class="cs-opt ${i.value === cur ? "on" : ""}" data-v="${esc(i.value)}">${esc(i.label)}</button>`)
      .join("")}</div>`;
  const btn = el.querySelector(".cs-btn");
  const list = el.querySelector(".cs-list");
  const close = () => { list.classList.remove("open"); if (onToggle) onToggle(false); };
  const apply = (v, fire) => {
    cur = v;
    el.querySelector(".cs-cur").textContent = labelFor(cur);
    list.querySelectorAll(".cs-opt").forEach((o) => o.classList.toggle("on", o.dataset.v === cur));
    if (fire && onChange) onChange(cur);
  };
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    // stäng ev. andra öppna väljare i samma modal
    el.closest(".modal")?.querySelectorAll(".cs-list").forEach((o) => { if (o !== list) o.classList.remove("open"); });
    list.classList.toggle("open");
    if (onToggle) onToggle(list.classList.contains("open"));
  });
  list.querySelectorAll(".cs-opt").forEach((opt) => {
    opt.addEventListener("click", (e) => { e.stopPropagation(); apply(opt.dataset.v, true); close(); });
  });
  // klick utanför stänger
  setTimeout(() => {
    const m = el.closest(".modal");
    m && m.addEventListener("click", (e) => { if (!el.contains(e.target)) close(); });
  }, 0);
  return { el, get value() { return cur; }, set value(v) { apply(v, false); } };
}

function askPassword(title) {
  return new Promise((resolve) => {
    const m = openModal(`
      <h3>${esc(title)}</h3>
      <input type="password" id="m-input" autocomplete="off" autocapitalize="none" autocorrect="off" />
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-primary" id="m-ok">Lås upp</button>
      </div>`);
    const input = m.querySelector("#m-input");
    input.focus();
    const ok = () => { const v = input.value; closeModal(); resolve(v); };
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(null); };
    m.querySelector("#m-ok").onclick = ok;
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") ok(); });
  });
}

function askName(title, value = "", okLabel = "Spara") {
  return new Promise((resolve) => {
    const m = openModal(`
      <h3>${esc(title)}</h3>
      <label>Namn</label>
      <input type="text" id="m-input" value="${esc(value)}" autocomplete="off" />
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-primary" id="m-ok">${esc(okLabel)}</button>
      </div>`);
    const input = m.querySelector("#m-input");
    input.focus();
    input.select();
    const ok = () => { closeModal(); resolve(input.value.trim() || null); };
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(null); };
    m.querySelector("#m-ok").onclick = ok;
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") ok(); });
  });
}

function askSubject(title, name = "", lang = "", allowDelete = false) {
  // Ägaren väljs INTE här – den ges av aktiv profil (nytt) resp. behålls (redigering),
  // så man inte kan skapa eller flytta ett område åt en annan användare.
  return new Promise((resolve) => {
    const delBtn = allowDelete ? `<button class="full-btn danger" id="m-del">${TRASH_ICON_SVG} Ta bort ämne</button>` : "";
    const m = openModal(`
      <h3>${esc(title)}</h3>
      <label>Språk (för uttal)</label>
      <div id="m-lang-mount"></div>
      <label>Namn</label>
      <input type="text" id="m-name" value="${esc(name)}" autocomplete="off" />
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-primary" id="m-ok">Spara</button>
      </div>${delBtn}`);
    const nameI = m.querySelector("#m-name");
    // När man väljer språk föreslås namnet – men bara om namnet är tomt eller är
    // kvar på förra förslaget (så ett eget namn inte skrivs över).
    let suggested = "";
    const langSel = buildSelect(langOptionsForPicker(lang), lang, (code) => {
      if (!code) return;
      const cur = nameI.value.trim();
      if (cur === "" || cur === suggested) { suggested = langLabel(code); nameI.value = suggested; }
    });
    m.querySelector("#m-lang-mount").appendChild(langSel.el);
    if (name) { nameI.focus(); nameI.select(); } // fokusera bara vid redigering (befintligt namn)
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(null); };
    m.querySelector("#m-ok").onclick = () => {
      const n = nameI.value.trim();
      const l = langSel.value;
      closeModal();
      resolve(n ? { name: n, lang: l } : null);
    };
    if (allowDelete) m.querySelector("#m-del").onclick = () => { closeModal(); resolve({ delete: true }); };
    nameI.addEventListener("keydown", (e) => { if (e.key === "Enter") m.querySelector("#m-ok").click(); });
  });
}

// Redigera lektion: namn + (valfritt) ta bort. Spegling av askSubject, utan språk.
function askLesson(title, name = "", allowDelete = false) {
  return new Promise((resolve) => {
    const delBtn = allowDelete ? `<button class="full-btn danger" id="ml-del">${TRASH_ICON_SVG} Ta bort lektion</button>` : "";
    const m = openModal(`
      <h3>${esc(title)}</h3>
      <label>Namn</label>
      <input type="text" id="ml-name" value="${esc(name)}" autocomplete="off" />
      <div class="modal-actions">
        <button class="btn-secondary" id="ml-cancel">Avbryt</button>
        <button class="btn-primary" id="ml-ok">Spara</button>
      </div>${delBtn}`);
    const nameI = m.querySelector("#ml-name");
    if (name) { nameI.focus(); nameI.select(); }
    m.querySelector("#ml-cancel").onclick = () => { closeModal(); resolve(null); };
    m.querySelector("#ml-ok").onclick = () => { const n = nameI.value.trim(); closeModal(); resolve(n ? { name: n } : null); };
    if (allowDelete) m.querySelector("#ml-del").onclick = () => { closeModal(); resolve({ delete: true }); };
    nameI.addEventListener("keydown", (e) => { if (e.key === "Enter") m.querySelector("#ml-ok").click(); });
  });
}

// Dubblettkontroll: kollar om de utländska orden (front) redan finns i området
// (case-insensitive). Returnerar korten som ska läggas till, eller null vid avbryt.
function confirmDuplicates(subject, cards) {
  return new Promise((resolve) => {
    const where = new Map(); // normaliserad front -> lektionsnamn (första träffen)
    subject.lessons.forEach((l) => l.cards.forEach((c) => {
      const k = normPart(c.front);
      if (k && !where.has(k)) where.set(k, l.name);
    }));
    const isDup = (c) => where.has(normPart(c.front));
    const dups = cards.filter(isDup);
    if (!dups.length) { resolve(cards); return; }
    const nonDups = cards.filter((c) => !isDup(c));
    let title, body;
    if (dups.length === 1) {
      title = "Dubblett";
      const f = dups[0].front.trim();
      const word = f.charAt(0).toUpperCase() + f.slice(1);
      body = `<p class="modal-hint">${esc(word)} finns redan (i ${esc(where.get(normPart(dups[0].front)))}).</p>`;
    } else {
      title = "Dubbletter";
      const items = dups.map((c) => `<li>${esc(c.front.trim())} <span class="dup-lesson">(${esc(where.get(normPart(c.front)))})</span></li>`).join("");
      body = `<p class="modal-hint">Följande ord finns redan:</p><ul class="dup-list">${items}</ul>`;
    }
    const m = openModal(`<h3>${title}</h3>${body}
      <div class="modal-actions">
        <button class="btn-primary" id="dup-skip">Hoppa över</button>
        <button class="btn-secondary" id="dup-add">Lägg till igen</button>
      </div>`);
    modalRoot.querySelector(".modal-backdrop").addEventListener("click", () => resolve(null));
    m.querySelector("#dup-skip").onclick = () => { closeModal(); resolve(nonDups); };
    m.querySelector("#dup-add").onclick = () => { closeModal(); resolve(cards); };
  });
}

function askWords() {
  return new Promise((resolve) => {
    const m = openModal(`
      <h3>Lägg till ord</h3>
      <p class="modal-hint">Ett ord per rad: <b>utländskt;svenskt</b> — t.ex. <code>grazie;tack</code>.<br>Valfritt: lägg prio (1–3) sist, t.ex. <code>grazie;tack;1</code></p>
      <textarea id="m-text" autocapitalize="none" autocorrect="off" placeholder="ciao;hej&#10;grazie;tack;1"></textarea>
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-primary" id="m-ok">Lägg till</button>
      </div>`);
    const ta = m.querySelector("#m-text");
    ta.focus();
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(null); };
    m.querySelector("#m-ok").onclick = () => { const v = ta.value; closeModal(); resolve(v); };
  });
}

// opts: { allowDelete, explore, lessons, lessonId }
// Returnerar { front, back, hint, lessonId } | { _delete:true } | null
function askWord(front, back, hint, opts = {}) {
  const { allowDelete, explore, lessons, lessonId, prio } = opts;
  const PRIO_NAMES = { 1: "Kärna", 2: "Vanlig", 3: "Nisch" };
  const showLesson = lessons && lessons.length > 1; // bara meningsfullt att flytta om det finns fler lektioner
  return new Promise((resolve) => {
    // (åter)öppna redigeringen – samma promise lever vidare tills man Sparar/Avbryter/raderar.
    const open = (f, b, h) => {
      const globeBtn = explore ? `<button class="modal-globe" id="m-globe" title="Utforska ordet" aria-label="Utforska ordet">${GLOBE_ICON_SVG}</button>` : "";
      const delBtn = allowDelete ? `<button class="modal-del" id="m-del" title="Ta bort ord" aria-label="Ta bort ord">${TRASH_ICON_SVG}</button>` : "";
      const lessonBlock = showLesson ? `
      <label>Lektion</label>
      <div id="m-lesson-mount"></div>` : "";
      const m = openModal(`
      <div class="modal-head"><h3>Redigera ord</h3><div class="modal-head-btns">${globeBtn}${delBtn}</div></div>
      <label>Utländskt (framsida)</label>
      <input type="text" id="m-front" value="${esc(f)}" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" />
      <label>Svenska (baksida)</label>
      <input type="text" id="m-back" value="${esc(b)}" autocomplete="off" autocapitalize="none" lang="sv" spellcheck="true" />
      <label>Minnesregel (valfritt)</label>
      <textarea id="m-hint" rows="2" placeholder="t.ex. liknar engelskans …" autocapitalize="sentences" lang="sv" spellcheck="true">${esc(h || "")}</textarea>
      <label>Prio</label>
      <div class="prio-segs" id="m-prio">
        <button type="button" data-lvl="1"><span class="prio-dot p1"></span>1</button>
        <button type="button" data-lvl="2"><span class="prio-dot p2"></span>2</button>
        <button type="button" data-lvl="3"><span class="prio-dot p3"></span>3</button>
      </div>
      <p class="prio-seg-note" id="m-prio-note"></p>
      ${lessonBlock}
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-primary" id="m-ok">Spara</button>
      </div>`);
      let lessonSel = null;
      if (showLesson) {
        lessonSel = buildSelect(lessons.map((l) => ({ value: l.id, label: l.name })), lessonId, null);
        m.querySelector("#m-lesson-mount").appendChild(lessonSel.el);
      }
      const vals = () => ({
        f: m.querySelector("#m-front").value.trim(),
        b: m.querySelector("#m-back").value.trim(),
        h: m.querySelector("#m-hint").value.trim(),
      });
      // Prio-segment: ingen vald = ovärderat (fältet lagras aldrig som default).
      // Tryck på vald igen → avmarkera. Explicit val 1/2/3 sparas.
      let curPrio = (prio === 1 || prio === 2 || prio === 3) ? prio : null;
      const prioNote = m.querySelector("#m-prio-note");
      const renderPrio = () => {
        m.querySelectorAll("#m-prio button").forEach((b) => b.classList.toggle("on", Number(b.dataset.lvl) === curPrio));
        prioNote.textContent = curPrio ? `Prio ${curPrio} · ${PRIO_NAMES[curPrio]}` : "Ingen prio satt – körs som Vanlig";
      };
      m.querySelectorAll("#m-prio button").forEach((b) => { b.onclick = () => {
        const lvl = Number(b.dataset.lvl);
        curPrio = curPrio === lvl ? null : lvl;
        renderPrio();
      }; });
      renderPrio();
      // Vid REDIGERING (allowDelete) fokuseras inget fält → tangentbordet ligger nere
      // och man får överblick över dialogen (vi vet ändå inte vad som ska ändras).
      // Vid tillägg av nytt ord fokuseras första fältet så man kan börja skriva direkt.
      if (!allowDelete) m.querySelector("#m-front").focus();
      m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(null); };
      if (allowDelete) m.querySelector("#m-del").onclick = () => { closeModal(); resolve({ _delete: true }); };
      if (explore) m.querySelector("#m-globe").onclick = () => {
        const v = vals();
        googleAiExplore(v.f || f); // Google AI (samma som kortets Slå upp); redigeringsrutan ligger kvar bakom
      };
      m.querySelector("#m-ok").onclick = () => {
        const v = vals();
        const chosenLid = lessonSel ? lessonSel.value : lessonId;
        closeModal();
        resolve(v.f && v.b ? { front: v.f, back: v.b, hint: v.h, lessonId: chosenLid, prio: curPrio } : null);
      };
    };
    open(front, back, hint);
  });
}

function confirmPrimary(title, message, okLabel) {
  return new Promise((resolve) => {
    const m = openModal(`
      <h3>${esc(title)}</h3>
      <p class="modal-hint">${esc(message)}</p>
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-primary" id="m-ok">${esc(okLabel)}</button>
      </div>`);
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(false); };
    m.querySelector("#m-ok").onclick = () => { closeModal(); resolve(true); };
  });
}

function confirmDanger(title, message, okLabel = "Ta bort") {
  return new Promise((resolve) => {
    const m = openModal(`
      <h3>${esc(title)}</h3>
      <p class="modal-hint">${esc(message)}</p>
      <div class="modal-actions">
        <button class="btn-secondary" id="m-cancel">Avbryt</button>
        <button class="btn-danger" id="m-ok">${esc(okLabel)}</button>
      </div>`);
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(false); };
    m.querySelector("#m-ok").onclick = () => { closeModal(); resolve(true); };
  });
}

function actionSheet(title, actions) {
  return new Promise((resolve) => {
    const btns = actions
      .map((a, i) => `<button class="sheet-btn ${a.danger ? "danger" : ""}" data-i="${i}">${esc(a.label)}</button>`)
      .join("");
    const m = openModal(`<h3>${esc(title)}</h3>${btns}
      <div class="modal-actions"><button class="btn-secondary" id="m-cancel">Avbryt</button></div>`);
    m.querySelector("#m-cancel").onclick = () => { closeModal(); resolve(null); };
    m.querySelectorAll(".sheet-btn").forEach((b) => {
      b.onclick = () => { closeModal(); resolve(actions[+b.dataset.i].value); };
    });
  });
}

function parseLines(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf(";");
      if (i < 0) return null;
      const front = line.slice(0, i).trim();
      let back = line.slice(i + 1).trim();
      // Valfri tredje kolumn: slutar raden på ;1 ;2 eller ;3 tolkas det som prio.
      // Allt annat efter första ; räknas som baksida (som får innehålla ;).
      let prio = null;
      const j = back.lastIndexOf(";");
      if (j >= 0) {
        const tail = back.slice(j + 1).trim();
        if (tail === "1" || tail === "2" || tail === "3") {
          prio = parseInt(tail, 10);
          back = back.slice(0, j).trim();
        }
      }
      if (!front || !back) return null;
      return prio ? { front, back, prio } : { front, back };
    })
    .filter(Boolean);
}

function flash(msg, ms = 3000) {
  showStatus(msg);
  setTimeout(() => showStatus(null), ms);
}

// Achievement-banner som glider in ovanifrån vid milstolpe. kind: "day" | "week".
let achTimer = null;
function dismissAchievement() {
  const el = $("achievement");
  if (!el) return;
  el.classList.remove("show"); // glider tillbaka upp (transform-transition 0.55s)
  setTimeout(() => el.remove(), 600);
}
// Dagsmilstolpar per NIVÅ-index (inte fast antal, eftersom nivåerna är inställbara).
// Översta nivån firas med konfetti (extra stort).
const DAY_TIER_STYLE = [
  { emoji: "💪", sub: "Bra jobbat!", confetti: false },
  { emoji: "⚡️", sub: "Du är på rull!", confetti: false },
  { emoji: "🥇", sub: "Helt magiskt!", confetti: true },
];
function showAchievement(kind, n) {
  dismissAchievement();
  const old = $("achievement"); if (old) old.remove();
  clearTimeout(achTimer);
  const isWeek = kind === "week";
  const idx = isWeek ? -1 : dayTiers().indexOf(n); // vilken nivå (0/1/2) som passerades
  const ms = isWeek ? null : (DAY_TIER_STYLE[idx] || DAY_TIER_STYLE[0]);
  const confetti = isWeek || (ms && ms.confetti);
  const el = document.createElement("div");
  el.id = "achievement";
  el.className = "ach-banner " + (isWeek ? "ach-week" : "ach-day");
  if (isWeek) {
    el.innerHTML = `<div class="ach-confetti"></div>
      <div class="ach-badge">🏆</div>
      <div class="ach-txt"><b>${weeklyGoal()} olika kort denna vecka</b><span>Smått overkligt!</span></div>`;
  } else {
    el.innerHTML = `${confetti ? `<div class="ach-confetti"></div>` : ""}
      <div class="ach-badge">${ms.emoji}</div>
      <div class="ach-txt"><b>${n} olika kort idag!</b><span>${ms.sub}</span></div>`;
  }
  document.body.appendChild(el);
  if (confetti) {
    const cf = el.querySelector(".ach-confetti");
    const cols = ["#fff", "#5b8cff", "#8fbf5a", "#ffd24a", "#ff8a3d"];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("i");
      s.style.left = (8 + i * 7.5) + "%";
      s.style.background = cols[i % cols.length];
      s.style.animationDelay = (0.1 + (i % 4) * 0.05) + "s";
      cf.appendChild(s);
    }
  }
  requestAnimationFrame(() => el.classList.add("show"));
  el.addEventListener("click", dismissAchievement);
  achTimer = setTimeout(dismissAchievement, kind === "week" ? 3000 : 4200);
}

// Stiliserade ikoner (två omlott-rutor = kopiera; bock = klar)
const COPY_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`;
// Stiliserad papperskorg (currentColor → vit mot rött, muted/röd i modaler) – används överallt
const TRASH_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2"/><path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
const CHECK_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>`;
// Jordglob – samma motiv som globknappen på kortets baksida (Utforska)
const GLOBE_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9s1.4-6.4 3.9-9z"/></svg>`;

/* Stiliserade SVG-ikoner (utbyte av utvalda emoji). Storlek styrs via CSS (.ic-svg). */
const _ICL = 'class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const IC_SEARCH = `<svg ${_ICL}><circle cx="11" cy="11" r="6"/><line x1="15.4" y1="15.4" x2="19.2" y2="19.2"/></svg>`;
const IC_EDIT   = `<svg ${_ICL}><g transform="translate(2.05 0.1) scale(0.88)"><path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17z"/><line x1="14" y1="7" x2="17" y2="10"/></g></svg>`;
const IC_MIC    = `<svg ${_ICL}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`;
const IC_LOCK   = `<svg ${_ICL}><rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>`;
const IC_IMPORT = `<svg ${_ICL}><polyline points="8,8 12,4 16,8"/><line x1="12" y1="4" x2="12" y2="15"/><path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/></svg>`;
const IC_LOOKUP = `<svg ${_ICL}><circle cx="11" cy="11" r="6"/><line x1="15.4" y1="15.4" x2="19.2" y2="19.2"/><line x1="11" y1="8.4" x2="11" y2="13.6"/><line x1="8.4" y1="11" x2="13.6" y2="11"/></svg>`;
const IC_SPEAK  = `<svg class="ic-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M18 6.8a7.2 7.2 0 0 1 0 10.4"/></svg>`;
const IC_PAUSE  = `<svg class="ic-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3.6" height="14" rx="1.4"/><rect x="13.4" y="5" width="3.6" height="14" rx="1.4"/></svg>`;
const IC_PLAY   = `<svg class="ic-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>`;
(function setStaticIcons() {
  const set = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };
  set("lessons-search-btn", IC_SEARCH);
  set("editor-search-btn", IC_SEARCH);
  set("edit-subject", IC_EDIT);
  set("rename-lesson", IC_EDIT);
  set("speak-btn", IC_SPEAK);
  set("import-csv", IC_IMPORT + " Importera CSV");
  set("translate-subject", IC_LOOKUP + " Slå upp &amp; lägg till ord");
  const asr = document.querySelector("#autospeak-row > span");
  if (asr) asr.innerHTML = IC_SPEAK + " Automatisk uppläsning";
  const hf = document.querySelector('.mode-opt[data-mode="hf"]');
  if (hf) hf.innerHTML = IC_MIC + ' Handsfree <span class="beta">beta</span>';
})();

// Scroll-skugga i toppen av listor. En egen 0-höjds-remsa (.scroll-shadow) läggs
// PRECIS före varje lista – utanför listans bottenmask, som annars klipper bort en
// skugga ritad inuti listan. Remsan togglar klassen "on" när listan scrollats.
// Listelementen består mellan omritningar (bara innerHTML byts) → lyssnare en gång.
(function initListShadows() {
  document.querySelectorAll(".list").forEach((el) => {
    const strip = document.createElement("div");
    strip.className = "scroll-shadow";
    el.parentNode.insertBefore(strip, el);
    el._shadowStrip = strip;
    el.addEventListener("scroll", () => {
      strip.classList.toggle("on", el.scrollTop > 2);
    }, { passive: true });
  });
})();
function clearListShadow(el) { if (el && el._shadowStrip) el._shadowStrip.classList.remove("on"); } // innerHTML-byte nollar scrollTop

// Tydlig, flytande bekräftelse längst ner
function toast(msg, ms = 1700) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 250); }, ms);
}

// Kopiera text till urklipp (med fallback för äldre webbläsare). Visar kvittens.
function copyText(text, iconEl) {
  const done = () => {
    toast("Kopierat till urklipp ✓");
    if (iconEl) { iconEl.innerHTML = CHECK_ICON_SVG; setTimeout(() => { iconEl.innerHTML = COPY_ICON_SVG; }, 1300); }
  };
  const fail = () => flash("Kunde inte kopiera – markera och kopiera manuellt", 3000);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fail);
    return;
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    ok ? done() : fail();
  } catch (_) { fail(); }
}

// Öppna en AI-app. I en hemskärmsinstallerad PWA öppnar iOS vanliga https-länkar
// i en intern webbvy (där man inte är inloggad). Vi försöker därför öppna native-
// appen via dess URL-schema och faller tillbaka på webben i Safari om appen inte
// finns. Om appen öppnas göms sidan (visibilitychange) → då hoppar vi över fallbacken.
function openAiApp(scheme, web) {
  let switched = false;
  const onHide = () => { if (document.visibilityState === "hidden") switched = true; };
  document.addEventListener("visibilitychange", onHide);
  try { window.location.href = scheme; } catch (_) {}
  setTimeout(() => {
    document.removeEventListener("visibilitychange", onHide);
    if (!switched && document.visibilityState === "visible") window.open(web, "_blank");
  }, 1400);
}

// =========================================================================
//  Firebase-skrivningar (CRUD)
// =========================================================================
const TS = firebase.database.ServerValue.TIMESTAMP;

function writeError(err) {
  console.error(err);
  flash("Fel: " + (err.code || err.message), 4000);
}

function addSubject(name, lang, owner) {
  db.ref("content/subjects").push({ name, order: Date.now(), createdAt: TS, lang: lang || null, owner: owner || null }).catch(writeError);
}
function updateSubject(sid, name, lang, owner) {
  db.ref(`content/subjects/${sid}`).update({ name, lang: lang || null, owner: owner || null }).catch(writeError);
}
function removeSubject(sid) {
  db.ref(`content/subjects/${sid}`).remove().catch(writeError);
}
function addLesson(sid, name) {
  db.ref(`content/subjects/${sid}/lessons`).push({ name, order: Date.now(), createdAt: TS }).catch(writeError);
}
// Skapar lektion och returnerar dess nyckel direkt (för att kunna lägga kort i den på en gång)
function createLessonReturning(sid, name) {
  const ref = db.ref(`content/subjects/${sid}/lessons`).push({ name, order: Date.now(), createdAt: TS });
  ref.then(undefined, writeError);
  return ref.key;
}
function renameLesson(sid, lid, name) {
  db.ref(`content/subjects/${sid}/lessons/${lid}/name`).set(name).catch(writeError);
}
function removeLesson(sid, lid) {
  db.ref(`content/subjects/${sid}/lessons/${lid}`).remove().catch(writeError);
}
function addCards(sid, lid, cards) {
  const base = db.ref(`content/subjects/${sid}/lessons/${lid}/cards`);
  const updates = {};
  const order = Date.now();
  cards.forEach((c, i) => {
    const card = { front: c.front, back: c.back, order: order + i, createdAt: TS };
    if (c.prio === 1 || c.prio === 2 || c.prio === 3) card.prio = c.prio; // default (2) skrivs aldrig
    updates[base.push().key] = card;
  });
  return base.update(updates).catch(writeError);
}
function updateCard(sid, lid, cid, front, back, hint, prio) {
  // prio: 1/2/3 sparas; null/övrigt tar bort fältet (default 2 lagras aldrig).
  const upd = { front, back, hint: hint || null, prio: (prio === 1 || prio === 2 || prio === 3) ? prio : null };
  db.ref(`content/subjects/${sid}/lessons/${lid}/cards/${cid}`).update(upd).catch(writeError);
}
function removeCard(sid, lid, cid) {
  db.ref(`content/subjects/${sid}/lessons/${lid}/cards/${cid}`).remove().catch(writeError);
}
// Flytta ett kort till en annan lektion (atomiskt: lägg till nytt + ta bort gammalt).
// SRS följer med automatiskt eftersom inlärningen nycklas på ordet, inte kort-id:t.
// prio måste däremot skickas med explicit – annars tappas den vid flytt.
function moveCard(sid, fromLid, toLid, cid, front, back, hint, prio) {
  const newKey = db.ref(`content/subjects/${sid}/lessons/${toLid}/cards`).push().key;
  const updates = {};
  const card = { front, back, hint: hint || null, order: Date.now(), createdAt: TS };
  if (prio === 1 || prio === 2 || prio === 3) card.prio = prio;
  updates[`content/subjects/${sid}/lessons/${toLid}/cards/${newKey}`] = card;
  updates[`content/subjects/${sid}/lessons/${fromLid}/cards/${cid}`] = null;
  db.ref().update(updates).catch(writeError);
}

// =========================================================================
//  CRUD-flöden (UI)
// =========================================================================
async function editSubject(sid) {
  const s = content.find((x) => x.id === sid);
  if (!s) return;
  const res = await askSubject("Redigera ämne", s.name, subjectLang(s), true);
  if (!res) return;
  if (res.delete) {
    const ok = await confirmDanger("Ta bort ämne?", `"${s.name}" och alla dess lektioner tas bort permanent.`);
    if (ok) { removeSubject(sid); renderSubjects(); }
    return;
  }
  updateSubject(sid, res.name, res.lang, s.owner || currentUser); // behåll befintlig ägare
}

const editorSearch = $("editor-search");

function setupSearchClear(inputEl, onChange) {
  const btn = inputEl.closest(".search-wrap").querySelector(".search-clear");
  const sync = () => btn.classList.toggle("hidden", !inputEl.value);
  inputEl.addEventListener("input", () => { sync(); onChange(); });
  btn.addEventListener("click", () => { inputEl.value = ""; sync(); onChange(); inputEl.focus(); });
  return sync;
}
const syncEditorClear = setupSearchClear(editorSearch, () => { if (activeScreen === "editor") renderEditor(); });

// 🔍 fäller ut/in "Filtrera ord" i editorn (dolt som standard → frigör en rad).
const editorSearchBtn = $("editor-search-btn"), editorToolbar = $("editor-toolbar");
editorSearchBtn.onclick = () => {
  const show = editorToolbar.classList.contains("hidden");
  editorToolbar.classList.toggle("hidden", !show);
  editorSearchBtn.classList.toggle("active", show);
  if (show) { editorSearch.focus(); }
  else if (editorSearch.value) { editorSearch.value = ""; syncEditorClear(); if (activeScreen === "editor") renderEditor(); }
};
setupSearchClear($("lessons-search"), () => { if (activeScreen === "lessons") renderLessons(); });

let editorSort = "added"; // added | front-az | back-az | weak-front | weak-back

function openEditor(lessonId) {
  currentLessonId = lessonId;
  editorSearch.value = ($("lessons-search").value || "").trim();
  syncEditorClear();
  editorSort = "added";
  // Filtret börjar hopfällt – utom när ett filter följde med hit (från lektionslistans sök).
  const hasFilter = !!editorSearch.value;
  $("editor-toolbar").classList.toggle("hidden", !hasFilter);
  $("editor-search-btn").classList.toggle("active", hasFilter);
  renderEditor();
}

// Språknamn för etiketter (gemener), t.ex. "italienska"
function currentForeignLabel() {
  const lang = subjectLang(currentSubject);
  return lang ? langLabel(lang).toLowerCase() : "utländska";
}

const sortCollator = new Intl.Collator("sv", { sensitivity: "base" });
function weakKey(c, dir) {
  const e = getEntry(c, dir);
  return (e.box || 0) * 1e15 + (e.due || 0); // lägst låda (svagast) först
}
// Vilken låda (styrka) som visas på ett kort i editorn. Vid "svagast"-sortering
// speglar den den riktningen; annars den svagaste av de två riktningarna.
function strengthBox(c) {
  const fb = getEntry(c, "f2b").box || 0;
  const bb = getEntry(c, "b2f").box || 0;
  if (editorSort === "weak-front") return fb;
  if (editorSort === "weak-back") return bb;
  return Math.min(fb, bb);
}
function sortedCards(lesson) {
  const cs = [...lesson.cards];
  switch (editorSort) {
    case "front-az": return cs.sort((a, b) => sortCollator.compare(a.front, b.front));
    case "back-az": return cs.sort((a, b) => sortCollator.compare(a.back, b.back));
    case "weak-front": return cs.sort((a, b) => weakKey(a, "f2b") - weakKey(b, "f2b"));
    case "weak-back": return cs.sort((a, b) => weakKey(a, "b2f") - weakKey(b, "b2f"));
    case "prio-desc": return cs.sort((a, b) => cardPrio(a) - cardPrio(b) || sortCollator.compare(a.front, b.front));
    default: return cs.sort(byOrder);
  }
}

$("sort-btn").onclick = async () => {
  const fl = currentForeignLabel();
  const opts = [
    { label: "Först tillagda", value: "added" },
    { label: "Prio – fallande", value: "prio-desc" },
    { label: `Alfabetiskt ${fl}`, value: "front-az" },
    { label: "Alfabetiskt svenska", value: "back-az" },
    { label: `Svagast från ${fl}`, value: "weak-front" },
    { label: "Svagast från svenska", value: "weak-back" },
  ].map((o) => ({ ...o, label: (o.value === editorSort ? "✓ " : "") + o.label }));
  const choice = await actionSheet("Sortera", opts);
  if (choice) { editorSort = choice; renderEditor(); }
};

// Färskt ämnesobjekt ur synkade `content` (currentSubject kan peka på en gammal
// kopia efter att Firebase ekat in t.ex. ett ändrat lektionsnamn).
function freshSubject() {
  return (currentSubject && content.find((s) => s.id === currentSubject.id)) || currentSubject;
}

function getCurrentLesson() {
  if (!currentSubject) return null;
  const s = content.find((x) => x.id === currentSubject.id) || currentSubject;
  return s.lessons.find((l) => l.id === currentLessonId) || null;
}

// ---- Fyll lektion med AI (dialog → förifyll prompt i Claude/ChatGPT) ----
const AI_COUNT_KEY = "flippa-ai-count"; // minns valt antal mellan gånger
function aiCount() { const v = parseInt(localStorage.getItem(AI_COUNT_KEY), 10); return Number.isFinite(v) ? v : 30; }
function setAiCount(v) { v = Math.max(5, Math.min(100, v)); localStorage.setItem(AI_COUNT_KEY, String(v)); return v; }
// Sammansatt "avancerad" prompt: befintlig genus/artikel-mekanik + prio (3-kolumnsformat).
function buildAiPrompt(count, theme) {
  const lang = currentForeignLabel();
  const note = genderPromptNote(subjectLang(currentSubject)); // börjar med mellanslag, eller ""
  return `Ge mig ${count} bra ord och fraser på temat "${theme}" på ${lang}.\n\n`
    + `Format: en rad per glosa – "ord/fras;svensk översättning;prio" med semikolon emellan.${note}\n\n`
    + `Prio (1–3) = hur central glosan är för just DET HÄR temat, inte hur vanlig den är i språket i stort:\n`
    + `1 = kärnord man måste kunna för temat\n2 = vanliga, nyttiga ord\n3 = mer perifera eller nischade ord\n\n`
    + `Välj orden efter vad som är bra att kunna för temat – låt ALDRIG prio styra urvalet. `
    + `Som riktmärke (inte kvot) vid 30+ glosor: ungefär hälften 1:or, en tredjedel 2:or, resten 3:or. `
    + `Korta vardagsteman kan sakna 3:or helt. Sätt prio först när du valt orden.\n\n`
    + `Exempel på radformat: la nave;fartyg;1`;
}
function openAiDialog() {
  const lesson = getCurrentLesson();
  if (!lesson) return;
  const m = openModal(`
    <h3>Fyll lektionen med AI</h3>
    <p class="modal-hint">Låt en AI föreslå ord och fraser. Öppnas med prompten ifylld – kopiera svaret och klistra in via ＋ Lägg till.</p>
    <label class="ai-field"><span>Antal ord/fraser</span>
      <span class="ai-stepper"><button type="button" id="ai-dec">−</button><span id="ai-cnt">${aiCount()}</span><button type="button" id="ai-inc">+</button></span></label>
    <label class="ai-field col"><span>Tema</span>
      <input type="text" id="ai-theme" value="${esc(lesson.name)}" autocomplete="off" autocapitalize="sentences" /></label>
    <div class="ai-send">
      <button type="button" class="ai-btn claude" id="ai-claude">Öppna i Claude</button>
      <button type="button" class="ai-btn gpt" id="ai-gpt">Öppna i ChatGPT</button>
    </div>
    <p class="ai-copy-alt"><button type="button" class="link-action" id="ai-copy-alt">eller kopiera prompten</button></p>`);
  const themeVal = () => (m.querySelector("#ai-theme").value || lesson.name).trim() || lesson.name;
  const promptNow = () => buildAiPrompt(aiCount(), themeVal());
  m.querySelector("#ai-dec").onclick = () => { m.querySelector("#ai-cnt").textContent = setAiCount(aiCount() - 5); };
  m.querySelector("#ai-inc").onclick = () => { m.querySelector("#ai-cnt").textContent = setAiCount(aiCount() + 5); };
  // Överlämna via location.href (INTE window.open): i en installerad PWA öppnar en
  // URL utanför scope en ren in-app Safari-vy som respekterar universal links (ChatGPT/
  // Claude-appen öppnas om den finns) och "Klar" tar dig tillbaka – slipper den blanka
  // spökfliken som window.open lämnar när sidan hoppar vidare till sin app.
  const openAiSite = (base, ev) => {
    const url = base + encodeURIComponent(promptNow()); // läs fälten INNAN modalen stängs
    track(ev); closeModal(); markExternalNav(); location.href = url;
  };
  m.querySelector("#ai-claude").onclick = () => openAiSite("https://claude.ai/new?q=", "ai-oppna/claude");
  m.querySelector("#ai-gpt").onclick = () => openAiSite("https://chatgpt.com/?q=", "ai-oppna/gpt");
  m.querySelector("#ai-copy-alt").onclick = () => {
    const btn = m.querySelector("#ai-copy-alt");
    try { if (navigator.clipboard) navigator.clipboard.writeText(promptNow()).catch(() => {}); } catch (_) {}
    btn.textContent = "Kopierat ✓";
    track("ai-prompt-kopierad");
  };
}

function renderEditor() {
  const lesson = getCurrentLesson();
  if (!lesson) return renderLessons();
  activeScreen = "editor";
  show("editor");
  $("editor-title").textContent = lesson.name;
  updatePauseToggle(lesson.id);
  const list = $("editor-list");
  clearListShadow(list);
  if (!lesson.cards.length) {
    list.innerHTML = `<p class="empty">Inga ord än. Lägg till eller slå upp här ovanför, eller <button type="button" class="link-action" id="ai-help">ta hjälp av en AI</button>.</p>`;
    $("ai-help").onclick = () => openAddDialog({ segment: "ai" }); // enhetlig dialog, AI-segmentet
    return;
  }
  const sorted = sortedCards(lesson);
  const filter = (editorSearch.value || "").trim().toLowerCase();
  const cards = filter
    ? sorted.filter((c) => c.front.toLowerCase().includes(filter) || c.back.toLowerCase().includes(filter))
    : sorted;
  if (!cards.length) {
    const raw = (editorSearch.value || "").trim();
    const canLookUp = !!subjectLang(currentSubject);
    list.innerHTML = `<p class="empty">Inga träffar på "${esc(raw)}".</p>`
      + (canLookUp ? `<p class="empty"><button type="button" class="link-action" id="lookup-add-editor">${IC_LOOKUP} Slå upp &amp; lägg till</button></p>` : "");
    if (canLookUp) $("lookup-add-editor").onclick = () => openAddDialog({ segment: "lookup", prefill: raw });
    return;
  }
  // Lådbadgen visas bara vid de riktningsbaserade "svagast"-sorteringarna.
  const showBox = editorSort === "weak-front" || editorSort === "weak-back";
  list.innerHTML = cards
    .map((c) => {
      let badge = "";
      if (showBox) {
        const box = strengthBox(c);
        badge = `<span class="box-badge b${box}" title="${box === 0 ? "Aldrig tränat (ny)" : `Låda ${box} av 7 – ju högre desto starkare`}">${box === 0 ? "Ny" : box}</span>`;
      }
      const fav = isFav(c);
      const PRIO_NAMES = { 1: "Kärna", 2: "Vanlig", 3: "Nisch" };
      const prioDot = (c.prio === 1 || c.prio === 2 || c.prio === 3)
        ? ` <span class="word-prio p${c.prio}" title="Prio ${c.prio} · ${PRIO_NAMES[c.prio]}"></span>` : "";
      return `<div class="word-row" data-id="${c.id}">
        <button class="word-row-del" data-del="${c.id}" aria-label="Ta bort ord" title="Ta bort ord">${TRASH_ICON_SVG}</button>
        <div class="word-row-main">
          <div class="word-texts">
            <div class="word-front">${esc(c.front)}${prioDot}${c.hint ? ' <span class="word-hint-flag" title="Har minnesregel">💡</span>' : ""}</div>
            <div class="word-back">${esc(c.back)}</div>
          </div>
          ${badge}
          <button class="word-row-star${fav ? " on" : ""}" data-star="${c.id}" aria-label="Stjärnmärk" title="Stjärnmärk som favorit">${fav ? "★" : "☆"}</button>
        </div>
      </div>`;
    })
    .join("");
  list.querySelectorAll(".word-row").forEach((row) => attachSwipeDelete(row, row.dataset.id));
  list.querySelectorAll(".word-row-star").forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => e.stopPropagation());
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const c = lesson.cards.find((x) => x.id === btn.dataset.star);
      if (!c) return;
      const on = toggleFav(c);
      btn.textContent = on ? "★" : "☆";
      btn.classList.toggle("on", on);
    });
  });
}

// Swipe-to-delete på ord i editorn: svep vänster på raden → röd papperskorg
// glider fram (genväg till samma borttagning som i redigera-modalen). En liten
// horisontell rörelse räknas som svep; ett tryck utan rörelse öppnar redigering.
function attachSwipeDelete(row, cid) {
  const main = row.querySelector(".word-row-main");
  const OPEN = -72, OPEN_THRESH = 28, MOVE_SLOP = 8;
  let startX = 0, startY = 0, dx = 0, dragging = false, decided = false, horizontal = false;
  const isOpen = () => row.classList.contains("open");
  const setX = (x) => { main.style.transform = `translateX(${x}px)`; };
  // Papperskorgen är dold tills man faktiskt sveper/öppnar – annars flimrar den
  // röda ytan i radernas hörn när man scrollar listan vertikalt.
  const hideDelLater = (r) => setTimeout(() => { if (!r.classList.contains("open")) r.classList.remove("revealing"); }, 230);
  const closeOthers = () => row.parentElement.querySelectorAll(".word-row.open").forEach((r) => {
    if (r !== row) { r.classList.remove("open"); const m = r.querySelector(".word-row-main"); m.style.transition = "transform 0.2s"; m.style.transform = "translateX(0)"; hideDelLater(r); }
  });
  const snap = (open) => {
    main.style.transition = "transform 0.2s";
    row.classList.toggle("open", open);
    setX(open ? OPEN : 0);
    if (open) { row.classList.add("revealing"); closeOthers(); }
    else hideDelLater(row);
  };
  main.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button > 0) return;
    startX = e.clientX; startY = e.clientY; dx = isOpen() ? OPEN : 0;
    dragging = true; decided = false; horizontal = false;
    main.style.transition = "none";
  });
  main.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const mx = e.clientX - startX, my = e.clientY - startY;
    if (!decided) {
      if (Math.abs(mx) < MOVE_SLOP && Math.abs(my) < MOVE_SLOP) return;
      decided = true;
      // Engagera bara på vänster-svep (öppna papperskorgen) eller när redan öppen.
      // Höger-svep från stängt läge lämnas → bakåt-svep-gesten får hantera det.
      horizontal = Math.abs(mx) > Math.abs(my) && (isOpen() || mx < 0);
      if (horizontal) { row.classList.add("revealing"); try { main.setPointerCapture(e.pointerId); } catch (_) {} }
    }
    if (!horizontal) { dragging = false; return; } // vertikal/höger → låt scroll/bakåt-svep ske
    e.preventDefault();
    const base = isOpen() ? OPEN : 0;
    dx = Math.max(-90, Math.min(0, base + mx));
    setX(dx);
  }, { passive: false });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    if (!decided || !horizontal) { // tryck utan svep → redigera (eller stäng om öppen)
      main.style.transition = "";
      if (isOpen()) snap(false); else editWord(cid);
      return;
    }
    snap(dx < OPEN_THRESH * -1); // tillräckligt långt vänster → öppna
  };
  main.addEventListener("pointerup", end);
  main.addEventListener("pointercancel", () => { dragging = false; snap(isOpen()); });
  row.querySelector(".word-row-del").addEventListener("click", () => deleteWord(cid));
}

async function editWord(cid) {
  const lesson = getCurrentLesson();
  if (!lesson) return;
  const c = lesson.cards.find((x) => x.id === cid);
  if (!c) return;
  const subj = freshSubject();
  const res = await askWord(c.front, c.back, c.hint, { allowDelete: true, explore: !!subjectLang(subj), lessons: subj.lessons, lessonId: lesson.id, prio: c.prio });
  if (!res) return;
  if (res._delete) { deleteWord(cid); return; }
  c.hint = res.hint || null;
  if (res.prio !== c.prio) track("prio-justerad");
  c.prio = (res.prio === 1 || res.prio === 2 || res.prio === 3) ? res.prio : null;
  if (res.lessonId && res.lessonId !== lesson.id) {
    moveCard(currentSubject.id, lesson.id, res.lessonId, cid, res.front, res.back, res.hint, res.prio);
  } else {
    updateCard(currentSubject.id, lesson.id, cid, res.front, res.back, res.hint, res.prio);
  }
}

async function deleteWord(cid) {
  const lesson = getCurrentLesson();
  if (!lesson) return;
  const c = lesson.cards.find((x) => x.id === cid);
  if (!c) return;
  const ok = await confirmDanger("Ta bort ord?", `"${c.front}" tas bort.`);
  if (ok) removeCard(currentSubject.id, lesson.id, cid);
}

// Header-knappar
$("profile-btn").onclick = openSettings;
$("add-subject").onclick = async () => {
  if (!currentUser) { pickUser(); return; } // välj profil först
  const res = await askSubject("Nytt ämne", "", "", false);
  if (res) addSubject(res.name, res.lang, currentUser); // ägare = aktiv profil
};
$("add-lesson").onclick = async () => {
  if (!currentSubject) return;
  const name = await askName("Ny lektion", "");
  if (!name) return;
  const id = createLessonReturning(currentSubject.id, name);
  if (!id) return;
  // Lägg till lokalt direkt så vi kan hoppa in i den nya lektionen utan att vänta
  // på att Firebase ekar tillbaka (samma nyckel → ingen dubblett när echo kommer).
  if (!currentSubject.lessons.some((l) => l.id === id)) {
    currentSubject.lessons.push({ id, name, order: Date.now(), cards: [] });
  }
  openEditor(id); // hamna direkt inne i lektionen för att fylla på
};
$("edit-subject").onclick = () => { if (currentSubject) editSubject(currentSubject.id); };
// Tryck på en flik: byt flik. Trycker man på REDAN aktiva Flippa-fliken → backa ett
// steg i stacken (som iOS-appar): lektion → ämne, ämne/inställningar → huvudskärm.
function flippaBackOne() {
  closeChoosers();
  if (activeScreen === "editor") renderLessons();
  else if (activeScreen === "lessons" || activeScreen === "settings") renderSubjects();
  // subjects (huvudskärmen) → redan i botten, gör inget
}
document.querySelectorAll("#tabbar .tab-btn").forEach((b) => b.addEventListener("click", () => {
  if (b.dataset.tab === "flippa" && activeTab === "flippa") flippaBackOne();
  else setTab(b.dataset.tab);
}));

// Versionshistorik: ingångar (Hjälp + Om via set-changelog) + stäng (knapp/högersvep)
$("help-whatsnew").onclick = openChangelog;
{ const wnd = $("whatsnew-date"); if (wnd) wnd.textContent = latestChangelogDate(); }
$("clog-back").onclick = closeChangelog;
(function () {
  const el = $("changelog-screen"); let sx = 0, sy = 0, tracking = false, decided = false, horiz = false;
  el.addEventListener("pointerdown", (e) => { if (e.button != null && e.button > 0) return; sx = e.clientX; sy = e.clientY; tracking = true; decided = false; horiz = false; });
  el.addEventListener("pointermove", (e) => { if (!tracking || decided) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return; decided = true; horiz = dx > 0 && Math.abs(dx) > Math.abs(dy) * 1.3; if (!horiz) tracking = false; }); // högersvep → tillbaka (som resten av appen)
  el.addEventListener("pointerup", (e) => { const ok = tracking && horiz && (e.clientX - sx) > 70; tracking = false; if (ok) closeChangelog(); });
  el.addEventListener("pointercancel", () => { tracking = false; });
})();
$("rename-lesson").onclick = async () => {
  const lesson = getCurrentLesson();
  if (!lesson) return;
  const res = await askLesson("Redigera lektion", lesson.name, true);
  if (!res) return;
  if (res.delete) {
    const ok = await confirmDanger("Ta bort lektion?", `"${lesson.name}" och alla dess ord tas bort.`);
    if (ok) { removeLesson(currentSubject.id, lesson.id); renderLessons(); }
    return;
  }
  renameLesson(currentSubject.id, lesson.id, res.name);
};
// Pausa/återuppta lektionen (▶ när pausad, ⏸ när aktiv) – uppe till höger i lektionen
const togglePauseBtn = $("toggle-pause");
function updatePauseToggle(lid) {
  const paused = isLessonPaused(lid);
  togglePauseBtn.innerHTML = paused ? IC_PLAY : IC_PAUSE;
  togglePauseBtn.title = paused ? "Återuppta lektionen" : "Pausa lektionen (tyst i Dags att öva)";
  togglePauseBtn.classList.toggle("paused", paused);
}
togglePauseBtn.onclick = () => {
  const lesson = getCurrentLesson();
  if (!lesson) return;
  const on = toggleLessonPause(lesson.id);
  updatePauseToggle(lesson.id);
  flash(on ? "Lektionen pausad – tyst i Dags att öva" : "Lektionen aktiverad igen", 2000);
};
$("add-words").onclick = () => openAddDialog({ segment: "manual" });

// =========================================================================
//  Översättning (MyMemory) + lägg till
// =========================================================================
async function doTranslate(text, fromCode, toCode) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromCode}|${toCode}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("HTTP " + r.status);
  const d = await r.json();
  const status = d.responseStatus;
  if (status && String(status) !== "200") throw new Error(d.responseDetails || ("status " + status));
  return (d.responseData && d.responseData.translatedText) || "";
}

// Tvätta översättningens skiftläge så det matchar källtexten man skrev in:
// "blomkål" → gement, "Goddag" → stor första bokstav, "BLOMKÅL" → VERSALT.
function matchCase(src, target) {
  const s = (src || "").trim();
  const t = (target || "").trim();
  if (!s || !t) return t;
  const hasUpper = s !== s.toLowerCase();
  const hasLower = s !== s.toUpperCase();
  if (!hasUpper) return t.toLowerCase();      // allt gement
  if (!hasLower) return t.toUpperCase();      // ALLT VERSALT
  // inledande versal (mening/egennamn) → gement med stor första bokstav
  if (s[0] === s[0].toUpperCase() && s[0] !== s[0].toLowerCase()) {
    const low = t.toLowerCase();
    return low.charAt(0).toUpperCase() + low.slice(1);
  }
  return t; // blandat skiftläge – lämna som tjänsten gav
}

// =========================================================================
//  Enhetlig "Lägg till ord"-dialog (Manuellt / Slå upp / AI) – lektionsskärmen.
//  Mål = aktuell lektion. opts: { segment:'manual'|'lookup'|'ai', prefill }
// =========================================================================
function openAddDialog(opts = {}) {
  if (!currentSubject) return;
  currentSubject = freshSubject();
  // Fast lektion (från en lektion) ELLER väljare (t.ex. no-hit i alla-lektioner-söket).
  const pickLesson = !!opts.pickLesson;
  const fixedLesson = pickLesson ? null : getCurrentLesson();
  if (!pickLesson && !fixedLesson) return;
  const fullLang = subjectLang(currentSubject);
  const foreignCode = (fullLang || "").slice(0, 2);
  const foreignLabel = fullLang ? langLabel(fullLang) : "Utländska";
  const canLookUp = !!foreignCode;
  let seg = opts.segment || "manual";
  if (seg === "lookup" && !canLookUp) seg = "manual";
  let luDir = "sv2for", luCards = [], luSrcVal = opts.prefill || "", luAutoDone = false;

  const m = openModal(`
    <h3>Lägg till ord</h3>
    <div class="seg add-seg" id="add-seg">
      <button data-s="manual">Manuellt</button>
      ${canLookUp ? `<button data-s="lookup">Slå upp</button>` : ""}
      <button data-s="ai">AI</button>
    </div>
    <div id="add-lesson-pick"></div>
    <div id="add-body"></div>`);
  const bodyEl = m.querySelector("#add-body");

  // Lektionsväljare (bara i väljar-läge) – alla ord hamnar i EN vald lektion.
  let lessonSel = null, newLessonI = null;
  if (pickLesson) {
    const items = currentSubject.lessons.map((l) => ({ value: l.id, label: l.name })).concat([{ value: "__new__", label: "➕ Ny lektion…" }]);
    m.querySelector("#add-lesson-pick").innerHTML = `<label>Lägg till i</label><div id="add-lesson-mount"></div><input type="text" id="add-newlesson" class="hidden" placeholder="Namn på ny lektion" autocomplete="off" />`;
    newLessonI = m.querySelector("#add-newlesson");
    lessonSel = buildSelect(items, currentSubject.lessons[0] && currentSubject.lessons[0].id, (v) => { newLessonI.classList.toggle("hidden", v !== "__new__"); });
    m.querySelector("#add-lesson-mount").appendChild(lessonSel.el);
    if (!currentSubject.lessons.length) { lessonSel.value = "__new__"; newLessonI.classList.remove("hidden"); }
  }
  const lessonName = () => fixedLesson ? fixedLesson.name : ((currentSubject.lessons.find((l) => l.id === (lessonSel && lessonSel.value)) || {}).name || "");

  async function commitCards(cards, singularMsg) {
    cards = (cards || []).filter((c) => c && c.front && c.back);
    if (!cards.length) { toast("Inget att lägga till", 2500); return; }
    // Läs lektionsvalet INNAN dup-dialogen (som ersätter modalen).
    let lid = fixedLesson ? fixedLesson.id : null, newName = null;
    if (!lid) {
      if (lessonSel.value === "__new__") { newName = (newLessonI.value || "").trim(); if (!newName) { toast("Ange namn på den nya lektionen", 3000); return; } }
      else lid = lessonSel.value;
      if (!lid && !newName) { toast("Välj en lektion", 3000); return; }
    }
    const finalCards = await confirmDuplicates(currentSubject, cards); // ersätter modalen
    if (!finalCards) return;
    if (!finalCards.length) { toast("Inget nytt – alla fanns redan", 3000); return; }
    if (!lid) lid = createLessonReturning(currentSubject.id, newName);
    addCards(currentSubject.id, lid, finalCards);
    flash(finalCards.length === 1 ? (singularMsg || `La till "${finalCards[0].front}" ✓`) : `La till ${finalCards.length} ord ✓`, 2000);
    closeModal();
  }

  // ---- Manuellt ----
  function manualBody() {
    return `<p class="modal-hint">En rad per glosa: <b>utländskt;svenskt</b> — t.ex. <code>grazie;tack</code>. Valfri prio (1–3) sist: <code>grazie;tack;1</code></p>
      <textarea id="add-manual" rows="4" autocapitalize="none" autocorrect="off" placeholder="ciao;hej&#10;grazie;tack;1"></textarea>
      <div class="modal-actions"><button class="btn-secondary" id="add-cancel">Stäng</button><button class="btn-primary" id="add-manual-ok">Lägg till</button></div>`;
  }

  // ---- Slå upp (redigerbara kort) ----
  function lookupBody() {
    const svFlag = flagForLang("sv"), forFlag = flagForLang(fullLang);
    const pre = (f) => (f ? f + " " : "");
    return `<div class="seg" id="lu-dir">
        <button data-d="sv2for">${pre(svFlag)}Svenska → ${esc(foreignLabel)}</button>
        <button data-d="for2sv">${pre(forFlag)}${esc(foreignLabel)} → Svenska</button>
      </div>
      <div class="t-row"><input type="text" id="lu-src" value="${esc(luSrcVal)}" placeholder="skriv ord (flera med ;)" autocomplete="off" autocapitalize="none" autocorrect="off"><button class="btn-secondary t-lookup" id="lu-go" title="Slå upp" aria-label="Slå upp">${IC_SEARCH}</button></div>
      <p class="lu-note">⚠️ Översättningen kommer från en enkel gratistjänst – granska orden (särskilt böjning och genus) innan du lägger till.</p>
      <div id="lu-cards"></div>
      <div class="modal-actions"><button class="btn-secondary" id="add-cancel">Stäng</button><button class="btn-primary" id="lu-add">Lägg till</button></div>`;
  }
  function renderLuCards() {
    const host = m.querySelector("#lu-cards");
    const fF = (c, i) => `<div class="add-card-f"><label>${esc(foreignLabel)}</label><textarea rows="1" data-f="foreign" data-i="${i}">${esc(c.foreign)}</textarea></div>`;
    const fS = (c, i) => `<div class="add-card-f"><label>Svenska</label><textarea rows="1" data-f="swedish" data-i="${i}">${esc(c.swedish)}</textarea></div>`;
    host.innerHTML = luCards.map((c, i) => `
      <div class="add-card">
        ${luDir === "sv2for" ? fS(c, i) + fF(c, i) : fF(c, i) + fS(c, i)}
        <div class="add-card-foot"><span class="add-rprio" data-i="${i}"><span class="pl">Prio</span>
          <button data-p="1" class="${c.prio === 1 ? "on" : ""}">1</button><button data-p="2" class="${c.prio === 2 ? "on" : ""}">2</button><button data-p="3" class="${c.prio === 3 ? "on" : ""}">3</button></span>
          ${luCards.length > 1 ? `<button class="add-rm" data-i="${i}" title="Ta bort">✕</button>` : ""}</div>
      </div>`).join("");
    host.querySelectorAll("textarea[data-f]").forEach((t) => {
      const grow = () => { t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; };
      grow(); // väx så långa fraser syns helt (enstaka ord blir kompakta)
      t.oninput = () => { luCards[+t.dataset.i][t.dataset.f] = t.value; grow(); };
    });
    host.querySelectorAll(".add-rprio").forEach((s) => s.querySelectorAll("button").forEach((btn) => btn.onclick = () => {
      const i = +s.dataset.i, p = +btn.dataset.p; luCards[i].prio = luCards[i].prio === p ? null : p; renderLuCards();
    }));
    host.querySelectorAll(".add-rm").forEach((x) => x.onclick = () => { luCards.splice(+x.dataset.i, 1); renderLuCards(); });
    const addBtn = m.querySelector("#lu-add"); if (addBtn) addBtn.disabled = !luCards.length;
  }
  async function doLookup() {
    const parts = (m.querySelector("#lu-src").value || "").split(";").map((x) => x.trim()).filter(Boolean);
    if (!parts.length) return;
    const [from, to] = luDir === "sv2for" ? ["sv", foreignCode] : [foreignCode, "sv"];
    const go = m.querySelector("#lu-go"); go.textContent = "…";
    go.classList.add("busy");
    try {
      const out = [];
      for (const p of parts) { const t = matchCase(p, await doTranslate(p, from, to));
        out.push(luDir === "sv2for" ? { foreign: t, swedish: p, prio: null } : { foreign: p, swedish: t, prio: null }); }
      luCards = out; renderLuCards();
    } catch (e) { toast("Uppslag misslyckades: " + (e.message || e), 4000); }
    go.classList.remove("busy"); go.innerHTML = IC_SEARCH;
  }
  function wireLookup() {
    const src = m.querySelector("#lu-src");
    m.querySelectorAll("#lu-dir button").forEach((b) => {
      b.classList.toggle("seg-on", b.dataset.d === luDir);
      // Byt riktning UTAN att rensa sökfältet (bara resultaten, som är riktnings-specifika).
      b.onclick = () => { luSrcVal = src.value; luDir = b.dataset.d; luCards = []; renderBody(); m.querySelector("#lu-src").focus(); };
    });
    m.querySelector("#lu-go").onclick = doLookup;
    src.oninput = () => { luSrcVal = src.value; };
    src.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); doLookup(); } });
    renderLuCards();
    if (!luAutoDone) { luAutoDone = true; if (luSrcVal) doLookup(); else src.focus(); } // auto-slå-upp bara vid första öppning (prefill)
    else src.focus();
  }

  // ---- AI (allt-i-ett: skicka/kopiera + klistra in svaret) ----
  function aiBody() {
    return `<p class="modal-hint">Låt en AI föreslå ord. Öppnas med prompten ifylld (du trycker skicka) – klistra sedan in svaret.</p>
      <label>Antal ord/fraser</label>
      <div class="ai-stepper" style="margin:2px 0 0"><button type="button" id="ai2-dec">−</button><span id="ai2-cnt">${aiCount()}</span><button type="button" id="ai2-inc">+</button></div>
      <label>Tema</label>
      <input type="text" id="ai2-theme" value="${esc(lessonName())}" autocomplete="off" placeholder="t.ex. Sjöfart">
      <div class="ai-send">
        <button type="button" class="ai-btn" id="ai2-claude"><svg class="ai-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="12" y1="3.5" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="20.5"/><line x1="3.5" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="20.5" y2="12"/><line x1="6" y1="6" x2="9.7" y2="9.7"/><line x1="14.3" y1="14.3" x2="18" y2="18"/><line x1="18" y1="6" x2="14.3" y2="9.7"/><line x1="9.7" y1="14.3" x2="6" y2="18"/></svg>Claude</button>
        <button type="button" class="ai-btn" id="ai2-gpt"><svg class="ai-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.3 18.5 7v10L12 20.7 5.5 17V7z"/><path d="M12 11.4 18.2 7.8M12 11.4v7.1M12 11.4 5.8 7.8" opacity=".55"/></svg>ChatGPT</button>
      </div>
      <div class="tertiary-c"><button type="button" class="link-action" id="ai2-copy">⧉ Kopiera prompt (för annan AI)</button></div>
      <div class="add-divider">När du fått svaret</div>
      <div id="ai2-clipmsg"></div>
      <textarea id="ai2-paste" rows="3" autocapitalize="none" autocorrect="off" placeholder="Klistra in AI:ns svar här"></textarea>
      <div class="modal-actions"><button class="btn-secondary" id="add-cancel">Stäng</button><button class="btn-primary" id="ai2-add">Lägg till från svaret</button></div>`;
  }
  function wireAi() {
    const theme = () => (m.querySelector("#ai2-theme").value || lessonName()).trim() || lessonName() || "temat";
    const promptNow = () => buildAiPrompt(aiCount(), theme());
    m.querySelector("#ai2-dec").onclick = () => { m.querySelector("#ai2-cnt").textContent = setAiCount(aiCount() - 5); };
    m.querySelector("#ai2-inc").onclick = () => { m.querySelector("#ai2-cnt").textContent = setAiCount(aiCount() + 5); };
    const openSite = (base, ev) => { const url = base + encodeURIComponent(promptNow()); track(ev); markExternalNav(); location.href = url; }; // behåll modalen → paste-rutan finns kvar vid retur
    m.querySelector("#ai2-claude").onclick = () => openSite("https://claude.ai/new?q=", "ai-oppna/claude");
    m.querySelector("#ai2-gpt").onclick = () => openSite("https://chatgpt.com/?q=", "ai-oppna/gpt");
    m.querySelector("#ai2-copy").onclick = () => { const b = m.querySelector("#ai2-copy"); try { if (navigator.clipboard) navigator.clipboard.writeText(promptNow()).catch(() => {}); } catch (_) {} b.textContent = "Kopierat ✓ – klistra in i valfri AI"; track("ai-prompt-kopierad"); };
    // Urklipps-knappen är dold tills vidare (behåller koden – guardad om #ai2-clip saknas).
    const clipBtn = m.querySelector("#ai2-clip");
    if (clipBtn) clipBtn.onclick = async () => {
      const msg = m.querySelector("#ai2-clipmsg"), ta = m.querySelector("#ai2-paste");
      let text = "";
      try { text = navigator.clipboard && navigator.clipboard.readText ? await navigator.clipboard.readText() : ""; }
      catch (_) { msg.innerHTML = `<div class="paste-msg warn">Kunde inte läsa urklipp – klistra in manuellt i rutan nedan.</div>`; return; }
      const rows = parseLines(text || "");
      if (rows.length) { ta.value = text; msg.innerHTML = `<div class="paste-msg ok">✓ Hittade ${rows.length} ${rows.length === 1 ? "glosa" : "glosor"} – tryck Lägg till.</div>`; }
      else { msg.innerHTML = `<div class="paste-msg warn">Det där ser inte ut som glosor. Kopiera AI:ns svar (raderna med <b>;</b>) och försök igen.</div>`; }
    };
    m.querySelector("#ai2-add").onclick = () => commitCards(parseLines(m.querySelector("#ai2-paste").value));
  }

  const lessonPickEl = m.querySelector("#add-lesson-pick"); // flyttas in ovanför knapparna per läge
  function renderBody() {
    if (pickLesson) m.appendChild(lessonPickEl); // parkera i modal-roten så innerHTML-bytet inte kastar bort select:en
    bodyEl.innerHTML = seg === "manual" ? manualBody() : seg === "lookup" ? lookupBody() : aiBody();
    m.querySelector("#add-cancel").onclick = closeModal;
    if (seg === "manual") m.querySelector("#add-manual-ok").onclick = () => commitCards(parseLines(m.querySelector("#add-manual").value));
    else if (seg === "lookup") { m.querySelector("#lu-add").onclick = () => commitCards(luCards.map((c) => ({ front: (c.foreign || "").trim(), back: (c.swedish || "").trim(), prio: c.prio }))); wireLookup(); }
    else wireAi();
    if (pickLesson) { const acts = bodyEl.querySelector(".modal-actions"); bodyEl.insertBefore(lessonPickEl, acts); } // lektionsväljare direkt ovanför Stäng/Lägg till
  }
  function setSeg(s) {
    seg = s;
    m.querySelectorAll("#add-seg button").forEach((b) => b.classList.toggle("seg-on", b.dataset.s === s));
    renderBody();
  }
  m.querySelectorAll("#add-seg button").forEach((b) => b.onclick = () => setSeg(b.dataset.s));
  setSeg(seg);
}

function openTranslate(defaultLessonId, prefill) {
  if (!currentSubject) return;
  currentSubject = freshSubject(); // ta hänsyn till t.ex. nyligen ändrade lektionsnamn
  const fullLang = subjectLang(currentSubject);
  const foreignCode = fullLang.slice(0, 2);
  if (!foreignCode) {
    flash("Sätt ett språk på ämnet först (redigera ämnet ✎)", 4000);
    return;
  }
  const foreignLabel = fullLang ? langLabel(fullLang) : "Utländska";
  let dir = "sv2for";

  const lessonItems = currentSubject.lessons
    .map((l) => ({ value: l.id, label: l.name }))
    .concat([{ value: "__new__", label: "➕ Ny lektion…" }]);

  const m = openModal(`
    <h3>Slå upp ord</h3>
    <div class="seg" id="t-dir">
      <button data-dir="sv2for" class="seg-on">Svenska → ${esc(foreignLabel)}</button>
      <button data-dir="for2sv">${esc(foreignLabel)} → Svenska</button>
    </div>
    <label id="t-src-label">Svenska</label>
    <div class="t-row">
      <input type="text" id="t-src" autocomplete="off" autocapitalize="none" autocorrect="off" placeholder="t.ex. nord;syd;väst" />
      <button class="btn-secondary t-lookup" id="t-lookup">🔎</button>
    </div>
    <label id="t-dst-label">${esc(foreignLabel)}</label>
    <input type="text" id="t-dst" autocomplete="off" autocapitalize="none" autocorrect="off" placeholder="översättning (redigerbar)" />
    <label>Lägg till i</label>
    <div id="t-lesson-mount"></div>
    <input type="text" id="t-newlesson" class="hidden" placeholder="Namn på ny lektion" autocomplete="off" />
    <div class="modal-actions">
      <button class="btn-secondary" id="m-cancel">Stäng</button>
      <button class="btn-primary" id="t-add">Lägg till</button>
    </div>
    <p class="modal-hint">Flera ord? Separera med <b>;</b> (t.ex. <code>nord;syd;väst</code>) så blir det en glosa var. Översättning via MyMemory – kontrollera & justera vid behov.</p>`);

  const srcI = m.querySelector("#t-src");
  const dstI = m.querySelector("#t-dst");
  const newLessonI = m.querySelector("#t-newlesson");
  const lessonSel = buildSelect(lessonItems, defaultLessonId, (v) => {
    newLessonI.classList.toggle("hidden", v !== "__new__");
  });
  m.querySelector("#t-lesson-mount").appendChild(lessonSel.el);
  srcI.focus();

  if (!currentSubject.lessons.length) {
    lessonSel.value = "__new__";
    newLessonI.classList.remove("hidden");
  }

  function applyDir() {
    m.querySelectorAll("#t-dir button").forEach((b) => b.classList.toggle("seg-on", b.dataset.dir === dir));
    const sv = dir === "sv2for";
    m.querySelector("#t-src-label").textContent = sv ? "Svenska" : foreignLabel;
    m.querySelector("#t-dst-label").textContent = sv ? foreignLabel : "Svenska";
    srcI.placeholder = sv ? "t.ex. nord;syd;väst" : "t.ex. nord;sud;ovest";
  }
  m.querySelectorAll("#t-dir button").forEach((b) => (b.onclick = () => { dir = b.dataset.dir; applyDir(); srcI.focus(); }));

  const splitTerms = (s) => (s || "").split(";").map((x) => x.trim()).filter(Boolean);

  async function lookup() {
    const parts = splitTerms(srcI.value);
    if (!parts.length) return;
    const [from, to] = dir === "sv2for" ? ["sv", foreignCode] : [foreignCode, "sv"];
    dstI.value = "…";
    try {
      const out = [];
      for (const p of parts) out.push(matchCase(p, await doTranslate(p, from, to))); // ett ord i taget
      dstI.value = out.join("; "); // flera → samma ordning, separerade med ;
    } catch (e) {
      dstI.value = "";
      toast("Översättning misslyckades: " + e.message, 4000); // toast syns ovanför modalen
    }
  }
  m.querySelector("#t-lookup").onclick = lookup;
  srcI.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); lookup(); } });

  // Förifyll sökordet (svenska → utländskt) och slå upp direkt – då behöver man bara välja lektion.
  if (prefill) { srcI.value = prefill; lookup(); }

  m.querySelector("#m-cancel").onclick = closeModal;
  m.querySelector("#t-add").onclick = async () => {
    const srcParts = splitTerms(srcI.value);
    const dstParts = splitTerms(dstI.value);
    if (!srcParts.length || !dstParts.length) { toast("Fyll i båda fälten (slå upp eller skriv själv)", 3000); return; }
    if (srcParts.length !== dstParts.length) {
      toast(`Olika antal ord: ${srcParts.length} mot ${dstParts.length}. Lika många på båda sidor (separera med ;).`, 4500);
      return;
    }
    // para ihop term för term → en glosa per par (front = utländskt, back = svenska)
    const cards = srcParts.map((sp, i) => {
      const dp = dstParts[i];
      return dir === "sv2for" ? { front: dp, back: sp } : { front: sp, back: dp };
    });
    // läs lektionsval INNAN dubblettdialogen (som ersätter denna modal)
    const newName = lessonSel.value === "__new__" ? newLessonI.value.trim() : null;
    if (lessonSel.value === "__new__" && !newName) { toast("Ange namn på den nya lektionen", 3000); return; }
    const finalCards = await confirmDuplicates(currentSubject, cards);
    if (!finalCards) return;                                   // avbröt
    if (!finalCards.length) { toast("Inget nytt – alla fanns redan", 3000); return; }
    const lessonId = newName ? createLessonReturning(currentSubject.id, newName) : lessonSel.value;
    addCards(currentSubject.id, lessonId, finalCards);
    flash(finalCards.length === 1 ? `La till "${finalCards[0].front}" ✓` : `La till ${finalCards.length} ord ✓`, 2000);
    closeModal();
  };
}

// #translate-subject är DOLT i ＋-menyn (se index.html) – dess "Slå upp & lägg till"
// överlappar nu med Slå upp-segmentet i openAddDialog. Handlern behålls så länge så
// den är redo om vi återinför den (antingen strykning, eller genväg in i openAddDialog).
$("translate-subject").onclick = () => openTranslate(null); // lektionslistans ＋-meny (väljer lektion) – enas senare
// (＋ Lägg till ord på lektionsskärmen går via openAddDialog; #translate-words-knappen borttagen)

// =========================================================================
//  CSV-import → lektioner (sektion;italienska;svenska;favorit;minnesregel)
// =========================================================================
// Tecken-för-tecken-parser som klarar citerade fält (med ; eller , inuti) och "" som escape.
function parseCsvRecords(text, delim) {
  const rows = [];
  let row = [], field = "", inQ = false;
  text = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === delim) { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function detectDelim(text) {
  const firstLine = (text.replace(/^﻿/, "").split("\n")[0] || "");
  return (firstLine.split(";").length - 1) >= (firstLine.split(",").length - 1) ? ";" : ",";
}

const FAV_FALSEY = new Set(["", "0", "nej", "no", "false", "n"]);
// Läs alla valda filer → lista av {sektion, front, back, fav, hint, prio}
function readCsvFiles(files) {
  return Promise.all([...files].map((f) => f.text())).then((texts) => {
    const out = [];
    texts.forEach((text) => {
      const delim = detectDelim(text);
      const rows = parseCsvRecords(text, delim);
      rows.forEach((r, i) => {
        const sektion = (r[0] || "").trim();
        const front = (r[1] || "").trim();
        const back = (r[2] || "").trim();
        if (i === 0 && sektion.toLowerCase() === "sektion") return; // rubrikrad
        if (!sektion || !front || !back) return;
        const fav = !FAV_FALSEY.has((r[3] || "").trim().toLowerCase());
        const hint = (r[4] || "").trim();
        const rawPrio = (r[5] || "").trim();
        const prio = rawPrio === "1" || rawPrio === "2" || rawPrio === "3" ? parseInt(rawPrio, 10) : null;
        out.push({ sektion, front, back, fav, hint, prio });
      });
    });
    return out;
  });
}

// Bygg importplan: gruppera per sektion, slå ihop med befintlig lektion (samma namn),
// hoppa över ord som redan finns i ämnet eller som dubbleras i samma lektion.
function buildImportPlan(subject, records) {
  const byName = new Map(); // gemener lektionsnamn -> befintlig lektion
  const existingFronts = new Set(); // normaliserade front i hela ämnet
  subject.lessons.forEach((l) => {
    byName.set(l.name.trim().toLowerCase(), l);
    l.cards.forEach((c) => existingFronts.add(normPart(c.front)));
  });
  const sections = new Map(); // sektionsnamn -> { name, existing, cards:[], seen:Set }
  let skipped = 0;
  records.forEach((rec) => {
    let s = sections.get(rec.sektion);
    if (!s) {
      const ex = byName.get(rec.sektion.toLowerCase()) || null;
      s = { name: rec.sektion, existing: ex, cards: [], seen: new Set() };
      sections.set(rec.sektion, s);
    }
    const k = normPart(rec.front);
    if (existingFronts.has(k) || s.seen.has(k)) { skipped++; return; } // redan i ämnet / dubbel i samma import-lektion
    s.seen.add(k);
    s.cards.push(rec);
  });
  const list = [...sections.values()].filter((s) => s.cards.length);
  const newCount = list.filter((s) => !s.existing).length;
  const mergeCount = list.filter((s) => s.existing).length;
  const wordCount = list.reduce((n, s) => n + s.cards.length, 0);
  return { list, newCount, mergeCount, wordCount, skipped };
}

function commitImport(subject, plan) {
  const sid = subject.id;
  const updates = {};
  const order0 = Date.now();
  const newLessonIds = [];
  const favKeys = [];
  plan.list.forEach((s, si) => {
    let lid = s.existing && s.existing.id;
    if (!lid) {
      lid = db.ref(`content/subjects/${sid}/lessons`).push().key;
      updates[`content/subjects/${sid}/lessons/${lid}/name`] = s.name;
      updates[`content/subjects/${sid}/lessons/${lid}/order`] = order0 + si;
      updates[`content/subjects/${sid}/lessons/${lid}/createdAt`] = TS;
      newLessonIds.push(lid);
    }
    s.cards.forEach((rec, ci) => {
      const ck = db.ref(`content/subjects/${sid}/lessons/${lid}/cards`).push().key;
      const card = { front: rec.front, back: rec.back, hint: rec.hint || null, order: order0 + si * 1000 + ci, createdAt: TS };
      if (rec.prio === 1 || rec.prio === 2 || rec.prio === 3) card.prio = rec.prio;
      updates[`content/subjects/${sid}/lessons/${lid}/cards/${ck}`] = card;
      if (rec.fav) favKeys.push(`${normPart(rec.front)}|${normPart(rec.back)}`);
    });
  });
  // Stjärnmärken (personligt) + nya lektioner pausade (personligt) – innan skrivningen ekar tillbaka
  favKeys.forEach((k) => setFavKey(k, true));
  newLessonIds.forEach((lid) => setLessonPaused(lid, true));
  return db.ref().update(updates);
}

async function startCsvImport(files) {
  if (!files || !files.length) return;
  const subject = freshSubject();
  if (!subject) return;
  let records;
  try { records = await readCsvFiles(files); }
  catch (e) { toast("Kunde inte läsa filen: " + e.message, 4000); return; }
  if (!records.length) { toast("Hittade inga giltiga rader (sektion;italienska;svenska)", 4000); return; }
  const plan = buildImportPlan(subject, records);
  if (!plan.wordCount) { toast("Inget nytt att importera – allt fanns redan", 4000); return; }

  const sample = plan.list.slice(0, 8).map((s) =>
    `<li>${esc(s.name)} <span class="dup-lesson">(${s.cards.length}${s.existing ? ", befintlig" : ""})</span></li>`).join("");
  const more = plan.list.length > 8 ? `<li class="dup-lesson">…och ${plan.list.length - 8} till</li>` : "";
  const m = openModal(`
    <h3>Importera CSV</h3>
    <p class="modal-hint"><b>${plan.wordCount}</b> ord i <b>${plan.list.length}</b> lektioner
      (${plan.newCount} nya, ${plan.mergeCount} befintliga)${plan.skipped ? ` · ${plan.skipped} dubbletter hoppas över` : ""}.
      Nya lektioner importeras <b>pausade</b>.</p>
    <ul class="dup-list">${sample}${more}</ul>
    <div class="modal-actions">
      <button class="btn-secondary" id="imp-cancel">Avbryt</button>
      <button class="btn-primary" id="imp-go">Importera</button>
    </div>`);
  m.querySelector("#imp-cancel").onclick = closeModal;
  m.querySelector("#imp-go").onclick = () => {
    closeModal();
    if (plan.list.some((s) => s.cards.some((c) => c.prio))) track("import-med-prio");
    commitImport(subject, plan)
      .then(() => flash(`Importerade ${plan.wordCount} ord i ${plan.list.length} lektioner ✓`, 3000))
      .catch((e) => { writeError(e); toast("Importen misslyckades: " + (e.code || e.message), 5000); });
  };
}

$("import-csv").onclick = () => { const inp = $("csv-file"); inp.value = ""; inp.click(); };
$("csv-file").addEventListener("change", (e) => { startCsvImport(e.target.files); });

// ＋-meny: samlar Ny lektion / Slå upp & lägg till ord / Importera CSV under en knapp.
// Menyvalens egna onclick-handlers (add-lesson/translate-subject/import-csv) är redan
// bundna på id ovan – här sköts bara öppna/stäng.
const addMenuBtn = $("add-menu-btn"), addMenu = $("add-menu");
function closeAddMenu() { addMenu.classList.add("hidden"); addMenuBtn.classList.remove("active"); }
addMenuBtn.onclick = (e) => {
  e.stopPropagation();
  const open = addMenu.classList.toggle("hidden") === false;
  addMenuBtn.classList.toggle("active", open);
};
addMenu.addEventListener("click", () => closeAddMenu()); // klick på ett val stänger menyn (valets handler kör ändå)
document.addEventListener("click", (e) => {
  if (!addMenu.classList.contains("hidden") && !addMenu.contains(e.target) && e.target !== addMenuBtn) closeAddMenu();
});

// 🔍 fäller ut/in "Sök i alla lektioner" (dolt som standard – frigör en rad).
const lessonsSearchBtn = $("lessons-search-btn"), lessonsToolbar = $("lessons-toolbar");
lessonsSearchBtn.onclick = () => {
  const show = lessonsToolbar.classList.contains("hidden");
  lessonsToolbar.classList.toggle("hidden", !show);
  lessonsSearchBtn.classList.toggle("active", show);
  if (show) { $("lessons-search").focus(); }
  else if ($("lessons-search").value) { $("lessons-search").value = ""; if (activeScreen === "lessons") renderLessons(); }
};

// =========================================================================
//  Backup: exportera / importera SRS-statistik (localStorage)
// =========================================================================
function buildBackup() {
  return JSON.stringify({
    app: "flippa",
    version: 1,
    exportedAt: new Date().toISOString(),
    srs: srs,
    sessionLimit: localStorage.getItem(SESSION_LIMIT_KEY) || "0",
    newPerDay: localStorage.getItem(NEW_PER_DAY_KEY) || "10",
    stats: getStats(),
  }, null, 0);
}

function downloadBackup(data) {
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `flippa-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openExport() {
  const data = buildBackup();
  const count = Object.keys(srs).length;
  const m = openModal(`
    <h3>Exportera statistik</h3>
    <p class="modal-hint">Din inlärningsstatistik (${count} poster) ligger lokalt och försvinner om du avinstallerar appen eller rensar webbläsardata. Spara den här som backup. Glosorna i sig ligger redan tryggt i molnet.</p>
    <textarea id="exp-text" readonly>${esc(data)}</textarea>
    <div class="modal-actions">
      <button class="btn-secondary" id="m-cancel">Stäng</button>
      <button class="btn-primary" id="exp-copy">Kopiera</button>
    </div>
    <button class="full-btn" id="exp-download">⬇︎ Ladda ner som fil</button>`);
  m.querySelector("#m-cancel").onclick = closeModal;
  m.querySelector("#exp-copy").onclick = async () => {
    try {
      await navigator.clipboard.writeText(data);
      flash("Kopierat ✓", 1500);
    } catch {
      m.querySelector("#exp-text").select();
      flash("Markera och kopiera manuellt");
    }
  };
  m.querySelector("#exp-download").onclick = () => downloadBackup(data);
}

function openImport() {
  const m = openModal(`
    <h3>Importera statistik</h3>
    <p class="modal-hint">Välj en backup-fil eller klistra in JSON. Statistiken slås ihop med befintlig (importerad vinner vid krock).</p>
    <input type="file" id="imp-file" accept="application/json,.json" />
    <textarea id="imp-text" placeholder="…eller klistra in backup-JSON här"></textarea>
    <div class="modal-actions">
      <button class="btn-secondary" id="m-cancel">Avbryt</button>
      <button class="btn-primary" id="imp-go">Importera</button>
    </div>`);
  const ta = m.querySelector("#imp-text");
  m.querySelector("#imp-file").onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { ta.value = reader.result; };
    reader.readAsText(f);
  };
  m.querySelector("#m-cancel").onclick = closeModal;
  m.querySelector("#imp-go").onclick = () => {
    const txt = ta.value.trim();
    if (!txt) { flash("Välj en fil eller klistra in JSON först"); return; }
    let obj;
    try { obj = JSON.parse(txt); } catch { flash("Ogiltig JSON"); return; }
    const imported = obj && obj.srs;
    if (!imported || typeof imported !== "object") { flash("Hittar ingen statistik i filen"); return; }
    let n = 0;
    for (const k in imported) { srs[k] = imported[k]; n++; }
    saveSRS();
    migrateSrsKeys(content); // konvertera ev. gammal ID-nycklad backup till ordnyckel
    if (obj.sessionLimit != null) {
      localStorage.setItem(SESSION_LIMIT_KEY, String(obj.sessionLimit));
      sessionLimitSel.value = String(obj.sessionLimit);
    }
    if (obj.newPerDay != null) localStorage.setItem(NEW_PER_DAY_KEY, String(obj.newPerDay));
    if (Array.isArray(obj.stats)) { // slå ihop träningsstatistik (unik på ts), behåll båda
      const merged = new Map(getStats().map((r) => [r.ts, r]));
      obj.stats.forEach((r) => { if (r && r.ts != null) merged.set(r.ts, r); });
      const arr = [...merged.values()].sort((a, b) => a.ts - b.ts);
      localStorage.setItem(STATS_KEY, JSON.stringify(arr));
    }
    closeModal();
    flash(`Importerade statistik för ${n} kort ✓`, 2500);
    renderCurrentScreen();
  };
}

// (Backup nås numera via Inställningar → Data; se openBackup ovan.)

// =========================================================================
//  Handsfree-läge
// =========================================================================
let handsfreeActive = false;
let hfListening = false;
let hfRecognition = null;
let hfTimeoutId = null;
let hfLoadCardTimer = null;
let hfWakeLock = null;

const hfStatusEl = $("hf-status");

// ---- Lägesväxel: dolt handtag → Svep | Handsfree (beta). Footern speglar läget. ----
const modeHandle = $("mode-handle");
const modeHandleLbl = $("mode-handle-lbl");
const modeSlide = $("mode-slide");
const modeSeg = $("mode-seg");
const cuesSwipe = document.querySelector(".cues-swipe");
const cuesHf = document.querySelector(".cues-hf");

// Synka hela UI:t mot om handsfree är aktivt (anropas när HF startar/stoppar –
// även externt, t.ex. när passet tar slut → tillbaka till svep-läge automatiskt).
function setModeUI(hf) {
  modeSeg.classList.toggle("hf", hf);
  modeSeg.querySelectorAll(".mode-opt").forEach((o) => o.classList.toggle("on", (o.dataset.mode === "hf") === hf));
  cuesSwipe.classList.toggle("hidden", hf);
  cuesHf.classList.toggle("hidden", !hf);
  modeHandleLbl.textContent = "Läge: " + (hf ? "Handsfree" : "Svep");
  if (!hf) hfStatusEl.textContent = "Lyssnar…"; // återställ inför nästa gång
  updateAutospeakRow(); // dölj/visa uppläsnings-toggeln beroende på läge
}

function closeModeSlide() {
  modeSlide.classList.remove("open");
  modeHandle.setAttribute("aria-expanded", "false");
}

// Handtaget fäller upp/ihop segmentväxeln (håller låg profil tills man vill byta).
modeHandle.addEventListener("click", () => {
  const open = modeSlide.classList.toggle("open");
  modeHandle.setAttribute("aria-expanded", open ? "true" : "false");
});

// Segmentvalet driver läget. HF sätts bara om mikrofonen faktiskt gick att få
// (startHandsfree → setModeUI(true) vid lyckat läge; misslyckas → vi står kvar på Svep).
modeSeg.querySelectorAll(".mode-opt").forEach((opt) => {
  opt.addEventListener("click", async () => {
    if (opt.dataset.mode === "hf") {
      if (!handsfreeActive) await startHandsfree();
    } else if (handsfreeActive) {
      stopHandsfree();
    } else {
      setModeUI(false);
    }
    closeModeSlide();
  });
});

let hfMicGranted = false;

async function startHandsfree() {
  if (!session || !session.current) return;
  // iOS låser talsyntesen tills den körts i en användargest. Lås upp TTS synkront HÄR,
  // i tryck-gesten (görs alltid, även om getUserMedia saknas).
  unlockSpeech();
  // Säkra mikrofonen INNAN vi läser upp något. Annars läses ordet upp och passet
  // "dör" tyst så fort taligenkänningen nekas (knappen släcks) – förvirrande. Fela
  // hellre tidigt, med ett åtgärdbart meddelande, och läs inte upp ordet i onödan.
  if (!hfMicGranted) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      flash("Den här enheten ger inte appen mikrofon för handsfree. Prova att öppna Flippa i Safari i stället för från hemskärmen.", 5500);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop()); // behöver inte strömmen – taligenkänningen sköter sin egen
      hfMicGranted = true;
    } catch (_) {
      flash("Mikrofonåtkomst nekad. Tillåt mikrofonen i Inställningar (eller öppna Flippa i Safari) för att köra handsfree.", 5500);
      return;
    }
    if (!session || !session.current) return; // sessionen kan ha hunnit avslutas under await
  }
  track("handsfree-pa");
  handsfreeActive = true;
  setModeUI(true);
  // Snäpp tillbaka till framsidan om kortet råkar vara flippat
  if (card.classList.contains("flipped")) {
    cardInner.style.transition = "none";
    card.classList.remove("flipped");
    void cardInner.offsetWidth;
    cardInner.style.transition = "";
  }
  if ("wakeLock" in navigator) {
    navigator.wakeLock.request("screen").then((lock) => { hfWakeLock = lock; }).catch(() => {});
  }
  hfSpeakFront();
}

function stopHandsfree() {
  if (!handsfreeActive) return;
  handsfreeActive = false;
  hfListening = false;
  setModeUI(false);
  hfStatusEl.textContent = "";
  clearTimeout(hfTimeoutId);
  clearTimeout(hfLoadCardTimer);
  if (hfRecognition) { try { hfRecognition.abort(); } catch (_) {} hfRecognition = null; }
  if (hfWakeLock) { hfWakeLock.release().catch(() => {}); hfWakeLock = null; }
  speechSynthesis.cancel();
}

// Vilket text + språk som visas på fram- resp. baksidan just nu
function hfText(back) {
  const c = session.current;
  const f2b = session.shownDir === "f2b";
  return back ? (f2b ? c.back : c.front) : (f2b ? c.front : c.back);
}
function hfLang(back) {
  const foreign = subjectLang(currentSubject);
  const f2b = session.shownDir === "f2b";
  return back ? (f2b ? "sv-SE" : foreign) : (f2b ? foreign : "sv-SE");
}

function hfStopListening() {
  hfListening = false;
  clearTimeout(hfTimeoutId);
  if (hfRecognition) { try { hfRecognition.abort(); } catch (_) {} hfRecognition = null; }
}

function hfSpeakFront() {
  if (!handsfreeActive || !session || !session.current) return;
  clearTimeout(hfLoadCardTimer);
  hfStopListening();
  hfStatusEl.textContent = "";
  speak(hfText(false), hfLang(false), () => {
    if (handsfreeActive) hfStartListening(true);
  });
}

function hfSpeakBack(thenGrade) {
  if (!handsfreeActive || !session || !session.current) return;
  clearTimeout(hfLoadCardTimer);
  hfStopListening();
  card.classList.add("flipped");
  // "fail"/"hard" får 2 s eftertänkpaus – men om "hard" har en minnesregel ersätts
  // pausen av att regeln läses upp (i hfFinishGrade), så då räcker iOS-bufferten.
  const c = session.current;
  const willReadHint = thenGrade === "hard" && c && c.hint;
  const pause = (thenGrade === "fail" || (thenGrade === "hard" && !willReadHint)) ? 2000 : 400;
  speak(hfText(true), hfLang(true), () => {
    if (!handsfreeActive) return;
    setTimeout(() => {
      if (!handsfreeActive) return;
      if (thenGrade) hfFinishGrade(thenGrade);
      else hfStartListening(true);
    }, pause);
  });
}

// Betygssätt i röstläge. Vid "hopplöst" (hard) läses minnesregeln upp (svenska)
// som extra förstärkning innan nästa kort – om kortet har en sådan.
function hfFinishGrade(grade) {
  showFeedback(grade);
  const c = session && session.current;
  if (grade === "hard" && c && c.hint && handsfreeActive) {
    speak(c.hint, "sv-SE", () => {
      setTimeout(() => { if (handsfreeActive) flyOut(grade); }, 600);
    });
  } else {
    flyOut(grade);
  }
}

// Kommandon i matchningsordning (längsta/specifika fraser först)
const HF_CMDS = [
  { word: "hopplöst", grade: "hard" },
  { word: "flippa",   grade: null   },
  { word: "inte",     grade: "fail" },
  { word: "bra",      grade: "easy" },
  { word: "kan",      grade: "good" },
];

function hfHandleTranscript(transcript) {
  const t = transcript.toLowerCase();
  // "ångra" → ta tillbaka föregående kort. undoLastAnswer() läser upp det
  // återställda kortet och återupptar lyssning via loadCard. Om inget fanns
  // att ångra, återuppta lyssning direkt.
  if (t.includes("ångra") || t.includes("ongra")) {
    hfStatusEl.textContent = "ångra";
    hfStopListening();
    if (!undoLastAnswer()) hfStartListening(true);
    return true;
  }
  for (const cmd of HF_CMDS) {
    if (!t.includes(cmd.word)) continue;
    hfStatusEl.textContent = cmd.word;
    setTimeout(() => { if (hfStatusEl.textContent === cmd.word) hfStatusEl.textContent = "lyssnar…"; }, 1500);
    if (cmd.grade === null) {
      hfSpeakBack(null);
    } else if (card.classList.contains("flipped")) {
      // Redan flippat → svaret är redan uppläst (via "flippa"), läs inte upp igen.
      // hfFinishGrade läser ändå minnesregeln vid "hopplöst" innan nästa kort.
      hfStopListening();
      hfFinishGrade(cmd.grade);
    } else {
      // Inte flippat → läs upp svaret en gång innan betygssättning.
      hfSpeakBack(cmd.grade);
    }
    return true;
  }
  return false;
}

function hfStartListening(resetTimer) {
  if (!handsfreeActive) return;
  hfListening = true;
  hfStatusEl.textContent = "lyssnar…";

  if (resetTimer) {
    clearTimeout(hfTimeoutId);
    hfTimeoutId = setTimeout(() => {
      if (!handsfreeActive || !hfListening) return;
      if (hfRecognition) { try { hfRecognition.abort(); } catch (_) {} }
      hfListening = false;
      // Upprepa aktuell sida efter 15 s tystnad
      if (card.classList.contains("flipped")) hfSpeakBack(null);
      else hfSpeakFront();
    }, 15000);
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { hfStatusEl.textContent = "Taligenkänning stöds ej på den här enheten"; return; }

  const rec = new SR();
  hfRecognition = rec;
  rec.lang = "sv-SE";
  rec.continuous = false;
  rec.interimResults = false;
  rec.maxAlternatives = 3;

  rec.onresult = (e) => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (!e.results[i].isFinal) continue;
      for (let j = 0; j < e.results[i].length; j++) {
        if (hfHandleTranscript(e.results[i][j].transcript)) return;
      }
    }
  };

  rec.onerror = (e) => {
    if (e.error === "aborted" || e.error === "no-speech") return;
    if (e.error === "not-allowed") {
      hfStatusEl.textContent = "Mikrofon ej tillåten";
      stopHandsfree();
    }
  };

  rec.onend = () => {
    // iOS stänger av continuous mode — starta om direkt
    if (handsfreeActive && hfListening) {
      setTimeout(() => {
        if (handsfreeActive && hfListening) {
          hfRecognition = null;
          hfStartListening(false); // fortsätt utan att nolla timeout
        }
      }, 250);
    }
  };

  try { rec.start(); } catch (_) {}
}

// =========================================================================
//  PWA + start
// =========================================================================
const APP_VERSION = "v263";
const versionTag = $("version-tag"); // kan saknas om en gammal cachad index.html serveras
if (versionTag) {
  versionTag.textContent = "Flippa " + APP_VERSION;
  versionTag.classList.add("tappable"); // klickbar → versionshistorik
  versionTag.onclick = openChangelog;
}

// Ladda bara om för en ny version när det är ofarligt: på ämnes-/lektionslistan,
// utan pågående pass, handsfree eller öppen modal. Annars väntar omladdningen tills
// man är tillbaka på en lista (se anropen i renderSubjects/renderLessons).
function isSafeToReloadForUpdate() {
  return (activeScreen === "subjects" || activeScreen === "lessons")
    && !session && !handsfreeActive
    && modalRoot.classList.contains("hidden");
}
function maybeReloadForUpdate() {
  if (!pendingReload || swReloading) return;
  if (!isSafeToReloadForUpdate()) return;
  swReloading = true;
  // Flagga att NÄSTA laddning är en uppdaterings-omladdning (ej vanlig kallstart) →
  // splashen visar en lugn text så det inte ser ut som en krasch. sessionStorage
  // överlever reload i samma flik men är tom vid äkta kallstart.
  try { sessionStorage.setItem("flippa-updated", "1"); } catch (_) {}
  location.reload();
}

if ("serviceWorker" in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  // Ny service worker tog över → ladda INTE om direkt (kan vara mitt i ett pass).
  // Markera väntande och ladda om vid nästa säkra tillfälle.
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController) return;
    pendingReload = true;
    maybeReloadForUpdate();
  });
  // Notis-tryck när appen redan är öppen: service workern ber oss öppna senaste ämne.
  navigator.serviceWorker.addEventListener("message", (e) => {
    if (e.data && e.data.type === "flippa-open-subject") openLastSubjectFromPush();
  });
  navigator.serviceWorker
    .register("sw.js", { updateViaCache: "none" })
    .then((reg) => {
      reg.update();
      // Leta efter ny version när appen kommer i förgrunden + periodiskt
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") reg.update();
      });
      setInterval(() => reg.update(), 60000);
    })
    .catch(() => {});
}

// Kallstart via notis (#pushopen) → öppna senaste ämne när innehållet laddats.
try {
  if (location.hash.indexOf("pushopen") >= 0) {
    pendingPushOpen = true;
    history.replaceState(null, "", location.pathname + location.search);
  }
} catch (_) {}

boot();

// Splash: visa minst SPLASH_MIN_MS (mätt från sidstart) och fejda sedan ut.
// Ändra SPLASH_MIN_MS för annan visningstid.
const SPLASH_MIN_MS = 1800;
(function () {
  const splash = document.getElementById("splash");
  if (!splash) return;
  // Uppdaterings-omladdning (flagga satt i maybeReloadForUpdate) → lugn text så det
  // inte ser ut som en krasch. Nollas direkt; syns inte vid vanlig kallstart.
  try {
    if (sessionStorage.getItem("flippa-updated")) {
      sessionStorage.removeItem("flippa-updated");
      const note = document.createElement("div");
      note.className = "splash-note";
      note.textContent = "Uppdaterar till senaste versionen…";
      splash.appendChild(note);
    }
  } catch (_) {}
  const t0 = performance.now();
  const hide = () => { splash.classList.add("hide"); setTimeout(() => splash.remove(), 500); };
  const schedule = () => setTimeout(hide, Math.max(0, SPLASH_MIN_MS - (performance.now() - t0)));
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule);
})();
