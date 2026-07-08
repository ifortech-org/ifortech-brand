"use client";

import * as React from "react";
import { CookieConsentProvider } from "@/shared/lib/use-cookie-consent";
import { CookieBanner } from "@/shared/components/cookie-banner";
import { client } from "@/shared/sanity/lib/client";
import { COOKIE_SETTINGS_QUERY } from "@/shared/sanity/queries/policies";
import { useParams } from "next/navigation";
import { defaultCookieSettings } from "@/shared/fallbacks/site-config";

interface CookieProviderProps {
  children: React.ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  const [cookieSettings, setCookieSettings] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const language = params.locale || 'it';

  React.useEffect(() => {
    const fetchCookieSettings = async () => {
      try {
        const settings = await client.fetch(COOKIE_SETTINGS_QUERY, { language });
        setCookieSettings(settings);
      } catch (error) {
        console.error(
          "Errore nel caricamento delle impostazioni cookie:",
          error
        );
        setCookieSettings(defaultCookieSettings);
      } finally {
        setLoading(false);
      }
    };

    fetchCookieSettings();
  }, [language]);

  // Default categories to use while loading or if fetch fails
  const defaultCategories = defaultCookieSettings.cookieCategories;

  // Default full settings used for the banner while loading or on error
  const defaultSettings = defaultCookieSettings;

  // Use fetched categories when available, otherwise fallback to defaults
  let categories = cookieSettings?.cookieCategories || defaultCategories;
  
  // Force necessary cookies to always be required (security fix)
  categories = categories.map((category: {
    id: string;
    name: string;
    description: string;
    required: boolean;
    defaultEnabled: boolean;
  }) => {
    if (category.id === 'necessary') {
      return {
        ...category,
        required: true,
        defaultEnabled: true
      };
    }
    return category;
  });

  return (
    <CookieConsentProvider categories={categories}>
      {children}
      {/* Always render the banner using fetched settings when available,
          otherwise fallback to defaultSettings so the banner appears immediately */}
      <CookieBanner settings={cookieSettings ?? defaultSettings} />
    </CookieConsentProvider>
  );
}
