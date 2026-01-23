import { groq } from "next-sanity";

export const footerSettingsQuery = groq`*[_type == "footerSettings" && language == $language][0]{
  customText,
  language
}`;
