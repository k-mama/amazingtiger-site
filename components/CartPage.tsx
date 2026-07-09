"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getProductBySlug, getProductCopy } from "@/lib/shop/products";
import { useCart } from "./useCart";
import EditorialObject from "./EditorialObject";
import QuantityStepper from "./QuantityStepper";
import Reveal from "./Reveal";

interface CartPageProps {
  locale: Locale;
  navBase: string;
  dict: Dictionary["cartPage"];
}

export default function CartPage({ locale, navBase, dict }: CartPageProps) {
  const { items, setQuantity, removeFromCart } = useCart();

  const rows = items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      const copy = getProductCopy(product, locale);
      return { item, product, copy };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  const hasNumericSubtotal = rows.length > 0 && rows.every((row) => row.product.priceAmount !== null);
  const subtotal = hasNumericSubtotal
    ? rows.reduce((sum, row) => sum + (row.product.priceAmount as number) * row.item.quantity, 0)
    : null;

  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">{dict.eyebrow}</span>
        <h1 className="section-heading">{dict.heading}</h1>
        <p className="section-lead">{dict.lead}</p>

        {rows.length === 0 && (
          <div className="glass-panel glass-panel--solid cart-page-empty">
            <p className="status-note">{dict.empty}</p>
            <Link href={`${navBase}/shop`} className="btn btn-primary">
              {dict.emptyCta}
            </Link>
          </div>
        )}

        {rows.length > 0 && (
          <div className="cart-page">
            <div className="cart-page__items">
              {rows.map(({ item, product, copy }, i) => {
                const lineTotal = product.priceAmount !== null ? product.priceAmount * item.quantity : null;
                return (
                  <Reveal key={item.slug} delay={i * 60}>
                    <div className="cart-page__item">
                      <div className="cart-page__item-media">
                        <EditorialObject toneA={product.visualToneA} toneB={product.visualToneB} emblem="none" />
                      </div>
                      <div className="cart-page__item-body">
                        <p className="cart-page__item-title">{copy.title}</p>
                        <p className="cart-page__item-subtitle">{copy.subtitle}</p>
                        <p className="cart-page__item-price">{product.priceLabel}</p>
                      </div>
                      <div className="cart-page__item-qty">
                        <QuantityStepper
                          label={dict.quantityLabel}
                          value={item.quantity}
                          onChange={(next) => setQuantity(item.slug, next)}
                        />
                        <button type="button" className="btn-link" onClick={() => removeFromCart(item.slug)}>
                          {dict.remove}
                        </button>
                      </div>
                      <div className="cart-page__item-total">
                        <span className="cart-page__item-total-label">{dict.lineTotalLabel}</span>
                        <span>
                          {lineTotal !== null
                            ? `$${lineTotal.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}`
                            : product.priceLabel}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="cart-page__totals glass-panel glass-panel--solid">
              <h2>{dict.totalsHeading}</h2>
              {subtotal !== null && (
                <div className="cart-page__totals-row">
                  <span>{dict.subtotalLabel}</span>
                  <span>${subtotal.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}</span>
                </div>
              )}
              <p className="status-note">{dict.subtotalNote}</p>
              <p className="status-note">{dict.checkoutNote}</p>
              <Link href={`${navBase}/checkout`} className="btn btn-primary btn-block">
                {dict.proceedToCheckout}
              </Link>
              <Link href={`${navBase}/shop`} className="btn-link">
                {dict.continueShopping}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
