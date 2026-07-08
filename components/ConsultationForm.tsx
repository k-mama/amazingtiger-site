"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { supabase } from "@/lib/supabaseClient";

interface ConsultationFormProps {
  dict: Dictionary["consultationPage"];
  locale: Locale;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ConsultationForm({ dict, locale }: ConsultationFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const formData = new FormData(event.currentTarget);
    const { error } = await supabase.from("consultations").insert({
      locale,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      project_type: formData.get("project_type"),
      message: formData.get("message"),
    });

    setStatus(error ? "error" : "success");
  }

  if (status === "success") {
    return <p className="status-note">{dict.note}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="consult-name">{dict.nameLabel}</label>
        <input id="consult-name" type="text" name="name" required disabled={status === "loading"} />
      </div>
      <div className="form-field">
        <label htmlFor="consult-email">{dict.emailLabel}</label>
        <input id="consult-email" type="email" name="email" required disabled={status === "loading"} />
      </div>
      <div className="form-field">
        <label htmlFor="consult-phone">{dict.phoneLabel}</label>
        <input id="consult-phone" type="tel" name="phone" disabled={status === "loading"} />
      </div>
      <div className="form-field">
        <label htmlFor="consult-project-type">{dict.projectTypeLabel}</label>
        <select
          id="consult-project-type"
          name="project_type"
          defaultValue={dict.projectTypeOptions[0]}
          disabled={status === "loading"}
        >
          {dict.projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="consult-message">{dict.messageLabel}</label>
        <textarea id="consult-message" name="message" required disabled={status === "loading"} />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
        {dict.submit}
      </button>
      {status === "error" && <p className="status-note" style={{ marginTop: "1rem" }}>{dict.errorNote}</p>}
    </form>
  );
}
