"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import AdminConsultationList from "./AdminConsultationList";
import AdminOrdersList from "./AdminOrdersList";
import ProtectedStateCard from "./ProtectedStateCard";

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
    return <ProtectedStateCard lead={dict.checking} />;
  }

  if (state === "loggedOut") {
    return (
      <ProtectedStateCard
        badge={dict.loggedOut.badge}
        heading={dict.loggedOut.heading}
        lead={dict.loggedOut.lead}
        ctaLabel={dict.loggedOut.cta}
        ctaHref={`${navBase}/login`}
      />
    );
  }

  if (state === "notAuthorized") {
    return (
      <ProtectedStateCard
        badge={dict.notAuthorized.badge}
        heading={dict.notAuthorized.heading}
        lead={dict.notAuthorized.lead}
        ctaLabel={dict.notAuthorized.cta}
        ctaHref={`${navBase}/dashboard`}
      />
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

      <div style={{ marginTop: "var(--space-4)" }}>
        <AdminOrdersList dict={dict.orders} locale={locale} />
      </div>

      <p className="status-note" style={{ marginTop: "var(--space-4)" }}>{dict.note}</p>
    </div>
  );
}
