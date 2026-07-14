"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import MyConsultationsList from "./MyConsultationsList";
import MyOrdersList from "./MyOrdersList";
import ProtectedStateCard from "./ProtectedStateCard";

interface DashboardViewProps {
  dict: Dictionary["dashboard"];
  navBase: string;
  locale: Locale;
}

type ViewState = "checking" | "loggedOut" | "loggedIn";

export default function DashboardView({ dict, navBase, locale }: DashboardViewProps) {
  const router = useRouter();
  const [state, setState] = useState<ViewState>("checking");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!active) return;

      if (!data.user) {
        setState("loggedOut");
        return;
      }

      setEmail(data.user.email ?? "");
      setState("loggedIn");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, display_name")
        .eq("id", data.user.id)
        .single();

      if (!active || !profile) return;
      setRole(profile.role);
      setDisplayName(profile.display_name ?? "");
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push(`${navBase}/login`);
  }

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

  const roleLabel = role === "admin" ? "Admin" : dict.loggedIn.statusValue;

  return (
    <div className="container protected-page">
      <span className="protected-badge">{dict.eyebrow}</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead">{dict.lead}</p>

      <div className="glass-panel glass-panel--solid" style={{ padding: "var(--space-3)", marginTop: "var(--space-3)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)" }}>
        {displayName && (
          <div>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>{dict.loggedIn.nameLabel}</p>
            <p style={{ margin: 0, fontWeight: 500 }}>{displayName}</p>
          </div>
        )}
        <div>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>{dict.loggedIn.signedInAs}</p>
          <p style={{ margin: 0, fontWeight: 500 }}>{email}</p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>{dict.loggedIn.statusLabel}</p>
          <p style={{ margin: 0, fontWeight: 500 }}>{roleLabel}</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleLogout}
          disabled={signingOut}
        >
          {dict.loggedIn.logout}
        </button>
      </div>

      <div style={{ marginTop: "var(--space-4)" }}>
        <MyOrdersList dict={dict.myOrders} locale={locale} navBase={navBase} />
      </div>

      <div style={{ marginTop: "var(--space-4)" }}>
        <MyConsultationsList dict={dict.myConsultations} locale={locale} navBase={navBase} />
      </div>

      <p className="status-note" style={{ marginTop: "var(--space-4)" }}>{dict.note}</p>
    </div>
  );
}
