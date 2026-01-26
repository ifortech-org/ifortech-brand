
import Header from "@/shared/components/header";
import Footer from "@/shared/components/footer";
import Custom404 from "@/shared/components/404";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

// Supporta sia route globali che localizzate
export default function NotFoundPage(props: { params?: { locale?: string } }) {
  // Prova a recuperare il locale dai parametri, fallback a 'it'
  const locale = props?.params?.locale || 'it';
  return (
    <>
      <Header locale={locale} />
      <Custom404 />
      <Footer locale={locale} />
    </>
  );
}
