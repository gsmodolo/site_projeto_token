import { useId } from "react";

/** Campo de busca controlado, com botão de limpar. */
export default function SearchField({ value, onChange, label, placeholder }) {
  const inputId = useId();

  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="9" r="6" />
          <path d="m13.5 13.5 4 4" strokeLinecap="round" />
        </svg>
      </span>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === "Escape" && onChange("")}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-12 font-body text-base text-ink shadow-card placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-ink/50 transition-colors hover:bg-gray-100 hover:text-ink focus-visible:bg-gray-100 focus-visible:text-ink active:bg-gray-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}
