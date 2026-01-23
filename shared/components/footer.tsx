import Link from "next/link";
import LogoDynamic from "@/shared/components/logo-dynamic";
import { fetchFooterSettings } from "@/shared/sanity/lib/footerSettings";

interface FooterProps {
  locale: string;
  navItems?: Array<{
    label: string;
    href: string;
    target: boolean;
  }>;
  policyTitles?: {
    privacyPolicy?: { title?: string };
    cookiePolicy?: { title?: string };
    cookieSettings?: { preferencesTitle?: string; customizeText?: string };
  } | null;
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

export default async function Footer({ locale, navItems, policyTitles }: FooterProps) {
  const menuItems = navItems || getDefaultNavItems(locale);
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const footerSettings = await fetchFooterSettings(locale);

  // Testi fallback per le policy
  const getPolicyTexts = () => {
    const defaults = {
      privacyPolicy: locale === 'en' ? 'Privacy Policy' : 'Privacy Policy',
      cookiePolicy: locale === 'en' ? 'Cookie Policy' : 'Cookie Policy', 
      cookiePreferences: locale === 'en' ? 'Cookie Preferences' : 'Preferenze Cookie',
    };

    if (!policyTitles) return defaults;

    return {
      privacyPolicy: policyTitles.privacyPolicy?.title || defaults.privacyPolicy,
      cookiePolicy: policyTitles.cookiePolicy?.title || defaults.cookiePolicy,
      cookiePreferences: policyTitles.cookieSettings?.preferencesTitle || 
                         policyTitles.cookieSettings?.customizeText || 
                         defaults.cookiePreferences,
    };
  };

  const policyTexts = getPolicyTexts();

  return (
    <footer>
      <div className="dark:bg-background p-5 xl:p-5 dark:text-gray-300">
        <Link
          className="block w-[6.25rem] mx-auto"
          href={`/${locale}`}
          aria-label="Home page">
          <LogoDynamic />
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-primary">
          {menuItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm">
              {navItem.label}
            </Link>
          ))}
        </div>
        {footerSettings?.customText && (
          <div className="mt-6 text-center">
            <p className="text-foreground/70 text-sm leading-relaxed whitespace-pre-line mx-auto">
              {footerSettings.customText}
            </p>
          </div>
        )}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 justify-center text-center lg:mt-5 text-xs border-t pt-8">
          <p className="text-foreground/60">
            &copy; {getCurrentYear()}&nbsp;iFortech. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60">
            <Link
              href={`/${locale}/privacy-policy`}
              className="transition-colors hover:text-foreground/80">
              {policyTexts.privacyPolicy}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale}/cookie-policy`}
              className="transition-colors hover:text-foreground/80">
              {policyTexts.cookiePolicy}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale}/cookie-preferences`}
              className="transition-colors hover:text-foreground/80">
              {policyTexts.cookiePreferences}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
