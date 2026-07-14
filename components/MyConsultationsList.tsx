"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

interface MyConsultationsListProps {
  dict: Dictionary["dashboard"]["myConsultations"];
  locale: Locale;
  navBase: string;
}

type LoadState = "loading" | "ready" | "error";

interface ConsultationRow {
  id: string;
  created_at: string;
  project_type: string | null;
  status: string;
}

export default function MyConsultationsList({ dict, locale, navBase }: MyConsultationsListProps) {
  const [rows, setRows] = useState<ConsultationRow[]>([]);
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

      // RLS ("Users can view their own consultations") already scopes this
      // to the signed-in member — the .eq is belt-and-suspenders.
      const { data, error } = await supabase
        .from("consultations")
        .select("id, created_at, project_type, status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setLoadState("error");
        return;
      }

      setRows(data ?? []);
      setLoadState("ready");
    }

    load();
    return () => {
      active = false;
    };
  }, []);

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
          <Link href={`${navBase}/consultation`} className="btn btn-secondary" style={{ marginTop: "var(--space-2)" }}>
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
                <th>{dict.columns.projectType}</th>
                <th>{dict.columns.status}</th>
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
                  <td>{row.project_type ?? "—"}</td>
                  <td>
                    <span className={`status-pill status-pill--${row.status}`}>
                      {dict.statusLabels[row.status as keyof typeof dict.statusLabels] ?? row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
