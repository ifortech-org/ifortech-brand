import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const metricsQuery = groq`
  _type == "metrics" => {
    _type,
    _key,
    first_metric_name,
    first_metric_value,
    first_metric_image,
    second_metric_name,
    second_metric_value,
    second_metric_image,
    third_metric_name,
    third_metric_value,
    third_metric_image
  }
`;
