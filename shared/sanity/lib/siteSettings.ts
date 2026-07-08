import { client } from "../lib/client";
import { mergeSiteSettings } from "@/shared/fallbacks/site-config";
import { siteSettingsQuery } from "../queries/siteSettings";

export async function fetchSiteSettings() {
  return await client.fetch(siteSettingsQuery);
}

export async function fetchResolvedSiteSettings() {
  const settings = await fetchSiteSettings();
  return mergeSiteSettings(settings);
}
