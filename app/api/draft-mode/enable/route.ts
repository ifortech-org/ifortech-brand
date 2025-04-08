import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/shared/sanity/lib/client";
import { token } from "@/shared/sanity/lib/token";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
