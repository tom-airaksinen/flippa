#!/usr/bin/env python3
"""Skriver ett blindat domarpaket per körning: instruktionen + alla listor.

  python3 paket.py            alla kompletta körningar
  python3 paket.py it-lakare-50

Domaren får EN fil och inget annat – ingen tillgång till facit, ingen aning om vilka
modeller som är med. Ordningen mellan listorna slumpas per körning så att inte heller
en konsekvent placering kan läras in.
"""
import json, os, random, sys

HAR = os.path.dirname(os.path.abspath(__file__))
UT, PAKET = os.path.join(HAR, "resultat"), os.path.join(HAR, "paket")
VANTAT = 9   # antal modeller; en körning är komplett först när alla svarat

def bygg(kid):
    mapp = os.path.join(UT, kid)
    filer = sorted(f for f in os.listdir(mapp) if f.endswith(".json"))
    if len(filer) < VANTAT: return None, len(filer)
    data = [json.load(open(os.path.join(mapp, f), encoding="utf-8")) for f in filer]
    koder = [f[:-5] for f in filer]
    ordning = list(range(len(filer)))
    random.Random(kid).shuffle(ordning)    # samma blandning varje gång, men inte alfabetisk

    meta = data[0]["meta"]
    rader = [f"# Bedömning: {kid}", "",
             f"**Tema:** {meta['tema']}  ", f"**Språk:** {meta['sprak']}  ",
             f"**Beställt antal glosor:** {meta['antal']}  ",
             f"**Böjningsfält:** {'ja' if meta['bojning'] else 'nej, ska vara tomt'}", "",
             open(os.path.join(HAR, "domare-instruktion.md"), encoding="utf-8").read(), "",
             "---", "", f"## Listorna ({len(filer)} stycken)", ""]
    for i in ordning:
        d, kod = data[i], koder[i]
        t = d.get("traffar") or []
        rader += [f"### {kod} — {len(t)} glosor", "", "| prio | ord | svenska | böjning |", "|---|---|---|---|"]
        for g in t:
            def c(x): return str(x or "").replace("|", "\\|").replace("\n", " ")
            rader.append(f"| {c(g.get('prio'))} | {c(g.get('ord'))} | {c(g.get('oversattning'))} | {c(g.get('bojning'))} |")
        rader.append("")
    return "\n".join(rader), len(filer)

def main():
    os.makedirs(PAKET, exist_ok=True)
    bara = sys.argv[1] if len(sys.argv) > 1 else None
    for kid in sorted(os.listdir(UT)):
        if not os.path.isdir(os.path.join(UT, kid)) or (bara and kid != bara): continue
        txt, n = bygg(kid)
        if not txt:
            print(f"  {kid:<20} ofullständig ({n}/{VANTAT}) – hoppar över"); continue
        p = os.path.join(PAKET, kid + ".md")
        open(p, "w", encoding="utf-8").write(txt)
        print(f"  {kid:<20} {n} listor · {len(txt)//1024} kB · {p}")

if __name__ == "__main__":
    main()
