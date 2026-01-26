import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  icon: Newspaper,
  groups: [
    { name: "content", title: "Contenuti" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Impostazioni" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      title: "Lingua",
      type: "reference",
      to: [{ type: "siteLanguage" }],
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
    defineField({
      name: "blocks",
      title: "Blocchi contenuto",
      type: "array",
      group: "content",
      of: [
        { type: "hero-1" },
        { type: "hero-2" },
        { type: "hero-3" },
        { type: "section-header" },
        { type: "split-row" },
        { type: "grid-row" },
        { type: "carousel-1" },
        { type: "carousel-2" },
        { type: "timeline-row" },
        { type: "cta-1" },
        { type: "logo-cloud-1" },
        { type: "faqs" },
        { type: "form-newsletter" },
        { type: "all-posts" },
        { type: "contactform" },
        { type: "block" },
        { type: "image" },
      ],
    }),
    defineField({
      name: "meta_title",
      title: "Titolo Meta",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Descrizione Meta",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Immagine Open Graph - [1200x630]",
      type: "image",
      group: "seo",
    }),
    defineField({
      name: "seo",
      title: "SEO avanzato",
      type: "seo",
      group: "seo",
    }),
  ],
  // Validazione: una sola pagina blog per lingua
  // NB: la validazione custom va inserita a livello di documento
  // e si basa sul campo language
  // https://www.sanity.io/docs/document-level-validation
  validation: (Rule) => Rule.custom(async (value, context) => {
    if (!value?.language) return true;
    const client = context.getClient({ apiVersion: '2023-01-01' });
    const query = '*[_type == "blogPage" && language._ref == $langRef && !(_id in [$docId, "drafts." + $docId])][0]._id';
    const params = { langRef: value.language._ref, docId: value._id.replace(/^drafts\./, '') };
    const exists = await client.fetch(query, params);
    if (exists) {
      return 'Esiste già una pagina blog per questa lingua.';
    }
    return true;
  }),
  preview: {
    select: {
      title: "title",
      code: "language.code",
    },
    prepare(selection) {
      const { title, code } = selection;
      return {
        title: `${title} (${code?.toUpperCase() || "IT"})`,
      };
    },
  },
});
