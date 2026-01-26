// Tipi manuali per i risultati delle query Sanity custom
// Aggiorna questi tipi se cambi la struttura delle query o degli schemi

import { Slug, SanityImageHotspot, SanityImageCrop, SectionPadding, Link } from "@/sanity.types";

// Usa direttamente ColorVariant da '@/sanity.types'

export type POST_QUERYResult = {
  title: string | null;
  slug: Slug | null;
  contentId?: string | null;
  language?: string | null;
  image: {
    asset: {
      _id: string;
      url: string | null;
      mimeType: string | null;
      metadata: {
        lqip?: string | null;
        dimensions?: {
          width: number | null;
          height: number | null;
        } | null;
      } | null;
    } | null;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string | null;
    _type?: "image";
  } | null;
  body?: any[] | null;
  author: {
    name: string | null;
    image: {
      asset: {
        _id: string;
        url: string | null;
        mimeType: string | null;
        metadata: {
          lqip?: string | null;
          dimensions?: {
            width: number | null;
            height: number | null;
          } | null;
        } | null;
      } | null;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string | null;
      _type?: "image";
    } | null;
  } | null;
  categories: Array<{
    _id: string;
    title: string | null;
    slug: Slug | null;
  }> | null;
  _createdAt: string;
  _updatedAt: string;
  meta_title: string | null;
  meta_description: string | null;
  noindex: boolean | null;
  ogImage: {
    asset: {
      _id: string;
      url: string | null;
      metadata: {
        dimensions: {
          width: number | null;
          height: number | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type POSTS_QUERYResult = Array<{
  title: string | null;
  slug: Slug | null;
  contentId?: string | null;
  language?: string | null;
  excerpt: string | null;
  image: {
    asset: {
      _id: string;
      url: string | null;
      mimeType: string | null;
      metadata: {
        lqip?: string | null;
        dimensions?: {
          width: number | null;
          height: number | null;
        } | null;
      } | null;
    } | null;
    alt: string | null;
  } | null;
  categories: Array<{
    _id: string;
    title: string | null;
    slug: Slug | null;
  }> | null;
}>;

// --- Blocchi tipizzati per PAGE_QUERYResult ---
export type GridCardBlock = {
  _type: "grid-card";
  _key: string;
  title: string | null;
  excerpt: string | null;
  image: {
    asset: {
      _id: string;
      url: string | null;
      mimeType: string | null;
      metadata: {
        lqip?: string | null;
        dimensions?: {
          width: number | null;
          height: number | null;
        } | null;
      } | null;
    } | null;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string | null;
    _type?: "image";
  } | null;
  link: Link | null;
};

export type PricingCardBlock = {
  _type: "pricing-card";
  _key: string;
  title: string | null;
  tagLine: string | null;
  price: {
    value?: number;
    period?: string;
  } | null;
  list: Array<string> | null;
  excerpt: string | null;
  link: Link | null;
};

export type GridPostBlock = {
  _type: "grid-post";
  _key: string;
  post: {
    title: string | null;
    slug: Slug | null;
    excerpt: string | null;
    image: {
      asset: {
        _id: string;
        url: string | null;
        mimeType: string | null;
        metadata: {
          lqip?: string | null;
          dimensions?: {
            width: number | null;
            height: number | null;
          } | null;
        } | null;
      } | null;
      alt: string | null;
    } | null;
    categories: Array<{
      _id: string;
      title: string | null;
    }> | null;
  } | null;
};

export type GridRowBlock = {
  _type: "grid-row";
  _key: string;
  padding: SectionPadding | null;
  title: string | null;
  colorVariant: import("@/sanity.types").ColorVariant | null;
  gridColumns: "grid-cols-2" | "grid-cols-3" | "grid-cols-4" | null;
  columns: Array<GridCardBlock | GridPostBlock | PricingCardBlock> | null;
};

// --- Blocchi principali (semplificati, aggiungi altri se servono) ---
export type PAGE_BLOCK =
  | { _type: "all-posts"; _key: string; padding?: SectionPadding | null; colorVariant: import("@/sanity.types").ColorVariant | null; }
  | {
      _type: "carousel-1";
      _key: string;
      padding?: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      size: "one" | "two" | "three" | null;
      indicators: "none" | "dots" | "count" | null;
      images?: Array<{
        asset: {
          _id: string;
          url: string | null;
          mimeType: string | null;
          metadata: {
            lqip?: string | null;
            dimensions?: {
              width: number | null;
              height: number | null;
            } | null;
          } | null;
        } | null;
        alt: string | null;
      }> | null | undefined;
    }
  | {
      _type: "carousel-2";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      testimonial: Array<{
        _id: string;
        name: string | null;
        title: string | null;
        image: {
          asset: {
            _id: string;
            url: string | null;
            mimeType: string | null;
            metadata: {
              lqip?: string | null;
              dimensions?: {
                width: number | null;
                height: number | null;
              } | null;
            } | null;
          } | null;
          alt: string | null;
        } | null;
        body: any[] | null;
        rating: number | null;
      }> | null;
    }
  | ContactFormBlock
  | {
      _type: "cta-1";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      sectionWidth: "default" | "narrow" | null;
      stackAlign: "left" | "center" | null;
      tagLine: string | null;
      title: string | null;
      body: any[] | null;
      links: Array<Link> | null;
    }
  | {
      _type: "faqs";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      faqs: Array<any> | null;
    }
  | {
      _type: "form-newsletter";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      stackAlign: "left" | "center" | null;
      consentText: string | null;
      buttonText: string | null;
      successMessage: string | null;
    }
  | GridRowBlock
  | {
      _type: "hero-1";
      _key: string;
      tagLine: string | null;
      title: string | null;
      body: any[] | null;
      image: any | null;
      links: Array<Link> | null;
    }
  | {
      _type: "hero-2";
      _key: string;
      tagLine: string | null;
      title: string | null;
      backgroundImage: any | null;
      body: any[] | null;
      links: Array<Link> | null;
    }
  | {
      _type: "hero-3";
      _key: string;
      tagLine: string | null;
      title: string | null;
      sideImage: any | null;
      body: any[] | null;
      links: Array<Link> | null;
    }
  | {
      _type: "logo-cloud-1";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      title: string | null;
      images: Array<any> | null;
    }
  | {
      _type: "section-header";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      sectionWidth: "default" | "narrow" | null;
      stackAlign: "left" | "center" | null;
      tagLine: string | null;
      title: string | null;
      description: any[] | null;
      link: Link | null;
    }
  | {
      _type: "split-row";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      noGap: boolean | null;
      splitColumns: Array<any> | null;
    }
  | {
      _type: "timeline-row";
      _key: string;
      padding: SectionPadding | null;
      colorVariant: import("@/sanity.types").ColorVariant | null;
      timelines: Array<any> | null;
    };

export type PAGE_QUERYResult = {
  title: string | null;
  slug: Slug | null;
  contentId?: string | null;
  language?: string | null;
  sections?: any[] | null;
  blocks?: PAGE_BLOCK[] | null;
  meta_title: string | null;
  meta_description: string | null;
  noindex: boolean | null;
  ogImage: {
    asset: {
      _id: string;
      url: string | null;
      metadata: {
        dimensions: {
          width: number | null;
          height: number | null;
        } | null;
      } | null;
    } | null;
  } | null;
  _createdAt: string;
  _updatedAt: string;
};


export type PAGES_SLUGS_QUERYResult = Array<{
  slug: Slug | null;
}>;

export type POSTS_SLUGS_QUERYResult = Array<{
// Puoi aggiungere qui altri tipi per altre query custom
  slug: Slug | null;
}>;

export type ContactFormBlock = {
  _type: "contactform";
  _key: string;
  padding?: SectionPadding | null;
  title?: string;
  description?: any;
  button_text?: string;
  side_image?: {
    asset?: {
      _id: string;
      url?: string | null;
      mimeType?: string | null;
      metadata?: {
        lqip?: string | null;
        dimensions?: {
          width?: number | null;
          height?: number | null;
        } | null;
      } | null;
    } | null;
    alt?: string | null;
    _type?: "image";
  } | null;
};

// Puoi aggiungere qui altri tipi per altre query custom
