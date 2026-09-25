# Uttalsfiler, persiska

`<sha1(ordet)[:16]>.mp3` + `index.json` som mappar ordet till sin fil. Appen slår upp
kortets framsida i manifestet och spelar filen när enheten saknar röst för språket
(iPhone har ingen persisk röst i Web Speech).

Genererade med **facebook/mms-tts-fas** (Metas MMS), körd lokalt – se
`scripts/tts-fa.py`. Licens **CC BY-NC 4.0**: fri att använda, icke-kommersiellt,
med attribution. Attributionen står i appens hjälptext.

Bokstäverna i alfabetslektionen läses med sitt **namn** (ص → صاد), inte som glyf –
en ensam bokstav ger brus i en meningstränad modell.

Varje fil kvalitetskontrolleras vid genereringen: andelen energi i röstregistret
80–1000 Hz måste överstiga 0,35. Brus hamnar runt 0,00 och skrivs aldrig hit.
