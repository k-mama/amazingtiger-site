"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/types";

interface ConsultationFormProps {
  dict: Dictionary["consultationPage"];
}

export default function ConsultationForm({ dict }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // Not yet connected to Supabase / Cloudflare Pages Functions.
    // See functions/api/consultation.ts for the server-side skeleton.
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="status-note">{dict.note}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="consult-name">{dict.nameLabel}</label>
        <input id="consult-name" type="text" name="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="consult-email">{dict.emailLabel}</label>
        <input id="consult-email" type="email" name="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="consult-phone">{dict.phoneLabel}</label>
        <input id="consult-phone" type="tel" name="phone" />
      </div>
      <div className="form-field">
        <label htmlFor="consult-project-type">{dict.projectTypeLabel}</label>
        <select id="consult-project-type" name="project_type" defaultValue={dict.projectTypeOptions[0]}>
          {dict.projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="consult-message">{dict.messageLabel}</label>
        <textarea id="consult-message" name="message" required />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        {dict.submit}
      </button>
    </form>
  );
}
