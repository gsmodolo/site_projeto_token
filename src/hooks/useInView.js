import { useEffect, useState } from "react";

/** Verdadeiro enquanto o elemento do `ref` está (ao menos em parte) visível na tela. */
export default function useInView(ref) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
