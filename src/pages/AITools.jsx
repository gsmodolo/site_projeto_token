import ToolItem from "../components/UI/ToolItem.jsx";
import tools from "../data/tools.json";

export default function AITools() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="max-w-2xl space-y-3">
        <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Ferramentas de IA
        </span>
        <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          IAs gratuitas para potencializar seus estudos
        </h1>
        <p className="font-body text-base leading-relaxed text-gray-600">
          Conheça as principais plataformas de IA generativa disponíveis e quando cada
          uma se destaca na rotina de estudos.
        </p>
      </header>

      <section
        aria-label="Lista de ferramentas de Inteligência Artificial"
        className="mt-10 grid gap-6 md:grid-cols-2"
      >
        {tools.map((tool) => (
          <ToolItem
            key={tool.id}
            name={tool.name}
            url={tool.url}
            educationalUse={tool.educationalUse}
          />
        ))}
      </section>
    </div>
  );
}
