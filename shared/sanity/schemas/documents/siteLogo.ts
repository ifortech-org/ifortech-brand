// schema per il logo del sito (singleton)
export default {
  name: "siteLogo",
  title: "Logo del sito",
  type: "document",
  __experimental_actions: ["update", "publish"], // Disabilita create/delete
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Carica il logo del sito (preferibilmente SVG o PNG trasparente)",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "alt",
      title: "Testo alternativo",
      type: "string",
      description: "Testo alternativo per accessibilità e SEO",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      media: "logo",
      title: "alt",
    },
    prepare(selection: any) {
      const { media, title } = selection;
      return {
        title: title || "Logo del sito",
        media,
      };
    },
  },
};
