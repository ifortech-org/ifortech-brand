import { generatePageMetadata } from "@/shared/sanity/lib/metadata";
import { fetchSanityPosts } from "@/shared/sanity/lib/fetch";
import PostList from "@/shared/components/post-list";
import CategoryFilter from "@/shared/components/category-filter";
import { Category } from "@/shared/types";
import HeaderWithMenu from "@/shared/components/header-with-menu";
import Breadcrumbs from "@/shared/components/ui/breadcrumbs";
import { BreadcrumbLink } from "@/shared/types";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  
  return generatePageMetadata({ 
    page: { 
      title: locale === "en" ? "Blog" : "Blog", 
      description: locale === "en" ? "Read our latest articles and news" : "Leggi i nostri ultimi articoli e notizie"
    }, 
    slug: `/${locale}/blog` 
  });
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  
  // Fetch posts filtrati per lingua
  const posts = await fetchSanityPosts({ language: locale });

  // Estrai le categorie dai post
  const categories: Category[] = posts
    .flatMap((post) => post?.categories ?? [])
    .map((category) => ({
      title: category?.title ?? "",
      slug: category?.slug?.current ?? "",
    }));

  const links: BreadcrumbLink[] = [
    {
      label: "Home",
      href: `/${locale}`,
    },
    {
      label: "Blog",
      href: "#",
    },
  ];

  return (
    <>
      <HeaderWithMenu locale={locale} slug="blog" />
      <section className="py-16 xl:py-20">
        <div className="container">
          <Breadcrumbs links={links} />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              {locale === "en" ? "Blog" : "Blog"}
            </h1>
            
            {categories.length > 0 && (
              <CategoryFilter categories={categories} />
            )}
            
            <PostList posts={posts} />
          </div>
        </div>
      </section>
    </>
  );
}