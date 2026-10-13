/** Linhas do prompt, cada uma com a etiqueta do pilar ou técnica que a gerou. */
export default function TicPartsList({ parts }) {
  return (
    <ol className="space-y-3">
      {parts.map((part) => (
        <li key={part.id} className="space-y-1">
          <span
            className={[
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-heading text-[0.65rem] font-bold uppercase tracking-wider",
              part.letter ? "bg-primary text-ink" : "bg-accent/15 text-accent"
            ].join(" ")}
          >
            {part.letter && <span aria-hidden="true">{part.letter} ·</span>}
            {part.label}
          </span>
          <p className="font-body text-[0.95rem] leading-relaxed text-gray-800">{part.text}</p>
        </li>
      ))}
    </ol>
  );
}
