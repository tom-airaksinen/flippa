#!/usr/bin/env python3
"""Rättar framsidan på enskilda kort (t.ex. saknad genusmarkering).

OBS: SRS och favoriter nycklas på ordtexten (front|back). Ändrad framsida =
kortet börjar om i låda 1 och tappar ev. stjärna. Använd bara när rättelsen är
värd det, och aldrig på hela lektioner.

  plan  <sid> <fil.json>   torrkörning: visar nuvarande → ny framsida
  apply <sid> <fil.json>   skriver, och läser tillbaka för kontroll

fil.json: { "<lektionsId>": { "<kortId>": ["nuvarande front", "ny front"] } }
Skriptet vägrar om den nuvarande framsidan inte stämmer exakt, och rör inga
andra fält (baksida, böjning, prio, order).
"""
import json, sys, urllib.request

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

def get(p): return http("GET", f"{DB}/{p}.json?auth={token()}")
def patch(p, v): return http("PATCH", f"{DB}/{p}.json?auth={token()}", v)

def kontrollera(sid, spec):
    jobb = []
    for lid, kort in spec.items():
        for cid, (nu, ny) in kort.items():
            c = get(f"content/subjects/{sid}/lessons/{lid}/cards/{cid}")
            if not c: die(f"kortet {cid} finns inte i lektionen {lid}")
            if c.get("front") != nu:
                die(f"{cid}: framsidan är {c.get('front')!r}, inte {nu!r} – inget skrivet")
            if nu == ny: die(f"{cid}: ny framsida är samma som den gamla")
            jobb.append((lid, cid, nu, ny, c))
    return jobb

def cmd_plan(sid, fil):
    for lid, cid, nu, ny, c in kontrollera(sid, json.load(open(fil))):
        print(f"  {nu!r} → {ny!r}   (baksida {c.get('back')!r}, böjning {c.get('form')!r} rörs inte)")
    print("\nSRS och ev. stjärna för dessa kort nollställs – nyckeln är ordtexten.")

def cmd_apply(sid, fil):
    jobb = kontrollera(sid, json.load(open(fil)))
    for lid, cid, nu, ny, fore in jobb:
        patch(f"content/subjects/{sid}/lessons/{lid}/cards/{cid}", {"front": ny})
        efter = get(f"content/subjects/{sid}/lessons/{lid}/cards/{cid}")
        if efter.get("front") != ny: die(f"{cid}: skrivningen tog inte")
        andrat = [k for k in ("back", "form", "prio", "hint", "order")
                  if fore.get(k) != efter.get(k)]
        if andrat: die(f"{cid}: andra fält ändrades ({andrat}) – kontrollera manuellt")
        print(f"OK  {nu!r} → {ny!r}")
    print(f"{len(jobb)} framsidor rättade, inga andra fält rörda.")

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: die(__doc__)
    if a[0] == "plan" and len(a) == 3: cmd_plan(a[1], a[2])
    elif a[0] == "apply" and len(a) == 3: cmd_apply(a[1], a[2])
    else: die("okänt kommando – kör utan argument för hjälp")
