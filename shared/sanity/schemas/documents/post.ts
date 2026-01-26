import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";
import seo from "../seo";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: FileText,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "contentId",
      title: "Content ID",
      type: "string",
      description: "Identificativo comune per tutte le traduzioni di questo post",
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
    defineField({
      name: "translations",
      title: "Traduzioni",
      type: "translationManager",
      group: "settings",
      readOnly: true,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "settings",
      to: { type: "author" },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "settings",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
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
      title: "Open Graph Image - [1200x630]",
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

  preview: {
    select: {
      title: "title",
      author: "author.name",
      language: "language.label",
      code: "language.code",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { author, title, language, code, publishedAt } = selection;
      return {
        title: `${title} (${code?.toUpperCase() || language || 'IT'})`,
        subtitle: author ? `di ${author}` : undefined,
        description: publishedAt
          ? `Pubblicato il ${new Date(publishedAt).toLocaleDateString('it-IT')}`
          : undefined,
      };
    },
  },
});
