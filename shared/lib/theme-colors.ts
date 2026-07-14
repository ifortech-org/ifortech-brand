export const THEME_COLOR_OPTIONS = [
  { title: "Background", value: "background", cssVar: "--background" },
  { title: "Text", value: "text", cssVar: "--foreground" },
  { title: "Card", value: "card", cssVar: "--card" },
  { title: "Card Foreground", value: "cardForeground", cssVar: "--card-foreground" },
  { title: "Popover", value: "popover", cssVar: "--popover" },
  { title: "Popover Foreground", value: "popoverForeground", cssVar: "--popover-foreground" },
  { title: "Primary", value: "primary", cssVar: "--primary" },
  { title: "Primary Foreground", value: "primaryForeground", cssVar: "--primary-foreground" },
  { title: "Secondary", value: "secondary", cssVar: "--secondary" },
  { title: "Secondary Foreground", value: "secondaryForeground", cssVar: "--secondary-foreground" },
  { title: "Muted", value: "muted", cssVar: "--muted" },
  { title: "Muted Foreground", value: "mutedForeground", cssVar: "--muted-foreground" },
  { title: "Accent", value: "accent", cssVar: "--accent" },
  { title: "Accent Foreground", value: "accentForeground", cssVar: "--accent-foreground" },
  { title: "Destructive", value: "destructive", cssVar: "--destructive" },
  { title: "Destructive Foreground", value: "destructiveForeground", cssVar: "--destructive-foreground" },
  { title: "Border", value: "border", cssVar: "--border" },
  { title: "Input", value: "input", cssVar: "--input" },
  { title: "Ring", value: "ring", cssVar: "--ring" },
] as const;

export type ThemeColorToken = (typeof THEME_COLOR_OPTIONS)[number]["value"];

const THEME_COLOR_MAP = new Map<ThemeColorToken, string>(
  THEME_COLOR_OPTIONS.map((option) => [option.value, option.cssVar])
);

export function isThemeColorToken(value?: string | null): value is ThemeColorToken {
  return !!value && THEME_COLOR_MAP.has(value as ThemeColorToken);
}

export function resolveThemeColorValue(
  value?: string | null,
  fallback: ThemeColorToken = "primary"
) {
  if (isThemeColorToken(value)) {
    return `var(${THEME_COLOR_MAP.get(value)})`;
  }

  if (value?.trim()) {
    return value.trim();
  }

  return `var(${THEME_COLOR_MAP.get(fallback) ?? "--primary"})`;
}
