import { groq } from "next-sanity";
import { client } from "../lib/client";

export const PRIVACY_POLICY_QUERY = groq`
  *[_type == "privacyPolicy" && language->code == $language][0] {
    _id,
    title,
    content[]{
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
        },
        alt
      }
    },
    lastUpdated,
    language,
    seo {
      title,
      description,
      keywords,
      image {
        asset-> {
          url,
          metadata {
            dimensions
          }
        }
      },
      robots
    }
  }
`;

export const COOKIE_POLICY_QUERY = groq`
  *[_type == "cookiePolicy" && language->code == $language][0] {
    _id,
    title,
    content[]{
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
        },
        alt
      }
    },
    lastUpdated,
    language,

    seo {
      title,
      description,
      keywords,
      image {
        asset-> {
          url,
          metadata {
            dimensions
          }
        }
      },
      robots
    }
  }
`;

export const COOKIE_SETTINGS_QUERY = groq`
  *[_type == "cookieSettings" && language->code == $language][0] {
    _id,
    language,
    title,
    description,
    acceptAllText,
    rejectAllText,
    customizeText,
    privacyPolicyText,
    cookiePolicyText,
    position,
    showRejectButton,
    showCustomizeButton,
    preferencesTitle,
    preferencesDescription,
    savePreferencesText,
    acceptAllPreferencesText,
    onlyNecessaryText,
    resetPreferencesText,
    requiredBadgeText,
    loadingText,
    loadingDescriptionText,
    notAvailableText,
    statusLabels,
    noConsentText,
    acceptAllCookiesText,
    rejectAllCookiesText,
    cookieCategories[] {
      id,
      name,
      description,
      required,
      defaultEnabled
    }
  }
`;

// Quick query for policy titles in footer
export const POLICY_TITLES_QUERY = groq`
  {
    "privacyPolicy": *[_type == "privacyPolicy" && language->code == $language][0] {
      title
    },
    "cookiePolicy": *[_type == "cookiePolicy" && language->code == $language][0] {
      title
    },
    "cookieSettings": *[_type == "cookieSettings" && language->code == $language][0] {
      preferencesTitle,
      customizeText
    }
  }
`;
