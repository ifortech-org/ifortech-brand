import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import { urlFor } from "@/shared/sanity/lib/image";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type HeroSplitProps = Extract<PAGE_BLOCK, { _type: "hero-split" }>;

export default function HeroSplit({
  tagLine,
  title,
  title_left,
  title_right,
  body,
  image_left,
  image_right,
}: HeroSplitProps) {
  return (
    <section className="relative h-[80vh] min-h-[640px] overflow-hidden bg-black text-white">
      <div className="grid h-full md:grid-cols-2">
        <div
          className="min-h-[320px] bg-cover bg-center"
          style={{
            backgroundImage: image_left ? `url(${urlFor(image_left).url()})` : undefined,
          }}
        />
        <div
          className="min-h-[320px] bg-cover bg-center"
          style={{
            backgroundImage: image_right ? `url(${urlFor(image_right).url()})` : undefined,
          }}
        />
      </div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="flex w-full max-w-none flex-col gap-6 bg-black/55 p-8 text-center">
          {tagLine ? <p className="text-sm font-semibold uppercase tracking-[0.24em]">{tagLine}</p> : null}

          {title ? <h2 className="text-4xl font-semibold uppercase md:text-5xl">{title}</h2> : null}

          <div className="grid gap-4 md:grid-cols-2">
            <p className="text-2xl font-bold uppercase md:text-3xl">{title_left}</p>
            <p className="text-2xl font-bold uppercase md:text-3xl">{title_right}</p>
          </div>

          {body ? (
            <div className="mx-auto max-w-4xl text-lg font-semibold uppercase md:text-2xl">
              <PortableTextRenderer value={body} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
