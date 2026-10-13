import TicPartsList from "./TicPartsList.jsx";

/** "Antes e depois": o prompt genérico ao lado do mesmo pedido com T.I.C. */
export default function PromptComparison({ comparison, goodParts }) {
  const { heading, bad, good } = comparison;

  return (
    <section aria-labelledby="comparacao-titulo" className="space-y-6">
      <h2 id="comparacao-titulo" className="font-heading text-2xl font-bold text-ink md:text-3xl">
        {heading}
      </h2>

      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <article className="flex flex-col gap-4 self-start rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <span className="w-fit rounded-full bg-gray-100 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-gray-600">
            ✗ {bad.label}
          </span>
          <p className="rounded-2xl bg-gray-900 px-5 py-4 font-body text-lg text-white">{bad.text}</p>
        </article>

        <article className="flex flex-col gap-4 rounded-2xl border border-primary/40 bg-white p-6 shadow-cardHover">
          <span className="w-fit rounded-full bg-primary px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-ink">
            ✓ {good.label}
          </span>
          <div className="rounded-2xl bg-gray-50 p-5">
            <TicPartsList parts={goodParts} />
          </div>
        </article>
      </div>
    </section>
  );
}
