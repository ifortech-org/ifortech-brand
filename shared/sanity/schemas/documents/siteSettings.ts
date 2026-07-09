import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nome sito / brand",
      type: "string",
      description: "Usato per metadata, fallback logo testuale e branding globale.",
    }),
    defineField({
      name: "legalCompanyName",
      title: "Ragione sociale / nome legale",
      type: "string",
      description: "Usato per copyright e testi istituzionali.",
    }),
    defineField({
      name: "defaultLocale",
      title: "Lingua di default",
      type: "string",
      initialValue: "it",
      options: {
        list: [
          { title: "Italiano", value: "it" },
          { title: "English", value: "en" },
        ],
      },
    }),
    defineField({
      name: "enableDarkTheme",
      title: "Abilita tema scuro",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enableBlog",
      title: "Abilita blog",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "twitterHandle",
      title: "Handle Twitter/X",
      type: "string",
      description: "Es. @brand",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "file",
      description:
        "Icona del browser per questo brand. Accetta .ico, .png, .svg, .jpg e .webp. Se vuota resta il fallback /favicon.ico.",
      options: {
        accept: ".ico,.png,.svg,.jpg,.jpeg,.webp",
      },
      fields: [
        defineField({
          name: "title",
          title: "Label interna",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Testo copyright",
      type: "string",
      description: "Se vuoto, il sito userà un fallback legacy temporaneo.",
    }),
    defineField({
      name: "email",
      title: "Branding email",
      type: "object",
      fields: [
        defineField({
          name: "brandName",
          title: "Nome brand nelle email",
          type: "string",
        }),
        defineField({
          name: "adminSubjectPrefix",
          title: "Prefisso oggetto mail admin",
          type: "string",
          description: "Es. IFORTECH",
        }),
        defineField({
          name: "adminTitle",
          title: "Titolo mail admin",
          type: "string",
          description: "Es. Nuova richiesta di contatto",
        }),
        defineField({
          name: "teamName",
          title: "Firma team nelle email utente",
          type: "string",
          description: "Es. Il Team di Brand",
        }),
        defineField({
          name: "replyTo",
          title: "Reply-To",
          type: "string",
          description: "Opzionale. Se vuoto usa l'account mittente.",
        }),
        defineField({
          name: "logoMode",
          title: "Logo email",
          type: "string",
          initialValue: "siteLogo",
          options: {
            list: [
              { title: "Usa logo del sito", value: "siteLogo" },
              { title: "Carica logo dedicato", value: "custom" },
              { title: "Nessun logo", value: "none" },
            ],
          },
        }),
        defineField({
          name: "customLogo",
          title: "Logo email personalizzato",
          type: "image",
          hidden: ({ parent }) => parent?.logoMode !== "custom",
        }),
      ],
    }),
  ],
});
