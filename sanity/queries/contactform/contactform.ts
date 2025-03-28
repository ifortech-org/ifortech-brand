// contactform component file

import { groq } from "next-sanity";

export const contactformQuery = groq`
_type == "contactform" => {
    _type,
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
