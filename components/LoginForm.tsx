"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Dictionary } from "@/lib/i18n/types";

interface LoginFormProps {
  dict: Dictionary["auth"]["login"];
  navBase: string;
}

type Status = "idle" | "loading" | "error" | "success";
type FieldErrors = Partial<Record<"email" | "password", string>>;

export default function LoginForm({ dict, navBase }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [justConfirmed, setJustConfirmed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setJustConfirmed(params.get("confirmed") === "1");
  }, []);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!email.trim()) errors.email = dict.errors.emailRequired;
    if (!password) errors.password = dict.errors.passwordRequired;
    return errors;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (error) {
      setStatus("error");
      const message = error.message.toLowerCase();
      if (message.includes("email not confirmed") || message.includes("email is not confirmed")) {
        setFormError(dict.errors.emailNotConfirmed);
      } else if (message.includes("invalid login credentials")) {
        setFormError(dict.errors.invalidCredentials);
      } else {
        setFormError(dict.errors.generic);
      }
      return;
    }

    setStatus("success");
    router.push(`${navBase}/dashboard`);
  }

  return (
    <div className="auth-card">
      <span className="eyebrow">{dict.eyebrow}</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead" style={{ marginBottom: "1.75rem" }}>{dict.lead}</p>

      {justConfirmed && (
        <p className="status-note status-note--success" role="status" style={{ marginBottom: "1.5rem" }}>
          {dict.confirmedBanner}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">{dict.emailLabel}</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
          />
          {fieldErrors.email && <p id="login-email-error" className="field-error" role="alert">{fieldErrors.email}</p>}
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
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
          />
          {fieldErrors.password && (
            <p id="login-password-error" className="field-error" role="alert">{fieldErrors.password}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
          {status === "loading" ? dict.submitting : dict.submit}
        </button>
      </form>

      {status === "error" && (
        <p className="status-note status-note--error" role="alert" style={{ marginTop: "1.25rem" }}>{formError}</p>
      )}

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
