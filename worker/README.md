# flippa-ai – AI-proxy för uppslagning

Nyckeln till Gemini får inte ligga i appen: Flippa är en statisk PWA, allt som
skickas dit är publikt. Den här workern håller nyckeln och är det enda appen pratar
med.

## Engångsuppsättning

1. **Gemini-nyckel** – [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
   → *Create API key*. Gratisnivån räcker (Flash: ~1 500 anrop/dygn, inget kort).
   Kopiera nyckeln men klistra inte in den någonstans än.
2. **Cloudflare-konto** – [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
   Gratisplanen, inget kort. Du behöver inte klicka runt i gränssnittet efteråt.
3. I den här mappen:

       npx wrangler login                     # öppnar webbläsaren
       npx wrangler secret put GEMINI_API_KEY # klistra in nyckeln i prompten
       npx wrangler deploy

   Sista kommandot skriver ut adressen, t.ex. `https://flippa-ai.<konto>.workers.dev`.
   Den ska in i appen (säg till så lägger jag in den).

Nyckeln hamnar aldrig i repot: `secret put` skickar den direkt till Cloudflare.

## Kontrakt

    POST /slaupp
    Authorization: Bearer <Firebase ID-token>
    { "ord": ["hund"], "lang": "es-ES", "sprakNamn": "spanska", "riktning": "sv2for" }

    → { "traffar": [ { ord, oversattning, bojning, prio, uttal } ] }

Fel svarar `{ "fel": "...", "detalj": "..." }` med Googles egen text vidarebefordrad –
annars går ett felstavat modellnamn inte att skilja från en slutkörd kvot.

## Skydd

Två grindar, båda nödvändiga:

- **Origin** måste finnas i `TILLATNA_ORIGIN` (wrangler.toml).
- **Firebase-inloggning** – appens anonyma ID-token verifieras mot Googles publika
  nycklar. Utan den vore endpointen en öppen Gemini-kran som vem som helst kan
  bränna dygnskvoten på.

Testat lokalt med signerade JWT:er (`node wtest.mjs`-mönstret): fel origin, saknad
token, fel `aud`, utgången token, okänt `kid` och manipulerad payload avvisas alla
innan Gemini anropas. Bara det giltiga anropet går vidare.

## Byt modell

`MODELL` i `wrangler.toml`, sedan `npx wrangler deploy`. Workern skickar tillbaka
Googles felmeddelande, så ett namn som inte finns syns direkt i svaret.
