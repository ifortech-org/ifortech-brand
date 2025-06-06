"use client";

import React, { useLayoutEffect, useState } from "react";
import { useTheme } from "next-themes";
import { fetchSiteColors } from "@/shared/sanity/lib/siteColors";

function applySiteColors(siteColors: any) {
  if (!siteColors || typeof window === "undefined") return;
  const root = document.documentElement;
  // Light mode su :root
  const lightVars = {
    "--background": siteColors.background,
    "--primary": siteColors.primary,
    "--secondary": siteColors.secondary,
    "--card": siteColors.card,
    "--accent": siteColors.accent,
    "--destructive": siteColors.destructive,
    "--muted": siteColors.muted,
    "--foreground": siteColors.text,
  };
  Object.entries(lightVars).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });
  // Dark mode su .dark
  const dark = document.querySelector<HTMLElement>(".dark");
  if (dark) {
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
    Object.entries(darkVars).forEach(([key, value]) => {
      if (value) dark.style.setProperty(key, value);
    });
  }
}

export function SiteColorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [siteColors, setSiteColors] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Carica i colori da Sanity una sola volta al mount
  useLayoutEffect(() => {
    fetchSiteColors().then((colors) => {
      setSiteColors(colors);
      applySiteColors(colors);
      setLoading(false);
    });
  }, []);

  // Applica i colori ogni volta che cambia il tema
  useLayoutEffect(() => {
    if (siteColors) {
      applySiteColors(siteColors);
    }
  }, [resolvedTheme, siteColors]);

  if (loading) {
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

  return <>{children}</>;
}

export { applySiteColors };
