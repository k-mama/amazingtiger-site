"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Dictionary } from "@/lib/i18n/types";

interface LoginFormProps {
  dict: Dictionary["auth"]["login"];
  navBase: string;
}

type Status = "idle" | "loading" | "error" | "success";

export default function LoginForm({ dict, navBase }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
  }

  return (
    <div className="auth-card">
      <span className="eyebrow">{dict.eyebrow}</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead" style={{ marginBottom: "1.75rem" }}>{dict.lead}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="login-email">{dict.emailLabel}</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div className="form-field">
          <label htmlFor="login-password">{dict.passwordLabel}</label>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
          {dict.submit}
        </button>
      </form>

      {status === "error" && <p className="status-note" style={{ marginTop: "1.25rem" }}>{errorMessage}</p>}
      {status === "success" && <p className="status-note" style={{ marginTop: "1.25rem" }}>Signed in.</p>}

      <p style={{ marginTop: "1.75rem", fontSize: "0.85rem" }}>
        {dict.switchPrompt}{" "}
        <Link href={`${navBase}${dict.switchHref}`} style={{ textDecoration: "underline" }}>
          {dict.switchCta}
        </Link>
      </p>

      <p className="status-note" style={{ marginTop: "1.75rem" }}>{dict.note}</p>
    </div>
  );
}
