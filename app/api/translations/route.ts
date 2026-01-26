
import { NextRequest, NextResponse } from "next/server";
import { fetchSanityTranslations } from "@/shared/sanity/lib/fetch";
import { client } from "@/shared/sanity/lib/client";

type DocumentType = "page" | "post" | "blogPage" | "privacyPolicy" | "cookiePolicy" | "cookieSettings" | "policy";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentId = searchParams.get('contentId');
    const documentType = (searchParams.get('documentType') as DocumentType) || "page";

    if (!contentId && ["blogPage", "privacyPolicy", "cookiePolicy", "cookieSettings"].includes(documentType as string)) {
      // Restituisci tutte le lingue disponibili per il modello specifico
      let type = documentType;
      let slug = "";
      if (type === "blogPage") slug = "blog";
      if (type === "privacyPolicy") slug = "privacy-policy";
      if (type === "cookiePolicy") slug = "cookie-policy";
      if (type === "cookieSettings") slug = "cookie-preferences";
      const langs = await client.fetch(`*[_type == "${type}"]{ language-> { code, label } }`);
      // Rimuovi duplicati e normalizza come oggetto Translation
      const uniqueLangs = langs
        .map((l: any) => l.language)
        .filter((v: any, i: number, a: any[]) => v && a.findIndex(t => t.code === v.code) === i)
        .map((lang: any) => ({ language: lang, slug: { current: slug }, title: lang.label }));
      return NextResponse.json(uniqueLangs, { status: 200 });
    }

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