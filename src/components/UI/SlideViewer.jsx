import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function slideSrc(folder, number) {
  return `/slides/${folder}/slides_page-${String(number).padStart(4, "0")}.jpg`;
}

const tabClass = (isActive) =>
  [
    "rounded-lg px-4 py-2 font-heading text-xs font-bold transition-colors focus-visible:outline-none",
    isActive
      ? "bg-white text-primary shadow-sm"
      : "text-gray-600 hover:text-gray-900 focus-visible:text-gray-900 active:text-primary"
  ].join(" ");

const navButtonClass =
  "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-base sm:p-3 sm:text-lg text-white shadow-lg transition-colors hover:bg-black/90 focus-visible:bg-black/90 active:bg-black";

/**
 * Modal de slides. Sem estado próprio: a página dona controla apresentação e slide.
 * Teclado: Esc fecha, ← e → navegam. O foco vai para "Fechar" ao abrir e volta
 * ao elemento que abriu o modal ao fechar.
 */
export default function SlideViewer({
  presentations,
  activeId,
  currentSlide,
  onSelectPresentation,
  onPrev,
  onNext,
  onClose
}) {
  const closeButtonRef = useRef(null);
  const presentation = presentations.find((p) => p.id === activeId);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!presentation) return null;

  const imageSrc = slideSrc(presentation.folder, currentSlide);

  // Portal no <body>: o modal fica acima do Navbar sticky, independente de onde é montado.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-viewer-title"
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col space-y-4 rounded-3xl bg-white p-5 shadow-2xl sm:space-y-6 md:p-8"
      >
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 id="slide-viewer-title" className="font-heading text-lg font-bold sm:text-xl text-gray-900">
              Visualizador de Slides
            </h3>
            <p className="hidden font-body text-xs text-gray-500 sm:block">
              Use as setas (← →) ou os botões para navegar. Esc fecha.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full bg-gray-100 px-4 py-2 font-heading text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200 focus-visible:bg-gray-200 active:bg-gray-300"
            aria-label="Fechar visualizador"
          >
            ✕ Fechar
          </button>
        </div>

        <div className="flex flex-wrap gap-2 self-center rounded-xl bg-gray-100 p-1.5">
          {presentations.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === activeId}
              onClick={() => onSelectPresentation(p.id)}
              className={tabClass(p.id === activeId)}
            >
              {p.label} ({p.totalSlides} slides)
            </button>
          ))}
        </div>

        <div className="relative flex aspect-[16/9] max-h-[55vh] w-full flex-1 items-center justify-center self-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-inner">
          {/* key força remontagem, então um erro de carregamento não "gruda" no próximo slide */}
          <img
            key={imageSrc}
            src={imageSrc}
            alt={`Slide ${currentSlide} de ${presentation.totalSlides} — ${presentation.title}`}
            className="h-full w-full object-contain"
          />

          <button type="button" onClick={onPrev} className={`${navButtonClass} left-2 sm:left-4`} aria-label="Slide anterior">
            ❮
          </button>
          <button type="button" onClick={onNext} className={`${navButtonClass} right-2 sm:right-4`} aria-label="Próximo slide">
            ❯
          </button>

          <div
            aria-live="polite"
            className="absolute bottom-3 right-3 rounded-md bg-black/70 px-3 py-1 text-xs font-bold tracking-wider text-white"
          >
            {currentSlide} / {presentation.totalSlides}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-100 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="hidden text-xs font-medium text-gray-500 sm:inline">Exibindo: {presentation.title}</span>
          {presentation.originalUrl && (
            <a
              href={presentation.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-primary hover:underline focus-visible:underline"
            >
              Abrir apresentação original <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
