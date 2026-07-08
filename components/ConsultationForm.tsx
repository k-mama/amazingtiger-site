"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { supabase } from "@/lib/supabaseClient";
import { getProductBySlug, getProductCopy } from "@/lib/shop/products";

interface ConsultationFormProps {
  dict: Dictionary["consultationPage"];
  locale: Locale;
}

type Status = "idle" | "loading" | "success" | "error";

// Index of "Shop Support" in projectTypeOptions — same position in every
// locale dictionary, since option order (not wording) is what's shared.
const SHOP_SUPPORT_OPTION_INDEX = 3;

export default function ConsultationForm({ dict, locale }: ConsultationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = useState(dict.projectTypeOptions[0]);
  const [message, setMessage] = useState("");

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
      }
    }
    // Runs once on mount to read the initial URL — intentionally ignores
    // later prop changes so it doesn't clobber what the visitor has typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="form-field">
        <label htmlFor="consult-message">{dict.messageLabel}</label>
        <textarea
          id="consult-message"
          name="message"
          required
          disabled={status === "loading"}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
        {dict.submit}
      </button>
      {status === "error" && <p className="status-note" style={{ marginTop: "1rem" }}>{dict.errorNote}</p>}
    </form>
  );
}
