import { defineField, defineType } from "sanity";
import ColorPreviewInput from "../../components/colorPreviewInput";

function colorField(
  name: string,
  title: string,
  description: string,
  fieldset: "lightTheme" | "darkTheme"
) {
  return defineField({
    name,
    title,
    type: "string",
    description,
    fieldset,
    components: {
      input: ColorPreviewInput,
    },
  });
}

export default defineType({
  name: "siteColors",
  title: "Colori del sito",
  type: "document",
  fieldsets: [
    {
      name: "lightTheme",
      title: "Tema Chiaro",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "darkTheme",
      title: "Tema Scuro",
      description:
        "Il tema scuro diventa disponibile solo se abilitato nelle impostazioni del sito. Se lo abiliti, ricontrolla il sito anche nella versione scura per verificare contrasti, leggibilità e stati interattivi.",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    colorField("background", "Sfondo (chiaro)", "Sfondo principale.", "lightTheme"),
    colorField("text", "Testo (chiaro)", "Testo principale.", "lightTheme"),
    colorField("card", "Card (chiaro)", "Sfondo card.", "lightTheme"),
    colorField("cardForeground", "Testo card (chiaro)", "Testo dentro card.", "lightTheme"),
    colorField("popover", "Popover (chiaro)", "Sfondo popover/dialog.", "lightTheme"),
    colorField(
      "popoverForeground",
      "Testo popover (chiaro)",
      "Testo dentro popover/dialog.",
      "lightTheme"
    ),
    colorField("primary", "Primario (chiaro)", "Colore bottoni primari.", "lightTheme"),
    colorField(
      "primaryForeground",
      "Testo primario (chiaro)",
      "Testo sopra il primario.",
      "lightTheme"
    ),
    colorField("secondary", "Secondario (chiaro)", "Secondario del sito.", "lightTheme"),
    colorField(
      "secondaryForeground",
      "Testo secondario (chiaro)",
      "Testo sopra il secondario.",
      "lightTheme"
    ),
    colorField("muted", "Muted (chiaro)", "Sfondo muted.", "lightTheme"),
    colorField(
      "mutedForeground",
      "Testo muted (chiaro)",
      "Testo secondario / descrizioni.",
      "lightTheme"
    ),
    colorField("accent", "Accent (chiaro)", "Colore accent.", "lightTheme"),
    colorField(
      "accentForeground",
      "Testo accent (chiaro)",
      "Testo sopra accent.",
      "lightTheme"
    ),
    colorField("destructive", "Destructive (chiaro)", "Azioni distruttive.", "lightTheme"),
    colorField(
      "destructiveForeground",
      "Testo destructive (chiaro)",
      "Testo sopra destructive.",
      "lightTheme"
    ),
    colorField("border", "Border (chiaro)", "Bordi.", "lightTheme"),
    colorField("input", "Input (chiaro)", "Bordi / sfondi input.", "lightTheme"),
    colorField("ring", "Ring (chiaro)", "Focus ring.", "lightTheme"),
    colorField("backgroundDark", "Sfondo (scuro)", "Sfondo dark.", "darkTheme"),
    colorField("textDark", "Testo (scuro)", "Testo principale dark.", "darkTheme"),
    colorField("cardDark", "Card (scuro)", "Sfondo card dark.", "darkTheme"),
    colorField(
      "cardForegroundDark",
      "Testo card (scuro)",
      "Testo card dark.",
      "darkTheme"
    ),
    colorField("popoverDark", "Popover (scuro)", "Sfondo popover dark.", "darkTheme"),
    colorField(
      "popoverForegroundDark",
      "Testo popover (scuro)",
      "Testo popover dark.",
      "darkTheme"
    ),
    colorField("primaryDark", "Primario (scuro)", "Primario dark.", "darkTheme"),
    colorField(
      "primaryForegroundDark",
      "Testo primario (scuro)",
      "Testo sopra primario dark.",
      "darkTheme"
    ),
    colorField("secondaryDark", "Secondario (scuro)", "Secondario dark.", "darkTheme"),
    colorField(
      "secondaryForegroundDark",
      "Testo secondario (scuro)",
      "Testo sopra secondario dark.",
      "darkTheme"
    ),
    colorField("mutedDark", "Muted (scuro)", "Muted dark.", "darkTheme"),
    colorField(
      "mutedForegroundDark",
      "Testo muted (scuro)",
      "Testo muted dark.",
      "darkTheme"
    ),
    colorField("accentDark", "Accent (scuro)", "Accent dark.", "darkTheme"),
    colorField(
      "accentForegroundDark",
      "Testo accent (scuro)",
      "Testo sopra accent dark.",
      "darkTheme"
    ),
    colorField("destructiveDark", "Destructive (scuro)", "Destructive dark.", "darkTheme"),
    colorField(
      "destructiveForegroundDark",
      "Testo destructive (scuro)",
      "Testo sopra destructive dark.",
      "darkTheme"
    ),
    colorField("borderDark", "Border (scuro)", "Bordi dark.", "darkTheme"),
    colorField("inputDark", "Input (scuro)", "Input dark.", "darkTheme"),
    colorField("ringDark", "Ring (scuro)", "Focus ring dark.", "darkTheme"),
  ],
});
