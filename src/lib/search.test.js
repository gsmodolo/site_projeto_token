import { test } from "node:test";
import assert from "node:assert/strict";
import { matchesTerms, normalizeText, queryTerms } from "./search.js";

test("normalizeText remove acentos e caixa", () => {
  assert.equal(normalizeText("Redação ÁGUA ç"), "redacao agua c");
});

test("queryTerms ignora espaços extras", () => {
  assert.deepEqual(queryTerms("  ENEM   redação "), ["enem", "redacao"]);
  assert.deepEqual(queryTerms("   "), []);
});

test("matchesTerms exige todos os termos, em qualquer campo", () => {
  const fields = ["Corretor de Redação", "Nota por competência do ENEM", undefined];
  assert.equal(matchesTerms(fields, queryTerms("redacao enem")), true);
  assert.equal(matchesTerms(fields, queryTerms("redação fuvest")), false);
  assert.equal(matchesTerms(fields, []), true);
});
