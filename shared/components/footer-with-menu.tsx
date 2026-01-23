import { use } from "react";
import Footer from "@/shared/components/footer";
import { fetchSanityMenuPages } from "@/shared/sanity/lib/fetch";
import { fetchPolicyTitles } from "@/shared/sanity/queries/policies";

interface FooterWithMenuProps {
  language: string;
}

interface MenuPage {
  contentId: string;
  title: string;
  slug: { current: string };
  language: string;
}

export default function FooterWithMenu({ language }: FooterWithMenuProps) {
  
  const getFooterData = async () => {
    try {
      // Recupera i dati delle pagine del menu (stesso del header)
      const menuContentIds = ["homepage", "news", "about"];
      const [menuPages, policyTitles] = await Promise.all([
        fetchSanityMenuPages({
          contentIds: menuContentIds,
          language: language,
        }),
        fetchPolicyTitles(language)
      ]);

      return { menuPages: menuPages as MenuPage[], policyTitles };
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return { menuPages: [], policyTitles: null };
    }
  };

  const footerData = use(getFooterData());
  const { menuPages, policyTitles } = footerData;

  // Genera i navItems dai dati dinamici (stesso logic del header)
  const getNavItems = (menuPages: MenuPage[], language: string) => {
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
          ? `/${language}` 
          : `/${language}/${page.slug.current}`;
        
        items.push({
          label: config.label,
          href,
          target: false,
        });
      } else {
        // Fallback se la pagina non esiste in questa lingua
        console.warn(`Page with contentId "${config.contentId}" not found for language "${language}"`);
        const fallbackHref = config.contentId === "homepage" 
          ? `/${language}` 
          : `/${language}`;
        
        items.push({
          label: config.label,
          href: fallbackHref,
          target: false,
        });
      }
    }

    return items;
  };

  const navItems = getNavItems(menuPages, language);

  return <Footer locale={language} navItems={navItems} policyTitles={policyTitles} />;
}