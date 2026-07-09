import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"] | order(_createdAt desc)[0]{
  siteName,
  legalCompanyName,
  defaultLocale,
  enableDarkTheme,
  enableBlog,
  twitterHandle,
  favicon{
    asset->{
      url,
      originalFilename,
      mimeType,
      extension
    },
    title
  },
  copyrightText,
  email{
    brandName,
    adminSubjectPrefix,
    adminTitle,
    teamName,
    replyTo,
    logoMode,
    customLogo{
      asset->{
        url
      }
    }
  }
}`;
