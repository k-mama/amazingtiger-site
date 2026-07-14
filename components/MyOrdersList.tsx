"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

interface MyOrdersListProps {
  dict: Dictionary["dashboard"]["myOrders"];
  locale: Locale;
  navBase: string;
}

type LoadState = "loading" | "ready" | "error";

interface OrderRow {
  id: string;
  created_at: string;
  status: string;
  total_cents: number;
  currency: string;
}

export default function MyOrdersList({ dict, locale, navBase }: MyOrdersListProps) {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    let active = true;
    setLoadState("loading");

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (active) setLoadState("ready");
        return;
      }

      // RLS ("Users can view their own orders" / "...items of their own
      // orders") already scopes both queries to this member — the .eq is
      // belt-and-suspenders, not the security boundary.
      const [ordersResult, itemsResult] = await Promise.all([
        supabase
          .from("orders")
          .select("id, created_at, status, total_cents, currency")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
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

  function formatTotal(cents: number, currency: string) {
    return (cents / 100).toLocaleString(locale === "ko" ? "ko-KR" : "en-US", { style: "currency", currency });
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
        <div style={{ marginTop: "var(--space-3)" }}>
          <p className="status-note">{dict.empty}</p>
          <Link href={`${navBase}/shop`} className="btn btn-secondary" style={{ marginTop: "var(--space-2)" }}>
            {dict.emptyCta}
          </Link>
        </div>
      )}

      {loadState === "ready" && rows.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{dict.columns.createdAt}</th>
                <th>{dict.columns.status}</th>
                <th>{dict.columns.items}</th>
                <th>{dict.columns.total}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    {new Date(row.created_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <span className={`status-pill status-pill--${row.status}`}>
                      {dict.statusLabels[row.status as keyof typeof dict.statusLabels] ?? row.status}
                    </span>
                  </td>
                  <td>{itemCounts[row.id] ?? 0}</td>
                  <td>{formatTotal(row.total_cents, row.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
