import { groq } from "next-sanity";

export const contactformSettingsQuery = groq`
  *[_type == "contactformSettings" && language->code == $language][0] {
    _id,
    language,
    title,
    labelEmail,
    labelName,
    labelSurname,
    labelBusinessName,
    labelRequest,
    labelDescription,
    privacyText,
    submitText,
    closeText
  }
`;
