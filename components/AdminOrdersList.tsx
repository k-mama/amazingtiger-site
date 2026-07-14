"use client";

import { Fragment, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

interface AdminOrdersListProps {
  dict: Dictionary["admin"]["orders"];
  locale: Locale;
}

type LoadState = "loading" | "ready" | "error";
type DetailState = "loading" | "ready" | "error";
type OrderStatus = "pending_inquiry" | "contacted" | "completed" | "cancelled";
type RowUpdateState = "idle" | "updating" | "success" | "error";

const STATUS_VALUES: OrderStatus[] = ["pending_inquiry", "contacted", "completed", "cancelled"];

interface OrderRow {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
  phone: string | null;
  country: string | null;
  region: string | null;
  status: string;
  total_cents: number;
  currency: string;
}

interface OrderItemRow {
  id: string;
  product_title_snapshot: string | null;
  quantity: number;
  unit_price_label: string | null;
}

interface OrderAddressDetail {
  billing_first_name: string | null;
  billing_last_name: string | null;
  billing_address_line1: string | null;
  billing_address_line2: string | null;
  billing_city: string | null;
  billing_state: string | null;
  billing_postal_code: string | null;
  shipping_same_as_billing: boolean;
  shipping_first_name: string | null;
  shipping_last_name: string | null;
  shipping_country: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_postal_code: string | null;
  order_notes: string | null;
}

export default function AdminOrdersList({ dict, locale }: AdminOrdersListProps) {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [itemsById, setItemsById] = useState<Record<string, OrderItemRow[]>>({});
  const [addressById, setAddressById] = useState<Record<string, OrderAddressDetail>>({});
  const [detailState, setDetailState] = useState<Record<string, DetailState>>({});
  const [rowUpdates, setRowUpdates] = useState<Record<string, RowUpdateState>>({});

  useEffect(() => {
    let active = true;
    setLoadState("loading");

    async function load() {
      const [ordersResult, itemsResult] = await Promise.all([
        supabase
          .from("orders")
          .select("id, created_at, customer_name, customer_email, phone, country, region, status, total_cents, currency")
          .order("created_at", { ascending: false })
          .limit(100),
        supabase.from("order_items").select("order_id"),
      ]);

      if (!active) return;

      if (ordersResult.error) {
        setLoadState("error");
        return;
      }

      const counts: Record<string, number> = {};
      for (const item of itemsResult.data ?? []) {
        counts[item.order_id] = (counts[item.order_id] ?? 0) + 1;
      }

      setRows(ordersResult.data ?? []);
      setItemCounts(counts);
      setLoadState("ready");
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  async function toggleDetails(orderId: string) {
    if (expandedId === orderId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(orderId);

    if (itemsById[orderId] && addressById[orderId]) return;

    setDetailState((prev) => ({ ...prev, [orderId]: "loading" }));

    const [itemsResult, addressResult] = await Promise.all([
      supabase
        .from("order_items")
        .select("id, product_title_snapshot, quantity, unit_price_label")
        .eq("order_id", orderId),
      supabase
        .from("orders")
        .select(
          "billing_first_name, billing_last_name, billing_address_line1, billing_address_line2, billing_city, billing_state, billing_postal_code, shipping_same_as_billing, shipping_first_name, shipping_last_name, shipping_country, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_postal_code, order_notes"
        )
        .eq("id", orderId)
        .single(),
    ]);

    if (itemsResult.error || addressResult.error) {
      setDetailState((prev) => ({ ...prev, [orderId]: "error" }));
      return;
    }

    setItemsById((prev) => ({ ...prev, [orderId]: itemsResult.data ?? [] }));
    if (addressResult.data) {
      setAddressById((prev) => ({ ...prev, [orderId]: addressResult.data as OrderAddressDetail }));
    }
    setDetailState((prev) => ({ ...prev, [orderId]: "ready" }));
  }

  async function handleStatusChange(orderId: string, nextStatus: OrderStatus) {
    setRowUpdates((prev) => ({ ...prev, [orderId]: "updating" }));

    const { error } = await supabase.from("orders").update({ status: nextStatus }).eq("id", orderId);

    if (error) {
      setRowUpdates((prev) => ({ ...prev, [orderId]: "error" }));
      return;
    }

    setRows((prev) => prev.map((row) => (row.id === orderId ? { ...row, status: nextStatus } : row)));
    setRowUpdates((prev) => ({ ...prev, [orderId]: "success" }));
  }

  function formatSubtotal(cents: number, currency: string) {
    const amount = cents / 100;
    return amount.toLocaleString(locale === "ko" ? "ko-KR" : "en-US", { style: "currency", currency });
  }

  return (
    <div className="glass-panel glass-panel--solid admin-panel">
      <h2>{dict.heading}</h2>
      <p className="section-lead">{dict.lead}</p>

      {loadState === "loading" && (
        <p className="status-note" style={{ marginTop: "var(--space-3)" }}>{dict.loading}</p>
      )}
      {loadState === "error" && (
        <p className="status-note status-note--error" style={{ marginTop: "var(--space-3)" }}>{dict.error}</p>
      )}
      {loadState === "ready" && rows.length === 0 && (
        <p className="status-note" style={{ marginTop: "var(--space-3)" }}>{dict.empty}</p>
      )}

      {loadState === "ready" && rows.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{dict.columns.createdAt}</th>
                <th>{dict.columns.customer}</th>
                <th>{dict.columns.email}</th>
                <th>{dict.columns.phone}</th>
                <th>{dict.columns.country}</th>
                <th>{dict.columns.region}</th>
                <th>{dict.columns.status}</th>
                <th>{dict.columns.subtotal}</th>
                <th>{dict.columns.items}</th>
                <th>{dict.columns.updateStatus}</th>
                <th aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const expanded = expandedId === row.id;
                const rowDetailState = detailState[row.id];
                const rowItems = itemsById[row.id];
                const address = addressById[row.id];
                const updateState = rowUpdates[row.id] ?? "idle";
                return (
                  <Fragment key={row.id}>
                    <tr>
                      <td>
                        {new Date(row.created_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td>{row.customer_name ?? "—"}</td>
                      <td>{row.customer_email ?? "—"}</td>
                      <td>{row.phone ?? "—"}</td>
                      <td>{row.country ?? "—"}</td>
                      <td>{row.region ?? "—"}</td>
                      <td>
                        <span className={`status-pill status-pill--${row.status}`}>
                          {dict.statusLabels[row.status as keyof typeof dict.statusLabels] ?? row.status}
                        </span>
                      </td>
                      <td>{formatSubtotal(row.total_cents, row.currency)}</td>
                      <td>{itemCounts[row.id] ?? 0}</td>
                      <td>
                        <div className="admin-status-update">
                          <select
                            aria-label={dict.statusUpdate.label}
                            className="admin-status-select"
                            value={row.status}
                            disabled={updateState === "updating"}
                            onChange={(event) => handleStatusChange(row.id, event.target.value as OrderStatus)}
                          >
                            {STATUS_VALUES.map((value) => (
                              <option key={value} value={value}>
                                {dict.statusLabels[value]}
                              </option>
                            ))}
                          </select>
                          {updateState === "updating" && (
                            <span className="admin-status-message">{dict.statusUpdate.updating}</span>
                          )}
                          {updateState === "success" && (
                            <span className="admin-status-message admin-status-message--success">
                              {dict.statusUpdate.success}
                            </span>
                          )}
                          {updateState === "error" && (
                            <span className="admin-status-message admin-status-message--error">
                              {dict.statusUpdate.error}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <button type="button" className="btn-link" onClick={() => toggleDetails(row.id)}>
                          {expanded ? dict.hideDetails : dict.viewDetails}
                        </button>
                      </td>
                    </tr>
                    {expanded && (
                      <tr>
                        <td colSpan={11}>
                          <div className="admin-order-items">
                            <span className="admin-order-items__heading">{dict.itemsHeading}</span>
                            {rowDetailState === "loading" && <p className="status-note">{dict.itemsLoading}</p>}
                            {rowDetailState === "error" && (
                              <p className="status-note status-note--error">{dict.itemsError}</p>
                            )}
                            {rowDetailState === "ready" && rowItems && rowItems.length === 0 && (
                              <p className="status-note">{dict.itemsEmpty}</p>
                            )}
                            {rowDetailState === "ready" && rowItems && rowItems.length > 0 && (
                              <ul className="admin-order-items__list">
                                {rowItems.map((item) => (
                                  <li key={item.id}>
                                    <span>
                                      {item.product_title_snapshot ?? "—"} × {item.quantity}
                                    </span>
                                    <span>{item.unit_price_label ?? "—"}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {rowDetailState === "ready" && address && (
                              <div className="admin-order-address">
                                <div>
                                  <span className="admin-order-items__heading">{dict.billingHeading}</span>
                                  <p>
                                    {address.billing_first_name} {address.billing_last_name}
                                    <br />
                                    {address.billing_address_line1}
                                    {address.billing_address_line2 ? `, ${address.billing_address_line2}` : ""}
                                    <br />
                                    {address.billing_city}, {address.billing_state} {address.billing_postal_code}
                                  </p>
                                </div>
                                <div>
                                  <span className="admin-order-items__heading">{dict.shippingHeading}</span>
                                  {address.shipping_same_as_billing ? (
                                    <p>{dict.shippingSameAsBilling}</p>
                                  ) : (
                                    <p>
                                      {address.shipping_first_name} {address.shipping_last_name}
                                      <br />
                                      {address.shipping_address_line1}
                                      {address.shipping_address_line2 ? `, ${address.shipping_address_line2}` : ""}
                                      <br />
                                      {address.shipping_city}, {address.shipping_state} {address.shipping_postal_code}
                                      {address.shipping_country ? `, ${address.shipping_country}` : ""}
                                    </p>
                                  )}
                                </div>
                                {address.order_notes && (
                                  <div>
                                    <span className="admin-order-items__heading">{dict.notesHeading}</span>
                                    <p>{address.order_notes}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
