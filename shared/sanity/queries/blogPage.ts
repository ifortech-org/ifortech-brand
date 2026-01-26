import { groq } from "next-sanity";

export const BLOGPAGE_QUERY = groq`
  *[_type == "blogPage" && language->code == $language][0] {
    _id,
    title,
    description,
    language,
    contentId,
    heroTitle,
    heroSubtitle,
    blocks[] {
      ...,
      _type == "all-posts" => {
        ...
      }
    }
  }
`;
