import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

interface ShopPreviewProps {
  dict: Dictionary;
  basePath: string;
}

export default function ShopPreview({ dict, basePath }: ShopPreviewProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const featured = dict.shopPage.products.slice(0, 4);

  return (
    <section id="shop" className="section" style={{ borderTop: "1px solid var(--color-stone-line)" }}>
      <div className="container">
        <Reveal>
          <span className="eyebrow">{dict.shopPreview.eyebrow}</span>
          <h2 className="section-heading">{dict.shopPreview.heading}</h2>
          <p className="section-lead">{dict.shopPreview.lead}</p>
        </Reveal>
        <div className="product-grid">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard
                product={product}
                addToCartLabel={dict.shopPage.addToCart}
                viewDetailLabel={dict.shopPage.viewDetail}
              />
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
