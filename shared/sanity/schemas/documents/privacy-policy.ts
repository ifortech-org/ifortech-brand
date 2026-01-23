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
          
          const client = getClient({ apiVersion: '2023-01-01' });
          const id = document._id?.replace(/^drafts\./, '');
          
          return client
            .fetch(
              `count(*[_type == "privacyPolicy" && language == $language && !(_id in [
                "drafts." + $id,
                $id
              ])])
              `,
              { language, id }
            )
            .then((count: number) => {
              return count === 0 ? true : `Esiste già una Privacy Policy in ${language === 'it' ? 'italiano' : 'inglese'}`;
            });
        }),
      ],
      initialValue: "it",
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
      language: "language",
      lastUpdated: "lastUpdated",
    },
    prepare({ title, language, lastUpdated }) {
      const languageLabel = language === "en" ? "EN" : "IT";
      return {
        title: `${title || "Privacy Policy"} (${languageLabel})`,
        subtitle: lastUpdated
          ? `Aggiornata il ${new Date(lastUpdated).toLocaleDateString("it-IT")}`
          : "Nessuna data",
      };
    },
  },
});
