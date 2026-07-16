import { ImageIcon, LayoutPanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";
import ThemeColorInput from "../../../components/themeColorInput";

const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
    }),
  ],
});

const buttonFields = [
  defineField({
    name: "text",
    title: "Button Text",
    type: "string",
  }),
  defineField({
    name: "url",
    title: "Button URL",
    type: "string",
  }),
  defineField({
    name: "color",
    title: "Button Background",
    type: "string",
    description: "Token tema o valore CSS. Se vuoto usa primary.",
    components: { input: ThemeColorInput },
  }),
  defineField({
    name: "textColor",
    title: "Button Text Color",
    type: "string",
    description: "Token tema o valore CSS. Se vuoto usa primary foreground.",
    components: { input: ThemeColorInput },
  }),
];

const sideFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
  }),
  defineField({
    name: "subtitle",
    title: "Subtitle",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "showBackground",
    title: "Show Content Background",
    type: "boolean",
    initialValue: true,
  }),
  defineField({
    name: "centerContent",
    title: "Center Content",
    type: "boolean",
    initialValue: false,
  }),
  defineField({
    ...imageField,
    name: "media",
    title: "Icon / Logo / Image",
  }),
  defineField({
    name: "button",
    title: "Button",
    type: "object",
    fields: buttonFields,
  }),
];

const centerLinkFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "linkText",
    title: "Link Text",
    type: "string",
  }),
  defineField({
    name: "linkUrl",
    title: "Link URL",
    type: "string",
  }),
  defineField({
    name: "linkColor",
    title: "Link Color",
    type: "string",
    description: "Token tema o valore CSS. Se vuoto usa primary.",
    components: { input: ThemeColorInput },
  }),
];

export default defineType({
  name: "hero-split-2",
  title: "Hero Split 2",
  type: "object",
  icon: LayoutPanelTop,
  fields: [
    defineField({
      name: "tagLine",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Main Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image_left",
      title: "Background Left",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "image_right",
      title: "Background Right",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "left",
      title: "Left Side",
      type: "object",
      icon: ImageIcon,
      fields: sideFields,
    }),
    defineField({
      name: "right",
      title: "Right Side",
      type: "object",
      icon: ImageIcon,
      fields: sideFields,
    }),
    defineField({
      name: "centerPanel",
      title: "Center Panel",
      type: "object",
      fields: [
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          initialValue: "#ffffff",
        }),
        defineField({
          name: "backgroundOpacity",
          title: "Background Opacity",
          type: "number",
          initialValue: 92,
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "left",
          title: "Left Content",
          type: "object",
          fields: centerLinkFields,
        }),
        defineField({
          name: "right",
          title: "Right Content",
          type: "object",
          fields: centerLinkFields,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "left.title",
    },
    prepare({ title, subtitle }) {
      return {
        title: "Hero Split 2",
        subtitle: [title, subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
