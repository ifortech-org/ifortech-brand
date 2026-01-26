import { defineField, defineType } from "sanity";

// schema per il testo personalizzabile del footer (multi-lingua)
export default defineType({
  name: "footerSettings",
  title: "Impostazioni Footer",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Lingua",
      type: "reference",
      to: [{ type: "siteLanguage" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customText",
      title: "Testo personalizzato",
      type: "text",
      description:
        "Testo che apparirà nel footer sotto le voci di navigazione (Home, Blog, About). Supporta il ritorno a capo.",
      rows: 4,
      validation: (rule) =>
        rule.max(500).warning(
          "Il testo è molto lungo, considera di accorciarlo"
        ),
    }),
  ],
  preview: {
    select: {
      text: "customText",
      language: "language.label",
      code: "language.code"
    },
    prepare(selection: any) {
      const { text, language, code } = selection;
      return {
        title: `Impostazioni Footer (${code?.toUpperCase() || language || "?"})`,
        subtitle: text
          ? `${text.substring(0, 50)}${text.length > 50 ? "..." : ""}`
          : "Nessun testo personalizzato",
      };
    },
  },
});
