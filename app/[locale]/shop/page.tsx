import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { ProductCategory } from "@/lib/i18n/types";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).shopPage.heading };
}

const sectionAnchors: Record<Exclude<ProductCategory, never>, string> = {
  books: "featured-books",
  limited: "limited-editions",
  objects: "objects-goods",
  gifts: "gift-sets",
};

export default function ShopPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).shopPage;
  const navBase = `/${locale}`;

  const byCategory = (category: ProductCategory) => dict.products.filter((p) => p.category === category);

  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow">{dict.eyebrow}</span>
          <h1 className="section-heading">{dict.heading}</h1>
          <p className="section-lead">{dict.lead}</p>

          <div className="cart-preview">
            <span className="cart-preview__label">
              <strong>0</strong>items in your cart
            </span>
            <button type="button" className="btn btn-primary" disabled>
              {dict.checkoutCta}
            </button>
          </div>
          <p className="cart-note">{dict.cartNote}</p>

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
            {byCategory("books").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} addToCartLabel={dict.addToCart} viewDetailLabel={dict.viewDetail} />
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
            {byCategory("limited").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} addToCartLabel={dict.addToCart} viewDetailLabel={dict.viewDetail} />
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
            {byCategory("objects").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} addToCartLabel={dict.addToCart} viewDetailLabel={dict.viewDetail} />
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
            {byCategory("gifts").map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} addToCartLabel={dict.addToCart} viewDetailLabel={dict.viewDetail} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.sections.comingSoon.heading}</span>
            <p style={{ maxWidth: "560px" }}>{dict.sections.comingSoon.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="shop-section" style={{ borderTop: "none" }}>
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sections.privateInquiry.heading}</h2>
            <p className="section-lead">{dict.sections.privateInquiry.lead}</p>
            <Link href={`${navBase}/consultation`} className="btn btn-secondary" style={{ marginTop: "0.5rem" }}>
              {dict.sections.privateInquiry.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
