import { notFound } from "next/navigation";
import Breadcrumbs from "@/shared/components/ui/breadcrumbs";
import PostHero from "@/shared/components/blocks/post-hero";
import { BreadcrumbLink } from "@/shared/types";
import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import LanguageSwitcher from "@/shared/components/language-switcher";
import {
  fetchSanityPostBySlug,
  fetchSanityPostsStaticParams,
} from "@/shared/sanity/lib/fetch";
import { generatePageMetadata } from "@/shared/sanity/lib/metadata";
import { Slug } from "@/sanity.types";

export async function generateStaticParams() {
  const posts = await fetchSanityPostsStaticParams();

  return posts.flatMap((post: { slug: Slug | null }) => 
    ["it", "en"].map((locale) => ({
      locale,
      slug: post.slug?.current,
    }))
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await props.params;
  const post = await fetchSanityPostBySlug({ slug, language: locale });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `/${locale}/blog/${slug}` });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await props.params;
  const post = await fetchSanityPostBySlug({ slug, language: locale });

  if (!post) {
    notFound();
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: "Home",
          href: `/${locale}`,
        },
        {
          label: "Blog",
          href: `/${locale}/blog`,
        },
        {
          label: post.title as string,
          href: "#",
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <Breadcrumbs links={links} />
            <LanguageSwitcher 
              currentLanguage={locale} 
              contentId={post?.contentId ?? undefined}
              documentType="post" 
            />
          </div>
          <PostHero {...post} />
          {post.body && <PortableTextRenderer value={post.body} />}
        </article>
      </div>
    </section>
  );
}
