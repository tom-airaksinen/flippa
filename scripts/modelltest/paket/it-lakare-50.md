# Bedömning: it-lakare-50

**Tema:** Hos läkaren  
**Språk:** italienska  
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

### Mbda6c9 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, dei medici |
| 1 | la visita | undersökning | una visita, delle visite |
| 1 | l’appuntamento | tid | un appuntamento, degli appuntamenti |
| 1 | il sintomo | symtom | un sintomo, dei sintomi |
| 1 | il dolore | smärta | un dolore, dei dolori |
| 1 | avere dolore | ha ont | ho dolore · ha dolore · ha avuto · abbia |
| 1 | stare male | må dåligt | sto male · sta male · è stato · stia |
| 1 | sentirsi male | känna sig dålig | mi sento male · si sente male · si è sentito · si senta |
| 1 | la febbre | feber | una febbre, delle febbri |
| 1 | la tosse | hosta | una tosse, delle tossi |
| 1 | il raffreddore | förkylning | un raffreddore, dei raffreddori |
| 1 | il mal di testa | huvudvärk | un mal di testa, dei mal di testa |
| 1 | il mal di gola | halsont | un mal di gola, dei mal di gola |
| 1 | la nausea | illamående | una nausea, delle nausee |
| 1 | la prescrizione | recept | una prescrizione, delle prescrizioni |
| 1 | la medicina | medicin | una medicina, delle medicine |
| 1 | la ricetta | receptblankett | una ricetta, delle ricette |
| 2 | la farmacia | apotek | una farmacia, delle farmacie |
| 1 | la malattia | sjukdom | una malattia, delle malattie |
| 2 | la pressione | blodtryck | una pressione, delle pressioni |
| 2 | la temperatura | temperatur | una temperatura, delle temperature |
| 2 | la gola | hals | una gola, delle gole |
| 2 | la schiena | rygg | una schiena, delle schiene |
| 2 | lo stomaco | mage | uno stomaco, degli stomachi |
| 2 | la testa | huvud | una testa, delle teste |
| 2 | la pancia | mage | una pancia, delle pance |
| 2 | la diarrea | diarré | una diarrea, delle diarree |
| 2 | il vomito | kräkning | un vomito, dei vomiti |
| 2 | la ferita | sår | una ferita, delle ferite |
| 2 | l’allergia | allergi | un’allergia, delle allergie |
| 2 | essere allergico a | vara allergisk mot | sono allergico a · è allergico a · è stato allergico a · sia allergico a |
| 3 | la gravidanza | graviditet | una gravidanza, delle gravidanze |
| 2 | la visita medica | läkarundersökning | una visita medica, delle visite mediche |
| 2 | misurare | mäta | misuro · misura · ha misurato · misuri |
| 2 | respirare | andas | respiro · respira · ha respirato · respiri |
| 2 | tossire | hosta | tossisco · tossisce · ha tossito · tossisca |
| 1 | avere la febbre | ha feber | ho la febbre · ha la febbre · ha avuto · abbia |
| 1 | avere la tosse | ha hosta | ho la tosse · ha la tosse · ha avuto · abbia |
| 1 | avere il raffreddore | vara förkyld | ho il raffreddore · ha il raffreddore · ha avuto · abbia |
| 1 | mi fa male... | det gör ont i ... | mi fa male · gli fa male · ha fatto male · faccia male |
| 1 | Da quanto tempo? | Hur länge? |  |
| 1 | Dove le fa male? | Var gör det ont? |  |
| 2 | Ha qualche allergia? | Har ni någon allergi? |  |
| 2 | Prende dei farmaci? | Tar ni några läkemedel? |  |
| 2 | apra la bocca | öppna munnen | apro · apre · ha aperto · apra |
| 2 | faccia un respiro profondo | ta ett djupt andetag | faccio · fa · ha fatto · faccia |
| 2 | devo fare degli esami | jag måste ta prover | devo fare · deve fare · ha dovuto fare · faccia |
| 2 | l’esame del sangue | blodprov | un esame del sangue, degli esami del sangue |
| 3 | l’urgenza | akutfall | un’urgenza, delle urgenze |
| 3 | il pronto soccorso | akutmottagning | un pronto soccorso, dei pronti soccorsi |

### Mae224d — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | il dottore | doktor | un dottore, due dottori |
| 1 | la dottoressa | kvinnlig doktor | una dottoressa, due dottoresse |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | l'appuntamento | tidsbeställning, bokad tid | un appuntamento, due appuntamenti |
| 1 | la visita medica | läkarundersökning | una visita medica, due visite mediche |
| 1 | la ricetta | recept (medicinskt) | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | il sintomo | symptom | un sintomo, due sintomi |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 1 | la cura | behandling | una cura, due cure |
| 1 | l'ambulatorio | mottagning | un ambulatorio, due ambulatori |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 2 | l'infermiere | sjuksköterska (manlig) | un infermiere, due infermieri |
| 2 | l'infermiera | sjuksköterska (kvinnlig) | un'infermiera, due infermiere |
| 2 | la pressione | blodtryck | una pressione, due pressioni |
| 2 | il sangue | blod | un sangue, – |
| 1 | l'analisi del sangue | blodprov | un'analisi del sangue, due analisi del sangue |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 2 | l'influenza | influensa | un'influenza, due influenze |
| 1 | la pastiglia | tablett | una pastiglia, due pastiglie |
| 2 | l'iniezione | injektion, spruta | un'iniezione, due iniezioni |
| 2 | la radiografia | röntgenbild | una radiografia, due radiografie |
| 2 | lo stomaco | mage | uno stomaco, due stomaci |
| 2 | la gola | hals, strupe | una gola, due gole |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 2 | il polmone | lunga | un polmone, due polmoni |
| 2 | la ferita | sår | una ferita, due ferite |
| 2 | l'allergia | allergi | un'allergia, due allergie |
| 1 | visitare | undersöka (patient) | visito, visita · ho visitato · visiti |
| 1 | prescrivere | skriva ut (recept) | prescrivo, prescrive · ho prescritto · prescriva |
| 1 | guarire | tillfriskna, bota | guarisco, guarisce · sono guarito / ho guarito · guarisca |
| 1 | sentirsi male | må dåligt | mi sento male, si sente male · mi sono sentito male · si senta male |
| 1 | avere mal di testa | ha huvudvärk | ho mal di testa, ha mal di testa · ho avuto mal di testa · abbia mal di testa |
| 2 | avere mal di stomaco | ha ont i magen | ho mal di stomaco, ha mal di stomaco · ho avuto mal di stomaco · abbia mal di stomaco |
| 2 | respirare | andas | respiro, respira · ho respirato · respiri |
| 2 | tossire | hosta (verb) | tossisco, tossisce · ho tossito · tossisca |
| 2 | misurare la febbre | ta tempen | misuro, misura · ho misurato · misuri |
| 1 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronti soccorso |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 3 | la fasciatura | bandage, förband | una fasciatura, due fasciature |
| 3 | il termometro | termometer | un termometro, due termometri |
| 3 | lo specialista | specialist | uno specialista, due specialisti |
| 3 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 1 | Mi fa male qui | Det gör ont här |  |

### M855b83 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | l'appuntamento | bokad tid | un appuntamento, due appuntamenti |
| 1 | la visita | undersökning, läkarbesök | una visita, due visite |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 1 | il sintomo | symptom | un sintomo, due sintomi |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 2 | il mal di gola | halsont | un mal di gola, due mal di gola |
| 2 | il mal di stomaco | magont | un mal di stomaco, due mal di stomaco |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 2 | la compressa | tablett | una compressa, due compresse |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 2 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 2 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 2 | la pressione | blodtryck | una pressione, due pressioni |
| 1 | l'esame del sangue | blodprov | un esame del sangue, due esami del sangue |
| 2 | la radiografia | röntgen | una radiografia, due radiografie |
| 2 | l'iniezione | spruta, injektion | un'iniezione, due iniezioni |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 2 | l'assicurazione sanitaria | sjukförsäkring | un'assicurazione sanitaria, due assicurazioni sanitarie |
| 3 | la tessera sanitaria | sjukvårdskort | una tessera sanitaria, due tessere sanitarie |
| 2 | il certificato medico | läkarintyg | un certificato medico, due certificati medici |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 2 | l'influenza | influensa | un'influenza, due influenze |
| 1 | la nausea | illamående | una nausea, due nausee |
| 2 | la vertigine | yrsel | una vertigine, due vertigini |
| 1 | fare male | göra ont | faccio male · fa male · ho fatto male · faccia male |
| 1 | sentirsi | må, känna sig | mi sento · si sente · mi sono sentito · si senta |
| 2 | prescrivere | skriva ut (recept) | prescrivo · prescrive · ho prescritto · prescriva |
| 2 | respirare | andas | respiro · respira · ho respirato · respiri |
| 3 | misurare | mäta | misuro · misura · ho misurato · misuri |
| 1 | Ho bisogno di un medico. | Jag behöver en läkare. |  |
| 1 | Mi fa male qui. | Det gör ont här. |  |
| 1 | Ho la febbre. | Jag har feber. |  |
| 1 | Sono allergico a... | Jag är allergisk mot... |  |
| 2 | Da quanto tempo ha questi sintomi? | Hur länge har ni haft de här symptomen? |  |
| 2 | Prenda una compressa due volte al giorno. | Ta en tablett två gånger om dagen. |  |
| 1 | Vorrei prendere un appuntamento. | Jag skulle vilja boka en tid. |  |
| 1 | Chiami un'ambulanza! | Ring efter en ambulans! |  |
| 3 | a digiuno | fastande |  |
| 3 | gonfio | svullen |  |
| 2 | la ferita | sår | una ferita, due ferite |
| 3 | il punto di sutura | stygn | un punto di sutura, due punti di sutura |
| 3 | incinta | gravid |  |

### M2a5587 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | il dottore | doktor | un dottore, due dottori |
| 1 | l'infermiere | sjuksköterska | un infermiere, due infermieri |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 2 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 2 | il sintomo | symtom | un sintomo, due sintomi |
| 2 | l'esame del sangue | blodprov | un esame del sangue, due esami del sangue |
| 2 | la pressione sanguigna | blodtryck | una pressione sanguigna, due pressioni sanguigne |
| 2 | l'iniezione | spruta | un'iniezione, due iniezioni |
| 1 | la pillola | tablett | una pillola, due pillole |
| 2 | la compressa | tablett | una compressa, due compresse |
| 1 | l'appuntamento | tidsbokning | un appuntamento, due appuntamenti |
| 2 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 2 | l'infezione | infektion | un'infezione, due infezioni |
| 2 | l'allergia | allergi | un'allergia, due allergie |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 1 | il mal di stomaco | magont | un mal di stomaco, due mal di stomaco |
| 1 | il mal di gola | halsont | un mal di gola, due mal di gola |
| 2 | il mal di schiena | ryggont | un mal di schiena, due mal di schiena |
| 2 | la nausea | illamående | una nausea, due nausee |
| 3 | la vertigine | yrsel | una vertigine, due vertigini |
| 3 | il respiro | andning | un respiro, due respiri |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 2 | lo stomaco | mage | uno stomaco, due stomaci |
| 2 | il cerotto | plåster | un cerotto, due cerotti |
| 3 | la benda | bandage | una benda, due bende |
| 1 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 3 | il vaccino | vaccin | un vaccino, due vaccini |
| 1 | visitare | att undersöka | visito · visita · ho visitato · visiti |
| 2 | curare | att behandla | curo · cura · ho curato · curi |
| 2 | prescrivere | att skriva ut | prescrivo · prescrive · ho prescritto · prescriva |
| 1 | stare male | att må dåligt | sto male · sta male · sono stato male · stia male |
| 2 | vomitare | att kräkas | vomito · vomita · ho vomitato · vomiti |
| 2 | respirare | att andas | respiro · respira · ho respirato · respiri |
| 3 | svenire | att svimma | svengo · sviene · sono svenuto · svenga |
| 3 | sanguinare | att blöda | sanguino · sanguina · ho sanguinato · sanguini |
| 2 | tossire | att hosta | tossisco · tossisce · ho tossito · tossisca |
| 1 | malato | sjuk |  |
| 2 | sano | frisk |  |
| 2 | allergico | allergisk |  |
| 1 | Non mi sento bene | jag mår inte bra |  |

### Ma86ca0 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | la visita | besök | una visita, due visite |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | l'infermiera | sjuksköterska | un'infermiera, due infermiere |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | il mal di testa | huvudvärk | un mal di testa, due mal di testa |
| 1 | la cura | behandling | una cura, due cure |
| 1 | l'appuntamento | tid, bokat besök | un appuntamento, due appuntamenti |
| 1 | la pillola | tablett | una pillola, due pillole |
| 1 | far male | göra ont | faccio male · fa male · ha fatto male · faccia male |
| 1 | sentire | känna | sento · sente · ha sentito · senta |
| 1 | prendere | ta (medicin) | prendo · prende · ha preso · prenda |
| 1 | Mi fa male qui | Det gör ont här |  |
| 1 | Ho la febbre | Jag har feber |  |
| 1 | Non mi sento bene | Jag mår inte bra |  |
| 1 | Dove le fa male? | Var gör det ont? |  |
| 1 | Prenda una pillola ogni otto ore | Ta en tablett var åttonde timme |  |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 1 | la radiografia | röntgenbild | una radiografia, due radiografie |
| 1 | Quanti anni ha? | Hur gammal är du? |  |
| 2 | la farmacia | apotek | una farmacia, due farmacie |
| 2 | la gola | hals | una gola, due gole |
| 2 | lo stomaco | magen | uno stomaco, due stomaci |
| 2 | il braccio | arm | un braccio, due braccia |
| 2 | la gamba | ben | una gamba, due gambe |
| 2 | la schiena | rygg | una schiena, due schiene |
| 2 | l'allergia | allergi | un'allergia, due allergie |
| 2 | la pressione | blodtryck | una pressione, due pressioni |
| 2 | l'analisi del sangue | blodprov | un'analisi del sangue, due analisi del sangue |
| 2 | il termometro | termometer | un termometro, due termometri |
| 2 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 2 | la tessera sanitaria | sjukförsäkringskort | una tessera sanitaria, due tessere sanitarie |
| 2 | la visita di controllo | kontrollbesök | una visita di controllo, due visite di controllo |
| 2 | la vaccinazione | vaccination | una vaccinazione, due vaccinazioni |
| 2 | stare male | må dåligt | sto male · sta male · è stato male · stia male |
| 2 | fare | göra | faccio · fa · ha fatto · faccia |
| 2 | avere | ha | ho · ha · ha avuto · abbia |
| 2 | misurare | mäta | misuro · misura · ha misurato · misuri |
| 2 | Ha delle allergie? | Har du några allergier? |  |
| 2 | Si accomodi | Var så god, ta plats |  |
| 2 | il cuore | hjärta | un cuore, due cuori |
| 3 | il cerotto | plåster | un cerotto, due cerotti |
| 3 | la siringa | spruta | una siringa, due siringhe |
| 3 | l'ambulatorio | mottagning | un ambulatorio, due ambulatori |
| 3 | tossire | hosta | tossisco · tossisce · ha tossito · tossisca |
| 3 | respirare | andas | respiro · respira · ha respirato · respiri |

### M05df09 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | lo studio medico | läkarmottagning | uno studio medico, due studi medici |
| 1 | la visita | läkarbesök | una visita, due visite |
| 1 | la sala d'attesa | väntsal | una sala d'attesa, due sale d'attesa |
| 1 | la ricetta | recept | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la temperatura | temperatur | una temperatura, due temperature |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 1 | la gola | hals | una gola, due gole |
| 1 | la testa | huvud | una testa, due teste |
| 2 | il petto | bröst | un petto, due petti |
| 1 | la pancia | mage | una pancia, due pancie |
| 1 | la schiena | rygg | una schiena, due schiene |
| 2 | il braccio | arm | un braccio, due braccia |
| 2 | la gamba | ben | una gamba, due gambe |
| 2 | la mano | hand | una mano, due mani |
| 2 | il piede | fot | un piede, due piedi |
| 2 | la nausea | illamående | una nausea, due nausee |
| 2 | la diarrea | diarré | una diarrea, due diarree |
| 2 | il vomito | kräkning | un vomito, due vomiti |
| 1 | il sintomo | symtom | un sintomo, due sintomi |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 1 | l'esame | undersökning | un esame, due esami |
| 2 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 2 | la pressione | blodtryck | una pressione, due pressioni |
| 2 | la puntura | spruta | una puntura, due punture |
| 2 | il vaccino | vaccin | un vaccino, due vaccini |
| 2 | l'analisi | analys | un'analisi, due analisi |
| 2 | la radiografia | röntgenbild | una radiografia, due radiografie |
| 2 | la terapia | terapi | una terapia, due terapie |
| 2 | la pillola | tablett | una pillola, due pillole |
| 3 | la polizza sanitaria | sjukförsäkring | una polizza sanitaria, due polizze sanitarie |
| 3 | l'assicurazione | försäkring | un'assicurazione, due assicurazioni |
| 2 | la sala visita | undersökningsrum | una sala visita, due sale visita |
| 2 | l'infermiere | sjuksköterska | un infermiere, due infermieri |
| 2 | l'infermiera | sjuksköterska | un'infermiera, due infermiere |
| 1 | prenotare una visita | boka ett läkarbesök |  |
| 1 | avere febbre | ha feber |  |
| 1 | fare un esame | göra en undersökning |  |
| 2 | prescrivere una medicina | skriva ut medicin | prescrivo… / prescrive… · ho prescritto… · che prescriva |
| 2 | misurare la temperatura | mäta temperaturen |  |
| 2 | fare una puntura | ge en spruta |  |
| 2 | dare una diagnosi | ställa en diagnos |  |
| 2 | riposare | vila | ripos(o) · riposa · ho riposato · che riposi |
| 1 | sentirsi male | må dåligt | mi sento male · si sente male · mi sono sentito/a male · che si senta male |

### Md79d6c — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il dottore | läkare | un dottore, due dottori |
| 1 | la dottoressa | läkare (kvinnlig) | una dottoressa, due dottoresse |
| 1 | il paziente | patient | un paziente, due pazienti |
| 1 | la visita | undersökning | una visita, due visite |
| 1 | la prescrizione | recept | una prescrizione, due prescrizioni |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la ricetta | recept (skrivet) | una ricetta, due ricette |
| 1 | l'analisi | analys | un'analisi, due analisi |
| 1 | la pressione | blodtryck | una pressione, due pressioni |
| 1 | il battito | hjärtslag | un battito, due battiti |
| 1 | la temperatura | temperatur | una temperatura, due temperature |
| 1 | il sintomo | symptom | un sintomo, due sintomi |
| 1 | la malattia | sjukdom | una malattia, due malattie |
| 1 | l'infezione | infektion | un'infezione, due infezioni |
| 1 | la ferita | sår | una ferita, due ferite |
| 2 | la tosse | hosta | una tosse, due tosse |
| 2 | il mal di testa | huvudvärk | un mal di testa, due mali di testa |
| 2 | la febbre | feber | una febbre, due febbri |
| 2 | il dolore | smärta | un dolore, due dolori |
| 2 | la nausea | illamående | una nausea, due nausee |
| 2 | l'emergenza | akut situation | un'emergenza, due emergenze |
| 2 | l'ambulanza | ambulans | un'ambulanza, due ambulanze |
| 2 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 2 | la sala d'attesa | väntsal | una sala d'attesa, due sale d'attesa |
| 2 | l'appuntamento | tid (för möte) | un appuntamento, due appuntamenti |
| 3 | il medico di base | husläkare | un medico di base, due medici di base |
| 3 | l'assicurazione | försäkring | un'assicurazione, due assicurazioni |
| 3 | la cartella clinica | patientjournal | una cartella clinica, due cartelle cliniche |
| 3 | l'esame | undersökning (test) | un esame, due esami |
| 3 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 1 | consultare | konsultera | consulto, consulta·ho consultato·consulti |
| 1 | diagnosticare | diagnostisera | diagnostico, diagnostica·ho diagnosticato·diagnostichi |
| 1 | prescrivere | föreskriva | prescrivo, prescrive·ho prescritto·prescriva |
| 1 | curare | behandla | curo, cura·ho curato·cura |
| 1 | esaminare | undersöka | esamino, esamina·ho esaminato·esamini |
| 1 | misurare | mäta | misuro, misura·ho misurato·misuri |
| 2 | prendere | ta | prendo, prende·ho preso·prenda |
| 2 | analizzare | analysera | analizzo, analizza·ho analizzato·analizzi |
| 2 | raccomandare | rekommendera | raccomando, raccomanda·ho raccomandato·raccomandi |
| 2 | consigliare | ge råd | consiglio, consiglia·ho consigliato·consigli |
| 2 | chiedere | fråga | chiedo, chiede·ho chiesto·chieda |
| 2 | rispondere | svara | rispondo, risponde·ho risposto·risponda |
| 1 | Mi sento male | Jag mår dåligt |  |
| 1 | Ho mal di testa | Jag har huvudvärk |  |
| 1 | Ho la febbre | Jag har feber |  |
| 1 | Ho tosse | Jag hostar |  |
| 2 | Ho nausea | Jag är illamående |  |
| 2 | Vorrei fissare un appuntamento | Jag vill boka en tid |  |
| 2 | Può darmi un rimedio? | Kan du ge mig ett läkemedel? |  |
| 2 | Qual è la diagnosi? | Vad är diagnosen? |  |

### Mf1dedb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | un medico, due medici |
| 1 | il dottore | doktor | un dottore, due dottori |
| 1 | l'ospedale | sjukhus | un ospedale, due ospedali |
| 1 | il pronto soccorso | akutmottagning | un pronto soccorso, due pronto soccorso |
| 1 | la ricetta | recept (läkemedel) | una ricetta, due ricette |
| 1 | la medicina | medicin | una medicina, due medicine |
| 1 | il farmaco | läkemedel | un farmaco, due farmaci |
| 1 | la farmacia | apotek | una farmacia, due farmacie |
| 1 | il dolore | smärta | un dolore, due dolori |
| 1 | la febbre | feber | una febbre, due febbri |
| 1 | la tosse | hosta | una tosse, due tossi |
| 1 | il raffreddore | förkylning | un raffreddore, due raffreddori |
| 1 | l'influenza | influensa | un'influenza, due influenze |
| 1 | l'appuntamento | tidsbokning, läkartid | un appuntamento, due appuntamenti |
| 1 | la visita medica | läkarundersökning | una visita medica, due visite mediche |
| 1 | l'esame | undersökning, prov | un esame, due esami |
| 1 | l'analisi del sangue | blodprov | un'analisi del sangue, due analisi del sangue |
| 1 | la ferita | sår | una ferita, due ferite |
| 1 | la pillola | piller, tablett | una pillola, due pillole |
| 1 | l'allergia | allergi | un'allergia, due allergie |
| 1 | l'infermiere | sjuksköterska | un infermiere, due infermieri |
| 1 | sentirsi male | må dåligt | mi sento · si sente · mi sono sentito · si senta |
| 1 | fare male | göra ont | faccio male · fa male · ha fatto male · faccia male |
| 1 | Mi fa male qui. | Jag har ont här. |  |
| 1 | Ho mal di testa. | Jag har ont i huvudet. |  |
| 1 | Ho mal di gola. | Jag har ont i halsen. |  |
| 2 | la nausea | illamående | una nausea, due nausee |
| 2 | il sintomo | symtom | un sintomo, due sintomi |
| 2 | la diagnosi | diagnos | una diagnosi, due diagnosi |
| 2 | la pressione sanguigna | blodtryck | una pressione sanguigna, due pressioni sanguigne |
| 2 | il cerotto | plåster | un cerotto, due cerotti |
| 2 | la benda | bandage | una benda, due bende |
| 2 | l'antibiotico | antibiotika | un antibiotico, due antibiotici |
| 2 | l'antidolorifico | smärtstillande medel | un antidolorifico, due antidolorifici |
| 2 | la sala d'attesa | väntrum | una sala d'attesa, due sale d'attesa |
| 2 | la puntura | spruta, injektion | una puntura, due punture |
| 2 | la diarrea | diarré | una diarrea, due diarree |
| 2 | il vomito | kräkning | un vomito, due vomiti |
| 2 | il capogiro | yrsel | un capogiro, due capogiri |
| 2 | prescrivere | skriva ut (recept) | prescrivo · prescrive · ha prescritto · prescriva |
| 2 | guarire | tillfriskna, läka | guarisco · guarisce · è guarito · guarisca |
| 2 | respirare | andas | respiro · respira · ha respirato · respiri |
| 2 | il paziente | patient | un paziente, due pazienti |
| 3 | la radiografia | röntgenundersökning | una radiografia, due radiografie |
| 3 | il gesso | gips | un gesso, due gessi |
| 3 | la pomata | salva | una pomata, due pomate |
| 3 | il termometro | termometer | un termometro, due termometri |
| 3 | l'infezione | infektion | un'infezione, due infezioni |
| 3 | lo specialista | specialistläkare | uno specialista, due specialisti |
| 3 | la vaccinazione | vaccination | una vaccinazione, due vaccinazioni |

### M3affbb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | il medico | läkare | medico, medici |
| 1 | la visita | läkarbesök | visita, visite |
| 1 | avere male a | ha ont i | ho male, ha male, ho avuto male, abbia male |
| 1 | il dolore | smärta | dolore, dolori |
| 1 | la febbre | feber | febbre, febbri |
| 1 | la tosse | hosta | tosse, tossi |
| 1 | il raffreddore | förkylning | raffreddore, raffreddori |
| 1 | sentirsi male | må dåligt | mi sento male, si sente male, mi sono sentito male, si senta male |
| 1 | la ricetta | recept | ricetta, ricette |
| 1 | la medicina | medicin | medicina, medicine |
| 1 | l'ospedale | sjukhus | ospedale, ospedali |
| 1 | il pronto soccorso | akutmottagning | pronto soccorso, pronti soccorso |
| 1 | la farmacia | apotek | farmacia, farmacie |
| 1 | la ferita | sår | ferita, ferite |
| 1 | il sintomo | symptom | sintomo, sintomi |
| 1 | la nausea | illamående | nausea, nausee |
| 1 | il mal di testa | huvudvärk | mal di testa, mali di testa |
| 1 | la pressione sanguigna | blodtryck | pressione, pressioni |
| 1 | l'allergia | allergi | allergia, allergie |
| 1 | la diagnosi | diagnos | diagnosi, diagnosi |
| 1 | la cura | behandling | cura, cure |
| 1 | il paziente | patient | paziente, pazienti |
| 2 | la pillola | piller | pillola, pillole |
| 2 | l'iniezione | spruta | iniezione, iniezioni |
| 2 | la febbre alta | hög feber |  |
| 2 | il mal di gola | halsont | mal di gola, mali di gola |
| 2 | il mal di stomaco | magont | mal di stomaco, mali di stomaco |
| 2 | la schiena | rygg | schiena, schiene |
| 2 | la gamba | ben | gamba, gambe |
| 2 | il braccio | arm | braccio, braccia |
| 2 | la testa | huvud | testa, teste |
| 2 | misurare | mäta | misuro, misura, ho misurato, misuri |
| 2 | prendere | ta | prendo, prende, ho preso, prenda |
| 2 | la dose | dos | dose, dosi |
| 2 | il certificato medico | läkarintyg | certificato, certificati |
| 2 | la sala d'attesa | väntrum | sala, sale |
| 3 | il sangue | blod |  |
| 3 | l'esame | undersökning | esame, esami |
| 3 | la radiografia | röntgen | radiografia, radiografie |
| 3 | la frattura | fraktur | frattura, fratture |
| 3 | il gesso | gips | gesso, gessi |
| 3 | la pomata | salva | pomata, pomate |
| 3 | la benda | förband | benda, bende |
| 3 | il battito cardiaco | hjärtslag | battito, battiti |
| 3 | la febbre scende | febern går ner | scendo, scende, sono sceso, scenda |
| 3 | il raffreddore passa | förkylningen går över | passo, passa, ho passato, passa |
| 3 | la guarigione | tillfrisknande | guarigione, guarigioni |
| 3 | il pronto soccorso | akuten | pronto soccorso, pronti soccorso |
| 3 | la visita specialistica | specialistbesök | visita, visite |
| 3 | il termometro | termometer | termometro, termometri |
