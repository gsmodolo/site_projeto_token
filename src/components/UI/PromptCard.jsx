import { useEffect, useId, useState } from "react";
import usePromptTemplate from "../../hooks/usePromptTemplate.js";
import PromptPreview from "./PromptPreview.jsx";
import PromptFields, { slotInputId } from "./PromptFields.jsx";
import SendToAI from "./SendToAI.jsx";

export default function PromptCard({ title, description, promptText, category }) {
  const baseId = useId();
  const panelId = `${baseId}-campos`;
  const { segments, slots, values, setValue, filledText, missingCount } =
    usePromptTemplate(promptText);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingFocus, setPendingFocus] = useState(null);

  // Foca o campo só depois que o painel aparece no DOM.
  useEffect(() => {
    if (pendingFocus === null) return;
    document.getElementById(slotInputId(baseId, pendingFocus))?.focus();
    setPendingFocus(null);
  }, [pendingFocus, baseId]);

  function focusSlot(index) {
    setIsEditing(true);
    setPendingFocus(index);
  }

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-shadow duration-200 ease-out hover:shadow-cardHover">
      {category && (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 font-heading text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
          {category}
        </span>
      )}

      <h3 className="font-heading text-lg font-bold leading-snug text-gray-900">{title}</h3>

      <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">{description}</p>

      <div className="mt-4 flex-1 space-y-3">
        <PromptPreview segments={segments} values={values} onSlotClick={focusSlot} />

        {slots.length > 0 && (
          <button
            type="button"
            onClick={() => setIsEditing((open) => !open)}
            aria-expanded={isEditing}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-secondary transition-colors hover:text-ink focus-visible:text-ink active:text-ink/70"
          >
            <span aria-hidden="true">{isEditing ? "▾" : "✎"}</span>
            {isEditing ? "Ocultar campos" : `Preencher campos (${slots.length})`}
          </button>
        )}

        {isEditing && (
          <div id={panelId} className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <PromptFields baseId={baseId} slots={slots} values={values} onChange={setValue} />
          </div>
        )}
      </div>

      <div className="mt-5">
        <SendToAI text={filledText} missingCount={isEditing ? missingCount : 0} />
      </div>
    </article>
  );
}
