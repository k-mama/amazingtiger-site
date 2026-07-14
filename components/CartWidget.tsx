"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getProductBySlug, getProductCopy } from "@/lib/shop/products";
import { CART_OPEN_EVENT } from "@/lib/shop/cart";
import { useCart } from "./useCart";
import EditorialObject from "./EditorialObject";
import QuantityStepper from "./QuantityStepper";
import { useDialogFocus } from "./useDialogFocus";

interface CartWidgetProps {
  locale: Locale;
  dict: Dictionary["cart"];
  navBase: string;
  variant?: "header" | "inline";
}

export default function CartWidget({ locale, dict, navBase, variant = "header" }: CartWidgetProps) {
  const { items, count, setQuantity, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useDialogFocus(open, panelRef);

  // Only the header instance owns the drawer — the inline trigger (shop
  // hero) just asks it to open, so there is never more than one drawer
  // mounted at once no matter how many trigger buttons are on the page.
  useEffect(() => {
    if (variant !== "header") return;
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener(CART_OPEN_EVENT, onOpenRequest);
    return () => window.removeEventListener(CART_OPEN_EVENT, onOpenRequest);
  }, [variant]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const rows = items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      const copy = getProductCopy(product, locale);
      const unitPrice = product.priceAmount;
      return { item, product, copy, unitPrice };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  const hasNumericSubtotal = rows.length > 0 && rows.every((row) => row.unitPrice !== null);
  const subtotal = hasNumericSubtotal
    ? rows.reduce((sum, row) => sum + (row.unitPrice as number) * row.item.quantity, 0)
    : null;

  function handleTriggerClick() {
    if (variant === "header") {
      setOpen(true);
    } else {
      window.dispatchEvent(new Event(CART_OPEN_EVENT));
    }
  }

  return (
    <>
      <button
        type="button"
        className={variant === "header" ? "cart-trigger" : "cart-trigger cart-trigger--inline"}
        aria-label={dict.open}
        onClick={handleTriggerClick}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 8h10l-1 11.2a1 1 0 0 1-1 .8H9a1 1 0 0 1-1-.8L7 8Z" />
          <path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8" />
        </svg>
        {variant === "inline" && <span>{dict.eyebrow}</span>}
        <span className="cart-trigger__count">{count}</span>
      </button>

      {variant === "header" &&
        mounted &&
        open &&
        createPortal(
          <div className="cart-drawer-overlay" role="presentation" onClick={() => setOpen(false)}>
            <div
              className="cart-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={dict.title}
              onClick={(event) => event.stopPropagation()}
              ref={panelRef}
            >
              <div className="cart-drawer__header">
                <div>
                  <span className="eyebrow">{dict.eyebrow}</span>
                  <h2>{dict.title}</h2>
                </div>
                <button type="button" className="cart-drawer__close" aria-label={dict.close} onClick={() => setOpen(false)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="cart-drawer__body">
                {rows.length === 0 && <p className="status-note">{dict.empty}</p>}

                {rows.map(({ item, product, copy }) => (
                  <div key={item.slug} className="cart-drawer__item">
                    <div className="cart-drawer__item-media">
                      <EditorialObject toneA={product.visualToneA} toneB={product.visualToneB} emblem="none" />
                    </div>
                    <div className="cart-drawer__item-body">
                      <p className="cart-drawer__item-title">{copy.title}</p>
                      <p className="cart-drawer__item-subtitle">{copy.subtitle}</p>
                      <p className="cart-drawer__item-price">{product.priceLabel}</p>
                      <div className="cart-drawer__item-actions">
                        <QuantityStepper
                          label={dict.quantityLabel}
                          value={item.quantity}
                          onChange={(next) => setQuantity(item.slug, next)}
                        />
                        <button type="button" className="btn-link" onClick={() => removeFromCart(item.slug)}>
                          {dict.remove}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-drawer__footer">
                {subtotal !== null && (
                  <div className="cart-drawer__subtotal">
                    <span>{dict.subtotalLabel}</span>
                    <span>${subtotal.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}</span>
                  </div>
                )}
                <p className="status-note">{dict.subtotalNote}</p>
                <p className="status-note">{dict.checkoutNote}</p>
                {rows.length > 0 && (
                  <div className="cart-drawer__cta-row">
                    <Link href={`${navBase}/cart`} className="btn btn-secondary" onClick={() => setOpen(false)}>
                      {dict.viewCart}
                    </Link>
                    <Link href={`${navBase}/checkout`} className="btn btn-primary" onClick={() => setOpen(false)}>
                      {dict.proceedToCheckout}
                    </Link>
                  </div>
                )}
                <Link href={`${navBase}/consultation?type=shop_support`} className="btn-link" onClick={() => setOpen(false)}>
                  {dict.consultationFallback}
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
