#!/usr/bin/env python3
"""Kopierar ett helt område (ämne) till en annan profil i Flippas databas.

Samma form som prio-klassning.py: ALLA dataoperationer kapslas här, så en session
bara behöver köra detta skript (ett stabilt kommandomönster → en permission-regel,
ingen ad-hoc curl). Anonym auth precis som appen – ingen hemlighet behövs.

  subjects                      lista områden (id, namn, ägare, lektioner, kort)
  plan     <subjectId> <profil> TORRKÖRNING: visar exakt vad som skulle skapas
  copy     <subjectId> <profil> skapar kopian och verifierar den mot källan

Kopian är VERBATIM: exakt samma objekt som ligger på servern, med bara "owner"
ändrad. Ingen normalisering kan gå fel. Lektions- och kort-id:n återanvänds –
de behöver bara vara unika inom sitt eget ämne, och favoriter/SRS nycklas på
ORDET, inte på id.

Säkerhet: skriptet gör exakt EN skrivning – en POST som skapar ett NYTT ämne.
Det finns ingen kodväg som ändrar eller raderar något befintligt. Källan läses.
Efter skrivningen läses kopian tillbaka och jämförs fält för fält mot källan.
"""
import json
import sys
import urllib.request
import urllib.error
import hashlib
import os
import re

API_KEY = "AIzaSyAFFQFMBqspO71R1ykDU6VdTSaFY1P-6dA"
DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app"


def die(msg):
    print(f"FEL: {msg}", file=sys.stderr)
    sys.exit(1)


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
        r = http("POST", f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
                 {"returnSecureToken": True})
        _token = r["idToken"]
    return _token


def get(path):
    return http("GET", f"{DB}/{path}.json?auth={token()}")


def profiler():
    """Läser giltiga profil-id ur USERS i app.js – så skriptet aldrig hamnar i otakt."""
    här = os.path.dirname(os.path.abspath(__file__))
    src = open(os.path.join(här, "..", "app.js"), encoding="utf-8").read()
    block = re.search(r"const USERS = \[(.*?)\n\];", src, re.S)
    if not block:
        die("hittade inte USERS i app.js")
    return re.findall(r'id:\s*"([^"]+)"', block.group(1))


def matt(s):
    """Antal lektioner, kort och en checksumma över allt innehåll."""
    lektioner = list((s.get("lessons") or {}).items())
    kort = 0
    h = hashlib.sha256()
    for lid, l in sorted(lektioner):
        h.update(f"L:{lid}:{l.get('name')}\n".encode())
        for cid, c in sorted((l.get("cards") or {}).items()):
            kort += 1
            h.update(f"C:{cid}:{c.get('front')}:{c.get('back')}:"
                     f"{c.get('hint')}:{c.get('prio')}\n".encode())
    return len(lektioner), kort, h.hexdigest()[:16]


def cmd_subjects():
    alla = get("content/subjects") or {}
    print(f"\nOmråden ({len(alla)}):\n")
    for sid, s in sorted(alla.items(), key=lambda kv: kv[1].get("order", 0)):
        lek, kort, _ = matt(s)
        print(f"  {str(s.get('name') or '(namnlöst)'):<30} ägare: {str(s.get('owner') or '-'):<8}"
              f" {lek:>3} lektioner {kort:>5} kort   {sid}")
    print("\nSedan:  plan <subjectId> <profil>   (torrkörning)\n")


def _forbered(sid, agare):
    giltiga = profiler()
    if agare not in giltiga:
        die(f'okänd profil "{agare}". Giltiga enligt app.js: {", ".join(giltiga)}')
    alla = get("content/subjects") or {}
    if sid not in alla:
        die(f'inget område med id "{sid}" – kör "subjects" först')
    kalla = alla[sid]
    namn = (kalla.get("name") or "").strip().lower()
    for annat_id, s in alla.items():
        if s.get("owner") == agare and (s.get("name") or "").strip().lower() == namn:
            die(f'"{kalla.get("name")}" finns redan hos {agare} ({annat_id}) – ingen dubblett skapas')
    return kalla


def cmd_plan(sid, agare):
    kalla = _forbered(sid, agare)
    lek, kort, sig = matt(kalla)
    print(f"\nKälla : {kalla.get('name')}  (ägare {kalla.get('owner')}, id {sid})")
    print(f"Kopia : {kalla.get('name')}  (ägare {agare}, nytt id genereras)")
    print(f"Omfång: {lek} lektioner, {kort} kort · checksumma {sig}")
    print(f"Språk : {kalla.get('lang') or '(inget)'}")
    forsta = next(iter(sorted((kalla.get("lessons") or {}).items())), None)
    if forsta:
        prov = list(sorted((forsta[1].get("cards") or {}).items()))[:3]
        print(f'Stickprov ur "{forsta[1].get("name")}": '
              + " · ".join(f"{c.get('front')} = {c.get('back')}" for _, c in prov))
    print("\nTORRKÖRNING – inget skrevs. Kör 'copy' med samma argument för att göra det.\n")


def cmd_copy(sid, agare):
    kalla = _forbered(sid, agare)
    lek, kort, sig = matt(kalla)
    kopia = json.loads(json.dumps(kalla))   # verbatim djupkopia
    kopia["owner"] = agare

    svar = http("POST", f"{DB}/content/subjects.json?auth={token()}", kopia)
    nytt = (svar or {}).get("name")
    if not nytt:
        die("Firebase returnerade inget id – kontrollera i konsolen om något skrevs")

    # Verifiera: läs tillbaka kopian OCH källan, jämför
    ny = get(f"content/subjects/{nytt}") or {}
    kalla_nu = get(f"content/subjects/{sid}") or {}
    lek2, kort2, sig2 = matt(ny)
    lek3, kort3, sig3 = matt(kalla_nu)

    print(f"\nSKRIVET: {nytt}")
    print(f"  kopia : ägare {ny.get('owner')} · {lek2} lektioner · {kort2} kort · {sig2}")
    print(f"  källa : ägare {kalla_nu.get('owner')} · {lek3} lektioner · {kort3} kort · {sig3}")

    fel = []
    if ny.get("owner") != agare: fel.append("kopians ägare blev fel")
    if (lek2, kort2, sig2) != (lek, kort, sig): fel.append("kopian skiljer sig från källan")
    if (lek3, kort3, sig3) != (lek, kort, sig): fel.append("KÄLLAN ändrades – undersök omedelbart")
    if kalla_nu.get("owner") != kalla.get("owner"): fel.append("källans ägare ändrades")
    if fel:
        die(" · ".join(fel))
    print("OK: kopian är identisk med källan (samma checksumma) och källan är orörd.\n")


if __name__ == "__main__":
    args = sys.argv[1:]
    try:
        if not args: die(__doc__)
        cmd, rest = args[0], args[1:]
        if cmd == "subjects" and not rest: cmd_subjects()
        elif cmd == "plan" and len(rest) == 2: cmd_plan(*rest)
        elif cmd == "copy" and len(rest) == 2: cmd_copy(*rest)
        else: die("okänt kommando eller fel antal argument – kör utan argument för hjälp")
    except urllib.error.HTTPError as e:
        die(f"HTTP {e.code} mot Firebase: {e.read().decode()[:200]}")
