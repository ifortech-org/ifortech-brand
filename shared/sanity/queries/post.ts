import { groq } from "next-sanity";

/**
 * Variable: POST_QUERY
 * Query: *[_type == "post" && slug.current == $slug && language->code == $language][0]{ ... }
 */
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug && language->code == $language][0]{
  title,
  slug,
  contentId,
  language,
  image{
    ...,
    asset->{
    _id,
    url,
    mimeType,
    metadata {
      lqip,
      dimensions {
      width,
      height
      }
    }
    },
    alt
  },
  body[]{
    ...,
    _type == "image" => {
    ...,
    asset->{
      _id,
      url,
      mimeType,
      metadata {
      lqip,
      dimensions {
        width,
        height
      }
      }
    }
    }
  },
  author->{
    name,
    image {
    ...,
    asset->{
      _id,
      url,
      mimeType,
      metadata {
      lqip,
      dimensions {
        width,
        height
      }
      }
    },
    alt
    }
  },
  categories[]->{
    _id,
    title,
    slug
  },
  _createdAt,
  _updatedAt,
  meta_title,
  meta_description,
  noindex,
  ogImage {
    asset->{
    _id,
    url,
    metadata {
      dimensions {
      width,
      height
      }
    }
    },
  }
}`;

/**
 * Variable: POSTS_QUERY
 * Query: *[_type == "post" && defined(slug) && language->code == $language] | order(_createdAt desc){ ... }
 */
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug) && language->code == $language] | order(_createdAt desc){
  title,
  slug,
  contentId,
  language,
  excerpt,
  image{
    asset->{
    _id,
    url,
    mimeType,
    metadata {
      lqip,
      dimensions {
      width,
      height
      }
    }
    },
    alt
  },
  categories[]->{
    _id,
    title,
    slug
  },
}`;

/**
 * Variable: POSTS_SLUGS_QUERY
 * Query: *[_type == "post" && defined(slug) && language->code == $language]{slug}
 */
export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug) && language->code == $language]{slug}`;
