export function slotInputId(baseId, index) {
  return `${baseId}-campo-${index}`;
}

/** Um campo de texto por colchete. Rótulos repetidos mostram o trecho ao redor. */
export default function PromptFields({ baseId, slots, values, onChange }) {
  return (
    <div className="space-y-3">
      {slots.map((slot) => {
        const inputId = slotInputId(baseId, slot.index);
        return (
          <div key={slot.index}>
            <label htmlFor={inputId} className="block">
              <span className="block font-body text-sm font-semibold leading-snug text-ink/80 first-letter:uppercase">
                {slot.label}
              </span>
              {slot.context && (
                <span className="block font-body text-xs italic text-muted">“{slot.context}”</span>
              )}
            </label>
            <input
              id={inputId}
              type="text"
              value={values[slot.index]}
              onChange={(event) => onChange(slot.index, event.target.value)}
              placeholder="Digite aqui"
              autoComplete="off"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-body text-base text-ink placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        );
      })}
    </div>
  );
}
