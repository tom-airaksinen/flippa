#!/usr/bin/env python3
"""Genererar uttalsfiler för persiska glosor – de som saknas, inte allt om igen.

iPhone har ingen persisk röst i Web Speech, så appen spelar färdiga filer i stället:
  audio/fa/<hash>.mp3      hash = sha1(ordet)[:16]
  audio/fa/index.json      {"words": {ordet: hash}} – appen slår upp ordet här

Kör när någon lagt till nya ord; det tar en sekund per tio ord och rör inget som
redan finns. Sedan: granska, committa, deploya.

  plan     visar vilka ord som saknar ljud
  bygg     genererar de som saknas och uppdaterar manifestet

Rösten är facebook/mms-tts-fas (Metas MMS), körd lokalt. CC BY-NC 4.0 – fri men
icke-kommersiell, och attributionen står i appens hjälptext.

VARFÖR INTE PIPER: den persiska Piper-rösten (ManaTTS) är tränad på inläst bokprosa
och kollapsar till brus under ~10 fonem – 70 av 107 glosor blev oanvändbara. Varje
klipp kvalitetskontrolleras därför här: andelen energi i röstregistret 80–1000 Hz
ska vara > 0,35. Brus hamnar runt 0,00.

Engångsuppsättning (~1 GB, ligger utanför repot):
  python3 -m venv scripts/.venv-tts
  scripts/.venv-tts/bin/pip install "torch>=2.0,<2.3" "transformers>=4.33" "numpy<2"
Kör sedan:
  scripts/.venv-tts/bin/python scripts/tts-fa.py plan
"""
import hashlib, json, os, re, subprocess, sys, urllib.request, wave

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "audio", "fa")
INDEX = os.path.join(OUT, "index.json")
API_KEY = "AIzaSyAFFQFMBqspO71R1ykDU6VdTSaFY1P-6dA"
DB = "https://flashcards-484e9-default-rtdb.europe-west1.firebasedatabase.app"
MODEL = "facebook/mms-tts-fas"

def die(m): print("FEL: " + m, file=sys.stderr); sys.exit(1)

# ---------- orden ur databasen ----------
def token():
    r = urllib.request.Request(f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}",
                               data=b'{"returnSecureToken":true}', method="POST",
                               headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(r) as f: return json.load(f)["idToken"]

def persiska_ord():
    """Alla distinkta framsidor i alla persiska ämnen, oavsett ägare."""
    with urllib.request.urlopen(f"{DB}/content/subjects.json?auth={token()}") as f:
        subjects = json.load(f) or {}
    ord_ = {}
    for sid, s in subjects.items():
        if not str(s.get("lang") or "").lower().startswith("fa"): continue
        for lid, l in (s.get("lessons") or {}).items():
            for cid, c in (l.get("cards") or {}).items():
                front = (c.get("front") or "").strip()
                if front: ord_.setdefault(front, f"{s.get('name')} / {l.get('name')}")
    return ord_

def las_index():
    if not os.path.exists(INDEX): return {"v": 1, "voice": MODEL, "license": "CC BY-NC 4.0", "words": {}}
    return json.load(open(INDEX, encoding="utf-8"))

def hasha(ord_): return hashlib.sha1(ord_.encode()).hexdigest()[:16]

def saknade():
    ix = las_index()
    alla = persiska_ord()
    ut = {}
    for ord_, var in alla.items():
        h = ix["words"].get(ord_) or hasha(ord_)
        if ord_ not in ix["words"] or not os.path.exists(os.path.join(OUT, h + ".mp3")):
            ut[ord_] = var
    return ix, alla, ut

# ---------- syntes ----------
# En ensam bokstav är degenererad indata för en meningstränad modell (och det man vill
# höra är ändå bokstavens NAMN, inte glyfen). Nyckeln i manifestet är kortets framsida,
# men det som läses upp är namnet.
UTTAL = {
    "ا": "الف", "ب": "به", "پ": "په", "ت": "ته", "ث": "ثه", "ج": "جیم", "چ": "چه",
    "ح": "حه", "خ": "خه", "د": "دال", "ذ": "ذال", "ر": "ره", "ز": "زه", "ژ": "ژه",
    "س": "سین", "ش": "شین", "ص": "صاد", "ض": "ضاد", "ط": "طا", "ظ": "ظا", "ع": "عین",
    "غ": "غین", "ف": "فه", "ق": "قاف", "ک": "کاف", "گ": "گاف", "ل": "لام", "م": "میم",
    "ن": "نون", "و": "واو", "ه": "هه", "ی": "یا",
}
# Skiljetecken bort före uppläsning: motorn läser annars "؟" som ordet "frågetecken".
def ren(t): return re.sub(r"\s+", " ", re.sub(r"[؟?!،…]|\.\.\.", " ", t)).strip()

def kvalitet(x, sr):
    """Andel energi i röstregistret. Tal ligger 0,4–0,8; brus runt 0,00."""
    import numpy as np
    sp = np.abs(np.fft.rfft(x * np.hanning(len(x))))
    fr = np.fft.rfftfreq(len(x), 1 / sr)
    return float(sp[(fr > 80) & (fr < 1000)].sum() / max(sp.sum(), 1e-9))

def cmd_plan():
    ix, alla, ut = saknade()
    for ord_, var in list(ut.items())[:20]: print(f"  + {ord_}   ({var})")
    if len(ut) > 20: print(f"  … och {len(ut)-20} till")
    print(f"\n{len(alla)} persiska ord i databasen · {len(alla)-len(ut)} har ljud · {len(ut)} saknar")

def cmd_bygg():
    ix, alla, ut = saknade()
    if not ut: print("inget att göra – alla ord har ljud"); return
    try:
        import numpy as np, torch
        from transformers import VitsModel, AutoTokenizer
    except ImportError:
        die("torch/transformers saknas – se uppsättningen överst i den här filen")
    os.makedirs(OUT, exist_ok=True)
    mod = VitsModel.from_pretrained(MODEL); tok = AutoTokenizer.from_pretrained(MODEL)
    sr = mod.config.sampling_rate
    dåliga, gjorda = [], 0
    for ord_ in ut:
        h = hasha(ord_)
        i = tok(ren(UTTAL.get(ord_, ord_)), return_tensors="pt")
        with torch.no_grad(): w = mod(**i).waveform[0].numpy()
        q = kvalitet(w, sr)
        if q < 0.35 or len(w) / sr < 0.15:
            dåliga.append((ord_, round(q, 2))); continue      # skriv ALDRIG brus till repot
        wav = os.path.join(OUT, h + ".wav")
        with wave.open(wav, "wb") as f:
            f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr)
            f.writeframes((np.clip(w, -1, 1) * 32767).astype("<i2").tobytes())
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav,
                        "-codec:a", "libmp3lame", "-b:a", "64k", os.path.join(OUT, h + ".mp3")], check=True)
        os.remove(wav)
        ix["words"][ord_] = h; gjorda += 1
    json.dump(ix, open(INDEX, "w", encoding="utf-8"), ensure_ascii=False)
    print(f"KLART: {gjorda} nya ljudfiler · manifestet har nu {len(ix['words'])} ord")
    if dåliga:
        print(f"\n{len(dåliga)} ord gav brus och hoppades över – de får inget ljud i appen:")
        for o, q in dåliga[:10]: print(f"  {o}  (kvalitet {q})")

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: die(__doc__)
    if a[0] == "plan": cmd_plan()
    elif a[0] == "bygg": cmd_bygg()
    else: die("okänt kommando – kör utan argument för hjälp")
