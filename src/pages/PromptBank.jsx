import { useMemo, useState } from "react";
import Tabs from "../components/UI/Tabs.jsx";
import PromptCard from "../components/UI/PromptCard.jsx";
import promptsEstudos from "../data/prompts_estudos.json";
import promptsVestibulares from "../data/prompts_vestibulares.json";

const TAB_ESTUDOS = "estudos";
const TAB_VESTIBULARES = "vestibulares";

const datasets = {
  [TAB_ESTUDOS]: {
    label: "Estudos",
    items: promptsEstudos,
    headline: "Prompts para destravar o estudo do dia a dia",
    helper:
      "Selecione, copie e cole no seu LLM favorito. Lembre de substituir os campos entre colchetes pelo seu contexto real."
  },
  [TAB_VESTIBULARES]: {
    label: "Vestibulares",
    items: promptsVestibulares,
    headline: "Prompts focados em vestibular e provas de seleção",
    helper:
      "Construídos para simular bancas, corrigir redações e organizar o tempo de prova com inteligência."
  }
};

export default function PromptBank() {
  const [activeTab, setActiveTab] = useState(TAB_ESTUDOS);

  const tabs = useMemo(
    () =>
      Object.entries(datasets).map(([id, value]) => ({
        id,
        label: value.label,
        count: value.items.length
      })),
    []
  );

  const current = datasets[activeTab];

  return (
    <div className="container-page py-12 md:py-16">
      <header className="space-y-3">
        <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Banco de Prompts
        </span>
        <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          {current.headline}
        </h1>
        <p className="max-w-2xl font-body text-base leading-relaxed text-gray-600">
          {current.helper}
        </p>
      </header>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <p className="font-body text-sm text-gray-500">
          <span className="font-bold text-gray-800">{current.items.length}</span> prompts
          disponíveis nesta categoria
        </p>
      </div>

      <section
        role="tabpanel"
        aria-label={`Prompts de ${current.label}`}
        className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {current.items.map((prompt) => (
          <PromptCard
            key={prompt.id}
            title={prompt.title}
            description={prompt.description}
            promptText={prompt.promptText}
            category={prompt.category}
          />
        ))}
      </section>
    </div>
  );
}
