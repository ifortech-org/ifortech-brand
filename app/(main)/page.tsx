import Blocks from "@/shared/components/blocks";
import { fetchSanityPageBySlug } from "@/shared/sanity/lib/fetch";
import { generatePageMetadata } from "@/shared/sanity/lib/metadata";
import MissingSanityPage from "@/shared/components/ui/missing-sanity-page";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  return generatePageMetadata({ page, slug: "index" });
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page) {
    return MissingSanityPage({ document: "page", slug: "index" });
  }

  return <Blocks blocks={page?.blocks ?? []} />;
}
