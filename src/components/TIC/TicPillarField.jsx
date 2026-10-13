import { useId } from "react";

/** Um pilar do T.I.C.: letra, pergunta-guia e campo de texto. */
export default function TicPillarField({ pillar, value, onChange }) {
  const inputId = useId();
  const isFilled = value.trim().length > 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-2xl font-extrabold transition-colors duration-200",
            isFilled ? "bg-primary text-ink" : "bg-primary/15 text-primary"
          ].join(" ")}
        >
          {pillar.letter}
        </span>
        <label htmlFor={inputId} className="block min-w-0 font-heading text-lg font-bold leading-tight text-ink">
          {pillar.name}
          <span className="block font-body text-sm font-semibold text-ink/70">{pillar.question}</span>
        </label>
      </div>
      <textarea
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={pillar.placeholder}
        rows={2}
        className="mt-4 w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 font-body text-base leading-relaxed text-ink placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
