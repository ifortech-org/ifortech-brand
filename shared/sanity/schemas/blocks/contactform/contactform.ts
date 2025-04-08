// contactform component file

import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

export default defineType({
  name: "contactform",
  title: "Contact Form",
  type: "object",
  icon: Mail,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "block-content",
    }),
    defineField({
      name: "button_text",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "side_image",
      title: "Side Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
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
        title: "Contact form",
        subtitle: title,
      };
    },
  },
});
