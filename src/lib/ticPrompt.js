// Estado e montagem do prompt da técnica T.I.C. (Tarefa, Instruções, Contexto) + técnicas extras.
// Tudo puro: o texto, a ordem e os modelos vêm de data/tic.json.

const VALUE_TOKEN = "{value}";

function emptyExtras(config) {
  return Object.fromEntries(config.extras.map((extra) => [extra.id, { enabled: false, value: "" }]));
}

export function initialTicState(config) {
  return {
    pillars: Object.fromEntries(config.pillars.map((pillar) => [pillar.id, ""])),
    extras: emptyExtras(config)
  };
}

/** Estado com o exemplo da palestra: pilares e extras que têm `example` no JSON. */
export function exampleTicState(config) {
  return {
    pillars: Object.fromEntries(config.pillars.map((pillar) => [pillar.id, pillar.example ?? ""])),
    extras: Object.fromEntries(
      config.extras.map((extra) => [
        extra.id,
        { enabled: Boolean(extra.example), value: extra.example ?? "" }
      ])
    )
  };
}

export function ticReducer(state, action) {
  switch (action.type) {
    case "setPillar":
      return { ...state, pillars: { ...state.pillars, [action.id]: action.value } };
    case "toggleExtra": {
      const extra = state.extras[action.id];
      return { ...state, extras: { ...state.extras, [action.id]: { ...extra, enabled: !extra.enabled } } };
    }
    case "setExtraValue": {
      const extra = state.extras[action.id];
      return { ...state, extras: { ...state.extras, [action.id]: { ...extra, value: action.value } } };
    }
    case "fillExample":
      return exampleTicState(action.config);
    case "reset":
      return initialTicState(action.config);
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

/** "Sou aluno do 2º ano" -> "Sou aluno do 2º ano." (não duplica pontuação final) */
function asSentence(text) {
  const trimmed = text.trim();
  return /[.!?…:;]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function applyTemplate(template, value) {
  if (!template.includes(VALUE_TOKEN)) return template;
  const trimmed = value.trim();
  if (!trimmed) return null;
  // "Aja como {value}." com "um professor." não pode virar "um professor.."
  const followedByPunctuation = /\{value\}[.!?]/.test(template);
  const cleaned = followedByPunctuation ? trimmed.replace(/[.!?\s]+$/, "") : trimmed;
  return template.replace(VALUE_TOKEN, cleaned);
}

/**
 * Partes preenchidas, na ordem de `builder.assemblyOrder`.
 * @returns {Array<{ id: string, label: string, letter: string | null, text: string }>}
 */
export function ticPromptParts(state, config) {
  const pillarsById = new Map(config.pillars.map((pillar) => [pillar.id, pillar]));
  const extrasById = new Map(config.extras.map((extra) => [extra.id, extra]));

  return config.builder.assemblyOrder
    .map((id) => {
      const pillar = pillarsById.get(id);
      if (pillar) {
        const value = state.pillars[id]?.trim();
        return value ? { id, label: pillar.name, letter: pillar.letter, text: asSentence(value) } : null;
      }
      const extra = extrasById.get(id);
      const extraState = state.extras[id];
      if (!extra || !extraState?.enabled) return null;
      const text = applyTemplate(extra.template, extraState.value);
      return text ? { id, label: extra.shortName, letter: null, text } : null;
    })
    .filter(Boolean);
}

/** Texto final: uma parte por linha. */
export function buildTicPrompt(state, config) {
  return ticPromptParts(state, config)
    .map((part) => part.text)
    .join("\n");
}

export function countFilledPillars(state, config) {
  return config.pillars.filter((pillar) => state.pillars[pillar.id]?.trim()).length;
}
