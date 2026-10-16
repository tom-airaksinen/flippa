#!/usr/bin/env python3
"""Fyller böjningsserien på rumänska ADJEKTIV som saknar den, ur Wiktionary.

  python3 scripts/ro-adjektiv.py plan     visa vad som skulle ändras
  python3 scripts/ro-adjektiv.py apply    skriv till databasen

Varför ordboken och inte modellen: språkmodellen gav "vechi, vechi, vechi" där
femininum är "veche". Formerna ska komma från en ordbok, modellen får välja orden.
(Samma mönster som ro-former.py för substantiv och verb.)

Serien är mask. sg, fem. sg, plural – en gemensam pluralform eller två, och just
det går inte att gissa sig till. Det är hela skälet att den ska läras som serie.

TRE SAKER HOPPAS ÖVER, och de är poängen med skriptet:
  * Ord som ocksÅ är substantiv eller verb i ordboken ("august" månaden, "bine"
    adverbet). Ordboken vet inte vilken ordklass KORTET menar.
  * Serier där alla former är lika – de säger ingenting, och ett fält som bara
    upprepar uppslagsformen är brus.
  * Kort som redan har en böjning. Inget skrivs över.
Det överhoppade listas så att det går att fylla i för hand.
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kort

HERE = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(HERE, "..", "..", "gnugga", "scripts", "raw", "ro-former-index.json")

def rensa(front):
    """Kortets framsida → uppslagsform. '(f)' och liknande markörer bort."""
    return re.sub(r"\s*\([fmn]\)\s*$", "", (front or "").strip())

def samla(agare=None):
    ix = json.load(open(INDEX, encoding="utf-8"))
    subs = kort.get("content/subjects") or {}
    plan, hoppade = [], []
    for sid, s in subs.items():
        if not str(s.get("lang") or "").lower().startswith("ro"): continue
        if agare and s.get("owner") != agare: continue
        for lid, l in (s.get("lessons") or {}).items():
            for cid, c in (l.get("cards") or {}).items():
                if (c.get("form") or "").strip(): continue
                w = rensa(c.get("front"))
                if not w or " " in w or w not in ix["adjs"]: continue
                serie = ix["adjs"][w][0]["serie"]
                rad = {"sid": sid, "lid": lid, "cid": cid, "amne": s.get("name"),
                       "lektion": l.get("name"), "agare": s.get("owner"),
                       "front": c.get("front"), "back": c.get("back"),
                       "serie": ", ".join(serie)}
                if w in ix["nouns"] or w in ix["verbs"]:
                    rad["skal"] = "även substantiv/verb i ordboken"
                    hoppade.append(rad)
                elif len(set(serie)) == 1:
                    rad["skal"] = "oböjligt – serien säger ingenting"
                    hoppade.append(rad)
                else:
                    plan.append(rad)
    return plan, hoppade

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "plan"
    agare = sys.argv[2] if len(sys.argv) > 2 else None
    if not os.path.exists(INDEX):
        sys.exit("inget index – kör först: python3 scripts/ro-former.py bygg")
    plan, hoppade = samla(agare)

    print(f"FYLLS: {len(plan)} adjektiv\n")
    for r in plan:
        print(f"  {r['agare']:<7} {r['front']:<16} {str(r['back'])[:24]:<26} {{{r['serie']}}}")
    print(f"\nHOPPAS ÖVER: {len(hoppade)} – fyll i för hand om något av dem är adjektiv\n")
    for r in hoppade:
        print(f"  {r['agare']:<7} {r['front']:<16} {str(r['back'])[:24]:<26} {r['skal']}")

    if cmd != "apply":
        print("\n(torrkörning – lägg till 'apply' för att skriva)")
        return

    for r in plan:
        kort.http("PATCH", f"{kort.DB}/content/subjects/{r['sid']}/lessons/{r['lid']}/cards/{r['cid']}.json"
                           f"?auth={kort.token()}", {"form": r["serie"]})
    # Läs tillbaka och kontrollera – en skrivning som inte går att verifiera räknas inte.
    fel = []
    for r in plan:
        v = kort.get(f"content/subjects/{r['sid']}/lessons/{r['lid']}/cards/{r['cid']}/form")
        if v != r["serie"]: fel.append((r["front"], v))
    print(f"\nVERIFIERAT: {len(plan) - len(fel)} av {len(plan)} skrivna korrekt")
    for f, v in fel: print("  AVVIKER:", f, "->", repr(v))

if __name__ == "__main__":
    main()
