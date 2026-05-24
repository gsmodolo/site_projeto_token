import { useEffect, useRef, useState } from "react";

export default function PromptCard({ title, description, promptText, category }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(promptText);
      } else {
        throw new Error("Clipboard API indisponível");
      }
      setError(false);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
      setError(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setError(false), 2500);
    }
  }

  const buttonLabel = error ? "Falha ao copiar" : copied ? "Copiado!" : "Copiar prompt";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-shadow duration-200 ease-out hover:shadow-cardHover">
      {category && (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 font-heading text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
          {category}
        </span>
      )}

      <h3 className="font-heading text-lg font-bold leading-snug text-gray-900">
        {title}
      </h3>

      <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <div className="mt-4 flex-1">
        <pre className="max-h-44 overflow-y-auto whitespace-pre-line rounded-xl border border-gray-100 bg-gray-50 p-4 font-body text-[0.85rem] leading-relaxed text-gray-700">
          {promptText}
        </pre>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className={[
          "mt-5 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5",
          "font-heading text-sm font-bold uppercase tracking-wide",
          "transition-colors duration-150 ease-out focus-visible:outline-none",
          error
            ? "bg-red-100 text-red-700"
            : copied
            ? "bg-emerald-500 text-white"
            : "bg-secondary text-gray-900 hover:bg-amber-400 focus-visible:bg-amber-400"
        ].join(" ")}
      >
        <span aria-hidden="true">
          {error ? "!" : copied ? "✓" : "⧉"}
        </span>
        {buttonLabel}
      </button>
    </article>
  );
}
