#!/usr/bin/env python3
"""Mäter hur stort innehållsträdet är – dvs hur mycket varje enhet cachar i
localStorage (appen prenumererar på HELA content/subjects, oavsett ägare).

Endast läsning. Anonym auth, samma mönster som kopiera-omrade.py.

  storlek     storlek per område + totalt, samt uppskattad localStorage-andel
"""
import json, sys, urllib.request

API_KEY = "AIzaSyAFFQFMBqspO71R1ykDU6VdTSaFY1P-6dA"
DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app"

def http(method, url, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or "null")

_token = None
def token():
    global _token
    if not _token:
        _token = http("POST", f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
                      {"returnSecureToken": True})["idToken"]
    return _token

def get(path):
    return http("GET", f"{DB}/{path}.json?auth={token()}")

def kb(n): return f"{n/1024:.0f} kB"

subs = get("content/subjects") or {}
rader = []
for sid, s in subs.items():
    kort = sum(len((l or {}).get("cards") or {}) for l in (s.get("lessons") or {}).values())
    rader.append((len(json.dumps(s, ensure_ascii=False).encode()), s.get("name", "?"),
                  s.get("owner", "—"), kort, sid))
rader.sort(reverse=True)

tot_raw = len(json.dumps(subs, ensure_ascii=False).encode())
print(f"{'storlek':>9}  {'kort':>6}  {'ägare':<10} namn")
print("-" * 62)
for b, namn, agare, kort, sid in rader:
    print(f"{kb(b):>9}  {kort:>6}  {agare:<10} {namn}")
print("-" * 62)
print(f"{kb(tot_raw):>9}  {sum(r[3] for r in rader):>6}  TOTALT serverform (denormaliserad)")
print()
print("Appen cachar normalize()-formen (arrayer + order-fält), som är större.")
print("iOS/Safari localStorage-tak är ca 5 MB per origin.")
print(f"Serverträdet är i sig {tot_raw/1024/1024:.2f} MB av det taket.")
