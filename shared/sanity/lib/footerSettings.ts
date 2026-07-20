import { sanityFetch } from "./live";
import { footerSettingsQuery } from "../queries/footerSettings";

export async function fetchFooterSettings(language: string = "it") {
  const { data } = await sanityFetch({
    query: footerSettingsQuery,
    params: { language },
  });
  return data;
}
