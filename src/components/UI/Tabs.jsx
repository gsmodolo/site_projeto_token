export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Categorias de prompts"
      className="inline-flex rounded-2xl border border-gray-200 bg-white p-1.5 shadow-card"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={[
              "rounded-xl px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide",
              "transition-colors duration-150 ease-out focus-visible:outline-none",
              isActive
                ? "bg-secondary text-gray-900 shadow-card"
                : "text-gray-600 hover:text-primary focus-visible:text-primary"
            ].join(" ")}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={[
                  "ml-2 inline-flex min-w-[1.75rem] items-center justify-center rounded-full px-2 py-0.5 text-xs",
                  isActive ? "bg-gray-900/10 text-gray-900" : "bg-gray-100 text-gray-600"
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
