import { useId } from "react";

/** Técnica extra liga/desliga; se o modelo pede um valor, mostra o campo quando ligada. */
export default function ExtraTechnique({ extra, enabled, value, onToggle, onChange }) {
  const baseId = useId();
  const needsValue = extra.template.includes("{value}");

  return (
    <div
      className={[
        "rounded-xl border p-4 transition-colors duration-150",
        enabled ? "border-accent/40 bg-accent/5" : "border-gray-200 bg-white"
      ].join(" ")}
    >
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-describedby={`${baseId}-dica`}
        onClick={onToggle}
        className="group flex w-full items-start gap-3 text-left focus-visible:outline-none"
      >
        <span
          aria-hidden="true"
          className={[
            "mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-primary",
            enabled ? "bg-accent" : "bg-gray-300 group-hover:bg-gray-400"
          ].join(" ")}
        >
          <span
            className={[
              "h-5 w-5 rounded-full bg-white shadow transition-transform duration-150",
              enabled ? "translate-x-5" : "translate-x-0"
            ].join(" ")}
          />
        </span>
        <span className="min-w-0">
          <span className="block font-heading text-sm font-bold text-ink">{extra.name}</span>
          <span id={`${baseId}-dica`} className="block font-body text-xs leading-relaxed text-muted">
            {extra.hint}
          </span>
        </span>
      </button>

      {enabled && needsValue && (
        <div className="mt-3">
          <label htmlFor={`${baseId}-valor`} className="block font-body text-sm font-semibold text-ink/80">
            {extra.inputLabel}
          </label>
          <input
            id={`${baseId}-valor`}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={extra.placeholder}
            autoComplete="off"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-body text-base text-ink placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      )}
    </div>
  );
}
