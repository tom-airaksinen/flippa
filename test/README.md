# Testsvit

    node test/kor.mjs

Kör allt. Tyst = allt grönt; sista raden säger `N ok, 0 fel`.

## Vad som testas, och varför

Varje test motsvarar **en bugg som faktiskt inträffat**. Täckning för täckningens
skull är inte målet – målet är att samma fel inte ska kunna smyga sig tillbaka.
Den viktigaste gruppen är offline: det fungerade, gick tyst sönder, och upptäcktes
först på ett flygplan.

| Fil | Täcker |
|---|---|
| `10-offline.test.mjs` | Service workern: navigering utan nät, `Vary: Accept-Encoding`, vad som cachas och vad som måste gå till nätet, att `APP_VERSION` och sw-`CACHE` följs åt |
| `20-inklistring.test.mjs` | `parseLines`: tappade radbrytningar, rader utan prio, persiska Unicode-escapes, tvåradsformatet |
| `30-app.test.mjs` | Senaste ämnet per profil, uppslagets parning mot rätt ord, kort/pass-migreringen, och att prompterna bär sina regler |

## Hur det fungerar

Flippa är en enda stor fil med globala funktioner, utan moduler och utan byggsteg.
`hamta.mjs` läser källan som text, klipper ut de funktioner ett test behöver och kör
dem mot påhittade globaler. Att införa bundling bara för testernas skull vore att
bygga om huset för att hänga upp en tavla.

Priset: testerna känner till funktionsnamn. Byter ett namn fälls testet med
"hittade inte X i app.js" – ett ärligt fel, inte ett tyst.

## När något går sönder

Lägg till ett test **innan** du lagar det. Verifiera sedan att testet faller med den
gamla koden – ett test som aldrig kan fela bevisar ingenting. (De nio
offline-testerna kontrollerades så: tre återinförda buggar fällde fyra tester.)
