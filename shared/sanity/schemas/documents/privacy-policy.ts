import { defineField, defineType } from "sanity";

export default defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  icon: () => "🔒",
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
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Contenuto",
      type: "block-content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Ultimo aggiornamento",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language.label",
      code: "language.code",
      lastUpdated: "lastUpdated",
    },
    prepare({ title, language, code, lastUpdated }) {
      return {
        title: `${title || "Privacy Policy"} (${code?.toUpperCase() || language || "?"})`,
        subtitle: lastUpdated
          ? `Aggiornata il ${new Date(lastUpdated).toLocaleDateString("it-IT")}`
          : "Nessuna data",
      };
    },
  },
});
