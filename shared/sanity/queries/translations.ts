import { groq } from "next-sanity";

export const TRANSLATIONS_QUERY = groq`
  *[_type == $documentType && contentId == $contentId] {
    language-> { code, label },
    slug,
    title
  }
`;