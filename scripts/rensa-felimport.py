#!/usr/bin/env python3
"""Tar bort lektioner som en felaktig import skapade – en lektion per ord.

Samma mönster som de andra skripten: all databashantering ligger här, anonym auth,
plan före apply. Skriptet kan BARA radera lektioner som uppfyller alla villkor:

  1. lektionen har exakt ETT kort,
  2. lektionens NAMN är identiskt med en framsida i någon av källfilerna,
  3. kortets framsida är identisk med den radens baksida (svenska).

Allt annat lämnas orört – en lektion med två kort kan skriptet inte röra, oavsett
vad man skriver på kommandoraden. Backup krävs innan något raderas.

  backup <sid> <fil.json>          hela ämnet till fil (körs först, krävs av apply)
  plan   <sid> <mapp med *.txt>    visar exakt vilka lektioner som skulle raderas
  apply  <sid> <mapp> <fil.json>   raderar dem och verifierar resten
"""
import json, os, sys, urllib.request, glob, re

API_KEY = "AIzaSyAFFQFMBqspO71R1ykDU6VdTSaFY1P-6dA"
DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app"

def die(m):
    print("FEL: " + m, file=sys.stderr); sys.exit(1)

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

def get(p):    return http("GET", f"{DB}/{p}.json?auth={token()}")
def delete(p): return http("DELETE", f"{DB}/{p}.json?auth={token()}")

def kallrader(mapp):
    """{framsida: svensk baksida} ur inklistringsfilerna."""
    rader = {}
    for p in sorted(glob.glob(os.path.join(mapp, "*.txt"))):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if not line or line.startswith("#"): continue
            rest = line
            j = rest.rfind(";")
            if j >= 0 and rest[j+1:].strip() in ("1", "2", "3"): rest = rest[:j]
            m = re.match(r"^(.*?);(.*)$", rest)
            if not m: continue
            front, back = m.group(1).strip(), m.group(2)
            fm = re.match(r"^(.*?);?\s*\{([^}]*)\}\s*$", back)
            rader[front] = (fm.group(1) if fm else back).strip()
    return rader

def kandidater(sid, mapp):
    rader = kallrader(mapp)
    if not rader: die(f"hittade inga rader i {mapp}/*.txt")
    lessons = get(f"content/subjects/{sid}/lessons") or {}
    if not lessons: die("hittade inga lektioner på det ämnet")
    ut, behall = [], []
    for lid, l in lessons.items():
        cards = l.get("cards") or {}
        namn = (l.get("name") or "").strip()
        if len(cards) == 1 and namn in rader:
            (cid, c), = cards.items()
            if (c.get("front") or "").strip() == rader[namn]:
                ut.append((lid, namn, c.get("front"), c.get("back")))
                continue
        behall.append((lid, namn, len(cards)))
    return ut, behall

def cmd_backup(sid, fil):
    data = get(f"content/subjects/{sid}")
    if not data: die("ämnet finns inte")
    json.dump(data, open(fil, "w"), ensure_ascii=False)
    n = sum(len(l.get("cards") or {}) for l in (data.get("lessons") or {}).values())
    print(f"backup: {len(data.get('lessons') or {})} lektioner, {n} kort → {fil}")

def cmd_plan(sid, mapp, tyst=False):
    ut, behall = kandidater(sid, mapp)
    if not tyst:
        for lid, namn, f, b in ut[:10]:
            print(f"  - {namn!r}  (1 kort: {f!r} → {b!r})")
        if len(ut) > 10: print(f"  … och {len(ut)-10} till")
        print("\nBEHÅLLS:")
        for lid, namn, n in sorted(behall, key=lambda t: -t[2]):
            print(f"  = {namn}  {n} kort")
    print(f"\n{len(ut)} lektioner skulle raderas, {len(behall)} behållas "
          f"({sum(n for _, _, n in behall)} kort kvar).")
    return ut

def cmd_apply(sid, mapp, backupfil):
    if not os.path.exists(backupfil): die("backupfilen finns inte – kör 'backup' först")
    fore = get(f"content/subjects/{sid}/lessons") or {}
    ut = cmd_plan(sid, mapp, tyst=True)
    if not ut: print("inget att göra"); return
    kvar_fore = {lid: len(l.get("cards") or {}) for lid, l in fore.items()
                 if lid not in {x[0] for x in ut}}
    for lid, namn, _, _ in ut:
        delete(f"content/subjects/{sid}/lessons/{lid}")
    efter = get(f"content/subjects/{sid}/lessons") or {}
    kvar_efter = {lid: len(l.get("cards") or {}) for lid, l in efter.items()}
    if kvar_efter != kvar_fore:
        die(f"AVVIKELSE efter radering: {len(kvar_efter)} lektioner kvar, "
            f"{len(kvar_fore)} förväntade – backupen i {backupfil} har allt")
    print(f"RADERAT: {len(ut)} lektioner. Kvar: {len(kvar_efter)} lektioner, "
          f"{sum(kvar_efter.values())} kort – oförändrade.")

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: die(__doc__)
    if a[0] == "backup" and len(a) == 3: cmd_backup(a[1], a[2])
    elif a[0] == "plan" and len(a) == 3: cmd_plan(a[1], a[2])
    elif a[0] == "apply" and len(a) == 4: cmd_apply(a[1], a[2], a[3])
    else: die("okänt kommando – kör utan argument för hjälp")
