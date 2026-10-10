// Flippas AI-proxy. Finns av ett enda skäl: Gemini-nyckeln får inte ligga i appen.
// Appen är en statisk PWA på GitHub Pages – allt som skickas dit är publikt.
//
// Vad den gör:
//   POST /slaupp   { ord: ["hund", ...], lang: "es-ES", riktning: "sv2for" }
//                → { traffar: [{ ord, oversattning, bojning, prio, uttal }] }
//
// Skydd: bara anrop från appens origin, och bara med en giltig Firebase-inloggning
// (samma anonyma inloggning appen redan har). Utan det vore endpointen en öppen
// Gemini-kran som vem som helst kan bränna dygnskvoten på.

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const tillatna = (env.TILLATNA_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
    const cors = {
      "Access-Control-Allow-Origin": tillatna.includes(origin) ? origin : tillatna[0] || "",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const svar = (data, status = 200) =>
      new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...cors } });

    if (!tillatna.includes(origin)) return svar({ fel: "origin" }, 403);
    if (req.method !== "POST") return svar({ fel: "metod" }, 405);

    const uid = await verifieraFirebase(req.headers.get("Authorization") || "", env.FIREBASE_PROJEKT);
    if (!uid) return svar({ fel: "inloggning" }, 401);

    let kropp;
    try { kropp = await req.json(); } catch (_) { return svar({ fel: "trasig json" }, 400); }
    const ord = (kropp.ord || []).map((o) => String(o || "").trim()).filter(Boolean).slice(0, 25);
    if (!ord.length) return svar({ fel: "inga ord" }, 400);

    const g = await fragaModell(env, prompt(ord, kropp), schema());
    if (g.fel) return svar(g, 502);
    return svar({ traffar: g.traffar });
  },
};

// ---- Gemini ----------------------------------------------------------------
function prompt(ord, k) {
  const lang = k.sprakNamn || k.lang || "målspråket";
  const tillSvenska = k.riktning === "for2sv";
  // Böjningsformuleringarna är medvetet desamma som appens egen AI-prompt
  // (formPromptNote i app.js). Annars får man "pâine, pâini" ur API:t och
  // "o pâine, două pâini" ur inklistringen, och korten ser olika ut beroende på
  // hur ordet kom in.
  return [
    tillSvenska
      ? `Översätt till svenska. Orden är på ${lang}.`
      : `Översätt till ${lang}. Orden är på svenska.`,
    `Ord: ${ord.map((o) => JSON.stringify(o)).join(", ")}`,
    ``,
    `För varje ord:`,
    `- oversattning: den vanligaste motsvarigheten, i grundform. Flera bara när de`,
    `  används olika ofta i olika sammanhang, åtskilda med komma.`,
    tillSvenska
      ? `- bojning: lämna tom.`
      : `- bojning: för substantiv obestämd singular + obestämd plural på ${lang} med`
        + ` räkneord där språket har det, t.ex. "o pâine, două pâini" eller "un perro, dos perros".`
        + ` För verb de former man inte kan gissa sig till: 1:a och 3:e person presens,`
        + ` perfekt med hjälpverb och 3:e person konjunktiv, åtskilda med mittpunkt,`
        + ` t.ex. "înțeleg, înțelege · am înțeles · să înțeleagă". Upprepa aldrig bara`
        + ` uppslagsformen. Tom sträng för andra ordklasser.`,
    `- prio: 1 om ordet hör till de mest grundläggande i språket (sådant en nybörjare`,
    `  behöver första veckan), 2 om det är vanligt, 3 om det är perifert.`,
    `- uttal: tom sträng om ${lang} skrivs med latinska bokstäver. Annars ordet med`,
    `  latinska bokstäver som det uttalas, med â för långt a (salâm, âb, khâne).`,
    ``,
    `Känner du inte igen ett ord: sätt oversattning till tom sträng. Hitta aldrig på.`,
    `Svara med ordens data i samma ordning som de kom.`,
  ].join("\n");
}

function schema() {
  return {
    type: "object",
    properties: {
      traffar: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ord: { type: "string" },
            oversattning: { type: "string" },
            bojning: { type: "string" },
            prio: { type: "integer" },
            uttal: { type: "string" },
          },
          required: ["ord", "oversattning"],
        },
      },
    },
    required: ["traffar"],
  };
}

// Leverantören byts med LEVERANTOR i wrangler.toml. Båda vägarna hålls levande: att
// byta tillbaka ska vara en rad, inte en utgrävning ur git-historiken. Svaret ser
// likadant ut oavsett vem som räknade ut det.
function fragaModell(env, text, schema) {
  return (env.LEVERANTOR || "groq") === "gemini"
    ? fragaGemini(env, text, schema)
    : fragaGroq(env, text, schema);
}

// strict-läget hos Groq kräver additionalProperties:false på VARJE objekt och att
// alla fält står i required. Gemini vill inte ha de nycklarna, så omskrivningen görs
// här i stället för i det delade schemat. Att allt blir required betyder bara att
// modellen måste skriva ut fälten – tomma strängar är fortfarande tillåtna.
function strikt(nod) {
  if (Array.isArray(nod)) return nod.map(strikt);
  if (!nod || typeof nod !== "object") return nod;
  const ut = {};
  for (const [k, v] of Object.entries(nod)) ut[k] = strikt(v);
  if (ut.type === "object" && ut.properties) {
    ut.additionalProperties = false;
    ut.required = Object.keys(ut.properties);
  }
  return ut;
}

// Groq: OpenAI-kompatibelt chat/completions med json_schema, alltså garanterat
// schemaenligt svar. Gratisnivå utan kort.
async function fragaGroq(env, text, schema) {
  let r;
  try {
    r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (env.GROQ_API_KEY || "").trim(),
      },
      body: JSON.stringify({
        model: env.MODELL_GROQ || "openai/gpt-oss-120b",
        temperature: 0.2,
        messages: [{ role: "user", content: text }],
        response_format: { type: "json_schema", json_schema: { name: "uppslag", strict: true, schema: strikt(schema) } },
      }),
    });
  } catch (e) {
    return { fel: "nätfel mot Groq", detalj: String(e) };
  }
  const rå = await r.text();
  if (!r.ok) return { fel: "groq", status: r.status, detalj: rå.slice(0, 500) };
  let data;
  try { data = JSON.parse(rå); } catch (_) { return { fel: "groq svarade inte json", detalj: rå.slice(0, 300) }; }
  const txt = data?.choices?.[0]?.message?.content;
  if (!txt) return { fel: "tomt svar", detalj: rå.slice(0, 300) };
  return tolkaTraffar(txt);
}

// Interactions API, inte det gamla models/<namn>:generateContent. De nya modellerna
// serveras inte av den gamla vägen alls – varenda flash-modell svarade 404 där, och
// 3.8 svarade 403, vilket såg ut som ett behörighetsfel men var fel endpoint.
async function fragaGemini(env, text, schema) {
  let r;
  try {
    r = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": (env.GEMINI_API_KEY || "").trim() },
      body: JSON.stringify({
        model: env.MODELL,
        input: text,
        response_format: { type: "text", mime_type: "application/json", schema },
      }),
    });
  } catch (e) {
    return { fel: "nätfel mot Gemini", detalj: String(e) };
  }
  const rå = await r.text();
  // Googles egen felbeskrivning skickas vidare – annars är ett felstavat modellnamn
  // eller en slutkörd kvot omöjligt att skilja från "det funkar inte".
  if (!r.ok) return { fel: "gemini", status: r.status, detalj: rå.slice(0, 500) };
  let data;
  try { data = JSON.parse(rå); } catch (_) { return { fel: "gemini svarade inte json", detalj: rå.slice(0, 300) }; }
  // output_text är där modellens svar ligger i Interaction-objektet. Den gamla
  // candidates-vägen läses också, så ett framtida formatbyte inte släcker allt.
  const txt = data?.interaction?.output_text ?? data?.output_text
            ?? data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!txt) return { fel: "tomt svar", detalj: rå.slice(0, 300) };
  return tolkaTraffar(txt);
}

function tolkaTraffar(txt) {
  try {
    const p = JSON.parse(txt);
    return { traffar: Array.isArray(p.traffar) ? p.traffar : [] };
  } catch (_) {
    return { fel: "modellen svarade inte enligt schemat", detalj: String(txt).slice(0, 300) };
  }
}

// ---- Firebase-inloggning ----------------------------------------------------
// Verifierar appens ID-token lokalt mot Googles publika nycklar. Ingen hemlighet
// behövs för det – signaturen räcker. Nycklarna cachas per isolat; de roteras
// sällan och ett miss leder bara till en extra hämtning.
let jwkCache = { tid: 0, nycklar: null };

async function hamtaJwk() {
  if (jwkCache.nycklar && Date.now() - jwkCache.tid < 60 * 60 * 1000) return jwkCache.nycklar;
  const r = await fetch("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
  if (!r.ok) return jwkCache.nycklar;        // behåll gamla hellre än att släcka inloggningen
  const j = await r.json();
  jwkCache = { tid: Date.now(), nycklar: j.keys || [] };
  return jwkCache.nycklar;
}

function b64url(s) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "="));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function verifieraFirebase(authHeader, projekt) {
  const token = (authHeader.match(/^Bearer\s+(.+)$/i) || [])[1];
  if (!token) return null;
  const delar = token.split(".");
  if (delar.length !== 3) return null;
  let head, payload;
  try {
    head = JSON.parse(new TextDecoder().decode(b64url(delar[0])));
    payload = JSON.parse(new TextDecoder().decode(b64url(delar[1])));
  } catch (_) { return null; }

  const nu = Math.floor(Date.now() / 1000);
  if (payload.aud !== projekt) return null;
  if (payload.iss !== `https://securetoken.google.com/${projekt}`) return null;
  if (!payload.sub || payload.exp <= nu) return null;

  const nycklar = await hamtaJwk();
  const jwk = (nycklar || []).find((k) => k.kid === head.kid);
  if (!jwk) return null;
  try {
    const key = await crypto.subtle.importKey("jwk", jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(delar[2]),
      new TextEncoder().encode(delar[0] + "." + delar[1]));
    return ok ? payload.sub : null;
  } catch (_) { return null; }
}
