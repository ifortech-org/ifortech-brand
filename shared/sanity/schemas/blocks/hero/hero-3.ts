import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";
import ThemeColorInput from "../../../components/themeColorInput";

export default defineType({
  name: "hero-3",
  title: "Hero 3",
  type: "object",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "topBorderColor",
      title: "Colore bordo superiore",
      type: "string",
      description: "Token tema o valore CSS. Se vuoto usa primary.",
      components: {
        input: ThemeColorInput,
      },
    }),
    defineField({
      name: "bottomBorderColor",
      title: "Colore bordo inferiore",
      type: "string",
      description: "Token tema o valore CSS. Se vuoto usa primary.",
      components: {
        input: ThemeColorInput,
      },
    }),
    defineField({
      name: "reverseLayout",
      title: "Inverti immagine e contenuto",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "sideImage",
      title: "Immagine Laterale",
      description: "Immagine a supporto mostrata accanto al testo.",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Testo alternativo",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero 3",
        subtitle: title,
      };
    },
  },
});
