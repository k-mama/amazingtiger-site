"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import AdminConsultationList from "./AdminConsultationList";

interface AdminViewProps {
  dict: Dictionary["admin"];
  navBase: string;
  locale: Locale;
}

type ViewState = "checking" | "loggedOut" | "notAuthorized" | "admin";

export default function AdminView({ dict, navBase, locale }: AdminViewProps) {
  const [state, setState] = useState<ViewState>("checking");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!active) return;

      if (!data.user) {
        setState("loggedOut");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (!active) return;
      setState(profile?.role === "admin" ? "admin" : "notAuthorized");
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  if (state === "checking") {
    return <div className="container protected-page" />;
  }

  if (state === "loggedOut") {
    return (
      <div className="container protected-page">
        <span className="protected-badge">{dict.loggedOut.badge}</span>
        <h1>{dict.loggedOut.heading}</h1>
        <p className="section-lead">{dict.loggedOut.lead}</p>
        <Link href={`${navBase}/login`} className="btn btn-primary" style={{ marginTop: "var(--space-3)" }}>
          {dict.loggedOut.cta}
        </Link>
      </div>
    );
  }

  if (state === "notAuthorized") {
    return (
      <div className="container protected-page">
        <span className="protected-badge">{dict.notAuthorized.badge}</span>
        <h1>{dict.notAuthorized.heading}</h1>
        <p className="section-lead">{dict.notAuthorized.lead}</p>
        <Link href={`${navBase}/dashboard`} className="btn btn-primary" style={{ marginTop: "var(--space-3)" }}>
          {dict.notAuthorized.cta}
        </Link>
      </div>
    );
  }

  return (
    <div className="container protected-page">
      <span className="protected-badge">{dict.eyebrow}</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead">{dict.lead}</p>

      <div className="info-grid">
        {dict.sections.map((section) => (
          <div key={section.title} className="info-card">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "var(--space-4)" }}>
        <AdminConsultationList dict={dict.consultations} locale={locale} />
      </div>

      <p className="status-note" style={{ marginTop: "var(--space-4)" }}>{dict.note}</p>
    </div>
  );
}
