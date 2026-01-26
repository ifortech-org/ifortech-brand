"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

interface Translation {
  language: {
    _ref: string;
    label: string;
    code: string;
  } | string;
  slug: { current: string };
  title: string;
}

interface LanguageSwitcherProps {
  currentLanguage: string;
  contentId?: string;
  documentType?: "page" | "post" | "policy" | "blogPage" | "cookieSettings" | "privacyPolicy" | "cookiePolicy";
  fallbackPath?: string;
  isBlogPage?: boolean;
}

export default function LanguageSwitcher({
  currentLanguage,
  contentId,
  documentType = "page",
  fallbackPath = "",
  isBlogPage = false
}: LanguageSwitcherProps) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (isBlogPage) {
      // Recupera tutte le lingue disponibili per blogPage
      fetch(`/api/translations?documentType=blogPage&contentId=`)
        .then(res => res.json())
        .then((data) => {
          setTranslations(data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (contentId) {
      fetch(`/api/translations?contentId=${contentId}&documentType=${documentType}`)
        .then(res => res.json())
        .then((data) => {
          setTranslations(data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (documentType && ["privacyPolicy", "cookiePolicy", "cookieSettings"].includes(documentType)) {
      fetch(`/api/translations?documentType=${documentType}`)
        .then(res => res.json())
        .then((data) => {
          setTranslations(data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [contentId, documentType, isBlogPage]);

  if (!loading && translations.length <= 1) {
    return null;
  }

  const languageOptions = translations.map(t => {
    let code = typeof t.language === "string" ? t.language : t.language?.code;
    let label = typeof t.language === "string" ? t.language.toUpperCase() : t.language?.label || code?.toUpperCase();
    return {
      code,
      label,
      slug: t.slug,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = languageOptions.find(l => l.code === e.target.value);
    if (!selected) return;
    let href = "/" + selected.code;
    if (isBlogPage) {
      href += "/blog";
    } else if (documentType === "post") {
      href += "/blog";
    }
    if (!isBlogPage && selected.slug?.current && selected.slug.current !== "index") {
      href += "/" + selected.slug.current;
    }
    window.location.href = href;
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <select
        className="border rounded px-2 py-1 text-xs bg-neutral-900 text-neutral-100 dark:bg-neutral-900 dark:text-neutral-100"
        value={currentLanguage}
        onChange={handleChange}
        aria-label="Cambia lingua"
      >
        {languageOptions.map((lang, idx) => (
          <option
            key={lang.code || lang.label || idx}
            value={lang.code}
            className="bg-neutral-900 text-neutral-100 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {lang.code?.toUpperCase() || lang.label || "IT"}
          </option>
        ))}
      </select>
    </div>
  );
}
