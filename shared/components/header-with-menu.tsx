import { use } from "react";
import Header from "@/shared/components/header";
import { fetchSanityPageBySlug, fetchSanityHomepage, fetchSanityMenuPages, fetchSanityBlogPage } from "@/shared/sanity/lib/fetch";

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
      let documentType: "page" | "post" | "policy" | "blogPage" | "cookieSettings" | "cookiePolicy" | "privacyPolicy" = "page";
      
      if (isHomepage) {
        currentPageData = await fetchSanityHomepage({ language: locale });
        contentId = currentPageData?.contentId || "homepage";
      } else if (slug === "blog") {
        // Per la pagina blog, non serve contentId, basta documentType
        contentId = undefined;
        documentType = "blogPage";
      } else if (slug === "privacy-policy") {
        contentId = undefined;
        documentType = "privacyPolicy";
      } else if (slug === "cookie-policy") {
        contentId = undefined;
        documentType = "cookiePolicy";
      } else if (slug === "cookie-preferences") {
        contentId = undefined;
        documentType = "cookieSettings";
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
      { contentId: "news", label: "Blog", isBlog: true },
      { contentId: "about", label: "About" }
    ];

    for (const config of menuConfig) {
      if (config.isBlog) {
        // Link fisso per la pagina blog
        items.push({
          label: config.label,
          href: `/${locale}/blog`,
          target: false,
        });
      } else {
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