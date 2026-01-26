import SectionContainer from "@/shared/components/ui/section-container";
import { stegaClean } from "next-sanity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import { ColorVariant } from "@/sanity.types";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type FAQProps = Extract<
  PAGE_BLOCK,
  { _type: "faqs" }
>;

export default function FAQs({ padding, colorVariant, faqs }: FAQProps) {
  const color = stegaClean(colorVariant);
  return (
    <SectionContainer color={color} padding={padding}>
      {faqs && faqs?.length > 0 && (
        <Accordion className="space-y-4" type="multiple">
          {faqs.map((faq: typeof faqs[number]) => (
            <AccordionItem key={faq.title} value={`item-${faq._id}`}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>
                <PortableTextRenderer value={faq.body || []} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </SectionContainer>
  );
}
