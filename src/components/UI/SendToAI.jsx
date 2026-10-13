import useCopyToClipboard from "../../hooks/useCopyToClipboard.js";
import { buildAiUrl } from "../../lib/promptTemplate.js";
import destinations from "../../data/destinos_ia.json";

const COPY_FEEDBACK = {
  idle: { icon: "⧉", label: "Copiar prompt", className: "bg-secondary text-nink hover:bg-secondary/90 focus-visible:bg-secondary/90 active:bg-secondary/80" },
  copied: { icon: "✓", label: "Copiado!", className: "bg-emerald-600 text-white" },
  error: { icon: "!", label: "Falha ao copiar", className: "bg-red-100 text-red-700" }
};

/**
 * Ações finais de um prompt: copiar ou abrir direto numa IA com o texto já preenchido.
 * `missingCount` avisa quantos campos entre colchetes ainda faltam.
 */
export default function SendToAI({ text, missingCount = 0 }) {
  const { status, copy } = useCopyToClipboard();
  const feedback = COPY_FEEDBACK[status];

  return (
    <div className="space-y-3">
      {missingCount > 0 && (
        <p className="font-body text-xs leading-relaxed text-muted">
          {missingCount === 1
            ? "Falta 1 campo entre colchetes."
            : `Faltam ${missingCount} campos entre colchetes.`}{" "}
          Preencha aqui ou complete direto no chat.
        </p>
      )}

      <button
        type="button"
        onClick={() => copy(text)}
        aria-live="polite"
        className={[
          "inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5",
          "font-heading text-sm font-bold uppercase tracking-wide",
          "transition-colors duration-150 ease-out focus-visible:outline-none",
          feedback.className
        ].join(" ")}
      >
        <span aria-hidden="true">{feedback.icon}</span>
        {feedback.label}
      </button>

      <div className="space-y-1.5">
        <p className="font-body text-xs font-semibold text-muted">Abrir direto no:</p>
        <div className="grid grid-cols-3 gap-2">
          {destinations.map((destination) => (
            <a
              key={destination.id}
              href={buildAiUrl(destination.urlTemplate, text)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 bg-white px-1 py-2 font-heading text-xs font-bold text-ink transition-colors duration-150 ease-out hover:border-primary hover:bg-primary/10 focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:outline-none active:bg-primary/20"
            >
              <img src={destination.icon} alt="" className="h-5 w-5" loading="lazy" />
              {destination.name}
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
