import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import Hero1 from "@/shared/components/blocks/hero/hero-1";
import Hero2 from "@/shared/components/blocks/hero/hero-2";
import Hero3 from "@/shared/components/blocks/hero/hero-3";
import SectionHeader from "@/shared/components/blocks/section-header";
import SplitRow from "@/shared/components/blocks/split/split-row";
import GridRow from "@/shared/components/blocks/grid/grid-row";
import Carousel1 from "@/shared/components/blocks/carousel/carousel-1";
import Carousel2 from "@/shared/components/blocks/carousel/carousel-2";
import TimelineRow from "@/shared/components/blocks/timeline/timeline-row";
import Cta1 from "@/shared/components/blocks/cta/cta-1";
import LogoCloud1 from "@/shared/components/blocks/logo-cloud/logo-cloud-1";
import FAQs from "@/shared/components/blocks/faqs";
import FormNewsletter from "@/shared/components/blocks/forms/newsletter";
import AllPosts from "@/shared/components/blocks/all-posts";
import ContactForm from "./contactform";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";
import { fetchContactFormSettings } from "@/shared/sanity/lib/fetchContactFormSettings";

type Block = PAGE_BLOCK;

const componentMap: {
  [K in Exclude<Block["_type"], "contactform">]: React.ComponentType<Extract<Block, { _type: K }>>;
} = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "hero-3": Hero3,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "all-posts": AllPosts,
};

export default async function Blocks({ blocks, language = "it" }: { blocks: Block[]; language?: string }) {
  let contactFormSettings: any = null;
  if (blocks?.some((block) => block._type === "contactform")) {
    contactFormSettings = await fetchContactFormSettings(language || "it");
  }
  return (
    <>
      {blocks?.map((block) => {
        if (block._type === "contactform") {
          return <ContactForm {...block} settings={contactFormSettings} key={block._key} />;
        }
        const Component = componentMap[block._type as Exclude<Block["_type"], "contactform">];
        if (!Component) {
          // Fallback per nuovi tipi blocco
          console.warn(
            `No component implemented for block type: ${block._type}`
          );
          return <div data-type={block._type} key={block._key} />;
        }
        // Passa la lingua a componenti che ne hanno bisogno
        const props = block._type === "all-posts"
          ? { ...(block as any), language }
          : (block as any);
        return <Component {...props} key={block._key} />;
      })}
    </>
  );
}
