#!/usr/bin/env python3
"""Radera enstaka kort eller lägga till kort i en lektion (Flippas databas).

Samma mönster som de andra skripten: anonym auth, plan före apply, och varje
skrivning verifieras genom att läsa tillbaka.

  visa      <sid> <lid>              lista kortens id, framsida, baksida, prio, böjning
  radera    <sid> <lid> <fil.json>   {kortId: "förväntad framsida"} – raderar bara om
                                     framsidan stämmer EXAKT (skydd mot fel kort)
  tr        <sid> <lid> <fil.json>  skriver bara translittereringsfältet: {kortId: "salâm"}
  lagg-till <sid> <lid> <fil.txt>    rader i inklistringsformat
                                     "framsida;baksida;{böjning};prio".
                                     Framsidor som redan finns i lektionen hoppas över.

Lägg till 'plan' som sista argument för torrkörning.

OBS: SRS och favoriter nycklas på ordtexten, så ett raderat kort tappar sin
inlärning. Radera bara kort som är trasiga.
"""
import json, sys, re, urllib.request

API_KEY = "AIzaSyAFFQFMBqspO71R1ykDU6VdTSaFY1P-6dA"
DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app"

def die(m): print("FEL: " + m, file=sys.stderr); sys.exit(1)

def http(method, url, payload=None):
    data = json.dumps(payload, ensure_ascii=False).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or "null")

_tok = None
def token():
    global _tok
    if not _tok:
        _tok = http("POST", f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
                    {"returnSecureToken": True})["idToken"]
    return _tok

def get(p):        return http("GET", f"{DB}/{p}.json?auth={token()}")
def delete(p):     return http("DELETE", f"{DB}/{p}.json?auth={token()}")
def post(p, v):    return http("POST", f"{DB}/{p}.json?auth={token()}", v)

def cards(sid, lid):
    c = get(f"content/subjects/{sid}/lessons/{lid}/cards")
    if c is None: die("hittade ingen lektion på den sökvägen")
    return c

def parse_line(line):
    """Appens inklistringsformat → (front, back, form, prio). Samma regler som parseLines."""
    rest = line.strip()
    prio = None
    j = rest.rfind(";")
    if j >= 0 and rest[j+1:].strip() in ("1", "2", "3"):
        prio = int(rest[j+1:].strip()); rest = rest[:j]
    m = re.match(r"^(.*?);(.*)$", rest)
    if not m: return None
    front, tail = m.group(1).strip(), m.group(2)
    fm = re.match(r"^(.*?);?\s*\{([^}]*)\}\s*$", tail)
    form = fm.group(2).strip() if fm else None
    back = (fm.group(1) if fm else tail).strip()
    if not front or not back: return None
    return front, back, form, prio

def cmd_visa(sid, lid):
    for cid, c in sorted(cards(sid, lid).items(), key=lambda kv: kv[1].get("order", 0)):
        print(f"{cid}\t{c.get('front')}\t{c.get('back')}\tprio={c.get('prio')}\tform={c.get('form')}")

def cmd_radera(sid, lid, fil, dry):
    spec = json.load(open(fil))
    db = cards(sid, lid)
    jobb = []
    for cid, front in spec.items():
        c = db.get(cid)
        if not c: die(f"{cid} finns inte i lektionen")
        if c.get("front") != front:
            die(f"{cid}: framsidan är {c.get('front')!r}, inte {front!r} – inget raderat")
        jobb.append((cid, front, c.get("back")))
    for cid, f, b in jobb: print(f"  − {f!r} / {b!r}")
    print(f"{len(jobb)} kort {'skulle raderas' if dry else 'raderas'} · {len(db) - len(jobb)} blir kvar")
    if dry: return
    for cid, _, _ in jobb: delete(f"content/subjects/{sid}/lessons/{lid}/cards/{cid}")
    kvar = cards(sid, lid)
    if any(cid in kvar for cid, _, _ in jobb): die("något kort finns kvar – kontrollera manuellt")
    print(f"RADERAT: {len(jobb)} kort. Kvar: {len(kvar)}.")

def cmd_lagg_till(sid, lid, fil, dry):
    db = cards(sid, lid)
    fanns = {(c.get("front") or "").strip() for c in db.values()}
    order = max([c.get("order", 0) for c in db.values()] or [0])
    nya, hoppade = [], 0
    for line in open(fil, encoding="utf-8"):
        if not line.strip() or line.startswith("#"): continue
        p = parse_line(line)
        if not p: print(f"  ? kunde inte tolka: {line.strip()}"); continue
        front, back, form, prio = p
        if front in fanns: hoppade += 1; continue
        fanns.add(front)
        order += 1
        kort = {"front": front, "back": back, "order": order}
        if prio: kort["prio"] = prio
        if form: kort["form"] = form
        nya.append(kort)
    for k in nya[:10]: print(f"  + {k['front']!r} / {k['back']!r}" + (f" {{{k['form']}}}" if k.get("form") else ""))
    if len(nya) > 10: print(f"  … och {len(nya)-10} till")
    print(f"{len(nya)} kort {'skulle läggas till' if dry else 'läggs till'} · {hoppade} fanns redan")
    if dry or not nya: return
    for k in nya: post(f"content/subjects/{sid}/lessons/{lid}/cards", k)
    efter = cards(sid, lid)
    saknas = [k["front"] for k in nya if not any((c.get("front") or "") == k["front"] for c in efter.values())]
    if saknas: die(f"följande skrevs inte: {saknas}")
    print(f"TILLAGT: {len(nya)} kort. Lektionen har nu {len(efter)}.")

def cmd_tr(sid, lid, fil, dry):
    """Skriver BARA fältet "tr" (translitterering). fil.json: {kortId: "salâm"}.
    Kortet måste finnas; inget annat fält rörs."""
    spec = json.load(open(fil))
    db = cards(sid, lid)
    saknas = [cid for cid in spec if cid not in db]
    if saknas: die(f"{len(saknas)} kort-id finns inte i lektionen: {saknas[:3]}")
    for cid, v in list(spec.items())[:8]:
        print(f"  {db[cid].get('front')!r} → {v!r}")
    if len(spec) > 8: print(f"  … och {len(spec)-8} till")
    print(f"{len(spec)} translittereringar {'skulle skrivas' if dry else 'skrivs'}")
    if dry: return
    for cid, v in spec.items():
        http("PATCH", f"{DB}/content/subjects/{sid}/lessons/{lid}/cards/{cid}.json?auth={token()}", {"tr": v})
    efter = cards(sid, lid)
    fel = [cid for cid, v in spec.items() if efter[cid].get("tr") != v]
    if fel: die(f"{len(fel)} skrevs inte korrekt")
    andrat = [cid for cid in spec if efter[cid].get("front") != db[cid].get("front")
              or efter[cid].get("back") != db[cid].get("back")]
    if andrat: die("andra fält ändrades – kontrollera manuellt")
    print(f"SKRIVET: {len(spec)} translittereringar. Front/back oförändrade.")

if __name__ == "__main__":
    a = sys.argv[1:]
    dry = bool(a) and a[-1] == "plan"
    if dry: a = a[:-1]
    if not a: die(__doc__)
    if a[0] == "visa" and len(a) == 3: cmd_visa(a[1], a[2])
    elif a[0] == "radera" and len(a) == 4: cmd_radera(a[1], a[2], a[3], dry)
    elif a[0] == "lagg-till" and len(a) == 4: cmd_lagg_till(a[1], a[2], a[3], dry)
    elif a[0] == "tr" and len(a) == 4: cmd_tr(a[1], a[2], a[3], dry)
    else: die("okänt kommando – kör utan argument för hjälp")
