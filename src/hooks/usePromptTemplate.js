import { useCallback, useMemo, useState } from "react";
import { countMissing, fillTemplate, parsePromptTemplate } from "../lib/promptTemplate.js";

/** Estado do formulário de um prompt com campos entre colchetes. */
export default function usePromptTemplate(promptText) {
  const { segments, slots } = useMemo(() => parsePromptTemplate(promptText), [promptText]);
  const [values, setValues] = useState(() => slots.map(() => ""));

  const setValue = useCallback(
    (index, value) =>
      setValues((previous) => previous.map((current, i) => (i === index ? value : current))),
    []
  );

  const filledText = useMemo(() => fillTemplate(segments, values), [segments, values]);
  const missingCount = useMemo(() => countMissing(slots, values), [slots, values]);

  return { segments, slots, values, setValue, filledText, missingCount };
}
