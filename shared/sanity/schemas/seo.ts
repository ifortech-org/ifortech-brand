// Schema SEO per Sanity Studio
import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titolo SEO",
      type: "string",
      description:
        "Titolo della pagina per i motori di ricerca (max 60 caratteri)",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      description: "Descrizione per i motori di ricerca (max 160 caratteri)",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "keywords",
      title: "Parole chiave",
      type: "array",
      of: [{ type: "string" }],
      description: "Parole chiave separate da virgola",
    }),
    defineField({
      name: "image",
      title: "Immagine Open Graph",
      type: "image",
      description: "Immagine per la condivisione social (og:image)",
    }),
    defineField({
      name: "robots",
      title: "Robots",
      type: "string",
      description: "Direttiva robots (es: index, follow)",
      options: {
        list: [
          { title: "index, follow", value: "index, follow" },
          { title: "noindex, nofollow", value: "noindex, nofollow" },
        ],
      },
      initialValue: "index, follow",
    }),
  ],
});
