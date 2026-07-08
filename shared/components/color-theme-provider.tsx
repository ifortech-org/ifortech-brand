"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { fetchSiteColors } from "@/shared/sanity/lib/siteColors";

export type ColorTheme = "light" | "dark" | "system";

function applySiteColors(siteColors: any, enableDarkTheme: boolean) {
  if (!siteColors || typeof window === "undefined") return;
  const root = document.documentElement;
  const lightVars = {
    "--background": siteColors.background,
    "--foreground": siteColors.text,
    "--card": siteColors.card,
    "--card-foreground": siteColors.cardForeground,
    "--popover": siteColors.popover,
    "--popover-foreground": siteColors.popoverForeground,
    "--primary": siteColors.primary,
    "--primary-foreground": siteColors.primaryForeground,
    "--secondary": siteColors.secondary,
    "--secondary-foreground": siteColors.secondaryForeground,
    "--muted": siteColors.muted,
    "--muted-foreground": siteColors.mutedForeground,
    "--accent": siteColors.accent,
    "--accent-foreground": siteColors.accentForeground,
    "--destructive": siteColors.destructive,
    "--destructive-foreground": siteColors.destructiveForeground,
    "--border": siteColors.border,
    "--input": siteColors.input,
    "--ring": siteColors.ring,
  };
  Object.entries(lightVars).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });
  if (!enableDarkTheme) return;
  const dark = document.querySelector<HTMLElement>(".dark");
  if (dark) {
    const darkVars = {
      "--background": siteColors.backgroundDark,
      "--foreground": siteColors.textDark,
      "--card": siteColors.cardDark,
      "--card-foreground": siteColors.cardForegroundDark,
      "--popover": siteColors.popoverDark,
      "--popover-foreground": siteColors.popoverForegroundDark,
      "--primary": siteColors.primaryDark,
      "--primary-foreground": siteColors.primaryForegroundDark,
      "--secondary": siteColors.secondaryDark,
      "--secondary-foreground": siteColors.secondaryForegroundDark,
      "--muted": siteColors.mutedDark,
      "--muted-foreground": siteColors.mutedForegroundDark,
      "--accent": siteColors.accentDark,
      "--accent-foreground": siteColors.accentForegroundDark,
      "--destructive": siteColors.destructiveDark,
      "--destructive-foreground": siteColors.destructiveForegroundDark,
      "--border": siteColors.borderDark,
      "--input": siteColors.inputDark,
      "--ring": siteColors.ringDark,
    };
    Object.entries(darkVars).forEach(([key, value]) => {
      if (value) dark.style.setProperty(key, value);
    });
  }
}

export function ColorThemeProvider({
  children,
  enableDarkTheme = true,
}: {
  children: React.ReactNode;
  enableDarkTheme?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const [siteColors, setSiteColors] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  // Carica i colori da Sanity una sola volta al mount
  React.useLayoutEffect(() => {
    fetchSiteColors().then((colors) => {
      setSiteColors(colors);
      setLoading(false);
    });
  }, []);

  // Applica i colori ogni volta che cambia il tema effettivo (resolvedTheme)
  React.useLayoutEffect(() => {
    if (!siteColors || !resolvedTheme) return;
    let mode: ColorTheme = "light";
    if (enableDarkTheme && resolvedTheme === "dark") mode = "dark";
    else if (resolvedTheme === "system") {
      if (
        enableDarkTheme &&
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        mode = "dark";
      }
    }
    applySiteColors(siteColors, enableDarkTheme);
  }, [enableDarkTheme, siteColors, resolvedTheme]);

  function Spinner() {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--background, #fff)",
          color: "var(--primary, #000)",
          transition: "background 0.2s",
        }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.2"
          />
          <path
            d="M44 24c0-11.046-8.954-20-20-20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (loading || !resolvedTheme) {
    return <Spinner />;
  }

  return <>{children}</>;
}
