import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { urlFor } from "@/shared/sanity/lib/image";
import { ChevronRight } from "lucide-react";
import { POSTS_QUERYResult } from "@/sanity.types";

type PostCard = NonNullable<POSTS_QUERYResult[number]>;

interface PostCardProps extends Omit<PostCard, "slug"> {
  className?: string;
}

export default function PostCard({
  className,
  title,
  excerpt,
  image,
  categories,
}: PostCardProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-between overflow-hidden transition ease-in-out group hover:border-primary bg-card",
        className
      )}>
      <div className="flex flex-col ">
        {image && image.asset?._id && (
          <div className="relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem]  overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        )}
        {categories && (
          <div className="flex justify-between items-center bg-secondary text-secondary-foreground p-2">
            <h3 className="font-bold text-[1.2rem] leading-[1.2]">
              {categories[0]?.title}
            </h3>
          </div>
        )}
        {title && (
          <div className="flex justify-between items-center bg-primary p-2">
            <h3 className="font-bold text-[1.5rem] leading-[1.2]">{title}</h3>
          </div>
        )}
        {excerpt && (
          <div className="p-2">
            <p>{excerpt}</p>
          </div>
        )}
      </div>
      <div className="flex flex-row-reverse px-4 pb-8">
        <div className="mt-3 xl:mt-6 w-10 h-10 border border-secondary  rounded-full flex items-center justify-center group-hover:border-primary">
          <ChevronRight
            className="text-secondary group-hover:text-primary"
            size={24}
          />
        </div>
      </div>
    </div>
  );
}
