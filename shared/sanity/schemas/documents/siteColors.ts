// schema per la palette colori del sito
export default {
  name: "siteColors",
  title: "Colori del sito",
  type: "document",
  fields: [
    // Colori chiari
    {
      name: "background",
      title: "Sfondo (chiaro)",
      type: "string",
      description: "Colore di sfondo principale (HEX, RGB o CSS var)",
    },
    {
      name: "primary",
      title: "Primario (chiaro)",
      type: "string",
      description: "Colore principale del sito (HEX, RGB o CSS var)",
    },
    {
      name: "secondary",
      title: "Secondario (chiaro)",
      type: "string",
      description: "Colore secondario del sito (HEX, RGB o CSS var)",
    },
    {
      name: "card",
      title: "Card (chiaro)",
      type: "string",
      description: "Colore delle card (HEX, RGB o CSS var)",
    },
    {
      name: "accent",
      title: "Accent (chiaro)",
      type: "string",
      description: "Colore accent (HEX, RGB o CSS var)",
    },
    {
      name: "destructive",
      title: "Destructive (chiaro)",
      type: "string",
      description: "Colore destructive (HEX, RGB o CSS var)",
    },
    {
      name: "muted",
      title: "Muted (chiaro)",
      type: "string",
      description: "Colore muted (HEX, RGB o CSS var)",
    },
    {
      name: "text",
      title: "Testo (chiaro)",
      type: "string",
      description: "Colore principale del testo (HEX, RGB o CSS var)",
    },
    // Colori dark mode
    {
      name: "backgroundDark",
      title: "Sfondo (scuro)",
      type: "string",
      description:
        "Colore di sfondo principale per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "primaryDark",
      title: "Primario (scuro)",
      type: "string",
      description: "Colore principale per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "secondaryDark",
      title: "Secondario (scuro)",
      type: "string",
      description: "Colore secondario per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "cardDark",
      title: "Card (scuro)",
      type: "string",
      description: "Colore delle card per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "accentDark",
      title: "Accent (scuro)",
      type: "string",
      description: "Colore accent per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "destructiveDark",
      title: "Destructive (scuro)",
      type: "string",
      description: "Colore destructive per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "mutedDark",
      title: "Muted (scuro)",
      type: "string",
      description: "Colore muted per dark mode (HEX, RGB o CSS var)",
    },
    {
      name: "textDark",
      title: "Testo (scuro)",
      type: "string",
      description:
        "Colore principale del testo per dark mode (HEX, RGB o CSS var)",
    },
  ],
};
