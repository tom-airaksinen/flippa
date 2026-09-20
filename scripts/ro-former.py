#!/usr/bin/env python3
"""Slår upp och KONTROLLERAR rumänska genus/böjningar mot Wiktionary (kaikki.org).

Tanken: en LLM väljer ordet, ordboken bestämmer formerna. Skriptet kan därför både
slå upp ett ord och granska en färdig glosfil innan den importeras till Flippa.

  bygg [dump]            bygger indexet ur kaikki-ro.jsonl (görs en gång, ~1 min)
  slau <ord> [...]       visar genus + former för ett eller flera ord
  fyll  <fil>            fyller på genus + böjning ur ordboken:
                         in  'lemma;svenska;prio' → ut 'ord (g);svenska;{…};prio'
                         prefixet adj:/ovr: på en rad = slå inte upp, ta ordet som det är
  csv   <fil> <sektion>  inklistringsformat → CSV för appens import
                         (böjningen hamnar i kolumn 7 – importen läser den inte)
  kolla <fil>            granskar en glosfil i inklistringsformat:
                           front;baksida;{böjning};prio
                         Substantiv: "ord (g)" + {un/o ord, doi/două ordpl}
                         Verb:       "a göra"  + {pres1, pres3 · am part · să konj}

Utdata från "kolla": en rad per avvikelse (OKÄNT / GENUS / PLURAL / VERBFORM),
sist en sammanfattning. Skriptet skriver aldrig något till databasen.

Datakälla: kaikki.org:s Wiktionary-extraktion, CC BY-SA 4.0. Dumpen ligger i
gnugga/scripts/raw/ (ej i git) eftersom Gnugga redan använder den.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DUMP = os.path.join(HERE, "..", "..", "gnugga", "scripts", "raw", "kaikki-ro.jsonl")
INDEX = os.path.join(HERE, "..", "..", "gnugga", "scripts", "raw", "ro-former-index.json")

GEN = {"masculine": "m", "feminine": "f", "neuter": "n"}
ART = {"m": "un", "f": "o", "n": "un"}
NUM = {"m": "doi", "f": "două", "n": "două"}

def die(m):
    print("FEL: " + m, file=sys.stderr); sys.exit(1)

# ---------- bygg ----------
def formtags(d, *need, avoid=()):
    """Alla former vars tags innehåller allt i need och inget i avoid."""
    out = []
    for f in d.get("forms", []):
        t = set(f.get("tags") or [])
        if all(n in t for n in need) and not (t & set(avoid)):
            w = (f.get("form") or "").strip()
            if w and w not in ("-", "—"):
                out.append(w)
    return out

def noun_entry(d):
    g = ""
    for f in d.get("forms", []):
        for t in f.get("tags") or []:
            if t in GEN and not g:
                g = GEN[t]
        m = re.match(r"ro-noun-([fmn])\b", f.get("form", ""))
        if m:
            g = m.group(1)
    if not g:
        for h in d.get("head_templates") or []:
            args = h.get("args") or {}
            for k in ("1", "g", "2"):
                v = args.get(k)
                if v in GEN: g = GEN[v]; break
                if v in ("m", "f", "n"): g = v; break
            if g: break
        if not g:  # sista utväg: "pensiune f (plural pensiuni)" i expansionen
            for h in d.get("head_templates") or []:
                m2 = re.search(r"\b([mfn])\b", h.get("expansion", ""))
                if m2: g = m2.group(1); break
    pl = formtags(d, "plural", "indefinite", "nominative") or formtags(d, "plural")
    sgd = formtags(d, "definite", "singular", "nominative")
    pld = formtags(d, "definite", "plural", "nominative")
    if not g:
        # Genus ur de bestämda formerna (ordboken, inte gissning): -a = f;
        # -ul + bestämd plural på -le = n; -ul + bestämd plural på -i = m.
        a, b = (sgd[0] if sgd else ""), (pld[0] if pld else "")
        if a.endswith(("a", "ua")): g = "f"
        elif a.endswith(("ul", "le", "l")):
            g = "n" if b.endswith("le") else ("m" if b.endswith("i") else "")
    return {"g": g, "pl": sorted(set(pl), key=pl.index)[:3],
            "sgd": sgd[:1], "pld": pld[:1],
            "en": (d.get("senses") or [{}])[0].get("glosses") or []}

def verb_entry(d):
    p1 = formtags(d, "first-person", "present", "singular", avoid=("subjunctive", "imperfect", "perfect", "pluperfect"))
    p3 = formtags(d, "third-person", "present", "singular", avoid=("subjunctive", "imperfect", "perfect", "pluperfect"))
    part = formtags(d, "participle", "past")
    sub = [re.sub(r"^s[ăa]\s+", "", x) for x in formtags(d, "subjunctive", "third-person", "singular")
           or formtags(d, "subjunctive", "third-person")]
    return {"p1": sorted(set(p1), key=p1.index)[:2], "p3": sorted(set(p3), key=p3.index)[:2],
            "part": sorted(set(part), key=part.index)[:2], "sub": sorted(set(sub), key=sub.index)[:2],
            "en": (d.get("senses") or [{}])[0].get("glosses") or []}

def cmd_bygg(dump=None):
    path = dump or DUMP
    if not os.path.exists(path): die(f"hittar inte dumpen: {path}")
    nouns, verbs, ovriga = {}, {}, set()
    with open(path, encoding="utf-8") as f:
        for line in f:
            if '"lang_code": "ro"' not in line and '"lang_code":"ro"' not in line:
                continue
            d = json.loads(line)
            if d.get("lang_code") != "ro": continue
            w, pos = d.get("word"), d.get("pos")
            if pos not in ("noun", "verb") and w: ovriga.add(w)
            if pos == "noun":
                e = noun_entry(d)
                if e["g"] or e["pl"]: nouns.setdefault(w, []).append(e)
            elif pos == "verb":
                e = verb_entry(d)
                if e["p1"] or e["p3"]: verbs.setdefault(w, []).append(e)
    json.dump({"nouns": nouns, "verbs": verbs, "ovriga": sorted(ovriga)},
              open(INDEX, "w"), ensure_ascii=False)
    print(f"index: {len(nouns)} substantiv, {len(verbs)} verb, {len(ovriga)} övriga ord → {INDEX}")

def load():
    if not os.path.exists(INDEX): die("inget index – kör först: python3 scripts/ro-former.py bygg")
    return json.load(open(INDEX))

# ---------- slå upp ----------
def cmd_slau(*ord_):
    ix = load()
    for w in ord_:
        w = w.strip()
        for e in ix["nouns"].get(w, []):
            g = e["g"] or "?"
            pl = e["pl"][0] if e["pl"] else "?"
            print(f"{w} ({g})\t{{{ART.get(g,'?')} {w}, {NUM.get(g,'?')} {pl}}}\t{'; '.join(e['en'][:1])}")
        for e in ix["verbs"].get(w.replace("a ", "", 1), []):
            p1 = e["p1"][0] if e["p1"] else "?"; p3 = e["p3"][0] if e["p3"] else "?"
            pa = e["part"][0] if e["part"] else "?"; su = e["sub"][0] if e["sub"] else "?"
            print(f"a {w.replace('a ','',1)}\t{{{p1}, {p3} · am {pa} · să {su}}}\t{'; '.join(e['en'][:1])}")
        if w not in ix["nouns"] and w.replace("a ", "", 1) not in ix["verbs"]:
            print(f"{w}\tOKÄNT")

# ---------- kolla ----------
def parse_line(line):
    """front;back;{form};prio → (front, form) enligt appens parseLines."""
    parts = line.rstrip("\n")
    m = re.match(r"^(.*?);(.*)$", parts)
    if not m: return None
    front, rest = m.group(1).strip(), m.group(2)
    prio = None
    j = rest.rfind(";")
    if j >= 0 and rest[j+1:].strip() in ("1", "2", "3"):
        prio = rest[j+1:].strip(); rest = rest[:j]
    fm = re.match(r"^(.*?);?\s*\{([^}]*)\}\s*$", rest)
    form = fm.group(2).strip() if fm else ""
    back = (fm.group(1) if fm else rest).strip()
    return front, back, form, prio

def cmd_kolla(fil):
    ix = load(); avvik = 0; n = 0; utan = 0
    for i, line in enumerate(open(fil, encoding="utf-8"), 1):
        line = line.strip()
        if not line or line.startswith("#"): continue
        p = parse_line(line)
        if not p: print(f"rad {i}: FORMAT  {line}"); avvik += 1; continue
        front, back, form, prio = p
        n += 1
        if prio not in ("1", "2", "3"):
            print(f"rad {i}: PRIO saknas/ogiltig  {front}"); avvik += 1
        m = re.match(r"^([\wăâîșțĂÂÎȘȚ][\wăâîșțĂÂÎȘȚ -]*?)\s*\(([fmn])\)$", front)
        v = re.match(r"^a\s+([\wăâîșțĂÂÎȘȚ-]+)$", front)
        if m:  # substantiv
            w, g = m.group(1), m.group(2)
            ents = ix["nouns"].get(w) or []
            if not ents: print(f"rad {i}: OKÄNT substantiv  {w}"); avvik += 1; continue
            gs = {e["g"] for e in ents if e["g"]}
            if gs and g not in gs:
                print(f"rad {i}: GENUS  {w} ({g}) – ordboken säger {'/'.join(sorted(gs))}"); avvik += 1
            pls = {p for e in ents for p in e["pl"]}
            fm2 = re.match(r"^(un|o)\s+\S+.*?,\s*(doi|două)\s+(.+)$", form)
            if not form: utan += 1
            elif not fm2: print(f"rad {i}: FORMAT böjning  {form}"); avvik += 1
            else:
                art, num, pl = fm2.group(1), fm2.group(2), fm2.group(3).strip()
                if art != ART.get(g) or num != NUM.get(g):
                    print(f"rad {i}: ARTIKEL  {form} – {g} ska ha '{ART.get(g)} … {NUM.get(g)} …'"); avvik += 1
                if pls and pl not in pls:
                    print(f"rad {i}: PLURAL  {w}: '{pl}' – ordboken säger {'/'.join(sorted(pls))}"); avvik += 1
        elif v:  # verb
            w = v.group(1)
            ents = ix["verbs"].get(w) or []
            if not ents: print(f"rad {i}: OKÄNT verb  a {w}"); avvik += 1; continue
            if not form: utan += 1; continue
            # Opersonliga verb (a ploua, a ninge) saknar 1:a person – då står bara
            # presensformen före mittpunkten, och hjälpverbet är "a" i stället för "am".
            fm2 = re.match(r"^([^,·]+),\s*([^·]+)·\s*(?:am|a|m-a)\s+([^·]+)·\s*să\s+(.+)$", form)
            opers = None
            if not fm2:
                opers = re.match(r"^([^,·]+)·\s*(?:am|a|m-a)\s+([^·]+)·\s*să\s+(.+)$", form)
                if not opers: print(f"rad {i}: FORMAT böjning  {form}"); avvik += 1; continue
            got = [x.strip() for x in (fm2.groups() if fm2 else
                                       ("", opers.group(1), opers.group(2), opers.group(3)))]
            for label, key, g2 in (("PRES1", "p1", got[0]), ("PRES3", "p3", got[1]),
                                   ("PARTICIP", "part", got[2]), ("KONJUNKTIV", "sub", got[3])):
                if not g2: continue  # opersonligt: formen finns inte
                allowed = {x for e in ents for x in e[key]}
                bar = re.sub(r"^(mă|mi|m-|se|s-|te|îmi)\s*", "", g2).strip()
                if allowed and g2 not in allowed and bar not in allowed:
                    print(f"rad {i}: {label}  a {w}: '{g2}' – ordboken säger {'/'.join(sorted(allowed))}"); avvik += 1
        else:
            if form: print(f"rad {i}: SAKNAR GENUSMARKERING  {front}  (böjning finns)"); avvik += 1
    print(f"— {n} rader · {avvik} avvikelser · {utan} utan böjning")
    return 1 if avvik else 0

# ---------- csv ----------
CSV_HEAD = "sektion;rumänska;svenska;favorit;minnesregel;prio;böjning"

def csv_field(x):
    return '"' + x.replace('"', '""') + '"' if any(c in x for c in ';,"') else x

def cmd_csv(fil, sektion):
    """Inklistringsformat → CSV för appens import. Böjningen läggs i en SJUNDE
    kolumn: dagens import läser bara sex och hoppar över den, men då finns den
    kvar i filen (och kan skrivas efteråt med scripts/bojning.py)."""
    print(CSV_HEAD)
    for line in open(fil, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"): continue
        p = parse_line(line)
        if not p: continue
        front, back, form, prio = p
        print(";".join(csv_field(x) for x in
                       [sektion, front, back, "", "", prio or "", form or ""]))

# ---------- fyll ----------
def cmd_fyll(fil):
    """In: 'lemma;svenska;prio' (lemma = bart substantiv eller 'a verb').
    Ut: färdiga inklistringsrader med genus och böjning HÄMTADE ur ordboken.
    Osäkert markeras med ??? på raden – inget gissas."""
    ix = load()
    for line in open(fil, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"):
            print(line); continue
        if "{" in line or re.search(r"\([fmn]\)", line):
            print(line); continue  # redan färdig rad (fras, handskriven form) – rörs inte
        if line.startswith(("adj:", "ovr:")):
            # Ordet ska stå som det är. Behövs för ord som OCKSÅ finns som
            # substantiv: adjektivet "mare" (stor) får annars genus och böjning
            # från substantivet "mare" (hav), och månaden "mai" från "mai" (klubba).
            print(line.split(":", 1)[1].strip()); continue
        parts = [x.strip() for x in line.split(";")]
        if len(parts) < 3: print(line); continue
        lemma, sv, prio = parts[0], ";".join(parts[1:-1]), parts[-1]
        if lemma.startswith("a ") and lemma[2:] in ix["verbs"]:
            e = ix["verbs"][lemma[2:]][0]
            g = lambda k: e[k][0] if e[k] else "???"
            print(f"{lemma};{sv};{{{g('p1')}, {g('p3')} · am {g('part')} · să {g('sub')}}};{prio}")
        elif lemma in ix["nouns"]:
            ents = ix["nouns"][lemma]
            e = next((x for x in ents if x["g"] and x["pl"]), ents[0])
            gg = e["g"] or "?"
            if not e["pl"]:  # oräknebart – ingen pluralform i ordboken
                print(f"{lemma} ({gg});{sv};{prio}")
            else:
                print(f"{lemma} ({gg});{sv};{{{ART.get(gg,'???')} {lemma}, {NUM.get(gg,'???')} {e['pl'][0]}}};{prio}")
        elif " " in lemma or lemma[-1] in ".!?" or lemma in set(ix.get("ovriga") or ()):
            print(f"{lemma};{sv};{prio}")  # fras eller annan ordklass – ingen böjning
        else:
            print(f"{lemma};{sv};{prio}   # OKÄNT i ordboken – kontrollera")

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: die(__doc__)
    if a[0] == "bygg": cmd_bygg(*a[1:])
    elif a[0] == "slau" and len(a) > 1: cmd_slau(*a[1:])
    elif a[0] == "kolla" and len(a) == 2: sys.exit(cmd_kolla(a[1]))
    elif a[0] == "fyll" and len(a) == 2: cmd_fyll(a[1])
    elif a[0] == "csv" and len(a) == 3: cmd_csv(a[1], a[2])
    else: die("okänt kommando – kör utan argument för hjälp")
