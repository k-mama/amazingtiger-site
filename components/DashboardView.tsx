"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Dictionary } from "@/lib/i18n/types";

interface DashboardViewProps {
  dict: Dictionary["dashboard"];
  navBase: string;
}

type ViewState = "checking" | "loggedOut" | "loggedIn";

export default function DashboardView({ dict, navBase }: DashboardViewProps) {
  const router = useRouter();
  const [state, setState] = useState<ViewState>("checking");
  const [email, setEmail] = useState("");
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
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (active && profile) setRole(profile.role);
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

  const roleLabel = role === "admin" ? "Admin" : dict.loggedIn.statusValue;

  return (
    <div className="container protected-page">
      <span className="protected-badge">{dict.eyebrow}</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead">{dict.lead}</p>

      <div className="glass-panel glass-panel--solid" style={{ padding: "var(--space-3)", marginTop: "var(--space-3)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)" }}>
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

      <div className="info-grid">
        {dict.cards.map((card) => (
          <div key={card.title} className="info-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <p className="status-note" style={{ marginTop: "var(--space-4)" }}>{dict.note}</p>
    </div>
  );
}
