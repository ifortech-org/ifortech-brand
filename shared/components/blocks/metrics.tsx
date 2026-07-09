import { urlFor } from "@/shared/sanity/lib/image";
import { PAGE_BLOCK } from "@/shared/sanity/queries/query-types";

type MetricsProps = Extract<PAGE_BLOCK, { _type: "metrics" }>;

function MetricItem({
  image,
  name,
  value,
}: {
  image: any;
  name: string | null;
  value: number | null;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {image ? (
        <img
          src={urlFor(image).url()}
          alt={image?.alt || name || ""}
          className="h-20 w-20 object-contain"
        />
      ) : null}
      <p className="text-lg font-thin uppercase">{value}</p>
      <p className="text-lg font-bold uppercase">{name}</p>
    </div>
  );
}

export default function Metrics(props: MetricsProps) {
  return (
    <section className="container py-8 text-foreground dark:text-white">
      <div className="grid gap-6 lg:grid-cols-3">
        <MetricItem
          image={props.first_metric_image}
          name={props.first_metric_name}
          value={props.first_metric_value}
        />
        <MetricItem
          image={props.second_metric_image}
          name={props.second_metric_name}
          value={props.second_metric_value}
        />
        <MetricItem
          image={props.third_metric_image}
          name={props.third_metric_name}
          value={props.third_metric_value}
        />
      </div>
    </section>
  );
}
