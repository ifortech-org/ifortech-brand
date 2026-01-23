import { NextRequest, NextResponse } from "next/server";
import { fetchSanityTranslations } from "@/shared/sanity/lib/fetch";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentId = searchParams.get('contentId');
    const documentType = searchParams.get('documentType') as "page" | "post" || "page";

    if (!contentId) {
      return NextResponse.json([], { status: 200 });
    }

    const translations = await fetchSanityTranslations({
      contentId,
      documentType,
    });

    return NextResponse.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json([], { status: 500 });
  }
}