import { sanityFetch } from "@/shared/sanity/lib/live";
import { contactformSettingsQuery } from "@/shared/sanity/queries/contactform/contactformSettings";
import { ContactFormSettingsQueryResult } from "@/shared/sanity/queries/query-types";

export async function fetchContactFormSettings(language: string): Promise<ContactFormSettingsQueryResult | null> {
  try {
    const { data } = await sanityFetch({
      query: contactformSettingsQuery,
      params: { language },
    });
    return data || null;
  } catch (e) {
    return null;
  }
}
