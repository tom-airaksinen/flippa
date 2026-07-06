# Runbook: klassa prio på befintliga lektioner

Stridstestad process från klassningen av hela Italienska-ämnet (3 142 kort,
2026-07-06). Skriven så att en framtida session – även med en enklare modell –
kan göra om jobbet för andra ämnen/konton. Bakgrund och designbeslut:
[`prio-plan-2026-07-06.html`](prio-plan-2026-07-06.html).

## Säkerhetsregler (icke förhandlingsbara)

1. **Skriv ENBART `prio`-fält** (`cards/<id>/prio` via multi-path-PATCH).
   Aldrig hela kort – SRS/favoriter nycklas på ordtexten (`front|back`);
   ändras en bokstav i front/back tappas användarens inlärning för det ordet.
2. **Validera före skrivning**: varje utrad ska matcha ett kort-id i lektionen,
   fronten ska vara identisk med databasens, prio ∈ {1,2,3}, inga dubbla id,
   samma antal rader ut som in.
3. **Verifiera efter skrivning**: läs tillbaka lektionen, räkna fördelningen,
   diffa front/back mot exporten → ska vara 0 avvikelser.
4. Allt är reversibelt: radera `prio`-fälten så är läget återställt. SRS kan
   inte påverkas av något i denna process.

## Klassningsprompt (ge till modellen, per lektion eller grupp av lektioner)

Nedan är instruktionsfilen som användes skarpt (agenterna fick den + en
temanot per lektion). Byt språkparet vid behov.

> Du klassificerar glosor i en glosapp med **prio 1/2/3 per kort**. Användaren
> är en svensk som lär sig {MÅLSPRÅK} (resor + vardag, ambitiös inlärare).
>
> **Definition:** prio = relativ centralitet INOM kortets tema (lektionens
> ämne) – inte i språket som helhet, och inte relativt listan.
> - 1 = kärna: det man möter först och oftast inom temat; omedelbar vardagsnytta.
> - 2 = vanlig: vanligt inom temat men inte det första man behöver.
> - 3 = nisch: perifert/specialiserat även inom temat.
>
> **Kalibrering (beslut som användaren godkänt):**
> - Ikoniskt för mållandet = kärna (italienska: il cornetto, l'aperitivo, la caffettiera fick 1).
> - Vardagsverb är kärna även när de tangerar temagränsen (dormire, mangiare, pulire fick 1).
> - Situationsberoende behov → 2 (senza glutine, vegetariano).
> - Sammansatta uttryck vars delar är basord → 3 (il pollo al forno).
> - Personal-/expertperspektiv → 3 (prendere un'ordinazione).
> - Internationella lånord man redan förstår → 3 (il jetlag, lo yacht, contactless).
> - Arter/sorter/redskapssvansar → 3 (de allra vanligaste i kategorin kan vara 2).
> - Hela meningar/långa fraser → oftast 3 (delarna är det man ska lära sig).
> - **Tvinga ALDRIG fram en fördelning.** Djupa listor blir bottentunga,
>   korta vardagslistor kan sakna 3:or helt, funktionsordslektioner
>   (prepositioner/adverb/grammatik) är naturligt TOPPTUNGA.
> - Blandade lektioner utan tydligt tema (Duolingo-listor): temat = språket i
>   sin helhet → gradera efter allmän frekvens och vardagsnytta.
>
> **Format:** in: rader `cardId<TAB>{målspråk}<TAB>svenska`. Ut: exakt en rad
> per kort, samma ordning: `cardId;{målspråk};prio` – målspråkskolumnen
> kopieras OFÖRÄNDRAD (den används som skrivskydds-kontroll). Ingen annan text.
> Klassa varje rad.

**Temanot per lektion** hjälper mycket – en rad om vad kärnscenariot är, t.ex.
"kärnan är resenärens ord; bildelar/mekanikerfackord är nisch".

## Rimlighetskoll av resultatet (viktigast med enklare modell)

- **Referensfördelningar** (kärna/vanlig/nisch i %), godkända facit:
  Mat och dryck 23/33/45 · Hus och hem 17/32/52 · Transport flyg/tåg/båt
  18/27/55 · Sport 8/26/66 · Prepositioner 95/5/0 · Duolingo-blandlista 54/32/14.
  Tumregel: djup temalektion ≈ 15–25 % kärna; funktionsord ≥ 80 % kärna.
- **Röda flaggor:** nästan allt 1:or (1-inflation – vanligaste felet utan
  fördelningsvarning); nära exakt ⅓/⅓/⅓ (kvotering); basord som *hund/huvud/
  betala* i band 3; hela band 3 tomt i en 300-ordslista.
- **Stickprov:** lista de 10 första 1:orna och 6 första 3:orna per lektion och
  ögna igenom – kärnorna ska vara självklara, nischerna igenkännbart smala.

## Kallstart i ny session: använd verktygsskriptet, inte ad-hoc-curl

**Kör alla dataoperationer via `scripts/prio-klassning.py`** – improviserade
curl/python-kommandon ger en ny permission-prompt per variant, medan skriptet
är ETT stabilt kommandomönster (godkänn en gång med "always allow", eller lägg
regeln nedan i `.claude/settings.json`). Skriptet innehåller dessutom hela
valideringen och vägrar skriva vid minsta avvikelse – säkerhetsreglerna kan
inte hoppas över av misstag. `dangerously-skip-permissions` behövs aldrig.

```
python3 scripts/prio-klassning.py subjects            # lista ämnen
python3 scripts/prio-klassning.py lessons <subjectId> # lista lektioner
python3 scripts/prio-klassning.py export <subjectId> <utkatalog>
python3 scripts/prio-klassning.py write  <subjectId> <lessonId> <utfil>
python3 scripts/prio-klassning.py verify <subjectId>
```

Flödet blir: `export` → klassa varje lektions TSV enligt prompten nedan →
skriv utfil `cardId;front;prio` → `write` (validerar + skriver + verifierar i
ett steg) → `verify` för slutrapport. Obs: text-samtycke i chatten ger inga
verktygsrättigheter – det är permission-dialogen som gäller.

Permission-regel för `.claude/settings.json` (läggs in av användaren):

```json
{
  "permissions": {
    "allow": [
      "Bash(python3 scripts/prio-klassning.py)",
      "Bash(python3 scripts/prio-klassning.py *)"
    ]
  }
}
```

## Tekniskt flöde (Firebase REST – referens; föredra skriptet ovan)

Konfig (apiKey, databaseURL) finns i `firebase-config.js` – inte hemlig,
skyddet är anonym inloggning + regler.

```bash
# 1) Anonym inloggning → idToken (giltig ~1 h, hämta ny vid behov)
TOKEN=$(curl -s -X POST "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=<API_KEY>" \
  -H 'Content-Type: application/json' -d '{"returnSecureToken":true}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['idToken'])")

# 2) Hitta ämnen/lektioner
curl -s "<DB_URL>/content/subjects.json?auth=$TOKEN&shallow=true"      # ämnes-id:n
curl -s "<DB_URL>/content/subjects/<SID>/lessons.json?auth=$TOKEN"     # allt innehåll

# 3) Exportera per lektion till TSV: cardId \t front \t back
#    (sortera på kortens order-fält; hoppa kort som redan har prio om så önskas)

# 4) Klassa med prompten ovan → utfil cardId;front;prio

# 5) Validera (id-match, front-match, prio 1/2/3, radantal) – skript-exempel
#    i prio-planen; principen: jämför mot exporten, skriv INGET vid avvikelse.

# 6) Skriv enbart prio-fälten, en PATCH per lektion:
#    payload {"cards/<id>/prio": N, ...} →
curl -s -X PATCH "<DB_URL>/content/subjects/<SID>/lessons/<LID>.json?auth=$TOKEN" \
  -H 'Content-Type: application/json' -d @payload.json

# 7) Verifiera: läs tillbaka, räkna prio-fördelning, diffa front/back mot
#    exporten (ska vara 0 ändrade).
```

## Övrigt

- Stora ämnen kan delas på parallella agenter (Italienska kördes som 10 grupper
  à ~200–350 ord) – men en modell som tar lektion för lektion funkar lika bra.
- Tomt/ogiltigt prio-fält tolkas som 2 av appen och skrivs aldrig som default –
  delklassade ämnen är alltså alltid i ett konsistent läge.
- Bifynd under läsningen (dubbletter, felstavningar) rapporteras till användaren
  men åtgärdas ALDRIG i samma körning (se säkerhetsregel 1).
- Klassade ämnen hittills: hela Italienska (Toms konto), 2026-07-06.
