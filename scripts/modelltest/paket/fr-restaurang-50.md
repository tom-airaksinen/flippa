# Bedömning: fr-restaurang-50

**Tema:** Restaurang och kafé  
**Språk:** franska  
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
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la table | bord | une table, des tables |
| 1 | la carte | meny | une carte, des cartes |
| 2 | le menu | meny | un menu, des menus |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 2 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | commander | beställa | je commande · il commande · j’ai commandé · qu’il commande |
| 1 | payer | betala | je paie · il paie · j’ai payé · qu’il paie |
| 1 | l’addition | nota | une addition, des additions |
| 1 | réserver | boka | je réserve · il réserve · j’ai réservé · qu’il réserve |
| 2 | une réservation | bokning | une réservation, des réservations |
| 2 | une place | plats | une place, des places |
| 3 | être complet | vara fullbokat | je suis complet · il est complet · j’ai été complet · qu’il soit complet |
| 2 | avoir faim | vara hungrig | j’ai faim · il a faim · il a eu faim · qu’il ait faim |
| 2 | avoir soif | vara törstig | j’ai soif · il a soif · il a eu soif · qu’il ait soif |
| 3 | le petit déjeuner | frukost | un petit déjeuner, des petits déjeuners |
| 2 | le déjeuner | lunch | un déjeuner, des déjeuners |
| 2 | le dîner | middag | un dîner, des dîners |
| 1 | le plat | rätt | un plat, des plats |
| 2 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | l’entrée | förrätt | une entrée, des entrées |
| 2 | le dessert | dessert | un dessert, des desserts |
| 1 | la boisson | dryck | une boisson, des boissons |
| 1 | l’eau | vatten | une eau, des eaux |
| 3 | le café allongé | svart kaffe | un café allongé, des cafés allongés |
| 2 | le café au lait | kaffe med mjölk | un café au lait, des cafés au lait |
| 2 | le thé | te | un thé, des thés |
| 2 | le jus d’orange | apelsinjuice | un jus d’orange, des jus d’orange |
| 2 | le verre | glas | un verre, des verres |
| 2 | la tasse | kopp | une tasse, des tasses |
| 2 | la bouteille | flaska | une bouteille, des bouteilles |
| 2 | le pain | bröd | un pain, des pains |
| 3 | le fromage | ost | un fromage, des fromages |
| 3 | la viande | kött | une viande, des viandes |
| 3 | le poisson | fisk | un poisson, des poissons |
| 3 | les légumes | grönsaker | un légume, des légumes |
| 2 | la salade | sallad | une salade, des salades |
| 3 | la soupe | soppa | une soupe, des soupes |
| 2 | le sandwich | smörgås | un sandwich, des sandwiches |
| 3 | la pâtisserie | bakelse | une pâtisserie, des pâtisseries |
| 3 | le croissant | croissant | un croissant, des croissants |
| 1 | s’il vous plaît | snälla |  |
| 1 | je voudrais | jag skulle vilja ha |  |
| 2 | pour moi | för mig |  |
| 2 | c’est tout | det är allt |  |
| 2 | sur place | äta här |  |
| 2 | à emporter | för avhämtning |  |
| 1 | l’addition, s’il vous plaît | notan, tack |  |
| 3 | bon appétit | smaklig måltid |  |

### Md79d6c — 63 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le menu | meny | un menu, deux menus |
| 1 | le serveur | servitör | un serveur, deux serveurs |
| 1 | la serveuse | servitris | une serveuse, deux serveuses |
| 1 | la table | bord | une table, deux tables |
| 1 | le plat | rätt | un plat, deux plats |
| 1 | l'entrée | förrätt | une entrée, deux entrées |
| 1 | le dessert | efterrätt | un dessert, deux desserts |
| 1 | le café | kaffe | un café, deux cafés |
| 1 | le thé | te | un thé, deux thés |
| 1 | le vin | vin | un vin, deux vins |
| 1 | la bière | öl | une bière, deux bières |
| 1 | le jus d'orange | apelsinjuice | un jus d'orange, deux jus d'orange |
| 1 | le pain | bröd | un pain, deux pains |
| 1 | la baguette | baguette | une baguette, deux baguettes |
| 1 | la fourchette | gaffel | une fourchette, deux fourchettes |
| 1 | le couteau | kniv | un couteau, deux couteaux |
| 1 | la cuillère | sked | une cuillère, deux cuillères |
| 1 | le verre | glas | un verre, deux verres |
| 1 | la tasse | kopp | une tasse, deux tasses |
| 1 | le client | kund (man) | un client, deux clients |
| 1 | la cliente | kund (kvinna) | une cliente, deux clientes |
| 1 | le chef | kock | un chef, deux chefs |
| 1 | la cuisine | kök | une cuisine, deux cuisines |
| 1 | la carte | meny (matlista) | une carte, deux cartes |
| 1 | l'addition | nota | une addition, deux additions |
| 1 | la réservation | bokning | une réservation, deux réservations |
| 1 | le pourboire | dricks | un pourboire, deux pourboires |
| 2 | le plat du jour | dagens rätt | un plat du jour, deux plats du jour |
| 2 | le menu du jour | dagens meny | un menu du jour, deux menus du jour |
| 2 | le repas | måltid | un repas, deux repas |
| 2 | la boisson | dryck | une boisson, deux boissons |
| 2 | le snack | snacks | un snack, deux snacks |
| 2 | le croissant | croissant | un croissant, deux croissants |
| 2 | le muffin | muffin | un muffin, deux muffins |
| 2 | le gâteau | kaka | un gâteau, deux gâteaux |
| 2 | la tarte | tårta | une tarte, deux tartes |
| 2 | le chocolat chaud | varmt choklad | un chocolat chaud, deux chocolats chauds |
| 2 | le soda | läsk | un soda, deux sodas |
| 2 | le petit‑déjeuner | frukost | un petit‑déjeuner, deux petits‑déjeuners |
| 2 | le déjeuner | lunch | un déjeuner, deux déjeuners |
| 2 | le dîner | middag | un dîner, deux dîners |
| 2 | le brunch | brunch | un brunch, deux brunchs |
| 1 | commander | beställa | je commande, il commande·j'ai commandé, il ait commandé |
| 1 | réserver | boka (bord) | je réserve, il réserve·j'ai réservé, il ait réservé |
| 1 | payer | betala | je paie, il paie·j'ai payé, il ait payé |
| 1 | demander | fråga, be om | je demande, il demande·j'ai demandé, il ait demandé |
| 1 | goûter | smaka, prova | je goûte, il goûte·j'ai goûté, il ait goûté |
| 1 | servir | servera | je sers, il sert·j'ai servi, il ait servi |
| 1 | préparer | förbereda | je prépare, il prépare·j'ai préparé, il ait préparé |
| 1 | manger | äta | je mange, il mange·j'ai mangé, il ait mangé |
| 1 | boire | dricka | je bois, il boit·j'ai bu, il ait bu |
| 1 | choisir | välja | je choisis, il choisit·j'ai choisi, il ait choisi |
| 1 | recommander | rekommendera | je recommande, il recommande·j'ai recommandé, il ait recommandé |
| 3 | l'ambiance | stämning |  |
| 3 | le comptoir | disk | un comptoir, deux comptoirs |
| 3 | la caisse | kassa | une caisse, deux caisses |
| 3 | le ticket | kvitto | un ticket, deux tickets |
| 3 | le plat principal | huvudrätt | un plat principal, deux plats principaux |
| 3 | le goûter | mellanmål | un goûter, deux goûters |
| 3 | le comptoir | disk (i café) | un comptoir, deux comptoirs |
| 3 | la terrasse | utomhusplats | une terrasse, deux terrasses |
| 3 | le serveur de salle | salsservitör | un serveur de salle, deux serveurs de salle |
| 3 | le barista | barista | un barista, deux baristas |

### M3affbb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la table | bord | une table, des tables |
| 1 | la carte | meny | une carte, des cartes |
| 1 | le menu | fast meny | un menu, des menus |
| 1 | l'addition | nota | une addition, des additions |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | manger | äta | je mange · il mange · a mangé · qu'il mange |
| 1 | boire | dricka | je bois · il boit · a bu · qu'il boive |
| 1 | commander | beställa | je commande · il commande · a commandé · qu'il commande |
| 1 | l'eau | vatten | de l'eau |
| 1 | le vin | vin | un vin, des vins |
| 1 | le plat | rätt | un plat, des plats |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le dessert | efterrätt | un dessert, des desserts |
| 1 | le petit-déjeuner | frukost | un petit-déjeuner, des petits-déjeuners |
| 1 | le déjeuner | lunch | un déjeuner, des déjeuners |
| 1 | le dîner | middag | un dîner, des dîners |
| 1 | payer | betala | je paie · il paie · a payé · qu'il paie |
| 1 | la réservation | bokning | une réservation, des réservations |
| 1 | le verre | glas | un verre, des verres |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 2 | le pourboire | dricks | un pourboire, des pourboires |
| 2 | le pain | bröd | un pain, des pains |
| 2 | le sel | salt | du sel |
| 2 | le poivre | peppar | du poivre |
| 2 | la serviette | servett | une serviette, des serviettes |
| 2 | le café | kaffe | un café, des cafés |
| 2 | le thé | te | un thé, des thés |
| 2 | le sucre | socker | du sucre |
| 2 | le lait | mjölk | du lait |
| 2 | la viande | kött | une viande, des viandes |
| 2 | le poisson | fisk | un poisson, des poissons |
| 2 | les légumes | grönsaker | un légume, des légumes |
| 2 | le fromage | ost | un fromage, des fromages |
| 2 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | la carafe d'eau | karaff med kranvatten | une carafe, des carafes |
| 3 | végétarien | vegetarisk |  |
| 3 | la cuisson | tillagning | une cuisson, des cuissons |
| 3 | saignant | blodig |  |
| 3 | à point | medium |  |
| 3 | bien cuit | välstekt |  |
| 3 | la terrasse | uteservering | une terrasse, des terrasses |
| 3 | le comptoir | bardisk | un comptoir, des comptoirs |
| 3 | la spécialité | specialitet | une spécialité, des spécialités |
| 3 | le pourboire | dricks | un pourboire, des pourboires |
| 3 | goûter | smaka | je goûte · il goûte · a goûté · qu'il goûte |

### Mae224d — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la table | bord | une table, des tables |
| 1 | le menu | meny | un menu, des menus |
| 1 | la carte | matsedel | une carte, des cartes |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | l'addition | nota | une addition, des additions |
| 1 | commander | beställa | je commande, il commande · j'ai commandé · qu'il commande |
| 1 | réserver | reservera | je réserve, il réserve · j'ai réservé · qu'il réserve |
| 1 | le plat | rätt, maträtt | un plat, des plats |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le dessert | dessert | un dessert, des desserts |
| 1 | la boisson | dryck | une boisson, des boissons |
| 1 | l'eau | vatten | une eau, des eaux |
| 1 | le vin | vin | un vin, des vins |
| 1 | la bière | öl | une bière, des bières |
| 1 | le pourboire | dricks | un pourboire, des pourboires |
| 1 | payer | betala | je paie, il paie · j'ai payé · qu'il paie |
| 1 | manger | äta | je mange, il mange · j'ai mangé · qu'il mange |
| 1 | boire | dricka | je bois, il boit · j'ai bu · qu'il boive |
| 1 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 1 | l'assiette | tallrik | une assiette, des assiettes |
| 1 | le verre | glas | un verre, des verres |
| 2 | la tasse | kopp | une tasse, des tasses |
| 2 | la cuillère | sked | une cuillère, des cuillères |
| 2 | le couteau | kniv | un couteau, des couteaux |
| 2 | la fourchette | gaffel | une fourchette, des fourchettes |
| 2 | la serviette | servett | une serviette, des serviettes |
| 2 | la réservation | reservation | une réservation, des réservations |
| 2 | le poisson | fisk | un poisson, des poissons |
| 2 | la viande | kött | une viande, des viandes |
| 2 | la salade | sallad | une salade, des salades |
| 2 | la soupe | soppa | une soupe, des soupes |
| 2 | le fromage | ost | un fromage, des fromages |
| 2 | le pain | bröd | un pain, des pains |
| 2 | le gâteau | tårta, kaka | un gâteau, des gâteaux |
| 2 | le thé | te | un thé, des thés |
| 2 | le jus | juice | un jus, des jus |
| 2 | la terrasse | uteservering | une terrasse, des terrasses |
| 2 | goûter | smaka | je goûte, il goûte · j'ai goûté · qu'il goûte |
| 2 | recommander | rekommendera | je recommande, il recommande · j'ai recommandé · qu'il recommande |
| 2 | délicieux | utsökt, läcker |  |
| 3 | l'apéritif | aperitif | un apéritif, des apéritifs |
| 3 | le chef | kock, köksmästare | un chef, des chefs |
| 3 | la carte des vins | vinlista | une carte des vins, des cartes des vins |
| 3 | le digestif | digestif | un digestif, des digestifs |
| 3 | le supplément | tillägg, extra kostnad | un supplément, des suppléments |
| 3 | l'allergie | allergi | une allergie, des allergies |
| 3 | végétarien | vegetarisk |  |

### Ma86ca0 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | la carte | en meny | une carte, deux cartes |
| 1 | la table | ett bord | une table, deux tables |
| 1 | le serveur | en servitör | un serveur, deux serveurs |
| 1 | la serveuse | en servitris | une serveuse, deux serveuses |
| 1 | l'addition | en nota | une addition, deux additions |
| 1 | le menu | en menyn | un menu, deux menus |
| 1 | l'entrée | en förrätt | une entrée, deux entrées |
| 1 | le plat principal | en huvudrätt | un plat principal, deux plats principaux |
| 1 | le dessert | en efterrätt | un dessert, deux desserts |
| 1 | la boisson | en dryck | une boisson, deux boissons |
| 1 | le vin | ett vin | un vin, deux vins |
| 1 | le café | ett kaffe | un café, deux cafés |
| 1 | le pain | ett bröd | un pain, deux pains |
| 1 | la bière | en öl | une bière, deux bières |
| 1 | la réservation | en bokning | une réservation, deux réservations |
| 1 | réserver | boka | je réserve · il réserve · il a réservé · qu'il réserve |
| 1 | commander | beställa | je commande · il commande · il a commandé · qu'il commande |
| 1 | payer | betala | je paie · il paie · il a payé · qu'il paie |
| 1 | Je voudrais, s'il vous plaît. | Jag skulle vilja ha, tack. |  |
| 1 | Bon appétit ! | Smaklig måltid! |  |
| 1 | Une table pour deux, s'il vous plaît. | Ett bord för två, tack. |  |
| 2 | le thé | ett te | un thé, deux thés |
| 2 | le lait | en mjölk | un lait, deux laits |
| 2 | le sucre | ett socker | un sucre, deux sucres |
| 2 | le beurre | ett smör | un beurre, deux beurres |
| 2 | le fromage | en ost | un fromage, deux fromages |
| 2 | la soupe | en soppa | une soupe, deux soupes |
| 2 | la salade | en sallad | une salade, deux salades |
| 2 | le poisson | en fisk | un poisson, deux poissons |
| 2 | la viande | ett kött | une viande, deux viandes |
| 2 | le poulet | en kyckling | un poulet, deux poulets |
| 2 | les frites | pommes frites | des frites |
| 2 | le couteau | en kniv | un couteau, deux couteaux |
| 2 | la fourchette | en gaffel | une fourchette, deux fourchettes |
| 2 | la cuillère | en sked | une cuillère, deux cuillères |
| 2 | l'assiette | en tallrik | une assiette, deux assiettes |
| 2 | le verre | ett glas | un verre, deux verres |
| 2 | la tasse | en kopp | une tasse, deux tasses |
| 2 | le jus d'orange | en apelsinjuice | un jus d'orange, deux jus d'orange |
| 2 | goûter | smaka | je goûte · il goûte · il a goûté · qu'il goûte |
| 2 | apporter | bära fram | j'apporte · il apporte · il a apporté · qu'il apporte |
| 2 | avoir faim | vara hungrig | j'ai faim · il a faim · il a eu faim · qu'il ait faim |
| 3 | la bouteille | en flaska | une bouteille, deux bouteilles |
| 3 | la serviette | en servett | une serviette, deux serviettes |
| 3 | végétarien | vegetarisk |  |
| 3 | épicé | kryddstark |  |
| 3 | chaud | varm |  |
| 3 | froid | kall |  |
| 3 | le petit-déjeuner | en frukost | un petit-déjeuner, deux petits-déjeuners |
| 3 | le pourboire | ett dricks | un pourboire, deux pourboires |

### M855b83 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | en restaurang | un restaurant, deux restaurants |
| 1 | le café | ett kafé | un café, deux cafés |
| 1 | la carte | en meny | une carte, deux cartes |
| 2 | le menu | en fast meny | un menu, deux menus |
| 1 | la table | ett bord | une table, deux tables |
| 1 | le serveur | en servitör | un serveur, deux serveurs |
| 2 | la serveuse | en servitris | une serveuse, deux serveuses |
| 1 | l'addition | en nota | une addition, deux additions |
| 1 | le pourboire | en dricks | un pourboire, deux pourboires |
| 1 | la réservation | en bokning | une réservation, deux réservations |
| 1 | l'entrée | en förrätt | une entrée, deux entrées |
| 1 | le plat principal | en huvudrätt | un plat principal, deux plats principaux |
| 1 | le plat du jour | en dagens rätt | un plat du jour, deux plats du jour |
| 1 | le dessert | en efterrätt | un dessert, deux desserts |
| 1 | la boisson | en dryck | une boisson, deux boissons |
| 1 | l'eau | vatten | de l'eau, deux eaux |
| 1 | le vin | ett vin | un vin, deux vins |
| 2 | la bière | en öl | une bière, deux bières |
| 1 | le verre | ett glas | un verre, deux verres |
| 2 | la bouteille | en flaska | une bouteille, deux bouteilles |
| 2 | le couteau | en kniv | un couteau, deux couteaux |
| 2 | la fourchette | en gaffel | une fourchette, deux fourchettes |
| 2 | la cuillère | en sked | une cuillère, deux cuillères |
| 2 | l'assiette | en tallrik | une assiette, deux assiettes |
| 2 | la serviette | en servett | une serviette, deux serviettes |
| 2 | le pain | ett bröd | un pain, deux pains |
| 2 | le petit déjeuner | en frukost | un petit déjeuner, deux petits déjeuners |
| 3 | le croissant | en croissant | un croissant, deux croissants |
| 2 | le thé | ett te | un thé, deux thés |
| 3 | le sucre | socker | du sucre, deux sucres |
| 3 | le chef | en kökschef | un chef, deux chefs |
| 3 | la terrasse | en uteservering | une terrasse, deux terrasses |
| 2 | l'allergie | en allergi | une allergie, deux allergies |
| 1 | commander | beställa | je commande · il commande · j'ai commandé · qu'il commande |
| 1 | réserver | boka | je réserve · il réserve · j'ai réservé · qu'il réserve |
| 1 | payer | betala | je paie · il paie · j'ai payé · qu'il paie |
| 1 | manger | äta | je mange · il mange · j'ai mangé · qu'il mange |
| 1 | boire | dricka | je bois · il boit · j'ai bu · qu'il boive |
| 3 | conseiller | rekommendera | je conseille · il conseille · j'ai conseillé · qu'il conseille |
| 3 | goûter | smaka, prova | je goûte · il goûte · j'ai goûté · qu'il goûte |
| 1 | Une table pour deux, s'il vous plaît. | Ett bord för två, tack. |  |
| 1 | L'addition, s'il vous plaît. | Notan, tack. |  |
| 1 | Je voudrais… | Jag skulle vilja ha … |  |
| 1 | Bon appétit ! | Smaklig måltid! |  |
| 2 | Qu'est-ce que vous me conseillez ? | Vad rekommenderar ni? |  |
| 2 | Je suis végétarien. | Jag är vegetarian. |  |
| 2 | Santé ! | Skål! |  |
| 2 | C'est délicieux. | Det är utsökt. |  |
| 2 | Est-ce que vous acceptez les cartes ? | Tar ni kort? |  |
| 3 | à emporter | att ta med |  |

### M05df09 — 49 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le menu | meny | un menu, des menus |
| 1 | la carte | meny | une carte, des cartes |
| 1 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | commander | att beställa | je commande, il commande · j'ai commandé · qu'il commande |
| 1 | réserver | att boka | je réserve, il réserve · j'ai réservé · qu'il réserve |
| 1 | le café | kaffe | un café, des cafés |
| 1 | l'eau | vatten | de l'eau, des eaux |
| 1 | le pain | bröd | un pain, des pains |
| 1 | l'addition | nota | une addition, des additions |
| 1 | payer | att betala | je paie, il paie · j'ai payé · qu'il paie |
| 1 | la table | bord | une table, des tables |
| 1 | une chaise | stol | une chaise, des chaises |
| 1 | le petit-déjeuner | frukost | un petit-déjeuner, des petits-déjeuners |
| 1 | le déjeuner | lunch | un déjeuner, des déjeuners |
| 1 | le dîner | middag | un dîner, des dîners |
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 2 | la boisson | dryck | une boisson, des boissons |
| 2 | le plat | rätt | un plat, des plats |
| 2 | l'entrée | förrätt | une entrée, des entrées |
| 2 | le dessert | dessert | un dessert, des desserts |
| 2 | le vin | vin | un vin, des vins |
| 2 | la bière | öl | une bière, des bières |
| 2 | le thé | te | un thé, des thés |
| 2 | le sucre | socker | un sucre, des sucres |
| 2 | la facture | faktura | une facture, des factures |
| 2 | la spécialité | specialitet | une spécialité, des spécialités |
| 3 | le couvert | bestick | un couvert, des couverts |
| 3 | la nappe | bordsduk | une nappe, des nappes |
| 3 | le pourboire | dricks | un pourboire, des pourboires |
| 3 | à emporter | för avhämtning |  |
| 3 | sur place | på plats |  |
| 1 | avoir faim | att vara hungrig | j'ai faim, il a faim · j'ai eu faim · qu'il ait faim |
| 1 | avoir soif | att vara törstig | j'ai soif, il a soif · j'ai eu soif · qu'il ait soif |
| 1 | manger | att äta | je mange, il mange · j'ai mangé · qu'il mange |
| 1 | boire | att dricka | je bois, il boit · j'ai bu · qu'il boive |
| 3 | l'ardoise | tavla med dagens erbjudanden | une ardoise, des ardoises |
| 2 | la réservation | bokning | une réservation, des réservations |
| 3 | sans gluten | glutenfri |  |
| 2 | végétarien | vegetarisk |  |
| 2 | chaud | varm |  |
| 2 | froid | kall |  |
| 3 | l'important | det viktiga | un important, des importants |
| 2 | le goût | smak | un goût, des goûts |
| 2 | délicieux | utsökt |  |
| 3 | salé | salt |  |
| 3 | sucré | söt |  |

### Mf1dedb — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la table | bord | une table, des tables |
| 1 | le menu | meny | un menu, des menus |
| 1 | la carte | matsedel | une carte, des cartes |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | commander | beställa | je commande, il commande · j'ai commandé · qu'il commande |
| 1 | l'addition | nota | une addition, des additions |
| 1 | payer | betala | je paie, il paie · j'ai payé · qu'il paie |
| 1 | réserver | reservera / boka | je réserve, il réserve · j'ai réservé · qu'il réserve |
| 1 | l'eau | vatten | une eau, des eaux |
| 1 | le plat principal | varmrätt | un plat principal, des plats principaux |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le dessert | efterrätt | un dessert, des desserts |
| 1 | le verre | glas | un verre, des verres |
| 1 | l'assiette | tallrik | une assiette, des assiettes |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 1 | le pain | bröd | un pain, des pains |
| 1 | le vin | vin | un vin, des vins |
| 1 | la carafe d'eau | vattenkaraff | une carafe d'eau, des carafes d'eau |
| 1 | Une table pour deux, s'il vous plaît. | Ett bord för två, tack. |  |
| 1 | L'addition, s'il vous plaît. | Notan, tack. |  |
| 2 | la boisson | dryck | une boisson, des boissons |
| 2 | la bière | öl | une bière, des bières |
| 2 | le thé | te | un thé, des thés |
| 2 | le pourboire | dricks | un pourboire, des pourboires |
| 2 | la serviette | servett | une serviette, des serviettes |
| 2 | le sel | salt | un sel, des sels |
| 2 | le poivre | peppar | un poivre, des poivres |
| 2 | le sucre | socker | un sucre, des sucres |
| 2 | la terrasse | uteservering | une terrasse, des terrasses |
| 2 | la formule | lunchmeny / fast meny | une formule, des formules |
| 2 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | saignant | blodig / lättstekt |  |
| 2 | à point | mediumstekt |  |
| 2 | bien cuit | genomstekt |  |
| 2 | végétarien | vegetarisk |  |
| 2 | le croissant | croissant | un croissant, des croissants |
| 2 | délicieux | utsökt / god |  |
| 3 | l'apéritif | fördrink / aperitif | un apéritif, des apéritifs |
| 3 | le digestif | digestif / avec | un digestif, des digestifs |
| 3 | le sommelier | sommelier | un sommelier, des sommeliers |
| 3 | la paille | sugrör | une paille, des pailles |
| 3 | l'huile d'olive | olivolja | une huile d'olive, des huiles d'olive |
| 3 | le vinaigre | vinäger | un vinaigre, des vinaigres |
| 3 | le plateau de fromages | ostbricka | un plateau de fromages, des plateaux de fromages |
| 3 | le cure-dent | tandpetare | un cure-dent, des cure-dents |

### M2a5587 — 50 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la carte | meny | une carte, des cartes |
| 1 | le menu | fast meny | un menu, des menus |
| 1 | le serveur | kypare | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | l'addition | nota | une addition, des additions |
| 1 | le pourboire | dricks | un pourboire, des pourboires |
| 1 | la table | bord | une table, des tables |
| 1 | le verre | glas | un verre, des verres |
| 1 | l'assiette | tallrik | une assiette, des assiettes |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 1 | la serviette | servett | une serviette, des serviettes |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le plat principal | huvudrätt | un plat principal, des plats principaux |
| 1 | le dessert | efterrätt | un dessert, des desserts |
| 1 | la boisson | dryck | une boisson, des boissons |
| 1 | l'eau | vatten | une eau, des eaux |
| 1 | le vin | vin | un vin, des vins |
| 1 | la bière | öl | une bière, des bières |
| 1 | le pain | bröd | un pain, des pains |
| 1 | commander | beställa | je commande · il commande · j'ai commandé · qu'il commande |
| 1 | payer | betala | je paie · il paie · j'ai payé · qu'il paie |
| 1 | manger | äta | je mange · il mange · j'ai mangé · qu'il mange |
| 1 | boire | dricka | je bois · il boit · j'ai bu · qu'il boive |
| 1 | l'addition, s'il vous plaît | notan, tack |  |
| 1 | bon appétit | smaklig måltid |  |
| 2 | le sel | salt | un sel, des sels |
| 2 | le poivre | peppar | un poivre, des poivres |
| 2 | le sucre | socker | un sucre, des sucres |
| 2 | le thé | te | un thé, des thés |
| 2 | le client | gäst | un client, des clients |
| 2 | la réservation | bokning | une réservation, des réservations |
| 2 | la carafe d'eau | kanna vatten | une carafe d'eau, des carafes d'eau |
| 2 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | la commande | beställning | une commande, des commandes |
| 2 | réserver | boka | je réserve · il réserve · j'ai réservé · qu'il réserve |
| 2 | goûter | smaka | je goûte · il goûte · j'ai goûté · qu'il goûte |
| 2 | s'il vous plaît | snälla |  |
| 2 | merci | tack |  |
| 2 | délicieux | utsökt |  |
| 3 | le chef | kock | un chef, des chefs |
| 3 | l'apéritif | fördrink | un apéritif, des apéritifs |
| 3 | le digestif | avec | un digestif, des digestifs |
| 3 | la terrasse | uteservering | une terrasse, des terrasses |
| 3 | le comptoir | bardisk | un comptoir, des comptoirs |
| 3 | le végétarien | vegetarian | un végétarien, des végétariens |
| 3 | le cendrier | askkopp | un cendrier, des cendriers |
