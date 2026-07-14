import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import { getAllProducts, getProductBySlug, getProductCopy } from "@/lib/shop/products";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const copy = getProductCopy(product, params.locale as Locale);
  return {
    title: copy.title,
    alternates: localeAlternates(params.locale, `/shop/${params.slug}`),
  };
}

export default function ProductDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const dict = getDictionary(locale);
  const categoryLabel =
    dict.shopPage.categories.find((c) => c.id === product.category)?.label ?? product.category;

  return (
    <ProductDetail
      product={product}
      locale={locale}
      navBase={`/${locale}`}
      shopDict={dict.shopPage}
      detailDict={dict.shopDetail}
      categoryLabel={categoryLabel}
      homeLabel={dict.nav.home}
      shopLabel={dict.nav.shop}
    />
  );
}
