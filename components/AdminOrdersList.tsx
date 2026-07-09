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
type ItemsState = "loading" | "ready" | "error";

interface OrderRow {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
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

export default function AdminOrdersList({ dict, locale }: AdminOrdersListProps) {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [itemsById, setItemsById] = useState<Record<string, OrderItemRow[]>>({});
  const [itemsState, setItemsState] = useState<Record<string, ItemsState>>({});

  useEffect(() => {
    let active = true;
    setLoadState("loading");

    async function load() {
      const [ordersResult, itemsResult] = await Promise.all([
        supabase
          .from("orders")
          .select("id, created_at, customer_name, customer_email, country, region, status, total_cents, currency")
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

    if (itemsById[orderId]) return;

    setItemsState((prev) => ({ ...prev, [orderId]: "loading" }));

    const { data, error } = await supabase
      .from("order_items")
      .select("id, product_title_snapshot, quantity, unit_price_label")
      .eq("order_id", orderId);

    if (error) {
      setItemsState((prev) => ({ ...prev, [orderId]: "error" }));
      return;
    }

    setItemsById((prev) => ({ ...prev, [orderId]: data ?? [] }));
    setItemsState((prev) => ({ ...prev, [orderId]: "ready" }));
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
                <th>{dict.columns.country}</th>
                <th>{dict.columns.region}</th>
                <th>{dict.columns.status}</th>
                <th>{dict.columns.subtotal}</th>
                <th>{dict.columns.items}</th>
                <th aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const expanded = expandedId === row.id;
                const rowItemsState = itemsState[row.id];
                const rowItems = itemsById[row.id];
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
                        <button type="button" className="btn-link" onClick={() => toggleDetails(row.id)}>
                          {expanded ? dict.hideDetails : dict.viewDetails}
                        </button>
                      </td>
                    </tr>
                    {expanded && (
                      <tr>
                        <td colSpan={9}>
                          <div className="admin-order-items">
                            <span className="admin-order-items__heading">{dict.itemsHeading}</span>
                            {rowItemsState === "loading" && <p className="status-note">{dict.itemsLoading}</p>}
                            {rowItemsState === "error" && (
                              <p className="status-note status-note--error">{dict.itemsError}</p>
                            )}
                            {rowItemsState === "ready" && rowItems && rowItems.length === 0 && (
                              <p className="status-note">{dict.itemsEmpty}</p>
                            )}
                            {rowItemsState === "ready" && rowItems && rowItems.length > 0 && (
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
