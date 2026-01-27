import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'emailTemplate',
  title: 'Email Template',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Lingua',
      type: 'reference',
      to: [{ type: 'siteLanguage' }],
      description: 'Seleziona la lingua tra quelle disponibili',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subject_template',
      title: 'Oggetto Email',
      type: 'string',
      description: 'Usa variabili come {{name}}, {{surname}}, {{subject}}, {{description}}',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body_template',
      title: 'Corpo Email (Markdown)',
      type: 'text',
      description: 'Scrivi il testo in Markdown. Puoi usare # Titolo, **grassetto**, [link](https://...), e vai a capo con doppio invio o due spazi e invio. Usa le variabili {{name}}, {{surname}}, {{subject}}, {{description}}.',
      validation: Rule => Rule.required(),
    }),
  ],
});
