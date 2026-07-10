"use client";

import { useState } from "react";
import { findDiscountCode } from "@/lib/shop/discounts";

export interface DiscountCodeFormDict {
  label: string;
  placeholder: string;
  apply: string;
  remove: string;
  invalid: string;
  appliedLabel: string;
}

interface DiscountCodeFormProps {
  appliedCode: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
  dict: DiscountCodeFormDict;
  disabled?: boolean;
}

export default function DiscountCodeForm({ appliedCode, onApply, onRemove, dict, disabled }: DiscountCodeFormProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleApply() {
    const found = findDiscountCode(input);
    if (!found) {
      setError(dict.invalid);
      return;
    }
    setError(null);
    setInput("");
    onApply(found.code);
  }

  if (appliedCode) {
    return (
      <div className="discount-code discount-code--applied">
        <span>{dict.appliedLabel.replace("{code}", appliedCode)}</span>
        <button type="button" className="btn-link" onClick={onRemove} disabled={disabled}>
          {dict.remove}
        </button>
      </div>
    );
  }

  return (
    <div className="discount-code">
      <label htmlFor="discount-code-input">{dict.label}</label>
      <div className="discount-code__row">
        <input
          id="discount-code-input"
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            if (error) setError(null);
          }}
          placeholder={dict.placeholder}
          disabled={disabled}
        />
        <button type="button" className="btn btn-secondary" onClick={handleApply} disabled={disabled || !input.trim()}>
          {dict.apply}
        </button>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
