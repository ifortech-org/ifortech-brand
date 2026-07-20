import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import {
  getRevalidationTargets,
  SanityWebhookPayload,
} from "@/shared/sanity/lib/revalidate-utils";

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (isValidSignature === false) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing webhook payload", { status: 400 });
    }

    const targets = getRevalidationTargets(body);

    for (const tag of targets.tags) {
      revalidateTag(tag);
    }

    for (const entry of targets.patterns) {
      revalidatePath(entry.path, entry.type);
    }

    for (const path of targets.paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      paths: targets.paths,
      patterns: targets.patterns.map((entry) => entry.path),
      tags: targets.tags,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Sanity revalidation failed", error);
    const message =
      error instanceof Error ? error.message : "Unknown revalidation error";

    return new NextResponse(message, { status: 500 });
  }
}
