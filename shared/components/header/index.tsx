import Link from "next/link";
import LogoDynamic from "@/shared/components/logo-dynamic";
import MobileNav from "@/shared/components/header/mobile-nav";
import DesktopNav from "@/shared/components/header/desktop-nav";
import LanguageSwitcher from "@/shared/components/language-switcher";

interface HeaderProps {
  locale: string;
  contentId?: string;
  documentType?: "page" | "post" | "policy";
  currentPath?: string;
  navItems?: Array<{
    label: string;
    href: string;
    target: boolean;
  }>;
}

const getDefaultNavItems = (locale: string) => [
  {
    label: "Home",
    href: `/${locale}`,
    target: false,
  },
  {
    label: "Blog",
    href: `/${locale}/blog`,
    target: false,
  },
  {
    label: "About",
    href: `/${locale}/about`,
    target: false,
  },
];

export default function Header({ 
  locale, 
  contentId, 
  documentType = "page", 
  currentPath = "",
  navItems 
}: HeaderProps) {
  const menuItems = navItems || getDefaultNavItems(locale);
  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link
          href={`/${locale}`}
          aria-label="Home page"
          className="flex items-center h-14 min-w-[100px] max-w-[180px] xl:max-w-[220px] overflow-visible">
          <LogoDynamic
            style={{
              maxHeight: 48,
              width: "auto",
              height: "100%",
              objectFit: "contain",
            }}
            className="w-full h-full"
          />
        </Link>
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={menuItems} />
          <LanguageSwitcher 
            currentLanguage={locale}
            contentId={contentId}
            documentType={documentType}
            fallbackPath={currentPath}
          />
        </div>
        <div className="flex items-center gap-4 xl:hidden">
          <LanguageSwitcher 
            currentLanguage={locale}
            contentId={contentId}
            documentType={documentType}
            fallbackPath={currentPath}
          />
          <MobileNav navItems={menuItems} />
        </div>
      </div>
    </header>
  );
}
