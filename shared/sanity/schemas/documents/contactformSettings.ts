import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

export default defineType({
  name: "contactformSettings",
  title: "Impostazioni Contact Form",
  type: "document",
  icon: Mail,
  fields: [
    defineField({
      name: "language",
      title: "Lingua",
      type: "reference",
      to: [{ type: "siteLanguage" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titolo del form",
      type: "string",
      initialValue: "Contattaci",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelEmail",
      title: "Label Email",
      type: "string",
      initialValue: "Email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelName",
      title: "Label Nome",
      type: "string",
      initialValue: "Nome",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelSurname",
      title: "Label Cognome",
      type: "string",
      initialValue: "Cognome",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelBusinessName",
      title: "Label Azienda",
      type: "string",
      initialValue: "Azienda",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelRequest",
      title: "Label Richiesta",
      type: "string",
      initialValue: "Richiesta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelDescription",
      title: "Label Descrizione",
      type: "string",
      initialValue: "Descrizione",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "privacyText",
      title: "Testo trattamento dati personali",
      type: "text",
      initialValue: "Cliccando 'Invia' si dichiara di aver preso visione dell’informativa per il trattamento dei dati personali.",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submitText",
      title: "Testo bottone Invia",
      type: "string",
      initialValue: "Invia",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "closeText",
      title: "Testo bottone Chiudi",
      type: "string",
      initialValue: "Chiudi",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language.label",
      code: "language.code"
    },
    prepare(selection: any) {
      const { title, language, code } = selection;
      return {
        title: `Contact Form (${code?.toUpperCase() || language || "?"})`,
        subtitle: title,
      };
    },
  },
});
