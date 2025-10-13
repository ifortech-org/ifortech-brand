"use client";

import * as React from "react";
import { CookieConsentProvider } from "@/shared/lib/use-cookie-consent";
import { CookieBanner } from "@/shared/components/cookie-banner";
import { client } from "@/shared/sanity/lib/client";
import { COOKIE_SETTINGS_QUERY } from "@/shared/sanity/queries/policies";

interface CookieProviderProps {
  children: React.ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  const [cookieSettings, setCookieSettings] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCookieSettings = async () => {
      try {
        const settings = await client.fetch(COOKIE_SETTINGS_QUERY);
        setCookieSettings(settings);
      } catch (error) {
        console.error(
          "Errore nel caricamento delle impostazioni cookie:",
          error
        );
        // Fallback con impostazioni di default
        setCookieSettings({
          title: "Questo sito utilizza i cookie",
          description:
            "Utilizziamo i cookie per migliorare la tua esperienza di navigazione e per fornire contenuti personalizzati. Continuando a navigare accetti l'uso dei cookie.",
          acceptAllText: "Accetta tutti",
          rejectAllText: "Rifiuta tutti",
          customizeText: "Personalizza",
          privacyPolicyText: "Leggi la Privacy Policy",
          cookiePolicyText: "Leggi la Cookie Policy",
          position: "bottom",
          showRejectButton: true,
          showCustomizeButton: true,
          cookieCategories: [
            {
              id: "necessary",
              name: "Cookie Necessari",
              description:
                "Questi cookie sono essenziali per il funzionamento del sito web.",
              required: true,
              defaultEnabled: true,
            },
            {
              id: "analytics",
              name: "Cookie Analytics",
              description:
                "Ci aiutano a capire come i visitatori interagiscono con il sito web.",
              required: false,
              defaultEnabled: false,
            },
            {
              id: "marketing",
              name: "Cookie Marketing",
              description:
                "Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.",
              required: false,
              defaultEnabled: false,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCookieSettings();
  }, []);

  // Default categories to use while loading or if fetch fails
  const defaultCategories = [
    {
      id: "necessary",
      name: "Cookie Necessari",
      description:
        "Questi cookie sono essenziali per il funzionamento del sito web.",
      required: true,
      defaultEnabled: true,
    },
    {
      id: "analytics",
      name: "Cookie Analytics",
      description:
        "Ci aiutano a capire come i visitatori interagiscono con il sito web.",
      required: false,
      defaultEnabled: false,
    },
    {
      id: "marketing",
      name: "Cookie Marketing",
      description:
        "Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.",
      required: false,
      defaultEnabled: false,
    },
  ];

  // Default full settings used for the banner while loading or on error
  const defaultSettings = {
    title: "Questo sito utilizza i cookie",
    description:
      "Utilizziamo i cookie per migliorare la tua esperienza di navigazione e per fornire contenuti personalizzati. Continuando a navigare accetti l'uso dei cookie.",
    acceptAllText: "Accetta tutti",
    rejectAllText: "Rifiuta tutti",
    customizeText: "Personalizza",
    privacyPolicyText: "Leggi la Privacy Policy",
    cookiePolicyText: "Leggi la Cookie Policy",
    position: "bottom",
    showRejectButton: true,
    showCustomizeButton: true,
  };

  // Use fetched categories when available, otherwise fallback to defaults
  const categories = cookieSettings?.cookieCategories || defaultCategories;

  return (
    <CookieConsentProvider categories={categories}>
      {children}
      {/* Always render the banner using fetched settings when available,
          otherwise fallback to defaultSettings so the banner appears immediately */}
      <CookieBanner settings={cookieSettings ?? defaultSettings} />
    </CookieConsentProvider>
  );
}
