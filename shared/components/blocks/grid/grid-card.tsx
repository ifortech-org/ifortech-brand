import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/shared/sanity/lib/image";
import { PAGE_QUERYResult } from "@/shared/sanity/queries/query-types";
import { ColorVariant } from "@/sanity.types";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type Block = PAGE_BLOCK;
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridCard = Extract<GridColumn, { _type: "grid-card" }>;

interface GridCardProps extends Omit<GridCard, "_type" | "_key"> {
  color?: ColorVariant;
  compactTitle?: boolean;
}

export default function GridCard({
  color,
  title,
  excerpt,
  image,
  link,
  compactTitle = false,
}: GridCardProps) {
  return (
    <Link
      key={title}
      className="flex min-w-0 w-full rounded-lg ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group text-center"
      href={link?.href ?? "#"}
      target={link?.target ? "_blank" : undefined}>
      <div
        className={cn(
          "flex min-w-0 w-full flex-col justify-between overflow-hidden transition ease-in-out rounded-lg p-3 sm:p-4",
          color === "primary"
            ? "group-hover:border-primary-foreground/50"
            : "group-hover:border-primary"
        )}>
        <div className="w-full">
          {image && image.asset?._id && (
            <div className="w-full">
              <div className="relative mb-4 w-full max-w-full overflow-hidden rounded-md border-4 border-primary aspect-video">
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt || ""}
                  placeholder={
                    image?.asset?.metadata?.lqip ? "blur" : undefined
                  }
                  blurDataURL={image?.asset?.metadata?.lqip || ""}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover rounded-full"
                  quality={100}
                />
              </div>
            </div>
          )}
          <div
            className={cn(
              "w-full",
              color === "primary" ? "text-background" : undefined
            )}>
            {title && (
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={cn(
                    "w-full text-center font-bold leading-tight",
                    compactTitle
                      ? "text-lg sm:text-xl md:text-lg lg:text-base xl:text-lg 2xl:text-xl"
                      : "text-xl sm:text-2xl md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl"
                  )}>
                  {title}
                </h3>
              </div>
            )}
            {excerpt && <p>{excerpt}</p>}
          </div>
        </div>
        <Button
          className="mt-6 self-center"
          size="lg"
          variant={stegaClean(link?.buttonVariant)}
          asChild>
          <div>{link?.title ?? "Learn More"}</div>
        </Button>
      </div>
    </Link>
  );
}
