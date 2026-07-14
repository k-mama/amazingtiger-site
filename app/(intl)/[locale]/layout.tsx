import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fontVariables } from "../../fonts";
import "../../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateMetadata({ params }: LocaleLayoutProps): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);

  return {
    metadataBase: new URL("https://amazingtiger-site.pages.dev"),
    title: {
      default: dict.meta.title,
      template: `%s — Amazing Tiger Publishing`,
    },
    description: dict.meta.description,
    alternates: localeAlternates(params.locale),
    openGraph: {
      type: "website",
      siteName: "Amazing Tiger Publishing",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: "/images/homepage/editorial/emma-kwon-at-work.webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/homepage/editorial/emma-kwon-at-work.webp"],
    },
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <Header locale={locale} dict={dict} basePath={basePath} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} basePath={basePath} />
      </body>
    </html>
  );
}
