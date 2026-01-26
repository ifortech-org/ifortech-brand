import SplitInfoItem from "@/shared/components/blocks/split/split-info-item";
import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type Block = PAGE_BLOCK;
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitInfoList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-info-list" }
>;

export default function SplitInfoList({ list }: SplitInfoList) {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
        {list &&
          list.length > 0 &&
          list.map((item: typeof list[number], index: number) => (
            <SplitInfoItem key={index} {...item} />
          ))}
      </div>
    </div>
  );
}
