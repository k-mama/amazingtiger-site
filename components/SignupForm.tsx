"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { supabase } from "@/lib/supabaseClient";
import type { Dictionary } from "@/lib/i18n/types";

interface SignupFormProps {
  dict: Dictionary["auth"]["signup"];
  navBase: string;
  locale: Locale;
}

type Status = "idle" | "loading" | "error" | "success";
type FieldErrors = Partial<Record<"email" | "password" | "confirmPassword", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ dict, navBase, locale }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!email.trim()) {
      errors.email = dict.errors.emailRequired;
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      errors.email = dict.errors.emailInvalid;
    }
    if (!password) {
      errors.password = dict.errors.passwordRequired;
    } else if (password.length < 8) {
      errors.password = dict.errors.passwordTooShort;
    }
    if (password && confirmPassword !== password) {
      errors.confirmPassword = dict.errors.passwordMismatch;
    }
    return errors;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${window.location.origin}/${locale}/login?confirmed=1`,
      },
    });

    if (error) {
      setStatus("error");
      const message = error.message.toLowerCase();
      if (message.includes("already registered") || message.includes("already exists")) {
        setFormError(dict.errors.alreadyRegistered);
      } else if (message.includes("rate limit")) {
        setFormError(dict.errors.generic);
      } else if (message.includes("password")) {
        setFormError(dict.errors.passwordTooShort);
      } else if (message.includes("email")) {
        setFormError(dict.errors.emailInvalid);
      } else {
        setFormError(dict.errors.generic);
      }
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="auth-card">
        <span className="eyebrow">{dict.eyebrow}</span>
        <h1>{dict.heading}</h1>
        <p className="status-note status-note--success" style={{ marginTop: "1.25rem" }}>
          {dict.success}
        </p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <span className="eyebrow">{dict.eyebrow}</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead" style={{ marginBottom: "1.75rem" }}>{dict.lead}</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="signup-name">{dict.nameLabel}</label>
          <input
            id="signup-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div className="form-field">
          <label htmlFor="signup-email">{dict.emailLabel}</label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="signup-password">{dict.passwordLabel}</label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === "loading"}
            aria-invalid={Boolean(fieldErrors.password)}
          />
          {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="signup-confirm-password">{dict.confirmPasswordLabel}</label>
          <input
            id="signup-confirm-password"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={status === "loading"}
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
          />
          {fieldErrors.confirmPassword && <p className="field-error">{fieldErrors.confirmPassword}</p>}
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
          {status === "loading" ? dict.submitting : dict.submit}
        </button>
      </form>

      {status === "error" && (
        <p className="status-note status-note--error" style={{ marginTop: "1.25rem" }}>{formError}</p>
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
