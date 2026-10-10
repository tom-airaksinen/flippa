# Modelltest – vilken modell ska generera Flippas lektioner?

Bakgrund: Groqs `gpt-oss-120b` duger för att slå upp enstaka ord men inte för att
bygga lektioner. I ett blindtest på franska (restaurang) och swahili (infektions-
klinik) missade den malaria, tbc, kolera och hiv i en infektionslektion, och
glosade `la carte` som "karta". Felen var kunskapsluckor, inte promptproblem.

Det här är den systematiska uppföljningen: samma prompt till nio modeller, dömd
blint.

## Upplägg

**Prompterna är de Flippa faktiskt skickar** – `prompts.py` är en portning av
`lektionPrompt()` i `worker/src/index.js`. Fyra teman x två storlekar:

| Tema | Språk | Varför |
|---|---|---|
| Restaurang och kafé | franska | redan jämfört – kalibrerar mot det vi vet |
| Infektionsklinik på landsbygden | swahili | litet språk + smal domän; här föll baslinjen |
| Hos läkaren | italienska | domänkunskap i ett språk med gott om data |
| Tågresa och biljetter | rumänska | praktiskt resetema, mellanstort språk |

50 och 150 glosor av varje: den intressanta frågan är inte bara *vad* en modell kan,
utan om den håller ihop en lång lista eller börjar upprepa sig och tappa böjningar
i svansen.

## Blindning

Domaren ska inte veta vilken modell som skrivit vad. Därför:

- varje (modell, körning) får en kod ur en **slumpad salt** som bara finns i `facit/`,
- resultatfilerna i `resultat/` innehåller **bara glosorna** – inte modellnamn, inte
  latens, inte kostnad, eftersom även en svarstid skvallrar om modellklass,
- `facit/` öppnas först när betygen är satta.

Svagheten att vara ärlig om: baslinjen `gpt-oss-120b` är redan bedömd i ett annat
sammanhang, så den kan kännas igen. Den är med som kalibrering, inte som kandidat.

## Körning

    python3 kor.py plan           # vad som körs och vad det kostar (~$3,4)
    python3 kor.py kor            # kör allt som saknas, går att avbryta och ta om
    python3 matt.py               # maskinella mått på alla svar
    python3 excel.py              # sammanställning till xlsx

Nyckel i `~/.config/openrouter-nyckel` (en rad) eller `OPENROUTER_API_KEY`.

## Två steg i bedömningen

1. **Maskinellt** på allt (`matt.py`): levererat antal mot önskat, dubbletter, tomma
   fält, böjning som bara ekar uppslagsformen, prio-fördelning, och om kvaliteten
   faller i andra halvan av listan.
2. **Domare** på det som kräver omdöme: sakfel, relevans för temat, om prion mäter
   centralitet eller allmän frekvens, och vilka viktiga glosor som saknas.

Steg 1 är poängen med att inte bara läsa listorna: 150-ordslistor gånger nio modeller
är 7 200 glosor, och det mesta som går fel i en lång lista går att mäta.

## Domaren kör utan historik

Bedömningen görs av en domare **utan den här sessionens minne** – ett eget
sammanhang som bara ser `domare-instruktion.md`, en körnings blindade listor och
ingenting annat. Skälet är att den som byggt harnesset redan har läst tidigare
jämförelser och vet vad hen tyckte var bra; den förväntan ska inte följa med in i
betygen. En domare per körning, så att inte heller ordningen mellan temana färgar.

Vikterna: sakfel 40 %, relevans 30 %, prio 20 %, böjning 10 %.

## Filer

    prompts.py              prompterna (portade ur workern) + schemat
    kor.py                  kör modellerna, skriver blindade svar + facit
    matt.py                 maskinella mått
    domare-instruktion.md   rubriken domaren får
    excel.py                sammanställning till xlsx
    resultat/<körning>/     blindade svar (skapas vid körning)
    facit/                  kod -> modell, latens, kostnad – öppnas sist
    domar/<körning>.json    domarens betyg
