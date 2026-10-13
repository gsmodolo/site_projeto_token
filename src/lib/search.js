/** Minúsculas e sem acentos: "Redação" e "redacao" passam a ser iguais. */
export function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** Termos da busca, já normalizados. "  ENEM   redação " -> ["enem", "redacao"] */
export function queryTerms(query) {
  return normalizeText(query).split(/\s+/).filter(Boolean);
}

/** Verdadeiro se TODOS os termos aparecem em algum dos campos. Sem termos, tudo combina. */
export function matchesTerms(fields, terms) {
  if (terms.length === 0) return true;
  const haystack = normalizeText(fields.filter(Boolean).join(" "));
  return terms.every((term) => haystack.includes(term));
}
