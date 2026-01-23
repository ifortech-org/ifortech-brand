import FooterWithMenu from "@/shared/components/footer-with-menu";
import { DisableDraftMode } from "@/shared/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/shared/sanity/lib/live";
import { Suspense } from "react";
import PageTracker from "@/shared/components/PageTracker";
import { notFound } from "next/navigation";

const locales = ["it", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }
  return (
    <>
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <FooterWithMenu language={locale} />
      <Suspense fallback={<div>Loading...</div>}>
        <PageTracker />
      </Suspense>
    </>
  );
}
