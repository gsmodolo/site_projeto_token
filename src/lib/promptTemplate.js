// Funções puras para prompts com campos entre colchetes, ex.: "Explique [tópico] para o [ano]".
// Cada ocorrência vira um campo próprio: em "[número] fáceis, [número] médias" os dois
// "[número]" significam coisas diferentes, então não podem ser agrupados pelo rótulo.

const PLACEHOLDER_PATTERN = /\[([^\]\n]+)\]/g;
const CONTEXT_WORDS_BEFORE = 3;
const CONTEXT_WORDS_AFTER = 2;
const BLANK = "___";

function words(text) {
  return text
    .replace(/[\n:;]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter(Boolean);
}

/** Trecho curto ao redor do campo, para diferenciar rótulos repetidos: "Crie ___ questões". */
// O trecho para no fim da frase/linha, para não misturar com o item seguinte de uma lista.
const SENTENCE_BREAK = /[.;!?\n]/;

function contextAround(before, after) {
  const head = words(before.split(SENTENCE_BREAK).pop()).slice(-CONTEXT_WORDS_BEFORE).join(" ");
  const tail = words(after.split(SENTENCE_BREAK)[0]).slice(0, CONTEXT_WORDS_AFTER).join(" ");
  return [head, BLANK, tail].filter(Boolean).join(" ");
}

/**
 * Quebra o texto em segmentos de texto e de campo.
 * @returns {{ segments: Array<{type: "text", value: string} | {type: "slot", index: number, label: string}>,
 *             slots: Array<{index: number, label: string, context: string | null}> }}
 */
export function parsePromptTemplate(text) {
  const segments = [];
  let cursor = 0;

  for (const match of text.matchAll(PLACEHOLDER_PATTERN)) {
    if (match.index > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, match.index) });
    }
    const index = segments.filter((segment) => segment.type === "slot").length;
    segments.push({ type: "slot", index, label: match[1].trim() });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) {
    segments.push({ type: "text", value: text.slice(cursor) });
  }

  const slotSegments = segments.filter((segment) => segment.type === "slot");
  const labelCount = slotSegments.reduce(
    (count, { label }) => count.set(label, (count.get(label) ?? 0) + 1),
    new Map()
  );
  // O contexto usa só o texto vizinho (entre campos), para não citar outros colchetes.
  const neighbourText = (position) =>
    segments[position]?.type === "text" ? segments[position].value : "";

  const slots = slotSegments.map(({ index, label }) => {
    const position = segments.findIndex((s) => s.type === "slot" && s.index === index);
    return {
      index,
      label,
      context:
        labelCount.get(label) > 1
          ? contextAround(neighbourText(position - 1), neighbourText(position + 1))
          : null
    };
  });

  return { segments, slots };
}

/** Valor preenchido do campo, ou null se estiver vazio. */
export function slotValue(values, index) {
  const value = values[index]?.trim();
  return value ? value : null;
}

/** Monta o texto final: campos vazios continuam como "[rótulo]" para a IA (ou o aluno) completar. */
export function fillTemplate(segments, values) {
  return segments
    .map((segment) =>
      segment.type === "text" ? segment.value : slotValue(values, segment.index) ?? `[${segment.label}]`
    )
    .join("");
}

export function countMissing(slots, values) {
  return slots.filter((slot) => slotValue(values, slot.index) === null).length;
}

/** Substitui "{prompt}" no modelo de URL pelo prompt codificado. */
export function buildAiUrl(urlTemplate, prompt) {
  return urlTemplate.replace("{prompt}", encodeURIComponent(prompt));
}
