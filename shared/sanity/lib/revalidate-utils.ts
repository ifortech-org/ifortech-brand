export type SanityWebhookPayload = {
  _type?: string;
  slug?: { current?: string | null } | string | null;
  language?: { code?: string | null } | string | null;
  before?: {
    slug?: { current?: string | null } | string | null;
    language?: { code?: string | null } | string | null;
  } | null;
  after?: {
    slug?: { current?: string | null } | string | null;
    language?: { code?: string | null } | string | null;
  } | null;
};

export type RevalidatePattern = {
  path: string;
  type: "page" | "layout";
};

function readSlug(value: SanityWebhookPayload["slug"]): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.current ?? null;
}

function readLocale(value: SanityWebhookPayload["language"]): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.code ?? null;
}

function normalizePath(path: string): string {
  return path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
}

export function getRevalidationTargets(payload: SanityWebhookPayload) {
  const paths = new Set<string>(["/sitemap.xml", "/robots.txt"]);
  const patterns: RevalidatePattern[] = [
    { path: "/[locale]", type: "page" },
    { path: "/[locale]/[slug]", type: "page" },
    { path: "/[locale]/blog", type: "page" },
    { path: "/[locale]/blog/[slug]", type: "page" },
    { path: "/[locale]/privacy-policy", type: "page" },
    { path: "/[locale]/cookie-policy", type: "page" },
  ];

  const variants = [payload, payload.before ?? null, payload.after ?? null];

  for (const variant of variants) {
    if (!variant) continue;

    const locale = readLocale(variant.language);
    const slug = readSlug(variant.slug);

    if (!locale) continue;

    paths.add(`/${locale}`);

    if (payload._type === "post") {
      paths.add(`/${locale}/blog`);
      if (slug) {
        paths.add(`/${locale}/blog/${slug}`);
      }
      continue;
    }

    if (payload._type === "privacyPolicy") {
      paths.add(`/${locale}/privacy-policy`);
      continue;
    }

    if (payload._type === "cookiePolicy") {
      paths.add(`/${locale}/cookie-policy`);
      continue;
    }

    if (payload._type === "blogPage") {
      paths.add(`/${locale}/blog`);
      continue;
    }

    if (!slug) continue;

    paths.add(`/${locale}/${slug}`);
    if (slug === "index" || slug === "homepage") {
      paths.add(`/${locale}`);
    }
  }

  return {
    tags: ["sanity"],
    paths: [...paths].map(normalizePath),
    patterns,
  };
}
