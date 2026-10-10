# Bedömning: sw-klinik-150

**Tema:** Infektionsklinik på landsbygden  
**Språk:** swahili  
**Beställt antal glosor:** 150  
**Böjningsfält:** nej, ska vara tomt

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

### Mf1dedb — 167 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | zahanati | dispensär / vårdcentral på landsbygden |  |
| 1 | hospitali ya kijijini | landsbygdssjukhus |  |
| 1 | ugonjwa wa kuambukiza | infektionssjukdom |  |
| 1 | maambukizi | infektion |  |
| 1 | homa | feber |  |
| 1 | malaria | malaria |  |
| 1 | kichocho | snäckfeber (schistosomiasis) |  |
| 1 | kipindupindu | kolera |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | UKIMWI | aids |  |
| 1 | VVU | hiv |  |
| 1 | homa ya matumbo | tyfoidfeber |  |
| 1 | ugonjwa wa kuhara | diarrésjukdom |  |
| 1 | kuhara damu | dysenteri |  |
| 1 | tetanasi | stelkramp |  |
| 1 | kichaa cha mbwa | rabies |  |
| 1 | surua | mässling |  |
| 1 | homa ya manjano | gula febern |  |
| 1 | uti wa mgongo | hjärnhinneinflammation (meningit) |  |
| 1 | dawa ya viuavijasumu | antibiotika |  |
| 1 | dawa ya malaria | malariamedicin |  |
| 1 | chunguza damu | undersöka blod |  |
| 1 | kipimo cha haraka | snabbtest |  |
| 1 | chupa ya dripu | droppflaska / dropp |  |
| 1 | upungufu wa maji mwilini | uttorkning |  |
| 1 | chumvi ya kurejesha maji mwilini (ORS) | vätskeersättning (ORS) |  |
| 1 | sindano | spruta / injektion |  |
| 1 | chanjo | vaccin |  |
| 1 | kuchanja | vaccinera |  |
| 1 | chumba cha kutenga wagonjwa | isoleringsrum |  |
| 1 | wodi ya wagonjwa | sjukhussal |  |
| 1 | mgonjwa | patient / sjuk person |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | mhudumu wa afya vijijini | byhälsoarbetare |  |
| 1 | maabara | laboratorium |  |
| 1 | hadubini | mikroskop |  |
| 1 | kipimajoto | termometer |  |
| 1 | mbu | mygga |  |
| 1 | chandalua chenye dawa | insektsbehandlat myggnät |  |
| 1 | maji safi na salama | rent och säkert vatten |  |
| 1 | kunawa mikono | tvätta händerna |  |
| 1 | sabuni | tvål |  |
| 1 | choo cha shimo | latrin / utedass |  |
| 1 | kikohozi | hosta |  |
| 1 | kohoa | hosta (verb) |  |
| 1 | kuhara | ha diarré |  |
| 1 | kutapika | kräkas |  |
| 1 | kutapika na kuhara | kräkningar och diarré |  |
| 1 | vidonda | sår |  |
| 1 | usaha | var (pus) |  |
| 1 | kidonda kimeambukizwa | infekterat sår |  |
| 1 | dawa ya kuua vijidudu | antiseptiskt medel |  |
| 1 | bendeji | bandage |  |
| 1 | pamba | bomull |  |
| 1 | glavu za matibabu | medicinska handskar |  |
| 1 | barakoa | munskydd |  |
| 1 | kupima damu | ta blodprov |  |
| 1 | sampuli ya kinyesi | avföringsprov |  |
| 1 | sampuli ya mkojo | urinprov |  |
| 1 | sampuli ya makohozi | sputumprov (upphostningsprov) |  |
| 1 | mlipuko wa ugonjwa | sjukdomsutbrott |  |
| 1 | kuenea kwa maambukizi | smittspridning |  |
| 1 | rufaa ya hospitali | sjukhusremiss |  |
| 1 | gari la wagonjwa | ambulans |  |
| 1 | maumivu ya kichwa | huvudvärk |  |
| 1 | maumivu ya tumbo | buksmärta |  |
| 1 | baridi yabisi / homa ya vipindi | frossa |  |
| 1 | kutokwa na jasho usiku | nattsvettningar |  |
| 1 | kupungua uzito | viktnedgång |  |
| 1 | kukosa hamu ya kula | aptitlöshet |  |
| 1 | uchovu mwingi | kraftig utmattning |  |
| 1 | shingo ngumu | nackstyvhet |  |
| 1 | vipele mwilini | hudutslag |  |
| 1 | kupumua kwa shida | andningssvårigheter |  |
| 1 | nimonia / homa ya mapafu | lunginflammation |  |
| 1 | kuumwa na nyoka | ormbett |  |
| 1 | dawa ya sumu ya nyoka | ormserum / motgift |  |
| 1 | kuumwa na mbwa | hundbett |  |
| 1 | kutibu | behandla |  |
| 1 | dawa | medicin / läkemedel |  |
| 1 | vidonge | tabletter |  |
| 1 | kunywa dawa | ta medicin |  |
| 1 | kumeza tembe | svälja piller |  |
| 1 | dawa za kufubaza makali ya virusi (ARV) | bromsmediciner (antiretrovirala) |  |
| 2 | kinga ya mwili | immunförsvar |  |
| 2 | bakteria | bakterie |  |
| 2 | virusi | virus |  |
| 2 | vimelea | parasit |  |
| 2 | fangasi | svampinfektion |  |
| 2 | minyoo | inälvsmask |  |
| 2 | dawa ya minyoo | avmaskningsmedel |  |
| 2 | utapiamlo | undernäring |  |
| 2 | upungufu wa damu | blodbrist (anemi) |  |
| 2 | utasa | sterilitet (hygienisk) |  |
| 2 | kuchemsha maji | koka vatten |  |
| 2 | kutakasa | desinficera |  |
| 2 | taka za matibabu | kliniskt avfall |  |
| 2 | sanduku la sindano zilizotumika | riskavfallsbehållare för kanyler |  |
| 2 | kupima shinikizo la damu | mäta blodtryck |  |
| 2 | kupima kiwango cha oksijeni | mäta syremättnad |  |
| 2 | mashine ya oksijeni | syrgaskoncentrator |  |
| 2 | mrija wa pua | nässond / näsgrimma |  |
| 2 | chujio la maji | vattenfilter |  |
| 2 | kutibu maji kwa klorini | klorera vatten |  |
| 2 | homa ya bonde la ufa | rift valley-feber |  |
| 2 | kimeta | mjältbrand (antrax) |  |
| 2 | ugonjwa wa ngozi | hudsjukdom |  |
| 2 | upele | skabb |  |
| 2 | maambukizi ya njia ya mkojo | urinvägsinfektion |  |
| 2 | homa ya ini | hepatit |  |
| 2 | kuharisha sana | vattnig diarré |  |
| 2 | macho kuwa ya manjano | gula ögonvitor (gulsot) |  |
| 2 | upungufu wa maji mkali | svår uttorkning |  |
| 2 | njaa kali | svår svält |  |
| 2 | kazi ya kujifungua | förlossningsarbete |  |
| 2 | maambukizi ya baada ya kujifungua | puerperalinfektion (barnsängsfeber) |  |
| 2 | dawa za kutuliza maumivu | smärtstillande medel |  |
| 2 | parasetamoli | paracetamol |  |
| 2 | chumba cha dharura | akutmottagning |  |
| 2 | bodi ya afya ya kijiji | byhälsokommitté |  |
| 2 | elimu ya afya | hälsoupplysning |  |
| 2 | kuelimisha jamii | undervisa lokalsamhället |  |
| 2 | chanjo ya watoto | barnvaccination |  |
| 2 | kadi ya chanjo | vaccinationskort |  |
| 2 | karantini | karantän |  |
| 2 | kugusa mgonjwa | röra vid patient |  |
| 2 | maji yasiyo safi | förorenat vatten |  |
| 2 | vyakula vilivyochafuliwa | kontaminerad mat |  |
| 2 | dawa ya kupunguza homa | febernedsättande medicin |  |
| 2 | kuzimia | svimma / medvetslöshet |  |
| 2 | kifafa cha homa | feberkramp |  |
| 2 | jenereta ya umeme | elgenerator |  |
| 2 | friji ya kuhifadhia chanjo | vaccinkylskåp |  |
| 2 | mfumo wa joto la chini (cold chain) | kylkedja |  |
| 3 | maambukizi ya macho (trakoma) | trakom |  |
| 3 | ukoma | spetälska (lepra) |  |
| 3 | ndui ya tumbili | mpox (apkoppor) |  |
| 3 | matende | lymfatisk filarios (elefantiasis) |  |
| 3 | homa ya matumbo inayojirudia | återfallsfeber |  |
| 3 | homa ya duni | denguefeber |  |
| 3 | kijidudu sugu | resistent bakterie |  |
| 3 | kipimo cha PCR | pcr-test |  |
| 3 | dawa ya matone ya macho | ögondroppar |  |
| 3 | stetoskopu | stetoskop |  |
| 3 | kitanda cha kubeba wagonjwa | bår |  |
| 3 | tochi ya daktari | ficklampa för undersökning |  |
| 3 | kuchoma sindano ya misuli | intramuskulär injektion |  |
| 3 | mshipa wa damu | blodkärl / ven |  |
| 3 | chumba cha maiti kijijini | bårhus på landsbygden |  |
| 3 | nguvu ya jua (umeme wa jua) | solenergi / solpaneler |  |
| 3 | uchunguzi wa maiti | obduktion |  |
| 3 | hali ya hatari ya kiafya | medicinskt nödläge |  |
| 3 | usafi wa mazingira | sanitet / miljöhälsa |  |
| 3 | shimo la taka | avfallsgrop |  |
| 3 | eneo lenye maji yaliyotuama | stillastående vattensamling |  |
| 3 | kupulizia dawa ya wadudu | insektsbesprutning inomhus |  |
| 3 | ripoti ya ugonjwa | epidemiologisk rapport |  |
| 3 | kifaa cha kupimia sukari | blodsockermätare |  |
| 3 | mgao wa mgawo wa dawa | läkemedelsransonering |  |
| 3 | kusafirisha sampuli | provtransport |  |
| 3 | kiongozi wa kijiji | byleadare |  |
| 3 | ushirikiano wa kijamii | samhällsengagemang |  |
| 3 | mganga wa jadi | traditionell helare |  |
| 3 | kupiga marufuku mikusanyiko | samlingsförbud |  |
| 3 | kusafisha vidonda | såromläggning |  |
| 3 | kuvaa ovaroli ya kinga | bära skyddsdräkt |  |

### Mbda6c9 — 142 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki ya magonjwa ya kuambukiza | infektionsklinik |  |
| 1 | hospitali ya wilaya | distriktssjukhus |  |
| 1 | kituo cha afya cha vijijini | vårdcentral på landsbygd |  |
| 1 | zahanati | dispensär |  |
| 1 | mgonjwa | patient |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | daktari | läkare |  |
| 1 | mhudumu wa afya | vårdpersonal |  |
| 1 | maambukizi | infektion |  |
| 1 | ugonjwa wa kuambukiza | smittsam sjukdom |  |
| 1 | homa | feber |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkning |  |
| 1 | upungufu wa maji mwilini | uttorkning |  |
| 1 | maumivu | smärta |  |
| 1 | dalili | symtom |  |
| 1 | uchunguzi | undersökning |  |
| 1 | vipimo | prover |  |
| 1 | matibabu | behandling |  |
| 1 | dawa | läkemedel |  |
| 1 | antibiotiki | antibiotika |  |
| 1 | majimaji ya mishipa | dropp |  |
| 1 | chanjo | vaccin |  |
| 1 | kinga | skydd |  |
| 1 | kujikinga na maambukizi | skydd mot smitta |  |
| 1 | kutengwa | isolering |  |
| 1 | uambukizaji | smittspridning |  |
| 1 | barakoa | munskydd |  |
| 1 | glovu | handske |  |
| 1 | kunawa mikono | handtvätt |  |
| 1 | sabuni | tvål |  |
| 1 | dawa ya kuua vijidudu | desinfektionsmedel |  |
| 1 | chumba cha wagonjwa | vårdsal |  |
| 1 | kitanda cha hospitali | sjukhussäng |  |
| 1 | haraka | brådska |  |
| 1 | rufaa | remiss |  |
| 1 | gari la wagonjwa | ambulans |  |
| 1 | malaria | malaria |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | VVU | hiv |  |
| 1 | UKIMWI | aids |  |
| 1 | kipindupindu | kolera |  |
| 1 | homa ya matumbo | tyfoidfeber |  |
| 1 | matone ya mdomo | droppsmitta |  |
| 1 | maji salama | rent vatten |  |
| 1 | choo salama | säker toalett |  |
| 2 | lishe | nutrition |  |
| 2 | udhaifu | svaghet |  |
| 2 | uchovu | trötthet |  |
| 2 | baridi | frossa |  |
| 2 | jasho | svett |  |
| 2 | kupumua kwa shida | andningssvårighet |  |
| 2 | upungufu wa damu | anemi |  |
| 2 | shinikizo la damu | blodtryck |  |
| 2 | mpigo wa moyo | puls |  |
| 2 | joto la mwili | kroppstemperatur |  |
| 2 | kipimo cha malaria | malariatest |  |
| 2 | kipimo cha damu | blodprov |  |
| 2 | mkojo | urin |  |
| 2 | kinyesi | avföring |  |
| 2 | maabara | laboratorium |  |
| 2 | matokeo ya vipimo | provsvar |  |
| 2 | dawa ya malaria | malarialäkemedel |  |
| 2 | dawa za kupunguza homa | febernedsättande |  |
| 2 | vidonge | tablett |  |
| 2 | sindano | injektion |  |
| 2 | kipimo | dos |  |
| 2 | agizo la daktari | läkarordination |  |
| 2 | mapumziko ya kitandani | sängläge |  |
| 2 | mjamzito | gravid person |  |
| 2 | mtoto mchanga | spädbarn |  |
| 2 | mtoto | barn |  |
| 2 | mzee | äldre person |  |
| 2 | mlezi | anhörigvårdare |  |
| 2 | msongamano | trängsel |  |
| 2 | hewa ya kutosha | god ventilation |  |
| 2 | kusafisha | rengöring |  |
| 2 | uchafuzi | kontaminering |  |
| 2 | taka za hospitali | sjukhusavfall |  |
| 2 | sindano iliyotumika | använd spruta |  |
| 2 | chandarua | myggnät |  |
| 2 | kuumwa na mbu | myggbett |  |
| 2 | mlipuko wa ugonjwa | sjukdomsutbrott |  |
| 2 | afisa wa afya | hälsotjänsteman |  |
| 2 | mtoa huduma wa jamii | samhällshälsovårdare |  |
| 2 | elimu ya afya | hälsoupplysning |  |
| 2 | kuenea kwa ugonjwa | sjukdomsspridning |  |
| 2 | safari ndefu | lång resa |  |
| 2 | barabara mbaya | dålig väg |  |
| 2 | umbali mrefu | långt avstånd |  |
| 2 | uhaba wa dawa | läkemedelsbrist |  |
| 2 | uhaba wa wafanyakazi | personalbrist |  |
| 2 | umeme kukatika | strömavbrott |  |
| 2 | jenereta | generator |  |
| 2 | friji ya chanjo | vaccinkyl |  |
| 2 | rekodi ya mgonjwa | patientjournal |  |
| 2 | ridhaa | samtycke |  |
| 2 | mawasiliano | kommunikation |  |
| 3 | lugha ya wenyeji | lokalt språk |  |
| 3 | mkalimani | tolk |  |
| 3 | imani za jadi | traditionella föreställningar |  |
| 3 | mganga wa jadi | traditionell helare |  |
| 3 | unyanyapaa | stigma |  |
| 3 | kufuatilia mgonjwa | uppföljning av patient |  |
| 3 | ziara ya nyumbani | hembesök |  |
| 3 | jamii | samhälle |  |
| 3 | kijiji | by |  |
| 3 | eneo la mbali | avlägset område |  |
| 3 | msimu wa mvua | regnperiod |  |
| 3 | mafuriko | översvämning |  |
| 3 | kisima | brunn |  |
| 3 | tenki la maji | vattentank |  |
| 3 | sabuni ya mikono | handtvål |  |
| 3 | ndoo | hink |  |
| 3 | glovu za uchunguzi | undersökningshandskar |  |
| 3 | mavazi ya kujikinga | skyddskläder |  |
| 3 | oksijeni | syrgas |  |
| 3 | kipumulio | inhalator |  |
| 3 | mrija wa pua | nässlang |  |
| 3 | pazia | skärmvägg |  |
| 3 | foleni | kö |  |
| 3 | usajili | registrering |  |
| 3 | ada ya matibabu | vårdavgift |  |
| 3 | msaada wa kifedha | ekonomiskt stöd |  |
| 3 | bima ya afya | sjukförsäkring |  |
| 3 | simu ya mkononi | mobiltelefon |  |
| 3 | mtandao hafifu | svagt nätverk |  |
| 3 | ushauri nasaha | rådgivning |  |
| 3 | ufafanuzi wa dawa | läkemedelsinformation |  |
| 3 | muda wa kusubiri | väntetid |  |
| 3 | mpango wa chanjo | vaccinationsprogram |  |
| 3 | kampeni ya afya | hälsokampanj |  |
| 3 | usalama wa mgonjwa | patientsäkerhet |  |
| 3 | maambukizi ya hospitalini | sjukhusinfektion |  |
| 3 | kingamwili | antikropp |  |
| 3 | vijidudu | mikrober |  |
| 3 | virusi | virus |  |
| 3 | bakteria | bakterie |  |
| 3 | imeambukiza | smittat |  |
| 3 | amepona | tillfrisknat |  |
| 3 | amefariki | avlidit |  |

### M2a5587 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | klinik |  |
| 1 | hospitali | sjukhus |  |
| 1 | kijiji | by |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | maambukizi | infektion |  |
| 1 | homa | feber |  |
| 1 | daktari | läkare |  |
| 1 | nesi | sjuksköterska |  |
| 1 | mgonjwa | patient |  |
| 1 | dawa | medicin |  |
| 1 | malaria | malaria |  |
| 1 | kipindupindu | kolera |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | virusi | virus |  |
| 1 | bakteria | bakterie |  |
| 1 | damu | blod |  |
| 1 | sindano | spruta |  |
| 1 | kidonge | tablett |  |
| 1 | maji safi | rent vatten |  |
| 1 | usafi | hygien |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkning |  |
| 1 | kukohoa | hosta |  |
| 1 | kupumua | att andas |  |
| 1 | maumivu | smärta |  |
| 1 | kupima | att undersöka |  |
| 1 | kipimo | prov |  |
| 1 | chanjo | vaccin |  |
| 1 | kitanda | säng |  |
| 1 | chandarua | myggnät |  |
| 1 | mbu | mygga |  |
| 1 | choo | toalett |  |
| 1 | sabuni | tvål |  |
| 1 | kuosha mikono | att tvätta händerna |  |
| 1 | kliniki ya vijijini | byklinik |  |
| 1 | huduma ya kwanza | första hjälpen |  |
| 1 | afya | hälsa |  |
| 1 | homa ya matumbo | tyfoidfeber |  |
| 1 | ukimwi | aids |  |
| 1 | vvu | hiv |  |
| 1 | kinga | immunitet |  |
| 1 | kupona | att tillfriskna |  |
| 1 | kufa | att dö |  |
| 1 | matibabu | behandling |  |
| 1 | kutibu | att behandla |  |
| 1 | dalili | symtom |  |
| 1 | kuambukiza | att smitta |  |
| 1 | ugonjwa wa kuambukiza | smittsam sjukdom |  |
| 1 | joto | kroppstemperatur |  |
| 1 | kupima joto | att ta tempen |  |
| 1 | kupima damu | att ta blodprov |  |
| 1 | maabara | laboratorium |  |
| 1 | maji ya kunywa | dricksvatten |  |
| 1 | kuchemsha maji | att koka vatten |  |
| 1 | msaada | hjälp |  |
| 1 | dharura | nödsituation |  |
| 1 | gari la wagonjwa | ambulans |  |
| 1 | barabara ya vumbi | grusväg |  |
| 1 | umbali | avstånd |  |
| 1 | usafiri | transport |  |
| 1 | mjamzito | gravid |  |
| 1 | mtoto | barn |  |
| 1 | mzee | gammal människa |  |
| 1 | udhaifu | svaghet |  |
| 1 | kizunguzungu | yrsel |  |
| 1 | kupoteza fahamu | att svimma |  |
| 1 | kidonda | sår |  |
| 1 | usaha | var |  |
| 1 | kuvimba | svullnad |  |
| 1 | kupumzika | att vila |  |
| 1 | kunywa maji | att dricka vatten |  |
| 1 | kumeza dawa | att svälja medicin |  |
| 1 | dozi | dos |  |
| 1 | kuumwa | att vara sjuk |  |
| 1 | unaumwa wapi? | var har du ont? |  |
| 2 | zahanati | vårdcentral |  |
| 2 | mhudumu wa afya | hälsoarbetare |  |
| 2 | mkunga | barnmorska |  |
| 2 | msaada wa matibabu | medicinsk hjälp |  |
| 2 | foleni | kö |  |
| 2 | kusubiri | att vänta |  |
| 2 | chumba cha wagonjwa | sjuksal |  |
| 2 | chumba cha upasuaji | operationssal |  |
| 2 | upasuaji | operation |  |
| 2 | plasta | plåster |  |
| 2 | bendeji | bandage |  |
| 2 | pamba | bomull |  |
| 2 | glovu | handske |  |
| 2 | barakoa | munskydd |  |
| 2 | dawa ya mbu | myggmedel |  |
| 2 | mazingira | miljö |  |
| 2 | takataka | sopor |  |
| 2 | shimo la taka | sopgrop |  |
| 2 | maji taka | avloppsvatten |  |
| 2 | kisima | brunn |  |
| 2 | ndoo | hink |  |
| 2 | umeme | elektricitet |  |
| 2 | jenereta | generator |  |
| 2 | nishati ya jua | solenergi |  |
| 2 | tochi | ficklampa |  |
| 2 | mshumaa | stearinljus |  |
| 2 | redio | radio |  |
| 2 | mawasiliano | kommunikation |  |
| 2 | simu ya mkononi | mobiltelefon |  |
| 2 | mtandao | nätverk |  |
| 2 | mvua | regn |  |
| 2 | msimu wa mvua | regnperiod |  |
| 2 | matope | lera |  |
| 2 | mafuriko | översvämning |  |
| 2 | ukame | torka |  |
| 2 | njaa | hunger |  |
| 2 | utapiamlo | undernäring |  |
| 2 | chakula | mat |  |
| 2 | uji | gröt |  |
| 2 | maziwa | mjölk |  |
| 2 | sukari | socker |  |
| 2 | chumvi | salt |  |
| 2 | o.r.s. | vätskeersättning |  |
| 2 | mzani | våg |  |
| 2 | kupima uzito | att väga |  |
| 2 | kadi ya kliniki | klinikkort |  |
| 2 | rekodi | journal |  |
| 2 | ushauri | rådgivning |  |
| 2 | kuelimisha | att utbilda |  |
| 2 | mkutano wa kijiji | bymöte |  |
| 3 | baiskeli | cykel |  |
| 3 | pikipiki | motorcykel |  |
| 3 | mkokoteni | handkärra |  |
| 3 | machela | bår |  |
| 3 | mkuu wa kijiji | byhövding |  |
| 3 | mganga wa kienyeji | traditionell helare |  |
| 3 | imani | tro |  |
| 3 | mila | tradition |  |
| 3 | mkalimani | tolk |  |
| 3 | lugha ya asili | lokalt språk |  |
| 3 | mgeni | främling |  |
| 3 | kujitolea | volontär |  |
| 3 | shirika | organisation |  |
| 3 | mradi | projekt |  |
| 3 | ufadhili | finansiering |  |
| 3 | serikali | regering |  |
| 3 | wizara ya afya | hälsoministerium |  |
| 3 | takwimu | statistik |  |
| 3 | ripoti | rapport |  |
| 3 | fomu | blankett |  |
| 3 | saini | namnteckning |  |
| 3 | muhuri | stämpel |  |
| 3 | ofisi | kontor |  |
| 3 | kabati | skåp |  |
| 3 | ufunguo | nyckel |  |

### Md79d6c — 174 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | klinik |  |
| 1 | maambukizi | infektion |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | bakteria | bakterie |  |
| 1 | virusi | virus |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | magonjwa | patient |  |
| 1 | homa | feber |  |
| 1 | kilelezo | hosta |  |
| 1 | kifua | andning |  |
| 1 | maumivu | smärta |  |
| 1 | kuhisi | känna (symptom) |  |
| 1 | kuvimba | svullnad |  |
| 1 | jeraha | sår |  |
| 1 | kuvuja | blodning |  |
| 1 | kuhifadhi | bevara (hygien) |  |
| 1 | usafi | renlighet |  |
| 1 | maji safi | rent vatten |  |
| 1 | sahani | tallrik (för mat) |  |
| 1 | kilimo | jordbruk |  |
| 1 | kijiji | by |  |
| 1 | shamba | fält |  |
| 1 | safari ya afya | hälsoutflykt |  |
| 1 | huduma ya afya | hälso- och sjukvård |  |
| 1 | uchunguzi | undersökning |  |
| 1 | majaribio | test |  |
| 1 | matokeo | resultat |  |
| 1 | dawa | medicin |  |
| 1 | antibiotiki | antibiotika |  |
| 1 | vaccine | vaccin |  |
| 1 | chanjo | vaccination |  |
| 1 | kupima | mäta |  |
| 1 | shinikizo la damu | blodtryck |  |
| 1 | sukari ya damu | blodsocker |  |
| 1 | kupumua | andas |  |
| 1 | kuhisi uchungu | känna smärta |  |
| 1 | kuhisi uchovu | känna trötthet |  |
| 1 | kuhisi joto | känna värme |  |
| 1 | kuhisi baridi | känna kyla |  |
| 1 | kuhisi kizunguzungu | känna yrsel |  |
| 1 | kuhisi kupoteza hamu ya kula | förlora aptit |  |
| 1 | kuhisi kutapika | känna illamående |  |
| 1 | kuhisi kutapika | känna illamående |  |
| 1 | kuhisi kupoteza uzito | förlora vikt |  |
| 1 | kuhisi kupoteza nguvu | känna svaghet |  |
| 1 | kuhisi kuvimba | känna svullnad |  |
| 1 | kuhisi kuvuja | känna blödning |  |
| 1 | kuhisi kutetemeka | känna brännande |  |
| 1 | kuhisi kutetemeka | känna brännande |  |
| 1 | kuhisi kupoteza hamu ya kunywa | förlora törst |  |
| 1 | kuhisi kupoteza hamu ya kulala | förlora sömn |  |
| 1 | kuhisi kupoteza hamu ya kufanya kazi | förlora arbetslust |  |
| 1 | kuhisi kupoteza hamu ya kujifunza | förlora inlärningslust |  |
| 1 | kuhisi kupoteza hamu ya kuzungumza | förlora tallust |  |
| 1 | kuhisi kupoteza hamu ya kusafiri | förlora reselust |  |
| 1 | kuhisi kupoteza hamu ya kucheza | förlora leklust |  |
| 1 | kuhisi kupoteza hamu ya kupenda | förlora kärlekslust |  |
| 2 | kifaa cha kupima joto | termometer |  |
| 2 | kifaa cha kupima shinikizo | blodtrycksmätare |  |
| 2 | kifaa cha kupima sukari | blodsockermätare |  |
| 2 | kifaa cha kupima mwili | stetoskop |  |
| 2 | kifaa cha kupima damu | blodprov |  |
| 2 | kifaa cha kuponya | spruta |  |
| 2 | kifaa cha kuandaa dawa | recept |  |
| 2 | kifaa cha kuandika | anteckningsbok |  |
| 2 | kifaa cha kuwasiliana | mobiltelefon |  |
| 2 | kifaa cha kuendesha gari | bil |  |
| 2 | kifaa cha kuendesha baiskeli | cykel |  |
| 2 | kifaa cha kuendesha pikipiki | motorcykel |  |
| 2 | kifaa cha kuendesha boti | båt |  |
| 2 | kifaa cha kuendesha ndege | flygplan |  |
| 2 | kifaa cha kuendesha treni | tåg |  |
| 2 | kifaa cha kuendesha gari la umma | buss |  |
| 2 | kifaa cha kuendesha gari la malazi | ambulans |  |
| 2 | kifaa cha kuendesha gari la usafiri | taxi |  |
| 2 | kifaa cha kuendesha gari la usafiri wa umma | minibuss |  |
| 2 | kifaa cha kuendesha gari la usafiri wa kibinafsi | privatbil |  |
| 2 | kifaa cha kuendesha gari la usafiri wa mashambani | jordbrukstraktor |  |
| 2 | kifaa cha kuendesha gari la usafiri wa wanyama | djurtransport |  |
| 2 | kifaa cha kuendesha gari la usafiri wa chakula | livsmedelsbil |  |
| 2 | kifaa cha kuendesha gari la usafiri wa dawa | läkemedelsbil |  |
| 2 | kifaa cha kuendesha gari la usafiri wa vifaa | utrustningsbil |  |
| 3 | kijana wa afya | hälsovårdsarbetare |  |
| 3 | kikundi cha afya | hälsogrupp |  |
| 3 | shughuli ya afya | hälsoaktivitet |  |
| 3 | mafunzo ya afya | hälsoutbildning |  |
| 3 | mkusanyiko wa afya | hälsomöte |  |
| 3 | kikundi cha utafiti | forskningsgrupp |  |
| 3 | kikundi cha ushauri | rådgivningsgrupp |  |
| 3 | kikundi cha ulinzi | skyddsgrupp |  |
| 3 | kikundi cha utafiti wa maambukizi | infektionsforskningsgrupp |  |
| 3 | kikundi cha ulinzi wa afya | hälso-skyddsgrupp |  |
| 3 | kikundi cha ulinzi wa jamii | gemenskapsgrupp |  |
| 3 | kikundi cha ulinzi wa wanyama | djurskyddsgrupp |  |
| 3 | kikundi cha ulinzi wa mazingira | miljöskyddsgrupp |  |
| 3 | kikundi cha ulinzi wa maji | vattenskyddsgrupp |  |
| 3 | kikundi cha ulinzi wa chakula | livsmedelssäkerhetsgrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto | barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya wazee | äldrehälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya wanawake | kvinnors hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya wanaume | mäns hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa shule | skolbarnshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa kijiji | bybarnshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa mashambani | landsbygdshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa miji | stadshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa nchi | nationell barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa dunia | global barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa Afrika | afrikansk barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa Asia | asiatisk barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa Amerika | amerikansk barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya watoto wa Ulaya | europeisk barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani | landsbygdshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya miji | stadshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya nchi | nationell hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya dunia | global hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya Afrika | afrikansk hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya Asia | asiatisk hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya Amerika | amerikansk hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya Ulaya | europeisk hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani na miji | kombinerad landsbygd- och stadshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, na nchi | nationell kombinerad hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, na dunia | global kombinerad hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya | världsomspännande kombinerad hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine | internationell kombinerad hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine | global gemenskapsgrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama | global gemenskaps- och djurhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira | global miljö- och hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji | global vatten- och hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula | global livsmedels- och hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto | global barn- och hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee | global äldre- och barnhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake | global kvinnors och barns hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume | global mäns, kvinnors och barns hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii | global samhällshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama | global djur- och samhällshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira | global miljö- och djurhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji | global vatten- och miljöhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula | global livsmedels- och vattenhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba | global jordbrukshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe | global ekosystemhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu | global mänsklig hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi | global vetenskaplig hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia | global teknologisk hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu | global utbildningshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri | global rådgivningshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama | global säkerhetshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi | global förvaltningshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano | global samarbetsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu | global hållbarhetsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo | global utvecklingsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu | global innovationsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa | global internationell samarbetsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda | regional samarbetsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii | gemenskapsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia | familjehälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki | vänskapsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama | djurhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira | miljöhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji | vattenhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula | livsmedelshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba | jordbrukshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe | ekosystemhälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu | mänsklig hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi | vetenskaplig hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia | teknologisk hälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu | utbildningshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri | rådgivningshälsogrupp |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri, na afya ya ushirikiano wa usalama | säkerhetsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri, na afya ya ushirikiano wa usalama, na afya ya ushirikiano wa usimamizi | förvaltningsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri, na afya ya ushirikiano wa usalama, na afya ya ushirikiano wa usimamizi, na afya ya ushirikiano wa maendeleo | utvecklingsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri, na afya ya ushirikiano wa usalama, na afya ya ushirikiano wa usimamizi, na afya ya ushirikiano wa maendeleo, na afya ya ushirikiano wa ubunifu | innovationsgrupp för hälsa |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri, na afya ya ushirikiano wa usalama, na afya ya ushirikiano wa usimamizi, na afya ya ushirikiano wa maendeleo, na afya ya ushirikiano wa ubunifu, na afya ya ushirikiano wa inovation | innovationsgrupp för hälsa (alternativ stavning) |  |
| 3 | kikundi cha ulinzi wa afya ya jamii ya mashambani, miji, nchi, dunia, Afrika, Asia, Amerika, Ulaya, na nchi nyingine, na watu wengine, na wanyama, na mazingira, na maji, na chakula, na afya ya watoto, na afya ya wazee, na afya ya wanawake, na afya ya wanaume, na afya ya jamii, na afya ya wanyama, na afya ya mazingira, na afya ya maji, na afya ya chakula, na afya ya mashamba, na afya ya viumbe, na afya ya binadamu, na afya ya sayansi, na afya ya teknolojia, na afya ya elimu, na afya ya ushauri, na afya ya usalama, na afya ya usimamizi, na afya ya ushirikiano, na afya ya uendelevu, na afya ya maendeleo, na afya ya ubunifu, na afya ya ushirikiano wa kimataifa, na afya ya ushirikiano wa kanda, na afya ya ushirikiano wa jamii, na afya ya ushirikiano wa familia, na afya ya ushirikiano wa marafiki, na afya ya ushirikiano wa wanyama, na afya ya ushirikiano wa mazingira, na afya ya ushirikiano wa maji, na afya ya ushirikiano wa chakula, na afya ya ushirikiano wa mashamba, na afya ya ushirikiano wa viumbe, na afya ya ushirikiano wa binadamu, na afya ya ushirikiano wa sayansi, na afya ya ushirikiano wa teknolojia, na afya ya ushirikiano wa elimu, na afya ya ushirikiano wa ushauri, na afya ya ushirikiano wa usalama, na afya ya ushirikiano wa usimamizi, na afya ya ushirikiano wa maendeleo, na afya ya ushirikiano wa ubunifu, na afya ya ushirikiano wa inovation, na afya ya ushirikiano wa ubunifu | innovationsgrupp för hälsa (slut) |  |

### Ma86ca0 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | en klinik |  |
| 1 | zahanati | en landsbygdsmottagning |  |
| 1 | kituo cha afya | en hälsocentral |  |
| 2 | hospitali | ett sjukhus |  |
| 1 | wodi | en vårdavdelning |  |
| 1 | kitanda | en sjukhussäng |  |
| 3 | chumba cha wagonjwa | ett patientrum |  |
| 3 | chumba cha dharura | ett akutrum |  |
| 1 | mgonjwa | en patient |  |
| 2 | wagonjwa | patienter |  |
| 1 | daktari | en läkare |  |
| 1 | muuguzi | en sjuksköterska |  |
| 1 | mhudumu wa afya wa jamii | en hälsoarbetare i samhället |  |
| 1 | mkunga | en barnmorska |  |
| 1 | mfamasia | en apotekare |  |
| 3 | msaidizi wa maabara | en laboratoriebiträde |  |
| 3 | mtaalamu wa maabara | en laboratorietekniker |  |
| 3 | mkurugenzi wa kliniki | en klinikchef |  |
| 3 | mgeni | en besökare |  |
| 2 | ndugu wa mgonjwa | en anhörig |  |
| 1 | dawa | en medicin |  |
| 1 | kidonge | en tablett |  |
| 1 | sindano | en spruta |  |
| 2 | syrup | en sirap |  |
| 1 | antibiotiki | ett antibiotikum |  |
| 1 | dawa ya malaria | en malariamedicin |  |
| 2 | dawa ya kuua vijidudu | ett desinfektionsmedel |  |
| 1 | chanjo | ett vaccin |  |
| 2 | kupewa chanjo | att vaccineras |  |
| 2 | kipimo | en dos |  |
| 1 | kupima | att testa |  |
| 1 | matokeo | ett resultat |  |
| 1 | chanya | positiv |  |
| 1 | hasi | negativ |  |
| 1 | malaria | malaria |  |
| 1 | homa | feber |  |
| 1 | kuhara | diarré |  |
| 1 | kikohozi | en hosta |  |
| 1 | kutapika | kräkningar |  |
| 1 | maumivu ya kichwa | en huvudvärk |  |
| 1 | maumivu ya tumbo | en magvärk |  |
| 2 | maumivu ya koo | ont i halsen |  |
| 3 | kidonda | ett sår |  |
| 3 | upele | ett utslag |  |
| 3 | jipu | en böld |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | VVU | hiv |  |
| 2 | UKIMWI | aids |  |
| 1 | kolera | kolera |  |
| 1 | surua | mässling |  |
| 2 | homa ya matumbo | tyfoid |  |
| 1 | pepopunda | stelkramp |  |
| 1 | kichaa cha mbwa | rabies |  |
| 2 | kuharisha damu | blodig diarré |  |
| 1 | upungufu wa maji mwilini | uttorkning |  |
| 1 | maji ya chumvi na sukari | saltvatten med socker |  |
| 1 | joto la mwili | kroppstemperatur |  |
| 2 | shinikizo la damu | blodtryck |  |
| 1 | damu | blod |  |
| 1 | sampuli ya damu | ett blodprov |  |
| 1 | mkojo | urin |  |
| 1 | kinyesi | avföring |  |
| 1 | sampuli | ett prov |  |
| 3 | kisukari | diabetes |  |
| 3 | pumu | astma |  |
| 3 | kifafa | epilepsi |  |
| 2 | kuvimba | att svullna |  |
| 1 | kuambukiza | att smitta |  |
| 2 | kuambukizwa | att bli smittad |  |
| 1 | maambukizi | en infektion |  |
| 1 | ugonjwa wa kuambukiza | en smittsam sjukdom |  |
| 1 | mlipuko wa ugonjwa | ett sjukdomsutbrott |  |
| 1 | karantini | en karantän |  |
| 1 | kutenganisha | att isolera |  |
| 1 | barakoa | en ansiktsmask |  |
| 3 | glavu | ett par handskar |  |
| 1 | kunawa mikono | att tvätta händerna |  |
| 1 | sabuni | en tvål |  |
| 1 | maji safi | rent vatten |  |
| 2 | maji machafu | smutsigt vatten |  |
| 2 | usafi | hygien |  |
| 1 | kinga | ett skydd |  |
| 1 | kuzuia | att förebygga |  |
| 1 | mjamzito | gravid |  |
| 1 | mtoto | ett barn |  |
| 2 | mtoto mchanga | ett spädbarn |  |
| 3 | mzee | en äldre person |  |
| 2 | mtu mzima | en vuxen person |  |
| 1 | kupumua | att andas |  |
| 1 | kupumua kwa shida | andningssvårigheter |  |
| 2 | kuzimia | att svimma |  |
| 2 | kufa | att dö |  |
| 1 | hali mbaya | ett allvarligt tillstånd |  |
| 2 | hali nzuri | ett bra tillstånd |  |
| 1 | kupona | att tillfriskna |  |
| 1 | kulazwa hospitalini | att läggas in på sjukhus |  |
| 1 | kutoka hospitalini | att skrivas ut från sjukhus |  |
| 1 | kukagua | att undersöka |  |
| 1 | uchunguzi | en undersökning |  |
| 2 | kumwona daktari | att träffa läkaren |  |
| 2 | historia ya ugonjwa | en sjukdomshistoria |  |
| 1 | dalili | ett symtom |  |
| 2 | dalili za homa | feberssymtom |  |
| 3 | kutetemeka | att darra |  |
| 3 | kutokwa jasho | att svettas |  |
| 2 | kuchoka | att vara trött |  |
| 2 | kichefuchefu | illamående |  |
| 2 | uchovu | trötthet |  |
| 3 | kizunguzungu | yrsel |  |
| 1 | mshtuko | en chock |  |
| 2 | maumivu ya kifua | bröstsmärta |  |
| 3 | mguu | ett ben |  |
| 2 | mkono | en arm |  |
| 3 | kidole | ett finger |  |
| 2 | jeraha | ett sår |  |
| 2 | mfupa uliovunjika | en bruten benknota |  |
| 2 | mfupa | ett ben i skelettet |  |
| 2 | mapafu | lungor |  |
| 2 | moyo | ett hjärta |  |
| 3 | ini | en lever |  |
| 2 | figo | en njure |  |
| 2 | ngozi | en hud |  |
| 3 | macho | ögon |  |
| 2 | sikio | ett öra |  |
| 2 | pua | en näsa |  |
| 2 | mdomo | en mun |  |
| 3 | ulimi | en tunga |  |
| 2 | meno | tänder |  |
| 2 | tumbo | en mage |  |
| 3 | mdudu | en parasit |  |
| 2 | minyoo | maskar |  |
| 2 | mbu | en mygga |  |
| 1 | mbu wa malaria | en malariamygga |  |
| 2 | kuumwa na nyoka | ett ormbett |  |
| 2 | kuumwa na mbwa | ett hundbett |  |
| 3 | sumu | ett gift |  |
| 1 | mtihani wa haraka | ett snabbtest |  |
| 1 | kipimo cha VVU | ett hiv-test |  |
| 1 | kipimo cha malaria | ett malariatest |  |
| 2 | ushauri nasaha | rådgivning |  |
| 1 | kituo cha rufaa | en remissmottagning |  |
| 1 | rufaa | en remiss |  |
| 1 | ambulansi | en ambulans |  |
| 2 | gari la wagonjwa | en sjuktransport |  |
| 3 | barabara mbovu | en dålig väg |  |
| 2 | umeme | el |  |
| 2 | jenereta | en generator |  |
| 2 | kisima | en brunn |  |
| 1 | choo | en latrin |  |
| 1 | dawa za kutosha | tillräckligt med mediciner |  |

### Mae224d — 154 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | hospitali | sjukhus |  |
| 1 | kliniki | klinik |  |
| 1 | maambukizi | infektion |  |
| 1 | mgonjwa | patient |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | matibabu | behandling |  |
| 1 | dawa | medicin |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | homa | feber |  |
| 1 | malaria | malaria |  |
| 1 | kipimo | test/undersökning |  |
| 1 | uchunguzi | diagnos/utredning |  |
| 1 | dalili | symptom |  |
| 1 | chanjo | vaccin |  |
| 1 | sindano | spruta/injektion |  |
| 1 | damu | blod |  |
| 1 | kipimajoto | termometer |  |
| 1 | vijidudu | bakterier/mikrober |  |
| 1 | virusi | virus |  |
| 1 | kuambukiza | att smitta |  |
| 1 | kinga | skydd/immunitet |  |
| 1 | kuzuia | att förebygga |  |
| 1 | kutibu | att behandla |  |
| 1 | kupima | att testa/undersöka |  |
| 1 | wodi | vårdavdelning |  |
| 1 | kitanda cha hospitali | sjukhussäng |  |
| 1 | maabara | laboratorium |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | kipindupindu | kolera |  |
| 1 | UKIMWI | aids |  |
| 1 | VVU | hiv |  |
| 1 | kuharisha | att ha diarré |  |
| 1 | kutapika | att kräkas |  |
| 1 | kikohozi | hosta |  |
| 1 | upungufu wa maji mwilini | uttorkning/dehydrering |  |
| 1 | antibayotiki | antibiotika |  |
| 1 | usafi | hygien/renlighet |  |
| 1 | kunawa mikono | att tvätta händerna |  |
| 1 | karantini | karantän |  |
| 1 | kuenea | att spridas (smitta) |  |
| 1 | mbu | mygga |  |
| 1 | chandarua | myggnät |  |
| 1 | maji safi | rent vatten |  |
| 1 | zahanati | vårdcentral/dispensär |  |
| 1 | kituo cha afya | hälsostation |  |
| 1 | vijijini | på landsbygden |  |
| 1 | jamii | samhälle/gemenskap |  |
| 1 | afya | hälsa |  |
| 1 | mgonjwa wa nje | öppenvårdspatient |  |
| 1 | mgonjwa wa ndani | inneliggande patient |  |
| 1 | kuambukizwa | att bli smittad |  |
| 1 | kuhara damu | att ha blodig diarré |  |
| 1 | hali ya dharura | nödsituation |  |
| 1 | kupona | att tillfriskna |  |
| 1 | kulazwa | att bli inlagd |  |
| 1 | kuruhusiwa | att bli utskriven |  |
| 1 | dozi | dos |  |
| 1 | mfumo wa kinga | immunförsvar |  |
| 1 | kutenga | att isolera |  |
| 1 | chumba cha kutengwa | isoleringsrum |  |
| 1 | mlipuko | utbrott (av sjukdom) |  |
| 1 | janga | epidemi/pandemi |  |
| 1 | ushauri | rådgivning |  |
| 1 | kijiji | by |  |
| 1 | mhudumu wa afya | hälsoarbetare |  |
| 1 | vifaa vya kujikinga | skyddsutrustning |  |
| 1 | glavu | handskar |  |
| 1 | barakoa | munskydd/mask |  |
| 1 | dawa ya kuua vijidudu | desinfektionsmedel |  |
| 2 | maji ya drip | dropp/intravenös vätska |  |
| 2 | hali ya mgonjwa | patientens tillstånd |  |
| 2 | kupumua | att andas |  |
| 2 | upumuaji | andning |  |
| 2 | shinikizo la damu | blodtryck |  |
| 2 | mapigo ya moyo | puls/hjärtslag |  |
| 2 | oksijeni | syrgas |  |
| 2 | upasuaji | kirurgi/operation |  |
| 2 | jeraha | sår |  |
| 2 | uvimbe | svullnad |  |
| 2 | maumivu | smärta |  |
| 2 | kichefuchefu | illamående |  |
| 2 | uchovu | trötthet/utmattning |  |
| 2 | upele | utslag (hud) |  |
| 2 | kuvimba | att svullna/bli inflammerad |  |
| 2 | kuumwa na kichwa | att ha huvudvärk |  |
| 2 | homa ya dengue | denguefeber |  |
| 2 | homa ya matumbo | tyfoidfeber |  |
| 2 | kuhara maji | vattnig diarré |  |
| 2 | surua | mässling |  |
| 2 | tetanasi | stelkramp |  |
| 2 | kichaa cha mbwa | rabies |  |
| 2 | minyoo | maskar/parasiter |  |
| 2 | vimelea | parasiter |  |
| 2 | kuvu | svamp (infektion) |  |
| 2 | usiri | sekretess/konfidentialitet |  |
| 2 | rekodi ya mgonjwa | patientjournal |  |
| 2 | rufaa | remiss |  |
| 2 | ambulansi | ambulans |  |
| 2 | usafiri | transport |  |
| 2 | umbali | avstånd |  |
| 2 | barabara | väg |  |
| 2 | umeme | elektricitet |  |
| 2 | jenereta | generator |  |
| 2 | uhaba wa dawa | medicinbrist |  |
| 2 | ugavi | försörjning/leverans |  |
| 2 | elimu ya afya | hälsoutbildning |  |
| 2 | uhamasishaji | medvetandegörande/kampanj |  |
| 2 | lishe | näring/kost |  |
| 2 | utapiamlo | undernäring |  |
| 2 | mama mjamzito | gravid kvinna |  |
| 2 | mtoto | barn |  |
| 2 | mzee | äldre person |  |
| 2 | wafanyakazi wa afya | hälsopersonal |  |
| 2 | kujitolea | att vara volontär |  |
| 2 | choo | toalett/latrin |  |
| 2 | maji taka | avloppsvatten |  |
| 2 | mazingira | miljö/omgivning |  |
| 2 | kuchemsha maji | att koka vatten |  |
| 2 | kuzuia maambukizi | att förebygga infektioner |  |
| 2 | kupunguza hatari | att minska risk |  |
| 2 | msaada wa kwanza | första hjälpen |  |
| 2 | dawa ya maumivu | smärtstillande |  |
| 2 | vidonge | tabletter |  |
| 2 | mchanganyiko wa chumvi na sukari | vätskeersättning (ORS) |  |
| 2 | sampuli | prov/provtagning |  |
| 2 | matokeo | resultat |  |
| 2 | chanya | positiv (testresultat) |  |
| 2 | hasi | negativ (testresultat) |  |
| 3 | kuripoti | att rapportera |  |
| 3 | ufuatiliaji | uppföljning/övervakning |  |
| 3 | takwimu | statistik |  |
| 3 | sera | serum |  |
| 3 | kiwango cha vifo | dödlighet |  |
| 3 | sugu | kronisk |  |
| 3 | papo hapo | akut |  |
| 3 | kupinga dawa | att vara resistent mot medicin |  |
| 3 | usugu wa dawa | antibiotikaresistens |  |
| 3 | unyanyapaa | stigma |  |
| 3 | imani za jadi | traditionella övertygelser |  |
| 3 | mganga wa jadi | traditionell helare |  |
| 3 | msaada wa kimataifa | internationellt bistånd |  |
| 3 | shirika lisilo la kiserikali | icke-statlig organisation (NGO) |  |
| 3 | bajeti ya afya | hälsobudget |  |
| 3 | bima ya afya | sjukförsäkring |  |
| 3 | gharama za matibabu | vårdkostnader |  |
| 3 | upungufu wa wafanyakazi | personalbrist |  |
| 3 | mafunzo | utbildning/träning |  |
| 3 | hadubini | mikroskop |  |
| 3 | jokofu | kylskåp |  |
| 3 | hifadhi ya chanjo | vaccinförvaring |  |
| 3 | msururu wa baridi | kylkedja |  |
| 3 | nyaraka za mgonjwa | patientdokumentation |  |
| 3 | taarifa ya mlipuko | utbrottsrapport |  |

### M855b83 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | klinik |  |
| 1 | zahanati | vårdcentral |  |
| 1 | hospitali | sjukhus |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | mgonjwa | patient |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | maambukizi | infektioner |  |
| 1 | homa | feber |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkas |  |
| 1 | malaria | malaria |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | UKIMWI | aids |  |
| 1 | VVU | hiv |  |
| 1 | kipindupindu | kolera |  |
| 1 | homa ya matumbo | tyfoidfeber |  |
| 1 | surua | mässling |  |
| 1 | dawa | medicin |  |
| 1 | vidonge | tabletter |  |
| 1 | sindano | spruta |  |
| 1 | chanjo | vaccin |  |
| 1 | kipimo | test |  |
| 1 | kipimo cha damu | blodprov |  |
| 1 | damu | blod |  |
| 1 | kipimo cha malaria | malariatest |  |
| 1 | kipimo cha VVU | hivtest |  |
| 1 | antibiotiki | antibiotika |  |
| 1 | kuambukiza | smitta |  |
| 1 | ugonjwa wa kuambukiza | smittsam sjukdom |  |
| 1 | mbu | mygga |  |
| 1 | chandarua | myggnät |  |
| 1 | maji safi | rent vatten |  |
| 1 | kunawa mikono | tvätta händerna |  |
| 1 | sabuni | tvål |  |
| 1 | kujitenga | isolera sig |  |
| 1 | dalili | symtom |  |
| 1 | maumivu | smärta |  |
| 1 | maumivu ya kichwa | huvudvärk |  |
| 1 | uchovu | trötthet |  |
| 1 | ugumu wa kupumua | andningssvårigheter |  |
| 1 | kipimajoto | febertermometer |  |
| 1 | uchunguzi | undersökning |  |
| 1 | utambuzi | diagnos |  |
| 1 | matibabu | behandling |  |
| 1 | dozi | dos |  |
| 1 | mara mbili kwa siku | två gånger om dagen |  |
| 1 | kabla ya kula | före maten |  |
| 1 | baada ya kula | efter maten |  |
| 1 | kumeza | svälja |  |
| 1 | mjamzito | gravid |  |
| 1 | mtoto | barn |  |
| 1 | mhudumu wa afya ya jamii | hälsoarbetare i byn |  |
| 1 | gari la wagonjwa | ambulans |  |
| 1 | rufaa | remiss |  |
| 1 | kulazwa hospitalini | bli inlagd på sjukhus |  |
| 1 | wodi | vårdavdelning |  |
| 1 | maabara | laboratorium |  |
| 1 | dawa za kupunguza makali ya VVU | antiretrovirala läkemedel |  |
| 1 | kinga | immunförsvar |  |
| 1 | kuzuia | förebygga |  |
| 1 | glovu | handskar |  |
| 1 | barakoa | munskydd |  |
| 1 | Unaumwa wapi? | Var har du ont? |  |
| 1 | Una homa tangu lini? | Hur länge har du haft feber? |  |
| 1 | Unajisikiaje? | Hur mår du? |  |
| 1 | Je, unatapika? | Kräks du? |  |
| 1 | Umekohoa kwa muda gani? | Hur länge har du hostat? |  |
| 1 | Je, una mimba? | Är du gravid? |  |
| 1 | Fungua kinywa | Öppna munnen |  |
| 1 | Chukua dawa hii | Ta den här medicinen |  |
| 1 | Rudi kesho | Kom tillbaka imorgon |  |
| 1 | Je, kuna mtu nyumbani mwenye dalili kama hizi? | Har någon hemma liknande symtom? |  |
| 1 | mzio wa dawa | läkemedelsallergi |  |
| 2 | kuambukizwa | bli smittad |  |
| 2 | mlipuko wa ugonjwa | sjukdomsutbrott |  |
| 2 | janga | pandemi |  |
| 2 | karantini | karantän |  |
| 2 | mtu aliyekutana na mgonjwa | smittkontakt |  |
| 2 | homa ya uti wa mgongo | hjärnhinneinflammation |  |
| 2 | minyoo | inälvsmaskar |  |
| 2 | kichocho | bilharzia |  |
| 2 | homa ya ini | hepatit |  |
| 2 | magonjwa ya zinaa | könssjukdomar |  |
| 2 | kondomu | kondom |  |
| 2 | nimonia | lunginflammation |  |
| 2 | upungufu wa maji mwilini | uttorkning |  |
| 2 | chumvi za kuongeza maji mwilini | vätskeersättning |  |
| 2 | maji ya kunywa | dricksvatten |  |
| 2 | choo | toalett |  |
| 2 | maji machafu | smutsigt vatten |  |
| 2 | kuchemsha maji | koka vatten |  |
| 2 | mtaalamu wa maabara | laboratorietekniker |  |
| 2 | sampuli | prov |  |
| 2 | kinyesi | avföring |  |
| 2 | mkojo | urin |  |
| 2 | makohozi | upphostat slem |  |
| 2 | matokeo | resultat |  |
| 2 | chanya | positiv |  |
| 2 | hasi | negativ |  |
| 2 | kutoa damu | ta blod |  |
| 2 | paracetamol | paracetamol |  |
| 2 | dawa ya kupunguza homa | febernedsättande medel |  |
| 2 | kumaliza dozi | fullfölja kuren |  |
| 2 | madhara ya dawa | biverkningar |  |
| 2 | mtoto mchanga | spädbarn |  |
| 2 | umbali | avstånd |  |
| 2 | familia | familj |  |
| 2 | mkunga | barnmorska |  |
| 2 | kitanda | säng |  |
| 2 | mfamasia | apotekare |  |
| 2 | duka la dawa | apotek |  |
| 2 | kupima | testa |  |
| 2 | jasho | svett |  |
| 2 | kutetemeka | darra |  |
| 2 | upele | utslag |  |
| 2 | kidonda | sår |  |
| 2 | usaha | var |  |
| 2 | kuvimba | svullna |  |
| 2 | koo | hals |  |
| 2 | kifua | bröstkorg |  |
| 2 | tumbo | mage |  |
| 2 | kichwa | huvud |  |
| 2 | kupumua | andas |  |
| 3 | homa ya manjano | gulfeber |  |
| 3 | Ebola | ebola |  |
| 3 | kichaa cha mbwa | rabies |  |
| 3 | pepopunda | stelkramp |  |
| 3 | polio | polio |  |
| 3 | tetekuwanga | vattkoppor |  |
| 3 | kifaduro | kikhosta |  |
| 3 | hadubini | mikroskop |  |
| 3 | friji ya chanjo | vaccinkylskåp |  |
| 3 | ukosefu wa umeme | elavbrott |  |
| 3 | pikipiki | motorcykel |  |
| 3 | kisima | brunn |  |
| 3 | kiongozi wa kijiji | byäldste |  |
| 3 | mganga wa jadi | traditionell healer |  |
| 3 | utapiamlo | undernäring |  |
| 3 | oksijeni | syrgas |  |
| 3 | dripu | dropp |  |
| 3 | homa ya dengue | denguefeber |  |
| 3 | UVIKO-19 | covid-19 |  |
| 3 | chawa | löss |  |
| 3 | viroboto | loppor |  |
| 3 | kupe | fästingar |  |
| 3 | msimu wa mvua | regnperiod |  |
| 3 | simu ya mkononi | mobiltelefon |  |
| 3 | mifugo | boskap |  |

### M3affbb — 148 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | klinik |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | maambukizi | infektion |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | dawa | medicin |  |
| 1 | homa | feber |  |
| 1 | maumivu | smärta |  |
| 1 | kijiji | by |  |
| 1 | hospitali | sjukhus |  |
| 1 | kupima | att testa |  |
| 1 | damu | blod |  |
| 1 | chanjo | vaccin |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | malaria | malaria |  |
| 1 | kipindupindu | kolera |  |
| 1 | ukimwi | hiv/aids |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | maji safi | rent vatten |  |
| 1 | usafi | hygien |  |
| 1 | kinga | skydd |  |
| 1 | kuhudumia | att vårda |  |
| 1 | mgonjwa | patient |  |
| 1 | kifo | död |  |
| 1 | kupona | att tillfriskna |  |
| 1 | kuhisi | att känna |  |
| 1 | dalili | symtom |  |
| 1 | uchunguzi | undersökning |  |
| 1 | kibali | tillstånd |  |
| 2 | chanjo ya watoto | barnvaccination |  |
| 2 | vidonda | sår |  |
| 2 | maambukizi ya ngozi | hudinfektion |  |
| 2 | antibiotiki | antibiotika |  |
| 2 | sindano | spruta |  |
| 2 | kifaa cha matibabu | medicinsk utrustning |  |
| 2 | vifaa vya kinga | skyddsutrustning |  |
| 2 | kujitenga | isolering |  |
| 2 | maambukizi ya hewa | luftburen infektion |  |
| 2 | maambukizi ya maji | vattenburen infektion |  |
| 2 | kuharisha | att ha diarré |  |
| 2 | kutapika | att kräkas |  |
| 2 | kizunguzungu | yrsel |  |
| 2 | uchovu | trötthet |  |
| 2 | kuhitaji msaada | att behöva hjälp |  |
| 2 | kutoa taarifa | att rapportera |  |
| 2 | jamii | samhälle |  |
| 2 | viongozi wa kijiji | byledare |  |
| 2 | elimu ya afya | hälsoupplysning |  |
| 2 | kufundisha | att lära ut |  |
| 3 | kuhifadhi dawa | att förvara medicin |  |
| 3 | friji ya dawa | medicinkyl |  |
| 3 | umeme | el |  |
| 3 | jenereta | generator |  |
| 3 | usafiri | transport |  |
| 3 | gari la wagonjwa | ambulans |  |
| 3 | barabara | väg |  |
| 3 | mvua | regn |  |
| 3 | mafuriko | översvämning |  |
| 3 | wadudu | insekter |  |
| 3 | mbu | mygga |  |
| 3 | chandarua | myggnät |  |
| 3 | dawa ya kuua wadudu | insekticid |  |
| 3 | takataka | avfall |  |
| 3 | kuchoma takataka | att bränna avfall |  |
| 3 | sabuni | tvål |  |
| 3 | kunawa mikono | att tvätta händerna |  |
| 3 | vyoo | toaletter |  |
| 3 | kuchuja maji | att filtrera vatten |  |
| 3 | kuchemsha maji | att koka vatten |  |
| 3 | lishe | näring |  |
| 3 | utapiamlo | undernäring |  |
| 3 | vitamini | vitamin |  |
| 3 | kadi ya afya | hälsokort |  |
| 3 | rekodi | journal |  |
| 3 | kuhifadhi kumbukumbu | att arkivera |  |
| 3 | takwimu | statistik |  |
| 3 | ripoti | rapport |  |
| 3 | kufuatilia | att följa upp |  |
| 3 | kushirikiana | att samarbeta |  |
| 3 | kujitolea | att volontärarbeta |  |
| 3 | mfadhili | donator |  |
| 3 | serikali | regering |  |
| 3 | wizara ya afya | hälsoministerium |  |
| 3 | sera | policy |  |
| 3 | sheria | lag |  |
| 3 | kuhimiza | att uppmuntra |  |
| 3 | kuzuia | att förhindra |  |
| 3 | kueneza | att sprida |  |
| 3 | kudhibiti | att kontrollera |  |
| 3 | kufuatilia mawasiliano | smittspårning |  |
| 3 | karantini | karantän |  |
| 3 | kufunga | att stänga |  |
| 3 | kufungua | att öppna |  |
| 3 | saa za kazi | arbetstid |  |
| 3 | dharura | nödsituation |  |
| 3 | kusaidia | att hjälpa |  |
| 3 | kuokoa | att rädda |  |
| 3 | maisha | liv |  |
| 3 | afya bora | god hälsa |  |
| 3 | kuhudhuria | att närvara |  |
| 3 | kikao | möte |  |
| 3 | majadiliano | diskussion |  |
| 3 | maamuzi | beslut |  |
| 3 | mpango | plan |  |
| 3 | utekelezaji | genomförande |  |
| 3 | kufanikiwa | att lyckas |  |
| 3 | changamoto | utmaning |  |
| 3 | tatizo | problem |  |
| 3 | suluhisho | lösning |  |
| 3 | kujifunza | att lära sig |  |
| 3 | uzoefu | erfarenhet |  |
| 3 | maarifa | kunskap |  |
| 3 | ujuzi | färdighet |  |
| 3 | kufanya kazi | att arbeta |  |
| 3 | timu | team |  |
| 3 | kiongozi | ledare |  |
| 3 | mfanyakazi | anställd |  |
| 3 | mshahara | lön |  |
| 3 | likizo | semester |  |
| 3 | kuchoka | att bli trött |  |
| 3 | kuhimizwa | att bli motiverad |  |
| 3 | heshima | respekt |  |
| 3 | imani | tro |  |
| 3 | utamaduni | kultur |  |
| 3 | lugha | språk |  |
| 3 | kuelewa | att förstå |  |
| 3 | kueleza | att förklara |  |
| 3 | kusikiliza | att lyssna |  |
| 3 | kuuliza | att fråga |  |
| 3 | kujibu | att svara |  |
| 3 | mawasiliano | kommunikation |  |
| 3 | simu | telefon |  |
| 3 | mtandao | nätverk |  |
| 3 | kompyuta | dator |  |
| 3 | barua pepe | e-post |  |
| 3 | kuchapisha | att skriva ut |  |
| 3 | karatasi | papper |  |
| 3 | kalamu | penna |  |
| 3 | ofisi | kontor |  |
| 3 | meza | bord |  |
| 3 | kiti | stol |  |
| 3 | taa | lampa |  |
| 3 | dirisha | fönster |  |
| 3 | mlango | dörr |  |
| 3 | sakafu | golv |  |
| 3 | ukuta | vägg |  |
| 3 | pamoja | tillsammans |  |

### M05df09 — 115 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki ya maambukizi | infektionsklinik |  |
| 1 | maambukizi | infektion |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | mgonjwa | patient |  |
| 1 | kliniki | klinik |  |
| 1 | dawa | medicin |  |
| 1 | matibabu | behandling |  |
| 1 | uchunguzi | undersökning |  |
| 1 | dalili | symtom |  |
| 1 | homa | feber |  |
| 1 | maumivu | smärta |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkning |  |
| 1 | jeraha | sår |  |
| 1 | maambukizi ya bakteria | bakterieinfektion |  |
| 1 | maambukizi ya virusi | virusinfektion |  |
| 1 | vimelea | parasiter |  |
| 1 | antibiotiki | antibiotika |  |
| 1 | kipimo | prov |  |
| 1 | sampuli | provtagning |  |
| 1 | matokeo ya vipimo | provsvar |  |
| 1 | maabara | laboratorium |  |
| 1 | chanjo | vaccin |  |
| 1 | kudungwa sindano | att få en spruta |  |
| 1 | iliyoambukizwa | smittad |  |
| 1 | karantini | karantän |  |
| 1 | taarifa ya afya | hälsoinformation |  |
| 1 | kuosha mikono | handtvätt |  |
| 1 | kusafisha vidonda | sårrengöring |  |
| 2 | mashine ya kupima joto | temperaturmätare |  |
| 2 | shinikizo la damu | blodtryck |  |
| 2 | mapigo ya moyo | puls |  |
| 2 | upumuaji | andning |  |
| 2 | vifaa vya kinga | skyddsutrustning |  |
| 2 | barakoa | munskydd |  |
| 2 | glovu | handske |  |
| 2 | stethoskopi | stetoskop |  |
| 2 | chumba cha uchunguzi | undersökningsrum |  |
| 2 | chumba cha matibabu | behandlingsrum |  |
| 2 | chumba cha kusubiri | väntrum |  |
| 2 | rejea | remiss |  |
| 2 | kupelekwa hospitali | att bli skickad till sjukhus |  |
| 2 | dawa za kutuliza maumivu | smärtstillande medel |  |
| 2 | dawa za kupunguza homa | febernedsättande medel |  |
| 2 | maji safi | rent vatten |  |
| 2 | usafi | hygien |  |
| 2 | mazingira ya vijijini | lantlig miljö |  |
| 2 | umbali | avstånd |  |
| 3 | barabara ya udongo | grusväg |  |
| 3 | usafiri | transport |  |
| 3 | baiskeli | cykel |  |
| 3 | pikipiki | motorcykel |  |
| 3 | gari la wagonjwa | ambulans |  |
| 3 | simu ya mkononi | mobiltelefon |  |
| 3 | mawasiliano | kontakt |  |
| 3 | kukosa dawa | brist på medicin |  |
| 3 | ugavi | försörjning |  |
| 3 | hifadhi ya dawa | läkemedelslager |  |
| 3 | baridi kali | kyla |  |
| 3 | joto kali | hetta |  |
| 3 | mnyoo | mask |  |
| 1 | ugonjwa wa malaria | malariasjukdom |  |
| 2 | ugonjwa wa kifua kikuu | tuberkulossjukdom |  |
| 1 | VVU | hiv |  |
| 1 | UKIMWI | aids |  |
| 1 | kipimo cha haraka | snabbtest |  |
| 2 | maelekezo ya dawa | medicineringens anvisningar |  |
| 1 | kipimo cha damu | blodprov |  |
| 1 | kipimo cha mkojo | urinprov |  |
| 2 | kipimo cha kinyesi | avföringsprov |  |
| 2 | kugundua | upptäcka |  |
| 1 | kuambukiza | smitta |  |
| 1 | kinga | skydd |  |
| 1 | kuzuia maambukizi | förebygga infektion |  |
| 2 | afya ya jamii | folkhälsa |  |
| 3 | mlo bora | bra kost |  |
| 1 | upungufu wa maji mwilini | uttorkning |  |
| 2 | kupona | tillfrisknande |  |
| 3 | mgonjwa wa nje | öppenvårdspatient |  |
| 2 | kulazwa | inläggning |  |
| 1 | matibabu ya dharura | akut behandling |  |
| 1 | dharura | akutläge |  |
| 1 | kupima | testa |  |
| 3 | kupiga simu | ringa |  |
| 3 | maandalizi | förberedelse |  |
| 2 | kufuatilia | följa upp |  |
| 3 | ratiba ya kliniki | klinikens schema |  |
| 2 | kazi ya afya | hälsoarbete |  |
| 2 | mhudumu wa afya | hälsoarbetare |  |
| 2 | elimu ya afya | hälsoinformation |  |
| 1 | ugonjwa wa kuambukiza | smittsam sjukdom |  |
| 2 | kukaa mbali | hålla avstånd |  |
| 2 | kupumzika | vila |  |
| 2 | mavazi ya kinga | skyddskläder |  |
| 3 | taulo safi | ren handduk |  |
| 1 | sabuni | tvål |  |
| 1 | sindano | spruta |  |
| 2 | barua ya rufaa | remissbrev |  |
| 2 | eneo la vijijini | landsbygd |  |
| 1 | kituo cha afya | hälsocentral |  |
| 3 | mfuko wa huduma za afya | hälsoförsäkring |  |
| 3 | mkono wa maji | vattenkran |  |
| 1 | kipimo cha maambukizi | infektionstest |  |
| 2 | kupima haraka | snabbt testa |  |
| 2 | kujali wagonjwa | ta hand om patienter |  |
| 3 | maelewano | samförstånd |  |
| 3 | kuhama | förflyttning |  |
| 2 | mipango ya afya | hälsoinsatser |  |
| 1 | kudhibiti maambukizi | kontrollera infektioner |  |
| 3 | mawasiliano ya haraka | snabb kontakt |  |
| 2 | kupokea wagonjwa | ta emot patienter |  |
| 1 | kutoa dawa | ge medicin |  |
| 2 | maagizo ya nyumbani | hembesökande råd |  |
