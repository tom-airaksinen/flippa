#!/usr/bin/env python3
"""Prompterna som testas – ORDAGRANT de workern skickar i skarp drift.

Porterad från lektionPrompt() i worker/src/index.js. Poängen med att kopiera i
stället för att hitta på en egen testprompt: vi mäter det Flippa faktiskt gör, så
resultatet går att lita på när modellen sedan byts i wrangler.toml. Ändras prompten
där ska den ändras här, annars mäter vi fel sak.
"""

# Genusnoten kommer i appen från genderPromptNote(); här fryst per språk.
GENUS = {
    "fr": "För substantiv: ta med bestämd artikel så genus framgår, men håll den svenska sidan i obestämd form.",
    "it": "För substantiv: ta med bestämd artikel så genus framgår, men håll den svenska sidan i obestämd form.",
    "ro": "För substantiv: ord som slutar på -ă är femininum, övriga maskulinum eller neutrum. "
          "Ange genus (m/f/n) i parentes ENDAST när ordet avviker från regeln. Håll den svenska sidan neutral.",
    "sw": "",   # swahili har nominalklasser, ingen artikel – appen skickar tom not
}

TEMAN = [
    # (nyckel, språkkod, språknamn, tema, böjning på?)
    ("fr-restaurang", "fr", "franska",   "Restaurang och kafé",              True),
    ("sw-klinik",     "sw", "swahili",   "Infektionsklinik på landsbygden",  False),
    ("it-lakare",     "it", "italienska", "Hos läkaren",                     True),
    ("ro-tag",        "ro", "rumänska",  "Tågresa och biljetter",            True),
]
ANTAL = [50, 150]


def lektion_prompt(tema, sprak_namn, antal, regler="", bojning=True, uttal=False, undvik=()):
    lang = sprak_namn
    rader = [
        f'Ge mig {antal} bra ord och fraser på temat "{tema}" på {lang}.',
        "",
        "Välj orden efter vad som är bra att kunna för temat – låt ALDRIG prio styra urvalet.",
        "För varje ord:",
        f"- ord: ordet eller frasen på {lang}.",
    ]
    if regler:
        rader.append("- " + regler.replace("För substantiv: ", "ord – för substantiv: ", 1))
    rader.append("- oversattning: den svenska motsvarigheten, i obestämd form.")
    if bojning:
        rader.append(
            f"- bojning: för substantiv obestämd singular + obestämd plural på {lang} med räkneord"
            ' där språket har det, t.ex. "o pâine, două pâini". För verb de former man inte kan'
            " gissa sig till: 1:a och 3:e person presens, perfekt med hjälpverb och 3:e person"
            " konjunktiv, åtskilda med mittpunkt. Upprepa aldrig bara uppslagsformen."
            " Tom sträng för andra ordklasser.")
    else:
        rader.append("- bojning: lämna tom.")
    rader += [
        "- prio: hur central glosan är för just DET HÄR temat, inte hur vanlig den är i språket",
        "  i stort. 1 = kärnord man måste kunna för temat, 2 = vanliga nyttiga ord, 3 = mer",
        "  perifera. Riktmärke vid 30+ glosor: ungefär hälften 1:or, en tredjedel 2:or, resten",
        "  3:or. Korta vardagsteman kan sakna 3:or helt. Sätt prio först när du valt orden.",
    ]
    rader.append("- uttal: ordet med latinska bokstäver som det uttalas, med â för långt a."
                 if uttal else "- uttal: lämna tom.")
    if undvik:
        rader.append("\nTa INTE med något av dessa, de finns redan: " + ", ".join(undvik))
    return "\n".join(rader)


SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "traffar": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "ord": {"type": "string"},
                    "oversattning": {"type": "string"},
                    "bojning": {"type": "string"},
                    "prio": {"type": "integer"},
                    "uttal": {"type": "string"},
                },
                "required": ["ord", "oversattning", "bojning", "prio", "uttal"],
            },
        }
    },
    "required": ["traffar"],
}


def alla_korningar():
    """[(kornings-id, prompttext, meta), ...] – 4 teman x 2 storlekar."""
    ut = []
    for nyckel, kod, namn, tema, boj in TEMAN:
        for antal in ANTAL:
            ut.append((
                f"{nyckel}-{antal}",
                lektion_prompt(tema, namn, antal, GENUS.get(kod, ""), boj),
                {"tema": tema, "sprak": namn, "sprakkod": kod, "antal": antal, "bojning": boj},
            ))
    return ut


if __name__ == "__main__":
    for kid, p, meta in alla_korningar():
        print(f"===== {kid}  ({len(p)} tecken)")
    print()
    print(alla_korningar()[0][1])
