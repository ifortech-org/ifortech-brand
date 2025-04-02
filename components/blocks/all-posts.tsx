import SectionContainer from "@/components/ui/section-container";

import { stegaClean } from "next-sanity";
import { fetchSanityPosts } from "@/sanity/lib/fetch";
import { PAGE_QUERYResult } from "@/sanity.types";
import CategoryFilter from "@/components/category-filter";
import { Category } from "@/types";

import PostList from "../post-list";

type AllPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "all-posts" }
>;

export default async function AllPosts({
  padding,
  colorVariant,
}: AllPostsProps) {
  const color = stegaClean(colorVariant);
  const posts = await fetchSanityPosts();

  const categories: Category[] = posts
    .flatMap((post) => post?.categories ?? [])
    .map((category) => ({
      title: category.title ?? "",
      slug: category.slug?.current ?? "",
    }));

  return (
    <SectionContainer color={color} padding={padding}>
      <div className=" border-t border-b mb-4 py-2 flex justify-between items-center">
        <h1 className="font-semibold text-xl self-center">Ultime notizie</h1>

        <CategoryFilter categories={categories} />
      </div>

      <PostList posts={posts} />
    </SectionContainer>
  );
}
