import { groq } from "next-sanity";
import { gridCardQuery } from "@/shared/sanity/queries/grid/grid-card";
import { pricingCardQuery } from "@/shared/sanity/queries/grid/pricing-card";
import { gridPostQuery } from "@/shared/sanity/queries/grid/grid-post";

// @sanity-typegen-ignore
export const gridRowQuery = groq`
  _type == "grid-row" => {
    _type,
    _key,
    padding,
    title,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardQuery},
      ${pricingCardQuery},
      ${gridPostQuery},
    },
  }
`;
