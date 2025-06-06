import { groq } from "next-sanity";

export const GLOBAL_SEO_QUERY = groq`
  *[_type == "seo" && _id == "seoSingleton"][0]{
    title,
    description,
    keywords,
    image {
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    robots
  }
`;
