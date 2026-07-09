export const legacySiteSettingsFallback = {
  siteName: "iFortech",
  legalCompanyName: "iFortech",
  defaultLocale: "it",
  enableDarkTheme: true,
  enableBlog: true,
  twitterHandle: "@tuotwitter",
  copyrightText: "iFortech. All rights reserved.",
  favicon: null,
  email: {
    brandName: "iFortech",
    adminSubjectPrefix: "IFORTECH",
    adminTitle: "Nuova richiesta di contatto",
    teamName: "Il Team di iFortech",
    replyTo: "",
    logoMode: "siteLogo",
    customLogo: null,
  },
} as const;

export const legacySiteColorsFallback = {
  background: "hsl(0 0% 100%)",
  text: "hsl(0 0% 0%)",
  card: "hsl(0 0% 98%)",
  cardForeground: "hsl(0 0% 0%)",
  popover: "hsl(0 0% 98%)",
  popoverForeground: "hsl(0 0% 0%)",
  primary: "hsl(0 0% 0%)",
  primaryForeground: "hsl(0 0% 100%)",
  secondary: "hsl(0 0% 90%)",
  secondaryForeground: "hsl(0 0% 0%)",
  muted: "hsl(0 0% 85%)",
  mutedForeground: "hsl(0 0% 40%)",
  accent: "hsl(0 0% 20%)",
  accentForeground: "hsl(0 0% 100%)",
  destructive: "hsl(0 0% 20%)",
  destructiveForeground: "hsl(0 0% 100%)",
  border: "hsl(0 0% 80%)",
  input: "hsl(0 0% 80%)",
  ring: "hsl(0 0% 0%)",
  backgroundDark: "hsl(0 0% 0%)",
  textDark: "hsl(0 0% 100%)",
  cardDark: "hsl(0 0% 10%)",
  cardForegroundDark: "hsl(0 0% 100%)",
  popoverDark: "hsl(0 0% 10%)",
  popoverForegroundDark: "hsl(0 0% 100%)",
  primaryDark: "hsl(0 0% 100%)",
  primaryForegroundDark: "hsl(0 0% 0%)",
  secondaryDark: "hsl(0 0% 20%)",
  secondaryForegroundDark: "hsl(0 0% 100%)",
  mutedDark: "hsl(0 0% 25%)",
  mutedForegroundDark: "hsl(0 0% 65%)",
  accentDark: "hsl(0 0% 80%)",
  accentForegroundDark: "hsl(0 0% 0%)",
  destructiveDark: "hsl(0 0% 80%)",
  destructiveForegroundDark: "hsl(0 0% 0%)",
  borderDark: "hsl(0 0% 25%)",
  inputDark: "hsl(0 0% 25%)",
  ringDark: "hsl(0 0% 100%)",
} as const;

export const defaultCookieSettings = {
  title: "Questo sito utilizza i cookie",
  description:
    "Utilizziamo i cookie per migliorare la tua esperienza di navigazione e per fornire contenuti personalizzati. Continuando a navigare accetti l'uso dei cookie.",
  acceptAllText: "Accetta tutti",
  rejectAllText: "Rifiuta tutti",
  customizeText: "Personalizza",
  privacyPolicyText: "Leggi la Privacy Policy",
  cookiePolicyText: "Leggi la Cookie Policy",
  position: "bottom",
  showRejectButton: true,
  showCustomizeButton: true,
  cookieCategories: [
    {
      id: "necessary",
      name: "Cookie Necessari",
      description:
        "Questi cookie sono essenziali per il funzionamento del sito web.",
      required: true,
      defaultEnabled: true,
    },
    {
      id: "analytics",
      name: "Cookie Analytics",
      description:
        "Ci aiutano a capire come i visitatori interagiscono con il sito web.",
      required: false,
      defaultEnabled: false,
    },
    {
      id: "marketing",
      name: "Cookie Marketing",
      description:
        "Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.",
      required: false,
      defaultEnabled: false,
    },
  ],
} as const;

export function mergeSiteSettings(siteSettings?: any) {
  return {
    ...legacySiteSettingsFallback,
    ...siteSettings,
    email: {
      ...legacySiteSettingsFallback.email,
      ...(siteSettings?.email ?? {}),
    },
  };
}

export function mergeSiteColors(siteColors?: any) {
  const merged = {
    ...legacySiteColorsFallback,
    ...(siteColors ?? {}),
  };

  if (siteColors?.cardDark && !siteColors?.popoverDark) {
    merged.popoverDark = siteColors.cardDark;
  }
  if (siteColors?.card && !siteColors?.popover) {
    merged.popover = siteColors.card;
  }

  return merged;
}
