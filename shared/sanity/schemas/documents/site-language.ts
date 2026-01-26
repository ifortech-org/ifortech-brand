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
  __experimental_beforeDelete: async (context) => {
    const { getClient, documentId } = context;
    const client = getClient({ apiVersion: "2023-05-03" });
    const refCount = await client.fetch(
      `count(*[references($id)])`,
      { id: documentId }
    );
    if (refCount > 0) {
      throw new Error("Non puoi eliminare questa lingua: ci sono contenuti che la utilizzano.");
    }
  },
});
