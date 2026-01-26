import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteLanguage",
  title: "Lingua disponibile",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Codice lingua (es: it, en, fr)",
      type: "string",
      validation: (rule) => rule.required().min(2).max(5),
    }),
    defineField({
      name: "label",
      title: "Nome visualizzato (es: Italiano, English, Français)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "code",
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle ? `(${subtitle})` : undefined,
      };
    },
  },
});
