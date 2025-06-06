import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { fetchSiteColors } from "@/shared/sanity/lib/siteColors";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Schema UI Starter",
    default: "Sanity Next.js Website | Schema UI Starter",
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

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
  const siteColors = await fetchSiteColors();

  // Funzione aggiornata per supportare tutte le variabili e la dark mode
  function getColorVars(colors: any): React.CSSProperties {
    if (!colors) return {};
    // Solo le variabili per il body (chiaro)
    return {
      // @ts-ignore
      "--background": colors.background,
      // @ts-ignore
      "--primary": colors.primary,
      // @ts-ignore
      "--secondary": colors.secondary,
      // @ts-ignore
      "--card": colors.card,
      // @ts-ignore
      "--accent": colors.accent,
      // @ts-ignore
      "--destructive": colors.destructive,
      // @ts-ignore
      "--muted": colors.muted,
      // @ts-ignore
      "--foreground": colors.text,
    };
  }

  // Applica le variabili dark mode su .dark lato client
  if (typeof window !== "undefined" && siteColors) {
    const root = document.documentElement;
    const darkVars = {
      "--background": siteColors.backgroundDark,
      "--primary": siteColors.primaryDark,
      "--secondary": siteColors.secondaryDark,
      "--card": siteColors.cardDark,
      "--accent": siteColors.accentDark,
      "--destructive": siteColors.destructiveDark,
      "--muted": siteColors.mutedDark,
      "--foreground": siteColors.textDark,
    };
    if (root.classList.contains("dark")) {
      Object.entries(darkVars).forEach(([key, value]) => {
        if (value) root.style.setProperty(key, value);
      });
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" />
      <body
        style={getColorVars(siteColors)}
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
