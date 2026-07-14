import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import { getAllProducts, getHomeFeaturedProducts } from "@/lib/shop/products";
import ProductCard from "@/components/ProductCard";
import ShopCatalogue from "@/components/ShopCatalogue";
import CartWidget from "@/components/CartWidget";
import Reveal from "@/components/Reveal";
import AmbientBackdrop from "@/components/AmbientBackdrop";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return {
    title: getDictionary(params.locale).shopPage.heading,
    alternates: localeAlternates(params.locale, "/shop"),
  };
}

export default function ShopPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const fullDict = getDictionary(locale);
  const dict = fullDict.shopPage;
  const navBase = `/${locale}`;
  const featured = getHomeFeaturedProducts();
  const allProducts = getAllProducts();

  return (
    <>
      <section className="shop-hero">
        <AmbientBackdrop
          blobs={[
            { color: "rgba(201,238,232,0.85)", size: 360, top: "-110px", left: "-60px" },
            { color: "rgba(248,215,222,0.7)", size: 320, top: "-80px", right: "-60px" },
          ]}
        />
        <div className="container">
          <span className="eyebrow">{dict.eyebrow}</span>
          <h1 className="section-heading">{dict.heading}</h1>
          <p className="section-lead">{dict.lead}</p>

          <div className="cart-preview">
            <span className="cart-preview__label">{dict.cartNote}</span>
            <CartWidget locale={locale} dict={fullDict.cart} navBase={navBase} variant="inline" />
          </div>
        </div>
      </section>

      <section id="featured" className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.featured.heading}</h2>
            <p className="section-lead">{dict.sections.featured.lead}</p>
          </Reveal>
          <div className="product-grid">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} locale={locale} navBase={navBase} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.collection.heading}</h2>
            <p className="section-lead">{dict.sections.collection.lead}</p>
          </Reveal>
          <ShopCatalogue products={allProducts} locale={locale} navBase={navBase} dict={dict} />
        </div>
      </section>

      <section className="panel">
        <Reveal>
          <span className="eyebrow">{dict.sections.comingSoon.heading}</span>
          <p style={{ maxWidth: "560px" }}>{dict.sections.comingSoon.lead}</p>
          <div className="coming-soon-chips">
            {dict.sections.comingSoon.future.map((label) => (
              <span key={label} className="coming-soon-chip">
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.privateInquiry.heading}</h2>
            <p className="section-lead">{dict.sections.privateInquiry.lead}</p>
            <Link href={`${navBase}/consultation?type=shop_support`} className="btn btn-secondary" style={{ marginTop: "0.5rem" }}>
              {dict.sections.privateInquiry.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
