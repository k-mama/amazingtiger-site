"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { calculateDiscountDollars, findDiscountCode } from "@/lib/shop/discounts";
import { formatMoney } from "@/lib/shop/format";
import { getProductBySlug, getProductCopy } from "@/lib/shop/products";
import { submitCheckoutRequest, type AddressFields } from "@/lib/shop/orders";
import DiscountCodeForm from "./DiscountCodeForm";
import { useCart } from "./useCart";

interface CheckoutPageProps {
  locale: Locale;
  navBase: string;
  dict: Dictionary["checkoutPage"];
}

type View = "form" | "submitting" | "success" | "error";

interface BillingState extends AddressFields {
  email: string;
  phone: string;
}

const emptyBilling: BillingState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
};

const emptyShipping: AddressFields = {
  firstName: "",
  lastName: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
};

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  disabled?: boolean;
}

function Field({ id, label, value, onChange, error, type = "text", disabled }: FieldProps) {
  return (
    <div className={`form-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default function CheckoutPage({ locale, navBase, dict }: CheckoutPageProps) {
  const { items, clearCart, discountCode, applyDiscountCode, clearDiscountCode } = useCart();
  const [billing, setBilling] = useState<BillingState>(emptyBilling);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [shipping, setShipping] = useState<AddressFields>(emptyShipping);
  const [orderNotes, setOrderNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<View>("form");
  const [orderId, setOrderId] = useState<string | null>(null);

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

  const discount = findDiscountCode(discountCode);
  const discountAmount = subtotal !== null ? calculateDiscountDollars(discount, subtotal) : 0;
  const total = subtotal !== null ? subtotal - discountAmount : null;
  const numberLocale = locale === "ko" ? "ko-KR" : "en-US";

  function updateBilling(key: keyof BillingState, value: string) {
    setBilling((prev) => ({ ...prev, [key]: value }));
    const errorKey = `billing${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    if (errors[errorKey]) setErrors((prev) => { const next = { ...prev }; delete next[errorKey]; return next; });
  }

  function updateShipping(key: keyof AddressFields, value: string) {
    setShipping((prev) => ({ ...prev, [key]: value }));
    const errorKey = `shipping${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    if (errors[errorKey]) setErrors((prev) => { const next = { ...prev }; delete next[errorKey]; return next; });
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!billing.firstName.trim()) errs.billingFirstName = dict.fieldRequired;
    if (!billing.lastName.trim()) errs.billingLastName = dict.fieldRequired;
    if (!billing.email.trim()) errs.billingEmail = dict.fieldRequired;
    else if (!emailPattern.test(billing.email)) errs.billingEmail = dict.emailInvalid;
    if (!billing.phone.trim()) errs.billingPhone = dict.fieldRequired;
    if (!billing.country.trim()) errs.billingCountry = dict.fieldRequired;
    if (!billing.addressLine1.trim()) errs.billingAddressLine1 = dict.fieldRequired;
    if (!billing.city.trim()) errs.billingCity = dict.fieldRequired;
    if (!billing.state.trim()) errs.billingState = dict.fieldRequired;
    if (!billing.postalCode.trim()) errs.billingPostalCode = dict.fieldRequired;

    if (shipToDifferentAddress) {
      if (!shipping.firstName.trim()) errs.shippingFirstName = dict.fieldRequired;
      if (!shipping.lastName.trim()) errs.shippingLastName = dict.fieldRequired;
      if (!shipping.country.trim()) errs.shippingCountry = dict.fieldRequired;
      if (!shipping.addressLine1.trim()) errs.shippingAddressLine1 = dict.fieldRequired;
      if (!shipping.city.trim()) errs.shippingCity = dict.fieldRequired;
      if (!shipping.state.trim()) errs.shippingState = dict.fieldRequired;
      if (!shipping.postalCode.trim()) errs.shippingPostalCode = dict.fieldRequired;
    }

    return errs;
  }

  const errorLabels: Record<string, string> = {
    billingFirstName: dict.firstNameLabel,
    billingLastName: dict.lastNameLabel,
    billingEmail: dict.emailLabel,
    billingPhone: dict.phoneLabel,
    billingCountry: dict.countryLabel,
    billingAddressLine1: dict.addressLine1Label,
    billingCity: dict.cityLabel,
    billingState: dict.stateLabel,
    billingPostalCode: dict.postalCodeLabel,
    shippingFirstName: `${dict.shippingHeading} — ${dict.firstNameLabel}`,
    shippingLastName: `${dict.shippingHeading} — ${dict.lastNameLabel}`,
    shippingCountry: `${dict.shippingHeading} — ${dict.countryLabel}`,
    shippingAddressLine1: `${dict.shippingHeading} — ${dict.addressLine1Label}`,
    shippingCity: `${dict.shippingHeading} — ${dict.cityLabel}`,
    shippingState: `${dict.shippingHeading} — ${dict.stateLabel}`,
    shippingPostalCode: `${dict.shippingHeading} — ${dict.postalCodeLabel}`,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setErrors({});
    setView("submitting");

    const { error, orderId: newOrderId } = await submitCheckoutRequest({
      locale,
      items,
      billing,
      shipToDifferentAddress,
      shipping,
      orderNotes,
      discountCode: discount?.code ?? null,
    });

    if (error) {
      setView("error");
      return;
    }

    clearCart();
    clearDiscountCode();
    setOrderId(newOrderId);
    setView("success");
  }

  if (view === "success") {
    return (
      <div className="section">
        <div className="container checkout-result">
          <span className="eyebrow">{dict.successHeading}</span>
          <p className="status-note status-note--success">{dict.successMessage}</p>
          {orderId && (
            <p className="status-note">
              {dict.orderReferenceLabel}: {orderId.slice(0, 8).toUpperCase()}
            </p>
          )}
          <Link href={`${navBase}/shop`} className="btn btn-primary">
            {dict.continueLabel}
          </Link>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="section">
        <div className="container checkout-result">
          <span className="eyebrow">{dict.eyebrow}</span>
          <h1 className="section-heading">{dict.heading}</h1>
          <p className="status-note">{dict.emptyNote}</p>
          <Link href={`${navBase}/shop`} className="btn btn-primary">
            {dict.backToCart}
          </Link>
        </div>
      </div>
    );
  }

  const errorEntries = Object.entries(errors);

  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">{dict.eyebrow}</span>
        <h1 className="section-heading">{dict.heading}</h1>
        <p className="section-lead">{dict.lead}</p>

        <form onSubmit={handleSubmit} className="checkout-grid">
          <div className="checkout-form-col">
            {errorEntries.length > 0 && (
              <div className="checkout-error-panel">
                <strong>{dict.errorBannerHeading}</strong>
                <ul>
                  {errorEntries.map(([key, message]) => (
                    <li key={key}>
                      {errorLabels[key] ?? key}: {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {view === "error" && <p className="status-note status-note--error">{dict.errorMessage}</p>}

            <div className="glass-panel glass-panel--solid checkout-section">
              <h2>{dict.billingHeading}</h2>
              <div className="checkout-field-grid">
                <Field id="billing-first-name" label={dict.firstNameLabel} value={billing.firstName} onChange={(v) => updateBilling("firstName", v)} error={errors.billingFirstName} disabled={view === "submitting"} />
                <Field id="billing-last-name" label={dict.lastNameLabel} value={billing.lastName} onChange={(v) => updateBilling("lastName", v)} error={errors.billingLastName} disabled={view === "submitting"} />
                <Field id="billing-email" label={dict.emailLabel} value={billing.email} onChange={(v) => updateBilling("email", v)} error={errors.billingEmail} type="email" disabled={view === "submitting"} />
                <Field id="billing-phone" label={dict.phoneLabel} value={billing.phone} onChange={(v) => updateBilling("phone", v)} error={errors.billingPhone} type="tel" disabled={view === "submitting"} />
                <Field id="billing-country" label={dict.countryLabel} value={billing.country} onChange={(v) => updateBilling("country", v)} error={errors.billingCountry} disabled={view === "submitting"} />
                <Field id="billing-address1" label={dict.addressLine1Label} value={billing.addressLine1} onChange={(v) => updateBilling("addressLine1", v)} error={errors.billingAddressLine1} disabled={view === "submitting"} />
                <Field id="billing-address2" label={dict.addressLine2Label} value={billing.addressLine2} onChange={(v) => updateBilling("addressLine2", v)} disabled={view === "submitting"} />
                <Field id="billing-city" label={dict.cityLabel} value={billing.city} onChange={(v) => updateBilling("city", v)} error={errors.billingCity} disabled={view === "submitting"} />
                <Field id="billing-state" label={dict.stateLabel} value={billing.state} onChange={(v) => updateBilling("state", v)} error={errors.billingState} disabled={view === "submitting"} />
                <Field id="billing-postal" label={dict.postalCodeLabel} value={billing.postalCode} onChange={(v) => updateBilling("postalCode", v)} error={errors.billingPostalCode} disabled={view === "submitting"} />
              </div>
            </div>

            <div className="glass-panel glass-panel--solid checkout-section">
              <label className="checkout-checkbox">
                <input
                  type="checkbox"
                  checked={shipToDifferentAddress}
                  onChange={(event) => setShipToDifferentAddress(event.target.checked)}
                  disabled={view === "submitting"}
                />
                {dict.shipToDifferentLabel}
              </label>

              {shipToDifferentAddress && (
                <div className="checkout-field-grid" style={{ marginTop: "var(--space-3)" }}>
                  <h3 style={{ gridColumn: "1 / -1", margin: 0 }}>{dict.shippingHeading}</h3>
                  <Field id="shipping-first-name" label={dict.firstNameLabel} value={shipping.firstName} onChange={(v) => updateShipping("firstName", v)} error={errors.shippingFirstName} disabled={view === "submitting"} />
                  <Field id="shipping-last-name" label={dict.lastNameLabel} value={shipping.lastName} onChange={(v) => updateShipping("lastName", v)} error={errors.shippingLastName} disabled={view === "submitting"} />
                  <Field id="shipping-country" label={dict.countryLabel} value={shipping.country} onChange={(v) => updateShipping("country", v)} error={errors.shippingCountry} disabled={view === "submitting"} />
                  <Field id="shipping-address1" label={dict.addressLine1Label} value={shipping.addressLine1} onChange={(v) => updateShipping("addressLine1", v)} error={errors.shippingAddressLine1} disabled={view === "submitting"} />
                  <Field id="shipping-address2" label={dict.addressLine2Label} value={shipping.addressLine2} onChange={(v) => updateShipping("addressLine2", v)} disabled={view === "submitting"} />
                  <Field id="shipping-city" label={dict.cityLabel} value={shipping.city} onChange={(v) => updateShipping("city", v)} error={errors.shippingCity} disabled={view === "submitting"} />
                  <Field id="shipping-state" label={dict.stateLabel} value={shipping.state} onChange={(v) => updateShipping("state", v)} error={errors.shippingState} disabled={view === "submitting"} />
                  <Field id="shipping-postal" label={dict.postalCodeLabel} value={shipping.postalCode} onChange={(v) => updateShipping("postalCode", v)} error={errors.shippingPostalCode} disabled={view === "submitting"} />
                </div>
              )}
            </div>

            <div className="glass-panel glass-panel--solid checkout-section">
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label htmlFor="order-notes">{dict.orderNotesLabel}</label>
                <textarea
                  id="order-notes"
                  value={orderNotes}
                  onChange={(event) => setOrderNotes(event.target.value)}
                  disabled={view === "submitting"}
                />
              </div>
            </div>
          </div>

          <div className="checkout-summary-col">
            <div className="glass-panel glass-panel--solid checkout-summary">
              <h2>{dict.summaryHeading}</h2>
              <div className="checkout-summary__items">
                {rows.map(({ item, copy, product }) => (
                  <div key={item.slug} className="checkout-summary__row">
                    <span>
                      {copy.title} × {item.quantity}
                    </span>
                    <span>{product.priceLabel}</span>
                  </div>
                ))}
              </div>
              {subtotal !== null && (
                <div className="checkout-summary__row">
                  <span>{dict.subtotalLabel}</span>
                  <span>${formatMoney(subtotal, numberLocale)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="checkout-summary__row checkout-summary__row--discount">
                  <span>
                    {dict.discountLabel}
                    {discount ? ` (${discount.code})` : ""}
                  </span>
                  <span>-${formatMoney(discountAmount, numberLocale)}</span>
                </div>
              )}
              {total !== null && (
                <div className="checkout-summary__subtotal">
                  <span>{dict.totalLabel}</span>
                  <span>${formatMoney(total, numberLocale)}</span>
                </div>
              )}

              <DiscountCodeForm
                appliedCode={discountCode}
                onApply={applyDiscountCode}
                onRemove={clearDiscountCode}
                disabled={view === "submitting"}
                dict={{
                  label: dict.discountCodeLabel,
                  placeholder: dict.discountCodePlaceholder,
                  apply: dict.discountApply,
                  remove: dict.discountRemove,
                  invalid: dict.discountInvalid,
                  appliedLabel: dict.discountAppliedLabel,
                }}
              />

              <p className="status-note">{dict.paymentNote}</p>
              <button type="submit" className="btn btn-primary btn-block" disabled={view === "submitting"}>
                {view === "submitting" ? dict.submitting : dict.submit}
              </button>
              {view === "error" && (
                <Link href={`${navBase}/consultation?type=shop_support`} className="btn-link">
                  {dict.errorFallback}
                </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
