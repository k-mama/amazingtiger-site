import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { noIndex } from "@/lib/i18n/seo";
import CartPage from "@/components/CartPage";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).cartPage.heading, robots: noIndex };
}

export default function CartRoutePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale);

  return <CartPage locale={locale} navBase={`/${locale}`} dict={dict.cartPage} />;
}
