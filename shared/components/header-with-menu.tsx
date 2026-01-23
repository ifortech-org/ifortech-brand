import { use } from "react";
import Header from "@/shared/components/header";
import { fetchSanityPageBySlug, fetchSanityHomepage, fetchSanityMenuPages } from "@/shared/sanity/lib/fetch";

interface HeaderWithMenuProps {
  locale: string;
  slug?: string;
  isHomepage?: boolean;
}

interface MenuPage {
  contentId: string;
  title: string;
  slug: { current: string };
  language: string;
}

export default function HeaderWithMenu({ 
  locale, 
  slug,
  isHomepage = false 
}: HeaderWithMenuProps) {
  
  const getHeaderData = async () => {
    try {
      // Recupera i dati delle pagine del menu
      const menuContentIds = ["homepage", "news", "about"];
      const menuPages = await fetchSanityMenuPages({
        contentIds: menuContentIds,
        language: locale,
      });

      // Recupera i dati della pagina corrente per il language switcher
      let currentPageData = null;
      let contentId = undefined;
      let documentType: "page" | "post" | "policy" = "page";
      
      if (isHomepage) {
        currentPageData = await fetchSanityHomepage({ language: locale });
        contentId = currentPageData?.contentId || "homepage";
      } else if (slug === "blog") {
        // Per la pagina blog, usa contentId "news"
        contentId = "news";
      } else if (slug === "privacy-policy") {
        // Per le policies, usa il tipo di documento come identificatore
        contentId = "privacy-policy";
        documentType = "policy";
      } else if (slug === "cookie-policy") {
        // Per le policies, usa il tipo di documento come identificatore
        contentId = "cookie-policy";
        documentType = "policy";
      } else if (slug) {
        currentPageData = await fetchSanityPageBySlug({ slug, language: locale });
        contentId = currentPageData?.contentId;
      }

      return {
        menuPages: menuPages as MenuPage[],
        contentId: contentId,
        documentType: documentType,
        currentPath: slug ? `/${slug}` : ""
      };
    } catch (error) {
      console.error("Error fetching header data:", error);
      return {
        menuPages: [],
        contentId: undefined,
        documentType: "page" as const,
        currentPath: slug ? `/${slug}` : ""
      };
    }
  };

  const headerData = use(getHeaderData());

  // Genera i navItems dai dati dinamici
  const getNavItems = (menuPages: MenuPage[], locale: string) => {
    const items = [];
    
    // Configura l'ordine e le etichette desiderate
    const menuConfig = [
      { contentId: "homepage", label: "Home" },
      { contentId: "news", label: "Blog" },
      { contentId: "about", label: "About" }
    ];

    for (const config of menuConfig) {
      const page = menuPages.find(p => p.contentId === config.contentId);
      
      if (page) {
        const href = page.contentId === "homepage" 
          ? `/${locale}` 
          : `/${locale}/${page.slug.current}`;
        
        items.push({
          label: config.label,
          href,
          target: false,
        });
      } else {
        // Fallback se la pagina non esiste in questa lingua
        console.warn(`Page with contentId "${config.contentId}" not found for language "${locale}"`);
        const fallbackHref = config.contentId === "homepage" 
          ? `/${locale}` 
          : `/${locale}`;
        
        items.push({
          label: config.label,
          href: fallbackHref,
          target: false,
        });
      }
    }

    return items;
  };

  const navItems = getNavItems(headerData.menuPages, locale);

  return (
    <Header
      locale={locale}
      contentId={headerData.contentId}
      documentType={headerData.documentType}
      currentPath={headerData.currentPath}
      navItems={navItems}
    />
  );
}