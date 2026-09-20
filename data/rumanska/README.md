# Rumänska – lektionsunderlag

Pilot (2026-09-20): tre situationslektioner inför resan. Varje lektion finns i
två format:

- **`*.csv`** – för appens CSV-import (＋ → Importera CSV, flera filer samtidigt).
  Skapar lektionerna själv och tar med prio. **Böjningen ligger i kolumn 7 och
  läses inte av importen** – den skrivs efteråt med `scripts/bojning.py`.
- **`inklistring/*.txt`** – appens inklistringsformat `front;baksida;{böjning};prio`,
  klistras in i en redan skapad lektion. Tar med böjningen direkt.
  ⚠️ Ligger i egen mapp **med flit**: dras en .txt in i CSV-importen läses kolumn 1
  (det rumänska ordet) som lektionsnamn → en lektion per ord. Hände 2026-09-20,
  städades med `scripts/rensa-felimport.py`.

### Pilot (importerad 2026-09-20, böjningar skrivna)

| Fil | Lektion i appen | Kort | prio 1/2/3 |
|---|---|---|---|
| `restaurang-kafe` | Restaurang & kafé | 52 | 20/29/3 |
| `hotell-frukost` | Hotell & frukost | 50 | 18/28/4 |
| `hyrbil-vagen` | Hyrbil & vägen | 51 | 21/21/9 |

### Omgång 2

| Fil | Lektion i appen | Kort | prio 1/2/3 | med böjning |
|---|---|---|---|---|
| `slott-sevardheter` | Slott & sevärdheter | 41 | 16/20/5 | 26 |
| `tid-dagar-siffror` | Tid, dagar & siffror | 47 | 16/12/19 | 18 |
| `farger-adjektiv` | Färger & vanliga adjektiv | 36 | 14/17/5 | 0 |
| `djur` | Djur | 28 | 5/11/12 | 26 |
| `natur-vader` | Natur & väder | 32 | 11/12/9 | 28 |
| `handla-butik` | Handla & butik | 33 | 10/17/6 | 25 |
| `kropp-halsa-apotek` | Kropp, hälsa & apotek | 35 | 20/13/2 | 27 |
| `smaprat-artighet` | Småprat & artighet | 25 | 15/9/1 | 9 |
| `nodsituationer` | Nödsituationer | 17 | 9/7/1 | 10 |

Summa 447 kort i tolv lektioner. Färglektionen har noll böjningar med flit:
adjektiv böjs efter genus och tas i Gnugga, inte som glosböjning.

## Arbetsflödet

1. Orden väljs för hand i `kalla/*.src.txt` – rader `lemma;svenska;prio`.
   Färdiga rader (fraser, egna böjningar) passerar orört.
2. `python3 scripts/ro-former.py fyll kalla/X.src.txt` fyller på genus och
   böjning **ur ordboken** (Wiktionary via kaikki.org). Inget gissas: saknas
   uppgiften skrivs `???`.
3. `python3 scripts/ro-former.py kolla X.txt` granskar den färdiga filen –
   genus, plural, verbformer, prio – och listar avvikelser.
4. `python3 scripts/ro-former.py csv inklistring/X.txt "Lektionsnamn"` gör importfilen.
5. Efter importen: `scripts/bojning.py plan/apply <sid> <lid> <fil.json>` skriver
   böjningsfältet på de importerade korten (matchning på framsidan).

Ordboksindexet byggs en gång med `ro-former.py bygg` ur
`gnugga/scripts/raw/kaikki-ro.jsonl` (65 556 substantiv, 7 302 verb).

## Ordklass-prefix i källfilerna

`adj:` och `ovr:` framför en rad betyder "slå inte upp, ta ordet som det står".
Behövs för ord som **också** finns som substantiv: annars får adjektivet `mare`
(stor) genus och böjning från substantivet `mare` (hav), och månaden `mai` från
`mai` (klubba).

## Kvarstående varningar (avsiktliga)

`fel principal`, `mici`, `apă plată`, `cereale` slås inte upp som helheter –
de är flerordiga eller pluralformer. Delarna är kontrollerade var för sig.

Ordboken är enkällig: där Wiktionary avviker från DEX vinner DEX vid tveksamhet
(t.ex. `orez`, som Wiktionary kallar maskulinum och DEX neutrum).
