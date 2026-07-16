import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { resolveThemeColorValue } from "@/shared/lib/theme-colors";
import { urlFor } from "@/shared/sanity/lib/image";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type HeroSplit2Props = Extract<PAGE_BLOCK, { _type: "hero-split-2" }>;
type SideContent = NonNullable<HeroSplit2Props["left"]>;
type SideButton = NonNullable<SideContent["button"]>;
type CenterPanelContent = NonNullable<HeroSplit2Props["centerPanel"]>;
type CenterItemContent = NonNullable<CenterPanelContent["left"]>;

function hasImage(image: any) {
  return Boolean(image?.asset?._ref || image?.asset?._id);
}

function hasButton(button?: SideButton | null) {
  return Boolean(button?.text && button?.url);
}

function hasCenterItem(item?: CenterItemContent | null) {
  return Boolean(item?.title || item?.description || (item?.linkText && item?.linkUrl));
}

function SideBlock({
  side,
}: {
  side: HeroSplit2Props["left"] | HeroSplit2Props["right"];
}) {
  if (!side?.title && !side?.subtitle && !hasImage(side?.media) && !hasButton(side?.button)) {
    return null;
  }

  const content = side as SideContent;

  return (
    <div
      className={cn(
        "relative z-10 flex h-full min-h-[420px] items-center justify-center p-6 sm:p-8 lg:p-8"
      )}>
      <div
        className={cn(
          "flex max-w-md flex-col gap-4 text-white",
          "md:h-[340px] md:w-[380px] lg:h-[380px] lg:w-[440px]",
          content.showBackground !== false && "rounded-[28px] border border-white/15 bg-black/35 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-[2px]",
          content.centerContent ? "items-center text-center" : "items-start text-left"
        )}>
        {hasImage(content.media) ? (
          <div className={cn("flex", content.centerContent && "justify-center")}>
            <Image
              src={urlFor(content.media).width(160).height(160).fit("max").url()}
              alt={content.media.alt || ""}
              width={72}
              height={72}
              className="h-[72px] w-auto object-contain rounded-full"
            />
          </div>
        ) : null}

        {content.title ? (
          <h2 className="text-3xl font-semibold uppercase tracking-[0.03em] sm:text-4xl">{content.title}</h2>
        ) : null}

        {content.subtitle ? (
          <p className="max-w-[28ch] text-base leading-7 sm:text-lg">{content.subtitle}</p>
        ) : null}

        {hasButton(content.button) ? (
          <div className={cn("pt-2", content.centerContent && "flex justify-center")}>
            <Button asChild size="lg" style={content.button?.color || content.button?.textColor ? {
              backgroundColor: content.button?.color ? resolveThemeColorValue(content.button.color) : undefined,
              color: content.button?.textColor ? resolveThemeColorValue(content.button.textColor, "primaryForeground") : undefined,
            } : undefined}>
              <Link
              href={content.button?.url || "#"}
              className="min-h-11 px-6 uppercase tracking-[0.08em] hover:-translate-y-0.5">
              {content.button?.text}
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CenterItem({
  item,
  className,
}: {
  item?: CenterItemContent | null;
  className?: string;
}) {
  if (!hasCenterItem(item)) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {item?.title ? <h3 className="text-lg font-semibold uppercase tracking-[0.04em] text-slate-900">{item.title}</h3> : null}
      {item?.description ? <p className="text-sm leading-6 text-slate-700 sm:text-base">{item.description}</p> : null}
      {item?.linkText && item?.linkUrl ? (
        <Link
          href={item.linkUrl}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em]"
          style={{ color: resolveThemeColorValue(item.linkColor) }}>
          {item.linkText}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
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
  centerPanel,
}: HeroSplit2Props) {
  const panel = centerPanel ?? undefined;
  const hasPanelLeft = hasCenterItem(panel?.left);
  const hasPanelRight = hasCenterItem(panel?.right);
  const showCenterPanel = Boolean(
    panel?.title || hasPanelLeft || hasPanelRight
  );

  return (
    <section className="relative overflow-hidden text-white">
      <div className="relative">
        <div className="absolute inset-0 hidden md:grid md:grid-cols-2" aria-hidden="true">
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: hasImage(image_left) ? `url(${urlFor(image_left).width(1600).url()})` : undefined }}
          />
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: hasImage(image_right) ? `url(${urlFor(image_right).width(1600).url()})` : undefined }}
          />
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>
        {(tagLine || title || subtitle) && (
          <div className="relative z-30 px-6 py-10 text-center md:px-6 md:pt-14 md:pb-8">
            {tagLine ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] sm:text-sm">{tagLine}</p> : null}
            {title ? <h1 className="text-4xl font-semibold uppercase tracking-[0.05em] drop-shadow-lg sm:text-5xl lg:text-7xl">{title}</h1> : null}
            {subtitle ? <p className="mx-auto mt-4 max-w-3xl text-sm uppercase tracking-[0.2em] sm:text-base">{subtitle}</p> : null}
          </div>
        )}

        <div className="relative z-10 grid md:grid-cols-2">
          <div
            className="relative flex min-h-[420px] bg-cover bg-center md:min-h-[350px] md:!bg-none justify-center"
            style={{
              backgroundImage: hasImage(image_left) ? `url(${urlFor(image_left).width(1600).url()})` : undefined,
            }}>
            <div className="absolute inset-0 bg-slate-950/40 md:hidden" />
            <SideBlock side={left} />
          </div>

          <div
            className="relative flex min-h-[420px] bg-cover bg-center md:min-h-[350px] md:!bg-none justify-center"
            style={{
              backgroundImage: hasImage(image_right) ? `url(${urlFor(image_right).width(1600).url()})` : undefined,
            }}>
            <div className="absolute inset-0 bg-black/45 md:hidden" />
            <SideBlock side={right} />
          </div>
          {showCenterPanel ? (
          <div className="relative z-20 mt-8 w-full md:col-span-2 md:pb-12">
            <div className="relative mx-auto w-full max-w-5xl overflow-hidden border-y border-white/40 shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:rounded-[30px] md:border">
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: panel?.backgroundColor || "#ffffff",
                  opacity: (panel?.backgroundOpacity ?? 92) / 100,
                }}
              />

              <div className="relative grid gap-6 px-6 py-7 sm:px-8 lg:px-10 lg:py-8">
                {panel?.title ? (
                  <div className="text-center">
                    <h2 className="text-xl font-semibold uppercase tracking-[0.04em] text-slate-900 sm:text-2xl">
                        {panel.title}
                    </h2>
                  </div>
                ) : null}

                <div className={cn(
                  "grid items-center gap-5 sm:gap-8",
                  hasPanelLeft && hasPanelRight ? "grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]" : "grid-cols-1"
                )}>
                  <CenterItem item={panel?.left} className="justify-self-center" />
                  {hasPanelLeft && hasPanelRight ? <div className="h-full bg-slate-300" aria-hidden="true" /> : null}
                  <CenterItem item={panel?.right} className="justify-self-center" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}
