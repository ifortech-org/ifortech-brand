import { CookiePreferencesClient } from "./cookie-preferences-client";
import { Metadata } from "next";
import { fetchSanityCookieSettings } from "@/shared/sanity/queries/policies";
import LanguageSwitcher from "@/shared/components/language-switcher";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const cookieSettings = await fetchSanityCookieSettings(locale);
  
  return {
    title: cookieSettings?.customizeText || "Preferenze Cookie",
    description: cookieSettings?.description || "Gestisci le tue preferenze sui cookie per questo sito web.",
    robots: "noindex, nofollow",
  };
}

export default async function CookiePreferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cookieSettings = await fetchSanityCookieSettings(locale);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">
            {cookieSettings?.preferencesTitle || cookieSettings?.customizeText || "Preferenze Cookie"}
          </h1>
          <LanguageSwitcher 
            currentLanguage={locale} 
            documentType="cookieSettings"
            fallbackPath="/cookie-preferences"
          />
        </div>
        <p className="text-muted-foreground mb-8">
          {cookieSettings?.preferencesDescription || cookieSettings?.description || "Personalizza le tue impostazioni sui cookie. Puoi cambiare queste impostazioni in qualsiasi momento."}
        </p>
        <CookiePreferencesClient cookieSettings={cookieSettings} />
      </div>
    </div>
  );
}
