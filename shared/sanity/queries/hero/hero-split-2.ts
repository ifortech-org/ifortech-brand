import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroSplit2Query = groq`
  _type == "hero-split-2" => {
    _type,
    _key,
    tagLine,
    title,
    subtitle,
    image_left,
    image_right,
    left,
    right,
    centerPanel
  }
`;
