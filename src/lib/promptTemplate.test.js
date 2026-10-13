import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildAiUrl,
  countMissing,
  fillTemplate,
  parsePromptTemplate
} from "./promptTemplate.js";

test("separa texto e campos, preservando a ordem", () => {
  const { segments, slots } = parsePromptTemplate("Explique [tópico] para o [ano].");
  assert.deepEqual(segments, [
    { type: "text", value: "Explique " },
    { type: "slot", index: 0, label: "tópico" },
    { type: "text", value: " para o " },
    { type: "slot", index: 1, label: "ano" },
    { type: "text", value: "." }
  ]);
  assert.deepEqual(slots, [
    { index: 0, label: "tópico", context: null },
    { index: 1, label: "ano", context: null }
  ]);
});

test("rótulos repetidos viram campos distintos com contexto", () => {
  const { slots } = parsePromptTemplate(
    "Crie [número] questões. Distribua: [número] fáceis e [número] médias."
  );
  assert.equal(slots.length, 3);
  assert.deepEqual(
    slots.map((slot) => slot.context),
    ["Crie ___ questões", "Distribua ___ fáceis e", "fáceis e ___ médias"]
  );
});

test("contexto não atravessa quebra de linha", () => {
  const { slots } = parsePromptTemplate("[n] fáceis e [n] complexas;\n3. Inclua gráficos");
  assert.equal(slots[1].context, "fáceis e ___ complexas");
});

test("texto sem campos", () => {
  const { segments, slots } = parsePromptTemplate("Sem campos aqui.");
  assert.deepEqual(slots, []);
  assert.deepEqual(segments, [{ type: "text", value: "Sem campos aqui." }]);
});

test("fillTemplate usa o valor aparado e mantém [rótulo] nos vazios", () => {
  const { segments, slots } = parsePromptTemplate("Explique [tópico] para o [ano].");
  const values = ["  frações ", "   "];
  assert.equal(fillTemplate(segments, values), "Explique frações para o [ano].");
  assert.equal(countMissing(slots, values), 1);
  assert.equal(countMissing(slots, ["a", "b"]), 0);
});

test("fillTemplate sem valores devolve o texto original", () => {
  const text = "Linha 1 [a]\nLinha 2 [b]";
  const { segments } = parsePromptTemplate(text);
  assert.equal(fillTemplate(segments, []), text);
});

test("buildAiUrl codifica acentos, quebras de linha e &", () => {
  assert.equal(
    buildAiUrl("https://chatgpt.com/?q={prompt}", "Olá & até\nlogo"),
    "https://chatgpt.com/?q=Ol%C3%A1%20%26%20at%C3%A9%0Alogo"
  );
});

test("todos os prompts do banco voltam ao texto original sem preenchimento", () => {
  for (const file of ["prompts_estudos.json", "prompts_vestibulares.json"]) {
    const prompts = JSON.parse(readFileSync(new URL(`../data/${file}`, import.meta.url)));
    for (const { id, promptText } of prompts) {
      const { segments } = parsePromptTemplate(promptText);
      assert.equal(fillTemplate(segments, []), promptText, id);
    }
  }
});
