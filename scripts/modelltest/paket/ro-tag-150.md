# Bedömning: ro-tag-150

**Tema:** Tågresa och biljetter  
**Språk:** rumänska  
**Beställt antal glosor:** 150  
**Böjningsfält:** ja

# Instruktion till domaren

Du bedömer glosförslag till **Flippa**, en glosapp där man tränar med flippkort.
Varje lista skulle kunna bli en färdig lektion. Du vet inte – och ska inte försöka
gissa – vilken språkmodell som skrivit vilken lista. De heter bara `M` plus sex
tecken.

## Vad listan skulle användas till

En vuxen svensk nybörjare som ska klara sig i en konkret situation. Glosorna visas
som kort: utländskt ord på ena sidan, svenska på andra, plus ett böjningsfält och
en prio-siffra (1 = kärnord för temat, 2 = vanligt och nyttigt, 3 = perifert).

Prio mäter **centralitet för temat**, inte hur vanligt ordet är i språket i stort.
En lista som sätter "kniv" på 1 och "frukost" på 2 i en restauranglektion har mätt
fel sak: man behöver sällan *säga* kniv, men frukost står på varje kafé.

## Betygsätt fyra saker, 1–5

| Kriterium | Vikt | Vad som bedöms |
|---|---|---|
| **sakfel** | 40 % | Är översättningarna korrekta? Är orden äkta och idiomatiska, eller konstruerade? Fel i betydelse väger tyngst av allt – ett kort man memorerar fel är värre än ett kort som saknas. |
| **relevans** | 30 % | Hör orden till temat? Kan man faktiskt klara situationen med listan, eller är det en ordlista utan fraser? Saknas något uppenbart centralt? |
| **prio** | 20 % | Mäter prio centralitet för temat, eller allmän ordfrekvens? Är fördelningen rimlig (riktmärke ungefär hälften 1:or, en tredjedel 2:or, resten 3:or)? |
| **böjning** | 10 % | Följer böjningsfältet instruktionen (obestämd singular + plural; för verb de former man inte kan gissa)? Eller ekar det bara uppslagsformen? Tomt fält där språket kräver böjning är ett fel, men ett litet. |

5 = inget att anmärka. 4 = enstaka småfel. 3 = fungerar men med tydliga brister.
2 = flera allvarliga problem. 1 = oanvändbar.

## Svara med JSON

```json
{
  "korning": "<körningens id>",
  "domar": {
    "M123abc": {
      "betyg": {"sakfel": 4, "relevans": 5, "prio": 3, "bojning": 4},
      "fel": [{"glosa": "la carte", "problem": "glosad som 'karta'; på restaurang är det menyn"}],
      "saknas": ["l'addition", "sans/avec"],
      "kommentar": "En mening om listans karaktär och vad som skiljer den från de andra."
    }
  },
  "rangordning": ["M123abc", "Mdef456"],
  "motivering": "Två–tre meningar om varför ordningen blev som den blev."
}
```

Ta med **alla** fel du är säker på i `fel` – det är den viktigaste utdatan. Är du
osäker på ett ord (litet språk, fackterm), skriv det i `kommentar` i stället för att
gissa: en falsk anklagelse är värre än en missad miss.

Vid 150-ordslistor: läs hela, men lägg särskild vikt vid **slutet** av listan. Det är
där modeller brukar börja upprepa sig, tappa böjningar eller fylla ut med perifera ord.


---

## Listorna (9 stycken)

### Md79d6c — 158 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | stație | station | o stație, două stații |
| 1 | peron | perrong | un peron, două peronuri |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | rezervare | reservation | o rezervare, două rezervări |
| 1 | loc | plats, säte | un loc, două locuri |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 1 | cameră de dormit | sovkupa |  |
| 1 | conducător de tren | lokförare |  |
| 1 | controlor | konduktör | un controlor, doi controllori |
| 1 | oră de plecare | avgångstid |  |
| 1 | oră de sosire | ankomsttid |  |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | program | tidtabell | un program, două programe |
| 1 | bilet electronic | elektronisk biljett |  |
| 1 | validare | validering | o validare, două validări |
| 1 | cupoane | kuponger | un cupon, două cupoane |
| 1 | anunț | meddelande | un anunț, două anunțuri |
| 1 | închidere | stängning | o închidere, două închideri |
| 1 | deschidere | öppning | o deschidere, două deschideri |
| 1 | cumpărare | köp | o cumpărare, două cumpărări |
| 1 | vânzare | försäljning | o vânzare, două vânzări |
| 1 | restituire | återbetalning | o restituire, două restituiri |
| 1 | schimbare | byte | o schimbare, două schimbări |
| 1 | înscriere | registrering | o înscriere, două înscrieri |
| 1 | încărcare | laddning | o încărcare, două încărcări |
| 1 | descărcare | avladdning | o descărcare, două descărcări |
| 2 | bilet redus | rabatterad biljett |  |
| 2 | bilet întreg | fullprisbiljett |  |
| 2 | bilet de grup | gruppbiljett |  |
| 2 | bilet de copil | barnbiljett |  |
| 2 | bilet de student | studentbiljett |  |
| 2 | bilet de senior | pensionärsbiljett |  |
| 2 | bilet de zi | dagbiljett |  |
| 2 | bilet de noapte | nattbiljett |  |
| 2 | bilet de retur | returbiljett |  |
| 2 | bilet de unică călătorie | enkelbiljett |  |
| 2 | bilet de călătorie în grup | gruppresa |  |
| 3 | bilet de călătorie în afara rețelei | biljett utanför nätet |  |
| 2 | bilet de călătorie internațională | internationell biljett |  |
| 2 | bilet de călătorie regională | regional biljett |  |
| 2 | bilet de călătorie locală | lokal biljett |  |
| 3 | bilet de călătorie cu discount | rabatterad biljett |  |
| 3 | bilet de călătorie cu prioritate | prioritetsbiljett |  |
| 2 | bilet de călătorie cu loc rezervat | biljett med reserverat säte |  |
| 3 | bilet de călătorie cu loc liber | biljett med ledigt säte |  |
| 3 | bilet de călătorie cu acces la Wi‑Fi | biljett med Wi‑Fi‑tillgång |  |
| 3 | bilet de călătorie cu masă | biljett med matsal |  |
| 3 | bilet de călătorie cu animal de companie | biljett med husdjur |  |
| 3 | bilet de călătorie cu bicicletă | biljett med cykel |  |
| 2 | bilet de călătorie cu bagaje | biljett med bagage |  |
| 3 | bilet de călătorie cu prioritate la îmbarcare | biljett med ombordstigningsprioritet |  |
| 3 | bilet de călătorie cu acces la lounge | biljett med lounge‑tillgång |  |
| 2 | bilet de călătorie cu reducere pentru seniori | biljett med seniorrabatt |  |
| 2 | bilet de călătorie cu reducere pentru studenți | biljett med studentrabatt |  |
| 2 | bilet de călătorie cu reducere pentru copii | biljett med barnrabatt |  |
| 3 | bilet de călătorie cu reducere pentru grupuri | biljett med grupprabatt |  |
| 3 | bilet de călătorie cu reducere pentru militari | biljett med militärrabatt |  |
| 2 | bilet de călătorie cu reducere pentru pensionari | biljett med pensionärsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru persoane cu dizabilități | biljett med funktionshinderprenumeration |  |
| 3 | bilet de călătorie cu reducere pentru familii | familjebiljett med rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii frecvente | biljett med frekventresenärsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de afaceri | biljett med affärsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de vacanță | biljett med semesterprenumeration |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de weekend | biljett med helgrabbatter |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de noapte | biljett med nattprenumeration |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de dimineață | biljett med morgonprenumeration |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de seară | biljett med kvällsprenumeration |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de sărbători | biljett med helgprenumeration |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de ultimă oră | biljett med sista minuten‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup mare | biljett med storgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup mic | biljett med liten grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup familial | biljett med familjegruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup corporativ | biljett med företagsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup școlar | biljett med skolgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup universitar | biljett med universitetsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup cultural | biljett med kulturgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup sportiv | biljett med sportgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup artistic | biljett med konstgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup religios | biljett med religiös grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup caritativ | biljett med välgörenhetsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de voluntari | biljett med volontärgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de cercetare | biljett med forskningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de dezvoltare | biljett med utvecklingsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de inovare | biljett med innovationsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de tehnologie | biljett med teknikgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de mediu | biljett med miljögruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de sănătate | biljett med hälsogruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de educație | biljett med utbildningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism | biljett med turismgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de transport | biljett med transportgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de logistică | biljett med logistgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de comerț | biljett med handelsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de finanțe | biljett med finansgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de asigurări | biljett med försäkringsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de imobiliare | biljett med fastighetsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de energie | biljett med energigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de telecomunicații | biljett med telekommunikationsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de media | biljett med mediagruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de divertisment | biljett med underhållningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de artă | biljett med konstgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de literatură | biljett med litteraturgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de muzică | biljett med musikgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de teatru | biljett med teatergruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de film | biljett med filmgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de fotografie | biljett med fotografigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de design | biljett med designgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de arhitectură | biljett med arkitekturgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de inginerie | biljett med ingenjörsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de știință | biljett med vetenskapsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de matematică | biljett med matematikgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de fizică | biljett med fysikgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de chimie | biljett med kemigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de biologie | biljett med biologigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de medicină | biljett med medicinsk grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de psihologie | biljett med psykologigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de sociologie | biljett med sociologigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de filosofie | biljett med filosofigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de istorie | biljett med historikgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de geografie | biljett med geografigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de politică | biljett med politisk grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de economie | biljett med ekonomigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de drept | biljett med juridisk grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de religie | biljett med religiös grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de spiritualitate | biljett med andlig grupp‑rabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de wellness | biljett med wellness‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de sănătate mentală | biljett med mental hälsogruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de nutriție | biljett med näringsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de fitness | biljett med fitness‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de yoga | biljett med yogagruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de meditație | biljett med meditationsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de terapie | biljett med terapigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de consiliere | biljett med rådgivningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de coaching | biljett med coachningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de mentorat | biljett med mentorsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de leadership | biljett med ledarskapsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de management | biljett med ledningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de strategie | biljett med strategigruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de planificare | biljett med planeringsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de organizare | biljett med organisationsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de producție | biljett med produktionsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de distribuție | biljett med distributionsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de vânzări | biljett med försäljningsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de marketing | biljett med marknadsföringsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de publicitate | biljett med reklambyrågruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de relații publice | biljett med PR‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de evenimente | biljett med evenemangsgruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism de aventură | biljett med äventyrsturism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism cultural | biljett med kultur‑turism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism ecologic | biljett med ekologisk turism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism gastronomic | biljett med gastronomisk turism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism sportiv | biljett med sportturism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism de sănătate | biljett med hälsoturism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism de afaceri | biljett med affärsturism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism de studii | biljett med studieturism‑gruppsrabatt |  |
| 3 | bilet de călătorie cu reducere pentru călătorii de grup de turism de voluntariat | biljett med volontärturism‑gruppsrabatt |  |

### Mf1dedb — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | gară | tågstation | o gară, două gări |
| 1 | peron | perrong | un peron, două peroane |
| 1 | linie (f) | spår | o linie, două linii |
| 1 | vagon | tågvagn | un vagon, două vagoane |
| 1 | conductor | konduktör | un conductor, doi conductori |
| 1 | controlor | biljettkontrollant | un controlor, doi controlori |
| 1 | plecare (f) | avgång | o plecare, două plecări |
| 1 | sosire (f) | ankomst | o sosire, două sosiri |
| 1 | întârziere (f) | försening | o întârziere, două întârzieri |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | mersul trenurilor | tågtidtabell | un mers al trenurilor, două mersuri ale trenurilor |
| 1 | loc | sittplats | un loc, două locuri |
| 1 | rezervare (f) | platsreservation | o rezervare, două rezervări |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 1 | ghișeu | biljettlucka | un ghișeu, două ghișee |
| 1 | călător | resenär | un călător, doi călători |
| 1 | pasager | passagerare | un pasager, doi pasageri |
| 1 | călătorie (f) | tågresa | o călătorie, două călătorii |
| 1 | destinație (f) | destination | o destinație, două destinații |
| 1 | bilet doar dus | enkelbiljett | un bilet doar dus, două bilete doar dus |
| 1 | bilet dus-întors | tur-och-returbiljett | un bilet dus-întors, două bilete dus-întors |
| 2 | valabilitate (f) | giltighet | o valabilitate, două valabilități |
| 1 | a călători | att resa | călătoresc · călătorește · am călătorit · să călătorească |
| 1 | a pleca | att avgå | plec · pleacă · am plecat · să plece |
| 1 | a sosi | att anlända | sosesc · sosește · am sosit · să sosească |
| 1 | a urca | att stiga på | urc · urcă · am urcat · să urce |
| 1 | a coborî | att stiga av | cobor · coboară · am coborât · să coboare |
| 1 | a schimba | att byta tåg | schimb · schimbă · am schimbat · să schimbe |
| 1 | a prinde | att hinna med tåget | prind · prinde · am prins · să prindă |
| 1 | a pierde | att missa tåget | pierd · pierde · am pierdut · să piardă |
| 1 | a rezerva | att boka | rezerv · rezervă · am rezervat · să rezerve |
| 1 | a valida | att stämpla biljett | validez · validează · am validat · să valideze |
| 2 | compostor | biljettstämplare | un compostor, două compostoare |
| 1 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 1 | bilet electronic | elektronisk biljett | un bilet electronic, două bilete electronice |
| 1 | clasa întâi (f) | första klass |  |
| 1 | clasa a doua (f) | andra klass |  |
| 1 | legătură (f) | tåganslutning | o legătură, două legături |
| 3 | scară (f) | tågtrappa | o scară, două scări |
| 1 | compartiment | tågkupé | un compartiment, două compartimente |
| 1 | loc la fereastră | fönsterplats | un loc la fereastră, două locuri la fereastră |
| 1 | loc la culoar | gångplats | un loc la culoar, două locuri la culoar |
| 2 | culoar | mittgång | un culoar, două culoare |
| 1 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 1 | cușetă | liggvagn | o cușetă, două cușete |
| 1 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 2 | locomotivă | lok | o locomotivă, două locomotive |
| 2 | șină (f) | räls | o șină, două șine |
| 1 | cale ferată (f) | järnväg | o cale ferată, două căi ferate |
| 1 | tablă de plecări | avgångstavla | o tablă de plecări, două table de plecări |
| 2 | panou de afișaj | informationstavla | un panou de afișaj, două panouri de afișaj |
| 1 | stație (f) | station | o stație, două stații |
| 2 | haltă | hållplats | o haltă, două halte |
| 2 | escală | mellanlandning eller byte | o escală, două escale |
| 2 | oprire (f) | tåguppehåll | o oprire, două opriri |
| 1 | tren direct | direkttåg | un tren direct, două trenuri directe |
| 1 | tren de mare viteză | snabbtåg | un tren de mare viteză, două trenuri de mare viteză |
| 1 | tren regional | regionaltåg | un tren regional, două trenuri regionale |
| 1 | tren intercity | intercitytåg | un tren intercity, două trenuri intercity |
| 1 | tren de noapte (f) | nattåg | un tren de noapte, două trenuri de noapte |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 2 | suport de bagaje | bagagehylla | un suport de bagaje, două suporturi de bagaje |
| 2 | dulap pentru bagaje | förvaringsbox | un dulap pentru bagaje, două dulapuri pentru bagaje |
| 2 | sală de așteptare | väntsal | o sală de așteptare, două săli de așteptare |
| 2 | birou de informații (n) | informationsdisk | un birou de informații, două birouri de informații |
| 2 | birou de obiecte pierdute (n) | hittegodsavdelning | un birou de obiecte pierdute, două birouri de obiecte pierdute |
| 2 | supliment | tilläggsavgift | un supliment, două suplimente |
| 2 | amendă | straffavgift | o amendă, două amenzi |
| 2 | tarif | taxa | un tarif, două tarife |
| 1 | reducere (f) | rabatt | o reducere, două reduceri |
| 2 | abonament | periodbiljett | un abonament, două abonamente |
| 1 | anulat | inställd |  |
| 1 | la timp | i tid |  |
| 2 | anunț | högtalarutrop | un anunț, două anunțuri |
| 3 | megafon | högtalare | un megafon, două megafoane |
| 3 | trecere la nivel cu calea ferată (f) | järnvägsövergång | o trecere la nivel cu calea ferată, două treceri la nivel cu calea ferată |
| 3 | barieră | järnvägsbom | o barieră, două bariere |
| 3 | semnal | tågssignal | un semnal, două semnale |
| 2 | frână de urgență (f) | nödbroms | o frână de urgență, două frâne de urgență |
| 3 | ușă glisantă | skjutdörr | o ușă glisantă, două uși glisante |
| 3 | toaletă ecologică | vakuumtoalett | o toaletă ecologică, două toalete ecologice |
| 2 | priză (f) | eluttag | o priză, două prize |
| 2 | aer condiționat | luftkonditionering |  |
| 2 | conexiune la internet (f) | wifi-anslutning | o conexiune la internet, două conexiuni la internet |
| 3 | cărucior de bagaje | bagagekärra | un cărucior de bagaje, două cărucioare de bagaje |
| 2 | navetist | pendlare | un navetist, doi navetiști |
| 2 | navetă | pendling | o navetă, două navete |
| 3 | viteză (f) | hastighet | o viteză, două viteze |
| 3 | pachet de bilete | häfte med biljetter | un pachet de bilete, două pachete de bilete |
| 2 | bilet de grup | gruppbiljett | un bilet de grup, două bilete de grup |
| 2 | bilet pentru elevi | studentbiljett | un bilet pentru elevi, două bilete pentru elevi |
| 2 | bilet de pensionar | pensionärsbiljett | un bilet de pensionar, două bilete de pensionari |
| 3 | supliment de viteză (f) | snabbtågstillägg | un supliment de viteză, două suplimente de viteză |
| 2 | supliment de pat | sovvagnstillägg | un supliment de pat, două suplimente de pat |
| 2 | pat | brits | un pat, două paturi |
| 3 | avertisment | varning | un avertisment, două avertismente |
| 2 | control | biljettkontroll | un control, două controale |
| 2 | traseu | resrutt | un traseu, două trasee |
| 3 | distanță | avstånd | o distanță, două distanțe |
| 2 | a coborî la timp | att hinna av i tid | cobor la timp · coboară la timp · am coborât la timp · să coboare la timp |
| 2 | a composta | att klippa biljetten | compostez · compostează · am compostat · să composteze |
| 1 | a prezenta | att visa upp biljetten | prezint · prezintă · am prezentat · să prezinte |
| 2 | a anula | att avboka | anulez · anulează · am anulat · să anuleze |
| 2 | a confirma | att bekräfta bokning | confirm · confirmă · am confirmat · să confirme |
| 1 | a întârzia | att bli försenad | întârzii · întârzie · am întârziat · să întârzie |
| 1 | a opri | att stanna | opresc · oprește · am oprit · să oprească |
| 3 | a accelera | att öka farten | accelerez · accelerează · am accelerat · să accelereze |
| 3 | a frâna | att bromsa | frânez · frânează · am frânat · să frâneze |
| 1 | Cât costă un bilet până la...? | vad kostar en biljett till...? |  |
| 1 | La ce oră pleacă trenul? | vilken tid avgår tåget? |  |
| 1 | De la ce peron pleacă trenul? | från vilken perrong avgår tåget? |  |
| 1 | Este acest loc ocupat? | är den här platsen upptagen? |  |
| 1 | Este acest loc liber? | är den här platsen ledig? |  |
| 1 | Trenul are întârziere? | är tåget försenat? |  |
| 1 | Trebuie să schimb trenul? | måste jag byta tåg? |  |
| 1 | Unde este casa de bilete? | var ligger biljettkassan? |  |
| 1 | Aș dori un bilet dus-întors vă rog. | jag skulle vilja ha en tur-och-returbiljett tack. |  |
| 1 | Vă rog să prezentați biletele! | var god visa biljetterna! |  |
| 1 | Următoarea stație este... | nästa station är... |  |
| 1 | Atenție la închiderea ușilor! | se upp för dörrarna! |  |
| 1 | Trenul sosește la linia doi. | tåget ankommer till spår två. |  |
| 1 | Am pierdut legătura. | jag missade anslutningståget. |  |
| 1 | Pot cumpăra bilet în tren? | kan jag köpa biljett på tåget? |  |
| 2 | Biletul este valabil pe această rută? | gäller biljetten på denna rutt? |  |
| 2 | Aveți o reducere pentru studenți? | har ni studentrabatt? |  |
| 2 | Locul dumneavoastră este în alt vagon. | er plats är i en annan vagn. |  |
| 1 | Câte minute are întârziere? | hur många minuter är tåget försenat? |  |
| 1 | Trenul a fost anulat. | tåget har blivit inställt. |  |
| 2 | Mecanicul trenului | lokförare | un mecanic de tren, doi mecanici de tren |
| 2 | șef de tren | tågmästare | un șef de tren, doi șefi de tren |
| 3 | tunel | järnvägstunnel | un tunel, două tuneluri |
| 3 | viaduct | järnvägsbro | un viaduct, două viaducte |
| 3 | macaz | spårväxel | un macaz, două macazuri |
| 3 | depou | tågdepå | un depou, două depouri |
| 3 | rețea feroviară (f) | järnvägsnät | o rețea feroviară, două rețele feroviare |
| 2 | pasaj subteran | gångtunnel | un pasaj subteran, două pasaje subterane |
| 3 | pasarelă | gångbro över spår | o pasarelă, două pasarele |
| 3 | scară rulantă | rulltrappa | o scară rulantă, două scări rulante |
| 3 | ascensor | hiss | un ascensor, două ascensoare |
| 3 | cărucior pentru persoane cu handicap | rullstol | un cărucior pentru persoane cu handicap, două cărucioare pentru persoane cu handicap |
| 3 | rampă de acces | handikappramp | o rampă de acces, două rampe de acces |
| 2 | valabilitate a biletului (f) | biljettgiltighet | o valabilitate a biletului, două valabilități ale biletului |
| 2 | cod QR | QR-kod på biljett | un cod QR, două coduri QR |
| 2 | taxă de rezervare (f) | platsbokningsavgift | o taxă de rezervare, două taxe de rezervare |
| 2 | rambursare (f) | återbetalning av biljett | o rambursare, două rambursări |
| 2 | despăgubire (f) | ersättning för försening | o despăgubire, două despăgubiri |
| 3 | reclamație (f) | klagomål | o reclamație, două reclamații |

### M855b83 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | tågstation | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | peron | plattform | un peron, două peroane |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | compartiment | kupé | un compartiment, două compartimente |
| 1 | loc | plats | un loc, două locuri |
| 1 | rezervare (f) | bokning | o rezervare, două rezervări |
| 1 | revizor | biljettkontrollant | un revizor, doi revizori |
| 1 | ghișeu | biljettlucka | un ghișeu, două ghișee |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | plecare (f) | avgång | o plecare, două plecări |
| 1 | sosire (f) | ankomst | o sosire, două sosiri |
| 1 | întârziere (f) | försening | o întârziere, două întârzieri |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 1 | valiză | resväska | o valiză, două valize |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 1 | bilet dus | enkelbiljett |  |
| 1 | bilet dus-întors | returbiljett |  |
| 1 | preț | pris | un preț, două prețuri |
| 1 | călător | resenär | un călător, doi călători |
| 1 | legătură | anslutning | o legătură, două legături |
| 1 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 1 | linie (f) | spår, linje | o linie, două linii |
| 1 | călătorie (f) | resa | o călătorie, două călătorii |
| 1 | oră | timme, klockslag | o oră, două ore |
| 1 | a călători | att resa | călătoresc · călătorește · am călătorit · să călătorească |
| 1 | a pleca | att avgå, att åka iväg | plec · pleacă · am plecat · să plece |
| 1 | a ajunge | att anlända, att komma fram | ajung · ajunge · am ajuns · să ajungă |
| 1 | a cumpăra | att köpa | cumpăr · cumpără · am cumpărat · să cumpere |
| 1 | a rezerva | att boka | rezerv · rezervă · am rezervat · să rezerve |
| 1 | a schimba | att byta | schimb · schimbă · am schimbat · să schimbe |
| 1 | a coborî | att kliva av | cobor · coboară · am coborât · să coboare |
| 1 | a urca | att kliva på | urc · urcă · am urcat · să urce |
| 1 | a valida | att validera, att stämpla | validez · validează · am validat · să valideze |
| 1 | a întârzia | att vara försenad | întârzii · întârzie · am întârziat · să întârzie |
| 1 | a aștepta | att vänta | aștept · așteaptă · am așteptat · să aștepte |
| 1 | a plăti | att betala | plătesc · plătește · am plătit · să plătească |
| 1 | a pierde | att missa, att tappa bort | pierd · pierde · am pierdut · să piardă |
| 1 | a merge | att åka, att gå | merg · merge · am mers · să meargă |
| 1 | Un bilet pentru ..., vă rog. | En biljett till ..., tack. |  |
| 1 | La ce oră pleacă trenul? | Vilken tid avgår tåget? |  |
| 1 | La ce oră ajunge trenul? | Vilken tid kommer tåget fram? |  |
| 1 | De pe ce peron pleacă trenul? | Från vilken plattform avgår tåget? |  |
| 1 | Cât costă biletul? | Hur mycket kostar biljetten? |  |
| 1 | Trenul are întârziere. | Tåget är försenat. |  |
| 1 | Unde pot cumpăra bilete? | Var kan jag köpa biljetter? |  |
| 1 | Trebuie să schimb trenul? | Måste jag byta tåg? |  |
| 1 | stație (f) | station, hållplats | o stație, două stații |
| 1 | destinație (f) | destination | o destinație, două destinații |
| 1 | valabil | giltig |  |
| 1 | loc rezervat | reserverad plats |  |
| 1 | loc la geam | fönsterplats |  |
| 1 | ieșire (f) | utgång | o ieșire, două ieșiri |
| 1 | intrare (f) | ingång | o intrare, două intrări |
| 1 | toaletă | toalett | o toaletă, două toalete |
| 1 | anunț | utrop, meddelande | un anunț, două anunțuri |
| 1 | panou de afișaj | informationstavla, avgångstavla | un panou de afișaj, două panouri de afișaj |
| 1 | a costa | att kosta | cost · costă · a costat · să coste |
| 1 | a anula | att ställa in, att avboka | anulez · anulează · am anulat · să anuleze |
| 1 | a se opri | att stanna | mă opresc · se oprește · m-am oprit · să se oprească |
| 1 | pasager | passagerare | un pasager, doi pasageri |
| 1 | următorul tren | nästa tåg |  |
| 1 | Este liber locul acesta? | Är den här platsen ledig? |  |
| 1 | Biletul, vă rog. | Biljetten, tack. |  |
| 1 | Trenul a fost anulat. | Tåget har ställts in. |  |
| 1 | sală de așteptare | väntsal | o sală de așteptare, două săli de așteptare |
| 1 | anulare (f) | avbokning, inställande | o anulare, două anulări |
| 1 | Ce stație urmează? | Vilken station kommer härnäst? |  |
| 1 | cale ferată | järnväg | o cale ferată, două căi ferate |
| 2 | reducere (f) | rabatt | o reducere, două reduceri |
| 2 | abonament | periodkort | un abonament, două abonamente |
| 2 | plată | betalning | o plată, două plăți |
| 2 | pașaport | pass | un pașaport, două pașapoarte |
| 2 | carte de identitate (f) | id-kort | o carte de identitate, două cărți de identitate |
| 2 | bilet electronic | e-biljett | un bilet electronic, două bilete electronice |
| 2 | birou de informații | informationsdisk | un birou de informații, două birouri de informații |
| 2 | culoar | gång, korridor | un culoar, două culoare |
| 2 | loc la culoar | gångplats |  |
| 2 | complet | fullbokad, full |  |
| 2 | supliment | tillägg | un supliment, două suplimente |
| 2 | rambursare (f) | återbetalning | o rambursare, două rambursări |
| 2 | amendă | böter | o amendă, două amenzi |
| 2 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 2 | cușetă | liggplats, liggvagn | o cușetă, două cușete |
| 2 | vagon restaurant | restaurangvagn | un vagon restaurant, două vagoane restaurant |
| 2 | tren de noapte | nattåg | un tren de noapte, două trenuri de noapte |
| 2 | tren personal | lokaltåg | un tren personal, două trenuri personale |
| 2 | tren rapid | snabbtåg | un tren rapid, două trenuri rapide |
| 2 | metrou | tunnelbana | un metrou, două metrouri |
| 2 | durată | restid, varaktighet | o durată, două durate |
| 2 | minut | minut | un minut, două minute |
| 2 | dată | datum | o dată, două date |
| 2 | tarif | taxa, prisklass | un tarif, două tarife |
| 2 | adult | vuxen | un adult, doi adulți |
| 2 | copil | barn | un copil, doi copii |
| 2 | direct | direkt |  |
| 2 | capăt de linie | ändstation | un capăt de linie, două capete de linie |
| 2 | CFR | Rumäniens statliga järnväg |  |
| 2 | a sosi | att anlända | sosesc · sosește · am sosit · să sosească |
| 2 | a rata | att missa | ratez · ratează · am ratat · să rateze |
| 2 | a verifica | att kontrollera | verific · verifică · am verificat · să verifice |
| 2 | a circula | att gå, att trafikera | circul · circulă · am circulat · să circule |
| 2 | geantă | väska | o geantă, două genți |
| 2 | ultimul tren | sista tåget |  |
| 2 | Călătorie plăcută! | Trevlig resa! |  |
| 2 | Unde este peronul trei? | Var är plattform tre? |  |
| 2 | Mi-am pierdut biletul. | Jag har tappat bort min biljett. |  |
| 2 | loc ocupat | upptagen plats |  |
| 2 | ascensor | hiss | un ascensor, două ascensoare |
| 2 | scară rulantă | rulltrappa | o scară rulantă, două scări rulante |
| 2 | rucsac | ryggsäck | un rucsac, două rucsacuri |
| 2 | chitanță | kvitto | o chitanță, două chitanțe |
| 2 | card | kort | un card, două carduri |
| 2 | aplicație (f) | app | o aplicație, două aplicații |
| 2 | cod QR | QR-kod | un cod QR, două coduri QR |
| 2 | Nu am bilet. | Jag har ingen biljett. |  |
| 3 | autobuz | buss | un autobuz, două autobuze |
| 3 | tramvai | spårvagn | un tramvai, două tramvaie |
| 3 | taxi | taxi | un taxi, două taxiuri |
| 3 | aeroport | flygplats | un aeroport, două aeroporturi |
| 3 | consignă | bagageinlämning | o consignă, două consigne |
| 3 | hartă | karta | o hartă, două hărți |
| 3 | tunel | tunnel | un tunel, două tunele |
| 3 | șină | räls | o șină, două șine |
| 3 | locomotivă | lok | o locomotivă, două locomotive |
| 3 | mecanic de locomotivă | lokförare | un mecanic de locomotivă, doi mecanici de locomotivă |
| 3 | trecere la nivel (f) | plankorsning | o trecere la nivel, două treceri la nivel |
| 3 | grevă | strejk | o grevă, două greve |
| 3 | fereastră | fönster | o fereastră, două ferestre |
| 3 | masă | bord | o masă, două mese |
| 3 | priză | eluttag | o priză, două prize |
| 3 | bicicletă | cykel | o bicicletă, două biciclete |
| 3 | animal de companie | sällskapsdjur | un animal de companie, două animale de companie |
| 3 | raft pentru bagaje | bagagehylla | un raft pentru bagaje, două rafturi pentru bagaje |
| 3 | pensionar | pensionär | un pensionar, doi pensionari |
| 3 | student | student | un student, doi studenți |
| 3 | legitimație de student (f) | studentlegitimation | o legitimație de student, două legitimații de student |
| 3 | Aveți reducere pentru studenți? | Har ni studentrabatt? |  |
| 3 | Fumatul interzis | Rökning förbjuden |  |
| 3 | orele de vârf | rusningstid |  |
| 3 | a prelungi | att förlänga | prelungesc · prelungește · am prelungit · să prelungească |
| 3 | a imprima | att skriva ut | imprim · imprimă · am imprimat · să imprime |
| 3 | a se grăbi | att skynda sig | mă grăbesc · se grăbește · m-am grăbit · să se grăbească |
| 3 | gratuit | gratis |  |
| 3 | ieftin | billig |  |
| 3 | scump | dyr |  |
| 3 | Gara de Nord | Nordstationen (Bukarests centralstation) |  |

### Mbda6c9 — 144 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | station | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | peron | plattform | un peron, două peroane |
| 1 | linie | spår | o linie, două linii |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | oră | tid | o oră, două ore |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | destinație | destination | o destinație, două destinații |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | loc | plats | un loc, două locuri |
| 1 | loc la geam | fönsterplats | un loc la geam, două locuri la geam |
| 2 | loc la culoar | gångplats | un loc la culoar, două locuri la culoar |
| 1 | rezervare | reservation | o rezervare, două rezervări |
| 2 | clasa întâi | första klass |  |
| 2 | clasa a doua | andra klass |  |
| 1 | dus-întors | tur och retur |  |
| 1 | doar dus | enkelresa |  |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 2 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 1 | controlor | konduktör | un controlor, doi controlori |
| 2 | naș | konduktör | un naș, doi nași |
| 1 | călător | resenär | un călător, doi călători |
| 2 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 3 | rucsac | ryggsäck | un rucsac, două rucsacuri |
| 2 | compartiment | kupé | un compartiment, două compartimente |
| 2 | scaun | säte | un scaun, două scaune |
| 3 | ușă | dörr | o ușă, două uși |
| 3 | geam | fönster | un geam, două geamuri |
| 2 | toaletă | toalett | o toaletă, două toalete |
| 3 | restaurant | restaurangvagn | un restaurant, două restaurante |
| 3 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 2 | bilet electronic | e-biljett | un bilet electronic, două bilete electronice |
| 3 | bilet tipărit | pappersbiljett | un bilet tipărit, două bilete tipărite |
| 3 | cod QR | QR-kod | un cod QR, două coduri QR |
| 2 | act de identitate | id-handling | un act de identitate, două acte de identitate |
| 2 | reducere | rabatt | o reducere, două reduceri |
| 3 | elev | elev | un elev, doi elevi |
| 3 | student | student | un student, doi studenți |
| 3 | pensionar | pensionär | un pensionar, doi pensionari |
| 2 | copil | barn | un copil, doi copii |
| 2 | adult | vuxen | un adult, doi adulți |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 2 | anulare | inställelse | o anulare, două anulări |
| 2 | schimbare | byte | o schimbare, două schimbări |
| 1 | legătură | anslutning | o legătură, două legături |
| 2 | tren direct | direkttåg | un tren direct, două trenuri directe |
| 3 | tren regional | regionaltåg | un tren regional, două trenuri regionale |
| 3 | tren intercity | intercitytåg | un tren intercity, două trenuri intercity |
| 3 | tren de noapte | nattåg | un tren de noapte, două trenuri de noapte |
| 3 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 3 | cușetă | liggplats | o cușetă, două cușete |
| 2 | număr de tren | tågnummer | un număr de tren, două numere de tren |
| 3 | capăt de linie | slutstation | un capăt de linie, două capete de linie |
| 2 | stație | hållplats | o stație, două stații |
| 2 | oprire | stopp | o oprire, două opriri |
| 2 | ieșire | utgång | o ieșire, două ieșiri |
| 3 | intrare | ingång | o intrare, două intrări |
| 2 | ghișeu | lucka | un ghișeu, două ghișee |
| 2 | tarif | pris | un tarif, două tarife |
| 3 | suprataxă | tilläggsavgift | o suprataxă, două suprataxe |
| 3 | rest | växel | un rest, două resturi |
| 2 | card | kort | un card, două carduri |
| 3 | numerar | kontanter | un numerar, două numeraruri |
| 1 | a merge | åka | merg · merge · a mers · să meargă |
| 1 | a pleca | avgå | plec · pleacă · a plecat · să plece |
| 1 | a sosi | ankomma | sosesc · sosește · a sosit · să sosească |
| 1 | a ajunge | komma fram | ajung · ajunge · a ajuns · să ajungă |
| 1 | a întârzia | bli försenad | întârzii · întârzie · a întârziat · să întârzie |
| 1 | a pierde | missa | pierd · pierde · a pierdut · să piardă |
| 1 | a schimba | byta | schimb · schimbă · a schimbat · să schimbe |
| 1 | a coborî | stiga av | cobor · coboară · a coborât · să coboare |
| 1 | a urca | stiga på | urc · urcă · a urcat · să urce |
| 1 | a rezerva | reservera | rezerv · rezervă · a rezervat · să rezerve |
| 1 | a cumpăra | köpa | cumpăr · cumpără · a cumpărat · să cumpere |
| 2 | a valida | validera | validez · validează · a validat · să valideze |
| 2 | a controla | kontrollera | controlez · controlează · a controlat · să controleze |
| 2 | a arăta | visa upp | arăt · arată · a arătat · să arate |
| 1 | a aștepta | vänta | aștept · așteaptă · a așteptat · să aștepte |
| 2 | a întreba | fråga | întreb · întreabă · a întrebat · să întrebe |
| 3 | a răspunde | svara | răspund · răspunde · a răspuns · să răspundă |
| 2 | a anula | ställa in | anulez · anulează · a anulat · să anuleze |
| 2 | a confirma | bekräfta | confirm · confirmă · a confirmat · să confirme |
| 2 | a verifica | kontrollera | verific · verifică · a verificat · să verifice |
| 2 | a căuta | leta efter | caut · caută · a căutat · să caute |
| 3 | a imprima | skriva ut | imprim · imprimă · a imprimat · să imprime |
| 2 | a costa | kosta | cost · costă · a costat · să coste |
| 1 | a plăti | betala | plătesc · plătește · a plătit · să plătească |
| 3 | a deschide | öppna | deschid · deschide · a deschis · să deschidă |
| 3 | a închide | stänga | închid · închide · a închis · să închidă |
| 1 | unde este gara? | var är stationen? |  |
| 1 | de unde pleacă trenul? | varifrån avgår tåget? |  |
| 1 | la ce oră pleacă? | vilken tid avgår det? |  |
| 1 | la ce linie? | vilket spår? |  |
| 1 | cât costă? | vad kostar det? |  |
| 1 | vreau un bilet | jag vill ha en biljett |  |
| 1 | un bilet până la... | en biljett till... |  |
| 2 | dus sau dus-întors? | enkel eller tur och retur? |  |
| 2 | cu rezervare | med reservation |  |
| 2 | fără rezervare | utan reservation |  |
| 1 | mai sunt locuri? | finns det platser kvar? |  |
| 1 | am o rezervare | jag har en reservation |  |
| 2 | biletul meu | min biljett |  |
| 1 | unde este locul meu? | var är min plats? |  |
| 2 | acesta este locul meu | det här är min plats |  |
| 1 | trenul are întârziere | tåget är försenat |  |
| 2 | cu câtă întârziere? | hur mycket försening? |  |
| 2 | trenul a fost anulat | tåget har ställts in |  |
| 1 | pierd legătura | jag missar anslutningen |  |
| 1 | unde schimb? | var byter jag? |  |
| 1 | când ajunge? | när kommer det fram? |  |
| 1 | acest tren oprește la...? | stannar det här tåget i...? |  |
| 1 | trebuie să schimb trenul? | måste jag byta tåg? |  |
| 2 | vreau să cobor la... | jag vill stiga av i... |  |
| 2 | anunț | utrop | un anunț, două anunțuri |
| 3 | difuzor | högtalare | un difuzor, două difuzoare |
| 2 | panou de plecări | avgångstavla | un panou de plecări, două panouri de plecări |
| 3 | panou de sosiri | ankomsttavla | un panou de sosiri, două panouri de sosiri |
| 3 | întrebare | fråga | o întrebare, două întrebări |
| 3 | răspuns | svar | un răspuns, două răspunsuri |
| 2 | ajutor | hjälp | un ajutor, două ajutoare |
| 3 | hartă | karta | o hartă, două hărți |
| 3 | aplicație | app | o aplicație, două aplicații |
| 3 | telefon | telefon | un telefon, două telefoane |
| 3 | încărcător | laddare | un încărcător, două încărcătoare |
| 3 | priză | eluttag | o priză, două prize |
| 3 | Wi-Fi | wifi |  |
| 3 | bancă | bänk | o bancă, două bănci |
| 2 | sală de așteptare | vänthall | o sală de așteptare, două săli de așteptare |
| 2 | birou de informații | informationsdisk | un birou de informații, două birouri de informații |
| 2 | informație | information | o informație, două informații |
| 3 | orar online | tidtabell online | un orar online, două orare online |
| 1 | călătorie | resa | o călătorie, două călătorii |
| 3 | drum | resa | un drum, două drumuri |
| 3 | vacanță | semester | o vacanță, două vacanțe |
| 3 | navetă | pendling | o navetă, două navete |
| 2 | abonament | periodkort | un abonament, două abonamente |
| 2 | bilet de întoarcere | returbiljett | un bilet de întoarcere, două bilete de întoarcere |
| 2 | bilet dus | enkelbiljett | un bilet dus, două bilete dus |
| 2 | loc rezervat | reserverad plats | un loc rezervat, două locuri rezervate |
| 2 | fără schimb | utan byte |  |
| 2 | cu schimb | med byte |  |

### M05df09 — 100 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | station | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | peron | perrong | un peron, două peroane |
| 1 | călătorie | resa | o călătorie, două călătorii |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | destinație | destination | o destinație, două destinații |
| 1 | stație | station | o stație, două stații |
| 2 | linie | linje | o linie, două linii |
| 2 | rută | rutt | o rută, două rute |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | loc | plats | un loc, două locuri |
| 1 | rezervare | reservation | o rezervare, două rezervări |
| 2 | abonament | periodkort | un abonament, două abonamente |
| 1 | casă de bilete | biljettlucka |  |
| 2 | ghiseu | lucka | un ghiseu, două ghisee |
| 2 | automat | automat | un automat, două automate |
| 1 | controlor | konduktör | un controlor, doi controlori |
| 2 | cățel | kontroll | un control, două controale |
| 2 | clasă | klass | o clasă, două clase |
| 2 | clasa întâi | första klass |  |
| 2 | clasa a doua | andra klass |  |
| 2 | călător | resenär | un călător, doi călători |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 2 | rucsac | ryggsäck | un rucsac, două rucsacuri |
| 2 | loc de fereastră | fönsterplats |  |
| 3 | loc de culoar | gångplats |  |
| 2 | vagon de dormit | sovvagn |  |
| 3 | vagon restaurant | restaurangvagn |  |
| 1 | bilet dus-întors | tur- och returbiljett |  |
| 1 | bilet dus | enkelbiljett |  |
| 2 | întoarcere | retur | o întoarcere, două întoarceri |
| 2 | schimbare | byte | o schimbare, două schimbări |
| 1 | schimb de tren | tågbyte |  |
| 2 | cale ferată | järnväg |  |
| 3 | linie feroviară | järnvägslinje |  |
| 2 | întrebare | fråga | o întrebare, două întrebări |
| 2 | informații | information |  |
| 2 | program | schema | un program, două programe |
| 1 | platformă | plattform | o platformă, două platforme |
| 2 | ieșire | utgång | o ieșire, două ieșiri |
| 2 | intrare | ingång | o intrare, două intrări |
| 1 | a pleca | att åka iväg | plec, pleacă. am plecat. să plece |
| 1 | a sosi | att anlända | sosesc, sosește. am sosit. să sosească |
| 1 | a rezerva | att boka | rezerv, rezervă. am rezervat. să rezerve |
| 1 | a cumpăra | att köpa | cumpăr, cumpără. am cumpărat. să cumpere |
| 2 | a întreba | att fråga | întreb, întreabă. am întrebat. să întrebe |
| 1 | a plăti | att betala | plătesc, plătește. am plătit. să plătească |
| 2 | a valida | att stämpla/validera | validez, validează. am validat. să valideze |
| 1 | a urca | att gå ombord/stiga på | urc, urcă. am urcat. să urce |
| 1 | a coborî | att stiga av | cobor, coboară. am coborât. să coboare |
| 1 | a aștepta | att vänta | aștept, așteaptă. am așteptat. să aștepte |
| 2 | a verifica | att kontrollera | verific, verifică. am verificat. să verifice |
| 2 | a anunța | att annonsera/meddela | anunț, anunță. am anunțat. să anunțe |
| 2 | a circula | att trafikera/gå | circul, circulă. am circulat. să circule |
| 2 | a schimba | att byta | schimb, schimbă. am schimbat. să schimbe |
| 2 | a pierde | att tappa bort | pierd, pierde. am pierdut. să piardă |
| 2 | a ratat | att missa | ratez, ratează. am ratat. să rateze |
| 1 | a întârzia | att bli försenad | întârzii, întârzie. am întârziat. să întârzie |
| 1 | a merge cu trenul | att åka tåg |  |
| 2 | a coborî la următoarea stație | att stiga av vid nästa station |  |
| 2 | cu plecare la | med avgång kl. |  |
| 2 | cu sosire la | med ankomst kl. |  |
| 2 | mai devreme | tidigare |  |
| 2 | mai târziu | senare |  |
| 1 | următorul tren | nästa tåg |  |
| 1 | ultimul tren | sista tåget |  |
| 1 | mersul trenurilor | tågtidtabell |  |
| 2 | bilet electronic | e-biljett |  |
| 2 | cod de rezervare | bokningskod |  |
| 2 | confirmare | bekräftelse | o confirmare, două confirmări |
| 2 | document de identitate | identitetshandling |  |
| 2 | pașaport | pass | un pașaport, două pașapoarte |
| 2 | card bancar | bankkort |  |
| 3 | numerar | kontanter |  |
| 2 | ieftin | billig |  |
| 2 | scump | dyr |  |
| 2 | plin | full |  |
| 2 | liber | ledig |  |
| 2 | ocupat | upptagen/fullbokad |  |
| 3 | înscris | registrerad |  |
| 3 | platformă greșită | fel plattform |  |
| 3 | vagonul corect | rätt vagn |  |
| 2 | scaun | säte/stol | un scaun, două scaune |
| 3 | masă | bord | o masă, două mese |
| 3 | priză | eluttag | o priză, două prize |
| 2 | toaletă | toalett | o toaletă, două toalete |
| 3 | vagonul de bagaje | bagagevagn |  |
| 3 | bancnotă | sedel | o bancnotă, două bancnote |
| 3 | rest | växel | un rest, două resturi |
| 2 | coadă | kö | o coadă, două cozi |
| 3 | aglomerat | trångt/fullt |  |
| 2 | în direcția | mot i riktning mot |  |
| 2 | spre | till/mot |  |
| 3 | dinspre | från riktningen av |  |
| 1 | dus-întors | tur och retur |  |

### Mae224d — 158 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | tågstation | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | peron | perrong | un peron, două peroane |
| 2 | linie | linje | o linie, două linii |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | loc | plats, säte | un loc, două locuri |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | a pleca | åka, avgå | plec, pleacă · am plecat · să plece |
| 1 | a sosi | anlända | sosesc, sosește · am sosit · să sosească |
| 1 | a cumpăra | köpa | cumpăr, cumpără · am cumpărat · să cumpere |
| 1 | a rezerva | reservera, boka | rezerv, rezervă · am rezervat · să rezerve |
| 1 | a călători | resa | călătoresc, călătorește · am călătorit · să călătorească |
| 1 | călătorie | resa | o călătorie, două călătorii |
| 1 | pasager | passagerare | un pasager, doi pasageri |
| 1 | conductor | konduktör | un conductor, doi conductori |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 1 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 1 | bilet dus | enkelbiljett | un bilet dus, două bilete dus |
| 1 | bilet dus-întors | tur och returbiljett | un bilet dus-întors, două bilete dus-întors |
| 1 | clasă | klass | o clasă, două clase |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 2 | reducere | rabatt | o reducere, două reduceri |
| 1 | preț | pris | un preț, două prețuri |
| 1 | a valida | validera, stämpla | validez, validează · am validat · să valideze |
| 1 | a urca | stiga på | urc, urcă · am urcat · să urce |
| 1 | a coborî | stiga av | cobor, coboară · am coborât · să coboare |
| 1 | a schimba | byta | schimb, schimbă · am schimbat · să schimbe |
| 1 | schimbare | byte, ombyte | o schimbare, două schimbări |
| 2 | corespondență | anslutning, byte | o corespondență, două corespondențe |
| 1 | destinație | destination | o destinație, două destinații |
| 1 | stație | station, hållplats | o stație, două stații |
| 2 | oprire | stopp | o oprire, două opriri |
| 2 | a opri | stanna | opresc, oprește · am oprit · să oprească |
| 2 | tren rapid | snälltåg | un tren rapid, două trenuri rapide |
| 2 | tren personal | lokaltåg | un tren personal, două trenuri personale |
| 2 | tren de mare viteză | höghastighetståg |  |
| 2 | tren de noapte | nattåg | un tren de noapte, două trenuri de noapte |
| 2 | tren internațional | internationellt tåg | un tren internațional, două trenuri internaționale |
| 3 | locomotivă | lok, lokomotiv | o locomotivă, două locomotive |
| 2 | șine | räls, spår | o șină, două șine |
| 2 | cale ferată | järnväg | o cale ferată, două căi ferate |
| 1 | compartiment | kupé | un compartiment, două compartimente |
| 2 | cușetă | liggplats, sovplats | o cușetă, două cușete |
| 2 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 2 | vagon restaurant | restaurangvagn | un vagon restaurant, două vagoane restaurant |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 2 | rucsac | ryggsäck | un rucsac, două rucsacuri |
| 2 | geantă | väska | o geantă, două genți |
| 1 | a ajunge | anlända, komma fram | ajung, ajunge · am ajuns · să ajungă |
| 1 | a aștepta | vänta | aștept, așteaptă · am așteptat · să aștepte |
| 2 | sală de așteptare | väntsal | o sală de așteptare, două săli de așteptare |
| 2 | informații | information |  |
| 2 | panou de informații | informationstavla | un panou de informații, două panouri de informații |
| 2 | anunț | meddelande, utrop | un anunț, două anunțuri |
| 2 | a anunța | meddela, ropa ut | anunț, anunță · am anunțat · să anunțe |
| 1 | oră | timme, tid | o oră, două ore |
| 1 | minut | minut | un minut, două minute |
| 1 | la timp | i tid |  |
| 1 | întârziat | försenad |  |
| 1 | anulat | inställd |  |
| 1 | direct | direkt |  |
| 2 | cu escală | med byte |  |
| 2 | a verifica | kontrollera | verific, verifică · am verificat · să verifice |
| 1 | control de bilete | biljettkontroll | un control de bilete, două controale de bilete |
| 2 | abonament | periodkort, abonnemang | un abonament, două abonamente |
| 3 | legitimație de călătorie | reselegitimation | o legitimație de călătorie, două legitimații de călătorie |
| 2 | carte de identitate | id-kort | o carte de identitate, două cărți de identitate |
| 2 | pașaport | pass | un pașaport, două pașapoarte |
| 2 | a arăta | visa | arăt, arată · am arătat · să arate |
| 2 | fereastră | fönster | o fereastră, două ferestre |
| 2 | ușă | dörr | o ușă, două uși |
| 2 | culoar | korridor, gång | un culoar, două culoare |
| 1 | loc la fereastră | fönsterplats | un loc la fereastră, două locuri la fereastră |
| 1 | loc la culoar | gångplats | un loc la culoar, două locuri la culoar |
| 1 | rezervare de loc | platsreservation | o rezervare de loc, două rezervări de loc |
| 1 | loc rezervat | reserverad plats |  |
| 2 | liber | ledig, fri |  |
| 2 | ocupat | upptagen |  |
| 2 | plin | full |  |
| 1 | a merge | gå, åka | merg, merge · am mers · să meargă |
| 1 | a veni | komma | vin, vine · am venit · să vină |
| 1 | a plăti | betala | plătesc, plătește · am plătit · să plătească |
| 2 | numerar | kontanter |  |
| 2 | card bancar | bankkort | un card bancar, două carduri bancare |
| 2 | chitanță | kvitto | o chitanță, două chitanțe |
| 2 | a întreba | fråga | întreb, întreabă · am întrebat · să întrebe |
| 2 | a răspunde | svara | răspund, răspunde · am răspuns · să răspundă |
| 1 | unde | var, vart |  |
| 1 | când | när |  |
| 1 | cât | hur mycket |  |
| 1 | cât costă? | hur mycket kostar det? |  |
| 1 | de unde pleacă trenul? | varifrån avgår tåget? |  |
| 1 | la ce oră pleacă trenul? | vilken tid avgår tåget? |  |
| 1 | la ce oră ajunge trenul? | vilken tid anländer tåget? |  |
| 1 | de la ce peron? | från vilken perrong? |  |
| 1 | trebuie să schimb? | måste jag byta? |  |
| 1 | trenul are întârziere | tåget är försenat |  |
| 1 | un bilet până la… | en biljett till… |  |
| 1 | două bilete, vă rog | två biljetter, tack |  |
| 1 | aș vrea să rezerv un loc | jag skulle vilja reservera en plats |  |
| 1 | este locul liber? | är platsen ledig? |  |
| 1 | următorul tren | nästa tåg |  |
| 1 | ultimul tren | sista tåget |  |
| 2 | primul tren | första tåget |  |
| 2 | a pierde trenul | missa tåget | pierd, pierde · am pierdut · să piardă |
| 2 | a prinde trenul | hinna med tåget | prind, prinde · am prins · să prindă |
| 2 | rută | rutt, linje | o rută, două rute |
| 2 | traseu | sträcka, rutt | un traseu, două trasee |
| 2 | distanță | avstånd | o distanță, două distanțe |
| 2 | durată | restid, varaktighet | o durată, două durate |
| 1 | cât durează călătoria? | hur lång tid tar resan? |  |
| 2 | harta | karta | o hartă, două hărți |
| 2 | ieșire | utgång | o ieșire, două ieșiri |
| 2 | intrare | ingång | o intrare, două intrări |
| 3 | scară | trappa | o scară, două scări |
| 3 | pasaj subteran | gångtunnel | un pasaj subteran, două pasaje subterane |
| 3 | tunel | tunnel | un tunel, două tuneluri |
| 3 | pod | bro | un pod, două poduri |
| 2 | a confirma | bekräfta | confirm, confirmă · am confirmat · să confirme |
| 2 | confirmare | bekräftelse | o confirmare, două confirmări |
| 2 | online | online |  |
| 2 | aplicație | app, applikation | o aplicație, două aplicații |
| 3 | a descărca | ladda ner | descarc, descarcă · am descărcat · să descarce |
| 2 | bilet electronic | e-biljett | un bilet electronic, două bilete electronice |
| 3 | cod QR | QR-kod | un cod QR, două coduri QR |
| 3 | a imprima | skriva ut | imprim, imprimă · am imprimat · să imprime |
| 2 | ghișeu | lucka, disk | un ghișeu, două ghișee |
| 2 | rând | kö | un rând, două rânduri |
| 2 | a sta la rând | stå i kö | stau, stă · am stat · să stea |
| 1 | vă rog | tack, snälla |  |
| 1 | mulțumesc | tack |  |
| 1 | scuzați-mă | ursäkta mig |  |
| 2 | nu înțeleg | jag förstår inte |  |
| 2 | puteți să repetați? | kan ni upprepa? |  |
| 2 | vorbiți engleză? | talar ni engelska? |  |
| 3 | fumător | rökare, rökkupé | un fumător, doi fumători |
| 3 | nefumător | icke-rökare | un nefumător, doi nefumători |
| 3 | aer condiționat | luftkonditionering |  |
| 3 | priză | eluttag | o priză, două prize |
| 3 | Wi-Fi | Wi-Fi |  |
| 2 | toaletă | toalett | o toaletă, două toalete |
| 2 | apă | vatten | o apă, două ape |
| 2 | mâncare | mat | o mâncare, două mâncăruri |
| 3 | a mânca | äta | mănânc, mănâncă · am mâncat · să mănânce |
| 3 | a bea | dricka | beau, bea · am băut · să bea |
| 3 | cafea | kaffe | o cafea, două cafele |
| 3 | nord | norr |  |
| 3 | sud | söder |  |
| 3 | est | öster |  |
| 3 | vest | väster |  |
| 2 | număr | nummer | un număr, două numere |
| 1 | numărul trenului | tågnumret |  |

### M2a5587 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | gară | järnvägsstation | o gară, două gări |
| 1 | peron | perrong | un peron, două peroane |
| 1 | linie (f) | spår | o linie, două linii |
| 1 | pasager | passagerare | un pasager, doi pasageri |
| 1 | călător | resenär | un călător, doi călători |
| 1 | loc | plats | un loc, două locuri |
| 1 | plecare (f) | avgång | o plecare, două plecări |
| 1 | sosire (f) | ankomst | o sosire, două sosiri |
| 1 | casă de bilete | biljettlucka | o casă de bilete, două case de bilete |
| 2 | mersul trenurilor | tidtabell | un mers al trenurilor, două mersuri ale trenurilor |
| 1 | întârziere (f) | försening | o întârziere, două întârzieri |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 1 | controlor | konduktör | un controlor, doi controlori |
| 1 | bilet dus | enkelbiljett | un bilet dus, două bilete dus |
| 1 | bilet dus-întors | tur och retur-biljett | un bilet dus-întors, două bilete dus-întors |
| 2 | clasa întâi (f) | första klass |  |
| 2 | clasa a doua (f) | andra klass |  |
| 1 | rezervare (f) | platsbiljett | o rezervare, două rezervări |
| 1 | fereastră | fönster | o fereastră, două ferestre |
| 1 | culoar | mittgång | un culoar, două culoare |
| 1 | vagon | tågvagn | un vagon, două vagoane |
| 1 | legătură | anslutning | o legătură, două legături |
| 2 | reducere (f) | rabatt | o reducere, două reduceri |
| 1 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 1 | sală de așteptare | väntsal | o sală de așteptare, două săli de așteptare |
| 2 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 2 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 2 | cușetă | liggvagn | o cușetă, două cușete |
| 2 | amendă | böter | o amendă, două amenzi |
| 1 | destinație (f) | destination | o destinație, două destinații |
| 1 | rută | rutt | o rută, două rute |
| 3 | locomotivă | lok | o locomotivă, două locomotive |
| 3 | cale ferată (f) | järnväg | o cale ferată, două căi ferate |
| 2 | abonament | periodbiljett | un abonament, două abonamente |
| 2 | supliment | tillägg | un supliment, două suplimente |
| 2 | tren direct | direkttåg | un tren direct, două trenuri directe |
| 2 | tren regional | regionaltåg | un tren regional, două trenuri regionale |
| 2 | tren accelerat | snabbtåg | un tren accelerat, două trenuri accelerate |
| 2 | tren de noapte | nattåg | un tren de noapte, două trenuri de noapte |
| 2 | ghișeu | lucka | un ghișeu, două ghișee |
| 2 | panou de informații | informationstavla | un panou de informații, două panouri de informații |
| 3 | difuzor | högtalare | un difuzor, două difuzoare |
| 3 | șef de gară | stins | un șef de gară, doi șefi de gară |
| 2 | compartiment | kupé | un compartiment, două compartimente |
| 2 | priză | eluttag | o priză, două prize |
| 1 | toaletă | toalett | o toaletă, două toalete |
| 2 | aer condiționat | luftkonditionering |  |
| 3 | viteză | hastighet | o viteză, două viteze |
| 3 | frână | broms | o frână, două frâne |
| 3 | mecanic de locomotivă | lokförare | un mecanic de locomotivă, doi mecanici de locomotivă |
| 3 | barieră | bom | o barieră, două bariere |
| 3 | trecere la nivel (f) | järnvägsövergång | o trecere la nivel, două treceri la nivel |
| 3 | macaz | spårväxel | un macaz, două macazuri |
| 3 | rețea feroviară (f) | järnvägsnät | o rețea feroviară, două rețele feroviare |
| 3 | rambursare (f) | återbetalning | o rambursare, două rambursări |
| 3 | obiect pierdut | hittegods | un obiect pierdut, două obiecte pierdute |
| 3 | cărucior de bagaje | bagagevagn | un cărucior de bagaje, două cărucioare de bagaje |
| 3 | scară | trappa | o scară, două scări |
| 1 | ușă | dörr | o ușă, două uși |
| 1 | geam | fönster | un geam, două geamuri |
| 3 | măsuță | litet bord | o măsuță, două măsuțe |
| 3 | suport de bagaje | bagagehylla | un suport de bagaje, două suporturi de bagaje |
| 2 | control | kontroll | un control, două controale |
| 2 | legitimație (f) | legitimation | o legitimație, două legitimații |
| 2 | pașaport | pass | un pașaport, două pașapoarte |
| 3 | viză | visum | o viză, două vize |
| 3 | graniță | gräns | o graniță, două granițe |
| 3 | vamă | tull | o vamă, două vămi |
| 3 | vameș | tulltjänsteman | un vameș, doi vameși |
| 2 | stație (f) | station | o stație, două stații |
| 2 | oprire (f) | uppehåll | o oprire, două opriri |
| 3 | rută ocolitoare | omväg | o rută ocolitoare, două rute ocolitoare |
| 2 | distanță | avstånd | o distanță, două distanțe |
| 2 | călătorie (f) | resa | o călătorie, două călătorii |
| 2 | drum | väg | un drum, două drumuri |
| 2 | tarif | biljettpris | un tarif, două tarife |
| 1 | preț | pris | un preț, două prețuri |
| 2 | chitanță | kvitto | o chitanță, două chitanțe |
| 1 | card bancar | bankkort | un card bancar, două carduri bancare |
| 1 | numerar | kontanter |  |
| 2 | rest | växel | un rest, două resturi |
| 2 | monedă | mynt | o monedă, două monede |
| 2 | bancnotă | sedel | o bancnotă, două bancnote |
| 2 | portofel | plånbok | un portofel, două portofele |
| 2 | rucsac | ryggsäck | un rucsac, două rucsacuri |
| 1 | valiză | resväska | o valiză, două valize |
| 1 | geantă | väska | o geantă, două genți |
| 2 | etichetă | etikett | o etichetă, două etichete |
| 1 | a cumpăra | att köpa | cumpăr · cumpără · am cumpărat · să cumpere |
| 1 | a călători | att resa | călătoresc · călătorește · am călătorit · să călătorească |
| 1 | a pleca | att avgå | plec · pleacă · am plecat · să plece |
| 1 | a sosi | att ankomma | sosesc · sosește · am sosit · să sosească |
| 1 | a întârzia | att försena | întârzii · întârzie · am întârziat · să întârzie |
| 1 | a rezerva | att boka | rezerv · rezervă · am rezervat · să rezerve |
| 1 | a valida | att validera | validez · validează · am validat · să valideze |
| 1 | a urca | att stiga på | urc · urcă · am urcat · să urce |
| 1 | a coborî | att stiga av | cobor · coboară · am coborât · să coboare |
| 1 | a schimba | att byta | schimb · schimbă · am schimbat · să schimbe |
| 1 | a aștepta | att vänta | aștept · așteaptă · am așteptat · să aștepte |
| 1 | a pierde | att missa | pierd · pierde · am pierdut · să piardă |
| 1 | a prinde | att hinna med | prind · prinde · am prins · să prindă |
| 1 | a anula | att ställa in | anulez · anulează · am anulat · să anuleze |
| 1 | a arăta | att visa | arăt · arată · am arătat · să arate |
| 1 | a întreba | att fråga | întreb · întreabă · am întrebat · să întrebe |
| 1 | a verifica | att kontrollera | verific · verifică · am verificat · să verifice |
| 1 | a se așeza | att sätta sig | mă așez · se așază · m-am așezat · să se așeze |
| 2 | a dormi | att sova | dorm · doarme · am dormit · să doarmă |
| 2 | a mânca | att äta | mănânc · mănâncă · am mâncat · să mănânce |
| 2 | a bea | att dricka | beau · bea · am băut · să bea |
| 2 | a citi | att läsa | citesc · citește · am citit · să citească |
| 2 | a asculta | att lyssna | ascult · ascultă · am ascultat · să asculte |
| 2 | a deranja | att störa | deranjez · deranjează · am deranjat · să deranjeze |
| 3 | a fuma | att röka | fumez · fumează · am fumat · să fumeze |
| 1 | valabil | giltig |  |
| 1 | expirat | utgången |  |
| 1 | ocupat | upptagen |  |
| 1 | liber | ledig |  |
| 1 | devreme | tidig |  |
| 1 | târziu | sen |  |
| 1 | la timp | i tid |  |
| 2 | aglomerat | trång |  |
| 2 | gol | tom |  |
| 2 | confortabil | bekväm |  |
| 1 | scump | dyr |  |
| 1 | ieftin | billig |  |
| 2 | rapid | snabb |  |
| 2 | lent | långsam |  |
| 3 | periculos | farlig |  |
| 1 | Cât costă un bilet? | Hur mycket kostar en biljett? |  |
| 1 | Un bilet până la București, vă rog. | En biljett till Bukarest, tack. |  |
| 1 | De la ce linie pleacă trenul? | Från vilket spår avgår tåget? |  |
| 1 | Trenul are întârziere. | Tåget är försenat. |  |
| 1 | Acest loc este ocupat? | Är den här platsen upptagen? |  |
| 1 | Unde trebuie să schimb trenul? | Var måste jag byta tåg? |  |
| 1 | Biletele la control, vă rog. | Biljetterna, tack. |  |
| 1 | Am pierdut trenul. | Jag missade tåget. |  |
| 1 | La ce oră ajungem? | Vilken tid är vi framme? |  |
| 2 | Există vagon-restaurant? | Finns det en restaurangvagn? |  |
| 2 | Vreau să anulez biletul. | Jag vill avboka biljetten. |  |
| 1 | Pot să cumpăr bilet în tren? | Kan jag köpa biljett på tåget? |  |
| 1 | Unde este toaleta? | Var är toaletten? |  |
| 2 | Vă rog să mă ajutați cu bagajul. | Snälla hjälp mig med bagaget. |  |
| 1 | Cât durează călătoria? | Hur lång tid tar resan? |  |
| 1 | Trenul pleacă imediat. | Tåget avgår strax. |  |
| 2 | Atenție la uși! | Se upp för dörrarna! |  |
| 2 | Vă doresc o călătorie plăcută! | Jag önskar er en trevlig resa! |  |
| 1 | Am o rezervare pentru acest loc. | Jag har en reservation för den här platsen. |  |
| 1 | Unde este casa de bilete? | Var är biljettluckan? |  |

### M3affbb — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | tågstation | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | a cumpăra | att köpa | cumpăr · cumpără · am cumpărat · să cumpere |
| 1 | casă de bilete | biljettkassa | o casă, două case |
| 1 | peron | perrong | un peron, două peroane |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | oră | timme/tid | o oră, două ore |
| 1 | a pleca | att avgå/åka | plec · pleacă · am plecat · să plece |
| 1 | a sosi | att ankomma | sosesc · sosește · am sosit · să sosească |
| 1 | bilet dus-întors | tur och retur-biljett | un bilet, două bilete |
| 1 | bilet dus | enkelbiljett | un bilet, două bilete |
| 2 | clasa întâi | första klass |  |
| 2 | clasa a doua | andra klass |  |
| 1 | loc | plats/säte | un loc, două locuri |
| 1 | rezervare | bokning | o rezervare, două rezervări |
| 1 | a rezerva | att boka | rezerv · rezervă · am rezervat · să rezerve |
| 2 | tren rapid | snabbtåg | un tren, două trenuri |
| 2 | tren personal | lokaltåg | un tren, două trenuri |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | a întârzia | att vara försenad | întârzii · întârzie · am întârziat · să întârzie |
| 1 | mersul trenurilor | tidtabell |  |
| 2 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 1 | controlor | konduktör | un controlor, doi controlori |
| 1 | a arăta | att visa | arăt · arată · am arătat · să arate |
| 2 | bilet de reducere | rabattbiljett | un bilet, două bilete |
| 3 | student | student | un student, doi studenți |
| 2 | copil | barn | un copil, doi copii |
| 2 | a valida | att stämpla/validera | validez · validează · am validat · să valideze |
| 2 | automat de bilete | biljettautomat | un automat, două automate |
| 1 | linie | spår | o linie, două linii |
| 1 | a schimba | att byta (tåg) | schimb · schimbă · am schimbat · să schimbe |
| 2 | conexiune | anslutning | o conexiune, două conexiuni |
| 2 | vagon | vagn | un vagon, două vagoane |
| 3 | vagon de dormit | sovvagn | un vagon, două vagoane |
| 3 | vagon restaurant | restaurangvagn | un vagon, două vagoane |
| 1 | a urca | att gå ombord | urc · urcă · am urcat · să urce |
| 1 | a coborî | att gå av | cobor · coboară · am coborât · să coboare |
| 1 | stație | station/hållplats | o stație, două stații |
| 1 | destinație | destination | o destinație, două destinații |
| 1 | preț | pris | un preț, două prețuri |
| 1 | cât costă | hur mycket kostar det |  |
| 1 | a plăti | att betala | plătesc · plătește · am plătit · să plătească |
| 2 | card | bankkort | un card, două carduri |
| 2 | numerar | kontanter |  |
| 2 | a pierde | att missa (tåget) | pierd · pierde · am pierdut · să piardă |
| 1 | următorul | nästa |  |
| 2 | direct | direkt |  |
| 1 | a aștepta | att vänta | aștept · așteaptă · am așteptat · să aștepte |
| 2 | sală de așteptare | väntsal | o sală, două săli |
| 1 | informații | information | o informație, două informații |
| 2 | birou de informații | informationsdisk | un birou, două birouri |
| 1 | a întreba | att fråga | întreb · întreabă · am întrebat · să întrebe |
| 1 | scuze | ursäkta |  |
| 1 | vă rog | tack/snälla |  |
| 1 | mulțumesc | tack |  |
| 1 | unde | var |  |
| 1 | când | när |  |
| 1 | la ce oră | vid vilken tid |  |
| 3 | bagaj de mână | handbagage | un bagaj, două bagaje |
| 3 | a depune | att lämna in (bagage) | depun · depune · am depus · să depună |
| 3 | a ridica | att hämta (bagage) | ridic · ridică · am ridicat · să ridice |
| 2 | toaletă | toalett | o toaletă, două toalete |
| 3 | restaurant | restaurang | un restaurant, două restaurante |
| 3 | cafenea | café | o cafenea, două cafenele |
| 3 | chioșc | kiosk | un chioșc, două chioșcuri |
| 3 | ziar | tidning | un ziar, două ziare |
| 2 | apă | vatten | o apă, două ape |
| 3 | mâncare | mat | o mâncare, două mâncări |
| 3 | băutură | dryck | o băutură, două băuturi |
| 1 | a călători | att resa | călătoresc · călătorește · am călătorit · să călătorească |
| 1 | călătorie | resa | o călătorie, două călătorii |
| 2 | pasager | passagerare | un pasager, doi pasageri |
| 2 | bilet electronic | e-biljett | un bilet, două bilete |
| 2 | cod | kod | un cod, două coduri |
| 2 | a scana | att skanna | scanez · scanează · am scanat · să scaneze |
| 2 | a verifica | att kontrollera | verific · verifică · am verificat · să verifice |
| 2 | identitate | legitimation | o identitate, două identități |
| 3 | pașaport | pass | un pașaport, două pașapoarte |
| 3 | buletin | id-kort | un buletin, două buletine |
| 3 | a anula | att avboka/annullera | anulez · anulează · am anulat · să anuleze |
| 3 | a schimba data | att ändra datum |  |
| 2 | a întârzia | att bli försenad | întârzii · întârzie · am întârziat · să întârzie |
| 2 | pe drum | på väg |  |
| 1 | a ajunge | att anlända/komma fram | ajung · ajunge · am ajuns · să ajungă |
| 2 | rapid | snabb |  |
| 3 | încet | långsam |  |
| 3 | fereastră | fönster | o fereastră, două ferestre |
| 3 | culoar | gång (i tåget) | un culoar, două culoare |
| 3 | aer condiționat | luftkonditionering |  |
| 3 | priză | eluttag | o priză, două prize |
| 3 | internet | internet |  |
| 3 | wi-fi | wi-fi |  |
| 2 | a sta | att sitta | stau · stă · am stat · să stea |
| 3 | a dormi | att sova | dorm · doarme · am dormit · să doarmă |
| 3 | a mânca | att äta | mănânc · mănâncă · am mâncat · să mănânce |
| 3 | a bea | att dricka | beau · bea · am băut · să bea |
| 3 | a citi | att läsa | citesc · citește · am citit · să citească |
| 3 | a asculta | att lyssna | ascult · ascultă · am ascultat · să asculte |
| 3 | muzică | musik | o muzică, două muzici |
| 3 | telefon | telefon | un telefon, două telefoane |
| 3 | baterie | batteri | o baterie, două baterii |
| 3 | încărcător | laddare | un încărcător, două încărcătoare |
| 3 | a încărca | att ladda | încarc · încarcă · am încărcat · să încarce |
| 3 | siguranță | säkerhet | o siguranță, două siguranțe |
| 2 | atenție | uppmärksamhet | o atenție, două atenții |
| 3 | pericol | fara | un pericol, două pericole |
| 2 | a ajuta | att hjälpa | ajut · ajută · am ajutat · să ajute |
| 2 | ajutor | hjälp | un ajutor, două ajutoare |
| 3 | poliție | polis | o poliție, două poliții |
| 3 | pierdut | borttappad |  |
| 3 | găsit | hittad |  |
| 3 | obiecte pierdute | hittegods | un obiect, două obiecte |
| 3 | a căuta | att leta | caut · caută · am căutat · să caute |
| 3 | a găsi | att hitta | găsesc · găsește · am găsit · să găsească |
| 3 | a suna | att ringa | sun · sună · am sunat · să sune |
| 2 | a vorbi | att prata | vorbesc · vorbește · am vorbit · să vorbească |
| 2 | engleză | engelska | o engleză, două engleze |
| 2 | română | rumänska | o română, două române |
| 2 | nu înțeleg | jag förstår inte |  |
| 2 | puteți repeta | kan du upprepa |  |
| 2 | încet | långsamt |  |
| 1 | da | ja |  |
| 1 | nu | nej |  |
| 3 | poate | kanske |  |
| 2 | bine | bra |  |
| 3 | rău | dåligt |  |
| 2 | astăzi | idag |  |
| 2 | mâine | imorgon |  |
| 3 | ieri | igår |  |
| 2 | acum | nu |  |
| 2 | mai târziu | senare |  |
| 2 | curând | snart |  |
| 1 | aici | här |  |
| 1 | acolo | där |  |
| 3 | sus | upp |  |
| 3 | jos | ner |  |
| 3 | dreapta | höger |  |
| 3 | stânga | vänster |  |
| 3 | drept înainte | rakt fram |  |
| 2 | aproape | nära |  |
| 2 | departe | långt borta |  |
| 2 | mult | mycket |  |
| 2 | puțin | lite |  |
| 3 | toți | alla |  |
| 3 | nimeni | ingen |  |
| 3 | ceva | något |  |
| 3 | nimic | ingenting |  |

### Ma86ca0 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | station | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | peron | perrong | un peron, două peroane |
| 1 | linie (f) | linje | o linie, două linii |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | compartiment | kupé | un compartiment, două compartimente |
| 1 | loc | plats | un loc, două locuri |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | conductor | tågvärd | un conductor, două conductori |
| 2 | controlor | biljettkontrollant | un controlor, două controlori |
| 2 | casă de bilete | biljettkontor | o casă de bilete, două case de bilete |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 2 | geamantan | koffert | un geamantan, două geamantane |
| 1 | întârziere (f) | försening | o întârziere, două întârzieri |
| 2 | întârziat | försenad |  |
| 1 | bilet dus | enkelbiljett |  |
| 1 | bilet dus-întors | returbiljett |  |
| 1 | tarif | taxa | un tarif, două tarife |
| 2 | preț | pris | un preț, două prețuri |
| 2 | reducere (f) | rabatt | o reducere, două reduceri |
| 3 | reducere pentru studenți | studentrabatt |  |
| 2 | abonament | abonnemang | un abonament, două abonamente |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 1 | a cumpăra | köpa | cumpăr · cumpără · am cumpărat · să cumpere |
| 1 | a valida | validera | validez · validează · am validat · să valideze |
| 1 | a urca | stiga på | urc · urcă · am urcat · să urce |
| 1 | a coborî | stiga av | cobor · coboară · am coborât · să coboare |
| 1 | a pleca | avgå | plec · pleacă · am plecat · să plece |
| 1 | a sosi | anlända | sosesc · sosește · am sosit · să sosească |
| 2 | a rezerva | reservera | rezerv · rezervă · am rezervat · să rezerve |
| 2 | a anula | avboka | anulez · anulează · am anulat · să anuleze |
| 2 | a schimba | byta | schimb · schimbă · am schimbat · să schimbe |
| 1 | a aștepta | vänta | aștept · așteaptă · am așteptat · să aștepte |
| 2 | a verifica | kontrollera | verific · verifică · am verificat · să verifice |
| 2 | a întârzia | bli försenad | întârzii · întârzie · am întârziat · să întârzie |
| 1 | a călători | resa | călătoresc · călătorește · am călătorit · să călătorească |
| 3 | a sta | sitta | stau · stă · am stat · să stea |
| 2 | a pierde | missa | pierd · pierde · am pierdut · să piardă |
| 1 | a ajunge | nå | ajung · ajunge · am ajuns · să ajungă |
| 2 | a porni | starta | pornesc · pornește · am pornit · să pornească |
| 3 | a deschide | öppna | deschid · deschide · am deschis · să deschidă |
| 3 | a închide | stänga | închid · închide · am închis · să închidă |
| 2 | bilet pentru copii | barnbiljett |  |
| 2 | copil | barn | un copil, doi copii |
| 2 | adult | vuxen | un adult, doi adulți |
| 3 | pensionar | pensionär | un pensionar, doi pensionari |
| 3 | student | student | un student, doi studenți |
| 3 | bilet de student | studentbiljett |  |
| 1 | informație (f) | information | o informație, două informații |
| 2 | panou de informare | informationstavla | un panou de informare, două panouri de informare |
| 2 | afișaj | display | un afișaj, două afișaje |
| 2 | anunț | meddelande | un anunț, două anunțuri |
| 3 | anunț sonor | högtalarmeddelande |  |
| 3 | platformă | plattform | o platformă, două platforme |
| 3 | scară rulantă | rulltrappa |  |
| 3 | pasaj subteran | gångtunnel | un pasaj subteran, două pasaje subterane |
| 3 | tunel | tunnel | un tunel, două tuneluri |
| 3 | pod | bro | un pod, două poduri |
| 2 | șină | räl | o șină, două șine |
| 1 | stație | hållplats | o stație, două stații |
| 3 | stație de metrou | tunnelbanestation |  |
| 1 | călător | resenär | un călător, doi călători |
| 1 | pasager | passagerare | un pasager, doi pasageri |
| 3 | cabină | hytt | o cabină, două cabine |
| 2 | scaun | stol | un scaun, două scaune |
| 2 | fereastră | fönster | o fereastră, două ferestre |
| 2 | ușă | dörr | o ușă, două uși |
| 2 | coridor | korridor | un coridor, două coridoare |
| 3 | toaletă | toalett | o toaletă, două toalete |
| 3 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 3 | bufet | bufé | un bufet, două bufete |
| 1 | rezervare (f) | bokning | o rezervare, două rezervări |
| 2 | confirmare (f) | bekräftelse | o confirmare, două confirmări |
| 2 | număr | nummer | un număr, două numere |
| 1 | loc rezervat | reserverad plats |  |
| 2 | locuri libere | lediga platser |  |
| 3 | stație de capăt | ändhållplats |  |
| 2 | direcție (f) | riktning | o direcție, două direcții |
| 1 | destinație (f) | destination | o destinație, două destinații |
| 1 | plecare (f) | avgång | o plecare, două plecări |
| 1 | sosire (f) | ankomst | o sosire, două sosiri |
| 2 | tren direct | direkttåg |  |
| 2 | tren rapid | snabbtåg |  |
| 3 | tren de noapte | nattåg |  |
| 2 | tren regional | regionaltåg |  |
| 2 | tren intercity | intercitytåg |  |
| 2 | a vinde | sälja | vând · vinde · am vândut · să vândă |
| 1 | a plăti | betala | plătesc · plătește · am plătit · să plătească |
| 2 | plată | betalning | o plată, două plăți |
| 3 | monedă | mynt | o monedă, două monede |
| 2 | card | kort | un card, două carduri |
| 3 | bancnotă | sedel | o bancnotă, două bancnote |
| 2 | bilet electronic | elektronisk biljett |  |
| 2 | aplicație | app | o aplicație, două aplicații |
| 2 | cod QR | QR-kod |  |
| 3 | mesaj | meddelande | un mesaj, două mesaje |
| 3 | pagină web | webbsida | o pagină web, două pagini web |
| 2 | a urca în tren | stiga på tåget |  |
| 2 | a coborî din tren | stiga av tåget |  |
| 1 | a prinde trenul | hinna med tåget |  |
| 2 | a rata trenul | missa tåget |  |
| 2 | bilet valabil | giltig biljett |  |
| 3 | a expira | löpa ut | expir · expiră · am expirat · să expire |
| 2 | a controla | kontrollera | controlez · controlează · am controlat · să controleze |
| 2 | amendă | böter | o amendă, două amenzi |
| 3 | a amenda | bötfälla | amendez · amendează · am amendat · să amendeze |
| 3 | penalizare (f) | straffavgift | o penalizare, două penalizări |
| 2 | supliment | tillägg | un supliment, două suplimente |
| 2 | taxă | avgift | o taxă, două taxe |
| 3 | bilet de bagaj | bagageavgift |  |
| 1 | bagaj de mână | handbagage |  |
| 3 | greutate (f) | vikt | o greutate, două greutăți |
| 3 | cântar | våg | un cântar, două cântare |
| 2 | a întreba | fråga | întreb · întreabă · am întrebat · să întrebe |
| 2 | a răspunde | svara | răspund · răspunde · am răspuns · să răspundă |
| 2 | a informa | informera | informez · informează · am informat · să informeze |
| 2 | a ajuta | hjälpa | ajut · ajută · am ajutat · să ajute |
| 3 | ajutor | hjälp | un ajutor, două ajutoare |
| 3 | obiect pierdut | hittegods |  |
| 3 | birou de obiecte pierdute | hittegodsexpedition |  |
| 2 | birou | kontor | un birou, două birouri |
| 3 | pauză | uppehåll | o pauză, două pauze |
| 3 | întrerupere (f) | avbrott | o întrerupere, două întreruperi |
| 3 | lucrări | arbeten |  |
| 3 | grevă | strejk | o grevă, două greve |
| 3 | accident | olycka | un accident, două accidente |
| 2 | urgență (f) | nödsituation | o urgență, două urgențe |
| 1 | ieșire (f) | utgång | o ieșire, două ieșiri |
| 1 | intrare (f) | ingång | o intrare, două intrări |
| 2 | la stânga | till vänster |  |
| 2 | la dreapta | till höger |  |
| 2 | cale ferată | järnväg | o cale ferată, două căi ferate |
| 3 | legătură (f) | förbindelse | o legătură, două legături |
| 3 | conexiune (f) | anslutning | o conexiune, două conexiuni |
| 2 | transfer | byte | un transfer, două transferuri |
| 2 | a schimba trenul | byta tåg |  |
| 2 | ghișeu | lucka | un ghișeu, două ghișee |
| 2 | automat | automat | un automat, două automate |
| 1 | a merge | gå, åka | merg · merge · am mers · să meargă |
| 2 | a veni | komma | vin · vine · am venit · să vină |
| 3 | a alerga | springa | alerg · aleargă · am alergat · să alerge |
| 2 | a lua | ta | iau · ia · am luat · să ia |
| 3 | înapoi | tillbaka |  |
| 3 | înainte | framåt |  |
| 2 | a ieși | gå ut | ies · iese · am ieșit · să iasă |
| 2 | a intra | gå in | intru · intră · am intrat · să intre |
| 2 | tarif redus | reducerad taxa |  |
