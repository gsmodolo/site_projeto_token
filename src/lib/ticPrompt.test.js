import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildTicPrompt,
  countFilledPillars,
  exampleTicState,
  initialTicState,
  ticReducer
} from "./ticPrompt.js";

const config = JSON.parse(readFileSync(new URL("../data/tic.json", import.meta.url)));

function apply(state, ...actions) {
  return actions.reduce(ticReducer, state);
}

test("estado inicial gera prompt vazio e zero pilares", () => {
  const state = initialTicState(config);
  assert.equal(buildTicPrompt(state, config), "");
  assert.equal(countFilledPillars(state, config), 0);
});

test("exemplo da palestra monta o prompt do slide na ordem C, persona, T, I", () => {
  const state = exampleTicState(config);
  assert.equal(
    buildTicPrompt(state, config),
    [
      "Sou aluno do 2º ano e não entendo nada de estequiometria.",
      "Aja como um professor de Química divertido.",
      "Me explique esse conceito de forma didática.",
      "Use uma analogia com o Homem-Aranha. Depois, me dê um exercício simples."
    ].join("\n")
  );
  assert.equal(countFilledPillars(state, config), 3);
});

test("pilares ganham ponto final só quando falta", () => {
  const state = apply(
    initialTicState(config),
    { type: "setPillar", id: "tarefa", value: "  Faça um resumo  " },
    { type: "setPillar", id: "contexto", value: "Tenho prova amanhã!" }
  );
  assert.equal(buildTicPrompt(state, config), "Tenho prova amanhã!\nFaça um resumo.");
});

test("extras: só entram quando ligados e, se pedem valor, quando preenchidos", () => {
  let state = apply(initialTicState(config), { type: "setPillar", id: "tarefa", value: "Resuma o texto" });
  state = apply(state, { type: "toggleExtra", id: "persona" });
  assert.equal(buildTicPrompt(state, config), "Resuma o texto.", "persona ligada mas vazia");

  state = apply(
    state,
    { type: "setExtraValue", id: "persona", value: "um professor." },
    { type: "toggleExtra", id: "passo-a-passo" }
  );
  assert.equal(
    buildTicPrompt(state, config),
    "Aja como um professor.\nResuma o texto.\nExplique o raciocínio passo a passo."
  );

  state = apply(state, { type: "toggleExtra", id: "persona" });
  assert.equal(buildTicPrompt(state, config), "Resuma o texto.\nExplique o raciocínio passo a passo.");
  assert.equal(state.extras.persona.value, "um professor.", "desligar não apaga o texto digitado");
});

test("reducer não muta o estado anterior e reset volta ao inicial", () => {
  const before = initialTicState(config);
  const after = ticReducer(before, { type: "setPillar", id: "tarefa", value: "x" });
  assert.equal(before.pillars.tarefa, "");
  assert.notEqual(before, after);
  assert.deepEqual(ticReducer(after, { type: "reset", config }), initialTicState(config));
  assert.throws(() => ticReducer(before, { type: "???" }));
});

test("assemblyOrder só referencia ids existentes", () => {
  const ids = new Set([...config.pillars, ...config.extras].map((item) => item.id));
  for (const id of config.builder.assemblyOrder) assert.ok(ids.has(id), id);
  assert.equal(config.strength.length, config.pillars.length + 1);
});
