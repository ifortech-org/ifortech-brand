import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "all-posts",
  type: "object",
  title: "All Posts",
  description: "A list of all posts",
  icon: Newspaper,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "titleLabel",
      type: "string",
      title: "Titolo sezione",
      description: "Testo visualizzato come titolo della sezione (es. 'Ultime notizie')",
    }),
    defineField({
      name: "loadingLabel",
      type: "string",
      title: "Testo loading",
      description: "Testo visualizzato durante il caricamento (es. 'Caricamento...')",
    }),
    defineField({
      name: "allCategoriesLabel",
      type: "string",
      title: "Testo tutte le categorie",
      description: "Testo visualizzato per la voce 'Tutte le categorie'",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "All Posts",
      };
    },
  },
});
