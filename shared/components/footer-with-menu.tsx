import { use } from "react";
import Footer from "@/shared/components/footer";
import { fetchSanityMenuPages } from "@/shared/sanity/lib/fetch";
import { fetchPolicyTitles } from "@/shared/sanity/queries/policies";
import { fetchResolvedSiteSettings } from "@/shared/sanity/lib/siteSettings";

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
      const [menuPages, policyTitles, siteSettings] = await Promise.all([
        fetchSanityMenuPages({
          contentIds: menuContentIds,
          language: language,
        }),
        fetchPolicyTitles(language),
        fetchResolvedSiteSettings(),
      ]);

      return {
        menuPages: menuPages as MenuPage[],
        policyTitles,
        enableBlog: siteSettings.enableBlog !== false,
      };
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return { menuPages: [], policyTitles: null, enableBlog: true };
    }
  };

  const footerData = use(getFooterData());
  const { menuPages, policyTitles, enableBlog } = footerData;

  // Genera i navItems dai dati dinamici (stesso logic del header)
  const getNavItems = (menuPages: MenuPage[], language: string, enableBlog: boolean) => {
    const items = [];
    
    // Configura l'ordine e le etichette desiderate

    const menuConfig = [
      { contentId: "homepage", label: "Home" },
      { contentId: "news", label: "Blog", isBlog: true },
      { contentId: "about", label: "About" }
    ].filter((item) => enableBlog || !item.isBlog);

    for (const config of menuConfig) {
      if (config.isBlog) {
        // Link fisso per la pagina blog
        items.push({
          label: config.label,
          href: `/${language}/blog`,
          target: false,
        });
      } else {
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
    }

    return items;
  };

  const navItems = getNavItems(menuPages, language, enableBlog);

  return <Footer locale={language} navItems={navItems} policyTitles={policyTitles} />;
}
