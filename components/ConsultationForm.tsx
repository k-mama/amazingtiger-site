"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { supabase } from "@/lib/supabaseClient";
import { getProductBySlug, getProductCopy } from "@/lib/shop/products";

interface ConsultationFormProps {
  dict: Dictionary["consultationPage"];
  locale: Locale;
}

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

// Index of "Shop Support" in projectTypeOptions — same position in every
// locale dictionary, since option order (not wording) is what's shared.
const SHOP_SUPPORT_OPTION_INDEX = 3;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUPLICATE_WINDOW_MS = 60_000;
const LAST_INQUIRY_KEY = "atp_consultation_last";
const MIN_ELAPSED_MS = 2500;

function inquiryFingerprint(name: string, email: string, message: string): string {
  return `${name.trim().toLowerCase()}|${email.trim().toLowerCase()}|${message.trim()}`;
}

export default function ConsultationForm({ dict, locale }: ConsultationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(dict.projectTypeOptions[0]);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [productTitle, setProductTitle] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const productSlug = params.get("product");

    if (type === "shop_support" && dict.projectTypeOptions[SHOP_SUPPORT_OPTION_INDEX]) {
      setProjectType(dict.projectTypeOptions[SHOP_SUPPORT_OPTION_INDEX]);
    }

    if (productSlug) {
      const product = getProductBySlug(productSlug);
      if (product) {
        const copy = getProductCopy(product, locale);
        setMessage(`${dict.shopInquiryPrefix}${copy.title}. `);
        setProductTitle(copy.title);
      }
    }
    // Runs once on mount to read the initial URL — intentionally ignores
    // later prop changes so it doesn't clobber what the visitor has typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = dict.errors.name;
    if (!email.trim() || !EMAIL_PATTERN.test(email.trim())) errors.email = dict.errors.email;
    if (!message.trim()) errors.message = dict.errors.message;
    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Already sent this exact inquiry a moment ago (double click, resubmit
    // after navigating back) — show the same success state without sending
    // a second copy.
    const fingerprint = inquiryFingerprint(name, email, message);
    const lastRaw = window.sessionStorage.getItem(LAST_INQUIRY_KEY);
    if (lastRaw) {
      try {
        const last = JSON.parse(lastRaw) as { fingerprint: string; time: number };
        if (last.fingerprint === fingerprint && Date.now() - last.time < DUPLICATE_WINDOW_MS) {
          setStatus("success");
          return;
        }
      } catch {
        // ignore malformed session storage value
      }
    }

    setStatus("loading");

    const honeypot = new FormData(event.currentTarget).get("company");
    const elapsedMs = Date.now() - mountedAt.current;

    // Same quiet-accept behavior as the server: a bot trips the honeypot or
    // submits faster than a human could type this form. Skip the writes
    // entirely rather than storing or emailing anything.
    if (honeypot || elapsedMs < MIN_ELAPSED_MS) {
      setStatus("success");
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: insertError } = await supabase.from("consultations").insert({
        locale,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        project_type: projectType,
        message: message.trim(),
        user_id: user?.id ?? null,
      });

      if (insertError) {
        setStatus("error");
        return;
      }

      // Best-effort admin email alert — the inquiry is already saved above,
      // so a failure here never blocks or changes the success state.
      fetch("/api/consultation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          project_type: projectType,
          message: message.trim(),
          elapsed_ms: elapsedMs,
        }),
      }).catch(() => {
        // Ignore — the inquiry is already saved.
      });

      window.sessionStorage.setItem(LAST_INQUIRY_KEY, JSON.stringify({ fingerprint, time: Date.now() }));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="status-note status-note--success" role="status">{dict.note}</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {productTitle && (
        <p className="status-note" style={{ marginBottom: "var(--space-3)" }}>
          {dict.shopInquiryPrefix}
          <strong>{productTitle}</strong>
        </p>
      )}
      <div className={`form-field${fieldErrors.name ? " has-error" : ""}`}>
        <label htmlFor="consult-name">{dict.nameLabel}</label>
        <input
          id="consult-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "consult-name-error" : undefined}
        />
        {fieldErrors.name && <p id="consult-name-error" className="field-error" role="alert">{fieldErrors.name}</p>}
      </div>
      <div className={`form-field${fieldErrors.email ? " has-error" : ""}`}>
        <label htmlFor="consult-email">{dict.emailLabel}</label>
        <input
          id="consult-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "consult-email-error" : undefined}
        />
        {fieldErrors.email && <p id="consult-email-error" className="field-error" role="alert">{fieldErrors.email}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="consult-phone">{dict.phoneLabel}</label>
        <input
          id="consult-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          disabled={status === "loading"}
        />
      </div>
      <div className="form-field">
        <label htmlFor="consult-project-type">{dict.projectTypeLabel}</label>
        <select
          id="consult-project-type"
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
          disabled={status === "loading"}
        >
          {dict.projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={`form-field${fieldErrors.message ? " has-error" : ""}`}>
        <label htmlFor="consult-message">{dict.messageLabel}</label>
        <textarea
          id="consult-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "consult-message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="consult-message-error" className="field-error" role="alert">{fieldErrors.message}</p>
        )}
      </div>

      {/* Honeypot: hidden from sighted and screen-reader users. Real visitors never fill this in. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="consult-company">Company</label>
        <input id="consult-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
        {status === "loading" ? dict.submitting : dict.submit}
      </button>
      {status === "error" && (
        <p className="status-note status-note--error" role="alert" style={{ marginTop: "1rem" }}>{dict.errorNote}</p>
      )}
      <p className="status-note" style={{ marginTop: "1rem" }}>{dict.privacyNote}</p>
    </form>
  );
}
