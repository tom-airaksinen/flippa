#!/usr/bin/env python3
"""Ett enda steg för en Flippa-release: bumpa, dokumentera, testa.

  python3 scripts/release.py --changelog "Text som användaren läser" --typ fixed \
                             --hjalp nej --tracking nej

  python3 scripts/release.py --changelog internt --hjalp nej --tracking nej
        (ren refaktor eller osynlig fix – ingen changelog-post)

VARFÖR SKRIPTET FINNS
Tre gånger har kod deployats medan hjälptexten eller changelog-posten blev kvar:
dokumentationen kördes som en SEPARAT sats i skalet, föll tyst, och commit gick
ändå igenom. Här hänger allt ihop – faller något steg skrivs INGENTING.

De tre frågorna nedan är precis de stående reglerna i CLAUDE.md. De är
OBLIGATORISKA flaggor just för att de inte ska gå att glömma; att svara "nej" är
ett medvetet beslut, att inte svara alls är ett misstag.

  --changelog   texten användaren läser, eller "internt" för ingen post
  --hjalp       ja | nej      ändrar detta HUR appen används? (då ska Hjälp uppdateras)
  --tracking    ja | nej      behövde event-trackingen läggas till/ändras?

Skriptet committar INTE. Det skriver filerna och kör testsviten; commit-meddelandet
skrivs för hand eftersom det ska förklara VARFÖR.
"""
import argparse, datetime, os, re, subprocess, sys

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP, SW, CHANGELOG = (os.path.join(ROT, f) for f in ("app.js", "sw.js", "data/changelog.js"))
MANADER = ["januari", "februari", "mars", "april", "maj", "juni",
           "juli", "augusti", "september", "oktober", "november", "december"]

def die(m): print("\nAVBRYTER: " + m, file=sys.stderr); sys.exit(1)
def las(p): return open(p, encoding="utf-8").read()

def nuvarande():
    a = re.search(r'const APP_VERSION = "v(\d+)";', las(APP))
    s = re.search(r'const CACHE = "flashcards-v(\d+)";', las(SW))
    if not a or not s: die("hittar inte APP_VERSION eller CACHE")
    if a.group(1) != s.group(1):
        die(f"app.js är v{a.group(1)} men sw.js v{s.group(1)} – de måste vara lika INNAN "
            "en ny release. Rätta det först, annars döljer bumpen ett befintligt fel.")
    return int(a.group(1))

def main():
    p = argparse.ArgumentParser(add_help=True)
    p.add_argument("--changelog", required=True,
                   help='texten användaren läser, eller "internt" för ingen post')
    p.add_argument("--typ", default="improved", choices=["new", "improved", "fixed"])
    p.add_argument("--ico", help="emoji för höjdpunkt i 'Vad är nytt'")
    p.add_argument("--desc", help="kort beskrivning för höjdpunktskortet")
    p.add_argument("--hjalp", required=True, choices=["ja", "nej"],
                   help="ändrar detta HUR appen används? ja = Hjälp är uppdaterad")
    p.add_argument("--tracking", required=True, choices=["ja", "nej"],
                   help="behövde event-trackingen ändras? ja = den är ändrad")
    a = p.parse_args()

    gammal = nuvarande()
    ny = gammal + 1
    steg = []

    # --- 1. versionerna, alltid tillsammans -------------------------------
    for fil, monster, ersatt in (
        (APP, f'const APP_VERSION = "v{gammal}";', f'const APP_VERSION = "v{ny}";'),
        (SW, f'const CACHE = "flashcards-v{gammal}";', f'const CACHE = "flashcards-v{ny}";'),
    ):
        s = las(fil)
        if monster not in s: die(f"hittar inte {monster!r} i {os.path.basename(fil)}")
        open(fil, "w", encoding="utf-8").write(s.replace(monster, ersatt, 1))
    steg.append(f"v{gammal} → v{ny} i app.js och sw.js")

    # --- 2. changelog ------------------------------------------------------
    if a.changelog != "internt":
        idag = datetime.date.today()
        datum = f"{idag.day} {MANADER[idag.month - 1]} {idag.year}"
        txt = a.changelog.replace('"', '\\"')
        post = f'    {{ t: "{txt}", type: "{a.typ}"'
        if a.ico:
            post += f', hi: true, ico: "{a.ico}", desc: "{(a.desc or a.changelog).replace(chr(34), chr(92)+chr(34))}"'
        post += " },"
        s = las(CHANGELOG)
        if "const CHANGELOG = [\n" not in s: die("hittar inte CHANGELOG-listan")
        s = s.replace("const CHANGELOG = [\n",
                      f'const CHANGELOG = [\n  {{ date: "{datum}", ver: "v{ny}", items: [\n{post}\n  ] }},\n', 1)
        open(CHANGELOG, "w", encoding="utf-8").write(s)
        steg.append(f"changelog-post för v{ny} ({datum})")
    else:
        steg.append("ingen changelog-post (internt)")

    # --- 3. de stående frågorna -------------------------------------------
    if a.hjalp == "nej": steg.append("Hjälp: bedömd som oförändrad")
    else: steg.append("Hjälp: uppdaterad (av dig, innan detta skript)")
    if a.tracking == "nej": steg.append("Event-tracking: bedömd som oförändrad")
    else: steg.append("Event-tracking: ändrad (av dig, innan detta skript)")

    # --- 4. testsviten SIST, så den ser slutresultatet ---------------------
    r = subprocess.run(["node", "test/kor.mjs"], cwd=ROT, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout)
        die("testsviten föll – inget är deployat, men filerna är ändrade. "
            "Laga felet och kör testerna igen.")
    sista = [x for x in r.stdout.strip().split("\n") if x.strip()][-1]

    print("\n".join("  ✓ " + x for x in steg))
    print(f"  ✓ testsviten: {sista}")
    print(f"\nKlart att committa som v{ny}. Skriv commit-meddelandet för hand.")

if __name__ == "__main__":
    main()
