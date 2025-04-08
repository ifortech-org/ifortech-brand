import Header from "@/shared/components/header";
import Footer from "@/shared/components/footer";
import Custom404 from "@/shared/components/404";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Custom404 />
      <Footer />
    </>
  );
}
