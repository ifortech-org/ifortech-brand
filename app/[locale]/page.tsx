import Blocks from "@/shared/components/blocks";
import { fetchSanityHomepage } from "@/shared/sanity/lib/fetch";
import { generatePageMetadata } from "@/shared/sanity/lib/metadata";
import MissingSanityPage from "@/shared/components/ui/missing-sanity-page";
import HeaderWithMenu from "@/shared/components/header-with-menu";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const page = await fetchSanityHomepage({ language: locale });

  return generatePageMetadata({ page, slug: `${locale}` });
}

export default async function IndexPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const page = await fetchSanityHomepage({ language: locale });

  if (!page) {
    return (
      <>
        <HeaderWithMenu locale={locale} isHomepage={true} />
        <MissingSanityPage document="page" slug="homepage" />
      </>
    );
  }

  return (
    <>
      <HeaderWithMenu locale={locale} isHomepage={true} />
      <Blocks blocks={page?.blocks ?? []} language={locale} />
    </>
  );
}
