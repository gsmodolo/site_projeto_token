import { useMemo, useState } from "react";
import Tabs from "../components/UI/Tabs.jsx";
import PromptCard from "../components/UI/PromptCard.jsx";
import SearchField from "../components/UI/SearchField.jsx";
import useFavorites from "../hooks/useFavorites.js";
import { matchesTerms, queryTerms } from "../lib/search.js";
import promptsEstudos from "../data/prompts_estudos.json";
import promptsVestibulares from "../data/prompts_vestibulares.json";

const TAB_ESTUDOS = "estudos";
const TAB_VESTIBULARES = "vestibulares";
const TAB_FAVORITOS = "favoritos";

const ALL_PROMPTS = [...promptsEstudos, ...promptsVestibulares];

const datasets = {
  [TAB_ESTUDOS]: {
    label: "Estudos",
    headline: "Prompts para destravar o estudo do dia a dia",
    helper:
      "Toque nos campos destacados para completar com o seu contexto e abra direto na IA, ou copie e cole no seu LLM favorito."
  },
  [TAB_VESTIBULARES]: {
    label: "Vestibulares",
    headline: "Prompts focados em vestibular e provas de seleção",
    helper:
      "Construídos para simular bancas, corrigir redações e organizar o tempo de prova com inteligência."
  },
  [TAB_FAVORITOS]: {
    label: "★ Favoritos",
    headline: "Seus prompts favoritos",
    helper: "Toque na estrela de um prompt para guardá-lo aqui. Os favoritos ficam salvos neste navegador."
  }
};

function promptFields(prompt) {
  return [prompt.title, prompt.description, prompt.promptText];
}

export default function PromptBank() {
  const [activeTab, setActiveTab] = useState(TAB_ESTUDOS);
  const [query, setQuery] = useState("");
  const { favoriteIds, toggleFavorite } = useFavorites();

  const terms = useMemo(() => queryTerms(query), [query]);

  const itemsByTab = useMemo(() => {
    const favorites = new Set(favoriteIds);
    const matches = (prompt) => matchesTerms(promptFields(prompt), terms);
    return {
      [TAB_ESTUDOS]: promptsEstudos.filter(matches),
      [TAB_VESTIBULARES]: promptsVestibulares.filter(matches),
      [TAB_FAVORITOS]: ALL_PROMPTS.filter((prompt) => favorites.has(prompt.id) && matches(prompt))
    };
  }, [terms, favoriteIds]);

  const tabs = Object.entries(datasets).map(([id, value]) => ({
    id,
    label: value.label,
    count: itemsByTab[id].length
  }));

  const current = datasets[activeTab];
  const items = itemsByTab[activeTab];
  const isSearching = terms.length > 0;
  const tabWithResults = tabs.find((tab) => tab.id !== activeTab && tab.count > 0);

  return (
    <div className="container-page py-12 md:py-16">
      <header className="space-y-3">
        <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Banco de Prompts
        </span>
        <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">{current.headline}</h1>
        <p className="max-w-2xl font-body text-base leading-relaxed text-ink/60">{current.helper}</p>
      </header>

      <div className="mt-8 space-y-4">
        <SearchField
          value={query}
          onChange={setQuery}
          label="Buscar prompts"
          placeholder="Buscar: redação, resumo…"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <p aria-live="polite" className="font-body text-sm text-gray-500">
            <span className="font-bold text-gray-800">{items.length}</span>{" "}
            {isSearching
              ? `${items.length === 1 ? "resultado" : "resultados"} para “${query.trim()}” nesta aba`
              : `${items.length === 1 ? "prompt" : "prompts"} nesta categoria`}
          </p>
        </div>
      </div>

      {items.length > 0 ? (
        <section
          role="tabpanel"
          aria-label={`Prompts de ${current.label}`}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((prompt) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              promptText={prompt.promptText}
              category={prompt.category}
              isFavorite={favoriteIds.includes(prompt.id)}
              onToggleFavorite={() => toggleFavorite(prompt.id)}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          isSearching={isSearching}
          isFavoritesTab={activeTab === TAB_FAVORITOS}
          query={query.trim()}
          suggestion={isSearching ? tabWithResults : null}
          onShowTab={setActiveTab}
          onClear={() => setQuery("")}
        />
      )}
    </div>
  );
}

const emptyActionClass =
  "inline-flex items-center justify-center rounded-lg border-2 border-primary px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-primary focus-visible:bg-primary active:bg-primary/80";

function EmptyState({ isSearching, isFavoritesTab, query, suggestion, onShowTab, onClear }) {
  let message;
  if (isSearching) message = `Nenhum prompt com “${query}” nesta aba.`;
  else if (isFavoritesTab) message = "Você ainda não tem favoritos. Toque na ☆ de um prompt para guardá-lo aqui.";
  else message = "Nenhum prompt nesta categoria.";

  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
      <p className="max-w-md font-body text-base text-gray-600">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {suggestion && (
          <button type="button" onClick={() => onShowTab(suggestion.id)} className={emptyActionClass}>
            Ver {suggestion.count} em {suggestion.label}
          </button>
        )}
        {isSearching && (
          <button type="button" onClick={onClear} className={emptyActionClass}>
            Limpar busca
          </button>
        )}
      </div>
    </div>
  );
}
