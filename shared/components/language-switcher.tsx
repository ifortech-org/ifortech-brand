"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

interface Translation {
  language: string;
  slug: { current: string };
  title: string;
}

interface LanguageSwitcherProps {
  currentLanguage: string;
  contentId?: string;
  documentType?: "page" | "post" | "policy";
  fallbackPath?: string;
}

export default function LanguageSwitcher({ 
  currentLanguage, 
  contentId,
  documentType = "page",
  fallbackPath = ""
}: LanguageSwitcherProps) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contentId || documentType === "policy") return; // Le policies non usano l'API translations

    setLoading(true);
    
    // Fetch translations via API route
    fetch(`/api/translations?contentId=${contentId}&documentType=${documentType}`)
      .then(res => res.json())
      .then(setTranslations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [contentId, documentType]);

  const getTranslationUrl = (targetLanguage: string) => {
    if (!contentId || loading) {
      // Fallback per pagine senza contentId o durante il loading
      return `/${targetLanguage}${fallbackPath}`;
    }

    // Per le policies, l'URL è sempre uguale, cambia solo la lingua
    if (documentType === "policy" && contentId) {
      return `/${targetLanguage}/${contentId}`;
    }

    const translation = translations.find(t => t.language === targetLanguage);
    
    if (translation?.slug?.current) {
      // Per i post del blog
      if (documentType === "post") {
        return `/${targetLanguage}/blog/${translation.slug.current}`;
      }
      
      // Per le pagine normali
      // Se la pagina è homepage (slug index o simili), vai alla root
      if (translation.slug.current === "index" || contentId === "homepage") {
        return `/${targetLanguage}`;
      }
      return `/${targetLanguage}/${translation.slug.current}`;
    }
    
    // Fallback: per i post vai al blog, per le pagine alla homepage
    if (documentType === "post") {
      return `/${targetLanguage}/blog`;
    }
    return `/${targetLanguage}`;
  };

  const hasTranslation = (language: string) => {
    if (!contentId || loading) return true;
    
    // Per le policies, assumiamo che esista sempre una versione 
    // (sarà creata dall'editor se necessario)
    if (documentType === "policy") return true;
    
    return translations.some(t => t.language === language);
  };

  const languages = [
    { code: "it", label: "IT", title: "Italiano" },
    { code: "en", label: "EN", title: "English" }
  ];

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          const isAvailable = hasTranslation(lang.code);
          
          if (!isAvailable && !isActive) {
            return (
              <Button 
                key={lang.code}
                variant="ghost"
                size="sm"
                disabled
                className="text-xs px-2 py-1 h-7 text-muted-foreground/50"
                title={`${lang.title} - Non disponibile`}
              >
                {lang.label}
              </Button>
            );
          }
          
          return (
            <Button 
              key={lang.code}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className="text-xs px-2 py-1 h-7"
              asChild={!isActive}
              disabled={isActive}
              title={lang.title}
            >
              {isActive ? (
                <span>{lang.label}</span>
              ) : (
                <Link href={getTranslationUrl(lang.code)}>
                  {lang.label}
                </Link>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
