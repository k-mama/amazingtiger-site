import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getHomeFeaturedProducts } from "@/lib/shop/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

interface ShopPreviewProps {
  dict: Dictionary;
  basePath: string;
  locale: Locale;
}

export default function ShopPreview({ dict, basePath, locale }: ShopPreviewProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const featured = getHomeFeaturedProducts();

  return (
    <section id="shop" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{dict.shopPreview.eyebrow}</span>
          <h2 className="section-heading">{dict.shopPreview.heading}</h2>
          <p className="section-lead">{dict.shopPreview.lead}</p>
        </Reveal>
        <div className="product-grid">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} locale={locale} navBase={navBase} dict={dict.shopPage} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <Link href={`${navBase}/shop`} className="btn btn-primary" style={{ marginTop: "2.25rem" }}>
            {dict.shopPreview.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
