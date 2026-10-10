# Bedömning: it-lakare-150

**Tema:** Hos läkaren  
**Språk:** italienska  
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

### M05df09 — 131 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | il dottore | läkare | un dottore, due dottori |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 2 | la clinica | klinik | una clinica, due cliniche |
| 1 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | la visita | läkarbesök | una visita, due visite |
| 2 | la prenotazione | bokning | una prenotazione, due prenotazioni |
| 1 | l'appuntamento | tid | un appuntamento, due appuntamenti |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | la paziente | patient | una paziente, due pazienti |
| 1 | il sintomo | symtom | un sintomo, due sintomi |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tosse |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 2 | l'influenza | influensa | un'influenza, due influenze |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 1 | il mal di stomaco | magont | un mal di stomaco, due mal di stomaco |
| 1 | il mal di gola | ont i halsen | un mal di gola, due mal di gola |
| 1 | il mal di schiena | ryggont | un mal di schiena, due mal di schiena |
| 2 | la nausea | illamående | una nausea, due nausee |
| 2 | il vomito | kräkning | un vomito, due vomiti |
| 2 | la diarrea | diarré | una diarrea, due diarree |
| 2 | la pressione alta | högt blodtryck |  |
| 2 | la pressione bassa | lågt blodtryck |  |
| 3 | il battito cardiaco | hjärtslag | un battito cardiaco, due battiti cardiaci |
| 2 | la temperatura | temperatur | una temperatura, due temperature |
| 2 | il termometro | termometer | un termometro, due termometri |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 2 | la prescrizione | ordination | una prescrizione, due prescrizioni |
| 2 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la medicina | medicin | una medicina, due medicine |
| 2 | la pillola | tablett | una pillola, due pillole |
| 2 | la compressa | tablett | una compressa, due compresse |
| 1 | la cura | behandling | una cura, due cure |
| 2 | l'iniezione | spruta | un'iniezione, due iniezioni |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 1 | l'esame | undersökning | un esame, due esami |
| 2 | l'analisi | analys | un'analisi, due analisi |
| 1 | il prelievo del sangue | blodprov | un prelievo del sangue, due prelievi del sangue |
| 2 | la radiografia | röntgenbild | una radiografia, due radiografie |
| 3 | l'ecografia | ultraljudsundersökning | un'ecografia, due ecografie |
| 1 | la visita medica | läkarundersökning | una visita medica, due visite mediche |
| 2 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 2 | l'infortunio | skada | un infortunio, due infortuni |
| 2 | la ferita | sår | una ferita, due ferite |
| 3 | la gamba | ben | una gamba, due gambe |
| 3 | il braccio | arm | un braccio, due braccia |
| 3 | la testa | huvud | una testa, due teste |
| 3 | il petto | bröst | un petto, due petti |
| 3 | la pancia | mage | una pancia, due pance |
| 3 | la schiena | rygg | una schiena, due schiene |
| 3 | la caviglia | ankel | una caviglia, due caviglie |
| 3 | il ginocchio | knä | un ginocchio, due ginocchia |
| 3 | la mano | hand | una mano, due mani |
| 3 | il piede | fot | un piede, due piedi |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 2 | i polmoni | lungor | un polmone, due polmoni |
| 2 | lo stomaco | mage | uno stomaco, due stomaci |
| 3 | il fegato | lever | un fegato, due fegati |
| 3 | i reni | njurar | un rene, due reni |
| 1 | il sangue | blod | un sangue, due sangui |
| 2 | la cura antibiotica | antibiotikakur | una cura antibiotica, due cure antibiotiche |
| 2 | l'antibiotico | antibiotikum | un antibiotico, due antibiotici |
| 3 | l'ospedale pubblico | offentligt sjukhus | un ospedale pubblico, due ospedali pubblici |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronti soccorsi |
| 2 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 2 | il reparto | avdelning | un reparto, due reparti |
| 2 | la stanza | rum | una stanza, due stanze |
| 3 | il letto d'ospedale | sjukhussäng | un letto d'ospedale, due letti d'ospedale |
| 2 | la visita specialistica | specialistbesök | una visita specialistica, due visite specialistiche |
| 2 | lo specialista | specialist | uno specialista, due specialisti |
| 3 | il dermatologo | hudläkare | un dermatologo, due dermatologi |
| 3 | il cardiologo | kardiolog | un cardiologo, due cardiologi |
| 2 | il pediatra | barnläkare | un pediatra, due pediatri |
| 2 | il dentista | tandläkare | un dentista, due dentisti |
| 3 | la dentiera | protes | una dentiera, due dentiere |
| 3 | il chirurgo | kirurg | un chirurgo, due chirurghi |
| 2 | l'operazione | operation | un'operazione, due operazioni |
| 3 | la sala operatoria | operationssal | una sala operatoria, due sale operatorie |
| 2 | l'intervento | ingrepp | un intervento, due interventi |
| 2 | il cerotto | plåster | un cerotto, due cerotti |
| 2 | la benda | binda | una benda, due bende |
| 3 | il ghiaccio | is | un ghiaccio, due ghiacci |
| 3 | il collare | krage | un collare, due collari |
| 3 | la stampella | krycka | una stampella, due stampelle |
| 3 | la sedia a rotelle | rullstol | una sedia a rotelle, due sedie a rotelle |
| 3 | la copertura assicurativa | försäkringsskydd | una copertura assicurativa, due coperture assicurative |
| 2 | l'assicurazione sanitaria | sjukförsäkring | un'assicurazione sanitaria, due assicurazioni sanitarie |
| 2 | il referto | provsvar | un referto, due referti |
| 2 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 3 | il modulo | blankett | un modulo, due moduli |
| 2 | la tessera sanitaria | sjukförsäkringskort | una tessera sanitaria, due tessere sanitarie |
| 3 | la carta d'identità | identitetskort | una carta d'identità, due carte d'identità |
| 2 | l'assistenza | vård | un'assistenza, due assistenze |
| 3 | il ricovero | inläggning | un ricovero, due ricoveri |
| 3 | la guarigione | tillfrisknande | una guarigione, due guarigioni |
| 1 | sto male | jag mår dåligt |  |
| 1 | mi fa male... | jag har ont i... |  |
| 1 | ho la febbre | jag har feber |  |
| 1 | ho la tosse | jag hostar |  |
| 1 | ho mal di testa | jag har huvudvärk |  |
| 1 | ho mal di stomaco | jag har ont i magen |  |
| 1 | devo prendere una medicina | jag måste ta medicin |  |
| 2 | deve riposare | du måste vila |  |
| 2 | prenda questo farmaco | ta detta läkemedel |  |
| 2 | ha bisogno di un'analisi | du behöver en analys |  |
| 2 | si spogli | klä av dig |  |
| 2 | apra la bocca | öppna munnen |  |
| 3 | respiri profondamente | andas djupt |  |
| 2 | faccia un respiro profondo | ta ett djupt andetag |  |
| 2 | si sieda | sätt dig |  |
| 2 | si sdrai | lägg dig |  |
| 2 | aspetti un momento | vänta en stund |  |
| 1 | non si preoccupi | oroa dig inte |  |
| 2 | è grave | det är allvarligt |  |
| 3 | è una cosa lieve | det är något lindrigt |  |
| 2 | mi sento debole | jag känner mig svag |  |
| 2 | mi sento meglio | jag mår bättre |  |
| 2 | ho avuto un incidente | jag har varit med om en olycka |  |
| 2 | mi sono fatto male | jag har skadat mig |  |
| 3 | ho una reazione allergica | jag har en allergisk reaktion |  |
| 2 | sono allergico/a a... | jag är allergisk mot... |  |
| 2 | febbre alta | hög feber |  |
| 2 | dolore forte | kraftig smärta |  |
| 2 | la visita di controllo | återbesök | una visita di controllo, due visite di controllo |
| 2 | il controllo | kontroll | un controllo, due controlli |
| 3 | la prevenzione | förebyggande vård | una prevenzione, due prevenzioni |
| 3 | la disinfezione | desinfektion | una disinfezione, due disinfezioni |

### Mae224d — 154 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | il dottore | doktor | un dottore, due dottori |
| 1 | la dottoressa | kvinnlig doktor | una dottoressa, due dottoresse |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | l'appuntamento | tidsbeställning, bokad tid | un appuntamento, due appuntamenti |
| 1 | la visita medica | läkarundersökning | una visita medica, due visite mediche |
| 1 | lo studio medico | läkarmottagning | uno studio medico, due studi medici |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la ricetta | recept (läkemedel) | una ricetta, due ricette |
| 1 | la medicina | medicin, läkemedel | una medicina, due medicine |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la pastiglia | tablett | una pastiglia, due pastiglie |
| 1 | il sintomo | symptom | un sintomo, due sintomi |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 1 | l'infezione | infektion | un'infezione, due infezioni |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il mal di testa | huvudvärk |  |
| 1 | il mal di gola | halsont |  |
| 1 | il mal di stomaco | magont |  |
| 1 | il mal di schiena | ryggont |  |
| 1 | la nausea | illamående | una nausea, due nausee |
| 1 | la pressione | blodtryck | una pressione, due pressioni |
| 1 | il sangue | blod |  |
| 1 | l'analisi del sangue | blodprov | un'analisi del sangue, due analisi del sangue |
| 2 | la radiografia | röntgenbild | una radiografia, due radiografie |
| 2 | l'iniezione | injektion, spruta | un'iniezione, due iniezioni |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 1 | la cura | behandling, kur | una cura, due cure |
| 2 | la terapia | terapi | una terapia, due terapie |
| 2 | l'operazione | operation | un'operazione, due operazioni |
| 2 | l'intervento chirurgico | kirurgiskt ingrepp | un intervento chirurgico, due interventi chirurgici |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | il pronto soccorso | akutmottagning |  |
| 2 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 1 | l'infermiere | sjuksköterska (manlig) | un infermiere, due infermieri |
| 1 | l'infermiera | sjuksköterska (kvinnlig) | un'infermiera, due infermiere |
| 2 | lo specialista | specialist | uno specialista, due specialisti |
| 2 | il dentista | tandläkare | un dentista, due dentisti |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 2 | l'asma | astma |  |
| 2 | il diabete | diabetes |  |
| 2 | la frattura | fraktur, benbrott | una frattura, due fratture |
| 1 | la ferita | sår, skada | una ferita, due ferite |
| 2 | il gonfiore | svullnad | un gonfiore, due gonfiori |
| 2 | il livido | blåmärke | un livido, due lividi |
| 3 | la cicatrice | ärr | una cicatrice, due cicatrici |
| 2 | il cerotto | plåster | un cerotto, due cerotti |
| 2 | la benda | bandage | una benda, due bende |
| 2 | il termometro | termometer | un termometro, due termometri |
| 3 | lo stetoscopio | stetoskop | uno stetoscopio, due stetoscopi |
| 2 | la siringa | spruta | una siringa, due siringhe |
| 2 | la compressa | tablett, kompress | una compressa, due compresse |
| 2 | lo sciroppo | sirap, hostmedicin | uno sciroppo, due sciroppi |
| 1 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 1 | l'antidolorifico | smärtstillande medel | un antidolorifico, due antidolorifici |
| 2 | l'antinfiammatorio | antiinflammatoriskt medel | un antinfiammatorio, due antinfiammatori |
| 2 | la pomata | salva | una pomata, due pomate |
| 2 | le gocce | droppar |  |
| 1 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 2 | la cartella clinica | patientjournal | una cartella clinica, due cartelle cliniche |
| 2 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 2 | l'assicurazione sanitaria | sjukförsäkring | un'assicurazione sanitaria, due assicurazioni sanitarie |
| 2 | la tessera sanitaria | sjukvårdskort | una tessera sanitaria, due tessere sanitarie |
| 1 | sentirsi male | må dåligt | mi sento, si sente · mi sono sentito/a · si senta |
| 1 | avere mal di… | ha ont i… | ho mal di, ha mal di · ho avuto mal di · abbia mal di |
| 1 | fare male | göra ont | faccio, fa · ha fatto · faccia |
| 1 | visitare | undersöka (patient) | visito, visita · ho visitato · visiti |
| 2 | esaminare | undersöka | esamino, esamina · ho esaminato · esamini |
| 1 | prescrivere | skriva ut (recept) | prescrivo, prescrive · ho prescritto · prescriva |
| 1 | curare | behandla, bota | curo, cura · ho curato · curi |
| 1 | guarire | tillfriskna, bota | guarisco, guarisce · sono guarito/a · guarisca |
| 1 | ammalarsi | bli sjuk | mi ammalo, si ammala · mi sono ammalato/a · si ammali |
| 1 | tossire | hosta | tossisco, tossisce · ho tossito · tossisca |
| 2 | starnutire | nysa | starnutisco, starnutisce · ho starnutito · starnutisca |
| 2 | vomitare | kräkas | vomito, vomita · ho vomitato · vomiti |
| 2 | svenire | svimma | svengo, sviene · sono svenuto/a · svenga |
| 1 | respirare | andas | respiro, respira · ho respirato · respiri |
| 2 | sanguinare | blöda | sanguino, sanguina · ho sanguinato · sanguini |
| 1 | misurare la febbre | ta tempen | misuro, misura · ho misurato · misuri |
| 1 | misurare la pressione | mäta blodtrycket | misuro, misura · ho misurato · misuri |
| 1 | prendere una medicina | ta en medicin | prendo, prende · ho preso · prenda |
| 2 | fare un'iniezione | ge en spruta | faccio, fa · ho fatto · faccia |
| 2 | operare | operera | opero, opera · ho operato · operi |
| 2 | ricoverare | lägga in (på sjukhus) | ricovero, ricovera · ho ricoverato · ricoveri |
| 2 | dimettere | skriva ut (från sjukhus) | dimetto, dimette · ho dimesso · dimetta |
| 1 | prenotare | boka (tid) | prenoto, prenota · ho prenotato · prenoti |
| 1 | Mi fa male qui | Det gör ont här |  |
| 1 | Ho la febbre | Jag har feber |  |
| 1 | Mi sento male | Jag mår dåligt |  |
| 1 | Ho bisogno di un medico | Jag behöver en läkare |  |
| 1 | Vorrei prendere un appuntamento | Jag skulle vilja boka en tid |  |
| 1 | Da quanto tempo ha questi sintomi? | Hur länge har ni haft dessa symptom? |  |
| 1 | Dove le fa male? | Var gör det ont? |  |
| 1 | È allergico a qualche farmaco? | Är ni allergisk mot något läkemedel? |  |
| 1 | Prenda questa medicina tre volte al giorno | Ta denna medicin tre gånger om dagen |  |
| 1 | Deve fare delle analisi | Ni måste göra några prover |  |
| 1 | Non è niente di grave | Det är inget allvarligt |  |
| 1 | Devo tornare per un controllo? | Måste jag komma tillbaka för kontroll? |  |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 2 | il polmone | lunga | un polmone, due polmoni |
| 1 | lo stomaco | mage | uno stomaco, due stomaci |
| 3 | il fegato | lever | un fegato, due fegati |
| 3 | il rene | njure | un rene, due reni |
| 1 | la gola | hals, strupe | una gola, due gole |
| 2 | il petto | bröst, bröstkorg | un petto, due petti |
| 1 | la schiena | rygg | una schiena, due schiene |
| 2 | il braccio | arm | un braccio, due braccia |
| 2 | la gamba | ben | una gamba, due gambe |
| 2 | il ginocchio | knä | un ginocchio, due ginocchia |
| 3 | la caviglia | fotled | una caviglia, due caviglie |
| 2 | la spalla | axel | una spalla, due spalle |
| 2 | l'orecchio | öra | un orecchio, due orecchie |
| 2 | l'occhio | öga | un occhio, due occhi |
| 2 | la pelle | hud | una pelle, due pelli |
| 2 | l'eruzione cutanea | hudutslag | un'eruzione cutanea, due eruzioni cutanee |
| 2 | il prurito | klåda | un prurito, due pruriti |
| 2 | le vertigini | yrsel |  |
| 2 | la stanchezza | trötthet |  |
| 2 | il capogiro | svindel, yrsel | un capogiro, due capogiri |
| 1 | l'influenza | influensa | un'influenza, due influenze |
| 3 | la polmonite | lunginflammation | una polmonite, due polmoniti |
| 3 | l'otite | öroninflammation | un'otite, due otiti |
| 3 | la cistite | urinvägsinfektion | una cistite, due cistiti |
| 3 | l'intossicazione alimentare | matförgiftning | un'intossicazione alimentare, due intossicazioni alimentari |
| 3 | la distorsione | stukning | una distorsione, due distorsioni |
| 3 | il gesso | gips | un gesso, due gessi |
| 3 | i punti | stygn (suturer) |  |
| 3 | l'ecografia | ultraljud | un'ecografia, due ecografie |
| 3 | la risonanza magnetica | magnetröntgen | una risonanza magnetica, due risonanze magnetiche |
| 3 | il reparto | avdelning (på sjukhus) | un reparto, due reparti |
| 3 | la convalescenza | konvalescens, tillfrisknande |  |
| 2 | il riposo | vila | un riposo |
| 1 | grave | allvarlig |  |
| 2 | acuto | akut, skarp (smärta) |  |
| 2 | cronico | kronisk |  |
| 2 | lieve | lindrig |  |
| 2 | gonfio | svullen |  |
| 2 | infetto | infekterad |  |
| 3 | contagioso | smittsam |  |
| 2 | a digiuno | fastande, på tom mage |  |
| 2 | dopo i pasti | efter måltiderna |  |
| 2 | prima dei pasti | före måltiderna |  |
| 1 | Respiri profondamente | Andas djupt |  |
| 1 | Si spogli | Klä av er |  |
| 1 | Apra la bocca | Öppna munnen |  |
| 1 | Si sdrai sul lettino | Lägg er på britsen |  |
| 2 | il lettino | undersökningsbrits | un lettino, due lettini |
| 1 | la ricetta medica | läkarrecept | una ricetta medica, due ricette mediche |
| 2 | gli effetti collaterali | biverkningar |  |
| 2 | il dosaggio | dosering | un dosaggio, due dosaggi |

### M855b83 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | la dottoressa | kvinnlig läkare | una dottoressa, due dottoresse |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | lo studio medico | läkarmottagning | uno studio medico, due studi medici |
| 1 | l'appuntamento | tid, bokad tid | un appuntamento, due appuntamenti |
| 1 | la visita | läkarbesök, undersökning | una visita, due visite |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 1 | l'influenza | influensa | un'influenza, due influenze |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 1 | il mal di gola | halsont | un mal di gola, due mal di gola |
| 1 | il mal di stomaco | magont | un mal di stomaco, due mal di stomaco |
| 1 | la nausea | illamående | una nausea, due nausee |
| 1 | il sintomo | symtom | un sintomo, due sintomi |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | la cura | behandling | una cura, due cure |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 1 | la pressione sanguigna | blodtryck | una pressione sanguigna, due pressioni sanguigne |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 1 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | l'infermiere | manlig sjuksköterska | un infermiere, due infermieri |
| 1 | l'esame del sangue | blodprov | un esame del sangue, due esami del sangue |
| 1 | il medico di base | husläkare | un medico di base, due medici di base |
| 1 | la tessera sanitaria | sjukförsäkringskort | una tessera sanitaria, due tessere sanitarie |
| 1 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 1 | la compressa | tablett | una compressa, due compresse |
| 1 | la testa | huvud | una testa, due teste |
| 1 | la gola | hals | una gola, due gole |
| 1 | lo stomaco | mage | uno stomaco, due stomaci |
| 1 | la schiena | rygg | una schiena, due schiene |
| 1 | il petto | bröst | un petto, due petti |
| 1 | il cuore | hjärta | un cuore, due cuori |
| 1 | visitare | undersöka | visito, visita · ho visitato · visiti |
| 1 | prescrivere | skriva ut, ordinera | prescrivo, prescrive · ho prescritto · prescriva |
| 1 | curare | behandla | curo, cura · ho curato · curi |
| 1 | guarire | tillfriskna | guarisco, guarisce · sono guarito · guarisca |
| 1 | soffrire | lida | soffro, soffre · ho sofferto · soffra |
| 1 | respirare | andas | respiro, respira · ho respirato · respiri |
| 1 | tossire | hosta | tossisco, tossisce · ho tossito · tossisca |
| 1 | sentirsi | må, känna sig | mi sento, si sente · mi sono sentito · si senta |
| 1 | prendere | ta | prendo, prende · ho preso · prenda |
| 1 | prenotare | boka | prenoto, prenota · ho prenotato · prenoti |
| 1 | vomitare | kräkas | vomito, vomita · ho vomitato · vomiti |
| 1 | Come si sente? | Hur mår ni? |  |
| 1 | Non mi sento bene. | Jag mår inte bra. |  |
| 1 | Ho mal di testa. | Jag har huvudvärk. |  |
| 1 | Mi fa male qui. | Det gör ont här. |  |
| 1 | Dove le fa male? | Var har ni ont? |  |
| 1 | Ho la febbre. | Jag har feber. |  |
| 1 | Ho bisogno di un medico. | Jag behöver en läkare. |  |
| 1 | Ho un appuntamento. | Jag har en bokad tid. |  |
| 1 | Da quanto tempo ha questi sintomi? | Hur länge har ni haft de här symtomen? |  |
| 1 | Sono allergico a... | Jag är allergisk mot... |  |
| 1 | Respiri profondamente. | Andas djupt. |  |
| 1 | Apra la bocca. | Öppna munnen. |  |
| 1 | Chiami un'ambulanza! | Ring efter en ambulans! |  |
| 1 | È grave? | Är det allvarligt? |  |
| 1 | Quante volte al giorno? | Hur många gånger om dagen? |  |
| 1 | Prenda una compressa. | Ta en tablett. |  |
| 1 | Ho la tosse. | Jag har hosta. |  |
| 1 | Ho la nausea. | Jag mår illa. |  |
| 1 | Ho le vertigini. | Jag är yr. |  |
| 1 | Mi sento male. | Jag mår dåligt. |  |
| 1 | malato | sjuk |  |
| 1 | grave | allvarlig |  |
| 1 | sano | frisk |  |
| 1 | incinta | gravid |  |
| 1 | allergico | allergisk |  |
| 2 | l'infermiera | kvinnlig sjuksköterska | un'infermiera, due infermiere |
| 2 | la radiografia | röntgen | una radiografia, due radiografie |
| 2 | l'iniezione | spruta, injektion | un'iniezione, due iniezioni |
| 2 | il termometro | termometer | un termometro, due termometri |
| 2 | l'assicurazione sanitaria | sjukförsäkring | un'assicurazione sanitaria, due assicurazioni sanitarie |
| 2 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 2 | la terapia | terapi | una terapia, due terapie |
| 2 | il farmaco | läkemedel | un farmaco, due farmaci |
| 2 | la diarrea | diarré | una diarrea, due diarree |
| 2 | il vomito | kräkning | un vomito, due vomiti |
| 2 | la vertigine | yrsel | una vertigine, due vertigini |
| 2 | il braccio | arm | un braccio, due braccia |
| 2 | la gamba | ben | una gamba, due gambe |
| 2 | la mano | hand | una mano, due mani |
| 2 | il piede | fot | un piede, due piedi |
| 2 | la pelle | hud | una pelle, due pelli |
| 2 | l'occhio | öga | un occhio, due occhi |
| 2 | l'orecchio | öra | un orecchio, due orecchie |
| 2 | il naso | näsa | un naso, due nasi |
| 2 | la bocca | mun | una bocca, due bocche |
| 2 | il collo | nacke, hals | un collo, due colli |
| 2 | la spalla | axel | una spalla, due spalle |
| 2 | il ginocchio | knä | un ginocchio, due ginocchia |
| 2 | la pancia | mage, buk | una pancia, due pance |
| 2 | il polmone | lunga | un polmone, due polmoni |
| 2 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 2 | la ferita | sår | una ferita, due ferite |
| 2 | la frattura | fraktur, benbrott | una frattura, due fratture |
| 2 | l'effetto collaterale | biverkning | un effetto collaterale, due effetti collaterali |
| 2 | la dose | dos | una dose, due dosi |
| 2 | operare | operera | opero, opera · ho operato · operi |
| 2 | misurare | mäta | misuro, misura · ho misurato · misuri |
| 2 | svenire | svimma | svengo, sviene · sono svenuto · svenga |
| 2 | sanguinare | blöda | sanguino, sanguina · ho sanguinato · sanguini |
| 2 | gonfiarsi | svullna | mi gonfio, si gonfia · mi sono gonfiato · si gonfi |
| 2 | ricoverare | lägga in på sjukhus | ricovero, ricovera · ho ricoverato · ricoveri |
| 2 | Posso prenotare una visita? | Kan jag boka ett läkarbesök? |  |
| 2 | Ho bisogno di una ricetta. | Jag behöver ett recept. |  |
| 2 | due volte al giorno | två gånger om dagen |  |
| 2 | a stomaco vuoto | på tom mage |  |
| 2 | dopo i pasti | efter måltider |  |
| 2 | prima dei pasti | före måltider |  |
| 2 | Ho preso freddo. | Jag har blivit förkyld. |  |
| 2 | Mi sono slogato la caviglia. | Jag har vrickat foten. |  |
| 2 | la caviglia | fotled | una caviglia, due caviglie |
| 2 | il polso | handled, puls | un polso, due polsi |
| 2 | la febbre alta | hög feber | una febbre alta, due febbri alte |
| 2 | la visita di controllo | återbesök, kontroll | una visita di controllo, due visite di controllo |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 2 | il battito cardiaco | hjärtslag | un battito cardiaco, due battiti cardiaci |
| 3 | la gravidanza | graviditet | una gravidanza, due gravidanze |
| 3 | l'ecografia | ultraljudsundersökning | un'ecografia, due ecografie |
| 3 | la risonanza magnetica | magnetröntgen | una risonanza magnetica, due risonanze magnetiche |
| 3 | la TAC | datortomografi | una TAC, due TAC |
| 3 | l'analisi delle urine | urinprov | un'analisi delle urine, due analisi delle urine |
| 3 | il campione | prov | un campione, due campioni |
| 3 | l'anestesia | narkos, bedövning | un'anestesia, due anestesie |
| 3 | l'intervento chirurgico | operation | un intervento chirurgico, due interventi chirurgici |
| 3 | il chirurgo | kirurg | un chirurgo, due chirurghi |
| 3 | lo specialista | specialist | uno specialista, due specialisti |
| 3 | il cardiologo | kardiolog | un cardiologo, due cardiologi |
| 3 | il dentista | tandläkare | un dentista, due dentisti |
| 3 | il mal d'orecchio | öronvärk | un mal d'orecchio, due mal d'orecchio |
| 3 | l'eruzione cutanea | hudutslag | un'eruzione cutanea, due eruzioni cutanee |
| 3 | il prurito | klåda | un prurito, due pruriti |
| 3 | l'emicrania | migrän | un'emicrania, due emicranie |
| 3 | il tampone | pinnprov, svabbprov | un tampone, due tamponi |
| 3 | la pomata | salva | una pomata, due pomate |
| 3 | lo sciroppo | sirap, hostmedicin | uno sciroppo, due sciroppi |
| 3 | la benda | bandage, binda | una benda, due bende |
| 3 | il cerotto | plåster | un cerotto, due cerotti |
| 3 | le stampelle | kryckor | una stampella, due stampelle |
| 3 | la sedia a rotelle | rullstol | una sedia a rotelle, due sedie a rotelle |
| 3 | la guarigione | tillfrisknande | una guarigione, due guarigioni |
| 3 | l'infezione | infektion | un'infezione, due infezioni |

### Md79d6c — 116 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | prio: 1 ord: il dottore oversattning: en läkare bojning: un dottore, due dottori uttal:  | en läkare | un dottore, due dottori |
| 1 | prio: 1 ord: la dottoressa oversattning: en läkare (kvinnlig) bojning: una dottoressa, due dottoresse uttal:  | en läkare (kvinnlig) | una dottoressa, due dottoresse |
| 1 | prio: 1 ord: il paziente oversattning: en patient bojning: un paziente, due pazienti uttal:  | en patient | un paziente, due pazienti |
| 1 | prio: 1 ord: la visita medica oversattning: en läkarundersökning bojning: una visita medica, due visite mediche uttal:  | en läkarundersökning | una visita medica, due visite mediche |
| 1 | prio: 1 ord: il sintomo oversattning: ett symptom bojning: un sintomo, due sintomi uttal:  | ett symptom | un sintomo, due sintomi |
| 1 | prio: 1 ord: il dolore oversattning: en smärta bojning: un dolore, due dolori uttal:  | en smärta | un dolore, due dolori |
| 1 | prio: 1 ord: la febbre oversattning: ett feber bojning: una febbre, due febbri uttal:  | ett feber | una febbre, due febbri |
| 1 | prio: 1 ord: la tosse oversattning: en hosta bojning: una tosse, due tossi uttal:  | en hosta | una tosse, due tossi |
| 1 | prio: 1 ord: il raffreddore oversattning: en förkylning bojning: un raffreddore, due raffreddori uttal:  | en förkylning | un raffreddore, due raffreddori |
| 1 | prio: 1 ord: la pressione sanguigna oversattning: ett blodtryck bojning: una pressione sanguigna, due pressioni sanguigne uttal:  | ett blodtryck | una pressione sanguigna, due pressioni sanguigne |
| 1 | prio: 1 ord: il battito cardiaco oversattning: ett hjärtslag bojning: un battito cardiaco, due battiti cardiaci uttal:  | ett hjärtslag | un battito cardiaco, due battiti cardiaci |
| 1 | prio: 1 ord: la temperatura corporea oversattning: en kroppstemperatur bojning: una temperatura corporea, due temperature corporee uttal:  | en kroppstemperatur | una temperatura corporea, due temperature corporee |
| 1 | prio: 1 ord: il mal di testa oversattning: en huvudvärk bojning: un mal di testa, due mali di testa uttal:  | en huvudvärk | un mal di testa, due mali di testa |
| 1 | prio: 1 ord: la nausea oversattning: en illamående bojning: una nausea, due nausee uttal:  | en illamående | una nausea, due nausee |
| 1 | prio: 1 ord: il vomito oversattning: ett kräkning bojning: un vomito, due vomiti uttal:  | ett kräkning | un vomito, due vomiti |
| 1 | prio: 1 ord: la diarrea oversattning: en diarré bojning: una diarrea, due diarree uttal:  | en diarré | una diarrea, due diarree |
| 1 | prio: 1 ord: il raffreddore oversattning: en förkylning bojning: un raffreddore, due raffreddori uttal:  | en förkylning | un raffreddore, due raffreddori |
| 1 | prio: 1 ord: la medicina oversattning: ett läkemedel bojning: una medicina, due medicine uttal:  | ett läkemedel | una medicina, due medicine |
| 1 | prio: 1 ord: il farmaco oversattning: ett läkemedel (generellt) bojning: un farmaco, due farmaci uttal:  | ett läkemedel (generellt) | un farmaco, due farmaci |
| 1 | prio: 1 ord: la prescrizione oversattning: ett recept bojning: una prescrizione, due prescrizioni uttal:  | ett recept | una prescrizione, due prescrizioni |
| 1 | prio: 1 ord: il referto oversattning: ett utlåtande (medicinskt) bojning: un referto, due referti uttal:  | ett utlåtande (medicinskt) | un referto, due referti |
| 1 | prio: 1 ord: la visita di controllo oversattning: en kontrollundersökning bojning: una visita di controllo, due visite di controllo uttal:  | en kontrollundersökning | una visita di controllo, due visite di controllo |
| 1 | prio: 1 ord: il sangue oversattning: ett blod bojning: un sangue, due sangui uttal:  | ett blod | un sangue, due sangui |
| 1 | prio: 1 ord: la pressione arteriosa oversattning: ett artärtryck bojning: una pressione arteriosa, due pressioni arteriose uttal:  | ett artärtryck | una pressione arteriosa, due pressioni arteriose |
| 1 | prio: 1 ord: il risultato degli esami oversattning: ett provresultat bojning: un risultato degli esami, due risultati degli esami uttal:  | ett provresultat | un risultato degli esami, due risultati degli esami |
| 1 | prio: 1 ord: la terapia oversattning: en behandling (terapi) bojning: una terapia, due terapie uttal:  | en behandling (terapi) | una terapia, due terapie |
| 1 | prio: 1 ord: il ricovero oversattning: en inläggning bojning: un ricovero, due ricoveri uttal:  | en inläggning | un ricovero, due ricoveri |
| 1 | prio: 1 ord: la clinica oversattning: en klinik bojning: una clinica, due cliniche uttal:  | en klinik | una clinica, due cliniche |
| 1 | prio: 1 ord: il pronto soccorso oversattning: en akutmottagning bojning: un pronto soccorso, due pronto soccorsi uttal:  | en akutmottagning | un pronto soccorso, due pronto soccorsi |
| 1 | prio: 1 ord: la cartella clinica oversattning: en patientjournal bojning: una cartella clinica, due cartelle cliniche uttal:  | en patientjournal | una cartella clinica, due cartelle cliniche |
| 1 | prio: 1 ord: il medico di famiglia oversattning: en husläkare bojning: un medico di famiglia, due medici di famiglia uttal:  | en husläkare | un medico di famiglia, due medici di famiglia |
| 1 | prio: 1 ord: la visita specialistica oversattning: en specialistundersökning bojning: una visita specialistica, due visite specialistiche uttal:  | en specialistundersökning | una visita specialistica, due visite specialistiche |
| 1 | prio: 1 ord: il sintomo principale oversattning: ett huvudsymptom bojning: un sintomo principale, due sintomi principali uttal:  | ett huvudsymptom | un sintomo principale, due sintomi principali |
| 1 | prio: 1 ord: la diagnosi oversattning: en diagnos bojning: una diagnosi, due diagnosi uttal:  | en diagnos | una diagnosi, due diagnosi |
| 1 | prio: 1 ord: il risultato negativo oversattning: ett negativt resultat bojning: un risultato negativo, due risultati negativi uttal:  | ett negativt resultat | un risultato negativo, due risultati negativi |
| 1 | prio: 1 ord: il risultato positivo oversattning: ett positivt resultat bojning: un risultato positivo, due risultati positivi uttal:  | ett positivt resultat | un risultato positivo, due risultati positivi |
| 1 | prio: 1 ord: il rimedio oversattning: ett botemedel bojning: un rimedio, due rimedi uttal:  | ett botemedel | un rimedio, due rimedi |
| 1 | prio: 1 ord: la dose oversattning: en dos bojning: una dose, due dosi uttal:  | en dos | una dose, due dosi |
| 1 | prio: 1 ord: il paziente è in attesa oversattning: patienten väntar bojning:  uttal:  | patienten väntar |  |
| 1 | prio: 1 ord: il dottore mi ha consigliato oversattning: läkaren har rekommenderat mig bojning:  uttal:  | läkaren har rekommenderat mig |  |
| 1 | prio: 1 ord: ho bisogno di una ricetta oversattning: jag behöver ett recept bojning:  uttal:  | jag behöver ett recept |  |
| 1 | prio: 1 ord: mi sento male oversattning: jag mår dåligt bojning:  uttal:  | jag mår dåligt |  |
| 1 | prio: 1 ord: ho la febbre alta oversattning: jag har hög feber bojning:  uttal:  | jag har hög feber |  |
| 1 | prio: 1 ord: ho mal di testa oversattning: jag har huvudvärk bojning:  uttal:  | jag har huvudvärk |  |
| 1 | prio: 1 ord: ho la tosse secca oversattning: jag har torr hosta bojning:  uttal:  | jag har torr hosta |  |
| 1 | prio: 1 ord: ho nausea oversattning: jag är illamående bojning:  uttal:  | jag är illamående |  |
| 1 | prio: 1 ord: ho vomito oversattning: jag har kräkts bojning:  uttal:  | jag har kräkts |  |
| 2 | prio: 2 ord: il medico oversattning: en läkare (allmän) bojning: un medico, due medici uttal:  | en läkare (allmän) | un medico, due medici |
| 2 | prio: 2 ord: l'infermiere oversattning: en sjuksköterska bojning: un infermiere, due infermieri uttal:  | en sjuksköterska | un infermiere, due infermieri |
| 2 | prio: 2 ord: la infermiera oversattning: en sjuksköterska (kvinnlig) bojning: una infermiera, due infermiere uttal:  | en sjuksköterska (kvinnlig) | una infermiera, due infermiere |
| 2 | prio: 2 ord: il chirurgo oversattning: en kirurg bojning: un chirurgo, due chirurghi uttal:  | en kirurg | un chirurgo, due chirurghi |
| 2 | prio: 2 ord: la radiografia oversattning: en röntgenbild bojning: una radiografia, due radiografie uttal:  | en röntgenbild | una radiografia, due radiografie |
| 2 | prio: 2 ord: l'ecografia oversattning: en ultraljudsundersökning bojning: un'ecografia, due ecografie uttal:  | en ultraljudsundersökning | un'ecografia, due ecografie |
| 2 | prio: 2 ord: la analisi del sangue oversattning: ett blodprov bojning: una analisi del sangue, due analisi del sangue uttal:  | ett blodprov | una analisi del sangue, due analisi del sangue |
| 2 | prio: 2 ord: il test oversattning: ett test bojning: un test, due test uttal:  | ett test | un test, due test |
| 2 | prio: 2 ord: la pressione alta oversattning: högt blodtryck bojning: una pressione alta, due pressioni alte uttal:  | högt blodtryck | una pressione alta, due pressioni alte |
| 2 | prio: 2 ord: la pressione bassa oversattning: lågt blodtryck bojning: una pressione bassa, due pressioni basse uttal:  | lågt blodtryck | una pressione bassa, due pressioni basse |
| 2 | prio: 2 ord: il battito irregolare oversattning: oregelbunden hjärtrytm bojning: un battito irregolare, due battiti irregolari uttal:  | oregelbunden hjärtrytm | un battito irregolare, due battiti irregolari |
| 2 | prio: 2 ord: la febbre leggera oversattning: lätt feber bojning: una febbre leggera, due febbri leggere uttal:  | lätt feber | una febbre leggera, due febbri leggere |
| 2 | prio: 2 ord: il dolore acuto oversattning: akut smärta bojning: un dolore acuto, due dolori acuti uttal:  | akut smärta | un dolore acuto, due dolori acuti |
| 2 | prio: 2 ord: il dolore cronico oversattning: kronisk smärta bojning: un dolore cronico, due dolori cronici uttal:  | kronisk smärta | un dolore cronico, due dolori cronici |
| 2 | prio: 2 ord: la terapia fisica oversattning: fysioterapi bojning: una terapia fisica, due terapie fisiche uttal:  | fysioterapi | una terapia fisica, due terapie fisiche |
| 2 | prio: 2 ord: il vaccino oversattning: ett vaccin bojning: un vaccino, due vaccini uttal:  | ett vaccin | un vaccino, due vaccini |
| 2 | prio: 2 ord: la dose giornaliera oversattning: daglig dos bojning: una dose giornaliera, due dosi giornaliere uttal:  | daglig dos | una dose giornaliera, due dosi giornaliere |
| 2 | prio: 2 ord: il rimedio naturale oversattning: naturläkemedel bojning: un rimedio naturale, due rimedi naturali uttal:  | naturläkemedel | un rimedio naturale, due rimedi naturali |
| 2 | prio: 2 ord: la terapia antibiotica oversattning: antibiotikabehandling bojning: una terapia antibiotica, due terapie antibiotiche uttal:  | antibiotikabehandling | una terapia antibiotica, due terapie antibiotiche |
| 2 | prio: 2 ord: il ricovero in ospedale oversattning: sjukhusinläggning bojning: un ricovero in ospedale, due ricoveri in ospedale uttal:  | sjukhusinläggning | un ricovero in ospedale, due ricoveri in ospedale |
| 2 | prio: 2 ord: la visita di routine oversattning: rutinundersökning bojning: una visita di routine, due visite di routine uttal:  | rutinundersökning | una visita di routine, due visite di routine |
| 2 | prio: 2 ord: il referto è chiaro oversattning: utlåtandet är tydligt bojning:  uttal:  | utlåtandet är tydligt |  |
| 2 | prio: 2 ord: la terapia è efficace oversattning: behandlingen är effektiv bojning:  uttal:  | behandlingen är effektiv |  |
| 2 | prio: 2 ord: il paziente ha una storia medica oversattning: patienten har en medicinsk historia bojning:  uttal:  | patienten har en medicinsk historia |  |
| 2 | prio: 2 ord: la cartella è completa oversattning: journalen är komplett bojning:  uttal:  | journalen är komplett |  |
| 3 | prio: 3 ord: il farmacista oversattning: en apotekare bojning: un farmacista, due farmacisti uttal:  | en apotekare | un farmacista, due farmacisti |
| 3 | prio: 3 ord: la farmacia oversattning: ett apotek bojning: una farmacia, due farmacie uttal:  | ett apotek | una farmacia, due farmacie |
| 3 | prio: 3 ord: il laboratorio oversattning: ett laboratorium bojning: un laboratorio, due laboratori uttal:  | ett laboratorium | un laboratorio, due laboratori |
| 3 | prio: 3 ord: la terapia alternativa oversattning: alternativ behandling bojning: una terapia alternativa, due terapie alternative uttal:  | alternativ behandling | una terapia alternativa, due terapie alternative |
| 3 | prio: 3 ord: il massaggio terapeutico oversattning: terapeutisk massage bojning: un massaggio terapeutico, due massaggi terapeutici uttal:  | terapeutisk massage | un massaggio terapeutico, due massaggi terapeutici |
| 3 | prio: 3 ord: la visita domiciliare oversattning: hembesök bojning: una visita domiciliare, due visite domiciliari uttal:  | hembesök | una visita domiciliare, due visite domiciliari |
| 3 | prio: 3 ord: il consulto specialistico oversattning: specialistkonsultation bojning: un consulto specialistico, due consulti specialistici uttal:  | specialistkonsultation | un consulto specialistico, due consulti specialistici |
| 3 | prio: 3 ord: la terapia occupazionale oversattning: arbetsterapi bojning: una terapia occupazionale, due terapie occupazionali uttal:  | arbetsterapi | una terapia occupazionale, due terapie occupazionali |
| 3 | prio: 3 ord: il test allergico oversattning: allergitest bojning: un test allergico, due test allergici uttal:  | allergitest | un test allergico, due test allergici |
| 3 | prio: 3 ord: la terapia ormonale oversattning: hormonbehandling bojning: una terapia ormonale, due terapie ormonali uttal:  | hormonbehandling | una terapia ormonale, due terapie ormonali |
| 3 | prio: 3 ord: il monitoraggio oversattning: övervakning bojning: un monitoraggio, due monitoraggi uttal:  | övervakning | un monitoraggio, due monitoraggi |
| 3 | prio: 3 ord: il consulto telefonico oversattning: telefonkonsultation bojning: un consulto telefonico, due consulti telefonici uttal:  | telefonkonsultation | un consulto telefonico, due consulti telefonici |
| 3 | prio: 3 ord: la visita di emergenza oversattning: akutmottagningsundersökning bojning: una visita di emergenza, due visite di emergenza uttal:  | akutmottagningsundersökning | una visita di emergenza, due visite di emergenza |
| 3 | prio: 3 ord: il triage oversattning: triage (prioritering) bojning: un triage, due triage uttal:  | triage (prioritering) | un triage, due triage |
| 3 | prio: 3 ord: la terapia di riabilitazione oversattning: rehabiliteringsbehandling bojning: una terapia di riabilitazione, due terapie di riabilitazione uttal:  | rehabiliteringsbehandling | una terapia di riabilitazione, due terapie di riabilitazione |
| 1 | prio: 1 ord: sentire (verbo) oversattning: känna, känna sig bojning: sento·sente, ho sentito·senta uttal:  | känna, känna sig | sento·sente, ho sentito·senta |
| 1 | prio: 1 ord: avere (verbo) oversattning: ha (att ha) bojning: ho·ha, ho avuto·abbia uttal:  | ha (att ha) | ho·ha, ho avuto·abbia |
| 1 | prio: 1 ord: prendere (verbo) oversattning: ta, ta (medicin) bojning: prendo·prende, ho preso·prenda uttal:  | ta, ta (medicin) | prendo·prende, ho preso·prenda |
| 1 | prio: 1 ord: dovere (verbo) oversattning: behöva, måste bojning: devo·deve, ho dovuto·deva uttal:  | behöva, måste | devo·deve, ho dovuto·deva |
| 1 | prio: 1 ord: potere (verbo) oversattning: kunna, få (tillstånd) bojning: posso·può, ho potuto·possa uttal:  | kunna, få (tillstånd) | posso·può, ho potuto·possa |
| 1 | prio: 1 ord: volere (verbo) oversattning: vilja bojning: voglio·vuole, ho voluto·voglia uttal:  | vilja | voglio·vuole, ho voluto·voglia |
| 1 | prio: 1 ord: chiedere (verbo) oversattning: fråga, be om bojning: chiedo·chiede, ho chiesto·chieda uttal:  | fråga, be om | chiedo·chiede, ho chiesto·chieda |
| 1 | prio: 1 ord: spiegare (verbo) oversattning: förklara bojning: spiego·spiega, ho spiegato·spieghi uttal:  | förklara | spiego·spiega, ho spiegato·spieghi |
| 1 | prio: 1 ord: capire (verbo) oversattning: förstå bojning: capisco·capisce, ho capito·capisca uttal:  | förstå | capisco·capisce, ho capito·capisca |
| 1 | prio: 1 ord: sentire (verbo) – riferito a sintomi oversattning: känna (symptom) bojning: sento·sente, ho sentito·senta uttal:  | känna (symptom) | sento·sente, ho sentito·senta |
| 2 | prio: 2 ord: controllare (verbo) oversattning: kontrollera bojning: controllo·controlla, ho controllato·controlli uttal:  | kontrollera | controllo·controlla, ho controllato·controlli |
| 2 | prio: 2 ord: misurare (verbo) oversattning: mäta bojning: misuro·misura, ho misurato·misuri uttal:  | mäta | misuro·misura, ho misurato·misuri |
| 2 | prio: 2 ord: prescrivere (verbo) oversattning: förskriva bojning: prescrivo·prescrive, ho prescritto·prescriva uttal:  | förskriva | prescrivo·prescrive, ho prescritto·prescriva |
| 2 | prio: 2 ord: raccomandare (verbo) oversattning: rekommendera bojning: raccomando·raccomanda, ho raccomandato·raccomandi uttal:  | rekommendera | raccomando·raccomanda, ho raccomandato·raccomandi |
| 2 | prio: 2 ord: fare (verbo) oversattning: göra, utföra bojning: faccio·fa, ho fatto·faccia uttal:  | göra, utföra | faccio·fa, ho fatto·faccia |
| 2 | prio: 2 ord: prendere appuntamento (frase) oversattning: boka tid bojning:  uttal:  | boka tid |  |
| 2 | prio: 2 ord: fare una visita (frase) oversattning: göra en undersökning bojning:  uttal:  | göra en undersökning |  |
| 2 | prio: 2 ord: fare una diagnosi (frase) oversattning: ställa en diagnos bojning:  uttal:  | ställa en diagnos |  |
| 2 | prio: 2 ord: fare una prescrizione (frase) oversattning: skriva ut ett recept bojning:  uttal:  | skriva ut ett recept |  |
| 2 | prio: 2 ord: fare un esame (frase) oversattning: göra ett test bojning:  uttal:  | göra ett test |  |
| 3 | prio: 3 ord: il medico di base oversattning: husläkare (allmän) bojning: un medico di base, due medici di base uttal:  | husläkare (allmän) | un medico di base, due medici di base |
| 3 | prio: 3 ord: il medico specialista oversattning: specialistläkare bojning: un medico specialista, due medici specialisti uttal:  | specialistläkare | un medico specialista, due medici specialisti |
| 3 | prio: 3 ord: il reparto oversattning: avdelning bojning: un reparto, due reparti uttal:  | avdelning | un reparto, due reparti |
| 3 | prio: 3 ord: la sala d'attesa oversattning: väntrum bojning: una sala d'attesa, due sale d'attesa uttal:  | väntrum | una sala d'attesa, due sale d'attesa |
| 3 | prio: 3 ord: il medico di turno oversattning: jourhavande läkare bojning: un medico di turno, due medici di turno uttal:  | jourhavande läkare | un medico di turno, due medici di turno |
| 3 | prio: 3 ord: la visita di follow‑up oversattning: uppföljningsundersökning bojning: una visita di follow‑up, due visite di follow‑up uttal:  | uppföljningsundersökning | una visita di follow‑up, due visite di follow‑up |
| 3 | prio: 3 ord: il referto è incompleto oversattning: utlåtandet är ofullständigt bojning:  uttal:  | utlåtandet är ofullständigt |  |
| 3 | prio: 3 ord: la terapia è stata sospesa oversattning: behandlingen har avbrutits bojning:  uttal:  | behandlingen har avbrutits |  |
| 3 | prio: 3 ord: il paziente ha una reazione allergica oversattning: patienten har en allergisk reaktion bojning:  uttal:  | patienten har en allergisk reaktion |  |

### M3affbb — 145 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | la visita | läkarbesök | una visita, due visite |
| 1 | avere male | ha ont | ho male · ha male · ho avuto male · abbia male |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronti soccorsi |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | sentirsi male | känna sig dålig | mi sento male · si sente male · mi sono sentito male · si senta male |
| 1 | la ferita | sår | una ferita, due ferite |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mali di testa |
| 1 | il mal di pancia | magont | un mal di pancia, due mali di pancia |
| 1 | la nausea | illamående | una nausea, due nausee |
| 1 | il sintomo | symptom | un sintomo, due sintomi |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | l'appuntamento | tid/bokning | un appuntamento, due appuntamenti |
| 1 | la pressione | blodtryck | una pressione, due pressioni |
| 1 | il sangue | blod | un sangue, due sangui |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 1 | la pillola | tablett | una pillola, due pillole |
| 1 | la dose | dos | una dose, due dosi |
| 1 | il dosaggio | dosering | un dosaggio, due dosaggi |
| 1 | la guarigione | tillfrisknande | una guarigione, due guarigioni |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 2 | la gola | hals | una gola, due gole |
| 2 | il mal di gola | halsont | un mal di gola, due mali di gola |
| 2 | la schiena | rygg | una schiena, due schiene |
| 2 | il mal di schiena | ryggont | un mal di schiena, due mali di schiena |
| 2 | il braccio | arm | un braccio, due braccia |
| 2 | la gamba | ben | una gamba, due gambe |
| 2 | il piede | fot | un piede, due piedi |
| 2 | la mano | hand | una mano, due mani |
| 2 | l'occhio | öga | un occhio, due occhi |
| 2 | l'orecchio | öra | un orecchio, due orecchie |
| 2 | il naso | näsa | un naso, due nasi |
| 2 | la bocca | mun | una bocca, due bocche |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 2 | lo stomaco | mage | uno stomaco, due stomaci |
| 2 | la pelle | hud | una pelle, due pelli |
| 2 | la febbre alta | hög feber | una febbre alta, due febbri alte |
| 2 | il termometro | termometer | un termometro, due termometri |
| 2 | la pomata | salva | una pomata, due pomate |
| 2 | lo sciroppo | hostmedicin | uno sciroppo, due sciroppi |
| 2 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 2 | l'antidolorifico | smärtstillande | un antidolorifico, due antidolorifici |
| 2 | la puntura | spruta | una puntura, due punture |
| 2 | la fasciatura | bandage | una fasciatura, due fasciature |
| 2 | il gesso | gips | un gesso, due gessi |
| 2 | la frattura | fraktur | una frattura, due fratture |
| 2 | la stanchezza | trötthet | una stanchezza, due stanchezze |
| 2 | il vomito | kräkning | un vomito, due vomiti |
| 2 | la diarrea | diarré | una diarrea, due diarree |
| 2 | la vertigine | yrsel | una vertigine, due vertigini |
| 2 | il respiro | andning | un respiro, due respiri |
| 2 | la visita medica | läkarundersökning | una visita medica, due visite mediche |
| 2 | il controllo | kontroll | un controllo, due controlli |
| 2 | la sala operatoria | operationssal | una sala operatoria, due sale operatorie |
| 2 | l'operazione | operation | un'operazione, due operazioni |
| 2 | il chirurgo | kirurg | un chirurgo, due chirurghi |
| 2 | l'infermiere | sjuksköterska | un infermiere, due infermieri |
| 2 | la guardia medica | jourläkare | una guardia medica, due guardie mediche |
| 2 | il pronto soccorso | akuten | un pronto soccorso, due pronti soccorsi |
| 2 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 2 | il pronto intervento | akut hjälp | un pronto intervento, due pronti interventi |
| 2 | la tessera sanitaria | sjukförsäkringskort | una tessera sanitaria, due tessere sanitarie |
| 2 | il modulo | formulär | un modulo, due moduli |
| 2 | la privacy | sekretess | una privacy, due privacy |
| 2 | il consenso | samtycke | un consenso, due consensi |
| 2 | la cartella clinica | journal | una cartella clinica, due cartelle cliniche |
| 2 | il referto | utlåtande/svar | un referto, due referti |
| 2 | l'esame | undersökning/prov | un esame, due esami |
| 2 | l'analisi del sangue | blodprov | un'analisi del sangue, due analisi del sangue |
| 2 | la radiografia | röntgen | una radiografia, due radiografie |
| 2 | l'ecografia | ultraljud | un'ecografia, due ecografie |
| 2 | la risonanza | magnetkamera | una risonanza, due risonanze |
| 2 | la terapia | behandling | una terapia, due terapie |
| 2 | la cura | kur/behandling | una cura, due cure |
| 2 | il dosaggio | dosering | un dosaggio, due dosaggi |
| 2 | la frequenza | frekvens | una frequenza, due frequenze |
| 2 | il digiuno | fasta | un digiuno, due digiuni |
| 2 | la dieta | diet | una dieta, due diete |
| 2 | il riposo | vila | un riposo, due riposi |
| 2 | la guarigione | tillfrisknande | una guarigione, due guarigioni |
| 2 | il miglioramento | förbättring | un miglioramento, due miglioramenti |
| 2 | il peggioramento | försämring | un peggioramento, due peggioramenti |
| 2 | la complicazione | komplikation | una complicazione, due complicazioni |
| 2 | la prevenzione | förebyggande | una prevenzione, due prevenzioni |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 2 | la vaccinazione | vaccinering | una vaccinazione, due vaccinazioni |
| 2 | l'immunità | immunitet | un'immunità, due immunità |
| 2 | il contagio | smitta | un contagio, due contagi |
| 2 | l'infezione | infektion | un'infezione, due infezioni |
| 2 | l'infiammazione | inflammation | un'infiammazione, due infiammazioni |
| 2 | il gonfiore | svullnad | un gonfiore, due gonfiori |
| 2 | il prurito | klåda | un prurito, due pruriti |
| 2 | l'eruzione | utslag | un'eruzione, due eruzioni |
| 2 | la scottatura | brännskada | una scottatura, due scottature |
| 2 | la caduta | fall | una caduta, due cadute |
| 2 | la distorsione | stukning | una distorsione, due distorsioni |
| 2 | la lussazione | urledvridning | una lussazione, due lussazioni |
| 2 | la contusione | blåmärke/krosskada | una contusione, due contusioni |
| 2 | il taglio | skärsår | un taglio, due tagli |
| 2 | il punto di sutura | stygn | un punto di sutura, due punti di sutura |
| 2 | la cicatrice | ärr | una cicatrice, due cicatrici |
| 2 | il battito cardiaco | hjärtslag | un battito cardiaco, due battiti cardiaci |
| 2 | la frequenza cardiaca | puls | una frequenza cardiaca, due frequenze cardiache |
| 2 | la saturazione | syremättnad | una saturazione, due saturazioni |
| 2 | il diabete | diabetes | un diabete, due diabeti |
| 2 | l'ipertensione | högt blodtryck | un'ipertensione, due ipertensioni |
| 2 | l'asma | astma | un'asma, due asme |
| 2 | la depressione | depression | una depressione, due depressioni |
| 2 | l'ansia | ångest | un'ansia, due ansie |
| 2 | lo stress | stress | uno stress, due stress |
| 2 | l'insonnia | sömnlöshet | un'insonnia, due insonnie |
| 2 | la stitichezza | förstoppning | una stitichezza, due stitichezze |
| 2 | l'indigestione | matsmältningsbesvär | un'indigestione, due indigestioni |
| 2 | il bruciore | sveda | un bruciore, due bruciori |
| 2 | la gastrite | magkatarr | una gastrite, due gastriti |
| 2 | l'ulcera | magsår | un'ulcera, due ulcere |
| 2 | la sinusite | bihåleinflammation | una sinusite, due sinusiti |
| 2 | la bronchite | bronkit | una bronchite, due bronchiti |
| 2 | la polmonite | lunginflammation | una polmonite, due polmoniti |
| 2 | l'otite | öroninflammation | un'otite, due otiti |
| 2 | la congiuntivite | ögoninflammation | una congiuntivite, due congiuntiviti |
| 2 | la dermatite | hudinflammation | una dermatite, due dermatiti |
| 2 | l'artrite | ledgångsreumatism | un'artrite, due artriti |
| 2 | l'artrosi | artros | un'artrosi, due artrosi |
| 2 | il tumore | tumör | un tumore, due tumori |
| 2 | il cancro | cancer | un cancro, due cancri |
| 2 | la chemioterapia | cellgiftsbehandling | una chemioterapia, due chemioterapie |
| 2 | la radioterapia | strålbehandling | una radioterapia, due radioterapie |
| 2 | la riabilitazione | rehabilitering | una riabilitazione, due riabilitazioni |
| 2 | la fisioterapia | fysioterapi | una fisioterapia, due fisioterapie |
| 2 | il massaggio | massage | un massaggio, due massaggi |
| 2 | la ginnastica | gymnastik/träning | una ginnastica, due ginnastiche |
| 2 | il tutore | stödskena | un tutore, due tutori |
| 2 | la stampella | krycka | una stampella, due stampelle |
| 2 | la sedia a rotelle | rullstol | una sedia a rotelle, due sedie a rotelle |
| 2 | la barella | bår | una barella, due barelle |

### M2a5587 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 2 | la dottoressa | kvinnlig läkare | una dottoressa, due dottoresse |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 2 | la clinica | klinik | una clinica, due cliniche |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | l'infermiere | manlig sjuksköterska | un infermiere, due infermieri |
| 2 | l'infermiera | kvinnlig sjuksköterska | un'infermiera, due infermiere |
| 1 | la medicina | medicin | una medicina, due medicine |
| 2 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 2 | il sintomo | symtom | un sintomo, due sintomi |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 2 | l'influenza | influensa | un'influenza, due influenze |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 1 | il mal di gola | halsont | un mal di gola, due mal di gola |
| 1 | il mal di stomaco | ont i magen | un mal di stomaco, due mal di stomaco |
| 1 | il mal di schiena | ryggont | un mal di schiena, due mal di schiena |
| 1 | il mal di denti | tandvärk | un mal di denti, due mal di denti |
| 1 | la nausea | illamående | una nausea, due nausee |
| 1 | il vomito | kräkning | un vomito, due vomiti |
| 1 | la diarrea | diarré | una diarrea, due diarree |
| 1 | l'infezione | infektion | un'infezione, due infezioni |
| 2 | l'infiammazione | inflammation | un'infiammazione, due infiammazioni |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 2 | l'asma | astma | un'asma, due asme |
| 2 | la pressione | blodtryck | una pressione, due pressioni |
| 2 | il sangue | blod | un sangue, due sangui |
| 2 | l'esame del sangue | blodprov | un esame del sangue, due esami del sangue |
| 1 | la pillola | piller | una pillola, due pillole |
| 2 | la compressa | tablett | una compressa, due compresse |
| 2 | lo sciroppo | hostmedicin | uno sciroppo, due sciroppi |
| 2 | la pomata | salva | una pomata, due pomate |
| 2 | la crema | kräm | una crema, due creme |
| 1 | l'iniezione | injektion | un'iniezione, due iniezioni |
| 2 | la siringa | spruta | una siringa, due siringhe |
| 1 | il vaccino | vaccin | un vaccino, due vaccini |
| 1 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 2 | l'antidolorifico | smärtstillande | un antidolorifico, due antidolorifici |
| 1 | il cerotto | plåster | un cerotto, due cerotti |
| 2 | la benda | bandage | una benda, due bende |
| 2 | il gesso | gips | un gesso, due gessi |
| 1 | la ferita | sår | una ferita, due ferite |
| 2 | il taglio | skärsår | un taglio, due tagli |
| 3 | la cicatrice | ärr | una cicatrice, due cicatrici |
| 1 | la frattura | benbrott | una frattura, due fratture |
| 2 | la distorsione | stukning | una distorsione, due distorsioni |
| 2 | l'osso | ben | un osso, due ossa |
| 2 | il muscolo | muskel | un muscolo, due muscoli |
| 3 | il nervo | nerv | un nervo, due nervi |
| 2 | la pelle | hud | una pelle, due pelli |
| 1 | la testa | huvud | una testa, due teste |
| 1 | il collo | nacke | un collo, due colli |
| 1 | la gola | hals | una gola, due gole |
| 1 | la spalla | axel | una spalla, due spalle |
| 1 | il braccio | arm | un braccio, due braccia |
| 1 | la mano | hand | una mano, due mani |
| 1 | il dito | finger | un dito, due dita |
| 1 | il petto | bröst | un petto, due petti |
| 1 | il cuore | hjärta | un cuore, due cuori |
| 2 | il polmone | lunga | un polmone, due polmoni |
| 1 | lo stomaco | mage | uno stomaco, due stomachi |
| 1 | la pancia | mage | una pancia, due pance |
| 2 | l'intestino | tarm | un intestino, due intestini |
| 1 | la schiena | rygg | una schiena, due schiene |
| 1 | la gamba | ben | una gamba, due gambe |
| 1 | il ginocchio | knä | un ginocchio, due ginocchia |
| 1 | il piede | fot | un piede, due piedi |
| 1 | l'occhio | öga | un occhio, due occhi |
| 1 | l'orecchio | öra | un orecchio, due orecchie |
| 1 | il naso | näsa | un naso, due nasi |
| 1 | la bocca | mun | una bocca, due bocche |
| 1 | il dente | tand | un dente, due denti |
| 2 | la lingua | tunga | una lingua, due lingue |
| 2 | il respiro | andetag | un respiro, due respiri |
| 3 | il battito | hjärtslag | un battito, due battiti |
| 1 | la visita | läkarbesök | una visita, due visite |
| 1 | l'appuntamento | möte | un appuntamento, due appuntamenti |
| 2 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | l'emergenza | nödsituation | un'emergenza, due emergenze |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 1 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 1 | l'operazione | operation | un'operazione, due operazioni |
| 2 | l'intervento | ingrepp | un intervento, due interventi |
| 2 | il chirurgo | kirurg | un chirurgo, due chirurghi |
| 1 | il dentista | tandläkare | un dentista, due dentisti |
| 2 | lo specialista | specialist | uno specialista, due specialisti |
| 2 | il pediatra | barnläkare | un pediatra, due pediatri |
| 3 | il ginecologo | gynekolog | un ginecologo, due ginecologi |
| 3 | lo psicologo | psykolog | uno psicologo, due psicologi |
| 2 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 2 | la cura | behandling | una cura, due cure |
| 2 | la terapia | terapi | una terapia, due terapie |
| 2 | il termometro | termometer | un termometro, due termometri |
| 2 | la radiografia | röntgen | una radiografia, due radiografie |
| 3 | l'ecografia | ultraljud | un'ecografia, due ecografie |
| 3 | la sedia a rotelle | rullstol | una sedia a rotelle, due sedie a rotelle |
| 3 | la stampella | krycka | una stampella, due stampelle |
| 3 | il cotone | bomull | un cotone, due cotoni |
| 3 | la garza | kompress | una garza, due garze |
| 3 | il disinfettante | desinfektionsmedel | un disinfettante, due disinfettanti |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 2 | il virus | virus | un virus, due virus |
| 2 | il batterio | bakterie | un batterio, due batteri |
| 3 | il cancro | cancer | un cancro, due cancri |
| 3 | il tumore | tumör | un tumore, due tumori |
| 2 | l'infarto | hjärtinfarkt | un infarto, due infarti |
| 3 | l'ictus | stroke | un ictus, due ictus |
| 3 | il diabete | diabetes | un diabete, due diabeti |
| 2 | la vertigine | yrsel | una vertigine, due vertigini |
| 2 | lo svenimento | svimning | uno svenimento, due svenimenti |
| 2 | il livido | blåmärke | un livido, due lividi |
| 3 | l'eruzione cutanea | utslag | un'eruzione cutanea, due eruzioni cutanee |
| 2 | il prurito | klåda | un prurito, due pruriti |
| 2 | il gonfiore | svullnad | un gonfiore, due gonfiori |
| 3 | la debolezza | svaghet | una debolezza, due debolezze |
| 2 | la stanchezza | trötthet | una stanchezza, due stanchezze |
| 1 | visitare | undersöka | io visito · lui visita · ho visitato · che lui visiti |
| 1 | curare | bota | io curo · lui cura · ho curato · che lui curi |
| 1 | guarire | tillfriskna | io guarisco · lui guarisce · sono guarito · che lui guarisca |
| 1 | ammalarsi | bli sjuk | io mi ammalo · lui si ammala · mi sono ammalato · che lui si ammali |
| 1 | tossire | hosta | io tossisco · lui tossisce · ho tossito · che lui tossisca |
| 2 | starnutire | nysa | io starnutisco · lui starnutisce · ho starnutito · che lui starnutisca |
| 1 | vomitare | kräkas | io vomito · lui vomita · ho vomitato · che lui vomiti |
| 1 | sanguinare | blöda | io sanguino · lui sanguina · ho sanguinato · che lui sanguini |
| 2 | svenire | svimma | io svengo · lui sviene · sono svenuto · che lui svenga |
| 1 | respirare | andas | io respiro · lui respira · ho respirato · che lui respiri |
| 2 | prescrivere | skriva ut | io prescrivo · lui prescrive · ho prescritto · che lui prescriva |
| 2 | operare | operera | io opero · lui opera · ho operato · che lui operi |
| 2 | misurare | mäta | io misuro · lui misura · ho misurato · che lui misuri |
| 2 | ingoiare | svälja | io ingoio · lui ingoia · ho ingoiato · che lui ingoi |
| 1 | fare male | göra ont | io faccio male · lui fa male · ho fatto male · che lui faccia male |
| 1 | malato | sjuk |  |
| 1 | sano | frisk |  |
| 1 | grave | allvarlig |  |
| 2 | cronico | kronisk |  |
| 2 | acuto | akut |  |
| 2 | infettivo | smittsam |  |
| 2 | doloroso | smärtsam |  |
| 2 | gonfio | svullen |  |
| 2 | rotto | bruten |  |
| 2 | incinta | gravid |  |
| 1 | Ho bisogno di un medico | jag behöver en läkare |  |
| 1 | Mi fa male qui | det gör ont här |  |
| 1 | Non mi sento bene | jag mår inte bra |  |
| 1 | Ho la febbre alta | jag har hög feber |  |
| 1 | Chiami un'ambulanza | ring en ambulans |  |

### Mbda6c9 — 144 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, dei medici |
| 1 | il dottore | doktor | un dottore, dei dottori |
| 1 | l'appuntamento | tid | un appuntamento, degli appuntamenti |
| 1 | la visita | undersökning | una visita, delle visite |
| 1 | la sala d'attesa | väntrum | una sala d'attesa, delle sale d'attesa |
| 1 | la ricetta | recept | una ricetta, delle ricette |
| 1 | il farmaco | läkemedel | un farmaco, dei farmaci |
| 1 | la medicina | medicin | una medicina, delle medicine |
| 1 | il dolore | smärta | un dolore, dei dolori |
| 1 | avere dolore | ha ont | ho dolore · ha dolore · ha avuto · abbia |
| 1 | il sintomo | symtom | un sintomo, dei sintomi |
| 1 | la febbre | feber | una febbre, delle febbri |
| 1 | la tosse | hosta | una tosse, delle tossi |
| 1 | il raffreddore | förkylning | un raffreddore, dei raffreddori |
| 1 | il mal di testa | huvudvärk | un mal di testa, dei mal di testa |
| 1 | la gola | hals | una gola, delle gole |
| 1 | la nausea | illamående | una nausea, delle nausee |
| 1 | vomitare | kräkas | vomito · vomita · ha vomitato · vomiti |
| 1 | la diarrea | diarré | una diarrea, delle diarree |
| 1 | la ferita | sår | una ferita, delle ferite |
| 1 | il sangue | blod | un sangue, dei sangui |
| 1 | sanguinare | blöda | sanguino · sanguina · ha sanguinato · sanguini |
| 1 | la pressione | blodtryck | una pressione, delle pressioni |
| 1 | la temperatura | temperatur | una temperatura, delle temperature |
| 1 | misurare | mäta | misuro · misura · ha misurato · misuri |
| 1 | respirare | andas | respiro · respira · ha respirato · respiri |
| 1 | la respirazione | andning | una respirazione, delle respirazioni |
| 1 | la prescrizione | ordination | una prescrizione, delle prescrizioni |
| 1 | prendere | ta | prendo · prende · ha preso · prenda |
| 1 | curare | behandla | curo · cura · ha curato · curi |
| 1 | stare male | må dåligt | sto male · sta male · è stato male · stia male |
| 1 | sentirsi male | känna sig dålig | mi sento male · si sente male · si è sentito male · si senta male |
| 1 | l'allergia | allergi | un'allergia, delle allergie |
| 1 | essere allergico a | vara allergisk mot | sono allergico/a a · è allergico/a a · è stato allergico/a a · sia allergico/a a |
| 1 | la visita medica | läkarundersökning | una visita medica, delle visite mediche |
| 1 | visitare | undersöka | visito · visita · ha visitato · visiti |
| 1 | la malattia | sjukdom | una malattia, delle malattie |
| 1 | ammalarsi | bli sjuk | mi ammalo · si ammala · si è ammalato/a · si ammali |
| 1 | guarire | bli frisk | guarisco · guarisce · è guarito/a · guarisca |
| 1 | il paziente | patient | un paziente, dei pazienti |
| 2 | l'infermiera | sjuksköterska | un'infermiera, delle infermiere |
| 2 | l'infermiere | sjuksköterska | un infermiere, degli infermieri |
| 2 | l'ambulatorio | mottagning | un ambulatorio, degli ambulatori |
| 2 | la clinica | klinik | una clinica, delle cliniche |
| 2 | l'ospedale | sjukhus | un ospedale, degli ospedali |
| 2 | il pronto soccorso | akutmottagning | un pronto soccorso, dei pronto soccorso |
| 2 | urgente | akut |  |
| 2 | l'emergenza | nödsituation | un'emergenza, delle emergenze |
| 2 | chiamare il medico | ringa läkare | chiamo il medico · chiama il medico · ha chiamato il medico · chiami il medico |
| 2 | prenotare | boka | prenoto · prenota · ha prenotato · prenoti |
| 2 | aspettare | vänta | aspetto · aspetta · ha aspettato · aspetti |
| 2 | la diagnosi | diagnos | una diagnosi, delle diagnosi |
| 2 | diagnosticare | diagnostisera | diagnostico · diagnostica · ha diagnosticato · diagnostichi |
| 2 | la terapia | behandling | una terapia, delle terapie |
| 2 | la cura | kur | una cura, delle cure |
| 2 | la dose | dos | una dose, delle dosi |
| 2 | la compressa | tablett | una compressa, delle compresse |
| 2 | la pillola | piller | una pillola, delle pillole |
| 2 | lo sciroppo | sirap | uno sciroppo, degli sciroppi |
| 2 | l'iniezione | injektion | un'iniezione, delle iniezioni |
| 2 | la puntura | spruta | una puntura, delle punture |
| 2 | l'antibiotico | antibiotika | un antibiotico, degli antibiotici |
| 2 | l'antidolorifico | smärtstillande medel | un antidolorifico, degli antidolorifici |
| 2 | gli effetti collaterali | biverkningar | un effetto collaterale, degli effetti collaterali |
| 2 | la reazione | reaktion | una reazione, delle reazioni |
| 2 | la gravidanza | graviditet | una gravidanza, delle gravidanze |
| 2 | essere incinta | vara gravid | sono incinta · è incinta · è stata incinta · sia incinta |
| 2 | la pelle | hud | una pelle, delle pelli |
| 2 | la schiena | rygg | una schiena, delle schiene |
| 2 | lo stomaco | mage | uno stomaco, degli stomachi |
| 2 | la testa | huvud | una testa, delle teste |
| 2 | il petto | bröstkorg | un petto, dei petti |
| 2 | il braccio | arm | un braccio, delle braccia |
| 2 | la gamba | ben | una gamba, delle gambe |
| 2 | la mano | hand | una mano, delle mani |
| 2 | il piede | fot | un piede, dei piedi |
| 2 | l'occhio | öga | un occhio, degli occhi |
| 2 | l'orecchio | öra | un orecchio, degli orecchi |
| 2 | il naso | näsa | un naso, dei nasi |
| 2 | la bocca | mun | una bocca, delle bocche |
| 2 | il collo | hals | un collo, dei colli |
| 2 | la gola infiammata | halsont | una gola infiammata, delle gole infiammate |
| 2 | la tosse secca | torrhosta | una tosse secca, delle tossi secche |
| 2 | la tosse con catarro | slemhosta | una tosse con catarro, delle tossi con catarro |
| 2 | il catarro | slem | un catarro, dei catarri |
| 2 | la stanchezza | trötthet | una stanchezza, delle stanchezze |
| 2 | il capogiro | yrsel | un capogiro, dei capogiri |
| 2 | svenire | svimma | svengo · sviene · è svenuto/a · svenga |
| 2 | la debolezza | svaghet | una debolezza, delle debolezze |
| 2 | la puntura d'insetto | insektsbett | una puntura d'insetto, delle punture d'insetto |
| 2 | la frattura | fraktur | una frattura, delle fratture |
| 2 | rompersi | bryta sig | mi rompo · si rompe · si è rotto/a · si rompa |
| 2 | la distorsione | stukning | una distorsione, delle distorsioni |
| 2 | gonfio | svullen |  |
| 2 | infiammato | inflammerad |  |
| 1 | fa male | gör ont | faccio male · fa male · ha fatto male · faccia male |
| 1 | dove le fa male? | var gör det ont? | faccio male · fa male · ha fatto male · faccia male |
| 1 | da quanto tempo? | hur länge? |  |
| 2 | da ieri | sedan i går |  |
| 2 | da stamattina | sedan i morse |  |
| 2 | ogni giorno | varje dag |  |
| 2 | due volte al giorno | två gånger om dagen |  |
| 2 | prima dei pasti | före måltider |  |
| 2 | dopo i pasti | efter måltider |  |
| 3 | a digiuno | fastande |  |
| 1 | aprire la bocca | öppna munnen | apro la bocca · apre la bocca · ha aperto la bocca · apra la bocca |
| 1 | dire ah | säga ah | dico ah · dice ah · ha detto ah · dica ah |
| 1 | fare un respiro profondo | ta ett djupt andetag | faccio un respiro profondo · fa un respiro profondo · ha fatto un respiro profondo · faccia un respiro profondo |
| 1 | tossire | hosta | tossisco · tossisce · ha tossito · tossisca |
| 2 | sdraiarsi | lägga sig ner | mi sdraio · si sdraia · si è sdraiato/a · si sdrai |
| 2 | girarsi | vända sig | mi giro · si gira · si è girato/a · si giri |
| 2 | si rilassi | slappna av | mi rilasso · si rilassa · si è rilassato/a · si rilassi |
| 2 | mi dica | berätta | dico · dice · ha detto · dica |
| 2 | che cosa sente? | vad känner du? | sento · sente · ha sentito · senta |
| 2 | sentire dolore | känna smärta | sento dolore · sente dolore · ha sentito dolore · senta dolore |
| 2 | peggiorare | förvärras | peggioro · peggiora · è peggiorato/a · peggiori |
| 2 | migliorare | förbättras | miglioro · migliora · è migliorato/a · migliori |
| 1 | avere la febbre | ha feber | ho la febbre · ha la febbre · ha avuto la febbre · abbia la febbre |
| 1 | avere la tosse | ha hosta | ho la tosse · ha la tosse · ha avuto la tosse · abbia la tosse |
| 1 | avere il raffreddore | vara förkyld | ho il raffreddore · ha il raffreddore · ha avuto il raffreddore · abbia il raffreddore |
| 1 | avere mal di gola | ha ont i halsen | ho mal di gola · ha mal di gola · ha avuto mal di gola · abbia mal di gola |
| 1 | avere mal di stomaco | ha ont i magen | ho mal di stomaco · ha mal di stomaco · ha avuto mal di stomaco · abbia mal di stomaco |
| 1 | avere mal di schiena | ha ont i ryggen | ho mal di schiena · ha mal di schiena · ha avuto mal di schiena · abbia mal di schiena |
| 2 | avere mal d'orecchio | ha ont i örat | ho mal d'orecchio · ha mal d'orecchio · ha avuto mal d'orecchio · abbia mal d'orecchio |
| 2 | avere mal di denti | ha tandvärk | ho mal di denti · ha mal di denti · ha avuto mal di denti · abbia mal di denti |
| 3 | il dente | tand | un dente, dei denti |
| 3 | la radiografia | röntgen | una radiografia, delle radiografie |
| 3 | l'ecografia | ultraljud | un'ecografia, delle ecografie |
| 3 | le analisi | prover | un'analisi, delle analisi |
| 3 | il prelievo del sangue | blodprov | un prelievo del sangue, dei prelievi del sangue |
| 3 | l'esame | test | un esame, degli esami |
| 3 | il risultato | resultat | un risultato, dei risultati |
| 3 | la vaccinazione | vaccination | una vaccinazione, delle vaccinazioni |
| 3 | il vaccino | vaccin | un vaccino, dei vaccini |
| 3 | la mascherina | munskydd | una mascherina, delle mascherine |
| 3 | disinfettare | desinficera | disinfetto · disinfetta · ha disinfettato · disinfetti |
| 3 | la benda | binda | una benda, delle bende |
| 3 | il cerotto | plåster | un cerotto, dei cerotti |
| 3 | la stampella | krycka | una stampella, delle stampelle |
| 3 | camminare | gå | cammino · cammina · ha camminato · cammini |
| 1 | non riesco a respirare | jag kan inte andas | riesco a respirare · riesce a respirare · è riuscito/a a respirare · riesca a respirare |
| 2 | mi gira la testa | jag är yr | giro · gira · è girato/a · giri |
| 2 | mi sento meglio | jag känner mig bättre | mi sento meglio · si sente meglio · si è sentito meglio · si senta meglio |
| 2 | mi sento peggio | jag känner mig sämre | mi sento peggio · si sente peggio · si è sentito peggio · si senta peggio |

### Mf1dedb — 155 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | la dottoressa | kvinnlig läkare | una dottoressa, due dottoresse |
| 1 | il medico di base | husläkare, allmänläkare | un medico di base, due medici di base |
| 1 | l'infermiere | sjuksköterska (manlig) | un infermiere, due infermieri |
| 1 | l'infermiera | sjuksköterska (kvinnlig) | un'infermiera, due infermiere |
| 1 | il paziente | patient (manlig) | un paziente, due pazienti |
| 1 | la paziente | patient (kvinnlig) | una paziente, due pazienti |
| 1 | lo studio medico | läkarmottagning | uno studio medico, due studi medici |
| 1 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | l'appuntamento | bokad tid, möte | un appuntamento, due appuntamenti |
| 1 | la visita medica | läkarundersökning | una visita medica, due visite mediche |
| 1 | la ricetta medica | läkarrecept | una ricetta medica, due ricette mediche |
| 1 | la prescrizione | recept, ordination | una prescrizione, due prescrizioni |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | il dolore | smärta, värk | un dolore, due dolori |
| 1 | il sintomo | symtom | un sintomo, due sintomi |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 1 | il mal di gola | ont i halsen, halsont | un mal di gola, due mal di gola |
| 1 | il mal di pancia | ont i magen, magont | un mal di pancia, due mal di pancia |
| 1 | il mal di schiena | ryggvärk, ryggont | un mal di schiena, due mal di schiena |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 1 | l'influenza | influensa | un'influenza, due influenze |
| 1 | la nausea | illamående | una nausea, due nausee |
| 1 | il vomito | kräkning | un vomito, due vomiti |
| 1 | la diarrea | diarré | una diarrea, due diarree |
| 1 | le vertigini | yrsel | una vertigine, due vertigini |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 1 | la pressione sanguigna | blodtryck | una pressione sanguigna, due pressioni sanguigne |
| 1 | la tessera sanitaria | europeiskt sjukförsäkringskort, sjukvårdskort | una tessera sanitaria, due tessere sanitarie |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | la ferita | sår, skada | una ferita, due ferite |
| 1 | il sangue | blod | un sangue, due sangui |
| 1 | l'esame del sangue | blodprov | un esame del sangue, due esami del sangue |
| 1 | l'infezione | infektion | un'infezione, due infezioni |
| 1 | l'infiammazione | inflammation | un'infiammazione, due infiammazioni |
| 1 | la pastiglia | tablett, piller | una pastiglia, due pastiglie |
| 1 | la compressa | tablett | una compressa, due compresse |
| 1 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 1 | l'antidolorifico | smärtstillande medel | un antidolorifico, due antidolorifici |
| 1 | l'iniezione | injektion, spruta | un'iniezione, due iniezioni |
| 1 | il vaccino | vaccin | un vaccino, due vaccini |
| 1 | il cerotto | plåster | un cerotto, due cerotti |
| 1 | la fasciatura | bandage, förband | una fasciatura, due fasciature |
| 1 | visitare | undersöka (medicinskt) | visito · visita · ho visitato · visiti |
| 1 | prescrivere | skriva ut (recept) | prescrivo · prescrive · ho prescritto · prescriva |
| 1 | fare male | göra ont, smärta | faccio male · fa male · ho fatto male · faccia male |
| 1 | tossire | hosta | tossisco · tossisce · ho tossito · tossisca |
| 1 | respirare | andas | respiro · respira · ho respirato · respiri |
| 1 | sanguinare | blöda | sanguino · sanguina · ho sanguinato · sanguini |
| 1 | svenire | svimma | svengo · sviene · sono svenuto · svenga |
| 1 | guarire | tillfriskna, läka | guarisco · guarisce · sono guarito · guarisca |
| 1 | misurare la pressione | ta blodtrycket | misuro la pressione · misura la pressione · ho misurato la pressione · misuri la pressione |
| 1 | Dove Le fa male? | Var har Ni ont? |  |
| 1 | Mi fa male qui | Jag har ont här |  |
| 1 | Ho la febbre | Jag har feber |  |
| 1 | Non mi sento bene | Jag mår inte bra |  |
| 1 | Faccia un respiro profondo | Ta ett djupt andetag |  |
| 1 | Apra la bocca | Gapa, öppna munnen |  |
| 1 | Si spogli | Klä av Er |  |
| 1 | Da quanto tempo ha questi sintomi? | Hur länge har Ni haft dessa symtom? |  |
| 1 | Sono allergico a... | Jag är allergisk mot... |  |
| 1 | il termometro | termometer | un termometro, due termometri |
| 1 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 1 | la radiografia | röntgen | una radiografia, due radiografie |
| 1 | la gola | hals | una gola, due gole |
| 1 | il petto | bröstkorg | un petto, due petti |
| 1 | lo stomaco | magsäck, mage | uno stomaco, due stomaci |
| 1 | il cuore | hjärta | un cuore, due cuori |
| 1 | il polmone | lunga | un polmone, due polmoni |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | la dose | dos | una dose, due dosi |
| 2 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 2 | la clinica | klinik | una clinica, due cliniche |
| 2 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 2 | lo specialista | specialist | uno specialista, due specialisti |
| 2 | il farmacista | apotekare | un farmacista, due farmacisti |
| 2 | la guarigione | tillfrisknande, läkning | una guarigione, due guarigioni |
| 2 | la terapia | behandling, terapi | una terapia, due terapie |
| 2 | la cura | kur, behandling | una cura, due cure |
| 2 | il brivido | frossa | un brivido, due brividi |
| 2 | il gonfiore | svullnad | un gonfiore, due gonfiori |
| 2 | l'ematoma | blåmärke, hematom | un ematoma, due ematomi |
| 2 | la cicatrice | ärr | una cicatrice, due cicatrici |
| 2 | la frattura | benbrott, fraktur | una frattura, due fratture |
| 2 | la distorsione | stukning, vrickning | una distorsione, due distorsioni |
| 2 | la scottatura | brännskada | una scottatura, due scottature |
| 2 | la puntura | stick, bett | una puntura, due punture |
| 2 | il prurito | klåda | un prurito, due pruriti |
| 2 | la stanchezza | trötthet, utmattning | una stanchezza, due stanchezze |
| 2 | l'affanno | andnöd | un affanno, due affanni |
| 2 | l'eruzione cutanea | hudutslag | un'eruzione cutanea, due eruzioni cutanee |
| 2 | l'ecografia | ultraljud | un'ecografia, due ecografie |
| 2 | lo sciroppo | hostmedicin, sirap | uno sciroppo, due sciroppi |
| 2 | la pomata | salva | una pomata, due pomate |
| 2 | le gocce | droppar | una goccia, due gocce |
| 2 | la capsula | kapsel | una capsula, due capsule |
| 2 | il disinfettante | desinfektionsmedel | un disinfettante, due disinfettanti |
| 2 | il cotone | bomull | un cotone, due cotoni |
| 2 | il foglietto illustrativo | bipacksedel | un foglietto illustrativo, due foglietti illustrativi |
| 2 | l'effetto collaterale | biverkning | un effetto collaterale, due effetti collaterali |
| 2 | l'esame delle urine | urinprov | un esame delle urine, due esami delle urine |
| 2 | il tampone | snabbtest, svabb | un tampone, due tamponi |
| 2 | il peso | vikt | un peso, due pesi |
| 2 | l'altezza | längd | un'altezza, due altezze |
| 2 | la bilancia | våg | una bilancia, due bilance |
| 2 | lo stetoscopio | stetoskop | uno stetoscopio, due stetoscopi |
| 2 | la puntura di zanzara | myggbett | una puntura di zanzara, due punture di zanzara |
| 2 | la debolezza | svaghet | una debolezza, due debolezze |
| 2 | il battito cardiaco | hjärtslag, puls | un battito cardiaco, due battiti cardiaci |
| 2 | il polso | handled, puls | un polso, due polsi |
| 2 | il controllo | kontroll, återbesök | un controllo, due controlli |
| 2 | prenotare | boka | prenoto · prenota · ho prenotato · prenoti |
| 2 | deglutire | svälja | deglutisco · deglutisce · ho deglutito · deglutisca |
| 2 | farsi male | skada sig, göra sig illa | mi faccio male · si fa male · mi sono fatto male · si faccia male |
| 2 | sentirsi | känna sig, må | mi sento · si sente · mi sono sentito · si senta |
| 2 | ingessare | gipsa | ingesso · ingessa · ho ingessato · ingessi |
| 2 | disinfettare | desinficera | disinfetto · disinfetta · ho disinfettato · disinfetti |
| 2 | fasciare | linda om, bandagera | fascio · fascia · ho fasciato · fasci |
| 2 | Ha allergie? | Har Ni några allergier? |  |
| 2 | Prende dei farmaci? | Tar Ni några mediciner? |  |
| 2 | Due volte al giorno | Två gånger om dagen |  |
| 2 | Prima dei pasti | Före måltid |  |
| 2 | Dopo i pasti | Efter måltid |  |
| 2 | A stomaco pieno | På full mage |  |
| 2 | A stomaco vuoto | På fastande mage |  |
| 2 | il riposo | vila | un riposo, due riposi |
| 3 | l'impegnativa | remiss | un'impegnativa, due impegnative |
| 3 | l'anamnesi | sjukdomshistoria, anamnes | un'anamnesi, due anamnesi |
| 3 | l'elettrocardiogramma | EKG | un elettrocardiogramma, due elettrocardiogrammi |
| 3 | la risonanza magnetica | magnetröntgen, MRT | una risonanza magnetica, due risonanze magnetiche |
| 3 | il cardiologo | kardiolog, hjärtläkare | un cardiologo, due cardiologi |
| 3 | il dermatologo | hudläkare | un dermatologo, due dermatologi |
| 3 | il gesso | gips | un gesso, due gessi |
| 3 | la stampella | krycka | una stampella, due stampelle |
| 3 | la sedia a rotelle | rullstol | una sedia a rotelle, due sedie a rotelle |
| 3 | il punto di sutura | stygn | un punto di sutura, due punti di sutura |
| 3 | l'antistaminico | antihistamin | un antistaminico, due antistaminici |
| 3 | l'antinfiammatorio | antiinflammatoriskt medel | un antinfiammatorio, due antinfiammatori |
| 3 | il collirio | ögondroppar | un collirio, due colliri |
| 3 | la siringa | spruta (själva verktyget) | una siringa, due siringhe |
| 3 | l'ago | nål | un ago, due aghi |
| 3 | l'operazione | operation | un'operazione, due operazioni |
| 3 | l'anestesia | bedövning, narkos | un'anestesia, due anestesie |
| 3 | la flebo | dropp | una flebo, due flebo |
| 3 | il ricovero | inläggning på sjukhus | un ricovero, due ricoveri |
| 3 | la dimissione | utskrivning från sjukhus | una dimissione, due dimissioni |
| 3 | il reparto | avdelning (på sjukhus) | un reparto, due reparti |
| 3 | il pronto soccorso pediatrico | barnakutmottagning | un pronto soccorso pediatrico, due pronto soccorso pediatrici |
| 3 | il pediatra | barnläkare | un pediatra, due pediatri |
| 3 | il ginecologo | gynekolog | un ginecologo, due ginecologi |
| 3 | l'oculista | ögonläkare | un oculista, due oculisti |

### Ma86ca0 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | la dottoressa | läkarinna | una dottoressa, due dottoresse |
| 2 | l'infermiere | sjuksköterska (man) | un infermiere, due infermieri |
| 2 | l'infermiera | sjuksköterska | una infermiera, due infermiere |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | la visita | besök | una visita, due visite |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 2 | la prescrizione | ordination | una prescrizione, due prescrizioni |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | la pastiglia | tablett | una pastiglia, due pastiglie |
| 2 | lo sciroppo | sirap | uno sciroppo, due sciroppi |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | il dolore | smärta | un dolore, due dolori |
| 2 | la tosse | hosta | una tosse, due tossi |
| 2 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 2 | l'influenza | influensa | un'influenza, due influenze |
| 2 | la nausea | illamående | una nausea, due nausee |
| 2 | la diarrea | diarré | una diarrea, due diarree |
| 1 | la pressione | blodtryck | una pressione, due pressioni |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 2 | lo stomaco | mage | uno stomaco, due stomaci |
| 1 | la testa | huvud | una testa, due teste |
| 2 | la schiena | rygg | una schiena, due schiene |
| 1 | il braccio | arm | un braccio, due braccia |
| 1 | la gamba | ben | una gamba, due gambe |
| 2 | il ginocchio | knä | un ginocchio, due ginocchia |
| 2 | il piede | fot | un piede, due piedi |
| 2 | la mano | hand | una mano, due mani |
| 3 | il dito | finger | un dito, due dita |
| 1 | la gola | hals | una gola, due gole |
| 2 | l'orecchio | öra | un orecchio, due orecchie |
| 2 | l'occhio | öga | un occhio, due occhi |
| 2 | il naso | näsa | un naso, due nasi |
| 2 | la bocca | mun | una bocca, due bocche |
| 2 | il dente | tand | un dente, due denti |
| 3 | il polmone | lunga | un polmone, due polmoni |
| 3 | la pelle | hud | una pelle, due pelli |
| 1 | l'esame | undersökning | un esame, due esami |
| 1 | l'analisi | analys | un'analisi, due analisi |
| 2 | la radiografia | röntgen | una radiografia, due radiografie |
| 3 | la risonanza | magnetresonans | una risonanza, due risonanze |
| 2 | l'ecografia | ultraljud | un'ecografia, due ecografie |
| 2 | l'intervento | operation (ingrepp) | un intervento, due interventi |
| 3 | l'anestesia | bedövning | un'anestesia, due anestesie |
| 2 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 2 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 2 | l'ambulatorio | mottagning | un ambulatorio, due ambulatori |
| 2 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 3 | il reparto | avdelning | un reparto, due reparti |
| 3 | il letto | säng | un letto, due letti |
| 3 | il lettino | brits | un lettino, due lettini |
| 3 | la sedia | stol | una sedia, due sedie |
| 1 | la tessera sanitaria | sjukförsäkringskort | una tessera sanitaria, due tessere sanitarie |
| 2 | l'assicurazione | försäkring | un'assicurazione, due assicurazioni |
| 1 | il codice fiscale | personnummer | un codice fiscale, due codici fiscali |
| 1 | il nome | namn | un nome, due nomi |
| 2 | il cognome | efternamn | un cognome, due cognomi |
| 1 | la data di nascita | födelsedatum | una data di nascita, due date di nascita |
| 2 | l'indirizzo | adress | un indirizzo, due indirizzi |
| 2 | il numero di telefono | telefonnummer | un numero di telefono, due numeri di telefono |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 1 | la storia clinica | sjukhistoria | una storia clinica, due storie cliniche |
| 2 | la malattia | sjukdom | una malattia, due malattie |
| 2 | la cura | behandling | una cura, due cure |
| 2 | la terapia | terapi | una terapia, due terapie |
| 3 | la compressa | tablett | una compressa, due compresse |
| 3 | la pomata | salva | una pomata, due pomate |
| 3 | il cerotto | plåster | un cerotto, due cerotti |
| 3 | la benda | förband | una benda, due bende |
| 3 | la goccia | droppe | una goccia, due gocce |
| 1 | l'iniezione | spruta | un'iniezione, due iniezioni |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 2 | il termometro | termometer | un termometro, due termometri |
| 3 | lo stetoscopio | stetoskop | uno stetoscopio, due stetoscopi |
| 2 | la siringa | spruta | una siringa, due siringhe |
| 3 | l'ago | nål | un ago, due aghi |
| 1 | il sintomo | symtom | un sintomo, due sintomi |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 2 | la cartella clinica | journal | una cartella clinica, due cartelle cliniche |
| 3 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 2 | l'infezione | infektion | un'infezione, due infezioni |
| 2 | la frattura | fraktur | una frattura, due fratture |
| 2 | la ferita | sår | una ferita, due ferite |
| 3 | l'ustione | brännskada | un'ustione, due ustioni |
| 3 | la vertigine | yrsel | una vertigine, due vertigini |
| 2 | la stanchezza | trötthet | una stanchezza, due stanchezze |
| 3 | il gonfiore | svullnad | un gonfiore, due gonfiori |
| 3 | il prurito | klåda | un prurito, due pruriti |
| 3 | l'eruzione cutanea | utslag | un'eruzione cutanea, due eruzioni cutanee |
| 2 | il diabete | diabetes | un diabete, due diabeti |
| 3 | l'asma | astma | un'asma, due asme |
| 2 | la gravidanza | graviditet | una gravidanza, due gravidanze |
| 3 | l'allattamento | amning | un allattamento, due allattamenti |
| 2 | la pillola | p-piller | una pillola, due pillole |
| 3 | il riposo | vila | un riposo, due riposi |
| 2 | il peso | vikt | un peso, due pesi |
| 3 | l'altezza | längd | un'altezza, due altezze |
| 1 | la temperatura | temperatur | una temperatura, due temperature |
| 3 | il respiro | andning | un respiro, due respiri |
| 1 | il polso | puls | un polso, due polsi |
| 3 | la spalla | axel | una spalla, due spalle |
| 3 | la caviglia | fotled | una caviglia, due caviglie |
| 3 | la coscia | lår | una coscia, due cosce |
| 3 | il fegato | lever | un fegato, due fegati |
| 3 | il rene | njure | un rene, due reni |
| 2 | il rischio | risk | un rischio, due rischi |
| 2 | la visita di controllo | kontrollbesök | una visita di controllo, due visite di controllo |
| 1 | l'appuntamento | tid | un appuntamento, due appuntamenti |
| 3 | il turno | tur | un turno, due turni |
| 3 | il referto | utlåtande | un referto, due referti |
| 2 | il consenso | samtycke | un consenso, due consensi |
| 2 | il modulo | formulär | un modulo, due moduli |
| 2 | la firma | underskrift | una firma, due firme |
| 2 | l'effetto collaterale | biverkning | un effetto collaterale, due effetti collaterali |
| 2 | la dose | dos | una dose, due dosi |
| 1 | sentire | känna | sento · sente · ho sentito · senta |
| 1 | avere | ha | ho · ha · ho avuto · abbia |
| 1 | fare | göra | faccio · fa · ho fatto · faccia |
| 1 | prendere | ta | prendo · prende · ho preso · prenda |
| 1 | prescrivere | skriva ut | prescrivo · prescrive · ho prescritto · prescriva |
| 1 | visitare | undersöka | visito · visita · ho visitato · visiti |
| 2 | respirare | andas | respiro · respira · ho respirato · respiri |
| 2 | tossire | hosta | tossisco · tossisce · ho tossito · tossisca |
| 2 | vomitare | kräkas | vomito · vomita · ho vomitato · vomiti |
| 1 | aspettare | vänta | aspetto · aspetta · ho aspettato · aspetti |
| 2 | firmare | skriva under | firmo · firma · ho firmato · firmi |
| 2 | riposare | vila | riposo · riposa · ho riposato · riposi |
| 3 | pagare | betala | pago · paga · ho pagato · paghi |
| 3 | chiamare | ringa | chiamo · chiama · ho chiamato · chiami |
| 2 | stare | må | sto · sta · sono stato · stia |
| 1 | mi fa male | det gör ont |  |
| 1 | Dove le fa male? | Var gör det ont? |  |
| 1 | Ho la febbre. | Jag har feber. |  |
| 2 | Ho mal di gola. | Jag har ont i halsen. |  |
| 1 | Non mi sento bene. | Jag mår inte bra. |  |
| 1 | Sono allergico alla penicillina. | Jag är allergisk mot penicillin. |  |
| 1 | Ha qualche allergia? | Har du några allergier? |  |
| 2 | Quanti anni ha? | Hur gammal är du? |  |
| 2 | Ha fumato? | Röker du? |  |
| 2 | Sono incinta. | Jag är gravid. |  |
| 2 | Può ripetere, per favore? | Kan du upprepa, tack? |  |
| 2 | Quando è iniziato il dolore? | När började smärtan? |  |
| 2 | Da quanto tempo? | Hur länge? |  |
| 3 | Ho bisogno di aiuto. | Jag behöver hjälp. |  |
| 2 | Mi può scrivere la ricetta? | Kan du skriva ett recept? |  |
| 1 | Devo prendere una pastiglia tre volte al giorno. | Jag ska ta en tablett tre gånger om dagen. |  |
| 2 | Ha dolore? | Har du ont? |  |
| 2 | Le devo fare un esame? | Ska jag göra ett prov? |  |
