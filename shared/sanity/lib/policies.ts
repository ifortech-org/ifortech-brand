import { defaultCookieSettings } from "@/shared/fallbacks/site-config";
import {
  COOKIE_SETTINGS_QUERY,
  POLICY_TITLES_QUERY,
} from "@/shared/sanity/queries/policies";
import { sanityFetch } from "./live";

export const fetchSanityCookieSettings = async (language: string = "it") => {
  const { data } = await sanityFetch({
    query: COOKIE_SETTINGS_QUERY,
    params: { language },
  });

  return data ?? defaultCookieSettings;
};

export const fetchPolicyTitles = async (language: string = "it") => {
  const { data } = await sanityFetch({
    query: POLICY_TITLES_QUERY,
    params: { language },
  });

  return data;
};
