#!/usr/bin/env python3
"""Verktyg för prio-klassning av Flippa-lektioner (se docs/prio-klassning-runbook.md).

Kapslar in ALLA dataoperationer så att en session bara behöver köra detta skript
(ett stabilt kommandomönster → en permission-regel, ingen ad-hoc curl):

  subjects                          lista ämnen (id, namn, ägare, kort, klassade)
  lessons  <subjectId>              lista lektioner med kortantal
  export   <subjectId> [utkatalog]  skriv en TSV per lektion: cardId \t front \t back
  write    <subjectId> <lessonId> <utfil>
                                    validera utfilen mot databasen och skriv ENBART
                                    prio-fält; vägrar vid minsta avvikelse
  verify   <subjectId>              prio-fördelning per lektion

Utfilens format (skapas av modellen, en rad per kort, samma ordning som exporten):
  cardId;front;prio     där front är kopierad OFÖRÄNDRAD och prio är 1, 2 eller 3.

Säkerhet: skriptet kan bara läsa innehållsträdet och skriva cards/<id>/prio.
Front/baksidor rörs aldrig – validering sker mot färsk data omedelbart före skrivning.
"""
import json
import sys
import urllib.request
from collections import Counter

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

def cards_sorted(lesson):
    return sorted((lesson.get("cards") or {}).items(), key=lambda kv: kv[1].get("order", 0))

def cmd_subjects():
    subs = get("content/subjects") or {}
    for sid, s in sorted(subs.items(), key=lambda kv: (kv[1].get("owner") or "", kv[1].get("name") or "")):
        lessons = s.get("lessons") or {}
        cards = [c for l in lessons.values() for c in (l.get("cards") or {}).values()]
        classified = sum(1 for c in cards if c.get("prio") in (1, 2, 3))
        print(f"{sid}\t{s.get('name')}\tägare={s.get('owner')}\t{len(lessons)} lektioner\t{len(cards)} kort\tklassade={classified}")

def cmd_lessons(sid):
    lessons = get(f"content/subjects/{sid}/lessons") or {}
    for lid, l in sorted(lessons.items(), key=lambda kv: kv[1].get("order", 0)):
        cards = l.get("cards") or {}
        classified = sum(1 for c in cards.values() if c.get("prio") in (1, 2, 3))
        print(f"{lid}\t{l.get('name')}\t{len(cards)} kort\tklassade={classified}")

def cmd_export(sid, outdir="."):
    import os
    os.makedirs(outdir, exist_ok=True)
    lessons = get(f"content/subjects/{sid}/lessons") or {}
    for lid, l in sorted(lessons.items(), key=lambda kv: kv[1].get("order", 0)):
        rows = cards_sorted(l)
        if not rows:
            print(f"{lid}\t{l.get('name')}\tTOM – hoppas över")
            continue
        path = os.path.join(outdir, f"{lid}.tsv")
        with open(path, "w") as f:
            f.write(f"# LEKTION: {l.get('name')}\n")
            for cid, c in rows:
                f.write(f"{cid}\t{c['front']}\t{c['back']}\n")
        print(f"{path}\t{l.get('name')}\t{len(rows)} kort")

def cmd_write(sid, lid, outfile):
    lesson = get(f"content/subjects/{sid}/lessons/{lid}")
    if not lesson: die(f"lektionen {lid} finns inte i ämnet {sid}")
    dbcards = lesson.get("cards") or {}
    rows = []
    for i, line in enumerate(open(outfile), 1):
        if not line.strip(): continue
        parts = line.rstrip("\n").split(";")
        if len(parts) < 3: die(f"rad {i}: fel format (cardId;front;prio)")
        cid, front, prio = parts[0], ";".join(parts[1:-1]), parts[-1].strip()
        if cid not in dbcards: die(f"rad {i}: okänt kort-id {cid}")
        if dbcards[cid]["front"] != front:
            die(f"rad {i}: front-avvikelse för {cid}: '{front}' vs databasens '{dbcards[cid]['front']}' – INGET skrivet")
        if prio not in ("1", "2", "3"): die(f"rad {i}: ogiltig prio '{prio}'")
        rows.append((cid, int(prio)))
    ids = [r[0] for r in rows]
    if len(set(ids)) != len(ids): die("dubbla kort-id i utfilen – INGET skrivet")
    if len(rows) != len(dbcards):
        die(f"utfilen täcker {len(rows)} av {len(dbcards)} kort – exportera om och klassa alla. INGET skrivet")
    upd = {f"cards/{cid}/prio": p for cid, p in rows}
    http("PATCH", f"{DB}/content/subjects/{sid}/lessons/{lid}.json?auth={token()}", upd)
    # Verifiera direkt: läs tillbaka, kontrollera fördelning + orörda front/back
    fresh = get(f"content/subjects/{sid}/lessons/{lid}/cards") or {}
    c = Counter(v.get("prio") for v in fresh.values())
    bad = [cid for cid, v in fresh.items() if v["front"] != dbcards[cid]["front"] or v["back"] != dbcards[cid]["back"]]
    print(f"SKRIVET: {len(upd)} prio-fält · fördelning {c.get(1,0)}/{c.get(2,0)}/{c.get(3,0)} · ändrade front/back: {len(bad)}")
    if bad: die("front/back ändrades – ska vara omöjligt, undersök!")

def cmd_verify(sid):
    lessons = get(f"content/subjects/{sid}/lessons") or {}
    tot = Counter(); n = 0
    for lid, l in sorted(lessons.items(), key=lambda kv: kv[1].get("order", 0)):
        cards = l.get("cards") or {}
        c = Counter(v.get("prio") if v.get("prio") in (1, 2, 3) else None for v in cards.values())
        tot.update(c); n += len(cards)
        print(f"{l.get('name')}: {len(cards)} kort · {c.get(1,0)}/{c.get(2,0)}/{c.get(3,0)} · utan prio: {c.get(None,0)}")
    print(f"TOTALT: {n} kort · {tot.get(1,0)}/{tot.get(2,0)}/{tot.get(3,0)} · utan prio: {tot.get(None,0)}")

if __name__ == "__main__":
    args = sys.argv[1:]
    try:
        if not args: die(__doc__)
        cmd, rest = args[0], args[1:]
        if cmd == "subjects": cmd_subjects()
        elif cmd == "lessons" and len(rest) == 1: cmd_lessons(*rest)
        elif cmd == "export" and 1 <= len(rest) <= 2: cmd_export(*rest)
        elif cmd == "write" and len(rest) == 3: cmd_write(*rest)
        elif cmd == "verify" and len(rest) == 1: cmd_verify(*rest)
        else: die("okänt kommando eller fel antal argument – kör utan argument för hjälp")
    except urllib.error.HTTPError as e:
        die(f"HTTP {e.code} mot Firebase: {e.read().decode()[:200]}")
