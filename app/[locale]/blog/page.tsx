import { generatePageMetadata } from "@/shared/sanity/lib/metadata";
import { fetchSanityBlogPage } from "@/shared/sanity/lib/fetch";
import HeaderWithMenu from "@/shared/components/header-with-menu";
import Breadcrumbs from "@/shared/components/ui/breadcrumbs";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const blogPage = await fetchSanityBlogPage({ language: locale });
  return generatePageMetadata({ 
    page: blogPage,
    slug: `/${locale}/blog` 
  });
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const blogPage = await fetchSanityBlogPage({ language: locale });

  const links = [
    {
      label: "Home",
      href: `/${locale}`,
    },
    {
      label: blogPage?.title || "Blog",
      href: "#",
    },
  ];

  return (
    <>
      <HeaderWithMenu locale={locale} slug="blog" />
      <section>
          {blogPage?.heroSubtitle && (
            <p className="mb-8 text-lg text-muted-foreground">{blogPage.heroSubtitle}</p>
          )}
          {/* Renderizza i blocchi custom, inclusi all-posts */}
          {blogPage?.blocks?.map((block: any, idx: number) => {
            if (block._type === "all-posts") {
              const AllPosts = require("@/shared/components/blocks/all-posts").default;
              return <AllPosts key={idx} {...block} language={locale} />;
            }
            if (block._type === "block") {
              const PortableTextRenderer = require("@/shared/components/portable-text-renderer").default;
              return <PortableTextRenderer key={idx} value={[block]} />;
            }
            return null;
          })}
      </section>
    </>
  );
}