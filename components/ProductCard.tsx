"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import type { Product } from "@/lib/shop/products";
import { getProductCopy } from "@/lib/shop/products";
import { useCart } from "./useCart";
import EditorialObject from "./EditorialObject";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  navBase: string;
  dict: Pick<
    Dictionary["shopPage"],
    | "addToPrivateCart"
    | "requestAvailability"
    | "joinReleaseList"
    | "privateInquiryCta"
    | "viewDetail"
    | "availabilityLabels"
    | "categories"
  >;
}

export default function ProductCard({ product, locale, navBase, dict }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const copy = getProductCopy(product, locale);
  const detailHref = `${navBase}/shop/${product.slug}`;
  const inquiryHref = `${navBase}/consultation?type=shop_support&product=${product.slug}`;
  const categoryLabel = dict.categories.find((c) => c.id === product.category)?.label ?? product.category;

  function handleAddToCart() {
    addToCart(product.slug);
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="product-card">
      <Link href={detailHref} className="product-card__media">
        {copy.badge && <span className="product-card__badge">{copy.badge}</span>}
        {product.image ? (
          <Image
            src={product.image}
            alt={copy.title}
            fill
            loading="lazy"
            sizes="(min-width: 900px) 33vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        ) : (
          <EditorialObject toneA={product.visualToneA} toneB={product.visualToneB} emblem={product.emblem} />
        )}
      </Link>
      <div className="product-card__body">
        <span className="product-card__category">
          {categoryLabel} · {copy.type}
        </span>
        <h3 className="product-card__title">
          <Link href={detailHref}>{copy.title}</Link>
        </h3>
        <p className="product-card__subtitle">{copy.subtitle}</p>
        <p className="product-card__description">{copy.description}</p>
        <div className="product-card__meta">
          <span className="product-card__price">{product.priceLabel}</span>
          <span className={`availability-pill availability-pill--${product.availability}`}>
            {dict.availabilityLabels[product.availability]}
          </span>
        </div>
        <div className="product-card__actions">
          {product.availability === "available" ? (
            <button type="button" className="btn btn-secondary btn-block" onClick={handleAddToCart}>
              {added ? "✓" : dict.addToPrivateCart}
            </button>
          ) : (
            <Link href={inquiryHref} className="btn btn-secondary btn-block">
              {product.availability === "limited" && dict.requestAvailability}
              {product.availability === "coming_soon" && dict.joinReleaseList}
              {product.availability === "inquiry_only" && dict.privateInquiryCta}
            </Link>
          )}
          <Link href={detailHref} className="btn-link">
            {dict.viewDetail}
          </Link>
        </div>
      </div>
    </article>
  );
}
