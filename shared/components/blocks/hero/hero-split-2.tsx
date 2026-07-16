import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { urlFor } from "@/shared/sanity/lib/image";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type HeroSplit2Props = Extract<PAGE_BLOCK, { _type: "hero-split-2" }>;
type SideContent = NonNullable<HeroSplit2Props["left"]>;

function hasImage(image: any) {
  return Boolean(image?.asset?._ref || image?.asset?._id);
}

function hasButton(button?: SideContent["button"] | null) {
  return Boolean(button?.text && button?.url);
}

function SideBlock({
  side,
  image,
  align,
}: {
  side: HeroSplit2Props["left"];
  image: any;
  align: "left" | "right";
}) {
  if (
    !side?.title &&
    !side?.subtitle &&
    !hasImage(side?.media) &&
    !hasButton(side?.button)
  )
    return null;

  const content = side as SideContent;
  const isRight = align === "right";

  return (
    <article className="group relative isolate flex min-h-[410px] overflow-hidden sm:min-h-[500px] lg:min-h-[560px]">
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: hasImage(image)
            ? `url(${urlFor(image).width(1800).url()})`
            : undefined,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-[#07101c]/75  to-[#07101c]/5" />
      <div
        className={cn(
          "relative z-10 flex w-full flex-col justify-end p-7 text-white sm:p-10 lg:p-12",
          isRight && "items-end text-right",
        )}>
        <div className="max-w-md">
          {hasImage(content.media) ? (
            <Image
              src={urlFor(content.media)
                .width(160)
                .height(160)
                .fit("max")
                .url()}
              alt={content.media.alt || ""}
              width={52}
              height={52}
              className={cn(
                "mb-6 h-13 w-auto object-contain",
                isRight && "ml-auto",
              )}
            />
          ) : null}
          {content.title ? (
            <h2 className="text-3xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
          ) : null}
          {content.subtitle ? (
            <p
              className={cn(
                "mt-5 max-w-[34ch] text-base leading-7 text-white/80",
                isRight && "ml-auto",
              )}>
              {content.subtitle}
            </p>
          ) : null}
          {hasButton(content.button) ? (
            <Link
              href={content.button!.url!}
              className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition duration-200 hover:-translate-y-1 hover:bg-primary/90">
              {content.button!.text}
              <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function HeroSplit2({
  tagLine,
  title,
  subtitle,
  image_left,
  image_right,
  left,
  right,
}: HeroSplit2Props) {
  return (
    <section className="overflow-hidden bg-[#07101c]">
      <div className="relative">
        <div className="grid md:grid-cols-2">
          <SideBlock side={left} image={image_left} align="left" />
          <SideBlock side={right} image={image_right} align="right" />
        </div>
        {tagLine || title || subtitle ? (
          <div className="pointer-events-none absolute inset-x-0 top-12 z-20 px-5 text-center text-white md:top-1/2 md:-translate-y-1/2">
            <div className="mx-auto w-fit max-w-full border-y border-white/35 px-5 py-4 drop-shadow-[0_5px_22px_rgba(0,0,0,0.7)] sm:px-8 sm:py-5">
              {tagLine ? (
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                  {tagLine}
                </p>
              ) : null}
              {title ? (
                <h1 className="text-4xl font-semibold uppercase leading-none tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-sm">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="px-6 py-14 text-center text-white sm:py-16">
        <h2 className="text-2xl font-semibold uppercase tracking-[-0.025em] sm:text-3xl">
          Approfondisci sul nostro blog
        </h2>
      </div>
      <div className="grid md:grid-cols-2">
        <Link
          href="/blog"
          className="group flex min-h-[220px] bg-[#07101c] p-7 text-white sm:p-10 md:justify-end">
          <div className="w-full max-w-lg self-center">
            <h3 className="text-xl font-semibold uppercase sm:text-2xl">
              Articoli per le aziende
            </h3>
            <p className="mt-3 text-base leading-6 text-white/70 sm:text-lg">
              News, guide e approfondimenti per il mondo del business.
            </p>
            <span className="mt-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.04em] text-primary transition-colors group-hover:text-white">
              Vai al blog aziende <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
        <Link
          href="/blog"
          className="group flex min-h-[220px] bg-[#07101c] p-7 text-white sm:p-10">
          <div className="w-full max-w-lg self-center">
            <h3 className="text-xl font-semibold uppercase sm:text-2xl">
              Articoli per enti
            </h3>
            <p className="mt-3 text-base leading-6 text-white/70 sm:text-lg">
              Normative, casi studio e novità per la Pubblica Amministrazione.
            </p>
            <span className="mt-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.04em] text-primary transition-colors group-hover:text-white">
              Vai al blog enti <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
