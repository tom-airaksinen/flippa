#!/usr/bin/env python3
"""Bygger ett bibliotekspaket ur den språkneutrala mastern plus en språkfil.

  index <språk>   bygger ordboksindexet ur kaikki-<språk>.jsonl (en gång, ~20 s)
  kolla <språk>   torrkörning: listar allt som avviker, skriver ingenting
  bygg  <språk>   skriver data/bibliotek/<paket-id>.json och uppdaterar index.json

Källor (data/bibliotek/):
  master/<lektion>.txt    id;svenska;engelska nyckelord;prio;klass     (alla språk)
  <språk>/<lektion>.txt   id;ord;svenska (bara när masterns ska bytas)  (kärnrader)
                          +;ord;svenska;prio                           (lokala ord)
  <språk>/paket.json      id, namn, beskrivning, ikon

Samma princip som ro-former.py: modellen väljer ordet, ordboken bestämmer formerna.
Skriptet lägger själv på genusmarkör och verbformer ur Wiktionary (kaikki.org,
CC BY-SA 4.0) och kontrollerar att ordet finns och betyder det mastern säger.

STOPPAR bygget:  kärn-id utan översättning · okänt id · dubblerad framsida ·
                 verb som saknas i ordboken (formerna går då inte att fylla i)
VARNAR bara:     ord som saknas i ordboken · betydelsen matchar inte nyckelorden ·
                 okänt ord inuti en fras

Paketen bär ALDRIG minnesregel. Det fältet är inlärarens eget knep för att minnas
ordet, inte en plats för förklaringar – en rad med ett extra fält stoppar bygget.
Behöver ett ord förklaras hör det hemma i den svenska översättningen.

Bara ukrainska har språkregler än så länge (genusmarkör, presens + aspektpar).
Dumpen ligger i gnugga/scripts/raw/ (ej i git), bredvid rumänskans.
"""
import glob, json, os, re, sys

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BIB = os.path.join(ROT, "data", "bibliotek")
RAW = os.path.join(ROT, "..", "gnugga", "scripts", "raw")
GEN = {"masculine": "m", "feminine": "f", "neuter": "n"}
POS = {"s": {"noun", "name"}, "v": {"verb"}, "a": {"adj", "verb"}}

def die(m): print("FEL: " + m, file=sys.stderr); sys.exit(1)
def ren(s): return (s or "").replace("́", "").strip()   # betoningstecknet bort
def rader(p):
    for nr, r in enumerate(open(p, encoding="utf-8"), 1):
        r = r.rstrip("\n")
        if r.strip() and not r.startswith("#"):
            yield nr, [f.strip() for f in r.split(";")]

# ---------- ordboksindex ----------
def cmd_index(lang):
    dump = os.path.join(RAW, f"kaikki-{lang}.jsonl")
    if not os.path.exists(dump): die(f"hittar inte {dump}")
    lemman, former = {}, set()
    for rad in open(dump, encoding="utf-8"):
        d = json.loads(rad)
        ord_, pos, fs = ren(d.get("word")), d.get("pos"), d.get("forms") or []
        if not ord_: continue
        former.add(ord_.lower())
        for f in fs:
            v = ren(f.get("form"))
            if v and " " not in v and v != "-" and not any(t.startswith("error") for t in f.get("tags", [])):
                former.add(v.lower())
        e = {"pos": pos, "gloss": " | ".join(g for s in d.get("senses", []) for g in s.get("glosses", [])).lower()}
        huvud = " ".join(h.get("expansion", "") for h in d.get("head_templates", []))
        kanon = next((f.get("tags", []) for f in fs if "canonical" in f.get("tags", [])), [])
        if pos == "noun":
            m = re.search(r"\)\s+([mfn])\b", huvud)      # "• (zlit) m inan" när taggen saknas
            e["g"] = next((GEN[t] for t in kanon if t in GEN), m.group(1) if m else "")
            e["obojl"] = "indeclinable" in huvud
        if pos == "verb":
            perf = "perfective" in kanon
            e["asp"] = "pf" if perf else "impf"
            e["par"] = [ren(f["form"]) for f in fs
                        if f.get("tags") in (["imperfective"], ["perfective"])]
            tid = "future" if perf else "present"
            def form(*krav):
                return next((ren(f["form"]) for f in fs if " " not in f.get("form", " ")
                             and tid in f.get("tags", []) and all(k in f["tags"] for k in krav)), "")
            e["pres"] = [form("first-person", "singular"), form("second-person", "singular"),
                         form("third-person", "plural")]
        lemman.setdefault(ord_, []).append(e)
    ut = os.path.join(RAW, f"{lang}-index.json")
    json.dump({"lemman": lemman, "former": sorted(former)}, open(ut, "w", encoding="utf-8"), ensure_ascii=False)
    print(f"{len(lemman)} uppslagsord, {len(former)} former → {ut}")

def ordbok(lang):
    p = os.path.join(RAW, f"{lang}-index.json")
    if not os.path.exists(p): die(f"inget index – kör: bygg-paket.py index {lang}")
    j = json.load(open(p, encoding="utf-8"))
    return j["lemman"], set(j["former"])

# ---------- språkregler ----------
def uk_genus(ord_, e):
    """Markör bara där ändelsen inte avslöjar genus – samma vana som korten redan har."""
    g, sist = e.get("g", ""), ord_[-1].lower()
    if not g: return ""
    if e.get("obojl") or sist == "ь": return g
    if g == "f" and sist not in "ая": return g
    if g == "n" and sist not in "ое": return g
    if g == "m" and sist in "аяое": return g
    return ""

def uk_verb(e):
    if not all(e.get("pres") or [""]): return ""
    par = e.get("par") or []
    etikett = "perf." if e["asp"] == "impf" else "imperf."
    return ", ".join(e["pres"]) + (f" · {etikett} {par[0]}" if par else "")

# ---------- bygge ----------
def las(lang):
    lemman, former = ordbok(lang)
    fel, varn, lektioner = [], [], []
    sedda = {}
    for mfil in sorted(glob.glob(os.path.join(BIB, "master", "*.txt"))):
        stam = os.path.basename(mfil)
        sfil = os.path.join(BIB, lang, stam)
        if not os.path.exists(sfil): continue        # lektionen inte översatt än
        namn = re.search(r"^# namn:\s*(.+)$", open(mfil, encoding="utf-8").read(), re.M)
        if not namn: die(f"{stam}: saknar '# namn:'-rad")
        master = {}
        for nr, f in rader(mfil):
            if len(f) != 5 or f[3] not in "123" or f[4] not in "svaf": die(f"master/{stam}:{nr}: väntade id;svenska;en;prio;klass")
            if f[0] in master: die(f"master/{stam}:{nr}: id '{f[0]}' finns två gånger")
            master[f[0]] = {"sv": f[1], "en": [k for k in f[2].lower().split("|") if k], "p": int(f[3]), "kl": f[4]}
        over, lokala = {}, []
        for nr, f in rader(sfil):
            if any(f[4 if f[0] == "+" else 3:]):
                fel.append(f"{lang}/{stam}:{nr}: för många fält – paketen bär ingen minnesregel"); continue
            f += [""] * 4
            if f[0] == "+":
                if not f[1] or not f[2] or f[3] not in ("1", "2", "3"): fel.append(f"{lang}/{stam}:{nr}: lokal rad ska vara +;ord;svenska;prio")
                else: lokala.append({"ord": f[1], "sv": f[2], "p": int(f[3]), "kl": "f" if " " in f[1] else "s", "en": []})
            elif f[0] not in master: fel.append(f"{lang}/{stam}:{nr}: okänt id '{f[0]}'")
            elif not f[1]: fel.append(f"{lang}/{stam}:{nr}: '{f[0]}' saknar ord")
            else: over[f[0]] = {"ord": f[1], "sv": f[2]}
        kort = []
        poster = [dict(m, id=i, **{k: v for k, v in over[i].items() if v or k != "sv"}) if i in over else None
                  for i, m in master.items()]
        for i, p in zip(master, poster):
            if p is None: fel.append(f"{lang}/{stam}: kärn-id '{i}' ({master[i]['sv']}) saknar översättning")
        for p in [p for p in poster if p] + [dict(l, id="+") for l in lokala]:
            # Egen uppgift i språkfilen – "ord (n)" eller "ord {böjning}" – gäller bara
            # när ordboken saknar ordet. Säger ordboken något annat är det ett fel.
            egen = re.match(r"^(.*?)(?:\s+\(([mfn])\))?(?:\s*\{(.+)\})?$", p["ord"])
            ord_, egen_g, egen_form = egen.group(1).strip(), egen.group(2) or "", egen.group(3) or ""
            front, form = ord_, ""
            flerord = bool(re.search(r"[\s\-]", ord_))
            if p["kl"] == "f" or flerord:
                for t in re.findall(r"[^\W\d_]+(?:[’'ʼ][^\W\d_]+)?", ord_):
                    if t.lower() not in former and t not in lemman:
                        varn.append(f"{stam}: '{t}' i \"{ord_}\" finns inte i ordboken")
            else:
                poster_ = [e for e in lemman.get(ord_, []) if p["kl"] == "f" or e["pos"] in POS.get(p["kl"], set())] or lemman.get(ord_, [])
                if not poster_:
                    okollat = " – egen uppgift, okontrollerad" if egen_g or egen_form else ""
                    (fel if p["kl"] == "v" and not egen_form else varn).append(f"{stam}: '{ord_}' ({p['sv']}) finns inte i ordboken{okollat}")
                    if egen_g: front = f"{ord_} ({egen_g})"
                    form = egen_form
                else:
                    if p["en"] and not any(k in e["gloss"] for e in lemman[ord_] for k in p["en"]):
                        varn.append(f"{stam}: '{ord_}' ({p['sv']}) – ordboken säger: {lemman[ord_][0]['gloss'][:90]}")
                    if lang == "uk" and p["kl"] == "s":
                        g = next((uk_genus(ord_, e) for e in poster_ if e["pos"] == "noun"), "")
                        if g: front = f"{ord_} ({g})"
                        facit = next((e["g"] for e in poster_ if e["pos"] == "noun" and e.get("g")), "")
                        if egen_g and facit and egen_g != facit: fel.append(f"{stam}: '{ord_}' är ({facit}) i ordboken, språkfilen säger ({egen_g})")
                    if lang == "uk" and p["kl"] == "v":
                        form = next((uk_verb(e) for e in poster_ if e["pos"] == "verb" and uk_verb(e)), "")
                        if not form: fel.append(f"{stam}: verbet '{ord_}' saknar presensformer i ordboken")
            if front.lower() in sedda: fel.append(f"{stam}: framsidan '{front}' finns redan i {sedda[front.lower()]}")
            sedda[front.lower()] = stam
            k = {"f": front, "b": p["sv"], "p": p["p"]}
            if form: k["form"] = form
            kort.append(k)
        lektioner.append({"namn": namn.group(1).strip(), "kort": kort})
    return lektioner, fel, varn

def rapport(lektioner, fel, varn):
    for l in lektioner:
        n = [sum(1 for k in l["kort"] if k["p"] == i) for i in (1, 2, 3)]
        print(f"  {l['namn']}: {len(l['kort'])} kort, prio {n[0]}/{n[1]}/{n[2]}, "
              f"{sum(1 for k in l['kort'] if k.get('form'))} med böjning")
    for v in varn: print("  VARNING  " + v)
    for f in fel: print("  FEL      " + f)
    print(f"\n{len(fel)} fel, {len(varn)} varningar")

def cmd_bygg(lang, skriv):
    meta = json.load(open(os.path.join(BIB, lang, "paket.json"), encoding="utf-8"))
    lektioner, fel, varn = las(lang)
    rapport(lektioner, fel, varn)
    if not skriv: return
    if fel: die("bygget stoppat – rätta felen ovan")
    if not lektioner: die("inga lektioner att bygga")
    json.dump(dict(meta, lektioner=lektioner), open(os.path.join(BIB, meta["id"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False)
    ip = os.path.join(BIB, "index.json")
    idx = json.load(open(ip, encoding="utf-8"))
    rad = dict(meta, lektioner=len(lektioner), ord=sum(len(l["kort"]) for l in lektioner))
    idx["paket"] = [p for p in idx["paket"] if p["id"] != meta["id"]] + [rad]
    json.dump(idx, open(ip, "w", encoding="utf-8"), ensure_ascii=False)
    print(f"skrev {meta['id']}.json och index.json")

if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) != 2 or a[0] not in ("index", "kolla", "bygg"): die(__doc__)
    cmd_index(a[1]) if a[0] == "index" else cmd_bygg(a[1], a[0] == "bygg")
