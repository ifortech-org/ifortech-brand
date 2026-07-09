import { cn } from "@/shared/lib/utils";
import SectionContainer from "@/shared/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import GridCard from "./grid-card";
import PricingCard from "./pricing-card";
import GridPost from "./grid-post";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>[number]>;

const componentMap: {
  [K in GridColumn["_type"]]: React.ComponentType<
    Extract<GridColumn, { _type: K }>
  >;
} = {
  "grid-card": GridCard,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
};

const gridColumnsClassName: Record<string, string> = {
  "grid-cols-2": "md:grid-cols-2",
  "grid-cols-3": "md:grid-cols-2 lg:grid-cols-3",
  "grid-cols-4": "md:grid-cols-2 lg:grid-cols-4",
};

const flexColumnsWrapperClassName: Record<string, string> = {
  "grid-cols-2": "w-full md:w-[calc((100%-1.5rem)/2)]",
  "grid-cols-3": "w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]",
  "grid-cols-4":
    "w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]",
};

export default function GridRow({
  padding,
  colorVariant,
  gridColumns,
  useFlexWrap,
  columns,
  title,
}: GridRow) {
  const color = stegaClean(colorVariant);
  const cleanedGridColumns = stegaClean(gridColumns) ?? "";
  const columnsClassName =
    gridColumnsClassName[cleanedGridColumns] ?? "md:grid-cols-2";
  const flexWrapperClassName =
    flexColumnsWrapperClassName[cleanedGridColumns] ??
    "w-full md:w-[calc((100%-1.5rem)/2)]";
  const isFourColumns = cleanedGridColumns === "grid-cols-4";

  return (
    <SectionContainer
      color={color}
      padding={padding}
      contentClassName={isFourColumns ? "lg:max-w-[72rem] xl:max-w-[84rem]" : undefined}>
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      {columns && columns?.length > 0 && (
        <div
          className={cn(
            useFlexWrap
              ? "flex flex-wrap justify-center gap-6"
              : "grid grid-cols-1 gap-6",
            useFlexWrap ? undefined : columnsClassName,
            isFourColumns ? "lg:gap-4 xl:gap-6" : undefined
          )}>
          {columns.map((column) => {
            const Component = componentMap[column._type];
            if (!Component) {
              // Fallback for development/debugging of new component types
              console.warn(
                `No component implemented for grid column type: ${column._type}`
              );
              return <div data-type={column._type} key={column._key} />;
            }
            return (
              <div
                className={cn(useFlexWrap ? flexWrapperClassName : undefined)}
                key={column._key}>
                <Component
                  {...(column as any)}
                  color={color}
                  compactTitle={isFourColumns}
                />
              </div>
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
}
