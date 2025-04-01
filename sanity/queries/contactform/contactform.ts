// contactform component file

import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const contactformQuery = groq`
_type == "contactform" => {
    _type,
    _key,
    title,
    description,
    button_text,
    side_image{
        asset->{
            _id,
            url,
            mimeType,
            metadata {
                lqip,
                dimensions {
                    width,
                    height
                }
            }
        },
        alt
    }
}
`;
