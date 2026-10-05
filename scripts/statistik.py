#!/usr/bin/env python3
"""Hämtar Flippas användning ur GoatCounter – vem pluggar vilket språk, och när.

  python3 scripts/statistik.py              igår + idag
  python3 scripts/statistik.py 7            senaste 7 dagarna
  python3 scripts/statistik.py 2026-09-25 2026-10-02
  python3 scripts/statistik.py --raw        skriv ut API-svaret oförändrat
  python3 scripts/statistik.py --fil x.json läs ett sparat svar i stället för att anropa

TOKEN: skapas en gång under Settings → API tokens på flippa.goatcounter.com, med
rättigheten "Read statistics". Lägg den i ~/.config/flippa-goatcounter-token
(en rad, inget annat) eller i miljövariabeln GOATCOUNTER_TOKEN. Filen ligger
medvetet UTANFÖR repot.

Språknamnen ligger i SPRAK nedan. Appen hämtar sina namn ur webbläsarens Intl, så
det finns ingen tabell i app.js att läsa i stället. Okända koder skrivs som de är.

OBS: Toms egen profil skickar aldrig events (se track() i app.js) – allt som syns
här är någon annans användning.
"""
import json, os, sys, time, urllib.request, urllib.error
from datetime import date, timedelta

SITE = "https://flippa.goatcounter.com"
TOKENFIL = os.path.expanduser("~/.config/flippa-goatcounter-token")
# Eventen vi bryr oss om. Prefixen sätts i app.js (track("pass-sprak/" + trackLang())).
PASS_START, PASS_KLART = "pass-sprak/", "pass-klart-sprak/"
# Pass utan språkmärkning – de mättes innan språket började följa med, och de
# svarar på "har någon använt appen alls" även för äldre perioder.
PASS_ALLA = ("pass-lektion", "pass-dags", "pass-klart")
# Språket började följa med i mätningen här (v381). Dagar före det saknar språkdata
# – vilket INTE är samma sak som att ingen övade. Står i utskriften så siffrorna inte
# misstolkas när man frågar om en längre period.
SPRAK_FRAN = "2026-09-26"
# Över så många dagar blir dagstabellen oläslig → summering per språk i stället.
MAX_KOLUMNER = 12

def die(m, kod=1): print(m, file=sys.stderr); sys.exit(kod)

# Samma språk som KNOWN_LANGS i app.js, med svenska namn.
SPRAK = {
    "ar": "arabiska", "bg": "bulgariska", "bs": "bosniska", "ca": "katalanska",
    "cs": "tjeckiska", "da": "danska", "de": "tyska", "el": "grekiska",
    "en": "engelska", "es": "spanska", "et": "estniska", "fa": "persiska",
    "fi": "finska", "fr": "franska", "gl": "galiciska", "he": "hebreiska",
    "hi": "hindi", "hr": "kroatiska", "hu": "ungerska", "id": "indonesiska",
    "is": "isländska", "it": "italienska", "ja": "japanska", "ko": "koreanska",
    "lt": "litauiska", "lv": "lettiska", "mk": "makedonska", "ms": "malajiska",
    "nb": "norska", "nl": "nederländska", "pl": "polska", "pt": "portugisiska",
    "ro": "rumänska", "ru": "ryska", "sk": "slovakiska", "sl": "slovenska",
    "sr": "serbiska", "sv": "svenska", "sw": "swahili", "th": "thailändska",
    "tr": "turkiska", "uk": "ukrainska", "vi": "vietnamesiska", "zh": "kinesiska",
    "ej-sprak": "(ämne utan språk)",
}
def sprakanamn(kod):
    n = SPRAK.get(kod, kod)
    return n[0].upper() + n[1:] if n else kod

def token():
    t = os.environ.get("GOATCOUNTER_TOKEN", "").strip()
    if t: return t
    if os.path.exists(TOKENFIL):
        t = open(TOKENFIL, encoding="utf-8").read().strip()
        if t: return t
    die("Ingen API-token.\n"
        f"  1. Gå till {SITE}/user/api – skapa en token med \"Read statistics\".\n"
        f"  2. Spara den i {TOKENFIL} (en rad), eller sätt GOATCOUNTER_TOKEN.\n"
        "Filen ska INTE ligga i repot.")

# GoatCounter svarar sporadiskt 404 {"error":"not found"} på ett anrop som fungerar
# direkt när man gör om det – det slår till på första anropet efter en stunds paus.
# Likaså 429 vid snabba anrop. Bägge går över av sig själva, så vi gör om i stället
# för att skrika åt användaren.
FLYKTIGA = (404, 429, 500, 502, 503, 504)

def hamta_en(url, forsok=4):
    for n in range(forsok):
        req = urllib.request.Request(url, headers={"Authorization": "Bearer " + token(),
                                                   "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req) as r: return json.load(r)
        except urllib.error.HTTPError as e:
            kropp = e.read().decode("utf-8", "replace")[:300]
            if e.code in (401, 403):
                die(f"GoatCounter nekade token ({e.code}). Har den rättigheten "
                    f"\"Read statistics\"? Svar: {kropp}")
            if e.code in FLYKTIGA and n < forsok - 1:
                time.sleep(1.5 * (n + 1)); continue
            die(f"GoatCounter svarade {e.code} på {url}" + (f" ({forsok} försök)" if n else "") + f"\n{kropp}")
        except urllib.error.URLError as e:
            if n < forsok - 1: time.sleep(1.5 * (n + 1)); continue
            die(f"Kom inte fram till {SITE}: {e.reason}")

def hamta(start, slut):
    """Alla sidor av /api/v0/stats/hits för perioden, med dagsuppdelning."""
    hits, after = [], None
    for _ in range(20):                      # sidtak: 20 sidor räcker länge
        q = f"?start={start}&end={slut}&daily=true&limit=200"
        if after: q += f"&after={after}"
        svar = hamta_en(f"{SITE}/api/v0/stats/hits{q}")
        hits += svar.get("hits") or []
        if not svar.get("more"): break
        after = svar.get("after") or (hits[-1].get("path_id") if hits else None)
        if after is None: break
    return hits

def per_dag(hit):
    """{dag: antal} oavsett om API:t svarar med stats/daily eller bara en totalsumma."""
    ut = {}
    for s in hit.get("stats") or []:
        dag = s.get("day") or s.get("date")
        if not dag: continue
        n = s.get("daily")
        if n is None: n = sum(s.get("hourly") or [])
        ut[dag] = ut.get(dag, 0) + (n or 0)
    if not ut and hit.get("count"): ut["(hela perioden)"] = hit["count"]
    return ut

def main():
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    raw = "--raw" in sys.argv
    fil = None
    if "--fil" in sys.argv:
        i = sys.argv.index("--fil")
        if i + 1 >= len(sys.argv): die("--fil kräver en sökväg")
        fil = sys.argv[i + 1]; a = [x for x in a if x != fil]

    idag = date.today()
    if len(a) == 2:   start, slut = a[0], a[1]
    elif len(a) == 1 and a[0].isdigit():
        start, slut = str(idag - timedelta(days=int(a[0]) - 1)), str(idag)
    elif len(a) == 1: start = slut = a[0]
    else:             start, slut = str(idag - timedelta(days=1)), str(idag)

    hits = json.load(open(fil, encoding="utf-8")).get("hits") or [] if fil else hamta(start, slut)
    if raw: print(json.dumps(hits, ensure_ascii=False, indent=1)); return

    dagar, data = set(), {}
    for h in hits:
        p = (h.get("path") or "").lstrip("/")
        for prefix, nyckel in ((PASS_KLART, "klart"), (PASS_START, "start")):  # klart först: längre prefix
            if p.startswith(prefix):
                kod = p[len(prefix):] or "?"
                for dag, n in per_dag(h).items():
                    dagar.add(dag)
                    data.setdefault(kod, {}).setdefault(dag, {"start": 0, "klart": 0})[nyckel] += n
                break

    # Pass utan språkuppdelning: svarar på "har någon kört alls", även före SPRAK_FRAN.
    alla = {"start": 0, "klart": 0}
    for h in hits:
        p = (h.get("path") or "").lstrip("/")
        if p in ("pass-lektion", "pass-dags"): alla["start"] += h.get("count") or 0
        elif p == "pass-klart": alla["klart"] += h.get("count") or 0

    print(f"Flippa · {start} – {slut}" + ("  (ur fil)" if fil else ""))
    print(f"Pass totalt: {alla['start']} påbörjade · {alla['klart']} avslutade")
    if not data:
        print("\nInga språkmärkta pass i perioden. (Din egen profil räknas aldrig.)")
    else:
        dagar = sorted(dagar)
        bredd = max(14, *(len(sprakanamn(k)) + 2 for k in data))
        ordnade = sorted(data, key=lambda k: -sum(v["start"] for v in data[k].values()))
        if len(dagar) > MAX_KOLUMNER:
            # Summering: dagskolumnerna ryms inte, och en bred tabell döljer svaret.
            print("\n" + "språk".ljust(bredd) + "påbörjade".rjust(11) + "avslutade".rjust(11)
                  + "dagar".rjust(8) + "   senast")
            for kod in ordnade:
                v = data[kod]
                aktiva = [d for d in v if v[d]["start"]]
                print(sprakanamn(kod).ljust(bredd)
                      + str(sum(x["start"] for x in v.values())).rjust(11)
                      + str(sum(x["klart"] for x in v.values())).rjust(11)
                      + str(len(aktiva)).rjust(8) + "   " + (max(aktiva) if aktiva else "–"))
            print(f"\nhela perioden · dagar = dagar med minst ett pass")
        else:
            print("\n" + "språk".ljust(bredd) + "".join(d[5:].rjust(12) for d in dagar))
            for kod in ordnade:
                rad = sprakanamn(kod).ljust(bredd)
                for d in dagar:
                    v = data[kod].get(d)
                    rad += ("–" if not v or not v["start"] else f"{v['start']}/{v['klart']}").rjust(12)
                print(rad)
            print("\npåbörjade/avslutade pass per dag · – = inget")
    if start < SPRAK_FRAN:
        print(f"\nOBS: språket började mätas {SPRAK_FRAN} (v381). Pass före det syns i "
              f"totalraden men saknar språk.")

if __name__ == "__main__":
    main()
