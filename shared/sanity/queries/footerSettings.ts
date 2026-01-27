import { groq } from "next-sanity";

export const footerSettingsQuery = groq`*[_type == "footerSettings" && language->code == $language][0]{
  customText,
  language
}`;
