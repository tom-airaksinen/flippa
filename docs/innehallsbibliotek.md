# Plan – nivåindelat innehållsbibliotek

Underlag/plan (2026-07-01) för ett kurerat, nivåindelat standardutbud per språk, så
det blir lättare att komma igång. **Inget byggt** – det här är upplägget + de första
artefakterna (nivårubrik, topic-lista, generations-prompt). Relaterat:
[`import-paus-favoriter.md`](import-paus-favoriter.md), [`csv-import-mall.md`](csv-import-mall.md).

## Två spår
- **Spår A – innehållet** (det stora, fristående jobbet): kurerade ordlistor per
  språk, topic och nivå. Författar-/datainsats, inte appkod.
- **Spår B – appstöd** (litet): mycket finns redan – CSV-import, paus per lektion
  (per profil), favoriter, minnesregler. "Filtrera/aktivera per nivå" får vi nästan
  gratis via paus.

## Låsta beslut
- **Nivå = egen lektion.** Topic × nivå = en lektion (`Djur · nybörjare`).
- **Aktivering per topic** via paus: nivå 1 aktiv, nivå 2–3 pausade tills man vill.
- **Pilot = ren innehållsproduktion** via CSV-importen (ingen ny appkod först).
- **AI-genererat per språk**, kurerat, generisk kärna + lokal krydda + minnesregler.

## Struktur & namngivning
- Lektionsnamn: `Topic · nivå`, t.ex. `Djur · nybörjare` / `Djur · medel` /
  `Djur · avancerad`.
- CSV: `sektion`-kolumnen = topic+nivå. Importen skapar en lektion per sektion
  (funkar idag). Sortera CSV topic-för-topic, nivå stigande → snygg gruppering i
  listan (importen sätter `order` i radordning).
- Pilot: pausa nivå 2–3 manuellt efter import. Auto-paus av nivå >1 = liten kodfix i
  fas 2.

## Topic-taxonomi (~11 teman, ≈ Collins-kapitlen)
1. Hälsningar & grunderna
2. Familj & relationer
3. Mat & dryck
4. Resa & transport
5. Hemma
6. Kropp & hälsa
7. Tid, tal & datum
8. Natur & djur
9. Fritid & intressen
10. Jobb & skola
11. Känslor & småprat

## Nivårubrik
Arbetsetiketter: **Nybörjare / Medel / Avancerad** (alternativ: "kan en del" i st.f.
"Medel" – se öppna frågor). Princip uppåt: **generiskt → specifikt**, **frekvent →
ovanligt**, och **lokal krydda** vägs in på nivå 2–3.

| Nivå | Antal | Innehåll | Ex. Djur | Ex. Familj |
|---|---|---|---|---|
| Nybörjare | ~30 | De mest centrala, generiska, högfrekventa orden | katt, hund, häst | mamma, pappa, syster, bror |
| Medel | ~30 | Vanliga men mindre basala; börjar bredda | varg, räv, kanin | svärmor, svåger, kusin |
| Avancerad | ~30+ | Ovanligare/specifika; lokal & kulturell krydda | strömming, koala | kusinbarn, syssling |

## Generisk kärna + lokal krydda
- **Språkoberoende master** per topic×nivå (engelska koncept) → konsekvens, delas
  mellan språk.
- Per språk: översätt mastern **och** lägg till lokala ord på nivå 2–3 (grönt te i
  japanska, saltimbocca i italienska) med **minnesregel** som förklarar.
- Lokalt vävs in i nivå 2–3; bryt ev. ut "Kultur & lokalt" om det blir mycket.

## Produktionspipeline (AI per språk)
1. Spika mastern (topics + nivårubrik + engelska konceptlistor) – en gång.
2. Per språk: generera CSV (`sektion;<målspråk>;svenska;favorit;minnesregel`,
   sektion = `Topic · nivå`) med lokala tillägg + minnesregler. Kan köras med
   parallella agenter per topic (likt Collins-extraheringen, men generativ).
3. **Granskning** (helst någon som kan språket): stavning, genus/artikel, att lokala
   ord stämmer. AI-innehåll är utkast.
4. Import & test via CSV.

## Konventioner för det genererade innehållet
- **Utländska sidan behåller artikel** (för genus): `il treno`, `la moglie`.
- **Svenska sidan i obestämd form** för rena substantiv: `hund`, inte `hunden`.
- `favorit` lämnas tom. `minnesregel` används för kulturella/svåra ord.
- UTF-8, bevara accenter. Fält med `;` eller `,` omsluts med `"`.

## App-roadmap (efter pilot)
1. `level`- + `topic`-fält på lektioner; auto-paus av nivå >1 vid import.
2. Nivåmärke i lektionslistan.
3. Nivåfilter / "aktivera nivå 2 för detta topic" (bygger på paus, grupperar per topic).
4. Onboarding: "Lägg till startpaket (nivå 1)" vid nytt ämne med känt språk.
5. Biblioteksväljare i appen (bläddra & lägg till paket) – sist, störst onboarding-värde.

## Mini-pilot (föreslaget nästa steg när vi återupptar)
Italienska × {Djur, Familj & relationer, Mat & dryck} × 3 nivåer → CSV → import →
känn på det. Noll ny appkod.

---

## Generations-prompt (mall)

Kör per språk och topic (eller be om flera topics i ett svep). Byt ut
`{MÅLSPRÅK}` och `{TOPIC}`.

> Du ska skapa kurerade, nivåindelade glosor för språkinlärning. Målspråk:
> **{MÅLSPRÅK}**. Tema: **{TOPIC}**. Returnera **enbart CSV**, semikolonseparerad,
> med exakt dessa kolumner och denna rubrikrad först:
>
> `sektion;{MÅLSPRÅK_KOLUMN};svenska;favorit;minnesregel`
>
> Skapa tre nivåer för temat, som sektioner:
> - `{TOPIC} · nybörjare` – ~30 av de mest centrala, generiska, högfrekventa orden.
> - `{TOPIC} · medel` – ~30 vanliga men mindre basala ord; börja bredda.
> - `{TOPIC} · avancerad` – ~30+ ovanligare/specifika ord, inklusive **lokala och
>   kulturella** ord som är typiska för där {MÅLSPRÅK} talas.
>
> Regler:
> - **sektion** = exakt en av de tre rubrikerna ovan, samma för alla ord i nivån.
> - **{MÅLSPRÅK_KOLUMN}** = ordet/frasen på {MÅLSPRÅK}. Behåll bestämd/obestämd
>   **artikel** där språket har genus (t.ex. italienska: `il cane`, `la gatta`).
> - **svenska** = svensk översättning i **obestämd form** för rena substantiv
>   (`hund`, inte `hunden`). Fraser/verb/adjektiv lämnas naturliga.
> - **favorit** = lämna tomt.
> - **minnesregel** = lämna oftast tomt; fyll i för **lokala/kulturella eller svåra**
>   ord med en kort förklaring (t.ex. `saltimbocca;saltimbocca;;kalvkött med
>   salvia och prosciutto`).
> - Generiskt → specifikt och frekvent → ovanligt uppåt i nivåerna. Undvik dubbletter
>   mellan nivåerna.
> - Bevara accenter, spara som UTF-8. Omslut fält som innehåller `;` eller `,` med
>   dubbla citattecken.
> - Returnera bara CSV-innehållet, inget annat.

### Litet exempel (italienska, Djur – utdrag)
```
sektion;italienska;svenska;favorit;minnesregel
Djur · nybörjare;il cane;hund;;
Djur · nybörjare;il gatto;katt;;
Djur · nybörjare;il cavallo;häst;;
Djur · medel;il lupo;varg;;
Djur · medel;la volpe;räv;;
Djur · avancerad;l'aringa;strömming;;
Djur · avancerad;il koala;koala;;
```
