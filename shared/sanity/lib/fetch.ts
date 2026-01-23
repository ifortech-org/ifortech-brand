import { sanityFetch } from "@/shared/sanity/lib/live";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/shared/sanity/queries/page";
import { HOMEPAGE_QUERY } from "@/shared/sanity/queries/homepage";
import { TRANSLATIONS_QUERY } from "@/shared/sanity/queries/translations";
import { MENU_PAGES_QUERY } from "@/shared/sanity/queries/menu";
import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/shared/sanity/queries/post";
import {
  PRIVACY_POLICY_QUERY,
  COOKIE_POLICY_QUERY,
} from "@/shared/sanity/queries/policies";
import {
  PAGE_QUERYResult,
  PAGES_SLUGS_QUERYResult,
  POST_QUERYResult,
  POSTS_QUERYResult,
  POSTS_SLUGS_QUERYResult,
} from "@/sanity.types";

export const fetchSanityPageBySlug = async ({
  slug,
  language = "it",
}: {
  slug: string;
  language?: string;
}): Promise<PAGE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug, language },
  });

  return data;
};

export const fetchSanityHomepage = async ({
  language = "it",
}: {
  language?: string;
}): Promise<PAGE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    params: { language },
  });

  return data;
};

export const fetchSanityTranslations = async ({
  contentId,
  documentType = "page",
}: {
  contentId: string;
  documentType?: "page" | "post";
}) => {
  const { data } = await sanityFetch({
    query: TRANSLATIONS_QUERY,
    params: { contentId, documentType },
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchSanityMenuPages = async ({
  contentIds,
  language = "it",
}: {
  contentIds: string[];
  language?: string;
}) => {
  const { data } = await sanityFetch({
    query: MENU_PAGES_QUERY,
    params: { contentIds, language },
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchSanityPagesStaticParams = async ({
  language = "it",
}: {
  language?: string;
} = {}): Promise<PAGES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PAGES_SLUGS_QUERY,
      params: { language },
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityPosts = async ({
  language = "it",
}: {
  language?: string;
} = {}): Promise<POSTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
    params: { language },
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
  language = "it",
}: {
  slug: string;
  language?: string;
}): Promise<POST_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug, language },
  });

  return data;
};

export const fetchSanityPostsStaticParams = async ({
  language = "it",
}: {
  language?: string;
} = {}): Promise<POSTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: POSTS_SLUGS_QUERY,
      params: { language },
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityPrivacyPolicy = async ({
  language = "it",
}: {
  language?: string;
} = {}) => {
  const { data } = await sanityFetch({
    query: PRIVACY_POLICY_QUERY,
    params: { language },
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchSanityCookiePolicy = async ({
  language = "it",
}: {
  language?: string;
} = {}) => {
  const { data } = await sanityFetch({
    query: COOKIE_POLICY_QUERY,
    params: { language },
    perspective: "published",
    stega: false,
  });

  return data;
};
