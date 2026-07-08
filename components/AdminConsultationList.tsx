"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

interface AdminConsultationListProps {
  dict: Dictionary["admin"]["consultations"];
  locale: Locale;
}

type StatusFilter = "all" | "new" | "in_progress" | "closed";
type LoadState = "loading" | "ready" | "error";
type ConsultationStatus = "new" | "in_progress" | "closed";
type RowUpdateState = "idle" | "updating" | "success" | "error";

const STATUS_VALUES: ConsultationStatus[] = ["new", "in_progress", "closed"];

interface ConsultationRow {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  locale: string;
  status: string;
  created_at: string;
}

export default function AdminConsultationList({ dict, locale }: AdminConsultationListProps) {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [rows, setRows] = useState<ConsultationRow[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [rowUpdates, setRowUpdates] = useState<Record<string, RowUpdateState>>({});

  useEffect(() => {
    let active = true;
    setLoadState("loading");

    async function load() {
      let query = supabase
        .from("consultations")
        .select("id, name, email, project_type, locale, status, created_at")
        .order("created_at", { ascending: false });

      if (filter !== "all") query = query.eq("status", filter);

      const { data, error } = await query;
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
  }, [filter]);

  async function handleStatusChange(id: string, nextStatus: ConsultationStatus) {
    setRowUpdates((prev) => ({ ...prev, [id]: "updating" }));

    const { error } = await supabase.from("consultations").update({ status: nextStatus }).eq("id", id);

    if (error) {
      setRowUpdates((prev) => ({ ...prev, [id]: "error" }));
      return;
    }

    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)));
    setRowUpdates((prev) => ({ ...prev, [id]: "success" }));
  }

  return (
    <div className="glass-panel glass-panel--solid admin-panel">
      <h2>{dict.heading}</h2>
      <p className="section-lead">{dict.lead}</p>

      <div className="category-filter" role="group" aria-label={dict.heading}>
        {dict.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`category-filter__link${filter === f.id ? " is-active" : ""}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

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
                <th>{dict.columns.name}</th>
                <th>{dict.columns.email}</th>
                <th>{dict.columns.projectType}</th>
                <th>{dict.columns.locale}</th>
                <th>{dict.columns.status}</th>
                <th>{dict.columns.createdAt}</th>
                <th>{dict.columns.updateStatus}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const updateState = rowUpdates[row.id] ?? "idle";
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.project_type ?? "—"}</td>
                    <td>{row.locale.toUpperCase()}</td>
                    <td>
                      <span className={`status-pill status-pill--${row.status}`}>
                        {dict.statusLabels[row.status as "new" | "in_progress" | "closed"] ?? row.status}
                      </span>
                    </td>
                    <td>
                      {new Date(row.created_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="admin-status-update">
                        <select
                          aria-label={dict.statusUpdate.label}
                          className="admin-status-select"
                          value={row.status}
                          disabled={updateState === "updating"}
                          onChange={(event) =>
                            handleStatusChange(row.id, event.target.value as ConsultationStatus)
                          }
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
