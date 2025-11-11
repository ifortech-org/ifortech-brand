import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/shared/sanity/lib/image";

type Hero3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-3" }
>;

export default function Hero3({
  tagLine,
  title,
  body,
  links,
  sideImage,
}: Hero3Props) {
  const imageUrl =
    sideImage && sideImage.asset ? urlFor(sideImage).url() : undefined;

  return (
    <section className="relative isolate overflow-hidden dark:bg-background">
      <div
        className="absolute inset-x-0 top-0 h-2 bg-primary z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2 bg-primary z-10"
        aria-hidden="true"
      />
      <div className="container py-12 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="text-center lg:text-left">
            {tagLine && (
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90 animate-fade-up [animation-delay:100ms] opacity-0">
                {tagLine}
              </p>
            )}
            {title && (
              <h2 className="mt-5 font-bold leading-tight text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
                {title}
              </h2>
            )}
            {body && (
              <div className="text-base md:text-lg mt-6 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 animate-fade-up [animation-delay:300ms] opacity-0">
                <PortableTextRenderer value={body} />
              </div>
            )}
            {links && links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up [animation-delay:400ms] opacity-0">
                {links.map((link) => (
                  <Button
                    key={link._key ?? link.title}
                    variant={stegaClean(link?.buttonVariant)}
                    asChild>
                    <Link
                      href={link.href as string}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener" : undefined}>
                      {link.title}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
          {imageUrl && (
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[32px]"
                aria-hidden="true"
              />
              <Image
                className="w-full rounded-[32px] animate-fade-up [animation-delay:450ms] opacity-0"
                src={imageUrl}
                alt={sideImage?.alt || ""}
                width={sideImage?.asset?.metadata?.dimensions?.width || 960}
                height={sideImage?.asset?.metadata?.dimensions?.height || 720}
                placeholder={
                  sideImage?.asset?.metadata?.lqip ? "blur" : undefined
                }
                blurDataURL={sideImage?.asset?.metadata?.lqip || ""}
                quality={95}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
