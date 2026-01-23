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
      type: "string",
      options: {
        list: [
          { title: "Italiano", value: "it" },
          { title: "English", value: "en" },
        ],
      },
      validation: (rule) => [
        rule.required(),
        rule.custom((language, context) => {
          const { document, getClient } = context;
          if (!language || !document?._type) return true;
          
          const client = getClient({ apiVersion: '2023-05-03' });
          const id = document._id?.replace(/^drafts\./, '');
          
          return client
            .fetch(
              `count(*[_type == "footerSettings" && language == $language && !(_id in [
                "drafts." + $id,
                $id
              ])])`,
              { language, id }
            )
            .then((count: number) => {
              return count === 0 ? true : `Esiste già una configurazione footer in ${language === 'it' ? 'italiano' : 'inglese'}`;
            });
        }),
      ],
      initialValue: "it",
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
      language: "language",
    },
    prepare(selection: any) {
      const { text, language } = selection;
      const languageLabel = language === "it" ? "IT" : "EN";
      
      return {
        title: `Impostazioni Footer (${languageLabel})`,
        subtitle: text
          ? `${text.substring(0, 50)}${text.length > 50 ? "..." : ""}`
          : "Nessun testo personalizzato",
      };
    },
  },
});
