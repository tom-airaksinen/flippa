# Uttalsfiler, persiska

`<sha1(ordet)[:16]>.mp3` + `index.json` som mappar ordet till sin fil. Appen slår upp
kortets framsida i manifestet och spelar filen när enheten saknar röst för språket
(iPhone har ingen persisk röst i Web Speech).

Genererade med **fa-IR-DilaraNeural** via `edge-tts` – Microsofts persiska neurala
röst, samma som finns i Azure Speech men utan konto. Se `scripts/tts-fa.py`.
Klienten är inofficiell, så åtkomsten kan försvinna; behövs officiella villkor är
samma röst tillgänglig i Azure och bara anropet i skriptet byts ut. Att rösten är
AI-genererad står i appens hjälptext, vilket Microsoft kräver.

Bokstäverna i alfabetslektionen läses med sitt **namn** (ص → صاد), inte som glyf.

Varje fil kvalitetskontrolleras vid genereringen: andelen energi i röstregistret
80–1000 Hz måste överstiga 0,12. Gränsen är kalibrerad mot verkliga filer – brus
ligger på 0,00–0,02 och det väsljudstyngsta riktiga ordet (هشت) på 0,18. Tystnaden
i kanterna klipps bort; edge-tts lägger annars ordet i en behållare på ~1,9 s.

Två lokala modeller förkastades först: Piper/ManaTTS (brus under ~10 fonem) och
MMS-fas (kan inte säga ل – pad-token ÄR den bokstaven i teckentabellen).
