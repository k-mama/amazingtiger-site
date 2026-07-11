import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getProductBySlug, getProductCopy } from "@/lib/shop/products";
import Reveal from "./Reveal";

interface ShopPreviewProps {
  dict: Dictionary;
  basePath: string;
  locale: Locale;
}

// These three are shown on the homepage as a quiet "studio concept" preview —
// real photography, but no price, cart, or stock signal. The live catalogue
// (with full pricing and Add to Cart) lives on the /shop pages, unchanged.
const conceptSlugs = [
  { slug: "born-rare-readers-journal", image: "/images/homepage/shop/born-rare-readers-journal.webp" },
  { slug: "quiet-power-studio-tote", image: "/images/homepage/shop/quiet-power-studio-tote.webp" },
  { slug: "rest-your-busy-mind-mug", image: "/images/homepage/shop/rest-your-busy-mind-mug.webp" },
];

export default function ShopPreview({ dict, basePath, locale }: ShopPreviewProps) {
  const navBase = basePath === "/" ? "/en" : basePath;

  return (
    <section id="shop" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{dict.shopPreview.eyebrow}</span>
          <h2 className="section-heading">{dict.shopPreview.heading}</h2>
          <p className="section-lead">{dict.shopPreview.lead}</p>
        </Reveal>
        <div className="product-grid">
          {conceptSlugs.map(({ slug, image }, i) => {
            const product = getProductBySlug(slug);
            if (!product) return null;
            const copy = getProductCopy(product, locale);
            return (
              <Reveal key={slug} delay={i * 80}>
                <article className="product-card">
                  <div className="product-card__media">
                    <span className="product-card__badge">{dict.homeStatusLabels.studioConcept}</span>
                    <Image
                      src={image}
                      alt={copy.title}
                      fill
                      loading="lazy"
                      sizes="(min-width: 900px) 33vw, 100vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                  <div className="product-card__body">
                    <h3 className="product-card__title">{copy.title}</h3>
                    <p className="product-card__subtitle">{copy.subtitle}</p>
                    <div className="product-card__actions">
                      <Link href={`${navBase}/shop/${product.slug}`} className="btn btn-secondary btn-block">
                        {dict.homeStatusLabels.viewConcept}
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
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
