import { client } from "../lib/client";
import { mergeSiteColors } from "@/shared/fallbacks/site-config";
import { siteColorsQuery } from "../queries/siteColors";

export async function fetchSiteColors() {
  const siteColors = await client.fetch(siteColorsQuery);
  return mergeSiteColors(siteColors);
}
