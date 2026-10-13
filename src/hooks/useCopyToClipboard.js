import { useCallback, useEffect, useRef, useState } from "react";

const FEEDBACK_MS = { copied: 2000, error: 2500 };

// Celulares antigos e páginas fora de HTTPS não têm navigator.clipboard.
function legacyCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    if (!document.execCommand("copy")) throw new Error("execCommand falhou");
  } finally {
    document.body.removeChild(textarea);
  }
}

/** Copia texto e expõe o status temporário: "idle" | "copied" | "error". */
export default function useCopyToClipboard() {
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback(async (text) => {
    let next = "copied";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        legacyCopy(text);
      }
    } catch {
      next = "error";
    }
    setStatus(next);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus("idle"), FEEDBACK_MS[next]);
    return next === "copied";
  }, []);

  return { status, copy };
}
