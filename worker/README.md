# flippa-ai – AI-proxy för uppslagning

Nyckeln till Gemini får inte ligga i appen: Flippa är en statisk PWA, allt som
skickas dit är publikt. Den här workern håller nyckeln och är det enda appen pratar
med.

## Leverantör per endpoint

Valen står i `wrangler.toml` och bygger på `scripts/modelltest`: nio modeller,
fyra teman, 50 och 150 glosor, blindbedömda av åtta oberoende domare.

| Endpoint | Leverantör | Modell | Varför |
|---|---|---|---|
| `/slaupp` | Groq | `openai/gpt-oss-120b` | Gratis, och duger: att översätta ett känt ord kräver ingen domänkunskap |
| `/lektion` | OpenRouter | `anthropic/claude-sonnet-5.5` | Etta i sju av åtta körningar, lägsta betyg 4,5. ~0,50 kr per 50-ordslektion |

Billigare andrahandsval om volymen växer: `google/gemini-3.8-flash` (tvåa i testet,
en tredjedel av priset, dubbelt så snabb). Byt `MODELL_LEKTION` och deploya.

Gemini direkt-vägen finns kvar i koden men är oanvändbar: Google nekar kontot
(`403 "Your project has been denied access"`) även för ett nyskapat projekt som
dashboarden visar som Free tier.

## Vem får använda den betalda modellen

`LEKTION_PROFILER` i `wrangler.toml` listar profilerna som släpps in på `/lektion`.
Gästkontot står medvetet inte med – det delas av alla som provar appen. Appen döljer
dessutom Inbyggd-valet för gästen, så ingen möter ett fel.

Profilen kommer från klienten och **går att förfalska**. Det här är en tröskel mot
oavsiktlig förbrukning, inte ett säkerhetslås. Det riktiga taket sätts som
utgiftsgräns på nyckeln hos OpenRouter (Keys → Edit → Credit limit).

## Engångsuppsättning

1. **Groq-nyckel** – [console.groq.com/keys](https://console.groq.com/keys) →
   *Create API Key*. Inget kort. Kopiera nyckeln men klistra inte in den någonstans än.
2. **Cloudflare-konto** – [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
   Gratisplanen, inget kort. Du behöver inte klicka runt i gränssnittet efteråt.
3. I den här mappen:

       npx wrangler login                     # öppnar webbläsaren
       npx wrangler secret put GROQ_API_KEY       # gratisnyckel, console.groq.com/keys
       npx wrangler secret put OPENROUTER_API_KEY # betalnyckel, openrouter.ai/keys
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
