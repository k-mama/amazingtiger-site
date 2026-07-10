import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocaleHtmlLang from "@/components/LocaleHtmlLang";

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
  const canonical = params.locale === "en" ? "/" : `/${params.locale}`;

  const languages: Record<string, string> = { "x-default": "/" };
  for (const l of locales) {
    languages[l] = l === "en" ? "/en" : `/${l}`;
  }

  return {
    title: {
      default: dict.meta.title,
      template: `%s — Amazing Tiger Publishing`,
    },
    description: dict.meta.description,
    alternates: {
      canonical,
      languages,
    },
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <Header locale={locale} dict={dict} basePath={basePath} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} basePath={basePath} />
    </>
  );
}
