import { slotValue } from "../../lib/promptTemplate.js";

/**
 * Texto do prompt com os campos destacados. Campos vazios mostram o rótulo;
 * preenchidos mostram o valor. Clicar num campo chama `onSlotClick(index)`.
 */
export default function PromptPreview({ segments, values, onSlotClick }) {
  return (
    <div className="max-h-52 overflow-y-auto whitespace-pre-line rounded-xl border border-gray-100 bg-gray-50 p-4 font-body text-[0.85rem] leading-relaxed text-gray-700">
      {segments.map((segment, position) => {
        if (segment.type === "text") return <span key={position}>{segment.value}</span>;

        const value = slotValue(values, segment.index);
        return (
          <button
            key={position}
            type="button"
            onClick={() => onSlotClick(segment.index)}
            aria-label={`Preencher campo: ${segment.label}`}
            className={[
              "inline rounded px-1 text-left font-semibold [box-decoration-break:clone] [-webkit-box-decoration-break:clone] transition-colors duration-150 focus-visible:outline-none",
              value
                ? "bg-accent/10 text-accent hover:bg-accent/20 focus-visible:bg-accent/20"
                : "bg-primary/25 text-ink hover:bg-primary/40 focus-visible:bg-primary/40 active:bg-primary/50"
            ].join(" ")}
          >
            {value ?? `[${segment.label}]`}
          </button>
        );
      })}
    </div>
  );
}
