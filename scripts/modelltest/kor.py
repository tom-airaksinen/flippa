#!/usr/bin/env python3
"""Kör alla modeller mot alla prompter via OpenRouter och sparar svaren BLINDAT.

  python3 scripts/modelltest/kor.py plan          vad som skulle köras, och vad det kostar
  python3 scripts/modelltest/kor.py kor           kör allt som saknas (går att avbryta och ta om)
  python3 scripts/modelltest/kor.py kor <modell>  bara en modell

BLINDNINGEN är hela poängen: domaren ska bedöma listorna utan att veta vilken modell
som skrev dem. Därför
  * får varje (modell, körning) en kod ur en SLUMPAD salt som bara finns i nyckel.json,
  * innehåller resultatfilerna ingenting utom glosorna – inte modellnamn, inte latens,
    inte kostnad, för även en siffra kan avslöja vilken klass av modell det är,
  * skrivs nyckel.json till en egen mapp som domaren inte öppnar förrän betygen är satta.

Nyckeln: ~/.config/openrouter-nyckel (en rad) eller OPENROUTER_API_KEY.
"""
import json, os, random, re, string, sys, time, urllib.request, urllib.error
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prompts import alla_korningar, SCHEMA

HAR = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HAR, "resultat")          # blindade svar – domaren läser dessa
HEMLIGT = os.path.join(HAR, "facit")        # kopplingen kod -> modell, latens, kostnad
NYCKELFIL = os.path.expanduser("~/.config/openrouter-nyckel")
URL = "https://openrouter.ai/api/v1/chat/completions"

# Arbetshäst + billigare variant per labb, plus taket (Opus) och baslinjen vi redan
# dömt (gpt-oss-120b = det Groq kör i dag, alltså modell A och D i Toms jämförelse).
MODELLER = [
    "anthropic/claude-opus-4.6",
    "anthropic/claude-sonnet-5.5",
    "anthropic/claude-haiku-5.5",
    "openai/gpt-5.4",
    "openai/gpt-5.4-mini",
    "google/gemini-3.1-pro-preview",
    "google/gemini-3.8-flash",
    "google/gemini-3.1-flash-lite",
    "openai/gpt-oss-120b",
]

def die(m): print(m, file=sys.stderr); sys.exit(1)

def nyckel():
    t = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if t: return t
    if os.path.exists(NYCKELFIL):
        t = open(NYCKELFIL, encoding="utf-8").read().strip()
        if t: return t
    die(f"Ingen nyckel. Lägg den i {NYCKELFIL} (en rad) eller sätt OPENROUTER_API_KEY.")

def priser():
    with urllib.request.urlopen("https://openrouter.ai/api/v1/models") as r:
        d = json.load(r)["data"]
    return {m["id"]: (float(m["pricing"]["prompt"]), float(m["pricing"]["completion"])) for m in d}

def salt():
    """Slumpas en gång och lever i facit – utan den går koderna inte att tyda."""
    os.makedirs(HEMLIGT, exist_ok=True)
    p = os.path.join(HEMLIGT, "salt.txt")
    if not os.path.exists(p):
        open(p, "w").write("".join(random.choice(string.ascii_lowercase + string.digits) for _ in range(24)))
    return open(p).read().strip()

def kod(modell, s):
    import hashlib
    return "M" + hashlib.sha256((s + "|" + modell).encode()).hexdigest()[:6]

def fraga(modell, prompt, nyck):
    kropp = {
        "model": modell,
        "temperature": 0.2,
        # 150 glosor med böjning är ~8 000 tokens ut. Flera leverantörer har ett
        # lågt standardtak, och då hade vi mätt vår egen trunkering som "modellen
        # tappade sig i svansen".
        "max_tokens": 20000,
        "messages": [{"role": "user", "content": prompt}],
        "response_format": {"type": "json_schema",
                            "json_schema": {"name": "lektion", "strict": True, "schema": SCHEMA}},
        "usage": {"include": True},     # OpenRouter rapporterar faktisk kostnad
    }
    req = urllib.request.Request(URL, data=json.dumps(kropp).encode(), method="POST", headers={
        "Authorization": "Bearer " + nyck,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://flippa.tomairaksinen.se",
        "X-Title": "Flippa modelltest",
    })
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            svar = json.load(r)
    except urllib.error.HTTPError as e:
        return None, time.time() - t0, f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:300]}"
    except Exception as e:
        return None, time.time() - t0, f"{type(e).__name__}: {e}"
    return svar, time.time() - t0, None

def tolka(svar):
    txt = (svar.get("choices") or [{}])[0].get("message", {}).get("content") or ""
    try:
        d = json.loads(txt)
    except Exception:
        m = re.search(r"\{.*\}", txt, re.S)
        if not m: return None
        try: d = json.loads(m.group(0))
        except Exception: return None
    return d.get("traffar") if isinstance(d, dict) else None

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "plan"
    bara = sys.argv[2] if len(sys.argv) > 2 else None
    korningar = alla_korningar()
    modeller = [m for m in MODELLER if not bara or bara in m]
    os.makedirs(UT, exist_ok=True); os.makedirs(HEMLIGT, exist_ok=True)
    s = salt()

    if cmd == "plan":
        pr = priser()
        tot = 0.0
        print(f"{len(modeller)} modeller x {len(korningar)} körningar = {len(modeller)*len(korningar)} anrop\n")
        for m in modeller:
            if m not in pr: print(f"  !! {m} finns inte på OpenRouter"); continue
            pin, put = pr[m]
            # ~700 tokens in; ut ~55/glosa (ord, översättning, böjning, prio) + overhead
            kostnad = sum(700 * pin + (55 * k[2]["antal"] + 200) * put for k in korningar)
            tot += kostnad
            print(f"  {m:<34} ${kostnad:6.3f}")
        print(f"\n  SUMMA ca ${tot:.2f} (uppskattat, faktisk kostnad loggas per anrop)")
        return

    if cmd != "kor": die("okänt kommando – plan | kor")
    nyck = nyckel()
    facit_p = os.path.join(HEMLIGT, "facit.json")
    facit = json.load(open(facit_p, encoding="utf-8")) if os.path.exists(facit_p) else {}

    for m in modeller:
        for kid, prompt, meta in korningar:
            k = kod(m, s)
            mapp = os.path.join(UT, kid)
            os.makedirs(mapp, exist_ok=True)
            fil = os.path.join(mapp, k + ".json")
            if os.path.exists(fil):
                print(f"  hoppar över {kid}/{k} (finns)"); continue
            print(f"  {kid:<20} {m:<34} ", end="", flush=True)
            svar, sek, fel = fraga(m, prompt, nyck)
            traffar = tolka(svar) if svar else None
            # Resultatfilen bär BARA glosorna. Allt som kan avslöja modellen -> facit.
            json.dump({"korning": kid, "meta": meta, "traffar": traffar or [], "fel": fel},
                      open(fil, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            u = (svar or {}).get("usage") or {}
            facit[f"{kid}/{k}"] = {
                "modell": m, "sekunder": round(sek, 1),
                "tokens_in": u.get("prompt_tokens"), "tokens_ut": u.get("completion_tokens"),
                "kostnad": u.get("cost"), "antal_glosor": len(traffar or []), "fel": fel,
            }
            json.dump(facit, open(facit_p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            print(f"{len(traffar or [])} glosor  {sek:.1f}s  {('FEL: ' + fel) if fel else ''}")

if __name__ == "__main__":
    main()
