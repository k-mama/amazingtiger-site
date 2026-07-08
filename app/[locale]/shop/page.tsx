import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getProductsByCategory, type ProductCategory } from "@/lib/shop/products";
import ProductCard from "@/components/ProductCard";
import CartWidget from "@/components/CartWidget";
import Reveal from "@/components/Reveal";
import AmbientBackdrop from "@/components/AmbientBackdrop";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).shopPage.heading };
}

const sectionAnchors: Record<ProductCategory, string> = {
  books: "featured-books",
  limited: "limited-editions",
  objects: "objects-goods",
  gifts: "gift-sets",
};

export default function ShopPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const fullDict = getDictionary(locale);
  const dict = fullDict.shopPage;
  const navBase = `/${locale}`;

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

          <nav className="category-filter" aria-label="Shop categories">
            {dict.categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === "all" ? "#featured-books" : `#${sectionAnchors[cat.id as ProductCategory]}`}
                className="category-filter__link"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section id="featured-books" className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.featuredBooks.heading}</h2>
            <p className="section-lead">{dict.sections.featuredBooks.lead}</p>
          </Reveal>
          <div className="product-grid">
            {getProductsByCategory("books").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} locale={locale} navBase={navBase} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="limited-editions" className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.limitedEditions.heading}</h2>
            <p className="section-lead">{dict.sections.limitedEditions.lead}</p>
          </Reveal>
          <div className="product-grid">
            {getProductsByCategory("limited").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} locale={locale} navBase={navBase} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="objects-goods" className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.objects.heading}</h2>
            <p className="section-lead">{dict.sections.objects.lead}</p>
          </Reveal>
          <div className="product-grid">
            {getProductsByCategory("objects").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} locale={locale} navBase={navBase} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gift-sets" className="shop-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.giftSets.heading}</h2>
            <p className="section-lead">{dict.sections.giftSets.lead}</p>
          </Reveal>
          <div className="product-grid">
            {getProductsByCategory("gifts").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} locale={locale} navBase={navBase} dict={dict} />
              </Reveal>
            ))}
          </div>
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
