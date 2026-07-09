import { defineType, defineField } from "sanity";

export default defineType({
  name: "emailTemplate",
  title: "Template Email Cliente",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo interno",
      type: "string",
      description:
        "Titolo visibile in Studio per riconoscere il template. Non viene inviato via email.",
      initialValue: "Template email cliente",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      title: "Lingua",
      type: "reference",
      to: [{ type: "siteLanguage" }],
      description: "Seleziona la lingua tra quelle disponibili",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subject_template",
      title: "Oggetto Email",
      type: "string",
      description:
        "Usa variabili come {{name}}, {{surname}}, {{subject}}, {{description}}, {{brandName}}, {{teamName}}",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body_template",
      title: "Corpo Email (Markdown)",
      type: "text",
      description:
        "Scrivi il testo in Markdown. Puoi usare # Titolo, **grassetto**, [link](https://...), e vai a capo con doppio invio o due spazi e invio. Usa le variabili {{name}}, {{surname}}, {{subject}}, {{description}}, {{brandName}}, {{teamName}}.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom(async (value, context) => {
      const languageRef =
        typeof value?.language === "object" && value?.language !== null && "_ref" in value.language
          ? value.language._ref
          : undefined;

      if (!languageRef) return true;

      const client = context.getClient({ apiVersion: "2023-01-01" });
      const docId = context.document?._id?.replace(/^drafts\./, "");

      const existing = await client.fetch(
        `*[_type == "emailTemplate" && language._ref == $languageRef && !(_id in [$docId, "drafts." + $docId])][0]._id`,
        {
          languageRef,
          docId,
        }
      );

      return existing
        ? "Esiste già un template email cliente per questa lingua."
        : true;
    }),
  preview: {
    select: {
      title: "title",
      language: "language.label",
      code: "language.code",
    },
    prepare({ title, language, code }) {
      return {
        title: title || "Template email cliente",
        subtitle: code?.toUpperCase() || language || "?",
      };
    },
  },
});
