import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { ColorThemeProvider } from "@/shared/components/color-theme-provider";
import { CookieProvider } from "@/shared/components/cookie-provider";
import { client } from "@/shared/sanity/lib/client";
import { GLOBAL_SEO_QUERY } from "@/shared/sanity/queries/seo";
import { urlFor } from "@/shared/sanity/lib/image";
import { fetchResolvedSiteSettings } from "@/shared/sanity/lib/siteSettings";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export async function generateMetadata() {
  const [seo, siteSettings] = await Promise.all([
    client.fetch(GLOBAL_SEO_QUERY),
    fetchResolvedSiteSettings(),
  ]);
  const siteName = seo?.title || siteSettings.siteName;
  const siteDescription = seo?.description || `${siteSettings.siteName}.`;
  const faviconUrl = siteSettings.favicon?.asset?.url || "/favicon.ico";

  return {
    title: siteName,
    description: siteDescription,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    keywords: seo?.keywords || [
      "Next.js",
      "Sanity",
      siteSettings.siteName,
      "Sito web",
      "SEO",
      "React",
      "Template",
    ],
    openGraph: {
      title: siteName,
      description: siteDescription,
      images: [
        seo?.image?.asset?.url
          ? {
              url: urlFor(seo.image).quality(100).url(),
              width: seo?.image?.asset?.metadata?.dimensions?.width || 1200,
              height: seo?.image?.asset?.metadata?.dimensions?.height || 630,
            }
          : {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
              width: 1200,
              height: 630,
            },
      ],
      locale: siteSettings.defaultLocale === "it" ? "it_IT" : "en_US",
      type: "website",
      siteName: siteSettings.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
      images: [
        seo?.image?.asset?.url
          ? urlFor(seo.image).quality(100).url()
          : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
      ],
      creator: siteSettings.twitterHandle,
    },
    robots:
      seo?.robots || (!isProduction ? "noindex, nofollow" : "index, follow"),
    authors: [
      {
        name: siteSettings.legalCompanyName || siteSettings.siteName,
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
    ],
  };
}

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await fetchResolvedSiteSettings();
  const darkEnabled = siteSettings.enableDarkTheme !== false;

  return (
    <html lang={siteSettings.defaultLocale || "it"} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme={darkEnabled ? "system" : "light"}
          enableSystem={darkEnabled}
          forcedTheme={darkEnabled ? undefined : "light"}
          disableTransitionOnChange>
          <ColorThemeProvider enableDarkTheme={darkEnabled}>
            <CookieProvider>{children}</CookieProvider>
          </ColorThemeProvider>
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
