import { stegaClean } from "next-sanity";
import SplitCardsItem from "@/shared/components/blocks/split/split-cards-item";
import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import { ColorVariant } from "@/sanity.types";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type Block = PAGE_BLOCK;
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-cards-list" }
>;

interface SplitCardsListProps extends SplitCardsList {
  color?: ColorVariant;
}

export default function SplitCardsList({ color, list }: SplitCardsListProps) {
  const colorParent = stegaClean(color);

  return (
    <div className="flex flex-col justify-center gap-12">
      {list &&
        list.length > 0 &&
        list.map((item: NonNullable<SplitCardsList["list"]>[number], index: number) => (
          <SplitCardsItem
            key={index}
            color={colorParent}
            tagLine={item.tagLine}
            title={item.title}
            body={item.body}
          />
        ))
      }
    </div>
  );
}
