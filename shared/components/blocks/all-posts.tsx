import SectionContainer from "@/shared/components/ui/section-container";
import { ColorVariant, SectionPadding } from "@/sanity.types";

import { stegaClean } from "next-sanity";
import { fetchSanityPosts } from "@/shared/sanity/lib/fetch";

import CategoryFilter from "@/shared/components/category-filter";
import { Category } from "@/shared/types";

import PostList from "../post-list";
import React from "react";


type AllPostsProps = {
  padding?: SectionPadding;
  colorVariant?: ColorVariant;
  language?: string;
  titleLabel?: string;
  loadingLabel?: string;
  allCategoriesLabel?: string;
};

export default async function AllPosts({
  padding,
  colorVariant,
  language = "it",
  titleLabel = "Ultime notizie",
  loadingLabel = "Caricamento...",
  allCategoriesLabel = "Tutte le categorie",
}: AllPostsProps) {
  const color = stegaClean(colorVariant) as ColorVariant | null | undefined;
  const posts = await fetchSanityPosts({ language });

  const categories: Category[] = posts
    .flatMap((post: any) => post?.categories ?? [])
    .map((category: any) => ({
      title: category.title ?? "",
      slug: "",
    }));

  return (
    <SectionContainer color={color} padding={padding as SectionPadding | null | undefined}>
      <React.Suspense fallback={<div>{loadingLabel}</div>}>
        <div className="border-t border-b mb-4 py-2 flex justify-between items-center">
          <h1 className="font-semibold text-xl self-center">{titleLabel}</h1>
          <CategoryFilter categories={categories} allCategoriesLabel={allCategoriesLabel} />
        </div>
        <PostList posts={posts} language={language} />
      </React.Suspense>
    </SectionContainer>
  );
}
