import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroSplitQuery = groq`
  _type == "hero-split" => {
    _type,
    _key,
    tagLine,
    title,
    title_left,
    title_right,
    image_left,
    image_right,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        }
      }
    }
  }
`;
