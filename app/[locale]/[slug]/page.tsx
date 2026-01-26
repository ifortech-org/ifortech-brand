import Blocks from "@/shared/components/blocks";
import { Slug } from "@/sanity.types";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/shared/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/shared/sanity/lib/metadata";
import HeaderWithMenu from "@/shared/components/header-with-menu";

export async function generateStaticParams() {
  const locales = ["it", "en"];
  const allPages = [];
  
  for (const locale of locales) {
    const pages = await fetchSanityPagesStaticParams({ language: locale });
    allPages.push(...pages.map((page: { slug: Slug | null }, index: number, array: { slug: Slug | null }[]) => ({
      locale,
      slug: page.slug?.current,
    })));
  }
  
  return allPages;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await props.params;
  const page = await fetchSanityPageBySlug({ slug, language: locale });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: `${locale}/${slug}` });
}

export default async function Page(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await props.params;
  const page = await fetchSanityPageBySlug({ slug, language: locale });

  if (!page) {
    notFound();
  }

  return (
    <>
      <HeaderWithMenu locale={locale} slug={slug} />
      <Blocks blocks={page?.blocks ?? []} language={locale} />
    </>
  );
}
