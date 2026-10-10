#!/usr/bin/env python3
"""Maskinella mått på varje svar – det som INTE kräver en domare.

  python3 scripts/modelltest/matt.py            alla körningar
  python3 scripts/modelltest/matt.py fr-restaurang-50

Varför: 9 modeller x 8 körningar ger upp till 7 200 glosor. Att läsa allt är varken
möjligt eller meningsfullt – det mesta som går fel i en lång lista går att mäta.
Domaren får sedan lägga tid på det som faktiskt kräver omdöme: är orden rätt, är de
relevanta för temat, är prion klok.

Måtten är medvetet sådana som INTE avslöjar vilken modell det är.
"""
import json, os, sys, unicodedata
from collections import Counter

HAR = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HAR, "resultat")

def norm(s): return " ".join((s or "").strip().lower().split())

def latin(s):
    return any("LATIN" in unicodedata.name(c, "") for c in s if c.isalpha())

def matt(d):
    t = d.get("traffar") or []
    onskat = d["meta"]["antal"]
    ord_ = [norm(x.get("ord")) for x in t]
    c = Counter(o for o in ord_ if o)
    dubbletter = sum(n - 1 for n in c.values() if n > 1)
    prio = Counter(x.get("prio") for x in t)
    halv = len(t) // 2 or 1
    # Tappar modellen kvaliteten i svansen? Jämför första och andra halvan.
    def andel_tom(rader, falt): return round(sum(1 for x in rader if not (x.get(falt) or "").strip()) / max(1, len(rader)), 2)
    boj_krav = d["meta"]["bojning"]
    return {
        "levererat": len(t),
        "önskat": onskat,
        "täckning": round(len(t) / onskat, 2) if onskat else 0,
        "dubbletter": dubbletter,
        "tom_översättning": sum(1 for x in t if not (x.get("oversattning") or "").strip()),
        "tom_böjning_%": andel_tom(t, "bojning") if boj_krav else None,
        "böjning_eko": sum(1 for x in t if boj_krav and norm(x.get("bojning")) == norm(x.get("ord"))),
        "prio_1": prio.get(1, 0), "prio_2": prio.get(2, 0), "prio_3": prio.get(3, 0),
        "prio_saknas": sum(1 for x in t if x.get("prio") not in (1, 2, 3)),
        "prio1_andel_första_halvan": round(sum(1 for x in t[:halv] if x.get("prio") == 1) / halv, 2),
        "prio1_andel_andra_halvan": round(sum(1 for x in t[halv:] if x.get("prio") == 1) / max(1, len(t) - halv), 2),
        "tom_böjning_svans_%": andel_tom(t[halv:], "bojning") if boj_krav else None,
        "fel": d.get("fel") or "",
    }

def main():
    bara = sys.argv[1] if len(sys.argv) > 1 else None
    for kid in sorted(os.listdir(UT)):
        if bara and kid != bara: continue
        mapp = os.path.join(UT, kid)
        if not os.path.isdir(mapp): continue
        print(f"\n===== {kid}")
        rader = []
        for f in sorted(os.listdir(mapp)):
            d = json.load(open(os.path.join(mapp, f), encoding="utf-8"))
            rader.append((f[:-5], matt(d)))
        kol = [k for k in rader[0][1] if k != "fel"] if rader else []
        print("  kod      " + "".join(f"{k[:13]:>15}" for k in kol))
        for k, m in rader:
            print(f"  {k:<8} " + "".join(f"{str(m[c]):>15}" for c in kol) + ("  " + m["fel"][:40] if m["fel"] else ""))

if __name__ == "__main__":
    main()
