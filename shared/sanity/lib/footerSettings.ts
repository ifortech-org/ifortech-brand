import { client } from "../lib/client";
import { footerSettingsQuery } from "../queries/footerSettings";

export async function fetchFooterSettings(language: string = "it") {
  return await client.fetch(footerSettingsQuery, { language });
}
