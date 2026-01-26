import { fetchSanityCookiePolicy } from "@/shared/sanity/lib/fetch";
import { COOKIE_POLICY_QUERY } from "@/shared/sanity/queries/policies";
import { urlFor } from "@/shared/sanity/lib/image";
import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import { Metadata } from "next";
import HeaderWithMenu from "@/shared/components/header-with-menu";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/shared/components/language-switcher";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const policy = await fetchSanityCookiePolicy({ language: locale });

  if (!policy) {
    return {
      title: "Cookie Policy",
      description: "Cookie Policy",
    };
  }

  return {
    title: policy.seo?.title || policy.title || "Cookie Policy",
    description: policy.seo?.description || "Cookie Policy",
    keywords: policy.seo?.keywords || [],
    openGraph: {
      title: policy.seo?.title || policy.title || "Cookie Policy",
      description: policy.seo?.description || "Cookie Policy",
      images: policy.seo?.image?.asset?.url
        ? [
            {
              url: urlFor(policy.seo.image).quality(100).url(),
              width: policy.seo.image.asset.metadata?.dimensions?.width || 1200,
              height:
                policy.seo.image.asset.metadata?.dimensions?.height || 630,
            },
          ]
        : [],
    },
    robots: policy.seo?.robots || "index, follow",
  };
}

export default async function CookiePolicyPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const policy = await fetchSanityCookiePolicy({ language: locale });

  if (!policy) {
    notFound();
  }

  return (
    <>
      <HeaderWithMenu locale={locale} slug="cookie-policy" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{policy.title}</h1>
          {policy.lastUpdated && (
            <p className="text-muted-foreground mb-8">
              Ultimo aggiornamento:{" "}
              {new Date(policy.lastUpdated).toLocaleDateString("it-IT")}
            </p>
          )}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableTextRenderer value={policy.content} />
          </div>
        </div>
      </div>
    </>
  );
}
