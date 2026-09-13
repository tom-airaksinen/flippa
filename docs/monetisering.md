# Monetisering – Flippa & Gnugga

Arbetsdokument från diskussion 2026-09-13. Frågan: hur skulle apparna kunna dra in
pengar, vad är en bra start och hur tänker man framåt? Systerdokument:
[`positionering.html`](positionering.html) (segmentfrågan) och
[`framtida-utveckling.md`](framtida-utveckling.md) (tekniska förutsättningar:
inloggning, GDPR, Firebase-kostnad).

## Ärlig utgångspunkt

Värdet är verifierat för hushållet och för Tom själv – inte betalningsviljan hos
främlingar. Marknaden är extremt trång (Anki gratis/open source, Quizlet, Duolingo,
Memrise, Clozemaster). "En bättre glosapp" säljer inte till konsument i allmänhet;
det som kan sälja är nischer där Flippa har en orättvis fördel:

- **Svensk-först, reklamfri, ingen spårning, offline-PWA** – exakt det skolor och
  föräldrar letar efter, och exakt det Quizlet inte är.
- **Morfologidjupet** (böjning, AI-kontext, prio, riktig SRS gratis) – den seriösa
  vuxna inläraren.
- **Flippa + Gnugga som par** (glosor + grammatikdrill) – finns inte hopkopplat
  någon annanstans på svenska.

⚠️ Positioneringsdokumentet (juli) pekar mot **familj/skolelev**; dagens fråga
utgår från **ambitiös vuxen**. Segmentvalet styr intäktsmodellen – det är samma
beslut, inte två.

## Alternativen bedömda

### 1. Sälja bolaget/koden (riskkapital, EF) – inte nu
Köpare köper traction (användare, intäkter, tillväxt), inte kod. En kodbas utan
användarbas är i praktiken värd noll för en förvärvare – de kan bygga själva.
Blir aktuellt tidigast EFTER att någon annan väg lyckats (tumregel: >10k MAU
eller >100k ARR innan någon ens tar mötet).

### 2. White label till stora språkskolor – rätt idé, fel storlek
EF & co har upphandling, säkerhetskrav, LMS-integrationer; säljcykler 12–18 mån
och krav dagens stack (anonym auth, hårdkodade users) inte klarar. **Nedskalad
version är däremot intressant:** privata språklärare, tutors, studieförbund
(Folkuniversitetet, Medborgarskolan, ABF), SFI-lärare. En lärare som delar ut
glospaket till sina elever och ser deras progress – Anki är för nördigt för det,
Quizlet är reklamfyllt och dyrt. Betalning per klass/termin (ex. 500–1500 kr) är
naturlig och är INTE konsumentprenumeration.

**Tolkskolespåret:** Tom, Mathias Eklöf och Jens Bäckbom lärde sig ryska i
värnplikten – miljön där glosdrill är som mest extrem. Om nätverket når dagens
försvarsspråkutbildning är det en organisation där produkten passar exakt och en
referenskund som ger trovärdighet. Nischat men nåbart.

### 3. Frivilligt/vanligt engångsköp ~199 kr – rimligaste starten
Precedens: **AnkiMobile** – iOS-appen kostar ~25 USD styck och finansierar hela
Anki-projektet, allt annat är gratis. PWA-fördel: ingen App Store-skatt på 30 %,
Stripe/Swish direkt på webben. Matematik: 199 kr × 100 köpare = 20 000 kr;
× 1000 = 200 000 kr – fickpengar→sidoinkomst, inte bolag (vilket kan vara exakt
rätt ambition). "Livstid" + drift är ok eftersom text ≈ 0 kr i Firebase; skriv
ändå hellre "3 år" eller "livstid för appen som den är".

### 4. Konsumentprenumeration – skippa
Håller med i skepsisen. Men skilj den från B2B-licens per termin (punkt 2) –
det senare är standard och krockar inte med värderingen.

### 5. Onämnt alternativ: sälj innehåll, inte funktioner
Det svårkopierade är kureringen: Rumänska 101 med böjningar verifierade mot
dexonline, prio-klassade paket. "Appen gratis, färdiga språkpaket 49–99 kr" är
lättare att prissätta än funktions-paywalls och går att kombinera med 3.

## Måste byggas oavsett väg (finns i framtida-utveckling.md)

Riktig auth · data per användare (SRS till Firebase under uid) · GDPR (policy,
radering, DPA, EU-region – **kolla var databasen ligger, går ej flytta**) ·
betalflöde. Storleksordning veckor av kvällsjobb. Plus formalia: firma/AB för
intäkter, moms på digitala tjänster (OSS vid EU-kunder utanför Sverige), och
**kolla bisyssleklausulen i Kleer-avtalet** (knappast konkurrens, men
anmälningsplikt är vanligt).

## Rekommenderad sekvens

1. **Bestäm ambitionen ärligt:** (a) kul + fickpengar, (b) sidoinkomst, (c) bolag.
   Vägvalen skiljer sig – (a) klarar sig med Swish-länk, (c) kräver segmentbeslut
   och år av distribution.
2. **Prata med Mathias & Jens – med specifik fråga**, inte "vad tycker ni?". Be dem
   attackera betalningsviljan och distributionen, och fråga om ingången till
   försvarets språkutbildning. Entreprenörer är bäst på att säga var pengarna
   INTE finns.
3. **Billigaste betalningsviljetestet före all byggnation:** "Stöd Flippa"-länk
   (Swish) + landningssida "Pro 199 kr – kommer snart, skriv upp dig".
   En intresselista är hårdare valuta än beröm.
4. **Discovery som PO:** 10 intervjuer med seriösa språkinlärare utanför familjen
   (svenska språkgrupper på Facebook, r/languagelearning). Vad använder de, vad
   betalar de för idag?
5. **Bygg auth/GDPR-grunden först när 3–4 gett signal.**

## Realistiska tak (utan marknadsföringsbudget)

- Konsument-engångsköp: hundratals användare, tiotusentals kr/år.
- Lärar-/klassnisch: 20 klasser × 1000 kr/termin = 40 000 kr/år, försvarbar churn.
- Försäljning av bolaget: se punkt 1 – återbesök vid riktig traction.
