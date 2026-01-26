import SectionContainer from "@/shared/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Timeline1 from "@/shared/components/blocks/timeline/timeline-1";
import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import { ColorVariant } from "@/sanity.types";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type TimelineRow = Extract<
  PAGE_BLOCK,
  { _type: "timeline-row" }
>;

export default function TimelineRow({
  padding,
  colorVariant,
  timelines,
}: TimelineRow) {
  const color = stegaClean(colorVariant) as ColorVariant;

  return (
    <SectionContainer color={color} padding={padding}>
      {timelines && timelines?.length > 0 && (
        <div className="max-w-[48rem] mx-auto">
          {timelines?.map((timeline: typeof timelines[number], index: number) => (
            <Timeline1
              key={index}
              color={color}
              tagLine={timeline.tagLine}
              title={timeline.title}
              body={timeline.body}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
