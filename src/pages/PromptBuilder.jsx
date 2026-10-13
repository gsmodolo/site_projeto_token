import { useMemo, useReducer, useRef } from "react";
import tic from "../data/tic.json";
import {
  buildTicPrompt,
  exampleTicState,
  initialTicState,
  ticPromptParts,
  ticReducer
} from "../lib/ticPrompt.js";
import PromptComparison from "../components/TIC/PromptComparison.jsx";
import TicPillarField from "../components/TIC/TicPillarField.jsx";
import ExtraTechnique from "../components/TIC/ExtraTechnique.jsx";
import PromptStrength from "../components/TIC/PromptStrength.jsx";
import TicPartsList from "../components/TIC/TicPartsList.jsx";
import SendToAI from "../components/UI/SendToAI.jsx";
import useInView from "../hooks/useInView.js";

const { header, comparison, builder, pillars, extras, strength } = tic;
const EXAMPLE_PARTS = ticPromptParts(exampleTicState(tic), tic);

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-lg border-2 px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-colors duration-150";

export default function PromptBuilder() {
  const [state, dispatch] = useReducer(ticReducer, tic, initialTicState);
  const previewRef = useRef(null);
  const isPreviewVisible = useInView(previewRef);

  const parts = useMemo(() => ticPromptParts(state, tic), [state]);
  const promptText = useMemo(() => buildTicPrompt(state, tic), [state]);
  const filledPillarIds = useMemo(
    () => new Set(pillars.filter((pillar) => state.pillars[pillar.id].trim()).map((p) => p.id)),
    [state]
  );

  return (
    <div className="container-page space-y-16 py-12 md:py-16">
      <section aria-labelledby="montar-titulo" className="space-y-6">
        <header className="max-w-3xl space-y-3">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
            {header.tag}
          </span>
          <h1 id="montar-titulo" className="font-heading text-3xl font-bold text-ink md:text-4xl">
            {header.title}
          </h1>
          <p className="font-body text-base leading-relaxed text-gray-600">{header.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => dispatch({ type: "fillExample", config: tic })}
              className={`${secondaryButtonClass} border-primary text-ink hover:bg-primary focus-visible:bg-primary active:bg-primary/80`}
            >
              {builder.exampleButton}
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "reset", config: tic })}
              className={`${secondaryButtonClass} border-gray-300 text-gray-600 hover:border-gray-400 hover:text-ink focus-visible:border-gray-400 focus-visible:text-ink active:bg-gray-100`}
            >
              {builder.resetButton}
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="space-y-4">
            {pillars.map((pillar) => (
              <TicPillarField
                key={pillar.id}
                pillar={pillar}
                value={state.pillars[pillar.id]}
                onChange={(value) => dispatch({ type: "setPillar", id: pillar.id, value })}
              />
            ))}

            {/* Recolhido por padrão: o essencial é o T.I.C.; os extras ficam para quem quiser. */}
            <details className="group rounded-2xl border border-gray-200 bg-white shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 font-heading text-base font-bold text-ink transition-colors hover:bg-gray-50 focus-visible:bg-gray-50 active:bg-gray-100 [&::-webkit-details-marker]:hidden">
                {builder.extrasHeading}
                <span aria-hidden="true" className="text-primary transition-transform duration-150 group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <div className="space-y-3 px-5 pb-5">
                {extras.map((extra) => (
                  <ExtraTechnique
                    key={extra.id}
                    extra={extra}
                    enabled={state.extras[extra.id].enabled}
                    value={state.extras[extra.id].value}
                    onToggle={() => dispatch({ type: "toggleExtra", id: extra.id })}
                    onChange={(value) => dispatch({ type: "setExtraValue", id: extra.id, value })}
                  />
                ))}
              </div>
            </details>
          </div>

          <aside
            ref={previewRef}
            id="seu-prompt"
            aria-labelledby="preview-titulo"
            className="scroll-mt-24 space-y-5 rounded-2xl border border-primary/40 bg-white p-6 shadow-floating lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
          >
            <h3 id="preview-titulo" className="font-heading text-lg font-bold text-ink">
              {builder.previewHeading}
            </h3>
            <PromptStrength pillars={pillars} filledIds={filledPillarIds} labels={strength} />

            <div className="max-h-[45vh] overflow-y-auto rounded-xl bg-gray-50 p-4 lg:max-h-[calc(100vh-27rem)]">
              {parts.length > 0 ? (
                <TicPartsList parts={parts} />
              ) : (
                <p className="font-body text-sm italic text-muted">{builder.emptyPreview}</p>
              )}
            </div>

            {promptText && <SendToAI text={promptText} />}
          </aside>
        </div>
      </section>

      <PromptComparison comparison={comparison} goodParts={EXAMPLE_PARTS} />

      {/* Celular: o preview fica abaixo do formulário, então um atalho flutuante leva até ele. */}
      {promptText && !isPreviewVisible && (
        <a
          href="#seu-prompt"
          className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl bg-secondary px-5 py-3 font-heading text-sm font-bold uppercase tracking-wide text-nink shadow-floating transition-colors hover:bg-secondary/90 focus-visible:bg-secondary/90 active:bg-secondary/80 lg:hidden"
        >
          <span className="flex gap-1" aria-hidden="true">
            {pillars.map((pillar) => (
              <span
                key={pillar.id}
                className={[
                  "flex h-6 w-6 items-center justify-center rounded text-xs",
                  filledPillarIds.has(pillar.id) ? "bg-primary text-ink" : "bg-white/20 text-nink/70"
                ].join(" ")}
              >
                {pillar.letter}
              </span>
            ))}
          </span>
          <span>
            Ver meu prompt <span aria-hidden="true">↓</span>
          </span>
        </a>
      )}
    </div>
  );
}
