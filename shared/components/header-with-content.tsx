import { use } from "react";
import Header from "@/shared/components/header";
import { fetchSanityPageBySlug, fetchSanityHomepage } from "@/shared/sanity/lib/fetch";

interface HeaderWithContentProps {
  locale: string;
  slug?: string;
  isHomepage?: boolean;
}

export default function HeaderWithContent({ 
  locale, 
  slug,
  isHomepage = false 
}: HeaderWithContentProps) {
  
  const getPageData = async () => {
    try {
      if (isHomepage) {
        const page = await fetchSanityHomepage({ language: locale });
        return {
          contentId: page?.contentId,
          documentType: "page" as const,
          currentPath: ""
        };
      } else if (slug) {
        const page = await fetchSanityPageBySlug({ slug, language: locale });
        return {
          contentId: page?.contentId,
          documentType: "page" as const,
          currentPath: `/${slug}`
        };
      }
    } catch (error) {
      console.error("Error fetching page data for header:", error);
    }
    
    return {
      contentId: undefined,
      documentType: "page" as const,
      currentPath: slug ? `/${slug}` : ""
    };
  };

  const pageData = use(getPageData());

  return (
    <Header
      locale={locale}
      contentId={pageData.contentId ?? undefined}
      documentType={pageData.documentType}
      currentPath={pageData.currentPath ?? undefined}
    />
  );
}