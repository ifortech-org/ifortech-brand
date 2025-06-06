import { groq } from "next-sanity";

export const siteColorsQuery = groq`*[_type == "siteColors"] | order(_createdAt desc)[0]{
  background,
  primary,
  secondary,
  card,
  accent,
  destructive,
  muted,
  text,
  backgroundDark,
  primaryDark,
  secondaryDark,
  cardDark,
  accentDark,
  destructiveDark,
  mutedDark,
  textDark
}`;
