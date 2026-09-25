#!/usr/bin/env python3
"""Genererar uttalsfiler för persiska glosor – de som saknas, inte allt om igen.

iPhone har ingen persisk röst i Web Speech, så appen spelar färdiga filer i stället:
  audio/fa/<hash>.mp3      hash = sha1(ordet)[:16]
  audio/fa/index.json      {"words": {ordet: hash}} – appen slår upp ordet här

Kör när någon lagt till nya ord; det tar en sekund per tio ord och rör inget som
redan finns. Sedan: granska, committa, deploya.

  plan     visar vilka ord som saknar ljud
  bygg     genererar de som saknas och uppdaterar manifestet

Rösten är fa-IR-DilaraNeural via edge-tts – Microsofts persiska neurala röst, samma
som finns i Azure Speech, men utan konto eller nyckel. Klienten är inofficiell, så
åtkomsten kan försvinna; behövs officiella villkor finns exakt samma röst i Azure
(gratisnivån räcker 250 gånger om för en lektion) och bara anropet nedan byts ut.

VARFÖR INTE DE LOKALA MODELLERNA (båda provade och förkastade):
  Piper/ManaTTS   kollapsar till brus under ~10 fonem – 70 av 107 glosor obrukbara.
  MMS (fas)       kan inte säga ل: i dess teckentabell ÄR pad-token bokstaven ل,
                  och tokenizern stoppar in samma id som tomrum mellan alla tecken.
Varje klipp kvalitetskontrolleras därför: andelen energi i röstregistret 80–1000 Hz
ska vara > 0,35 (brus hamnar runt 0,00), och tystnaden i kanterna klipps bort –
edge-tts lägger ordet i en fast behållare på knappt två sekunder.

Engångsuppsättning:
  python3 -m venv scripts/.venv-tts
  scripts/.venv-tts/bin/pip install edge-tts
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
ROST = "fa-IR-DilaraNeural"   # samma röst finns i Azure under samma namn

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
    if not os.path.exists(INDEX): return {"v": 1, "voice": ROST, "license": "CC BY-NC 4.0", "words": {}}
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

# Tröskeln 0,12 är kalibrerad mot verkliga filer, inte gissad: 60 av Pipers brusklipp
# ligger på 0,00–0,02, och det väsljudstyngsta riktiga ordet (هشت, "hasht") på 0,18.
# Spektral flathet provades också men separerar inte – bruset och talet överlappar där.
KVALITETSGRANS = 0.12

def kvalitet(x, sr):
    """Andel energi i röstregistret. Tal ligger 0,2–0,8; brus runt 0,00."""
    import numpy as np
    sp = np.abs(np.fft.rfft(x * np.hanning(len(x))))
    fr = np.fft.rfftfreq(len(x), 1 / sr)
    return float(sp[(fr > 80) & (fr < 1000)].sum() / max(sp.sum(), 1e-9))

def cmd_plan():
    ix, alla, ut = saknade()
    for ord_, var in list(ut.items())[:20]: print(f"  + {ord_}   ({var})")
    if len(ut) > 20: print(f"  … och {len(ut)-20} till")
    print(f"\n{len(alla)} persiska ord i databasen · {len(alla)-len(ut)} har ljud · {len(ut)} saknar")

def las_pcm(mp3):
    """mp3 → (samples, sr) via ffmpeg, utan extra beroenden."""
    import numpy as np, io as _io
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", mp3, "-ar", "24000", "-ac", "1", "-f", "wav", "-"],
                         capture_output=True).stdout
    with wave.open(_io.BytesIO(raw)) as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype("float32") / 32768, w.getframerate()

def klipp_tystnad(x, sr, fore=0.06, efter=0.12):
    """edge-tts lägger ordet i en fast behållare på ~1,9 s. Klipp kanterna."""
    import numpy as np
    win = int(sr * 0.01)
    e = np.array([np.sqrt((x[k:k + win] ** 2).mean()) for k in range(0, len(x) - win, win)])
    if not len(e): return x
    idx = np.where(e > max(e.max() * 0.04, 0.002))[0]
    if not len(idx): return x
    a = max(0, int((idx[0] * win) - fore * sr))
    b = min(len(x), int((idx[-1] + 1) * win + efter * sr))
    return x[a:b]

def cmd_bygg():
    ix, alla, ut = saknade()
    if not ut: print("inget att göra – alla ord har ljud"); return
    try:
        import asyncio, numpy as np, edge_tts
    except ImportError:
        die("edge-tts saknas – se uppsättningen överst i den här filen")
    os.makedirs(OUT, exist_ok=True)
    dåliga, gjorda = [], 0

    async def hamta(text, fil):
        await edge_tts.Communicate(text, ROST).save(fil)

    for ord_ in ut:
        h = hasha(ord_)
        tmp = os.path.join(OUT, h + ".raw.mp3")
        try:
            asyncio.run(hamta(ren(UTTAL.get(ord_, ord_)), tmp))
        except Exception as e:
            dåliga.append((ord_, f"nätfel: {type(e).__name__}")); continue
        x, sr = las_pcm(tmp)
        q = kvalitet(x, sr)
        if q < KVALITETSGRANS or len(x) / sr < 0.15:
            dåliga.append((ord_, round(q, 2))); os.remove(tmp); continue   # skriv ALDRIG brus till repot
        x = klipp_tystnad(x, sr)
        wav = os.path.join(OUT, h + ".wav")
        with wave.open(wav, "wb") as f:
            f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr)
            f.writeframes((np.clip(x, -1, 1) * 32767).astype("<i2").tobytes())
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav,
                        "-codec:a", "libmp3lame", "-b:a", "64k", os.path.join(OUT, h + ".mp3")], check=True)
        os.remove(wav); os.remove(tmp)
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
