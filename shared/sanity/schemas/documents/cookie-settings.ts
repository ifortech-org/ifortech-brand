import { defineField, defineType } from "sanity";

export default defineType({
  name: "cookieSettings",
  title: "Impostazioni Cookie",
  type: "document",
  icon: () => "🍪",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "reference",
      to: [{ type: "siteLanguage" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "translationManager",
      title: "Translation Manager",
      type: "translationManager",
    }),
    defineField({
      name: "title",
      title: "Titolo del banner",
      type: "string",
      initialValue: "Questo sito utilizza i cookie",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
      initialValue:
        "Utilizziamo i cookie per migliorare la tua esperienza di navigazione e per fornire contenuti personalizzati. Continuando a navigare accetti l'uso dei cookie.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acceptAllText",
      title: "Testo pulsante 'Accetta tutti'",
      type: "string",
      initialValue: "Accetta tutti",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rejectAllText",
      title: "Testo pulsante 'Rifiuta tutti'",
      type: "string",
      initialValue: "Rifiuta tutti",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customizeText",
      title: "Testo pulsante 'Personalizza'",
      type: "string",
      initialValue: "Personalizza",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "privacyPolicyText",
      title: "Testo link Privacy Policy",
      type: "string",
      initialValue: "Leggi la Privacy Policy",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cookiePolicyText",
      title: "Testo link Cookie Policy",
      type: "string",
      initialValue: "Leggi la Cookie Policy",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Posizione del banner",
      type: "string",
      options: {
        list: [
          { title: "In basso", value: "bottom" },
          { title: "In alto", value: "top" },
          { title: "Al centro (modale)", value: "center" },
        ],
      },
      initialValue: "bottom",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showRejectButton",
      title: "Mostra pulsante 'Rifiuta tutti'",
      type: "boolean",
      initialValue: true,
      description: "Richiesto per conformità GDPR in EU",
    }),
    defineField({
      name: "showCustomizeButton",
      title: "Mostra pulsante 'Personalizza'",
      type: "boolean",
      initialValue: true,
    }),
    // Testi per la pagina di personalizzazione
    defineField({
      name: "preferencesTitle",
      title: "Titolo pagina preferenze",
      type: "string",
      initialValue: "Preferenze Cookie",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preferencesDescription",
      title: "Descrizione pagina preferenze",
      type: "text",
      rows: 2,
      initialValue: "Gestisci le tue preferenze sui cookie per questo sito.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "savePreferencesText",
      title: "Testo pulsante 'Salva preferenze'",
      type: "string",
      initialValue: "Salva Preferenze",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acceptAllPreferencesText",
      title: "Testo pulsante 'Accetta tutti' (preferenze)",
      type: "string",
      initialValue: "Accetta Tutti",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "onlyNecessaryText",
      title: "Testo pulsante 'Solo necessari'",
      type: "string",
      initialValue: "Solo Necessari",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resetPreferencesText",
      title: "Testo pulsante 'Resetta preferenze'",
      type: "string",
      initialValue: "Resetta Preferenze",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "requiredBadgeText",
      title: "Testo badge 'Obbligatori'",
      type: "string",
      initialValue: "Obbligatori",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "loadingText",
      title: "Testo caricamento",
      type: "string",
      initialValue: "Caricamento...",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "loadingDescriptionText",
      title: "Descrizione caricamento",
      type: "string",
      initialValue: "Caricamento delle preferenze cookie...",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notAvailableText",
      title: "Testo sistema non disponibile",
      type: "string",
      initialValue: "Il sistema di gestione cookie non è disponibile al momento. Riprova tra qualche istante.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statusLabels",
      title: "Etichette stato",
      type: "object",
      fields: [
        {
          name: "pending",
          title: "In attesa",
          type: "string",
          initialValue: "In attesa",
          validation: (rule) => rule.required(),
        },
        {
          name: "accepted",
          title: "Tutti accettati",
          type: "string",
          initialValue: "Tutti accettati",
          validation: (rule) => rule.required(),
        },
        {
          name: "rejected",
          title: "Tutti rifiutati",
          type: "string",
          initialValue: "Tutti rifiutati",
          validation: (rule) => rule.required(),
        },
        {
          name: "customized",
          title: "Personalizzati",
          type: "string",
          initialValue: "Personalizzati",
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "noConsentText",
      title: "Testo nessun consenso configurato",
      type: "string",
      initialValue: "Non hai ancora configurato le tue preferenze sui cookie.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acceptAllCookiesText",
      title: "Testo pulsante 'Accetta tutti i cookie' (prima configurazione)",
      type: "string",
      initialValue: "Accetta tutti i cookie",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rejectAllCookiesText",
      title: "Testo pulsante 'Rifiuta tutti' (prima configurazione)",
      type: "string",
      initialValue: "Rifiuta tutti i cookie (solo necessari)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cookieCategories",
      title: "Categorie Cookie",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "ID Categoria",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "name",
              title: "Nome",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              title: "Descrizione",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            },
            {
              name: "required",
              title: "Obbligatori",
              type: "boolean",
              initialValue: false,
              description:
                "I cookie obbligatori non possono essere disabilitati",
            },
            {
              name: "defaultEnabled",
              title: "Abilitati per default",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "description",
              required: "required",
            },
            prepare({ title, subtitle, required }) {
              return {
                title: `${title} ${required ? "(Obbligatori)" : ""}`,
                subtitle,
              };
            },
          },
        },
      ],
      initialValue: [
        {
          id: "necessary",
          name: "Cookie Necessari",
          description:
            "Questi cookie sono essenziali per il funzionamento del sito web.",
          required: true,
          defaultEnabled: true,
        },
        {
          id: "analytics",
          name: "Cookie Analytics",
          description:
            "Ci aiutano a capire come i visitatori interagiscono con il sito web.",
          required: false,
          defaultEnabled: false,
        },
        {
          id: "marketing",
          name: "Cookie Marketing",
          description:
            "Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.",
          required: false,
          defaultEnabled: false,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      position: "position",
      language: "language.label",
      code: "language.code",
    },
    prepare({ title, position, language, code }) {
      return {
        title: `${title || "Impostazioni Cookie"} (${code?.toUpperCase() || language || "?"})`,
        subtitle: `Posizione: ${position || "bottom"}`,
      };
    },
  },
});
