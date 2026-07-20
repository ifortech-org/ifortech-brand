import { sanityFetch } from "./live";
import { mergeSiteSettings } from "@/shared/fallbacks/site-config";
import { siteSettingsQuery } from "../queries/siteSettings";

export async function fetchSiteSettings() {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
  });
  return data;
}

export async function fetchResolvedSiteSettings() {
  const settings = await fetchSiteSettings();
  return mergeSiteSettings(settings);
}
