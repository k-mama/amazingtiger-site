"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getProductCopy, getRelatedProducts, type Product } from "@/lib/shop/products";
import { useCart } from "./useCart";
import EditorialObject from "./EditorialObject";
import ProductCard from "./ProductCard";
import QuantityStepper from "./QuantityStepper";
import Reveal from "./Reveal";

interface ProductDetailProps {
  product: Product;
  locale: Locale;
  navBase: string;
  shopDict: Dictionary["shopPage"];
  detailDict: Dictionary["shopDetail"];
  categoryLabel: string;
  homeLabel: string;
  shopLabel: string;
}

export default function ProductDetail({
  product,
  locale,
  navBase,
  shopDict,
  detailDict,
  categoryLabel,
  homeLabel,
  shopLabel,
}: ProductDetailProps) {
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const copy = getProductCopy(product, locale);
  const related = getRelatedProducts(product);
  const inquiryHref = `${navBase}/consultation?type=shop_support&product=${product.slug}`;

  function handleAddToCart() {
    addToCart(product.slug, quantity);
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href={navBase}>{homeLabel}</Link>
          <span className="breadcrumb__sep">/</span>
          <Link href={`${navBase}/shop`}>{shopLabel}</Link>
          <span className="breadcrumb__sep">/</span>
          <span className="breadcrumb__current">{copy.title}</span>
        </nav>

        <div className="product-detail">
          <div className="product-detail__media">
            {copy.badge && <span className="product-card__badge">{copy.badge}</span>}
            <EditorialObject toneA={product.visualToneA} toneB={product.visualToneB} emblem={product.emblem} />
          </div>

          <div className="product-detail__body">
            <span className="eyebrow">
              {categoryLabel} · {copy.type}
            </span>
            <h1 className="section-heading">{copy.title}</h1>
            <p className="product-detail__subtitle">{copy.subtitle}</p>
            <p className="section-lead">{copy.description}</p>

            <div className="product-detail__meta">
              <div>
                <span className="product-detail__meta-label">{product.priceLabel}</span>
              </div>
              <span className={`availability-pill availability-pill--${product.availability}`}>
                {shopDict.availabilityLabels[product.availability]}
              </span>
            </div>

            {product.availability === "available" ? (
              <div className="product-detail__purchase">
                <QuantityStepper label={detailDict.quantityLabel} value={quantity} onChange={setQuantity} />
                <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
                  {added ? "✓" : shopDict.addToPrivateCart}
                </button>
              </div>
            ) : (
              <Link href={inquiryHref} className="btn btn-primary">
                {product.availability === "limited" && shopDict.requestAvailability}
                {product.availability === "coming_soon" && shopDict.joinReleaseList}
                {product.availability === "inquiry_only" && shopDict.privateInquiryCta}
              </Link>
            )}

            {product.availability === "inquiry_only" && (
              <p className="status-note" style={{ marginTop: "var(--space-2)" }}>
                {detailDict.inquiryNote}
              </p>
            )}

            <div className="product-detail__details">
              <h3>{detailDict.detailsHeading}</h3>
              <ul>
                {copy.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="shop-section">
            <Reveal>
              <h2 className="section-heading">{detailDict.relatedHeading}</h2>
            </Reveal>
            <div className="product-grid">
              {related.map((relatedProduct, i) => (
                <Reveal key={relatedProduct.id} delay={i * 70}>
                  <ProductCard product={relatedProduct} locale={locale} navBase={navBase} dict={shopDict} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
