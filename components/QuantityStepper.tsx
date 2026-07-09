interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
  max?: number;
}

export default function QuantityStepper({ value, onChange, label, min = 1, max = 9 }: QuantityStepperProps) {
  return (
    <div className="qty-stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="qty-stepper__btn"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="qty-stepper__value">{value}</span>
      <button
        type="button"
        className="qty-stepper__btn"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
