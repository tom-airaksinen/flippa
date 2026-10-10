# Bedömning: sw-klinik-50

**Tema:** Infektionsklinik på landsbygden  
**Språk:** swahili  
**Beställt antal glosor:** 50  
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

### M3affbb — 50 glosor

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
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kipimo | test |  |
| 1 | damu | blod |  |
| 1 | chanjo | vaccin |  |
| 1 | maabara | laboratorium |  |
| 1 | kitanda | säng |  |
| 1 | usafi | hygien |  |
| 1 | maji safi | rent vatten |  |
| 1 | kujikinga | skydda sig |  |
| 1 | dalili | symtom |  |
| 1 | kurejea | återbesök |  |
| 2 | kijiji | by |  |
| 2 | jamii | samhälle |  |
| 2 | kuchunguza | undersöka |  |
| 2 | vidonda | sår |  |
| 2 | kizunguzungu | yrsel |  |
| 2 | kutapika | kräkas |  |
| 2 | kuchoka | trötthet |  |
| 2 | sindano | spruta |  |
| 2 | kufunga | förband |  |
| 2 | kuhudumia | att vårda |  |
| 2 | maambukizi ya hewa | luftburen infektion |  |
| 2 | kuzuia | förebygga |  |
| 2 | kadi ya afya | hälsokort |  |
| 2 | kufuatilia | uppföljning |  |
| 3 | mbu | mygga |  |
| 3 | chandarua | myggnät |  |
| 3 | vimelea | parasiter |  |
| 3 | bakteria | bakterier |  |
| 3 | virusi | virus |  |
| 3 | kuharisha | avföring |  |
| 3 | kikohozi kikali | svår hosta |  |
| 3 | ngozi | hud |  |
| 3 | kuchoma | bränna |  |
| 3 | kufunika | täcka |  |
| 3 | elimu ya afya | hälsoupplysning |  |
| 3 | vifaa | utrustning |  |
| 3 | kuhifadhi | förvara |  |
| 3 | barabara | väg |  |
| 3 | usafiri | transport |  |
| 3 | kusaidia | hjälpa |  |

### M2a5587 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | Zahanati | klinik |  |
| 1 | Kijiji | by |  |
| 1 | Maambukizi | infektion |  |
| 1 | Ugonjwa | sjukdom |  |
| 1 | Homa | feber |  |
| 1 | Malaria | malaria |  |
| 1 | Kipindupindu | kolera |  |
| 1 | Daktari | läkare |  |
| 1 | Muuguzi | sjuksköterska |  |
| 1 | Dawa | medicin |  |
| 1 | Mgonjwa | patient |  |
| 1 | Kuhara | diarré |  |
| 1 | Kutapika | kräkning |  |
| 1 | Damu | blod |  |
| 1 | Kipimo cha damu | blodprov |  |
| 1 | Mbu | mygga |  |
| 1 | Chandarua | myggnät |  |
| 1 | Maji safi | rent vatten |  |
| 1 | Usafi | hygien |  |
| 1 | Chanjo | vaccin |  |
| 1 | Antibiotiki | antibiotika |  |
| 1 | Kukohoa | hosta |  |
| 1 | Kifua kikuu | tuberkulos |  |
| 1 | Kliniki | mottagning |  |
| 1 | Matibabu | behandling |  |
| 2 | Kupima | undersökning |  |
| 2 | Maumivu | smärta |  |
| 2 | Kichwa kuuma | huvudvärk |  |
| 2 | Kizunguzungu | yrsel |  |
| 2 | Kupumua kwa shida | andningssvårighet |  |
| 2 | Kuzuia | förebyggande |  |
| 2 | Kupona | tillfrisknande |  |
| 2 | Kifo | dödsfall |  |
| 2 | Dharura | nödsituation |  |
| 2 | Gari la wagonjwa | ambulans |  |
| 2 | Barabara ya vumbi | grusväg |  |
| 2 | Umeme | elektricitet |  |
| 2 | Jenereta | generator |  |
| 2 | Maji ya kunywa | dricksvatten |  |
| 2 | Choo | toalett |  |
| 2 | Kutengwa | isolering |  |
| 3 | Glovu | handske |  |
| 3 | Barakoa | munskydd |  |
| 3 | Sindano | spruta |  |
| 3 | Bandeji | bandage |  |
| 3 | Kipima joto | termometer |  |
| 3 | Mizani | våg |  |
| 3 | Kadi ya kliniki | patientkort |  |
| 3 | Foleni | kö |  |
| 3 | Mhudumu wa afya | hälsoarbetare |  |

### Md79d6c — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | klinik |  |
| 1 | maambukizi | infektion |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | dalili | symptom |  |
| 1 | homa | feber |  |
| 1 | kikohozi | hosta |  |
| 1 | vidonda | sår |  |
| 1 | antibiotiki | antibiotika |  |
| 1 | kipimo | test |  |
| 1 | kipimo cha damu | blodprov |  |
| 1 | kipimo cha mkojo | urinprov |  |
| 1 | malaria | malaria |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | VVU | HIV |  |
| 1 | chanjo | vaccination |  |
| 1 | usafi | renlighet/hygien |  |
| 1 | maji safi | rent vatten |  |
| 1 | usafi wa mikono | handtvätt |  |
| 1 | kijiji | by |  |
| 1 | shamba | landsbygd/farm |  |
| 1 | mfanyakazi wa afya | vårdarbetare/health worker |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | daktari | läkare |  |
| 1 | mgonjwa | patient |  |
| 1 | matibabu | behandling |  |
| 2 | kuhimiza usafi | främja hygien |  |
| 2 | vidonda vidogo | mindre sår |  |
| 2 | maumivu | smärta |  |
| 2 | uvimbe | svullnad |  |
| 2 | kuhara | diarré |  |
| 2 | madoa | utslag |  |
| 2 | sampuli | prov |  |
| 2 | maabara | laboratorium |  |
| 2 | mfanyakazi wa maabara | laboratoriepersonal |  |
| 2 | elimu ya afya | hälsoutbildning |  |
| 2 | afya ya jamii | samhällshälsa |  |
| 2 | kliniki ya haraka | akut klinik |  |
| 2 | usafirishaji wa mgonjwa | patienttransport |  |
| 2 | usalama wa vifaa | utrustningssäkerhet |  |
| 2 | ufuataji | uppföljning |  |
| 2 | rekodi ya afya | sjukjournal |  |
| 2 | dawa | medicin |  |
| 3 | helikopteri ya dharura | ambulanshelikopter |  |
| 3 | telemedicina | telemedicin |  |
| 3 | utafiti | forskning |  |
| 3 | mchango | bidrag/donation |  |
| 3 | shirika lisilo la kiserikali | icke-statlig organisation (NGO) |  |
| 3 | sera ya afya | hälsopolicy |  |
| 3 | mafunzo | utbildning/träning |  |
| 3 | mkutano wa wataalamu | expertmöte |  |

### M05df09 — 51 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki ya maambukizi | infektionsklinik |  |
| 1 | maambukizi | infektion |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | mgonjwa | patient |  |
| 1 | kuambukizwa | bli smittad |  |
| 1 | dalili | symtom |  |
| 1 | homa | feber |  |
| 1 | maumivu | smärta |  |
| 2 | upumuaji | andning |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkas |  |
| 2 | upele | utslag |  |
| 2 | jeraha | sår |  |
| 1 | kujificha kwa ugonjwa | isolering |  |
| 1 | karantini | karantän |  |
| 1 | kuambukiza | smitta |  |
| 1 | chanjo | vaccin |  |
| 2 | kuchanja | vaccinera |  |
| 1 | kipimo | prov |  |
| 1 | kupima | testa |  |
| 2 | matokeo | resultat |  |
| 2 | maabara | laboratorium |  |
| 2 | sampuli | prov |  |
| 1 | dawa | medicin |  |
| 1 | antibiotiki | antibiotika |  |
| 2 | kinga | skydd |  |
| 1 | kunawa mikono | tvätta händerna |  |
| 1 | barakoa | munskydd |  |
| 2 | glovu | handske |  |
| 2 | kitanda cha mgonjwa | sjukhussäng |  |
| 2 | huduma ya afya | vårdtjänst |  |
| 3 | kumbukumbu za mgonjwa | patientjournal |  |
| 2 | rurali | på landsbygden |  |
| 1 | zahanati | vårdcentral |  |
| 2 | huduma ya dharura | akutvård |  |
| 3 | msafiri | resenär |  |
| 1 | mlipuko | utbrott |  |
| 1 | kujitenga | isolera sig |  |
| 2 | kupona | tillfriskna |  |
| 2 | uchunguzi | undersökning |  |
| 2 | kupoteza maji mwilini | uttorkning |  |
| 1 | maambukizi ya virusi | virusinfektion |  |
| 2 | maambukizi ya bakteria | bakterieinfektion |  |
| 2 | kuumwa na mbu | myggbett |  |
| 3 | muhuri wa rufaa | remiss |  |
| 2 | kufuatilia wagonjwa | uppföljning av patienter |  |
| 2 | mazingira safi | ren miljö |  |
| 1 | maji safi | rent vatten |  |
| 3 | uhifadhi wa dawa | läkemedelsförvaring |  |

### Mae224d — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki ya magonjwa ya kuambukiza | infektionsklinik |  |
| 1 | maambukizi | infektion |  |
| 1 | mgonjwa | patient |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | dawa | medicin |  |
| 1 | vipimo vya damu | blodprov |  |
| 1 | homa | feber |  |
| 1 | malaria | malaria |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | kipindupindu | kolera |  |
| 1 | chanjo | vaccin |  |
| 1 | vijidudu | bakterier |  |
| 1 | virusi | virus |  |
| 1 | kinga | skydd/immunitet |  |
| 1 | uchunguzi | undersökning/diagnos |  |
| 1 | matibabu | behandling |  |
| 1 | hospitali | sjukhus |  |
| 1 | zahanati | vårdcentral/dispensär |  |
| 1 | ugonjwa wa kuambukiza | smittsam sjukdom |  |
| 1 | dalili | symptom |  |
| 1 | kupima | testa/undersöka |  |
| 1 | kutibu | behandla |  |
| 1 | kuhara | diarré |  |
| 1 | sindano | spruta/injektion |  |
| 2 | vijijini | på landsbygden |  |
| 2 | usafi | hygien/renlighet |  |
| 2 | maji safi | rent vatten |  |
| 2 | kueneza | sprida (smitta) |  |
| 2 | karantini | karantän |  |
| 2 | viuadudu | antibiotika |  |
| 2 | upungufu wa dawa | medicinbrist |  |
| 2 | kitanda cha hospitali | sjukhussäng |  |
| 2 | wodi | vårdavdelning |  |
| 2 | maabara | laboratorium |  |
| 2 | kutapika | kräkas |  |
| 2 | upele | utslag |  |
| 2 | mbu | mygga |  |
| 2 | chandarua | myggnät |  |
| 2 | kuzuia maambukizi | förebygga infektioner |  |
| 2 | afya ya jamii | folkhälsa |  |
| 2 | msaada wa kwanza | första hjälpen |  |
| 2 | mlipuko | utbrott (av sjukdom) |  |
| 2 | VVU | HIV |  |
| 3 | upungufu wa wataalamu | brist på specialister |  |
| 3 | huduma ya afya | hälsovård |  |
| 3 | mganga wa jadi | traditionell helare |  |
| 3 | elimu ya afya | hälsoupplysning |  |
| 3 | usafiri wa dharura | akuttransport |  |
| 3 | ufuatiliaji | uppföljning/övervakning |  |

### Ma86ca0 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | en klinik |  |
| 1 | zahanati | en hälsostation |  |
| 1 | hospitali | ett sjukhus |  |
| 1 | daktari | en läkare |  |
| 1 | muuguzi | en sjuksköterska |  |
| 1 | mgonjwa | en patient |  |
| 1 | dawa | en medicin |  |
| 2 | vidonge | en tablett |  |
| 1 | sindano | en spruta |  |
| 1 | homa | feber |  |
| 1 | malaria | malaria |  |
| 1 | maambukizi | en infektion |  |
| 1 | kuhara | diarré |  |
| 1 | kikohozi | en hosta |  |
| 1 | maumivu | smärta |  |
| 1 | kipimo cha damu | ett blodprov |  |
| 1 | kupima | att testa |  |
| 1 | shinikizo la damu | ett blodtryck |  |
| 1 | joto la mwili | en kroppstemperatur |  |
| 2 | kidonda | ett sår |  |
| 2 | jeraha | en skada |  |
| 3 | kuvimba | en svullnad |  |
| 2 | kutapika | att kräkas |  |
| 1 | upungufu wa maji mwilini | uttorkning |  |
| 2 | maji ya kunywa | dricksvatten |  |
| 1 | chanjo | ett vaccin |  |
| 1 | antibiotiki | en antibiotika |  |
| 2 | kulazwa | att läggas in |  |
| 2 | wodi | en sjukhusavdelning |  |
| 3 | kitanda | en sjukhussäng |  |
| 2 | mjamzito | gravid |  |
| 2 | mtoto | ett barn |  |
| 1 | dharura | en nödsituation |  |
| 1 | rufaa | en remiss |  |
| 2 | ambulansi | en ambulans |  |
| 3 | sabuni | en tvål |  |
| 2 | kunawa mikono | att tvätta händerna |  |
| 3 | kinga | ett skydd |  |
| 3 | chakula | en mat |  |
| 1 | kupumua kwa shida | en andningssvårighet |  |
| 2 | kipindupindu | kolera |  |
| 3 | homa ya matumbo | tyfoid |  |
| 3 | mganga wa kienyeji | en traditionell healer |  |
| 2 | kuhara damu | blodig diarré |  |
| 3 | kuchanjwa | att vaccineras |  |
| 2 | VVU | hiv |  |
| 2 | kifua kikuu | tuberkulos |  |
| 3 | kichefuchefu | illamående |  |
| 2 | maumivu ya kichwa | en huvudvärk |  |
| 1 | kujifungua | att föda barn |  |

### Mbda6c9 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki ya magonjwa ya kuambukiza | infektionsklinik |  |
| 1 | hospitali ya wilaya | distriktssjukhus |  |
| 1 | kijiji | by |  |
| 1 | eneo la vijijini | landsbygd |  |
| 1 | mgonjwa | patient |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | maambukizi | infektion |  |
| 1 | ugonjwa wa kuambukiza | smittsam sjukdom |  |
| 1 | homa | feber |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkning |  |
| 1 | maumivu | smärta |  |
| 1 | jeraha | sår |  |
| 1 | malaria | malaria |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | VVU | hiv |  |
| 1 | UKIMWI | aids |  |
| 1 | upimaji | testning |  |
| 1 | sampuli | prov |  |
| 1 | matibabu | behandling |  |
| 1 | dawa | medicin |  |
| 1 | chanjo | vaccin |  |
| 1 | kinga | skydd |  |
| 2 | barakoa | munskydd |  |
| 2 | glovu | handske |  |
| 2 | kutenga mgonjwa | isolering |  |
| 2 | kusafisha mikono | handtvätt |  |
| 2 | maji safi | rent vatten |  |
| 2 | choo | toalett |  |
| 2 | usafi wa mazingira | sanitet |  |
| 2 | upungufu wa maji mwilini | uttorkning |  |
| 2 | dripu | dropp |  |
| 2 | kidonge | tablett |  |
| 2 | antibiotiki | antibiotika |  |
| 2 | mbu | mygga |  |
| 2 | chandarua | myggnät |  |
| 2 | zahanati | vårdcentral |  |
| 2 | rufaa | remiss |  |
| 2 | usafiri | transport |  |
| 3 | umbali mrefu | långt avstånd |  |
| 3 | umeme | el |  |
| 3 | jokofu la chanjo | vaccinkyl |  |
| 3 | mlinzi wa afya ya jamii | hälsovolontär |  |
| 3 | mlipuko | utbrott |  |
| 3 | kuripoti kisa | rapportera fall |  |
| 3 | elimu ya afya | hälsoupplysning |  |
| 3 | lishe | nutrition |  |
| 3 | uangalizi | övervakning |  |

### Mf1dedb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | zahanati | landsbygdsklinik |  |
| 1 | homa | feber |  |
| 1 | malaria | malaria |  |
| 1 | kipindupindu | kolera |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | maambukizi | infektion |  |
| 1 | chandarua | myggnät |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkning |  |
| 1 | chanjo | vaccin |  |
| 1 | dawa za viuavijasumu | antibiotika |  |
| 1 | maji safi | rent vatten |  |
| 1 | kupima damu | blodprovstagning |  |
| 1 | sindano | spruta |  |
| 1 | mgonjwa | patient |  |
| 1 | kikohozi | hosta |  |
| 1 | upungufu wa maji mwilini | uttorkning |  |
| 1 | chumvi ya kurejesha maji | vätskeersättning |  |
| 1 | maabara | laboratorium |  |
| 1 | vidonge | tabletter |  |
| 1 | kuzuia maambukizi | smittskydd |  |
| 1 | kutenga mgonjwa | patientisolering |  |
| 1 | kipimajoto | termometer |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 2 | kipimo cha haraka | snabbtest |  |
| 2 | VVU | hiv |  |
| 2 | homa ya matumbo | tyfoidfeber |  |
| 2 | maumivu ya tumbo | buksmärta |  |
| 2 | maumivu ya kichwa | huvudvärk |  |
| 2 | nzi wa tsetse | tsetsefluga |  |
| 2 | ugonjwa wa usingizi | sömnsjuka |  |
| 2 | jeraha lililoambukizwa | infekterat sår |  |
| 2 | dripi | intravenöst dropp |  |
| 2 | dawa ya maumivu | smärtstillande medicin |  |
| 2 | makohozi | upphostning |  |
| 2 | kuosha mikono | handtvätt |  |
| 2 | choo cha shimo | latrin |  |
| 2 | afya ya jamii | folkhälsa |  |
| 2 | mhudumu wa afya | byhälsoarbetare |  |
| 2 | kichocho | snäckfeber |  |
| 3 | kung'atwa na nyoka | ormbett |  |
| 3 | kichaa cha mbwa | rabies |  |
| 3 | kingatiba | profylax |  |
| 3 | rufaa | remiss |  |
| 3 | gari la wagonjwa | ambulans |  |
| 3 | barakoa | munskydd |  |
| 3 | machela | bår |  |
| 3 | glavu za mpira | gummihandskar |  |
| 3 | dawa ya kuua viini | desinfektionsmedel |  |

### M855b83 — 49 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | kliniki | klinik |  |
| 1 | daktari | läkare |  |
| 1 | muuguzi | sjuksköterska |  |
| 1 | mgonjwa | patient |  |
| 1 | ugonjwa | sjukdom |  |
| 1 | maambukizi | infektion |  |
| 1 | kuambukiza | smitta |  |
| 1 | homa | feber |  |
| 1 | kikohozi | hosta |  |
| 1 | kuhara | diarré |  |
| 1 | kutapika | kräkas |  |
| 1 | maumivu | smärta |  |
| 1 | dalili | symptom |  |
| 1 | malaria | malaria |  |
| 1 | kifua kikuu | tuberkulos |  |
| 1 | VVU | HIV |  |
| 1 | UKIMWI | aids |  |
| 1 | kipindupindu | kolera |  |
| 1 | dawa | medicin |  |
| 1 | antibiotiki | antibiotika |  |
| 1 | matibabu | behandling |  |
| 1 | kipimo | test |  |
| 1 | damu | blod |  |
| 1 | chanjo | vaccin |  |
| 1 | kuosha mikono | tvätta händerna |  |
| 2 | zahanati | liten lokal vårdcentral |  |
| 2 | hospitali | sjukhus |  |
| 2 | mhudumu wa afya ya jamii | hälsoarbetare i byn |  |
| 2 | karantini | karantän |  |
| 2 | kipimajoto | termometer |  |
| 2 | maji safi | rent vatten |  |
| 2 | chandarua | myggnät |  |
| 2 | vidonge | tabletter |  |
| 2 | sindano | spruta |  |
| 2 | upele | utslag |  |
| 2 | surua | mässling |  |
| 2 | homa ya matumbo | tyfoidfeber |  |
| 2 | maumivu ya kichwa | huvudvärk |  |
| 2 | uchovu | trötthet |  |
| 2 | kinga | immunförsvar |  |
| 2 | Unajisikiaje? | Hur mår du? |  |
| 3 | barakoa | munskydd |  |
| 3 | glavu | handskar |  |
| 3 | kipimo cha haraka | snabbtest |  |
| 3 | gari la wagonjwa | ambulans |  |
| 3 | kijiji | by |  |
| 3 | mganga wa kienyeji | traditionell healer |  |
| 3 | mbu | mygga |  |
| 3 | choo | toalett |  |
