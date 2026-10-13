const ARROW_STEP = { ArrowLeft: -1, ArrowRight: 1 };

export default function Tabs({ tabs, activeTab, onChange }) {
  // Padrão WAI-ARIA de abas: só a ativa entra no Tab; ← → trocam de aba e movem o foco.
  function handleKeyDown(event) {
    const step = ARROW_STEP[event.key];
    if (!step) return;
    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    const next = tabs[(index + step + tabs.length) % tabs.length];
    onChange(next.id);
    event.currentTarget.querySelector(`[data-tab-id="${next.id}"]`)?.focus();
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      role="tablist"
      aria-label="Categorias de prompts"
      className="grid w-full grid-flow-col auto-cols-fr rounded-2xl border border-gray-200 bg-white p-1.5 shadow-card sm:inline-flex sm:w-auto"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={[
              "flex flex-col items-center justify-center gap-1 whitespace-nowrap rounded-xl px-1 py-2 font-heading text-[0.7rem] font-bold uppercase sm:flex-row sm:gap-0 sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-wide",
              "transition-colors duration-150 ease-out focus-visible:outline-none",
              isActive
                ? "bg-secondary text-nink shadow-card"
                : "text-ink/60 hover:text-primary focus-visible:text-primary"
            ].join(" ")}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={[
                  "inline-flex min-w-[1.75rem] items-center justify-center rounded-full px-2 py-0.5 text-xs sm:ml-2",
                  isActive ? "bg-gray-900/10 text-nink" : "bg-gray-100 text-gray-600"
                ].join(" ")}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
