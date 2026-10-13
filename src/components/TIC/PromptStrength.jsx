/** Medidor de quantos pilares do T.I.C. foram preenchidos. */
export default function PromptStrength({ pillars, filledIds, labels }) {
  const filledCount = filledIds.size;

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5" aria-hidden="true">
        {pillars.map((pillar) => (
          <span
            key={pillar.id}
            className={[
              "flex h-7 flex-1 items-center justify-center rounded-md font-heading text-xs font-extrabold transition-colors duration-200",
              filledIds.has(pillar.id) ? "bg-primary text-ink" : "bg-gray-200 text-gray-500"
            ].join(" ")}
          >
            {pillar.letter}
          </span>
        ))}
      </div>
      <p aria-live="polite" className="font-body text-sm font-semibold text-ink/80">
        <span className="sr-only">
          {filledCount} de {pillars.length} pilares preenchidos.{" "}
        </span>
        {labels[filledCount]}
      </p>
    </div>
  );
}
