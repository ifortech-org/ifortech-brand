import { groq } from "next-sanity";

export const MENU_PAGES_QUERY = groq`
  *[_type == "page" && contentId in $contentIds && language == $language] {
    contentId,
    title,
    slug,
    language
  }
`;