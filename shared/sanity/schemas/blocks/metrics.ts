import { defineField, defineType } from "sanity";
import { GaugeCircle } from "lucide-react";

export default defineType({
  name: "metrics",
  title: "Metrics",
  type: "object",
  icon: GaugeCircle,
  groups: [
    {
      name: "first_metric",
      title: "First Metric",
    },
    {
      name: "second_metric",
      title: "Second Metric",
    },
    {
      name: "third_metric",
      title: "Third Metric",
    },
  ],
  fields: [
    defineField({
      name: "first_metric_name",
      title: "First Metric Name",
      type: "string",
      group: "first_metric",
    }),
    defineField({
      name: "first_metric_value",
      title: "First Metric Value",
      type: "number",
      group: "first_metric",
    }),
    defineField({
      name: "first_metric_image",
      title: "First Metric Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
      group: "first_metric",
    }),
    defineField({
      name: "second_metric_name",
      title: "Second Metric Name",
      type: "string",
      group: "second_metric",
    }),
    defineField({
      name: "second_metric_value",
      title: "Second Metric Value",
      type: "number",
      group: "second_metric",
    }),
    defineField({
      name: "second_metric_image",
      title: "Second Metric Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
      group: "second_metric",
    }),
    defineField({
      name: "third_metric_name",
      title: "Third Metric Name",
      type: "string",
      group: "third_metric",
    }),
    defineField({
      name: "third_metric_value",
      title: "Third Metric Value",
      type: "number",
      group: "third_metric",
    }),
    defineField({
      name: "third_metric_image",
      title: "Third Metric Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
      group: "third_metric",
    }),
  ],
  preview: {
    select: {
      title: "first_metric_name",
    },
    prepare({ title }) {
      return {
        title: "Metrics",
        subtitle: title,
      };
    },
  },
});
