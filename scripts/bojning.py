#!/usr/bin/env python3
"""Fyller i böjningsfältet (form) på kort i en lektion.

Samma mönster som kopiera-omrade.py: all databashantering ligger här, anonym
auth precis som appen, ingen hemlighet behövs.

  lektioner <ägare>            lista ämnen + lektioner för en ägare
  visa      <sid> <lid>        lista lektionens kort (id, fram, bak, ev. böjning)
  plan      <sid> <lid> <fil>  TORRKÖRNING: visar exakt vad som skulle skrivas
  apply     <sid> <lid> <fil>  skriver böjningarna och läser tillbaka för kontroll

<fil> är JSON: { "<kortId>": "o casă, două case", ... }

Säkerhet: skriver BARA fältet "form" på de kort som namnges i filen, ett i taget
via PATCH. Rör aldrig front/back/hint/prio/order och kan inte radera ett kort.
"""
import json, sys, urllib.request, urllib.error

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

def get(path):  return http("GET", f"{DB}/{path}.json?auth={token()}")
def patch(path, val): return http("PATCH", f"{DB}/{path}.json?auth={token()}", val)

def cards(sid, lid):
    c = get(f"content/subjects/{sid}/lessons/{lid}/cards")
    if c is None: die("hittade ingen lektion på den sökvägen")
    return c

def cmd_lektioner(agare):
    subs = get("content/subjects") or {}
    for sid, s in subs.items():
        if s.get("owner") != agare: continue
        print(f"{s.get('name')}   (sid {sid}, lang {s.get('lang')}, forms {s.get('forms')})")
        for lid, l in (s.get("lessons") or {}).items():
            print(f"    {l.get('name'):30} lid {lid}   {len(l.get('cards') or {})} kort")

def cmd_visa(sid, lid):
    c = cards(sid, lid)
    rader = sorted(c.items(), key=lambda kv: kv[1].get("order", 0))
    for cid, k in rader:
        f = k.get("form")
        print(f"{cid:22} {str(k.get('front')):28} {str(k.get('back')):24} {('[' + f + ']') if f else ''}")
    print(f"\n{len(rader)} kort, varav {sum(1 for _, k in rader if k.get('form'))} med böjning")

def las_plan(sid, lid, fil):
    with open(fil, encoding="utf-8") as fh:
        plan = json.load(fh)
    c = cards(sid, lid)
    okanda = [k for k in plan if k not in c]
    if okanda: die("kort-id finns inte i lektionen: " + ", ".join(okanda))
    return plan, c

def cmd_plan(sid, lid, fil):
    plan, c = las_plan(sid, lid, fil)
    ändras = 0
    for cid, form in plan.items():
        nu = c[cid].get("form")
        märke = "=" if nu == form else ("+" if not nu else "~")
        if märke != "=": ändras += 1
        print(f" {märke} {c[cid].get('front'):26} {c[cid].get('back'):22} -> {form}")
    print(f"\n{len(plan)} kort i planen, {ändras} skulle ändras. (+ ny, ~ ersätter, = redan lika)")
    print("Inga andra fält rörs.")

def cmd_apply(sid, lid, fil):
    plan, c = las_plan(sid, lid, fil)
    for cid, form in plan.items():
        patch(f"content/subjects/{sid}/lessons/{lid}/cards/{cid}", {"form": form})
    efter = cards(sid, lid)
    fel = 0
    for cid, form in plan.items():
        if efter[cid].get("form") != form:
            print(f"FEL {cid}: {efter[cid].get('form')!r} != {form!r}"); fel += 1
        for f in ("front", "back", "hint", "prio", "order"):
            if c[cid].get(f) != efter[cid].get(f):
                print(f"FEL {cid}: {f} ändrades!"); fel += 1
    print(f"{len(plan)} kort skrivna, {fel} fel. Övriga fält oförändrade." if not fel
          else f"{fel} FEL – kontrollera ovan")
    sys.exit(1 if fel else 0)

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: die(__doc__)
    if a[0] == "lektioner": cmd_lektioner(a[1])
    elif a[0] == "visa":    cmd_visa(a[1], a[2])
    elif a[0] == "plan":    cmd_plan(a[1], a[2], a[3])
    elif a[0] == "apply":   cmd_apply(a[1], a[2], a[3])
    else: die("okänt kommando")
