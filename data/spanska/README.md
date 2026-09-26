# Spanska – lektionsunderlag

Paketet "Resa och vardag" åt Lucas: samma tolv situationslektioner som rumänskan,
översatta. Den **svenska sidan och prion är rumänskans** – den är redan skriven och
klassad – så jobbet är målspråket plus lokal krydda.

| Fil | Lektion | Kort | prio 1/2/3 |
|---|---|---|---|
| `restaurang-kafe.csv` | Restaurang & kafé | 52 | 21/28/3 |

Elva lektioner återstår: Hotell & frukost, Hyrbil & vägen, Slott & sevärdheter,
Tid/dagar/siffror, Färger & vanliga adjektiv, Djur, Natur & väder, Handla & butik,
Kropp/hälsa/apotek, Småprat & artighet, Nödsituationer. Totalt 447 ord.

## Konventioner

- **Substantiv med bestämd artikel** (`el camarero`, `la mesa`) så genus syns på kortet.
  Svenska sidan står i obestämd form.
- **Inget böjningsfält.** Rumänskan behövde det (oförutsägbar plural); spanskans
  plural är regelbunden. Området skapas alltså utan böjning påslaget.
- **Ingen translitterering** – latinsk skrift.
- **Inget förgenererat ljud.** iPhone har spansk röst, så uttalet sköts av Web Speech.
- **Lokal krydda byts ut, inte översätts.** Där rumänskan hade `ciorbă`, `mămăligă`,
  `sarmale`, `papanași` har spanskan `gazpacho`, `tortilla de patatas`, `paella`,
  `churros`, `jamón ibérico`, `bocadillo`, `flan`.
- **Minnesregel används sparsamt**, bara där ett ord behöver förklaras för en svensk:
  `la caña` (fatöl i litet glas), `la carta` mot `el menú` (meny mot dagens rätt),
  `la tapa`, `el bocadillo`.

## Så importeras det

Skapa området **Spanska** med språk `es-ES` (ingen böjning), sedan ＋ → Importera CSV.
Lektionen skapas av `sektion`-kolumnen och kommer in pausad.
