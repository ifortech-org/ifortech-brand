import { Newspaper } from "lucide-react";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  BookA,
  User,
  ListCollapse,
  Quote,
  Palette,
  Search,
  Shield,
  Cookie,
  Settings,
} from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pagine web",
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title("Articoli")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Articoli")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Pagina Blog")
        .icon(Newspaper)
        .child(
          S.documentTypeList("blogPage")
            .title("Pagina Blog")
            .defaultOrdering([{ field: "language", direction: "asc" }])
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categorie",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authori",
        icon: User,
        S,
        context,
      }),
      S.listItem()
        .title("Colori del sito")
        .icon(Palette)
        .child(
          S.editor()
            .id("siteColorsSingleton")
            .schemaType("siteColors")
            .documentId("siteColorsSingleton")
            .title("Colori del sito")
        ),
      S.listItem()
        .title("Logo del sito")
        .icon(Palette)
        .child(
          S.editor()
            .id("siteLogoSingleton")
            .schemaType("siteLogo")
            .documentId("siteLogoSingleton")
            .title("Logo del sito")
        ),
      S.listItem()
        .title("SEO globale")
        .icon(Search)
        .child(
          S.editor()
            .id("seoSingleton")
            .schemaType("seo")
            .documentId("seoSingleton")
            .title("SEO globale")
        ),
      S.listItem()
        .title("Impostazioni Footer")
        .icon(Settings)
        .child(
          S.documentTypeList("footerSettings")
            .title("Impostazioni Footer")
            .defaultOrdering([{ field: "language", direction: "asc" }])
        ),
      S.listItem()
        .title("Impostazioni Contact Form")
        .icon(Settings)
        .child(
          S.documentTypeList("contactformSettings")
            .title("Impostazioni Contact Form")
            .defaultOrdering([{ field: "language", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Privacy Policy")
        .icon(Shield)
        .child(
          S.documentTypeList("privacyPolicy")
            .title("Privacy Policy")
            .defaultOrdering([{ field: "language", direction: "asc" }])
        ),
      S.listItem()
        .title("Cookie Policy")
        .icon(Cookie)
        .child(
          S.documentTypeList("cookiePolicy")
            .title("Cookie Policy")
            .defaultOrdering([{ field: "language", direction: "asc" }])
        ),
      S.listItem()
        .title("Impostazioni Cookie")
        .icon(Settings)
        .child(
          S.documentTypeList("cookieSettings")
            .title("Impostazioni Cookie")
            .defaultOrdering([{ field: "language", direction: "asc" }])
        ),
      S.listItem()
        .title("Lingue disponibili")
        .icon(Settings)
        .child(
          S.documentTypeList("siteLanguage")
            .title("Lingue disponibili")
            .defaultOrdering([{ field: "code", direction: "asc" }])
        ),
    ]);

/*

      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),

*/
