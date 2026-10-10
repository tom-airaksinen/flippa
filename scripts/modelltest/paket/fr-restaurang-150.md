# Bedömning: fr-restaurang-150

**Tema:** Restaurang och kafé  
**Språk:** franska  
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

### Ma86ca0 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le serveur | en servitör | un serveur, des serveurs |
| 1 | la serveuse | en servitris | une serveuse, des serveuses |
| 1 | la table | ett bord | une table, des tables |
| 1 | la carte | en meny | une carte, des cartes |
| 1 | le menu | en menyn | un menu, des menus |
| 1 | l'addition | en nota | une addition, des additions |
| 1 | le café | ett kaffe | un café, des cafés |
| 2 | le thé | ett te | un thé, des thés |
| 1 | l'eau | ett vatten | une eau, des eaux |
| 1 | le vin | ett vin | un vin, des vins |
| 2 | la bière | en öl | une bière, des bières |
| 1 | le pain | ett bröd | un pain, des pains |
| 2 | la soupe | en soppa | une soupe, des soupes |
| 2 | la salade | en sallad | une salade, des salades |
| 2 | le poisson | en fisk | un poisson, des poissons |
| 2 | la viande | ett kött | une viande, des viandes |
| 2 | le poulet | en kyckling | un poulet, des poulets |
| 3 | le boeuf | ett nötkött | un boeuf, des boeufs |
| 3 | le porc | ett fläsk | un porc, des porcs |
| 1 | le dessert | en efterrätt | un dessert, des desserts |
| 2 | le gâteau | en kaka | un gâteau, des gâteaux |
| 2 | la glace | en glass | une glace, des glaces |
| 2 | le fromage | en ost | un fromage, des fromages |
| 2 | le beurre | ett smör | un beurre, des beurres |
| 1 | le sel | ett salt | un sel, des sels |
| 2 | le poivre | en peppar | un poivre, des poivres |
| 2 | le sucre | ett socker | un sucre, des sucres |
| 2 | le jus | en juice | un jus, des jus |
| 3 | l'oeuf | ett ägg | un oeuf, des oeufs |
| 2 | le lait | en mjölk | un lait, des laits |
| 2 | la cuillère | en sked | une cuillère, des cuillères |
| 1 | la fourchette | en gaffel | une fourchette, des fourchettes |
| 2 | le couteau | en kniv | un couteau, des couteaux |
| 1 | l'assiette | en tallrik | une assiette, des assiettes |
| 1 | le verre | ett glas | un verre, des verres |
| 2 | la tasse | en kopp | une tasse, des tasses |
| 2 | la serviette | en servett | une serviette, des serviettes |
| 1 | le pourboire | en dricks | un pourboire, des pourboires |
| 1 | la réservation | en bokning | une réservation, des réservations |
| 1 | le plat | en rätt | un plat, des plats |
| 1 | l'entrée | en förrätt | une entrée, des entrées |
| 1 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | la cuisine | ett kök | une cuisine, des cuisines |
| 2 | le cuisinier | en kock | un cuisinier, des cuisiniers |
| 3 | la cuisinière | en kvinnlig kock | une cuisinière, des cuisinières |
| 2 | la bouteille | en flaska | une bouteille, des bouteilles |
| 3 | le bar | en bar | un bar, des bars |
| 3 | le comptoir | en disk | un comptoir, des comptoirs |
| 2 | la terrasse | en uteservering | une terrasse, des terrasses |
| 3 | le pichet | en karaff | un pichet, des pichets |
| 3 | le chocolat chaud | en varm choklad | un chocolat chaud, des chocolats chauds |
| 3 | le jus d'orange | en apelsinjuice | un jus d'orange, des jus d'orange |
| 3 | le sandwich | en smörgås | un sandwich, des sandwichs |
| 3 | le croissant | ett croissant | un croissant, des croissants |
| 3 | la baguette | en baguette | une baguette, des baguettes |
| 3 | la crème | en grädde | une crème, des crèmes |
| 3 | la confiture | en sylt | une confiture, des confitures |
| 3 | le miel | en honung | un miel, des miels |
| 3 | la moutarde | en senap | une moutarde, des moutardes |
| 3 | le vinaigre | en vinäger | un vinaigre, des vinaigres |
| 3 | l'huile | en olja | une huile, des huiles |
| 3 | le riz | ett ris | un riz, des riz |
| 2 | le légume | en grönsak | un légume, des légumes |
| 2 | le fruit | en frukt | un fruit, des fruits |
| 2 | la pomme | ett äpple | une pomme, des pommes |
| 3 | la poire | ett päron | une poire, des poires |
| 3 | la fraise | en jordgubbe | une fraise, des fraises |
| 3 | la carotte | en morot | une carotte, des carottes |
| 2 | la pomme de terre | en potatis | une pomme de terre, des pommes de terre |
| 3 | l'oignon | en lök | un oignon, des oignons |
| 3 | l'ail | en vitlök | un ail, des ails |
| 2 | le jambon | en skinka | un jambon, des jambons |
| 2 | le saumon | en lax | un saumon, des saumons |
| 3 | la crevette | en räka | une crevette, des crevettes |
| 3 | le homard | en hummer | un homard, des homards |
| 3 | le canard | en anka | un canard, des canards |
| 3 | l'agneau | ett lamm | un agneau, des agneaux |
| 3 | le steak | en biff | un steak, des steaks |
| 3 | le hamburger | en hamburgare | un hamburger, des hamburgers |
| 2 | la frite | en pommes frites | une frite, des frites |
| 3 | le hors-d'oeuvre | en smårätt | un hors-d'oeuvre, des hors-d'oeuvre |
| 2 | la sauce | en sås | une sauce, des sauces |
| 3 | le piment | en chili | un piment, des piments |
| 2 | le goût | en smak | un goût, des goûts |
| 1 | la monnaie | en växel | une monnaie, des monnaies |
| 2 | le billet | en sedel | un billet, des billets |
| 2 | la carte bancaire | ett betalkort | une carte bancaire, des cartes bancaires |
| 2 | l'argent liquide | en kontant | de l'argent liquide |
| 1 | le client | en kund | un client, des clients |
| 2 | la cliente | en kvinnlig kund | une cliente, des clientes |
| 1 | le repas | ett måltid | un repas, des repas |
| 2 | le petit-déjeuner | en frukost | un petit-déjeuner, des petits-déjeuners |
| 2 | le déjeuner | en lunch | un déjeuner, des déjeuners |
| 2 | le dîner | en middag | un dîner, des dîners |
| 1 | la boisson | en dryck | une boisson, des boissons |
| 3 | le café au lait | ett kaffe med mjölk | un café au lait, des cafés au lait |
| 3 | le cappuccino | en cappuccino | un cappuccino, des cappuccinos |
| 2 | l'espresso | en espresso | un espresso, des espressos |
| 3 | le sirop | en sirap | un sirop, des sirops |
| 3 | la limonade | en läsk | une limonade, des limonades |
| 3 | le cocktail | en cocktail | un cocktail, des cocktails |
| 3 | le glaçon | en isbit | un glaçon, des glaçons |
| 3 | la paille | ett sugrör | une paille, des pailles |
| 2 | le couvert | ett bestick | un couvert, des couverts |
| 3 | la nappe | en duk | une nappe, des nappes |
| 3 | le plateau | en bricka | un plateau, des plateaux |
| 2 | la chaise | en stol | une chaise, des chaises |
| 3 | le tabouret | en barstol | un tabouret, des tabourets |
| 3 | le four | en ugn | un four, des fours |
| 3 | le réfrigérateur | ett kylskåp | un réfrigérateur, des réfrigérateurs |
| 3 | la vaisselle | ett diskgods | de la vaisselle |
| 3 | l'éponge | en disksvamp | une éponge, des éponges |
| 3 | le tablier | ett förkläde | un tablier, des tabliers |
| 2 | la recette | ett recept | une recette, des recettes |
| 2 | l'ingrédient | en ingrediens | un ingrédient, des ingrédients |
| 2 | le plat végétarien | en vegetarisk rätt | un plat végétarien, des plats végétariens |
| 2 | l'allergie | en allergi | une allergie, des allergies |
| 3 | le régime | en diet | un régime, des régimes |
| 2 | l'apéritif | en aperitif | un apéritif, des apéritifs |
| 3 | le digestif | en digestif | un digestif, des digestifs |
| 2 | le service | en service | un service, des services |
| 2 | la carte des vins | en vinlista | une carte des vins, des cartes des vins |
| 3 | le sommelier | en sommelier | un sommelier, des sommeliers |
| 3 | le maître d'hôtel | en hovmästare | un maître d'hôtel, des maîtres d'hôtel |
| 3 | la cuisson | en tillagning | une cuisson, des cuissons |
| 3 | la poêle | en stekpanna | une poêle, des poêles |
| 3 | la casserole | en kastrull | une casserole, des casseroles |
| 3 | le four à micro-ondes | en mikrovågsugn | un four à micro-ondes, des fours à micro-ondes |
| 3 | le bouchon | en kork | un bouchon, des bouchons |
| 3 | le tire-bouchon | en korkskruv | un tire-bouchon, des tire-bouchons |
| 2 | le verre à vin | ett vinglas | un verre à vin, des verres à vin |
| 3 | la carafe | en karaff | une carafe, des carafes |
| 3 | le rouge | ett rödvin | un rouge, des rouges |
| 3 | le blanc | ett vitvin | un blanc, des blancs |
| 3 | le champagne | en champagne | un champagne, des champagnes |
| 3 | la bouchée | en tugg | une bouchée, des bouchées |
| 2 | la tarte | en paj | une tarte, des tartes |
| 3 | le sorbet | en sorbet | un sorbet, des sorbets |
| 2 | la crêpe | en crêpe | une crêpe, des crêpes |
| 3 | le bol | en skål | un bol, des bols |
| 3 | la boulangerie | ett bageri | une boulangerie, des boulangeries |
| 2 | la pâtisserie | ett konditori | une pâtisserie, des pâtisseries |
| 1 | commander | beställa | je commande, il commande · j'ai commandé · qu'il commande |
| 1 | payer | betala | je paie, il paie · j'ai payé · qu'il paie |
| 1 | servir | servera | je sers, il sert · j'ai servi · qu'il serve |
| 1 | réserver | reservera | je réserve, il réserve · j'ai réservé · qu'il réserve |
| 1 | goûter | smaka | je goûte, il goûte · j'ai goûté · qu'il goûte |
| 1 | boire | dricka | je bois, il boit · j'ai bu · qu'il boive |
| 1 | manger | äta | je mange, il mange · j'ai mangé · qu'il mange |
| 1 | Bon appétit ! | Smaklig måltid! |  |

### M3affbb — 145 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la table | bord | une table, des tables |
| 1 | la carte | meny | une carte, des cartes |
| 1 | le menu | dagens meny | un menu, des menus |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | l'addition | nota | une addition, des additions |
| 1 | manger | äta | je mange · il mange · a mangé · qu'il mange |
| 1 | boire | dricka | je bois · il boit · a bu · qu'il boive |
| 1 | commander | beställa | je commande · il commande · a commandé · qu'il commande |
| 1 | le verre | glas | un verre, des verres |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 1 | la serviette | servett | une serviette, des serviettes |
| 1 | l'eau | vatten | une eau, des eaux |
| 1 | le vin | vin | un vin, des vins |
| 1 | la bière | öl | une bière, des bières |
| 1 | le petit-déjeuner | frukost | un petit-déjeuner, des petits-déjeuners |
| 1 | le déjeuner | lunch | un déjeuner, des déjeuners |
| 1 | le dîner | middag | un dîner, des dîners |
| 1 | le plat | rätt | un plat, des plats |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le dessert | efterrätt | un dessert, des desserts |
| 1 | le pourboire | dricks | un pourboire, des pourboires |
| 1 | réserver | boka | je réserve · il réserve · a réservé · qu'il réserve |
| 1 | la réservation | bokning | une réservation, des réservations |
| 1 | le pain | bröd | un pain, des pains |
| 1 | le sel | salt | un sel, des sels |
| 2 | le poivre | peppar | un poivre, des poivres |
| 2 | l'huile | olja | une huile, des huiles |
| 2 | le vinaigre | vinäger | un vinaigre, des vinaigres |
| 2 | le sucre | socker | un sucre, des sucres |
| 2 | le lait | mjölk | un lait, des laits |
| 2 | le thé | te | un thé, des thés |
| 2 | le jus | juice | un jus, des jus |
| 2 | la viande | kött | une viande, des viandes |
| 2 | le poisson | fisk | un poisson, des poissons |
| 2 | le poulet | kyckling | un poulet, des poulets |
| 2 | les légumes | grönsaker | un légume, des légumes |
| 2 | la salade | sallad | une salade, des salades |
| 2 | le fromage | ost | un fromage, des fromages |
| 2 | le gâteau | tårta | un gâteau, des gâteaux |
| 2 | la glace | glass | une glace, des glaces |
| 2 | le fruit | frukt | un fruit, des fruits |
| 2 | la bouteille | flaska | une bouteille, des bouteilles |
| 2 | la tasse | kopp | une tasse, des tasses |
| 2 | l'assiette | tallrik | une assiette, des assiettes |
| 2 | le comptoir | disk | un comptoir, des comptoirs |
| 2 | la terrasse | uteservering | une terrasse, des terrasses |
| 2 | le prix | pris | un prix, des prix |
| 2 | payer | betala | je paie · il paie · a payé · qu'il paie |
| 2 | goûter | smaka | je goûte · il goûte · a goûté · qu'il goûte |
| 2 | chaud | varm |  |
| 2 | froid | kall |  |
| 2 | délicieux | läcker |  |
| 2 | le petit-déjeuner | frukost | un petit-déjeuner, des petits-déjeuners |
| 2 | le serveur | servitör | un serveur, des serveurs |
| 2 | la carte | meny | une carte, des cartes |
| 2 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | le couteau | kniv | un couteau, des couteaux |
| 2 | la fourchette | gaffel | une fourchette, des fourchettes |
| 2 | la cuillère | sked | une cuillère, des cuillères |
| 2 | le verre | glas | un verre, des verres |
| 2 | la serviette | servett | une serviette, des serviettes |
| 2 | l'addition | nota | une addition, des additions |
| 2 | le pourboire | dricks | un pourboire, des pourboires |
| 2 | le café | kaffe | un café, des cafés |
| 2 | le thé | te | un thé, des thés |
| 2 | le jus d'orange | apelsinjuice | un jus d'orange, des jus d'orange |
| 2 | le vin rouge | rödvin | un vin rouge, des vins rouges |
| 2 | le vin blanc | vitvin | un vin blanc, des vins blancs |
| 2 | l'eau minérale | mineralvatten | une eau minérale, des eaux minérales |
| 2 | le pain | bröd | un pain, des pains |
| 2 | le beurre | smör | un beurre, des beurres |
| 2 | le sucre | socker | un sucre, des sucres |
| 2 | le sel | salt | un sel, des sels |
| 2 | le poivre | peppar | un poivre, des poivres |
| 2 | l'huile | olja | une huile, des huiles |
| 2 | le vinaigre | vinäger | un vinaigre, des vinaigres |
| 2 | la viande | kött | une viande, des viandes |
| 2 | le poisson | fisk | un poisson, des poissons |
| 2 | le poulet | kyckling | un poulet, des poulets |
| 2 | les légumes | grönsaker | un légume, des légumes |
| 2 | la pomme de terre | potatis | une pomme de terre, des pommes de terre |
| 2 | le riz | ris | un riz, des riz |
| 2 | les pâtes | pasta | une pâte, des pâtes |
| 2 | la salade | sallad | une salade, des salades |
| 2 | le fromage | ost | un fromage, des fromages |
| 2 | le dessert | efterrätt | un dessert, des desserts |
| 2 | le gâteau | tårta | un gâteau, des gâteaux |
| 2 | la glace | glass | une glace, des glaces |
| 2 | le fruit | frukt | un fruit, des fruits |
| 3 | la pomme | äpple | une pomme, des pommes |
| 3 | la poire | päron | une poire, des poires |
| 3 | l'orange | apelsin | une orange, des oranges |
| 3 | la fraise | jordgubbe | une fraise, des fraises |
| 3 | le citron | citron | un citron, des citrons |
| 3 | le bœuf | nötkött | un bœuf, des bœufs |
| 3 | le porc | fläskkött | un porc, des porcs |
| 3 | l'agneau | lamm | un agneau, des agneaux |
| 3 | le canard | anka | un canard, des canards |
| 3 | les crevettes | räkor | une crevette, des crevettes |
| 3 | le saumon | lax | un saumon, des saumons |
| 3 | la carotte | morot | une carotte, des carottes |
| 3 | l'oignon | lök | un oignon, des oignons |
| 3 | l'ail | vitlök | un ail, des aulx |
| 3 | la tomate | tomat | une tomate, des tomates |
| 3 | le concombre | gurka | un concombre, des concombres |
| 3 | le champignon | svamp | un champignon, des champignons |
| 3 | le chocolat | choklad | un chocolat, des chocolats |
| 3 | le miel | honung | un miel, des miels |
| 3 | la confiture | sylt | une confiture, des confitures |
| 3 | le verre à vin | vinglas | un verre à vin, des verres à vin |
| 3 | la carafe | karaff | une carafe, des carafes |
| 3 | le plateau | bricka | un plateau, des plateaux |
| 3 | le menu enfant | barnmeny | un menu enfant, des menus enfant |
| 3 | végétarien | vegetarisk |  |
| 3 | sans gluten | glutenfri |  |
| 3 | épicé | kryddstark |  |
| 3 | cuit | tillagad |  |
| 3 | cru | rå |  |
| 3 | grillé | grillad |  |
| 3 | frit | friterad |  |
| 3 | bouilli | kokt |  |
| 3 | rôti | stekt |  |
| 3 | la recette | recept | une recette, des recettes |
| 3 | le chef | kock | un chef, des chefs |
| 3 | la cuisine | kök | une cuisine, des cuisines |
| 3 | le service | service | un service, des services |
| 3 | la commande | beställning | une commande, des commandes |
| 3 | le client | kund | un client, des clients |
| 3 | la table pour deux | bord för två | une table pour deux, des tables pour deux |
| 3 | la carte des vins | vinlista | une carte des vins, des cartes des vins |
| 3 | le plat principal | huvudrätt | un plat principal, des plats principaux |
| 3 | la spécialité | specialitet | une spécialité, des spécialités |
| 3 | le buffet | buffé | un buffet, des buffets |
| 3 | le pique-nique | picknick | un pique-nique, des pique-niques |
| 3 | la pause-café | fikapaus | une pause-café, des pauses-café |
| 3 | le bar | bar | un bar, des bars |
| 3 | la boulangerie | bageri | une boulangerie, des boulangeries |
| 3 | la pâtisserie | konditori | une pâtisserie, des pâtisseries |
| 3 | le pourboire | dricks | un pourboire, des pourboires |
| 3 | le repas | måltid | un repas, des repas |

### Mbda6c9 — 149 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | la table | bord | une table, des tables |
| 2 | la chaise | stol | une chaise, des chaises |
| 1 | la carte | meny | une carte, des cartes |
| 2 | le menu | meny | un menu, des menus |
| 1 | le plat | rätt | un plat, des plats |
| 1 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 1 | l’entrée | förrätt | une entrée, des entrées |
| 1 | le dessert | efterrätt | un dessert, des desserts |
| 1 | la boisson | dryck | une boisson, des boissons |
| 1 | l’eau | vatten | une eau, des eaux |
| 2 | le vin | vin | un vin, des vins |
| 2 | la bière | öl | une bière, des bières |
| 1 | le café (boisson) | kaffe | un café, des cafés |
| 2 | le thé | te | un thé, des thés |
| 2 | le jus | juice | un jus, des jus |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 2 | la serveuse | servitris | une serveuse, des serveuses |
| 2 | le client | kund | un client, des clients |
| 1 | réserver | reservera | je réserve · il réserve · j’ai réservé · qu’il réserve |
| 1 | commander | beställa | je commande · il commande · j’ai commandé · qu’il commande |
| 1 | manger | äta | je mange · il mange · j’ai mangé · qu’il mange |
| 1 | boire | dricka | je bois · il boit · j’ai bu · qu’il boive |
| 1 | payer | betala | je paie · il paie · j’ai payé · qu’il paie |
| 1 | l’addition | nota | une addition, des additions |
| 1 | l’addition, s’il vous plaît | notan, tack |  |
| 1 | s’il vous plaît | varsågod; tack |  |
| 1 | merci | tack |  |
| 1 | bonjour | hej |  |
| 2 | bonsoir | god kväll |  |
| 2 | au revoir | hej då |  |
| 1 | une table pour deux | ett bord för två |  |
| 1 | Vous avez une table ? | Har ni ett bord? |  |
| 1 | Je voudrais… | Jag skulle vilja ha… |  |
| 2 | Qu’est-ce que vous recommandez ? | Vad rekommenderar ni? |  |
| 1 | Je prends… | Jag tar… |  |
| 2 | C’est tout | Det är allt |  |
| 2 | à emporter | för avhämtning |  |
| 2 | sur place | på plats |  |
| 2 | le petit déjeuner | frukost | un petit déjeuner, des petits déjeuners |
| 2 | le déjeuner | lunch | un déjeuner, des déjeuners |
| 2 | le dîner | middag | un dîner, des dîners |
| 3 | la cuisine | kök; matlagning | une cuisine, des cuisines |
| 2 | la spécialité | specialitet | une spécialité, des spécialités |
| 2 | le chef | kock | un chef, des chefs |
| 3 | cuisiner | laga mat | je cuisine · il cuisine · j’ai cuisiné · qu’il cuisine |
| 2 | la réservation | bokning | une réservation, des réservations |
| 2 | complet | fullbokat |  |
| 2 | disponible | ledig; tillgänglig |  |
| 2 | attendre | vänta | j’attends · il attend · j’ai attendu · qu’il attende |
| 1 | la commande | beställning | une commande, des commandes |
| 1 | servir | servera | je sers · il sert · j’ai servi · qu’il serve |
| 2 | goûter | smaka | je goûte · il goûte · j’ai goûté · qu’il goûte |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 1 | le verre | glas | un verre, des verres |
| 1 | la tasse | kopp | une tasse, des tasses |
| 1 | l’assiette | tallrik | une assiette, des assiettes |
| 2 | la serviette | servett | une serviette, des serviettes |
| 2 | la bouteille | flaska | une bouteille, des bouteilles |
| 2 | le sel | salt | un sel, des sels |
| 2 | le poivre | peppar | un poivre, des poivres |
| 2 | le sucre | socker | un sucre, des sucres |
| 1 | le pain | bröd | un pain, des pains |
| 3 | le beurre | smör | un beurre, des beurres |
| 2 | la salade | sallad | une salade, des salades |
| 2 | la soupe | soppa | une soupe, des soupes |
| 2 | le sandwich | smörgås | un sandwich, des sandwichs |
| 2 | le fromage | ost | un fromage, des fromages |
| 2 | la viande | kött | une viande, des viandes |
| 2 | le poisson | fisk | un poisson, des poissons |
| 2 | le poulet | kyckling | un poulet, des poulets |
| 2 | les légumes | grönsaker | un légume, des légumes |
| 3 | le riz | ris | un riz, des riz |
| 2 | les pâtes | pasta | une pâte, des pâtes |
| 2 | la sauce | sås | une sauce, des sauces |
| 2 | le gâteau | kaka | un gâteau, des gâteaux |
| 2 | la glace | glass | une glace, des glaces |
| 3 | la tarte | paj | une tarte, des tartes |
| 2 | le croissant | croissant | un croissant, des croissants |
| 3 | la baguette | baguette | une baguette, des baguettes |
| 2 | le lait | mjölk | un lait, des laits |
| 1 | sans | utan |  |
| 1 | avec | med |  |
| 2 | chaud | varm |  |
| 2 | froid | kall |  |
| 3 | délicieux | utsökt |  |
| 3 | sucré | söt |  |
| 3 | salé | salt |  |
| 2 | végétarien | vegetarisk |  |
| 3 | végétalien | vegansk |  |
| 3 | sans gluten | glutenfri |  |
| 2 | allergique à… | allergisk mot… |  |
| 2 | Je suis allergique à… | Jag är allergisk mot… |  |
| 2 | Il y a… ? | Finns det…? |  |
| 1 | Avez-vous… ? | Har ni…? |  |
| 3 | Je n’ai pas commandé ça | Jag beställde inte det här |  |
| 2 | C’est très bon | Det är mycket gott |  |
| 3 | Ce n’est pas cuit | Det är inte tillagat |  |
| 3 | bien cuit | välstekt |  |
| 3 | saignant | blodig |  |
| 3 | à point | medium |  |
| 3 | l’addition séparée | separat nota | une addition séparée, des additions séparées |
| 2 | ensemble | tillsammans |  |
| 2 | séparément | separat |  |
| 2 | la monnaie | växel | une monnaie, des monnaies |
| 2 | la carte bancaire | bankkort | une carte bancaire, des cartes bancaires |
| 2 | en espèces | kontant |  |
| 2 | le pourboire | dricks | un pourboire, des pourboires |
| 3 | Le service est compris | Servering ingår |  |
| 2 | ouvrir | öppna | j’ouvre · il ouvre · j’ai ouvert · qu’il ouvre |
| 2 | fermer | stänga | je ferme · il ferme · j’ai fermé · qu’il ferme |
| 2 | à quelle heure | vid vilken tid |  |
| 3 | Quelle heure est-il ? | Vad är klockan? |  |
| 2 | la terrasse | uteservering | une terrasse, des terrasses |
| 2 | à l’intérieur | inomhus |  |
| 2 | dehors | utomhus |  |
| 2 | les toilettes | toalett | une toilette, des toilettes |
| 1 | Où sont les toilettes ? | Var är toaletten? |  |
| 3 | la cuisine du monde | internationell mat | une cuisine du monde, des cuisines du monde |
| 3 | la cuisine française | fransk mat | une cuisine française, des cuisines françaises |
| 2 | la faim | hunger | une faim, des faims |
| 2 | la soif | törst | une soif, des soifs |
| 2 | avoir faim | vara hungrig | j’ai faim · il a faim · j’ai eu faim · qu’il ait faim |
| 2 | avoir soif | vara törstig | j’ai soif · il a soif · j’ai eu soif · qu’il ait soif |
| 3 | déjeuner | äta lunch | je déjeune · il déjeune · j’ai déjeuné · qu’il déjeune |
| 3 | dîner | äta middag | je dîne · il dîne · j’ai dîné · qu’il dîne |
| 2 | prendre un café | ta en kaffe | je prends un café · il prend un café · j’ai pris un café · qu’il prenne un café |
| 2 | prendre un verre | ta en drink | je prends un verre · il prend un verre · j’ai pris un verre · qu’il prenne un verre |
| 3 | le déjeuner d’affaires | affärslunch | un déjeuner d’affaires, des déjeuners d’affaires |
| 3 | la formule | menyerbjudande | une formule, des formules |
| 2 | le service | servering; service | un service, des services |
| 2 | rapide | snabb |  |
| 3 | lent | långsam |  |
| 3 | propre | ren |  |
| 3 | sale | smutsig |  |
| 3 | la nappe | bordsduk | une nappe, des nappes |
| 3 | le plateau | bricka | un plateau, des plateaux |
| 2 | le comptoir | disk | un comptoir, des comptoirs |
| 2 | la caisse | kassa | une caisse, des caisses |
| 2 | le ticket | kvitto | un ticket, des tickets |
| 2 | la facture | kvitto; räkning | une facture, des factures |
| 3 | l’heure de pointe | rusningstid | une heure de pointe, des heures de pointe |
| 3 | le brunch | brunch | un brunch, des brunchs |
| 3 | la pâtisserie | bakelse; konditori | une pâtisserie, des pâtisseries |
| 3 | le pourcentage | procent | un pourcentage, des pourcentages |
| 3 | la réduction | rabatt | une réduction, des réductions |

### M855b83 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, deux restaurants |
| 1 | le café (lieu) | kafé | un café, deux cafés |
| 1 | la carte | meny | une carte, deux cartes |
| 1 | le menu | set-meny | un menu, deux menus |
| 1 | le serveur | servitör | un serveur, deux serveurs |
| 1 | la serveuse | servitris | une serveuse, deux serveuses |
| 1 | la table | bord | une table, deux tables |
| 1 | la réservation | bokning | une réservation, deux réservations |
| 1 | l'addition | nota | une addition, deux additions |
| 1 | le pourboire | dricks | un pourboire, deux pourboires |
| 1 | l'entrée | förrätt | une entrée, deux entrées |
| 1 | le plat principal | huvudrätt | un plat principal, deux plats principaux |
| 1 | le dessert | efterrätt | un dessert, deux desserts |
| 1 | la boisson | dryck | une boisson, deux boissons |
| 1 | l'eau | vatten | de l'eau, — |
| 1 | le vin | vin | un vin, deux vins |
| 1 | la bière | öl | une bière, deux bières |
| 1 | le café (boisson) | kaffe | un café, deux cafés |
| 1 | le thé | te | un thé, deux thés |
| 1 | le lait | mjölk | du lait, — |
| 1 | le sucre | socker | un sucre, deux sucres |
| 1 | le pain | bröd | un pain, deux pains |
| 1 | la viande | kött | une viande, deux viandes |
| 1 | le poisson | fisk | un poisson, deux poissons |
| 1 | le poulet | kyckling | un poulet, deux poulets |
| 1 | la salade | sallad | une salade, deux salades |
| 1 | la soupe | soppa | une soupe, deux soupes |
| 1 | le fromage | ost | un fromage, deux fromages |
| 1 | le couteau | kniv | un couteau, deux couteaux |
| 1 | la fourchette | gaffel | une fourchette, deux fourchettes |
| 1 | la cuillère | sked | une cuillère, deux cuillères |
| 1 | l'assiette | tallrik | une assiette, deux assiettes |
| 1 | le verre | glas | un verre, deux verres |
| 1 | la tasse | kopp | une tasse, deux tasses |
| 1 | la bouteille | flaska | une bouteille, deux bouteilles |
| 1 | la serviette | servett | une serviette, deux serviettes |
| 1 | le plat du jour | dagens rätt | un plat du jour, deux plats du jour |
| 1 | le petit-déjeuner | frukost | un petit-déjeuner, deux petits-déjeuners |
| 1 | le déjeuner | lunch | un déjeuner, deux déjeuners |
| 1 | le dîner | middag | un dîner, deux dîners |
| 1 | commander | beställa | je commande · il commande · j'ai commandé · qu'il commande |
| 1 | réserver | boka | je réserve · il réserve · j'ai réservé · qu'il réserve |
| 1 | manger | äta | je mange · il mange · j'ai mangé · qu'il mange |
| 1 | boire | dricka | je bois · il boit · j'ai bu · qu'il boive |
| 1 | payer | betala | je paie · il paie · j'ai payé · qu'il paie |
| 1 | prendre | ta | je prends · il prend · j'ai pris · qu'il prenne |
| 1 | apporter | hämta, komma med | j'apporte · il apporte · j'ai apporté · qu'il apporte |
| 1 | choisir | välja | je choisis · il choisit · j'ai choisi · qu'il choisisse |
| 1 | Une table pour deux, s'il vous plaît | Ett bord för två, tack |  |
| 1 | Je voudrais réserver une table | Jag skulle vilja boka ett bord |  |
| 1 | Avez-vous une table libre ? | Har ni ett ledigt bord? |  |
| 1 | Je voudrais… | Jag skulle vilja ha… |  |
| 1 | L'addition, s'il vous plaît | Notan, tack |  |
| 1 | Qu'est-ce que vous recommandez ? | Vad rekommenderar ni? |  |
| 1 | Bon appétit ! | Smaklig måltid! |  |
| 1 | Santé ! | Skål! |  |
| 1 | Je suis allergique à… | Jag är allergisk mot… |  |
| 1 | Puis-je payer par carte ? | Kan jag betala med kort? |  |
| 1 | le client | kund, gäst | un client, deux clients |
| 1 | le chef | kökschef | un chef, deux chefs |
| 1 | la glace | glass | une glace, deux glaces |
| 1 | le gâteau | kaka, tårta | un gâteau, deux gâteaux |
| 1 | le croissant | croissant | un croissant, deux croissants |
| 1 | le jus d'orange | apelsinjuice | un jus d'orange, deux jus d'orange |
| 1 | la carte des vins | vinlista | une carte des vins, deux cartes des vins |
| 1 | l'allergie | allergi | une allergie, deux allergies |
| 1 | végétarien | vegetarisk |  |
| 1 | sans gluten | glutenfri |  |
| 1 | chaud | varm |  |
| 1 | froid | kall |  |
| 1 | délicieux | utsökt |  |
| 1 | à emporter | att ta med |  |
| 1 | sur place | att äta här |  |
| 1 | les frites | pommes frites | une frite, deux frites |
| 1 | le sel | salt | du sel, — |
| 1 | le poivre | peppar | du poivre, — |
| 2 | le steak | biff | un steak, deux steaks |
| 2 | les pâtes | pasta | des pâtes (plural) |
| 2 | le riz | ris | du riz, — |
| 2 | le légume | grönsak | un légume, deux légumes |
| 2 | l'œuf | ägg | un œuf, deux œufs |
| 2 | le jambon | skinka | un jambon, deux jambons |
| 2 | le sandwich | smörgås | un sandwich, deux sandwichs |
| 2 | la baguette | baguette | une baguette, deux baguettes |
| 2 | la tarte | paj | une tarte, deux tartes |
| 2 | la sauce | sås | une sauce, deux sauces |
| 2 | la terrasse | uteservering | une terrasse, deux terrasses |
| 2 | le bar | bar | un bar, deux bars |
| 2 | le comptoir | disk | un comptoir, deux comptoirs |
| 2 | le sommelier | sommelier | un sommelier, deux sommeliers |
| 2 | le cocktail | cocktail | un cocktail, deux cocktails |
| 2 | le café crème | kaffe med mjölk | un café crème, deux cafés crème |
| 2 | l'expresso | espresso | un expresso, deux expressos |
| 2 | le chocolat chaud | varm choklad | un chocolat chaud, deux chocolats chauds |
| 2 | le beurre | smör | du beurre, — |
| 2 | la nappe | duk | une nappe, deux nappes |
| 2 | la chaise | stol | une chaise, deux chaises |
| 2 | le couvert | kuvert, bestick | un couvert, deux couverts |
| 2 | la carafe | karaff | une carafe, deux carafes |
| 2 | la monnaie | växel | de la monnaie, — |
| 2 | la carte bancaire | bankkort | une carte bancaire, deux cartes bancaires |
| 2 | le reçu | kvitto | un reçu, deux reçus |
| 2 | les espèces | kontanter | des espèces (plural) |
| 2 | la formule | lunchmeny, paketerbjudande | une formule, deux formules |
| 2 | la spécialité | specialitet | une spécialité, deux spécialités |
| 2 | le menu enfant | barnmeny | un menu enfant, deux menus enfant |
| 2 | la cuisine | kök, matlagning | une cuisine, deux cuisines |
| 2 | servir | servera | je sers · il sert · j'ai servi · qu'il serve |
| 2 | goûter | smaka på | je goûte · il goûte · j'ai goûté · qu'il goûte |
| 2 | recommander | rekommendera | je recommande · il recommande · j'ai recommandé · qu'il recommande |
| 2 | attendre | vänta | j'attends · il attend · j'ai attendu · qu'il attende |
| 2 | partager | dela | je partage · il partage · j'ai partagé · qu'il partage |
| 2 | Le service est-il compris ? | Ingår serviceavgiften? |  |
| 2 | C'était délicieux ! | Det var jättegott! |  |
| 2 | Je n'ai pas encore choisi | Jag har inte valt ännu |  |
| 2 | Vous êtes prêt à commander ? | Är ni redo att beställa? |  |
| 2 | Une carafe d'eau, s'il vous plaît | En vattenkaraff, tack |  |
| 2 | Est-ce que c'est fait maison ? | Är det hemlagat? |  |
| 2 | salé | salt |  |
| 2 | sucré | söt |  |
| 2 | frais | färsk, sval |  |
| 2 | épicé | kryddstark |  |
| 2 | à point | medium stekt |  |
| 2 | bien cuit | genomstekt |  |
| 2 | Complet | Fullbokat |  |
| 3 | saignant | blodig, lite stekt |  |
| 3 | le glaçon | isbit | un glaçon, deux glaçons |
| 3 | la paille | sugrör | une paille, deux pailles |
| 3 | le vinaigre | vinäger | du vinaigre, — |
| 3 | l'huile | olja | une huile, deux huiles |
| 3 | la moutarde | senap | de la moutarde, — |
| 3 | la pâtisserie | bakverk, konditori | une pâtisserie, deux pâtisseries |
| 3 | le barman | bartender | un barman, deux barmans |
| 3 | le brunch | brunch | un brunch, deux brunchs |
| 3 | cuisiner | laga mat | je cuisine · il cuisine · j'ai cuisiné · qu'il cuisine |
| 3 | grignoter | knapra, småäta | je grignote · il grignote · j'ai grignoté · qu'il grignote |
| 3 | copieux | mustig, riklig |  |
| 3 | léger | lätt |  |
| 3 | la salière | saltkar | une salière, deux salières |
| 3 | le menu dégustation | provsmakningsmeny | un menu dégustation, deux menus dégustation |
| 3 | la tisane | örtte | une tisane, deux tisanes |
| 3 | le sirop | saft | un sirop, deux sirops |
| 3 | le pichet | tillbringare | un pichet, deux pichets |
| 3 | la brasserie | brasserie | une brasserie, deux brasseries |
| 3 | le bistrot | bistro | un bistrot, deux bistrots |
| 3 | L'addition séparée, s'il vous plaît | Separata notor, tack |  |
| 3 | la cuillère à café | tesked | une cuillère à café, deux cuillères à café |
| 3 | le vin blanc | vitt vin | un vin blanc, deux vins blancs |
| 3 | le vin rouge | rött vin | un vin rouge, deux vins rouges |
| 3 | la limonade | läsk, lemonad | une limonade, deux limonades |

### M05df09 — 114 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | le menu | meny | un menu, des menus |
| 1 | la carte | meny | une carte, des cartes |
| 1 | commander | beställa | je commande, il commande · j’ai commandé · qu’il commande |
| 1 | servir | servera | je sers, il sert · j’ai servi · qu’il serve |
| 1 | manger | äta | je mange, il mange · j’ai mangé · qu’il mange |
| 1 | boire | dricka | je bois, il boit · j’ai bu · qu’il boive |
| 1 | l'addition | notan | une addition, des additions |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 1 | une table | bord | une table, des tables |
| 2 | une chaise | stol | une chaise, des chaises |
| 1 | une réservation | bokning | une réservation, des réservations |
| 1 | réserver | boka | je réserve, il réserve · j’ai réservé · qu’il réserve |
| 2 | une place | plats | une place, des places |
| 2 | libre | ledig |  |
| 2 | occupé | upptagen |  |
| 1 | une boisson | dryck | une boisson, des boissons |
| 1 | un plat | rätt | un plat, des plats |
| 2 | une entrée | förrätt | une entrée, des entrées |
| 1 | un dessert | efterrätt | un dessert, des desserts |
| 2 | un petit-déjeuner | frukost | un petit-déjeuner, des petits-déjeuners |
| 2 | un déjeuner | lunch | un déjeuner, des déjeuners |
| 2 | un dîner | middag | un dîner, des dîners |
| 1 | une assiette | tallrik | une assiette, des assiettes |
| 1 | un verre | glas | un verre, des verres |
| 2 | une tasse | kopp | une tasse, des tasses |
| 3 | une cuillère | sked | une cuillère, des cuillères |
| 3 | une fourchette | gaffel | une fourchette, des fourchettes |
| 3 | un couteau | kniv | un couteau, des couteaux |
| 2 | une serviette | servett | une serviette, des serviettes |
| 3 | un nappe | duk | un nappe, des nappes |
| 1 | le pain | bröd | un pain, des pains |
| 2 | le beurre | smör |  |
| 2 | le fromage | ost |  |
| 2 | une salade | sallad | une salade, des salades |
| 2 | une soupe | soppa | une soupe, des soupes |
| 2 | la viande | kött |  |
| 2 | le poisson | fisk | un poisson, des poissons |
| 2 | le poulet | kyckling | un poulet, des poulets |
| 1 | les pâtes | pasta | des pâtes |
| 2 | le riz | ris |  |
| 2 | les légumes | grönsaker | des légumes |
| 2 | les fruits | frukter | des fruits |
| 2 | le sel | salt |  |
| 3 | le poivre | peppar |  |
| 2 | le sucre | socker |  |
| 3 | la crème | grädde |  |
| 1 | le lait | mjölk |  |
| 1 | le thé | te |  |
| 1 | le café | kaffe |  |
| 1 | l'eau | vatten | une eau, des eaux |
| 2 | le jus | juice | un jus, des jus |
| 2 | le vin | vin | un vin, des vins |
| 2 | la bière | öl |  |
| 2 | un soda | läsk | un soda, des sodas |
| 3 | une limonade | lemonad | une limonade, des limonades |
| 2 | chaud | varm |  |
| 2 | froid | kall |  |
| 2 | délicieux | utsökt |  |
| 3 | salé | saltad |  |
| 3 | sucré | söt |  |
| 1 | sans | utan |  |
| 1 | avec | med |  |
| 2 | à emporter | för avhämtning |  |
| 2 | sur place | på plats |  |
| 3 | l'entrée | ingång | une entrée, des entrées |
| 3 | le coin | hörn | un coin, des coins |
| 2 | le comptoir | disk | un comptoir, des comptoirs |
| 2 | le pourboire | dricks |  |
| 1 | payer | betala | je paie, il paie · j’ai payé · qu’il paie |
| 1 | coûter | kosta | ça coûte, ça coûte · ça a coûté · qu’il coûte |
| 2 | chercher une table | leta efter ett bord |  |
| 1 | avoir faim | vara hungrig |  |
| 1 | avoir soif | vara törstig |  |
| 1 | vouloir | vilja | je veux, il veut · j’ai voulu · qu’il veuille |
| 2 | préférer | föredra | je préfère, il préfère · j’ai préféré · qu’il préfère |
| 3 | suggestion | förslag | une suggestion, des suggestions |
| 3 | spécialité | specialitet | une spécialité, des spécialités |
| 3 | service | servering | un service, des services |
| 3 | patience | tålamod |  |
| 3 | réclamer | klaga på | je réclame, il réclame · j’ai réclamé · qu’il réclame |
| 1 | l'addition, s'il vous plaît | notan, tack |  |
| 1 | une table pour deux | ett bord för två |  |
| 2 | un café au lait | kaffe med mjölk | un café au lait, des cafés au lait |
| 1 | un verre d'eau | ett glas vatten | un verre d'eau, des verres d'eau |
| 2 | un plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 3 | une formule | menykombo | une formule, des formules |
| 3 | une carte des desserts | dessertmeny | une carte des desserts, des cartes des desserts |
| 3 | un établissement | etablissemang | un établissement, des établissements |
| 2 | une terrasse | uteservering | une terrasse, des terrasses |
| 2 | une salle | matsal | une salle, des salles |
| 3 | un bistrot | bistro | un bistrot, des bistrots |
| 3 | un snack | snabbmatställe | un snack, des snacks |
| 2 | un gâteau | kaka | un gâteau, des gâteaux |
| 2 | une pâtisserie | bakverk | une pâtisserie, des pâtisseries |
| 2 | une crêpe | pannkaka | une crêpe, des crêpes |
| 2 | une glace | glass | une glace, des glaces |
| 3 | un biscuit | kex | un biscuit, des biscuits |
| 2 | un sandwich | smörgås | un sandwich, des sandwichs |
| 2 | un croissant | croissant | un croissant, des croissants |
| 3 | une baguette | baguette | une baguette, des baguettes |
| 3 | un espresso | espresso | un espresso, des espressos |
| 3 | un cappuccino | cappuccino | un cappuccino, des cappuccinos |
| 3 | un chocolat chaud | varm choklad | un chocolat chaud, des chocolats chauds |
| 2 | une eau gazeuse | kolsyrat vatten | une eau gazeuse, des eaux gazeuses |
| 2 | une eau plate | stilla vatten | une eau plate, des eaux plates |
| 2 | allergique | allergisk |  |
| 2 | sans gluten | glutenfri |  |
| 2 | sans lactose | laktosfri |  |
| 3 | bien cuit | välstekt |  |
| 3 | saignant | blodig |  |
| 3 | l'ardoise | dagens tavla | une ardoise, des ardoises |

### Mf1dedb — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, des restaurants |
| 1 | le café | kafé | un café, des cafés |
| 1 | le serveur | servitör | un serveur, des serveurs |
| 1 | la serveuse | servitris | une serveuse, des serveuses |
| 2 | le cuisinier | kock | un cuisinier, des cuisiniers |
| 2 | le chef | köksmästare | un chef, des chefs |
| 3 | le maître d'hôtel | hovmästare | un maître d'hôtel, des maîtres d'hôtel |
| 3 | le sommelier | sommelier | un sommelier, des sommeliers |
| 1 | la terrasse | uteservering | une terrasse, des terrasses |
| 2 | le comptoir | bardisk | un comptoir, des comptoirs |
| 1 | la table | bord | une table, des tables |
| 2 | la chaise | stol | une chaise, des chaises |
| 1 | le menu | fast meny | un menu, des menus |
| 1 | la carte | matsedel | une carte, des cartes |
| 2 | la carte des vins | vinlista | une carte des vins, des cartes des vins |
| 1 | l'addition | nota | une addition, des additions |
| 2 | la note | räkning | une note, des notes |
| 1 | le pourboire | dricks | un pourboire, des pourboires |
| 2 | le reçu | kvitto | un reçu, des reçus |
| 1 | la réservation | bokning | une réservation, des réservations |
| 1 | les toilettes | toalett | des toilettes |
| 1 | l'assiette | tallrik | une assiette, des assiettes |
| 2 | le couvert | kuvert | un couvert, des couverts |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 2 | la petite cuillère | tesked | une petite cuillère, des petites cuillères |
| 1 | le verre | glas | un verre, des verres |
| 1 | la tasse | kopp | une tasse, des tasses |
| 3 | la sous-tasse | fat | une sous-tasse, des sous-tasses |
| 1 | la serviette | servett | une serviette, des serviettes |
| 1 | la carafe | karaff | une carafe, des carafes |
| 2 | le pichet | krus | un pichet, des pichets |
| 1 | la bouteille | flaska | une bouteille, des bouteilles |
| 2 | la salière | saltkar | une salière, des salières |
| 2 | le poivrier | pepparkvarn | un poivrier, des poivriers |
| 2 | la paille | sugrör | une paille, des pailles |
| 3 | le cure-dent | tandpetare | un cure-dent, des cure-dents |
| 3 | le cendrier | askkopp | un cendrier, des cendriers |
| 2 | la corbeille de pain | brödkorg | une corbeille de pain, des corbeilles de pain |
| 2 | le plateau | bricka | un plateau, des plateaux |
| 2 | l'apéritif | fördrink | un apéritif, des apéritifs |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le plat principal | varmrätt | un plat principal, des plats principaux |
| 1 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 1 | le menu du jour | dagens meny | un menu du jour, des menus du jour |
| 1 | la formule | menyerbjudande | une formule, des formules |
| 1 | le dessert | efterrätt | un dessert, des desserts |
| 3 | le digestif | digestif | un digestif, des digestifs |
| 3 | l'en-cas | mellanmål | un en-cas, des en-cas |
| 1 | le vin rouge | rödvin | un vin rouge, des vins rouges |
| 1 | le vin blanc | vitt vin | un vin blanc, des vins blancs |
| 1 | le vin rosé | rosévin | un vin rosé, des vins rosés |
| 1 | la bière | öl | une bière, des bières |
| 2 | la bière pression | fatöl | une bière pression, des bières pression |
| 1 | l'eau plate | stilla vatten | une eau plate, des eaux plates |
| 1 | l'eau gazeuse | kolsyrat vatten | une eau gazeuse, des eaux gazeuses |
| 1 | la carafe d'eau | vattenkaraff | une carafe d'eau, des carafes d'eau |
| 1 | le jus de fruits | fruktjuice | un jus de fruits, des jus de fruits |
| 2 | le soda | läsk | un soda, des sodas |
| 2 | la limonade | citronläsk | une limonade, des limonades |
| 3 | le sirop | saft | un sirop, des sirops |
| 1 | l'espresso | espresso | un espresso, des espressos |
| 1 | le café au lait | kaffe med mjölk | un café au lait, des cafés au lait |
| 2 | le café allongé | svart kaffe | un café allongé, des cafés allongés |
| 1 | le cappuccino | cappuccino | un cappuccino, des cappuccinos |
| 2 | le chocolat chaud | varm choklad | un chocolat chaud, des chocolats chauds |
| 1 | le thé | te | un thé, des thés |
| 2 | l'infusion | örtte | une infusion, des infusions |
| 1 | le pain | bröd | un pain, des pains |
| 1 | le beurre | smör | un beurre, des beurres |
| 1 | le fromage | ost | un fromage, des fromages |
| 1 | la viande | kött | une viande, des viandes |
| 1 | le poisson | fisk | un poisson, des poissons |
| 2 | la volaille | fågel | une volaille, des volailles |
| 2 | les fruits de mer | skaldjur | un fruit de mer, des fruits de mer |
| 1 | la soupe | soppa | une soupe, des soupes |
| 1 | la salade | sallad | une salade, des salades |
| 2 | la garniture | tillbehör | une garniture, des garnitures |
| 1 | les frites | pommes frites | une frite, des frites |
| 1 | les légumes | grönsaker | un légume, des légumes |
| 2 | le riz | ris | un riz, des riz |
| 1 | les pâtes | pasta | une pâte, des pâtes |
| 2 | le bœuf | nötkött | un bœuf, des bœufs |
| 2 | le porc | fläskkött | un porc, des porcs |
| 1 | le poulet | kyckling | un poulet, des poulets |
| 2 | l'agneau | lammkött | un agneau, des agneaux |
| 3 | le canard | anka | un canard, des canards |
| 1 | le steak | stek | un steak, des steaks |
| 1 | le croissant | giffel | un croissant, des croissants |
| 1 | le pain au chocolat | chokladcroissant | un pain au chocolat, des pains au chocolat |
| 2 | la brioche | brioche | une brioche, des brioches |
| 1 | la baguette | baguette | une baguette, des baguettes |
| 2 | la tartine | smörgås | une tartine, des tartines |
| 1 | le sandwich | macka | un sandwich, des sandwichs |
| 1 | la crêpe | tunn pannkaka | une crêpe, des crêpes |
| 2 | la gaufre | våffla | une gaufre, des gaufres |
| 2 | la part de gâteau | tårtbit | une part de gâteau, des parts de gâteau |
| 2 | la tarte | paj | une tarte, des tartes |
| 1 | la glace | glass | une glace, des glaces |
| 1 | commander | beställa | commande · commande · ai commandé · commande |
| 1 | réserver | boka | réserve · réserve · ai réservé · réserve |
| 1 | payer | betala | paie · paie · ai payé · paie |
| 1 | choisir | välja | choisis · choisit · ai choisi · choisisse |
| 1 | prendre | ta | prends · prend · ai pris · prenne |
| 1 | boire | dricka | bois · boit · ai bu · boive |
| 1 | manger | äta | mange · mange · ai mangé · mange |
| 2 | servir | servera | sers · sert · ai servi · serve |
| 2 | apporter | bära in | apporte · apporte · ai apporté · apporte |
| 2 | goûter | smaka | goûte · goûte · ai goûté · goûte |
| 2 | recommander | rekommendera | recommande · recommande · ai recommandé · recommande |
| 2 | partager | dela | partage · partage · ai partagé · partage |
| 3 | débarrasser | duka av | débarrasse · débarrasse · ai débarrassé · débarrasse |
| 2 | bleu | mycket blodig |  |
| 1 | saignant | blodig |  |
| 1 | à point | medium |  |
| 1 | bien cuit | genomstekt |  |
| 1 | chaud | varm |  |
| 1 | froid | kall |  |
| 2 | épicé | stark |  |
| 2 | salé | salt |  |
| 2 | sucré | söt |  |
| 1 | délicieux | läcker |  |
| 2 | fait maison | hemgjord |  |
| 1 | végétarien | vegetarisk |  |
| 2 | végétalien | vegansk |  |
| 2 | sans gluten | glutenfri |  |
| 2 | compris | inkluderad |  |
| 2 | frais | färsk |  |
| 2 | complet | fullbokad |  |
| 1 | Une table pour deux, s'il vous plaît. | Ett bord för två, tack. |  |
| 1 | Avez-vous une table libre ? | Har ni ett ledigt bord? |  |
| 1 | J'ai réservé une table au nom de... | Jag har bokat ett bord i namnet... |  |
| 2 | Pouvons-nous nous asseoir en terrasse ? | Kan vi sitta på uteserveringen? |  |
| 1 | La carte, s'il vous plaît. | Menyn, tack. |  |
| 1 | Êtes-vous prêts à commander ? | Är ni redo att beställa? |  |
| 1 | Nous sommes prêts à commander. | Vi är redo att beställa. |  |
| 1 | Qu'est-ce que vous recommandez ? | Vad rekommenderar ni? |  |
| 1 | Quel est le plat du jour ? | Vad är dagens rätt? |  |
| 1 | Je voudrais commander... | Jag skulle vilja beställa... |  |
| 1 | Je prends le menu du jour. | Jag tar dagens meny. |  |
| 2 | Pour moi, la même chose, s'il vous plaît. | Samma sak för mig, tack. |  |
| 1 | Une carafe d'eau, s'il vous plaît. | En karaff vatten, tack. |  |
| 1 | L'addition, s'il vous plaît. | Notan, tack. |  |
| 2 | Est-ce que le service est compris ? | Är dricksen inkluderad? |  |
| 2 | Gardez la monnaie. | Behåll växeln. |  |
| 1 | On peut payer par carte ? | Kan man betala med kort? |  |
| 2 | En espèces, s'il vous plaît. | Kontant, tack. |  |
| 2 | Pouvons-nous payer séparément ? | Kan vi betala var för sig? |  |
| 1 | C'était délicieux, merci ! | Det var jättegott, tack! |  |

### Mae224d — 163 glosor

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
| 1 | réserver | reservera | je réserve, il réserve · j'ai réservé · qu'il réserve |
| 1 | la réservation | reservation | une réservation, des réservations |
| 1 | l'addition | nota | une addition, des additions |
| 1 | payer | betala | je paie, il paie · j'ai payé · qu'il paie |
| 1 | le plat | rätt, maträtt | un plat, des plats |
| 1 | l'entrée | förrätt | une entrée, des entrées |
| 1 | le plat principal | huvudrätt | un plat principal, des plats principaux |
| 1 | le dessert | dessert | un dessert, des desserts |
| 1 | la boisson | dryck | une boisson, des boissons |
| 1 | l'eau | vatten | une eau, des eaux |
| 1 | le vin | vin | un vin, des vins |
| 1 | la bière | öl | une bière, des bières |
| 1 | le thé | te | un thé, des thés |
| 1 | le jus | juice | un jus, des jus |
| 1 | le pain | bröd | un pain, des pains |
| 1 | la viande | kött | une viande, des viandes |
| 1 | le poisson | fisk | un poisson, des poissons |
| 1 | la salade | sallad | une salade, des salades |
| 1 | la soupe | soppa | une soupe, des soupes |
| 1 | le fromage | ost | un fromage, des fromages |
| 1 | manger | äta | je mange, il mange · j'ai mangé · qu'il mange |
| 1 | boire | dricka | je bois, il boit · j'ai bu · qu'il boive |
| 1 | le verre | glas | un verre, des verres |
| 1 | la tasse | kopp | une tasse, des tasses |
| 1 | l'assiette | tallrik | une assiette, des assiettes |
| 1 | la fourchette | gaffel | une fourchette, des fourchettes |
| 1 | le couteau | kniv | un couteau, des couteaux |
| 1 | la cuillère | sked | une cuillère, des cuillères |
| 1 | la serviette | servett | une serviette, des serviettes |
| 1 | le pourboire | dricks | un pourboire, des pourboires |
| 1 | le petit déjeuner | frukost | un petit déjeuner, des petits déjeuners |
| 1 | le déjeuner | lunch | un déjeuner, des déjeuners |
| 1 | le dîner | middag | un dîner, des dîners |
| 1 | le prix | pris | un prix, des prix |
| 1 | l'eau plate | stilla vatten | une eau plate, des eaux plates |
| 1 | l'eau gazeuse | kolsyrat vatten | une eau gazeuse, des eaux gazeuses |
| 2 | le sel | salt | un sel, des sels |
| 2 | le poivre | peppar | un poivre, des poivres |
| 2 | le sucre | socker | un sucre, des sucres |
| 2 | le lait | mjölk | un lait, des laits |
| 2 | le beurre | smör | un beurre, des beurres |
| 2 | la crème | grädde | une crème, des crèmes |
| 2 | le poulet | kyckling | un poulet, des poulets |
| 2 | le bœuf | nötkött | un bœuf, des bœufs |
| 2 | le porc | fläsk | un porc, des porcs |
| 2 | les fruits de mer | skaldjur | des fruits de mer |
| 2 | le légume | grönsak | un légume, des légumes |
| 2 | le riz | ris | un riz, des riz |
| 2 | les pâtes | pasta | des pâtes |
| 2 | les frites | pommes frites | des frites |
| 2 | le gâteau | tårta, kaka | un gâteau, des gâteaux |
| 2 | la glace | glass | une glace, des glaces |
| 2 | la crêpe | crêpe, pannkaka | une crêpe, des crêpes |
| 2 | le croissant | croissant | un croissant, des croissants |
| 2 | la baguette | baguette | une baguette, des baguettes |
| 2 | le sandwich | smörgås | un sandwich, des sandwichs |
| 2 | la carte des vins | vinlista | une carte des vins, des cartes des vins |
| 1 | le plat du jour | dagens rätt | un plat du jour, des plats du jour |
| 2 | la terrasse | uteservering | une terrasse, des terrasses |
| 2 | le comptoir | bardisk | un comptoir, des comptoirs |
| 2 | la cuisine | kök, matlagning | une cuisine, des cuisines |
| 2 | le chef | kock, kökschef | un chef, des chefs |
| 2 | le cuisinier | kock | un cuisinier, des cuisiniers |
| 2 | cuisiner | laga mat | je cuisine, il cuisine · j'ai cuisiné · qu'il cuisine |
| 2 | goûter | smaka | je goûte, il goûte · j'ai goûté · qu'il goûte |
| 1 | servir | servera | je sers, il sert · j'ai servi · qu'il serve |
| 1 | choisir | välja | je choisis, il choisit · j'ai choisi · qu'il choisisse |
| 2 | recommander | rekommendera | je recommande, il recommande · j'ai recommandé · qu'il recommande |
| 2 | la bouteille | flaska | une bouteille, des bouteilles |
| 2 | la carafe | karaff | une carafe, des carafes |
| 2 | la carte de crédit | kreditkort | une carte de crédit, des cartes de crédit |
| 2 | en espèces | kontant |  |
| 2 | le reçu | kvitto | un reçu, des reçus |
| 1 | la commande | beställning | une commande, des commandes |
| 2 | l'apéritif | aperitif | un apéritif, des apéritifs |
| 3 | le digestif | digestif | un digestif, des digestifs |
| 2 | le vin rouge | rödvin | un vin rouge, des vins rouges |
| 2 | le vin blanc | vitt vin | un vin blanc, des vins blancs |
| 3 | le vin rosé | rosévin | un vin rosé, des vins rosés |
| 3 | la nappe | bordsduk | une nappe, des nappes |
| 3 | le plateau | bricka | un plateau, des plateaux |
| 2 | la sauce | sås | une sauce, des sauces |
| 2 | l'huile d'olive | olivolja | une huile d'olive, des huiles d'olive |
| 3 | le vinaigre | vinäger | un vinaigre, des vinaigres |
| 2 | épicé | kryddstark |  |
| 2 | salé | salt (adj.) |  |
| 2 | sucré | söt, sockrad |  |
| 3 | amer | bitter |  |
| 1 | délicieux | utsökt, läcker |  |
| 1 | bon | god, bra |  |
| 2 | mauvais | dålig |  |
| 1 | chaud | varm |  |
| 1 | froid | kall |  |
| 3 | tiède | ljummen |  |
| 2 | cuit | tillagad |  |
| 3 | cru | rå |  |
| 2 | grillé | grillad |  |
| 2 | rôti | ugnsrostad, stekt |  |
| 3 | frit | friterad |  |
| 3 | fumé | rökt |  |
| 2 | végétarien | vegetarisk |  |
| 2 | sans gluten | glutenfri |  |
| 2 | l'allergie | allergi | une allergie, des allergies |
| 2 | allergique | allergisk |  |
| 2 | la portion | portion | une portion, des portions |
| 3 | copieux | riklig, rejäl |  |
| 2 | l'œuf | ägg | un œuf, des œufs |
| 2 | le fruit | frukt | un fruit, des fruits |
| 2 | la pomme de terre | potatis | une pomme de terre, des pommes de terre |
| 3 | le champignon | svamp | un champignon, des champignons |
| 3 | l'ail | vitlök | un ail, des aulx |
| 3 | l'oignon | lök | un oignon, des oignons |
| 2 | la tomate | tomat | une tomate, des tomates |
| 3 | le citron | citron | un citron, des citrons |
| 1 | Excusez-moi | Ursäkta mig |  |
| 1 | S'il vous plaît | Tack, snälla |  |
| 1 | Merci | Tack |  |
| 1 | L'addition, s'il vous plaît | Notan, tack |  |
| 1 | Je voudrais… | Jag skulle vilja… |  |
| 1 | Je vais prendre… | Jag tar… |  |
| 1 | Qu'est-ce que vous recommandez ? | Vad rekommenderar ni? |  |
| 2 | C'est quoi, ce plat ? | Vad är det för rätt? |  |
| 1 | Une table pour deux, s'il vous plaît | Ett bord för två, tack |  |
| 1 | Est-ce que vous avez une table libre ? | Har ni ett ledigt bord? |  |
| 2 | C'est compris ? | Är det inkluderat? |  |
| 2 | le service | serveringsavgift | un service, des services |
| 1 | le menu du jour | dagens meny | un menu du jour, des menus du jour |
| 2 | à emporter | att ta med |  |
| 2 | sur place | att äta här |  |
| 2 | la spécialité | specialitet | une spécialité, des spécialités |
| 2 | le goût | smak | un goût, des goûts |
| 3 | la recette | recept | une recette, des recettes |
| 3 | l'ingrédient | ingrediens | un ingrédient, des ingrédients |
| 2 | la brasserie | brasserie, ölhall | une brasserie, des brasseries |
| 2 | la bistrot | bistro | un bistrot, des bistrots |
| 2 | le bar | bar | un bar, des bars |
| 2 | la salle | matsal | une salle, des salles |
| 2 | la chaise | stol | une chaise, des chaises |
| 3 | le banc | bänk | un banc, des bancs |
| 2 | attendre | vänta | j'attends, il attend · j'ai attendu · qu'il attende |
| 2 | apporter | ta med, bära fram | j'apporte, il apporte · j'ai apporté · qu'il apporte |
| 3 | ajouter | lägga till | j'ajoute, il ajoute · j'ai ajouté · qu'il ajoute |
| 3 | la confiture | sylt | une confiture, des confitures |
| 3 | le miel | honung | un miel, des miels |
| 2 | le chocolat chaud | varm choklad | un chocolat chaud, des chocolats chauds |
| 2 | l'expresso | espresso | un expresso, des expressos |
| 2 | le café crème | kaffe med mjölk/grädde | un café crème, des cafés crème |
| 3 | le décaféiné | koffeinfritt kaffe | un décaféiné, des décaféinés |
| 1 | Bon appétit ! | Smaklig måltid! |  |
| 2 | Santé ! | Skål! |  |
| 1 | C'était délicieux | Det var utsökt |  |
| 2 | complet | fullbokat |  |
| 2 | libre | ledig |  |
| 2 | occupé | upptagen |  |
| 2 | fait maison | hemlagad |  |

### Md79d6c — 175 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, deux restaurants |
| 1 | le café | kafé | un café, deux cafés |
| 1 | la brasserie | brasserie | une brasserie, deux brasseries |
| 1 | le bistrot | bistro | un bistrot, deux bistrots |
| 1 | le menu | meny | un menu, deux menus |
| 1 | la carte | karta (meny) | une carte, deux cartes |
| 1 | la table | bord | une table, deux tables |
| 2 | la chaise | stol | une chaise, deux chaises |
| 1 | le serveur | servitör (man) | un serveur, deux serveurs |
| 1 | la serveuse | servitris (kvinna) | une serveuse, deux serveuses |
| 1 | le chef | kock (chef) | un chef, deux chefs |
| 2 | le cuisinier | kock (köksmästare) | un cuisinier, deux cuisiniers |
| 1 | le client | kund (man) | un client, deux clients |
| 1 | la cliente | kund (kvinna) | une cliente, deux clientes |
| 1 | le plat | rätt (mat) | un plat, deux plats |
| 1 | l'entrée | förrätt | une entrée, deux entrées |
| 1 | le dessert | efterrätt | un dessert, deux desserts |
| 1 | la boisson | dryck | une boisson, deux boissons |
| 1 | le vin | vin | un vin, deux vins |
| 2 | la bière | öl | une bière, deux bières |
| 1 | le café (dryck) | kaffe (dryck) | un café, deux cafés |
| 2 | le thé | te | un thé, deux thés |
| 2 | le jus | juice | un jus, deux jus |
| 1 | l'eau | vatten | une eau, deux eaux |
| 2 | le pain | bröd | un pain, deux pains |
| 2 | le croissant | croissant | un croissant, deux croissants |
| 2 | la baguette | baguette | une baguette, deux baguettes |
| 2 | le fromage | ost | un fromage, deux fromages |
| 2 | la salade | sallad | une salade, deux salades |
| 2 | la soupe | soppa | une soupe, deux soupes |
| 2 | le steak | stek | un steak, deux steaks |
| 2 | les frites | pommes frites | des frites, deux portions de frites |
| 2 | le poisson | fisk | un poisson, deux poissons |
| 2 | la viande | kött | une viande, deux viandes |
| 2 | le poulet | kyckling | un poulet, deux poulets |
| 3 | le riz | ris | un riz, deux riz |
| 2 | les pâtes | pasta | des pâtes, deux portions de pâtes |
| 2 | le dessert du jour | dagens efterrätt |  |
| 1 | le petit déjeuner | frukost |  |
| 1 | le déjeuner | lunch |  |
| 1 | le dîner | middag |  |
| 3 | le goûter | mellanmål |  |
| 1 | la réservation | bokning | une réservation, deux réservations |
| 2 | le numéro de table | bordnummer |  |
| 1 | l'addition | notan | une addition, deux additions |
| 2 | le pourboire | dricks | un pourboire, deux pourboires |
| 1 | le serveur | servitör (man) | un serveur, deux serveurs |
| 1 | la serveuse | servitris (kvinna) | une serveuse, deux serveuses |
| 2 | le plat du jour | dagens rätt |  |
| 2 | le menu du jour | dagens meny |  |
| 2 | le verre | glas | un verre, deux verres |
| 2 | la fourchette | gaffel | une fourchette, deux fourchettes |
| 2 | le couteau | kniv | un couteau, deux couteaux |
| 2 | la cuillère | sked | une cuillère, deux cuillères |
| 2 | l'assiette | tallrik | une assiette, deux assiettes |
| 3 | le napperon | servett | un napperon, deux napperons |
| 3 | le serviette | servett (papper) | une serviette, deux serviettes |
| 2 | le comptoir | disk | un comptoir, deux comptoirs |
| 2 | le bar | bar | un bar, deux bars |
| 3 | l'extérieur | utomhusområde |  |
| 2 | la terrasse | terrass | une terrasse, deux terrasses |
| 3 | le wifi | wifi |  |
| 2 | le plat végétarien | vegetarisk rätt |  |
| 2 | le plat sans gluten | glutenfri rätt |  |
| 2 | le plat épicé | kryddstark rätt |  |
| 2 | le plat sucré | söt rätt |  |
| 2 | le plat salé | salt rätt |  |
| 2 | le plat chaud | varm rätt |  |
| 2 | le plat froid | kall rätt |  |
| 2 | le plat du chef | kockens special |  |
| 1 | le plat du jour | dagens rätt |  |
| 2 | le plat à emporter | mat att ta med |  |
| 1 | le service | service | un service, deux services |
| 2 | le client satisfait | nöjd kund |  |
| 3 | le client pressé | brådska kund |  |
| 1 | le repas | måltid | un repas, deux repas |
| 2 | le brunch | brunch | un brunch, deux brunchs |
| 2 | le buffet | buffé | un buffet, deux buffets |
| 2 | le plat à la carte | à la carte-rätt |  |
| 1 | le plat du jour | dagens rätt |  |
| 2 | le plat du chef | kockens special |  |
| 2 | le plat du menu | menyrätt |  |
| 1 | le plat du jour | dagens rätt |  |
| 2 | le plat du chef | kockens special |  |
| 1 | le plat du jour | dagens rätt |  |
| 1 | commander | beställa | je commande·il commande·j'ai commandé·qu'il commande |
| 1 | servir | servera | je sers·il sert·j'ai servi·qu'il serve |
| 1 | manger | äta | je mange·il mange·j'ai mangé·qu'il mange |
| 1 | boire | dricka | je bois·il boit·j'ai bu·qu'il boive |
| 1 | payer | betala | je paie·il paie·j'ai payé·qu'il paie |
| 1 | réserver | boka | je réserve·il réserve·j'ai réservé·qu'il réserve |
| 1 | demander | fråga, be om | je demande·il demande·j'ai demandé·qu'il demande |
| 1 | recommander | rekommendera | je recommande·il recommande·j'ai recommandé·qu'il recommande |
| 2 | préparer | förbereda | je prépare·il prépare·j'ai préparé·qu'il prépare |
| 2 | cuisiner | laga mat | je cuisine·il cuisine·j'ai cuisiné·qu'il cuisine |
| 2 | attendre | vänta | j'attends·il attend·j'ai attendu·qu'il attende |
| 2 | savourer | njuta av | je savoure·il savoure·j'ai savouré·qu'il savoure |
| 2 | goûter | smaka | je goûte·il goûte·j'ai goûté·qu'il goûte |
| 1 | délicieux | läcker |  |
| 1 | délicieuse | läcker (f) |  |
| 2 | savoureux | smakrik |  |
| 2 | savoureuse | smakrik (f) |  |
| 2 | épicé | kryddstark |  |
| 2 | sucré | söt |  |
| 2 | salé | salt |  |
| 2 | chaud | varm |  |
| 2 | froid | kall |  |
| 2 | frais | färsk |  |
| 3 | bio | ekologisk |  |
| 2 | végétarien | vegetarisk (man) | un végétarien, deux végétariens |
| 2 | végétarienne | vegetarisk (kvinna) | une végétarienne, deux végétariennes |
| 2 | végétalien | vegansk (man) | un végétalien, deux végétaliens |
| 2 | végétalienne | vegansk (kvinna) | une végétalienne, deux végétaliennes |
| 2 | sans gluten | utan gluten |  |
| 3 | sans lactose | utan laktos |  |
| 2 | au comptoir | vid disken |  |
| 2 | à emporter | att ta med |  |
| 2 | sur place | på plats |  |
| 2 | en terrasse | på terrassen |  |
| 3 | en salle | i matsalen |  |
| 1 | le serveur vous apporte l'addition | servitören ger dig notan |  |
| 1 | Je voudrais... | Jag skulle vilja... |  |
| 1 | Je prends... | Jag tar... |  |
| 1 | L'addition, s'il vous plaît | Notan, tack |  |
| 1 | Un verre d'eau, s'il vous plaît | Ett glas vatten, tack |  |
| 1 | Quel est le plat du jour ? | Vad är dagens rätt? |  |
| 1 | C'est délicieux ! | Det är utsökt! |  |
| 2 | Je suis allergique à... | Jag är allergisk mot... |  |
| 2 | Je ne mange pas de... | Jag äter inte... |  |
| 2 | C'est trop salé | Det är för salt |  |
| 2 | C'est trop sucré | Det är för sött |  |
| 2 | C'est trop épicé | Det är för kryddstarkt |  |
| 2 | Le service est lent | Servicen är långsam |  |
| 1 | Le service est excellent | Servicen är utmärkt |  |
| 2 | Je recommande le... | Jag rekommenderar... |  |
| 2 | C'est à votre goût ? | Är det efter din smak? |  |
| 3 | Je suis pressé | Jag har bråttom |  |
| 1 | Je veux une table pour deux | Jag vill ha ett bord för två |  |
| 2 | Une table près de la fenêtre | Ett bord vid fönstret |  |
| 2 | Le menu du jour est... | Dagens meny är... |  |
| 1 | Le plat du jour est... | Dagens rätt är... |  |
| 2 | Je suis végétarien | Jag är vegetarian |  |
| 2 | Je suis végétalien | Jag är vegansk |  |
| 2 | Je suis sans gluten | Jag är glutenfri |  |
| 2 | Le chef recommande... | Kocken rekommenderar... |  |
| 3 | Le plat est trop cuit | Rätten är för kokt |  |
| 3 | Le plat est trop cru | Rätten är för rå |  |
| 2 | Le serveur est sympathique | Servitören är vänlig |  |
| 3 | Le serveur est pressé | Servitören har bråttom |  |
| 2 | Le restaurant est plein | Restaurangen är full |  |
| 3 | Le restaurant est vide | Restaurangen är tom |  |
| 3 | Le décor est agréable | Inredningen är trevlig |  |
| 3 | Le bruit est fort | Det är högt ljud |  |
| 3 | Le Wi‑Fi est gratuit | Wi‑Fi är gratis |  |
| 2 | Le prix est raisonnable | Priset är rimligt |  |
| 2 | Le prix est élevé | Priset är högt |  |
| 3 | Le plat est généreux | Rätten är generös (stor) |  |
| 3 | Le plat est petit | Rätten är liten |  |
| 1 | Je voudrais l'addition, s'il vous plaît | Jag vill ha notan, tack |  |
| 1 | Je voudrais un café | Jag vill ha ett kaffe |  |
| 1 | Je voudrais un verre de vin rouge | Jag vill ha ett glas rött vin |  |
| 1 | Je voudrais une bouteille d'eau | Jag vill ha en flaska vatten |  |
| 1 | Je voudrais le plat du jour | Jag vill ha dagens rätt |  |
| 2 | Je voudrais une table à l'extérieur | Jag vill ha ett bord utomhus |  |
| 2 | Je voudrais une table près de la fenêtre | Jag vill ha ett bord vid fönstret |  |
| 1 | Je voudrais un dessert | Jag vill ha en efterrätt |  |
| 2 | Je voudrais un verre de bière | Jag vill ha ett glas öl |  |
| 2 | Je voudrais un jus d'orange | Jag vill ha ett apelsinjuice |  |
| 2 | Je voudrais un croissant | Jag vill ha ett croissant |  |
| 2 | Je voudrais une salade | Jag vill ha en sallad |  |
| 2 | Je voudrais un steak | Jag vill ha en biff |  |
| 2 | Je voudrais du poisson | Jag vill ha fisk |  |
| 2 | Je voudrais du poulet | Jag vill ha kyckling |  |
| 2 | Je voudrais des frites | Jag vill ha pommes frites |  |
| 2 | Je voudrais une soupe du jour | Jag vill ha dagens soppa |  |

### M2a5587 — 150 glosor

| prio | ord | svenska | böjning |
|---|---|---|---|
| 1 | le restaurant | restaurang | un restaurant, deux restaurants |
| 1 | le café | kafé | un café, deux cafés |
| 2 | la brasserie | brasserie | une brasserie, deux brasseries |
| 3 | le bistrot | bistro | un bistrot, deux bistrots |
| 1 | le serveur | kypare | un serveur, deux serveurs |
| 1 | la serveuse | servitris | une serveuse, deux serveuses |
| 2 | le client | kund | un client, deux clients |
| 2 | la cliente | kund | une cliente, deux clientes |
| 2 | le chef | kock | un chef, deux chefs |
| 3 | le cuisinier | kock | un cuisinier, deux cuisiniers |
| 3 | le barman | bartender | un barman, deux barmans |
| 3 | le patron | ägare | un patron, deux patrons |
| 3 | le maître d'hôtel | hovmästare | un maître d'hôtel, deux maîtres d'hôtel |
| 2 | la terrasse | uteservering | une terrasse, deux terrasses |
| 3 | le comptoir | bardisk | un comptoir, deux comptoirs |
| 1 | la table | bord | une table, deux tables |
| 2 | la chaise | stol | une chaise, deux chaises |
| 1 | le menu | meny | un menu, deux menus |
| 1 | la carte | meny | une carte, deux cartes |
| 2 | la carte des vins | vinlista | une carte des vins, deux cartes des vins |
| 1 | l'addition | nota | une addition, deux additions |
| 1 | le pourboire | dricks | un pourboire, deux pourboires |
| 1 | l'assiette | tallrik | une assiette, deux assiettes |
| 1 | le verre | glas | un verre, deux verres |
| 1 | la fourchette | gaffel | une fourchette, deux fourchettes |
| 1 | le couteau | kniv | un couteau, deux couteaux |
| 1 | la cuillère | sked | une cuillère, deux cuillères |
| 2 | la petite cuillère | tesked | une petite cuillère, deux petites cuillères |
| 1 | la serviette | servett | une serviette, deux serviettes |
| 3 | la nappe | duk | une nappe, deux nappes |
| 1 | le sel | salt | un sel, deux sels |
| 1 | le poivre | peppar | un poivre, deux poivres |
| 1 | le sucre | socker | un sucre, deux sucres |
| 3 | le cendrier | askkopp | un cendrier, deux cendriers |
| 1 | la carafe d'eau | vattenkaraff | une carafe d'eau, deux carafes d'eau |
| 2 | le repas | måltid | un repas, deux repas |
| 1 | le petit-déjeuner | frukost | un petit-déjeuner, deux petits-déjeuners |
| 1 | le déjeuner | lunch | un déjeuner, deux déjeuners |
| 1 | le dîner | middag | un dîner, deux dîners |
| 1 | l'entrée | förrätt | une entrée, deux entrées |
| 1 | le plat | varmrätt | un plat, deux plats |
| 2 | le plat principal | huvudrätt | un plat principal, deux plats principaux |
| 1 | le dessert | efterrätt | un dessert, deux desserts |
| 2 | le fromage | ost | un fromage, deux fromages |
| 2 | l'apéritif | aperitif | un apéritif, deux apéritifs |
| 3 | le digestif | digestif | un digestif, deux digestifs |
| 1 | le plat du jour | dagens rätt | un plat du jour, deux plats du jour |
| 2 | le menu enfant | barnmeny | un menu enfant, deux menus enfant |
| 2 | la formule | fast meny | une formule, deux formules |
| 3 | le buffet | buffé | un buffet, deux buffets |
| 1 | l'eau | vatten | une eau, deux eaux |
| 2 | l'eau plate | vatten utan kolsyra | une eau plate, deux eaux plates |
| 2 | l'eau gazeuse | kolsyrat vatten | une eau gazeuse, deux eaux gazeuses |
| 1 | le vin | vin | un vin, deux vins |
| 1 | le vin rouge | rött vin | un vin rouge, deux vins rouges |
| 1 | le vin blanc | vitt vin | un vin blanc, deux vins blancs |
| 2 | le vin rosé | rosévin | un vin rosé, deux vins rosés |
| 1 | la bière | öl | une bière, deux bières |
| 1 | le café | kaffe | un café, deux cafés |
| 2 | l'espresso | espresso | un espresso, deux espressos |
| 2 | le café au lait | kaffe med mjölk | un café au lait, deux cafés au lait |
| 1 | le thé | te | un thé, deux thés |
| 1 | le jus | juice | un jus, deux jus |
| 2 | le jus d'orange | apelsinjuice | un jus d'orange, deux jus d'orange |
| 2 | le soda | läsk | un soda, deux sodas |
| 2 | le lait | mjölk | un lait, deux laits |
| 3 | le champagne | champagne | un champagne, deux champagnes |
| 3 | le cocktail | cocktail | un cocktail, deux cocktails |
| 3 | le sirop | saft | un sirop, deux sirops |
| 2 | le chocolat chaud | varm choklad | un chocolat chaud, deux chocolats chauds |
| 1 | le pain | bröd | un pain, deux pains |
| 1 | le beurre | smör | un beurre, deux beurres |
| 1 | la viande | kött | une viande, deux viandes |
| 1 | le poisson | fisk | un poisson, deux poissons |
| 1 | le poulet | kyckling | un poulet, deux poulets |
| 2 | le bœuf | nötkött | un bœuf, deux bœufs |
| 2 | le porc | fläskkött | un porc, deux porcs |
| 3 | l'agneau | lammkött | un agneau, deux agneaux |
| 3 | le canard | anka | un canard, deux canards |
| 2 | les fruits de mer | skaldjur | un fruit de mer, deux fruits de mer |
| 3 | la crevette | räka | une crevette, deux crevettes |
| 1 | le légume | grönsak | un légume, deux légumes |
| 1 | la salade | sallad | une salade, deux salades |
| 1 | la soupe | soppa | une soupe, deux soupes |
| 3 | le potage | soppa | un potage, deux potages |
| 1 | la frite | pommes frites | une frite, deux frites |
| 1 | la pâte | pasta | une pâte, deux pâtes |
| 1 | le riz | ris | un riz, deux riz |
| 2 | la pomme de terre | potatis | une pomme de terre, deux pommes de terre |
| 2 | la sauce | sås | une sauce, deux sauces |
| 2 | l'œuf | ägg | un œuf, deux œufs |
| 2 | l'omelette | omelett | une omelette, deux omelettes |
| 1 | le sandwich | smörgås | un sandwich, deux sandwichs |
| 2 | le croque-monsieur | varm smörgås | un croque-monsieur, deux croque-monsieurs |
| 2 | la quiche | paj | une quiche, deux quiches |
| 2 | la crêpe | pannkaka | une crêpe, deux crêpes |
| 2 | le gâteau | kaka | un gâteau, deux gâteaux |
| 2 | la tarte | tårta | une tarte, deux tartes |
| 1 | la glace | glass | une glace, deux glaces |
| 2 | le fruit | frukt | un fruit, deux fruits |
| 1 | manger | äta | je mange · il mange · j'ai mangé · qu'il mange |
| 1 | boire | dricka | je bois · il boit · j'ai bu · qu'il boive |
| 1 | commander | beställa | je commande · il commande · j'ai commandé · qu'il commande |
| 1 | payer | betala | je paie · il paie · j'ai payé · qu'il paie |
| 1 | réserver | boka | je réserve · il réserve · j'ai réservé · qu'il réserve |
| 2 | goûter | smaka | je goûte · il goûte · j'ai goûté · qu'il goûte |
| 1 | choisir | välja | je choisis · il choisit · j'ai choisi · qu'il choisisse |
| 2 | servir | servera | je sers · il sert · j'ai servi · qu'il serve |
| 2 | recommander | rekommendera | je recommande · il recommande · j'ai recommandé · qu'il recommande |
| 1 | prendre | ta | je prends · il prend · j'ai pris · qu'il prenne |
| 2 | déjeuner | äta lunch | je déjeune · il déjeune · j'ai déjeuné · qu'il déjeune |
| 2 | dîner | äta middag | je dîne · il dîne · j'ai dîné · qu'il dîne |
| 3 | partager | dela | je partage · il partage · j'ai partagé · qu'il partage |
| 2 | apporter | komma med | j'apporte · il apporte · j'ai apporté · qu'il apporte |
| 3 | débarrasser | duka av | je débarrasse · il débarrasse · j'ai débarrassé · qu'il débarrasse |
| 2 | régler | betala | je règle · il règle · j'ai réglé · qu'il règle |
| 2 | laisser | lämna | je laisse · il laisse · j'ai laissé · qu'il laisse |
| 2 | demander | fråga | je demande · il demande · j'ai demandé · qu'il demande |
| 2 | attendre | vänta | j'attends · il attend · j'ai attendu · qu'il attende |
| 3 | cuisiner | laga mat | je cuisine · il cuisine · j'ai cuisiné · qu'il cuisine |
| 1 | délicieux | utsökt |  |
| 1 | bon | god |  |
| 2 | mauvais | dålig |  |
| 1 | chaud | varm |  |
| 1 | froid | kall |  |
| 3 | tiède | ljummen |  |
| 2 | sucré | söt |  |
| 2 | salé | salt |  |
| 2 | épicé | kryddig |  |
| 1 | végétarien | vegetarisk |  |
| 2 | végétalien | vegansk |  |
| 2 | saignant | blodig |  |
| 2 | à point | medium |  |
| 2 | bien cuit | välstekt |  |
| 2 | frais | färsk |  |
| 1 | l'addition s'il vous plaît | notan tack |  |
| 1 | je voudrais | jag skulle vilja ha |  |
| 1 | avez-vous | har ni |  |
| 1 | c'est combien | hur mycket kostar det |  |
| 1 | une table pour deux | ett bord för två |  |
| 1 | s'il vous plaît | tack |  |
| 1 | merci | tack |  |
| 1 | bon appétit | smaklig måltid |  |
| 2 | santé | skål |  |
| 2 | à votre santé | skål |  |
| 2 | gardez la monnaie | behåll växeln |  |
| 1 | c'est très bon | det är mycket gott |  |
| 1 | je suis allergique | jag är allergisk |  |
| 2 | sans gluten | glutenfri |  |
| 3 | l'addition est correcte | notan stämmer |  |
