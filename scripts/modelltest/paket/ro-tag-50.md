# Bedömning: ro-tag-50

**Tema:** Tågresa och biljetter  
**Språk:** rumänska  
**Beställt antal glosor:** 50  
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

### M05df09 — 52 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gara | station | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | peron | perrong | un peron, două peroane |
| 1 | călătorie | resa | o călătorie, două călătorii |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | destinație | destination | o destinație, două destinații |
| 1 | rezervare | bokning | o rezervare, două rezervări |
| 1 | loc | plats | un loc, două locuri |
| 1 | clasă | klass | o clasă, două clase |
| 2 | vagon | vagn | un vagon, două vagoane |
| 2 | compartiment | kupé | un compartiment, două compartimente |
| 2 | linie | linje | o linie, două linii |
| 2 | rute | rutt | o rută, două rute |
| 2 | stație | hållplats | o stație, două stații |
| 2 | mecanic | lokförare | un mecanic, doi mecanici |
| 2 | controlor | konduktör | un controlor, doi controlori |
| 2 | călător | resenär | un călător, doi călători |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 2 | rucsac | ryggsäck | un rucsac, două rucsacuri |
| 2 | peronul de plecare | avgångsplattform |  |
| 3 | vagon de dormit | sovvagn |  |
| 3 | vagon restaurant | restaurangvagn |  |
| 3 | după-amiază | eftermiddag |  |
| 1 | dus-întors | tur och retur |  |
| 2 | dus | enkel resa |  |
| 2 | dus-întors | tur-och-retur-biljett |  |
| 1 | a pleca | att åka iväg | eu plec, el/ea pleacă · am plecat · să plece |
| 1 | a sosi | att anlända | eu sosesc, el/ea sosește · am sosit · să sosească |
| 2 | a schimba | att byta | eu schimb, el/ea schimbă · am schimbat · să schimbe |
| 1 | a rezerva | att boka | eu rezerv, el/ea rezervă · am rezervat · să rezerve |
| 1 | a cumpăra | att köpa | eu cumpăr, el/ea cumpără · am cumpărat · să cumpere |
| 2 | a valida | att stämpla/validera | eu validez, el/ea validează · am validat · să valideze |
| 2 | a urca | att gå på/stiga på | eu urc, el/ea urcă · am urcat · să urce |
| 2 | a coborî | att stiga av | eu cobor, el/ea coboară · am coborât · să coboare |
| 2 | a verifica | att kontrollera | eu verific, el/ea verifică · am verificat · să verifice |
| 2 | a întreba | att fråga | eu întreb, el/ea întreabă · am întrebat · să întrebe |
| 2 | a anunța | att meddela | eu anunț, el/ea anunță · am anunțat · să anunțe |
| 2 | a întârzia | att vara försenad | eu întârzii, el/ea întârzie · am întârziat · să întârzie |
| 1 | a pierde trenul | att missa tåget |  |
| 1 | a schimba trenul | att byta tåg |  |
| 2 | a avea întârziere | att vara försenad |  |
| 1 | unde este peronul? | var är perrongen? |  |
| 1 | care este următorul tren? | vilket är nästa tåg? |  |
| 1 | un bilet dus-întors | en tur-och-retur-biljett |  |
| 1 | un bilet dus | en enkelbiljett |  |
| 1 | la ce oră pleacă trenul? | vilken tid avgår tåget? |  |
| 1 | cât costă un bilet? | hur mycket kostar en biljett? |  |

### Mf1dedb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | bilet de tren | tågbiljett | un bilet de tren, două bilete de tren |
| 1 | gară | tågstation | o gară, două gări |
| 1 | peron | perrong | un peron, două peroane |
| 1 | linie (f) | spår | o linie, două linii |
| 1 | vagon | tågvagn | un vagon, două vagoane |
| 1 | loc | sittplats | un loc, două locuri |
| 1 | rezervare de loc | platsreservation | o rezervare de loc, două rezervări de loc |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | mersul trenurilor | tidtabell för tåg |  |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | casă de bilete | biljettlucka | o casă de bilete, două case de bilete |
| 1 | conductor | konduktör | un conductor, doi conductori |
| 1 | a urca în tren | stiga på tåget | urc · urcă · a urcat · să urce |
| 1 | a coborî din tren | stiga av tåget | cobor · coboară · a coborât · să coboare |
| 1 | a schimba trenul | byta tåg | schimb · schimbă · a schimbat · să schimbe |
| 1 | bilet dus-întors | tur- och returbiljett | un bilet dus-întors, două bilete dus-întors |
| 1 | bilet doar dus | enkelbiljett | un bilet doar dus, două bilete doar dus |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 2 | valabilitate | giltighet | o valabilitate, două valabilități |
| 2 | a valida | stämpla / validera | validez · validează · a validat · să valideze |
| 2 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 2 | tren direct | direkttåg | un tren direct, două trenuri directe |
| 2 | legătură | anslutning | o legătură, două legături |
| 2 | a pierde trenul | missa tåget | pierd · pierde · a pierdut · să piardă |
| 2 | tren de mare viteză | snabbtåg | un tren de mare viteză, două trenuri de mare viteză |
| 2 | tren regional | regionaltåg | un tren regional, două trenuri regionale |
| 2 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 2 | cușetă | liggvagn | o cușetă, două cușete |
| 2 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 2 | compartiment | kupé | un compartiment, două compartimente |
| 2 | loc la fereastră | fönsterplats | un loc la fereastră, două locuri la fereastră |
| 2 | loc la culoar | gångplats | un loc la culoar, două locuri la culoar |
| 2 | panou de afișaj | informationstavla | un panou de afișaj, două panouri de afișaj |
| 2 | anulare | inställd avgång | o anulare, două anulări |
| 2 | bagaj | bagage | un bagaj, două bagaje |
| 2 | raft pentru bagaje | bagagehylla | un raft pentru bagaje, două rafturi pentru bagaje |
| 3 | sală de așteptare | väntsal | o sală de așteptare, două săli de așteptare |
| 3 | birou de informații | informationsdisk | un birou de informații, două birouri de informații |
| 3 | birou de obiecte pierdute | hittegodsexpedition | un birou de obiecte pierdute, două birouri de obiecte pierdute |
| 3 | dulap de bagaje | förvaringsbox | un dulap de bagaje, două dulapuri de bagaje |
| 3 | supliment de viteză | snabbtågstillägg | un supliment de viteză, două suplimente de viteză |
| 3 | reducere | rabatt | o reducere, două reduceri |
| 3 | abonament | periodbiljett | un abonament, două abonamente |
| 3 | amendă | tilläggsavgift / böter | o amendă, două amenzi |
| 3 | a anunța | utropa / meddela | anunț · anunță · a anunțat · să anunțe |
| 3 | pasarelă | gångbro över spår | o pasarelă, două pasarele |
| 3 | trecere la nivel cu calea ferată | plankorsning | o trecere la nivel cu calea ferată, două treceri la nivel cu calea ferată |

### M855b83 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | gară | tågstation | o gară, două gări |
| 1 | peron | plattform | un peron, două peroane |
| 1 | bilet dus-întors | returbiljett | un bilet dus-întors, două bilete dus-întors |
| 1 | bilet dus | enkelbiljett | un bilet dus, două bilete dus |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 2 | automat de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | plecare (f) | avgång | o plecare, două plecări |
| 1 | sosire (f) | ankomst | o sosire, două sosiri |
| 1 | întârziere (f) | försening | o întârziere, două întârzieri |
| 1 | loc | plats | un loc, două locuri |
| 1 | rezervare (f) | bokning | o rezervare, două rezervări |
| 1 | clasă | klass | o clasă, două clase |
| 2 | vagon | vagn | un vagon, două vagoane |
| 3 | compartiment | kupé | un compartiment, două compartimente |
| 3 | cușetă | liggplats | o cușetă, două cușete |
| 2 | controlor | konduktör | un controlor, doi controlori |
| 2 | călător | resenär | un călător, doi călători |
| 2 | bagaj | bagage | un bagaj, două bagaje |
| 3 | valiză | resväska | o valiză, două valize |
| 2 | reducere (f) | rabatt | o reducere, două reduceri |
| 3 | legitimație (f) | legitimation | o legitimație, două legitimații |
| 3 | abonament | periodkort | un abonament, două abonamente |
| 3 | amendă | böter | o amendă, două amenzi |
| 2 | legătură | anslutning | o legătură, două legături |
| 3 | linie (f) | spår | o linie, două linii |
| 2 | direcție (f) | riktning | o direcție, două direcții |
| 2 | stație (f) | hållplats | o stație, două stații |
| 1 | a călători | resa | călătoresc · călătorește · am călătorit · să călătorească |
| 1 | a cumpăra | köpa | cumpăr · cumpără · am cumpărat · să cumpere |
| 1 | a pleca | avgå | plec · pleacă · am plecat · să plece |
| 1 | a sosi | anlända | sosesc · sosește · am sosit · să sosească |
| 1 | a rezerva | boka | rezerv · rezervă · am rezervat · să rezerve |
| 1 | a schimba trenul | byta tåg | schimb · schimbă · am schimbat · să schimbe |
| 2 | a valida | stämpla | validez · validează · am validat · să valideze |
| 2 | a urca | stiga på | urc · urcă · am urcat · să urce |
| 2 | a coborî | stiga av | cobor · coboară · am coborât · să coboare |
| 2 | a pierde trenul | missa tåget | pierd · pierde · am pierdut · să piardă |
| 3 | a anula | avboka | anulez · anulează · am anulat · să anuleze |
| 1 | Un bilet pentru București, vă rog | En biljett till Bukarest, tack |  |
| 1 | Când pleacă următorul tren? | När går nästa tåg? |  |
| 1 | De la ce peron pleacă trenul? | Från vilken plattform avgår tåget? |  |
| 1 | Cât costă biletul? | Hur mycket kostar biljetten? |  |
| 2 | Este liber locul acesta? | Är den här platsen ledig? |  |
| 2 | Trebuie să schimb trenul? | Måste jag byta tåg? |  |
| 2 | Trenul are întârziere | Tåget är försenat |  |
| 3 | direct | direkt |  |
| 2 | următoarea stație | nästa station |  |

### M3affbb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | tågstation | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | a călători | att resa | călătoresc · călătorește · am călătorit · să călătorească |
| 1 | peron | perrong | un peron, două peroane |
| 1 | casă de bilete | biljettkassa | o casă, două case |
| 1 | oră de plecare | avgångstid | o oră, două ore |
| 1 | oră de sosire | ankomsttid | o oră, două ore |
| 1 | a pleca | att avgå | plec · pleacă · am plecat · să plece |
| 1 | a sosi | att ankomma | sosesc · sosește · am sosit · să sosească |
| 1 | bilet dus-întors | tur och retur-biljett | un bilet, două bilete |
| 1 | bilet dus | enkelbiljett | un bilet, două bilete |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 1 | loc | plats | un loc, două locuri |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | a rezerva | att boka | rezerv · rezervă · am rezervat · să rezerve |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | mersul trenurilor | tidtabell |  |
| 1 | a valida | att stämpla/validera | validez · validează · am validat · să valideze |
| 1 | controlor | konduktör | un controlor, doi controlori |
| 2 | bagaj | bagage | un bagaj, două bagaje |
| 2 | a urca | att gå ombord | urc · urcă · am urcat · să urce |
| 2 | a coborî | att gå av | cobor · coboară · am coborât · să coboare |
| 2 | bilet redus | rabatterad biljett | un bilet, două bilete |
| 2 | student | student | un student, doi studenți |
| 2 | pensionar | pensionär | un pensionar, doi pensionari |
| 2 | automat de bilete | biljettautomat | un automat, două automate |
| 2 | a schimba trenul | att byta tåg | schimb · schimbă · am schimbat · să schimbe |
| 2 | legătură | anslutning | o legătură, două legături |
| 2 | direct | direkt |  |
| 2 | vagon de dormit | sovvagn | un vagon, două vagoane |
| 2 | cușetă | liggvagn | o cușetă, două cușete |
| 2 | vagon restaurant | restaurangvagn | un vagon, două vagoane |
| 2 | a anula | att ställa in | anulez · anulează · am anulat · să anuleze |
| 2 | a pierde trenul | att missa tåget | pierd · pierde · am pierdut · să piardă |
| 3 | peisaj | landskap | un peisaj, două peisaje |
| 3 | a ocupa | att uppta (plats) | ocup · ocupă · am ocupat · să ocupe |
| 3 | liber | ledig |  |
| 3 | rezervat | bokad |  |
| 3 | a verifica | att kontrollera | verific · verifică · am verificat · să verifice |
| 3 | geam | fönster | un geam, două geamuri |
| 3 | coridor | korridor | un coridor, două coridoare |
| 3 | a circula | att trafikera | circul · circulă · am circulat · să circule |
| 3 | bilet online | nätbiljett | un bilet, două bilete |
| 3 | a plăti | att betala | plătesc · plătește · am plătit · să plătească |
| 3 | card bancar | bankkort | un card, două carduri |
| 3 | numerar | kontanter |  |
| 3 | a cere | att be om | cer · cere · am cerut · să ceară |
| 3 | informații | information | o informație, două informații |

### Ma86ca0 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | ett tåg | un tren, două trenuri |
| 1 | bilet (n) | en biljett | un bilet, două bilete |
| 1 | gară | en station | o gară, două gări |
| 1 | peron (n) | en perrong | un peron, două peroane |
| 1 | vagon | en vagn | un vagon, două vagoane |
| 2 | compartiment (n) | ett kupé | un compartiment, două compartimente |
| 1 | loc | en plats (sittplats) | un loc, două locuri |
| 1 | bilet dus-întors | en tur- och returbiljett | un bilet dus-întors, două bilete dus-întors |
| 2 | bilet simplu | en enkelbiljett | un bilet simplu, două bilete simple |
| 1 | tarif | en taxa (biljettpris) | un tarif, două tarife |
| 2 | preț | ett pris | un preț, două prețuri |
| 1 | rezervare (f) | en bokning | o rezervare, două rezervări |
| 3 | chitanță | ett kvitto | o chitanță, două chitanțe |
| 2 | control | en kontroll | un control, două controale |
| 2 | controlor | en biljettkontrollant | un controlor, două controlori |
| 2 | conductor | en konduktör | un conductor, doi conductori |
| 1 | a cumpăra | att köpa | cumpăr · cumpără · a cumpărat · să cumpere |
| 2 | a rezerva | att boka | rezerv · rezervă · a rezervat · să rezerve |
| 2 | a valida | att stämpla (biljett) | validez · validează · a validat · să valideze |
| 1 | a urca | att stiga på | urc · urcă · a urcat · să urce |
| 1 | a coborî | att stiga av | cobor · coboară · a coborât · să coboare |
| 1 | a pleca | att avgå | plec · pleacă · a plecat · să plece |
| 2 | a sosi | att anlända | sosesc · sosește · a sosit · să sosească |
| 2 | a întârzia | att vara försenad | întârzii · întârzie · a întârziat · să întârzie |
| 2 | a schimba | att byta (tåg) | schimb · schimbă · a schimbat · să schimbe |
| 1 | orar | en tidtabell | un orar, două orare |
| 2 | întârziere (f) | en försening | o întârziere, două întârzieri |
| 1 | bagaj (n) | ett bagage | un bagaj, două bagaje |
| 2 | valiză | en resväska | o valiză, două valize |
| 2 | bagaj de mână | ett handbagage | un bagaj de mână, două bagaje de mână |
| 3 | cuşetă | en liggvagnsbädd | o cuşetă, două cuşete |
| 3 | vagon-restaurant | en restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 2 | linie (f) | ett spår (järnvägslinje) | o linie, două linii |
| 3 | sală de așteptare | ett väntrum | o sală de așteptare, două săli de așteptare |
| 1 | casă de bilete | en biljettlucka | o casă de bilete, două case de bilete |
| 2 | reducere (f) | en rabatt | o reducere, două reduceri |
| 3 | tren de noapte | ett nattåg | un tren de noapte, două trenuri de noapte |
| 3 | rapid | ett snabbtåg | un rapid, două rapide |
| 3 | întârziat | försenad |  |
| 2 | liber | ledig |  |
| 2 | ocupat | upptagen |  |
| 1 | Unde este peronul? | Var ligger perrongen? |  |
| 1 | Am nevoie de un bilet. | Jag behöver en biljett. |  |
| 1 | Cât costă un bilet? | Vad kostar en biljett? |  |
| 2 | Pot să văd biletul dumneavoastră? | Kan jag se er biljett? |  |
| 2 | Trenul are întârziere. | Tåget är försenat. |  |
| 1 | Din ce peron pleacă trenul? | Från vilken perrong avgår tåget? |  |
| 2 | Un bilet dus, vă rog. | En enkelbiljett, tack. |  |
| 2 | a anula | att annullera | anulez · anulează · a anulat · să anuleze |
| 2 | clasă | en klass (vagnsklass) | o clasă, două clase |

### Mae224d — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren (n) | tåg | un tren, două trenuri |
| 1 | gară | tågstation | o gară, două gări |
| 1 | bilet (n) | biljett | un bilet, două bilete |
| 1 | peron (n) | perrong | un peron, două peroane |
| 1 | loc (n) | plats, sittplats | un loc, două locuri |
| 1 | vagon (n) | vagn | un vagon, două vagoane |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | orar (n) | tidtabell | un orar, două orare |
| 1 | a pleca | åka, avgå | plec, pleacă · am plecat · să plece |
| 1 | a sosi | anlända | sosesc, sosește · am sosit · să sosească |
| 1 | a cumpăra | köpa | cumpăr, cumpără · am cumpărat · să cumpere |
| 1 | a călători | resa | călătoresc, călătorește · am călătorit · să călătorească |
| 1 | călătorie | resa | o călătorie, două călătorii |
| 1 | dus-întors | tur och retur |  |
| 1 | bilet dus-întors (n) | tur- och returbiljett | un bilet dus-întors, două bilete dus-întors |
| 1 | bilet doar dus (n) | enkelbiljett | un bilet doar dus, două bilete doar dus |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 1 | rezervare | reservation, bokning | o rezervare, două rezervări |
| 1 | a rezerva | reservera, boka | rezerv, rezervă · am rezervat · să rezerve |
| 2 | linie | linje | o linie, două linii |
| 1 | schimbare | byte, ombyte | o schimbare, două schimbări |
| 1 | a schimba | byta | schimb, schimbă · am schimbat · să schimbe |
| 1 | întârziere | försening | o întârziere, două întârzieri |
| 1 | a întârzia | vara försenad | întârzii, întârzie · am întârziat · să întârzie |
| 2 | pasager (m) | passagerare | un pasager, doi pasageri |
| 2 | conductor (m) | konduktör | un conductor, doi conductori |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 2 | automat de bilete (n) | biljettautomat | un automat de bilete, două automate de bilete |
| 2 | bagaj (n) | bagage | un bagaj, două bagaje |
| 2 | valiză | resväska | o valiză, două valize |
| 2 | cușetă | sovplats, liggvagnsplats | o cușetă, două cușete |
| 2 | vagon de dormit (n) | sovvagn | un vagon de dormit, două vagoane de dormit |
| 3 | vagon restaurant (n) | restaurangvagn | un vagon restaurant, două vagoane restaurant |
| 2 | tren rapid (n) | snälltåg | un tren rapid, două trenuri rapide |
| 2 | tren de noapte (n) | nattåg | un tren de noapte, două trenuri de noapte |
| 2 | destinație | destination | o destinație, două destinații |
| 2 | a valida | validera, stämpla | validez, validează · am validat · să valideze |
| 1 | preț (n) | pris | un preț, două prețuri |
| 2 | reducere | rabatt | o reducere, două reduceri |
| 2 | abonament (n) | periodkort, abonnemang | un abonament, două abonamente |
| 1 | a urca | stiga på | urc, urcă · am urcat · să urce |
| 1 | a coborî | stiga av | cobor, coboară · am coborât · să coboare |
| 2 | a aștepta | vänta | aștept, așteaptă · am așteptat · să aștepte |
| 2 | stație | hållplats, station | o stație, două stații |
| 3 | oprire | stopp, uppehåll | o oprire, două opriri |
| 2 | legătură | anslutning, förbindelse | o legătură, două legături |
| 1 | La ce oră pleacă trenul? | Vilken tid avgår tåget? |  |
| 3 | De pe ce peron pleacă trenul? | Från vilken perrong avgår tåget? |  |

### Mbda6c9 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | gară | station | o gară, două gări |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | casă de bilete | biljettkassa | o casă de bilete, două case de bilete |
| 1 | peron (n) | plattform | un peron, două peroane |
| 1 | plecare | avgång | o plecare, două plecări |
| 1 | sosire | ankomst | o sosire, două sosiri |
| 1 | orar | tidtabell | un orar, două orare |
| 1 | loc | plats | un loc, două locuri |
| 1 | rezervare | reservation | o rezervare, două rezervări |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | compartiment | kupé | un compartiment, două compartimente |
| 1 | bilet dus | enkelbiljett | un bilet dus, două bilete dus |
| 1 | bilet dus-întors | tur- och returbiljett | un bilet dus-întors, două bilete dus-întors |
| 1 | clasa întâi | första klass |  |
| 1 | clasa a doua | andra klass |  |
| 1 | a pleca | åka iväg | plec · pleacă · am plecat · să plece |
| 1 | a sosi | ankomma | sosesc · sosește · am sosit · să sosească |
| 1 | a schimba | byta | schimb · schimbă · am schimbat · să schimbe |
| 1 | a întârzia | bli sen | întârzii · întârzie · am întârziat · să întârzie |
| 2 | controlor | konduktör | un controlor, doi controlori |
| 2 | naș | biljettkontrollant | un naș, doi nași |
| 2 | ghișeu | lucka | un ghișeu, două ghișee |
| 2 | automatul de bilete | biljettautomat | un automat de bilete, două automate de bilete |
| 2 | tren direct | direkttåg | un tren direct, două trenuri directe |
| 2 | tren accelerat | snabbtåg | un tren accelerat, două trenuri accelerate |
| 2 | întârziere | försening | o întârziere, două întârzieri |
| 2 | legătură | anslutning | o legătură, două legături |
| 2 | schimbare | byte | o schimbare, două schimbări |
| 2 | destinație | destination | o destinație, două destinații |
| 2 | cale ferată | järnväg | o cale ferată, două căi ferate |
| 2 | linie | spår | o linie, două linii |
| 2 | număr de loc | platsnummer | un număr de loc, două numere de loc |
| 2 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 2 | bagaj | bagage | un bagaj, două bagaje |
| 2 | a urca | stiga på | urc · urcă · am urcat · să urce |
| 2 | a coborî | stiga av | cobor · coboară · am coborât · să coboare |
| 2 | a rezerva | reservera | rezerv · rezervă · am rezervat · să rezerve |
| 2 | a valida | validera | validez · validează · am validat · să valideze |
| 2 | a verifica | kontrollera | verific · verifică · am verificat · să verifice |
| 3 | tren de noapte | nattåg | un tren de noapte, două trenuri de noapte |
| 3 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 3 | reducere | rabatt | o reducere, două reduceri |
| 3 | abonament | periodkort | un abonament, două abonamente |
| 3 | clasă | klass | o clasă, două clase |
| 3 | a pierde trenul | missa tåget | pierd trenul · pierde trenul · am pierdut trenul · să piardă trenul |
| 3 | a cumpăra un bilet | köpa en biljett | cumpăr un bilet · cumpără un bilet · am cumpărat un bilet · să cumpere un bilet |
| 3 | a aștepta | vänta | aștept · așteaptă · am așteptat · să aștepte |
| 3 | dus-întors | tur och retur |  |
| 3 | cu întârziere | försenad |  |

### M2a5587 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | tren | tåg | un tren, două trenuri |
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | gară | tågstation | o gară, două gări |
| 1 | peron | perrong | un peron, două peroane |
| 2 | vagon | tågvagn | un vagon, două vagoane |
| 1 | loc | plats | un loc, două locuri |
| 1 | casă de bilete | biljettlucka | o casă de bilete, două case de bilete |
| 2 | orar | tidtabell | un orar, două orare |
| 1 | plecare (f) | avgång | o plecare, două plecări |
| 1 | sosire (f) | ankomst | o sosire, două sosiri |
| 1 | întârziere (f) | försening | o întârziere, două întârzieri |
| 1 | controlor | konduktör | un controlor, doi controlori |
| 1 | bagaj | bagage | un bagaj, două bagaje |
| 2 | a călători | att resa | călătoresc · călătorește · am călătorit · să călătorească |
| 2 | călător | resenär | un călător, doi călători |
| 1 | a pleca | att avgå | plec · pleacă · am plecat · să plece |
| 1 | a sosi | att anlända | sosesc · sosește · am sosit · să sosească |
| 1 | bilet dus-întors | tur och retur-biljett | un bilet dus-întors, două bilete dus-întors |
| 1 | bilet doar dus | enkelbiljett | un bilet doar dus, două bilete doar dus |
| 2 | clasă | klass | o clasă, două clase |
| 1 | rezervare (f) | platsbiljett | o rezervare, două rezervări |
| 2 | a rezerva | att boka | rezerv · rezervă · am rezervat · să rezerve |
| 2 | ghișeu | lucka | un ghișeu, două ghișee |
| 2 | panou de informații | informationsskylt | un panou de informații, două panouri de informații |
| 1 | a schimba | att byta | schimb · schimbă · am schimbat · să schimbe |
| 2 | legătură | anslutning | o legătură, două legături |
| 2 | tren intercity | snabbtåg | un tren intercity, două trenuri intercity |
| 2 | tren regional | regionaltåg | un tren regional, două trenuri regionale |
| 2 | reducere (f) | rabatt | o reducere, două reduceri |
| 3 | cușetă | liggvagn | o cușetă, două cușete |
| 3 | vagon de dormit | sovvagn | un vagon de dormit, două vagoane de dormit |
| 3 | vagon-restaurant | restaurangvagn | un vagon-restaurant, două vagoane-restaurant |
| 3 | a valida | att validera | validez · validează · am validat · să valideze |
| 3 | a composta | att stämpla | compostez · compostează · am compostat · să composteze |
| 3 | compartiment | kupé | un compartiment, două compartimente |
| 3 | culoar | mittgång | un culoar, două culoare |
| 2 | fereastră | fönster | o fereastră, două ferestre |
| 2 | scaun | säte | un scaun, două scaune |
| 1 | a urca | att stiga på | urc · urcă · am urcat · să urce |
| 1 | a coborî | att stiga av | cobor · coboară · am coborât · să coboare |
| 1 | stație (f) | station | o stație, două stații |
| 3 | rută | rutt | o rută, două rute |
| 3 | supliment | tillägg | un supliment, două suplimente |
| 2 | a anula | att ställa in | anulez · anulează · am anulat · să anuleze |
| 3 | anulare (f) | inställelse | o anulare, două anulări |
| 2 | pasager | passagerare | un pasager, doi pasageri |
| 1 | linie (f) | spår | o linie, două linii |
| 2 | a aștepta | att vänta | aștept · așteaptă · am așteptat · să aștepte |
| 2 | a pierde | att missa | pierd · pierde · am pierdut · să piardă |
| 2 | sală de așteptare | väntsal | o sală de așteptare, două săli de așteptare |

### Md79d6c — 47 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | bilet | biljett | un bilet, două bilete |
| 1 | tren | tåg | un tren, două trenuri |
| 1 | stație (f) | station | o stație, două stații |
| 1 | călător | resenär | un călător, doi călători |
| 1 | rezervare (f) | reservation | o rezervare, două rezervări |
| 1 | loc | plats, säte | un loc, două locuri |
| 1 | cumpăra | köpa | cumpăr·cumpără·am cumpărat·să cumpere |
| 1 | ajunge | ankomma | ajung·ajunge·am ajuns·să ajungă |
| 1 | pleca | avresa | plec·pleacă·am plecat·să plece |
| 1 | pasager | passagerare | un pasager, doi pasageri |
| 1 | informație (f) | information | o informație, două informații |
| 1 | aștepta | vänta | aștept·așteaptă·am așteptat·să aștepte |
| 1 | călătorie (f) | resa | o călătorie, două călătorii |
| 1 | tarif | pris, biljettpris | un tarif, două tarife |
| 1 | bilet de întoarcere | returbiljett |  |
| 1 | bilet de călătorie | resebiljett |  |
| 1 | bilet de reducere | rabatterad biljett |  |
| 1 | bilet electronic | elektronisk biljett |  |
| 1 | valabil | giltig |  |
| 1 | oră de plecare | avgångstid |  |
| 1 | oră de sosire | ankomsttid |  |
| 1 | vagon | vagn | un vagon, două vagoane |
| 1 | compartiment | avdelning, kupé | un compartiment, două compartimente |
| 1 | platformă | plattform | o platformă, două platforme |
| 1 | gară | tågstation | o gară, două gări |
| 2 | călătoare (f) | kvinlig resenär | o călătoare, două călătoare |
| 2 | vinde | sälja | vând·vinde·am vândut·să vândă |
| 2 | verifica | kontrollera | verific·verifică·am verificat·să verifice |
| 2 | căuta | söka | caut·caută·am căutat·să caute |
| 2 | întârzia | försena | întârziez·întârzie·am întârziat·să întârzie |
| 2 | întârziere (f) | försening | o întârziere, două întârzieri |
| 2 | pasageră | kvinnlig passagerare | o pasageră, două pasageri |
| 2 | reducere (f) | rabatt | o reducere, două reduceri |
| 2 | anulare (f) | avbokning | o anulare, două anulări |
| 2 | expira | upphöra att gälla | expir·expiră·am expirat·să expire |
| 3 | fereastră | fönster | o fereastră, două ferestre |
| 3 | ușă | dörr | o ușă, două uși |
| 3 | control | kontroll | un control, două controale |
| 3 | metrou | tunnelbana | un metrou, două metrouuri |
| 3 | autobuz | buss | un autobuz, două autobuze |
| 2 | bilet gratuit | gratis biljett |  |
| 2 | bilet de grup | gruppbiljett |  |
| 2 | bilet de student | studentbiljett |  |
| 2 | bilet de copil | barnbiljett |  |
| 2 | bilet de senior | seniorbiljett |  |
| 2 | bilet de tip | biljettyp |  |
| 2 | bilet de rezervă | reservbiljett |  |
